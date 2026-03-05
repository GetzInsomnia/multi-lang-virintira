const fs = require('fs');
const path = require('path');

const newSummaries = {
    th: {
        "tourism-licence": "บริการขอใบอนุญาตประกอบธุรกิจนำเที่ยวจากกรมการท่องเที่ยว รวมถึงใบอนุญาตที่เกี่ยวข้องทั้งหมด เพื่อให้ธุรกิจทัวร์และการท่องเที่ยวของคุณดำเนินการได้อย่างถูกต้องและราบรื่น",
        "thai-fda": "บริการขออนุญาตจากสำนักงานคณะกรรมการอาหารและยา (อย.) ครอบคลุมทั้งอาหาร ยา เครื่องสำอาง เวชภัณฑ์ และผลิตภัณฑ์สุขภาพ ดำเนินการเอกสารอย่างรัดกุมเพื่อการอนุมัติที่รวดเร็ว",
        "visa-work-permit": "บริการขอและต่ออายุวีซ่า (Non-B, Non-O ฯลฯ) พร้อมใบอนุญาตทำงาน (Work Permit) สำหรับชาวต่างชาติทุกสัญชาติ จัดการเอกสารและขั้นตอนที่ซับซ้อนให้ครบจบในที่เดียว เพื่อการพำนักและทำงานในไทยอย่างถูกกฎหมาย",
        "boi-promotion": "บริการขอรับการส่งเสริมการลงทุน (BOI) สำหรับทุกประเภทกิจการ ให้คำปรึกษาเชิงลึกและจัดเตรียมโครงการอย่างมืออาชีพ เพื่อให้ธุรกิจของคุณได้รับสิทธิประโยชน์สูงสุดจากรัฐบาล",
        "foreign-business": "บริการขอใบอนุญาต (FBL) และหนังสือรับรอง (FBC) การประกอบธุรกิจของคนต่างด้าว ดูแลขั้นตอนทางกฎหมายอย่างละเอียดให้สอดคล้องกับสัดส่วนผู้ถือหุ้นต่างชาติหรือสิทธิ BOI เพื่อการดำเนินธุรกิจในไทยอย่างมั่นคง"
    },
    en: {
        "tourism-licence": "Tourism business license application services from the Department of Tourism, including all related licenses, ensuring your tour and travel operations run legally and smoothly.",
        "thai-fda": "Food and Drug Administration (FDA) licensing services covering food, drugs, cosmetics, medical supplies, and health products. We rigorously process documents for rapid approval.",
        "visa-work-permit": "Visa application and renewal (Non-B, Non-O, etc.) and Work Permit services for foreigners of all nationalities. We handle complex paperwork and procedures in one place for legal stay and work in Thailand.",
        "boi-promotion": "BOI promotion application services for all eligible business types. We provide in-depth consulting and professionally prepare your project so your business gains maximum government benefits.",
        "foreign-business": "Foreign Business License (FBL) and Certificate (FBC) application services. We meticulously manage legal procedures aligning with foreign shareholding ratios or BOI privileges for stable business operations in Thailand."
    },
    "zh-Hans": {
        "tourism-licence": "提供向旅游局申请旅行社营业执照及所有相关许可证的服务，确保您的旅游业务合法、顺利地运营。",
        "thai-fda": "泰国食品药品监督管理局（FDA）许可申请服务，涵盖食品、药品、化妆品、医疗用品和健康产品。我们严谨处理文件，以确保快速获批。",
        "visa-work-permit": "为所有国籍的外籍人士提供签证（Non-B、Non-O等）申请及延期和工作许可证服务。我们在一个地方集中处理繁杂的文件和程序，确保您在泰国合法居留和工作。",
        "boi-promotion": "为所有符合条件的企业类型提供 BOI 投资促进申请服务。我们提供深度咨询并专业地准备您的项目，让您的企业获得最大的政府优惠。",
        "foreign-business": "外商经营许可证（FBL）和证明书（FBC）申请服务。我们仔细处理符合外资持股比例或 BOI 特权的法律程序，确保您在泰国稳健经营。"
    },
    "zh-Hant": {
        "tourism-licence": "提供向旅遊局申請旅行社營業執照及所有相關許可證的服務，確保您的旅遊業務合法、順利地運營。",
        "thai-fda": "泰國食品藥品監督管理局（FDA）許可申請服務，涵蓋食品、藥品、化妝品、醫療用品和健康產品。我們嚴謹處理文件，以確保快速獲批。",
        "visa-work-permit": "為所有國籍的外籍人士提供簽證（Non-B、Non-O等）申請及延期和工作許可證服務。我們在一個地方集中處理繁雜的文件和程序，確保您在泰國合法居留和工作。",
        "boi-promotion": "為所有符合條件的企業類型提供 BOI 投資促進申請服務。我們提供深度諮詢並專業地準備您的項目，讓您的企業獲得最大的政府優惠。",
        "foreign-business": "外商經營許可證（FBL）和證明書（FBC）申請服務。我們仔細處理符合外資持股比例或 BOI 特權的法律程序，確保您在泰國穩健經營。"
    },
    ja: {
        "tourism-licence": "観光局からの旅行業ライセンスおよび関連するすべての許可申請サービス。ツアーおよび旅行ビジネスが合法的かつスムーズに運営されるようサポートします。",
        "thai-fda": "食品医薬品局（FDA）の許可申請サービス。食品、医薬品、化粧品、医療用品、健康製品をカバーします。迅速な承認のために書類を厳密に処理します。",
        "visa-work-permit": "すべての国籍の外国人を対象としたビザ（Non-B、Non-Oなど）の申請・更新および就労許可証（ワークパミット）サービス。タイでの合法的な滞在と就労のため、複雑な手続きをワンストップで処理します。",
        "boi-promotion": "あらゆる対象業種向けのBOI投資奨励申請サービス。専門的なコンサルティングとプロジェクトの準備を行い、政府から最大の優遇措置を受けられるよう支援します。",
        "foreign-business": "外国人事業許可（FBL）および証明書（FBC）の申請サービス。タイでの安定した事業運営のため、外国資本比率やBOI特権に適合した法的手続きを綿密に管理します。"
    },
    ko: {
        "tourism-licence": "관광청의 여행업 라이선스 및 모든 관련 허가 신청 서비스로, 귀하의 투어 및 여행 비즈니스가 합법적이고 원활하게 운영될 수 있도록 보장합니다.",
        "thai-fda": "식품, 의약품, 화장품, 의료 용품 및 건강 제품을 포괄하는 식약청(FDA) 허가 신청 서비스입니다. 빠른 승인을 위해 문서를 엄격하게 처리합니다.",
        "visa-work-permit": "모든 국적의 외국인을 위한 비자(Non-B, Non-O 등) 신청 및 연장과 취업 허가증(Work Permit) 서비스. 태국 내 합법적인 체류 및 근로를 위해 복잡한 서류 작업을 한 곳에서 처리해 드립니다.",
        "boi-promotion": "모든 적격 사업 유형에 대한 BOI 투자 장려 신청 서비스. 비즈니스가 정부로부터 최대의 혜택을 받을 수 있도록 심층적인 컨설팅을 제공하고 프로젝트를 전문적으로 준비합니다.",
        "foreign-business": "외국인 사업 면허(FBL) 및 인증서(FBC) 신청 서비스. 태국 내 안정적인 사업 운영을 위해 외국인 지분율 또는 BOI 특권에 부합하는 법적 절차를 꼼꼼하게 관리합니다."
    },
    de: {
        "tourism-licence": "Beantragung von Tourismuslizenzen beim Department of Tourism, einschließlich aller zugehörigen Genehmigungen, damit Ihr Reise- und Tourismusgeschäft rechtmäßig und reibungslos läuft.",
        "thai-fda": "FDA-Lizenzierungsdienste (Food and Drug Administration) für Lebensmittel, Medikamente, Kosmetika, medizinische Versorgung und Gesundheitsprodukte. Wir bearbeiten Dokumente rigoros für eine schnelle Zulassung.",
        "visa-work-permit": "Beantragung und Verlängerung von Visa (Non-B, Non-O usw.) sowie Arbeitserlaubnissen (Work Permit) für Ausländer aller Nationalitäten. Wir erledigen komplexe Formalitäten für Ihren legalen Aufenthalt und Ihre Arbeit in Thailand aus einer Hand.",
        "boi-promotion": "BOI-Förderanträge für alle zulässigen Unternehmensarten. Wir bieten fundierte Beratung und bereiten Ihr Projekt professionell vor, damit Ihr Unternehmen maximale staatliche Vorteile erhält.",
        "foreign-business": "Beantragung der Foreign Business License (FBL) und des Foreign Business Certificate (FBC). Wir verwalten rechtliche Verfahren in Übereinstimmung mit ausländischen Beteiligungsquoten oder BOI-Privilegien für einen stabilen Geschäftsbetrieb in Thailand."
    },
    fr: {
        "tourism-licence": "Services de demande de licence d'entreprise touristique auprès du Département du Tourisme, y compris toutes les licences connexes, garantissant que vos activités touristiques se déroulent légalement et sans heurts.",
        "thai-fda": "Services de licences de la Food and Drug Administration (FDA) couvrant l'alimentation, les médicaments, les cosmétiques, les fournitures médicales et les produits de santé. Nous traitons rigoureusement les documents pour une approbation rapide.",
        "visa-work-permit": "Demande et renouvellement de visa (Non-B, Non-O, etc.) et permis de travail pour les étrangers de toutes nationalités. Nous gérons les formalités complexes en un seul endroit pour un séjour et un travail légaux en Thaïlande.",
        "boi-promotion": "Services de demande de promotion du BOI pour tous les types d'entreprises éligibles. Nous fournissons des conseils approfondis et préparons professionnellement votre projet afin que votre entreprise obtienne un maximum d'avantages gouvernementaux.",
        "foreign-business": "Services de demande de licence (FBL) et de certificat (FBC) d'exploitation pour les étrangers. Nous gérons méticuleusement les procédures légales conformes aux ratios d'actionnariat étranger ou aux privilèges du BOI pour des opérations commerciales stables en Thaïlande."
    },
    it: {
        "tourism-licence": "Servizi di richiesta di licenze per imprese turistiche presso il Dipartimento del Turismo, comprese tutte le licenze correlate, garantendo che le operazioni di tour e viaggi si svolgano legalmente e senza intoppi.",
        "thai-fda": "Servizi di licenza della Food and Drug Administration (FDA) che coprono alimenti, farmaci, cosmetici, forniture mediche e prodotti per la salute. Elaboriamo rigorosamente i documenti per una rapida approvazione.",
        "visa-work-permit": "Richiesta e rinnovo di visti (Non-B, Non-O, ecc.) e permessi di lavoro per stranieri di tutte le nazionalità. Gestiamo complesse procedure burocratiche in un unico posto per un soggiorno e un lavoro legali in Thailandia.",
        "boi-promotion": "Servizi di richiesta di promozione BOI per tutti i tipi di imprese idonee. Forniamo consulenza approfondita e prepariamo professionalmente il tuo progetto affinché la tua azienda ottenga i massimi vantaggi governativi.",
        "foreign-business": "Servizi di richiesta della Foreign Business License (FBL) e del Certificate (FBC). Gestiamo meticolosamente le procedure legali in conformità con le quote di partecipazione estera o i privilegi BOI per operazioni commerciali stabili in Thailandia."
    },
    nl: {
        "tourism-licence": "Aanvraagdiensten voor toerismelicenties bij het Department of Tourism, inclusief alle gerelateerde vergunningen, zodat uw reis- en touroperaties legaal en soepel verlopen.",
        "thai-fda": "Licentiediensten van de Food and Drug Administration (FDA) voor voedsel, medicijnen, cosmetica, medische benodigdheden en gezondheidsproducten. Wij verwerken documenten rigoureus voor een snelle goedkeuring.",
        "visa-work-permit": "Visumaanvraag en -verlenging (Non-B, Non-O, enz.) en werkvergunningdiensten voor buitenlanders van alle nationaliteiten. Wij handelen ingewikkeld papierwerk op één plek af voor een legaal verblijf en werk in Thailand.",
        "boi-promotion": "Aanvraagdiensten voor BOI-promotie voor alle in aanmerking komende bedrijfstypes. Wij bieden diepgaand advies en bereiden uw project professioneel voor, zodat uw bedrijf maximale overheidsvoordelen behaalt.",
        "foreign-business": "Aanvraagdiensten voor Foreign Business License (FBL) en Certificate (FBC). Wij beheren zorgvuldig de juridische procedures die overeenkomen met de buitenlandse aandelenverhoudingen of BOI-privileges voor stabiele bedrijfsactiviteiten in Thailand."
    },
    ms: {
        "tourism-licence": "Perkhidmatan permohonan lesen perniagaan pelancongan dari Jabatan Pelancongan, termasuk semua lesen berkaitan, memastikan operasi lawatan dan perjalanan anda berjalan secara sah dan lancar.",
        "thai-fda": "Perkhidmatan pelesenan Pentadbiran Makanan dan Ubat-ubatan (FDA) meliputi makanan, ubat-ubatan, kosmetik, bekalan perubatan, dan produk kesihatan. Kami memproses dokumen dengan teliti untuk kelulusan pantas.",
        "visa-work-permit": "Permohonan dan pembaharuan visa (Non-B, Non-O, dll.) serta perkhidmatan Permit Kerja untuk warga asing dari semua warganegara. Kami menguruskan kerja kertas yang rumit di satu tempat untuk penginapan dan pekerjaan yang sah di Thailand.",
        "boi-promotion": "Perkhidmatan permohonan promosi BOI untuk semua jenis perniagaan yang layak. Kami menyediakan perundingan mendalam dan menyediakan projek anda secara profesional supaya perniagaan anda mendapat faedah kerajaan yang maksimum.",
        "foreign-business": "Perkhidmatan permohonan Lesen Perniagaan Asing (FBL) dan Sijil (FBC). Kami menguruskan prosedur undang-undang dengan teliti selaras dengan nisbah pegangan saham asing atau keistimewaan BOI untuk operasi perniagaan yang stabil di Thailand."
    },
    hi: {
        "tourism-licence": "पर्यटन विभाग से पर्यटन व्यवसाय लाइसेंस आवेदन सेवाएं, जिसमें सभी संबंधित लाइसेंस शामिल हैं, यह सुनिश्चित करते हुए कि आपके टूर और यात्रा संचालन कानूनी रूप से और सुचारू रूप से चलें।",
        "thai-fda": "खाद्य, औषधि, सौंदर्य प्रसाधन, चिकित्सा आपूर्ति और स्वास्थ्य उत्पादों को कवर करने वाली खाद्य एवं औषधि प्रशासन (FDA) लाइसेंसिंग सेवाएं। हम तेजी से अनुमोदन के लिए दस्तावेजों को सख्ती से संसाधित करते हैं।",
        "visa-work-permit": "सभी राष्ट्रीयताओं के विदेशियों के लिए वीज़ा आवेदन और नवीनीकरण (Non-B, Non-O, आदि) और वर्क परमिट सेवाएं। हम थाईलैंड में कानूनी रूप से रहने और काम करने के लिए जटिल कागजी कार्रवाई को एक ही स्थान पर संभालते हैं।",
        "boi-promotion": "सभी पात्र व्यावसायिक प्रकारों के लिए BOI प्रोत्साहन आवेदन सेवाएं। हम गहन परामर्श प्रदान करते हैं और पेशेवर रूप से आपकी परियोजना तैयार करते हैं ताकि आपके व्यवसाय को अधिकतम सरकारी लाभ मिल सके।",
        "foreign-business": "विदेशी व्यवसाय लाइसेंस (FBL) और प्रमाणपत्र (FBC) आवेदन सेवाएं। हम थाईलैंड में स्थिर व्यापार संचालन के लिए विदेशी शेयरधारिता अनुपात या BOI विशेषाधिकारों के अनुरूप कानूनी प्रक्रियाओं का सावधानीपूर्वक प्रबंधन करते हैं।"
    },
    ta: {
        "tourism-licence": "சுற்றுலாத் துறையிலிருந்து சுற்றுலா வணிக உரிம விண்ணப்பச் சேவைகள், தொடர்புடைய அனைத்து உரிமங்கள் உட்பட, உங்கள் சுற்றுலா மற்றும் பயணச் செயல்பாடுகள் சட்டப்பூர்வமாகவும் சீராகவும் நடப்பதை உறுதிசெய்கிறது.",
        "thai-fda": "உணவு, மருந்துகள், அழகுசாதனப் பொருட்கள், மருத்துவப் பொருட்கள் மற்றும் சுகாதாரப் பொருட்களை உள்ளடக்கிய உணவு மற்றும் மருந்து நிர்வாக (FDA) உரிமச் சேவைகள். விரைவான ஒப்புதலுக்காக ஆவணங்களை நாங்கள் கடுமையாகச் செயலாக்குகிறோம்.",
        "visa-work-permit": "அனைத்து நாட்டு வெளிநாட்டினருக்கும் விசா விண்ணப்பம் மற்றும் புதுப்பித்தல் (Non-B, Non-O போன்றவை) மற்றும் பணி அனுமதிச் சேவைகள். தாய்லாந்தில் சட்டப்பூர்வமாக தங்குவதற்கும் வேலை செய்வதற்கும் சிக்கலான ஆவணங்களை ஒரே இடத்தில் நாங்கள் கையாளுகிறோம்.",
        "boi-promotion": "தகுதியான அனைத்து வணிக வகைகளுக்கும் BOI ஊக்குவிப்பு விண்ணப்பச் சேவைகள். உங்கள் வணிகம் அதிகபட்ச அரசு சலுகைகளைப் பெறுவதற்கு நாங்கள் ஆழமான ஆலோசனைகளை வழங்கி உங்கள் திட்டத்தை தொழில்முறையாகத் தயாரிக்கிறோம்.",
        "foreign-business": "வெளிநாட்டு வணிக உரிமம் (FBL) மற்றும் சான்றிதழ் (FBC) விண்ணப்பச் சேவைகள். தாய்லாந்தில் நிலையான வணிகச் செயல்பாடுகளுக்காக வெளிநாட்டுப் பங்கு விகிதங்கள் அல்லது BOI சலுகைகளுக்கு ஏற்ப சட்ட நடைமுறைகளை நாங்கள் கவனமாக நிர்வகிக்கிறோம்."
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

    if (data?.services?.items) {
        let updated = false;
        const items = data.services.items;

        ['tourism-licence', 'thai-fda', 'visa-work-permit', 'boi-promotion', 'foreign-business'].forEach(key => {
            if (items[key] && translations[key]) {
                items[key].summary = translations[key];
                updated = true;
            }
        });

        if (updated) {
            fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n', 'utf8');
            console.log(`✅ Updated licensing summaries for: ${file}`);
        }
    }
});
