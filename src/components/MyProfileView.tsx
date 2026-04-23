import React, { useState } from 'react';
import { User as UserIcon, Mail, Phone, Shield, Key, Bell, Activity } from 'lucide-react';
import { WidgetContainer } from './WidgetContainer';
import { cn } from '../lib/utils';
import { auth } from '../lib/firebase';
import { updateProfile } from 'firebase/auth';

export const MyProfileView: React.FC = () => {
  const user = auth.currentUser;
  
  const [name, setName] = useState(user?.displayName || 'B. Afolabi');
  const [email, setEmail] = useState(user?.email || 'b.afolabi@coke.com');
  const [phone, setPhone] = useState('+234 800 123 4567');
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = async () => {
    if (user) {
      try {
        await updateProfile(user, { displayName: name });
      } catch (e) {
        console.error(e);
      }
    }
    setIsEditing(false);
  };

  return (
    <div className="animate-fadeIn space-y-10">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-logo tracking-widest text-white">OPERATIVE PROFILE</h2>
          <p className="text-[10px] text-[#48484A] font-black uppercase tracking-[0.4em] mt-1">Personal Security Clearance</p>
        </div>
        {isEditing ? (
          <div className="flex gap-4">
             <button onClick={() => setIsEditing(false)} className="btn-secondary">Cancel</button>
             <button onClick={handleSave} className="btn-primary">Save Changes</button>
          </div>
        ) : (
          <button onClick={() => setIsEditing(true)} className="btn-primary">Edit Profile</button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-8">
           <div className="card-clean p-8 flex flex-col items-center text-center">
              <div className="w-32 h-32 rounded-full border-4 border-[#232326] bg-[#1C1C1E] flex items-center justify-center overflow-hidden mb-6 relative group">
                 {user?.photoURL ? (
                    <img src={user.photoURL} alt="Profile" className="w-full h-full object-cover" />
                 ) : (
                    <UserIcon className="w-12 h-12 text-[#48484A]" />
                 )}
                 {isEditing && (
                   <div className="absolute inset-0 bg-black/60 flex items-center justify-center cursor-pointer hover:bg-black/80 transition-all">
                      <span className="text-xs font-bold text-white uppercase">Upload</span>
                   </div>
                 )}
              </div>
              <h3 className="text-xl font-black text-white mb-1">{name}</h3>
              <p className="text-xs font-bold text-[#F40009] uppercase tracking-widest mb-4">Regional Director</p>
              
              <div className="w-full h-px bg-[#232326] my-6"></div>
              
              <div className="w-full flex justify-between items-center text-xs">
                 <span className="text-[#8E8E93] font-medium">Clearance Level</span>
                 <span className="text-white font-black">Level 5 (Admin)</span>
              </div>
              <div className="w-full flex justify-between items-center text-xs mt-4">
                 <span className="text-[#8E8E93] font-medium">Status</span>
                 <span className="text-emerald-500 font-black">Active</span>
              </div>
           </div>

           <div className="card-clean p-8">
              <h4 className="text-[10px] text-[#48484A] font-black uppercase tracking-[0.3em] mb-6">Security Posture</h4>
              <div className="space-y-4">
                 <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                       <Shield className="w-4 h-4 text-[#8E8E93]" />
                       <span className="text-sm font-bold text-white">2FA Enabled</span>
                    </div>
                    <div className="w-8 h-4 bg-[#F40009] rounded-full relative">
                       <div className="absolute right-1 top-0.5 w-3 h-3 bg-white rounded-full"></div>
                    </div>
                 </div>
                 <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                       <Key className="w-4 h-4 text-[#8E8E93]" />
                       <span className="text-sm font-bold text-white">Biometrics</span>
                    </div>
                    <div className="w-8 h-4 bg-[#1C1C1E] border border-[#38383A] rounded-full relative">
                       <div className="absolute left-1 top-0.5 w-3 h-3 bg-[#48484A] rounded-full"></div>
                    </div>
                 </div>
              </div>
           </div>
        </div>

        <div className="lg:col-span-2 space-y-8">
           <WidgetContainer title="Identity Records" subtitle="Personal Information">
              <div className="space-y-6 mt-6">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                       <label className="block text-[10px] font-black text-[#8E8E93] uppercase tracking-widest mb-2">Full Name</label>
                       <input 
                         type="text" 
                         value={name}
                         onChange={(e) => setName(e.target.value)}
                         disabled={!isEditing}
                         className="w-full bg-[#0A0A0A] border border-[#38383A] rounded-xl px-4 py-3.5 text-sm text-white focus:border-[#F40009] outline-hidden transition-all disabled:opacity-50"
                       />
                    </div>
                    <div>
                       <label className="block text-[10px] font-black text-[#8E8E93] uppercase tracking-widest mb-2">Email Address</label>
                       <input 
                         type="email" 
                         value={email}
                         onChange={(e) => setEmail(e.target.value)}
                         disabled={!isEditing}
                         className="w-full bg-[#0A0A0A] border border-[#38383A] rounded-xl px-4 py-3.5 text-sm text-white focus:border-[#F40009] outline-hidden transition-all disabled:opacity-50"
                       />
                    </div>
                    <div>
                       <label className="block text-[10px] font-black text-[#8E8E93] uppercase tracking-widest mb-2">Phone Number</label>
                       <input 
                         type="text" 
                         value={phone}
                         onChange={(e) => setPhone(e.target.value)}
                         disabled={!isEditing}
                         className="w-full bg-[#0A0A0A] border border-[#38383A] rounded-xl px-4 py-3.5 text-sm text-white focus:border-[#F40009] outline-hidden transition-all disabled:opacity-50"
                       />
                    </div>
                    <div>
                       <label className="block text-[10px] font-black text-[#8E8E93] uppercase tracking-widest mb-2">Department</label>
                       <input 
                         type="text" 
                         value="Operations"
                         disabled
                         className="w-full bg-[#0A0A0A] border border-[#38383A] rounded-xl px-4 py-3.5 text-sm text-[#48484A] outline-hidden transition-all disabled:opacity-50"
                       />
                    </div>
                 </div>
              </div>
           </WidgetContainer>

           <WidgetContainer title="Activity Log" subtitle="Recent Actions">
              <div className="mt-6 space-y-4">
                 {[
                   { action: 'Updated Fleet Routing', time: '2 hours ago', icon: Activity, color: 'text-emerald-500' },
                   { action: 'Approved Invoice #4092', time: 'Yesterday, 14:30', icon: Activity, color: 'text-amber-500' },
                   { action: 'Logged in from new IP', time: 'Yesterday, 09:15', icon: Shield, color: 'text-[#F40009]' }
                 ].map((log, i) => (
                    <div key={i} className="flex items-center gap-4 p-4 rounded-xl border border-[#232326] bg-[#0A0A0A]">
                       <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center bg-[#1C1C1E]", log.color)}>
                          <log.icon className="w-4 h-4" />
                       </div>
                       <div className="flex-1">
                          <p className="text-sm font-bold text-white">{log.action}</p>
                          <p className="text-xs text-[#8E8E93] font-medium">{log.time}</p>
                       </div>
                    </div>
                 ))}
              </div>
           </WidgetContainer>
        </div>
      </div>
    </div>
  );
};
