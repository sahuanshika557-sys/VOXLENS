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
      visionTitle: 'VISION OCR & THERMAL',
      knowledgeTitle: 'MANUAL GROUNDING',
      synthesisTitle: 'AI SYNTHESIS READY',
      talkToVoxlens: 'TALK TO VOXLENS',
      listening: 'VOXLENS IS LISTENING...',
      processing: 'SYNTHESIZING CONTEXT...',
      triggerScan: 'TRIGGER CV SCAN',
      quickPromptsTitle: 'RECOMMENDED QUERIES'
    },
    copilot: {
      greeting: "Hello Alex. I am connected to the Line 3 VX-420 Packaging Unit (#VX-2048). I am monitoring live optical feeds, telemetry sensors, and technical service manuals.\n\nYou can speak naturally or point your camera at any component or error display.",
      e17Diagnosis: "I detected error E17 and identified the equipment as the Line 3 VX-420 motor-driven packaging unit.\n\nBased on Service Manual Rev 4.2B (Section 4.3, Page 42), the stator temperature has reached 88.4°C exceeding the 75.0°C safety threshold.",
      recTitle: "RECOMMENDED NEXT STEPS:",
      recStep1: "1. Inspect axial cooling fan shroud for particulate binding and impeller drag.",
      recStep2: "2. Verify 3-phase harness connections at Terminal Block TB-2 (2.8 Nm torque).",
      recStep3: "3. Check overload thermal threshold (currently 88.4°C).",
      questionAction: "Would you like me to prepare a maintenance ticket and check spare fan inventory in Bay 4?",
      groundedByManual: "GROUNDED BY OEM MANUAL",
      viewEvidence: "View Evidence",
      safetyRequired: "HUMAN APPROVAL REQUIRED",
      reviewAndAuthorize: "Review & Authorize Action",
      placeholder: "Ask VoxLens or speak into microphone...",
      quickPrompts: [
        { label: "What does E17 mean?", query: "VoxLens, what does error code E17 mean on the VX-420?" },
        { label: "What should I check first?", query: "What should I check first for error E17?" },
        { label: "Check replacement fan", query: "Do we have a replacement cooling fan for VX-420 in Bay 4 inventory?" },
        { label: "Create ticket", query: "Create a maintenance ticket for suspected cooling fan stall on Line 3." }
      ],
      responseE17Mean: "Error E17 indicates a Motor Thermal Overload caused by constrained cooling airflow across the stator housing. Safe threshold is 75.0°C; current reading is 88.4°C.",
      responseCheckFirst: "Per Service Manual Section 4.3 (Page 42), first inspect the axial cooling fan shroud for particulate obstruction, then verify Terminal Block TB-2 connections.",
      responseCheckFan: "Inventory search complete: Bay 4 Stockroom currently has 3 units of Part #VX-CF42 (Axial Fan Assembly, $245.00) in Bin C-14.",
      responseCreateTicket: "I have prepared Work Order #TCK-2026-881 for Line 3. Because part requisition incurs a $245.00 cost, Human Safety Authorization is required.",
      responseScanDetected: "Optical CV scan verified: Error Code E17 (96% confidence) and Stator Thermal Hotspot at 88.4°C."
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
      visionTitle: 'कैमरा विज़न एवं थर्मल',
      knowledgeTitle: 'मैन्युअल प्रमाण',
      synthesisTitle: 'एआई निर्णय तैयार',
      talkToVoxlens: 'वॉक्सलेंस से बात करें',
      listening: 'वॉक्सलेंस सुन रहा है...',
      processing: 'विश्लेषण जारी है...',
      triggerScan: 'कैमरा स्कैन शुरू करें',
      quickPromptsTitle: 'सुझाए गए प्रश्न'
    },
    copilot: {
      greeting: "नमस्ते एलेक्स। मैं लाइन 3 के VX-420 पैकेजिंग यूनिट (#VX-2048) से जुड़ा हुआ हूँ। मैं लाइव कैमरा, सेंसर टेलीमेट्री और तकनीकी सर्विस मैन्युअल की निगरानी कर रहा हूँ।\n\nआप अपनी भाषा में बात कर सकते हैं या किसी भी पुर्जे की तरफ कैमरा दिखा सकते हैं।",
      e17Diagnosis: "मैंने एरर E17 डिटेक्ट किया है और उपकरण की पहचान लाइन 3 VX-420 पैकेजिंग यूनिट के रूप में की है।\n\nसर्विस मैन्युअल (सेक्शन 4.3, पेज 42) के अनुसार, स्टेटर का तापमान 88.4°C तक पहुँच गया है जो कि 75.0°C की सुरक्षित सीमा से अधिक है।",
      recTitle: "अनुशंसित अगले चरण:",
      recStep1: "1. कूलिंग फैन श्राउड की जांच करें कि कोई कचरा तो नहीं फंसा है।",
      recStep2: "2. टर्मिनल ब्लॉक TB-2 पर 3-फेज वायरिंग कनेक्शन (2.8 Nm टॉर्क) की पुष्टि करें।",
      recStep3: "3. स्टेटर का ओवरलोड तापमान स्तर (वर्तमान 88.4°C) जांचें।",
      questionAction: "क्या आप चाहते हैं कि मैं मेंटेनेंस टिकट तैयार करूँ और बे 4 में नए फैन के स्टॉक की जांच करूँ?",
      groundedByManual: "ओईएम मैन्युअल द्वारा प्रमाणित",
      viewEvidence: "प्रमाण देखें",
      safetyRequired: "मानवीय अनुमोदन आवश्यक है",
      reviewAndAuthorize: "समीक्षा करें और अधिकृत करें",
      placeholder: "वॉक्सलेंस से पूछें या माइक में बोलें...",
      quickPrompts: [
        { label: "E17 का क्या मतलब है?", query: "वॉक्सलेंस, VX-420 में एरर कोड E17 का क्या मतलब है?" },
        { label: "पहले क्या जांचें?", query: "एरर E17 के लिए मुझे सबसे पहले क्या जांचना चाहिए?" },
        { label: "नया फैन स्टॉक चेक करें", query: "क्या बे 4 इन्वेंट्री में VX-420 का नया कूलिंग फैन उपलब्ध है?" },
        { label: "मेंटेनेंस टिकट बनाएं", query: "लाइन 3 पर कूलिंग फैन जाम होने के लिए मेंटेनेंस टिकट बनाएं।" }
      ],
      responseE17Mean: "एरर E17 मोटर थर्मल ओवरलोड का संकेत है, जो कूलिंग एयरफ्लो रुकने के कारण होता है। सुरक्षित सीमा 75.0°C है; वर्तमान तापमान 88.4°C है।",
      responseCheckFirst: "सर्विस मैन्युअल सेक्शन 4.3 (पेज 42) के अनुसार, सबसे पहले एक्सियल कूलिंग फैन श्राउड की सफाई जांचें और टर्मिनल ब्लॉक TB-2 कनेक्शन देखें।",
      responseCheckFan: "इन्वेंट्री जांच पूर्ण: बे 4 के स्टॉक Bin C-14 में पार्ट #VX-CF42 (कूलिंग फैन, $245.00) की 3 यूनिट्स उपलब्ध हैं।",
      responseCreateTicket: "मैंने लाइन 3 के लिए वर्क ऑर्डर #TCK-2026-881 तैयार कर दिया है। पार्ट मंगाने में $245.00 का खर्च है, इसलिए आपके अनुमोदन (Safety Gate) की आवश्यकता है।",
      responseScanDetected: "ऑप्टिकल विज़न स्कैन सफल: एरर कोड E17 (96% सटीकता) और स्टेटर थर्मल हॉटस्पॉट 88.4°C दर्ज किया गया।"
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
      visionTitle: 'ক্যামেরা ভিশন ও থার্মাল',
      knowledgeTitle: 'ম্যানুয়াল প্রমাণ',
      synthesisTitle: 'এআই সিদ্ধান্ত প্রস্তুত',
      talkToVoxlens: 'ভক্সলেন্সের সাথে কথা বলুন',
      listening: 'ভক্সলেন্স শুনছে...',
      processing: 'প্রক্রিয়াকরণ চলছে...',
      triggerScan: 'স্ক্যান শুরু করুন',
      quickPromptsTitle: 'প্রস্তাবিত প্রশ্ন'
    },
    copilot: {
      greeting: "হ্যালো অ্যালেক্স। আমি লাইন 3 VX-420 প্যাকেজিং ইউনিটের (#VX-2048) সাথে সংযুক্ত। আমি অপটিক্যাল ফিড, সেন্সর এবং সার্ভিস ম্যানুয়াল পর্যবেক্ষণ করছি।\n\nআপনি স্বাভাবিকভাবে কথা বলতে পারেন বা ক্যামেরার মাধ্যমে ত্রুটি দেখাতে পারেন।",
      e17Diagnosis: "আমি E17 ত্রুটি সনাক্ত করেছি এবং মেশিনটিকে VX-420 হিসেবে চিহ্নিত করেছি।\n\nসার্ভিস ম্যানুয়াল (সেকশন 4.3, পৃষ্ঠা 42) অনুসারে, মোটরের তাপমাত্রা 88.4°C এ পৌঁছেছে যা 75.0°C সীমা অতিক্রম করেছে।",
      recTitle: "প্রস্তাবিত পরবর্তী পদক্ষেপ:",
      recStep1: "1. কুলিং ফ্যান শ্রাউডে কোনো বাধার সৃষ্টি হয়েছে কিনা পরীক্ষা করুন।",
      recStep2: "2. টার্মিনাল ব্লক TB-2-এ 3-ফেজ ওয়্যারিং সংযোগ পরীক্ষা করুন।",
      recStep3: "3. থার্মাল ওভারলোড স্তর (বর্তমান 88.4°C) যাচাই করুন।",
      questionAction: "আপনি কি চান আমি একটি রক্ষণাবেক্ষণ টিকিট তৈরি করি এবং স্পেয়ার ফ্যান ইনভেন্টরি চেক করি?",
      groundedByManual: "ম্যানুয়াল দ্বারা প্রমাণিত",
      viewEvidence: "প্রমাণ দেখুন",
      safetyRequired: "মানবীয় অনুমোদন প্রয়োজন",
      reviewAndAuthorize: "পর্যালোচনা ও অনুমোদন করুন",
      placeholder: "ভক্সলেন্সকে জিজ্ঞাসা করুন...",
      quickPrompts: [
        { label: "E17 এর অর্থ কি?", query: "VX-420 মেশিনে ত্রুটি কোড E17 এর অর্থ কি?" },
        { label: "প্রথমে কি পরীক্ষা করব?", query: "E17 এর জন্য প্রথমে কি পরীক্ষা করা উচিত?" },
        { label: "ফ্যান স্টক চেক করুন", query: "বে 4 ইনভেন্টরিতে কি নতুন কুলিং ফ্যান আছে?" },
        { label: "টিকিট তৈরি করুন", query: "কুলিং ফ্যান সমস্যার জন্য একটি রক্ষণাবেক্ষণ টিকিট তৈরি করুন।" }
      ],
      responseE17Mean: "E17 ত্রুটি নির্দেশ করে মোটর অতিরিক্ত গরম হয়েছে। নিরাপদ সীমা 75.0°C; বর্তমান তাপমাত্রা 88.4°C।",
      responseCheckFirst: "সেকশন 4.3 অনুসারে, প্রথমে কুলিং ফ্যান শ্রাউড এবং টার্মিনাল ব্লক TB-2 পরীক্ষা করুন।",
      responseCheckFan: "ইনভেন্টরি রিপোর্ট: বে 4 স্টক Bin C-14 এ 3টি পার্ট #VX-CF42 ($245.00) ফ্যান উপলব্ধ রয়েছে।",
      responseCreateTicket: "আমি টিকিট #TCK-2026-881 প্রস্তুত করেছি। পার্ট অর্ডারের জন্য $245.00 খরচের কারণে আপনার অনুমোদন প্রয়োজন।",
      responseScanDetected: "ক্যামেরা স্ক্যান সফল: ত্রুটি E17 (96% নির্ভুলতা) এবং থার্মাল হটস্পট 88.4°C।"
    },
    safetyGate: {
      title: 'মানবীয় অনুমোদন প্রয়োজন',
      subtitle: 'লেভেল 2 আর্থিক সুরক্ষা গেট ($245.00)',
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
      visionTitle: 'கேமரா பார்வை & வெப்ப நிலை',
      knowledgeTitle: 'கையேடு சான்று',
      synthesisTitle: 'AI முடிவு தயார்',
      talkToVoxlens: 'பேச கிளிக் செய்யவும்',
      listening: 'கேட்கிறது...',
      processing: 'செயலாக்குகிறது...',
      triggerScan: 'ஸ்கேன் செய்க',
      quickPromptsTitle: 'பரிந்துரைக்கப்பட்ட கேள்விகள்'
    },
    copilot: {
      greeting: "வணக்கம் அலெக்ஸ். நான் VX-420 பேக்கேஜிங் யூனிட்டுடன் (#VX-2048) இணைக்கப்பட்டுள்ளேன். நான் கேமரா மற்றும் சேவை கையேட்டை கண்காணிக்கிறேன்.\n\nநீங்கள் பேசலாம் அல்லது கேமராவில் பிழையைக் காட்டலாம்.",
      e17Diagnosis: "நான் E17 பிழையைக் கண்டறிந்துள்ளேன். சேவை கையேட்டின்படி (பிரிவு 4.3, பக்கம் 42), மோட்டார் வெப்பநிலை 88.4°C ஆக உயர்ந்துள்ளது.",
      recTitle: "பரிந்துரைக்கப்பட்ட அடுத்த படிகள்:",
      recStep1: "1. கூலிங் ஃபேன் பகுதியில் அடைப்பு உள்ளதா என சரிபார்க்கவும்.",
      recStep2: "2. டெர்மினல் பிளாக் TB-2 இல் 3-பேஸ் வயரிங் சரிபார்க்கவும்.",
      recStep3: "3. மோட்டார் வெப்ப நிலையை (தற்போது 88.4°C) சரிபார்க்கவும்.",
      questionAction: "பராமரிப்பு டிக்கெட்டை உருவாக்கி மாற்று ஃபேனை சரிபார்க்கவா?",
      groundedByManual: "கையேடு மூலம் சரிபார்க்கப்பட்டது",
      viewEvidence: "சான்றைக் காண்க",
      safetyRequired: "மனித ஒப்புதல் தேவை",
      reviewAndAuthorize: "மதிப்பாய்வு செய்து ஒப்புதல் அளிக்கவும்",
      placeholder: "வாக்ஸ்லென்ஸிடம் கேளுங்கள்...",
      quickPrompts: [
        { label: "E17 என்றால் என்ன?", query: "VX-420 இல் E17 பிழையின் பொருள் என்ன?" },
        { label: "முதலில் என்ன பார்க்க வேண்டும்?", query: "E17 பிழைக்கு முதலில் எதை சரிபார்க்க வேண்டும்?" },
        { label: "ஃபேன் இருப்பு சரிபார்க்கவும்", query: "பே 4 இல் மாற்று ஃபேன் உள்ளதா?" },
        { label: "டிக்கெட் உருவாக்கவும்", query: "கூலிங் ஃபேன் பழுதுபார்ப்பு டிக்கெட் உருவாக்கவும்." }
      ],
      responseE17Mean: "E17 பிழை மோட்டார் அதிக வெப்பமடைவதைக் குறிக்கிறது. பாதுகாப்பான வரம்பு 75.0°C; தற்போதைய அளவு 88.4°C.",
      responseCheckFirst: "பிரிவு 4.3 இன் படி, முதலில் கூலிங் ஃபேன் மற்றும் டெர்மினல் பிளாக் TB-2 ஐ சரிபார்க்கவும்.",
      responseCheckFan: "இருப்பு விவரம்: பே 4 இல் 3 மாற்று ஃபேன்கள் (#VX-CF42, $245.00) கிடைக்கின்றன.",
      responseCreateTicket: "டிக்கெட் #TCK-2026-881 தயார் செய்யப்பட்டது. பாகத்திற்கான $245.00 செலவுக்கு உங்கள் ஒப்புதல் தேவை.",
      responseScanDetected: "ஸ்கேன் முடிந்தது: பிழை E17 மற்றும் வெப்ப நிலை 88.4°C கண்டறியப்பட்டது."
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
      visionTitle: 'కెమెరా విజన్ & థర్మల్',
      knowledgeTitle: 'మాన్యువల్ ఆధారాలు',
      synthesisTitle: 'AI నిర్ణయం సిద్ధం',
      talkToVoxlens: 'మాట్లాడండి',
      listening: 'వింటోంది...',
      processing: 'విశ్లేషిస్తోంది...',
      triggerScan: 'స్కాన్ చేయండి',
      quickPromptsTitle: 'సూచించిన ప్రశ్నలు'
    },
    copilot: {
      greeting: "హలో అలెక్స్. నేను VX-420 ప్యాకేజింగ్ యూనిట్‌తో (#VX-2048) కనెక్ట్ అయ్యాను. నేను కెమెరా ఫీడ్ మరియు సర్వీస్ మాన్యువల్‌ను పర్యవేక్షిస్తున్నాను.\n\nమీరు మాట్లాడవచ్చు లేదా కెమెరాలో లోపాన్ని చూపించవచ్చు.",
      e17Diagnosis: "నేను E17 ఎర్రర్‌ను గుర్తించాను. సర్వీస్ మాన్యువల్ (సెక్షన్ 4.3, పేజీ 42) ప్రకారం, మోటార్ ఉష్ణోగ్రత 88.4°C కి చేరింది.",
      recTitle: "సిఫార్సు చేయబడిన తదుపరి దశలు:",
      recStep1: "1. కూలింగ్ ఫ్యాన్ వద్ద అడ్డంకులు ఏమైనా ఉన్నాయా అని తనిఖీ చేయండి.",
      recStep2: "2. టెర్మినల్ బ్లాక్ TB-2 వద్ద 3-ఫేజ్ వైరింగ్ కనెక్షన్లను తనిఖీ చేయండి.",
      recStep3: "3. మోటార్ ఓవర్‌లోడ్ ఉష్ణోగ్రత (ప్రస్తుతం 88.4°C) ని తనిఖీ చేయండి.",
      questionAction: "నేను మెయింటెనెన్స్ టికెట్ తయారు చేసి, కొత్త ఫ్యాన్ స్టాక్ చెక్ చేయమంటారా?",
      groundedByManual: "మాన్యువల్ ద్వారా ధృవీకరించబడింది",
      viewEvidence: "ఆధారం చూడండి",
      safetyRequired: "మానవ ఆమోదం అవసరం",
      reviewAndAuthorize: "సమీక్షించి ఆమోదించండి",
      placeholder: "వోక్స్‌లెన్స్‌ను అడగండి...",
      quickPrompts: [
        { label: "E17 అంటే ఏమిటి?", query: "VX-420 లో ఎర్రర్ కోడ్ E17 అంటే ఏమిటి?" },
        { label: "మొదట ఏమి తనిఖీ చేయాలి?", query: "E17 కోసం మొదట ఏమి తనిఖీ చేయాలి?" },
        { label: "ఫ్యాన్ స్టాక్ చెక్ చేయండి", query: "బే 4 లో స్పేర్ ఫ్యాన్ అందుబాటులో ఉందా?" },
        { label: "టికెట్ సృష్టించండి", query: "కూలింగ్ ఫ్యాన్ సమస్యకు మెయింటెనెన్స్ టికెట్ సృష్టించండి." }
      ],
      responseE17Mean: "E17 ఎర్రర్ మోటార్ ఓవర్‌లోడ్ వేడిని సూచిస్తుంది. సురక్షిత పరిమితి 75.0°C; ప్రస్తుత రీడింగ్ 88.4°C.",
      responseCheckFirst: "సెక్షన్ 4.3 ప్రకారం, ముందుగా కూలింగ్ ఫ్యాన్ మరియు టెర్మినల్ బ్లాక్ TB-2 ని తనిఖీ చేయండి.",
      responseCheckFan: "ఇన్వెంటరీ నివేదిక: బే 4 లో 3 స్పేర్ ఫ్యాన్లు (#VX-CF42, $245.00) అందుబాటులో ఉన్నాయి.",
      responseCreateTicket: "నేను టికెట్ #TCK-2026-881 సిద్ధం చేసాను. భాగం కోసం $245.00 ఖర్చు అవుతుంది కాబట్టి మీ ఆమోదం అవసరం.",
      responseScanDetected: "కెమెరా స్కాన్ పూర్తయింది: ఎర్రర్ E17 మరియు థర్మల్ హాట్‌స్పాట్ 88.4°C గుర్తించబడింది."
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
      visionTitle: 'कॅमेरा व्हिजन व तापमान',
      knowledgeTitle: 'मॅन्युअल पुरावा',
      synthesisTitle: 'AI निर्णय सज्ज',
      talkToVoxlens: 'बोला',
      listening: 'ऐकत आहे...',
      processing: 'प्रक्रिया सुरू आहे...',
      triggerScan: 'स्कॅन सुरू करा',
      quickPromptsTitle: 'सुचवलेले प्रश्न'
    },
    copilot: {
      greeting: "नमस्कार अ‍ॅलेक्स. मी VX-420 पॅकेजिंग युनिटशी (#VX-2048) जोडलेला आहे. मी कॅमेरा फीड आणि मॅन्युअलचे निरीक्षण करत आहे.\n\nतुम्ही थेट बोलू शकता किंवा कॅमेऱ्यात समस्या दाखवू शकता.",
      e17Diagnosis: "मी E17 त्रुटी ओळखली आहे. सर्व्हिस मॅन्युअल (विभाग 4.3, पृष्ठ 42) नुसार, मोटरचे तापमान 88.4°C पर्यंत वाढले आहे जे 75.0°C पेक्षा जास्त आहे.",
      recTitle: "पुढील शिफारस केलेल्या पायऱ्या:",
      recStep1: "1. कुलिंग फॅनमध्ये काही अडकले आहे का ते तपासा.",
      recStep2: "2. टर्मिनल ब्लॉक TB-2 वरील 3-फेज वायरिंग तपासा.",
      recStep3: "3. मोटरचे ओव्हरलोड तापमान (सध्या 88.4°C) तपासा.",
      questionAction: "मी मेंटेनन्स तिकीट तयार करू आणि नवीन फॅनचा साठा तपासू का?",
      groundedByManual: "मॅन्युअलद्वारे प्रमाणित",
      viewEvidence: "पुरावा पहा",
      safetyRequired: "मानवी मंजुरी आवश्यक",
      reviewAndAuthorize: "पुनरावलोकन करा आणि मंजूर करा",
      placeholder: "वॉकस्लेन्सला विचारा...",
      quickPrompts: [
        { label: "E17 चा अर्थ काय?", query: "VX-420 मध्ये त्रुटी E17 चा अर्थ काय आहे?" },
        { label: "प्रथम काय तपासावे?", query: "E17 त्रुटीसाठी प्रथम काय तपासावे?" },
        { label: "फॅन साठा तपासा", query: "बे 4 मध्ये नवीन फॅन उपलब्ध आहे का?" },
        { label: "तिकीट तयार करा", query: "कुलिंग फॅन समस्येसाठी मेंटेनन्स तिकीट तयार करा." }
      ],
      responseE17Mean: "E17 त्रुटी मोटर ओव्हरलोड दर्शवते. सुरक्षित मर्यादा 75.0°C आहे; सध्याचे तापमान 88.4°C आहे.",
      responseCheckFirst: "विभाग 4.3 नुसार, प्रथम कुलिंग फॅन आणि टर्मिनल ब्लॉक TB-2 तपासा.",
      responseCheckFan: "इन्व्हेंटरी तपासणी: बे 4 मध्ये 3 नवीन फॅन (#VX-CF42, $245.00) उपलब्ध आहेत.",
      responseCreateTicket: "मी तिकीट #TCK-2026-881 तयार केले आहे. भागासाठी $245.00 खर्च येत असल्याने तुमच्या मंजुरीची आवश्यकता आहे.",
      responseScanDetected: "स्कॅन यशस्वी: त्रुटी E17 आणि तापमान 88.4°C नोंदवले गेले."
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
      visionTitle: 'કેમેરા વિઝન અને તાપમાન',
      knowledgeTitle: 'મેન્યુઅલ પુરાવા',
      synthesisTitle: 'AI નિર્ણય તૈયાર',
      talkToVoxlens: 'બોલો',
      listening: 'સાંભળી રહ્યું છે...',
      processing: 'પ્રોસેસિંગ ચાલુ છે...',
      triggerScan: 'સ્કેન શરૂ કરો',
      quickPromptsTitle: 'સૂચવેલા પ્રશ્નો'
    },
    copilot: {
      greeting: "નમસ્તે એલેક્સ. હું VX-420 પેકેજિંગ યુનિટ (#VX-2048) સાથે જોડાયેલ છું. હું કેમેરા ફીડ અને સર્વિસ મેન્યુઅલનું નિરીક્ષણ કરી રહ્યો છું.\n\nતમે સીધી વાત કરી શકો છો અથવા કેમેરામાં ખામી બતાવી શકો છો.",
      e17Diagnosis: "મેં E17 ભૂલ શોધી છે. સર્વિસ મેન્યુઅલ (વિભાગ 4.3, પૃષ્ઠ 42) મુજબ, મોટરનું તાપમાન 88.4°C સુધી પહોંચી ગયું છે જે 75.0°C ની મર્યાદાથી વધુ છે.",
      recTitle: "ભલામણ કરેલ આગલા પગલાં:",
      recStep1: "1. કૂલિંગ ફેનમાં કોઈ કચરો ફસાયો છે કે નહીં તે તપાસો.",
      recStep2: "2. ટર્મિનલ બ્લોક TB-2 પર વાયરિંગ કનેક્શન તપાસો.",
      recStep3: "3. મોટરનું તાપમાન (હાલમાં 88.4°C) તપાસો.",
      questionAction: "શું હું મેન્ટેનન્સ ટિકિટ બનાવું અને નવા ફેનનો સ્ટોક ચેક કરું?",
      groundedByManual: "મેન્યુઅલ દ્વારા પ્રમાણિત",
      viewEvidence: "પુરાવા જુઓ",
      safetyRequired: "માનવીય મંજૂરી જરૂરી",
      reviewAndAuthorize: "સમીક્ષા કરો અને મંજૂર કરો",
      placeholder: "વોક્સલેન્સને પૂછો...",
      quickPrompts: [
        { label: "E17 નો અર્થ શું છે?", query: "VX-420 માં ભૂલ E17 નો અર્થ શું છે?" },
        { label: "પહેલા શું તપાસવું?", query: "E17 ભૂલ માટે પહેલા શું તપાસવું જોઈએ?" },
        { label: "ફેન સ્ટોક ચેક કરો", query: "શું બે 4 માં નવો ફેન ઉપલબ્ધ છે?" },
        { label: "ટિકિટ બનાવો", query: "કૂલિંગ ફેન માટે મેન્ટેનન્સ ટિકિટ બનાવો." }
      ],
      responseE17Mean: "E17 ભૂલ મોટર ઓવરલોડ દર્શાવે છે. સલામત મર્યાદા 75.0°C છે; હાલનું તાપમાન 88.4°C છે.",
      responseCheckFirst: "વિભાગ 4.3 મુજબ, પહેલા કૂલિંગ ફેન અને ટર્મિનલ બ્લોક TB-2 તપાસો.",
      responseCheckFan: "ઇન્વેન્ટરી રિપોર્ટ: બે 4 માં 3 નવા ફેન (#VX-CF42, $245.00) ઉપલબ્ધ છે.",
      responseCreateTicket: "મેં ટિકિટ #TCK-2026-881 તૈયાર કરી છે. પાર્ટ માટે $245.00 નો ખર્ચ હોવાથી તમારી મંજૂરી જરૂરી છે.",
      responseScanDetected: "સ્કેન સફળ: ભૂલ E17 અને તાપમાન 88.4°C નોંધાયું."
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
      visionTitle: 'ಕ್ಯಾಮೆರಾ ದೃಷ್ಟಿ & ತಾಪಮಾನ',
      knowledgeTitle: 'ಕೈಪಿಡಿ ಸಾಕ್ಷ್ಯ',
      synthesisTitle: 'AI ನಿರ್ಧಾರ ಸಿದ್ಧ',
      talkToVoxlens: 'ಮಾತನಾಡಿ',
      listening: 'ಕೇಳಿಸಿಕೊಳ್ಳುತ್ತಿದೆ...',
      processing: 'ವಿಶ್ಲೇಷಿಸಲಾಗುತ್ತಿದೆ...',
      triggerScan: 'ಸ್ಕ್ಯಾನ್ ಮಾಡಿ',
      quickPromptsTitle: 'ಶಿಫಾರಸು ಮಾಡಿದ ಪ್ರಶ್ನೆಗಳು'
    },
    copilot: {
      greeting: "ನಮಸ್ಕಾರ ಅಲೆಕ್ಸ್. ನಾನು VX-420 ಪ್ಯಾಕೇಜಿಂಗ್ ಯೂನಿಟ್‌ಗೆ (#VX-2048) ಸಂಪರ್ಕ ಹೊಂದಿದ್ದೇನೆ. ನಾನು ಕ್ಯಾಮೆರಾ ಫೀಡ್ ಮತ್ತು ಸೇವಾ ಕೈಪಿಡಿಯನ್ನು ಮೇಲ್ವಿಚಾರಣೆ ಮಾಡುತ್ತಿದ್ದೇನೆ.\n\nನೀವು ನೇರವಾಗಿ ಮಾತನಾಡಬಹುದು ಅಥವಾ ದೋಷವನ್ನು ಕ್ಯಾಮೆರಾದಲ್ಲಿ ತೋರಿಸಬಹುದು.",
      e17Diagnosis: "ನಾನು E17 ದೋಷವನ್ನು ಗುರುತಿಸಿದ್ದೇನೆ. ಸೇವಾ ಕೈಪಿಡಿಯ ಪ್ರಕಾರ (ವಿಭಾಗ 4.3, ಪುಟ 42), ಮೋಟಾರ್ ತಾಪಮಾನವು 88.4°C ಗೆ ತಲುಪಿದೆ.",
      recTitle: "ಶಿಫಾರಸು ಮಾಡಲಾದ ಮುಂದಿನ ಹಂತಗಳು:",
      recStep1: "1. ಕೂಲಿಂಗ್ ಫ್ಯಾನ್‌ನಲ್ಲಿ ಯಾವುದೇ ಅಡೆತಡೆಗಳಿವೆಯೇ ಎಂದು ಪರಿಶೀಲಿಸಿ.",
      recStep2: "2. ಟರ್ಮಿನಲ್ ಬ್ಲಾಕ್ TB-2 ನಲ್ಲಿ 3-ಹಂತದ ವೈರಿಂಗ್ ಸಂಪರ್ಕಗಳನ್ನು ಪರಿಶೀಲಿಸಿ.",
      recStep3: "3. ಮೋಟಾರ್ ತಾಪಮಾನ ಮಟ್ಟವನ್ನು (ಪ್ರಸ್ತುತ 88.4°C) ಪರಿಶೀಲಿಸಿ.",
      questionAction: "ನಾನು ನಿರ್ವಹಣಾ ಟಿಕೆಟ್ ಸಿದ್ಧಪಡಿಸಿ, ಹೊಸ ಫ್ಯಾನ್ ಸ್ಟಾಕ್ ಪರಿಶೀಲಿಸಬೇಕೆ?",
      groundedByManual: "ಕೈಪಿಡಿಯಿಂದ ದೃಢೀಕರಿಸಲಾಗಿದೆ",
      viewEvidence: "ಸಾಕ್ಷ್ಯ ನೋಡಿ",
      safetyRequired: "ಮಾನವ ಅನುಮೋದನೆ ಅಗತ್ಯವಿದೆ",
      reviewAndAuthorize: "ಪರಿಶೀಲಿಸಿ ಮತ್ತು ಅನುಮೋದಿಸಿ",
      placeholder: "ವೋಕ್ಸ್‌ಲೆನ್ಸ್ ಬಳಿ ಕೇಳಿ...",
      quickPrompts: [
        { label: "E17 ಎಂದರೆ ಏನು?", query: "VX-420 ನಲ್ಲಿ ದೋಷ E17 ನ ಅರ್ಥವೇನು?" },
        { label: "ಮೊದಲು ಏನು ಪರಿಶೀಲಿಸಬೇಕು?", query: "E17 ದೋಷಕ್ಕೆ ಮೊದಲು ಏನು ಪರಿಶೀಲಿಸಬೇಕು?" },
        { label: "ಫ್ಯಾನ್ ಸ್ಟಾಕ್ ಚೆಕ್ ಮಾಡಿ", query: "ಬೇ 4 ನಲ್ಲಿ ಹೊಸ ಫ್ಯಾನ್ ಲಭ್ಯವಿದೆಯೇ?" },
        { label: "ಟಿಕೆಟ್ ರಚಿಸಿ", query: "ಕೂಲಿಂಗ್ ಫ್ಯಾನ್ ಸಮಸ್ಯೆಗಾಗಿ ನಿರ್ವಹಣಾ ಟಿಕೆಟ್ ರಚಿಸಿ." }
      ],
      responseE17Mean: "E17 ದೋಷವು ಮೋಟಾರ್ ಅಧಿಕ ತಾಪಮಾನವನ್ನು ಸೂಚಿಸುತ್ತದೆ. ಸುರಕ್ಷಿತ ಮಿತಿ 75.0°C; ಪ್ರಸ್ತುತ ತಾಪಮಾನ 88.4°C.",
      responseCheckFirst: "ವಿಭಾಗ 4.3 ರ ಪ್ರಕಾರ, ಮೊದಲು ಕೂಲಿಂಗ್ ಫ್ಯಾನ್ ಮತ್ತು ಟರ್ಮಿನಲ್ ಬ್ಲಾಕ್ TB-2 ಅನ್ನು ಪರಿಶೀಲಿಸಿ.",
      responseCheckFan: "ದಾಸ್ತಾನು ವರದಿ: ಬೇ 4 ನಲ್ಲಿ 3 ಹೊಸ ಫ್ಯಾನ್‌ಗಳು (#VX-CF42, $245.00) ಲಭ್ಯವಿವೆ.",
      responseCreateTicket: "ನಾನು ಟಿಕೆಟ್ #TCK-2026-881 ಅನ್ನು ಸಿದ್ಧಪಡಿಸಿದ್ದೇನೆ. ಭಾಗಕ್ಕೆ $245.00 ವೆಚ್ಚವಾಗುವುದರಿಂದ ನಿಮ್ಮ ಅನುಮೋದನೆ ಅಗತ್ಯವಿದೆ.",
      responseScanDetected: "ಸ್ಕ್ಯಾನ್ ಯಶಸ್ವಿಯಾಗಿದೆ: ದೋಷ E17 ಮತ್ತು ತಾಪಮಾನ 88.4°C ದಾಖಲಾಗಿದೆ."
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
      visionTitle: 'ਕੈਮਰਾ ਵਿਜ਼ਨ ਅਤੇ ਤਾਪਮਾਨ',
      knowledgeTitle: 'ਮੈਨੂਅਲ ਸਬੂਤ',
      synthesisTitle: 'AI ਫੈਸਲਾ ਤਿਆਰ',
      talkToVoxlens: 'ਬੋਲੋ',
      listening: 'ਸੁਣ ਰਿਹਾ ਹੈ...',
      processing: 'ਪ੍ਰੋਸੈਸਿੰਗ ਜਾਰੀ ਹੈ...',
      triggerScan: 'ਸਕੈਨ ਸ਼ੁਰੂ ਕਰੋ',
      quickPromptsTitle: 'ਸੁਝਾਏ ਗਏ ਸਵਾਲ'
    },
    copilot: {
      greeting: "ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ ਐਲੇਕਸ। ਮੈਂ VX-420 ਪੈਕੇਜਿੰਗ ਯੂਨਿਟ (#VX-2048) ਨਾਲ ਜੁੜਿਆ ਹੋਇਆ ਹਾਂ। ਮੈਂ ਕੈਮਰਾ ਫੀਡ ਅਤੇ ਸਰਵਿਸ ਮੈਨੂਅਲ ਦੀ ਨਿਗਰਾਨੀ ਕਰ ਰਿਹਾ ਹਾਂ।\n\nਤੁਸੀਂ ਸਿੱਧਾ ਬੋਲ ਸਕਦੇ ਹੋ ਜਾਂ ਕੈਮਰੇ ਵਿੱਚ ਨੁਕਸ ਦਿਖਾ ਸਕਦੇ ਹੋ।",
      e17Diagnosis: "ਮੈਂ E17 ਨੁਕਸ ਦੀ ਪਛਾਣ ਕੀਤੀ ਹੈ। ਸਰਵਿਸ ਮੈਨੂਅਲ (ਸੈਕਸ਼ਨ 4.3, ਪੰਨਾ 42) ਦੇ ਅਨੁਸਾਰ, ਮੋਟਰ ਦਾ ਤਾਪਮਾਨ 88.4°C ਤੱਕ ਪਹੁੰਚ ਗਿਆ ਹੈ ਜੋ 75.0°C ਤੋਂ ਵੱਧ ਹੈ।",
      recTitle: "ਸਿਫਾਰਸ਼ ਕੀਤੇ ਅਗਲੇ ਕਦਮ:",
      recStep1: "1. ਕੂਲਿੰਗ ਫੈਨ ਵਿੱਚ ਕੋਈ ਰੁਕਾਵਟ ਤਾਂ ਨਹੀਂ ਹੈ, ਇਸਦੀ ਜਾਂਚ ਕਰੋ।",
      recStep2: "2. ਟਰਮੀਨਲ ਬਲਾਕ TB-2 'ਤੇ ਵਾਇਰਿੰਗ ਕੁਨੈਕਸ਼ਨਾਂ ਦੀ ਪੁਸ਼ਟੀ ਕਰੋ।",
      recStep3: "3. ਮੋਟਰ ਓਵਰਲੋਡ ਤਾਪਮਾਨ (ਮੌਜੂਦਾ 88.4°C) ਦੀ ਜਾਂਚ ਕਰੋ।",
      questionAction: "ਕੀ ਮੈਂ ਮੇਨਟੇਨੈਂਸ ਟਿਕਟ ਬਣਾਵਾਂ ਅਤੇ ਨਵੇਂ ਫੈਨ ਦਾ ਸਟਾਕ ਚੈੱਕ ਕਰਾਂ?",
      groundedByManual: "ਮੈਨੂਅਲ ਦੁਆਰਾ ਪ੍ਰਮਾਣਿਤ",
      viewEvidence: "ਸਬੂਤ ਦੇਖੋ",
      safetyRequired: "ਮਨੁੱਖੀ ਪ੍ਰਵਾਨਗੀ ਲੋੜੀਂਦੀ ਹੈ",
      reviewAndAuthorize: "ਸਮੀਖਿਆ ਕਰੋ ਅਤੇ ਪ੍ਰਵਾਨਗੀ ਦਿਓ",
      placeholder: "ਵੌਕਸਲੈਂਸ ਨੂੰ ਪੁੱਛੋ...",
      quickPrompts: [
        { label: "E17 ਦਾ ਕੀ ਅਰਥ ਹੈ?", query: "VX-420 ਵਿੱਚ ਨੁਕਸ E17 ਦਾ ਕੀ ਅਰਥ ਹੈ?" },
        { label: "ਪਹਿਲਾਂ ਕੀ ਜਾਂਚੀਏ?", query: "E17 ਲਈ ਪਹਿਲਾਂ ਕੀ ਜਾਂਚਣਾ ਚਾਹੀਦਾ ਹੈ?" },
        { label: "ਫੈਨ ਸਟਾਕ ਚੈੱਕ ਕਰੋ", query: "ਕੀ ਬੇ 4 ਵਿੱਚ ਨਵਾਂ ਫੈਨ ਉਪਲਬਧ ਹੈ?" },
        { label: "ਟਿਕਟ ਬਣਾਓ", query: "ਕੂਲਿੰਗ ਫੈਨ ਸਮੱਸਿਆ ਲਈ ਮੇਨਟੇਨੈਂਸ ਟਿਕਟ ਬਣਾਓ।" }
      ],
      responseE17Mean: "E17 ਨੁਕਸ ਮੋਟਰ ਓਵਰਲੋਡ ਨੂੰ ਦਰਸਾਉਂਦਾ ਹੈ। ਸੁਰੱਖਿਅਤ ਸੀਮਾ 75.0°C ਹੈ; ਮੌਜੂਦਾ ਤਾਪਮਾਨ 88.4°C ਹੈ।",
      responseCheckFirst: "ਸੈਕਸ਼ਨ 4.3 ਦੇ ਅਨੁਸਾਰ, ਪਹਿਲਾਂ ਕੂਲਿੰਗ ਫੈਨ ਅਤੇ ਟਰਮੀਨਲ ਬਲਾਕ TB-2 ਦੀ ਜਾਂਚ ਕਰੋ।",
      responseCheckFan: "ਇਨਵੈਂਟਰੀ ਰਿਪੋਰਟ: ਬੇ 4 ਵਿੱਚ 3 ਨਵੇਂ ਫੈਨ (#VX-CF42, $245.00) ਉਪਲਬਧ ਹਨ।",
      responseCreateTicket: "ਮੈਂ ਟਿਕਟ #TCK-2026-881 ਤਿਆਰ ਕੀਤੀ ਹੈ। ਪਾਰਟ ਲਈ $245.00 ਦਾ ਖਰਚਾ ਹੈ, ਇਸ ਲਈ ਤੁਹਾਡੀ ਪ੍ਰਵਾਨਗੀ ਲੋੜੀਂਦੀ ਹੈ।",
      responseScanDetected: "ਸਕੈਨ ਸਫਲ: ਨੁਕਸ E17 ਅਤੇ ਤਾਪਮਾਨ 88.4°C ਦਰਜ ਕੀਤਾ ਗਿਆ।"
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
      visionTitle: 'کیمرہ ویژن اور درجہ حرارت',
      knowledgeTitle: 'دستی کتاب کا ثبوت',
      synthesisTitle: 'AI فیصلہ تیار',
      talkToVoxlens: 'بات کریں',
      listening: 'سن رہا ہے...',
      processing: 'سوچ رہا ہے...',
      triggerScan: 'اسکین شروع کریں',
      quickPromptsTitle: 'تجویز کردہ سوالات'
    },
    copilot: {
      greeting: "ہیلو ایلکس۔ میں لائن 3 کے VX-420 پیکیجنگ یونٹ (#VX-2048) سے منسلک ہوں۔ میں لائیو کیمرہ فیڈ اور سروس مینوئل کی نگرانی کر رہا ہوں۔\n\nآپ بلا جھجھک بات کر سکتے ہیں یا کیمرے میں خرابی دکھا سکتے ہیں۔",
      e17Diagnosis: "میں نے E17 کی خرابی کی نشاندہی کی ہے۔ سروس مینوئل (سیکشن 4.3، صفحہ 42) کے مطابق، موٹر کا درجہ حرارت 88.4°C تک پہنچ گیا ہے جو کہ 75.0°C کی حد سے زیادہ ہے۔",
      recTitle: "تجویز کردہ اگلے اقدامات:",
      recStep1: "1. کولنگ فین میں کسی رکاوٹ کی جانچ کریں۔",
      recStep2: "2. ٹرمینل بلاک TB-2 پر 3 فیز وائرنگ کی تصدیق کریں۔",
      recStep3: "3. موٹر کے اوورلوڈ درجہ حرارت (موجودہ 88.4°C) کی جانچ کریں۔",
      questionAction: "کیا آپ چاہتے ہیں کہ میں مینٹیننس ٹکٹ تیار کروں اور نئے پنکھے کا اسٹاک چیک کروں؟",
      groundedByManual: "مینوئل کے ذریعے تصدیق شدہ",
      viewEvidence: "ثبوت دیکھیں",
      safetyRequired: "انسانی منظوری درکار ہے",
      reviewAndAuthorize: "جائزہ لیں اور منظور کریں",
      placeholder: "ووکس لینس سے پوچھیں...",
      quickPrompts: [
        { label: "E17 کا کیا مطلب ہے؟", query: "VX-420 میں خرابی E17 کا کیا مطلب ہے؟" },
        { label: "پہلے کیا چیک کریں؟", query: "خرابی E17 کے لیے سب سے پہلے کیا چیک کرنا چاہیے؟" },
        { label: "پنکھے کا اسٹاک چیک کریں", query: "کیا بے 4 میں نیا کولنگ پنکھا دستیاب ہے؟" },
        { label: "ٹکٹ بنائیں", query: "کولنگ پنکھے کے مسئلے کے لیے مینٹیننس ٹکٹ بنائیں۔" }
      ],
      responseE17Mean: "E17 خرابی موٹر کے زیادہ گرم ہونے کی نشاندہی کرتی ہے۔ محفوظ حد 75.0°C ہے؛ موجودہ درجہ حرارت 88.4°C ہے۔",
      responseCheckFirst: "سیکشن 4.3 کے مطابق، پہلے کولنگ پنکھا اور ٹرمینل بلاک TB-2 چیک کریں۔",
      responseCheckFan: "اسٹاک رپورٹ: بے 4 میں 3 نئے پنکھے (#VX-CF42, $245.00) دستیاب ہیں۔",
      responseCreateTicket: "میں نے ٹکٹ #TCK-2026-881 تیار کر دیا ہے۔ پرزے پر $245.00 کی لاگت کی وجہ سے آپ کی منظوری درکار ہے۔",
      responseScanDetected: "اسکین کامیاب: خرابی E17 اور درجہ حرارت 88.4°C ریکارڈ کیا گیا۔"
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
  return TRANSLATIONS[lang] || TRANSLATIONS.en;
}
