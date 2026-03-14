/**
 * Add search page i18n keys to all 13 message files.
 * These are for the full /search results page (separate from navbar dropdown keys).
 * Run: node update-search-page-keys.js
 */
const fs = require('fs');
const path = require('path');

const MESSAGES_DIR = path.join(__dirname, 'src', 'messages');

const searchPageKeys = {
  th: {
    heading: "ผลการค้นหาสำหรับ \"{query}\"",
    headingEmpty: "ค้นหาบริการและบทความ",
    resultCount: "พบ {count} ผลลัพธ์",
    tabAll: "ทั้งหมด",
    tabServices: "บริการ",
    tabArticles: "บทความ",
    emptyPrompt: "พิมพ์คำค้นหาเพื่อค้นหาบริการหรือบทความ",
    noResults: "ไม่พบผลการค้นหาสำหรับ \"{query}\"",
    noResultsHint: "ลองค้นหาด้วยคำอื่นที่ใกล้เคียง",
  },
  en: {
    heading: "Search results for \"{query}\"",
    headingEmpty: "Search services and articles",
    resultCount: "{count} results found",
    tabAll: "All",
    tabServices: "Services",
    tabArticles: "Articles",
    emptyPrompt: "Type a keyword to search for services or articles",
    noResults: "No results found for \"{query}\"",
    noResultsHint: "Try searching with different keywords",
  },
  'zh-Hans': {
    heading: "\"{query}\" 的搜索结果",
    headingEmpty: "搜索服务和文章",
    resultCount: "找到 {count} 个结果",
    tabAll: "全部",
    tabServices: "服务",
    tabArticles: "文章",
    emptyPrompt: "输入关键词搜索服务或文章",
    noResults: "未找到 \"{query}\" 的搜索结果",
    noResultsHint: "请尝试使用其他关键词搜索",
  },
  'zh-Hant': {
    heading: "\"{query}\" 的搜尋結果",
    headingEmpty: "搜尋服務和文章",
    resultCount: "找到 {count} 個結果",
    tabAll: "全部",
    tabServices: "服務",
    tabArticles: "文章",
    emptyPrompt: "輸入關鍵詞搜尋服務或文章",
    noResults: "未找到 \"{query}\" 的搜尋結果",
    noResultsHint: "請嘗試使用其他關鍵詞搜尋",
  },
  ja: {
    heading: "「{query}」の検索結果",
    headingEmpty: "サービスと記事を検索",
    resultCount: "{count} 件の結果が見つかりました",
    tabAll: "すべて",
    tabServices: "サービス",
    tabArticles: "記事",
    emptyPrompt: "キーワードを入力してサービスや記事を検索",
    noResults: "「{query}」の検索結果が見つかりません",
    noResultsHint: "別のキーワードでお試しください",
  },
  ko: {
    heading: "\"{query}\" 검색 결과",
    headingEmpty: "서비스 및 기사 검색",
    resultCount: "{count}개의 결과를 찾았습니다",
    tabAll: "전체",
    tabServices: "서비스",
    tabArticles: "기사",
    emptyPrompt: "서비스나 기사를 검색하려면 키워드를 입력하세요",
    noResults: "\"{query}\"에 대한 검색 결과가 없습니다",
    noResultsHint: "다른 키워드로 검색해 보세요",
  },
  de: {
    heading: "Suchergebnisse für \"{query}\"",
    headingEmpty: "Dienstleistungen und Artikel suchen",
    resultCount: "{count} Ergebnisse gefunden",
    tabAll: "Alle",
    tabServices: "Dienstleistungen",
    tabArticles: "Artikel",
    emptyPrompt: "Geben Sie ein Stichwort ein, um Dienstleistungen oder Artikel zu suchen",
    noResults: "Keine Ergebnisse für \"{query}\" gefunden",
    noResultsHint: "Versuchen Sie es mit anderen Suchbegriffen",
  },
  fr: {
    heading: "Résultats de recherche pour \"{query}\"",
    headingEmpty: "Rechercher des services et des articles",
    resultCount: "{count} résultats trouvés",
    tabAll: "Tous",
    tabServices: "Services",
    tabArticles: "Articles",
    emptyPrompt: "Tapez un mot-clé pour rechercher des services ou des articles",
    noResults: "Aucun résultat trouvé pour \"{query}\"",
    noResultsHint: "Essayez de rechercher avec d'autres mots-clés",
  },
  it: {
    heading: "Risultati di ricerca per \"{query}\"",
    headingEmpty: "Cerca servizi e articoli",
    resultCount: "{count} risultati trovati",
    tabAll: "Tutti",
    tabServices: "Servizi",
    tabArticles: "Articoli",
    emptyPrompt: "Digita una parola chiave per cercare servizi o articoli",
    noResults: "Nessun risultato trovato per \"{query}\"",
    noResultsHint: "Prova a cercare con parole chiave diverse",
  },
  nl: {
    heading: "Zoekresultaten voor \"{query}\"",
    headingEmpty: "Diensten en artikelen zoeken",
    resultCount: "{count} resultaten gevonden",
    tabAll: "Alle",
    tabServices: "Diensten",
    tabArticles: "Artikelen",
    emptyPrompt: "Typ een trefwoord om diensten of artikelen te zoeken",
    noResults: "Geen resultaten gevonden voor \"{query}\"",
    noResultsHint: "Probeer te zoeken met andere trefwoorden",
  },
  ms: {
    heading: "Hasil carian untuk \"{query}\"",
    headingEmpty: "Cari perkhidmatan dan artikel",
    resultCount: "{count} keputusan ditemui",
    tabAll: "Semua",
    tabServices: "Perkhidmatan",
    tabArticles: "Artikel",
    emptyPrompt: "Taip kata kunci untuk mencari perkhidmatan atau artikel",
    noResults: "Tiada hasil carian untuk \"{query}\"",
    noResultsHint: "Cuba cari dengan kata kunci lain",
  },
  hi: {
    heading: "\"{query}\" के लिए खोज परिणाम",
    headingEmpty: "सेवाएं और लेख खोजें",
    resultCount: "{count} परिणाम मिले",
    tabAll: "सभी",
    tabServices: "सेवाएं",
    tabArticles: "लेख",
    emptyPrompt: "सेवाओं या लेखों को खोजने के लिए कीवर्ड टाइप करें",
    noResults: "\"{query}\" के लिए कोई परिणाम नहीं मिला",
    noResultsHint: "अन्य कीवर्ड से खोजने का प्रयास करें",
  },
  ta: {
    heading: "\"{query}\" க்கான தேடல் முடிவுகள்",
    headingEmpty: "சேவைகள் மற்றும் கட்டுரைகளைத் தேடுங்கள்",
    resultCount: "{count} முடிவுகள் கண்டறியப்பட்டன",
    tabAll: "அனைத்தும்",
    tabServices: "சேவைகள்",
    tabArticles: "கட்டுரைகள்",
    emptyPrompt: "சேவைகள் அல்லது கட்டுரைகளைத் தேட ஒரு முக்கிய வார்த்தையைத் தட்டச்சு செய்யுங்கள்",
    noResults: "\"{query}\" க்கான தேடல் முடிவுகள் காணப்படவில்லை",
    noResultsHint: "வேறு முக்கிய வார்த்தைகளுடன் தேடுங்கள்",
  },
};

const locales = Object.keys(searchPageKeys);

for (const locale of locales) {
  const filePath = path.join(MESSAGES_DIR, `${locale}.json`);

  if (!fs.existsSync(filePath)) {
    console.log(`⚠️  File not found: ${filePath}`);
    continue;
  }

  const content = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

  // Add search page keys under top-level "search" namespace
  if (!content.search) content.search = {};
  Object.assign(content.search, searchPageKeys[locale]);

  fs.writeFileSync(filePath, JSON.stringify(content, null, 2) + '\n', 'utf-8');
  console.log(`✅ Updated search page keys for ${locale}.json`);
}

console.log('\n✨ All search page keys updated!');
