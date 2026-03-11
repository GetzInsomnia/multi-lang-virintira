const fs = require('fs');
const path = require('path');

const MESSAGES_DIR = path.join(__dirname, 'src', 'messages');
const LANGUAGES = ['th', 'en', 'zh-Hans', 'zh-Hant', 'ja', 'ko', 'de', 'fr', 'it', 'nl', 'ms', 'hi', 'ta'];

const THAI_CONTENT = {
    "metadata": {
        "title": "Virintira | โปรโมชั่น",
        "description": "รวมข้อเสนอที่ดีที่สุดและแพ็กเกจสุดคุ้มจากเรา เพื่อช่วยลดต้นทุนและเพิ่มขีดความสามารถในการเริ่มต้นธุรกิจของคุณ",
        "keywords": ["โปรโมชั่น", "แพ็กเกจสุดคุ้ม", "จดทะเบียนบริษัท", "ทำบัญชี", "ลดต้นทุนธุรกิจ"]
    },
    "hub": {
        "hero": {
            "title": "รวมแพ็กเกจและโปรโมชั่นสุดคุ้ม (All Special Deals)",
            "summary": "รวมข้อเสนอที่ดีที่สุดและแพ็กเกจสุดคุ้มจากเรา เพื่อช่วยลดต้นทุนและเพิ่มขีดความสามารถในการเริ่มต้นธุรกิจของคุณ เลือกแพ็กเกจที่ตอบโจทย์และรับสิทธิประโยชน์มากมายได้เลยที่นี่"
        },
        "filters": {
            "all": "ทั้งหมด",
            "registration": "จดทะเบียน",
            "accounting": "บัญชีและภาษี"
        }
    },
    "items": {
        "company-registration-deal": {
            "slug": "company-registration-deal",
            "category": "จดทะเบียน",
            "categoryId": "registration",
            "title": "โปรโมชั่นจดทะเบียนบริษัทจำกัด",
            "imagePlaceholder": "4:3",
            "shortInfo": [
                "ฟรี! ตรวจสอบและจองชื่อบริษัทสูงสุด 3 ชื่อ",
                "ฟรี! ตรายางแบบหมึกในตัว 1 ด้าม",
                "ฟรี! ขอรหัสผ่านสำหรับยื่นกรมสรรพากร และ DBD"
            ],
            "price": "14,900",
            "originalPrice": "18,900",
            "benefits": [
                "ให้คำปรึกษาและเตรียมเอกสารครบชุด",
                "ยืนยันตัวตนออนไลน์ สะดวก ไม่ต้องเดินทาง",
                "ฟรี! ชุดเอกสารสำหรับใช้เปิดบัญชีธนาคารบริษัท",
                "ฟรี! เอกสารหนังสือรับรองบริษัทชุดใหญ่ ครบชุด",
                "ฟรี! นามบัตรสำหรับออกใบเสร็จ/ใบกำกับภาษี"
            ],
            "conditions": "เงื่อนไข: ราคานี้รวมค่าธรรมเนียมราชการแล้ว (ทุนจดทะเบียนไม่เกิน 1 ล้านบาท) และไม่รวมภาษีมูลค่าเพิ่ม 7%"
        },
        "partnership-registration-deal": {
            "slug": "partnership-registration-deal",
            "category": "จดทะเบียน",
            "categoryId": "registration",
            "title": "โปรโมชั่นจดทะเบียนห้างหุ้นส่วนจำกัด",
            "imagePlaceholder": "4:3",
            "shortInfo": [
                "ดำเนินการรวดเร็ว ครบจบในที่เดียว",
                "ฟรี! ให้คำปรึกษาตลอดอายุการใช้งาน",
                "ฟรี! จัดทำตรายางบริษัท"
            ],
            "price": "8,900",
            "originalPrice": "12,900",
            "benefits": [
                "ดำเนินการจัดทำแบบฟอร์มราชการอย่างถูกต้องแม่นยำ",
                "ขอเลขประจำตัวผู้เสียภาษีและรหัสผ่าน",
                "ฟรี! ชุดเอกสารยืนยันการเป็นห้างหุ้นส่วนจำกัด"
            ],
            "conditions": "เงื่อนไข: ราคานี้อาจเปลี่ยนแปลงตามภูมิลำเนาที่ตั้งสำนักงานใหญ่"
        },
        "monthly-accounting-bundle": {
            "slug": "monthly-accounting-bundle",
            "category": "บัญชีและภาษี",
            "categoryId": "accounting",
            "title": "แพ็กเกจทำบัญชีและภาษีรายเดือน",
            "imagePlaceholder": "4:3",
            "shortInfo": [
                "บันทึกบัญชีครบถ้วน ถูกต้องตามมาตรฐาน",
                "ยื่นภาษี ภ.ง.ด.1, 3, 53 และ ภ.พ.30 ตรงเวลา",
                "สรุปรายงานงบการเงินรายเดือน"
            ],
            "price": "เริ่มต้น 3,500 / ด",
            "originalPrice": "",
            "benefits": [
                "บันทึกบัญชีรายได้-ค่าใช้จ่ายด้วยโปรแกรมที่รองรับมาตรฐาน",
                "จัดทำและยื่นแบบภาษีหัก ณ ที่จ่าย และภาษีมูลค่าเพิ่ม",
                "นำส่งเงินสมทบประกันสังคม",
                "ให้คำปรึกษาด้านบัญชีและภาษีฟรีคลอดอายุสัญญา"
            ],
            "conditions": "เงื่อนไข: ราคาขึ้นอยู่กับปริมาณเอกสารและรายการค้าในแต่ละเดือน (เริ่มต้นที่ 1-30 รายการ)"
        },
        "yearly-audit-deal": {
            "slug": "yearly-audit-deal",
            "category": "บัญชีและภาษี",
            "categoryId": "accounting",
            "title": "แพ็กเกจปิดงบการเงินประจำปี",
            "imagePlaceholder": "4:3",
            "shortInfo": [
                "ตรวจสอบงบการเงินโดยผู้สอบบัญชีรับอนุญาต (CPA)",
                "มั่นใจ ถูกต้องตามกฎหมาย 100%",
                "จัดทำ ภ.ง.ด.50 และยื่น E-Filing"
            ],
            "price": "ติดต่อสอบถามราคา",
            "originalPrice": "",
            "benefits": [
                "ตรวจสอบและรับรองงบการเงินประจำปี",
                "จัดทำแบบแสดงรายการภาษีเงินได้นิติบุคคล (ภ.ง.ด.50)",
                "ยื่นงบการเงินผ่านระบบ DBD e-Filing",
                "จัดทำ สบ.ช.3 และสำเนาบัญชีรายชื่อผู้ถือหุ้น (บอจ.5)"
            ],
            "conditions": "เงื่อนไข: ค่าบริการตรวจสอบบัญชีขึ้นอยู่กับความซับซ้อนและขนาดของธุรกิจ"
        }
    },
    "ui": {
        "ctaPrimary": "ดูรายละเอียดสิทธิพิเศษ",
        "chatViaLine": "แชทผ่าน LINE",
        "callNow": "โทร. 092-882-5556"
    }
};

