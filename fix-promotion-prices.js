/**
 * Normalize promotion prices across all non-TH locales.
 * - Remove redundant ฿ when THB is present
 * - Standardize to use only THB suffix (no ฿ symbol for non-TH locales)
 * - Keep TH locale as-is (uses ฿ naturally)
 * 
 * Run: node fix-promotion-prices.js
 */
const fs = require('fs');
const path = require('path');
const MESSAGES_DIR = path.join(__dirname, 'src', 'messages');

// Non-TH locales only — TH uses ฿ natively
const locales = ['en','zh-Hans','zh-Hant','ja','ko','de','fr','it','nl','ms','hi','ta'];

for (const locale of locales) {
  const filePath = path.join(MESSAGES_DIR, `${locale}.json`);
  if (!fs.existsSync(filePath)) continue;
  
  const json = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  const items = json.promotions?.items;
  if (!items) continue;
  
  let changed = false;
  
  for (const [slug, item] of Object.entries(items)) {
    // Fix price field: remove ฿ if THB is present
    if (item.price && item.price.includes('฿') && item.price.includes('THB')) {
      item.price = item.price.replace(/฿\s*/g, '');
      changed = true;
    }
    // If price has ฿ but no THB (standalone ฿), replace with THB equivalent
    if (item.price && item.price.includes('฿') && !item.price.includes('THB')) {
      item.price = item.price.replace(/฿/g, 'THB');
      changed = true;
    }
    
    // Fix originalPrice field
    if (item.originalPrice && item.originalPrice.includes('฿') && item.originalPrice.includes('THB')) {
      item.originalPrice = item.originalPrice.replace(/฿\s*/g, '');
      changed = true;
    }
    if (item.originalPrice && item.originalPrice.includes('฿') && !item.originalPrice.includes('THB')) {
      item.originalPrice = item.originalPrice.replace(/฿/g, 'THB');
      changed = true;
    }
    
    // Fix pricingTiers
    if (item.pricingTiers && Array.isArray(item.pricingTiers)) {
      for (const tier of item.pricingTiers) {
        if (tier.price && tier.price.includes('฿')) {
          tier.price = tier.price.replace(/฿\s*/g, '');
          changed = true;
        }
        if (tier.originalPrice && tier.originalPrice.includes('฿')) {
          tier.originalPrice = tier.originalPrice.replace(/฿\s*/g, '');
          changed = true;
        }
      }
    }
  }
  
  if (changed) {
    fs.writeFileSync(filePath, JSON.stringify(json, null, 2) + '\n', 'utf-8');
    console.log(`✅ ${locale}.json — prices normalized`);
  } else {
    console.log(`⏭ ${locale}.json — prices already clean`);
  }
}

console.log('\nDone! All prices normalized (฿+THB → THB only).');
