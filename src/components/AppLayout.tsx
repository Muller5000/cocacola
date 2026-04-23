import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Package, 
  Users, 
  FileText,
  Store,
  DollarSign,
  BarChart3,
  Percent,
  Settings as SettingsIcon,
  HelpCircle,
  Search,
  Bell,
  Sun,
  User as UserIcon,
  LogOut,
  ChevronDown,
  Menu,
  X,
} from 'lucide-react';
import { cn } from '../lib/utils';
import { User } from '../types';
import { auth } from '../lib/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';

const NAV_GROUPS = [
  {
    items: [
      { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard', active: true },
      { id: 'orders', icon: ShoppingBag, label: 'Orders', badge: 46 },
      { id: 'products', icon: Package, label: 'Products' },
      { id: 'customers', icon: Users, label: 'Customers' },
      { id: 'content', icon: FileText, label: 'Content' },
      { id: 'store', icon: Store, label: 'Online Store' },
    ]
  },
  {
    title: 'Finances',
    items: [
      { id: 'invoices', icon: FileText, label: 'Invoices' },
      { id: 'transactions', icon: DollarSign, label: 'Transactions' },
      { id: 'reports', icon: BarChart3, label: 'Reports' },
    ]
  },
  {
    items: [
      { id: 'analytics', icon: BarChart3, label: 'Analytics' },
      { id: 'discounts', icon: Percent, label: 'Discounts' },
    ]
  },
  {
    items: [
      { id: 'profile', icon: UserIcon, label: 'My Profile' },
      { id: 'settings', icon: SettingsIcon, label: 'Settings' },
      { id: 'help', icon: HelpCircle, label: 'Help & Support' },
    ]
  }
];

export default function AppLayout({ 
  children,
  activeId = 'dashboard',
  onNavigate
}: { 
  children: React.ReactNode;
  activeId?: string;
  onNavigate?: (id: string) => void;
}) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleNavigate = (id: string) => {
    onNavigate?.(id);
    setIsMobileMenuOpen(false);
  };

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      if (u) {
        setCurrentUser({
          id: u.uid,
          name: u.displayName || 'User',
          email: u.email || '',
          role: 'Admin',
          avatar: u.photoURL || `https://i.pravatar.cc/150?u=${u.uid}`
        });
      } else {
        setCurrentUser(null);
      }
    });
    return () => unsub();
  }, []);

  const handleLogout = () => signOut(auth);

  return (
    <div className="flex min-h-screen bg-[#0A0A0A] text-white font-sans antialiased overflow-x-hidden">
      {/* Mobile Backdrop */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={cn(
        "w-[280px] flex flex-col fixed left-0 top-0 h-screen z-50 bg-[#141416] border-r border-[#232326] transition-transform duration-300 md:translate-x-0",
        isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex items-center justify-between px-8 py-10 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-[#F40009] rounded-xl flex items-center justify-center text-white shadow-[0_0_20px_rgba(244,0,9,0.3)]">
              <Package className="w-7 h-7" />
            </div>
            <div className="flex flex-col">
              <span className="text-white font-logo text-3xl tracking-wide leading-none">COCA-COLA</span>
              <span className="text-[10px] font-bold text-[#8E8E93] uppercase tracking-[0.2em] mt-1">Nigeria Hub</span>
            </div>
          </div>
          <button className="md:hidden text-[#8E8E93] hover:text-white" onClick={() => setIsMobileMenuOpen(false)}>
            <X className="w-6 h-6" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-4 custom-scrollbar pb-8">
          {NAV_GROUPS.map((group, groupIdx) => (
            <div key={groupIdx} className="mb-6 last:mb-0">
              {group.title && (
                <div className="flex items-center justify-between px-4 mb-3">
                  <span className="text-[10px] font-bold text-[#48484A] uppercase tracking-[0.2em]">{group.title}</span>
                  <ChevronDown className="w-3 h-3 text-[#48484A]" />
                </div>
              )}
              <div className="space-y-1">
                {group.items.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleNavigate(item.id)}
                    className={cn(
                      "w-full flex items-center justify-between px-4 py-3.5 rounded-xl transition-all duration-300 group text-sm font-bold",
                      activeId === item.id 
                        ? "bg-[#F40009] text-white shadow-[0_10px_20px_-5px_rgba(244,0,9,0.4)]" 
                        : "text-[#8E8E93] hover:bg-[#1C1C1E] hover:text-white"
                    )}
                  >
                    <div className="flex items-center gap-4">
                      <item.icon className={cn("w-5 h-5 transition-colors", activeId === item.id ? "text-white" : "text-[#48484A] group-hover:text-[#F40009]")} />
                      <span>{item.label}</span>
                    </div>
                    {item.badge && (
                      <span className={cn(
                        "text-[10px] px-2 py-0.5 rounded-full font-black",
                        activeId === item.id ? "bg-white/20 text-white" : "bg-red-500/10 text-[#F40009]"
                      )}>
                        {item.badge}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </nav>

        {/* Global Alert Card */}
        <div className="mx-4 mb-6">
          <div className="relative overflow-hidden p-6 rounded-2xl bg-[#1C1C1E] border border-[#232326] group cursor-pointer">
            <div className="absolute top-0 right-0 p-3">
              <div className="w-2 h-2 bg-[#F40009] rounded-full animate-pulse"></div>
            </div>
            <p className="font-bold text-xs text-white mb-1">System Health</p>
            <p className="text-[11px] text-[#8E8E93] mb-4 leading-relaxed line-clamp-2">All distribution routes in Lagos North are currently optimal.</p>
            <div className="w-full h-1 bg-[#232326] rounded-full overflow-hidden">
              <div className="w-[94%] h-full bg-[#F40009]"></div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-h-screen md:ml-[280px]">
        {/* Topbar */}
        <header className="h-20 md:h-24 flex items-center justify-between px-4 sm:px-6 md:px-10 sticky top-0 z-20 backdrop-blur-md bg-[#0A0A0A]/80 border-b border-[#1C1C1E]">
          <div className="flex items-center gap-3 md:gap-4">
            <button 
              className="md:hidden p-2 -ml-2 text-[#8E8E93] hover:text-white"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu className="w-6 h-6" />
            </button>
            <div className="flex flex-col">
              <p className="text-[10px] font-bold text-[#8E8E93] uppercase tracking-widest hidden sm:block">Command Center / <span className="text-white">Live Intelligence</span></p>
              <h1 className="text-lg md:text-2xl font-bold text-white tracking-tight mt-0 sm:mt-1">Supply Chain Dashboard</h1>
            </div>
          </div>

          <div className="flex items-center gap-2 md:gap-4 p-1.5 md:bg-[#1C1C1E] md:rounded-2xl border-none md:border md:border-[#232326]">
            <div className="relative hidden lg:flex items-center">
              <Search className="absolute left-4 w-4 h-4 text-[#8E8E93]" />
              <input 
                type="text" 
                placeholder="Track ID or SKU..." 
                className="bg-[#0A0A0A] rounded-xl pl-12 pr-4 py-2 text-sm text-white w-48 transition-all focus:ring-1 focus:ring-[#F40009]/50 focus:w-64 outline-hidden font-medium placeholder:text-[#48484A]"
              />
            </div>
            
            <button className="p-2 text-[#48484A] hover:text-[#F40009] transition-colors relative hidden sm:block">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-[#F40009] rounded-full border-2 border-[#1C1C1E]"></span>
            </button>
            <div className="w-px h-6 bg-[#232326] hidden sm:block"></div>
            
            <div className="flex items-center gap-2 md:gap-3 pl-1 md:pl-2 pr-1 md:pr-2">
              <div className="flex flex-col items-end mr-1 hidden sm:flex">
                <p className="text-[11px] font-bold text-white leading-none">{currentUser?.name || 'Manager'}</p>
                <p className="text-[10px] font-medium text-[#8E8E93] mt-1 tracking-tighter">Regional Director</p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-[#232326] flex items-center justify-center border border-[#38383A] overflow-hidden group">
                {currentUser?.avatar ? (
                  <img src={currentUser.avatar} alt={currentUser.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" />
                ) : (
                  <UserIcon className="w-5 h-5 text-[#8E8E93]" />
                )}
              </div>
              {currentUser && (
                <button onClick={handleLogout} className="p-1 text-[#48484A] hover:text-[#F40009] transition-colors">
                  <LogOut className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </header>

        <div className="px-4 sm:px-6 md:px-10 pb-10 pt-6 md:pt-10 flex-1">
          {children}
        </div>
      </main>
    </div>
  );
}
