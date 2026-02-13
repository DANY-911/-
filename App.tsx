
import React, { useState, useEffect, useCallback } from 'react';
import SpinWheel from './components/SpinWheel';
import DataModal from './components/DataModal';
import { GameState, Prize, UserPreference } from './types';
import { PRIZES, SIZES, STYLES } from './constants';

const App: React.FC = () => {
  // ตั้งค่า Default ทันทีเพื่อให้แสดงผลหน้าเว็บได้เลย
  const [config, setConfig] = useState<any>({
    prizes: PRIZES,
    sizes: SIZES,
    styles: STYLES,
    rewardCode: "ULTRA2026",
    brandName: "YUEDPAO"
  });
  
  const [gameState, setGameState] = useState<GameState>(GameState.IDLE);
  const [winningPrize, setWinningPrize] = useState<Prize | null>(null);
  const [rotation, setRotation] = useState(0);
  const [showCookieConsent, setShowCookieConsent] = useState(false);

  // อัปเดตข้อมูลจาก JSON ภายหลัง (ถ้ามี)
  useEffect(() => {
    fetch('./data.json')
      .then(res => res.json())
      .then(data => setConfig(prev => ({ ...prev, ...data })))
      .catch(() => console.log("Using internal constants"));

    const consent = localStorage.getItem('yuedpao-cookie-consent');
    if (!consent) {
      setShowCookieConsent(true);
    }
  }, []);

  const handleSpinStart = () => {
    if (gameState !== GameState.IDLE) return;
    setGameState(GameState.SPINNING);
    
    const prizes = config.prizes;
    const randomIndex = Math.floor(Math.random() * prizes.length);
    const prize = prizes[randomIndex];
    const sliceAngle = 360 / prizes.length;
    const extraSpins = 10; 
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
    setGameState(GameState.SUCCESS);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(config.rewardCode);
    alert(`คัดลอกรหัส ${config.rewardCode} แล้ว!`);
  };

  const acceptCookies = () => {
    localStorage.setItem('yuedpao-cookie-consent', 'true');
    setShowCookieConsent(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-[#00f3ff] selection:text-white overflow-x-hidden scroll-smooth">
      <div className="fixed inset-0 bg-[linear-gradient(rgba(0,136,204,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,136,204,0.02)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none z-0"></div>

      <nav className="fixed top-0 left-0 w-full z-50 px-6 py-4 md:px-12 md:py-8 flex justify-between items-center backdrop-blur-xl bg-white/70 border-b border-zinc-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-black flex items-center justify-center font-syncopate font-bold text-white rounded-xl shadow-lg">Y</div>
          <h1 className="font-syncopate text-xl md:text-2xl font-bold tracking-[0.3em] text-zinc-900 uppercase">
            YU<span className="text-[#0088cc]">ED</span>PAO
          </h1>
        </div>
      </nav>

      <main className="relative z-10 pt-32 md:pt-52 pb-24 px-4 max-w-7xl mx-auto flex flex-col items-center">
        
        <section className="text-center mb-32 md:mb-52">
          <div className="mb-8 inline-flex items-center gap-3 px-6 py-2 bg-zinc-900 rounded-full shadow-xl border border-zinc-800">
              <span className="w-2 h-2 rounded-full bg-[#00f3ff] animate-ping"></span>
              <span className="text-[9px] md:text-[11px] font-syncopate font-bold tracking-[0.4em] text-white uppercase">Future Research 2026</span>
          </div>
          <h2 className="text-6xl md:text-[12rem] font-syncopate font-bold uppercase leading-[0.9] tracking-tighter mb-12">
            หมุนสุ่ม <br/>
            <span className="neon-blue italic">สไตล์</span>
          </h2>
          <p className="text-zinc-400 max-w-3xl mx-auto mb-16 text-base md:text-2xl font-light leading-relaxed px-4">
            ร่วมออกแบบมาตรฐาน <span className="text-zinc-900 font-bold">"ความพอดี"</span> สำหรับคนไทยในอนาคต พร้อมรับรางวัลทันที
          </p>
          <a href="#game" className="inline-block btn-chrome px-12 py-6 rounded-full font-syncopate font-bold text-sm tracking-[0.4em] uppercase shadow-2xl">
            เริ่มร่วมสนุก
          </a>
        </section>

        <section id="game" className="w-full flex flex-col items-center py-24 md:py-40 mb-32 relative bg-white rounded-[4rem] border border-zinc-100 shadow-2xl">
          <div className="scale-75 sm:scale-90 md:scale-100">
            <SpinWheel rotation={rotation} />
          </div>
          <div className="mt-16 md:mt-32 w-full max-w-md px-6">
             <button onClick={handleSpinStart} disabled={gameState !== GameState.IDLE} className="w-full btn-chrome py-7 md:py-9 rounded-2xl md:rounded-full font-syncopate font-bold text-white uppercase tracking-[0.4em] shadow-2xl disabled:opacity-30">
                {gameState === GameState.SPINNING ? 'กำลังสุ่ม...' : 'เริ่มหมุนวงล้อ'}
             </button>
          </div>
        </section>

      </main>

      {showCookieConsent && (
        <div className="fixed inset-x-0 bottom-0 z-[100] p-4 md:p-8 animate-in fade-in slide-in-from-bottom-full duration-700">
          <div className="max-w-6xl mx-auto bg-white/95 backdrop-blur-2xl border border-zinc-200 shadow-2xl rounded-[2.5rem] p-8 md:p-14 flex flex-col lg:flex-row items-center gap-10">
            <div className="flex-grow space-y-4 text-center lg:text-left">
              <h2 className="text-2xl font-bold text-zinc-900 font-syncopate uppercase">Privacy First</h2>
              <p className="text-zinc-500 text-sm md:text-lg">ข้อมูลของคุณจะถูกใช้เพื่อการวิจัยสรีระตามมาตรฐาน PDPA เท่านั้น</p>
            </div>
            <button onClick={acceptCookies} className="w-full lg:w-auto bg-zinc-900 text-white font-syncopate font-bold px-12 py-6 rounded-2xl uppercase tracking-widest text-xs">ยอมรับ</button>
          </div>
        </div>
      )}

      {gameState === GameState.COLLECTING_DATA && winningPrize && (
        <DataModal prize={winningPrize} onSubmit={handleFormSubmit} />
      )}

      {gameState === GameState.SUCCESS && winningPrize && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-white/95 backdrop-blur-3xl animate-in fade-in zoom-in duration-500">
          <div className="w-full max-w-2xl text-center bg-white p-10 md:p-24 rounded-[4rem] shadow-2xl border border-zinc-100">
            <div className="w-28 h-28 md:w-44 md:h-44 bg-gradient-to-br from-[#00f3ff] to-[#0088cc] rounded-[2.5rem] mx-auto flex items-center justify-center mb-10 shadow-xl animate-bounce-slow">
              <svg className="w-14 h-14 md:w-24 md:h-24 text-white" fill="none" stroke="currentColor" strokeWidth="4" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"></path></svg>
            </div>
            <h2 className="text-4xl md:text-7xl font-syncopate font-bold mb-8 uppercase tracking-tighter">สำเร็จ!</h2>
            <p className="text-zinc-500 mb-12 text-sm md:text-2xl">รางวัล: <span className="text-[#0088cc] font-black italic underline">{winningPrize.label}</span></p>
            <div onClick={copyToClipboard} className="bg-slate-50 border-2 border-dashed border-zinc-200 p-8 rounded-[2.5rem] mb-12 cursor-pointer hover:border-[#0088cc] transition-all group relative">
                <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-zinc-900 px-8 py-2 rounded-full text-[10px] text-[#00f3ff] font-syncopate font-black uppercase tracking-widest">REWARD_CODE</span>
                <p className="text-2xl md:text-4xl font-mono font-bold tracking-[0.5em] text-zinc-900">{config.rewardCode}</p>
                <p className="mt-2 text-[8px] text-zinc-400 font-syncopate uppercase tracking-widest">Click to copy</p>
            </div>
            <button onClick={() => setGameState(GameState.IDLE)} className="btn-chrome w-full py-6 rounded-2xl font-syncopate font-bold uppercase tracking-widest text-xs">กลับสู่หน้าหลัก</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
