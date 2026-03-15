/**
 * Translate promotion items for Asian languages (ms, hi, ta).
 * Run: node translate-promotions-items-asia.js
 */
const fs = require('fs');
const path = require('path');
const MESSAGES_DIR = path.join(__dirname, 'src', 'messages');

const enJson = JSON.parse(fs.readFileSync(path.join(MESSAGES_DIR, 'en.json'), 'utf-8'));
const enItems = enJson.promotions.items;

const TRANSLATIONS = {
  ms: {
    meta: { title: "Virintira | Promosi", description: "Tawaran terbaik dan pakej berbaloi untuk memulakan perniagaan anda." },
    overrides: {
      "company-registration-deal": { title: "Pendaftaran Syarikat Sendirian Berhad", price: "Bermula RM 9,900 THB", originalPrice: "Bermula 12,900", shortInfo: ["Yuran kerajaan termasuk — tiada caj tambahan","Tiada kewajiban kontrak simpan kira bulanan","Pengesahan identiti dalam talian — tiada perlu ke pejabat","Percuma! Perundingan dan penyediaan dokumen lengkap","Percuma! Set penuh sijil syarikat (DBD)","Percuma! Cop syarikat automatik (1 unit)","Percuma! Dokumen untuk pembukaan akaun bank","Percuma! Pendaftaran kata laluan DBD e-Filing","Percuma! Pendaftaran kata laluan Jabatan Hasil","Percuma! Kad nama untuk resit/invois cukai","Percuma! Kursus teknik cukai (bernilai 5,900 THB)"], pricingTiers: [{name:"Pemegang saham warganegara Thai sahaja",price:"9,900",originalPrice:"12,900"},{name:"Pemegang saham asing ≤ 49%",price:"12,900",originalPrice:"15,900"},{name:"100% milik asing",price:"15,900",originalPrice:"18,900"},{name:"Pemegang saham korporat",price:"19,900",originalPrice:"22,900"}], benefits: ["<b>Satu harga, semua termasuk! Yuran kerajaan termasuk</b>","<b>Kebebasan memilih — tiada kontrak wajib</b>","<b>Pengesahan identiti dalam talian (e-KYC)</b>","<b>Percuma! Perundingan pakar dan penyediaan dokumen</b>","<b>Percuma! Kit permulaan perniagaan</b>","<b>Eksklusif! Kursus teknik cukai (5,900 THB)</b>"], conditions: "• Modal ≤ 5M THB termasuk. Melebihi: 3,000 THB/juta.\n• Pendaftaran elektronik melalui DBD Biz Regist." },
      "partnership-registration-deal": { title: "Pendaftaran Perkongsian Terhad", price: "Bermula 5,900 THB", originalPrice: "Bermula 8,900", shortInfo: ["Yuran kerajaan termasuk","Tiada kontrak wajib","Pengesahan dalam talian","Percuma! Perundingan lengkap","Percuma! Sijil perkongsian (DBD)","Percuma! Cop (1 unit)","Percuma! Dokumen bank","Percuma! Pendaftaran DBD","Percuma! Pendaftaran cukai","Percuma! Kad nama","Percuma! Kursus cukai (5,900 THB)"], pricingTiers: [{name:"Rakan kongsi Thai sahaja",price:"5,900",originalPrice:"8,900"},{name:"Rakan kongsi asing ≤ 49%",price:"8,900",originalPrice:"11,900"}], benefits: ["<b>Semua termasuk!</b>","<b>Tiada kontrak wajib</b>","<b>Pengesahan dalam talian</b>","<b>Perundingan percuma</b>","<b>Kit permulaan percuma</b>","<b>Kursus cukai eksklusif</b>"], conditions: "• Modal ≤ 5M THB termasuk." },
      "commercial-shop-registration-deal": { title: "Pendaftaran Kedai Komersial", price: "Bermula 3,500 THB", originalPrice: "Bermula 5,500", shortInfo: ["Yuran termasuk","Dalam talian dan fizikal","Kami uruskan semua","Sijil pantas","Kredibiliti 100%","Sedia untuk pinjaman"], pricingTiers: [], benefits: ["<b>Semua termasuk!</b>","<b>Dalam talian dan fizikal</b>","<b>Tanpa kerumitan</b>","<b>Sijil pantas</b>","<b>Kredibiliti dijamin</b>","<b>Pengembangan perniagaan</b>"], conditions: "Kadar Bangkok. Tambahan mungkin dikenakan di luar kawasan." },
      "monthly-bookkeeping-and-tax-bundle": { title: "Pakej Simpan Kira & Cukai Bulanan", price: "Bermula 1,500 THB/bulan", originalPrice: "Bermula 2,500/bulan", shortInfo: ["Simpan kira lengkap dan tepat","Penyerahan cukai tepat waktu","Ringkasan penyata kewangan bulanan"], pricingTiers: [{name:"Saiz S\n(≤ 50 dokumen/bulan)",price:"2,500",originalPrice:"3,500"},{name:"Saiz M\n(≤ 70 dokumen/bulan)",price:"3,000",originalPrice:"4,000"},{name:"Saiz L\n(≤ 100 dokumen/bulan)",price:"3,500",originalPrice:"4,500"},{name:"Saiz XL\n(> 100 dokumen/bulan)",price:"Hubungi untuk sebut harga"},{name:"Laporan kosong\n(Setiap jenis)",price:"500",originalPrice:"700"}], benefits: ["Simpan kira pendapatan/perbelanjaan","Penyediaan dan penyerahan borang cukai","Caruman keselamatan sosial","Perundingan percuma sepanjang kontrak"], conditions: "Harga bergantung kepada jumlah dokumen dan kerumitan." },
      "individual-tax-clearing": { title: "Penjelasan Cukai Pendapatan Peribadi", price: "Bermula 2,500 THB", originalPrice: "Bermula 4,500", shortInfo: ["Pemotongan maksimum","Selesaikan tunggakan","Penyerahan tepat waktu","Pengurusan dokumen","Perancangan cukai","Nasihat penubuhan syarikat"], pricingTiers: [], benefits: ["<b>Pemotongan cukai maksimum</b>","<b>Pengurusan dokumen</b>","<b>Penyelesaian tunggakan</b>","<b>Perwakilan cukai</b>","<b>Sentiasa tepat waktu</b>","<b>Nasihat pertumbuhan</b>"], conditions: "Kadar bergantung kepada kerumitan. Kos perjalanan tidak termasuk." },
      "close-financial-deal": { title: "Penutupan Penyata Kewangan Tahunan", price: "Bermula 9,900 THB", originalPrice: "Bermula 12,900", shortInfo: ["Audit oleh CPA","100% patuh undang-undang","PND.50 dan e-Filing"], pricingTiers: [], benefits: ["Audit dan pensijilan tahunan","Penyata cukai korporat (PND.50)","Penyerahan melalui DBD e-Filing","Senarai pemegang saham"], conditions: "Yuran audit bergantung kepada saiz dan kerumitan." }
    }
  },
  hi: {
    meta: { title: "Virintira | प्रमोशन", description: "व्यापार शुरू करने के लिए सर्वोत्तम सौदे और मूल्य-पैक पैकेज।" },
    overrides: {
      "company-registration-deal": { title: "प्राइवेट लिमिटेड कंपनी पंजीकरण", price: "9,900 THB से शुरू", originalPrice: "12,900 से शुरू", shortInfo: ["सरकारी शुल्क शामिल — कोई अतिरिक्त चार्ज नहीं","मासिक बुककीपिंग अनुबंध की बाध्यता नहीं","ऑनलाइन पहचान सत्यापन — यात्रा की आवश्यकता नहीं","मुफ्त! परामर्श और पूर्ण दस्तावेज़ तैयारी","मुफ्त! कंपनी प्रमाणपत्र पूर्ण सेट (DBD)","मुफ्त! ऑटो-इंक कंपनी स्टैम्प (1 पीस)","मुफ्त! बैंक खाता खोलने के दस्तावेज़","मुफ्त! DBD e-Filing पासवर्ड पंजीकरण","मुफ्त! राजस्व विभाग पासवर्ड पंजीकरण","मुफ्त! रसीद/कर चालान के लिए विजिटिंग कार्ड","मुफ्त! कर तकनीक प्रशिक्षण पाठ्यक्रम (5,900 THB मूल्य)"], pricingTiers: [{name:"सभी थाई शेयरधारक",price:"9,900",originalPrice:"12,900"},{name:"विदेशी शेयरधारक ≤ 49%",price:"12,900",originalPrice:"15,900"},{name:"100% विदेशी स्वामित्व",price:"15,900",originalPrice:"18,900"},{name:"कॉर्पोरेट शेयरधारक",price:"19,900",originalPrice:"22,900"}], benefits: ["<b>एक कीमत, सब शामिल!</b>","<b>चुनने की स्वतंत्रता</b>","<b>ऑनलाइन पहचान सत्यापन (e-KYC)</b>","<b>मुफ्त! विशेषज्ञ परामर्श</b>","<b>मुफ्त! बिजनेस स्टार्टर किट</b>","<b>विशेष! कर प्रशिक्षण पाठ्यक्रम (5,900 THB)</b>"], conditions: "• पूंजी ≤ 5M THB शामिल। इससे अधिक: 3,000 THB/मिलियन।" },
      "partnership-registration-deal": { title: "सीमित भागीदारी पंजीकरण", price: "5,900 THB से शुरू", originalPrice: "8,900 से शुरू", shortInfo: ["सरकारी शुल्क शामिल","कोई बाध्यता नहीं","ऑनलाइन सत्यापन","मुफ्त! परामर्श","मुफ्त! प्रमाणपत्र","मुफ्त! स्टैम्प","मुफ्त! बैंक दस्तावेज","मुफ्त! DBD पंजीकरण","मुफ्त! कर पंजीकरण","मुफ्त! विजिटिंग कार्ड","मुफ्त! कर प्रशिक्षण (5,900 THB)"], pricingTiers: [{name:"सभी थाई भागीदार",price:"5,900",originalPrice:"8,900"},{name:"विदेशी भागीदार ≤ 49%",price:"8,900",originalPrice:"11,900"}], benefits: ["<b>सब शामिल!</b>","<b>कोई बाध्यता नहीं</b>","<b>ऑनलाइन सत्यापन</b>","<b>मुफ्त परामर्श</b>","<b>मुफ्त स्टार्टर किट</b>","<b>कर प्रशिक्षण</b>"], conditions: "• पूंजी ≤ 5M THB शामिल।" },
      "commercial-shop-registration-deal": { title: "वाणिज्यिक दुकान पंजीकरण", price: "3,500 THB से शुरू", originalPrice: "5,500 से शुरू", shortInfo: ["शुल्क शामिल","ऑनलाइन और भौतिक","सब हम करते हैं","तेज़ प्रमाणपत्र","100% विश्वसनीय","ऋण के लिए तैयार"], pricingTiers: [], benefits: ["<b>सब शामिल!</b>","<b>ऑनलाइन और भौतिक</b>","<b>बिना झंझट</b>","<b>तेज़ प्रमाणपत्र</b>","<b>विश्वसनीयता</b>","<b>व्यापार विस्तार</b>"], conditions: "बैंकॉक क्षेत्र के लिए मानक दरें।" },
      "monthly-bookkeeping-and-tax-bundle": { title: "मासिक बुककीपिंग और कर पैकेज", price: "1,500 THB/माह से शुरू", originalPrice: "2,500/माह से शुरू", shortInfo: ["पूर्ण और सटीक बुककीपिंग","समय पर कर रिटर्न","मासिक वित्तीय सारांश"], pricingTiers: [{name:"S साइज़\n(≤ 50 दस्तावेज़/माह)",price:"2,500",originalPrice:"3,500"},{name:"M साइज़\n(≤ 70 दस्तावेज़/माह)",price:"3,000",originalPrice:"4,000"},{name:"L साइज़\n(≤ 100 दस्तावेज़/माह)",price:"3,500",originalPrice:"4,500"},{name:"XL साइज़\n(> 100 दस्तावेज़/माह)",price:"संपर्क करें"},{name:"खाली रिपोर्ट\n(प्रति प्रकार)",price:"500",originalPrice:"700"}], benefits: ["आय/व्यय बुककीपिंग","कर रिटर्न तैयारी और दाखिल","सामाजिक सुरक्षा अंशदान","अनुबंध अवधि में मुफ्त परामर्श"], conditions: "मूल्य दस्तावेज़ संख्या और जटिलता पर निर्भर।" },
      "individual-tax-clearing": { title: "व्यक्तिगत आयकर निपटान", price: "2,500 THB से शुरू", originalPrice: "4,500 से शुरू", shortInfo: ["अधिकतम कटौती","बकाया कर समाधान","समय पर दाखिल","दस्तावेज़ प्रबंधन","कर नियोजन","कंपनी बनाने की सलाह"], pricingTiers: [], benefits: ["<b>अधिकतम कर कटौती</b>","<b>दस्तावेज़ प्रबंधन</b>","<b>बकाया समाधान</b>","<b>कर प्रतिनिधित्व</b>","<b>हमेशा समय पर</b>","<b>वृद्धि परामर्श</b>"], conditions: "शुल्क जटिलता पर निर्भर। यात्रा खर्च शामिल नहीं।" },
      "close-financial-deal": { title: "वार्षिक वित्तीय विवरण समापन", price: "9,900 THB से शुरू", originalPrice: "12,900 से शुरू", shortInfo: ["CPA द्वारा ऑडिट","100% कानूनी अनुपालन","PND.50 और e-Filing"], pricingTiers: [], benefits: ["वार्षिक ऑडिट और प्रमाणन","कॉर्पोरेट आयकर रिटर्न (PND.50)","DBD e-Filing द्वारा जमा","शेयरधारक सूची"], conditions: "ऑडिट शुल्क व्यवसाय के आकार पर निर्भर।" }
    }
  },
  ta: {
    meta: { title: "Virintira | பிரமோஷன்கள்", description: "வணிகம் தொடங்க சிறந்த சலுகைகள் மற்றும் மதிப்புமிக்க பேக்கேஜ்கள்." },
    overrides: {
      "company-registration-deal": { title: "பிரைவேட் லிமிடெட் நிறுவனப் பதிவு", price: "9,900 THB இலிருந்து", originalPrice: "12,900 இலிருந்து", shortInfo: ["அரசாங்க கட்டணங்கள் உள்ளடக்கம்","மாதாந்திர கணக்கியல் ஒப்பந்தம் கட்டாயமில்லை","ஆன்லைன் அடையாள சரிபார்ப்பு","இலவசம்! ஆலோசனை மற்றும் ஆவணம்","இலவசம்! நிறுவனச் சான்றிதழ்கள் (DBD)","இலவசம்! நிறுவன முத்திரை (1 பீஸ்)","இலவசம்! வங்கி ஆவணங்கள்","இலவசம்! DBD பதிவு","இலவசம்! வரி பதிவு","இலவசம்! விசிட்டிங் கார்டு","இலவசம்! வரி பயிற்சி (5,900 THB)"], pricingTiers: [{name:"தாய் பங்குதாரர்கள் மட்டும்",price:"9,900",originalPrice:"12,900"},{name:"வெளிநாட்டு பங்குதாரர் ≤ 49%",price:"12,900",originalPrice:"15,900"},{name:"100% வெளிநாட்டு உரிமை",price:"15,900",originalPrice:"18,900"},{name:"கார்ப்பரேட் பங்குதாரர்",price:"19,900",originalPrice:"22,900"}], benefits: ["<b>ஒரே விலை, அனைத்தும் உள்ளடக்கம்!</b>","<b>தேர்வு சுதந்திரம்</b>","<b>ஆன்லைன் சரிபார்ப்பு (e-KYC)</b>","<b>இலவச ஆலோசனை</b>","<b>இலவச ஸ்டார்ட்டர் கிட்</b>","<b>சிறப்பு! வரி பயிற்சி (5,900 THB)</b>"], conditions: "• மூலதனம் ≤ 5M THB உள்ளடக்கம்." },
      "partnership-registration-deal": { title: "கூட்டாண்மை நிறுவனப் பதிவு", price: "5,900 THB இலிருந்து", originalPrice: "8,900 இலிருந்து", shortInfo: ["கட்டணங்கள் உள்ளடக்கம்","கட்டாயமில்லை","ஆன்லைன் சரிபார்ப்பு","இலவச ஆலோசனை","இலவச சான்றிதழ்கள்","இலவச முத்திரை","இலவச வங்கி ஆவணம்","இலவச DBD பதிவு","இலவச வரி பதிவு","இலவச கார்டு","இலவச வரி பயிற்சி"], pricingTiers: [{name:"தாய் கூட்டாளிகள் மட்டும்",price:"5,900",originalPrice:"8,900"},{name:"வெளிநாட்டு கூட்டாளி ≤ 49%",price:"8,900",originalPrice:"11,900"}], benefits: ["<b>அனைத்தும் உள்ளடக்கம்!</b>","<b>கட்டாயமில்லை</b>","<b>ஆன்லைன் சரிபார்ப்பு</b>","<b>இலவச ஆலோசனை</b>","<b>இலவச கிட்</b>","<b>வரி பயிற்சி</b>"], conditions: "• மூலதனம் ≤ 5M THB உள்ளடக்கம்." },
      "commercial-shop-registration-deal": { title: "வணிகக் கடைப் பதிவு", price: "3,500 THB இலிருந்து", originalPrice: "5,500 இலிருந்து", shortInfo: ["கட்டணம் உள்ளடக்கம்","ஆன்லைன் & ஆஃப்லைன்","அனைத்தும் நாங்கள்","விரைவான சான்றிதழ்","100% நம்பகத்தன்மை","கடன் தயார்"], pricingTiers: [], benefits: ["<b>அனைத்தும் உள்ளடக்கம்!</b>","<b>ஆன்லைன் & ஆஃப்லைன்</b>","<b>சிரமம் இல்லை</b>","<b>விரைவு சான்றிதழ்</b>","<b>நம்பகத்தன்மை</b>","<b>வணிக விரிவாக்கம்</b>"], conditions: "பாங்காக் பகுதிக்கான நிலையான கட்டணம்." },
      "monthly-bookkeeping-and-tax-bundle": { title: "மாதாந்திர கணக்கியல் & வரி பேக்கேஜ்", price: "1,500 THB/மாதம் இலிருந்து", originalPrice: "2,500/மாதம்", shortInfo: ["முழுமையான கணக்கியல்","சரியான நேரத்தில் வரி தாக்கல்","மாதாந்திர நிதி சுருக்கம்"], pricingTiers: [{name:"S அளவு\n(≤ 50 ஆவணம்/மாதம்)",price:"2,500",originalPrice:"3,500"},{name:"M அளவு\n(≤ 70 ஆவணம்/மாதம்)",price:"3,000",originalPrice:"4,000"},{name:"L அளவு\n(≤ 100 ஆவணம்/மாதம்)",price:"3,500",originalPrice:"4,500"},{name:"XL அளவு\n(> 100 ஆவணம்/மாதம்)",price:"தொடர்பு கொள்ளவும்"},{name:"வெற்று அறிக்கை\n(ஒவ்வொரு வகை)",price:"500",originalPrice:"700"}], benefits: ["வருமான/செலவு கணக்கியல்","வரி தாக்கல் தயாரிப்பு","சமூக பாதுகாப்பு பங்களிப்பு","ஒப்பந்த காலத்தில் இலவச ஆலோசனை"], conditions: "விலை ஆவண எண்ணிக்கை மற்றும் சிக்கலான தன்மையின் அடிப்படையில்." },
      "individual-tax-clearing": { title: "தனிநபர் வருமான வரி தீர்வு", price: "2,500 THB இலிருந்து", originalPrice: "4,500 இலிருந்து", shortInfo: ["அதிகபட்ச கழிவுகள்","நிலுவை வரி தீர்வு","சரியான நேரத்தில் தாக்கல்","ஆவண மேலாண்மை","வரி திட்டமிடல்","நிறுவனம் அமைப்பது பற்றிய ஆலோசனை"], pricingTiers: [], benefits: ["<b>அதிகபட்ச கழிவுகள்</b>","<b>ஆவண மேலாண்மை</b>","<b>நிலுவை தீர்வு</b>","<b>வரி பிரதிநிதித்துவம்</b>","<b>எப்போதும் சரியான நேரத்தில்</b>","<b>வளர்ச்சி ஆலோசனை</b>"], conditions: "கட்டணம் சிக்கலான தன்மையின் அடிப்படையில்." },
      "close-financial-deal": { title: "ஆண்டு நிதிநிலை அறிக்கை முடிவு", price: "9,900 THB இலிருந்து", originalPrice: "12,900 இலிருந்து", shortInfo: ["CPA தணிக்கை","100% சட்ட இணக்கம்","PND.50 மற்றும் e-Filing"], pricingTiers: [], benefits: ["ஆண்டு தணிக்கை மற்றும் சான்றிதழ்","கார்ப்பரேட் வருமான வரி (PND.50)","DBD e-Filing மூலம் சமர்ப்பிப்பு","பங்குதாரர் பட்டியல்"], conditions: "தணிக்கை கட்டணம் வணிக அளவின் அடிப்படையில்." }
    }
  }
};

