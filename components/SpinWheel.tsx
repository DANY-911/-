
import React, { useEffect, useRef, useCallback } from 'react';
import { PRIZES } from '../constants';

interface SpinWheelProps {
  rotation: number;
}

const SpinWheel: React.FC<SpinWheelProps> = ({ rotation }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const drawWheel = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const size = canvas.width;
    const center = size / 2;
    const radius = center - 40;
    const sliceAngle = (2 * Math.PI) / PRIZES.length;

    ctx.clearRect(0, 0, size, size);

    PRIZES.forEach((prize, i) => {
      const startAngle = i * sliceAngle - Math.PI / 2;
      const endAngle = startAngle + sliceAngle;
      
      ctx.beginPath();
      ctx.moveTo(center, center);
      ctx.arc(center, center, radius, startAngle, endAngle);
      
      let fillStyle = prize.color;
      if (prize.color === '#00f3ff') fillStyle = '#e0faff';
      else if (prize.color === '#0088cc') fillStyle = '#0088cc';
      else if (prize.color === '#000000') fillStyle = '#0f172a';
      else if (prize.color === '#1a1a1a') fillStyle = '#1e293b';
      else if (prize.color === '#333333') fillStyle = '#334155';
      
      ctx.fillStyle = fillStyle;
      ctx.fill();
      
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 5;
      ctx.stroke();

      // ข้อความรางวัล
      ctx.save();
      ctx.translate(center, center);
      ctx.rotate(startAngle + sliceAngle / 2);
      ctx.textAlign = 'right';
      
      const isDark = (fillStyle === '#0f172a' || fillStyle === '#1e293b' || fillStyle === '#334155' || fillStyle === '#0088cc');
      ctx.fillStyle = isDark ? '#ffffff' : '#0f172a';
      
      // ฟอนต์หนา 900 ตามคำขอ
      ctx.font = '900 38px "Inter", sans-serif'; 
      ctx.shadowColor = isDark ? 'rgba(0,0,0,0.5)' : 'rgba(255,255,255,0.5)';
      ctx.shadowBlur = 6;
      
      ctx.fillText(prize.label.toUpperCase(), radius - 50, 15);
      ctx.restore();
    });

    // ขอบนอก
    ctx.beginPath();
    ctx.arc(center, center, radius + 15, 0, 2 * Math.PI);
    ctx.strokeStyle = '#f1f5f9';
    ctx.lineWidth = 25;
    ctx.stroke();

    // จุดกึ่งกลาง
    ctx.beginPath();
    ctx.arc(center, center, 65, 0, 2 * Math.PI);
    ctx.fillStyle = '#ffffff';
    ctx.fill();
    ctx.strokeStyle = '#f8fafc';
    ctx.lineWidth = 10;
    ctx.stroke();

    ctx.fillStyle = '#0f172a';
    ctx.font = 'bold 55px Syncopate';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('Y', center, center);
    
  }, []);

  useEffect(() => {
    drawWheel();
  }, [drawWheel]);

  return (
    <div className="relative w-full max-w-[420px] mx-auto aspect-square group">
      <div className="absolute inset-[-40px] rounded-full bg-blue-100/20 -z-10 blur-3xl animate-pulse"></div>
      
      {/* ลูกศรชี้รางวัล (Top Pointer) */}
      <div className="absolute top-[-50px] left-1/2 -translate-x-1/2 z-40 flex flex-col items-center">
        <div className="w-16 h-16 bg-[#0088cc] rotate-45 border-b-[8px] border-r-[8px] border-white shadow-[0_20px_40px_rgba(0,136,204,0.5)]">
          <div className="absolute inset-0 bg-white/10"></div>
        </div>
      </div>

      <canvas
        ref={canvasRef}
        width={1000}
        height={1000}
        className="w-full h-full rounded-full transition-transform duration-[6000ms] cubic-bezier(0.1, 0, 0, 1) shadow-[0_60px_120px_rgba(0,0,0,0.15)] bg-white"
        style={{ transform: `rotate(${rotation}deg)` }}
      />
    </div>
  );
};

export default SpinWheel;
