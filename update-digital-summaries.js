const fs = require('fs');
const path = require('path');

const newSummaries = {
    th: {
        "website-build": "บริการออกแบบและพัฒนาเว็บไซต์องค์กรแบบครบวงจร สร้างภาพลักษณ์ที่น่าเชื่อถือ รองรับทุกอุปกรณ์ เพื่อเป็นรากฐานที่แข็งแกร่งบนโลกดิจิทัล",
        "facebook-page": "บริการบริหารจัดการ Facebook Page พร้อมวางกลยุทธ์คอนเทนต์ สร้างปฏิสัมพันธ์ที่ดี และดึงดูดกลุ่มลูกค้าเป้าหมายอย่างตรงจุด",
        "line-oa": "บริการวางระบบและบริหาร LINE Official Account เครื่องมือสำคัญในการรักษาความสัมพันธ์ลูกค้า (CRM) และกระตุ้นยอดขายอย่างมีประสิทธิภาพ",
        "tiktok": "บริการทำการตลาดบน TikTok ผ่านการสร้างสรรค์วิดีโอสั้นที่ทันกระแส เพื่อขยายฐานลูกค้าและเพิ่มการรับรู้แบรนด์อย่างรวดเร็ว",
        "youtube": "บริการบริหารช่องและทำการตลาดบน YouTube นำเสนอวิดีโอคอนเทนต์คุณภาพเพื่อสร้างความน่าเชื่อถือ และเข้าถึงผู้ชมในระยะยาว",
        "video-production": "บริการผลิตสื่อวิดีโอคุณภาพสูง ตั้งแต่การวางโครงเรื่อง ถ่ายทำ ไปจนถึงกระบวนการตัดต่อ เพื่อใช้สื่อสารและยกระดับภาพลักษณ์แบรนด์",
        "paid-ads": "บริการวางแผนและบริหารจัดการโฆษณาออนไลน์ วิเคราะห์ข้อมูลและเจาะกลุ่มเป้าหมายอย่างแม่นยำ เพื่อความคุ้มค่าสูงสุดในการลงทุน (ROI)",
        "ai-solutions": "บริการให้คำปรึกษาและประยุกต์ใช้เทคโนโลยี AI เพื่อปรับปรุงกระบวนการทำงาน ลดต้นทุน และเพิ่มขีดความสามารถทางการแข่งขันให้ธุรกิจ",
        "odoo-erp": "บริการวางระบบบริหารจัดการทรัพยากรองค์กร (Odoo ERP) เชื่อมโยงข้อมูลและกระบวนการทำงานทุกแผนกเข้าด้วยกัน เพื่อการบริหารที่ราบรื่นและแม่นยำ",
        "custom-software": "บริการออกแบบและพัฒนาซอฟต์แวร์ตามความต้องการของธุรกิจ สร้างระบบที่ตอบโจทย์การทำงานเฉพาะด้าน เพื่อแก้ปัญหาและเพิ่มประสิทธิภาพองค์กร"
    },
    en: {
        "website-build": "Comprehensive corporate website design and development services. We build a credible image, fully responsive on all devices, as a strong digital foundation.",
        "facebook-page": "Facebook Page management services with content strategies to build positive engagement and precisely attract your target audience.",
        "line-oa": "Setup and management services for LINE Official Account, a vital Customer Relationship Management (CRM) tool to effectively boost sales.",
        "tiktok": "TikTok marketing services through the creation of trendy short videos to rapidly expand your customer base and enhance brand awareness.",
        "youtube": "Channel management and marketing services on YouTube, presenting high-quality video content to build credibility and reach a long-term audience.",
        "video-production": "High-quality video production services, from storyboarding and filming to the editing process, to effectively communicate and elevate your brand image.",
        "paid-ads": "Online advertising planning and management services. We analyze data and precisely target audiences for maximum Return on Investment (ROI).",
        "ai-solutions": "Consulting and application services for AI technology to streamline workflows, reduce costs, and increase your business's competitive edge.",
        "odoo-erp": "Enterprise Resource Planning (Odoo ERP) implementation services, connecting data and workflows across all departments for smooth and accurate management.",
        "custom-software": "Custom software design and development services tailored to your business needs, creating specific solutions to solve problems and increase organizational efficiency."
    },
    "zh-Hans": {
        "website-build": "全面的企业网站设计与开发服务。打造值得信赖的形象，支持所有设备，为您在数字世界奠定坚实基础。",
        "facebook-page": "Facebook 主页管理及内容策略服务。建立良好的互动，并精准吸引目标客户群体。",
        "line-oa": "LINE 官方帐号系统的搭建与管理服务，这是维护客户关系 (CRM) 和有效促进销售的重要工具。",
        "tiktok": "通过创作紧跟潮流的短视频进行 TikTok 营销，快速扩大客户群并提升品牌知名度。",
        "youtube": "YouTube 频道管理和营销服务。展示高质量的视频内容，以建立信誉并长期触达受众。",
        "video-production": "提供从构思、拍摄到后期剪辑的高质量视频制作服务，用于有效沟通并提升品牌形象。",
        "paid-ads": "在线广告规划与管理服务。深入分析数据并精准定位目标受众，以实现最大的投资回报率 (ROI)。",
        "ai-solutions": "人工智能技术的咨询与应用服务，旨在优化工作流程、降低成本并提升企业的核心竞争力。",
        "odoo-erp": "Odoo 企业资源规划 (ERP) 系统实施服务，将各部门的数据和工作流程无缝连接，实现顺畅精确的管理。",
        "custom-software": "根据企业需求量身定制的软件设计与开发服务。打造满足特定业务需求的系统，以解决问题并提高组织效率。"
    },
    "zh-Hant": {
        "website-build": "全面的企業網站設計與開發服務。打造值得信賴的形象，支援所有設備，為您在數位世界奠定堅實基礎。",
        "facebook-page": "Facebook 粉絲專頁管理及內容策略服務。建立良好的互動，並精準吸引目標客戶群體。",
        "line-oa": "LINE 官方帳號系統的搭建與管理服務，這是維護客戶關係 (CRM) 和有效促進銷售的重要工具。",
        "tiktok": "透過創作緊跟潮流的短影音進行 TikTok 行銷，快速擴大客戶群並提升品牌知名度。",
        "youtube": "YouTube 頻道管理和行銷服務。展示高品質的影音內容，以建立信譽並長期觸及受眾。",
        "video-production": "提供從構思、拍攝到後期剪輯的高品質影片製作服務，用於有效溝通並提升品牌形象。",
        "paid-ads": "線上廣告規劃與管理服務。深入分析數據並精準定位目標受眾，以實現最大的投資回報率 (ROI)。",
        "ai-solutions": "人工智慧技術的諮詢與應用服務，旨在優化工作流程、降低成本並提升企業的核心競爭力。",
        "odoo-erp": "Odoo 企業資源規劃 (ERP) 系統導入服務，將各部門的數據和工作流程無縫連接，實現順暢精確的管理。",
        "custom-software": "根據企業需求量身定制的軟體設計與開發服務。打造滿足特定業務需求的系統，以解決問題並提高組織效率。"
    },
    ja: {
        "website-build": "総合的な企業ウェブサイトのデザインおよび開発サービス。すべてのデバイスに対応し、デジタル世界での強固な基盤となる信頼できるイメージを構築します。",
        "facebook-page": "Facebookページの管理およびコンテンツ戦略サービス。良好なエンゲージメントを生み出し、ターゲット顧客を的確に惹きつけます。",
        "line-oa": "顧客関係管理（CRM）および効果的な販売促進の重要なツールであるLINE公式アカウントのシステム構築・管理サービス。",
        "tiktok": "トレンドを取り入れたショート動画の制作を通じたTikTokマーケティングサービス。顧客基盤を拡大し、ブランド認知度を急速に高めます。",
        "youtube": "YouTubeチャンネルの管理およびマーケティングサービス。信頼を築き、長期的に視聴者にリーチするための高品質な動画コンテンツを提供します。",
        "video-production": "企画構成から撮影、編集プロセスに至るまで、コミュニケーションを深めブランドイメージを向上させる高品質な動画制作サービス。",
        "paid-ads": "オンライン広告の企画・管理サービス。データを分析し、ターゲット層に正確にアプローチすることで、投資対効果（ROI）を最大化します。",
        "ai-solutions": "業務プロセスの改善、コスト削減、企業の競争力向上を目的としたAIテクノロジーのコンサルティングおよび導入サービス。",
        "odoo-erp": "組織の資源管理システム（Odoo ERP）の導入サービス。全社部門のデータと業務プロセスを連携させ、スムーズで正確な管理を実現します。",
        "custom-software": "ビジネスのニーズに合わせたカスタムソフトウェアの設計・開発サービス。課題を解決し、組織の効率を高める専門的なシステムを構築します。"
    },
    ko: {
        "website-build": "종합적인 기업 웹사이트 디자인 및 개발 서비스. 모든 기기를 지원하며 디지털 세계에서 탄탄한 기반이 될 신뢰할 수 있는 이미지를 구축합니다.",
        "facebook-page": "Facebook 페이지 관리 및 콘텐츠 전략 서비스. 긍정적인 상호 작용을 만들고 타겟 고객을 정확하게 유치합니다.",
        "line-oa": "고객 관계 관리(CRM) 및 효과적인 판매 촉진을 위한 필수 도구인 LINE 공식 계정 시스템 구축 및 관리 서비스.",
        "tiktok": "트렌디한 숏폼 비디오 제작을 통한 TikTok 마케팅 서비스. 고객 기반을 빠르게 확장하고 브랜드 인지도를 높입니다.",
        "youtube": "YouTube 채널 관리 및 마케팅 서비스. 고품질 비디오 콘텐츠를 제공하여 신뢰성을 구축하고 장기적인 시청자에게 도달합니다.",
        "video-production": "스토리보드 작성, 촬영부터 편집 과정까지, 브랜드 이미지를 소통하고 향상시키기 위한 고품질 비디오 제작 서비스.",
        "paid-ads": "온라인 광고 기획 및 관리 서비스. 데이터를 분석하고 타겟 고객을 정확하게 공략하여 투자 수익률(ROI)을 극대화합니다.",
        "ai-solutions": "업무 프로세스 개선, 비용 절감 및 기업의 경쟁력 향상을 위한 AI 기술 컨설팅 및 적용 서비스.",
        "odoo-erp": "전사적 자원 관리(Odoo ERP) 시스템 구축 서비스. 모든 부서의 데이터와 업무 프로세스를 연결하여 원활하고 정확한 관리를 실현합니다.",
        "custom-software": "비즈니스 요구에 맞춘 맞춤형 소프트웨어 디자인 및 개발 서비스. 문제를 해결하고 조직의 효율성을 높이는 특정 업무용 시스템을 구축합니다."
    },
    de: {
        "website-build": "Umfassende Dienstleistungen für Design und Entwicklung von Unternehmenswebsites. Wir schaffen ein glaubwürdiges, geräteübergreifendes Image als starkes digitales Fundament.",
        "facebook-page": "Verwaltung von Facebook-Seiten und Content-Strategie. Wir fördern positive Interaktionen und ziehen Ihre Zielgruppe präzise an.",
        "line-oa": "Systemeinrichtung und Verwaltung des LINE Official Accounts, einem wichtigen CRM-Tool zur effektiven Verkaufsförderung.",
        "tiktok": "TikTok-Marketing durch die Erstellung trendiger Kurzvideos, um Ihren Kundenstamm schnell zu erweitern und die Markenbekanntheit zu steigern.",
        "youtube": "Kanalmanagement und Marketing auf YouTube. Wir präsentieren hochwertige Videoinhalte, um Glaubwürdigkeit aufzubauen und langfristig Zuschauer zu erreichen.",
        "video-production": "Hochwertige Videoproduktion vom Storyboard über den Dreh bis zum Schnitt, um Ihr Markenimage effektiv zu kommunizieren und zu verbessern.",
        "paid-ads": "Planung und Verwaltung von Online-Werbung. Wir analysieren Daten und sprechen Zielgruppen präzise an, um den maximalen Return on Investment (ROI) zu erzielen.",
        "ai-solutions": "Beratung und Anwendung von KI-Technologien zur Optimierung von Arbeitsabläufen, Kostensenkung und Steigerung der Wettbewerbsfähigkeit Ihres Unternehmens.",
        "odoo-erp": "Implementierung von Enterprise Resource Planning (Odoo ERP). Wir vernetzen Daten und Arbeitsabläufe aller Abteilungen für ein reibungsloses und präzises Management.",
        "custom-software": "Kundenspezifisches Software-Design und -Entwicklung, zugeschnitten auf Ihre geschäftlichen Anforderungen, um Probleme zu lösen und die Unternehmenseffizienz zu steigern."
    },
    fr: {
        "website-build": "Services complets de conception et de développement de sites web d'entreprise. Nous construisons une image crédible, adaptée à tous les appareils, comme base numérique solide.",
        "facebook-page": "Gestion de page Facebook et stratégie de contenu pour générer un engagement positif et attirer précisément votre public cible.",
        "line-oa": "Configuration et gestion de comptes LINE Official, un outil CRM essentiel pour maintenir les relations clients et stimuler efficacement les ventes.",
        "tiktok": "Marketing sur TikTok via la création de vidéos courtes et tendance, permettant d'élargir rapidement votre clientèle et d'accroître la notoriété de la marque.",
        "youtube": "Gestion de chaîne et marketing sur YouTube, présentant un contenu vidéo de haute qualité pour renforcer la crédibilité et atteindre le public à long terme.",
        "video-production": "Production de vidéos de haute qualité, de la scénarisation au tournage et au montage, pour communiquer et valoriser l'image de votre marque.",
        "paid-ads": "Planification et gestion de campagnes publicitaires en ligne. Nous analysons les données et ciblons avec précision pour un retour sur investissement (ROI) maximal.",
        "ai-solutions": "Conseil et intégration de la technologie IA pour optimiser les processus de travail, réduire les coûts et accroître la compétitivité de votre entreprise.",
        "odoo-erp": "Implémentation du système de planification des ressources de l'entreprise (Odoo ERP), reliant les données et les flux de travail de tous les départements pour une gestion fluide et précise.",
        "custom-software": "Conception et développement de logiciels sur mesure pour répondre aux besoins spécifiques de votre entreprise, résoudre des problèmes et améliorer l'efficacité organisationnelle."
    },
    it: {
        "website-build": "Servizi completi di progettazione e sviluppo di siti web aziendali. Costruiamo un'immagine credibile, reattiva su tutti i dispositivi, come solida base digitale.",
        "facebook-page": "Gestione della Pagina Facebook e strategia di contenuti. Creiamo interazioni positive e attiriamo con precisione il tuo pubblico target.",
        "line-oa": "Configurazione e gestione di account LINE Official, uno strumento CRM vitale per mantenere le relazioni con i clienti e incrementare efficacemente le vendite.",
        "tiktok": "Marketing su TikTok attraverso la creazione di brevi video di tendenza, per espandere rapidamente la base clienti e aumentare la consapevolezza del brand.",
        "youtube": "Gestione del canale e marketing su YouTube, offrendo contenuti video di alta qualità per costruire credibilità e raggiungere il pubblico a lungo termine.",
        "video-production": "Servizi di produzione video di alta qualità, dallo storyboard alle riprese fino al montaggio, per comunicare ed elevare l'immagine del brand.",
        "paid-ads": "Pianificazione e gestione della pubblicità online. Analizziamo i dati e miriamo con precisione al pubblico target per ottenere il massimo ritorno sull'investimento (ROI).",
        "ai-solutions": "Consulenza e applicazione della tecnologia IA per migliorare i flussi di lavoro, ridurre i costi e aumentare il vantaggio competitivo della tua azienda.",
        "odoo-erp": "Implementazione del sistema di pianificazione delle risorse aziendali (Odoo ERP), collegando dati e flussi di lavoro di tutti i dipartimenti per una gestione fluida e accurata.",
        "custom-software": "Progettazione e sviluppo di software su misura in base alle esigenze aziendali, creando sistemi specifici per risolvere problemi e aumentare l'efficienza organizzativa."
    },
    nl: {
        "website-build": "Uitgebreide diensten voor het ontwerpen en ontwikkelen van bedrijfswebsites. Wij bouwen een geloofwaardig imago op, responsief op alle apparaten, als een sterke digitale basis.",
        "facebook-page": "Beheer van Facebook-pagina's en contentstrategieën om positieve betrokkenheid op te bouwen en uw doelgroep nauwkeurig aan te trekken.",
        "line-oa": "Systeemconfiguratie en beheer voor LINE Official Accounts, een essentieel CRM-tool voor het onderhouden van klantrelaties en het effectief stimuleren van verkopen.",
        "tiktok": "TikTok-marketing door het creëren van trendy korte video's om uw klantenbestand snel uit te breiden en de merkbekendheid te vergroten.",
        "youtube": "Kanaalbeheer en marketing op YouTube, waarbij videocontent van hoge kwaliteit wordt gepresenteerd om geloofwaardigheid op te bouwen en een langdurig publiek te bereiken.",
        "video-production": "Hoogwaardige videoproductiediensten, van storyboarding en filmen tot het montageproces, om uw merkimago effectief te communiceren en te verbeteren.",
        "paid-ads": "Planning en beheer van online advertenties. Wij analyseren gegevens en richten ons nauwkeurig op de doelgroep voor een maximale Return on Investment (ROI).",
        "ai-solutions": "Advies en toepassing van AI-technologie om workflows te stroomlijnen, kosten te verlagen en het concurrentievermogen van uw bedrijf te vergroten.",
        "odoo-erp": "Implementatie van Enterprise Resource Planning (Odoo ERP) om gegevens en workflows van alle afdelingen met elkaar te verbinden voor soepel en nauwkeurig beheer.",
        "custom-software": "Ontwerp en ontwikkeling van software op maat, afgestemd op uw zakelijke behoeften, waarbij specifieke oplossingen worden gecreëerd om problemen op te lossen en de efficiëntie te verhogen."
    },
    ms: {
        "website-build": "Perkhidmatan reka bentuk dan pembangunan laman web korporat yang komprehensif. Kami membina imej yang boleh dipercayai, responsif pada semua peranti, sebagai asas digital yang kukuh.",
        "facebook-page": "Perkhidmatan pengurusan Halaman Facebook berserta strategi kandungan untuk membina interaksi positif dan menarik khalayak sasaran anda dengan tepat.",
        "line-oa": "Persediaan sistem dan pengurusan untuk Akaun Rasmi LINE, alat CRM penting untuk mengekalkan hubungan pelanggan dan memacu jualan dengan berkesan.",
        "tiktok": "Pemasaran TikTok melalui penciptaan video pendek yang mengikut trend untuk mengembangkan pangkalan pelanggan anda dengan cepat dan meningkatkan kesedaran jenama.",
        "youtube": "Pengurusan saluran dan pemasaran di YouTube, mempamerkan kandungan video berkualiti tinggi untuk membina kredibiliti dan menjangkau penonton jangka panjang.",
        "video-production": "Perkhidmatan pengeluaran media video berkualiti tinggi, dari papan cerita, penggambaran hingga proses penyuntingan, untuk menyampaikan dan meningkatkan imej jenama.",
        "paid-ads": "Perkhidmatan perancangan dan pengurusan pengiklanan dalam talian. Kami menganalisis data dan menyasarkan audiens dengan tepat untuk Pulangan Pelaburan (ROI) yang maksimum.",
        "ai-solutions": "Perundingan dan aplikasi teknologi AI untuk memperkemas aliran kerja, mengurangkan kos, dan meningkatkan kelebihan daya saing perniagaan anda.",
        "odoo-erp": "Pelaksanaan Perancangan Sumber Perusahaan (Odoo ERP), menghubungkan data dan aliran kerja merentas semua jabatan untuk pengurusan yang lancar dan tepat.",
        "custom-software": "Reka bentuk dan pembangunan perisian tersuai mengikut keperluan perniagaan anda, mewujudkan sistem khusus untuk menyelesaikan masalah dan meningkatkan kecekapan organisasi."
    },
    hi: {
        "website-build": "व्यापक कॉर्पोरेट वेबसाइट डिज़ाइन और विकास सेवाएं। हम एक विश्वसनीय छवि बनाते हैं, जो सभी उपकरणों पर सुलभ है, और एक मजबूत डिजिटल आधार के रूप में कार्य करती है।",
        "facebook-page": "फेसबुक पेज प्रबंधन और सामग्री रणनीति। सकारात्मक जुड़ाव बनाने और अपने लक्षित दर्शकों को सटीक रूप से आकर्षित करने के लिए।",
        "line-oa": "LINE आधिकारिक खाते के लिए सिस्टम सेटअप और प्रबंधन सेवाएं, जो ग्राहक संबंध (CRM) बनाए रखने और प्रभावी रूप से बिक्री बढ़ाने के लिए एक महत्वपूर्ण उपकरण है।",
        "tiktok": "ट्रेंडिंग लघु वीडियो के निर्माण के माध्यम से टिकटॉक मार्केटिंग, ताकि आपके ग्राहक आधार का तेजी से विस्तार हो और ब्रांड जागरूकता बढ़े।",
        "youtube": "यूट्यूब पर चैनल प्रबंधन और मार्केटिंग। विश्वसनीयता बनाने और लंबी अवधि के दर्शकों तक पहुंचने के लिए उच्च गुणवत्ता वाले वीडियो सामग्री प्रस्तुत करना।",
        "video-production": "कहानी लेखन (स्टोरीबोर्डिंग) और फिल्मांकन से लेकर संपादन प्रक्रिया तक उच्च गुणवत्ता वाली वीडियो उत्पादन सेवाएं, जो आपकी ब्रांड छवि को संप्रेषित करने और बढ़ाने में मदद करती हैं।",
        "paid-ads": "ऑनलाइन विज्ञापन योजना और प्रबंधन। हम डेटा का विश्लेषण करते हैं और निवेश पर अधिकतम रिटर्न (ROI) के लिए दर्शकों को सटीक रूप से लक्षित करते हैं।",
        "ai-solutions": "वर्कफ़्लो को सुव्यवस्थित करने, लागत को कम करने और आपके व्यवसाय की प्रतिस्पर्धात्मकता को बढ़ाने के लिए कृत्रिम बुद्धिमत्ता (AI) तकनीक का परामर्श और अनुप्रयोग।",
        "odoo-erp": "ओडू (Odoo) उद्यम संसाधन योजना (ERP) प्रणाली का कार्यान्वयन, जो सुचारू और सटीक प्रबंधन के लिए सभी विभागों में डेटा और वर्कफ़्लो को जोड़ता है।",
        "custom-software": "व्यावसायिक आवश्यकताओं के अनुरूप सॉफ़्टवेयर डिज़ाइन और विकास सेवाएं। समस्याओं को हल करने और संगठनात्मक दक्षता बढ़ाने के लिए विशिष्ट प्रणालियों का निर्माण।"
    },
    ta: {
        "website-build": "விரிவான கார்ப்பரேட் இணையதள வடிவமைப்பு மற்றும் மேம்பாட்டு சேவைகள். அனைத்து சாதனங்களுக்கும் ஏற்றவாறு, வலுவான டிஜிட்டல் அடித்தளமாக நம்பகமான பிம்பத்தை உருவாக்குகிறோம்.",
        "facebook-page": "நேர்மறையான ஈடுபாட்டை உருவாக்கவும், உங்கள் இலக்கு வாடிக்கையாளர்களை துல்லியமாக ஈர்க்கவும் ஃபேஸ்புக் பக்க மேலாண்மை மற்றும் உள்ளடக்க உத்தி சேவைகள்.",
        "line-oa": "வாடிக்கையாளர் உறவுகளை (CRM) பராமரிக்கவும், விற்பனையை திறம்பட அதிகரிக்கவும் ஒரு முக்கிய கருவியான LINE அதிகாரப்பூர்வ கணக்கிற்கான கணினி அமைவு மற்றும் மேலாண்மை சேவைகள்.",
        "tiktok": "உங்கள் வாடிக்கையாளர் தளத்தை விரைவாக விரிவுபடுத்தவும் பிராண்ட் விழிப்புணர்வை மேம்படுத்தவும் பிரபலமான சிறு வீடியோக்களை உருவாக்குவதன் மூலம் டிக்டாக் சந்தைப்படுத்தல்.",
        "youtube": "நம்பகத்தன்மையை உருவாக்கவும் நீண்ட கால பார்வையாளர்களைச் சென்றடையவும் உயர்தர வீடியோ உள்ளடக்கத்தை வழங்கும் யூடியூப் சேனல் மேலாண்மை மற்றும் சந்தைப்படுத்தல் சேவைகள்.",
        "video-production": "பிராண்ட் பிம்பத்தை தொடர்புகொள்ளவும் உயர்த்தவும், கதைக்கள அமைப்பு மற்றும் படப்பிடிப்பு முதல் எடிட்டிங் வரை உயர்தர வீடியோ தயாரிப்பு சேவைகள்.",
        "paid-ads": "ஆன்லைன் விளம்பர திட்டமிடல் மற்றும் மேலாண்மை சேவைகள். அதிகபட்ச முதலீட்டு வருவாய்க்கு (ROI) தரவை பகுப்பாய்வு செய்து வாடிக்கையாளர்களை துல்லியமாக குறிவைக்கிறோம்.",
        "ai-solutions": "பணிப்பாய்வுகளை சீரமைக்கவும், செலவுகளைக் குறைக்கவும், உங்கள் வணிகத்தின் போட்டித்தன்மையை அதிகரிக்கவும் AI தொழில்நுட்பத்திற்கான ஆலோசனை மற்றும் பயன்பாட்டு சேவைகள்.",
        "odoo-erp": "சீரான மற்றும் துல்லியமான நிர்வாகத்திற்காக அனைத்து துறைகளிலும் உள்ள தரவு மற்றும் பணிப்பாய்வுகளை இணைக்கும் Odoo ERP அமைப்பை செயல்படுத்துதல்.",
        "custom-software": "வணிகத் தேவைகளுக்கு ஏற்ப மென்பொருள் வடிவமைப்பு மற்றும் மேம்பாட்டு சேவைகள். சிக்கல்களைத் தீர்க்கவும் நிறுவன திறனை அதிகரிக்கவும் குறிப்பிட்ட அமைப்புகளை உருவாக்குதல்."
    }
};

const messagesDir = path.join(__dirname, 'src', 'messages');
const files = fs.readdirSync(messagesDir).filter(f => f.endsWith('.json'));

const keysToUpdate = [
    'website-build', 'facebook-page', 'line-oa', 'tiktok', 'youtube',
    'video-production', 'paid-ads', 'ai-solutions', 'odoo-erp', 'custom-software'
];

files.forEach(file => {
    const lang = file.replace('.json', '');
    if (!newSummaries[lang]) return;

    const filePath = path.join(messagesDir, file);
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    const translations = newSummaries[lang];

    if (data?.services?.items) {
        let updated = false;
        const items = data.services.items;

        keysToUpdate.forEach(key => {
            if (items[key] && translations[key]) {
                items[key].summary = translations[key];
                updated = true;
            }
        });

        if (updated) {
            fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n', 'utf8');
            console.log(`✅ Updated digital marketing summaries for: ${file}`);
        }
    }
});
