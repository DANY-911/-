
import React, { useState, useEffect } from 'react';
import { Prize, UserPreference } from '../types';
import { SIZES, STYLES } from '../constants';

interface DataModalProps {
  prize: Prize;
  onSubmit: (data: UserPreference) => void;
}

const DataModal: React.FC<DataModalProps> = ({ prize, onSubmit }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [gender, setGender] = useState('');
  const [dob, setDob] = useState('');
  const [age, setAge] = useState<number | null>(null);
  const [religion, setReligion] = useState('');
  const [occupation, setOccupation] = useState('');
  const [size, setSize] = useState(SIZES[0]);
  const [style, setStyle] = useState<any>(STYLES[0]);
  const [consentTerms, setConsentTerms] = useState(false);

  useEffect(() => {
    if (dob) {
      const birthDate = new Date(dob);
      const today = new Date();
      let calculatedAge = today.getFullYear() - birthDate.getFullYear();
      const m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        calculatedAge--;
      }
      setAge(calculatedAge >= 0 ? calculatedAge : 0);
    }
  }, [dob]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !phone) {
      alert("กรุณากรอกข้อมูลที่จำเป็นให้ครบถ้วน");
      return;
    }
    if (!consentTerms) {
      alert("กรุณายินยอมเงื่อนไขเพื่อดำเนินการต่อ");
      return;
    }
    onSubmit({ 
      fullName, 
      email,
      phone,
      address, 
      gender, 
      dob, 
      religion, 
      age: age || 0, 
      occupation,
      size, 
      style
    });
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-end md:items-center justify-center bg-zinc-900/60 backdrop-blur-md animate-in fade-in duration-300">
      <div className="w-full max-w-4xl bg-white rounded-t-[3rem] md:rounded-[4rem] shadow-2xl flex flex-col max-h-[95vh] overflow-hidden border-t md:border border-zinc-100">
        
        {/* Header */}
        <div className="p-8 md:p-14 text-center bg-white border-b border-zinc-50 flex-shrink-0">
          <div className="w-12 h-1 bg-zinc-200 rounded-full mx-auto mb-8 md:hidden"></div>
          <div className="inline-block bg-blue-50 text-[#0088cc] px-5 py-1.5 rounded-full text-[10px] font-syncopate font-bold tracking-widest mb-4 uppercase">User_Registration</div>
          <h2 className="text-2xl md:text-4xl font-syncopate font-bold text-zinc-900 tracking-tighter mb-2 leading-none">ร่วมออกแบบอนาคต</h2>
          <p className="text-zinc-400 text-sm md:text-xl font-medium">เพื่อแลกรับรางวัล: <span className="text-[#0088cc] font-black italic">{prize.label}</span></p>
        </div>

        {/* Scrollable Content */}
        <div className="p-8 md:p-14 overflow-y-auto flex-grow custom-scrollbar space-y-12 pb-40 md:pb-20">
          <form className="space-y-12">
            
            {/* Identity Group */}
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <span className="w-8 h-8 rounded-xl bg-zinc-900 text-[#00f3ff] flex items-center justify-center text-[11px] font-syncopate font-bold">01</span>
                <h4 className="text-[11px] font-syncopate font-bold tracking-[0.3em] text-zinc-900 uppercase">Contact_Details</h4>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest ml-1">Full Name *</label>
                  <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="ชื่อจริง - นามสกุล" className="w-full bg-slate-50 border border-transparent rounded-2xl px-6 py-5 focus:bg-white focus:border-[#0088cc] outline-none transition-all font-semibold text-sm" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest ml-1">Email Address *</label>
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="example@email.com" className="w-full bg-slate-50 border border-transparent rounded-2xl px-6 py-5 focus:bg-white focus:border-[#0088cc] outline-none transition-all font-semibold text-sm" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest ml-1">Phone Number *</label>
                  <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="08X-XXX-XXXX" className="w-full bg-slate-50 border border-transparent rounded-2xl px-6 py-5 focus:bg-white focus:border-[#0088cc] outline-none transition-all font-mono font-bold text-sm tracking-widest" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest ml-1">Occupation</label>
                  <input type="text" value={occupation} onChange={(e) => setOccupation(e.target.value)} placeholder="ระบุอาชีพ" className="w-full bg-slate-50 border border-transparent rounded-2xl px-6 py-5 focus:bg-white focus:border-[#0088cc] outline-none transition-all font-semibold text-sm" />
                </div>
              </div>
            </div>

            {/* Insight Group */}
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <span className="w-8 h-8 rounded-xl bg-zinc-900 text-[#00f3ff] flex items-center justify-center text-[11px] font-syncopate font-bold">02</span>
                <h4 className="text-[11px] font-syncopate font-bold tracking-[0.3em] text-zinc-900 uppercase">Sizing_Research</h4>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="relative">
                  <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest ml-1 mb-2 block">Date of Birth</label>
                  <input type="date" value={dob} onChange={(e) => setDob(e.target.value)} className="w-full bg-slate-50 border border-transparent rounded-2xl px-6 py-5 focus:bg-white focus:border-[#0088cc] outline-none transition-all font-semibold text-sm cursor-pointer appearance-none" />
                  {age !== null && <span className="absolute right-4 bottom-5 bg-zinc-900 text-[#00f3ff] text-[9px] px-3 py-1 rounded-full font-black">AGE: {age}</span>}
                </div>
                <div>
                  <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest ml-1 mb-2 block">Gender</label>
                  <select value={gender} onChange={(e) => setGender(e.target.value)} className="w-full bg-slate-50 border border-transparent rounded-2xl px-6 py-5 focus:bg-white focus:border-[#0088cc] outline-none font-semibold text-sm cursor-pointer appearance-none">
                    <option value="">ระบุเพศ</option>
                    <option value="ชาย">ชาย (Male)</option>
                    <option value="หญิง">หญิง (Female)</option>
                    <option value="LGBTQ+">LGBTQ+</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest ml-1 mb-2 block">Religion</label>
                  <select value={religion} onChange={(e) => setReligion(e.target.value)} className="w-full bg-slate-50 border border-transparent rounded-2xl px-6 py-5 focus:bg-white focus:border-[#0088cc] outline-none font-semibold text-sm cursor-pointer appearance-none">
                    <option value="">ระบุศาสนา</option>
                    <option value="พุทธ">พุทธ</option>
                    <option value="คริสต์">คริสต์</option>
                    <option value="อิสลาม">อิสลาม</option>
                    <option value="อื่นๆ">อื่นๆ</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-8 pt-6">
                <div className="space-y-4">
                  <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest ml-1">Daily Size (Your common size)</label>
                  <div className="grid grid-cols-4 md:grid-cols-7 gap-3">
                    {SIZES.map(s => (
                      <button key={s} type="button" onClick={() => setSize(s)} className={`py-5 rounded-2xl text-xs font-black transition-all border-2 ${size === s ? 'bg-zinc-900 border-zinc-900 text-[#00f3ff] shadow-xl scale-105' : 'bg-slate-50 border-transparent text-zinc-400 hover:border-zinc-200'}`}>
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest ml-1">Preferred Fit</label>
                  <div className="flex flex-wrap gap-3">
                    {STYLES.map(s => (
                      <button key={s} type="button" onClick={() => setStyle(s as any)} className={`flex-1 min-w-[120px] py-5 px-6 rounded-2xl text-[11px] font-syncopate font-bold transition-all border-2 ${style === s ? 'bg-[#0088cc] border-[#0088cc] text-white shadow-xl scale-105' : 'bg-slate-50 border-transparent text-zinc-400 hover:border-zinc-200'}`}>
                        {s.toUpperCase()}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Logistics Group */}
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <span className="w-8 h-8 rounded-xl bg-zinc-900 text-[#00f3ff] flex items-center justify-center text-[11px] font-syncopate font-bold">03</span>
                <h4 className="text-[11px] font-syncopate font-bold tracking-[0.3em] text-zinc-900 uppercase">Delivery_Info</h4>
              </div>
              <textarea rows={4} value={address} onChange={(e) => setAddress(e.target.value)} placeholder="บ้านเลขที่, ถนน, แขวง, เขต, รหัสไปรษณีย์..." className="w-full bg-slate-50 border border-transparent rounded-2xl px-6 py-5 focus:bg-white focus:border-[#0088cc] outline-none transition-all font-semibold text-sm resize-none" />
            </div>

            <div className="pt-8 border-t border-zinc-50">
              <label className="flex items-start gap-5 p-6 bg-blue-50/20 rounded-[2rem] cursor-pointer group hover:bg-blue-50/40 transition-colors">
                <input type="checkbox" className="mt-1 w-6 h-6 rounded-lg accent-[#0088cc] cursor-pointer" checked={consentTerms} onChange={(e) => setConsentTerms(e.target.checked)} />
                <span className="text-xs md:text-sm leading-relaxed text-zinc-500 font-medium group-hover:text-zinc-700 transition-colors">
                  ฉันยินยอมให้ <span className="text-zinc-900 font-bold uppercase tracking-widest">Yuedpao Labs</span> จัดเก็บและประมวลผลข้อมูลส่วนบุคคลเพื่อการวิจัยสรีระและการส่งมอบของรางวัลตามกฎหมาย PDPA
                </span>
              </label>
            </div>
          </form>
        </div>

        {/* Footer Action */}
        <div className="absolute bottom-0 left-0 w-full p-8 md:p-14 border-t border-zinc-50 bg-white/90 backdrop-blur-md md:relative flex-shrink-0 z-20">
          <button onClick={handleSubmit} className="w-full btn-chrome text-white font-syncopate font-bold py-7 md:py-9 rounded-2xl md:rounded-full uppercase tracking-[0.4em] text-xs md:text-sm shadow-2xl active:scale-95 transition-all">
            SUBMIT_RESEARCH_DATA
          </button>
        </div>
      </div>
    </div>
  );
};

export default DataModal;
