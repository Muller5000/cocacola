import React from 'react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { DollarSign, TrendingUp, TrendingDown, ArrowUpRight, ArrowDownRight, CreditCard, PieChart as PieIcon } from 'lucide-react';
import { WidgetContainer } from './WidgetContainer';
import { financialSummaries, profitData } from '../services/mockData';
import { cn } from '../lib/utils';

const EXPENSE_DATA = [
  { name: 'Manufacturing', value: 45, color: '#F40009' },
  { name: 'Logistics', value: 25, color: '#38383A' },
  { name: 'Marketing', value: 15, color: '#8E8E93' },
  { name: 'Administrative', value: 10, color: '#48484A' },
  { name: 'Other', value: 5, color: '#232326' },
];

export const Financials: React.FC = () => {
  return (
    <div className="animate-fadeIn">
      {/* Financial Core Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-14">
        {financialSummaries.map((metric, i) => (
          <div key={i} className="card-clean p-8 group hover:-translate-y-1 transition-all duration-300">
            <div className="flex justify-between items-start mb-6">
              <div className="p-4 bg-[#0A0A0A] rounded-2xl border border-[#232326] group-hover:border-[#F40009]/40 transition-colors">
                {i === 0 ? <CreditCard className="w-6 h-6 text-[#F40009]" /> : <DollarSign className="w-6 h-6 text-[#8E8E93]" />}
              </div>
              <div className={cn(
                "flex items-center gap-1 text-xs font-black px-3 py-1.5 rounded-lg",
                metric.trend > 0 ? "bg-emerald-500/10 text-emerald-500" : "bg-red-500/10 text-red-500"
              )}>
                {metric.trend > 0 ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                {Math.abs(metric.trend)}%
              </div>
            </div>
            <p className="text-[10px] text-[#48484A] font-black uppercase tracking-[0.3em] mb-2">{metric.label}</p>
            <h3 className="text-3xl font-black text-white tracking-tighter">
              {metric.prefix}{metric.value > 1000000 ? `${(metric.value / 1000000000).toFixed(2)}B` : metric.value}{metric.suffix}
            </h3>
            <div className="mt-4 h-1.5 w-full bg-[#0A0A0A] rounded-full overflow-hidden">
               <div 
                 className={cn("h-full transition-all duration-1000", metric.trend > 0 ? "bg-emerald-500" : "bg-red-500")}
                 style={{ width: `${Math.min(100, 50 + metric.trend * 4)}%` }}
               ></div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mb-14">
        {/* Revenue Projection */}
        <div className="lg:col-span-2">
           <WidgetContainer title="Financial Trajectory" subtitle="8-Week Revenue vs Target Projection">
              <div className="h-[400px] w-full mt-10">
                 <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={profitData}>
                       <defs>
                          <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                             <stop offset="5%" stopColor="#F40009" stopOpacity={0.3}/>
                             <stop offset="95%" stopColor="#F40009" stopOpacity={0}/>
                          </linearGradient>
                          <linearGradient id="colorTrend" x1="0" y1="0" x2="0" y2="1">
                             <stop offset="5%" stopColor="#38383A" stopOpacity={0.1}/>
                             <stop offset="95%" stopColor="#38383A" stopOpacity={0}/>
                          </linearGradient>
                       </defs>
                       <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#48484A', fontWeight: 800 }} dy={10} />
                       <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#48484A', fontWeight: 800 }} tickFormatter={v => `₦${v/1000}k`} />
                       <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#232326" />
                       <Tooltip 
                         contentStyle={{ backgroundColor: '#0A0A0A', border: '1px solid #38383A', borderRadius: '12px', padding: '16px' }}
                         itemStyle={{ color: '#F40009', fontWeight: 800, fontSize: '12px' }}
                         labelStyle={{ color: '#8E8E93', marginBottom: '8px', textTransform: 'uppercase', fontSize: '10px', fontWeight: 900 }}
                       />
                       <Area type="monotone" dataKey="value" stroke="#F40009" strokeWidth={4} fillOpacity={1} fill="url(#colorValue)" animationDuration={2000} />
                       <Area type="monotone" dataKey="trend" stroke="#38383A" strokeWidth={2} strokeDasharray="8 8" fillOpacity={1} fill="url(#colorTrend)" />
                    </AreaChart>
                 </ResponsiveContainer>
              </div>
           </WidgetContainer>
        </div>

        {/* Operating Expense Breakdown */}
        <div className="lg:col-span-1">
           <WidgetContainer title="OpEx Allocation" subtitle="Structural Cost Distribution">
              <div className="h-[300px] w-full mt-6">
                 <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                       <Pie
                          data={EXPENSE_DATA}
                          cx="50%"
                          cy="50%"
                          innerRadius={80}
                          outerRadius={110}
                          paddingAngle={10}
                          dataKey="value"
                          stroke="none"
                       >
                          {EXPENSE_DATA.map((entry, index) => (
                             <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                       </Pie>
                       <Tooltip 
                         contentStyle={{ backgroundColor: '#0A0A0A', border: '1px solid #38383A', borderRadius: '12px' }}
                         itemStyle={{ fontSize: '11px', fontWeight: 800 }}
                       />
                    </PieChart>
                 </ResponsiveContainer>
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none mt-3">
                    <PieIcon className="w-8 h-8 text-[#48484A] mx-auto mb-1" />
                    <p className="text-[9px] font-black text-[#8E8E93] uppercase tracking-widest leading-none">Fiscal<br/>Weight</p>
                 </div>
              </div>
              <div className="space-y-4 mt-8 pb-4">
                 {EXPENSE_DATA.slice(0, 3).map((item, i) => (
                    <div key={i} className="flex items-center justify-between">
                       <div className="flex items-center gap-3">
                          <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }}></div>
                          <span className="text-[11px] font-bold text-white uppercase tracking-tight">{item.name}</span>
                       </div>
                       <span className="text-[11px] font-black text-[#8E8E93]">{item.value}%</span>
                    </div>
                 ))}
                 <button className="w-full mt-6 py-4 border border-[#38383A] rounded-xl text-[10px] font-black text-white uppercase tracking-[0.3em] hover:bg-white hover:text-black transition-all">
                    Detailed P&L Audit
                 </button>
              </div>
           </WidgetContainer>
        </div>
      </div>
    </div>
  );
};
