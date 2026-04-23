import React from 'react';
import { Store, ShoppingCart, Tag, Zap, Package, BarChart3, Globe } from 'lucide-react';
import { WidgetContainer } from './WidgetContainer';
import { mockProducts } from '../services/mockData';
import { cn } from '../lib/utils';

export const OnlineStoreView: React.FC = () => {
  return (
    <div className="animate-fadeIn space-y-10">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-logo tracking-widest text-white">B2B COMMERCE PORTAL</h2>
          <p className="text-[10px] text-[#48484A] font-black uppercase tracking-[0.4em] mt-1">Dealer Ordering & Digital Sales Channels</p>
        </div>
        <div className="flex items-center gap-4 bg-[#1C1C1E] border border-[#232326] p-3 rounded-2xl">
          <div className="flex items-center gap-2 px-3 border-r border-[#232326]">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
            <span className="text-[10px] font-black text-white uppercase tracking-widest">Storefront: Online</span>
          </div>
          <div className="flex items-center gap-2 px-3">
            <Globe className="w-3.5 h-3.5 text-[#F40009]" />
            <span className="text-[10px] font-black text-[#8E8E93] uppercase tracking-widest">Port: 8080</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div className="card-clean p-8 bg-[#0A0A0A] border-[#232326] relative group overflow-hidden">
           <div className="absolute top-0 right-0 p-8 opacity-5 -translate-y-4 translate-x-4">
              <ShoppingCart className="w-20 h-20" />
           </div>
           <p className="text-[10px] text-[#48484A] font-black uppercase tracking-[0.3em] mb-4">Daily Cart Conversion</p>
           <h3 className="text-4xl font-black text-white tracking-tighter">74.2%</h3>
           <p className="text-[10px] text-emerald-500 font-bold uppercase mt-4">+2.4% From Yesterday</p>
        </div>
        <div className="card-clean p-8 bg-[#0A0A0A] border-[#232326] relative group overflow-hidden">
           <div className="absolute top-0 right-0 p-8 opacity-5 -translate-y-4 translate-x-4">
              <Tag className="w-20 h-20" />
           </div>
           <p className="text-[10px] text-[#48484A] font-black uppercase tracking-[0.3em] mb-4">Active Dealer Promos</p>
           <h3 className="text-4xl font-black text-white tracking-tighter">18</h3>
           <p className="text-[10px] text-amber-500 font-bold uppercase mt-4">6 Ending This Week</p>
        </div>
        <div className="card-clean p-8 bg-[#0A0A0A] border-[#232326] relative group overflow-hidden">
           <div className="absolute top-0 right-0 p-8 opacity-5 -translate-y-4 translate-x-4">
              <Zap className="w-20 h-20" />
           </div>
           <p className="text-[10px] text-[#48484A] font-black uppercase tracking-[0.3em] mb-4">Average Order Value</p>
           <h3 className="text-4xl font-black text-white tracking-tighter">₦84k</h3>
           <p className="text-[10px] text-[#8E8E93] font-bold uppercase mt-4">Market: Standard</p>
        </div>
        <div className="card-clean p-8 bg-[#0A0A0A] border-[#232326] relative group overflow-hidden">
           <div className="absolute top-0 right-0 p-8 opacity-5 -translate-y-4 translate-x-4">
              <Package className="w-20 h-20" />
           </div>
           <p className="text-[10px] text-[#48484A] font-black uppercase tracking-[0.3em] mb-4">Abandoned Carts</p>
           <h3 className="text-4xl font-black text-[#F40009] tracking-tighter">124</h3>
           <p className="text-[10px] text-[#8E8E93] font-bold uppercase mt-4">Estimated: ₦1.2M Loss</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2">
           <WidgetContainer title="Storefront Performance" subtitle="Top Moving Products (Digital Sales)">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                {mockProducts.slice(0, 4).map((product) => (
                  <div key={product.id} className="p-6 bg-[#0A0A0A] border border-[#232326] rounded-3xl flex items-center gap-6 group hover:border-[#F40009]/30 transition-all">
                    <div className="w-20 h-20 rounded-2xl overflow-hidden grayscale group-hover:grayscale-0 transition-all">
                       <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h4 className="text-sm font-black text-white uppercase tracking-tight">{product.name}</h4>
                      <p className="text-[10px] text-[#8E8E93] font-bold uppercase tracking-wider">{product.category}</p>
                      <div className="mt-2 text-xl font-black text-[#F40009] tracking-tighter">
                         {product.revenue ? `₦${(product.revenue / 1000000).toFixed(1)}M` : 'N/A'}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
           </WidgetContainer>
        </div>

        <div className="lg:col-span-1">
           <WidgetContainer title="Portal Health" subtitle="Global Uptime Monitor">
              <div className="mt-8 space-y-6">
                 <div>
                    <div className="flex justify-between items-center mb-2">
                       <p className="text-[10px] font-black text-white uppercase tracking-widest">Lagos Central Hub</p>
                       <p className="text-[10px] font-black text-emerald-500 uppercase">99.9%</p>
                    </div>
                    <div className="w-full h-1 bg-[#1C1C1E] rounded-full overflow-hidden">
                       <div className="w-[99.9%] h-full bg-emerald-500"></div>
                    </div>
                 </div>
                 <div>
                    <div className="flex justify-between items-center mb-2">
                       <p className="text-[10px] font-black text-white uppercase tracking-widest">Abuja Northern Cluster</p>
                       <p className="text-[10px] font-black text-emerald-500 uppercase">99.7%</p>
                    </div>
                    <div className="w-full h-1 bg-[#1C1C1E] rounded-full overflow-hidden">
                       <div className="w-[99.7%] h-full bg-emerald-500"></div>
                    </div>
                 </div>
                 <div>
                    <div className="flex justify-between items-center mb-2">
                       <p className="text-[10px] font-black text-white uppercase tracking-widest">Regional API Gateway</p>
                       <p className="text-[10px] font-black text-emerald-500 uppercase">100%</p>
                    </div>
                    <div className="w-full h-1 bg-[#1C1C1E] rounded-full overflow-hidden">
                       <div className="w-full h-full bg-emerald-500"></div>
                    </div>
                 </div>

                 <div className="mt-10 p-6 bg-[#F40009]/5 border border-[#F40009]/20 rounded-2xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-16 h-16 bg-[#F40009]/10 rounded-full blur-2xl group-hover:scale-150 transition-transform"></div>
                    <p className="text-[9px] font-black text-[#F40009] uppercase tracking-[0.3em] mb-2">System Alert</p>
                    <p className="text-xs font-bold text-white leading-relaxed">Latency spike detected in Ekiti region. AI auto-rebalancing traffic to Ibadan gateway.</p>
                 </div>
              </div>
           </WidgetContainer>
        </div>
      </div>
    </div>
  );
};
