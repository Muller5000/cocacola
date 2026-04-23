import React from 'react';
import { CreditCard, ArrowUpRight, ArrowDownRight, Search, Filter, Calendar } from 'lucide-react';
import { WidgetContainer } from './WidgetContainer';
import { mockTransactions } from '../services/mockData';
import { cn } from '../lib/utils';

export const TransactionsView: React.FC = () => {
  return (
    <div className="animate-fadeIn space-y-10">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-logo tracking-widest text-white">CASH FLOW TERMINAL</h2>
          <p className="text-[10px] text-[#48484A] font-black uppercase tracking-[0.4em] mt-1">Real-time Financial Transmission Logs</p>
        </div>
        <div className="flex bg-[#141416] border border-[#232326] rounded-2xl p-1.5 gap-1">
          {['Historical', 'Settlement', 'Reconciliation'].map((tab) => (
             <button key={tab} className={cn(
               "px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all",
               tab === 'Historical' ? "bg-[#F40009] text-white shadow-lg" : "text-[#48484A] hover:text-white"
             )}>
               {tab}
             </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2">
          <WidgetContainer title="Stream Logs" subtitle="Incoming & Outgoing Intelligence">
            <div className="mt-8 space-y-3">
              {mockTransactions.map((txn) => (
                <div key={txn.id} className="flex items-center justify-between p-5 bg-[#0A0A0A] border border-[#232326] rounded-[24px] hover:border-[#F40009]/20 transition-all group">
                  <div className="flex items-center gap-5">
                    <div className={cn(
                      "w-12 h-12 rounded-2xl flex items-center justify-center transition-all",
                      txn.type === 'incoming' ? "bg-emerald-500/10 text-emerald-500 group-hover:bg-emerald-500 group-hover:text-white" : "bg-[#F40009]/10 text-[#F40009] group-hover:bg-[#F40009] group-hover:text-white"
                    )}>
                      {txn.type === 'incoming' ? <ArrowUpRight className="w-5 h-5" /> : <ArrowDownRight className="w-5 h-5" />}
                    </div>
                    <div>
                      <h4 className="text-sm font-black text-white uppercase tracking-tight">{txn.description}</h4>
                      <p className="text-[10px] text-[#48484A] font-bold uppercase tracking-wider">{txn.category} · {txn.timestamp}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={cn("text-lg font-black tracking-tighter", txn.type === 'incoming' ? "text-emerald-500" : "text-white")}>
                      {txn.type === 'incoming' ? '+' : '-'} ₦{(txn.amount / 1000000).toFixed(2)}M
                    </p>
                    <p className="text-[9px] text-[#48484A] font-black uppercase tracking-[0.2em]">Auth ID: {txn.id}</p>
                  </div>
                </div>
              ))}
            </div>
          </WidgetContainer>
        </div>

        <div className="lg:col-span-1 space-y-10">
          <div className="card-clean p-8 bg-[#0A0A0A] border-[#232326] relative overflow-hidden">
             <div className="absolute top-0 right-0 p-8 opacity-10">
                <CreditCard className="w-24 h-24" />
             </div>
             <p className="text-[10px] text-[#48484A] font-black uppercase tracking-[0.3em] mb-6">Settled Liquidity</p>
             <h3 className="text-4xl font-black text-white tracking-tighter mb-2">₦2.84B</h3>
             <p className="text-xs text-[#8E8E93] font-medium leading-relaxed">Available for immediate regional logistics allocation.</p>
             <div className="mt-8 pt-8 border-t border-[#232326] flex items-center justify-between">
                <div>
                   <p className="text-[10px] text-[#48484A] font-black uppercase tracking-widest">Growth</p>
                   <p className="text-sm font-black text-emerald-500">+14.2%</p>
                </div>
                <div>
                   <p className="text-[10px] text-[#48484A] font-black uppercase tracking-widest">Churn</p>
                   <p className="text-sm font-black text-[#F40009]">-2.1%</p>
                </div>
             </div>
          </div>

          <div className="card-clean p-8 bg-[#1C1C1E] border-[#F40009]/20 shadow-[0_20px_50px_rgba(244,0,9,0.1)]">
             <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-[#F40009] rounded-xl">
                   <Calendar className="w-5 h-5 text-white" />
                </div>
                <h4 className="text-sm font-black text-white uppercase tracking-widest">Next Settlement</h4>
             </div>
             <p className="text-2xl font-black text-white tracking-tighter">APRIL 24, 2026</p>
             <p className="text-[10px] text-[#8E8E93] font-black uppercase tracking-widest mt-1">Lagos Settlement Window: T-2 Days</p>
             <button className="w-full mt-8 py-4 bg-[#F40009]/10 border border-[#F40009]/20 text-[#F40009] rounded-xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-[#F40009] hover:text-white transition-all">Schedule Manual Audit</button>
          </div>
        </div>
      </div>
    </div>
  );
};
