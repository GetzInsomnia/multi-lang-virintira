const fs = require('fs');

const summaryUpdates = {
    th: {
        "company-limited": "จดทะเบียนจัดตั้งบริษัทจำกัดแบบครบวงจร ดูแลเอกสารและทุกขั้นตอนทางกฎหมายให้คุณพร้อมเริ่มธุรกิจได้อย่างมั่นใจ",
        "limited-partnership": "บริการจดทะเบียนห้างหุ้นส่วนจำกัด (หจก.) ดำเนินการรวดเร็ว ถูกต้องตามระเบียบ พร้อมให้คำปรึกษาด้านโครงสร้างธุรกิจเบื้องต้น",
        "foundation": "บริการขออนุญาตจัดตั้งมูลนิธิ ดูแลขั้นตอนที่ซับซ้อนและการร่างวัตถุประสงค์ให้ถูกต้องตามระเบียบของหน่วยงานราชการ",
        "association": "บริการจดทะเบียนจัดตั้งสมาคมทุกประเภท จัดเตรียมเอกสารและข้อบังคับอย่างรัดกุม เพื่อให้การดำเนินกิจกรรมเป็นไปอย่างราบรื่น",
        "commercial-shop": "บริการจดทะเบียนพาณิชย์ (บุคคลธรรมดา/ร้านค้า) เพื่อสร้างความน่าเชื่อถือทางธุรกิจ และรองรับการทำธุรกรรมในอนาคต",
        "employer-sso": "บริการขึ้นทะเบียนนายจ้างและลูกจ้างเข้าสู่ระบบประกันสังคม จัดการงานเอกสารที่ยุ่งยากให้ถูกต้องตามกฎหมายแรงงาน",
        "vat-registration": "บริการจดทะเบียนภาษีมูลค่าเพิ่ม (VAT) เพื่อเข้าสู่ระบบอย่างถูกต้อง พร้อมให้คำแนะนำเพื่อลดความเสี่ยงและวางแผนภาษีอย่างรัดกุม"
    },
    en: {
        "company-limited": "Comprehensive limited company registration. We handle all paperwork and legal steps so you can confidently start your business.",
        "limited-partnership": "Fast and compliant limited partnership (LP) registration. We also provide preliminary business structure consulting.",
        "foundation": "Foundation establishment licensing. We navigate complex procedures and draft objectives to perfectly align with government regulations.",
        "association": "Registration for all types of associations. We prepare stringent documents and bylaws to ensure smooth operational activities.",
        "commercial-shop": "Commercial registration (individuals/shops) to build business credibility and support future transactions.",
        "employer-sso": "Employer and employee registration into the Social Security system. We handle complex paperwork in compliance with labor laws.",
        "vat-registration": "VAT registration to properly enter the tax system, including expert advice on risk reduction and meticulous tax planning."
    },
    "zh-Hans": {
        "company-limited": "全方位的有限公司注册服务。我们负责处理所有文件和法律程序，让您充满信心地开启业务。",
        "limited-partnership": "快速且合规的有限合伙（LP）注册服务，并提供初步的商业架构咨询。",
        "foundation": "基金会设立许可申请。我们协助处理复杂的程序并起草宗旨，确保完全符合政府法规。",
        "association": "各类协会注册服务。我们准备严谨的文件和章程，以确保您的各项活动顺利进行。",
        "commercial-shop": "商业登记（个人/店铺），旨在建立商业信誉并为未来的交易提供支持。",
        "employer-sso": "将雇主和员工注册入社会保障系统。我们负责处理符合劳动法的繁琐文件工作。",
        "vat-registration": "增值税注册服务，助您顺利进入税务系统，并提供降低风险和严谨税务规划的建议。"
    },
    "zh-Hant": {
        "company-limited": "全方位的有限公司註冊服務。我們負責處理所有文件和法律程序，讓您充滿信心地開啟業務。",
        "limited-partnership": "快速且合規的有限合夥（LP）註冊服務，並提供初步的商業架構諮詢。",
        "foundation": "基金會設立許可申請。我們協助處理複雜的程序並起草宗旨，確保完全符合政府法規。",
        "association": "各類協會註冊服務。我們準備嚴謹的文件和章程，以確保您的各項活動順利進行。",
        "commercial-shop": "商業登記（個人/店鋪），旨在建立商業信譽並為未來的交易提供支持。",
        "employer-sso": "將雇主和員工註冊入社會保障系統。我們負責處理符合勞動法的繁瑣文件工作。",
        "vat-registration": "增值稅註冊服務，助您順利進入稅務系統，並提供降低風險和嚴謹稅務規劃的建議。"
    },
    ja: {
        "company-limited": "総合的な株式会社設立登録。書類作成から法的手続きまで全てサポートし、安心してビジネスを始められます。",
        "limited-partnership": "迅速かつ法令を遵守した合資会社（LP）の登録サービス。基本的なビジネス構造に関するコンサルティングも提供します。",
        "foundation": "財団設立の許可申請。複雑な手続きをサポートし、政府の規制に完全に準拠した目的（定款）の作成を行います。",
        "association": "あらゆる種類の協会設立登録。スムーズな活動運営を確実にするため、厳密な書類と会則を作成します。",
        "commercial-shop": "ビジネスの信頼性を構築し、将来の取引をサポートするための商業登記（個人事業主/店舗）。",
        "employer-sso": "社会保険制度への雇用主および従業員の登録。労働法に準拠した煩雑な書類作成を代行します。",
        "vat-registration": "適切な税制への加入のための付加価値税（VAT）登録サービス。リスク軽減と綿密な税務計画のコンサルティングも提供します。"
    },
    ko: {
        "company-limited": "종합적인 유한회사 설립 등록 서비스. 서류 작업과 모든 법적 절차를 대행하여 자신 있게 비즈니스를 시작할 수 있도록 돕습니다.",
        "limited-partnership": "빠르고 규정에 맞는 합자회사(LP) 등록 서비스. 초기 비즈니스 구조에 대한 컨설팅도 함께 제공합니다.",
        "foundation": "재단 설립 허가 서비스. 복잡한 절차를 안내하고 정부 규정에 맞게 목적(정관)을 초안해 드립니다.",
        "association": "모든 유형의 협회 등록 서비스. 원활한 활동 운영을 위해 엄격한 서류와 정관을 준비합니다.",
        "commercial-shop": "비즈니스 신뢰도를 구축하고 향후 거래를 지원하기 위한 상업 등기 (개인/상점).",
        "employer-sso": "사회 보장 제도에 고용주 및 직원 등록. 노동법을 준수하여 복잡한 서류 작업을 처리합니다.",
        "vat-registration": "적절한 세금 시스템 편입을 위한 부가가치세 등록 서비스. 위험 감소 및 꼼꼼한 세무 계획에 대한 조언을 포함합니다."
    },
    de: {
        "company-limited": "Umfassende Unternehmensregistrierung. Wir kümmern uns um alle Dokumente und rechtlichen Schritte, damit Sie Ihr Geschäft zuversichtlich starten können.",
        "limited-partnership": "Schnelle und rechtskonforme Registrierung von Kommanditgesellschaften (LP). Wir bieten zudem erste Beratungen zur Unternehmensstruktur.",
        "foundation": "Lizenzierung zur Stiftungsgründung. Wir navigieren durch komplexe Verfahren und entwerfen Ziele, die den behördlichen Vorschriften genau entsprechen.",
        "association": "Registrierung für alle Arten von Verbänden. Wir erstellen strikte Dokumente und Statuten, um einen reibungslosen Ablauf der Aktivitäten zu gewährleisten.",
        "commercial-shop": "Gewerbeanmeldung (Privatpersonen/Geschäfte) zum Aufbau geschäftlicher Glaubwürdigkeit und zur Unterstützung zukünftiger Transaktionen.",
        "employer-sso": "Registrierung von Arbeitgebern und Arbeitnehmern im Sozialversicherungssystem. Wir erledigen komplexe Formalitäten in Übereinstimmung mit dem Arbeitsrecht.",
        "vat-registration": "Mehrwertsteuer-Registrierung für den korrekten Eintritt ins Steuersystem, inklusive Beratung zur Risikominimierung und sorgfältigen Steuerplanung."
    },
    fr: {
        "company-limited": "Enregistrement complet de société. Nous gérons tous les documents et démarches juridiques pour que vous puissiez démarrer votre entreprise en toute confiance.",
        "limited-partnership": "Enregistrement rapide et conforme de société en commandite (LP). Nous fournissons également des conseils préliminaires sur la structure de l'entreprise.",
        "foundation": "Licence d'établissement de fondation. Nous naviguons à travers des procédures complexes et rédigeons des objectifs conformes aux réglementations gouvernementales.",
        "association": "Enregistrement pour tous types d'associations. Nous préparons des documents et des statuts rigoureux pour assurer le bon déroulement de vos activités.",
        "commercial-shop": "Enregistrement commercial (particuliers/boutiques) pour renforcer la crédibilité de l'entreprise et faciliter les transactions futures.",
        "employer-sso": "Inscription de l'employeur et des employés au système de sécurité sociale. Nous gérons les formalités administratives complexes conformément au droit du travail.",
        "vat-registration": "Enregistrement à la TVA pour intégrer correctement le système fiscal, incluant des conseils sur la réduction des risques et une planification fiscale rigoureuse."
    },
    it: {
        "company-limited": "Registrazione aziendale completa. Gestiamo tutti i documenti e le procedure legali per farti avviare la tua attività con sicurezza.",
        "limited-partnership": "Registrazione rapida e conforme della società in accomandita (LP). Offriamo anche consulenza preliminare sulla struttura aziendale.",
        "foundation": "Licenza di costituzione della fondazione. Gestiamo procedure complesse e redigiamo gli obiettivi in perfetta conformità con le normative governative.",
        "association": "Registrazione per tutti i tipi di associazioni. Prepariamo documenti rigorosi e statuti per garantire il regolare svolgimento delle attività.",
        "commercial-shop": "Registrazione commerciale (privati/negozi) per costruire la credibilità aziendale e supportare le transazioni future.",
        "employer-sso": "Iscrizione del datore di lavoro e dei dipendenti al sistema di previdenza sociale. Gestiamo le pratiche burocratiche complesse nel rispetto delle leggi sul lavoro.",
        "vat-registration": "Registrazione IVA per entrare correttamente nel sistema fiscale, includendo consulenza sulla riduzione dei rischi e una pianificazione fiscale meticolosa."
    },
    nl: {
        "company-limited": "Uitgebreide bedrijfsregistratie. Wij regelen alle documenten en juridische stappen, zodat u met vertrouwen uw bedrijf kunt starten.",
        "limited-partnership": "Snelle en conforme registratie van commanditaire vennootschappen (LP). Wij bieden ook voorlopig advies over de bedrijfsstructuur.",
        "foundation": "Vergunning voor de oprichting van een stichting. Wij navigeren door complexe procedures en stellen doelstellingen op die voldoen aan de overheidsvoorschriften.",
        "association": "Registratie voor alle soorten verenigingen. Wij stellen nauwkeurige documenten en statuten op om een soepel verloop van de activiteiten te garanderen.",
        "commercial-shop": "Commerciële registratie (particulieren/winkels) om zakelijke geloofwaardigheid op te bouwen en toekomstige transacties te ondersteunen.",
        "employer-sso": "Registratie van werkgevers en werknemers in het socialezekerheidsstelsel. Wij handelen ingewikkeld papierwerk af in overeenstemming met de arbeidswetten.",
        "vat-registration": "BTW-registratie om correct toe te treden tot het belastingstelsel, inclusief advies over risicovermindering en nauwgezette belastingplanning."
    },
    ms: {
        "company-limited": "Pendaftaran syarikat berhad yang komprehensif. Kami menguruskan semua kertas kerja dan langkah undang-undang supaya anda boleh memulakan perniagaan dengan yakin.",
        "limited-partnership": "Pendaftaran perkongsian terhad (LP) yang pantas dan mematuhi peraturan. Kami juga menyediakan perundingan struktur perniagaan awal.",
        "foundation": "Pelesenan penubuhan yayasan. Kami menguruskan prosedur yang rumit dan merangka objektif agar sejajar dengan peraturan kerajaan.",
        "association": "Pendaftaran untuk semua jenis persatuan. Kami menyediakan dokumen dan undang-undang kecil yang ketat untuk memastikan kelancaran aktiviti operasi.",
        "commercial-shop": "Pendaftaran komersial (individu/kedai) untuk membina kredibiliti perniagaan dan menyokong transaksi masa depan.",
        "employer-sso": "Pendaftaran majikan dan pekerja ke dalam sistem Keselamatan Sosial. Kami menguruskan kerja kertas yang rumit mengikut undang-undang buruh.",
        "vat-registration": "Pendaftaran VAT untuk memasuki sistem cukai dengan betul, termasuk nasihat mengenai pengurangan risiko dan perancangan cukai yang teliti."
    },
    hi: {
        "company-limited": "व्यापक सीमित कंपनी पंजीकरण। हम सभी कागजी कार्रवाई और कानूनी कदम संभालते हैं ताकि आप आत्मविश्वास के साथ अपना व्यवसाय शुरू कर सकें।",
        "limited-partnership": "तेज़ और अनुपालन-युक्त सीमित भागीदारी (LP) पंजीकरण। हम प्रारंभिक व्यावसायिक संरचना परामर्श भी प्रदान करते हैं।",
        "foundation": "फाउंडेशन स्थापना लाइसेंसिंग। हम जटिल प्रक्रियाओं को संभालते हैं और सरकारी नियमों के अनुसार उद्देश्यों का मसौदा तैयार करते हैं।",
        "association": "सभी प्रकार के संघों के लिए पंजीकरण। हम सुचारू परिचालन गतिविधियों को सुनिश्चित करने के लिए कड़े दस्तावेज़ और उपनियम तैयार करते हैं।",
        "commercial-shop": "व्यापारिक विश्वसनीयता बनाने और भविष्य के लेनदेन का समर्थन करने के लिए वाणिज्यिक पंजीकरण (व्यक्ति/दुकानें)।",
        "employer-sso": "सामाजिक सुरक्षा प्रणाली में नियोक्ता और कर्मचारी का पंजीकरण। हम श्रम कानूनों के अनुपालन में जटिल कागजी कार्रवाई को संभालते हैं।",
        "vat-registration": "कर प्रणाली में ठीक से प्रवेश करने के लिए VAT पंजीकरण, जिसमें जोखिम कम करने और सावधानीपूर्वक कर योजना पर विशेषज्ञ सलाह शामिल है।"
    },
    ta: {
        "company-limited": "விரிவான வரையறுக்கப்பட்ட நிறுவனப் பதிவு. அனைத்து ஆவணங்கள் மற்றும் சட்டப் படிகளை நாங்கள் கவனித்துக்கொள்கிறோம், எனவே நீங்கள் நம்பிக்கையுடன் உங்கள் வணிகத்தைத் தொடங்கலாம்.",
        "limited-partnership": "விரைவான மற்றும் விதிமுறைகளுக்கு உட்பட்ட வரையறுக்கப்பட்ட கூட்டாண்மை (LP) பதிவு. முதற்கட்ட வணிக கட்டமைப்பு ஆலோசனையையும் நாங்கள் வழங்குகிறோம்.",
        "foundation": "அறக்கட்டளை நிறுவுவதற்கான உரிமம். நாங்கள் சிக்கலான நடைமுறைகளைக் கையாளுகிறோம் மற்றும் அரசாங்க விதிமுறைகளுக்கு ஏற்ப நோக்கங்களை வரைகிறோம்.",
        "association": "அனைத்து வகையான சங்கங்களுக்கான பதிவு. செயல்பாடுகள் சீராக நடப்பதை உறுதிசெய்ய, கடுமையான ஆவணங்கள் மற்றும் துணைச்சட்டங்களை நாங்கள் தயாரிக்கிறோம்.",
        "commercial-shop": "வணிக நம்பகத்தன்மையை உருவாக்க மற்றும் எதிர்கால பரிவர்த்தனைகளை ஆதரிக்க வணிகப் பதிவு (தனிநபர்கள்/கடைகள்).",
        "employer-sso": "சமூக பாதுகாப்பு அமைப்பில் முதலாளி மற்றும் பணியாளர் பதிவு. தொழிலாளர் சட்டங்களுக்கு இணங்க சிக்கலான ஆவணங்களை நாங்கள் கையாளுகிறோம்.",
        "vat-registration": "வரி அமைப்பில் சரியாக நுழைவதற்கான VAT பதிவு, இடர் குறைப்பு மற்றும் நுட்பமான வரி திட்டமிடல் குறித்த ஆலோசனைகள் உட்பட."
    }
};

const files = fs.readdirSync('src/messages').filter(f => f.endsWith('.json'));

files.forEach(file => {
    const locale = file.replace('.json', '');
    if (!summaryUpdates[locale]) return;

    const filePath = `src/messages/${file}`;
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    let modified = false;

    const updates = summaryUpdates[locale];

    if (data.services && data.services.items) {
        for (const [key, newSummary] of Object.entries(updates)) {
            if (data.services.items[key] && data.services.items[key].summary !== newSummary) {
                data.services.items[key].summary = newSummary;
                modified = true;
            }
        }
    }

    if (modified) {
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n');
        console.log(`✅ Updated summaries for: ${file}`);
    } else {
        console.log(`⏩ No changes needed for: ${file}`);
    }
});
