/**
 * Client-side search index for services.
 * Builds a flat array of searchable entries from the services config
 * and the current locale's translations.
 *
 * Features:
 *  - Locale-aware synonym/alias expansion
 *  - Fuzzy ranked matching (4 tiers)
 *  - Levenshtein "Did you mean?" suggestions
 *  - Smart result allocation (services vs articles)
 *  - Text highlighting
 */

import { servicesConfig, type CategorySlug } from '@/config/services';

/* ================================================================
   TYPES
   ================================================================ */

export type SearchResultType = 'service' | 'article';

export type SearchResultItem = {
  type: SearchResultType;
  slug: string;
  categorySlug: CategorySlug | 'general';
  title: string;
  summary: string;
  href: string;
};

/* ================================================================
   LOCALE-AWARE SYNONYM MAP
   Each alias (lowercased) maps to one or more canonical search terms
   so the user's short-hand input can find the right service.
   ================================================================ */

type SynonymMap = Record<string, string[]>;

const SYNONYM_MAP_TH: SynonymMap = {
  // --- Registrations ---
  'บจก': ['บริษัทจำกัด', 'company limited'],
  'บจก.': ['บริษัทจำกัด', 'company limited'],
  'หจก': ['ห้างหุ้นส่วนจำกัด', 'limited partnership'],
  'หจก.': ['ห้างหุ้นส่วนจำกัด', 'limited partnership'],
  'บมจ': ['บริษัทมหาชนจำกัด'],
  'บมจ.': ['บริษัทมหาชนจำกัด'],
  'จด': ['จดทะเบียน'],
  'จดบริษัท': ['จดทะเบียนบริษัทจำกัด'],
  'จดห้าง': ['จดทะเบียนห้างหุ้นส่วนจำกัด'],
  'เปิดบริษัท': ['จดทะเบียนบริษัทจำกัด'],
  'ตั้งบริษัท': ['จดทะเบียนบริษัทจำกัด'],
  'ร้านค้า': ['ทะเบียนพาณิชย์'],
  'ทะเบียนพาณิชย์': ['ทะเบียนพาณิชย์'],
  'ร้านค้าออนไลน์': ['ทะเบียนพาณิชย์'],
  'มูลนิธิ': ['มูลนิธิ', 'foundation'],
  'สมาคม': ['สมาคม', 'association'],

  // --- Corporate Changes ---
  'เปลี่ยนชื่อ': ['เปลี่ยนชื่อบริษัท', 'ชื่อบริษัท'],
  'กรรมการ': ['กรรมการ', 'directors'],
  'ผู้ถือหุ้น': ['ผู้ถือหุ้น', 'shareholders'],
  'หุ้น': ['ผู้ถือหุ้น', 'หุ้นส่วน'],
  'ตรายาง': ['ตราประทับ', 'company seal'],
  'ตราประทับ': ['ตราประทับ', 'company seal'],
  'ย้ายที่อยู่': ['ที่ตั้งสำนักงาน'],
  'เลิกกิจการ': ['เลิกกิจการ', 'dissolution'],
  'ปิดบริษัท': ['เลิกกิจการ', 'dissolution'],
  'เพิ่มทุน': ['ทุนจดทะเบียน', 'registered capital'],
  'ลดทุน': ['ทุนจดทะเบียน', 'registered capital'],

  // --- Accounting & Audit ---
  'ภาษี': ['ภาษี', 'tax'],
  'ภงด': ['ภาษี', 'tax'],
  'ภ.ง.ด': ['ภาษี', 'tax'],
  'ภ.ง.ด.': ['ภาษี', 'tax'],
  'ปิดงบ': ['ปิดงบการเงิน', 'financial statement'],
  'งบการเงิน': ['ปิดงบการเงิน', 'financial statement'],
  'ตรวจสอบ': ['ตรวจสอบบัญชี', 'audit'],
  'ออดิท': ['ตรวจสอบบัญชี', 'audit'],
  'ทำบัญชี': ['ทำบัญชี', 'bookkeeping'],
  'บัญชี': ['บัญชี', 'accounting'],
  'แวต': ['ภาษีมูลค่าเพิ่ม', 'VAT'],
  'vat': ['ภาษีมูลค่าเพิ่ม', 'VAT'],
  'ประกันสังคม': ['ประกันสังคม', 'social security'],
  'สสส': ['ประกันสังคม'],
  'วางแผนภาษี': ['วางแผนภาษี', 'tax planning'],
  'เคลียร์ภาษี': ['เคลียร์ภาษี', 'ภาษีบุคคลธรรมดา'],
  'ภาษีบุคคล': ['ภาษีบุคคลธรรมดา', 'ภาษีเงินได้'],

  // --- Licensing ---
  'อย': ['อ.ย.', 'FDA'],
  'อ.ย.': ['อ.ย.', 'FDA'],
  'fda': ['อ.ย.', 'FDA'],
  'วีซ่า': ['วีซ่า', 'visa'],
  'เวิร์คเพอร์มิท': ['ใบอนุญาตทำงาน', 'work permit'],
  'wp': ['ใบอนุญาตทำงาน', 'work permit'],
  'ใบอนุญาต': ['ใบอนุญาต', 'license'],
  'boi': ['BOI', 'ส่งเสริมการลงทุน'],
  'ท่องเที่ยว': ['ท่องเที่ยว', 'tourism'],
  'ทัวร์': ['ท่องเที่ยว', 'tourism'],
  'โรงงาน': ['โรงงาน', 'factory'],
  'ขนส่ง': ['ขนส่ง', 'transport'],
  'จัดหางาน': ['จัดหางาน', 'employment agency'],
  'รปภ': ['รักษาความปลอดภัย', 'security'],
  'การเงิน': ['การเงิน', 'financial'],
  'สินเชื่อ': ['การเงิน', 'พิโกไฟแนนซ์'],
  'ต่างชาติ': ['ชาวต่างชาติ', 'foreign', 'FBL'],

  // --- Digital Marketing ---
  'เว็บ': ['เว็บไซต์', 'website'],
  'เว็บไซต์': ['เว็บไซต์', 'website'],
  'website': ['เว็บไซต์', 'website'],
  'เฟซบุ๊ก': ['Facebook Page'],
  'เพจ': ['Facebook Page'],
  'fb': ['Facebook Page'],
  'ไลน์': ['Line OA'],
  'line': ['Line OA'],
  'ติ๊กต๊อก': ['TikTok'],
  'tiktok': ['TikTok'],
  'ยูทูป': ['YouTube'],
  'youtube': ['YouTube'],
  'yt': ['YouTube'],
  'แอด': ['ยิงแอด', 'โฆษณา', 'paid ads'],
  'โฆษณา': ['ยิงแอด', 'โฆษณา', 'paid ads'],
  'ads': ['ยิงแอด', 'paid ads'],
  'วิดีโอ': ['Video Production'],
  'ถ่ายวิดีโอ': ['Video Production'],
  'ai': ['ระบบ Ai', 'AI'],
  'เอไอ': ['ระบบ Ai', 'AI'],
  'erp': ['Odoo ERP'],
  'odoo': ['Odoo ERP'],
  'โปรแกรม': ['เขียนโปรแกรม', 'custom software'],
  'ซอฟต์แวร์': ['เขียนโปรแกรม', 'custom software'],
  'แอพ': ['เขียนโปรแกรม', 'custom software'],
  'seo': ['SEO', 'การตลาด'],
};

