import React from 'react';
import { Users, Search, MoreHorizontal, MapPin, Phone, Mail, ExternalLink, Calendar, TrendingUp } from 'lucide-react';
import { WidgetContainer } from './WidgetContainer';
import { mockOutlets } from '../services/mockData';
import { cn } from '../lib/utils';

export const CustomerDirectory: React.FC = () => {
  return (
    <div className="animate-fadeIn">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Customer Directory</h2>
          <p className="text-sm text-[#8E8E93] mt-1">Real-time status of regional outlets and delivery compliance.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#48484A]" />
            <input 
              type="text" 
              placeholder="Filter by location..." 
              className="bg-[#1C1C1E] border border-[#232326] rounded-xl pl-10 pr-4 py-2 text-sm text-white focus:border-[#F40009] outline-hidden transition-all w-64"
            />
          </div>
          <button className="flex items-center gap-2 px-5 py-2 border border-[#38383A] bg-[#1C1C1E] text-white rounded-xl font-bold text-sm hover:border-[#F40009] transition-all active:scale-95">
            <Users className="w-4 h-4" />
            <span>Manage Groups</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8">
        <WidgetContainer title="Territory Execution Map" subtitle="Outlet operational health & delivery frequency">
          <div className="overflow-x-auto mt-6 custom-scrollbar pb-4">
            <table className="w-full text-left min-w-[800px]">
              <thead>
                <tr className="border-b border-[#232326] text-[10px] font-black text-[#48484A] uppercase tracking-[0.25em]">
                  <th className="pb-6 pl-4">Outlet Name</th>
                  <th className="pb-6">Territory</th>
                  <th className="pb-6">Performance</th>
                  <th className="pb-6">Last Delivery</th>
                  <th className="pb-6 text-center">Status</th>
                  <th className="pb-6 pr-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#232326]">
                {mockOutlets.map((outlet, i) => (
                  <tr key={i} className="group hover:bg-[#0A0A0A] transition-all border-b border-[#232326]/50">
                    <td className="py-6 pl-4">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-[#1C1C1E] flex items-center justify-center font-black text-[#F40009] border border-[#232326] group-hover:border-[#F40009]/40 transition-all">
                          {outlet.name.charAt(0)}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-white group-hover:text-[#F40009] transition-colors">{outlet.name}</p>
                          <p className="text-[10px] text-[#48484A] font-black uppercase tracking-tight">{outlet.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-6">
                      <div className="flex items-center gap-2 text-[#8E8E93]">
                        <MapPin className="w-3.5 h-3.5" />
                        <span className="text-xs font-medium">{outlet.id.split('-')[1]} Region</span>
                      </div>
                    </td>
                    <td className="py-6">
                      <div className="flex flex-col gap-2 w-32">
                        <div className="flex justify-between items-center text-[9px] font-black uppercase text-[#48484A]">
                          <span>Volume Velocity</span>
                          <span className="text-white">{outlet.volume.toLocaleString()} UC</span>
                        </div>
                        <div className="h-1.5 w-full bg-[#1C1C1E] rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-emerald-500 rounded-full" 
                            style={{ width: `${Math.min(100, (outlet.volume/1500)*100)}%` }}
                          ></div>
                        </div>
                      </div>
                    </td>
                    <td className="py-6">
                      <div className="flex items-center gap-2 text-[#8E8E93]">
                        <Calendar className="w-3.5 h-3.5" />
                        <span className="text-xs font-medium">{outlet.lastDelivery}</span>
                      </div>
                    </td>
                    <td className="py-6">
                      <div className="flex justify-center">
                        <span className={cn(
                          "text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-md border",
                          outlet.status === 'active' ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-500" : "bg-red-500/10 border-red-500/20 text-red-500"
                        )}>
                          {outlet.status}
                        </span>
                      </div>
                    </td>
                    <td className="py-6 pr-4">
                      <div className="flex items-center justify-end gap-2">
                        <button className="p-2 text-[#48484A] hover:text-white transition-colors">
                          <Phone className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-[#48484A] hover:text-[#007AFF] transition-colors">
                          <ExternalLink className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-[#48484A] hover:text-white transition-colors">
                          <MoreHorizontal className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </WidgetContainer>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
         <div className="md:col-span-1">
            <WidgetContainer title="Customer Insights" subtitle="Growth & Retention Diagnostics">
               <div className="space-y-4 mt-4">
                  <div className="p-5 rounded-2xl bg-[#0A0A0A] border border-[#232326]">
                     <div className="flex items-center justify-between mb-4">
                        <TrendingUp className="w-5 h-5 text-emerald-500" />
                        <span className="text-xs font-black text-emerald-500">+12%</span>
                     </div>
                     <p className="text-[10px] text-[#48484A] font-black uppercase tracking-widest mb-1">New Outlet Acquisition</p>
                     <h4 className="text-2xl font-black text-white">482 <span className="text-xs font-normal text-[#8E8E93]">YTD</span></h4>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-[#1C1C1E] border border-[#232326] rounded-xl cursor-not-allowed opacity-50">
                     <Mail className="w-4 h-4 text-[#8E8E93]" />
                     <span className="text-[10px] font-black uppercase text-[#8E8E93] tracking-widest">Broadcast Operational Alert</span>
                  </div>
               </div>
            </WidgetContainer>
         </div>
         <div className="md:col-span-2">
            <div className="card-clean p-10 h-full flex flex-col justify-center items-center text-center relative overflow-hidden">
               <div className="absolute top-0 left-0 w-full h-full bg-[#F40009]/5 pointer-events-none"></div>
               <div className="w-16 h-16 bg-[#F40009]/10 rounded-3xl flex items-center justify-center mb-6 border border-[#F40009]/20">
                  <Users className="w-8 h-8 text-[#F40009]" />
               </div>
               <h3 className="text-2xl font-black text-white mb-2 leading-tight">Territory Intelligence Protocol</h3>
               <p className="text-sm text-[#8E8E93] max-w-sm mb-8 leading-relaxed">Cluster-based performance metrics indicate high penetration in Lagos Central. Analyzing Port Harcourt for expansion opportunities.</p>
               <button className="px-8 py-3 bg-[#F40009] text-white rounded-xl font-bold text-sm tracking-widest uppercase hover:bg-[#C40005] transition-all shadow-[0_10px_20px_rgba(244,0,9,0.3)]">
                  Launch Strategy Planner
               </button>
            </div>
         </div>
      </div>
    </div>
  );
};
