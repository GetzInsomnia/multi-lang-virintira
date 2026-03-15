/**
 * Fix promotion slug mismatch across all 13 locale files.
 * Changes "limited-partnership-registration-deal" → "partnership-registration-deal"
 * in the services.items.limited-partnership.promotion.slug field.
 *
 * Run: node fix-promotion-slugs.js
 */

const fs = require('fs');
const path = require('path');

const MESSAGES_DIR = path.join(__dirname, 'src', 'messages');
const locales = ['th','en','zh-Hans','zh-Hant','ja','ko','de','fr','it','nl','ms','hi','ta'];

for (const locale of locales) {
  const filePath = path.join(MESSAGES_DIR, `${locale}.json`);
  if (!fs.existsSync(filePath)) { console.log(`⚠ Skip ${locale}`); continue; }

  let raw = fs.readFileSync(filePath, 'utf-8');
  const before = raw;

  // Fix the slug in the service promotion section
  raw = raw.replace(
    /"slug":\s*"limited-partnership-registration-deal"/g,
    '"slug": "partnership-registration-deal"'
  );

  if (raw !== before) {
    fs.writeFileSync(filePath, raw, 'utf-8');
    console.log(`✅ ${locale}.json — fixed slug`);
  } else {
    console.log(`⏭ ${locale}.json — no change needed`);
  }
}

console.log('\nDone! All promotion slugs are now consistent.');
