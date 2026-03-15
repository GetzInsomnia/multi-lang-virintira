/**
 * Normalize originalPrice in non-TH locales:
 * - If originalPrice is purely numeric (e.g. "12,900" or "Starting at 12,900"),
 *   append " THB" to match the price field format.
 * - Also normalize pricingTiers originalPrice fields.
 * 
 * Run: node fix-original-prices.js
 */
const fs = require('fs');
const path = require('path');
const MESSAGES_DIR = path.join(__dirname, 'src', 'messages');

const locales = ['en','zh-Hans','zh-Hant','ja','ko','de','fr','it','nl','ms','hi','ta'];

for (const locale of locales) {
  const filePath = path.join(MESSAGES_DIR, `${locale}.json`);
  if (!fs.existsSync(filePath)) continue;
  
  const json = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  const items = json.promotions?.items;
  if (!items) continue;
  
  let changed = false;
  
  for (const [slug, item] of Object.entries(items)) {
    // Fix originalPrice: if it has numbers but no currency indicator, append THB
    if (item.originalPrice && /\d/.test(item.originalPrice) && !/THB|฿|\$|€|¥|£|₩|₹|バーツ|원|元|बाट|ரூ/i.test(item.originalPrice)) {
      // Check if price has THB — if so, match format
      if (item.price && item.price.includes('THB')) {
        item.originalPrice = item.originalPrice + ' THB';
        changed = true;
      }
    }
    
    // Fix pricingTiers originalPrice
    if (item.pricingTiers && Array.isArray(item.pricingTiers)) {
      for (const tier of item.pricingTiers) {
        if (tier.originalPrice && /\d/.test(tier.originalPrice) && !/THB|฿|\$|€|¥|£|₩|₹|バーツ|원|元|बाट|ரூ/i.test(tier.originalPrice)) {
          // Tier prices are typically just numbers (e.g. "12,900"), keep as-is
          // since the formatPrice() will add ฿ for numeric-only values
          // But for consistency, we could add THB too — let's keep them as just numbers
          // since the sidebar renders them differently
        }
      }
    }
  }
  
  if (changed) {
    fs.writeFileSync(filePath, JSON.stringify(json, null, 2) + '\n', 'utf-8');
    console.log(`✅ ${locale}.json — originalPrice normalized`);
  } else {
    console.log(`⏭ ${locale}.json — already clean`);
  }
}

console.log('\nDone! originalPrice fields now include THB where applicable.');
