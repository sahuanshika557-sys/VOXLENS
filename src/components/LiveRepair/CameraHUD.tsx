import React, { useState, useRef, useEffect } from 'react';
import { 
  Camera, 
  Upload, 
  Scan, 
  AlertCircle,
  Eye,
  Video,
  Sparkles,
  Thermometer,
  Wind,
  Cpu,
  ShieldAlert
} from 'lucide-react';
import { Equipment, VoiceState } from '../../types';
import { soundEngine } from '../../utils/soundEngine';
import { AIOrb } from '../common/AIOrb';

interface CameraHUDProps {
  equipment: Equipment;
  onDetectFault: (errorCode: string) => void;
  isScanning: boolean;
  onTriggerScan: () => void;
  onCaptureFrame?: (dataUrl: string) => void;
  onImageUploaded?: (dataUrl: string) => void;
  voiceState?: VoiceState;
}

export const CameraHUD: React.FC<CameraHUDProps> = ({
  equipment,
  onDetectFault,
  isScanning,
  onTriggerScan,
  onCaptureFrame,
  onImageUploaded,
  voiceState = 'IDLE'
}) => {
  const [useWebcam, setUseWebcam] = useState<boolean>(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [showOverlays, setShowOverlays] = useState<boolean>(true);
  const [webcamError, setWebcamError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // 4 Industrial Detection Overlays (Section 3)
  const keyOverlays = [
    {
      id: 'ov-e17',
      code: 'E17',
      label: 'ERROR CODE',
      sublabel: '96% CONFIDENCE',
      x: 10,
      y: 14,
      width: 34,
      height: 28,
      severity: 'critical' as const,
      onClick: () => onDetectFault('E17')
    },
    {
      id: 'ov-thermal',
      code: '88.4°C',
      label: 'THERMAL HOTSPOT',
      sublabel: 'LIMIT: 75.0°C EXCEEDED',
      x: 48,
      y: 52,
      width: 38,
      height: 28,
      severity: 'warning' as const
    },
    {
      id: 'ov-airflow',
      code: '1.2 L/M',
      label: 'AIRFLOW',
      sublabel: 'RESTRICTION WARNING',
      x: 52,
      y: 16,
      width: 34,
      height: 24,
      severity: 'warning' as const
    },
    {
      id: 'ov-motor',
      code: 'TB-2',
      label: 'MOTOR TERMINAL',
      sublabel: 'INSPECTION ATTENTION',
      x: 12,
      y: 56,
      width: 32,
      height: 24,
      severity: 'normal' as const
    }
  ];

  useEffect(() => {
    let stream: MediaStream | null = null;
    if (useWebcam) {
      setWebcamError(null);
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: { width: { ideal: 1920 }, height: { ideal: 1080 } } })
          .then((s) => {
            stream = s;
            if (videoRef.current) {
              videoRef.current.srcObject = s;
              videoRef.current.play();
            }
          })
          .catch(() => {
            setWebcamError('Camera access unavailable. Reverted to simulated equipment feed.');
            setUseWebcam(false);
          });
      } else {
        setWebcamError('Camera API unsupported in this browser. Showing simulated equipment feed.');
        setUseWebcam(false);
      }
    } else {
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
        tracks.forEach(t => t.stop());
        videoRef.current.srcObject = null;
      }
    }

    return () => {
      if (stream) {
        stream.getTracks().forEach(t => t.stop());
      }
    };
  }, [useWebcam]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        setUploadedImage(result);
        setUseWebcam(false);
        soundEngine.playScanPing();
        onTriggerScan();
        if (onImageUploaded) onImageUploaded(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCaptureFrame = () => {
    soundEngine.playScanPing();
    if (useWebcam && videoRef.current) {
      try {
        const canvas = document.createElement('canvas');
        canvas.width = videoRef.current.videoWidth || 1280;
        canvas.height = videoRef.current.videoHeight || 720;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
          const dataUrl = canvas.toDataURL('image/jpeg');
          setUploadedImage(dataUrl);
          setUseWebcam(false);
          if (onCaptureFrame) onCaptureFrame(dataUrl);
        }
      } catch {
        onTriggerScan();
      }
    } else {
      onTriggerScan();
    }
  };

  const imageSrc = uploadedImage || 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1600&q=85';

  const orbState = isScanning ? 'scanning' : voiceState === 'LISTENING' ? 'listening' : voiceState === 'PROCESSING' ? 'processing' : 'idle';

  return (
    <div className="flex flex-col h-full bg-[#060B16] rounded-3xl border border-white/[0.1] overflow-hidden shadow-2xl relative min-h-[580px]">
      {/* Hero Machine Header (Section 3) */}
      <div className="px-6 py-4 border-b border-white/[0.08] flex items-center justify-between bg-[#080F1E]/95 backdrop-blur-md">
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-2xl bg-[#00F0FF]/15 border border-[#00F0FF]/30 flex items-center justify-center text-[#00F0FF] shadow-lg shadow-[#00F0FF]/10">
            <Cpu className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2.5">
              <h2 className="text-base sm:text-lg font-black text-white tracking-wide font-sans">
                LINE 3 PACKAGING UNIT
              </h2>
              <span className="flex items-center gap-1.5 text-xs text-emerald-400 font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 font-mono">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                ● LIVE
              </span>
            </div>
            <div className="text-xs text-slate-400 font-mono mt-0.5">
              <span className="text-[#00F0FF] font-bold">VX-420</span> · S/N DEMO-420-0192 · Assembly Sector 4
            </div>
          </div>
        </div>

        {/* AI Status Orb Banner (Section 4) */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2.5 px-3.5 py-1.5 rounded-2xl bg-[#030712]/80 border border-white/[0.08]">
            <AIOrb state={orbState} size="sm" />
            <div className="text-left">
              <div className="text-[10px] font-mono font-black text-[#00F0FF] tracking-widest uppercase">
                VOXLENS AI
              </div>
              <div className="text-[11px] font-mono text-slate-300 font-bold">
                {isScanning ? 'SCANNING MACHINE' : voiceState === 'LISTENING' ? 'LISTENING TO TECH' : 'ANALYZING MACHINE'}
              </div>
            </div>
          </div>

          <button
            onClick={() => setShowOverlays(!showOverlays)}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold flex items-center gap-1.5 transition-colors cursor-pointer ${
              showOverlays ? 'text-[#00F0FF] bg-[#00F0FF]/15 border border-[#00F0FF]/30' : 'text-slate-500 hover:text-slate-300 bg-white/[0.04]'
            }`}
            title="Toggle Overlays"
          >
            <Eye className="w-4 h-4" />
            <span className="hidden md:inline">{showOverlays ? 'OVERLAYS ON' : 'OVERLAYS OFF'}</span>
          </button>
        </div>
      </div>

      {webcamError && (
        <div className="bg-amber-950/70 text-amber-200 text-xs px-4 py-2.5 border-b border-amber-800/40 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-amber-400" />
            <span>{webcamError}</span>
          </div>
          <button
            onClick={() => setWebcamError(null)}
            className="text-xs text-amber-400 hover:underline font-mono font-bold"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Hero Machine Feed Container */}
      <div className="relative flex-1 bg-black flex items-center justify-center overflow-hidden min-h-[460px]">
        {/* Subtle technical grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none z-10" />

        {/* Radar Scanning Line */}
        {isScanning && (
          <>
            <div className="radar-sweep z-20" />
            <div className="absolute inset-0 bg-[#00F0FF]/15 backdrop-blur-[2px] flex items-center justify-center pointer-events-none z-30">
              <div className="bg-[#030712]/95 border-2 border-[#00F0FF] px-8 py-4 rounded-3xl text-sm font-mono font-black text-[#00F0FF] flex items-center gap-3 shadow-2xl">
                <Scan className="w-6 h-6 animate-spin" />
                <span>AI COMPUTER VISION · SCANNING OPTICAL READOUT &amp; THERMAL MATRIX...</span>
              </div>
            </div>
          </>
        )}

        {useWebcam ? (
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="w-full h-full object-cover"
          />
        ) : (
          <img
            src={imageSrc}
            alt="Equipment feed"
            className="w-full h-full object-cover"
          />
        )}

        {/* Large, Clean Industrial Overlays (Section 3) */}
        {showOverlays && keyOverlays.map((ov) => {
          const isCritical = ov.severity === 'critical';
          const isWarning = ov.severity === 'warning';

          const borderColor = isCritical
            ? 'border-red-500 bg-red-950/75 ring-4 ring-red-500/30'
            : isWarning
              ? 'border-amber-400 bg-amber-950/75 ring-4 ring-amber-400/30'
              : 'border-[#00F0FF] bg-[#030712]/85 ring-4 ring-[#00F0FF]/30';

          const tagBg = isCritical
            ? 'bg-red-500 text-white'
            : isWarning
              ? 'bg-amber-500 text-slate-950'
              : 'bg-[#00F0FF] text-slate-950';

          return (
            <div
              key={ov.id}
              onClick={ov.onClick}
              style={{
                left: `${ov.x}%`,
                top: `${ov.y}%`,
                width: `${ov.width}%`,
                height: `${ov.height}%`
              }}
              className={`absolute border-2 rounded-3xl ${borderColor} cursor-pointer transition-all duration-300 hover:scale-[1.03] p-4 flex flex-col justify-between backdrop-blur-md z-20 shadow-2xl`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className={`text-xl sm:text-2xl font-mono font-black px-3 py-1 rounded-xl shadow-md ${tagBg}`}>
                    {ov.code}
                  </span>
                  <span className="text-xs font-bold text-slate-100 tracking-wider font-mono">
                    {ov.label}
                  </span>
                </div>
                {isCritical && (
                  <span className="w-3.5 h-3.5 rounded-full bg-red-500 animate-ping" />
                )}
              </div>
              <span className="text-xs font-mono font-black text-slate-100 bg-black/90 px-3 py-1 rounded-xl self-start border border-white/[0.15] shadow-sm">
                {ov.sublabel}
              </span>
            </div>
          );
        })}
      </div>

      {/* Bottom Controls Bar */}
      <div className="p-4 border-t border-white/[0.08] bg-[#080F1E]/95 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => {
              setUseWebcam(!useWebcam);
              soundEngine.playMicOn();
            }}
            className={`px-4 py-2.5 rounded-xl text-xs font-mono font-bold flex items-center gap-2 transition-colors cursor-pointer shadow-sm ${
              useWebcam
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                : 'bg-white/[0.06] text-slate-200 hover:bg-white/[0.1]'
            }`}
            title={useWebcam ? 'Switch to Demo Feed' : 'Enable Camera'}
          >
            {useWebcam ? <Video className="w-4 h-4" /> : <Camera className="w-4 h-4" />}
            <span>{useWebcam ? 'Live Stream' : 'Live Camera'}</span>
          </button>

          <button
            onClick={() => fileInputRef.current?.click()}
            className="px-4 py-2.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] text-slate-200 text-xs font-mono font-bold flex items-center gap-2 transition-colors cursor-pointer shadow-sm"
            title="Upload JPG/PNG image"
          >
            <Upload className="w-4 h-4 text-[#00F0FF]" />
            <span>Upload Image</span>
          </button>
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileUpload} 
            accept="image/png, image/jpeg, image/jpg, image/webp" 
            className="hidden" 
          />

          {useWebcam && (
            <button
              onClick={handleCaptureFrame}
              className="px-4 py-2.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] text-slate-200 text-xs font-mono font-bold flex items-center gap-2 transition-colors cursor-pointer shadow-sm"
              title="Capture snapshot frame"
            >
              <Camera className="w-4 h-4 text-emerald-400" />
              <span>Capture Frame</span>
            </button>
          )}
        </div>

        <button
          onClick={() => {
            soundEngine.playScanPing();
            onTriggerScan();
          }}
          disabled={isScanning}
          className="btn-primary py-2.5 px-6 rounded-xl text-xs font-mono font-black tracking-wider flex items-center gap-2 transition-all cursor-pointer shadow-lg hover:scale-105"
        >
          <Scan className={`w-4 h-4 ${isScanning ? 'animate-spin' : ''}`} />
          <span>{isScanning ? 'SCANNING...' : uploadedImage ? 'ANALYZE IMAGE' : 'SCAN MACHINE'}</span>
        </button>
      </div>
    </div>
  );
};