const SYNONYM_MAP_EN: SynonymMap = {
  // --- Registrations ---
  'ltd': ['company limited', 'limited partnership'],
  'co ltd': ['company limited'],
  'co.,ltd': ['company limited'],
  'company': ['company limited', 'company name', 'company seal'],
  'register': ['registration', 'registrations'],
  'partnership': ['limited partnership'],
  'lp': ['limited partnership'],
  'shop': ['commercial shop'],
  'foundation': ['foundation'],
  'association': ['association'],
  'open company': ['company limited'],
  'start business': ['company limited', 'limited partnership'],

  // --- Corporate Changes ---
  'rename': ['company name'],
  'director': ['directors'],
  'shareholder': ['shareholders'],
  'shares': ['shareholders'],
  'stamp': ['company seal'],
  'seal': ['company seal'],
  'dissolve': ['dissolution'],
  'close company': ['dissolution'],
  'liquidation': ['dissolution'],
  'move office': ['office location'],
  'capital': ['registered capital'],
  'increase capital': ['registered capital'],

  // --- Accounting & Audit ---
  'tax': ['tax', 'tax planning', 'monthly tax'],
  'taxes': ['tax', 'tax planning'],
  'income tax': ['tax planning', 'monthly tax'],
  'bookkeeping': ['bookkeeping', 'company accounts'],
  'accounting': ['accounting', 'company accounts'],
  'audit': ['audit', 'auditing'],
  'auditing': ['audit'],
  'vat': ['VAT registration'],
  'sso': ['employer SSO', 'social security'],
  'social security': ['employer SSO', 'social security'],
  'financial': ['financial statement', 'close financial'],
  'close books': ['financial statement closing'],
  'year end': ['financial statement closing'],

  // --- Licensing ---
  'visa': ['visa', 'work permit'],
  'work permit': ['visa', 'work permit'],
  'fda': ['Thai FDA'],
  'food': ['Thai FDA'],
  'boi': ['BOI promotion'],
  'investment': ['BOI promotion'],
  'foreign': ['foreign business', 'foreign tax ID'],
  'fbl': ['foreign business'],
  'fbc': ['foreign business'],
  'tourism': ['tourism licence'],
  'travel': ['tourism licence'],
  'tour': ['tourism licence'],
  'hotel': ['tourism licence'],
  'factory': ['factory license'],
  'transport': ['transport license'],
  'logistics': ['transport license'],
  'security': ['security agency'],
  'guard': ['security agency'],
  'recruitment': ['employment agency'],
  'finance': ['financial license'],
  'loan': ['financial license'],

  // --- Digital Marketing ---
  'website': ['website build'],
  'web': ['website build'],
  'site': ['website build'],
  'facebook': ['Facebook Page'],
  'fb': ['Facebook Page'],
  'line': ['LINE OA'],
  'tiktok': ['TikTok'],
  'tt': ['TikTok'],
  'youtube': ['YouTube'],
  'yt': ['YouTube'],
  'video': ['video production'],
  'ads': ['paid ads'],
  'advertising': ['paid ads'],
  'ppc': ['paid ads'],
  'ai': ['AI solutions'],
  'artificial intelligence': ['AI solutions'],
  'erp': ['Odoo ERP'],
  'odoo': ['Odoo ERP'],
  'software': ['custom software'],
  'app': ['custom software'],
  'program': ['custom software'],
  'seo': ['SEO', 'digital marketing'],
};

