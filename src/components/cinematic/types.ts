export type StoryLanguage = 'en' | 'hi' | 'hinglish' | 'es' | 'fr' | 'de' | 'ja';

export interface LanguageDef {
  id: StoryLanguage;
  label: string;
  nativeLabel: string;
  flag: string;
  speechLocale: string;
}

export const SUPPORTED_LANGUAGES: LanguageDef[] = [
  { id: 'en', label: 'English', nativeLabel: 'English', flag: '🇺🇸', speechLocale: 'en-US' },
  { id: 'hi', label: 'Hindi', nativeLabel: 'हिंदी', flag: '🇮🇳', speechLocale: 'hi-IN' },
  { id: 'hinglish', label: 'Hinglish', nativeLabel: 'Hinglish', flag: '🇮🇳', speechLocale: 'hi-IN' },
  { id: 'es', label: 'Spanish', nativeLabel: 'Español', flag: '🇪🇸', speechLocale: 'es-ES' },
  { id: 'fr', label: 'French', nativeLabel: 'Français', flag: '🇫🇷', speechLocale: 'fr-FR' },
  { id: 'de', label: 'German', nativeLabel: 'Deutsch', flag: '🇩🇪', speechLocale: 'de-DE' },
  { id: 'ja', label: 'Japanese', nativeLabel: '日本語', flag: '🇯🇵', speechLocale: 'ja-JP' }
];

export interface SceneTranslation {
  tag: string;
  title: string;
  headline: string;
  supporting: string;
  narration: string;
  subtitles: string[];
}

export interface CinematicSceneDef {
  id: number;
  slug: string;
  durationSeconds: number;
  translations: Record<StoryLanguage, SceneTranslation>;
}

