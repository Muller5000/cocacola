import React, { useState, useEffect } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Cell 
} from 'recharts';
import { 
  TrendingUp, 
  Package, 
  AlertTriangle, 
  Truck, 
  ArrowUpRight, 
  ArrowDownRight,
  CheckCircle
} from 'lucide-react';
import AppLayout from './components/AppLayout';
import { DistributionMap } from './components/DistributionMap';
import { WidgetContainer } from './components/WidgetContainer';
import { cn, formatCompactNumber } from './lib/utils';
import { 
  KPIData, 
  AlertMessage, 
  Depot, 
  LogisticsMetric, 
  ChartDataPoint, 
  SKUPerformance, 
  StockAlert, 
  ExpiryInventory,
  Outlet
} from './types';
import { 
  mockKPIs, 
  mockAlertMessages, 
  mockDepots, 
  mockLogisticsMetrics, 
  productionData, 
  mockSKUPerformance, 
  mockStockAlerts, 
  mockExpiryInventory,
  mockOutlets
} from './services/mockData';
import { 
  subscribeToKPIs, 
  subscribeToOutlets, 
  seedDatabase 
} from './services/firebaseService';
import { GoogleAuthProvider, signInWithPopup, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './lib/firebase';
import { GoogleGenAI } from "@google/genai";

// Multi-view Components
import { DashboardHome } from './components/DashboardHome';
import { FleetControl } from './components/FleetControl';
import { Financials } from './components/Financials';
import { ProductCatalog } from './components/ProductCatalog';
import { CustomerDirectory } from './components/CustomerDirectory';
import { UserProfileManagement } from './components/UserProfileManagement';
import { InvoicesView } from './components/InvoicesView';
import { TransactionsView } from './components/TransactionsView';
import { OnlineStoreView } from './components/OnlineStoreView';
import { ContentReportsView } from './components/ContentReportsView';
import { DiscountsMarketingView } from './components/DiscountsMarketingView';
import { HelpSupportView } from './components/HelpSupportView';
import { MyProfileView } from './components/MyProfileView';

const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY || 'dummy_key' });

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showAddWidget, setShowAddWidget] = useState(false);
  const [visibleWidgets, setVisibleWidgets] = useState(['kpis', 'alerts', 'depots', 'map', 'production', 'performance', 'critical', 'expiry', 'assistant']);
  const [isAssistantMinimized, setIsAssistantMinimized] = useState(false);
  const [currentTime, setCurrentTime] = useState('');
  const [productionActiveIndex, setProductionActiveIndex] = useState<number | null>(null);

  const [chatHistory, setChatHistory] = useState([
    { role: 'assistant', text: "Welcome to the Coca-Cola Nigeria Command Center. Operational status: STABLE. 3 critical inventory alerts detected in Lagos central." }
  ]);
  const [assistantMsg, setAssistantMsg] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isSeeding, setIsSeeding] = useState(false);

  const [kpis, setKPIs] = useState<Record<string, KPIData>>(mockKPIs);
  const [systemAlerts, setSystemAlerts] = useState<AlertMessage[]>(mockAlertMessages);
  const [skus, setSkus] = useState<SKUPerformance[]>(mockSKUPerformance);
  const [outlets, setOutlets] = useState<Outlet[]>(mockOutlets);
  const [isAuthReady, setIsAuthReady] = useState(false);
  const [authEmail, setAuthEmail] = useState<string | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [authError, setAuthError] = useState('');

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthEmail(user.email);
        setIsAuthReady(true);
      } else {
        setAuthEmail(null);
        setIsAuthReady(false);
      }
    });
    return () => unsub();
  }, []);

  useEffect(() => {
    if (!isAuthReady) return;
    
    const unsubKPIs = subscribeToKPIs(setKPIs);
    const unsubOutlets = subscribeToOutlets(setOutlets);
    return () => {
      unsubKPIs();
      unsubOutlets();
    };
  }, [isAuthReady]);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Jitter effect for real-time map feel
  useEffect(() => {
    const interval = setInterval(() => {
      setOutlets(prev => prev.map(o => ({
        ...o,
        volume: o.volume + (Math.random() - 0.5) * 5
      })));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const login = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    
    // DEMO BYPASS: If Firebase isn't fully configured, allow a demo login
    if (email === 'admin@coke.com' && password === 'admin123') {
      setAuthEmail(email);
      setIsAuthReady(true);
      return;
    }

    try {
      if (isLoginMode) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
    } catch (error: any) {
      setAuthError(error.message.replace('Firebase: ', ''));
    }
  };

  const handleSeed = async () => {
    setIsSeeding(true);
    await seedDatabase(mockKPIs, mockOutlets);
    setIsSeeding(false);
  };

  const handleGenerateReport = async (context: any) => {
    const prompt = `
      You are the Coca-Cola Nigeria Supply Intelligence AI.
      Generate a summarized operational report based on the provided JSON data.
      
      Format the report with these sections:
      1. EXECUTIVE SUMMARY: High-level status.
      2. KPI DIAGNOSTIC: Analysis of Stockout, DOI, Fill Rate, and OTIF.
      3. LOGISTICS HOTSPOTS: Analysis of depots and critical stock alerts.
      4. RISK MITIGATION: Recommendations for expiry inventory and low-performing SKUs.
      
      Use bullet points and bold text for emphasis. Keep it professional and concise.
      Data: ${JSON.stringify(context, null, 2)}
    `;
    
    try {
      const result = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt
      });
      return result.text || "Report generation failed.";
    } catch (e) {
      console.error(e);
      return "Critical failure in AI reporting engine.";
    }
  };

  const askAssistant = async () => {
    if (!assistantMsg.trim()) return;
    const userMsg = assistantMsg;
    setAssistantMsg('');
    setChatHistory(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsTyping(true);

    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    if (!apiKey || apiKey === 'dummy_key') {
      // Functional mock fallback when API key is not provided
      setTimeout(() => {
        let reply = "I'm currently operating in offline mode. Please configure VITE_GEMINI_API_KEY in your .env file to enable live AI analysis.";
        const msg = userMsg.toLowerCase();
        
        if (msg.includes('stock') || msg.includes('inventory')) {
          reply = `Based on current metrics, our Stockout Rate is ${kpis.stockout.currentValue}%. We have 3 critical alerts at the Lagos Central Depot. I recommend redirecting Fleet Alpha to restock our top SKU (${skus[0].name}).`;
        } else if (msg.includes('route') || msg.includes('fleet') || msg.includes('truck') || msg.includes('delivery')) {
          reply = `Fleet OTIF is currently at ${kpis.otif.currentValue}%. Two trucks are delayed on the northern transit route due to heavy congestion. The rerouting algorithm suggests Alternative Path Beta to recover 45 minutes.`;
        } else if (msg.includes('hello') || msg.includes('hi') || msg.includes('hey')) {
          reply = "Hello Operative. The Command Center AI is online and monitoring all regional hubs. How can I assist with your supply chain logistics today?";
        } else if (msg.includes('report') || msg.includes('status')) {
          reply = `Operational Status: STABLE. Fill Rate is healthy at ${kpis.fillRate.currentValue}%, but DOI is ${kpis.doi.currentValue} days, which is slightly above target. I suggest reviewing slow-moving inventory in the eastern sector.`;
        } else if (msg.includes('sku') || msg.includes('product')) {
           reply = `Our top performing product is ${skus[0].name}, making up ${skus[0].percentage}% of our volume. However, we are tracking 2 SKUs near expiration in the Port Harcourt depot.`;
        } else {
           reply = `I have logged your query regarding "${userMsg}". In offline mode, my analysis is limited to predefined logistics parameters. Please ask about stock, routes, or reports.`;
        }
        
        setChatHistory(prev => [...prev, { role: 'assistant', text: reply }]);
        setIsTyping(false);
      }, 1500);
      return;
    }

    try {
      const prompt = `
        You are a smart command center assistant for Coca-Cola Nigeria.
        Context:
        - Stockout Rate: ${kpis.stockout.currentValue}%
        - DOI (Days of Inventory): ${kpis.doi.currentValue} days
        - Fill Rate: ${kpis.fillRate.currentValue}%
        - OTIF (On-Time-In-Full): ${kpis.otif.currentValue}%
        - Top SKU: ${skus[0].name} (${skus[0].percentage}% market cap)
        
        Question: ${userMsg}
      `;
      const response = await ai.models.generateContent({
        model: "gemini-1.5-flash",
        contents: prompt
      });
      setChatHistory(prev => [...prev, { role: 'assistant', text: response.text || "I'm analyzing the distribution maps right now." }]);
    } catch (e) {
      console.error(e);
      setChatHistory(prev => [...prev, { role: 'assistant', text: "Error connecting to AI central. Please check your API key and network connection." }]);
    } finally {
      setIsTyping(false);
    }
  };

  if (!isAuthReady) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center p-6 relative overflow-hidden font-sans">
        {/* Animated Background Accents */}
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#F40009]/5 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#F40009]/5 rounded-full blur-[120px] animate-pulse [animation-delay:2s]"></div>
        
        <div className="max-w-md w-full relative z-10 text-center">
          <div className="mb-12">
            <div className="w-24 h-24 bg-[#F40009] rounded-3xl mx-auto flex items-center justify-center shadow-[0_0_50px_rgba(244,0,9,0.4)] relative">
               <Package className="w-12 h-12 text-white" />
               <div className="absolute -top-2 -right-2 w-6 h-6 bg-white rounded-full flex items-center justify-center border-4 border-[#0A0A0A]">
                  <div className="w-2 h-2 bg-[#F40009] rounded-full animate-ping"></div>
               </div>
            </div>
            <h1 className="mt-8 text-5xl font-logo tracking-[0.2em] text-white">COCA-COLA</h1>
            <p className="mt-4 text-[10px] font-black text-[#8E8E93] uppercase tracking-[0.4em]">Nigeria Command Center</p>
          </div>

          <div className="bg-[#141416] p-8 rounded-[40px] border border-[#232326] shadow-2xl text-left">
            <h2 className="text-xl font-bold text-white mb-2 text-center">{isLoginMode ? 'Secure Terminal Access' : 'Register New Operative'}</h2>
            <p className="text-xs text-[#48484A] mb-8 leading-relaxed font-medium text-center">
              {isLoginMode ? 'Please authenticate to initialize live terminal streams.' : 'Create your credentials for secure access.'}
            </p>
            
            <form onSubmit={handleEmailAuth} className="space-y-4 mb-6">
              <div>
                <input 
                  type="email" 
                  placeholder="Email Address" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#0A0A0A] border border-[#38383A] rounded-xl px-4 py-3.5 text-sm text-white focus:border-[#F40009] outline-hidden transition-all"
                  required
                />
              </div>
              <div>
                <input 
                  type="password" 
                  placeholder="Password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#0A0A0A] border border-[#38383A] rounded-xl px-4 py-3.5 text-sm text-white focus:border-[#F40009] outline-hidden transition-all"
                  required
                />
              </div>
              <p className="text-[#8E8E93] text-[10px] text-center">Demo access: admin@coke.com / admin123</p>
              {authError && <p className="text-[#F40009] text-xs font-bold text-center mt-2">{authError}</p>}
              
              <button 
                type="submit"
                className="w-full mt-2 flex items-center justify-center gap-4 py-4 bg-[#F40009] text-white rounded-xl font-black text-xs uppercase tracking-widest hover:bg-[#C40005] transition-all transform hover:-translate-y-0.5 shadow-[0_10px_20px_rgba(244,0,9,0.2)] active:scale-95"
              >
                {isLoginMode ? 'Authenticate' : 'Register'}
              </button>
            </form>

            <div className="flex items-center gap-4 mb-6">
              <div className="flex-1 h-px bg-[#232326]"></div>
              <span className="text-xs text-[#48484A] font-bold uppercase tracking-wider">OR</span>
              <div className="flex-1 h-px bg-[#232326]"></div>
            </div>
            
            <button 
              type="button"
              onClick={login}
              className="w-full flex items-center justify-center gap-4 py-4 bg-white text-black rounded-xl font-black text-xs uppercase tracking-widest hover:bg-gray-200 transition-all transform hover:-translate-y-0.5 shadow-lg active:scale-95 group"
            >
              <div className="w-5 h-5 flex items-center justify-center bg-black/5 rounded-full group-hover:bg-black/10 transition-colors">
                <ArrowUpRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
              Continue with Google
            </button>
            
            <p className="text-center mt-6 text-xs text-[#8E8E93] font-medium">
              {isLoginMode ? "Don't have access? " : "Already an operative? "}
              <button 
                type="button"
                onClick={() => setIsLoginMode(!isLoginMode)}
                className="text-[#F40009] font-bold hover:underline transition-colors"
              >
                {isLoginMode ? 'Request Clearance' : 'Sign In Here'}
              </button>
            </p>

            <div className="mt-8 pt-6 border-t border-[#232326] flex items-center justify-center gap-3">
               <div className="w-1.5 h-1.5 bg-[#48484A] rounded-full"></div>
               <span className="text-[10px] font-bold text-[#48484A] uppercase tracking-widest leading-none">Strict Protocol Active</span>
               <div className="w-1.5 h-1.5 bg-[#48484A] rounded-full"></div>
            </div>
          </div>
          
          <p className="mt-10 text-[9px] text-[#48484A] font-medium leading-relaxed uppercase tracking-tighter">
            Authorized Personnel Only · Digital Integrity Stream v2.4.0
          </p>
        </div>
      </div>
    );
  }

  return (
    <AppLayout activeId={activeTab} onNavigate={setActiveTab}>
      {/* Brand Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-10 mb-12 mt-6">
        <div>
           <div className="flex items-center gap-4 mb-2">
             <div className="w-2.5 h-2.5 bg-[#F40009] rounded-full animate-pulse shadow-[0_0_12px_#F40009]"></div>
             <h1 className="text-4xl font-logo tracking-[0.15em] text-[#F40009]">COCA-COLA</h1>
           </div>
           <p className="text-[11px] text-[#48484A] font-black uppercase tracking-[0.5em] ml-6 italic">
             {activeTab === 'dashboard' ? 'Command Center · Nigeria Operations' : 
              activeTab === 'orders' ? 'Fleet Control · Live Transit Intelligence' :
              activeTab === 'products' ? 'Inventory Logistics · Global SKU Catalog' :
              activeTab === 'store' ? 'Digital Commerce · B2B Ordering Portal' :
              activeTab === 'customers' ? 'Market Execution · Regional Outlets' :
              activeTab === 'content' ? 'Strategic Assets · Regional Campaign Registry' :
              activeTab === 'invoices' ? 'Fiscal Audit · Billing Ledger' :
              activeTab === 'transactions' ? 'Cash Flow Intelligence · Global Settlement' :
              activeTab === 'reports' ? 'Intelligence Stream · Operational Diagnostics' :
              activeTab === 'analytics' ? 'Fiscal Diagnostic · Financial Performance' : 
              activeTab === 'discounts' ? 'Growth Strategy · Trade Promotions' : 
              activeTab === 'settings' ? 'Identity Management · Access Intelligence' :
              activeTab === 'profile' ? 'Personal Security · Identity Records' :
              activeTab === 'help' ? 'Protocol Support · Diagnostic Terminal' :
              'System Configuration · Access Restricted'}
           </p>
        </div>

        <div className="flex items-center gap-8 bg-[#1C1C1E] p-5 rounded-[24px] border border-[#232326] shadow-2xl">
           <div className="text-right border-r border-[#232326] pr-8">
              <p className="text-2xl font-black text-white tracking-tighter">{currentTime || '--:--'}</p>
              <p className="text-[10px] text-[#8E8E93] font-black uppercase tracking-wider">Lagos Time</p>
           </div>
           <div className="text-right border-r border-[#232326] pr-8">
              <p className="text-2xl font-black text-emerald-500 tracking-tighter">94.2%</p>
              <p className="text-[10px] text-[#8E8E93] font-black uppercase tracking-wider">OTIF Today</p>
           </div>
           <div className="text-right">
              <p className="text-2xl font-black text-[#F40009] tracking-tighter">{systemAlerts.length}</p>
              <p className="text-[10px] text-[#8E8E93] font-black uppercase tracking-wider">Active Alerts</p>
           </div>
        </div>
      </div>

      {activeTab === 'dashboard' && (
        <DashboardHome 
          kpis={kpis}
          systemAlerts={systemAlerts}
          depots={mockDepots}
          logisticsMetrics={mockLogisticsMetrics}
          productionData={productionData}
          skus={skus}
          criticalStock={mockStockAlerts}
          expiryInventory={mockExpiryInventory}
          outlets={outlets}
          visibleWidgets={visibleWidgets}
          productionActiveIndex={productionActiveIndex}
          setProductionActiveIndex={setProductionActiveIndex}
          onSync={handleSeed}
          onGenerateReport={handleGenerateReport}
        />
      )}

      {activeTab === 'orders' && <FleetControl />}
      {activeTab === 'products' && <ProductCatalog />}
      {activeTab === 'store' && <OnlineStoreView />}
      {activeTab === 'customers' && <CustomerDirectory />}
      {activeTab === 'content' && <ContentReportsView />}
      {activeTab === 'invoices' && <InvoicesView />}
      {activeTab === 'transactions' && <TransactionsView />}
      {activeTab === 'reports' && <ContentReportsView />}
      {activeTab === 'analytics' && <Financials />}
      {activeTab === 'discounts' && <DiscountsMarketingView />}
      {activeTab === 'settings' && <UserProfileManagement />}
      {activeTab === 'profile' && <MyProfileView />}
      {activeTab === 'help' && <HelpSupportView />}

      {/* AI Assistant Drawer */}
      {visibleWidgets.includes('assistant') && (
        <div className={cn(
          "fixed bottom-0 sm:bottom-10 right-0 sm:right-10 z-40 transition-all duration-300 p-2 sm:p-0",
          isAssistantMinimized ? "w-full sm:w-[240px]" : "w-full sm:w-[400px]"
        )}>
           <WidgetContainer 
              title="AI Supply Intelligence" 
              subtitle="Live Logistics Engine" 
              className={cn("shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all duration-300", isAssistantMinimized ? "h-auto" : "h-[500px]")}
              onMinimize={() => setIsAssistantMinimized(!isAssistantMinimized)}
              isMinimized={isAssistantMinimized}
           >
              <div className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar mb-4 mt-4">
                 {chatHistory.map((chat, i) => (
                   <div key={i} className={cn("flex flex-col", chat.role === 'user' ? "items-end" : "items-start")}>
                      <div className={cn(
                        "max-w-[85%] p-4 rounded-2xl text-xs font-medium leading-relaxed",
                        chat.role === 'user' ? "bg-[#F40009] text-white" : "bg-[#0A0A0A] border border-[#232326] text-[#8E8E93]"
                      )}>
                         {chat.text}
                      </div>
                   </div>
                 ))}
                 {isTyping && (
                   <div className="flex gap-1.5 p-4 bg-[#0A0A0A] border border-[#232326] rounded-2xl w-24">
                      <div className="w-1.5 h-1.5 bg-[#48484A] rounded-full animate-bounce"></div>
                      <div className="w-1.5 h-1.5 bg-[#48484A] rounded-full animate-bounce [animation-delay:0.2s]"></div>
                      <div className="w-1.5 h-1.5 bg-[#48484A] rounded-full animate-bounce [animation-delay:0.4s]"></div>
                   </div>
                 )}
              </div>
              <div className="relative">
                 <input 
                   type="text" 
                   value={assistantMsg}
                   onChange={(e) => setAssistantMsg(e.target.value)}
                   onKeyDown={(e) => e.key === 'Enter' && askAssistant()}
                   placeholder="Ask about cluster performance..."
                   className="w-full bg-[#0A0A0A] border border-[#232326] rounded-xl px-4 py-4 text-xs text-white focus:border-[#F40009] outline-hidden pr-12 transition-all"
                 />
                 <button onClick={askAssistant} className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-[#48484A] hover:text-[#F40009] transition-colors">
                    <TrendingUp className="w-4 h-4" />
                 </button>
              </div>
           </WidgetContainer>
        </div>
      )}

      {showAddWidget && (
         <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
            <div className="bg-[#1C1C1E] p-10 rounded-3xl w-full max-w-md border border-[#38383A]">
               <h2 className="text-xl font-logo text-[#F40009] mb-8">System Configuration</h2>
               <div className="space-y-3">
                  {['kpis', 'alerts', 'depots', 'map', 'production', 'performance', 'critical', 'expiry', 'assistant'].map(id => (
                    <button 
                      key={id}
                      onClick={() => setVisibleWidgets(p => p.includes(id) ? p.filter(x => x !== id) : [...p, id])}
                      className={cn(
                        "w-full p-4 rounded-xl text-left font-bold text-xs uppercase tracking-widest border transition-all flex justify-between items-center",
                        visibleWidgets.includes(id) ? "bg-[#F40009] border-transparent text-white" : "bg-[#0A0A0A] border-[#232326] text-[#48484A]"
                      )}
                    >
                       {id}
                       {visibleWidgets.includes(id) && <CheckCircle className="w-4 h-4" />}
                    </button>
                  ))}
               </div>
               <button onClick={() => setShowAddWidget(false)} className="w-full mt-10 p-5 bg-white text-black font-black uppercase tracking-widest rounded-2xl">Confirm Setup</button>
            </div>
         </div>
      )}
    </AppLayout>
  );
}
