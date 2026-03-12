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
            "title": "รวมแพ็กเกจและโปรโมชั่นสุดคุ้ม",
            "summary": "รวมข้อเสนอที่ดีที่สุดและแพ็กเกจสุดคุ้มจากเรา เพื่อช่วยลดต้นทุนและเพิ่มขีดความสามารถในการเริ่มต้นธุรกิจของคุณ เลือกแพ็กเกจที่ตอบโจทย์และรับสิทธิประโยชน์มากมายได้เลยที่นี่"
        },
        "filters": {
            "all": "ทั้งหมด",
            "registration": "จดทะเบียน",
            "amendment": "แก้ไขข้อมูลนิติบุคคล",
            "accounting": "บัญชีและตรวจสอบ",
            "license": "ขอใบอนุญาต",
            "marketing": "การตลาดออนไลน์"
        }
    },
    "ui": {
        "benefitsTitle": "สิทธิประโยชน์ที่คุณจะได้รับ",
        "conditionsTitle": "เงื่อนไขการให้บริการ",
        "summaryTitle": "สรุปรายละเอียดแพ็กเกจ",
        "specialPrice": "ราคาพิเศษ",
        "serviceRates": "อัตราค่าบริการ",
        "freeAssessment": "ติดต่อสอบถามทีมงานเพื่อประเมินราคาฟรี ไม่มีค่าใช้จ่ายแอบแฝง",
        "chatViaLine": "แชทผ่าน LINE",
        "callNow": "โทร. 092-882-5556",
        "viewDetails": "ดูรายละเอียดโปรโมชั่น",
        "andMore": "และอื่นๆ อีกมากมาย...",
        "drawerTitle": "โปรโมชั่นและสิทธิพิเศษ",
        "emptyHub": "ขออภัย ขณะนี้ยังไม่มีโปรโมชั่นในหมวดหมู่นี้ กรุณาติดตามโปรโมชั่นล่าสุดได้เร็วๆ นี้",
        "otherContacts": "ติดต่อช่องทางอื่น"
    },
    "items": {
        "company-registration-deal": {
            "slug": "company-registration-deal",
            "category": "จดทะเบียน",
            "categoryId": "registration",
            "title": "จดทะเบียนบริษัทจำกัด",
            "imagePlaceholder": "4:3",
            "shortInfo": [
                "ฟรี! ตรวจสอบและจองชื่อบริษัทสูงสุด 3 ชื่อ",
                "ฟรี! ตรายางแบบหมึกในตัว 1 ด้าม",
                "ฟรี! ขอรหัสผ่านสำหรับยื่นกรมสรรพากร และ DBD"
            ],
            "price": "เริ่มต้น 9,900 บาท",
            "originalPrice": "เริ่มต้น 12,900 บาท",
            "pricingTiers": [
                { "name": "ผู้ถือหุ้นคนไทยล้วน", "price": "9,900", "originalPrice": "12,900" },
                { "name": "ชาวต่างชาติถือหุ้นไม่เกิน 49%", "price": "12,900", "originalPrice": "15,900" },
                { "name": "ชาวต่างชาติถือหุ้น 100%", "price": "15,900", "originalPrice": "18,900" },
                { "name": "มีนิติบุคคลถือหุ้น", "price": "19,900", "originalPrice": "22,900" }
            ],
            "benefits": [
                "ให้คำปรึกษาและเตรียมเอกสารครบชุด",
                "ยืนยันตัวตนออนไลน์ สะดวก ไม่ต้องเดินทาง",
                "ฟรี! ชุดเอกสารสำหรับใช้เปิดบัญชีธนาคารบริษัท",
                "ฟรี! เอกสารหนังสือรับรองบริษัทชุดใหญ่ ครบชุด",
                "ฟรี! นามบัตรสำหรับออกใบเสร็จ/ใบกำกับภาษี"
            ],
            "conditions": "ราคานี้รวมค่าธรรมเนียมราชการแล้ว (ทุนจดทะเบียนไม่เกิน 1 ล้านบาท) และไม่รวมภาษีมูลค่าเพิ่ม 7%"
        },
        "partnership-registration-deal": {
            "slug": "partnership-registration-deal",
            "category": "จดทะเบียน",
            "categoryId": "registration",
            "title": "จดทะเบียนห้างหุ้นส่วนจำกัด",
            "imagePlaceholder": "4:3",
            "shortInfo": [
                "ดำเนินการรวดเร็ว ครบจบในที่เดียว",
                "ฟรี! ให้คำปรึกษาตลอดอายุการใช้งาน",
                "ฟรี! จัดทำตรายางบริษัท"
            ],
            "price": "เริ่มต้น 5,900 บาท",
            "originalPrice": "เริ่มต้น 8,900 บาท",
            "pricingTiers": [
                { "name": "ผู้เริ่มก่อการคนไทยล้วน", "price": "5,900", "originalPrice": "8,900" },
                { "name": "ชาวต่างชาติลงเงินทุนไม่เกิน 49%", "price": "8,900", "originalPrice": "11,900" }
            ],
            "benefits": [
                "ดำเนินการจัดทำแบบฟอร์มราชการอย่างถูกต้องแม่นยำ",
                "ขอเลขประจำตัวผู้เสียภาษีและรหัสผ่าน",
                "ฟรี! ชุดเอกสารยืนยันการเป็นห้างหุ้นส่วนจำกัด"
            ],
            "conditions": "ราคานี้อาจเปลี่ยนแปลงตามภูมิลำเนาที่ตั้งสำนักงานใหญ่"
        },
        "monthly-accounting-bundle": {
            "slug": "monthly-accounting-bundle",
            "category": "บัญชีและตรวจสอบ",
            "categoryId": "accounting",
            "title": "แพ็กเกจทำบัญชีนิติบุคคลและภาษีรายเดือน",
            "imagePlaceholder": "4:3",
            "shortInfo": [
                "บันทึกบัญชีครบถ้วน ถูกต้องตามมาตรฐาน",
                "ยื่นภาษี ภ.ง.ด.1, 3, 53 และ ภ.พ.30 ตรงเวลา",
                "สรุปรายงานงบการเงินรายเดือน"
            ],
            "price": "เริ่มต้น 1,500 บาท/เดือน",
            "originalPrice": "เริ่มต้น 2,500 บาท/เดือน",
            "pricingTiers": [
                { "name": "Size S \n(เอกสาร 1-30 ชุด/เดือน)", "price": "1,500", "originalPrice": "2,500" },
                { "name": "Size M \n(เอกสาร 31-60 ชุด/เดือน)", "price": "2,500", "originalPrice": "3,500" },
                { "name": "Size L \n(เอกสาร 61-90 ชุด/เดือน)", "price": "3,500", "originalPrice": "4,500" },
                { "name": "ยื่นนำส่งรายงานแบบเปล่า \n(ต่อ 1 ประเภท)", "price": "500", "originalPrice": "700" }
            ],
            "benefits": [
                "บันทึกบัญชีรายได้-ค่าใช้จ่ายด้วยโปรแกรมที่รองรับมาตรฐาน",
                "จัดทำและยื่นแบบภาษีหัก ณ ที่จ่าย และภาษีมูลค่าเพิ่ม",
                "นำส่งเงินสมทบประกันสังคม",
                "ให้คำปรึกษาด้านบัญชีและภาษีฟรีคลอดอายุสัญญา"
            ],
            "conditions": "ราคาขึ้นอยู่กับปริมาณเอกสารและรายการค้าในแต่ละเดือน"
        },
        "individual-tax-clearing": {
            "slug": "individual-tax-clearing",
            "category": "บัญชีและตรวจสอบ",
            "categoryId": "accounting",
            "title": "  เคลียร์ภาษีเงินได้บุคคลธรรมดา",
            "imagePlaceholder": "4:3",
            "shortInfo": [
                "หาทางลดหย่อนสูงสุด พร้อมคำนวณภาษีแม่นยำ",
                "เคลียร์ปัญหาภาษีย้อนหลัง เป็นตัวแทนชี้แจงสรรพากร",
                "ดูแลยื่นแบบ (ภ.ง.ด.90/91/94) ให้ครบจบตรงเวลา",
                "ช่วยจัดการเอกสารรายได้/รายจ่ายที่ยุ่งยาก",
                "วางแผนลดหย่อนภาษีให้คุณประหยัดเงินได้มากที่สุด",
                "ให้คำปรึกษาเชิงลึกว่าควรเป็นนิติบุคคลหรือยัง"
            ],
            "price": "เริ่มต้น 2,500 บาท",
            "originalPrice": "เริ่มต้น 4,500 บาท",
            "pricingTiers": [],
            "benefits": [
                "<b>คำนวณและวางแผนลดหย่อนภาษีขั้นสุด</b> \nเราไม่เพียงแค่กรอกตัวเลขเพื่อยื่นแบบ แต่ทีมงานจะช่วยวิเคราะห์รายได้และรายการค่าใช้จ่ายของคุณอย่างละเอียด เพื่อดึงสิทธิประโยชน์และค่าลดหย่อนทางภาษีที่คุณพึงมีมาใช้ให้เกิดประโยชน์สูงสุด ช่วยให้คุณประหยัดเงินค่าภาษีได้อย่างถูกต้องตามกฎหมาย",
                "<b>จัดการปัญหาเอกสารที่ยุ่งยาก</b> \nหมดปวดหัวกับการรวบรวมและคัดแยกเอกสารรายได้/รายจ่าย (เช่น หัก ณ ที่จ่าย 50 ทวิ) เราจะช่วยจัดการและจัดหมวดหมู่เอกสารที่ซับซ้อนแทนคุณ เพื่อป้องกันข้อผิดพลาดที่อาจทำให้สรรพากรเรียกตรวจสอบในภายหลัง",
                "<b>เคลียร์ปัญหาภาษีย้อนหลังอย่างมืออาชีพ</b> \nหากคุณเคยมีประวัติไม่ได้ยื่นภาษี ยื่นขาด หรือกำลังกังวลใจเรื่องภาษีย้อนหลัง เราพร้อมเข้าไปช่วยตรวจสอบ ตั้งรับ และหาทางออกที่ดีที่สุด เพื่อลดความเสี่ยงในการโดนเบี้ยปรับและเงินเพิ่มให้น้อยที่สุด",
                "<b>เป็นตัวแทนชี้แจงกับกรมสรรพากร</b> \nหากเกิดกรณีที่เจ้าหน้าที่สรรพากรเรียกตรวจสอบเอกสารหรือเชิญไปพบ คุณไม่ต้องเผชิญหน้าเพียงลำพัง ทีมงานของเราพร้อมเป็นตัวแทนเข้าชี้แจง ตอบข้อซักถาม และเจรจาแทนคุณอย่างตรงไปตรงมาและเป็นมืออาชีพ",
                "<b>ดูแลการยื่นแบบครบจบ ตรงเวลา</b> \nเราดำเนินการยื่นแบบแสดงรายการภาษีเงินได้บุคคลธรรมดา (ไม่ว่าจะเป็น ภ.ง.ด.90 สำหรับคนมีรายได้หลายทาง, ภ.ง.ด.91 สำหรับมนุษย์เงินเดือน หรือ ภ.ง.ด.94 สำหรับภาษีครึ่งปี) ผ่านระบบ e-Filing ของกรมสรรพากรให้แล้วเสร็จทันตามกำหนดเวลา 100%",
                "<b>รับคำปรึกษาเชิงลึกเพื่อการเติบโต</b> \nประเมินทิศทางรายได้ของคุณแบบ Case by Case ว่าถึงจุดที่ \"คุ้มค่า\" ที่จะเปลี่ยนสถานะจากบุคคลธรรมดาไปจดทะเบียนเป็น \"นิติบุคคล (บริษัทจำกัด / ห้างหุ้นส่วนจำกัด)\" หรือยัง เพื่อการวางแผนภาษีในระยะยาวที่มีประสิทธิภาพยิ่งขึ้น"
            ],
            "conditions": "ค่าบริการเคลียร์ภาษีบุคคลธรรมดาขึ้นอยู่กับความซับซ้อนของประเภทธุรกิจและจำนวนเอกสาร และไม่รวมค่าเดินทางกรณีต้องไปพบเจ้าหน้าที่สรรพากรเพื่อชี้แจงแทนลูกค้า"
        },
        "yearly-audit-deal": {
            "slug": "yearly-audit-deal",
            "category": "บัญชีและตรวจสอบ",
            "categoryId": "accounting",
            "title": "แพ็กเกจปิดงบการเงินประจำปี",
            "imagePlaceholder": "4:3",
            "shortInfo": [
                "ตรวจสอบงบการเงินโดยผู้สอบบัญชีรับอนุญาต (CPA)",
                "มั่นใจ ถูกต้องตามกฎหมาย 100%",
                "จัดทำ ภ.ง.ด.50 และยื่น E-Filing"
            ],
            "price": "เริ่มต้น 9,900 บาท",
            "originalPrice": "เริ่มต้น 12,900 บาท",
            "pricingTiers": [],
            "benefits": [
                "ตรวจสอบและรับรองงบการเงินประจำปี",
                "จัดทำแบบแสดงรายการภาษีเงินได้นิติบุคคล (ภ.ง.ด.50)",
                "ยื่นงบการเงินผ่านระบบ DBD e-Filing",
                "จัดทำ สบ.ช.3 และสำเนาบัญชีรายชื่อผู้ถือหุ้น (บอจ.5)"
            ],
            "conditions": "ค่าบริการตรวจสอบบัญชีขึ้นอยู่กับความซับซ้อนและขนาดของธุรกิจ"
        }
    }
};

