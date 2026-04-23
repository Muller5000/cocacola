import React from 'react';
import { FileText, Download, Filter, Search, CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import { WidgetContainer } from './WidgetContainer';
import { mockInvoices } from '../services/mockData';
import { cn } from '../lib/utils';

export const InvoicesView: React.FC = () => {
  return (
    <div className="animate-fadeIn space-y-10">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-logo tracking-widest text-white">BILLING LEDGER</h2>
          <p className="text-[10px] text-[#48484A] font-black uppercase tracking-[0.4em] mt-1">Fiscal Documentation & Accounts Receivable</p>
        </div>
        <div className="flex gap-4">
          <button className="flex items-center gap-3 bg-[#1C1C1E] text-white px-6 py-3 rounded-2xl border border-[#232326] font-black text-xs uppercase tracking-widest hover:border-[#F40009] transition-all">
            <Download className="w-4 h-4" />
            Export CSV
          </button>
          <button className="flex items-center gap-3 bg-[#F40009] text-white px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest shadow-[0_10px_30px_rgba(244,0,9,0.3)] hover:scale-105 transition-all">
            <FileText className="w-4 h-4" />
            Draft Invoice
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8">
        <WidgetContainer title="In-Flight Invoices" subtitle="Live Verification Stream">
          <div className="mt-8 overflow-hidden rounded-2xl border border-[#232326]">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#1C1C1E] border-b border-[#232326]">
                  <th className="px-8 py-5 text-[10px] font-black text-[#8E8E93] uppercase tracking-widest">Invoicing Code</th>
                  <th className="px-8 py-5 text-[10px] font-black text-[#8E8E93] uppercase tracking-widest">Regional Client</th>
                  <th className="px-8 py-5 text-[10px] font-black text-[#8E8E93] uppercase tracking-widest">Fiscal Value</th>
                  <th className="px-8 py-5 text-[10px] font-black text-[#8E8E93] uppercase tracking-widest">Protocol Status</th>
                  <th className="px-8 py-5 text-[10px] font-black text-[#8E8E93] uppercase tracking-widest text-right">Draft Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#232326] bg-[#0A0A0A]">
                {mockInvoices.map((inv) => (
                  <tr key={inv.id} className="hover:bg-[#1C1C1E]/30 transition-colors group">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-[#1C1C1E] border border-[#232326] flex items-center justify-center">
                          <FileText className="w-4 h-4 text-[#8E8E93] group-hover:text-[#F40009] transition-colors" />
                        </div>
                        <span className="text-sm font-black text-white">{inv.id}</span>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div>
                        <p className="text-sm font-black text-white">{inv.customerName}</p>
                        <p className="text-[10px] text-[#48484A] font-bold uppercase tracking-tight">{inv.items} Unit Cases</p>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <span className="text-sm font-black text-white">₦{inv.amount.toLocaleString()}</span>
                    </td>
                    <td className="px-8 py-6">
                      <div className={cn(
                        "inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border text-[10px] font-black uppercase tracking-widest",
                        inv.status === 'paid' ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-500" :
                        inv.status === 'pending' ? "bg-amber-500/10 border-amber-500/20 text-amber-500" :
                        "bg-[#F40009]/10 border-[#F40009]/20 text-[#F40009]"
                      )}>
                        {inv.status === 'paid' ? <CheckCircle2 className="w-3 h-3" /> : 
                         inv.status === 'pending' ? <Clock className="w-3 h-3" /> : 
                         <AlertCircle className="w-3 h-3" />}
                        {inv.status}
                      </div>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <span className="text-xs font-bold text-[#8E8E93]">{inv.date}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </WidgetContainer>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="card-clean p-8 bg-[#0A0A0A] border-[#232326]">
          <p className="text-[10px] text-[#48484A] font-black uppercase tracking-[0.3em] mb-4">Total Outstanding</p>
          <h3 className="text-4xl font-black text-white tracking-tighter">₦4.2M</h3>
          <div className="mt-6 flex items-center gap-2 text-red-500">
             <AlertCircle className="w-4 h-4" />
             <span className="text-[10px] font-black uppercase">12 overdue by 5+ days</span>
          </div>
        </div>
        <div className="card-clean p-8 bg-[#0A0A0A] border-[#232326]">
          <p className="text-[10px] text-[#48484A] font-black uppercase tracking-[0.3em] mb-4">Collection Rate</p>
          <h3 className="text-4xl font-black text-white tracking-tighter">98.4%</h3>
          <div className="mt-6 flex items-center gap-2 text-emerald-500">
             <CheckCircle2 className="w-4 h-4" />
             <span className="text-[10px] font-black uppercase">Above regional average</span>
          </div>
        </div>
        <div className="card-clean p-8 bg-[#F40009] border-transparent text-white">
          <p className="text-[10px] text-white/50 font-black uppercase tracking-[0.3em] mb-4">Terminal Reconciliation</p>
          <p className="text-sm font-bold leading-relaxed mb-6">Automated matching with Nigerian Banking switch is currently 100% synchronized.</p>
          <button className="w-full py-3 bg-white text-black text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-black hover:text-white transition-all">Audit Logs</button>
        </div>
      </div>
    </div>
  );
};
