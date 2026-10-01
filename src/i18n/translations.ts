export type SupportedLanguage = 'en' | 'hi' | 'bn' | 'ta' | 'te' | 'mr' | 'gu' | 'kn' | 'pa' | 'ur';
export type LanguageCode = SupportedLanguage;

export interface LanguageMeta {
  code: SupportedLanguage;
  label: string;
  nativeLabel: string;
  flag: string;
  speechLocale: string;
}

export const LANGUAGES: LanguageMeta[] = [
  { code: 'en', label: 'English', nativeLabel: 'English', flag: '🇺🇸', speechLocale: 'en-US' },
  { code: 'hi', label: 'Hindi', nativeLabel: 'हिन्दी', flag: '🇮🇳', speechLocale: 'hi-IN' },
  { code: 'bn', label: 'Bengali', nativeLabel: 'বাংলা', flag: '🇮🇳', speechLocale: 'bn-IN' },
  { code: 'ta', label: 'Tamil', nativeLabel: 'தமிழ்', flag: '🇮🇳', speechLocale: 'ta-IN' },
  { code: 'te', label: 'Telugu', nativeLabel: 'తెలుగు', flag: '🇮🇳', speechLocale: 'te-IN' },
  { code: 'mr', label: 'Marathi', nativeLabel: 'मराठी', flag: '🇮🇳', speechLocale: 'mr-IN' },
  { code: 'gu', label: 'Gujarati', nativeLabel: 'ગુજરાતી', flag: '🇮🇳', speechLocale: 'gu-IN' },
  { code: 'kn', label: 'Kannada', nativeLabel: 'ಕನ್ನಡ', flag: '🇮🇳', speechLocale: 'kn-IN' },
  { code: 'pa', label: 'Punjabi', nativeLabel: 'ਪੰਜਾਬੀ', flag: '🇮🇳', speechLocale: 'pa-IN' },
  { code: 'ur', label: 'Urdu', nativeLabel: 'اردو', flag: '🇵🇰', speechLocale: 'ur-PK' }
];

export const SUPPORTED_LANGUAGES = LANGUAGES;

export interface QuickPromptItem {
  label: string;
  query: string;
}

export interface TranslationDict {
  nav: {
    liveRepair: string;
    equipment: string;
    knowledge: string;
    agentActions: string;
    sessionMemory: string;
    tickets: string;
    supervisor: string;
    analytics: string;
    story: string;
  };
  header: {
    liveSession: string;
    fault: string;
    scenario: string;
    startDemo: string;
    watchStory: string;
    techRole: string;
    supervisorRole: string;
  };
  liveRepair: {
    voiceTitle: string;
    visionTitle: string;
    knowledgeTitle: string;
    synthesisTitle: string;
    talkToVoxlens: string;
    listening: string;
    processing: string;
    triggerScan: string;
    quickPromptsTitle: string;
  };
  copilot: {
    greeting: string;
    e17Diagnosis: string;
    cartonDiagnosis?: string;
    recTitle: string;
    recStep1: string;
    recStep2: string;
    recStep3: string;
    questionAction: string;
    groundedByManual: string;
    viewEvidence: string;
    safetyRequired: string;
    reviewAndAuthorize: string;
    placeholder: string;
    quickPrompts: QuickPromptItem[];
    responseE17Mean: string;
    responseCheckFirst: string;
    responseCheckFan: string;
    responseCreateTicket: string;
    responseScanDetected: string;
    responseCartonHelp?: string;
    responseStackLight?: string;
  };
  safetyGate: {
    title: string;
    subtitle: string;
    actionRequest: string;
    financialAllocation: string;
    reason: string;
    groundedEvidence: string;
    reject: string;
    reviewEvidence: string;
    authorize: string;
  };
  quotes: {
    q1: string;
    q2: string;
    q3: string;
    q4: string;
    q5: string;
  };
}