export const CINEMATIC_SCENES: CinematicSceneDef[] = [
  {
    id: 1,
    slug: 'opening',
    durationSeconds: 10,
    translations: {
      en: {
        tag: 'SCENE 01 · PROLOGUE',
        title: 'The Industrial Dilemma',
        headline: 'EVERY SECOND A MACHINE STOPS...',
        supporting: '...someone has to find out why. Today, that someone is usually searching.',
        narration: 'Every second a machine stops, someone has to find out why. Today, that technician is usually searching through hundreds of pages of manuals.',
        subtitles: ['Every second a machine stops...', '...someone has to find out why.', 'Today, that someone is usually searching.']
      },
      hi: {
        tag: 'दृश्य ०१ · परिचय',
        title: 'औद्योगिक चुनौती',
        headline: 'हर सेकंड जब मशीन रुकती है...',
        supporting: '...तो किसी को वजह ढूंढनी पड़ती है। आज भी वह मैनुअल में ढूंढ रहा है।',
        narration: 'जब भी कोई मशीन रुकती है, किसी को यह पता लगाना पड़ता है कि क्यों। आज भी वह तकनीशियन सैकड़ों पन्नों के मैनुअल में जवाब तलाश रहा होता है।',
        subtitles: ['हर सेकंड जब मशीन रुकती है...', '...तो किसी को वजह ढूंढनी पड़ती है।', 'आज वह जवाब मैनुअल में तलाश रहा है।']
      },
      hinglish: {
        tag: 'SCENE 01 · PROLOGUE',
        title: 'Field Service Challenge',
        headline: 'JAB BHI MACHINE RUKTI HAI...',
        supporting: '...kisi ko turant samajhna padta hai ki problem kya hai. Par manual dhoondhna slow hai.',
        narration: 'Jab machine rukti hai, kisi ko turant samajhna padta hai ki problem kya hai. Par 500-page manual search karna bahut time leta hai.',
        subtitles: ['Jab bhi machine rukti hai...', '...kisi ko reason dhoondhna padta hai.', 'Par manual search karna slow hai.']
      },
      es: {
        tag: 'ESCENA 01 · PRÓLOGO',
        title: 'El Dilema Industrial',
        headline: 'CADA SEGUNDO QUE UNA MÁQUINA SE DETIENE...',
        supporting: '...alguien tiene que descubrir por qué. Hoy, casi siempre están buscando en manuales.',
        narration: 'Cada segundo que una máquina se detiene, alguien tiene que descubrir por qué. Hoy, ese técnico suele buscar en cientos de páginas de manuales.',
        subtitles: ['Cada segundo que una máquina se detiene...', '...alguien debe saber por qué.', 'Hoy, esa respuesta se busca en manuales.']
      },
      fr: {
        tag: 'SCÈNE 01 · PROLOGUE',
        title: 'Le Dilemme Industriel',
        headline: 'CHAQUE SECONDE QU’UNE MACHINE S’ARRÊTE...',
        supporting: '...quelqu’un doit découvrir pourquoi. Aujourd’hui, on cherche dans des manuels.',
        narration: 'Chaque seconde qu’une machine s’arrête, quelqu’un doit en trouver la cause. Aujourd’hui, le technicien passe son temps à chercher dans des manuels.',
        subtitles: ['Chaque seconde qu’une machine s’arrête...', '...quelqu’un doit trouver pourquoi.', 'Aujourd’hui, on cherche dans les manuels.']
      },
      de: {
        tag: 'SZENE 01 · PROLOG',
        title: 'Das Industrie-Dilemma',
        headline: 'JEDE SEKUNDE, DIE EINE MASCHINE STEHT...',
        supporting: '...muss jemand den Grund finden. Heute sucht man meist in Handbüchern.',
        narration: 'Jede Sekunde, die eine Maschine stillsteht, muss jemand herausfinden, warum. Heute durchsucht der Techniker Hunderte Seiten von Handbüchern.',
        subtitles: ['Jede Sekunde, die eine Maschine steht...', '...muss jemand den Grund finden.', 'Heute sucht man in Handbüchern.']
      },
      ja: {
        tag: 'シーン 01 · 序幕',
        title: '現場のジレンマ',
        headline: '機械が止まるその瞬間...',
        supporting: '...誰かが原因を突き止めなければならない。現在、その多くは手作業の検索です。',
        narration: '工場で機械が停止するたび、誰かがその原因を突き止めなければなりません。今日でも技術者は分厚いマニュアルを手作業でめくっています。',
        subtitles: ['機械が止まるその瞬間...', '...誰かが原因を探さなければならない。', '現在、それは手動の検索です。']
      }
    }
  },
  {
    id: 2,
    slug: 'problem',
    durationSeconds: 11,
    translations: {
      en: {
        tag: 'SCENE 02 · THE BOTTLENECK',
        title: 'Hands-Busy Dilemma',
        headline: 'ONE FAULT. MULTIPLE SYSTEMS. TOO MUCH TIME.',
        supporting: 'Manual PDF scrolling, phone calls, and terminal typing consume 45+ minutes of plant downtime.',
        narration: 'During a critical repair, hands are greasy and busy. Searching through PDF manuals and making phone calls creates friction and plant downtime.',
        subtitles: ['One fault.', 'Multiple disconnected systems.', 'Too much lost time.']
      },
      hi: {
        tag: 'दृश्य ०२ · समस्या',
        title: 'समय की बर्बादी',
        headline: 'एक फॉल्ट। कई सिस्टम। बहुत सारा बर्बाद समय।',
        supporting: 'दस्ताने पहनकर पीडीएफ खंगालना और फोन पर पूछना ४५ मिनट का डाउनटाइम पैदा करता है।',
        narration: 'रिपेयर के दौरान हाथ व्यस्त होते हैं। ५०० पेज के मैनुअल में ढूंढना और फोन कॉल करना मरम्मत को धीमा कर देता है।',
        subtitles: ['एक फॉल्ट।', 'कई अलग-अलग सिस्टम।', 'बहुत सारा बर्बाद समय।']
      },
      hinglish: {
        tag: 'SCENE 02 · THE BOTTLENECK',
        title: 'Field Friction',
        headline: 'EK FAULT. MULTIPLE SYSTEMS. TOO MUCH WASTED TIME.',
        supporting: 'Gloves pehankar PDF scroll karna aur supervisor ko phone lagana repair ko slow karta hai.',
        narration: 'Repair ke time haath busy hote hain. PDF manuals dhoondhna aur supervisor ko call karne mein 45 minutes waste ho jaate hain.',
        subtitles: ['Ek fault.', 'Disconnected manual systems.', '45+ minutes downtime.']
      },
      es: {
        tag: 'ESCENA 02 · EL CUELLO DE BOTELLA',
        title: 'Fricción en Campo',
        headline: 'UNA AVERÍA. MÚLTIPLES SISTEMAS. DEMASIADO TIEMPO.',
        supporting: 'Buscar en PDFs y llamar por teléfono añade más de 45 minutos de inactividad.',
        narration: 'Durante una reparación crítica, las manos están ocupadas. Buscar en PDFs y hacer llamadas retrasa la producción.',
        subtitles: ['Una avería.', 'Múltiples sistemas desconectados.', 'Demasiado tiempo perdido.']
      },
      fr: {
        tag: 'SCÈNE 02 · LE GOULOT',
        title: 'Friction Terrain',
        headline: 'UNE PANNE. PLUSIEURS SYSTÈMES. TROP DE TEMPS.',
        supporting: 'Recherches PDF et appels téléphoniques causent plus de 45 minutes d’arrêt.',
        narration: 'Pendant une réparation, les mains sont occupées. Feuilleter des PDF et passer des appels ralentit l’intervention.',
        subtitles: ['Une panne.', 'Des systèmes déconnectés.', 'Trop de temps perdu.']
      },
      de: {
        tag: 'SZENE 02 · DER ENGPASS',
        title: 'Reibungsverlust',
        headline: 'EIN FEHLER. VIELE SYSTEME. ZU VIEL ZEIT.',
        supporting: 'PDF-Suche und Telefonate verursachen über 45 Minuten Stillstandzeit.',
        narration: 'Bei Reparaturen sind die Hände beschäftigt. Die manuelle Suche in Handbüchern und Rückfragen kosten wertvolle Produktionszeit.',
        subtitles: ['Ein Fehler.', 'Viele getrennte Systeme.', 'Zu viel verlorene Zeit.']
      },
      ja: {
        tag: 'シーン 02 · ボトルネック',
        title: '作業の摩擦',
        headline: '1つの故障。分断されたシステム。失われる時間。',
        supporting: '手袋をつけたままのPDF検索や電話確認が45分以上のダウンタイムを引き起こします。',
        narration: '修理中、作業員の手は塞がっています。PDFマニュアルをスクロールし電話で確認する作業が復旧を遅らせます。',
        subtitles: ['1つの故障。', '分断されたシステム。', '多すぎるロスタイム。']
      }
    }
  },
  {
    id: 3,
    slug: 'vision',
    durationSeconds: 11,
    translations: {
      en: {
        tag: 'SCENE 03 · VOXLENS ARRIVES',
        title: 'Hands-Free Vision',
        headline: 'SHOW ME THE MACHINE.',
        supporting: 'Point the smart visor camera. Optical CV isolates E17, model serial, and thermal spikes.',
        narration: 'VoxLens arrives. The technician points the camera. Vision instantly isolates the equipment, OCR fault code E17, and thermal anomaly.',
        subtitles: ['"Show me the machine."', 'Camera isolates Fault Code E17.', 'Thermal spike 88.4°C detected.']
      },
      hi: {
        tag: 'दृश्य ०३ · वॉक्सलेंस आगमन',
        title: 'स्मार्ट विज़न',
        headline: 'मशीन की ओर कैमरा करें।',
        supporting: 'कैमरा दिखाते ही ऑप्टिकल विज़न तुरंत E17, मशीन मॉडल और तापमान पहचान लेता है।',
        narration: 'वॉक्सलेंस शुरू होता है। तकनीशियन कैमरा मशीन की तरफ करता है। विज़न तुरंत E17 कोड और थर्मल अनॉमली पहचान लेता है।',
        subtitles: ['"मशीन की तरफ कैमरा करें।"', 'ऑप्टिकल OCR ने एरर E17 पहचाना।', '८८.४°C तापमान डिटेक्ट हुआ।']
      },
      hinglish: {
        tag: 'SCENE 03 · VOXLENS ARRIVES',
        title: 'Live Vision HUD',
        headline: 'SHOW ME THE MACHINE.',
        supporting: 'Camera point karte hi Optical CV ne E17, model aur 88.4°C thermal spike identify kiya.',
        narration: 'VoxLens activate hota hai. Camera point karte hi vision instantly equipment, error E17 aur thermal overheat detect karta hai.',
        subtitles: ['"Show me the machine."', 'Error E17 optically identified.', '88.4°C thermal spike detected.']
      },
      es: {
        tag: 'ESCENA 03 · LLEGA VOXLENS',
        title: 'Visión en Tiempo Real',
        headline: 'MUESTRAME LA MÁQUINA.',
        supporting: 'Apunte la cámara. La visión óptica aísla E17, número de serie y anomalías térmicas.',
        narration: 'Llega VoxLens. El técnico apunta la cámara. La visión por computadora aísla el error E17 y el sobrecalentamiento.',
        subtitles: ['"Muéstrame la máquina."', 'Detección óptica de avería E17.', 'Anomalía térmica de 88.4°C.']
      },
      fr: {
        tag: 'SCÈNE 03 · VOXLENS ARRIVE',
        title: 'Vision Temps Réel',
        headline: 'MONTREZ-MOI LA MACHINE.',
        supporting: 'Pointez la caméra. La vision isole le code E17, le modèle et la surchauffe.',
        narration: 'VoxLens s’active. Le technicien pointe la caméra. L’analyse visuelle détecte le code E17 et l’anomalie thermique.',
        subtitles: ['"Montrez-moi la machine."', 'Détection optique du code E17.', 'Surchauffe thermique à 88.4°C.']
      },
      de: {
        tag: 'SZENE 03 · VOXLENS AKTIV',
        title: 'Echtzeit-Vision',
        headline: 'ZEIG MIR DIE MASCHINE.',
        supporting: 'Kamera ausrichten. Computer Vision erkennt Fehler E17 und thermische Anomalien sofort.',
        narration: 'VoxLens aktiviert sich. Der Techniker richtet die Kamera aus. Die Bildverarbeitung erkennt Fehler E17 und thermische Überlastung.',
        subtitles: ['"Zeig mir die Maschine."', 'Fehlercode E17 optisch erkannt.', 'Thermische Anomalie 88.4°C isoliert.']
      },
      ja: {
        tag: 'シーン 03 · VOXLENS 起動',
        title: 'ハンズフリー画像認識',
        headline: '機械をカメラに見せてください。',
        supporting: 'カメラを向けるだけで、AIがエラーE17と88.4°Cの熱異常を瞬時に特定します。',
        narration: 'VoxLensが起動します。カメラを機械に向けるだけで、光学OCRがエラーE17と温度異常をリアルタイムに認識します。',
        subtitles: ['「機械を見せてください」', 'エラーコードE17を即座に認識。', '88.4°Cの熱異常を検出。']
      }
    }
  },
  {
    id: 4,
    slug: 'fusion',
    durationSeconds: 12,
    translations: {
      en: {
        tag: 'SCENE 04 · MULTIMODAL FUSION',
        title: 'PS-05 Tri-Modal Convergence',
        headline: 'THREE SIGNALS. ONE UNDERSTANDING.',
        supporting: 'Spoken intent, optical telemetry, and dense OEM vectors fuse into unified diagnostic context.',
        narration: 'VoxLens combines three signals: what the technician says, what the camera sees, and what the technical manual says into a single understanding.',
        subtitles: ['Voice stream + Optical Vision + RAG Manuals', 'Converging into unified multimodal context.', 'Zero hallucinations. Grounded reasoning.']
      },
      hi: {
        tag: 'दृश्य ०४ · मल्टीमॉडल फ्यूजन',
        title: 'त्रिकोणीय समझ',
        headline: 'तीन संकेत। एक समझ।',
        supporting: 'बोली गई आवाज़, कैमरे का दृश्य और टेक्निकल मैन्युअल एक साथ मिलकर सटीक नतीजा निकालते हैं।',
        narration: 'वॉक्सलेंस तीन सिग्नल्स को जोड़ता है: जो तकनीशियन बोलता है, जो कैमरा देखता है, और जो मैन्युअल में लिखा है।',
        subtitles: ['आवाज़ + कैमरा विज़न + टेक्निकल मैन्युअल', 'एक संयुक्त मल्टीमॉडल संदर्भ में एकत्रित।', 'शून्य भ्रम। १००% प्रमाणित।']
      },
      hinglish: {
        tag: 'SCENE 04 · MULTIMODAL FUSION',
        title: 'Tri-Modal Fusion',
        headline: 'TEEN SIGNALS. EK REAL-TIME UNDERSTANDING.',
        supporting: 'Technician ki voice, camera ki vision, aur dense OEM manual RAG milkar instant context banate hain.',
        narration: 'VoxLens teen signals ko combine karta hai: jo technician bolta hai, jo camera dekhta hai, aur jo OEM manual kehta hai.',
        subtitles: ['Voice + Vision + Manual RAG', 'Converging into grounded AI understanding.', '100% Verified Technical Context.']
      },
      es: {
        tag: 'ESCENA 04 · FUSIÓN MULTIMODAL',
        title: 'Convergencia Tri-Modal',
        headline: 'TRES SEÑALES. UN SOLO ENTENDIMIENTO.',
        supporting: 'Voz, telemetría óptica y manuales técnicos se fusionan en un contexto unificado.',
        narration: 'VoxLens combina tres señales: lo que el técnico dice, lo que la cámara ve y lo que indica el manual técnico.',
        subtitles: ['Voz + Visión de cámara + Manuales RAG', 'Convergencia en contexto multimodal.', 'Razonamiento 100% verificado.']
      },
      fr: {
        tag: 'SCÈNE 04 · FUSION MULTIMODALE',
        title: 'Convergence Tri-Modale',
        headline: 'TROIS SIGNAUX. UNE SEULE COMPRÉHENSION.',
        supporting: 'La voix, la vision et les manuels techniques fusionnent en un contexte unique.',
        narration: 'VoxLens associe trois signaux : la parole du technicien, la vue de la caméra et les données du manuel technique.',
        subtitles: ['Voix + Caméra + Manuels RAG', 'Convergence multimodale en temps réel.', 'Raisonnement vérifié sans hallucination.']
      },
      de: {
        tag: 'SZENE 04 · MULTIMODALE FUSION',
        title: 'Tri-Modale Konvergenz',
        headline: 'DREI SIGNALE. EIN VERSTÄNDNIS.',
        supporting: 'Sprachbefehl, Kamerasignal und Handbuchdaten verschmelzen zu einem Diagnosekontext.',
        narration: 'VoxLens vereint drei Signale: was der Techniker sagt, was die Kamera sieht und was das technische Handbuch vorgibt.',
        subtitles: ['Sprache + Bilderkennung + Handbuch-RAG', 'Konvergenz zu einheitlichem KI-Kontext.', 'Vollständig fundierte Diagnose.']
      },
      ja: {
        tag: 'シーン 04 · マルチモーダル融合',
        title: '3要素のリアルタイム統合',
        headline: '3つのシグナル。1つの確信。',
        supporting: '音声の意図、カメラの視覚情報、マニュアルの技術知識が瞬時に融合します。',
        narration: 'VoxLensは3つのシグナルを統合します：作業員の声、カメラの視覚、そして技術マニュアルの確固たる証拠です。',
        subtitles: ['音声 ＋ 視覚 ＋ マニュアル知識', 'リアルタイムに1つのコンテキストへ統合。', 'ハルシネーションゼロの根拠ある推論。']
      }
    }
  },
  {
    id: 5,
    slug: 'reasoning',
    durationSeconds: 11,
    translations: {
      en: {
        tag: 'SCENE 05 · AI SYNTHESIS',
        title: 'Actionable Diagnostic Insight',
        headline: 'FROM SIGNALS TO A CLEAR NEXT STEP.',
        supporting: 'Observed: E17 + 88.4°C · Evidence: Manual §4.3 (P.42) · Action: Inspect axial fan & TB-2.',
        narration: 'Instead of generic answers, VoxLens produces grounded diagnostic next steps: inspect axial cooling fan and verify Terminal Block TB-2.',
        subtitles: ['"I found the relevant procedure in Section 4.3."', 'Recommended checks: 1. Fan shroud, 2. TB-2 torque.', '94% grounded confidence.']
      },
      hi: {
        tag: 'दृश्य ०५ · एआई निर्णय',
        title: 'सटीक रिपेयर निर्देश',
        headline: 'संकेतों से सीधे समाधान की ओर।',
        supporting: 'निरीक्षण: E17 + ८८.४°C · प्रमाण: मैन्युअल §४.३ (पृष्ठ ४२) · अगला कदम: कूलिंग फैन और TB-2 की जांच।',
        narration: 'साधारण जवाब के बजाय, वॉक्सलेंस सटीक निर्देश देता है: कूलिंग फैन का इंस्पेक्शन करें और टर्मिनल ब्लॉक TB-2 चेक करें।',
        subtitles: ['"मैन्युअल सेक्शन ४.३ में सटीक प्रक्रिया मिली।"', 'अनुशंसित जांच: १. फैन ब्लेड्स, २. TB-2 टॉर्क।', '९४% प्रमाणित सटीकता।']
      },
      hinglish: {
        tag: 'SCENE 05 · AI SYNTHESIS',
        title: 'Clear Next Step',
        headline: 'SIGNALS SE CLEAR ACTIONABLE ADVICE.',
        supporting: 'Observed: E17 + 88.4°C · Grounded Evidence: Section 4.3 (P.42) · Next: Inspect fan & TB-2.',
        narration: 'Generic answers ke bajaye VoxLens exact diagnostic next step deta hai: axial cooling fan inspect karein aur TB-2 check karein.',
        subtitles: ['"Section 4.3 mein exact procedure mil gaya."', 'Checks: 1. Axial fan shroud, 2. TB-2 torque.', '94% grounded confidence.']
      },
      es: {
        tag: 'ESCENA 05 · SÍNTESIS DE IA',
        title: 'Paso Diagnóstico Claro',
        headline: 'DE LAS SEÑALES A UN PASO CONCRETO.',
        supporting: 'Observado: E17 + 88.4°C · Evidencia: Manual §4.3 (P.42) · Acción: Inspeccionar ventilador y TB-2.',
        narration: 'En lugar de respuestas genéricas, VoxLens ofrece pasos diagnósticos concretos basados en el manual técnico.',
        subtitles: ['"Encontré el procedimiento en la Sección 4.3."', 'Revisiones: 1. Aspas del ventilador, 2. Bloque TB-2.', 'Confianza respaldada al 94%.']
      },
      fr: {
        tag: 'SCÈNE 05 · SYNTHÈSE IA',
        title: 'Action Diagnostique Précise',
        headline: 'DES SIGNAUX À UNE ACTION CONCRÈTE.',
        supporting: 'Observé : E17 + 88.4°C · Preuve : Manuel §4.3 (P.42) · Action : Inspecter ventilateur et TB-2.',
        narration: 'Plutôt qu’une réponse vague, VoxLens fournit une consigne exacte : inspecter le ventilateur et le bornier TB-2.',
        subtitles: ['"Procédure trouvée dans la section 4.3."', 'Vérifications : 1. Ventilateur, 2. Bornier TB-2.', 'Confiance vérifiée à 94%.']
      },
      de: {
        tag: 'SZENE 05 · KI-SYNTHESE',
        title: 'Klare Handlungsempfehlung',
        headline: 'VON SIGNALEN ZUM NÄCHSTEN SCHRITT.',
        supporting: 'Erkannt: E17 + 88.4°C · Belegt: Handbuch §4.3 (S.42) · Empfehlung: Lüfter und TB-2 prüfen.',
        narration: 'Statt ungenauer Ratschläge liefert VoxLens präzise Schritte: Lüfterrad prüfen und Klemmenblock TB-2 messen.',
        subtitles: ['"Relevante Anleitung in Abschnitt 4.3 gefunden."', 'Schritte: 1. Lüfter prüfen, 2. TB-2 Drehmoment.', '94% fundierte Zuverlässigkeit.']
      },
      ja: {
        tag: 'シーン 05 · AI診断の統合',
        title: '明確な次の一手',
        headline: 'シグナルから、確かな行動へ。',
        supporting: '検知: E17 + 88.4°C · 根拠: マニュアル第4.3節(P.42) · 推奨: 冷却ファン及びTB-2端子の点検。',
        narration: '曖昧な回答ではなく、VoxLensはマニュアルに基づく具体的な手順を提示します：冷却ファンと端子台TB-2の点検です。',
        subtitles: ['「第4.3節に関連手順を発見しました」', '点検項目：1. ファン異物確認、2. TB-2トルク確認。', '根拠適合率 94%。']
      }
    }
  },
  {
    id: 6,
    slug: 'agent',
    durationSeconds: 11,
    translations: {
      en: {
        tag: 'SCENE 06 · THE AGENT ACTS',
        title: 'Automated Operations',
        headline: "DON'T STOP AT ANSWERS.",
        supporting: 'The agent stages maintenance tickets, verifies stockroom inventory, and prepares dispatch.',
        narration: 'The technician says: "Create a maintenance ticket." The agent stages ticket #TCK-2026-881 and reserves part #VX-CF42 from Bay 4.',
        subtitles: ['Technician: "Create a maintenance ticket."', 'Agent: Ticket #TCK-2026-881 staged.', 'Part #VX-CF42 found in Bay 4 (3 available).']
      },
      hi: {
        tag: 'दृश्य ०६ · एजेंट की कार्रवाई',
        title: 'ऑटोमेटेड ऑपरेशन्स',
        headline: 'सिर्फ जवाब नहीं, काम भी।',
        supporting: 'एजेंट मेंटेनेंस टिकट तैयार करता है, गोदाम में पार्ट चेक करता है और डिस्पैच रेडी करता है।',
        narration: 'तकनीशियन कहता है: "मेंटेनेंस टिकट बनाओ।" एजेंट तुरंत टिकट #TCK-2026-881 ड्राफ्ट करता है और बे ४ में पार्ट #VX-CF42 ढूंढ लेता है।',
        subtitles: ['तकनीशियन: "मेंटेनेंस टिकट बनाओ।"', 'एजेंट: टिकट #TCK-2026-881 तैयार।', 'पार्ट #VX-CF42 बे ४ में उपलब्ध (३ इन स्टॉक)।']
      },
      hinglish: {
        tag: 'SCENE 06 · THE AGENT ACTS',
        title: 'Autonomous Tool Execution',
        headline: 'DON\'T STOP AT ANSWERS. TAKE ACTION.',
        supporting: 'Technician bolta hai ticket banao, agent instantly ticket draft karta hai aur Bay 4 inventory check karta hai.',
        narration: 'Technician bolta hai: "Create a maintenance ticket." Agent instantly CMMS ticket draft karta hai aur Bay 4 stock check kar leta hai.',
        subtitles: ['Technician: "Create a maintenance ticket."', 'Agent: Ticket #TCK-2026-881 prepared.', 'Part #VX-CF42 stockroom Bay 4 mein 3 available.']
      },
      es: {
        tag: 'ESCENA 06 · EL AGENTE ACTÚA',
        title: 'Operaciones Autónomas',
        headline: 'NO TE QUEDES SOLO CON RESPUESTAS.',
        supporting: 'El agente prepara el ticket de mantenimiento y verifica el inventario en el almacén.',
        narration: 'El técnico dice: "Crea un ticket". El agente prepara el ticket #TCK-2026-881 y reserva la pieza en el Almacén 4.',
        subtitles: ['Técnico: "Crear ticket de mantenimiento."', 'Agente: Ticket #TCK-2026-881 preparado.', 'Pieza #VX-CF42 disponible en Bahía 4.']
      },
      fr: {
        tag: 'SCÈNE 06 · L’AGENT AGIT',
        title: 'Opérations Automatisées',
        headline: 'NE VOUS ARRÊTEZ PAS AUX RÉPONSES.',
        supporting: 'L’agent prépare le ticket de maintenance et vérifie la disponibilité en stock.',
        narration: 'Le technicien dit : "Créer un ticket". L’agent prépare le ticket #TCK-2026-881 et réserve la pièce en Baie 4.',
        subtitles: ['Technicien : "Créer un ticket de maintenance."', 'Agent : Ticket #TCK-2026-881 préparé.', 'Pièce #VX-CF42 disponible en Baie 4.']
      },
      de: {
        tag: 'SZENE 06 · DER AGENT HANDELT',
        title: 'Automatisierter Ablauf',
        headline: 'MEHR ALS NUR ANTWORTEN.',
        supporting: 'Der Agent erstellt Wartungstickets und prüft das Ersatzteillager in Echtzeit.',
        narration: 'Der Techniker sagt: "Wartungsticket erstellen". Der Agent bereitet Ticket #TCK-2026-881 vor und prüft Lagerfach B4.',
        subtitles: ['Techniker: "Wartungsticket erstellen."', 'Agent: Ticket #TCK-2026-881 vorbereitet.', 'Ersatzteil #VX-CF42 in Bucht 4 verfügbar.']
      },
      ja: {
        tag: 'シーン 06 · エージェントの実行',
        title: '自律的な業務代行',
        headline: '回答だけで終わらせない。',
        supporting: 'エージェントが保守チケットを作成し、倉庫の在庫をリアルタイムに引き当てます。',
        narration: '技術者が「保守チケットを作成して」と指示。エージェントがチケット#TCK-2026-881を作成し部品在庫を確保します。',
        subtitles: ['作業員：「保守チケットを作成して」', 'エージェント：チケット#TCK-2026-881を作成。', '部品#VX-CF42が倉庫第4ベイに3個在庫あり。']
      }
    }
  },
  {
    id: 7,
    slug: 'safety',
    durationSeconds: 12,
    translations: {
      en: {
        tag: 'SCENE 07 · HUMAN SAFETY GATE',
        title: 'Human-in-the-Loop Control',
        headline: 'AI CAN ACT. HUMANS STAY IN CONTROL.',
        supporting: 'Level 2 financial commitment ($245.00) pauses for explicit technician sign-off.',
        narration: 'When an action has financial or operational consequences, VoxLens pauses at a safety gate: "I prepared the action. You remain in control."',
        subtitles: ['Level 2 Safety Gate: $245.00 Part Allocation.', '"I prepared the action. You remain in control."', 'Technician authorizes: Dispatched.']
      },
      hi: {
        tag: 'दृश्य ०७ · सुरक्षा गेट',
        title: 'मानव नियंत्रण',
        headline: 'एआई काम करेगा। नियंत्रण इंसान के पास रहेगा।',
        supporting: 'वित्तीय खर्च ($२४५.००) से पहले तकनीशियन की स्पष्ट मंज़ूरी अनिवार्य है।',
        narration: 'जब भी किसी निर्णय में पैसे खर्च होने की बात आती है, वॉक्सलेंस रुककर पूछता है: "मैंने कार्रवाई तैयार कर दी है, फ़ैसला आपका है।"',
        subtitles: ['लेवल २ सेफ्टी गेट: $२४५.०० पार्ट आबंटन।', '"कार्रवाई तैयार है। नियंत्रण आपके पास है।"', 'तकनीशियन की मंज़ूरी: पार्ट डिस्पैच हुआ।']
      },
      hinglish: {
        tag: 'SCENE 07 · HUMAN SAFETY GATE',
        title: 'Safety Gate Authorization',
        headline: 'AI CAN ACT. HUMANS STAY IN CONTROL.',
        supporting: '$245 part cost ke liye AI bina approval ke aage nahi badhta. Human technician authorizes.',
        narration: 'Jab financial consequence hota hai, VoxLens safety gate par pause karta hai: "Maine action prepare kiya hai, final control aapke paas hai."',
        subtitles: ['Level 2 Financial Gate: $245.00 authorization.', '"I prepared the action. You remain in control."', 'Technician click karta hai: Dispatched.']
      },
      es: {
        tag: 'ESCENA 07 · CONTROL HUMANO',
        title: 'Compuerta de Seguridad',
        headline: 'LA IA ACTÚA. LOS HUMANOS TIENEN EL CONTROL.',
        supporting: 'El compromiso financiero ($245.00) se pausa para la autorización del técnico.',
        narration: 'Cuando hay consecuencias financieras, VoxLens se detiene en la compuerta de seguridad: "Preparé la acción. Usted mantiene el control."',
        subtitles: ['Compuerta Nivel 2: Asignación de $245.00.', '"Preparé la acción. Usted tiene el control."', 'Autorizado y despachado.']
      },
      fr: {
        tag: 'SCÈNE 07 · PORTE DE SÉCURITÉ',
        title: 'Contrôle Humain',
        headline: 'L’IA AGIT. L’HUMAIN GARDE LE CONTRÔLE.',
        supporting: 'L’engagement financier (245,00 $) est suspendu pour validation par le technicien.',
        narration: 'Pour toute action financière, VoxLens s’arrête à la porte de sécurité : "J’ai préparé l’action. Vous gardez le contrôle."',
        subtitles: ['Sécurité Niveau 2 : Allocation de 245,00 $.', '"Action préparée. Vous gardez le contrôle."', 'Technicien valide : Envoyé.']
      },
      de: {
        tag: 'SZENE 07 · SICHERHEITSGATE',
        title: 'Menschliche Kontrolle',
        headline: 'KI HANDELT. DER MENSCH ENTSCHEIDET.',
        supporting: 'Finanzielle Freigaben ($245.00) stoppen am Gate für die Autorisierung des Technikers.',
        narration: 'Bei finanziellen Auswirkungen pausiert VoxLens: "Ich habe die Aktion vorbereitet. Die Entscheidung liegt bei Ihnen."',
        subtitles: ['Level-2-Sicherheitsgate: $245.00 Freigabe.', '"Aktion vorbereitet. Sie behalten die Kontrolle."', 'Vom Techniker autorisiert: Versendet.']
      },
      ja: {
        tag: 'シーン 07 · セーフティゲート',
        title: '人間の最終承認',
        headline: 'AIが準備し、人間が決定する。',
        supporting: '部品発注費用（$245.00）の確定前に、必ず技術者の承認ゲートを通過します。',
        narration: '金銭的影響のある行動の前でVoxLensは一時停止します：「準備は完了しました。最終決定権はあなたにあります」。',
        subtitles: ['レベル2 セーフティゲート：$245.00の部品予算。', '「準備は完了しました。決定はあなたが下します」', '技術者が承認：部品が出荷手配されました。']
      }
    }
  },
  {
    id: 8,
    slug: 'memory',
    durationSeconds: 11,
    translations: {
      en: {
        tag: 'SCENE 08 · SESSION MEMORY',
        title: 'Shift Intelligence Persistence',
        headline: 'NEXT TIME, WE START FROM HERE.',
        supporting: '"What We Already Tried" prevents repeating redundant steps across technician shifts.',
        narration: 'Session memory logs every test, manual citation, and authorized part. Next shift, technicians start with full context.',
        subtitles: ['Session #VX-2048 persisted to shared memory.', '"What We Already Tried" checklist verified.', 'Zero repeated diagnostic work.']
      },
      hi: {
        tag: 'दृश्य ०८ · सेशन मेमोरी',
        title: 'शिफ्ट निरंतरता',
        headline: 'अगली बार, हम यहीं से शुरू करेंगे।',
        supporting: '"पहले क्या कोशिश की गई" सूची यह सुनिश्चित करती है कि कोई भी स्टेप दोबारा न दोहराया जाए।',
        narration: 'सेशन मेमोरी हर टेस्ट और पार्ट को रिकॉर्ड करती है। अगली शिफ्ट का तकनीशियन वहीं से शुरू करता है जहां पिछली शिफ्ट रुकी थी।',
        subtitles: ['सेशन #VX-2048 मेमोरी में सुरक्षित।', '"पहले क्या चेक किया गया" सूची अपडेटेड।', 'शून्य दोहराव। समय की पूरी बचत।']
      },
      hinglish: {
        tag: 'SCENE 08 · SESSION MEMORY',
        title: 'Shift Continuity',
        headline: 'NEXT TIME, WE START FROM HERE.',
        supporting: '"What We Already Tried" checklist ensure karti hai ki agli shift same steps repeat na kare.',
        narration: 'Session memory har diagnostic reading aur part request ko log karta hai. Agli shift full context ke saath start hoti hai.',
        subtitles: ['Session #VX-2048 logged into memory.', '"What We Already Tried" checklist synced.', 'Zero repeated diagnostics across shifts.']
      },
      es: {
        tag: 'ESCENA 08 · MEMORIA DE SESIÓN',
        title: 'Inteligencia de Turno',
        headline: 'LA PRÓXIMA VEZ, EMPEZAMOS DESDE AQUÍ.',
        supporting: '"Lo que ya intentamos" evita repetir pasos redundantes entre turnos.',
        narration: 'La memoria de sesión registra cada prueba y pieza aprobada. En el siguiente turno, se comienza con el contexto completo.',
        subtitles: ['Sesión #VX-2048 guardada en memoria.', 'Lista de "Lo que ya probamos" verificada.', 'Cero diagnósticos duplicados.']
      },
      fr: {
        tag: 'SCÈNE 08 · MÉMOIRE DE SESSION',
        title: 'Continuité des Équipes',
        headline: 'LA PROCHAINE FOIS, ON REPART D’ICI.',
        supporting: '"Ce que nous avons déjà essayé" évite les vérifications en double.',
        narration: 'La mémoire de session enregistre chaque test et pièce validée pour que l’équipe suivante reprenne sans repartir de zéro.',
        subtitles: ['Session #VX-2048 enregistrée en mémoire.', 'Liste "Ce qui a déjà été testé" validée.', 'Aucune tâche répétée inutilement.']
      },
      de: {
        tag: 'SZENE 08 · SITZUNGS-SPEICHER',
        title: 'Schichtübergreifendes Wissen',
        headline: 'BEIM NÄCHSTEN MAL STARTEN WIR HIER.',
        supporting: '"Was bereits versucht wurde" verhindert doppelte Diagnoseschritte bei Schichtwechsel.',
        narration: 'Der Sitzungsspeicher protokolliert jeden Test und jedes Ersatzteil. Die nächste Schicht startet mit vollem Kontext.',
        subtitles: ['Sitzung #VX-2048 im Speicher gesichert.', 'Checkliste "Bereits geprüfte Schritte" aktuell.', 'Keine doppelten Diagnoseabläufe.']
      },
      ja: {
        tag: 'シーン 08 · セッション記憶',
        title: 'シフト間の知識継承',
        headline: '次回は、ここから始められます。',
        supporting: '「既に試した処置」の記録により、シフト交代時の重複作業を完全に防止します。',
        narration: 'セッション記憶が全ての検査と発注履歴を保持。次のシフトの技術者はゼロからやり直す必要がありません。',
        subtitles: ['セッション#VX-2048を共有メモリに保存。', '「既に試行した処置」チェックリストを同期。', 'シフト間の重複点検ゼロを実現。']
      }
    }
  },
  {
    id: 9,
    slug: 'finale',
    durationSeconds: 12,
    translations: {
      en: {
        tag: 'SCENE 09 · VOXLENS FINALE',
        title: 'The Future of Field Service',
        headline: 'SEE THE FAULT. HEAR THE FIX. LET THE AGENT ACT.',
        supporting: 'VOXLENS · Real-Time Multimodal AI Copilot · Team VoxNova (PS-05).',
        narration: 'See the fault. Hear the fix. Let the agent handle the next step. Welcome to VoxLens, the real-time multimodal AI field copilot.',
        subtitles: ['See the fault. Hear the fix.', 'Let the agent handle the next step.', 'VOXLENS · Team VoxNova · PS-05.']
      },
      hi: {
        tag: 'दृश्य ०९ · वॉक्सलेंस समापन',
        title: 'फ़ील्ड सर्विस का भविष्य',
        headline: 'दोष देखें। समाधान सुनें। एजेंट को काम करने दें।',
        supporting: 'वॉक्सलेंस · रीयल-टाइम मल्टीमॉडल एआई कोपायलट · टीम वॉक्सनोवा (PS-05)।',
        narration: 'दोष देखें। समाधान सुनें। एजेंट को अगला कदम उठाने दें। वॉक्सलेंस में आपका स्वागत है।',
        subtitles: ['दोष देखें। समाधान सुनें।', 'एजेंट को अगला कदम संभालने दें।', 'VOXLENS · टीम वॉक्सनोवा · PS-05.']
      },
      hinglish: {
        tag: 'SCENE 09 · VOXLENS FINALE',
        title: 'The Future of Field Service',
        headline: 'SEE THE FAULT. HEAR THE FIX. LET THE AGENT ACT.',
        supporting: 'VOXLENS — Real-Time Multimodal AI Copilot · Team VoxNova (PS-05).',
        narration: 'See the fault. Hear the fix. Let the agent handle the next step. Welcome to VoxLens, your AI field copilot.',
        subtitles: ['See the fault. Hear the fix.', 'Let the agent handle the next step.', 'VOXLENS · Team VoxNova · PS-05.']
      },
      es: {
        tag: 'ESCENA 09 · FINAL VOXLENS',
        title: 'El Futuro del Servicio de Campo',
        headline: 'VEA LA AVERÍA. ESCUCHE LA SOLUCIÓN. DEJE ACTUAR AL AGENTE.',
        supporting: 'VOXLENS · Copiloto Multimodal de IA en Tiempo Real · Equipo VoxNova (PS-05).',
        narration: 'Vea la avería. Escuche la solución. Deje que el agente dé el siguiente paso. Bienvenido a VoxLens.',
        subtitles: ['Vea la avería. Escuche la solución.', 'Deje que el agente dé el siguiente paso.', 'VOXLENS · Equipo VoxNova · PS-05.']
      },
      fr: {
        tag: 'SCÈNE 09 · FINALE VOXLENS',
        title: 'L’Avenir du Service Terrain',
        headline: 'VOYEZ LA PANNE. ÉCOUTEZ LA SOLUTION. LAISSEZ L’AGENT AGIR.',
        supporting: 'VOXLENS · Copilote IA Multimodal en Temps Réel · Équipe VoxNova (PS-05).',
        narration: 'Voyez la panne. Écoutez la solution. Laissez l’agent gérer l’étape suivante. Bienvenue sur VoxLens.',
        subtitles: ['Voyez la panne. Écoutez la solution.', 'Laissez l’agent gérer l’étape suivante.', 'VOXLENS · Équipe VoxNova · PS-05.']
      },
      de: {
        tag: 'SZENE 09 · VOXLENS FINALE',
        title: 'Die Zukunft des Kundendienstes',
        headline: 'FEHLER SEHEN. LÖSUNG HÖREN. AGENTEN HANDELN LASSEN.',
        supporting: 'VOXLENS · Multimodaler Echtzeit-KI-Copilot · Team VoxNova (PS-05).',
        narration: 'Fehler sehen. Lösung hören. Den Agenten handeln lassen. Willkommen bei VoxLens.',
        subtitles: ['Fehler sehen. Lösung hören.', 'Den Agenten handeln lassen.', 'VOXLENS · Team VoxNova · PS-05.']
      },
      ja: {
        tag: 'シーン 09 · フィナーレ',
        title: 'フィールドサービスの未来',
        headline: '故障を見て、解決策を聞き、エージェントに行動を委ねる。',
        supporting: 'VOXLENS · リアルタイム・マルチモーダルAIコパイロット · チーム VoxNova (PS-05)。',
        narration: '故障を見て、解決策を聞き、エージェントに行動を委ねる。次世代AIフィールドコパイロット、VoxLensへようこそ。',
        subtitles: ['故障を見て、解決策を聞き。', 'エージェントに次の行動を委ねる。', 'VOXLENS · Team VoxNova · PS-05。']
      }
    }
  }
];
