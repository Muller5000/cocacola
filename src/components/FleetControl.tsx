import React, { useState } from 'react';
import { Truck, MapPin, Clock, ShieldCheck, AlertCircle, Search, Navigation } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { WidgetContainer } from './WidgetContainer';
import { fleetVehicles } from '../services/mockData';
import { cn } from '../lib/utils';
import { FleetVehicle } from '../types';

// Fix for default marker icons
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

// Helper to update map view
const ChangeView: React.FC<{ center: [number, number], zoom: number }> = ({ center, zoom }) => {
  const map = useMap();
  map.setView(center, zoom);
  return null;
};

export const FleetControl: React.FC = () => {
  const [selectedVehicle, setSelectedVehicle] = useState<FleetVehicle>(fleetVehicles[0]);

  return (
    <div className="animate-fadeIn">
      {/* Fleet Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
        <div className="card-clean p-8 flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-emerald-500/10 rounded-3xl flex items-center justify-center mb-6 border border-emerald-500/20">
            <Truck className="w-8 h-8 text-emerald-500" />
          </div>
          <p className="text-4xl font-black text-white mb-2">124</p>
          <p className="text-[10px] text-[#8E8E93] font-black uppercase tracking-[0.2em]">Active Fleet</p>
        </div>
        <div className="card-clean p-8 flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-[#007AFF]/10 rounded-3xl flex items-center justify-center mb-6 border border-[#007AFF]/20">
            <Clock className="w-8 h-8 text-[#007AFF]" />
          </div>
          <p className="text-4xl font-black text-white mb-2">92%</p>
          <p className="text-[10px] text-[#8E8E93] font-black uppercase tracking-[0.2em]">On-Time Dispatch</p>
        </div>
        <div className="card-clean p-8 flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-amber-500/10 rounded-3xl flex items-center justify-center mb-6 border border-amber-500/20">
             <AlertCircle className="w-8 h-8 text-amber-500" />
          </div>
          <p className="text-4xl font-black text-white mb-2">08</p>
          <p className="text-[10px] text-[#8E8E93] font-black uppercase tracking-[0.2em]">Delayed Units</p>
        </div>
        <div className="card-clean p-8 flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-white/5 rounded-3xl flex items-center justify-center mb-6 border border-white/10">
             <ShieldCheck className="w-8 h-8 text-white" />
          </div>
          <p className="text-4xl font-black text-white mb-2">100%</p>
          <p className="text-[10px] text-[#8E8E93] font-black uppercase tracking-[0.2em]">Safety Compliance</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Real-time Tracking List */}
        <div className="lg:col-span-2">
           <WidgetContainer title="Fleet Live Tracking" subtitle="Real-time Transit Intelligence">
              <div className="mt-8 space-y-4">
                 {fleetVehicles.map((vehicle) => (
                   <div 
                     key={vehicle.id} 
                     onClick={() => setSelectedVehicle(vehicle)}
                     className={cn(
                       "group card-clean p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 cursor-pointer hover:bg-[#1C1C1E] transition-all border-[#232326]",
                       selectedVehicle.id === vehicle.id ? "bg-[#1C1C1E] border-[#F40009]" : "bg-[#0A0A0A]"
                     )}
                   >
                      <div className="flex items-center gap-6">
                         <div className={cn(
                           "w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg transition-transform group-hover:scale-105",
                           vehicle.status === 'delayed' ? "bg-red-500/20 border border-red-500/40 text-red-500" : "bg-[#1C1C1E] border border-[#232326] text-[#8E8E93]"
                         )}>
                            <Truck className="w-6 h-6" />
                         </div>
                         <div>
                            <h4 className="text-lg font-black text-white group-hover:text-[#F40009] transition-colors">{vehicle.id}</h4>
                            <p className="text-[10px] text-[#48484A] font-black uppercase tracking-widest">{vehicle.driver}</p>
                         </div>
                      </div>

                      <div className="flex flex-wrap gap-10 items-center">
                         <div className="text-center min-w-[120px]">
                            <div className="flex items-center justify-center gap-2 mb-1">
                               <MapPin className="w-3 h-3 text-[#F40009]" />
                               <span className="text-[11px] font-bold text-white uppercase">{vehicle.location}</span>
                            </div>
                            <p className="text-[9px] text-[#48484A] font-black uppercase tracking-wider">Current Point</p>
                         </div>
                         <div className="text-center min-w-[80px]">
                            <p className="text-sm font-black text-white mb-1">{vehicle.eta}</p>
                            <p className="text-[9px] text-[#48484A] font-black uppercase tracking-wider">Est. Arrival</p>
                         </div>
                         <div className="text-center min-w-[100px]">
                            <div className="flex items-center gap-2 mb-1 justify-center">
                               <span className={cn(
                                 "w-2 h-2 rounded-full animate-pulse",
                                 vehicle.status === 'in-transit' ? "bg-emerald-500" : vehicle.status === 'delayed' ? "bg-red-500" : "bg-amber-500"
                               )}></span>
                               <span className="text-[10px] font-black uppercase tracking-widest text-[#8E8E93]">{vehicle.status}</span>
                            </div>
                            <p className="text-[9px] text-[#48484A] font-black uppercase tracking-wider">Status</p>
                         </div>
                      </div>

                      <div className="text-right min-w-[80px]">
                         <button 
                           onClick={(e) => { e.stopPropagation(); setSelectedVehicle(vehicle); }}
                           className={cn(
                             "p-3 rounded-xl border transition-all",
                             selectedVehicle.id === vehicle.id ? "bg-[#F40009] border-transparent text-white" : "bg-[#1C1C1E] border-[#38383A] text-white hover:border-[#F40009] hover:bg-[#0A0A0A]"
                           )}
                         >
                            <Navigation className="w-4 h-4" />
                         </button>
                      </div>
                   </div>
                 ))}
              </div>
           </WidgetContainer>
        </div>

        {/* Intelligence Sidebar */}
        <div className="lg:col-span-1 space-y-10">
           {/* Mini Map Widget */}
           <WidgetContainer title="Unit Location Pulse" subtitle={`Tracking: ${selectedVehicle.id}`}>
              <div className="h-[250px] mt-4 rounded-2xl overflow-hidden border border-[#232326] relative">
                 <MapContainer 
                    center={[selectedVehicle.lat, selectedVehicle.lng]} 
                    zoom={12} 
                    scrollWheelZoom={false}
                    className="w-full h-full z-0"
                 >
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    <ChangeView center={[selectedVehicle.lat, selectedVehicle.lng]} zoom={12} />
                    <Marker position={[selectedVehicle.lat, selectedVehicle.lng]}>
                       <Popup>
                          <div className="p-1">
                             <p className="font-black text-xs text-white">{selectedVehicle.id}</p>
                             <p className="text-[10px] text-[#8E8E93] font-bold uppercase">{selectedVehicle.location}</p>
                          </div>
                       </Popup>
                    </Marker>
                 </MapContainer>
                 <div className="absolute top-4 left-4 z-10 bg-[#0A0A0A]/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-[#232326]">
                    <p className="text-[10px] font-black text-white uppercase tracking-widest">{selectedVehicle.lat.toFixed(4)}, {selectedVehicle.lng.toFixed(4)}</p>
                 </div>
              </div>
           </WidgetContainer>

           <WidgetContainer title="Transit Payload Ops" subtitle="Efficiency & Capacity Analysis">
              <div className="space-y-10 mt-8">
                 {fleetVehicles.slice(0, 4).map((v) => (
                   <div key={v.id}>
                      <div className="flex justify-between items-end mb-3">
                         <div>
                            <p className="text-xs font-black text-white uppercase tracking-tight">{v.id}</p>
                            <p className="text-[10px] text-[#48484A] font-bold uppercase">Payload Integrity</p>
                         </div>
                         <p className="text-lg font-black text-white">{v.loadPercentage}%</p>
                      </div>
                      <div className="w-full h-2 bg-[#0A0A0A] rounded-full overflow-hidden border border-[#232326]">
                         <div 
                           className={cn("h-full rounded-full transition-all duration-1000", v.loadPercentage > 90 ? "bg-emerald-500" : v.loadPercentage > 70 ? "bg-amber-500" : "bg-[#F40009]")}
                           style={{ width: `${v.loadPercentage}%` }}
                         ></div>
                      </div>
                   </div>
                 ))}
                 
                 <button className="w-full py-5 bg-white text-black font-black uppercase tracking-[0.2em] rounded-2xl hover:bg-[#F40009] hover:text-white transition-all transform hover:-translate-y-1 shadow-2xl active:scale-95">
                    Generate Load Manifest
                 </button>
              </div>
           </WidgetContainer>
        </div>
      </div>
    </div>
  );
};
