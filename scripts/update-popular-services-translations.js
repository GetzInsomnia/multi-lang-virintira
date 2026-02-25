const fs = require('fs');
const path = require('path');

const localesPath = path.join(__dirname, '../src/messages');
const localeFiles = fs.readdirSync(localesPath).filter(file => file.endsWith('.json'));

// Hand-crafted translations aligning perfectly with the MegaMenu equivalent meaning.
const translations = {
    "en": {
        "registration": { title: "Company Registration", summary: "Complete registration for limited companies and partnerships with expert guidance." },
        "edit-info": { title: "Corporate information updates", summary: "Accurate, timely updates to critical company information." },
        "monthly-bookkeeping": { title: "Monthly Bookkeeping", summary: "Transaction recording, reconciliations, and IFRS-compliant statements." },
        "close-financial": { title: "Financial statement closing", summary: "Annual accounts prepared and closed efficiently for DBD and Revenue Department." },
        "tax-planning": { title: "Tax planning", summary: "Strategic tax structuring and advisory for optimized business operations." }
    },
    "th": {
        "registration": { title: "จดทะเบียนบริษัท", summary: "บริการจดทะเบียนบริษัท และหจก. แบบครบวงจร พร้อมให้คำปรึกษาโดยทีมงานมืออาชีพ" },
        "edit-info": { title: "แก้ไขข้อมูลนิติบุคคล", summary: "เปลี่ยนแปลงข้อมูลสำคัญของบริษัทอย่างถูกต้องและรวดเร็ว" },
        "monthly-bookkeeping": { title: "ทำบัญชีรายเดือน", summary: "ทำบัญชีและยื่นภาษีอย่างถูกต้อง ดูแลครบทุกเอกสารสำคัญ" },
        "close-financial": { title: "ปิดงบการเงิน", summary: "บริการปิดงบโดยผู้สอบบัญชีรับอนุญาต ตรวจสอบครบถ้วนมั่นใจได้" },
        "tax-planning": { title: "วางแผนภาษี", summary: "วางแผนภาษีให้ธุรกิจอย่างคุ้มค่า ลดความเสี่ยงและเพิ่มประสิทธิภาพ" }
    },
    "zh-Hans": {
        "registration": { title: "公司注册", summary: "在专家指导下完成有限公司和合伙企业的注册。" },
        "edit-info": { title: "公司信息变更", summary: "准确、及时地更新关键公司信息。" },
        "monthly-bookkeeping": { title: "月度记账", summary: "交易记录、对账和符合 IFRS 的财务报表。" },
        "close-financial": { title: "财务报表结算", summary: "高效编制年度账目，提交给商业发展局和税务局。" },
        "tax-planning": { title: "税务筹划", summary: "战略性税务结构和咨询，以优化业务运营。" }
    },
    "zh-TW": {
        "registration": { title: "公司註冊", summary: "在專家指導下完成有限公司和合夥企業的註冊。" },
        "edit-info": { title: "公司資訊變更", summary: "準確、及時地更新關鍵公司資訊。" },
        "monthly-bookkeeping": { title: "月度記帳", summary: "交易記錄、對帳和符合 IFRS 的財務報表。" },
        "close-financial": { title: "財務報表結算", summary: "高效編製年度帳目，提交給商業發展局和稅務局。" },
        "tax-planning": { title: "稅務籌劃", summary: "戰略性稅務結構和諮詢，以優化業務運營。" }
    },
    "ja": {
        "registration": { title: "会社設立", summary: "専門家の指導のもと、株式会社および合資会社の登録を完了します。" },
        "edit-info": { title: "法人情報の更新", summary: "会社の重要情報を正確かつ迅速に更新します。" },
        "monthly-bookkeeping": { title: "月次記帳", summary: "取引の記録、照合、およびIFRS準拠の財務諸表の作成。" },
        "close-financial": { title: "決算報告書の作成", summary: "事業開発局および歳入局へ効率的に年次決算書を作成し提出します。" },
        "tax-planning": { title: "税務プランニング", summary: "最適化された事業運営のための戦略的な税務構造とアドバイザリー。" }
    },
    "ko": {
        "registration": { title: "회사 설립", summary: "전문가의 지도 아래 유한회사 및 파트너십 등록을 완료합니다." },
        "edit-info": { title: "법인 정보 업데이트", summary: "중요한 회사 정보를 정확하고 신속하게 변경합니다." },
        "monthly-bookkeeping": { title: "월간 기장", summary: "거래 기록, 대조, 그리고 IFRS 준수 재무 제표 작성." },
        "close-financial": { title: "재무제표 결산", 초록: "DBD 및 국세청에 연간 계정을 효율적으로 준비하고 결산합니다." }, // wait, summary!
        "tax-planning": { title: "세무 계획", summary: "최적화된 비즈니스 운영을 위한 전략적 세무 구조 및 자문." }
    },
    "ms": {
        "registration": { title: "Pendaftaran Syarikat", summary: "Lengkapkan pendaftaran untuk syarikat berhad dan perkongsian dengan bimbingan pakar." },
        "edit-info": { title: "Kemas kini rekod korporat", summary: "Perubahan yang tepat dan tepat pada masanya kepada maklumat penting syarikat." },
        "monthly-bookkeeping": { title: "Simpan Kira Bulanan", summary: "Perekodan transaksi, penyesuaian, dan penyata patuh IFRS." },
        "close-financial": { title: "Penutupan penyata kewangan", summary: "Akaun tahunan disediakan dan ditutup dengan cekap untuk DBD dan Jabatan Hasil." },
        "tax-planning": { title: "Perancangan Cukai", summary: "Penstrukturan cukai strategik dan nasihat untuk operasi perniagaan yang dioptimumkan." }
    },
    "vi": {
        "registration": { title: "Đăng ký Công ty", summary: "Hoàn tất đăng ký công ty TNHH và công ty hợp danh dưới sự hướng dẫn của chuyên gia." },
        "edit-info": { title: "Cập nhật hồ sơ doanh nghiệp", summary: "Cập nhật thông tin công ty quan trọng một cách chính xác và kịp thời." },
        "monthly-bookkeeping": { title: "Ghi sổ hàng tháng", summary: "Ghi chép giao dịch, đối chiếu và báo cáo tuân thủ IFRS." },
        "close-financial": { title: "Quyết toán Báo cáo tài chính", summary: "Chuẩn bị và chốt tài khoản hàng năm hiệu quả cho DBD và Cục Thuế." },
        "tax-planning": { title: "Lập Kế hoạch Thuế", summary: "Cấu trúc thuế chiến lược và tư vấn để tối ưu hóa hoạt động kinh doanh." }
    },
    "ar": {
        "registration": { title: "تسجيل الشركات", summary: "إتمام تسجيل الشركات ذات المسؤولية المحدودة والشراكات بتوجيه من الخبراء." },
        "edit-info": { title: "تحديث سجلات الشركة", summary: "تحديثات دقيقة وفي الوقت المناسب لمعلومات الشركة الهامة." },
        "monthly-bookkeeping": { title: "مسك الدفاتر الشهري", summary: "تسجيل المعاملات والمطابقات والبيانات المتوافقة مع المعايير الدولية للإبلاغ المالي." },
        "close-financial": { title: "إغلاق البيانات المالية", summary: "إعداد وإغلاق الحسابات السنوية بكفاءة لوزارة تطوير الأعمال وإدارة الإيرادات." },
        "tax-planning": { title: "التخطيط الضريبي", summary: "هيكلة واستشارات ضريبية استراتيجية لتحسين العمليات التجارية." }
    },
    "km": {
        "registration": { title: "ការចុះបញ្ជីក្រុមហ៊ុន", summary: "បញ្ចប់ការចុះបញ្ជីក្រុមហ៊ុនទទួលខុសត្រូវមានកម្រិត និងភាពជាដៃគូ ដោយមានការណែនាំពីអ្នកជំនាញ។" },
        "edit-info": { title: "ការធ្វើបច្ចុប្បន្នភាពកំណត់ត្រាក្រុមហ៊ុន", summary: "ការផ្លាស់ប្តូរព័ត៌មានក្រុមហ៊ុនសំខាន់ៗបានត្រឹមត្រូវនិងទាន់ពេលវេលា។" },
        "monthly-bookkeeping": { title: "ការធ្វើសៀវភៅគណនេយ្យប្រចាំខែ", summary: "ការកត់ត្រាប្រតិបត្តិការ ការសម្រុះសម្រួល និងរបាយការណ៍ហិรញ្ញវត្ថុស្របតាម IFRS ។" },
        "close-financial": { title: "ការបិទរបាយការណ៍ហិរញ្ញវត្ថុ", summary: "គណនីប្រចាំឆ្នាំត្រូវបានរៀបចំ និងបិទយ៉ាងមានប្រសិទ្ធភាពសម្រាប់ DBD និងនាយកដ្ឋានចំណូល។" },
        "tax-planning": { title: "ការរៀបចំផែនការទាក់ទងពន្ធ", summary: "រចនាសម្ព័ន្ធពន្ធជាយុទ្ធសាស្ត្រ និងការប្រឹក្សាសម្រាប់ប្រតិបត្តិការអាជីវកម្មដែលបានធ្វើឱ្យប្រសើរឡើង។" }
    },
    "lo": {
        "registration": { title: "ການຈົດທະບຽນບໍລິສັດ", summary: "ສຳເລັດການຈົດທະບຽນບໍລິສັດຈຳກັດ ແລະ ຮຸ້ນສ່ວນ ໂດຍມີຜູ້ຊ່ຽວຊານໃຫ້ຄຳແນະນຳ." },
        "edit-info": { title: "ການປັບປຸງຂໍ້ມູນອົງກອນ", summary: "ການປ່ຽນແປງຂໍ້ມູນສຳຄັນຂອງບໍລິສັດຢ່າງຖືກຕ້ອງແລະທັນເວລາ." },
        "monthly-bookkeeping": { title: "ການເຮັດບັນຊີລາຍເດືອນ", summary: "ການບັນທຶກທຸລະກຳ, ການກະກຽມ ແລະ ບົດລາຍງານທີ່ສອດຄ່ອງກັບ IFRS." },
        "close-financial": { title: "ການປິດງົບການເງິນ", summary: "ບັນຊີປະຈຳປີຖືກຈັດກຽມ ແລະ ປິດຢ່າງມີປະສິດທິຜົນສຳລັບ DBD ແລະ ກົມສ່ວຍສາອາກອນ." },
        "tax-planning": { title: "ການວາງແຜນພາສີ", summary: "ໂຄງສ້າງພາສີຍຸດທະສາດ ແລະ ການໃຫ້ຄຳປຶກສາເພື່ອປັບປຸງການດຳເນີນທຸລະກິດ." }
    },
    "my": {
        "registration": { title: "ကုမ္ပဏီမှတ်ပုံတင်ခြင်း", summary: "ကျွမ်းကျင်သူများ၏ လမ်းညွှန်မှုဖြင့် လီမိတက်ကုမ္ပဏီများနှင့် မိတ်ဖက်အဖွဲ့အစည်းများအတွက် မှတ်ပုံတင်ခြင်းကို ပြီးစီးစေပါသည်။" },
        "edit-info": { title: "ကော်ပိုရိတ်မှတ်တမ်းမွမ်းမံမှုများ", summary: "အရေးကြီးသော ကုမ္ပဏီအချက်အလက်ကို တိကျမှန်ကန်ပြီး အချိန်မီ ပြောင်းလဲခြင်း။" },
        "monthly-bookkeeping": { title: "လစဉ်စာရင်းကိုင်", summary: "ငွေလွှဲမှတ်တမ်းတင်ခြင်း၊ စာရင်းညှိနှိုင်းခြင်းနှင့် IFRS နှင့်ကိုက်ညီသော ရှင်းတမ်းများ။" },
        "close-financial": { title: "ဘဏ္ဍာရေးရှင်းတမ်းပိတ်ခြင်း", summary: "DBD နှင့် အခွန်ဦးစီးဌာနအတွက် လျင်မြန်စွာ နှစ်စဉ်စာရင်းများကို ပြင်ဆင်ပြီး ပိတ်ပါသည်။" },
        "tax-planning": { title: "အခွန်စီမံကိန်း", summary: "အကောင်းဆုံးသော စီးပွားရေးလုပ်ငန်းများအတွက် မဟာဗျူဟာမြောက် အခွန်ဖွဲ့စည်းပုံနှင့် အကြံပေးခြင်း။" }
    },
    "tl": {
        "registration": { title: "Pagpaparehistro ng Kumpanya", summary: "Kumpletuhin ang pagpaparehistro para sa mga limitadong kumpanya at pakikipagsosyo gamit ang ekspertong patnubay." },
        "edit-info": { title: "Mga pagbabago sa corporate record", summary: "Tumpak at napapanahong pagbabago sa mahalagang impormasyon ng kumpanya." },
        "monthly-bookkeeping": { title: "Buwanang Bookkeeping", summary: "Pagtatala ng transaksyon, pagkakasundo, at mga pahayag na sumusunod sa IFRS." },
        "close-financial": { title: "Pagsasara ng financial statement", summary: "Ang mga taunang account ay inihanda at isinara nang mahusay para sa DBD at Revenue Department." },
        "tax-planning": { title: "Pagpaplano ng buwis", summary: "Estratehikong pagbubuo ng buwis at pagpapayo para sa na-optimize na operasyon ng negosyo." }
    },
    "de": {
        "registration": { title: "Unternehmensgründung", summary: "Komplette Registrierung für GmbHs und Personengesellschaften mit fachkundiger Begleitung." },
        "edit-info": { title: "Aktualisierung von Unternehmensdaten", summary: "Genaue und zeitnahe Updates wichtiger Unternehmensinformationen." },
        "monthly-bookkeeping": { title: "Monatliche Buchhaltung", summary: "Transaktionserfassung, Abstimmungen und IFRS-konforme Abschlüsse." },
        "close-financial": { title: "Jahresabschluss", summary: "Effiziente Erstellung und Abschluss der Jahresabschlüsse für das DBD und das Finanzamt." },
        "tax-planning": { title: "Steuerplanung", summary: "Strategische Steuergestaltung und Beratung für optimierte Geschäftsabläufe." }
    },
    "fr": {
        "registration": { title: "Création d'entreprise", summary: "Enregistrement complet pour les sociétés à responsabilité limitée et les partenariats avec des conseils d'experts." },
        "edit-info": { title: "Mises à jour des informations de l'entreprise", summary: "Mises à jour précises et rapides des informations critiques de l'entreprise." },
        "monthly-bookkeeping": { title: "Tenue de livres mensuelle", summary: "Enregistrement des transactions, rapprochements et déclarations conformes aux normes IFRS." },
        "close-financial": { title: "Clôture des états financiers", summary: "Comptes annuels préparés et clôturés efficacement pour le DBD et le département des revenus." },
        "tax-planning": { title: "Planification fiscale", summary: "Structuration et conseils fiscaux stratégiques pour des opérations commerciales optimisées." }
    },
    "hi": {
        "registration": { title: "कंपनी पंजीकरण", summary: "विशेषज्ञ मार्गदर्शन के साथ सीमित कंपनियों और साझेदारी के लिए पूर्ण पंजीकरण।" },
        "edit-info": { title: "कॉर्पोरेट जानकारी अपडेट", summary: "महत्वपूर्ण कंपनी जानकारी के लिए सटीक और समय पर अपडेट।" },
        "monthly-bookkeeping": { title: "मासिक बहीखाता", summary: "लेनदेन रिकॉर्डिंग, समाधान और IFRS-अनुपालन विवरण।" },
        "close-financial": { title: "वित्तीय विवरण समापन", summary: "DBD और राजस्व विभाग के लिए कुशलतापूर्वक तैयार और बंद किए गए वार्षिक खाते।" },
        "tax-planning": { title: "कर योजना", summary: "अनुकूलित व्यावसायिक संचालन के लिए रणनीतिक कर संरचना और सलाह।" }
    },
    "it": {
        "registration": { title: "Registrazione aziendale", summary: "Registrazione completa per società a responsabilità limitata e partnership con la guida di esperti." },
        "edit-info": { title: "Aggiornamenti delle informazioni aziendali", summary: "Aggiornamenti accurati e tempestivi alle informazioni critiche dell'azienda." },
        "monthly-bookkeeping": { title: "Contabilità mensile", summary: "Registrazione delle transazioni, riconciliazioni e dichiarazioni conformes agli IFRS." },
        "close-financial": { title: "Chiusura del bilancio", summary: "Conti annuali preparati e chiusi in modo efficiente per il DBD e il dipartimento delle entrate." },
        "tax-planning": { title: "Pianificazione fiscale", summary: "Strutturazione fiscale strategica e consulenza per operazioni aziendali ottimizzate." }
    },
    "nl": {
        "registration": { title: "Bedrijfsregistratie", summary: "Volledige registratie voor naamloze vennootschappen en partnerschappen met deskundige begeleiding." },
        "edit-info": { title: "Updates van bedrijfsinformatie", summary: "Nauwkeurige, tijdige updates van kritieke bedrijfsinformatie." },
        "monthly-bookkeeping": { title: "Maandelijkse boekhouding", summary: "Transactieregistratie, afstemmingen en IFRS-conforme overzichten." },
        "close-financial": { title: "Afsluiting financiële overzichten", summary: "Jaarrekeningen efficiënt opgesteld en afgesloten voor het DBD en de belastingdienst." },
        "tax-planning": { title: "Fiscale planning", summary: "Strategische fiscale structurering en advies voor geoptimaliseerde bedrijfsvoering." }
    },
    "ta": {
        "registration": { title: "நிறுவன பதிவு", summary: "நிபுணர் வழிகாட்டுதலுடன் வரையறுக்கப்பட்ட நிறுவனங்கள் மற்றும் கூட்டாண்மைகளுக்கான முழுமையான பதிவு." },
        "edit-info": { title: "நிறுவன தகவல் புதுப்பிப்புகள்", summary: "முக்கியமான நிறுவன தகவல்களுக்கு துல்லியமான, சரியான நேர புதுப்பிப்புகள்." },
        "monthly-bookkeeping": { title: "மாதாந்திர கணக்குப்பதிவு", summary: "பரிவர்த்தனை பதிவு, சமரசங்கள் மற்றும் IFRS-இணக்க அறிக்கைகள்." },
        "close-financial": { title: "நிதி அறிக்கை முடித்தல்", summary: "DBD மற்றும் வருவாய் துறைக்கு திறமையாக தயாரிக்கப்பட்டு முடிக்கப்பட்ட ஆண்டு கணக்குகள்." },
        "tax-planning": { title: "வரி திட்டமிடல்", summary: "உகந்த வணிக செயல்பாடுகளுக்கான மூலோபாய வரி கட்டமைப்பு மற்றும் ஆலோசனை." }
    },
    "zh-Hant": {
        "registration": { title: "公司註冊", summary: "在專家指導下完成有限公司和合夥企業的註冊。" },
        "edit-info": { title: "公司資訊變更", summary: "準確、及時地更新關鍵公司資訊。" },
        "monthly-bookkeeping": { title: "月度記帳", summary: "交易記錄、對帳和符合 IFRS 的財務報表。" },
        "close-financial": { title: "財務報表結算", summary: "高效編製年度帳目，提交給商業發展局和稅務局。" },
        "tax-planning": { title: "稅務籌劃", summary: "戰略性稅務結構和諮詢，以優化業務運營。" }
    }
};

