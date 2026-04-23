import React, { useState, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle, Tooltip, useMap } from 'react-leaflet';
import L from 'leaflet';
import { Outlet } from '../types';
import { cn, formatCompactNumber } from '../lib/utils';
import { Search, Filter, Crosshair, Zap } from 'lucide-react';

// Fix for default marker icons in Leaflet with Vite/React
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

interface DistributionMapProps {
  outlets: Outlet[];
  className?: string;
}

// Component to handle map centering/zooming
const MapController: React.FC<{ center: [number, number]; zoom: number }> = ({ center, zoom }) => {
  const map = useMap();
  React.useEffect(() => {
    map.setView(center, zoom, { animate: true, duration: 1 });
  }, [center, zoom, map]);
  return null;
};

const OutletMarker: React.FC<{ outlet: Outlet; isHighlighted?: boolean; onSelect?: () => void }> = ({ outlet, isHighlighted, onSelect }) => {
  const [isHovered, setIsHovered] = React.useState(false);
  const markerRef = React.useRef<L.Marker>(null);

  // Pulse effect simulation for "realtime" feel
  const [pulseScale, setPulseScale] = useState(1);
  React.useEffect(() => {
    if (outlet.status === 'active') {
      const interval = setInterval(() => {
        setPulseScale(s => s === 1 ? 1.15 : 1);
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [outlet.status]);

  return (
    <React.Fragment>
      <Marker 
        position={[outlet.lat, outlet.lng]} 
        ref={markerRef}
        eventHandlers={{
          click: onSelect
        }}
      >
        <Popup closeButton={false} autoClose={false} closeOnClick={false}>
          <div className="p-1 min-w-[140px]">
            <h4 className="font-bold text-white text-sm">{outlet.name}</h4>
            <p className="text-[10px] text-[#48484A] uppercase font-black tracking-widest">{outlet.id}</p>
            <div className="mt-3 space-y-1.5 border-t border-[#232326] pt-3">
              <div className="flex justify-between gap-4">
                <span className="text-[10px] font-bold text-[#8E8E93] uppercase tracking-tighter">Status:</span>
                <span className={cn("text-[10px] font-black px-1.5 rounded-full uppercase tracking-widest shadow-sm", outlet.status === 'active' ? "bg-emerald-500/10 text-emerald-500" : "bg-red-500/10 text-red-500")}>
                  {outlet.status}
                </span>
              </div>
              <div className="flex justify-between gap-4">
                <span className="text-[10px] font-bold text-[#8E8E93] uppercase tracking-tighter">Volume:</span>
                <span className="text-[10px] font-black text-white">{formatCompactNumber(outlet.volume)} UC</span>
              </div>
            </div>
          </div>
        </Popup>
      </Marker>
      <Circle 
        center={[outlet.lat, outlet.lng]}
        radius={outlet.volume * (isHovered || isHighlighted ? pulseScale * 60 : 50)}
        pathOptions={{ 
          fillColor: outlet.status === 'active' ? '#10B981' : '#EF4444',
          color: outlet.status === 'active' ? '#10B981' : '#EF4444',
          fillOpacity: isHovered || isHighlighted ? 0.6 : 0.15,
          weight: isHovered || isHighlighted ? 4 : 1,
          dashArray: isHovered || isHighlighted ? '8, 8' : '0'
        }}
        eventHandlers={{
          mouseover: () => {
            setIsHovered(true);
            markerRef.current?.openPopup();
          },
          mouseout: () => {
            setIsHovered(false);
          },
          click: onSelect
        }}
      >
        <Tooltip sticky direction="top" offset={[0, -10]} opacity={1}>
          <div className="p-3 min-w-[200px] bg-[#1C1C1E]/50 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-2 pb-2 border-b border-[#38383A]">
              <span className="text-[9px] font-black text-[#8E8E93] uppercase tracking-[0.2em]">Territory Hub</span>
              <div className={cn(
                "w-2 h-2 rounded-full",
                outlet.status === 'active' ? "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" : "bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]"
              )}></div>
            </div>
            <h4 className="font-black text-white text-base leading-tight mb-3">{outlet.name}</h4>
            <div className="flex items-baseline gap-2">
              <p className="text-2xl font-black text-[#F40009] tracking-tighter">{formatCompactNumber(outlet.volume)}</p>
              <p className="text-[10px] text-[#8E8E93] font-bold uppercase tracking-widest">Unit Cases</p>
            </div>
            <div className="mt-3 flex items-center gap-2">
              <div className="flex-1 h-1.5 bg-[#2C2C2E] rounded-full overflow-hidden">
                <div 
                  className="h-full bg-[#F40009]" 
                  style={{ width: `${Math.min((outlet.volume / 8000) * 100, 100)}%` }}
                ></div>
              </div>
              <span className="text-[8px] font-black text-[#48484A] uppercase">Rel. Vol</span>
            </div>
          </div>
        </Tooltip>
      </Circle>
    </React.Fragment>
  );
};

export const DistributionMap: React.FC<DistributionMapProps> = ({ outlets, className }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all');
  const [mapParams, setMapParams] = useState({ 
    center: [9.0820, 8.6753] as [number, number], 
    zoom: 6 
  });
  const [selectedOutletId, setSelectedOutletId] = useState<string | null>(null);

  const filteredOutlets = useMemo(() => {
    return outlets.filter(o => {
      const matchesSearch = o.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           o.id.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === 'all' || o.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [outlets, searchQuery, statusFilter]);

  const handleSelectOutlet = (o: Outlet) => {
    setSelectedOutletId(o.id);
    setMapParams({ center: [o.lat, o.lng], zoom: 10 });
  };

  const resetMap = () => {
    setSelectedOutletId(null);
    setMapParams({ center: [9.0820, 8.6753], zoom: 6 });
  };

  const totalVolume = outlets.reduce((acc, curr) => acc + curr.volume, 0);

  return (
    <div className={cn("w-full h-full rounded-3xl overflow-hidden border border-[#232326] shadow-2xl relative group bg-[#0A0A0A]", className)}>
      {/* Search & Filter Overlay */}
      <div className="absolute top-6 left-6 z-20 flex flex-col gap-3 w-72">
        <div className="relative group/search">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#48484A] group-focus-within/search:text-[#F40009] transition-colors" />
          <input 
            type="text" 
            placeholder="Search Hubs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#1C1C1E]/90 backdrop-blur-xl border border-[#38383A] rounded-2xl py-4 pl-12 pr-4 text-xs text-white placeholder:text-[#48484A] focus:outline-hidden focus:border-[#F40009] transition-all shadow-2xl"
          />
        </div>

        <div className="flex gap-2">
          {(['all', 'active', 'inactive'] as const).map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={cn(
                "flex-1 py-2 px-3 rounded-xl border text-[9px] font-black uppercase tracking-widest transition-all",
                statusFilter === s 
                  ? "bg-[#F40009] border-transparent text-white shadow-[0_8px_16px_rgba(244,0,9,0.3)]" 
                  : "bg-[#1C1C1E]/90 backdrop-blur-xl border-[#232326] text-[#8E8E93] hover:bg-[#2C2C2E]"
              )}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Stats Float */}
      <div className="absolute bottom-6 left-6 z-20 flex items-center gap-4 bg-[#1C1C1E]/90 backdrop-blur-xl border border-[#38383A] p-5 rounded-2xl shadow-2xl">
        <div className="w-10 h-10 rounded-xl bg-[#F40009]/10 flex items-center justify-center">
          <Zap className="w-5 h-5 text-[#F40009]" />
        </div>
        <div>
          <p className="text-[10px] font-black text-[#8E8E93] uppercase tracking-[0.2em] mb-0.5">Network Load</p>
          <p className="text-xl font-black text-white tracking-tighter">{formatCompactNumber(totalVolume)} <span className="text-[10px] text-[#48484A]">UC</span></p>
        </div>
        <div className="w-px h-10 bg-[#232326] mx-2"></div>
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
            <span className="text-[9px] font-black text-white uppercase">{outlets.filter(o => o.status === 'active').length} Active</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-red-500"></div>
            <span className="text-[9px] font-black text-[#8E8E93] uppercase">{outlets.filter(o => o.status === 'inactive').length} Down</span>
          </div>
        </div>
      </div>

      {/* Map Controls */}
      <div className="absolute top-6 right-6 z-20 flex flex-col gap-2">
        <div className="bg-[#1C1C1E]/90 backdrop-blur-xl border border-[#38383A] px-4 py-2 rounded-xl shadow-2xl flex items-center gap-3 mb-2">
           <div className="relative">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-ping absolute inset-0 opacity-75"></div>
              <div className="w-2 h-2 bg-emerald-500 rounded-full relative"></div>
           </div>
           <span className="text-[9px] font-black text-white uppercase tracking-widest whitespace-nowrap">Live Stream Active</span>
        </div>
        <button 
          onClick={resetMap}
          className="w-12 h-12 bg-[#1C1C1E]/90 backdrop-blur-xl border border-[#38383A] rounded-2xl flex items-center justify-center text-[#8E8E93] hover:text-[#F40009] hover:border-[#F40009] transition-all shadow-2xl active:scale-95"
        >
          <Crosshair className="w-5 h-5" />
        </button>
        <button 
          className="w-12 h-12 bg-[#1C1C1E]/90 backdrop-blur-xl border border-[#38383A] rounded-2xl flex items-center justify-center text-[#8E8E93] hover:text-white transition-all shadow-2xl active:scale-95"
        >
          <Filter className="w-5 h-5" />
        </button>
      </div>

      <MapContainer 
        center={mapParams.center} 
        zoom={mapParams.zoom} 
        scrollWheelZoom={true}
        className="w-full h-full z-0"
        zoomControl={false}
      >
        <MapController center={mapParams.center} zoom={mapParams.zoom} />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {filteredOutlets.map((outlet) => (
          <OutletMarker 
            key={outlet.id} 
            outlet={outlet} 
            isHighlighted={selectedOutletId === outlet.id}
            onSelect={() => handleSelectOutlet(outlet)}
          />
        ))}
      </MapContainer>

      {/* Bottom Label Overlay */}
      <div className="absolute bottom-6 right-6 z-10 flex flex-col items-end">
        <div className="bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/5">
           <p className="text-[8px] font-bold text-white/40 uppercase tracking-[0.3em]">Geospatial Engine v4.0.2</p>
        </div>
      </div>
    </div>
  );
};