export const TRANSLATIONS: Record<SupportedLanguage, TranslationDict> = {
  en: {
    nav: {
      liveRepair: 'Live Repair',
      equipment: 'Equipment Twin',
      knowledge: 'Technical Manuals',
      agentActions: 'Agent Actions',
      sessionMemory: 'Session Memory',
      tickets: 'Tickets & Parts',
      supervisor: 'Supervisor Center',
      analytics: 'Analytics',
      story: 'VoxLens Story'
    },
    header: {
      liveSession: 'LIVE SESSION',
      fault: 'FAULT',
      scenario: 'Scenario',
      startDemo: 'EXPERIENCE VOXLENS',
      watchStory: 'WATCH VOXLENS STORY',
      techRole: 'Tech',
      supervisorRole: 'Supervisor'
    },
    liveRepair: {
      voiceTitle: 'VOICE STREAM',
      visionTitle: 'VISION OCR & DEFECT',
      knowledgeTitle: 'MANUAL GROUNDING',
      synthesisTitle: 'AI SYNTHESIS READY',
      talkToVoxlens: 'TALK TO VOXLENS',
      listening: 'VOXLENS IS LISTENING...',
      processing: 'SYNTHESIZING CONTEXT...',
      triggerScan: 'TRIGGER CV SCAN',
      quickPromptsTitle: 'RECOMMENDED QUERIES'
    },
    copilot: {
      greeting: "The image shows a severely crushed and torn carton on the conveyor. Isolate the affected carton, inspect the robotic gripping and conveyor transfer mechanisms, and verify the warning indicator against the actual machine alarm log. Confirm the root cause before implementing corrective action.",
      e17Diagnosis: "The image shows a severely crushed and torn carton on the conveyor. Isolate the affected carton, inspect the robotic gripping and conveyor transfer mechanisms, and verify the warning indicator against the actual machine alarm log. Confirm the root cause before implementing corrective action.",
      cartonDiagnosis: "The image shows a severely crushed and torn carton on the conveyor. Isolate the affected carton, inspect the robotic gripping and conveyor transfer mechanisms, and verify the warning indicator against the actual machine alarm log. Confirm the root cause before implementing corrective action.",
      recTitle: "RECOMMENDED 8-STEP WORKFLOW:",
      recStep1: "1. SAFETY: Stop/isolate equipment with Lockout/Tagout (LOTO Disconnect-3A).",
      recStep2: "2. CONTAINMENT: Reject and safely quarantine crushed carton; inspect nearby boxes.",
      recStep3: "3. MECHANICAL: Inspect robot gripper fingers, vacuum suction, and transfer plate.",
      questionAction: "Would you like me to guide you through the 8-step repair checklist or verify the PLC alarm log?",
      groundedByManual: "GROUNDED BY SOP §6.2",
      viewEvidence: "View SOP §6.2",
      safetyRequired: "HUMAN APPROVAL REQUIRED",
      reviewAndAuthorize: "Review & Authorize Action",
      placeholder: "Ask VoxLens in English or speak into microphone...",
      quickPrompts: [
        { label: "Analyze Damaged Carton", query: "Explain the visible carton damage on the conveyor" },
        { label: "What should I check first?", query: "What should I check first for this packaging defect?" },
        { label: "Red Warning Light Meaning", query: "What does the red tower warning light mean?" },
        { label: "8-Step Repair Workflow", query: "Show the 8-step repair workflow" }
      ],
      responseE17Mean: "The red stack light indicates an active cell halt condition. The specific fault code must be confirmed from the HMI screen or PLC fault buffer.",
      responseCheckFirst: "STEP 1 — SAFETY: First stop and isolate the affected equipment and apply Lockout/Tagout (LOTO SW-1). Next, STEP 2 — CONTAINMENT: Isolate the damaged carton from the production stream.",
      responseCheckFan: "Inventory search complete: Bay 4 Stockroom has 3 units of Gripper Cup Kit (#PKG-GRP42, $245.00) in Bin C-14.",
      responseCreateTicket: "I have prepared Work Order #TCK-2026-881 for Line 3 Packaging. Human authorization is required for LOTO SW-1 isolation and part requisition.",
      responseScanDetected: "Image analysis verified: Severely crushed and torn cardboard carton observed on conveyor. Red stack light active — alarm meaning undetermined pending PLC/HMI verification.",
      responseCartonHelp: "The image shows a severely crushed and torn carton on the conveyor. Isolate the affected carton, inspect the robotic gripping and conveyor transfer mechanisms, and verify the warning indicator against the actual machine alarm log. Confirm the root cause before implementing corrective action.",
      responseStackLight: "A red illuminated tower warning light is visible. Important: Never assume a specific alarm code from color alone. Verify the active error code in the HMI alarm log."
    },
    safetyGate: {
      title: 'HUMAN APPROVAL REQUIRED',
      subtitle: 'LEVEL 2 FINANCIAL COMMITMENT GATE',
      actionRequest: 'ACTION REQUEST',
      financialAllocation: 'FINANCIAL ALLOCATION',
      reason: 'REASON FOR ACTION',
      groundedEvidence: 'GROUNDED EVIDENCE',
      reject: 'REJECT ACTION',
      reviewEvidence: 'REVIEW EVIDENCE',
      authorize: 'AUTHORIZE & DISPATCH ($245.00)'
    },
    quotes: {
      q1: 'Hands busy. AI handles the search.',
      q2: 'From signal → understanding → action.',
      q3: 'AI should assist the technician, not replace the technician.',
      q4: 'Every recommendation must have verified OEM evidence.',
      q5: 'Automation moves fast. Safety decides when it should stop.'
    }
  },
  hi: {
    nav: {
      liveRepair: 'लाइव रिपेयर',
      equipment: 'इक्विपमेंट ट्विन',
      knowledge: 'तकनीकी मैन्युअल',
      agentActions: 'एजेंट कार्रवाइयां',
      sessionMemory: 'सेशन मेमोरी',
      tickets: 'टिकट एवं पार्ट्स',
      supervisor: 'सुपरवाइज़र सेंटर',
      analytics: 'एनालिटिक्स',
      story: 'वॉक्सलेंस स्टोरी'
    },
    header: {
      liveSession: 'लाइव सेशन',
      fault: 'फॉल्ट',
      scenario: 'सिमुलेशन परिदृश्य',
      startDemo: 'वॉक्सलेंस अनुभव करें',
      watchStory: 'वॉक्सलेंस स्टोरी देखें',
      techRole: 'टेक्नीशियन',
      supervisorRole: 'सुपरवाइज़र'
    },
    liveRepair: {
      voiceTitle: 'वॉइस इनपुट स्ट्रीम',
      visionTitle: 'कैमरा विज़न एवं डिफेक्ट',
      knowledgeTitle: 'मैन्युअल प्रमाण',
      synthesisTitle: 'एआई निर्णय तैयार',
      talkToVoxlens: 'वॉक्सलेंस से बात करें',
      listening: 'वॉक्सलेंस सुन रहा है...',
      processing: 'विश्लेषण जारी है...',
      triggerScan: 'कैमरा स्कैन शुरू करें',
      quickPromptsTitle: 'सुझाए गए प्रश्न'
    },
    copilot: {
      greeting: "Image mein conveyor belt par ek cardboard carton buri tarah damage hua dikh raha hai. Sabse pehle affected carton ko production line se safely isolate karein. Iske baad robotic gripper, conveyor transfer points aur carton packaging quality inspect karein. Red warning light ka exact alarm HMI ya PLC se verify karna zaroori hai. Root cause confirm hone ke baad authorized technician corrective action le aur controlled test run kare.",
      e17Diagnosis: "Image mein conveyor belt par ek cardboard carton buri tarah damage hua dikh raha hai. Sabse pehle affected carton ko production line se safely isolate karein. Iske baad robotic gripper, conveyor transfer points aur carton packaging quality inspect karein. Red warning light ka exact alarm HMI ya PLC se verify karna zaroori hai. Root cause confirm hone ke baad authorized technician corrective action le aur controlled test run kare.",
      cartonDiagnosis: "Image mein conveyor belt par ek cardboard carton buri tarah damage hua dikh raha hai. Sabse pehle affected carton ko production line se safely isolate karein. Iske baad robotic gripper, conveyor transfer points aur carton packaging quality inspect karein. Red warning light ka exact alarm HMI ya PLC se verify karna zaroori hai. Root cause confirm hone ke baad authorized technician corrective action le aur controlled test run kare.",
      recTitle: "अनुशंसित 8-चरणीय वर्कफ़्लो:",
      recStep1: "1. सुरक्षा (SAFETY): LOTO Disconnect-3A द्वारा उपकरण को आइसोलेट करें।",
      recStep2: "2. रोकथाम (CONTAINMENT): क्षतिग्रस्त कार्टन को सुरक्षित हटाएं और पास के बॉक्स जांचें।",
      recStep3: "3. यांत्रिक जांच (MECHANICAL): रोबोट ग्रिपर, वैक्यूम कप और ट्रांसफर प्लेट का निरीक्षण करें।",
      questionAction: "क्या आप चाहते हैं कि मैं 8-चरणीय रिपेयर चेकलिस्ट में आपका मार्गदर्शन करूँ?",
      groundedByManual: "एसओपी 6.2 द्वारा प्रमाणित",
      viewEvidence: "एसओपी 6.2 देखें",
      safetyRequired: "मानवीय अनुमोदन आवश्यक है",
      reviewAndAuthorize: "समीक्षा करें और अधिकृत करें",
      placeholder: "हिंदी में पूछें या माइक में बोलें...",
      quickPrompts: [
        { label: "क्षतिग्रस्त कार्टन विश्लेषण", query: "Carton damage defect explain karein" },
        { label: "पहले क्या जांचें?", query: "Sabse pehle kya check karein?" },
        { label: "रेड स्टैक लाइट का मतलब", query: "Red tower warning light ka kya matlab hai?" },
        { label: "8-स्टेप रिपेयर वर्कफ़्लो", query: "8-step repair workflow dikhayein" }
      ],
      responseE17Mean: "रेड स्टैक लाइट अलार्म सक्रिय है। इसका सटीक अलार्म कोड केवल एचएमआई या पीएलसी लॉग से ही सत्यापित करें।",
      responseCheckFirst: "STEP 1 — SAFETY: सबसे पहले मशीन को LOTO SW-1 से सुरक्षित आइसोलेट करें। STEP 2 — CONTAINMENT: क्षतिग्रस्त कार्टन को अलग करें।",
      responseCheckFan: "इन्वेंट्री जांच पूर्ण: बे 4 के स्टॉक Bin C-14 में ग्रिपर कप किट (#PKG-GRP42, $245.00) की 3 यूनिट्स उपलब्ध हैं।",
      responseCreateTicket: "मैंने लाइन 3 पैकेजिंग सेल के लिए वर्क ऑर्डर #TCK-2026-881 तैयार कर दिया है। मानवीय अनुमोदन आवश्यक है।",
      responseScanDetected: "ऑप्टिकल विज़न स्कैन सफल: कन्वेयर पर क्षतिग्रस्त कार्टन और सक्रिय रेड स्टैक लाइट की पहचान की गई।",
      responseCartonHelp: "Image mein conveyor belt par ek cardboard carton buri tarah damage hua dikh raha hai. Sabse pehle affected carton ko production line se safely isolate karein. Iske baad robotic gripper, conveyor transfer points aur carton packaging quality inspect karein. Red warning light ka exact alarm HMI ya PLC se verify karna zaroori hai. Root cause confirm hone ke baad authorized technician corrective action le aur controlled test run kare.",
      responseStackLight: "रेड टॉवर लाइट सक्रिय है। लाइट के रंग से कोई अनुमान न लगाएं, सीधे एचएमआई अलार्म लॉग से फॉल्ट कोड सत्यापित करें।"
    },
    safetyGate: {
      title: 'मानवीय अनुमोदन आवश्यक है',
      subtitle: 'लेवल 2 वित्तीय सुरक्षा गेट ($245.00)',
      actionRequest: 'अनुरोधित कार्रवाई',
      financialAllocation: 'वित्तीय लागत आवंटन',
      reason: 'कार्रवाई का कारण',
      groundedEvidence: 'प्रमाणित मैन्युअल साक्ष्य',
      reject: 'अस्वीकार करें',
      reviewEvidence: 'साक्ष्य देखें',
      authorize: 'स्वीकार एवं डिस्पैच करें ($245.00)'
    },
    quotes: {
      q1: 'हाथ काम में व्यस्त हैं, एआई खोज संभालता है।',
      q2: 'सिग्नल से समझ → तत्काल कार्रवाई।',
      q3: 'एआई को तकनीशियन की सहायता करनी चाहिए, उसकी जगह नहीं लेनी चाहिए।',
      q4: 'हर सिफारिश के पीछे सत्यापित मैन्युअल साक्ष्य होना चाहिए।',
      q5: 'ऑटोमेशन तेज है, सुरक्षा तय करती है कि कब रुकना है।'
    }
  },
  bn: {
    nav: {
      liveRepair: 'লাইভ রিপেয়ার',
      equipment: 'ইকুইপমেন্ট টুইন',
      knowledge: 'টেকনিক্যাল ম্যানুয়াল',
      agentActions: 'এজেন্ট অ্যাকশন',
      sessionMemory: 'সেশন মেমোরি',
      tickets: 'টিকিট ও পার্টস',
      supervisor: 'সুপারভাইজার সেন্টার',
      analytics: 'অ্যানালিটিক্স',
      story: 'ভক্সলেন্স স্টোরি'
    },
    header: {
      liveSession: 'লাইভ সেশন',
      fault: 'ত্রুটি',
      scenario: 'দৃশ্যপট',
      startDemo: 'ভক্সলেন্স অভিজ্ঞতা',
      watchStory: 'স্টোরি দেখুন',
      techRole: 'টেকনিশিয়ান',
      supervisorRole: 'সুপারভাইজার'
    },
    liveRepair: {
      voiceTitle: 'ভয়েস স্ট্রিম',
      visionTitle: 'ক্যামেরা ভিশন ও ডিফেক্ট',
      knowledgeTitle: 'ম্যানুয়াল প্রমাণ',
      synthesisTitle: 'এআই সিদ্ধান্ত প্রস্তুত',
      talkToVoxlens: 'ভক্সলেন্সের সাথে কথা বলুন',
      listening: 'ভক্সলেন্স শুনছে...',
      processing: 'প্রক্রিয়াকরণ চলছে...',
      triggerScan: 'স্ক্যান শুরু করুন',
      quickPromptsTitle: 'প্রস্তাবিত প্রশ্ন'
    },
    copilot: {
      greeting: "ছবিতে কনভেয়র বেল্টে একটি ক্ষতিগ্রস্ত এবং ছেঁড়া কার্ডবোর্ডের কার্টন দেখা যাচ্ছে। প্রথমে ক্ষতিগ্রস্ত কার্টনটিকে নিরাপদে আলাদা করুন। এরপর রোবোটিক গ্রিপার, কনভেয়র প্লেট এবং প্যাকেজিং গুণমান পরীক্ষা করুন। লাল বাতিটির সঠিক অ্যালার্ম এইচএমআই বা পিএলসি থেকে যাচাই করুন।",
      e17Diagnosis: "ছবিতে কনভেয়র বেল্টে একটি ক্ষতিগ্রস্ত এবং ছেঁড়া কার্ডবোর্ডের কার্টন দেখা যাচ্ছে। প্রথমে ক্ষতিগ্রস্ত কার্টনটিকে নিরাপদে আলাদা করুন। এরপর রোবোটিক গ্রিপার, কনভেয়র প্লেট এবং প্যাকেজিং গুণমান পরীক্ষা করুন। লাল বাতিটির সঠিক অ্যালার্ম এইচএমআই বা পিএলসি থেকে যাচাই করুন।",
      cartonDiagnosis: "ছবিতে কনভেয়র বেল্টে একটি ক্ষতিগ্রস্ত এবং ছেঁড়া কার্ডবোর্ডের কার্টন দেখা যাচ্ছে। প্রথমে ক্ষতিগ্রস্ত কার্টনটিকে নিরাপদে আলাদা করুন। এরপর রোবোটিক গ্রিপার, কনভেয়র প্লেট এবং প্যাকেজিং গুণমান পরীক্ষা করুন। লাল বাতিটির সঠিক অ্যালার্ম এইচএমআই বা পিএলসি থেকে যাচাই করুন।",
      recTitle: "প্রস্তাবিত ৮-ধাপের ওয়ার্কফ্লো:",
      recStep1: "১. সুরক্ষা: LOTO Disconnect-3A প্রয়োগ করে যন্ত্রপাতি বিচ্ছিন্ন করুন।",
      recStep2: "২. নিয়ন্ত্রণ: ক্ষতিগ্রস্ত কার্টনটি সরিয়ে ফেলুন এবং আশেপাশের বক্স পরীক্ষা করুন।",
      recStep3: "৩. যান্ত্রিক পরিদর্শন: রোবট গ্রিপার ও কনভেয়ারের প্লেট পরীক্ষা করুন।",
      questionAction: "আপনি কি ৮-ধাপের মেরামত চেকলিস্ট দেখতে চান?",
      groundedByManual: "এসওপি ৬.২ দ্বারা প্রমাণিত",
      viewEvidence: "এসওপি ৬.২ দেখুন",
      safetyRequired: "মানবীয় অনুমোদন প্রয়োজন",
      reviewAndAuthorize: "পর্যালোচনা ও অনুমোদন করুন",
      placeholder: "বাংলায় জিজ্ঞাসা করুন বা মাইকে বলুন...",
      quickPrompts: [
        { label: "কার্টন ত্রুটি বিশ্লেষণ", query: "কনভেয়ারের ক্ষতিগ্রস্ত কার্টনটির ত্রুটি ব্যাখ্যা করুন" },
        { label: "প্রথমে কি পরীক্ষা করব?", query: "এই প্যাকেজিং সমস্যার জন্য প্রথমে কি করা উচিত?" },
        { label: "লাল বাতির অর্থ কি?", query: "লাল টাওয়ার বাতির অর্থ কি?" },
        { label: "৮-ধাপের মেরামত প্রক্রিয়া", query: "৮-ধাপের মেরামত নির্দেশিকা দেখান" }
      ],
      responseE17Mean: "লাল বাতি সক্রিয় রয়েছে। সঠিক ত্রুটি কোড এইচএমআই বা পিএলসি লগ থেকে যাচাই করা প্রয়োজন।",
      responseCheckFirst: "ধাপ ১ — সুরক্ষা: প্রথমে LOTO SW-1 প্রয়োগ করে মেশিন বিচ্ছিন্ন করুন। ধাপ ২ — নিয়ন্ত্রণ: ক্ষতিগ্রস্ত কার্টনটি আলাদা করুন।",
      responseCheckFan: "ইনভেন্টরি রিপোর্ট: বে ৪ স্টকে ৩টি গ্রিপার ভ্যাকুয়াম কাপ কিট (#PKG-GRP42, $245.00) উপলব্ধ রয়েছে।",
      responseCreateTicket: "আমি লাইন ৩ প্যাকেজিংয়ের জন্য ওয়ার্ক অর্ডার #TCK-2026-881 প্রস্তুত করেছি। মানবীয় অনুমোদন প্রয়োজন।",
      responseScanDetected: "ক্যামেরা স্ক্যান সফল: কনভেয়ারের ক্ষতিগ্রস্ত কার্টন ও লাল সতর্ক সংকেত সনাক্ত হয়েছে।",
      responseCartonHelp: "ছবিতে কনভেয়র বেল্টে একটি ক্ষতিগ্রস্ত এবং ছেঁড়া কার্ডবোর্ডের কার্টন দেখা যাচ্ছে। প্রথমে ক্ষতিগ্রস্ত কার্টনটিকে নিরাপদে আলাদা করুন। এরপর রোবোটিক গ্রিপার, কনভেয়র প্লেট এবং প্যাকেজিং গুণমান পরীক্ষা করুন।",
      responseStackLight: "লাল সতর্ক বাতি জ্বলছে। এর সঠিক অ্যালার্ম কোড পিএলসি/এইচএমআই স্ক্রিন থেকে দেখে নিশ্চিত করুন।"
    },
    safetyGate: {
      title: 'মানবীয় অনুমোদন প্রয়োজন',
      subtitle: 'লেভেল ২ আর্থিক সুরক্ষা গেট ($245.00)',
      actionRequest: 'অনুরোধকৃত পদক্ষেপ',
      financialAllocation: 'খরচ বরাদ্দ',
      reason: 'পদক্ষেপের কারণ',
      groundedEvidence: 'ম্যানুয়াল প্রমাণ',
      reject: 'প্রত্যাখ্যান করুন',
      reviewEvidence: 'প্রমাণ দেখুন',
      authorize: 'অনুমোদন ও অর্ডার করুন ($245.00)'
    },
    quotes: {
      q1: 'হাত ব্যস্ত। এআই অনুসন্ধান পরিচালনা করে।',
      q2: 'সংকেত থেকে উপলব্ধি → দ্রুত পদক্ষেপ।',
      q3: 'এআই টেকনিশিয়ানকে সহায়তা করবে, প্রতিস্থাপন করবে না।',
      q4: 'প্রতিটি সুপারিশের জন্য প্রমাণিত ম্যানুয়াল তথ্য থাকা আবশ্যক।',
      q5: 'অটোমেশন দ্রুত চলে, নিরাপত্তা সিদ্ধান্ত নেয় কখন থামতে হবে।'
    }
  },
  ta: {
    nav: {
      liveRepair: 'நேரடி பழுதுபார்ப்பு',
      equipment: 'உபகரண இரட்டை',
      knowledge: 'தொழில்நுட்ப கையேடு',
      agentActions: 'முகவர் செயல்கள்',
      sessionMemory: 'அமர்வு நினைவகம்',
      tickets: 'டிக்கெட்டுகள் & பாகங்கள்',
      supervisor: 'மேற்பார்வையாளர் மையம்',
      analytics: 'பகுப்பாய்வு',
      story: 'வாக்ஸ்லென்ஸ் கதை'
    },
    header: {
      liveSession: 'நேரடி அமர்வு',
      fault: 'பிழை',
      scenario: 'சூழ்நிலை',
      startDemo: 'டெமோ தொடங்கவும்',
      watchStory: 'கதை பார்க்கவும்',
      techRole: 'டெக்னீஷியன்',
      supervisorRole: 'மேற்பார்வையாளர்'
    },
    liveRepair: {
      voiceTitle: 'குரல் உள்ளீடு',
      visionTitle: 'கேமரா பார்வை & குறைபாடு',
      knowledgeTitle: 'கையேடு சான்று',
      synthesisTitle: 'AI முடிவு தயார்',
      talkToVoxlens: 'பேச கிளிக் செய்யவும்',
      listening: 'கேட்கிறது...',
      processing: 'செயலாக்குகிறது...',
      triggerScan: 'ஸ்கேன் செய்க',
      quickPromptsTitle: 'பரிந்துரைக்கப்பட்ட கேள்விகள்'
    },
    copilot: {
      greeting: "கன்வேயர் பெல்ட்டில் சேதமடைந்த அட்டைப்பெட்டி தெரிகிறது. முதலில் பாதிக்கப்பட்ட பெட்டியை தனிமைப்படுத்தவும். பின்னர் ரோபோடிக் கிரிப்பர் மற்றும் கன்வேயரை ஆய்வு செய்யவும். சிவப்பு எச்சரிக்கை விளக்கின் பிழைக் குறியீட்டை HMI அல்லது PLC இலிருந்து சரிபார்க்கவும்.",
      e17Diagnosis: "கன்வேயர் பெல்ட்டில் சேதமடைந்த அட்டைப்பெட்டி தெரிகிறது. முதலில் பாதிக்கப்பட்ட பெட்டியை தனிமைப்படுத்தவும். பின்னர் ரோபோடிக் கிரிப்பர் மற்றும் கன்வேயரை ஆய்வு செய்யவும். சிவப்பு எச்சரிக்கை விளக்கின் பிழைக் குறியீட்டை HMI அல்லது PLC இலிருந்து சரிபார்க்கவும்.",
      cartonDiagnosis: "கன்வேயர் பெல்ட்டில் சேதமடைந்த அட்டைப்பெட்டி தெரிகிறது. முதலில் பாதிக்கப்பட்ட பெட்டியை தனிமைப்படுத்தவும். பின்னர் ரோபோடிக் கிரிப்பர் மற்றும் கன்வேயரை ஆய்வு செய்யவும். சிவப்பு எச்சரிக்கை விளக்கின் பிழைக் குறியீட்டை HMI அல்லது PLC இலிருந்து சரிபார்க்கவும்.",
      recTitle: "பரிந்துரைக்கப்பட்ட 8-படி பணிப்பாய்வு:",
      recStep1: "1. பாதுகாப்பு: LOTO Disconnect-3A ஐப் பயன்படுத்தி உபகரணங்களை தனிமைப்படுத்தவும்.",
      recStep2: "2. கட்டுப்படுத்துதல்: சேதமடைந்த பெட்டியை அகற்றி அருகிலுள்ள பெட்டிகளை ஆய்வு செய்யவும்.",
      recStep3: "3. இயந்திர ஆய்வு: ரோபோ கிரிப்பர் மற்றும் கன்வேயர் தட்டுகளை ஆய்வு செய்யவும்.",
      questionAction: "8-படி பழுதுபார்ப்பு சரிபார்ப்புப் பட்டியலை உங்களுக்கு வழிகாட்டவா?",
      groundedByManual: "SOP §6.2 மூலம் சரிபார்க்கப்பட்டது",
      viewEvidence: "SOP §6.2 ஐப் பார்க்கவும்",
      safetyRequired: "மனித ஒப்புதல் தேவை",
      reviewAndAuthorize: "மதிப்பாய்வு செய்து ஒப்புதல் அளிக்கவும்",
      placeholder: "தமிழில் கேட்கவும் அல்லது மைக்கில் பேசவும்...",
      quickPrompts: [
        { label: "பெட்டி சேதம் பகுப்பாய்வு", query: "கன்வேயரில் உள்ள பெட்டி சேதத்தை விளக்குங்கள்" },
        { label: "முதலில் என்ன செய்ய வேண்டும்?", query: "இந்த குறைபாட்டிற்கு முதலில் என்ன சரிபார்க்க வேண்டும்?" },
        { label: "சிவப்பு விளக்கின் பொருள்", query: "சிவப்பு எச்சரிக்கை விளக்கு எதைக் குறிக்கிறது?" },
        { label: "8-படி பழுது பணிப்பாய்வு", query: "8-படி பழுதுபார்க்கும் வழிகாட்டியை காட்டுங்கள்" }
      ],
      responseE17Mean: "சிவப்பு விளக்கு செயலில் உள்ளது. சரியான பிழைக் குறியீட்டை HMI அல்லது PLC பதிவிலிருந்து சரிபார்க்கவும்.",
      responseCheckFirst: "படி 1 — பாதுகாப்பு: முதலில் LOTO SW-1 ஐப் பயன்படுத்தி இயந்திரத்தை தனிமைப்படுத்தவும். படி 2 — சேதமடைந்த பெட்டியை தனிமைப்படுத்தவும்.",
      responseCheckFan: "இருப்பு விவரம்: பே 4 இல் 3 கிரிப்பர் கிட்கள் (#PKG-GRP42, $245.00) கிடைக்கின்றன.",
      responseCreateTicket: "லைன் 3 பேக்கேஜிங்கிற்கான பணி ஆணை #TCK-2026-881 தயாராக உள்ளது. மனித ஒப்புதல் தேவை.",
      responseScanDetected: "ஸ்கேன் முடிந்தது: சேதமடைந்த அட்டைப்பெட்டி மற்றும் சிவப்பு எச்சரிக்கை விளக்கு கண்டறியப்பட்டது.",
      responseCartonHelp: "கன்வேயர் பெல்ட்டில் சேதமடைந்த அட்டைப்பெட்டி தெரிகிறது. முதலில் பாதிக்கப்பட்ட பெட்டியை தனிமைப்படுத்தவும்.",
      responseStackLight: "சிவப்பு எச்சரிக்கை விளக்கு எரிகிறது. PLC/HMI திரையில் இருந்து பிழைக் குறியீட்டை சரிபார்க்கவும்."
    },
    safetyGate: {
      title: 'மனித ஒப்புதல் தேவை',
      subtitle: 'நிலை 2 நிதி பாதுகாப்பு வாயில் ($245.00)',
      actionRequest: 'கோரப்பட்ட நடவடிக்கை',
      financialAllocation: 'நிதி ஒதுக்கீடு',
      reason: 'நடவடிக்கைக்கான காரணம்',
      groundedEvidence: 'கையேடு சான்றுகள்',
      reject: 'நிராகரி',
      reviewEvidence: 'சான்றுகளை பார்',
      authorize: 'ஒப்புதல் & அனுப்புக ($245.00)'
    },
    quotes: {
      q1: 'கைகள் வேலையில். AI தேடலை கையாள்கிறது.',
      q2: 'சமிக்ஞையிலிருந்து புரிதல் → விரைவான நடவடிக்கை.',
      q3: 'AI தொழில்நுட்ப வல்லுநருக்கு உதவ வேண்டும், மாற்றாக அமையக்கூடாது.',
      q4: 'ஒவ்வொரு பரிந்துரைக்கும் கையேடு ஆதாரம் இருக்க வேண்டும்.',
      q5: 'ஆட்டோமேஷன் வேகமாக நகர்கிறது, பாதுகாப்பு எப்போது நிறுத்த வேண்டும் என்பதை தீர்மானிக்கிறது.'
    }
  },
  te: {
    nav: {
      liveRepair: 'లైవ్ రిపేర్',
      equipment: 'ఎక్విప్‌మెంట్ ట్విన్',
      knowledge: 'టెక్నికల్ మాన్యువల్',
      agentActions: 'ఏజెంట్ చర్యలు',
      sessionMemory: 'సెషన్ మెమరీ',
      tickets: 'టికెట్లు & భాగాలు',
      supervisor: 'సూపర్‌వైజర్ సెంటర్',
      analytics: 'విశ్లేషణలు',
      story: 'వోక్స్‌లెన్స్ స్టోరీ'
    },
    header: {
      liveSession: 'లైవ్ సెషన్',
      fault: 'లోపం',
      scenario: 'పరిస్థితి',
      startDemo: 'డెమో ప్రారంభించండి',
      watchStory: 'స్టోరీ చూడండి',
      techRole: 'టెక్నీషియన్',
      supervisorRole: 'సూపర్‌వైజర్'
    },
    liveRepair: {
      voiceTitle: 'వాయిస్ స్ట్రీమ్',
      visionTitle: 'కెమెరా విజన్ & డిఫెక్ట్',
      knowledgeTitle: 'మాన్యువల్ ఆధారాలు',
      synthesisTitle: 'AI నిర్ణయం సిద్ధం',
      talkToVoxlens: 'మాట్లాడండి',
      listening: 'వింటోంది...',
      processing: 'విశ్లేషిస్తోంది...',
      triggerScan: 'స్కాన్ చేయండి',
      quickPromptsTitle: 'సూచించిన ప్రశ్నలు'
    },
    copilot: {
      greeting: "కన్వేయర్ బెల్ట్‌పై దెబ్బతిన్న కార్డ్‌బోర్డ్ పెట్టె కనిపిస్తోంది. మొదట దెబ్బతిన్న పెట్టెను వేరు చేయండి. ఆ తర్వాత రోబోటిక్ గ్రిప్పర్ మరియు కన్వేయర్ ప్లేట్‌ను తనిఖీ చేయండి. ఎరుపు హెచ్చరిక లైట్ యొక్క ఖచ్చితమైన లోపాన్ని HMI లేదా PLC నుండి ధృవీకరించండి.",
      e17Diagnosis: "కన్వేయర్ బెల్ట్‌పై దెబ్బతిన్న కార్డ్‌బోర్డ్ పెట్టె కనిపిస్తోంది. మొదట దెబ్బతిన్న పెట్టెను వేరు చేయండి. ఆ తర్వాత రోబోటిక్ గ్రిప్పర్ మరియు కన్వేయర్ ప్లేట్‌ను తనిఖీ చేయండి. ఎరుపు హెచ్చరిక లైట్ యొక్క ఖచ్చితమైన లోపాన్ని HMI లేదా PLC నుండి ధృవీకరించండి.",
      cartonDiagnosis: "కన్వేయర్ బెల్ట్‌పై దెబ్బతిన్న కార్డ్‌బోర్డ్ పెట్టె కనిపిస్తోంది. మొదట దెబ్బతిన్న పెట్టెను వేరు చేయండి. ఆ తర్వాత రోబోటిక్ గ్రిప్పర్ మరియు కన్వేయర్ ప్లేట్‌ను తనిఖీ చేయండి. ఎరుపు హెచ్చరిక లైట్ యొక్క ఖచ్చితమైన లోపాన్ని HMI లేదా PLC నుండి ధృవీకరించండి.",
      recTitle: "సిఫార్సు చేయబడిన 8-దశల వర్క్‌ఫ్లో:",
      recStep1: "1. భద్రత: LOTO Disconnect-3A ద్వారా పరికరాన్ని ఐసోలేట్ చేయండి.",
      recStep2: "2. నియంత్రణ: దెబ్బతిన్న పెట్టెను తొలగించి పక్కన ఉన్న పెట్టెలను తనిఖీ చేయండి.",
      recStep3: "3. యాంత్రిక తనిఖీ: రోబోట్ గ్రిప్పర్ మరియు కన్వేయర్ ప్లేట్‌ను పరిశీలించండి.",
      questionAction: "నేను 8-దశల రిపేర్ చెక్‌లిస్ట్‌ను మీకు చూపించమంటారా?",
      groundedByManual: "SOP §6.2 ద్వారా ధృవీకరించబడింది",
      viewEvidence: "SOP §6.2 చూడండి",
      safetyRequired: "మానవ ఆమోదం అవసరం",
      reviewAndAuthorize: "సమీక్షించి ఆమోదించండి",
      placeholder: "తెలుగులో అడగండి లేదా మైక్‌లో మాట్లాడండి...",
      quickPrompts: [
        { label: "దెబ్బతిన్న పెట్టె విశ్లేషణ", query: "కన్వేయర్‌పై దెబ్బతిన్న పెట్టె లోపాన్ని వివరించండి" },
        { label: "మొదట ఏమి తనిఖీ చేయాలి?", query: "ఈ లోపానికి మొదట ఏమి చేయాలి?" },
        { label: "ఎరుపు లైట్ అర్థం", query: "ఎరుపు టవర్ లైట్ అర్థం ఏమిటి?" },
        { label: "8-దశల రిపేర్ వర్క్‌ఫ్లో", query: "8-దశల రిపేర్ గైడ్‌ను చూపించండి" }
      ],
      responseE17Mean: "ఎరుపు టవర్ లైట్ ఆన్‌లో ఉంది. ఖచ్చితమైన ఎర్రర్ కోడ్‌ను HMI స్క్రీన్ లేదా PLC లాగ్ నుండి ధృవీకరించండి.",
      responseCheckFirst: "దశ 1 — భద్రత: ముందుగా LOTO SW-1 ద్వారా మెషీన్‌ను ఆపండి. దశ 2 — దెబ్బతిన్న పెట్టెను వేరు చేయండి.",
      responseCheckFan: "ఇన్వెంటరీ నివేదిక: బే 4 లో 3 గ్రిప్పర్ కిట్‌లు (#PKG-GRP42, $245.00) అందుబాటులో ఉన్నాయి.",
      responseCreateTicket: "నేను లైన్ 3 కోసం వర్క్ ఆర్డర్ #TCK-2026-881 తయారు చేసాను. మానవ ఆమోదం అవసరం.",
      responseScanDetected: "స్కాన్ పూర్తయింది: దెబ్బతిన్న కార్టన్ మరియు ఎరుపు హెచ్చరిక సూచిక గుర్తించబడింది.",
      responseCartonHelp: "కన్వేయర్ బెల్ట్‌పై దెబ్బతిన్న కార్డ్‌బోర్డ్ పెట్టె కనిపిస్తోంది. మొదట దెబ్బతిన్న పెట్టెను వేరు చేయండి.",
      responseStackLight: "ఎరుపు లైట్ ఆన్‌లో ఉంది. రంగు ఆధారంగా అంచనా వేయవద్దు, PLC లాగ్ నుండి ధృవీకరించండి."
    },
    safetyGate: {
      title: 'మానవ ఆమోదం అవసరం',
      subtitle: 'లెవల్ 2 ఆర్థిక భద్రతా గేట్ ($245.00)',
      actionRequest: 'కోరబడిన చర్య',
      financialAllocation: 'ఖర్చు కేటాయింపు',
      reason: 'చర్యకు కారణం',
      groundedEvidence: 'మాన్యువల్ ఆధారాలు',
      reject: 'తిరస్కరించండి',
      reviewEvidence: 'ఆధారాలు చూడండి',
      authorize: 'ఆమోదించి పంపండి ($245.00)'
    },
    quotes: {
      q1: 'చేతులు బిజీగా ఉన్నప్పుడు, AI శోధనను నిర్వహిస్తుంది.',
      q2: 'సిగ్నల్ నుండి అవగాహన → వేగవంతమైన చర్య.',
      q3: 'AI టెక్నీషియన్‌కు సహాయం చేయాలి, భర్తీ చేయకూడదు.',
      q4: 'ప్రతి సిఫార్సుకు సరైన మాన్యువల్ ఆధారం ఉండాలి.',
      q5: 'ఆటోమేషన్ వేగంగా కదులుతుంది, భద్రత ఎప్పుడు ఆపాలో నిర్ణయిస్తుంది.'
    }
  },
  mr: {
    nav: {
      liveRepair: 'थेट दुरुस्ती',
      equipment: 'उपकरण ट्विन',
      knowledge: 'तांत्रिक मॅन्युअल',
      agentActions: 'एजंट कृती',
      sessionMemory: 'सत्र मेमरी',
      tickets: 'तिकीट व स्पेअर्स',
      supervisor: 'सुपरवायझर केंद्र',
      analytics: 'विश्लेषण',
      story: 'वॉकस्लेन्स कथा'
    },
    header: {
      liveSession: 'थेट सत्र',
      fault: 'त्रुटी',
      scenario: 'परिस्थिती',
      startDemo: 'डेमो सुरू करा',
      watchStory: 'कथा पहा',
      techRole: 'तंत्रज्ञ',
      supervisorRole: 'सुपरवायझर'
    },
    liveRepair: {
      voiceTitle: 'व्हॉइस इनपुट',
      visionTitle: 'कॅमेरा व्हिजन व डिफेक्ट',
      knowledgeTitle: 'मॅन्युअल पुरावा',
      synthesisTitle: 'AI निर्णय सज्ज',
      talkToVoxlens: 'बोला',
      listening: 'ऐकत आहे...',
      processing: 'प्रक्रिया सुरू आहे...',
      triggerScan: 'स्कॅन सुरू करा',
      quickPromptsTitle: 'सुचवलेले प्रश्न'
    },
    copilot: {
      greeting: "कन्व्हेयर बेल्टवर खराब झालेला आणि फाटलेला पुठ्ठा बॉक्स दिसत आहे. प्रथम खराब झालेला बॉक्स सुरक्षितपणे वेगळा करा. त्यानंतर रोबोटिक ग्रिपर आणि कन्व्हेयर प्लेट तपासा. लाल दिव्याचा खरा अलार्म HMI किंवा PLC वरून तपासा.",
      e17Diagnosis: "कन्व्हेयर बेल्टवर खराब झालेला आणि फाटलेला पुठ्ठा बॉक्स दिसत आहे. प्रथम खराब झालेला बॉक्स सुरक्षितपणे वेगळा करा. त्यानंतर रोबोटिक ग्रिपर आणि कन्व्हेयर प्लेट तपासा. लाल दिव्याचा खरा अलार्म HMI किंवा PLC वरून तपासा.",
      cartonDiagnosis: "कन्व्हेयर बेल्टवर खराब झालेला आणि फाटलेला पुठ्ठा बॉक्स दिसत आहे. प्रथम खराब झालेला बॉक्स सुरक्षितपणे वेगळा करा. त्यानंतर रोबोटिक ग्रिपर आणि कन्व्हेयर प्लेट तपासा. लाल दिव्याचा खरा अलार्म HMI किंवा PLC वरून तपासा.",
      recTitle: "शिफारस केलेला 8-टप्प्यांचा वर्कफ्लो:",
      recStep1: "1. सुरक्षा: LOTO Disconnect-3A वापरून मशीन सुरक्षित करा.",
      recStep2: "2. नियंत्रण: खराब बॉक्स वेगळा करा आणि जवळचे बॉक्स तपासा.",
      recStep3: "3. यांत्रिक तपासणी: रोबोट ग्रिपर आणि कन्व्हेयर प्लेट तपासा.",
      questionAction: "मी तुम्हाला 8-टप्प्यांच्या दुरुस्ती चेकलिस्टमध्ये मार्गदर्शन करू का?",
      groundedByManual: "SOP §6.2 द्वारे प्रमाणित",
      viewEvidence: "SOP §6.2 पहा",
      safetyRequired: "मानवी मंजुरी आवश्यक",
      reviewAndAuthorize: "पुनरावलोकन करा आणि मंजूर करा",
      placeholder: "मराठीत विचारा किंवा माईकमध्ये बोला...",
      quickPrompts: [
        { label: "खराब बॉक्स विश्लेषण", query: "कन्व्हेयरवरील खराब पुठ्ठा बॉक्सचे विश्लेषण करा" },
        { label: "प्रथम काय तपासावे?", query: "या समस्येसाठी प्रथम काय करावे?" },
        { label: "लाल दिव्याचा अर्थ", query: "लाल टॉवर दिव्याचा अर्थ काय आहे?" },
        { label: "8-टप्प्यांचा वर्कफ्लो", query: "8-टप्प्यांची दुरुस्ती मार्गदर्शिका दाखवा" }
      ],
      responseE17Mean: "लाल दिवा सुरू आहे. खरा फॉल्ट कोड HMI स्क्रीन किंवा PLC लॉगवरून तपासा.",
      responseCheckFirst: "पायरी 1 — सुरक्षा: प्रथम LOTO SW-1 वापरून मशीन बंद करा. पायरी 2 — खराब बॉक्स वेगळा करा.",
      responseCheckFan: "इन्व्हेंटरी तपासणी: बे 4 मध्ये 3 ग्रिपर किट (#PKG-GRP42, $245.00) उपलब्ध आहेत.",
      responseCreateTicket: "मी लाईन 3 साठी वर्क ऑर्डर #TCK-2026-881 तयार केली आहे. मानवी मंजुरी आवश्यक आहे.",
      responseScanDetected: "स्कॅन यशस्वी: खराब पुठ्ठा बॉक्स आणि लाल दिवा ओळखला गेला.",
      responseCartonHelp: "कन्व्हेयर बेल्टवर खराब झालेला पुठ्ठा बॉक्स दिसत आहे. प्रथम त्याला वेगळे करा.",
      responseStackLight: "लाल दिवा सक्रिय आहे. रंगावरून अंदाज न लावता PLC लॉगमधून त्रुटी तपासा."
    },
    safetyGate: {
      title: 'मानवी मंजुरी आवश्यक',
      subtitle: 'पातळी 2 आर्थिक सुरक्षा गेट ($245.00)',
      actionRequest: 'मागितलेली कारवाई',
      financialAllocation: 'खर्च वाटप',
      reason: 'कारवाईचे कारण',
      groundedEvidence: 'मॅन्युअल पुरावा',
      reject: 'नाकारा',
      reviewEvidence: 'पुरावा पहा',
      authorize: 'मंजूर करा व पाठवा ($245.00)'
    },
    quotes: {
      q1: 'हात कामात व्यस्त असताना AI शोध सांभाळतो.',
      q2: 'संकेतावरून समज → तत्काळ कारवाई.',
      q3: 'AI ने तंत्रज्ञाला मदत करावी, त्याची जागा घेऊ नये.',
      q4: 'प्रत्येक शिफारशीमागे मॅन्युअलचा पुरावा असावा.',
      q5: 'ऑटोमेशन वेगाने काम करते, सुरक्षेमुळे कधी थांबायचे ते ठरते.'
    }
  },
  gu: {
    nav: {
      liveRepair: 'લાઈવ રીપેર',
      equipment: 'ઈક્વિપમેન્ટ ટ્વીન',
      knowledge: 'ટેકનિકલ મેન્યુઅલ',
      agentActions: 'એજન્ટ ક્રિયાઓ',
      sessionMemory: 'સત્ર મેમરી',
      tickets: 'ટિકિટ અને પાર્ટ્સ',
      supervisor: 'સુપરવાઈઝર કેન્દ્ર',
      analytics: 'વિશ્લેષણ',
      story: 'વોક્સલેન્સ વાર્તા'
    },
    header: {
      liveSession: 'લાઈવ સત્ર',
      fault: 'ખામી',
      scenario: 'પરિસ્થિતિ',
      startDemo: 'ડેમો શરૂ કરો',
      watchStory: 'વાર્તા જુઓ',
      techRole: 'ટેકનિશિયન',
      supervisorRole: 'સુપરવાઈઝર'
    },
    liveRepair: {
      voiceTitle: 'વોઇસ ઇનપુટ',
      visionTitle: 'કેમેરા વિઝન અને ડિફેક્ટ',
      knowledgeTitle: 'મેન્યુઅલ પુરાવા',
      synthesisTitle: 'AI નિર્ણય તૈયાર',
      talkToVoxlens: 'બોલો',
      listening: 'સાંભળી રહ્યું છે...',
      processing: 'પ્રોસેસિંગ ચાલુ છે...',
      triggerScan: 'સ્કેન શરૂ કરો',
      quickPromptsTitle: 'સૂચવેલા પ્રશ્નો'
    },
    copilot: {
      greeting: "કન્વેયર બેલ્ટ પર ખરાબ રીતે ક્ષતિગ્રસ્ત કાર્ડબોર્ડ બોક્સ દેખાય છે. પહેલા ક્ષતિગ્રસ્ત બોક્સને સુરક્ષિત રીતે અલગ કરો. પછી રોબોટિક ગ્રિપર અને કન્વેયર પ્લેટ તપાસો. લાલ લાઇટનો સચોટ એલાર્મ HMI અથવા PLC માંથી ચકાસો.",
      e17Diagnosis: "કન્વેયર બેલ્ટ પર ખરાબ રીતે ક્ષતિગ્રસ્ત કાર્ડબોર્ડ બોક્સ દેખાય છે. પહેલા ક્ષતિગ્રસ્ત બોક્સને સુરક્ષિત રીતે અલગ કરો. પછી રોબોટિક ગ્રિપર અને કન્વેયર પ્લેટ તપાસો. લાલ લાઇટનો સચોટ એલાર્મ HMI અથવા PLC માંથી ચકાસો.",
      cartonDiagnosis: "કન્વેયર બેલ્ટ પર ખરાબ રીતે ક્ષતિગ્રસ્ત કાર્ડબોર્ડ બોક્સ દેખાય છે. પહેલા ક્ષતિગ્રસ્ત બોક્સને સુરક્ષિત રીતે અલગ કરો. પછી રોબોટિક ગ્રિપર અને કન્વેયર પ્લેટ તપાસો. લાલ લાઇટનો સચોટ એલાર્મ HMI અથવા PLC માંથી ચકાસો.",
      recTitle: "ભલામણ કરેલ 8-પગલાંનો વર્કફ્લો:",
      recStep1: "1. સલામતી: LOTO Disconnect-3A લાગુ કરીને મશીન સુરક્ષિત કરો.",
      recStep2: "2. નિયંત્રણ: ક્ષતિગ્રસ્ત બોક્સને અલગ કરો અને આસપાસના બોક્સ તપાસો.",
      recStep3: "3. યાંત્રિક તપાસ: રોબોટ ગ્રિપર અને કન્વેયર પ્લેટ તપાસો.",
      questionAction: "શું હું તમને 8-પગલાંની રીપેર ચેકલિસ્ટમાં માર્ગદર્શન આપું?",
      groundedByManual: "SOP §6.2 દ્વારા પ્રમાણિત",
      viewEvidence: "SOP §6.2 જુઓ",
      safetyRequired: "માનવીય મંજૂરી જરૂરી",
      reviewAndAuthorize: "સમીક્ષા કરો અને મંજૂર કરો",
      placeholder: "ગુજરાતીમાં પૂછો અથવા માઇકમાં બોલો...",
      quickPrompts: [
        { label: "ક્ષતિગ્રસ્ત બોક્સ વિશ્લેષણ", query: "કન્વેયર પરના ક્ષતિગ્રસ્ત બોક્સની ખામી સમજાવો" },
        { label: "પહેલા શું તપાસવું?", query: "આ ખામી માટે પહેલા શું કરવું જોઈએ?" },
        { label: "લાલ લાઇટનો અર્થ", query: "લાલ ટાવર લાઇટનો અર્થ શું છે?" },
        { label: "8-પગલાંનો વર્કફ્લો", query: "8-પગલાંની રીપેર માર્ગદર્શિકા બતાવો" }
      ],
      responseE17Mean: "લાલ લાઇટ સક્રિય છે. સચોટ ફોલ્ટ કોડ HMI સ્ક્રીન અથવા PLC લોગમાંથી ચકાસવો જરૂરી છે.",
      responseCheckFirst: "પગલું 1 — સલામતી: પહેલા LOTO SW-1 થી મશીન બંધ કરો. પગલું 2 — ક્ષતિગ્રસ્ત બોક્સ અલગ કરો.",
      responseCheckFan: "ઇન્વેન્ટરી રિપોર્ટ: બે 4 માં 3 ગ્રિપર કિટ (#PKG-GRP42, $245.00) ઉપલબ્ધ છે.",
      responseCreateTicket: "મેં લાઇન 3 માટે વર્ક ઓર્ડર #TCK-2026-881 તૈયાર કર્યો છે. માનવીય મંજૂરી જરૂરી છે.",
      responseScanDetected: "સ્કેન સફળ: ક્ષતિગ્રસ્ત બોક્સ અને લાલ લાઇટની ઓળખ થઈ.",
      responseCartonHelp: "કન્વેયર બેલ્ટ પર ક્ષતિગ્રસ્ત બોક્સ દેખાય છે. પહેલા તેને અલગ કરો.",
      responseStackLight: "લાલ ટાવર લાઇટ સક્રિય છે. રંગ પરથી અનુમાન ન કરો, PLC લોગમાંથી ચકાસો."
    },
    safetyGate: {
      title: 'માનવીય મંજૂરી જરૂરી',
      subtitle: 'સ્તર 2 નાણાકીય સુરક્ષા ગેટ ($245.00)',
      actionRequest: 'વિનંતી કરેલ ક્રિયા',
      financialAllocation: 'ખર્ચ ફાળવણી',
      reason: 'ક્રિયા માટેનું કારણ',
      groundedEvidence: 'મેન્યુઅલ પુરાવા',
      reject: 'અસ્વીકાર કરો',
      reviewEvidence: 'પુરાવા જુઓ',
      authorize: 'મંજૂર કરો અને મોકલો ($245.00)'
    },
    quotes: {
      q1: 'હાથ કામમાં વ્યસ્ત હોય ત્યારે AI શોધ સંભાળે છે.',
      q2: 'સિગ્નલથી સમજ → ઝડપી કાર્યવાહી.',
      q3: 'AI એ ટેકનિશિયનને મદદ કરવી જોઈએ, તેની જગ્યા ન લેવી જોઈએ.',
      q4: 'દરેક ભલામણ પાછળ મેન્યુઅલનો પુરાવો હોવો જરૂરી છે.',
      q5: 'ઓટોમેશન ઝડપથી ચાલે છે, સલામતી નક્કી કરે છે કે ક્યારે અટકવું.'
    }
  },
  kn: {
    nav: {
      liveRepair: 'ಲೈವ್ ರಿಪೇರಿ',
      equipment: 'ಉಪಕರಣ ಟ್ವಿನ್',
      knowledge: 'ತಾಂತ್ರಿಕ ಕೈಪಿಡಿ',
      agentActions: 'ಏಜೆಂಟ್ ಕ್ರಮಗಳು',
      sessionMemory: 'ಸೆಷನ್ ಮೆಮೊರಿ',
      tickets: 'ಟಿಕೆಟ್‌ಗಳು & ಬಿಡಿಭಾಗಗಳು',
      supervisor: 'ಮೇಲ್ವಿಚಾರಕ ಕೇಂದ್ರ',
      analytics: 'ವಿಶ್ಲೇಷಣೆ',
      story: 'ವೋಕ್ಸ್‌ಲೆನ್ಸ್ ಕಥೆ'
    },
    header: {
      liveSession: 'ಲೈವ್ ಸೆಷನ್',
      fault: 'ದೋಷ',
      scenario: 'ಸನ್ನಿವೇಶ',
      startDemo: 'ಡೆಮೊ ಪ್ರಾರಂಭಿಸಿ',
      watchStory: 'ಕಥೆ ನೋಡಿ',
      techRole: 'ತಂತ್ರಜ್ಞ',
      supervisorRole: 'ಮೇಲ್ವಿಚಾರಕ'
    },
    liveRepair: {
      voiceTitle: 'ಧ್ವನಿ ಇನ್‌ಪುಟ್',
      visionTitle: 'ಕ್ಯಾಮೆರಾ ದೃಷ್ಟಿ & ದೋಷ',
      knowledgeTitle: 'ಕೈಪಿಡಿ ಸಾಕ್ಷ್ಯ',
      synthesisTitle: 'AI ನಿರ್ಧಾರ ಸಿದ್ಧ',
      talkToVoxlens: 'ಮಾತನಾಡಿ',
      listening: 'ಕೇಳಿಸಿಕೊಳ್ಳುತ್ತಿದೆ...',
      processing: 'ವಿಶ್ಲೇಷಿಸಲಾಗುತ್ತಿದೆ...',
      triggerScan: 'ಸ್ಕ್ಯಾನ್ ಮಾಡಿ',
      quickPromptsTitle: 'ಶಿಫಾರಸು ಮಾಡಿದ ಪ್ರಶ್ನೆಗಳು'
    },
    copilot: {
      greeting: "ಕನ್ವೇಯರ್ ಬೆಲ್ಟ್‌ನಲ್ಲಿ ಹಾನಿಗೊಳಗಾದ ಮತ್ತು ಹರಿದ ಕಾರ್ಡ್‌ಬೋರ್ಡ್ ಬಾಕ್ಸ್ ಕಾಣಿಸುತ್ತಿದೆ. ಮೊದಲು ಹಾನಿಗೊಳಗಾದ ಬಾಕ್ಸ್ ಅನ್ನು ಪ್ರತ್ಯೇಕಿಸಿ. ನಂತರ ರೋಬೋಟಿಕ್ ಗ್ರಿಪ್ಪರ್ ಮತ್ತು ಕನ್ವೇಯರ್ ಪ್ಲೇಟ್ ಪರಿಶೀಲಿಸಿ. ಕೆಂಪು ದೀಪದ ನಿಖರವಾದ ಎಚ್ಚರಿಕೆಯನ್ನು HMI ಅಥವಾ PLC ಯಿಂದ ಪರಿಶೀಲಿಸಿ.",
      e17Diagnosis: "ಕನ್ವೇಯರ್ ಬೆಲ್ಟ್‌ನಲ್ಲಿ ಹಾನಿಗೊಳಗಾದ ಮತ್ತು ಹರಿದ ಕಾರ್ಡ್‌ಬೋರ್ಡ್ ಬಾಕ್ಸ್ ಕಾಣಿಸುತ್ತಿದೆ. ಮೊದಲು ಹಾನಿಗೊಳಗಾದ ಬಾಕ್ಸ್ ಅನ್ನು ಪ್ರತ್ಯೇಕಿಸಿ. ನಂತರ ರೋಬೋಟಿಕ್ ಗ್ರಿಪ್ಪರ್ ಮತ್ತು ಕನ್ವೇಯರ್ ಪ್ಲೇಟ್ ಪರಿಶೀಲಿಸಿ. ಕೆಂಪು ದೀಪದ ನಿಖರವಾದ ಎಚ್ಚರಿಕೆಯನ್ನು HMI ಅಥವಾ PLC ಯಿಂದ ಪರಿಶೀಲಿಸಿ.",
      cartonDiagnosis: "ಕನ್ವೇಯರ್ ಬೆಲ್ಟ್‌ನಲ್ಲಿ ಹಾನಿಗೊಳಗಾದ ಮತ್ತು ಹರಿದ ಕಾರ್ಡ್‌ಬೋರ್ಡ್ ಬಾಕ್ಸ್ ಕಾಣಿಸುತ್ತಿದೆ. ಮೊದಲು ಹಾನಿಗೊಳಗಾದ ಬಾಕ್ಸ್ ಅನ್ನು ಪ್ರತ್ಯೇಕಿಸಿ. ನಂತರ ರೋಬೋಟಿಕ್ ಗ್ರಿಪ್ಪರ್ ಮತ್ತು ಕನ್ವೇಯರ್ ಪ್ಲೇಟ್ ಪರಿಶೀಲಿಸಿ. ಕೆಂಪು ದೀಪದ ನಿಖರವಾದ ಎಚ್ಚರಿಕೆಯನ್ನು HMI ಅಥವಾ PLC ಯಿಂದ ಪರಿಶೀಲಿಸಿ.",
      recTitle: "ಶಿಫಾರಸು ಮಾಡಲಾದ 8-ಹಂತದ ವರ್ಕ್‌ಫ್ಲೋ:",
      recStep1: "1. ಸುರಕ್ಷತೆ: LOTO Disconnect-3A ಅನ್ವಯಿಸಿ ಯಂತ್ರವನ್ನು ಪ್ರತ್ಯೇಕಿಸಿ.",
      recStep2: "2. ನಿಯಂತ್ರಣ: ಹಾನಿಗೊಳಗಾದ ಬಾಕ್ಸ್ ತೆಗೆದು ಪಕ್ಕದ ಬಾಕ್ಸ್‌ಗಳನ್ನು ಪರಿಶೀಲಿಸಿ.",
      recStep3: "3. ಯಾಂತ್ರಿಕ ತಪಾಸಣೆ: ರೋಬೋಟ್ ಗ್ರಿಪ್ಪರ್ ಮತ್ತು ಕನ್ವೇಯರ್ ಪ್ಲೇಟ್ ಪರಿಶೀಲಿಸಿ.",
      questionAction: "8-ಹಂತದ ರಿಪೇರಿ ಪರಿಶೀಲನಾ ಪಟ್ಟಿಯನ್ನು ನಿಮಗೆ ಮಾರ್ಗದರ್ಶನ ಮಾಡಲೇ?",
      groundedByManual: "SOP §6.2 ರಿಂದ ದೃಢೀಕರಿಸಲಾಗಿದೆ",
      viewEvidence: "SOP §6.2 ನೋಡಿ",
      safetyRequired: "ಮಾನವ ಅನುಮೋದನೆ ಅಗತ್ಯವಿದೆ",
      reviewAndAuthorize: "ಪರಿಶೀಲಿಸಿ ಮತ್ತು ಅನುಮೋದಿಸಿ",
      placeholder: "ಕನ್ನಡದಲ್ಲಿ ಕೇಳಿ ಅಥವಾ ಮೈಕ್‌ನಲ್ಲಿ ಮಾತನಾಡಿ...",
      quickPrompts: [
        { label: "ಹಾನಿಗೊಳಗಾದ ಬಾಕ್ಸ್ ವಿಶ್ಲೇಷಣೆ", query: "ಕನ್ವೇಯರ್ ಮೇಲಿನ ಹಾನಿಗೊಳಗಾದ ಬಾಕ್ಸ್ ದೋಷವನ್ನು ವಿವರಿಸಿ" },
        { label: "ಮೊದಲು ಏನು ಪರಿಶೀಲಿಸಬೇಕು?", query: "ಈ ದೋಷಕ್ಕೆ ಮೊದಲು ಏನು ಮಾಡಬೇಕು?" },
        { label: "ಕೆಂಪು ದೀಪದ ಅರ್ಥವೇನು?", query: "ಕೆಂಪು ಟವರ್ ದೀಪದ ಅರ್ಥವೇನು?" },
        { label: "8-ಹಂತದ ರಿಪೇರಿ ವರ್ಕ್‌ಫ್ಲೋ", query: "8-ಹಂತದ ರಿಪೇರಿ ಮಾರ್ಗದರ್ಶಿಯನ್ನು ತೋರಿಸಿ" }
      ],
      responseE17Mean: "ಕೆಂಪು ದೀಪ ಸಕ್ರಿಯವಾಗಿದೆ. ನಿಖರವಾದ ದೋಷ ಕೋಡ್ ಅನ್ನು HMI ಅಥವಾ PLC ಲಾಗ್‌ನಿಂದ ಪರಿಶೀಲಿಸಿ.",
      responseCheckFirst: "ಹಂತ 1 — ಸುರಕ್ಷತೆ: ಮೊದಲು LOTO SW-1 ಮೂಲಕ ಯಂತ್ರವನ್ನು ಪ್ರತ್ಯೇಕಿಸಿ. ಹಂತ 2 — ಹಾನಿಗೊಳಗಾದ ಬಾಕ್ಸ್ ಪ್ರತ್ಯೇಕಿಸಿ.",
      responseCheckFan: "ದಾಸ್ತಾನು ವರದಿ: ಬೇ 4 ನಲ್ಲಿ 3 ಗ್ರಿಪ್ಪರ್ ಕಿಟ್‌ಗಳು (#PKG-GRP42, $245.00) ಲಭ್ಯವಿವೆ.",
      responseCreateTicket: "ನಾನು ಲೈನ್ 3 ಗಾಗಿ ವರ್ಕ್ ಆರ್ಡರ್ #TCK-2026-881 ಅನ್ನು ಸಿದ್ಧಪಡಿಸಿದ್ದೇನೆ. ಮಾನವ ಅನುಮೋದನೆ ಅಗತ್ಯವಿದೆ.",
      responseScanDetected: "ಸ್ಕ್ಯಾನ್ ಯಶಸ್ವಿಯಾಗಿದೆ: ಹಾನಿಗೊಳಗಾದ ಬಾಕ್ಸ್ ಮತ್ತು ಕೆಂಪು ದೀಪ ಪತ್ತೆಯಾಗಿದೆ.",
      responseCartonHelp: "ಕನ್ವೇಯರ್ ಬೆಲ್ಟ್‌ನಲ್ಲಿ ಹಾನಿಗೊಳಗಾದ ಬಾಕ್ಸ್ ಕಾಣಿಸುತ್ತಿದೆ. ಮೊದಲು ಅದನ್ನು ಪ್ರತ್ಯೇಕಿಸಿ.",
      responseStackLight: "ಕೆಂಪು ಟವರ್ ದೀಪ ಆನ್ ಆಗಿದೆ. PLC ಲಾಗ್‌ನಿಂದ ದೋಷ ಕೋಡ್ ದೃಢೀಕರಿಸಿ."
    },
    safetyGate: {
      title: 'ಮಾನವ ಅನುಮೋದನೆ ಅಗತ್ಯವಿದೆ',
      subtitle: 'ಹಂತ 2 ಹಣಕಾಸು ಸುರಕ್ಷತಾ ಗೇಟ್ ($245.00)',
      actionRequest: 'ವಿನಂತಿಸಿದ ಕ್ರಮ',
      financialAllocation: 'ವೆಚ್ಚ ಹಂಚಿಕೆ',
      reason: 'ಕ್ರಮಕ್ಕೆ ಕಾರಣ',
      groundedEvidence: 'ಕೈಪಿಡಿ ಸಾಕ್ಷ್ಯಗಳು',
      reject: 'ತಿರಸ್ಕರಿಸಿ',
      reviewEvidence: 'ಸಾಕ್ಷ್ಯ ನೋಡಿ',
      authorize: 'ಅನುಮೋದಿಸಿ & ಕಳುಹಿಸಿ ($245.00)'
    },
    quotes: {
      q1: 'ಕೈಗಳು ಕೆಲಸದಲ್ಲಿ ನಿರತವಾಗಿರುವಾಗ AI ಹುಡುಕಾಟವನ್ನು ನಿರ್ವಹಿಸುತ್ತದೆ.',
      q2: 'ಸಿಗ್ನಲ್‌ನಿಂದ ಗ್ರಹಿಕೆ → ತಕ್ಷಣದ ಕ್ರಮ.',
      q3: 'AI ತಂತ್ರಜ್ಞರಿಗೆ ಸಹಾಯ ಮಾಡಬೇಕೇ ಹೊರತು ಅವರ ಸ್ಥಾನವನ್ನು ತೆಗೆದುಕೊಳ್ಳಬಾರದು.',
      q4: 'ಪ್ರತಿ ಶಿಫಾರಸಿಗೆ ಕೈಪಿಡಿಯ ಸಾಕ್ಷ್ಯವಿರಬೇಕು.',
      q5: 'ಆಟೊಮೇಷನ್ ವೇಗವಾಗಿ ಚಲಿಸುತ್ತದೆ, ಸುರಕ್ಷತೆಯು ಯಾವಾಗ ನಿಲ್ಲಿಸಬೇಕೆಂದು ನಿರ್ಧರಿಸುತ್ತದೆ.'
    }
  },
  pa: {
    nav: {
      liveRepair: 'ਲਾਈਵ ਰਿਪੇਅਰ',
      equipment: 'ਇਕੁਇਪਮੈਂਟ ਟਵਿਨ',
      knowledge: 'ਤਕਨੀਕੀ ਮੈਨੂਅਲ',
      agentActions: 'ਏਜੰਟ ਕਾਰਵਾਈਆਂ',
      sessionMemory: 'ਸੈਸ਼ਨ ਮੈਮੋਰੀ',
      tickets: 'ਟਿਕਟਾਂ ਅਤੇ ਪਾਰਟਸ',
      supervisor: 'ਸੁਪਰਵਾਈਜ਼ਰ ਸੈਂਟਰ',
      analytics: 'ਵਿਸ਼ਲੇਸ਼ਣ',
      story: 'ਵੌਕਸਲੈਂਸ ਕਹਾਣੀ'
    },
    header: {
      liveSession: 'ਲਾਈਵ ਸੈਸ਼ਨ',
      fault: 'ਨੁਕਸ',
      scenario: 'ਸਥਿਤੀ',
      startDemo: 'ਡੈਮੋ ਸ਼ੁਰੂ ਕਰੋ',
      watchStory: 'ਕਹਾਣੀ ਦੇਖੋ',
      techRole: 'ਤਕਨੀਸ਼ੀਅਨ',
      supervisorRole: 'ਸੁਪਰਵਾਈਜ਼ਰ'
    },
    liveRepair: {
      voiceTitle: 'ਵੌਇਸ ਇਨਪੁਟ',
      visionTitle: 'ਕੈਮਰਾ ਵਿਜ਼ਨ ਅਤੇ ਨੁਕਸ',
      knowledgeTitle: 'ਮੈਨੂਅਲ ਸਬੂਤ',
      synthesisTitle: 'AI ਫੈਸਲਾ ਤਿਆਰ',
      talkToVoxlens: 'ਬੋਲੋ',
      listening: 'ਸੁਣ ਰਿਹਾ ਹੈ...',
      processing: 'ਪ੍ਰੋਸੈਸਿੰਗ ਜਾਰੀ ਹੈ...',
      triggerScan: 'ਸਕੈਨ ਸ਼ੁਰੂ ਕਰੋ',
      quickPromptsTitle: 'ਸੁਝਾਏ ਗਏ ਸਵਾਲ'
    },
    copilot: {
      greeting: "ਕਨਵੇਅਰ ਬੈਲਟ 'ਤੇ ਇੱਕ ਖਰਾਬ ਅਤੇ ਫਟਿਆ ਹੋਇਆ ਡੱਬਾ ਦਿਖਾਈ ਦੇ ਰਿਹਾ ਹੈ। ਪਹਿਲਾਂ ਪ੍ਰਭਾਵਿਤ ਡੱਬੇ ਨੂੰ ਵੱਖ ਕਰੋ। ਫਿਰ ਰੋਬੋਟਿਕ ਗ੍ਰਿੱਪਰ ਅਤੇ ਕਨਵੇਅਰ ਪਲੇਟ ਦੀ ਜਾਂਚ ਕਰੋ। ਲਾਲ ਬੱਤੀ ਦਾ ਸਹੀ ਅਲਾਰਮ HMI ਜਾਂ PLC ਤੋਂ ਪੁਸ਼ਟੀ ਕਰੋ।",
      e17Diagnosis: "ਕਨਵੇਅਰ ਬੈਲਟ 'ਤੇ ਇੱਕ ਖਰਾਬ ਅਤੇ ਫਟਿਆ ਹੋਇਆ ਡੱਬਾ ਦਿਖਾਈ ਦੇ ਰਿਹਾ ਹੈ। ਪਹਿਲਾਂ ਪ੍ਰਭਾਵਿਤ ਡੱਬੇ ਨੂੰ ਵੱਖ ਕਰੋ। ਫਿਰ ਰੋਬੋਟਿਕ ਗ੍ਰਿੱਪਰ ਅਤੇ ਕਨਵੇਅਰ ਪਲੇਟ ਦੀ ਜਾਂਚ ਕਰੋ। ਲਾਲ ਬੱਤੀ ਦਾ ਸਹੀ ਅਲਾਰਮ HMI ਜਾਂ PLC ਤੋਂ ਪੁਸ਼ਟੀ ਕਰੋ।",
      cartonDiagnosis: "ਕਨਵੇਅਰ ਬੈਲਟ 'ਤੇ ਇੱਕ ਖਰਾਬ ਅਤੇ ਫਟਿਆ ਹੋਇਆ ਡੱਬਾ ਦਿਖਾਈ ਦੇ ਰਿਹਾ ਹੈ। ਪਹਿਲਾਂ ਪ੍ਰਭਾਵਿਤ ਡੱਬੇ ਨੂੰ ਵੱਖ ਕਰੋ। ਫਿਰ ਰੋਬੋਟਿਕ ਗ੍ਰਿੱਪਰ ਅਤੇ ਕਨਵੇਅਰ ਪਲੇਟ ਦੀ ਜਾਂਚ ਕਰੋ। ਲਾਲ ਬੱਤੀ ਦਾ ਸਹੀ ਅਲਾਰਮ HMI ਜਾਂ PLC ਤੋਂ ਪੁਸ਼ਟੀ ਕਰੋ।",
      recTitle: "ਸਿਫਾਰਸ਼ ਕੀਤੇ 8-ਕਦਮੀ ਵਰਕਫਲੋ:",
      recStep1: "1. ਸੁਰੱਖਿਆ: LOTO Disconnect-3A ਲਾਗੂ ਕਰਕੇ ਮਸ਼ੀਨ ਨੂੰ ਵੱਖ ਕਰੋ।",
      recStep2: "2. ਰੋਕਥਾਮ: ਖਰਾਬ ਡੱਬੇ ਨੂੰ ਹਟਾਓ ਅਤੇ ਆਸ-ਪਾਸ ਦੇ ਡੱਬਿਆਂ ਦੀ ਜਾਂਚ ਕਰੋ।",
      recStep3: "3. ਮਕੈਨੀਕਲ ਜਾਂਚ: ਰੋਬੋਟ ਗ੍ਰਿੱਪਰ ਅਤੇ ਕਨਵੇਅਰ ਪਲੇਟ ਦੀ ਜਾਂਚ ਕਰੋ।",
      questionAction: "ਕੀ ਮੈਂ ਤੁਹਾਨੂੰ 8-ਕਦਮੀ ਮੁਰੰਮਤ ਚੈੱਕਲਿਸਟ ਵਿੱਚ ਮਾਰਗਦਰਸ਼ਨ ਕਰਾਂ?",
      groundedByManual: "SOP §6.2 ਦੁਆਰਾ ਪ੍ਰਮਾਣਿਤ",
      viewEvidence: "SOP §6.2 ਦੇਖੋ",
      safetyRequired: "ਮਨੁੱਖੀ ਪ੍ਰਵਾਨਗੀ ਲੋੜੀਂਦੀ ਹੈ",
      reviewAndAuthorize: "ਸਮੀਖਿਆ ਕਰੋ ਅਤੇ ਪ੍ਰਵਾਨਗੀ ਦਿਓ",
      placeholder: "ਪੰਜਾਬੀ ਵਿੱਚ ਪੁੱਛੋ ਜਾਂ ਮਾਈਕ ਵਿੱਚ ਬੋਲੋ...",
      quickPrompts: [
        { label: "ਖਰਾਬ ਡੱਬਾ ਵਿਸ਼ਲੇਸ਼ਣ", query: "ਕਨਵੇਅਰ 'ਤੇ ਖਰਾਬ ਡੱਬੇ ਦੇ ਨੁਕਸ ਨੂੰ ਸਮਝਾਓ" },
        { label: "ਪਹਿਲਾਂ ਕੀ ਜਾਂਚੀਏ?", query: "ਇਸ ਨੁਕਸ ਲਈ ਪਹਿਲਾਂ ਕੀ ਕਰਨਾ ਚਾਹੀਦਾ ਹੈ?" },
        { label: "ਲਾਲ ਬੱਤੀ ਦਾ ਕੀ ਅਰਥ ਹੈ?", query: "ਲਾਲ ਟਾਵਰ ਬੱਤੀ ਦਾ ਕੀ ਅਰਥ ਹੈ?" },
        { label: "8-ਕਦਮੀ ਮੁਰੰਮਤ ਗਾਈਡ", query: "8-ਕਦਮੀ ਮੁਰੰਮਤ ਗਾਈਡ ਦਿਖਾਓ" }
      ],
      responseE17Mean: "ਲਾਲ ਬੱਤੀ ਚਾਲੂ ਹੈ। ਸਹੀ ਨੁਕਸ ਕੋਡ HMI ਸਕ੍ਰੀਨ ਜਾਂ PLC ਲੌਗ ਤੋਂ ਪ੍ਰਮਾਣਿਤ ਕਰੋ।",
      responseCheckFirst: "ਕਦਮ 1 — ਸੁਰੱਖਿਆ: ਪਹਿਲਾਂ LOTO SW-1 ਰਾਹੀਂ ਮਸ਼ੀਨ ਬੰਦ ਕਰੋ। ਕਦਮ 2 — ਖਰਾਬ ਡੱਬੇ ਨੂੰ ਵੱਖ ਕਰੋ।",
      responseCheckFan: "ਇਨਵੈਂਟਰੀ ਰਿਪੋਰਟ: ਬੇ 4 ਵਿੱਚ 3 ਗ੍ਰਿੱਪਰ ਕਿੱਟਾਂ (#PKG-GRP42, $245.00) ਉਪਲਬਧ ਹਨ।",
      responseCreateTicket: "ਮੈਂ ਲਾਈਨ 3 ਲਈ ਵਰਕ ਆਰਡਰ #TCK-2026-881 ਤਿਆਰ ਕੀਤਾ ਹੈ। ਮਨੁੱਖੀ ਪ੍ਰਵਾਨਗੀ ਲੋੜੀਂਦੀ ਹੈ।",
      responseScanDetected: "ਸਕੈਨ ਸਫਲ: ਖਰਾਬ ਡੱਬਾ ਅਤੇ ਲਾਲ ਚੇਤਾਵਨੀ ਸੂਚਕ ਪਛਾਣਿਆ ਗਿਆ।",
      responseCartonHelp: "ਕਨਵੇਅਰ ਬੈਲਟ 'ਤੇ ਖਰਾਬ ਡੱਬਾ ਦਿਖਾਈ ਦੇ ਰਿਹਾ ਹੈ। ਪਹਿਲਾਂ ਇਸਨੂੰ ਵੱਖ ਕਰੋ।",
      responseStackLight: "ਲਾਲ ਚੇਤਾਵਨੀ ਬੱਤੀ ਚਾਲੂ ਹੈ। ਰੰਗ ਤੋਂ ਅੰਦਾਜ਼ਾ ਨਾ ਲਗਾਓ, PLC ਲੌਗ ਤੋਂ ਪੁਸ਼ਟੀ ਕਰੋ।"
    },
    safetyGate: {
      title: 'ਮਨੁੱਖੀ ਪ੍ਰਵਾਨਗੀ ਲੋੜੀਂਦੀ ਹੈ',
      subtitle: 'ਪੱਧਰ 2 ਵਿੱਤੀ ਸੁਰੱਖਿਆ ਗੇਟ ($245.00)',
      actionRequest: 'ਮੰਗੀ ਗਈ ਕਾਰਵਾਈ',
      financialAllocation: 'ਲਾਗਤ ਵੰਡ',
      reason: 'ਕਾਰਵਾਈ ਦਾ ਕਾਰਨ',
      groundedEvidence: 'ਮੈਨੂਅਲ ਸਬੂਤ',
      reject: 'ਰੱਦ ਕਰੋ',
      reviewEvidence: 'ਸਬੂਤ ਦੇਖੋ',
      authorize: 'ਪ੍ਰਵਾਨਗੀ ਦਿਓ ਅਤੇ ਭੇਜੋ ($245.00)'
    },
    quotes: {
      q1: 'ਹੱਥ ਕੰਮ ਵਿੱਚ ਰੁੱਝੇ ਹੋਏ ਹਨ, AI ਖੋਜ ਸੰਭਾਲਦਾ ਹੈ।',
      q2: 'ਸੰਕੇਤ ਤੋਂ ਸਮਝ → ਤੁਰੰਤ ਕਾਰਵਾਈ।',
      q3: 'AI ਨੂੰ ਤਕਨੀਸ਼ੀਅਨ ਦੀ ਮਦਦ ਕਰਨੀ ਚਾਹੀਦੀ ਹੈ, ਉਸਦੀ ਜਗ੍ਹਾ ਨਹੀਂ ਲੈਣੀ ਚਾਹੀਦੀ।',
      q4: 'ਹਰੇਕ ਸਿਫਾਰਸ਼ ਪਿੱਛੇ ਮੈਨੂਅਲ ਦਾ ਸਬੂਤ ਹੋਣਾ ਚਾਹੀਦਾ ਹੈ।',
      q5: 'ਆਟੋਮੇਸ਼ਨ ਤੇਜ਼ੀ ਨਾਲ ਚੱਲਦੀ ਹੈ, ਸੁਰੱਖਿਆ ਫੈਸਲਾ ਕਰਦੀ ਹੈ ਕਿ ਕਦੋਂ ਰੁਕਣਾ ਹੈ।'
    }
  },
  ur: {
    nav: {
      liveRepair: 'لائیو مرمت',
      equipment: 'سامان کا ٹوئن',
      knowledge: 'تکنیکی دستی کتاب',
      agentActions: 'ایجنٹ کے اقدامات',
      sessionMemory: 'سیشن کی یادداشت',
      tickets: 'ٹکٹ اور پرزے',
      supervisor: 'نگران مرکز',
      analytics: 'تجزیات',
      story: 'ووکس لینس کی کہانی'
    },
    header: {
      liveSession: 'لائیو سیشن',
      fault: 'خرابی',
      scenario: 'صورتحال',
      startDemo: 'ڈیمو شروع کریں',
      watchStory: 'کہانی دیکھیں',
      techRole: 'ٹیکنیشن',
      supervisorRole: 'نگران'
    },
    liveRepair: {
      voiceTitle: 'آواز کا ان پٹ',
      visionTitle: 'کیمرہ ویژن اور خرابی',
      knowledgeTitle: 'دستی کتاب کا ثبوت',
      synthesisTitle: 'AI فیصلہ تیار',
      talkToVoxlens: 'بات کریں',
      listening: 'سن رہا ہے...',
      processing: 'سوچ رہا ہے...',
      triggerScan: 'اسکین شروع کریں',
      quickPromptsTitle: 'تجویز کردہ سوالات'
    },
    copilot: {
      greeting: "کنویئر بیلٹ پر ایک گتے کا ڈبہ بری طرح خراب نظر آ رہا ہے۔ سب سے پہلے متاثرہ ڈبے کو بحفاظت الگ کریں۔ اس کے بعد روبوٹک گرپر اور کنویئر پلیٹ کا معائنہ کریں۔ سرخ وارننگ لائٹ کا درست الارم HMI یا PLC سے تصدیق کریں۔",
      e17Diagnosis: "کنویئر بیلٹ پر ایک گتے کا ڈبہ بری طرح خراب نظر آ رہا ہے۔ سب سے پہلے متاثرہ ڈبے کو بحفاظت الگ کریں۔ اس کے بعد روبوٹک گرپر اور کنویئر پلیٹ کا معائنہ کریں۔ سرخ وارننگ لائٹ کا درست الارم HMI یا PLC سے تصدیق کریں۔",
      cartonDiagnosis: "کنویئر بیلٹ پر ایک گتے کا ڈبہ بری طرح خراب نظر آ رہا ہے۔ سب سے پہلے متاثرہ ڈبے کو بحفاظت الگ کریں۔ اس کے بعد روبوٹک گرپر اور کنویئر پلیٹ کا معائنہ کریں۔ سرخ وارننگ لائٹ کا درست الارم HMI یا PLC سے تصدیق کریں۔",
      recTitle: "تجویز کردہ 8 مرحلہ وار ورک فلو:",
      recStep1: "1. حفاظت: LOTO Disconnect-3A کے ذریعے مشین کو الگ کریں۔",
      recStep2: "2. روک تھام: خراب ڈبے کو ہٹا دیں اور قریبی ڈبوں کا معائنہ کریں۔",
      recStep3: "3. مکینیکل معائنہ: روبوٹ گرپر اور کنویئر پلیٹ کی جانچ کریں۔",
      questionAction: "کیا آپ چاہتے ہیں کہ میں 8 مرحلہ وار مرمت چیک لسٹ میں آپ کی رہنمائی کروں؟",
      groundedByManual: "SOP §6.2 سے تصدیق شدہ",
      viewEvidence: "SOP §6.2 دیکھیں",
      safetyRequired: "انسانی منظوری درکار ہے",
      reviewAndAuthorize: "جائزہ لیں اور منظور کریں",
      placeholder: "اردو میں پوچھیں یا مائیک میں بولیں...",
      quickPrompts: [
        { label: "خراب ڈبے کا تجزیہ", query: "کنویئر پر خراب ڈبے کے نقص کی وضاحت کریں" },
        { label: "پہلے کیا چیک کریں؟", query: "اس خرابی کے لیے سب سے پہلے کیا کرنا چاہیے؟" },
        { label: "سرخ لائٹ کا کیا مطلب ہے؟", query: "سرخ ٹاور وارننگ لائٹ کا کیا مطلب ہے؟" },
        { label: "8 مرحلہ وار مرمت گائیڈ", query: "8 مرحلہ وار مرمت کا طریقہ دکھائیں" }
      ],
      responseE17Mean: "سرخ لائٹ آن ہے۔ اصل فالٹ کوڈ HMI اسکرین یا PLC لاگ سے تصدیق کرنا ضروری ہے۔",
      responseCheckFirst: "مرحلہ 1 — حفاظت: پہلے LOTO SW-1 سے مشین بند کریں۔ مرحلہ 2 — خراب ڈبے کو الگ کریں۔",
      responseCheckFan: "اسٹاک رپورٹ: بے 4 میں 3 گرپر کٹس (#PKG-GRP42, $245.00) دستیاب ہیں۔",
      responseCreateTicket: "میں نے لائن 3 کے لیے ورک آرڈر #TCK-2026-881 تیار کیا ہے۔ انسانی منظوری درکار ہے۔",
      responseScanDetected: "اسکین کامیاب: خراب گتے کا ڈبہ اور سرخ وارننگ انڈیکیٹر کی شناخت ہوئی۔",
      responseCartonHelp: "کنویئر بیلٹ پر خراب گتے کا ڈبہ نظر آ رہا ہے۔ پہلے اسے الگ کریں۔",
      responseStackLight: "سرخ وارننگ لائٹ آن ہے۔ رنگ سے اندازہ مت لگائیں، براہ راست PLC لاگ سے تصدیق کریں۔"
    },
    safetyGate: {
      title: 'انسانی منظوری درکار ہے',
      subtitle: 'لیول 2 مالیاتی حفاظتی گیٹ ($245.00)',
      actionRequest: 'مطلوبہ اقدام',
      financialAllocation: 'لاگت کی تخصیص',
      reason: 'اقدام کی وجہ',
      groundedEvidence: 'مینوئل کے ثبوت',
      reject: 'مسترد کریں',
      reviewEvidence: 'ثبوت دیکھیں',
      authorize: 'منظور کریں اور بھیجیں ($245.00)'
    },
    quotes: {
      q1: 'ہاتھ مصروف ہیں، AI تلاش سنبھالتا ہے۔',
      q2: 'سگنل سے سمجھ → فوری عمل۔',
      q3: 'AI کو ٹیکنیشن کی مدد کرنی چاہیے، جگہ نہیں لینی چاہیے۔',
      q4: 'ہر سفارش کے پیچھے تصدیق شدہ مینوئل کا ثبوت ہونا چاہیے۔',
      q5: 'خودکاری تیز ہے، حفاظت فیصلہ کرتی ہے کہ کب رکنا ہے۔'
    }
  }
};

export function getTranslation(lang: SupportedLanguage = 'en'): TranslationDict {
  const selected = TRANSLATIONS[lang] || TRANSLATIONS.en;
  return {
    ...TRANSLATIONS.en,
    ...selected,
    copilot: {
      ...TRANSLATIONS.en.copilot,
      ...(selected.copilot || {})
    }
  };
}
