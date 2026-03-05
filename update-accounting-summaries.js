const fs = require('fs');
const path = require('path');

const newSummaries = {
    th: {
        "monthly-bookkeeping": "บริการรับทำบัญชีนิติบุคคลแบบครบวงจร บันทึกรายการบัญชีอย่างเป็นระบบ พร้อมดูแลการยื่นแบบและนำส่งรายงานต่อหน่วยงานราชการที่เกี่ยวข้องอย่างถูกต้องและตรงเวลา",
        "monthly-tax": "บริการจัดการภาษีและประกันสังคมรายเดือน ดูแลการจัดทำและนำส่งแบบแสดงรายการภาษีทุกประเภท เพื่อลดภาระงานเอกสารรายเดือนและป้องกันความเสี่ยงจากค่าปรับย้อนหลัง",
        "close-financial": "บริการปิดงบและจัดทำงบการเงินประจำปี ครอบคลุมทั้งรอบบัญชีปกติ รอบบัญชีไม่ปกติ และงบชำระบัญชี เพื่อนำส่งข้อมูลทางการเงินที่ได้มาตรฐานตามที่กฎหมายกำหนด",
        "personal-accounts": "บริการจัดการบัญชีและภาษีบุคคลธรรมดา ครอบคลุมพนักงานประจำ อาชีพอิสระ และร้านค้าบุคคล เพื่อคำนวณ ยื่นแบบเสียภาษี และใช้สิทธิลดหย่อนอย่างรัดกุมและคุ้มค่าที่สุด",
        "audit": "บริการตรวจสอบบัญชีโดยผู้สอบบัญชีรับอนุญาต (CPA) ปฏิบัติงานตามมาตรฐานวิชาชีพ เพื่อสร้างความโปร่งใส น่าเชื่อถือ และรับรองความถูกต้องให้กับงบการเงินของธุรกิจคุณ",
        "tax-planning": "บริการให้คำปรึกษาและวางแผนภาษีเชิงกลยุทธ์ วิเคราะห์โครงสร้างรายได้เพื่อบริหารจัดการภาษีอย่างมีประสิทธิภาพ ใช้สิทธิประโยชน์สูงสุดอย่างถูกต้อง และลดความเสี่ยงทางกฎหมาย",
        "foreign-tax-id": "บริการขอเลขประจำตัวผู้เสียภาษีอากร (TIN) สำหรับชาวต่างชาติ ดำเนินการจัดเตรียมเอกสารติดต่อกับกรมสรรพากรอย่างรวดเร็ว เพื่อรองรับการทำงานและทำธุรกรรมในประเทศไทย"
    },
    en: {
        "monthly-bookkeeping": "Comprehensive corporate accounting services. We systematically record accounting entries and ensure accurate and timely filing of reports to relevant government agencies.",
        "monthly-tax": "Monthly tax and social security management. We handle the preparation and filing of all tax returns to reduce your monthly paperwork and prevent risks of retroactive fines.",
        "close-financial": "Annual account closing and financial statement preparation. Covering standard and non-standard accounting periods, as well as liquidation statements, ensuring financial data submissions meet legal standards.",
        "personal-accounts": "Personal accounting and tax management. Covering full-time employees, freelancers, and sole proprietors, we precisely calculate, file tax returns, and maximize your deductible benefits.",
        "audit": "Auditing services by Certified Public Accountants (CPA). Conducted in accordance with professional standards to build transparency, credibility, and certify the accuracy of your financial statements.",
        "tax-planning": "Strategic tax planning and consulting. We analyze your income structure to manage taxes efficiently, maximize benefits legally, and mitigate legal risks.",
        "foreign-tax-id": "Tax Identification Number (TIN) application for foreigners. We expedite document preparation and coordination with the Revenue Department to facilitate your work and transactions in Thailand."
    },
    "zh-Hans": {
        "monthly-bookkeeping": "全面的企业会计服务。我们系统地记录会计账目，并确保向相关政府机构准确、按时地提交报告。",
        "monthly-tax": "月度税务和社会保障管理服务。我们负责准备和提交所有类型的税务申报表，以减少每月的文书工作量并防止产生滞纳金的风险。",
        "close-financial": "年度关账及财务报表编制服务。涵盖正常和非正常会计期间以及清算报表，确保提交的财务数据符合法律标准。",
        "personal-accounts": "个人会计与税务管理服务。涵盖全职员工、自由职业者和个体商户，为您精确计算、报税并最大化利用可扣除福利。",
        "audit": "由注册会计师（CPA）提供的审计服务。按照专业标准进行，旨在建立透明度、信誉并证明您财务报表的准确性。",
        "tax-planning": "战略性税务规划与咨询服务。我们分析您的收入结构，以高效管理税务、合法地实现利益最大化，并降低法律风险。",
        "foreign-tax-id": "外籍人士纳税人识别号（TIN）申请服务。我们加快文件准备以及与税务局的对接工作，以便利您在泰国的工作和交易。"
    },
    "zh-Hant": {
        "monthly-bookkeeping": "全面的企業會計服務。我們系統地記錄會計帳目，並確保向相關政府機構準確、按時地提交報告。",
        "monthly-tax": "月度稅務和社會保障管理服務。我們負責準備和提交所有類型的稅務申報表，以減少每月的文書工作量並防止產生滯納金的風險。",
        "close-financial": "年度關帳及財務報表編製服務。涵蓋正常和非正常會計期間以及清算報表，確保提交的財務數據符合法律標準。",
        "personal-accounts": "個人會計與稅務管理服務。涵蓋全職員工、自由工作者和個體商戶，為您精確計算、報稅並最大化利用可扣除福利。",
        "audit": "由會計師（CPA）提供的審計服務。按照專業標準進行，旨在建立透明度、信譽並證明您財務報表的準確性。",
        "tax-planning": "戰略性稅務規劃與諮詢服務。我們分析您的收入結構，以高效管理稅務、合法地實現利益最大化，並降低法律風險。",
        "foreign-tax-id": "外籍人士納稅人識別號（TIN）申請服務。我們加快文件準備以及與稅務局的對接工作，以便利您在泰國的工作和交易。"
    },
    ja: {
        "monthly-bookkeeping": "総合的な法人向け会計サービス。会計仕訳を体系的に記録し、関連する政府機関への正確かつ期限通りの申告および報告書の提出をサポートします。",
        "monthly-tax": "月次の税務・社会保険管理サービス。毎月の事務負担を軽減し、追徴課税のリスクを防ぐため、あらゆる種類の税務申告書の作成と提出を代行します。",
        "close-financial": "年次決算および財務諸表作成サービス。通常の会計期間や変則的な会計期間、清算財務諸表にも対応し、法的基準を満たした財務データの提出を保証します。",
        "personal-accounts": "個人向けの会計および税務管理サービス。正社員、フリーランス、個人事業主を対象に、税額の計算から申告書の提出まで行い、控除を最大限に活用できるよう徹底的にサポートします。",
        "audit": "公認会計士（CPA）による監査サービス。専門的な基準に従って業務を遂行し、透明性と信頼性を構築し、貴社の財務諸表の正確性を証明します。",
        "tax-planning": "戦略的な税務プラニングおよびコンサルティングサービス。収益構造を分析して税務を効率的に管理し、法的リスクを軽減しながら税制上の優遇措置を正確に最大化します。",
        "foreign-tax-id": "外国人向け納税者番号（TIN）取得サービス。タイでの就労や各種取引を円滑にするため、書類作成から歳入局との調整までを迅速に行います。"
    },
    ko: {
        "monthly-bookkeeping": "종합적인 법인 회계 서비스. 체계적인 회계 장부 기장과 함께 관련 정부 기관에 대한 정확하고 기한을 준수한 세무 신고 및 보고서 제출을 지원합니다.",
        "monthly-tax": "월별 세무 및 사회보장 관리 서비스. 매월 발생하는 서류 작업 부담을 줄이고 소급 벌금의 위험을 방지하기 위해 모든 종류 세무 신고서 작성 및 제출을 처리 거합니다.",
        "close-financial": "연차 결산 및 재무제표 작성 서비스. 일반 및 비일반 회계 기간은 물론 청산 재무제표까지 포괄하여, 법적 기준을 충족하는 재무 데이터 제출을 보장합니다.",
        "personal-accounts": "개인 회계 및 세무 관리 서비스. 정규직 근로자, 프리랜서 및 개인 사업자를 대상으로 세금을 정확하게 계산 및 신고하며, 공제 혜택을 최대한 활용할 수 있도록 지원합니다.",
        "audit": "공인회계사(CPA)의 회계 감사 서비스. 전문 기준에 따라 업무를 수행하여 투명성과 신뢰성을 구축하고 귀사 재무제표의 정확성을 보증합니다.",
        "tax-planning": "전략적 세무 계획 및 컨설팅 서비스. 수익 구조를 분석하여 세금을 효율적으로 관리하고, 법적 테두리 안에서 혜택을 극대화하며 법적 위험을 줄입니다.",
        "foreign-tax-id": "외국인을 위한 납세자 번호(TIN) 신청 서비스. 태국 내 원활한 업무 및 거래를 지원하기 위해 신속하게 서류를 준비하고 국세청과의 연락을 대행합니다."
    },
    de: {
        "monthly-bookkeeping": "Umfassende Buchhaltungsdienstleistungen für Unternehmen. Wir erfassen Buchungssätze systematisch und sorgen für die korrekte und pünktliche Einreichung von Berichten bei den zuständigen Behörden.",
        "monthly-tax": "Monatliche Verwaltung von Steuern und Sozialversicherungen. Wir übernehmen die Erstellung und Einreichung aller Steuererklärungen, um Ihren monatlichen Papierkram zu reduzieren und das Risiko rückwirkender Geldstrafen zu vermeiden.",
        "close-financial": "Jährlicher Jahresabschluss und Erstellung von Finanzberichten. Umfasst reguläre und abweichende Geschäftsjahre sowie Liquidationsbilanzen und stellt sicher, dass die übermittelten Finanzdaten den gesetzlichen Standards entsprechen.",
        "personal-accounts": "Persönliche Buchhaltungs- und Steuerverwaltung. Wir decken Vollzeitangestellte, Freiberufler und Einzelunternehmer ab, berechnen präzise, reichen Steuererklärungen ein und maximieren Ihre Absetzbeträge.",
        "audit": "Wirtschaftsprüfungsdienste durch zertifizierte Wirtschaftsprüfer (CPA). Durchgeführt in Übereinstimmung mit professionellen Standards, um Transparenz und Glaubwürdigkeit aufzubauen und die Richtigkeit Ihrer Finanzberichte zu zertifizieren.",
        "tax-planning": "Strategische Steuerplanung und -beratung. Wir analysieren Ihre Einkommensstruktur, um Steuern effizient zu verwalten, Vorteile rechtmäßig zu maximieren und rechtliche Risiken zu mindern.",
        "foreign-tax-id": "Beantragung einer Steueridentifikationsnummer (TIN) für Ausländer. Wir beschleunigen die Dokumentenvorbereitung und die Abstimmung mit dem Finanzamt, um Ihre Arbeit und Transaktionen in Thailand zu erleichtern."
    },
    fr: {
        "monthly-bookkeeping": "Services complets de comptabilité d'entreprise. Nous enregistrons systématiquement les écritures comptables et assurons le dépôt précis et ponctuel des déclarations auprès des organismes gouvernementaux compétents.",
        "monthly-tax": "Gestion mensuelle des impôts et de la sécurité sociale. Nous nous occupons de la préparation et du dépôt de toutes les déclarations fiscales pour réduire vos formalités administratives mensuelles et prévenir les risques d'amendes rétroactives.",
        "close-financial": "Clôture annuelle des comptes et préparation des états financiers. Couvrant les exercices comptables standards et non standards, ainsi que les bilans de liquidation, garantissant que la soumission des données financières répond aux normes légales.",
        "personal-accounts": "Gestion de la comptabilité et des impôts personnels. Couvrant les employés à temps plein, les indépendants et les entreprises individuelles, nous calculons et déclarons précisément vos impôts tout en maximisant vos déductions.",
        "audit": "Services d'audit par des experts-comptables certifiés (CPA). Menés conformément aux normes professionnelles pour renforcer la transparence, la crédibilité et certifier l'exactitude de vos états financiers.",
        "tax-planning": "Planification et conseils fiscaux stratégiques. Nous analysons la structure de vos revenus pour gérer efficacement vos impôts, maximiser légalement les avantages et atténuer les risques juridiques.",
        "foreign-tax-id": "Demande de Numéro d'Identification Fiscale (TIN) pour les étrangers. Nous accélérons la préparation des documents et la coordination avec le département des impôts pour faciliter votre travail et vos transactions en Thaïlande."
    },
    it: {
        "monthly-bookkeeping": "Servizi completi di contabilità aziendale. Registriamo sistematicamente le voci contabili e garantiamo la presentazione accurata e puntuale delle dichiarazioni agli enti governativi competenti.",
        "monthly-tax": "Gestione mensile delle imposte e della previdenza sociale. Gestiamo la preparazione e la presentazione di tutte le dichiarazioni dei redditi per ridurre il carico burocratico mensile e prevenire i rischi di multe retroattive.",
        "close-financial": "Chiusura annuale dei conti e preparazione dei rendiconti finanziari. Copre i periodi contabili standard e non standard, nonché i bilanci di liquidazione, garantendo che i dati finanziari inviati soddisfino gli standard legali.",
        "personal-accounts": "Contabilità personale e gestione fiscale. Coprendo dipendenti a tempo pieno, liberi professionisti e ditte individuali, calcoliamo accuratamente, presentiamo le dichiarazioni dei redditi e massimizziamo le tue detrazioni.",
        "audit": "Servizi di revisione contabile da parte di Revisori Legali dei Conti (CPA). Condotti in conformità con gli standard professionali per creare trasparenza, credibilità e certificare l'accuratezza dei tuoi rendiconti finanziari.",
        "tax-planning": "Pianificazione fiscale strategica e consulenza. Analizziamo la struttura dei tuoi ricavi per gestire le tasse in modo efficiente, massimizzare legalmente i benefici e mitigare i rischi legali.",
        "foreign-tax-id": "Richiesta del Codice Fiscale (TIN) per stranieri. Velocizziamo la preparazione dei documenti e il coordinamento con l'Agenzia delle Entrate per facilitare il tuo lavoro e le tue transazioni in Thailandia."
    },
    nl: {
        "monthly-bookkeeping": "Uitgebreide zakelijke boekhouddiensten. Wij registreren systematisch boekhoudkundige boekingen en zorgen voor een nauwkeurige en tijdige indiening van rapporten bij de relevante overheidsinstanties.",
        "monthly-tax": "Maandelijkse belasting- en socialezekerheidsadministratie. Wij verzorgen de voorbereiding en indiening van alle belastingaangiften om uw maandelijkse papierwerk te verminderen en het risico op boetes met terugwerkende kracht te voorkomen.",
        "close-financial": "Jaarlijkse afsluiting van de rekeningen en opstelling van de jaarrekening. Omvat zowel standaard als afwijkende boekjaren, evenals liquidatiebalansen, om ervoor te zorgen dat de ingediende financiële gegevens voldoen aan de wettelijke normen.",
        "personal-accounts": "Persoonlijke boekhouding en belastingbeheer. Voor fulltime werknemers, freelancers en eenmanszaken berekenen we nauwkeurig uw belastingen, doen we aangifte en maximaliseren we uw aftrekposten.",
        "audit": "Auditdiensten door Certified Public Accountants (CPA). Uitgevoerd in overeenstemming met professionele normen om transparantie en geloofwaardigheid op te bouwen en de nauwkeurigheid van uw financiële overzichten te certificeren.",
        "tax-planning": "Strategische belastingplanning en advies. Wij analyseren uw inkomstenstructuur om belastingen efficiënt te beheren, voordelen legaal te maximaliseren en juridische risico's te beperken.",
        "foreign-tax-id": "Aanvraag Fiscaal Identificatienummer (TIN) voor buitenlanders. Wij bespoedigen de voorbereiding van documenten en de coördinatie met de Belastingdienst om uw werk en transacties in Thailand te vergemakkelijken."
    },
    ms: {
        "monthly-bookkeeping": "Perkhidmatan perakaunan korporat yang komprehensif. Kami merekodkan kemasukan perakaunan secara sistematik dan memastikan pemfailan dan penyerahan laporan yang tepat dan tepat pada masanya kepada agensi kerajaan yang berkaitan.",
        "monthly-tax": "Pengurusan cukai dan keselamatan sosial bulanan. Kami menguruskan penyediaan dan pemfailan semua jenis penyata cukai untuk mengurangkan beban kerja kertas bulanan dan mencegah risiko denda retroaktif.",
        "close-financial": "Penutupan akaun tahunan dan penyediaan penyata kewangan. Meliputi tempoh perakaunan standard dan bukan standard, serta penyata pencairan, memastikan penyerahan data kewangan memenuhi piawaian undang-undang.",
        "personal-accounts": "Perakaunan peribadi dan pengurusan cukai. Meliputi pekerja sepenuh masa, pekerja bebas, dan pemilik perniagaan tunggal, kami mengira, memfailkan penyata cukai dengan tepat, dan memaksimumkan faedah potongan anda.",
        "audit": "Perkhidmatan pengauditan oleh Akauntan Awam Bertauliah (CPA). Dijalankan mengikut piawaian profesional untuk membina ketelusan, kredibiliti, dan mengesahkan ketepatan penyata kewangan anda.",
        "tax-planning": "Perancangan dan perundingan cukai strategik. Kami menganalisis struktur pendapatan anda untuk menguruskan cukai dengan cekap, memaksimumkan faedah secara sah, dan mengurangkan risiko undang-undang.",
        "foreign-tax-id": "Permohonan Nombor Pengenalan Cukai (TIN) untuk warga asing. Kami menyegerakan penyediaan dokumen dan penyelarasan dengan Jabatan Hasil untuk memudahkan kerja dan transaksi anda di Thailand."
    },
    hi: {
        "monthly-bookkeeping": "व्यापक कॉर्पोरेट लेखांकन सेवाएं। हम व्यवस्थित रूप से लेखांकन प्रविष्टियां दर्ज करते हैं और संबंधित सरकारी एजेंसियों को सटीक और समय पर रिपोर्ट दाखिल करना सुनिश्चित करते हैं।",
        "monthly-tax": "मासिक कर और सामाजिक सुरक्षा प्रबंधन। हम आपके मासिक कागजी काम को कम करने और पूर्वव्यापी जुर्माने के जोखिमों को रोकने के लिए सभी कर रिटर्न तैयार करने और दाखिल करने का काम संभालते हैं।",
        "close-financial": "वार्षिक खाता बंदी और वित्तीय विवरण तैयार करना। मानक और गैर-मानक लेखांकन अवधि, साथ ही परिसमापन विवरणों को कवर करना, यह सुनिश्चित करना कि प्रस्तुत वित्तीय डेटा कानूनी मानकों को पूरा करता है।",
        "personal-accounts": "व्यक्तिगत लेखांकन और कर प्रबंधन। पूर्णकालिक कर्मचारियों, फ्रीलांसरों और एकल स्वामित्व को कवर करते हुए, हम आपके करों की सटीक गणना करते हैं, रिटर्न दाखिल करते हैं, और आपकी कर कटौती को अधिकतम करते हैं।",
        "audit": "प्रमाणित सार्वजनिक लेखाकारों (CPA) द्वारा ऑडिटिंग सेवाएं। आपके वित्तीय विवरणों की सटीकता को प्रमाणित करने और पारदर्शिता, विश्वसनीयता बनाने के लिए पेशेवर मानकों के अनुसार आयोजित किया जाता है।",
        "tax-planning": "रणनीतिक कर योजना और परामर्श। हम आपके करों का कुशलतापूर्वक प्रबंधन करने, कानूनी रूप से लाभ को अधिकतम करने और कानूनी जोखिमों को कम करने के लिए आपकी आय संरचना का विश्लेषण करते हैं।",
        "foreign-tax-id": "विदेशियों के लिए कर पहचान संख्या (TIN) आवेदन। हम थाईलैंड में आपके काम और लेनदेन को सुविधाजनक बनाने के लिए दस्तावेज़ तैयार करने और राजस्व विभाग के साथ समन्वय में तेजी लाते हैं।"
    },
    ta: {
        "monthly-bookkeeping": "விரிவான கார்ப்பரேட் கணக்கியல் சேவைகள். நாங்கள் முறையாக கணக்கியல் உள்ளீடுகளை பதிவு செய்கிறோம் மற்றும் சம்பந்தப்பட்ட அரசு நிறுவனங்களுக்கு துல்லியமாகவும் சரியான நேரத்திலும் அறிக்கைகளை தாக்கல் செய்வதை உறுதிசெய்கிறோம்.",
        "monthly-tax": "மாதாந்திர வரி மற்றும் சமூக பாதுகாப்பு மேலாண்மை. உங்கள் மாதாந்திர காகித வேலைகளைக் குறைக்கவும், பின்தேதியிட்ட அபராதங்களின் அபாயங்களைத் தடுக்கவும் அனைத்து வகையான வரி அறிக்கைகளையும் தயாரித்து தாக்கல் செய்வதை நாங்கள் கையாளுகிறோம்.",
        "close-financial": "ஆண்டு கணக்கு முடித்தல் மற்றும் நிதி அறிக்கை தயாரித்தல். நிலையான மற்றும் தரமற்ற கணக்கியல் காலங்கள் மற்றும் கலைப்பு அறிக்கைகளை உள்ளடக்கி, சமர்ப்பிக்கப்படும் நிதித் தரவு சட்டத் தரங்களைப் பூர்த்தி செய்வதை உறுதிசெய்கிறது.",
        "personal-accounts": "தனிப்பட்ட கணக்கியல் மற்றும் வரி மேலாண்மை. முழுநேர ஊழியர்கள், தனிப்பட்ட பணியாளர்கள் மற்றும் தனி உரிமையாளர்களை உள்ளடக்கி, உங்கள் வரிகளை துல்லியமாக கணக்கிட்டு, அறிக்கைகளை தாக்கல் செய்து, வரி கழிவுகளை அதிகப்படுத்துகிறோம்.",
        "audit": "சான்றளிக்கப்பட்ட பொது கணக்காளர்களால் (CPA) கணக்காய்வு சேவைகள். வெளிப்படைத்தன்மை மற்றும் நம்பகத்தன்மையை உருவாக்கவும், உங்கள் நிதி அறிக்கைகளின் துல்லியத்தை சான்றளிக்கவும் தொழில்முறை தரங்களின்படி மேற்கொள்ளப்படுகிறது.",
        "tax-planning": "மூலோபாய வரி திட்டமிடல் மற்றும் ஆலோசனை. வரிகளை திறமையாக நிர்வகிக்கவும், சட்டப்பூர்வமாக நன்மைகளை அதிகரிக்கவும், சட்ட அபாயங்களைக் குறைக்கவும் உங்கள் வருமான கட்டமைப்பை நாங்கள் பகுப்பாய்வு செய்கிறோம்.",
        "foreign-tax-id": "வெளிநாட்டினருக்கான வரி அடையாள எண் (TIN) விண்ணப்பம். தாய்லாந்தில் உங்கள் வேலை மற்றும் பரிவர்த்தனைகளை எளிதாக்க ஆவணங்கள் தயாரிப்பதையும் வருவாய்த் துறையுடனான ஒருங்கிணைப்பையும் நாங்கள் துரிதப்படுத்துகிறோம்."
    }
};

