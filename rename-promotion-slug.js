/**
 * Renames the promotion slug 'close-financial-deal' → 'close-financial-and-audit-bundle'
 * in all non-TH locale JSON files. TH was already handled by update-promotion-hub.js.
 */
const fs = require('fs');
const path = require('path');

const MESSAGES_DIR = path.join(__dirname, 'src', 'messages');
const OLD_SLUG = 'close-financial-deal';
const NEW_SLUG = 'close-financial-and-audit-bundle';

// All locales except TH (TH was already updated by update-promotion-hub.js)
const LOCALES = ['en', 'zh-Hans', 'zh-Hant', 'ja', 'ko', 'de', 'fr', 'it', 'nl', 'ms', 'hi', 'ta'];

let changed = 0;
let skipped = 0;

for (const locale of LOCALES) {
    const filePath = path.join(MESSAGES_DIR, `${locale}.json`);
    if (!fs.existsSync(filePath)) {
        console.log(`⏭ ${locale}.json — not found`);
        skipped++;
        continue;
    }

    const raw = fs.readFileSync(filePath, 'utf-8');
    const data = JSON.parse(raw);

    // Check if the old slug exists in promotions.items
    if (data.promotions?.items?.[OLD_SLUG]) {
        const oldItem = data.promotions.items[OLD_SLUG];
        
        // Update the slug inside the item 
        oldItem.slug = NEW_SLUG;
        
        // Add with new key and remove old key
        data.promotions.items[NEW_SLUG] = oldItem;
        delete data.promotions.items[OLD_SLUG];
        
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
        console.log(`✅ ${locale}.json — renamed '${OLD_SLUG}' → '${NEW_SLUG}'`);
        changed++;
    } else if (data.promotions?.items?.[NEW_SLUG]) {
        console.log(`⏭ ${locale}.json — already uses '${NEW_SLUG}'`);
        skipped++;
    } else {
        console.log(`⚠️ ${locale}.json — no '${OLD_SLUG}' found in promotions.items`);
        skipped++;
    }
}

console.log(`\\nDone! ${changed} files updated, ${skipped} skipped.`);
