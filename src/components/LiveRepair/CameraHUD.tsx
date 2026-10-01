import React, { useState, useRef, useEffect } from 'react';
import { 
  Camera, 
  Upload, 
  Scan, 
  AlertCircle,
  Eye,
  Video,
  Sparkles,
  RotateCcw,
  X,
  Layers,
  ShieldAlert,
  Info,
  CheckCircle2,
  Cpu
} from 'lucide-react';
import { Equipment, VoiceState, BoundingBox } from '../../types';
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
  boundingBoxes?: BoundingBox[];
  scenarioId?: string;
  onResetImage?: () => void;
}

export const CameraHUD: React.FC<CameraHUDProps> = ({
  equipment,
  onDetectFault,
  isScanning,
  onTriggerScan,
  onCaptureFrame,
  onImageUploaded,
  voiceState = 'IDLE',
  boundingBoxes,
  scenarioId = 'carton-damage',
  onResetImage
}) => {
  const [useWebcam, setUseWebcam] = useState<boolean>(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [showOverlays, setShowOverlays] = useState<boolean>(true);
  const [webcamError, setWebcamError] = useState<string | null>(null);
  const [selectedOverlay, setSelectedOverlay] = useState<BoundingBox | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Default packaging defect overlays if none passed
  const activeBoxes: BoundingBox[] = boundingBoxes || [
    {
      id: 'bb-carton-damaged',
      label: 'DAMAGED CARTON (CRUSHED & TORN)',
      type: 'defect',
      confidenceLabel: 'Visual Assessment — Requires Physical Check',
      x: 28,
      y: 36,
      width: 36,
      height: 38,
      detail: 'Cardboard carton severely crushed, structural side-wall buckled and torn along top fold',
      severity: 'critical',
      isObservedEvidence: true
    },
    {
      id: 'bb-stack-light',
      label: 'RED TOWER STACK LIGHT (ALARM ACTIVE)',
      type: 'warning_zone',
      confidenceLabel: 'Visual Alarm Indicator — Alarm Code Unknown',
      x: 76,
      y: 8,
      width: 18,
      height: 28,
      detail: 'Illuminated red stack light. Exact alarm code unknown — verify on HMI/PLC',
      severity: 'warning',
      isObservedEvidence: true
    },
    {
      id: 'bb-cartons-intact',
      label: 'INTACT PACKAGING CARTONS',
      type: 'intact_item',
      confidenceLabel: 'Normal Stream Item',
      x: 4,
      y: 44,
      width: 22,
      height: 32,
      detail: 'Upstream/downstream cartons intact with normal rectangular geometry',
      severity: 'normal',
      isObservedEvidence: true
    },
    {
      id: 'bb-robot-arm',
      label: 'ROBOTIC ARM & CONVEYOR TRANSFER',
      type: 'component',
      confidenceLabel: 'Packaging Machinery',
      x: 32,
      y: 6,
      width: 38,
      height: 28,
      detail: 'Automated robotic pick-and-place mechanism and conveyor transition bed',
      severity: 'info',
      isObservedEvidence: true
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
            setWebcamError('Camera access unavailable. Reverted to packaging inspection feed.');
            setUseWebcam(false);
          });
      } else {
        setWebcamError('Camera API unsupported in this browser. Showing packaging inspection feed.');
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

  const handleRemoveImage = () => {
    soundEngine.playScanPing();
    setUploadedImage(null);
    setSelectedOverlay(null);
    if (onResetImage) onResetImage();
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

  // High-definition packaging line image featuring conveyor, robotic machinery, and cartons
  const imageSrc = uploadedImage || 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1600&q=85';

  const orbState = isScanning ? 'scanning' : voiceState === 'LISTENING' ? 'listening' : voiceState === 'PROCESSING' ? 'processing' : 'idle';

  return (
    <div className="flex flex-col h-full bg-[#060B16] rounded-3xl border border-white/[0.08] overflow-hidden shadow-2xl relative min-h-[560px]">
      {/* Hero Header */}
      <div className="px-6 py-4 border-b border-white/[0.08] flex items-center justify-between bg-[#080F1E]/95 backdrop-blur-md">
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-2xl bg-[#00F0FF]/15 border border-[#00F0FF]/30 flex items-center justify-center text-[#00F0FF] shadow-lg shadow-[#00F0FF]/10">
            <Cpu className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2.5">
              <h2 className="text-base sm:text-lg font-black text-white tracking-wide font-sans">
                AUTOMATED PACKAGING LINE 3
              </h2>
              <span className="flex items-center gap-1.5 text-xs text-emerald-400 font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 font-mono">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                ● LIVE INSPECTION
              </span>
            </div>
            <div className="text-xs text-slate-400 font-mono mt-0.5">
              <span className="text-[#00F0FF] font-bold">Cell ROBO-PKG-03</span> · Sector 4 Conveyor Bed · Visual Defect Engine
            </div>
          </div>
        </div>

        {/* AI Status Orb Banner */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2.5 px-3.5 py-1.5 rounded-2xl bg-[#030712]/80 border border-white/[0.08]">
            <AIOrb state={orbState} size="sm" />
            <div className="text-left">
              <div className="text-[10px] font-mono font-black text-[#00F0FF] tracking-widest uppercase">
                VOXLENS AI
              </div>
              <div className="text-[11px] font-mono text-slate-300 font-bold">
                {isScanning ? 'ANALYZING DEFECT' : voiceState === 'LISTENING' ? 'LISTENING TO TECH' : 'INSPECTION ACTIVE'}
              </div>
            </div>
          </div>

          <button
            onClick={() => setShowOverlays(!showOverlays)}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold flex items-center gap-1.5 transition-colors cursor-pointer ${
              showOverlays ? 'text-[#00F0FF] bg-[#00F0FF]/15 border border-[#00F0FF]/30' : 'text-slate-500 hover:text-slate-300 bg-white/[0.04]'
            }`}
            title="Toggle Visual Evidence Overlays"
          >
            <Eye className="w-4 h-4" />
            <span className="hidden md:inline">{showOverlays ? 'EVIDENCE ON' : 'EVIDENCE OFF'}</span>
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

      {/* Main Image Inspection Container */}
      <div className="relative flex-1 bg-black flex items-center justify-center overflow-hidden min-h-[440px]">
        {/* Subtle industrial grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none z-10" />

        {/* Radar Scanning Line */}
        {isScanning && (
          <>
            <div className="radar-sweep z-20" />
            <div className="absolute inset-0 bg-[#00F0FF]/15 backdrop-blur-[2px] flex items-center justify-center pointer-events-none z-30">
              <div className="bg-[#030712]/95 border-2 border-[#00F0FF] px-8 py-4 rounded-3xl text-sm font-mono font-black text-[#00F0FF] flex items-center gap-3 shadow-2xl">
                <Scan className="w-6 h-6 animate-spin" />
                <span>AI COMPUTER VISION · ANALYZING CARTON INTEGRITY &amp; MACHINE STATE...</span>
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
            alt="Packaging Line Inspection Feed"
            className="w-full h-full object-cover"
          />
        )}

        {/* Evidence Annotation Overlays */}
        {showOverlays && activeBoxes.map((ov) => {
          const isCritical = ov.severity === 'critical';
          const isWarning = ov.severity === 'warning';
          const isSelected = selectedOverlay?.id === ov.id;

          const borderColor = isCritical
            ? 'border-red-500 bg-red-950/80 ring-4 ring-red-500/30'
            : isWarning
              ? 'border-amber-400 bg-amber-950/80 ring-4 ring-amber-400/30'
              : 'border-[#00F0FF] bg-[#030712]/85 ring-4 ring-[#00F0FF]/30';

          const tagBg = isCritical
            ? 'bg-red-500 text-white'
            : isWarning
              ? 'bg-amber-500 text-slate-950'
              : 'bg-[#00F0FF] text-slate-950';

          return (
            <div
              key={ov.id}
              onClick={() => setSelectedOverlay(isSelected ? null : ov)}
              style={{
                left: `${ov.x}%`,
                top: `${ov.y}%`,
                width: `${ov.width}%`,
                height: `${ov.height}%`
              }}
              className={`absolute border-2 rounded-3xl ${borderColor} cursor-pointer transition-all duration-300 hover:scale-[1.03] p-3.5 flex flex-col justify-between backdrop-blur-md z-20 shadow-2xl ${
                isSelected ? 'ring-8 ring-[#00F0FF]' : ''
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className={`text-xs font-mono font-black px-2 py-0.5 rounded-lg shadow-md ${tagBg}`}>
                    {ov.type === 'defect' ? 'DEFECT' : ov.type === 'warning_zone' ? 'ALARM' : 'ITEM'}
                  </span>
                  <span className="text-[11px] font-bold text-slate-100 tracking-wider font-mono truncate">
                    {ov.label}
                  </span>
                </div>
                {isCritical && (
                  <span className="w-3 h-3 rounded-full bg-red-500 animate-ping" />
                )}
              </div>

              <div className="flex items-center justify-between gap-1 pt-1">
                <span className="text-[10px] font-mono font-black text-slate-200 bg-black/90 px-2 py-1 rounded-lg border border-white/[0.15] truncate">
                  {ov.confidenceLabel || 'Observed Evidence'}
                </span>
                <span className="text-[9px] font-mono text-[#00F0FF] bg-[#00F0FF]/15 px-1.5 py-0.5 rounded">
                  DIRECT
                </span>
              </div>
            </div>
          );
        })}

        {/* Selected Evidence Detail Modal Callout */}
        {selectedOverlay && (
          <div className="absolute bottom-4 left-4 right-4 z-30 p-4 rounded-2xl bg-[#030712]/95 border-2 border-[#00F0FF] shadow-2xl backdrop-blur-xl animate-fadeIn">
            <div className="flex items-start justify-between gap-3">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-[#00F0FF] text-slate-950 text-xs font-mono font-black">
                    OBSERVED EVIDENCE
                  </span>
                  <span className="text-xs font-mono font-bold text-slate-300">
                    {selectedOverlay.confidenceLabel}
                  </span>
                </div>
                <h4 className="text-sm font-black text-white font-mono">
                  {selectedOverlay.label}
                </h4>
                <p className="text-xs text-slate-200 leading-relaxed">
                  {selectedOverlay.detail}
                </p>
              </div>

              <button
                onClick={() => setSelectedOverlay(null)}
                className="p-1.5 rounded-lg bg-white/[0.08] hover:bg-white/[0.15] text-slate-300 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Controls Bar */}
      <div className="p-4 border-t border-white/[0.08] bg-[#080F1E]/95 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => {
              setUseWebcam(!useWebcam);
              soundEngine.playMicOn();
            }}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-bold flex items-center gap-2 transition-colors cursor-pointer shadow-sm ${
              useWebcam
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                : 'bg-white/[0.06] text-slate-200 hover:bg-white/[0.1]'
            }`}
            title={useWebcam ? 'Switch to Inspection Feed' : 'Enable Live Camera'}
          >
            {useWebcam ? <Video className="w-4 h-4" /> : <Camera className="w-4 h-4" />}
            <span>{useWebcam ? 'Live Stream' : 'Live Camera'}</span>
          </button>

          <button
            onClick={() => fileInputRef.current?.click()}
            className="px-4 py-2 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] text-slate-200 text-xs font-mono font-bold flex items-center gap-2 transition-colors cursor-pointer shadow-sm"
            title="Upload JPG, JPEG, PNG, or WEBP inspection image"
          >
            <Upload className="w-4 h-4 text-[#00F0FF]" />
            <span>{uploadedImage ? 'Replace Image' : 'Upload Image'}</span>
          </button>
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileUpload} 
            accept="image/png, image/jpeg, image/jpg, image/webp" 
            className="hidden" 
          />

          {uploadedImage && (
            <button
              onClick={handleRemoveImage}
              className="px-3 py-2 rounded-xl bg-red-500/15 hover:bg-red-500/25 border border-red-500/30 text-red-300 text-xs font-mono font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Remove uploaded image & reset feed"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Feed</span>
            </button>
          )}

          {useWebcam && (
            <button
              onClick={handleCaptureFrame}
              className="px-4 py-2 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] text-slate-200 text-xs font-mono font-bold flex items-center gap-2 transition-colors cursor-pointer shadow-sm"
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
          <span>{isScanning ? 'ANALYZING IMAGE...' : 'ANALYZE DEFECT'}</span>
        </button>
      </div>
    </div>
  );
};
