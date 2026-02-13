
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
    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-zinc-900/60 backdrop-blur-md animate-in fade-in duration-300">
      <div className="w-full max-w-3xl bg-white rounded-t-[2.5rem] md:rounded-[2.5rem] shadow-2xl flex flex-col max-h-[95vh] overflow-hidden border-t md:border border-zinc-100">
        
        {/* Header - Fixed on top of modal */}
        <div className="p-6 md:p-10 text-center bg-white border-b border-zinc-50 flex-shrink-0">
          <div className="w-12 h-1 bg-zinc-200 rounded-full mx-auto mb-6 md:hidden"></div>
          <div className="inline-block bg-blue-50 text-[#0088cc] px-4 py-1 rounded-full text-[9px] font-syncopate font-bold tracking-widest mb-3 uppercase">Registration</div>
          <h2 className="text-xl md:text-3xl font-syncopate font-bold text-zinc-900 tracking-tighter mb-1">กรอกข้อมูลรับรางวัล</h2>
          <p className="text-[#0088cc] text-sm md:text-lg font-black italic">คุณได้รับ: {prize.label}</p>
        </div>

        {/* Scrollable Form Body - Mobile Optimized */}
        <div className="p-6 md:p-12 overflow-y-auto flex-grow custom-scrollbar space-y-8 pb-32 md:pb-12">
          <form className="space-y-8">
            
            {/* Identity */}
            <div className="space-y-5">
              <div className="flex items-center gap-3">
                <span className="w-7 h-7 rounded-full bg-zinc-900 text-[#00f3ff] flex items-center justify-center text-[10px] font-bold">01</span>
                <h4 className="text-[10px] font-syncopate font-bold tracking-widest text-zinc-400 uppercase">ข้อมูลเบื้องต้น</h4>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-zinc-400 uppercase ml-1">ชื่อ - นามสกุล</label>
                  <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="ระบุชื่อจริงและนามสกุล" className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-4 md:px-6 md:py-5 focus:border-[#0088cc] outline-none transition-all font-semibold text-sm" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-zinc-400 uppercase ml-1">Gmail / อีเมล</label>
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="example@gmail.com" className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-4 md:px-6 md:py-5 focus:border-[#0088cc] outline-none transition-all font-semibold text-sm" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-zinc-400 uppercase ml-1">เบอร์โทรศัพท์</label>
                  <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="081-XXX-XXXX" className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-4 md:px-6 md:py-5 focus:border-[#0088cc] outline-none transition-all font-mono font-bold text-sm" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-zinc-400 uppercase ml-1">อาชีพปัจจุบัน</label>
                  <input type="text" value={occupation} onChange={(e) => setOccupation(e.target.value)} placeholder="เช่น พนักงานบริษัท" className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-4 md:px-6 md:py-5 focus:border-[#0088cc] outline-none transition-all font-semibold text-sm" />
                </div>
              </div>
            </div>

            {/* Demographics */}
            <div className="space-y-5">
              <div className="flex items-center gap-3">
                <span className="w-7 h-7 rounded-full bg-zinc-900 text-[#00f3ff] flex items-center justify-center text-[10px] font-bold">02</span>
                <h4 className="text-[10px] font-syncopate font-bold tracking-widest text-zinc-400 uppercase">ข้อมูลเชิงลึก</h4>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                <div className="relative group">
                  <label className="text-[10px] font-bold text-zinc-400 uppercase ml-1 mb-1.5 block">วันเดือนปีเกิด</label>
                  <input type="date" value={dob} onChange={(e) => setDob(e.target.value)} className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-4 md:px-6 md:py-5 focus:border-[#0088cc] outline-none transition-all font-semibold text-sm cursor-pointer" />
                  {age !== null && <span className="absolute right-4 bottom-4 bg-zinc-900 text-[#00f3ff] text-[8px] px-2 py-1 rounded-md font-black">อายุ {age} ปี</span>}
                </div>
                <div>
                  <label className="text-[10px] font-bold text-zinc-400 uppercase ml-1 mb-1.5 block">เพศ</label>
                  <select value={gender} onChange={(e) => setGender(e.target.value)} className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-4 md:px-6 md:py-5 outline-none font-semibold text-sm cursor-pointer appearance-none">
                    <option value="">เลือกเพศ</option>
                    <option value="ชาย">ชาย</option>
                    <option value="หญิง">หญิง</option>
                    <option value="LGBTQ+">LGBTQ+</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] font-bold text-zinc-400 uppercase ml-1 mb-1.5 block">ศาสนา</label>
                  <select value={religion} onChange={(e) => setReligion(e.target.value)} className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-4 md:px-6 md:py-5 outline-none font-semibold text-sm cursor-pointer appearance-none">
                    <option value="">เลือกศาสนา</option>
                    <option value="พุทธ">พุทธ</option>
                    <option value="คริสต์">คริสต์</option>
                    <option value="อิสลาม">อิสลาม</option>
                    <option value="อื่นๆ">อื่นๆ</option>
                  </select>
                </div>
              </div>

              {/* Body Sizing - Touch Friendly Buttons */}
              <div className="grid grid-cols-1 gap-6 pt-4">
                <div className="space-y-3">
                  <label className="text-[10px] font-bold text-zinc-400 uppercase ml-1">ไซส์เสื้อที่ใส่ประจำ</label>
                  <div className="grid grid-cols-4 md:grid-cols-7 gap-2">
                    {SIZES.map(s => (
                      <button key={s} type="button" onClick={() => setSize(s)} className={`py-4 rounded-xl text-xs font-black transition-all border ${size === s ? 'bg-zinc-900 border-zinc-900 text-[#00f3ff] shadow-lg' : 'bg-slate-50 border-transparent text-zinc-400'}`}>
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-bold text-zinc-400 uppercase ml-1">ทรงเสื้อที่ชอบ</label>
                  <div className="flex gap-2">
                    {STYLES.map(s => (
                      <button key={s} type="button" onClick={() => setStyle(s as any)} className={`flex-1 py-4 px-2 rounded-xl text-[10px] font-bold transition-all border ${style === s ? 'bg-[#0088cc] border-[#0088cc] text-white shadow-lg' : 'bg-slate-50 border-transparent text-zinc-400'}`}>
                        {s.toUpperCase()}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Address */}
            <div className="space-y-5">
              <div className="flex items-center gap-3">
                <span className="w-7 h-7 rounded-full bg-zinc-900 text-[#00f3ff] flex items-center justify-center text-[10px] font-bold">03</span>
                <h4 className="text-[10px] font-syncopate font-bold tracking-widest text-zinc-400 uppercase">ที่อยู่สำหรับการจัดส่ง</h4>
              </div>
              <textarea rows={3} value={address} onChange={(e) => setAddress(e.target.value)} placeholder="เลขที่บ้าน, ซอย, ถนน, แขวง, เขต, จังหวัด..." className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-4 md:px-6 md:py-5 focus:border-[#0088cc] outline-none transition-all font-semibold text-sm resize-none" />
            </div>

            {/* Consent */}
            <div className="pt-6 border-t border-zinc-50">
              <label className="flex items-start gap-3 p-4 bg-blue-50/30 rounded-2xl cursor-pointer">
                <input type="checkbox" className="mt-0.5 w-5 h-5 rounded-md accent-[#0088cc]" checked={consentTerms} onChange={(e) => setConsentTerms(e.target.checked)} />
                <span className="text-[10px] leading-relaxed text-zinc-500 font-medium">
                  ยินยอมให้ Yuedpao Labs เก็บข้อมูลส่วนบุคคลตามนโยบาย PDPA เพื่อการพัฒนาสินค้าและการจัดส่งรางวัล
                </span>
              </label>
            </div>
          </form>
        </div>

        {/* Action Button - Floating on Mobile */}
        <div className="absolute bottom-0 left-0 w-full p-6 md:p-10 border-t border-zinc-50 bg-white md:relative flex-shrink-0">
          <button onClick={handleSubmit} className="w-full btn-chrome text-white font-syncopate font-bold py-5 md:py-7 rounded-xl md:rounded-[2rem] uppercase tracking-[0.3em] text-[11px] md:text-sm shadow-xl active:scale-95 transition-all">
            ยืนยันข้อมูลและส่ง
          </button>
        </div>
      </div>
    </div>
  );
};

export default DataModal;