/** Map of locale prefix → synonym map. Non-TH locales fallback to EN map. */
const LOCALE_SYNONYM_MAPS: Record<string, SynonymMap> = {
  th: SYNONYM_MAP_TH,
};

function getSynonymMap(locale: string): SynonymMap {
  return LOCALE_SYNONYM_MAPS[locale] ?? SYNONYM_MAP_EN;
}

/* ================================================================
   QUERY EXPANSION
   Expand a user's query using the synonym map.
   Returns the original query + any expanded canonical terms.
   ================================================================ */

export function expandQuery(query: string, locale: string): string[] {
  const q = query.toLowerCase().trim();
  if (!q) return [];

  const map = getSynonymMap(locale);
  const expanded = new Set<string>();
  expanded.add(q);

  // Check for exact alias match
  if (map[q]) {
    for (const term of map[q]) {
      expanded.add(term.toLowerCase());
    }
  }

  // Check for alias that starts with or contains the query (partial match)
  for (const [alias, terms] of Object.entries(map)) {
    if (alias.startsWith(q) || q.startsWith(alias)) {
      for (const term of terms) {
        expanded.add(term.toLowerCase());
      }
    }
  }

  return Array.from(expanded);
}

/* ================================================================
   LEVENSHTEIN DISTANCE
   Standard dynamic programming edit distance for "Did you mean?"
   ================================================================ */

export function levenshteinDistance(a: string, b: string): number {
  const la = a.length;
  const lb = b.length;

  if (la === 0) return lb;
  if (lb === 0) return la;

  // Use single-row optimization for memory efficiency
  let prev = Array.from({ length: lb + 1 }, (_, i) => i);
  let curr = new Array<number>(lb + 1);

  for (let i = 1; i <= la; i++) {
    curr[0] = i;
    for (let j = 1; j <= lb; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      curr[j] = Math.min(
        prev[j] + 1,      // deletion
        curr[j - 1] + 1,  // insertion
        prev[j - 1] + cost // substitution
      );
    }
    [prev, curr] = [curr, prev];
  }

  return prev[lb];
}

/**
 * Get "Did you mean?" suggestions when search returns 0 results.
 * Uses Levenshtein distance to find titles closest to the query.
 * @returns Up to 3 suggestions sorted by edit distance
 */
export function getSuggestions(
  items: SearchResultItem[],
  query: string,
  maxSuggestions: number = 3,
): string[] {
  if (!query.trim()) return [];

  const q = query.toLowerCase().trim();
  // Threshold: allow up to 40% of query length as distance (min 2)
  const threshold = Math.max(2, Math.ceil(q.length * 0.4));

  type Candidate = { title: string; distance: number };
  const candidates: Candidate[] = [];

  const seen = new Set<string>();

  for (const item of items) {
    const titleLower = item.title.toLowerCase();
    if (seen.has(titleLower)) continue;
    seen.add(titleLower);

    // Compare against full title
    const dist = levenshteinDistance(q, titleLower);
    if (dist <= threshold && dist > 0) {
      candidates.push({ title: item.title, distance: dist });
      continue;
    }

    // Also compare against each word in the title for single-word queries
    if (!q.includes(' ')) {
      const words = titleLower.split(/\s+/);
      for (const word of words) {
        if (word.length < 2) continue;
        const wordDist = levenshteinDistance(q, word);
        if (wordDist <= Math.max(1, Math.ceil(q.length * 0.35))) {
          candidates.push({ title: item.title, distance: wordDist });
          break;
        }
      }
    }
  }

  // Sort by distance (closest first), dedupe
  candidates.sort((a, b) => a.distance - b.distance);

  const result: string[] = [];
  const addedTitles = new Set<string>();
  for (const c of candidates) {
    if (addedTitles.has(c.title)) continue;
    addedTitles.add(c.title);
    result.push(c.title);
    if (result.length >= maxSuggestions) break;
  }

  return result;
}