const messagesDir = path.join(__dirname, 'src', 'messages');
const files = fs.readdirSync(messagesDir).filter(f => f.endsWith('.json'));

files.forEach(file => {
    const lang = file.replace('.json', '');
    if (!newSummaries[lang]) return;

    const filePath = path.join(messagesDir, file);
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

    const translations = newSummaries[lang];

    // the subcategories are directly on `data`, not under data.services.categories.accounting-audit
    if (data) {
        let updated = false;

        // Note from view_file: the subcategories e.g. "monthly-bookkeeping", "monthly-tax" are placed directly on the root object
        // So we will just look at the root object keys since that is the structure we discovered in th.json
        if (data["monthly-bookkeeping"] && translations["monthly-bookkeeping"]) {
            data["monthly-bookkeeping"].summary = translations["monthly-bookkeeping"];
            updated = true;
        }
        if (data["monthly-tax"] && translations["monthly-tax"]) {
            data["monthly-tax"].summary = translations["monthly-tax"];
            updated = true;
        }
        if (data["close-financial"] && translations["close-financial"]) {
            data["close-financial"].summary = translations["close-financial"];
            updated = true;
        }
        if (data["personal-accounts"] && translations["personal-accounts"]) {
            data["personal-accounts"].summary = translations["personal-accounts"];
            updated = true;
        }
        if (data["audit"] && translations["audit"]) {
            data["audit"].summary = translations["audit"];
            updated = true;
        }
        if (data["tax-planning"] && translations["tax-planning"]) {
            data["tax-planning"].summary = translations["tax-planning"];
            updated = true;
        }
        if (data["foreign-tax-id"] && translations["foreign-tax-id"]) {
            data["foreign-tax-id"].summary = translations["foreign-tax-id"];
            updated = true;
        }

        if (updated) {
            fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n', 'utf8');
            console.log(`✅ Updated accounting-audit summaries for: ${file}`);
        }
    }
});