// Fix the typo in 'ko'
translations['ko']['close-financial'].summary = "DBD 및 국세청에 연간 계정을 효율적으로 준비하고 결산합니다.";
delete translations['ko']['close-financial']['초록'];

for (const file of localeFiles) {
    const locale = file.replace('.json', '');
    if (!translations[locale]) {
        console.log(`Skipping ${locale} - no translations mapped.`);
        continue;
    }

    const filePath = path.join(localesPath, file);
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

    // Update services.items
    if (data.services && data.services.items) {
        const services = data.services.items;
        const slugs = ["registration", "edit-info", "monthly-bookkeeping", "close-financial", "tax-planning"];
        for (const slug of slugs) {
            if (!services[slug]) {
                services[slug] = {};
            }
            services[slug].title = translations[locale][slug].title;
            services[slug].summary = translations[locale][slug].summary;
        }
    }

    // Also replace home.services.items safely if it exists (so they completely match and no discrepancies exist)
    if (data.home && data.home.services && Array.isArray(data.home.services.items)) {
        data.home.services.items = [
            {
                title: translations[locale]["registration"].title,
                description: translations[locale]["registration"].summary
            },
            {
                title: translations[locale]["edit-info"].title,
                description: translations[locale]["edit-info"].summary
            },
            {
                title: translations[locale]["monthly-bookkeeping"].title,
                description: translations[locale]["monthly-bookkeeping"].summary
            },
            {
                title: translations[locale]["close-financial"].title,
                description: translations[locale]["close-financial"].summary
            },
            {
                title: translations[locale]["tax-planning"].title,
                description: translations[locale]["tax-planning"].summary
            }
        ];
    }

    fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n');
    console.log(`Succesfully updated translations for ${file}`);
}
