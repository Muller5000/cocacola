import React from 'react';
import { User as UserIcon, Shield, Mail, Clock, MoreHorizontal, UserPlus } from 'lucide-react';
import { WidgetContainer } from './WidgetContainer';
import { mockUsers } from '../services/mockData';
import { cn } from '../lib/utils';

export const UserProfileManagement: React.FC = () => {
  return (
    <div className="animate-fadeIn space-y-10">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-logo tracking-widest text-white">USER DIRECTORY</h2>
          <p className="text-[10px] text-[#48484A] font-black uppercase tracking-[0.4em] mt-1">Identity & Access Management</p>
        </div>
        <button className="flex items-center gap-3 bg-[#F40009] text-white px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest shadow-[0_10px_30px_rgba(244,0,9,0.3)] hover:scale-105 transition-all active:scale-95">
          <UserPlus className="w-4 h-4" />
          Provision New User
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <WidgetContainer title="Administrative Personnel" subtitle="Verified Operational Accounts">
          <div className="mt-8 overflow-hidden rounded-2xl border border-[#232326]">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#1C1C1E] border-b border-[#232326]">
                  <th className="px-8 py-5 text-[10px] font-black text-[#8E8E93] uppercase tracking-widest">User Profile</th>
                  <th className="px-8 py-5 text-[10px] font-black text-[#8E8E93] uppercase tracking-widest">Security Role</th>
                  <th className="px-8 py-5 text-[10px] font-black text-[#8E8E93] uppercase tracking-widest">Contact Intel</th>
                  <th className="px-8 py-5 text-[10px] font-black text-[#8E8E93] uppercase tracking-widest text-[#F40009]">Last Terminal Access</th>
                  <th className="px-8 py-5 text-[10px] font-black text-[#8E8E93] uppercase tracking-widest">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#232326] bg-[#0A0A0A]">
                {mockUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-[#1C1C1E]/30 transition-colors group">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl overflow-hidden border border-[#232326] bg-[#1C1C1E] flex items-center justify-center p-0.5">
                          {user.avatar ? (
                            <img src={user.avatar} alt={user.name} className="w-full h-full object-cover rounded-xl" />
                          ) : (
                            <UserIcon className="w-5 h-5 text-[#48484A]" />
                          )}
                        </div>
                        <div>
                          <p className="text-sm font-black text-white group-hover:text-[#F40009] transition-colors">{user.name}</p>
                          <p className="text-[10px] text-[#48484A] font-bold uppercase tracking-tighter">ID: {user.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className={cn(
                        "inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border text-[10px] font-black uppercase tracking-widest",
                        user.role === 'Admin' ? "bg-[#F40009]/10 border-[#F40009]/20 text-[#F40009]" :
                        user.role === 'Editor' ? "bg-amber-500/10 border-amber-500/20 text-amber-500" :
                        "bg-[#48484A]/10 border-[#48484A]/20 text-[#8E8E93]"
                      )}>
                        <Shield className="w-3 h-3" />
                        {user.role}
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-2.5 text-[#8E8E93]">
                        <Mail className="w-3.5 h-3.5" />
                        <span className="text-xs font-medium">{user.email}</span>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-2.5">
                        <Clock className="w-3.5 h-3.5 text-[#F40009]" />
                        <span className="text-xs font-black text-white tracking-tight">{user.lastLogin}</span>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <button className="p-2.5 bg-[#1C1C1E] rounded-xl border border-[#38383A] text-[#8E8E93] hover:text-white hover:border-[#F40009] transition-all">
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </WidgetContainer>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        <div className="card-clean p-8 bg-[#0A0A0A] border-[#232326]">
          <h4 className="text-[10px] text-[#48484A] font-black uppercase tracking-[0.3em] mb-6">Security Posture</h4>
          <div className="space-y-6">
             <div>
                <div className="flex justify-between items-center mb-2">
                   <p className="text-sm font-black text-white">MFA Enrollment</p>
                   <p className="text-sm font-black text-[#F40009]">100%</p>
                </div>
                <div className="w-full h-1.5 bg-[#1C1C1E] rounded-full overflow-hidden">
                   <div className="w-full h-full bg-[#F40009]"></div>
                </div>
             </div>
             <div>
                <div className="flex justify-between items-center mb-2">
                   <p className="text-sm font-black text-white">Active Sessions</p>
                   <p className="text-sm font-black text-emerald-500">12</p>
                </div>
                <div className="w-full h-1.5 bg-[#1C1C1E] rounded-full overflow-hidden">
                   <div className="w-[60%] h-full bg-emerald-500"></div>
                </div>
             </div>
          </div>
        </div>

        <div className="card-clean p-8 bg-[#0A0A0A] border-[#232326]">
           <h4 className="text-[10px] text-[#48484A] font-black uppercase tracking-[0.3em] mb-6">Access Logs (24h)</h4>
           <div className="space-y-4">
              {[
                { event: 'Root Login', user: 'B. Afolabi', time: '08:45 AM', color: 'text-[#F40009]' },
                { event: 'Schema Edit', user: 'C. Okeke', time: 'Yesterday', color: 'text-amber-500' },
                { event: 'Log Audit', user: 'S. Musa', time: '09:12 AM', color: 'text-emerald-500' }
              ].map((log, i) => (
                <div key={i} className="flex items-center justify-between text-xs py-2 border-b border-[#232326] last:border-0 pb-0">
                  <div className="flex items-center gap-3">
                    <div className={cn("w-1.5 h-1.5 rounded-full bg-current", log.color)}></div>
                    <span className="font-black text-white">{log.event}</span>
                  </div>
                  <span className="text-[#48484A] font-bold">{log.time}</span>
                </div>
              ))}
           </div>
        </div>

        <div className="card-clean p-8 bg-[#F40009] border-transparent relative overflow-hidden group">
           <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16 blur-3xl group-hover:scale-150 transition-transform duration-700"></div>
           <h4 className="text-[10px] text-white/60 font-black uppercase tracking-[0.3em] mb-6">Identity Shield</h4>
           <p className="text-3xl font-logo tracking-widest text-white mb-2">PROTECTED</p>
           <p className="text-xs text-white/80 font-medium leading-relaxed">System-wide biometric and hardware key verification is active across all regional distribution hubs.</p>
        </div>
      </div>
    </div>
  );
};
