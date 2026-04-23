import React from 'react';
import { Package, Search, Filter, Plus, MoreVertical, Layers, Tag, BarChart2, TrendingUp } from 'lucide-react';
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
import { WidgetContainer } from './WidgetContainer';
import { mockProducts } from '../services/mockData';
import { cn, formatCompactNumber } from '../lib/utils';

export const ProductCatalog: React.FC = () => {
  return (
    <div className="animate-fadeIn">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Product Catalog</h2>
          <p className="text-sm text-[#8E8E93] mt-1">Manage SKUs, inventory levels, and regional pricing.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#48484A]" />
            <input 
              type="text" 
              placeholder="Search SKUs..." 
              className="bg-[#1C1C1E] border border-[#232326] rounded-xl pl-10 pr-4 py-2 text-sm text-white focus:border-[#F40009] outline-hidden transition-all w-64"
            />
          </div>
          <button className="p-2 bg-[#1C1C1E] border border-[#232326] rounded-xl text-[#8E8E93] hover:text-white transition-colors">
            <Filter className="w-4 h-4" />
          </button>
          <button className="flex items-center gap-2 px-5 py-2 bg-[#F40009] text-white rounded-xl font-bold text-sm hover:bg-[#C40005] transition-all shadow-lg active:scale-95">
            <Plus className="w-4 h-4" />
            <span>Add SKU</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
        {/* Inventory Stats Sidebar */}
        <div className="lg:col-span-1 space-y-8">
          <WidgetContainer title="Inventory Health" subtitle="Consolidated SKU Status">
             <div className="space-y-6 mt-4">
                <div className="flex items-center justify-between">
                   <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-emerald-500/10 rounded-lg flex items-center justify-center text-emerald-500 border border-emerald-500/20">
                         <Layers className="w-4 h-4" />
                      </div>
                      <span className="text-xs font-bold text-white">Full Availability</span>
                   </div>
                   <span className="text-sm font-black text-white">42</span>
                </div>
                <div className="flex items-center justify-between">
                   <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-amber-500/10 rounded-lg flex items-center justify-center text-amber-500 border border-amber-500/20">
                         <Tag className="w-4 h-4" />
                      </div>
                      <span className="text-xs font-bold text-white">Low Stock Alerts</span>
                   </div>
                   <span className="text-sm font-black text-amber-500">12</span>
                </div>
                <div className="flex items-center justify-between">
                   <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-[#F40009]/10 rounded-lg flex items-center justify-center text-[#F40009] border border-[#F40009]/20">
                         <AlertTriangle className="w-4 h-4" />
                      </div>
                      <span className="text-xs font-bold text-white">Out of Stock</span>
                   </div>
                   <span className="text-sm font-black text-[#F40009]">03</span>
                </div>
             </div>
             
             <div className="mt-10 pt-10 border-t border-[#232326]">
                <p className="text-[10px] font-black text-[#48484A] uppercase tracking-widest mb-4">Top Volume Category</p>
                <div className="p-4 bg-[#0A0A0A] rounded-2xl border border-[#232326]">
                   <p className="text-sm font-black text-white">Carbonated Soft Drinks</p>
                   <p className="text-[10px] text-[#8E8E93] mt-1">68% Total Distribution</p>
                </div>
             </div>
          </WidgetContainer>

          <div className="p-8 rounded-3xl bg-gradient-to-br from-[#F40009] to-[#C40005] text-white shadow-2xl relative overflow-hidden group border border-[#F40009]/50">
             <div className="absolute -right-4 -bottom-4 opacity-10 group-hover:scale-110 transition-transform duration-700">
                <BarChart2 className="w-32 h-32" />
             </div>
             <p className="text-[10px] font-black uppercase tracking-[0.3em] mb-2 opacity-80">Supply Projection</p>
             <h4 className="text-2xl font-black mb-4 leading-tight">Replenishment cycle optimal for Cluster A.</h4>
             <button className="text-xs font-black uppercase tracking-widest py-2 border-b-2 border-white hover:opacity-70 transition-all">View report</button>
          </div>
        </div>

        {/* Product Grid & Analytics */}
        <div className="lg:col-span-3 space-y-10">
          {/* Performance Chart Widget */}
          <WidgetContainer 
            title="Quarterly SKU Performance" 
            subtitle="Volume Velocity Metrics (Last 90 Days)"
            className="h-[300px]"
          >
            <div className="flex-1 mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={mockProducts.map(p => ({ name: p.sku, value: p.sold }))}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#232326" vertical={false} />
                  <XAxis 
                    dataKey="name" 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#48484A', fontSize: 10, fontWeight: 700 }}
                    dy={10}
                  />
                  <YAxis 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#48484A', fontSize: 10, fontWeight: 700 }}
                    tickFormatter={(v) => formatCompactNumber(v)}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1C1C1E', 
                      border: '1px solid #232326',
                      borderRadius: '12px',
                      fontSize: '10px',
                      fontWeight: '700',
                      color: '#fff'
                    }}
                    cursor={{ fill: 'rgba(244,0,9,0.05)' }}
                  />
                  <Bar dataKey="value" radius={[6, 6, 0, 0]} barSize={40}>
                    {mockProducts.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={index === 0 ? '#F40009' : '#232326'} className="hover:fill-[#F40009] transition-colors" />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </WidgetContainer>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {mockProducts.map((product) => (
              <div key={product.id} className="card-clean h-full flex flex-col group relative">
                <div className="relative h-48 overflow-hidden rounded-t-xl">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                  />
                  <div className="absolute top-4 left-4">
                    <span className={cn(
                      "text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-md border backdrop-blur-md",
                      product.status === 'available' ? "bg-emerald-500/80 border-emerald-500/50 text-white" :
                      product.status === 'low-stock' ? "bg-amber-500/80 border-amber-500/50 text-white" :
                      "bg-red-500/80 border-red-500/50 text-white"
                    )}>
                      {product.status.replace('-', ' ')}
                    </span>
                  </div>
                  <button className="absolute top-4 right-4 p-2 bg-black/50 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-all hover:bg-[#F40009]">
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </div>

                <div className="p-6 flex-1 flex flex-col">
                  <div className="mb-4">
                    <p className="text-[9px] text-[#F40009] font-black uppercase tracking-widest mb-1">{product.category}</p>
                    <h4 className="text-lg font-black text-white group-hover:text-[#F40009] transition-colors">{product.name}</h4>
                    <p className="text-[10px] text-[#48484A] font-bold uppercase tracking-widest leading-none mt-1">{product.sku}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mt-auto">
                    <div className="p-3 bg-[#0A0A0A] rounded-xl border border-[#232326]">
                      <p className="text-[9px] text-[#48484A] font-black uppercase mb-1">Available</p>
                      <p className="text-sm font-black text-white">{product.stock.toLocaleString()}</p>
                    </div>
                    <div className="p-3 bg-[#0A0A0A] rounded-xl border border-[#232326]">
                      <p className="text-[9px] text-[#48484A] font-black uppercase mb-1">Unit Price</p>
                      <p className="text-sm font-black text-white">₦{product.unitPrice}</p>
                    </div>
                  </div>
                  
                  <button className="w-full mt-6 py-3 bg-[#232326] text-white rounded-xl text-[10px] font-black uppercase tracking-widest border border-[#38383A] hover:bg-[#F40009] hover:border-transparent transition-all active:scale-95">
                    Update Inventory
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Help with missing import
function AlertTriangle(props: any) {
  return (
    <svg 
      {...props} 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
    >
      <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
      <path d="M12 9v4" />
      <path d="M12 17h.01" />
    </svg>
  )
}