const EMPTY_CONTENT = {
    "metadata": { "title": "", "description": "", "keywords": [] },
    "hub": { "hero": { "title": "", "summary": "" }, "filters": { "all": "", "registration": "", "amendment": "", "accounting": "", "license": "", "marketing": "" } },
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
            "pricingTiers": [],
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
            "pricingTiers": [],
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
            "pricingTiers": [],
            "benefits": [],
            "conditions": ""
        },
        "yearly-audit-deal": {
            "slug": "yearly-audit-deal",
            "category": "",
            "categoryId": "audit",
            "title": "",
            "imagePlaceholder": "4:3",
            "shortInfo": [],
            "price": "",
            "originalPrice": "",
            "pricingTiers": [],
            "benefits": [],
            "conditions": ""
        }
    },
    "ui": {
        "benefitsTitle": "",
        "conditionsTitle": "",
        "summaryTitle": "",
        "specialPrice": "",
        "serviceRates": "",
        "freeAssessment": "",
        "chatViaLine": "",
        "callNow": "",
        "viewDetails": "",
        "andMore": "",
        "drawerTitle": "",
        "emptyHub": "",
        "otherContacts": ""
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
                } else {
                    // Ensure 'ui' exists and has all keys
                    if (!jsonData.promotions.ui) {
                        jsonData.promotions.ui = EMPTY_CONTENT.ui;
                    } else {
                        for (const key in EMPTY_CONTENT.ui) {
                            if (!(key in jsonData.promotions.ui)) {
                                jsonData.promotions.ui[key] = EMPTY_CONTENT.ui[key];
                            }
                        }
                    }
                }
            }

            // Fix: Restore missing `promotion` object used by Homepage's getHomeData
            if (!jsonData.promotion || typeof jsonData.promotion === 'string') {
                jsonData.promotion = {
                    hero: { title: "", intro: "" },
                    cta: "",
                    badge: "",
                    complimentary: ""
                };
            }
            if (lang === 'th') {
                jsonData.promotion.hero.title = "บริการและโปรโมชั่นพิเศษ";
                jsonData.promotion.hero.intro = "เรามีแพ็กเกจบริการที่ครอบคลุมทุกความต้องการของธุรกิจคุณ ไม่ว่าจะเป็นการเริ่มต้นธุรกิจใหม่ หรือการดูแลธุรกิจที่กำลังเติบโต";
                jsonData.promotion.cta = "ดูโปรโมชั่นทั้งหมด";
                jsonData.promotion.badge = "ข้อเสนอสุดพิเศษ";
                jsonData.promotion.complimentary = "ปรึกษาฟรี ไม่มีค่าใช้จ่ายแอบแฝง";
            }

            // Fix: Ensure breadcrumbs exist for Single Promotion Page
            if (!jsonData.breadcrumbs) {
                jsonData.breadcrumbs = {};
            }
            if (lang === 'th') {
                jsonData.breadcrumbs.home = "หน้าแรก";
                jsonData.breadcrumbs.promotion = "โปรโมชั่น";
            } else if (!jsonData.breadcrumbs.home || !jsonData.breadcrumbs.promotion) {
                jsonData.breadcrumbs.home = "Home";
                jsonData.breadcrumbs.promotion = "Promotions";
            }

            if (jsonData.promotionHub) delete jsonData.promotionHub;

            fs.writeFileSync(filePath, JSON.stringify(jsonData, null, 2));
            console.log(`Updated promotions data for ${lang}.json`);
        }
    }

    console.log('Update generic promotion text done.');
}

updatePromotionData();
