# VOXLENS — Real-Time Multimodal AI Copilot for Field Service

**Team:** VOXNOVA  
**Problem Statement:** PS-05 — Real-Time Voice & Multimodal Agents  
**Tagline:** *"See the fault. Hear the fix. Let the agent handle the next step."*

---

## ⚡ Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Run local development server
npm run dev

# 3. Open in browser
http://localhost:5173/
```

To build production bundle:
```bash
npm run build
```

---

## 🎯 Product Architecture & Core Workflow

```
TECHNICIAN SPEAKS + CAMERA SEES
              ↓
    MULTIMODAL CONTEXT ENGINE
              ↓
   TECHNICAL KNOWLEDGE / RAG
              ↓
    GROUNDED RECOMMENDATION
              ↓
         AGENT ACTION
              ↓
  HUMAN SAFETY GATE ($245.00)
              ↓
       RESULT & DISPATCH
              ↓
       SESSION MEMORY
```

---

## 🛠️ Key Product Capabilities

1. **Multimodal Context Engine (PS-05 Heart)**:
   - Synchronizes **Voice Stream** ("What technician said"), **Vision Stream** ("What camera detected: E17 · 88.4°C · VX-420"), and **RAG Knowledge** ("OEM Service Manual Section 4.3") into a unified AI Synthesis.
2. **Live Vision Camera HUD**:
   - Live camera with `navigator.mediaDevices.getUserMedia()`, demo feed toggle, image upload (PNG/JPG/WEBP), frame snapshot capture, subtle radar sweep animation, and transparent `DEMO VISION ANALYSIS` labeling.
3. **Voice Copilot & Audio Waveform**:
   - Web Speech API Speech Recognition with interim speech bubbles, graceful fallback banner, Web Audio API synthesized industrial chimes, and Web Speech Synthesis (TTS).
4. **Local Demo RAG Knowledge Base**:
   - Dense vector knowledge dataset for the VX-420 Service Manual with section filtering, relevance scores, and instant search term highlighting.
5. **Stateful Agent Tools**:
   - `searchTechnicalManual()`, `checkInventory()`, `createMaintenanceTicket()`, `requestReplacementPart()`, `notifySupervisor()`, `scheduleMaintenance()`.
6. **Human Safety Gate**:
   - Mandatory authorization gate for financial commitments ($245.00 part requisition), with justification and 1-click authorize/dispatch.
7. **Tickets & Bay Stockroom Inventory**:
   - Live work orders and Bay 4 stockroom inventory with real-time stock deduction, reservations, and manual work order creation.
8. **Session Memory & "What We Already Tried"**:
   - Persistent ledger tracking diagnostic events; ensures AI does not recommend already verified steps.
9. **Equipment Digital Twin**:
   - SCADA telemetry (temperature, cooling flow, vibration, voltage) and clickable subsystem components (Motor, Axial Fan, TB-2, PT100 Sensor).
10. **Supervisor Center & Analytics**:
    - Fleet status monitoring, 1-click approvals, and prototype latency budget breakdown (CV: 95ms, RAG: 145ms, Agent: 110ms, TTS: 70ms = 420ms).
11. **11-Step Automated Hackathon Demo**:
    - Centralized demo controller with autoplay, progress bar, minimizable floating pill, and full story playback.
