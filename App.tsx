
import React, { useState, useEffect } from 'react';
import SpinWheel from './components/SpinWheel';
import DataModal from './components/DataModal';
import { GameState, Prize, UserPreference } from './types';
import { PRIZES } from './constants';

const CookieConsent: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showFullDetails, setShowFullDetails] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('yuedpao-cookie-consent');
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('yuedpao-cookie-consent', 'true');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-[100] p-4 md:p-10 animate-in fade-in slide-in-from-bottom-full duration-700">
      <div className="max-w-5xl mx-auto bg-white border border-zinc-200 shadow-[0_-30px_80px_rgba(0,0,0,0.12)] rounded-[2.5rem] md:rounded-[3.5rem] overflow-hidden">
        <div className="p-6 md:p-12">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-14 items-start">
            
            <div className="flex-shrink-0 flex flex-col items-center lg:items-start text-center lg:text-left">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-blue-50 rounded-[2rem] flex items-center justify-center mb-4">
                <svg className="w-8 h-8 md:w-10 md:h-10 text-[#0088cc]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                </svg>
              </div>
              <h4 className="font-syncopate text-[10px] font-black tracking-[0.3em] text-[#0088cc] uppercase mb-1">Privacy Guarantee</h4>
              <h2 className="text-zinc-900 text-xl md:text-3xl font-bold tracking-tight">ความโปร่งใสคือหัวใจของเรา</h2>
            </div>
            
            <div className="flex-grow space-y-5">
              <p className="text-zinc-600 text-sm md:text-lg leading-relaxed">
                Yuedpao Labs ให้ความสำคัญกับข้อมูลของคุณ เราจัดเก็บข้อมูลเพื่อใช้ใน <span className="font-bold text-zinc-900">การวิจัยสรีระ (Sizing Research)</span> สำหรับคอลเลกชันปี 2026 ข้อมูลของคุณจะไม่ถูกจำหน่ายต่อให้บุคคลภายนอกอย่างเด็ดขาด
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-start gap-3 p-4 bg-zinc-50 rounded-2xl">
                  <div className="w-5 h-5 bg-[#0088cc]/10 text-[#0088cc] rounded-full flex-shrink-0 flex items-center justify-center mt-0.5">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/><path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"/></svg>
                  </div>
                  <div>
                    <p className="text-[11px] font-bold text-zinc-900">ใช้เพื่อวิจัยเท่านั้น</p>
                    <p className="text-[10px] text-zinc-400">พัฒนาไซส์เสื้อผ้าให้พอดีคนไทย</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 bg-zinc-50 rounded-2xl">
                  <div className="w-5 h-5 bg-green-500/10 text-green-600 rounded-full flex-shrink-0 flex items-center justify-center mt-0.5">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"/></svg>
                  </div>
                  <div>
                    <p className="text-[11px] font-bold text-zinc-900">ปลอดภัยสูงสุด</p>
                    <p className="text-[10px] text-zinc-400">เก็บรักษาด้วยระบบความปลอดภัยสูง</p>
                  </div>
                </div>
              </div>

              <div className="flex justify-center lg:justify-start">
                <button 
                  onClick={() => setShowFullDetails(!showFullDetails)}
                  className="text-[10px] font-bold text-[#0088cc] hover:underline flex items-center gap-2"
                >
                  รายละเอียดนโยบายฉบับเต็ม
                  <svg className={`w-3 h-3 transition-transform ${showFullDetails ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </button>
              </div>

              {showFullDetails && (
                <div className="p-5 bg-zinc-50 rounded-2xl text-[10px] text-zinc-400 leading-relaxed border border-zinc-100 animate-in fade-in slide-in-from-top-2">
                  ข้อมูลที่จัดเก็บ: ชื่อ-นามสกุล, เบอร์โทรศัพท์, อีเมล, วันเกิด, เพศ, ศาสนา, อาชีพ และสัดส่วนสรีระ | วัตถุประสงค์: เพื่อวิเคราะห์ข้อมูลเชิงลึกในโปรเจกต์ Ultra Flow 2026 และการจัดส่งของรางวัลเท่านั้น | ระยะเวลาเก็บรักษา: 2 ปี หรือจนกว่ากิจกรรมจะเสร็จสิ้น
                </div>
              )}
            </div>

            <div className="flex flex-col gap-3 w-full lg:w-[280px]">
              <button 
                onClick={handleAccept}
                className="w-full bg-zinc-900 text-white text-[11px] font-syncopate font-bold py-5 md:py-6 rounded-2xl hover:bg-black transition-all active:scale-95 shadow-xl shadow-zinc-200 uppercase tracking-widest"
              >
                ยอมรับและเริ่มหมุน
              </button>
              <button 
                onClick={() => setIsVisible(false)}
                className="w-full border border-zinc-100 text-zinc-400 text-[10px] font-syncopate font-bold py-4 rounded-2xl hover:bg-zinc-50 transition-all uppercase tracking-widest"
              >
                ไม่ยินยอม
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>(GameState.IDLE);
  const [winningPrize, setWinningPrize] = useState<Prize | null>(null);
  const [rotation, setRotation] = useState(0);
  const [userSelection, setUserSelection] = useState<UserPreference | null>(null);

  const handleSpinStart = () => {
    if (gameState !== GameState.IDLE) return;
    setGameState(GameState.SPINNING);
    
    const randomIndex = Math.floor(Math.random() * PRIZES.length);
    const prize = PRIZES[randomIndex];
    const sliceAngle = 360 / PRIZES.length;
    const extraSpins = 8 + Math.floor(Math.random() * 4);
    const targetRotation = (extraSpins * 360) + (360 - (randomIndex * sliceAngle)) - (sliceAngle / 2);
    
    setRotation(targetRotation);

    setTimeout(() => {
      setWinningPrize(prize);
      setGameState(GameState.WON);
      setTimeout(() => {
        setGameState(GameState.COLLECTING_DATA);
      }, 1800);
    }, 6000);
  };

  const handleFormSubmit = (data: UserPreference) => {
    setUserSelection(data);
    setGameState(GameState.SUCCESS);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText('ULTRA2026');
    alert('คัดลอกรหัส ULTRA2026 แล้ว!');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-[#00f3ff] selection:text-white overflow-x-hidden">
      <div className="fixed inset-0 bg-[linear-gradient(rgba(0,136,204,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,136,204,0.02)_1px,transparent_1px)] bg-[size:30px_30px] md:bg-[size:60px_60px] pointer-events-none"></div>

      <nav className="fixed top-0 left-0 w-full z-40 px-4 py-4 md:px-8 md:py-6 flex justify-between items-center backdrop-blur-xl bg-white/80 border-b border-zinc-100">
        <div className="flex items-center gap-2 md:gap-3 cursor-pointer">
          <div className="w-8 h-8 md:w-10 md:h-10 bg-black flex items-center justify-center font-syncopate font-bold text-white rounded-lg md:rounded-xl shadow-lg">Y</div>
          <h1 className="font-syncopate text-base md:text-2xl font-bold tracking-[0.2em] md:tracking-[0.4em] text-zinc-900">
            YU<span className="text-[#0088cc]">ED</span>PAO
          </h1>
        </div>
        <div className="hidden sm:flex items-center gap-4">
           <div className="text-[8px] md:text-[10px] font-syncopate font-bold text-[#0088cc] px-4 py-2 bg-blue-50 rounded-full tracking-widest border border-blue-100 uppercase animate-pulse">LUCKY_SPIN_MOBILE</div>
        </div>
      </nav>

      <main className="relative pt-24 md:pt-44 pb-12 md:pb-24 px-4 md:px-6 max-w-6xl mx-auto flex flex-col items-center text-center">
        
        <div className="mb-6 md:mb-10 inline-flex items-center gap-2 px-5 py-2 md:px-8 md:py-3 bg-zinc-900 rounded-full shadow-lg border border-zinc-800">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00f3ff] animate-pulse"></span>
            <span className="text-[8px] md:text-[11px] font-syncopate font-bold tracking-[0.2em] md:tracking-[0.4em] text-white">FUTURE RESEARCH 2026</span>
        </div>
        
        <h2 className="text-5xl md:text-[10rem] font-syncopate font-bold uppercase leading-tight tracking-tighter mb-8 md:mb-12">
          หมุนสุ่ม <br/>
          <span className="neon-blue italic">ดวง</span>
        </h2>
        
        <p className="text-zinc-500 max-w-2xl mb-12 md:mb-28 text-sm md:text-2xl font-light leading-relaxed px-2">
          ร่วมทำแบบสำรวจเพื่อพัฒนาเสื้อผ้าที่ <span className="text-zinc-900 font-bold">"พอดีที่สุด"</span> สำหรับคุณ พร้อมลุ้นรับรางวัลพิเศษทันที
        </p>

        <section id="game" className="w-full flex flex-col items-center py-12 md:py-28 mb-12 md:mb-44 relative bg-white rounded-[3rem] md:rounded-[6rem] border border-zinc-200 shadow-[0_30px_100px_rgba(0,0,0,0.05)] overflow-hidden">
          <div className="scale-75 sm:scale-90 md:scale-100">
            <SpinWheel rotation={rotation} />
          </div>

          <div className="mt-12 md:mt-28 flex flex-col items-center gap-6 md:gap-12 w-full px-6">
             <button 
                onClick={handleSpinStart}
                disabled={gameState !== GameState.IDLE}
                className={`w-full md:w-auto btn-chrome px-8 md:px-28 py-6 md:py-10 rounded-2xl md:rounded-[3rem] font-syncopate font-bold text-white uppercase tracking-[0.3em] md:tracking-[0.6em] shadow-xl active:scale-95 disabled:opacity-40 text-sm md:text-xl`}
             >
                {gameState === GameState.SPINNING ? 'กำลังสุ่ม...' : 'เริ่มหมุนวงล้อ'}
             </button>
          </div>
        </section>

        <section className="w-full py-12 md:py-32 text-left grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-24 items-center border-t border-zinc-100">
            <div className="space-y-6 md:space-y-12">
              <div>
                <h4 className="text-[10px] md:text-[12px] font-syncopate font-bold text-[#0088cc] mb-3 md:mb-6 tracking-[0.4em]">THE_MISSION</h4>
                <h3 className="text-3xl md:text-7xl font-syncopate font-bold tracking-tighter mb-4 md:mb-10 leading-none">BEYOND <br className="hidden md:block"/> SIZING</h3>
                <p className="text-zinc-500 text-sm md:text-xl leading-relaxed font-light">
                  เราเชื่อว่าเสื้อผ้าที่ดีต้องไม่ได้มีแค่ S, M, L ข้อมูลของคุณจะช่วยให้เราสร้างสิ่งที่ <span className="text-zinc-900 font-bold">"พอดี"</span> และใส่สบายที่สุดในเมืองไทย
                </p>
              </div>
            </div>
            <div className="relative aspect-[4/3] md:aspect-square rounded-[2rem] md:rounded-[6rem] overflow-hidden bg-zinc-100 shadow-xl">
               <img 
                src="https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=1200&q=90" 
                className="w-full h-full object-cover grayscale brightness-110" 
               />
               <div className="absolute inset-0 bg-blue-500/10 mix-blend-multiply opacity-60"></div>
            </div>
        </section>
      </main>

      <CookieConsent />

      {gameState === GameState.COLLECTING_DATA && winningPrize && (
        <DataModal prize={winningPrize} onSubmit={handleFormSubmit} />
      )}

      {gameState === GameState.SUCCESS && winningPrize && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-white/95 backdrop-blur-3xl animate-in fade-in zoom-in duration-700">
          <div className="w-full max-w-2xl text-center bg-white p-8 md:p-20 rounded-[3.5rem] md:rounded-[5rem] shadow-[0_60px_160px_rgba(0,0,0,0.12)] border border-zinc-100 relative overflow-hidden group">
            
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#00f3ff] via-[#0088cc] to-[#00f3ff] animate-scanline-fast"></div>

            <div className="relative z-10">
              <div className="w-24 h-24 md:w-40 md:h-40 bg-gradient-to-br from-[#00f3ff] to-[#0088cc] rounded-[2.5rem] md:rounded-[3.5rem] mx-auto flex items-center justify-center mb-8 md:mb-12 shadow-[0_25px_60px_rgba(0,136,204,0.4)] animate-bounce-slow">
                  <svg className="w-12 h-12 md:w-24 md:h-24 text-white" fill="none" stroke="currentColor" strokeWidth="4" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"></path>
                  </svg>
              </div>

              <h4 className="text-[#0088cc] font-syncopate font-black text-[10px] md:text-xs tracking-[0.5em] mb-4 uppercase">CLAIM SECURED</h4>
              <h2 className="text-3xl md:text-7xl font-syncopate font-bold mb-6 md:mb-10 tracking-tighter text-zinc-900 uppercase leading-none">สำเร็จ! <br/> รับรางวัล</h2>
              
              <p className="text-zinc-500 mb-10 md:mb-16 text-sm md:text-2xl leading-relaxed font-light px-4">
                  ขอบคุณที่ร่วมเป็นส่วนหนึ่งของ Yuedpao Labs รางวัล <span className="text-[#0088cc] font-black italic underline decoration-2 decoration-offset-4">{winningPrize.label}</span> พร้อมสำหรับการใช้งานแล้ว
              </p>
              
              <div 
                  onClick={copyToClipboard}
                  className="bg-slate-50 border-4 border-dashed border-blue-100 p-8 md:p-12 rounded-[2.5rem] md:rounded-[4rem] mb-10 md:mb-16 relative cursor-pointer hover:bg-white hover:border-[#0088cc] transition-all shadow-inner group/code"
              >
                  <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-zinc-900 px-6 py-2 md:px-10 md:py-3 rounded-full text-[8px] md:text-[10px] text-[#00f3ff] font-syncopate font-black tracking-widest shadow-xl group-hover/code:scale-105 transition-transform">
                      REWARD_CODE
                  </span>
                  <p className="text-2xl md:text-5xl font-mono font-bold tracking-[0.3em] md:tracking-[0.5em] text-zinc-900 group-hover/code:text-[#0088cc] transition-colors">ULTRA2026</p>
                  <p className="mt-4 text-[9px] text-zinc-400 font-syncopate tracking-widest uppercase">Click to copy code</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-10 md:mb-16">
                 <button onClick={() => window.open('https://yuedpao.com', '_blank')} className="btn-chrome text-white font-syncopate font-bold py-6 md:py-8 rounded-2xl md:rounded-[2.5rem] uppercase tracking-widest text-xs md:text-sm shadow-xl hover:shadow-2xl">
                    SHOP ONLINE
                 </button>
                 <button onClick={() => setGameState(GameState.IDLE)} className="bg-zinc-50 text-zinc-400 font-syncopate font-bold py-6 md:py-8 rounded-2xl md:rounded-[2.5rem] uppercase tracking-widest text-[10px] md:text-sm hover:text-zinc-900 transition-colors">
                    BACK TO LAB
                 </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <footer className="relative border-t border-zinc-100 py-20 md:py-40 px-6 bg-white text-center">
          <h4 className="font-syncopate text-2xl md:text-6xl font-bold mb-4 md:mb-12 tracking-widest">YU<span className="text-[#0088cc]">ED</span>PAO</h4>
          <p className="text-zinc-400 text-[10px] md:text-lg max-w-xl mx-auto font-medium mb-12 md:mb-24">
            นวัตกรรมเสื้อยืดไทย สไตล์ระดับโลก
          </p>
          <div className="pt-8 border-t border-zinc-100">
              <p className="text-[8px] md:text-[12px] text-zinc-300 font-syncopate uppercase tracking-[0.4em]">© 2026 YUEDPAO STREETWEAR LABS</p>
          </div>
      </footer>
    </div>
  );
};

export default App;
