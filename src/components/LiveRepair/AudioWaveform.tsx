import React, { useEffect, useRef } from 'react';
import { VoiceState } from '../../types';

interface AudioWaveformProps {
  voiceState: VoiceState;
  height?: number;
}

export const AudioWaveform: React.FC<AudioWaveformProps> = ({ voiceState, height = 24 }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let phase = 0;

    const render = () => {
      const width = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, width, h);

      const barCount = 32;
      const barWidth = width / barCount - 2;

      for (let i = 0; i < barCount; i++) {
        let barHeight = 3; // Base idle height

        if (voiceState === 'LISTENING') {
          const freq = Math.sin((i / 4) + phase) * Math.cos((i / 8) - phase);
          barHeight = Math.max(3, Math.abs(freq) * (h * 0.85));
        } else if (voiceState === 'RESPONDING') {
          const freq = Math.sin((i / 3) + (phase * 1.5)) * Math.sin(phase * 0.8);
          barHeight = Math.max(3, Math.abs(freq) * (h * 0.75));
        } else if (voiceState === 'PROCESSING') {
          const wave = Math.sin((i / 2) + phase * 2);
          barHeight = Math.max(3, Math.abs(wave) * (h * 0.45));
        }

        const x = i * (barWidth + 2);
        const y = (h - barHeight) / 2;

        const gradient = ctx.createLinearGradient(0, y, 0, y + barHeight);
        if (voiceState === 'LISTENING') {
          gradient.addColorStop(0, '#22D3EE');
          gradient.addColorStop(1, '#0284C7');
        } else if (voiceState === 'RESPONDING') {
          gradient.addColorStop(0, '#10B981');
          gradient.addColorStop(1, '#059669');
        } else if (voiceState === 'PROCESSING') {
          gradient.addColorStop(0, '#F59E0B');
          gradient.addColorStop(1, '#D97706');
        } else {
          gradient.addColorStop(0, '#334155');
          gradient.addColorStop(1, '#1E293B');
        }

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.roundRect(x, y, barWidth, barHeight, [2]);
        ctx.fill();
      }

      phase += 0.08;
      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [voiceState]);

  return (
    <div className="w-full flex items-center justify-center bg-[#070B1A] rounded-xl px-2 py-0.5 border border-white/[0.04]">
      <canvas
        ref={canvasRef}
        width={240}
        height={height}
        className="w-full max-w-[280px]"
      />
    </div>
  );
};
