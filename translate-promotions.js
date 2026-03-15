/**
 * Translate promotions data from Thai to 12 languages.
 * Updates: promotions.hub, promotions.ui, promotions.items (6 deals)
 * 
 * Run: node translate-promotions.js
 */
const fs = require('fs');
const path = require('path');
const MESSAGES_DIR = path.join(__dirname, 'src', 'messages');

// ─── Hub + UI translations per locale ───
const HUB_UI = {
  en: {
    hub: {
      hero: {
        title: "All Packages & Special Promotions",
        summary: "Discover the best deals and value-packed packages from us, designed to reduce costs and boost your ability to start a business. Choose the package that suits your needs and enjoy numerous benefits right here."
      },
      filters: {
        all: "All",
        registration: "Registration",
        amendment: "Corporate Amendments",
        accounting: "Accounting & Audit",
        license: "Licensing",
        marketing: "Digital Marketing"
      }
    },
    ui: {
      benefitsTitle: "Benefits You'll Receive",
      conditionsTitle: "Terms & Conditions",
      summaryTitle: "Package Summary",
      specialPrice: "Special Price",
      serviceRates: "Service Rates",
      freeAssessment: "Contact our team for a free price assessment — no hidden costs",
      chatViaLine: "Chat via LINE",
      callNow: "Call 092-882-5556",
      viewDetails: "View Promotion Details",
      andMore: "And much more...",
      drawerTitle: "Promotions & Privileges",
      emptyHub: "Sorry, there are currently no promotions in this category. Stay tuned for the latest deals coming soon.",
      otherContacts: "Other Contact Channels"
    }
  },
  'zh-Hans': {
    hub: {
      hero: {
        title: "所有套餐和特别促销",
        summary: "汇集我们最优惠的价格和超值套餐，帮助您降低成本并提升创业能力。在这里选择最适合您的套餐，享受众多优惠。"
      },
      filters: { all: "全部", registration: "注册", amendment: "企业变更", accounting: "会计与审计", license: "许可证", marketing: "数字营销" }
    },
    ui: {
      benefitsTitle: "您将获得的权益",
      conditionsTitle: "服务条款",
      summaryTitle: "套餐摘要",
      specialPrice: "特惠价",
      serviceRates: "服务费率",
      freeAssessment: "联系我们的团队获取免费报价评估——无隐藏费用",
      chatViaLine: "通过 LINE 聊天",
      callNow: "致电 092-882-5556",
      viewDetails: "查看促销详情",
      andMore: "以及更多...",
      drawerTitle: "促销与特权",
      emptyHub: "抱歉，该类别目前暂无促销活动。敬请期待最新优惠。",
      otherContacts: "其他联系方式"
    }
  },
  'zh-Hant': {
    hub: {
      hero: {
        title: "所有套餐和特別促銷",
        summary: "匯集我們最優惠的價格和超值套餐，幫助您降低成本並提升創業能力。在這裡選擇最適合您的套餐，享受眾多優惠。"
      },
      filters: { all: "全部", registration: "註冊", amendment: "企業變更", accounting: "會計與審計", license: "許可證", marketing: "數位行銷" }
    },
    ui: {
      benefitsTitle: "您將獲得的權益",
      conditionsTitle: "服務條款",
      summaryTitle: "套餐摘要",
      specialPrice: "特惠價",
      serviceRates: "服務費率",
      freeAssessment: "聯繫我們的團隊獲取免費報價評估——無隱藏費用",
      chatViaLine: "透過 LINE 聊天",
      callNow: "致電 092-882-5556",
      viewDetails: "查看促銷詳情",
      andMore: "以及更多...",
      drawerTitle: "促銷與特權",
      emptyHub: "抱歉，該類別目前暫無促銷活動。敬請期待最新優惠。",
      otherContacts: "其他聯繫方式"
    }
  },
  ja: {
    hub: {
      hero: {
        title: "全パッケージ＆特別プロモーション",
        summary: "コスト削減とビジネス立ち上げ力の向上を実現する、最もお得なパッケージをご用意しました。ニーズに合ったパッケージをお選びいただき、数多くの特典をお楽しみください。"
      },
      filters: { all: "すべて", registration: "登記", amendment: "法人変更", accounting: "会計・監査", license: "許認可", marketing: "デジタルマーケティング" }
    },
    ui: {
      benefitsTitle: "お受けいただける特典",
      conditionsTitle: "利用規約",
      summaryTitle: "パッケージ概要",
      specialPrice: "特別価格",
      serviceRates: "サービス料金",
      freeAssessment: "無料でお見積もり — 隠れた費用は一切ありません",
      chatViaLine: "LINEでチャット",
      callNow: "電話 092-882-5556",
      viewDetails: "プロモーション詳細を見る",
      andMore: "その他多数...",
      drawerTitle: "プロモーション＆特典",
      emptyHub: "申し訳ございませんが、このカテゴリには現在プロモーションがありません。最新のお得な情報にご期待ください。",
      otherContacts: "その他の連絡先"
    }
  },
  ko: {
    hub: {
      hero: {
        title: "모든 패키지 및 특별 프로모션",
        summary: "비용 절감과 사업 시작 능력 향상을 위한 최고의 패키지를 제공합니다. 필요에 맞는 패키지를 선택하고 다양한 혜택을 누리세요."
      },
      filters: { all: "전체", registration: "등기", amendment: "법인 변경", accounting: "회계 및 감사", license: "인허가", marketing: "디지털 마케팅" }
    },
    ui: {
      benefitsTitle: "받으실 수 있는 혜택",
      conditionsTitle: "이용 약관",
      summaryTitle: "패키지 요약",
      specialPrice: "특별 가격",
      serviceRates: "서비스 요금",
      freeAssessment: "무료 견적 상담 — 숨겨진 비용 없음",
      chatViaLine: "LINE으로 채팅",
      callNow: "전화 092-882-5556",
      viewDetails: "프로모션 상세 보기",
      andMore: "그외 다수...",
      drawerTitle: "프로모션 및 혜택",
      emptyHub: "죄송합니다. 현재 이 카테고리에는 프로모션이 없습니다. 최신 프로모션을 기대해 주세요.",
      otherContacts: "기타 연락처"
    }
  },
  de: {
    hub: {
      hero: {
        title: "Alle Pakete & Sonderaktionen",
        summary: "Entdecken Sie unsere besten Angebote und wertgeladenen Pakete, die Ihnen helfen, Kosten zu senken und Ihr Unternehmen erfolgreich zu starten. Wählen Sie das passende Paket und profitieren Sie von zahlreichen Vorteilen."
      },
      filters: { all: "Alle", registration: "Registrierung", amendment: "Firmenänderungen", accounting: "Buchhaltung & Prüfung", license: "Lizenzen", marketing: "Digitales Marketing" }
    },
    ui: {
      benefitsTitle: "Ihre Vorteile",
      conditionsTitle: "Geschäftsbedingungen",
      summaryTitle: "Paketübersicht",
      specialPrice: "Sonderpreis",
      serviceRates: "Servicegebühren",
      freeAssessment: "Kontaktieren Sie unser Team für eine kostenlose Preisbewertung — ohne versteckte Kosten",
      chatViaLine: "Chat über LINE",
      callNow: "Anrufen: 092-882-5556",
      viewDetails: "Aktionsdetails anzeigen",
      andMore: "Und vieles mehr...",
      drawerTitle: "Aktionen & Vorteile",
      emptyHub: "Leider gibt es derzeit keine Aktionen in dieser Kategorie. Bleiben Sie gespannt auf die neuesten Angebote.",
      otherContacts: "Weitere Kontaktmöglichkeiten"
    }
  },
  fr: {
    hub: {
      hero: {
        title: "Tous les forfaits et promotions spéciales",
        summary: "Découvrez nos meilleures offres et forfaits avantageux, conçus pour réduire vos coûts et faciliter le lancement de votre entreprise. Choisissez le forfait qui vous convient et profitez de nombreux avantages."
      },
      filters: { all: "Tous", registration: "Enregistrement", amendment: "Modifications d'entreprise", accounting: "Comptabilité et audit", license: "Licences", marketing: "Marketing digital" }
    },
    ui: {
      benefitsTitle: "Avantages inclus",
      conditionsTitle: "Conditions générales",
      summaryTitle: "Résumé du forfait",
      specialPrice: "Prix spécial",
      serviceRates: "Tarifs des services",
      freeAssessment: "Contactez notre équipe pour une évaluation gratuite — sans frais cachés",
      chatViaLine: "Discuter via LINE",
      callNow: "Appeler le 092-882-5556",
      viewDetails: "Voir les détails de la promotion",
      andMore: "Et bien plus encore...",
      drawerTitle: "Promotions et privilèges",
      emptyHub: "Désolé, il n'y a actuellement aucune promotion dans cette catégorie. Restez à l'affût des dernières offres.",
      otherContacts: "Autres moyens de contact"
    }
  },
  it: {
    hub: {
      hero: {
        title: "Tutti i pacchetti e le promozioni speciali",
        summary: "Scoprite le nostre migliori offerte e pacchetti vantaggiosi, pensati per ridurre i costi e facilitare l'avvio della vostra attività. Scegliete il pacchetto più adatto e approfittate dei numerosi vantaggi."
      },
      filters: { all: "Tutti", registration: "Registrazione", amendment: "Modifiche societarie", accounting: "Contabilità e revisione", license: "Licenze", marketing: "Marketing digitale" }
    },
    ui: {
      benefitsTitle: "Vantaggi inclusi",
      conditionsTitle: "Termini e condizioni",
      summaryTitle: "Riepilogo del pacchetto",
      specialPrice: "Prezzo speciale",
      serviceRates: "Tariffe dei servizi",
      freeAssessment: "Contattate il nostro team per una valutazione gratuita — senza costi nascosti",
      chatViaLine: "Chat tramite LINE",
      callNow: "Chiama 092-882-5556",
      viewDetails: "Vedi dettagli promozione",
      andMore: "E molto altro...",
      drawerTitle: "Promozioni e privilegi",
      emptyHub: "Spiacenti, al momento non ci sono promozioni in questa categoria. Restate in attesa delle ultime offerte.",
      otherContacts: "Altri canali di contatto"
    }
  },
  nl: {
    hub: {
      hero: {
        title: "Alle pakketten en speciale aanbiedingen",
        summary: "Ontdek onze beste aanbiedingen en voordelige pakketten, ontworpen om kosten te verlagen en uw bedrijfsstart te verbeteren. Kies het pakket dat bij u past en geniet van talrijke voordelen."
      },
      filters: { all: "Alle", registration: "Registratie", amendment: "Bedrijfswijzigingen", accounting: "Boekhouding & Audit", license: "Vergunningen", marketing: "Digitale Marketing" }
    },
    ui: {
      benefitsTitle: "Voordelen die u ontvangt",
      conditionsTitle: "Voorwaarden",
      summaryTitle: "Pakketoverzicht",
      specialPrice: "Speciale prijs",
      serviceRates: "Servicetarieven",
      freeAssessment: "Neem contact op met ons team voor een gratis prijsbeoordeling — geen verborgen kosten",
      chatViaLine: "Chat via LINE",
      callNow: "Bel 092-882-5556",
      viewDetails: "Bekijk actiedetails",
      andMore: "En nog veel meer...",
      drawerTitle: "Aanbiedingen & Voordelen",
      emptyHub: "Sorry, er zijn momenteel geen aanbiedingen in deze categorie. Houd de nieuwste aanbiedingen in de gaten.",
      otherContacts: "Andere contactkanalen"
    }
  },
  ms: {
    hub: {
      hero: {
        title: "Semua Pakej & Promosi Istimewa",
        summary: "Temui tawaran terbaik dan pakej berbaloi daripada kami, direka untuk mengurangkan kos dan meningkatkan keupayaan anda memulakan perniagaan. Pilih pakej yang sesuai dan nikmati pelbagai manfaat di sini."
      },
      filters: { all: "Semua", registration: "Pendaftaran", amendment: "Perubahan Korporat", accounting: "Perakaunan & Audit", license: "Pelesenan", marketing: "Pemasaran Digital" }
    },
    ui: {
      benefitsTitle: "Manfaat Yang Anda Akan Terima",
      conditionsTitle: "Terma & Syarat",
      summaryTitle: "Ringkasan Pakej",
      specialPrice: "Harga Istimewa",
      serviceRates: "Kadar Perkhidmatan",
      freeAssessment: "Hubungi pasukan kami untuk penilaian harga percuma — tiada caj tersembunyi",
      chatViaLine: "Sembang melalui LINE",
      callNow: "Hubungi 092-882-5556",
      viewDetails: "Lihat Butiran Promosi",
      andMore: "Dan banyak lagi...",
      drawerTitle: "Promosi & Keistimewaan",
      emptyHub: "Maaf, tiada promosi dalam kategori ini buat masa ini. Nantikan tawaran terkini yang akan datang.",
      otherContacts: "Saluran Hubungan Lain"
    }
  },
  hi: {
    hub: {
      hero: {
        title: "सभी पैकेज और विशेष प्रमोशन",
        summary: "हमारे सर्वोत्तम सौदों और मूल्य-पैक पैकेजों की खोज करें, जो लागत कम करने और व्यापार शुरू करने की आपकी क्षमता को बढ़ाने के लिए डिज़ाइन किए गए हैं। अपनी आवश्यकताओं के अनुसार पैकेज चुनें और यहीं अनेक लाभों का आनंद लें।"
      },
      filters: { all: "सभी", registration: "पंजीकरण", amendment: "कॉर्पोरेट संशोधन", accounting: "लेखांकन और ऑडिट", license: "लाइसेंसिंग", marketing: "डिजिटल मार्केटिंग" }
    },
    ui: {
      benefitsTitle: "आपको मिलने वाले लाभ",
      conditionsTitle: "नियम और शर्तें",
      summaryTitle: "पैकेज सारांश",
      specialPrice: "विशेष मूल्य",
      serviceRates: "सेवा दरें",
      freeAssessment: "हमारी टीम से संपर्क करें मुफ्त मूल्यांकन के लिए — कोई छिपी लागत नहीं",
      chatViaLine: "LINE पर चैट करें",
      callNow: "कॉल करें 092-882-5556",
      viewDetails: "प्रमोशन विवरण देखें",
      andMore: "और भी बहुत कुछ...",
      drawerTitle: "प्रमोशन और विशेषाधिकार",
      emptyHub: "क्षमा करें, इस श्रेणी में वर्तमान में कोई प्रमोशन नहीं है। नवीनतम ऑफ़र के लिए बने रहें।",
      otherContacts: "अन्य संपर्क चैनल"
    }
  },
  ta: {
    hub: {
      hero: {
        title: "அனைத்து பேக்கேஜ்கள் & சிறப்பு பிரமோஷன்கள்",
        summary: "செலவைக் குறைத்து வணிகத்தைத் தொடங்கும் உங்கள் திறனை மேம்படுத்த வடிவமைக்கப்பட்ட எங்களின் சிறந்த சலுகைகள் மற்றும் மதிப்புமிக்க பேக்கேஜ்களைக் கண்டறியுங்கள்."
      },
      filters: { all: "அனைத்தும்", registration: "பதிவு", amendment: "நிறுவன மாற்றங்கள்", accounting: "கணக்கியல் & தணிக்கை", license: "உரிமம்", marketing: "டிஜிட்டல் மார்க்கெட்டிங்" }
    },
    ui: {
      benefitsTitle: "நீங்கள் பெறும் சலுகைகள்",
      conditionsTitle: "விதிமுறைகள் & நிபந்தனைகள்",
      summaryTitle: "பேக்கேஜ் சுருக்கம்",
      specialPrice: "சிறப்பு விலை",
      serviceRates: "சேவை கட்டணங்கள்",
      freeAssessment: "இலவச விலை மதிப்பீட்டிற்கு எங்கள் குழுவைத் தொடர்பு கொள்ளுங்கள் — மறைவான கட்டணங்கள் இல்லை",
      chatViaLine: "LINE வழியாக அரட்டை",
      callNow: "அழைக்கவும் 092-882-5556",
      viewDetails: "பிரமோஷன் விவரங்களைக் காண",
      andMore: "மேலும் பலவும்...",
      drawerTitle: "பிரமோஷன்கள் & சிறப்புரிமைகள்",
      emptyHub: "மன்னிக்கவும், இந்த வகையில் தற்போது பிரமோஷன்கள் இல்லை. சமீபத்திய சலுகைகளுக்காக காத்திருங்கள்.",
      otherContacts: "பிற தொடர்பு வழிகள்"
    }
  }
};

// ─── Apply hub + UI translations ───
for (const [locale, data] of Object.entries(HUB_UI)) {
  const filePath = path.join(MESSAGES_DIR, `${locale}.json`);
  if (!fs.existsSync(filePath)) continue;
  const json = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

  if (json.promotions) {
    json.promotions.hub = data.hub;
    json.promotions.ui = data.ui;
  }

  fs.writeFileSync(filePath, JSON.stringify(json, null, 2) + '\n', 'utf-8');
  console.log(`✅ ${locale}.json — hub + UI translated`);
}

console.log('\nPart 1 done! Hub + UI keys translated for all 12 non-TH locales.');
console.log('Run translate-promotions-items.js next for promotion items.');
