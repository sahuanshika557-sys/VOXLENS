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
import { visionService } from '../../services';

const SCENARIO_DEFAULT_IMAGES: Record<string, string> = {
  'packaging-defect': 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1600&q=85',
  'e17-cooling': 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=1600&q=85',
  'bearing-vibration': 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=1600&q=85',
  'belt-slippage': 'https://images.unsplash.com/photo-1581092162384-8987c1d64718?auto=format&fit=crop&w=1600&q=85',
  'hydraulic-press': 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=1600&q=85',
  'optical-ocr': 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1600&q=85',
  'low-confidence': 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=1600&q=85',
  'camera-blocked': 'https://images.unsplash.com/photo-1533090161767-e6ffed986b88?auto=format&fit=crop&w=1600&q=85',
  'zero-inventory': 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1600&q=85',
  'manual-missing': 'https://images.unsplash.com/photo-1581092334651-ddf26d9a09d0?auto=format&fit=crop&w=1600&q=85',
  'network-degraded': 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1600&q=85'
};

interface CameraHUDProps {
  equipment: Equipment;
  onDetectFault: (errorCode: string) => void;
  isScanning: boolean;
  onTriggerScan: (targetScenarioId?: string) => void;
  onCaptureFrame?: (dataUrl: string) => void;
  onImageUploaded?: (dataUrl: string) => void;
  voiceState?: VoiceState;
  boundingBoxes?: BoundingBox[];
  scenarioId?: string;
  onResetImage?: () => void;
  onSelectScenario?: (scenarioId: string) => void;
  onSendMessage?: (text: string, intent?: string) => void;
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
  scenarioId = 'packaging-defect',
  onResetImage,
  onSelectScenario,
  onSendMessage
}) => {
  const [useWebcam, setUseWebcam] = useState<boolean>(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [showOverlays, setShowOverlays] = useState<boolean>(true);
  const [webcamError, setWebcamError] = useState<string | null>(null);
  const [selectedOverlay, setSelectedOverlay] = useState<BoundingBox | null>(null);
  const [detectedResult, setDetectedResult] = useState<{
    scenarioId: string;
    confidence: number;
    detectionReason: string;
    candidates: {
      scenarioId: string;
      label: string;
      confidence: number;
      reason: string;
      icon: string;
    }[];
  } | null>(null);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Active overlays according to selected scenario
  const activeBoxes: BoundingBox[] = (boundingBoxes && boundingBoxes.length > 0) ? boundingBoxes : [
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

  const runAnalysisOnImage = async (imageSource: string, fileHint?: string) => {
    try {
      const detected = await visionService.classifyImage(imageSource, fileHint);
      setDetectedResult(detected);
      if (detected && detected.scenarioId) {
        if (onSelectScenario) {
          onSelectScenario(detected.scenarioId);
        }
        onTriggerScan(detected.scenarioId);
      }
    } catch {
      onTriggerScan();
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const fileName = file.name;
      const reader = new FileReader();
      reader.onload = async (event) => {
        const result = event.target?.result as string;
        setUploadedImage(result);
        setUseWebcam(false);
        soundEngine.playScanPing();

        // Run deep classification with fileName hint
        await runAnalysisOnImage(result, fileName);

        if (onImageUploaded) onImageUploaded(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    soundEngine.playScanPing();
    setUploadedImage(null);
    setSelectedOverlay(null);
    setDetectedResult(null);
    if (onResetImage) onResetImage();
  };

  const handleCaptureFrame = async () => {
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

          await runAnalysisOnImage(dataUrl, 'webcam-capture-frame');

          if (onCaptureFrame) onCaptureFrame(dataUrl);
        }
      } catch {
        onTriggerScan();
      }
    } else {
      const currentSrc = uploadedImage || SCENARIO_DEFAULT_IMAGES[scenarioId] || SCENARIO_DEFAULT_IMAGES['packaging-defect'];
      await runAnalysisOnImage(currentSrc, scenarioId);
    }
  };

  // High-definition equipment image dynamically linked to the active fault scenario
  const imageSrc = uploadedImage || SCENARIO_DEFAULT_IMAGES[scenarioId] || SCENARIO_DEFAULT_IMAGES['packaging-defect'];

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
                {equipment.name || 'AUTOMATED PACKAGING LINE 3'}
              </h2>
              <span className="flex items-center gap-1.5 text-xs text-emerald-400 font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 font-mono">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                ● {equipment.status ? equipment.status.toUpperCase() : 'LIVE INSPECTION'}
              </span>
            </div>
            <div className="text-xs text-slate-400 font-mono mt-0.5">
              <span className="text-[#00F0FF] font-bold">{equipment.model || 'Cell ROBO-PKG-03'}</span> · {equipment.line || 'Sector 4 Conveyor Bed'} · Autonomous Visual AI
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

      {/* AI Visual Detection Confirmation & Candidate Switcher Strip */}
      {detectedResult && (
        <div className="px-4 py-2.5 bg-gradient-to-r from-[#00F0FF]/15 via-[#0c1930] to-purple-950/30 border-b border-[#00F0FF]/30 flex flex-wrap items-center justify-between gap-2 animate-fadeIn">
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 rounded-lg bg-[#00F0FF]/25 flex items-center justify-center text-[#00F0FF]">
              <Sparkles className="w-3.5 h-3.5 animate-spin" />
            </div>
            <div>
              <div className="text-[11px] font-mono font-black text-white flex items-center gap-2">
                <span className="text-[#00F0FF]">AI DETECTED FAULT:</span>
                <span className="bg-[#00F0FF] text-slate-950 px-2 py-0.5 rounded text-[10px] font-bold">
                  {detectedResult.confidence}% MATCH
                </span>
                <span className="text-slate-200">{detectedResult.detectionReason}</span>
              </div>
            </div>
          </div>

          {detectedResult.candidates && detectedResult.candidates.length > 1 && (
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-mono text-slate-400 font-bold">Alternative Matches:</span>
              {detectedResult.candidates.map(cand => (
                <button
                  key={cand.scenarioId}
                  onClick={() => {
                    if (onSelectScenario) {
                      onSelectScenario(cand.scenarioId);
                      soundEngine.playMicOn();
                    }
                  }}
                  className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold transition-all cursor-pointer ${
                    scenarioId === cand.scenarioId
                      ? 'bg-[#00F0FF] text-slate-950 font-black'
                      : 'bg-white/10 text-slate-300 hover:bg-white/20 hover:text-white'
                  }`}
                >
                  {cand.icon} {cand.confidence}%
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Quick Scenario Preset Strip (Manual Switch / Test Suites) */}
      {onSelectScenario && (
        <div className="px-4 py-2 bg-[#040813] border-b border-white/[0.06] flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider shrink-0 mr-1 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00F0FF]" />
            Fault Test Preset:
          </span>
          {[
            { id: 'packaging-defect', label: '📦 1. Crushed Carton' },
            { id: 'e17-cooling', label: '🌡️ 2. E17 Thermal Overload' },
            { id: 'bearing-vibration', label: '⚙️ 3. Bearing 4.8mm/s' },
            { id: 'belt-slippage', label: '🔄 4. Belt Slippage' },
            { id: 'hydraulic-press', label: '🗜️ 5. CR-800 Hydraulic' },
            { id: 'optical-ocr', label: '⚡ 6. E04 Electrical OCR' },
            { id: 'low-confidence', label: '🕸️ 8. Low Confidence (Cage Mesh)' },
            { id: 'camera-blocked', label: '🌫️ 9. Camera Obscured (Dust/Glare)' },
            { id: 'zero-inventory', label: '📦 7. Zero Stockroom Alert' },
            { id: 'manual-missing', label: '📖 10. IEC Standards' },
            { id: 'network-degraded', label: '📶 11. Offline Edge SLM' }
          ].map(sc => (
            <button
              key={sc.id}
              onClick={() => {
                setSelectedOverlay(null);
                if (onSelectScenario) {
                  onSelectScenario(sc.id);
                }
                soundEngine.playMicOn();
              }}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-mono font-bold whitespace-nowrap transition-all cursor-pointer ${
                scenarioId === sc.id
                  ? 'bg-[#00F0FF] text-slate-950 shadow-md shadow-[#00F0FF]/20 ring-1 ring-[#00F0FF]'
                  : 'bg-white/[0.04] text-slate-300 hover:text-white hover:bg-white/[0.08]'
              }`}
            >
              {sc.label}
            </button>
          ))}
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
                {onSendMessage && (
                  <button
                    onClick={() => {
                      onSendMessage(`Explain details, failure hypotheses, and safety checklist for: ${selectedOverlay.label}`);
                      soundEngine.playMicOn();
                    }}
                    className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#00F0FF]/20 hover:bg-[#00F0FF]/30 text-[#00F0FF] text-[11px] font-mono font-black transition-all cursor-pointer border border-[#00F0FF]/40"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Ask AI Copilot About This Component</span>
                  </button>
                )}
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
