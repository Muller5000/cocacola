import React from 'react';
import { FileText, Plus, Search, Filter, MoreVertical, LayoutGrid, List } from 'lucide-react';
import { WidgetContainer } from './WidgetContainer';
import { cn } from '../lib/utils';

export const ContentReportsView: React.FC = () => {
  return (
    <div className="animate-fadeIn space-y-10">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-logo tracking-widest text-white">INTELLIGENCE REPORTS</h2>
          <p className="text-[10px] text-[#48484A] font-black uppercase tracking-[0.4em] mt-1">Operational Diagnostics & Strategic Content</p>
        </div>
        <div className="flex gap-4">
          <div className="flex items-center bg-[#141416] border border-[#232326] rounded-2xl p-1 gap-1">
             <button className="p-2.5 bg-[#F40009] text-white rounded-xl shadow-lg">
                <LayoutGrid className="w-4 h-4" />
             </button>
             <button className="p-2.5 text-[#48484A] hover:text-white transition-all">
                <List className="w-4 h-4" />
             </button>
          </div>
          <button className="flex items-center gap-3 bg-[#F40009] text-white px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest shadow-[0_10px_30px_rgba(244,0,9,0.3)] hover:scale-105 transition-all">
            <Plus className="w-4 h-4" />
            Generate Custom Report
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {[
          { title: 'Lagos Supply Chain Q1 Audit', date: '2 days ago', type: 'Fiscal', author: 'B. Afolabi', color: 'bg-emerald-500' },
          { title: 'Northern Regional Logistics Hub Plan', date: '5 days ago', type: 'Strategic', author: 'S. Musa', color: 'bg-[#F40009]' },
          { title: 'SKU Performance · Easter Campaign', date: '1 week ago', type: 'Marketing', author: 'C. Okeke', color: 'bg-amber-500' },
          { title: 'Fleet Modernization Lifecycle Audit', date: '2 weeks ago', type: 'Operations', author: 'E. Uzor', color: 'bg-[#007AFF]' },
          { title: 'Distribution Integrity Review', date: '3 weeks ago', type: 'Security', author: 'Root', color: 'bg-purple-500' },
          { title: 'B2B Portal Conversion Analysis', date: '1 month ago', type: 'Digital', author: 'AI Agent', color: 'bg-pink-500' },
        ].map((report, i) => (
          <div key={i} className="card-clean p-8 bg-[#0A0A0A] border-[#232326] group relative overflow-hidden flex flex-col justify-between min-h-[300px]">
             <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-16 translate-x-16 blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
             
             <div>
                <div className="flex justify-between items-start mb-10">
                   <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center text-white", report.color)}>
                      <FileText className="w-6 h-6" />
                   </div>
                   <button className="p-2 text-[#48484A] hover:text-white transition-colors">
                      <MoreVertical className="w-5 h-5" />
                   </button>
                </div>
                <h4 className="text-xl font-black text-white leading-tight mb-4 group-hover:text-[#F40009] transition-colors">{report.title}</h4>
             </div>

             <div className="pt-8 border-t border-[#232326]">
                <div className="flex items-center justify-between">
                   <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#1C1C1E] border border-[#38383A] flex items-center justify-center text-[10px] font-black text-[#8E8E93]">
                         {report.author.charAt(0)}
                      </div>
                      <div>
                         <p className="text-[10px] font-black text-white uppercase tracking-widest">{report.author}</p>
                         <p className="text-[9px] text-[#48484A] font-bold uppercase">{report.date}</p>
                      </div>
                   </div>
                   <span className="text-[9px] font-black text-[#8E8E93] uppercase tracking-[0.2em] px-2 py-1 bg-[#1C1C1E] rounded-md">
                      {report.type}
                   </span>
                </div>
             </div>
          </div>
        ))}
      </div>

      <WidgetContainer title="Regional Content Registry" subtitle="Campaign & Diagnostic Assets">
         <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 bg-[#1C1C1E] rounded-[32px] border border-[#232326] flex items-center gap-8 group cursor-pointer hover:border-[#F40009]/20 transition-all">
               <div className="w-24 h-24 bg-[#0A0A0A] rounded-2xl border border-[#232326] flex items-center justify-center">
                  <div className="w-12 h-1 bg-[#F40009] rounded-full"></div>
               </div>
               <div>
                  <p className="text-[10px] text-[#F40009] font-black uppercase tracking-[0.3em] mb-2">Campaign CMS</p>
                  <h4 className="text-lg font-black text-white leading-tight mb-2">Ramadan Supply Push Assets</h4>
                  <p className="text-xs text-[#8E8E93] font-medium">Digital banners, POS guidance, and regional route adjustments.</p>
               </div>
            </div>
            <div className="p-8 bg-[#1C1C1E] rounded-[32px] border border-[#232326] flex items-center gap-8 group cursor-pointer hover:border-[#F40009]/20 transition-all">
               <div className="w-24 h-24 bg-[#0A0A0A] rounded-2xl border border-[#232326] flex items-center justify-center">
                  <div className="w-12 h-12 bg-emerald-500/20 rounded-full flex items-center justify-center">
                     <div className="w-6 h-6 border-2 border-emerald-500 rounded-lg"></div>
                  </div>
               </div>
               <div>
                  <p className="text-[10px] text-emerald-500 font-black uppercase tracking-[0.3em] mb-2">Supply Integrity</p>
                  <h4 className="text-lg font-black text-white leading-tight mb-2">Regional Logistics Protocol v2.4</h4>
                  <p className="text-xs text-[#8E8E93] font-medium">Standardized hub-and-spoke distribution guidelines for Lagos Cluster.</p>
               </div>
            </div>
         </div>
      </WidgetContainer>
    </div>
  );
};