/* ================================================================
   BUILD INDEX
   ================================================================ */

/**
 * Build searchable service entries from translations.
 * @param tServices — next-intl translator for `services` namespace
 */
export function buildServiceSearchIndex(
  tServices: (key: string) => string,
): SearchResultItem[] {
  return servicesConfig.categories.flatMap((category) =>
    category.items.map((item) => {
      const baseKey = `items.${item.serviceSlug}`;
      const title = String(tServices(`${baseKey}.title`) || '');
      const summary = String(tServices(`${baseKey}.summary`) || '');

      return {
        type: 'service' as const,
        slug: item.serviceSlug,
        categorySlug: item.categorySlug,
        title,
        summary,
        href: `/services/${item.categorySlug}/${item.serviceSlug}`,
      };
    }),
  );
}

/* ================================================================
   SEARCH (with synonym expansion)
   ================================================================ */

/**
 * Search items with synonym expansion and fuzzy ranking.
 * Returns results ranked by match quality:
 *   1. Exact title match (100)
 *   2. Title starts with query (80)
 *   3. Title contains query (60)
 *   4. Summary contains query (40)
 */
export function searchItems(
  items: SearchResultItem[],
  query: string,
  locale: string = 'th',
): SearchResultItem[] {
  if (!query.trim()) return [];

  // Expand query using synonym map
  const queries = expandQuery(query, locale);

  type Scored = { item: SearchResultItem; score: number };
  const scored: Scored[] = [];
  const addedSlugs = new Set<string>();

  for (const q of queries) {
    for (const item of items) {
      if (addedSlugs.has(item.slug)) {
        // Update score if the new query gives a higher score
        const existing = scored.find((s) => s.item.slug === item.slug);
        if (existing) {
          const newScore = computeScore(item, q);
          if (newScore > existing.score) {
            existing.score = newScore;
          }
        }
        continue;
      }

      const score = computeScore(item, q);
      if (score > 0) {
        scored.push({ item, score });
        addedSlugs.add(item.slug);
      }
    }
  }

  // Sort by score desc, then by title alphabetically
  scored.sort((a, b) => b.score - a.score || a.item.title.localeCompare(b.item.title));

  return scored.map((s) => s.item);
}

function computeScore(item: SearchResultItem, q: string): number {
  const titleLower = item.title.toLowerCase();
  const summaryLower = item.summary.toLowerCase();

  if (titleLower === q) return 100;
  if (titleLower.startsWith(q)) return 80;
  if (titleLower.includes(q)) return 60;
  if (summaryLower.includes(q)) return 40;
  return 0;
}

/* ================================================================
   ALLOCATION
   ================================================================ */

/**
 * Smart allocation: pick N results from services and articles
 * with the specified max total.
 */
export function allocateResults(
  services: SearchResultItem[],
  articles: SearchResultItem[],
  maxTotal: number = 4,
): { services: SearchResultItem[]; articles: SearchResultItem[] } {
  const sCount = services.length;
  const aCount = articles.length;

  if (sCount + aCount <= maxTotal) {
    return { services, articles };
  }

  // Default: prefer 3 services + 1 article
  let sShow = Math.min(sCount, 3);
  let aShow = Math.min(aCount, maxTotal - sShow);

  // If services < 3, give remaining slots to articles
  if (sCount < 3) {
    sShow = sCount;
    aShow = Math.min(aCount, maxTotal - sShow);
  }

  // If no articles, all slots go to services
  if (aCount === 0) {
    sShow = Math.min(sCount, maxTotal);
    aShow = 0;
  }

  // If no services, all slots go to articles
  if (sCount === 0) {
    sShow = 0;
    aShow = Math.min(aCount, maxTotal);
  }

  return {
    services: services.slice(0, sShow),
    articles: articles.slice(0, aShow),
  };
}

/* ================================================================
   TEXT HIGHLIGHTING
   ================================================================ */

/**
 * Highlight matching text within a string.
 * Returns an array of { text, highlight } segments for rendering.
 */
export function highlightMatches(
  text: string,
  query: string,
): { text: string; highlight: boolean }[] {
  if (!query.trim()) return [{ text, highlight: false }];

  const q = query.trim();
  const regex = new RegExp(`(${q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
  const parts = text.split(regex);

  return parts
    .filter(Boolean)
    .map((part) => ({
      text: part,
      highlight: regex.test(part),
    }));
}
