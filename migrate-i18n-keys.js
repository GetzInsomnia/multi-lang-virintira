const fs = require('fs');
const path = require('path');

const MESSAGES_DIR = path.join(__dirname, 'src', 'messages');

const NEW_ITEM_EMPTY = {
    "slug": "commercial-shop-registration-deal",
    "category": "",
    "categoryId": "registration",
    "title": "",
    "imagePlaceholder": "4:3",
    "shortInfo": [],
    "price": "",
    "originalPrice": "",
    "pricingTiers": [],
    "benefits": [],
    "conditions": ""
};

const LANGUAGES = ['th', 'en', 'zh-Hans', 'zh-Hant', 'ja', 'ko', 'de', 'fr', 'it', 'nl', 'ms', 'hi', 'ta'];

for (const lang of LANGUAGES) {
    const filePath = path.join(MESSAGES_DIR, `${lang}.json`);
    if (!fs.existsSync(filePath)) continue;

    const fileContent = fs.readFileSync(filePath, 'utf-8');
    let jsonData = JSON.parse(fileContent);

    if (jsonData.promotions && jsonData.promotions.items) {
        // 1. Rename yearly-audit-deal -> close-financial-deal
        if (jsonData.promotions.items['yearly-audit-deal']) {
            jsonData.promotions.items['close-financial-deal'] = jsonData.promotions.items['yearly-audit-deal'];
            jsonData.promotions.items['close-financial-deal'].slug = 'close-financial-deal';
            delete jsonData.promotions.items['yearly-audit-deal'];
        }

        // 2. Rename monthly-accounting-bundle -> monthly-bookkeeping-and-tax-bundle
        if (jsonData.promotions.items['monthly-accounting-bundle']) {
            jsonData.promotions.items['monthly-bookkeeping-and-tax-bundle'] = jsonData.promotions.items['monthly-accounting-bundle'];
            jsonData.promotions.items['monthly-bookkeeping-and-tax-bundle'].slug = 'monthly-bookkeeping-and-tax-bundle';
            delete jsonData.promotions.items['monthly-accounting-bundle'];
        }

        // 3. Ensure commercial-shop-registration-deal exists
        if (!jsonData.promotions.items['commercial-shop-registration-deal']) {
            jsonData.promotions.items['commercial-shop-registration-deal'] = { ...NEW_ITEM_EMPTY };
        }
    }

    fs.writeFileSync(filePath, JSON.stringify(jsonData, null, 2));
    console.log(`Migrated keys for ${lang}.json`);
}

console.log('Migration complete.');
