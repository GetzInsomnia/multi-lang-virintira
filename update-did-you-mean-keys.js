/**
 * Script to add "didYouMean" i18n keys to all 13 locale message files.
 * Adds the key to both layout.header.search and search namespaces.
 *
 * Run: node update-did-you-mean-keys.js
 */

const fs = require('fs');
const path = require('path');

const MESSAGES_DIR = path.join(__dirname, 'src', 'messages');

// Translations of "Did you mean:" for each locale
const DID_YOU_MEAN = {
  'th': 'หรือคุณหมายถึง:',
  'en': 'Did you mean:',
  'zh-Hans': '您是不是要搜索：',
  'zh-Hant': '您是不是要搜尋：',
  'ja': 'もしかして：',
  'ko': '혹시 이것을 찾으셨나요:',
  'de': 'Meinten Sie:',
  'fr': 'Vouliez-vous dire :',
  'it': 'Forse cercavi:',
  'nl': 'Bedoelde u:',
  'ms': 'Adakah anda maksudkan:',
  'hi': 'क्या आपका मतलब था:',
  'ta': 'நீங்கள் இதை தேடுகிறீர்களா:',
};

const locales = Object.keys(DID_YOU_MEAN);

for (const locale of locales) {
  const filePath = path.join(MESSAGES_DIR, `${locale}.json`);

  if (!fs.existsSync(filePath)) {
    console.log(`⚠ Skipping ${locale}.json — file not found`);
    continue;
  }

  const raw = fs.readFileSync(filePath, 'utf-8');
  const json = JSON.parse(raw);

  // Add to layout.header.search namespace
  if (json.layout?.header?.search) {
    json.layout.header.search.didYouMean = DID_YOU_MEAN[locale];
  }

  // Add to top-level search namespace
  if (json.search) {
    json.search.didYouMean = DID_YOU_MEAN[locale];
  }

  fs.writeFileSync(filePath, JSON.stringify(json, null, 2) + '\n', 'utf-8');
  console.log(`✅ ${locale}.json — added didYouMean key`);
}

console.log('\nDone! Added didYouMean keys to all locales.');
