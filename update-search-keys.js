/**
 * Add search-related i18n keys to all 13 message files.
 * Run: node update-search-keys.js
 */
const fs = require('fs');
const path = require('path');

const MESSAGES_DIR = path.join(__dirname, 'src', 'messages');

const searchKeys = {
  th: {
    noResults: "ไม่พบผลการค้นหาสำหรับ \"{query}\"",
    noResultsHint: "ลองค้นหาด้วยคำอื่นที่ใกล้เคียง",
    services: "บริการ",
    articles: "บทความ",
    viewAll: "ดูผลลัพธ์ทั้งหมดสำหรับ \"{query}\"",
  },
  en: {
    noResults: "No results found for \"{query}\"",
    noResultsHint: "Try searching with different keywords",
    services: "Services",
    articles: "Articles",
    viewAll: "View all results for \"{query}\"",
  },
  'zh-Hans': {
    noResults: "未找到 \"{query}\" 的搜索结果",
    noResultsHint: "请尝试使用其他关键词搜索",
    services: "服务",
    articles: "文章",
    viewAll: "查看 \"{query}\" 的所有结果",
  },
  'zh-Hant': {
    noResults: "未找到 \"{query}\" 的搜尋結果",
    noResultsHint: "請嘗試使用其他關鍵詞搜尋",
    services: "服務",
    articles: "文章",
    viewAll: "查看 \"{query}\" 的所有結果",
  },
  ja: {
    noResults: "「{query}」の検索結果が見つかりません",
    noResultsHint: "別のキーワードでお試しください",
    services: "サービス",
    articles: "記事",
    viewAll: "「{query}」の全結果を表示",
  },
  ko: {
    noResults: "\"{query}\"에 대한 검색 결과가 없습니다",
    noResultsHint: "다른 키워드로 검색해 보세요",
    services: "서비스",
    articles: "기사",
    viewAll: "\"{query}\"에 대한 모든 결과 보기",
  },
  de: {
    noResults: "Keine Ergebnisse für \"{query}\" gefunden",
    noResultsHint: "Versuchen Sie es mit anderen Suchbegriffen",
    services: "Dienstleistungen",
    articles: "Artikel",
    viewAll: "Alle Ergebnisse für \"{query}\" anzeigen",
  },
  fr: {
    noResults: "Aucun résultat trouvé pour \"{query}\"",
    noResultsHint: "Essayez de rechercher avec d'autres mots-clés",
    services: "Services",
    articles: "Articles",
    viewAll: "Voir tous les résultats pour \"{query}\"",
  },
  it: {
    noResults: "Nessun risultato trovato per \"{query}\"",
    noResultsHint: "Prova a cercare con parole chiave diverse",
    services: "Servizi",
    articles: "Articoli",
    viewAll: "Visualizza tutti i risultati per \"{query}\"",
  },
  nl: {
    noResults: "Geen resultaten gevonden voor \"{query}\"",
    noResultsHint: "Probeer te zoeken met andere trefwoorden",
    services: "Diensten",
    articles: "Artikelen",
    viewAll: "Alle resultaten bekijken voor \"{query}\"",
  },
  ms: {
    noResults: "Tiada hasil carian untuk \"{query}\"",
    noResultsHint: "Cuba cari dengan kata kunci lain",
    services: "Perkhidmatan",
    articles: "Artikel",
    viewAll: "Lihat semua hasil untuk \"{query}\"",
  },
  hi: {
    noResults: "\"{query}\" के लिए कोई परिणाम नहीं मिला",
    noResultsHint: "अन्य कीवर्ड से खोजने का प्रयास करें",
    services: "सेवाएं",
    articles: "लेख",
    viewAll: "\"{query}\" के सभी परिणाम देखें",
  },
  ta: {
    noResults: "\"{query}\" க்கான தேடல் முடிவுகள் காணப்படவில்லை",
    noResultsHint: "வேறு முக்கிய வார்த்தைகளுடன் தேடுங்கள்",
    services: "சேவைகள்",
    articles: "கட்டுரைகள்",
    viewAll: "\"{query}\" க்கான அனைத்து முடிவுகளையும் காண்க",
  },
};

const locales = Object.keys(searchKeys);

for (const locale of locales) {
  const filePath = path.join(MESSAGES_DIR, `${locale}.json`);

  if (!fs.existsSync(filePath)) {
    console.log(`⚠️  File not found: ${filePath}`);
    continue;
  }

  const content = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

  // Add search keys under layout.header.search (extend existing)
  if (!content.layout) content.layout = {};
  if (!content.layout.header) content.layout.header = {};
  if (!content.layout.header.search) content.layout.header.search = {};

  const existingSearch = content.layout.header.search;
  const newKeys = searchKeys[locale];

  // Merge without overwriting existing keys like placeholder, submitLabel, mobilePlaceholder
  Object.assign(existingSearch, {
    ...newKeys,
    // Preserve existing keys
    ...(existingSearch.placeholder && { placeholder: existingSearch.placeholder }),
    ...(existingSearch.submitLabel && { submitLabel: existingSearch.submitLabel }),
    ...(existingSearch.mobilePlaceholder && { mobilePlaceholder: existingSearch.mobilePlaceholder }),
  });

  fs.writeFileSync(filePath, JSON.stringify(content, null, 2) + '\n', 'utf-8');
  console.log(`✅ Updated search keys for ${locale}.json`);
}

console.log('\n✨ All search keys updated!');
