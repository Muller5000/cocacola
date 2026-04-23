import React from 'react';
import { Tag, Sparkles, Zap, Flame, Percent, Calendar, Heart, ShieldCheck, BarChart3 } from 'lucide-react';
import { WidgetContainer } from './WidgetContainer';
import { cn } from '../lib/utils';

export const DiscountsMarketingView: React.FC = () => {
  return (
    <div className="animate-fadeIn space-y-10">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-logo tracking-widest text-white">TRADE PROMOTIONS</h2>
          <p className="text-[10px] text-[#48484A] font-black uppercase tracking-[0.4em] mt-1">Growth Incentives & Market Expansion Campaigns</p>
        </div>
        <div className="flex gap-4">
          <button className="flex items-center gap-3 bg-[#1C1C1E] text-white px-6 py-3 rounded-2xl border border-[#232326] font-black text-xs uppercase tracking-widest hover:border-[#F40009] transition-all">
            <Calendar className="w-4 h-4" />
            Promo Calendar
          </button>
          <button className="flex items-center gap-3 bg-[#F40009] text-white px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest shadow-[0_10px_30px_rgba(244,0,9,0.3)] hover:scale-105 transition-all">
            <PlusIcon className="w-4 h-4" />
            New Campaign
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <WidgetContainer title="Active Trade Incentives" subtitle="Live Dynamic Discounting Stream">
           <div className="mt-8 space-y-6">
              {[
                { name: 'Regional High-Volume Rebate', value: '15%', target: 'Lagos Cluster', status: 'Running', icon: <Percent className="w-5 h-5" />, color: 'text-emerald-500' },
                { name: 'Easter SKU Velocity Boost', value: '8.5%', target: 'National', status: 'Active', icon: <Flame className="w-5 h-5" />, color: 'text-[#F40009]' },
                { name: 'Distributor Loyalty Tier 3', value: '4.2%', target: 'Northern Hub', status: 'Ending Soon', icon: <Heart className="w-5 h-5" />, color: 'text-amber-500' },
                { name: 'New Outlet Onboarding Credit', value: '₦50k', target: 'New Territories', status: 'Running', icon: <Sparkles className="w-5 h-5" />, color: 'text-[#007AFF]' },
              ].map((promo, i) => (
                <div key={i} className="p-6 bg-[#0A0A0A] border border-[#232326] rounded-3xl flex items-center justify-between group hover:border-[#F40009]/20 transition-all">
                   <div className="flex items-center gap-6">
                      <div className={cn("w-14 h-14 rounded-2xl bg-[#1C1C1E] border border-[#38383A] flex items-center justify-center transition-all group-hover:scale-110", promo.color)}>
                         {promo.icon}
                      </div>
                      <div>
                         <h4 className="text-sm font-black text-white uppercase tracking-tight">{promo.name}</h4>
                         <p className="text-[10px] text-[#48484A] font-bold uppercase tracking-wider">{promo.target} · {promo.status}</p>
                      </div>
                   </div>
                   <div className="text-right">
                      <p className={cn("text-2xl font-black tracking-tighter leading-none mb-1", promo.color)}>{promo.value}</p>
                      <p className="text-[9px] text-[#8E8E93] font-black uppercase tracking-widest">Incentive</p>
                   </div>
                </div>
              ))}
           </div>
        </WidgetContainer>

        <div className="space-y-10">
           <div className="card-clean p-10 bg-[#0A0A0A] border-[#232326] relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-10 opacity-5 -translate-y-6 translate-x-6">
                 <Zap className="w-32 h-32" />
              </div>
              <p className="text-[10px] text-[#F40009] font-black uppercase tracking-[0.4em] mb-4">AI Promotion Engine</p>
              <h3 className="text-2xl font-black text-white leading-tight mb-8">Suggesting 12% rebate for <span className="text-[#F40009]">Coke 50cl</span> in Abuja Hub to counter local pricing variance.</h3>
              <div className="flex gap-4">
                 <button className="flex-1 py-4 bg-[#F40009] text-white text-[10px] font-black uppercase tracking-widest rounded-2xl shadow-xl hover:scale-105 transition-all">Deploy Rule</button>
                 <button className="flex-1 py-4 bg-[#1C1C1E] text-white text-[10px] font-black uppercase tracking-widest rounded-2xl border border-[#232326] hover:bg-[#2C2C2E]">Audit Params</button>
              </div>
           </div>

           <div className="grid grid-cols-2 gap-8">
              <div className="card-clean p-8 bg-[#0A0A0A] border-[#232326]">
                 <div className="flex items-center gap-3 mb-6">
                    <ShieldCheck className="w-5 h-5 text-emerald-500" />
                    <p className="text-[9px] font-black text-white uppercase tracking-widest">Integrity Check</p>
                 </div>
                 <h4 className="text-3xl font-black text-white tracking-tighter">100%</h4>
                 <p className="text-[10px] text-[#8E8E93] font-bold uppercase mt-2">Discount compliance</p>
              </div>
              <div className="card-clean p-8 bg-[#0A0A0A] border-[#232326]">
                 <div className="flex items-center gap-3 mb-6">
                    <BarChart3 className="w-5 h-5 text-[#007AFF]" />
                    <p className="text-[9px] font-black text-white uppercase tracking-widest">ROI Analysis</p>
                 </div>
                 <h4 className="text-3xl font-black text-white tracking-tighter">4.2x</h4>
                 <p className="text-[10px] text-[#8E8E93] font-bold uppercase mt-2">Marketing efficiency</p>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

const PlusIcon = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="3" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <line x1="12" y1="5" x2="12" y2="19"></line>
    <line x1="5" y1="12" x2="19" y2="12"></line>
  </svg>
);
