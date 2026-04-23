import React from 'react';
import { HelpCircle, Book, MessageSquare, Phone, Globe, Shield, Terminal, ArrowUpRight } from 'lucide-react';
import { WidgetContainer } from './WidgetContainer';
import { cn } from '../lib/utils';

export const HelpSupportView: React.FC = () => {
  return (
    <div className="animate-fadeIn space-y-10 pb-20">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-logo tracking-widest text-white">SUPPORT TERMINAL</h2>
          <p className="text-[10px] text-[#48484A] font-black uppercase tracking-[0.4em] mt-1">Operational Guidance & Protocol Diagnostics</p>
        </div>
        <div className="px-6 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full flex items-center gap-3">
           <div className="w-2 h-2 bg-emerald-500 rounded-full animate-ping"></div>
           <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">Support Line: Online</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        <div className="card-clean p-10 bg-[#0A0A0A] border-[#232326] group cursor-pointer hover:border-[#F40009]/30 transition-all">
          <div className="w-16 h-16 rounded-[24px] bg-[#F40009]/10 border border-[#F40009]/20 flex items-center justify-center mb-8 group-hover:bg-[#F40009] transition-all">
            <Book className="w-8 h-8 text-[#F40009] group-hover:text-white" />
          </div>
          <h3 className="text-xl font-black text-white uppercase tracking-tight mb-4">Protocol Library</h3>
          <p className="text-xs text-[#8E8E93] leading-relaxed mb-8">Access the complete documentation for supply chain integrity, logistics routing, and regional hub standards.</p>
          <div className="flex items-center gap-2 text-[#007AFF] text-[10px] font-black uppercase tracking-widest">
             Explore Documentation
             <ArrowUpRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>
        </div>

        <div className="card-clean p-10 bg-[#0A0A0A] border-[#232326] group cursor-pointer hover:border-[#F40009]/30 transition-all">
          <div className="w-16 h-16 rounded-[24px] bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-8 group-hover:bg-emerald-500 transition-all">
            <MessageSquare className="w-8 h-8 text-emerald-500 group-hover:text-white" />
          </div>
          <h3 className="text-xl font-black text-white uppercase tracking-tight mb-4">Command Live Chat</h3>
          <p className="text-xs text-[#8E8E93] leading-relaxed mb-8">Direct line to regional logistics coordinators for immediate operational intervention and route overrides.</p>
          <div className="flex items-center gap-2 text-emerald-500 text-[10px] font-black uppercase tracking-widest">
             Initialize Connection
             <ArrowUpRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>
        </div>

        <div className="card-clean p-10 bg-[#0A0A0A] border-[#232326] group cursor-pointer hover:border-[#F40009]/30 transition-all">
          <div className="w-16 h-16 rounded-[24px] bg-[#007AFF]/10 border border-[#007AFF]/20 flex items-center justify-center mb-8 group-hover:bg-[#007AFF] transition-all">
            <Terminal className="w-8 h-8 text-[#007AFF] group-hover:text-white" />
          </div>
          <h3 className="text-xl font-black text-white uppercase tracking-tight mb-4">Diagnostic Tools</h3>
          <p className="text-xs text-[#8E8E93] leading-relaxed mb-8">Run system-wide integrity checks on regional data mirrors, port reconciliation, and API health status.</p>
          <div className="flex items-center gap-2 text-[#007AFF] text-[10px] font-black uppercase tracking-widest">
             Run Full Diagnostic
             <ArrowUpRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <WidgetContainer title="Regional Contacts" subtitle="Tier 1 Operational Intelligence">
           <div className="mt-8 space-y-4">
              {[
                { name: 'Lagos Logistics Cluster', role: 'Head of Operations', phone: '+234 800-COKE-LAGOS', status: 'Active' },
                { name: 'Abuja Northern Hub', role: 'Regional Flow Lead', phone: '+234 810-COKE-ABUJA', status: 'Active' },
                { name: 'Port Harcourt Gateway', role: 'Terminal Manager', phone: '+234 820-COKE-PH', status: 'Away' },
                { name: 'Global Supply Chain HQ', role: 'Strategic Monitoring', phone: '+1 800-COKE-INTL', status: 'Active' },
              ].map((contact, i) => (
                <div key={i} className="p-6 bg-[#0A0A0A] border border-[#232326] rounded-[24px] flex items-center justify-between group hover:border-[#F40009]/20 transition-all">
                   <div className="flex items-center gap-6">
                      <div className="w-12 h-12 rounded-2xl bg-[#1C1C1E] border border-[#38383A] flex items-center justify-center text-[#8E8E93] group-hover:text-white transition-colors">
                         <Phone className="w-5 h-5" />
                      </div>
                      <div>
                         <h4 className="text-sm font-black text-white uppercase tracking-tight">{contact.name}</h4>
                         <p className="text-[10px] text-[#48484A] font-bold uppercase tracking-wider">{contact.role}</p>
                      </div>
                   </div>
                   <div className="text-right">
                      <p className="text-sm font-black text-white tracking-widest">{contact.phone}</p>
                      <div className={cn("inline-block w-2 h-2 rounded-full", contact.status === 'Active' ? 'bg-emerald-500' : 'bg-amber-500')}></div>
                   </div>
                </div>
              ))}
           </div>
        </WidgetContainer>

        <div className="space-y-10">
           <div className="card-clean p-10 bg-[#0A0A0A] border-[#232326] border-l-4 border-l-[#F40009]">
              <div className="flex items-center gap-4 mb-6">
                 <Shield className="w-8 h-8 text-[#F40009]" />
                 <h3 className="text-xl font-black text-white uppercase tracking-widest">Emergency Protocol</h3>
              </div>
              <p className="text-sm text-[#8E8E93] leading-relaxed mb-10">In the event of a Critical Tier 1 failure (National Stockout or Grid Disconnect), execute the isolation sequence immediately via the command terminal.</p>
              <button className="px-10 py-5 bg-[#F40009] text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-[0_20px_50px_rgba(244,0,9,0.3)] hover:scale-105 transition-all">Emergency Lockdown</button>
           </div>
           
           <div className="card-clean p-10 bg-[#1C1C1E] border-[#38383A] flex items-center justify-between group">
              <div>
                 <p className="text-[10px] text-[#8E8E93] font-black uppercase tracking-[0.3em] mb-2">Regional Connectivity</p>
                 <h4 className="text-xl font-black text-white tracking-tight">Main Gateway Status</h4>
              </div>
              <div className="flex items-center gap-6">
                 <div className="text-center">
                    <p className="text-sm font-black text-emerald-500">OPTIMAL</p>
                    <p className="text-[9px] text-[#48484A] font-bold uppercase">Latency: 12ms</p>
                 </div>
                 <Globe className="w-10 h-10 text-emerald-500 animate-pulse" />
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};