const EMPTY_CONTENT = {
    "metadata": { "title": "", "description": "", "keywords": [] },
    "hub": { "hero": { "title": "", "summary": "" }, "filters": { "all": "", "registration": "", "accounting": "" } },
    "items": {
        "company-registration-deal": {
            "slug": "company-registration-deal",
            "category": "",
            "categoryId": "registration",
            "title": "",
            "imagePlaceholder": "4:3",
            "shortInfo": [],
            "price": "",
            "originalPrice": "",
            "benefits": [],
            "conditions": ""
        },
        "partnership-registration-deal": {
            "slug": "partnership-registration-deal",
            "category": "",
            "categoryId": "registration",
            "title": "",
            "imagePlaceholder": "4:3",
            "shortInfo": [],
            "price": "",
            "originalPrice": "",
            "benefits": [],
            "conditions": ""
        },
        "monthly-accounting-bundle": {
            "slug": "monthly-accounting-bundle",
            "category": "",
            "categoryId": "accounting",
            "title": "",
            "imagePlaceholder": "4:3",
            "shortInfo": [],
            "price": "",
            "originalPrice": "",
            "benefits": [],
            "conditions": ""
        },
        "yearly-audit-deal": {
            "slug": "yearly-audit-deal",
            "category": "",
            "categoryId": "accounting",
            "title": "",
            "imagePlaceholder": "4:3",
            "shortInfo": [],
            "price": "",
            "originalPrice": "",
            "benefits": [],
            "conditions": ""
        }
    },
    "ui": {
        "ctaPrimary": "",
        "chatViaLine": "",
        "callNow": ""
    }
};

async function updatePromotionData() {
    console.log('Update Promotion Data...');

    for (const lang of LANGUAGES) {
        const filePath = path.join(MESSAGES_DIR, `${lang}.json`);

        if (fs.existsSync(filePath)) {
            const fileContent = fs.readFileSync(filePath, 'utf-8');
            let jsonData = JSON.parse(fileContent);

            // Set basic structure if not present
            if (!jsonData.metadata) jsonData.metadata = {};

            // 1. Metadata
            if (lang === 'th') {
                jsonData.metadata.promotion = THAI_CONTENT.metadata;
                jsonData.promotions = THAI_CONTENT;
            } else {
                // Keep existing metadata or set empty
                if (!jsonData.metadata.promotion) {
                    jsonData.metadata.promotion = EMPTY_CONTENT.metadata;
                }

                // For layout and items
                if (!jsonData.promotions) {
                    jsonData.promotions = EMPTY_CONTENT;
                }
            }

            // Cleanup old stray data
            if (jsonData.promotion) {
                // If it is an object and not a string like "Promotion" on main nav
                if (typeof jsonData.promotion === 'object' && jsonData.promotion.hero) {
                    delete jsonData.promotion;
                }
            }
            if (jsonData.promotionHub) delete jsonData.promotionHub;

            fs.writeFileSync(filePath, JSON.stringify(jsonData, null, 2));
            console.log(`Updated promotions data for ${lang}.json`);
        }
    }

    console.log('Update generic promotion text done.');
}

updatePromotionData();