for (const [locale, { meta, overrides }] of Object.entries(TRANSLATIONS)) {
  const filePath = path.join(MESSAGES_DIR, `${locale}.json`);
  if (!fs.existsSync(filePath)) continue;
  const json = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  
  const items = {};
  for (const [slug, enItem] of Object.entries(enItems)) {
    const override = overrides[slug] || {};
    items[slug] = {
      slug: enItem.slug,
      category: override.category || enItem.category,
      categoryId: enItem.categoryId,
      title: override.title || enItem.title,
      imagePlaceholder: enItem.imagePlaceholder,
      shortInfo: override.shortInfo || enItem.shortInfo,
      price: override.price || enItem.price,
      originalPrice: override.originalPrice || enItem.originalPrice,
      pricingTiers: override.pricingTiers !== undefined ? override.pricingTiers : enItem.pricingTiers,
      benefits: override.benefits || enItem.benefits,
      conditions: override.conditions || enItem.conditions,
    };
  }
  
  json.promotions.items = items;
  json.promotions.metadata = { ...meta, keywords: json.promotions.metadata?.keywords || [] };
  
  fs.writeFileSync(filePath, JSON.stringify(json, null, 2) + '\n', 'utf-8');
  console.log(`✅ ${locale}.json — all 6 promotion items translated`);
}

console.log('\nDone! Asian promotion items translated (ms, hi, ta).');
