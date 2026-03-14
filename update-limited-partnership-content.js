const fs = require('fs');
const path = require('path');

const MESSAGES_DIR = path.join(__dirname, 'src', 'messages');
const LANGUAGES = ['th', 'en', 'zh-Hans', 'zh-Hant', 'ja', 'ko', 'de', 'fr', 'it', 'nl', 'ms', 'hi', 'ta'];

const THAI_CONTENT = {
    "hero": {
        "title": "จดทะเบียนห้างหุ้นส่วนจำกัด (หจก.) บริหารง่าย ประหยัดต้นทุน",
        "subtitle": "ทางเลือกที่ลงตัวสำหรับธุรกิจขนาดเล็ก",
        "description": "ก้าวสู่การเป็นนิติบุคคลอย่างเต็มรูปแบบ เพื่อเพิ่มความน่าเชื่อถือให้คู่ค้าและลูกค้าของคุณ ด้วยโครงสร้าง หจก. ที่บริหารจัดการง่ายและประหยัดต้นทุนกว่า หมดกังวลเรื่องข้อกฎหมายที่ซับซ้อน เพราะเราพร้อมเป็นผู้ช่วยส่วนตัวดูแลให้คุณตั้งแต่เริ่มต้นจนพร้อมดำเนินธุรกิจ",
        "cta": "092-882-5556"
    },
    "promotion": {
        "title": "โปรโมชั่นพิเศษ!",
        "subtitle": "พลาดไม่ได้กับราคาพิเศษและสิทธิประโยชน์จัดเต็ม สำหรับผู้ที่ต้องการเริ่มต้นธุรกิจอย่างคุ้มค่า",
        "cta": "ดูโปรโมชั่นเลย",
        "slug": "limited-partnership-registration-deal"
    },
    "features": {
        "title": "ทุกสิ่งที่คุณต้องการในการเริ่มต้นธุรกิจ หจก.",
        "items": [
            {
                "title": "ให้คำปรึกษาและวางโครงสร้างความรับผิดชอบ",
                "description": "วิเคราะห์และให้คำแนะนำในการกำหนด \"หุ้นส่วนผู้จัดการ\" และ \"หุ้นส่วนจำกัดความรับผิด\" เพื่อป้องกันความเสี่ยงต่อทรัพย์สินส่วนตัวของคุณแบบ Case by Case",
                "icon": "Lightbulb"
            },
            {
                "title": "จัดทำเอกสารและคำขอจดทะเบียน",
                "description": "ดำเนินการจัดทำแบบฟอร์มคำขอจดทะเบียนและระบุรายละเอียดเงินลงหุ้นอย่างถูกต้องแม่นยำ ผ่านระบบจดทะเบียนนิติบุคคลดิจิทัล (DBD Biz Regist)",
                "icon": "FileSignature"
            },
            {
                "title": "ยื่นจดทะเบียนนิติบุคคล",
                "description": "เป็นตัวแทนดำเนินการยื่นเรื่องต่อกรมพัฒนาธุรกิจการค้า กระทรวงพาณิชย์ ในทุกขั้นตอน",
                "icon": "Landmark"
            },
            {
                "title": "ขอเลขประจำตัวผู้เสียภาษี",
                "description": "ดูแลเรื่องการขอเลขนิติบุคคลและเลขประจำตัวผู้เสียภาษี เพื่อเตรียมความพร้อมสำหรับระบบภาษีของ หจก.",
                "icon": "Calculator"
            }
        ]
    },
    "benefits": {
        "title": "จัดเต็ม! สิทธิพิเศษเพื่อคุณโดยเฉพาะ",
        "items": [
            { "title": "ไม่ผูกมัดทำบัญชี!", "icon": "Unlock" },
            { "title": "ฟรี! ตรวจสอบและจองชื่อ หจก. สูงสุด 3 ชื่อ", "icon": "SearchCheck" },
            { "title": "ฟรี! ตรายาง หจก. แบบหมึกในตัว 1 ด้าม", "icon": "Stamp" },
            { "title": "ฟรี! ขอรหัสผ่านยื่นกรมพัฒนาธุรกิจการค้า", "icon": "KeySquare" },
            { "title": "ฟรี! ขอรหัสผ่านสำหรับยื่นกรมสรรพากร", "icon": "KeyRound" },
            { "title": "ฟรี! ชุดเอกสารสำหรับใช้เปิดบัญชีธนาคารนิติบุคคล", "icon": "Wallet" },
            { "title": "ฟรี! เอกสารหนังสือรับรอง หจก. (DBD) ครบชุด", "icon": "ScrollText" },
            { "title": "ฟรี! คอร์สอบรมเทคนิคทางภาษี (มูลค่า 5,900 บาท)", "icon": "GraduationCap" },
            { "title": "ฟรี! นามบัตรสำหรับออกใบเสร็จ/ใบกำกับภาษี", "icon": "Contact2" }
        ]
    },
    "requirements": {
        "title": "สิ่งที่ต้องเตรียมเพื่อจดทะเบียน หจก.",
        "subtitle": "เตรียมข้อมูลง่ายๆ ส่วนที่เหลือปล่อยให้เป็นหน้าที่เรา",
        "documents": {
            "title": "1. เอกสารสำคัญที่ต้องใช้",
            "items": [
                "ผู้ถือหุ้นอย่างน้อย 2 ท่าน \n\n1. กรณีผู้ถือหุ้นชาวไทย: สำเนาบัตรประชาชน (ถ่ายชัดเจนทั้งหน้า-หลัง)\n\n2. กรณีผู้ถือหุ้นชาวต่างชาติ: สำเนาพาสปอร์ต (เฉพาะหน้าแรกที่มีรูปถ่าย)",
                "ทะเบียนบ้านที่จะใช้เป็นที่ตั้งสำนักงานใหญ่ของ หจก.",
                "แบบตรายาง (ถ้ามี)"
            ]
        },
        "information": {
            "title": "2. ข้อมูลเบื้องต้นเกี่ยวกับธุรกิจ",
            "items": [
                "ชื่อ หจก. ที่ต้องการ (ภาษาไทย-อังกฤษ)",
                "จำนวนเงินลงหุ้นของแต่ละท่าน (เช่น นาย ก. ลงเงิน 990,000 บาท, นาย ข. ลงเงิน 10,000 บาท)",
                "ระบุสถานะหุ้นส่วน (ใครทำหน้าที่เป็น \"หุ้นส่วนผู้จัดการ\" และใครเป็น \"หุ้นส่วนจำกัดความรับผิด\")",
                "อธิบายลักษณะการประกอบกิจการ",
                "ข้อมูลติดต่อของ หจก. \n1. เบอร์โทรศัพท์ \n2. อีเมล",
                "ข้อมูลติดต่อของหุ้นส่วนแต่ละท่าน \n1. เบอร์โทรศัพท์ \n2. อีเมล \n3. LINE ID"
            ]
        }
    },
    "process": {
        "title": "4 ขั้นตอนง่ายๆ ในการจดทะเบียน หจก.",
        "steps": [
            {
                "title": "รับคำปรึกษาและจองชื่อ",
                "description": "เราจะพูดคุยเพื่อรับทราบข้อมูล ช่วยวางแผนโครงสร้าง หจก. ให้เหมาะสมกับความต้องการของคุณมากที่สุด พร้อมดำเนินการจองชื่อ",
                "icon": "MessageSquareText"
            },
            {
                "title": "จัดเตรียมเอกสารผ่านระบบราชการ",
                "description": "ทีมงานจัดเตรียมเอกสารและจัดทำแบบฟอร์มทั้งหมด ผ่านระบบจดทะเบียนนิติบุคคลดิจิทัล (DBD Biz Regist)",
                "icon": "FileStack"
            },
            {
                "title": "ยืนยันตัวตนออนไลน์ (สะดวก ไม่ต้องเดินทาง)",
                "description": "หุ้นส่วนและหุ้นส่วนผู้จัดการทำการยืนยันตัวตนผ่านแอปฯ ThaiD หรือ DBD e-Service โดยสามารถเลือก สแกน QR Code หรือกดยืนยันผ่านอีเมลส่วนตัว",
                "icon": "SmartphoneNfc"
            },
            {
                "title": "ยื่นจดทะเบียนและส่งมอบงาน",
                "description": "ทีมงานยื่นเรื่องต่อกรมพัฒนาธุรกิจการค้า เมื่อได้รับอนุมัติเรียบร้อย เราจะตรวจสอบความถูกต้องและจัดส่งเอกสารสำคัญพร้อมของแถมส่งตรงถึงมือคุณ",
                "icon": "Gift"
            }
        ]
    },
    "faq": {
        "title": "คำถามที่พบบ่อย",
        "items": [
            {
                "question": "หุ้นส่วนผู้จัดการ กับ หุ้นส่วนจำกัดความรับผิด ต่างกันอย่างไร?",
                "answer": "กฎหมายได้แบ่งประเภทของผู้เป็นหุ้นส่วนใน หจก. ออกเป็น 2 ประเภทหลัก ซึ่งมีผลต่อความรับผิดชอบในทรัพย์สินส่วนตัว ดังนี้:\n\n<b>1. หุ้นส่วนผู้จัดการ</b> \nกฎหมายบังคับให้ หจก. ต้องมีหุ้นส่วนประเภทนี้อย่างน้อย 1 คน ทำหน้าที่เป็นผู้บริหารกิจการ มีอำนาจลงนามผูกพัน หจก. ได้อย่างเต็มที่ แต่มีข้อควรระวังคือ ต้องรับผิดชอบในหนี้สินของ หจก. แบบ <b>\"ไม่จำกัดจำนวน\"</b> (หากกิจการมีปัญหาจนต้องปิดตัว ทรัพย์สินส่วนตัวของหุ้นส่วนผู้จัดการอาจถูกนำไปชำระหนี้ด้วย)\n\n<b>2. หุ้นส่วนจำกัดความรับผิด</b> \nทำหน้าที่เป็นเพียง \"ผู้ร่วมลงทุน\" ไม่มีสิทธิลงนามสั่งการหรือบริหารกิจการ แต่มีข้อดีคือ จะรับผิดชอบหนี้สินของ หจก. <b>\"จำกัดแค่ไม่เกินจำนวนเงินที่ตนเองรับปากจะลงทุน\"</b> เท่านั้น (ปลอดภัยต่อทรัพย์สินส่วนตัว 100%)"
            },
            {
                "question": "บริษัทจำกัด (บจก.) กับ ห้างหุ้นส่วนจำกัด (หจก.) ต่างกันอย่างไร และควรเลือกจดแบบไหนดี?",
                "answer": "แม้ทั้งสองรูปแบบจะมีสถานะเป็น <b>\"นิติบุคคล\"</b> และมีอัตราการเสียภาษีที่เหมือนกัน แต่จะมีความแตกต่างหลักๆ ในเรื่องของ <b>\"ความรับผิดชอบต่อหนี้สิน\"</b>, <b>\"ความน่าเชื่อถือ\"</b> และ <b>\"ข้อจำกัดด้านชาวต่างชาติ\"</b> เพื่อให้เห็นภาพและตัดสินใจได้ง่ายขึ้น เราขอเปรียบเทียบให้ดูดังนี้\n\n<b>1. บริษัทจำกัด (Company Limited)</b>\n• <b>ความรับผิดชอบ:</b> <i>\"จำกัดความรับผิด\"</i> (ยกเว้นผู้เป็นกรรมการ) ผู้ถือหุ้นทุกคนจะรับผิดชอบหนี้สินของบริษัท ไม่เกินจำนวนมูลค่าหุ้นรวมที่ตนเองถือ (เป็นการแยกกระเป๋าเงินส่วนตัว ออกจากกระเป๋าเงินธุรกิจอย่างชัดเจน ปลอดภัยต่อทรัพย์สินส่วนตัว)\n• <b>ความน่าเชื่อถือ:</b> สูงมาก เหมาะสำหรับการทำธุรกิจระยะยาว การประมูลงานราชการ การรับงานโปรเจกต์ใหญ่ การดึงดูดนักลงทุน หรือการทำธุรกิจแบบ B2B (Business-to-Business)\n• <b>กรณีมีชาวต่างชาติ / ขอใบอนุญาตทำงาน (Work Permit):</b> เหมาะสมที่สุด กฎหมายและหน่วยงานราชการรองรับโครงสร้างบริษัทจำกัดได้ดีเยี่ยม ไม่ว่าจะเป็นการให้ต่างชาติถือหุ้น (ไม่เกิน 49%) การขอใบอนุญาตทำงาน (Work Permit) การขอวีซ่าธุรกิจ หรือการยื่นขอส่งเสริมการลงทุน (BOI) ฯลฯ\n• <b>จำนวนผู้เริ่มก่อตั้ง:</b> ปัจจุบันใช้ผู้ถือหุ้นขั้นต่ำเพียง 2 ท่าน ก็จดทะเบียนได้แล้ว\n\n<b>2. ห้างหุ้นส่วนจำกัด (Limited Partnership)</b>\n• <b>ความรับผิดชอบ:</b> กฎหมายบังคับให้ต้องมีหุ้นส่วนอย่างน้อย 1 คน ทำหน้าที่เป็น <i>\"หุ้นส่วนผู้จัดการ\"</i> ซึ่งต้องรับผิดชอบหนี้สินของกิจการแบบ <b>\"ไม่จำกัดจำนวน\"</b> (หากกิจการมีปัญหา หุ้นส่วนผู้จัดการอาจต้องนำทรัพย์สินส่วนตัวมาชดใช้หนี้) ส่วนหุ้นส่วนคนอื่นๆ จะจำกัดความรับผิดชอบแค่เงินที่ลงทุนไป\n• <b>ความน่าเชื่อถือ:</b> ระดับปานกลาง เหมาะกับธุรกิจขนาดเล็ก ธุรกิจแบบครอบครัว (Family Business) หรือกิจการที่คู่ค้าไม่ได้ซีเรียสเรื่องรูปแบบนิติบุคคลมากนัก\n• <b>กรณีมีชาวต่างชาติ:</b> ไม่แนะนำ การมีชาวต่างชาติใน หจก. มีข้อจำกัดทางกฎหมายที่ซับซ้อนมาก และหากให้ชาวต่างชาติเป็นหุ้นส่วนผู้จัดการ อาจจะถูกตีความว่าเป็นนิติบุคคลต่างด้าว ซึ่งทำให้การประกอบธุรกิจและการขอ Work Permit ยุ่งยากกว่าบริษัทจำกัดมาก\n• <b>จำนวนผู้เริ่มก่อตั้ง:</b> ใช้ผู้เริ่มก่อการเพียง 2 ท่าน เท่ากันกับการจดทะเบียนบริษัท\n\n<b>สรุปว่าควรเลือกแบบไหนดี?</b>\n• ควรเลือก <b>\"บริษัทจำกัด\"</b> ถ้ามองหาความน่าเชื่อถือสูงสุด, มีแผนขยายกิจการหรือสาขาในอนาคต, ต้องการจำกัดความเสี่ยงไม่ให้กระทบสินทรัพย์ส่วนตัว, มีชาวต่างชาติเป็นผู้ถือหุ้น, หรือมีแผนจะจ้างงานพนักงานต่างชาติ (ขอ Work Permit)\n• ควรเลือก <b>\"ห้างหุ้นส่วนจำกัด\"</b> ถ้าเป็นธุรกิจในครอบครัวหรือคนสนิทที่ไว้ใจได้ 100%, กิจการไม่มีความเสี่ยงเรื่องหนี้สินสูง, ไม่มีหุ้นส่วนชาวต่างชาติ และเน้นโครงสร้างการบริหารที่เรียบง่ายที่สุด\n\n<i><b>หมายเหตุ:</b> ปัจจุบันค่าใช้จ่ายในการจดทะเบียน ค่าทำบัญชีรายเดือน รวมถึงค่าปิดงบประจำปีของ บจก. และ หจก. ไม่ได้แตกต่างกันมากนัก การจดทะเบียนเป็น \"บริษัทจำกัด\" จะเกิดประโยชน์สูงสุดในระยะยาวมากกว่า</i>"
            },
            {
                "question": "จดทะเบียน หจก. ประหยัดค่าใช้จ่ายเรื่องการตรวจสอบบัญชีประจำปี (CPA / TA) ได้จริงหรือไม่?",
                "answer": "<b>จริง</b> นี่คือหนึ่งในข้อได้เปรียบที่สำคัญที่สุดของการจดทะเบียน หจก. \n\nตามกฎหมาย หาก หจก. ของคุณเข้าเกณฑ์เป็นกิจการขนาดเล็ก (Small SME) คือมี <b>ทุนจดทะเบียนไม่เกิน 5 ล้านบาท, มีรายได้รวมไม่เกิน 30 ล้านบาท และมีสินทรัพย์รวมไม่เกิน 30 ล้านบาท</b> คุณจะได้รับสิทธิในการใช้ <b>ผู้สอบบัญชีภาษีอากร (TA - Tax Auditor)</b> ในการตรวจสอบและเซ็นรับรองงบการเงินประจำปีได้ \n\nซึ่งโดยปกติแล้ว อัตราค่าบริการของ TA จะมีราคาที่ประหยัดและเข้าถึงได้ง่ายกว่าการใช้ ผู้สอบบัญชีรับอนุญาต (CPA) ที่กฎหมายบังคับใช้กับ \"บริษัทจำกัด\" ทุกขนาดกิจการ จึงทำให้ หจก. มีต้นทุนการบริหารจัดการรายปีที่ต่ำกว่านั่นเอง"
            },
            {
                "question": "ทุนจดทะเบียน (เงินลงหุ้น) ของ หจก. คืออะไร? หากไม่มีเงินก้อนทั้งหมดสามารถจดทะเบียนได้หรือไม่?",
                "answer": "ใน หจก. เราจะเรียกทุนจดทะเบียนว่า <b>\"เงินลงหุ้น\"</b> ซึ่งสามารถลงหุ้นได้ทั้งเป็นเงินสด ทรัพย์สิน หรือแรงงานก็ได้ <i>\"การชำระเงินลงหุ้น\"</i> ไม่ใช่การนำเงินไปจ่ายให้ใคร แต่เป็นการนำเงินทุนเข้าบัญชีธนาคารในนาม หจก. เพื่อใช้เป็นเงินทุนหมุนเวียนในการทำธุรกิจ (ซึ่งจะเปิดบัญชีได้หลังจากจด หจก. เสร็จแล้ว)\n\n• <b>กรณีที่ไม่มีเงินก้อนทั้งหมด:</b> คุณสามารถทยอยนำเงินเข้าบัญชีได้เมื่อเปิดบัญชี หจก. แล้ว (กฎหมายไม่ได้บังคับให้ต้องชำระเต็ม 100% ทันที) โดยคุณอาจเริ่มเปิดบัญชีของ หจก. ด้วยเงิน 1,000 บาทก่อน หากมีรายจ่ายที่เกี่ยวข้องกับกิจการ ก็สามารถนำเงินเข้าบัญชีแล้วจ่ายออกไปได้เลย เงินก้อนนี้ไม่ต้องแช่นิ่งไว้ในบัญชี\n• <b>ข้อควรระวัง:</b> ยกเว้นกรณีที่ หจก. มีการลงทุนรวมกัน <b>เกิน 5 ล้านบาทขึ้นไป</b> กฎหมายบังคับให้ต้องมีเงินจริง และต้องแสดงหนังสือรับรองเงินฝาก (Bank Certificate) ของหุ้นส่วนทุกคนจากธนาคาร ในขั้นตอนการจดทะเบียนด้วย"
            },
            {
                "question": "ชาวต่างชาติสามารถร่วมเป็นหุ้นส่วนใน หจก. ได้หรือไม่?",
                "answer": "ในทางกฎหมายสามารถทำได้ <b>แต่ในทางปฏิบัติและการบริหารงาน เราไม่แนะนำอย่างยิ่ง</b>\n\nการมีชาวต่างชาติเข้ามาเป็นหุ้นส่วนใน หจก. มีข้อจำกัดทางกฎหมายที่ค่อนข้างซับซ้อน โดยเฉพาะอย่างยิ่งหากให้ชาวต่างชาติเป็น \"หุ้นส่วนผู้จัดการ\" หจก. นั้นอาจจะถูกตีความว่าเป็น <b>\"นิติบุคคลต่างด้าว\"</b> ได้ ซึ่งอาจจะทำให้:\n1. ถูกจำกัดสิทธิในการประกอบธุรกิจหลายประเภทในไทย (ตาม พ.ร.บ. การประกอบธุรกิจของคนต่างด้าว)\n2. การขอใบอนุญาตทำงาน (Work Permit) และวีซ่าธุรกิจให้กับชาวต่างชาตินั้น อาจมีความยุ่งยากและมีโอกาสถูกปฏิเสธสูงกว่าบริษัทจำกัดมาก\n<i>(หากมีชาวต่างชาติร่วมลงทุน แนะนำให้เลือกจดทะเบียนเป็น \"บริษัทจำกัด\" จะราบรื่นและเกิดประโยชน์สูงสุดในระยะยาวมากกว่า)</i>"
            },
            {
                "question": "ถ้ายังไม่มีออฟฟิศ หรือใช้บ้านเช่า/คอนโด เป็นสถานที่ตั้ง สามารถจดทะเบียนได้ไหม?",
                "answer": "<b>สามารถจดทะเบียนได้</b> โดยมีเงื่อนไขดังนี้:\n• <b>กรณีบ้านเช่า/พื้นที่เช่า:</b> ต้องมี <i>\"หนังสือยินยอมให้ใช้สถานที่\"</i> พร้อมแนบสำเนาบัตรประชาชนและสำเนาทะเบียนบ้านของ \"เจ้าบ้านหรือเจ้าของกรรมสิทธิ์\" ที่เซ็นรับรองถูกต้อง\n• <b>กรณีคอนโดมิเนียม:</b> แม้กฎหมายจะอนุญาต แต่ควรตรวจสอบกับนิติบุคคลของคอนโดนั้นๆ ก่อน เพราะหลายโครงการมีกฎระเบียบภายในที่ไม่อนุญาตให้ใช้ห้องพักอาศัยจดทะเบียนเป็นสำนักงาน\n<i>(หากคุณไม่สะดวกใช้สถานที่ของตนเอง เรามีบริการที่ตั้งสำนักงานเสมือน <b>Virtual Office</b> ไว้คอยให้บริการเพื่อแก้ปัญหานี้)</i>"
            },
            {
                "question": "จดทะเบียน หจก. ปุ๊บ ต้องจดทะเบียนภาษีมูลค่าเพิ่ม (VAT 7%) ปั๊บเลยไหม?",
                "answer": "ไม่จำเป็นเสมอไป การจดทะเบียน หจก. กับการจดทะเบียนภาษีมูลค่าเพิ่ม (VAT) เป็นคนละส่วนกัน หจก. จะถูกบังคับให้จด VAT ก็ต่อเมื่อมีรายได้จากการประกอบกิจการ <b>เกิน 1.8 ล้านบาทต่อปี</b>\n\nอย่างไรก็ตาม หาก หจก. จำเป็นต้องนำเข้า-ส่งออกสินค้า หรือต้องดีลงานกับคู่ค้าแบบ B2B ที่คู่ค้าต้องการให้ออกใบกำกับภาษีให้ หจก. ก็ <b>จำเป็นต้องยื่นขอจดทะเบียนภาษีมูลค่าเพิ่ม (VAT)</b> เพื่อให้สามารถออกใบกำกับภาษีให้คู่ค้าได้ตั้งแต่เริ่มกิจการ"
            },
            {
                "question": "จด หจก. เสร็จแล้ว แต่ยังไม่ได้เริ่มขาย หรือยังไม่มีรายได้ ต้องทำบัญชีไหม?",
                "answer": "<b>ต้องทำ</b> ตามกฎหมาย (พ.ร.บ. การบัญชี พ.ศ. 2543) บังคับให้นิติบุคคลทุกประเภทต้องจัดทำบัญชี และนำส่งงบการเงินให้แก่กรมพัฒนาธุรกิจการค้าและกรมสรรพากร <b>\"แม้ว่าในปีนั้นๆ จะไม่มีรายได้ ไม่มีรายจ่าย หรือยังไม่ได้เริ่มดำเนินกิจการเลยก็ตาม (งบเปล่า)\"</b> หากละเลยไม่นำส่งตามกำหนด จะมีโทษปรับทางกฎหมายในอัตราที่ค่อนข้างสูง"
            },
            {
                "question": "หุ้นส่วนผู้จัดการ ต้องหักเงินเดือนตัวเองเพื่อส่งประกันสังคมไหม?",
                "answer": "<b>ไม่ต้อง</b> ในฐานะที่คุณเป็นหุ้นส่วนผู้จัดการและเป็นเจ้าของกิจการ คุณจะอยู่ในฐานะ <b>\"นายจ้าง\"</b> ไม่ใช่ลูกจ้าง จึงไม่สามารถและไม่ต้องขึ้นทะเบียนเป็นผู้ประกันตน (มาตรา 33) ใน หจก. ของตนเอง\n\nแต่เมื่อไหร่ก็ตามที่ หจก. เริ่มมีการจ้าง <b>\"พนักงานประจำ\"</b> กฎหมายบังคับให้ หจก. ต้องทำเรื่องขึ้นทะเบียนนายจ้างและนำส่งประกันสังคมให้พนักงานภายใน 30 วันนับจากวันรับพนักงานเข้าทำงาน"
            }
        ]
    }
};

const EMPTY_CONTENT = {
    "en": {
        "hero": {
            "title": "Limited Partnership (Ltd. Part.) Registration. Easy to manage, cost-effective.",
            "subtitle": "The perfect choice for small businesses.",
            "description": "Step into a fully registered juristic person to enhance credibility with your partners and customers. With a Limited Partnership structure that is easier to manage and more cost-effective, you can stop worrying about complex legalities. We are ready to be your personal assistant, taking care of everything from start to finish until you are ready to operate your business.",
            "cta": "+669 2882 5556"
        },
        "promotion": {
            "title": "Special Promotion!",
            "subtitle": "Don't miss out on special prices and fully-loaded privileges for those who want to start a business cost-effectively.",
            "cta": "View Promotion now",
            "slug": "limited-partnership-registration-deal"
        },
        "features": {
            "title": "Everything you need to start a Limited Partnership",
            "items": [
                {
                    "title": "Consulting and Liability Structuring",
                    "description": "Analyze and provide advice on designating the \"Managing Partner\" and \"Limited Liability Partner\" to protect your personal assets from risks on a case-by-case basis.",
                    "icon": "Lightbulb"
                },
                {
                    "title": "Document and Application Preparation",
                    "description": "Accurately prepare registration application forms and specify capital contribution details via the digital juristic person registration system (DBD Biz Regist).",
                    "icon": "FileSignature"
                },
                {
                    "title": "Juristic Person Registration Submission",
                    "description": "Act as your representative to process and submit applications to the Department of Business Development, Ministry of Commerce at every step.",
                    "icon": "Landmark"
                },
                {
                    "title": "Tax Identification Number Request",
                    "description": "Handle the request for the juristic person number and tax identification number to prepare the tax system for your Limited Partnership.",
                    "icon": "Calculator"
                }
            ]
        },
        "benefits": {
            "title": "Fully loaded! Exclusive privileges just for you",
            "items": [
                { "title": "No monthly accounting tie-in!", "icon": "Unlock" },
                { "title": "FREE! Check and reserve up to 3 Limited Partnership names", "icon": "SearchCheck" },
                { "title": "FREE! 1 self-inking Limited Partnership stamp", "icon": "Stamp" },
                { "title": "FREE! Request e-Filing password for the DBD", "icon": "KeySquare" },
                { "title": "FREE! Request password for the Revenue Department", "icon": "KeyRound" },
                { "title": "FREE! Document set for opening a corporate bank account", "icon": "Wallet" },
                { "title": "FREE! Complete set of Limited Partnership certificate documents (DBD)", "icon": "ScrollText" },
                { "title": "FREE! Tax technique training course (Value 5,900 THB)", "icon": "GraduationCap" },
                { "title": "FREE! Business cards for issuing receipts/tax invoices", "icon": "Contact2" }
            ]
        },
        "requirements": {
            "title": "What to prepare for Limited Partnership registration",
            "subtitle": "Just prepare basic information, and leave the rest to us.",
            "documents": {
                "title": "1. Important documents required",
                "items": [
                    "At least 2 partners \n\n1. Thai partners: Copy of ID card (Clear copy of front and back)\n\n2. Foreign partners: Copy of passport (Only the first page with photo)",
                    "House registration to be used as the head office of the Limited Partnership.",
                    "Stamp design (if any)"
                ]
            },
            "information": {
                "title": "2. Basic business information",
                "items": [
                    "Desired Limited Partnership name (Thai-English)",
                    "Capital contribution amount of each person (e.g., Mr. A contributes 990,000 THB, Mr. B contributes 10,000 THB)",
                    "Specify partner status (Who acts as the \"Managing Partner\" and who is the \"Limited Liability Partner\")",
                    "Description of business operations",
                    "Limited Partnership contact information \n1. Phone number \n2. Email",
                    "Contact information of each partner \n1. Phone number \n2. Email \n3. LINE ID"
                ]
            }
        },
        "process": {
            "title": "4 simple registration steps",
            "steps": [
                {
                    "title": "Consultation and Name Reservation",
                    "description": "We will discuss to gather information, help plan a Limited Partnership structure that best suits your needs, and proceed with name reservation.",
                    "icon": "MessageSquareText"
                },
                {
                    "title": "Document Preparation via Government System",
                    "description": "Our team prepares all documents and forms via the digital juristic person registration system (DBD Biz Regist).",
                    "icon": "FileStack"
                },
                {
                    "title": "Online Identity Verification (Convenient, No travel required)",
                    "description": "Partners and the Managing Partner verify their identity via the ThaiD or DBD e-Service app. They can choose to scan a QR Code or click to verify via their personal email.",
                    "icon": "SmartphoneNfc"
                },
                {
                    "title": "Registration Submission and Delivery",
                    "description": "Our team submits the application to the Department of Business Development. Once approved, we will verify the accuracy and deliver essential documents along with free gifts directly to you.",
                    "icon": "Gift"
                }
            ]
        },
        "faq": {
            "title": "Frequently Asked Questions",
            "items": [
                {
                    "question": "What is the difference between a Managing Partner and a Limited Liability Partner?",
                    "answer": "The law divides partners in a Limited Partnership into 2 main types, which affects their responsibility over personal assets, as follows:\n\n<b>1. Managing Partner</b> \nThe law requires a Limited Partnership to have at least 1 partner of this type to manage the business. They have full authority to sign and bind the Limited Partnership. However, the caveat is that they must be responsible for the debts of the Limited Partnership on an <b>\"unlimited\"</b> basis (if the business faces problems and has to close, the personal assets of the Managing Partner may be used to pay off debts).\n\n<b>2. Limited Liability Partner</b> \nActs only as a \"co-investor\" with no right to sign orders or manage the business. The advantage is that they will be responsible for the debts of the Limited Partnership <b>\"limited to no more than the amount they promised to invest\"</b> (100% safe for personal assets)."
                },
                {
                    "question": "What is the difference between a Company Limited (Co., Ltd.) and a Limited Partnership (Ltd. Part.), and which one should I choose?",
                    "answer": "Although both structures have the status of a <b>\"Juristic Person\"</b> and have the same tax rates, there are major differences regarding <b>\"Liability for debts\"</b>, <b>\"Credibility\"</b>, and <b>\"Restrictions on foreigners\"</b>. To make it easier to understand and decide, let us compare them as follows:\n\n<b>1. Company Limited</b>\n• <b>Liability:</b> <i>\"Limited liability\"</i> (except for directors). All shareholders are liable for the company's debts up to the unpaid amount of their shares (this clearly separates personal wallets from business wallets, keeping personal assets safe).\n• <b>Credibility:</b> Very high. Suitable for long-term business, government bidding, taking on large projects, attracting investors, or B2B (Business-to-Business) operations.\n• <b>In case of foreigners / Work Permit requests:</b> Highly suitable. The law and government agencies excellently support the Company Limited structure, whether it involves foreigners holding shares (up to 49%), Work Permit requests, business visas, or BOI investment promotions, etc.\n• <b>Number of founders:</b> Currently, a minimum of only 2 shareholders is required to register.\n\n<b>2. Limited Partnership</b>\n• <b>Liability:</b> The law requires at least 1 partner to act as the <i>\"Managing Partner\"</i>, who must be responsible for the business's debts on an <b>\"unlimited\"</b> basis (if the business has problems, the managing partner may have to use personal assets to pay debts). Other partners' liability is limited to the money they invested.\n• <b>Credibility:</b> Moderate. Suitable for small businesses, Family Businesses, or enterprises where partners are not too serious about the juristic person format.\n• <b>In case of foreigners:</b> Not recommended. Having foreigners in a Limited Partnership entails highly complex legal restrictions. If a foreigner is made the Managing Partner, it might be interpreted as an alien juristic person, making business operations and Work Permit requests much more difficult than a Company Limited.\n• <b>Number of founders:</b> Requires only 2 founders, the same as registering a company.\n\n<b>Summary: Which one should you choose?</b>\n• Choose a <b>\"Company Limited\"</b> if you are looking for the highest credibility, have plans to expand the business or branches in the future, want to limit risks from affecting personal assets, have foreigners as shareholders, or plan to hire foreign employees (Work Permit requests).\n• Choose a <b>\"Limited Partnership\"</b> if it is a family business or close people you trust 100%, the business does not have high debt risks, there are no foreign partners, and you emphasize the simplest management structure.\n\n<i><b>Note:</b> Currently, the costs for registration, monthly accounting, and annual financial closing for Co., Ltd. and Ltd. Part. are not much different. Registering as a \"Company Limited\" generally yields maximum benefits in the long run.</i>"
                },
                {
                    "question": "Does registering a Limited Partnership really save costs on annual accounting audits (CPA / TA)?",
                    "answer": "<b>True.</b> This is one of the most important advantages of registering a Limited Partnership.\n\nBy law, if your Limited Partnership meets the criteria of a small enterprise (Small SME) which means having <b>registered capital not exceeding 5 million THB, total revenue not exceeding 30 million THB, and total assets not exceeding 30 million THB</b>, you are entitled to use a <b>Tax Auditor (TA)</b> to audit and sign the annual financial statements.\n\nNormally, the service fees of a TA are more economical and accessible compared to using a Certified Public Accountant (CPA), which the law mandates for \"Company Limited\" of all business sizes. This results in the Limited Partnership having lower annual management costs."
                },
                {
                    "question": "What is the Registered Capital (Capital Contribution) of a Limited Partnership? Can I register if I don't have the entire lump sum?",
                    "answer": "In a Limited Partnership, we refer to the registered capital as <b>\"Capital Contribution\"</b>, which can be invested in cash, assets, or labor. <i>\"Paying the capital contribution\"</i> does not mean paying money to anyone, but it means depositing capital into a bank account under the name of the Limited Partnership to be used as working capital for the business (which can be opened after the Limited Partnership registration is complete).\n\n• <b>If you do not have the entire lump sum:</b> You can gradually deposit money into the account once the Limited Partnership's account is opened (the law does not force you to pay 100% fully immediately). You may start by opening the Limited Partnership's account with 1,000 THB. If there are business-related expenses, you can deposit money into the account and then pay it out. This lump sum does not need to sit idle in the account.\n• <b>Precautions:</b> Except in the case where the Limited Partnership has a total investment of <b>more than 5 million THB</b>, the law requires the actual money to be present, and a Bank Certificate of all partners from the bank must be shown during the registration process."
                },
                {
                    "question": "Can foreigners become partners in a Limited Partnership?",
                    "answer": "Legally it can be done, <b>but practically and managerially, we highly do not recommend it.</b>\n\nHaving a foreigner as a partner in a Limited Partnership involves quite complex legal restrictions. Especially if a foreigner becomes a \"Managing Partner\", the Limited Partnership might be interpreted as an <b>\"Alien Juristic Person\"</b>, which could lead to:\n1. Being restricted from operating many types of businesses in Thailand (according to the Foreign Business Act).\n2. Requesting a Work Permit and business visa for foreigners may be complicated and has a much higher chance of being rejected than a Company Limited.\n<i>(If there is foreign co-investment, we recommend choosing to register as a \"Company Limited\", which will be smoother and provide maximum benefits in the long run.)</i>"
                },
                {
                    "question": "If I don't have an office yet, or use a rented house/condo as a location, can I register?",
                    "answer": "<b>It can be registered</b> under the following conditions:\n• <b>In case of a rented house/rented space:</b> You must have a <i>\"Letter of Consent to Use the Premises\"</i> along with properly certified copies of the ID card and house registration of the \"House Master or Property Owner\".\n• <b>In case of a condominium:</b> Although the law allows it, you should check with the condominium's juristic person first, because many projects have internal regulations that do not allow residential rooms to be registered as offices.\n<i>(If you are not convenient using your own place, we have a <b>Virtual Office</b> service available to solve this problem.)</i>"
                },
                {
                    "question": "Once the Limited Partnership is registered, do I have to register for Value Added Tax (VAT 7%) immediately?",
                    "answer": "Not necessarily. Registering a Limited Partnership and registering for Value Added Tax (VAT) are two different things. A Limited Partnership is forced to register for VAT only when it has business income <b>exceeding 1.8 million THB per year</b>.\n\nHowever, if the Limited Partnership needs to import-export goods, or deal with B2B partners where partners require tax invoices to be issued, the Limited Partnership <b>must apply for Value Added Tax (VAT) registration</b> to be able to issue tax invoices to partners from the start of the business."
                },
                {
                    "question": "After the Limited Partnership is registered, but hasn't started selling or hasn't generated income yet, do I need to do accounting?",
                    "answer": "<b>Must do.</b> By law (Accounting Act B.E. 2543), all types of juristic persons are required to prepare accounts and submit financial statements to the Department of Business Development and the Revenue Department <b>\"even if there is no income, no expenses, or the business has not yet started operating in that year (Zero Declaration)\"</b>. Neglecting to submit on time will result in relatively high legal fines."
                },
                {
                    "question": "Does the Managing Partner have to deduct their own salary to submit to Social Security?",
                    "answer": "<b>No need.</b> As you are the Managing Partner and business owner, you are in the position of an <b>\"Employer\"</b>, not an employee. Therefore, you cannot and do not need to register as an insured person (Article 33) in your own Limited Partnership.\n\nHowever, whenever the Limited Partnership starts hiring <b>\"full-time employees\"</b>, the law requires the Limited Partnership to register as an employer and submit Social Security for the employees within 30 days from the date of hiring."
                }
            ]
        }
    },
    "zh-Hans": {
        "hero": {
            "title": "有限合伙企业（Ltd. Part.）注册。易于管理，节约成本",
            "subtitle": "小型企业的完美选择",
            "description": "全面迈向法人实体，提升您在合作伙伴和客户中的信誉。借助管理更简便、成本更低的有限合伙企业结构，您无需再为复杂的法律问题而担忧。我们随时准备成为您的私人助理，从头到尾为您打理一切，让您随时准备好开展业务。",
            "cta": "+669 2882 5556"
        },
        "promotion": {
            "title": "特别促销！",
            "subtitle": "专为希望以高性价比创业的人士提供，千万不要错过特价和丰厚福利",
            "cta": "立即查看促销",
            "slug": "limited-partnership-registration-deal"
        },
        "features": {
            "title": "开启有限合伙企业所需的一切",
            "items": [
                {
                    "title": "咨询与责任架构规划",
                    "description": "分析并提供关于指定“管理合伙人”和“有限责任合伙人”的建议，根据具体情况保护您的个人资产免受风险。",
                    "icon": "Lightbulb"
                },
                {
                    "title": "文件与申请准备",
                    "description": "通过数字法人注册系统（DBD Biz Regist）准确准备注册申请表并注明出资详情。",
                    "icon": "FileSignature"
                },
                {
                    "title": "法人注册提交",
                    "description": "作为您的代表，在每个阶段向商业部商业发展局（DBD）办理并提交申请。",
                    "icon": "Landmark"
                },
                {
                    "title": "申请纳税识别号",
                    "description": "处理法人编号和纳税识别号的申请，为您的有限合伙企业准备好税务系统。",
                    "icon": "Calculator"
                }
            ]
        },
        "benefits": {
            "title": "诚意满满！为您量身定制的专属特权",
            "items": [
                { "title": "无月度会计绑定！", "icon": "Unlock" },
                { "title": "免费！检查并保留最多3个有限合伙企业名称", "icon": "SearchCheck" },
                { "title": "免费！自带墨水有限合伙企业印章1枚", "icon": "Stamp" },
                { "title": "免费！申请商业发展局（DBD）电子申报密码", "icon": "KeySquare" },
                { "title": "免费！申请税务局密码", "icon": "KeyRound" },
                { "title": "免费！用于开设法人银行账户的文件包", "icon": "Wallet" },
                { "title": "免费！全套有限合伙企业证明文件（DBD）", "icon": "ScrollText" },
                { "title": "免费！税务技巧培训课程（价值 5,900 泰铢）", "icon": "GraduationCap" },
                { "title": "免费！用于开具收据/税务发票的名片", "icon": "Contact2" }
            ]
        },
        "requirements": {
            "title": "注册有限合伙企业需要准备什么",
            "subtitle": "只需准备基本信息，其余交给我们",
            "documents": {
                "title": "1. 需提供的核心文件",
                "items": [
                    "至少2名合伙人 \n\n1. 泰国合伙人：身份证复印件（正反面清晰）\n\n2. 外籍合伙人：护照复印件（仅含照片的首页）",
                    "用作有限合伙企业总部的房屋户口本。",
                    "印章设计（如有）"
                ]
            },
            "information": {
                "title": "2. 基本业务信息",
                "items": [
                    "期望的有限合伙企业名称（泰文-英文）",
                    "各合伙人的出资金额（例如：A先生出资 990,000 泰铢，B先生出资 10,000 泰铢）",
                    "明确合伙人身份（谁担任“管理合伙人”，谁是“有限责任合伙人”）",
                    "业务性质说明",
                    "有限合伙企业联系信息 \n1. 电话号码 \n2. 电子邮箱",
                    "各合伙人联系信息 \n1. 电话号码 \n2. 电子邮箱 \n3. LINE ID"
                ]
            }
        },
        "process": {
            "title": "轻松注册的4个步骤",
            "steps": [
                {
                    "title": "咨询与名称预留",
                    "description": "我们将与您沟通以了解信息，帮助规划最符合您需求的有限合伙企业结构，并进行名称预留。",
                    "icon": "MessageSquareText"
                },
                {
                    "title": "通过政府系统准备文件",
                    "description": "我们的团队将通过数字法人注册系统（DBD Biz Regist）准备所有文件和表格。",
                    "icon": "FileStack"
                },
                {
                    "title": "在线身份验证（方便快捷，无需出行）",
                    "description": "合伙人和管理合伙人通过 ThaiD 或 DBD e-Service 应用程序验证身份。可选择扫描 QR 码或通过个人电子邮箱点击验证。",
                    "icon": "SmartphoneNfc"
                },
                {
                    "title": "提交注册并交付",
                    "description": "团队向商业发展局提交申请。一旦获批，我们将核实无误，并将重要文件连同免费赠品直接送到您手中。",
                    "icon": "Gift"
                }
            ]
        },
        "faq": {
            "title": "常见问题 (FAQ)",
            "items": [
                {
                    "question": "管理合伙人与有限责任合伙人有什么区别？",
                    "answer": "法律将有限合伙企业中的合伙人分为两大类，这会影响对个人资产的责任，具体如下：\n\n<b>1. 管理合伙人</b> \n法律强制规定有限合伙企业必须至少有1名此类合伙人来管理业务。他们拥有充分的签名权并对有限合伙企业产生约束力。但需要注意的是，他们必须对有限合伙企业的债务承担 <b>“无限”</b> 责任（如果企业面临问题必须关闭，管理合伙人的个人资产可能会被用于偿还债务）。\n\n<b>2. 有限责任合伙人</b> \n仅作为“共同投资者”，无权签署指令或管理业务。其优点是，对有限合伙企业的债务承担的责任 <b>“仅限于其承诺投资的金额内”</b>（个人资产100%安全）。"
                },
                {
                    "question": "有限公司（Co., Ltd.）和有限合伙企业（Ltd. Part.）有什么区别？我应该选择哪种？",
                    "answer": "虽然这两种形式都具有 <b>“法人”</b> 地位并适用相同的税率，但主要区别在于 <b>“债务责任”</b>、<b>“信誉度”</b> 和 <b>“对外籍人士的限制”</b>。为便于理解和决定，我们做如下比较：\n\n<b>1. 有限公司 (Company Limited)</b>\n• <b>责任：</b> <i>“有限责任”</i>（董事除外）。所有股东对公司债务的责任仅限于其所持股份的未缴足金额（明确区分个人资金与商业资金，保护个人资产）。\n• <b>信誉度：</b> 极高。适合长期业务、政府招标、承接大型项目、吸引投资者或 B2B（企业对企业）业务。\n• <b>外籍人士/申请工作许可证 (Work Permit)：</b> 最合适。法律和政府机构非常支持有限公司结构，无论是外资持股（不超过49%）、申请工作许可证、商务签证还是申请投资促进委员会（BOI）优惠等。\n• <b>创始人人数：</b> 目前只需至少2名股东即可注册。\n\n<b>2. 有限合伙企业 (Limited Partnership)</b>\n• <b>责任：</b> 法律强制要求至少有1名合伙人担任 <i>“管理合伙人”</i>，其必须对企业债务承担 <b>“无限”</b> 责任（若企业出现问题，管理合伙人可能需要动用个人资产偿还债务）。其他合伙人的责任仅限于其投资金额。\n• <b>信誉度：</b> 中等。适合小型企业、家族企业或合伙人对法人形式要求不严的企业。\n• <b>外籍人士：</b> 不推荐。有限合伙企业中如果有外籍人士，将面临极其复杂的法律限制。如果让外籍人士担任管理合伙人，可能会被认定为外资法人，这使得业务运营和申请工作许可证比有限公司困难得多。\n• <b>创始人人数：</b> 与注册公司一样，只需2名创始人。\n\n<b>总结：该如何选择？</b>\n• 如果您追求最高信誉度、计划未来扩张业务或分公司、希望限制风险以免波及个人资产、有外籍股东或计划雇佣外籍员工（申请工作许可证），请选择 <b>“有限公司”</b>。\n• 如果是家族企业或100%信任的密友、企业债务风险低、没有外籍合伙人，且希望管理结构最简单，请选择 <b>“有限合伙企业”</b>。\n\n<i><b>备注：</b> 目前，有限公司和有限合伙企业的注册费、每月会计费及年度财务结算费相差不大。从长远来看，注册为“有限公司”通常能带来最大的利益。</i>"
                },
                {
                    "question": "注册有限合伙企业真的能节省年度会计审计费用（CPA / TA）吗？",
                    "answer": "<b>确实如此。</b> 这是注册有限合伙企业最重要的优势之一。\n\n根据法律规定，如果您的有限合伙企业符合小型企业（Small SME）的标准，即 <b>注册资本不超过 500 万泰铢、总收入不超过 3000 万泰铢且总资产不超过 3000 万泰铢</b>，您有权聘请 <b>税务审计师 (TA - Tax Auditor)</b> 来审计并签署年度财务报表。\n\n通常情况下，TA 的服务费比法律强制所有规模“有限公司”必须使用的注册会计师 (CPA) 更加经济实惠且容易获取。这也使得有限合伙企业的年度管理成本更低。"
                },
                {
                    "question": "有限合伙企业的注册资本（出资额）是什么？如果我没有全额资金还能注册吗？",
                    "answer": "在有限合伙企业中，我们将注册资本称为 <b>“出资额”</b>，可以以现金、实物或劳务出资。<i>“缴纳出资额”</i> 并不是把钱付给某人，而是将资金存入以有限合伙企业名义开立的银行账户中，作为业务的营运资金（在有限合伙企业注册完成后即可开户）。\n\n• <b>如果您没有全额资金：</b> 您可以在有限合伙企业开户后分批存入资金（法律并未强制要求必须立即100%缴足）。您可以先用 1,000 泰铢开设有限合伙企业的账户。如果有与业务相关的支出，您可以将钱存入账户然后再支付出去。这笔钱不需要闲置在账户里。\n• <b>注意事项：</b> 除非有限合伙企业的总投资额 <b>超过 500 万泰铢</b>，法律规定必须有真实资金，并在注册阶段出示所有合伙人的银行存款证明 (Bank Certificate)。"
                },
                {
                    "question": "外国人可以成为有限合伙企业的合伙人吗？",
                    "answer": "在法律上是可以的，<b>但在实际操作和企业管理中，我们极不推荐。</b>\n\n有限合伙企业中有外籍合伙人会涉及相当复杂的法律限制。特别是如果让外国人担任“管理合伙人”，该有限合伙企业可能会被认定为 <b>“外资法人”</b>，这可能导致：\n1. 在泰国被限制从事多种类型的业务（根据《外商经营企业法》）。\n2. 为外国人申请工作许可证 (Work Permit) 和商务签证可能会很麻烦，并且被拒绝的几率比有限公司高得多。\n<i>（如果有外资共同投资，我们建议选择注册为“有限公司”，从长远来看会更顺利且效益最大化。）</i>"
                },
                {
                    "question": "如果我还没有办公室，或者使用租用的房屋/公寓作为地址，可以注册吗？",
                    "answer": "<b>可以注册</b>，条件如下：\n• <b>租用房屋/场地的情况：</b> 必须附上 <i>“场地使用同意书”</i>，以及经签字确认的“户主或产权所有人”的身份证复印件和房屋户口本复印件。\n• <b>公寓 (Condo) 的情况：</b> 尽管法律允许，但应先与该公寓的物业管理方核实，因为许多项目有内部规定，不允许将住宅单元注册为办公室。\n<i>（如果您不方便使用自有地点，我们提供 <b>虚拟办公室 (Virtual Office)</b> 服务为您解决此问题。）</i>"
                },
                {
                    "question": "注册有限合伙企业后，必须马上注册增值税 (VAT 7%) 吗？",
                    "answer": "不一定。注册有限合伙企业和注册增值税 (VAT) 是两个独立的部分。只有当有限合伙企业的营业收入 <b>每年超过 180 万泰铢</b> 时，才会被强制要求注册 VAT。\n\n但是，如果有限合伙企业需要进出口商品，或与要求开具税务发票的 B2B 合作伙伴进行交易，有限合伙企业 <b>必须申请注册增值税 (VAT)</b>，以便从开展业务起就能向合作伙伴开具税务发票。"
                },
                {
                    "question": "有限合伙企业注册完了，但还没有开始销售或没有收入，还需要做账吗？",
                    "answer": "<b>必须做。</b> 根据法律（佛历2543年会计法），强制要求所有类型的法人编制账目，并向商业发展局和税务局提交财务报表，<b>“即使在那一年里没有收入、没有支出，或者根本没有开始营业（零申报）”</b>。如果未按时提交，将面临相当高的法定罚款。"
                },
                {
                    "question": "管理合伙人需要扣除自己的工资来交社保吗？",
                    "answer": "<b>不需要。</b> 作为管理合伙人和企业主，您处于 <b>“雇主”</b> 的地位，而不是员工。因此，您不能也无需在自己的有限合伙企业里登记为被保险人（第33条）。\n\n但一旦有限合伙企业开始雇佣 <b>“全职员工”</b>，法律强制要求有限合伙企业必须办理雇主登记，并在员工入职之日起 30 天内为员工缴纳社保。"
                }
            ]
        }
    },
    "zh-Hant": {
        "hero": {
            "title": "有限合夥企業（Ltd. Part.）註冊。易於管理，節約成本",
            "subtitle": "小型企業的完美選擇",
            "description": "全面邁向法人實體，提升您在合作夥伴和客戶中的信譽。藉助管理更簡便、成本更低的有限合夥企業結構，您無需再為複雜的法律問題而擔憂。我們隨時準備成為您的私人助理，從頭到尾為您打理一切，讓您隨時準備好開展業務。",
            "cta": "+669 2882 5556"
        },
        "promotion": {
            "title": "特別促銷！",
            "subtitle": "專為希望以高性價比創業的人士提供，千萬不要錯過特價和豐厚福利",
            "cta": "立即查看促銷",
            "slug": "limited-partnership-registration-deal"
        },
        "features": {
            "title": "開啟有限合夥企業所需的一切",
            "items": [
                {
                    "title": "諮詢與責任架構規劃",
                    "description": "分析並提供關於指定「管理合夥人」和「有限責任合夥人」的建議，根據具體情況保護您的個人資產免受風險。",
                    "icon": "Lightbulb"
                },
                {
                    "title": "文件與申請準備",
                    "description": "透過數位法人註冊系統（DBD Biz Regist）準確準備註冊申請表並註明出資詳情。",
                    "icon": "FileSignature"
                },
                {
                    "title": "法人註冊提交",
                    "description": "作為您的代表，在每個階段向商業部商業發展局（DBD）辦理並提交申請。",
                    "icon": "Landmark"
                },
                {
                    "title": "申請納稅識別號",
                    "description": "處理法人編號和納稅識別號的申請，為您的有限合夥企業準備好稅務系統。",
                    "icon": "Calculator"
                }
            ]
        },
        "benefits": {
            "title": "誠意滿滿！為您量身定制的專屬特權",
            "items": [
                { "title": "無月度會計綁定！", "icon": "Unlock" },
                { "title": "免費！檢查並保留最多3個有限合夥企業名稱", "icon": "SearchCheck" },
                { "title": "免費！自帶墨水有限合夥企業印章1枚", "icon": "Stamp" },
                { "title": "免費！申請商業發展局（DBD）電子申報密碼", "icon": "KeySquare" },
                { "title": "免費！申請稅務局密碼", "icon": "KeyRound" },
                { "title": "免費！用於開設法人銀行帳戶的文件包", "icon": "Wallet" },
                { "title": "免費！全套有限合夥企業證明文件（DBD）", "icon": "ScrollText" },
                { "title": "免費！稅務技巧培訓課程（價值 5,900 泰銖）", "icon": "GraduationCap" },
                { "title": "免費！用於開具收據/稅務發票的名片", "icon": "Contact2" }
            ]
        },
        "requirements": {
            "title": "註冊有限合夥企業需要準備什麼",
            "subtitle": "只需準備基本資訊，其餘交給我們",
            "documents": {
                "title": "1. 需提供的核心文件",
                "items": [
                    "至少2名合夥人 \n\n1. 泰國合夥人：身分證影本（正反面清晰）\n\n2. 外籍合夥人：護照影本（僅含照片的首頁）",
                    "用作有限合夥企業總部的房屋戶口本。",
                    "印章設計（如有）"
                ]
            },
            "information": {
                "title": "2. 基本業務資訊",
                "items": [
                    "期望的有限合夥企業名稱（泰文-英文）",
                    "各合夥人的出資金額（例如：A先生出資 990,000 泰銖，B先生出資 10,000 泰銖）",
                    "明確合夥人身分（誰擔任「管理合夥人」，誰是「有限責任合夥人」）",
                    "業務性質說明",
                    "有限合夥企業聯絡資訊 \n1. 電話號碼 \n2. 電子郵件",
                    "各合夥人聯絡資訊 \n1. 電話號碼 \n2. 電子郵件 \n3. LINE ID"
                ]
            }
        },
        "process": {
            "title": "輕鬆註冊的4個步驟",
            "steps": [
                {
                    "title": "諮詢與名稱預留",
                    "description": "我們將與您溝通以了解資訊，幫助規劃最符合您需求的有限合夥企業結構，並進行名稱預留。",
                    "icon": "MessageSquareText"
                },
                {
                    "title": "透過政府系統準備文件",
                    "description": "我們的團隊將透過數位法人註冊系統（DBD Biz Regist）準備所有文件和表格。",
                    "icon": "FileStack"
                },
                {
                    "title": "線上身分驗證（方便快捷，無需出行）",
                    "description": "合夥人和管理合夥人透過 ThaiD 或 DBD e-Service 應用程式驗證身分。可選擇掃描 QR 碼或透過個人電子郵件點擊驗證。",
                    "icon": "SmartphoneNfc"
                },
                {
                    "title": "提交註冊並交付",
                    "description": "團隊向商業發展局提交申請。一旦獲批，我們將核實無誤，並將重要文件連同免費贈品直接送到您手中。",
                    "icon": "Gift"
                }
            ]
        },
        "faq": {
            "title": "常見問題 (FAQ)",
            "items": [
                {
                    "question": "管理合夥人與有限責任合夥人有什麼區別？",
                    "answer": "法律將有限合夥企業中的合夥人分為兩大類，這會影響對個人資產的責任，具體如下：\n\n<b>1. 管理合夥人</b> \n法律強制規定有限合夥企業必須至少有1名此類合夥人來管理業務。他們擁有充分的簽名權並對有限合夥企業產生約束力。但需要注意的是，他們必須對有限合夥企業的債務承擔 <b>「無限」</b> 責任（如果企業面臨問題必須關閉，管理合夥人的個人資產可能會被用於償還債務）。\n\n<b>2. 有限責任合夥人</b> \n僅作為「共同投資者」，無權簽署指令或管理業務。其優點是，對有限合夥企業的債務承擔的責任 <b>「僅限於其承諾投資的金額內」</b>（個人資產100%安全）。"
                },
                {
                    "question": "有限公司（Co., Ltd.）和有限合夥企業（Ltd. Part.）有什麼區別？我應該選擇哪種？",
                    "answer": "雖然這兩種形式都具有 <b>「法人」</b> 地位並適用相同的稅率，但主要區別在於 <b>「債務責任」</b>、<b>「信譽度」</b> 和 <b>「對外籍人士的限制」</b>。為便於理解和決定，我們做如下比較：\n\n<b>1. 有限公司 (Company Limited)</b>\n• <b>責任：</b> <i>「有限責任」</i>（董事除外）。所有股東對公司債務的責任僅限於其所持股份的未繳足金額（明確區分個人資金與商業資金，保護個人資產）。\n• <b>信譽度：</b> 極高。適合長期業務、政府招標、承接大型項目、吸引投資者或 B2B（企業對企業）業務。\n• <b>外籍人士/申請工作許可證 (Work Permit)：</b> 最合適。法律和政府機構非常支持有限公司結構，無論是外資持股（不超過49%）、申請工作許可證、商務簽證還是申請投資促進委員會（BOI）優惠等。\n• <b>創始人人數：</b> 目前只需至少2名股東即可註冊。\n\n<b>2. 有限合夥企業 (Limited Partnership)</b>\n• <b>責任：</b> 法律強制要求至少有1名合夥人擔任 <i>「管理合夥人」</i>，其必須對企業債務承擔 <b>「無限」</b> 責任（若企業出現問題，管理合夥人可能需要動用個人資產償還債務）。其他合夥人的責任僅限於其投資金額。\n• <b>信譽度：</b> 中等。適合小型企業、家族企業或合夥人對法人形式要求不嚴的企業。\n• <b>外籍人士：</b> 不推薦。有限合夥企業中如果有外籍人士，將面臨極其複雜的法律限制。如果讓外籍人士擔任管理合夥人，可能會被認定為外資法人，這使得業務運營和申請工作許可證比有限公司困難得多。\n• <b>創始人人數：</b> 與註冊公司一樣，只需2名創始人。\n\n<b>總結：該如何選擇？</b>\n• 如果您追求最高信譽度、計劃未來擴張業務或分公司、希望限制風險以免波及個人資產、有外籍股東或計劃雇傭外籍員工（申請工作許可證），請選擇 <b>「有限公司」</b>。\n• 如果是家族企業或100%信任的密友、企業債務風險低、沒有外籍合夥人，且希望管理結構最簡單，請選擇 <b>「有限合夥企業」</b>。\n\n<i><b>備註：</b> 目前，有限公司和有限合夥企業的註冊費、每月會計費及年度財務結算費相差不大。從長遠來看，註冊為「有限公司」通常能帶來最大的利益。</i>"
                },
                {
                    "question": "註冊有限合夥企業真的能節省年度會計審計費用（CPA / TA）嗎？",
                    "answer": "<b>確實如此。</b> 這是註冊有限合夥企業最重要的優勢之一。\n\n根據法律規定，如果您的有限合夥企業符合小型企業（Small SME）的標準，即 <b>註冊資本不超過 500 萬泰銖、總收入不超過 3000 萬泰銖且總資產不超過 3000 萬泰銖</b>，您有權聘請 <b>稅務審計師 (TA - Tax Auditor)</b> 來審計並簽署年度財務報表。\n\n通常情況下，TA 的服務費比法律強制所有規模「有限公司」必須使用的註冊會計師 (CPA) 更加經濟實惠且容易獲取。這也使得有限合夥企業的年度管理成本更低。"
                },
                {
                    "question": "有限合夥企業的註冊資本（出資額）是什麼？如果我沒有全額資金還能註冊嗎？",
                    "answer": "在有限合夥企業中，我們將註冊資本稱為 <b>「出資額」</b>，可以以現金、實物或勞務出資。<i>「繳納出資額」</i> 並不是把錢付給某人，而是將資金存入以有限合夥企業名義開立的銀行帳戶中，作為業務的營運資金（在有限合夥企業註冊完成後即可開戶）。\n\n• <b>如果您沒有全額資金：</b> 您可以在有限合夥企業開戶後分批存入資金（法律並未強制要求必須立即100%繳足）。您可以先用 1,000 泰銖開設有限合夥企業的帳戶。如果有與業務相關的支出，您可以將錢存入帳戶然後再支付出去。這筆錢不需要閒置在帳戶裡。\n• <b>注意事項：</b> 除非有限合夥企業的總投資額 <b>超過 500 萬泰銖</b>，法律規定必須有真實資金，並在註冊階段出示所有合夥人的銀行存款證明 (Bank Certificate)。"
                },
                {
                    "question": "外國人可以成為有限合夥企業的合夥人嗎？",
                    "answer": "在法律上是可以的，<b>但在實際操作和企業管理中，我們極不推薦。</b>\n\n有限合夥企業中有外籍合夥人會涉及相當複雜的法律限制。特別是如果讓外國人擔任「管理合夥人」，該有限合夥企業可能會被認定為 <b>「外資法人」</b>，這可能導致：\n1. 在泰國被限制從事多種類型的業務（根據《外商經營企業法》）。\n2. 為外國人申請工作許可證 (Work Permit) 和商務簽證可能會很麻煩，並且被拒絕的機率比有限公司高得多。\n<i>（如果有外資共同投資，我們建議選擇註冊為「有限公司」，從長遠來看會更順利且效益最大化。）</i>"
                },
                {
                    "question": "如果我還沒有辦公室，或者使用租用的房屋/公寓作為地址，可以註冊嗎？",
                    "answer": "<b>可以註冊</b>，條件如下：\n• <b>租用房屋/場地的情況：</b> 必須附上 <i>「場地使用同意書」</i>，以及經簽字確認的「戶主或產權所有人」的身分證影本和房屋戶口本影本。\n• <b>公寓 (Condo) 的情況：</b> 儘管法律允許，但應先與該公寓的物業管理方核實，因為許多建案有內部規定，不允許將住宅單元註冊為辦公室。\n<i>（如果您不方便使用自有地點，我們提供 <b>虛擬辦公室 (Virtual Office)</b> 服務為您解決此問題。）</i>"
                },
                {
                    "question": "註冊有限合夥企業後，必須馬上註冊營業稅 (VAT 7%) 嗎？",
                    "answer": "不一定。註冊有限合夥企業和註冊營業稅 (VAT) 是兩個獨立的部分。只有當有限合夥企業的營業收入 <b>每年超過 180 萬泰銖</b> 時，才會被強制要求註冊 VAT。\n\n但是，如果有限合夥企業需要進出口商品，或與要求開具稅務發票的 B2B 合作夥伴進行交易，有限合夥企業 <b>必須申請註冊營業稅 (VAT)</b>，以便從開展業務起就能向合作夥伴開具稅務發票。"
                },
                {
                    "question": "有限合夥企業註冊完了，但還沒有開始銷售或沒有收入，還需要做帳嗎？",
                    "answer": "<b>必須做。</b> 根據法律（佛曆2543年會計法），強制要求所有類型的法人編製帳目，並向商業發展局和稅務局提交財務報表，<b>「即使在那一年裡沒有收入、沒有支出，或者根本沒有開始營業（零申報）」</b>。如果未按時提交，將面臨相當高的法定罰款。"
                },
                {
                    "question": "管理合夥人需要扣除自己的工資來交社會保險嗎？",
                    "answer": "<b>不需要。</b> 作為管理合夥人和企業主，您處於 <b>「雇主」</b> 的地位，而不是員工。因此，您不能也無需在自己的有限合夥企業裡登記為被保險人（第33條）。\n\n但一旦有限合夥企業開始雇傭 <b>「全職員工」</b>，法律強制要求有限合夥企業必須辦理雇主登記，並在員工入職之日起 30 天內為員工繳納社會保險。"
                }
            ]
        }
    },
    "ja": {
        "hero": {
            "title": "合資会社（リミテッド・パートナーシップ）設立登記。管理が簡単でコスト削減",
            "subtitle": "小規模ビジネスに最適な選択肢",
            "description": "本格的な法人へとステップアップし、パートナーや顧客からの信頼を高めましょう。管理が容易でコストを削減できる合資会社の構造により、複雑な法律問題を心配する必要はもうありません。私たちがパーソナルアシスタントとして、最初から最後までサポートし、ビジネスを始める準備を整えます。",
            "cta": "+669 2882 5556"
        },
        "promotion": {
            "title": "特別プロモーション！",
            "subtitle": "コストを抑えてビジネスを始めたい方へ、特別価格と充実した特典をお見逃しなく",
            "cta": "今すぐプロモーションを見る",
            "slug": "limited-partnership-registration-deal"
        },
        "features": {
            "title": "合資会社（リミテッド・パートナーシップ）の立ち上げに必要なすべて",
            "items": [
                {
                    "title": "コンサルティングと責任構造の計画",
                    "description": "「無限責任社員」と「有限責任社員」の指定について分析しアドバイスを提供します。ケースバイケースで個人の資産をリスクから守ります。",
                    "icon": "Lightbulb"
                },
                {
                    "title": "書類および申請書の作成",
                    "description": "デジタル法人登記システム（DBD Biz Regist）を通じて、登記申請書を正確に作成し、出資の詳細を明記します。",
                    "icon": "FileSignature"
                },
                {
                    "title": "法人登記の提出",
                    "description": "お客様の代理として、すべての段階で商務省商業登記局（DBD）への処理と申請を行います。",
                    "icon": "Landmark"
                },
                {
                    "title": "納税者番号の取得",
                    "description": "合資会社の税務システムの準備として、法人番号および納税者番号の取得申請を処理します。",
                    "icon": "Calculator"
                }
            ]
        },
        "benefits": {
            "title": "充実！あなただけの限定特典",
            "items": [
                { "title": "月次会計の縛りなし！", "icon": "Unlock" },
                { "title": "無料！合資会社名の調査と予約（最大3つ）", "icon": "SearchCheck" },
                { "title": "無料！インク内蔵型合資会社印 1個", "icon": "Stamp" },
                { "title": "無料！商業登記局（DBD）電子申告パスワードの取得申請", "icon": "KeySquare" },
                { "title": "無料！歳入局パスワードの取得申請", "icon": "KeyRound" },
                { "title": "無料！法人口座開設用書類一式", "icon": "Wallet" },
                { "title": "無料！合資会社登記簿謄本一式 (DBD)", "icon": "ScrollText" },
                { "title": "無料！税務テクニック研修コース（5,900バーツ相当）", "icon": "GraduationCap" },
                { "title": "無料！領収書・税務請求書発行用名刺", "icon": "Contact2" }
            ]
        },
        "requirements": {
            "title": "合資会社設立に必要なもの",
            "subtitle": "基本的な情報をご準備いただくだけで、あとはお任せください",
            "documents": {
                "title": "1. 必要な重要書類",
                "items": [
                    "2名以上のパートナー \n\n1. タイ人パートナー：IDカードのコピー（表裏が鮮明なもの）\n\n2. 外国人パートナー：パスポートのコピー（顔写真のあるページのみ）",
                    "合資会社の本店所在地として使用する住居登録証（タビアンバーン）",
                    "社印のデザイン（ある場合）"
                ]
            },
            "information": {
                "title": "2. 基本的なビジネス情報",
                "items": [
                    "希望する合資会社名（タイ語・英語）",
                    "各パートナーの出資額（例：A氏 出資990,000バーツ、B氏 出資10,000バーツ）",
                    "パートナーステータスの指定（誰が「無限責任社員」を務め、誰が「有限責任社員」になるか）",
                    "事業内容の説明",
                    "合資会社の連絡先 \n1. 電話番号 \n2. メールアドレス",
                    "各パートナーの連絡先 \n1. 電話番号 \n2. メールアドレス \n3. LINE ID"
                ]
            }
        },
        "process": {
            "title": "簡単4ステップの登記手順",
            "steps": [
                {
                    "title": "ご相談と名称予約",
                    "description": "話し合いを通じて情報を把握し、お客様のニーズに最適な合資会社の構造を計画し、名称の予約を進めます。",
                    "icon": "MessageSquareText"
                },
                {
                    "title": "政府システムを通じた書類作成",
                    "description": "私たちのチームが、デジタル法人登記システム（DBD Biz Regist）を通じてすべての書類とフォームを作成します。",
                    "icon": "FileStack"
                },
                {
                    "title": "オンライン本人確認（便利、来店不要）",
                    "description": "パートナーおよび無限責任社員は、ThaiDまたはDBD e-Serviceアプリを通じて本人確認を行います。QRコードをスキャンするか、個人のメールを通じて確認リンクをクリックすることができます。",
                    "icon": "SmartphoneNfc"
                },
                {
                    "title": "登記提出と納品",
                    "description": "チームが商業登記局に申請を提出します。承認された後、正確性を確認し、重要書類と無料特典を直接お客様にお届けします。",
                    "icon": "Gift"
                }
            ]
        },
        "faq": {
            "title": "よくある質問 (FAQ)",
            "items": [
                {
                    "question": "無限責任社員と有限責任社員の違いは何ですか？",
                    "answer": "法律では、合資会社のパートナーを個人の資産への責任に影響を与える2つの主要なタイプに分けています。\n\n<b>1. 無限責任社員</b> \n法律により、合資会社には事業を管理するためにこのタイプのパートナーが少なくとも1名必要です。彼らは合資会社を拘束する署名権を完全に有しています。しかし注意点として、合資会社の負債に対して <b>「無制限」</b> に責任を負わなければなりません（事業が問題に直面し閉鎖しなければならない場合、無限責任社員の個人資産が借金の返済に充てられる可能性があります）。\n\n<b>2. 有限責任社員</b> \n単に「共同出資者」として機能し、事業に指示を出したり管理したりする権限はありません。利点として、合資会社の負債に対する責任は <b>「約束した出資額を上限とする」</b> 点にあります（個人の資産は100%安全です）。"
                },
                {
                    "question": "株式会社（Co., Ltd.）と合資会社（Ltd. Part.）の違いは何ですか？どちらを選ぶべきですか？",
                    "answer": "どちらの形態も <b>「法人」</b> としての地位を持ち、同じ税率を共有していますが、<b>「負債に対する責任」</b>、<b>「信頼性」</b>、および <b>「外国人に対する制限」</b> に関して大きな違いがあります。理解しやすく決定しやすくするために、以下のように比較します：\n\n<b>1. 株式会社 (Company Limited)</b>\n• <b>責任：</b> <i>「有限責任」</i>（取締役を除く）。すべての株主は、自身が保有する株式の未払い分の金額を限度として会社の負債に対して責任を負います（個人の資金と事業の資金が明確に分離され、個人の資産が保護されます）。\n• <b>信頼性：</b> 非常に高い。長期的なビジネス、政府の入札、大型プロジェクトの引き受け、投資家の誘致、またはB2B（企業間取引）ビジネスに適しています。\n• <b>外国人 / 労働許可証 (Work Permit) の申請：</b> 最も適しています。法律や政府機関は、外国人の株式保有（49％まで）、労働許可証の申請、ビジネスビザ、BOI投資奨励など、株式会社の構造を全面的にサポートしています。\n• <b>発起人の数：</b> 現在、最低2名の株主で設立登記が可能です。\n\n<b>2. 合資会社 (Limited Partnership)</b>\n• <b>責任：</b> 法律により、少なくとも1名のパートナーが <i>「無限責任社員」</i> を務めることが義務付けられており、事業の負債に対して <b>「無制限」</b> に責任を負わなければなりません（事業に問題が生じた場合、無限責任社員は個人の資産で借金を返済しなければならない可能性があります）。他のパートナーの責任は出資額に限定されます。\n• <b>信頼性：</b> 中程度。小規模ビジネス、家族経営 (Family Business)、またはパートナーが法人形態に厳格でない企業に適しています。\n• <b>外国人：</b> お勧めしません。合資会社に外国人が含まれる場合、非常に複雑な法的制限を受けます。外国人が無限責任社員を務める場合、外国法人と解釈される可能性があり、事業運営や労働許可証の申請が株式会社よりもはるかに困難になります。\n• <b>発起人の数：</b> 株式会社の設立と同様に、2名の発起人で設立可能です。\n\n<b>まとめ：どちらを選ぶべきか？</b>\n• 最高の信頼性を求める場合、将来的に事業や支店を拡大する計画がある場合、個人の資産へのリスクを制限したい場合、外国人株主がいる場合、または外国人従業員を雇用する計画がある場合（労働許可証申請）は、<b>「株式会社」</b> を選択してください。\n• 家族経営や100％信頼できる親しい関係である場合、事業の負債リスクが低い場合、外国人パートナーがいない場合、そして最もシンプルな管理構造を重視する場合は、<b>「合資会社」</b> を選択してください。\n\n<i><b>注：</b> 現在、株式会社と合資会社の設立費用、月次会計費用、および年次決算費用に大きな違いはありません。長期的なメリットを最大化するためには、「株式会社」として設立することをお勧めします。</i>"
                },
                {
                    "question": "合資会社の登記で、本当に年次会計監査費用（CPA / TA）のコストを削減できますか？",
                    "answer": "<b>本当です。</b> これは合資会社を登記する上で最も重要な利点の1つです。\n\n法律により、お客様の合資会社が <b>登録資本金500万バーツ以下、総収入3,000万バーツ以下、および総資産3,000万バーツ以下</b> の小規模企業（Small SME）の基準を満たす場合、年次財務諸表の監査と署名に <b>税務監査人 (TA - Tax Auditor)</b> を利用する権利が与えられます。\n\n通常、TAのサービス料金は、法律であらゆる規模の「株式会社」に義務付けられている公認会計士 (CPA) を利用するよりも経済的で利用しやすくなっています。これにより、合資会社の年次管理コストが低くなります。"
                },
                {
                    "question": "合資会社の登録資本金（出資額）とは何ですか？全額を持っていなくても登記できますか？",
                    "answer": "合資会社では、登録資本金を <b>「出資額」</b> と呼び、現金、資産、または労務で出資することができます。<i>「出資額を払い込む」</i> とは、誰かに支払うのではなく、合資会社名義の銀行口座に資金を入金し、事業の運転資金として使用することを意味します（合資会社の登記完了後に口座を開設できます）。\n\n• <b>全額を持っていなくても：</b> 合資会社の口座が開設された後、口座に段階的に資金を入金することができます（法律では直ちに100%を支払うことを強制していません）。まずは1,000バーツで合資会社の口座を開設することから始められます。事業に関連する支出がある場合、口座に資金を入金してそこから支払うことができます。この資金は口座に眠らせておく必要はありません。\n• <b>注意事項：</b> ただし、合資会社の総出資額が <b>500万バーツを超える</b> 場合は例外であり、法律により実際の資金が存在することが求められ、登記の段階で全パートナーの銀行残高証明書 (Bank Certificate) を提示する必要があります。"
                },
                {
                    "question": "外国人も合資会社のパートナーになれますか？",
                    "answer": "法律上は可能ですが、<b>実務上および管理上は強くお勧めしません。</b>\n\n合資会社に外国人のパートナーがいると、かなり複雑な法的制限が伴います。特に外国人が「無限責任社員」になる場合、その合資会社は <b>「外国法人」</b> と解釈される可能性があり、以下の結果を招く恐れがあります：\n1. タイにおいて多くの種類の事業を行うことが制限される（外国人事業法に基づく）。\n2. 外国人のための労働許可証 (Work Permit) やビジネスビザの申請が複雑になり、株式会社に比べて却下される可能性がはるかに高くなる。\n<i>（外国人の共同出資がある場合は、「株式会社」として登記することをお勧めします。その方がスムーズで、長期的にも最大のメリットが得られます。）</i>"
                },
                {
                    "question": "まだオフィスがない場合、または賃貸住宅/コンドミニアムを所在地として使用する場合、登記できますか？",
                    "answer": "<b>登録可能です。</b> 以下の条件を満たす必要があります：\n• <b>賃貸住宅・スペースの場合：</b> <i>「場所使用同意書」</i> とともに、署名済みの「家主または物件所有者」のIDカードのコピーおよび住居登録証（タビアンバーン）のコピーを添付する必要があります。\n• <b>コンドミニアムの場合：</b> 法律上は許可されていますが、事前にそのコンドミニアムの管理組合（法人）に確認する必要があります。多くの物件では、居住ユニットをオフィスとして登記することを禁止する内部規定があります。\n<i>（ご自身の場所を使用するのが不都合な場合は、この問題を解決するための <b>バーチャルオフィス (Virtual Office)</b> サービスをご用意しております。）</i>"
                },
                {
                    "question": "合資会社を登記したら、すぐに付加価値税（VAT 7%）の登録をしなければなりませんか？",
                    "answer": "必ずしもそうではありません。合資会社の登記と付加価値税（VAT）の登録は別のものです。合資会社がVATの登録を義務付けられるのは、事業からの収入が <b>年間180万バーツを超えた場合</b> のみです。\n\nただし、合資会社が商品の輸出入を行う必要がある場合、またはタックスインボイス（税務請求書）の発行を求める取引先と取引を行う場合、パートナーにタックスインボイスを発行できるようにするため、事業開始当初から <b>付加価値税（VAT）の登録を申請する必要があります</b>。"
                },
                {
                    "question": "合資会社を登記しましたが、まだ販売を開始していない、または収入がない場合でも会計処理を行う必要がありますか？",
                    "answer": "<b>行う必要があります。</b> 法律（仏暦2543年会計法）により、すべての形態の法人は会計帳簿を作成し、商業登記局および歳入局に財務諸表を提出することが義務付けられています。<b>「その年に収入がない、支出がない、または事業を全く開始していない（ゼロ申報）場合でも」</b> 提出しなければなりません。期限までに提出を怠った場合、かなり高額な法的罰金が科せられます。"
                },
                {
                    "question": "無限責任社員は、社会保険のために自分自身の給与を天引きする必要がありますか？",
                    "answer": "<b>必要ありません。</b> あなたが無限責任社員であり事業主である場合、従業員ではなく <b>「雇用主」</b> の立場になります。したがって、自身の合資会社で被保険者（第33条）として登録することはできず、その必要もありません。\n\nただし、合資会社が <b>「正社員」</b> の雇用を開始した場合、法律により、合資会社は雇用主登録を行い、従業員が働き始めた日から30日以内に従業員のための社会保険料を納付することが義務付けられています。"
                }
            ]
        }
    },
    "ko": {
        "hero": {
            "title": "합자회사(Ltd. Part.) 등록. 관리의 편의성과 비용 절감",
            "subtitle": "소규모 비즈니스를 위한 완벽한 선택",
            "description": "완벽한 법인으로 도약하여 파트너와 고객에게 신뢰를 높이세요. 관리하기 쉽고 비용을 절감할 수 있는 합자회사 구조를 통해 복잡한 법적 문제는 더 이상 걱정하지 마세요. 저희가 귀하의 개인 비서가 되어 처음부터 끝까지 모든 것을 처리해 드려, 즉시 비즈니스를 시작하실 수 있도록 준비해 드립니다.",
            "cta": "+669 2882 5556"
        },
        "promotion": {
            "title": "특별 프로모션!",
            "subtitle": "가성비 좋게 비즈니스를 시작하고 싶은 분들을 위한 특별한 가격과 풍성한 혜택을 놓치지 마세요.",
            "cta": "지금 프로모션 보기",
            "slug": "limited-partnership-registration-deal"
        },
        "features": {
            "title": "합자회사 시작에 필요한 모든 것",
            "items": [
                {
                    "title": "컨설팅 및 책임 구조 계획",
                    "description": "케이스별로 개인 자산을 위험으로부터 보호하기 위해 '무한책임사원'과 '유한책임사원' 지정에 대한 분석 및 조언을 제공합니다.",
                    "icon": "Lightbulb"
                },
                {
                    "title": "서류 및 신청서 준비",
                    "description": "디지털 법인 등록 시스템(DBD Biz Regist)을 통해 등록 신청서를 정확하게 준비하고 출자 세부 정보를 명시합니다.",
                    "icon": "FileSignature"
                },
                {
                    "title": "법인 등록 제출",
                    "description": "귀하의 대리인으로서 모든 단계에서 상무부 사업개발국(DBD)에 신청서를 처리하고 제출합니다.",
                    "icon": "Landmark"
                },
                {
                    "title": "납세자 식별 번호 신청",
                    "description": "합자회사의 세무 시스템을 준비하기 위해 법인 번호 및 납세자 식별 번호 신청을 처리합니다.",
                    "icon": "Calculator"
                }
            ]
        },
        "benefits": {
            "title": "풍성한 혜택! 귀하만을 위한 독점 혜택",
            "items": [
                { "title": "월 기장 대행 약정 없음!", "icon": "Unlock" },
                { "title": "무료! 최대 3개의 합자회사 이름 조회 및 예약", "icon": "SearchCheck" },
                { "title": "무료! 잉크 내장형 합자회사 인감 1개", "icon": "Stamp" },
                { "title": "무료! 사업개발국(DBD) 전자 신고(e-Filing) 비밀번호 신청", "icon": "KeySquare" },
                { "title": "무료! 국세청 비밀번호 신청", "icon": "KeyRound" },
                { "title": "무료! 법인 은행 계좌 개설용 서류 세트", "icon": "Wallet" },
                { "title": "무료! 합자회사 등기부등본(DBD) 풀세트", "icon": "ScrollText" },
                { "title": "무료! 세무 테크닉 교육 과정 (5,900바트 상당)", "icon": "GraduationCap" },
                { "title": "무료! 영수증/세금계산서 발행용 명함", "icon": "Contact2" }
            ]
        },
        "requirements": {
            "title": "합자회사 등록 준비 사항",
            "subtitle": "기본 정보만 준비해 주시면 나머지는 저희가 알아서 처리하겠습니다.",
            "documents": {
                "title": "1. 필수 핵심 서류",
                "items": [
                    "최소 2명 이상의 파트너 \n\n1. 태국인 파트너: 신분증 사본 (앞뒷면이 선명해야 함)\n\n2. 외국인 파트너: 여권 사본 (사진이 있는 첫 페이지만)",
                    "합자회사의 본점으로 사용할 주소지의 하우스 레지스트리(타비안반)",
                    "법인 인감 도안 (있는 경우)"
                ]
            },
            "information": {
                "title": "2. 기본 비즈니스 정보",
                "items": [
                    "원하는 합자회사 이름 (태국어-영어)",
                    "각 파트너의 출자 금액 (예: A 파트너 출자금 990,000바트, B 파트너 출자금 10,000바트)",
                    "파트너 자격 명시 (누가 '무한책임사원'을 맡고 누가 '유한책임사원'이 되는지)",
                    "사업 내용 설명",
                    "합자회사 연락처 정보 \n1. 전화번호 \n2. 이메일",
                    "각 파트너 연락처 정보 \n1. 전화번호 \n2. 이메일 \n3. LINE ID"
                ]
            }
        },
        "process": {
            "title": "간편한 4단계 등록 절차",
            "steps": [
                {
                    "title": "상담 및 이름 예약",
                    "description": "저희는 상담을 통해 정보를 파악하고, 귀하의 요구에 가장 적합한 합자회사 구조를 계획하도록 도우며, 이름 예약을 진행합니다.",
                    "icon": "MessageSquareText"
                },
                {
                    "title": "정부 시스템을 통한 서류 준비",
                    "description": "저희 팀이 디지털 법인 등록 시스템(DBD Biz Regist)을 통해 모든 서류와 양식을 준비합니다.",
                    "icon": "FileStack"
                },
                {
                    "title": "온라인 본인 인증 (편리함, 방문 불필요)",
                    "description": "파트너 및 무한책임사원은 ThaiD 또는 DBD e-Service 앱을 통해 본인 인증을 진행합니다. QR 코드를 스캔하거나 개인 이메일을 통해 전송된 확인 링크를 클릭하여 인증할 수 있습니다.",
                    "icon": "SmartphoneNfc"
                },
                {
                    "title": "등록 제출 및 전달",
                    "description": "팀에서 사업개발국에 신청서를 제출합니다. 승인되면 정확성을 확인한 후 무료 혜택과 함께 중요 서류를 귀하께 직접 전달해 드립니다.",
                    "icon": "Gift"
                }
            ]
        },
        "faq": {
            "title": "자주 묻는 질문 (FAQ)",
            "items": [
                {
                    "question": "무한책임사원과 유한책임사원의 차이점은 무엇인가요?",
                    "answer": "법적으로 합자회사의 파트너는 개인 자산에 대한 책임에 영향을 미치는 2가지 주요 유형으로 나뉩니다:\n\n<b>1. 무한책임사원</b> \n법적으로 합자회사는 사업 관리를 위해 최소 1명의 이 유형 파트너가 있어야 합니다. 이들은 합자회사를 구속할 수 있는 전적인 서명 권한을 갖습니다. 하지만 주의할 점은 합자회사의 부채에 대해 <b>'무한'</b> 책임을 져야 한다는 것입니다(사업에 문제가 생겨 폐업해야 할 경우 무한책임사원의 개인 자산이 부채 상환에 사용될 수 있습니다).\n\n<b>2. 유한책임사원</b> \n단지 '공동 투자자'로서만 기능하며 사업을 지시하거나 관리할 권한이 없습니다. 장점은 합자회사의 부채에 대한 책임이 <b>'본인이 약속한 출자 금액을 초과하지 않는 범위 내'</b>로 제한된다는 것입니다(개인 자산은 100% 안전합니다)."
                },
                {
                    "question": "유한회사(Co., Ltd.)와 합자회사(Ltd. Part.)의 차이점은 무엇이며 어떤 것을 선택해야 합니까?",
                    "answer": "두 구조 모두 <b>'법인'</b> 자격을 가지며 세율은 동일하지만, <b>'부채에 대한 책임'</b>, <b>'신뢰도'</b>, <b>'외국인에 대한 제한'</b> 측면에서 큰 차이가 있습니다. 이해와 결정을 돕기 위해 다음과 같이 비교해 드립니다:\n\n<b>1. 유한회사 (Company Limited)</b>\n• <b>책임:</b> <i>'유한 책임'</i>(이사 제외). 모든 주주는 자신이 보유한 주식의 미납 금액까지만 회사의 부채에 대한 책임을 집니다(개인의 자금과 사업 자금을 명확히 분리하여 개인 자산을 안전하게 보호합니다).\n• <b>신뢰도:</b> 매우 높음. 장기 비즈니스, 정부 입찰, 대규모 프로젝트 수행, 투자자 유치 또는 B2B(기업 간 거래) 비즈니스에 적합합니다.\n• <b>외국인 / 워크퍼밋 (Work Permit) 신청 시:</b> 가장 적합함. 법률 및 정부 기관은 외국인 지분 보유(최대 49%), 워크퍼밋 신청, 비즈니스 비자, BOI 투자 장려 등 유한회사 구조를 전적으로 지원합니다.\n• <b>필요한 발기인 수:</b> 현재 등록 시 최소 2명의 주주만 필요합니다.\n\n<b>2. 합자회사 (Limited Partnership)</b>\n• <b>책임:</b> 법적으로 최소 1명의 파트너가 <i>'무한책임사원'</i>을 맡아야 하며, 사업의 부채에 대해 <b>'무한'</b> 책임을 져야 합니다(사업에 문제가 발생할 경우 무한책임사원은 개인 자산을 사용하여 부채를 갚아야 할 수도 있습니다). 다른 파트너의 책임은 투자한 금액으로 제한됩니다.\n• <b>신뢰도:</b> 보통. 소규모 비즈니스, 가족 기업(Family Business) 또는 파트너가 법인 형태를 엄격하게 따지지 않는 기업에 적합합니다.\n• <b>외국인:</b> 권장하지 않음. 합자회사에 외국인이 포함될 경우 매우 복잡한 법적 제한이 따릅니다. 외국인이 무한책임사원을 맡을 경우 외국 법인으로 간주될 수 있으며, 유한회사보다 사업 운영 및 워크퍼밋 신청이 훨씬 더 어려워집니다.\n• <b>필요한 발기인 수:</b> 회사 등록과 마찬가지로 2명의 발기인만 필요합니다.\n\n<b>요약: 어떤 것을 선택해야 할까요?</b>\n• 가장 높은 신뢰도를 원하시거나, 향후 사업이나 지점을 확장할 계획이 있거나, 개인 자산에 미치는 위험을 제한하고 싶거나, 외국인 주주가 있거나, 외국인 직원을 고용할 계획(워크퍼밋 신청)이라면 <b>'유한회사'</b>를 선택하십시오.\n• 가족 기업이나 100% 신뢰할 수 있는 가까운 사람들과 함께하고, 부채 리스크가 낮으며, 외국인 파트너가 없고, 가장 단순한 관리 구조를 선호하신다면 <b>'합자회사'</b>를 선택하십시오.\n\n<i><b>참고:</b> 현재 유한회사와 합자회사의 등록 비용, 월 기장 비용, 연간 재무 결산 비용에는 큰 차이가 없습니다. 장기적인 이익을 극대화하려면 '유한회사'로 등록하는 것이 일반적으로 가장 유리합니다.</i>"
                },
                {
                    "question": "합자회사를 등록하면 연간 회계 감사 비용(CPA / TA)을 정말 절약할 수 있나요?",
                    "answer": "<b>사실입니다.</b> 이것이 합자회사를 등록하는 가장 중요한 장점 중 하나입니다.\n\n법적으로 귀하의 합자회사가 <b>등록 자본금 500만 바트 이하, 총수익 3,000만 바트 이하, 총자산 3,000만 바트 이하</b>인 소규모 기업(Small SME)의 기준을 충족하는 경우, 연간 재무제표의 감사 및 서명에 <b>세무 감사인(TA - Tax Auditor)</b>을 이용할 권리가 주어집니다.\n\n일반적으로 TA의 서비스 요금은 모든 규모의 '유한회사'에 법적으로 요구되는 공인회계사(CPA)를 이용하는 것보다 경제적이고 접근하기 쉽습니다. 이로 인해 합자회사의 연간 관리 비용이 낮아지게 됩니다."
                },
                {
                    "question": "합자회사의 등록 자본금(출자금)은 무엇입니까? 전체 금액이 없어도 등록할 수 있나요?",
                    "answer": "합자회사에서는 등록 자본금을 <b>'출자금'</b>이라고 부르며, 현금, 자산 또는 노무로 출자할 수 있습니다. <i>'출자금을 납입한다'</i>는 것은 누군가에게 돈을 지불하는 것이 아니라, 합자회사 명의의 은행 계좌에 자금을 입금하여 사업의 운영 자금으로 사용하는 것을 의미합니다(합자회사 등록 완료 후 계좌를 개설할 수 있습니다).\n\n• <b>전체 금액을 한 번에 보유하고 있지 않은 경우:</b> 합자회사의 계좌가 개설된 후 계좌에 점진적으로 자금을 입금할 수 있습니다(법적으로 즉시 100% 납입을 강제하지 않습니다). 먼저 1,000바트로 합자회사 계좌를 개설하여 시작할 수 있습니다. 사업 관련 지출이 생기면 계좌에 돈을 입금하고 지급할 수 있습니다. 이 금액은 계좌에 유휴 상태로 둘 필요가 없습니다.\n• <b>주의 사항:</b> 합자회사의 총 투자액이 <b>500만 바트를 초과</b>하는 경우는 예외로, 법적으로 실제 자금이 존재해야 하며 등록 과정에서 모든 파트너의 은행 잔고 증명서(Bank Certificate)를 제시해야 합니다."
                },
                {
                    "question": "외국인도 합자회사의 파트너가 될 수 있나요?",
                    "answer": "법적으로는 가능하지만, <b>실무 및 관리적인 측면에서는 절대 권장하지 않습니다.</b>\n\n합자회사에 외국인 파트너를 두는 것은 상당히 복잡한 법적 제한을 수반합니다. 특히 외국인이 '무한책임사원'이 되는 경우, 해당 합자회사는 <b>'외국 법인'</b>으로 해석될 수 있으며 다음과 같은 결과를 초래할 수 있습니다:\n1. 태국 내 여러 유형의 사업 운영이 제한됩니다(외국인사업법에 따름).\n2. 외국인을 위한 워크퍼밋(Work Permit) 및 비즈니스 비자 신청이 복잡해지며 유한회사보다 거절될 확률이 훨씬 높습니다.\n<i>(외국인 공동 투자가 있는 경우 '유한회사'로 등록하는 것을 권장하며, 이는 장기적으로 더 순조롭고 최대의 이익을 가져다줄 것입니다.)</i>"
                },
                {
                    "question": "아직 사무실이 없거나 임대 주택/콘도를 주소지로 사용하는 경우 등록할 수 있나요?",
                    "answer": "<b>등록할 수 있습니다.</b> 단, 다음 조건을 충족해야 합니다:\n• <b>임대 주택/공간의 경우:</b> <i>'장소 사용 동의서'</i>와 함께 서명이 완료된 '세대주 또는 건물주'의 신분증 사본 및 타비안반(하우스 레지스트리) 사본을 첨부해야 합니다.\n• <b>콘도미니엄의 경우:</b> 법적으로는 허용되지만, 주거용 호실을 사무실로 등록하는 것을 금지하는 내부 규정이 있는 곳이 많으므로 사전에 해당 콘도의 관리사무소(법인)에 확인해야 합니다.\n<i>(본인의 장소를 사용하기 불편하신 경우, 이 문제를 해결해 드릴 <b>가상 오피스(Virtual Office)</b> 서비스를 제공하고 있습니다.)</i>"
                },
                {
                    "question": "합자회사를 등록하면 즉시 부가가치세(VAT 7%)를 등록해야 하나요?",
                    "answer": "반드시 그런 것은 아닙니다. 합자회사 등록과 부가가치세(VAT) 등록은 별개의 문제입니다. 합자회사는 사업 소득이 <b>연간 180만 바트를 초과하는 경우</b>에만 VAT 등록이 의무화됩니다.\n\n하지만 합자회사가 상품을 수출입해야 하거나 세금계산서 발행을 요구하는 거래처와 거래를 하는 경우, 사업을 시작할 때부터 파트너에게 세금계산서를 발행할 수 있도록 <b>부가가치세(VAT) 등록을 신청해야 합니다.</b>"
                },
                {
                    "question": "합자회사를 등록했지만 아직 판매를 시작하지 않았거나 수익이 없는 경우에도 회계 처리를 해야 하나요?",
                    "answer": "<b>해야 합니다.</b> 법률(불기 2543년 회계법)에 따라 모든 형태의 법인은 회계 장부를 작성하고 상무부 사업개발국 및 국세청에 재무제표를 제출해야 합니다. <b>'해당 연도에 수익이 없거나, 지출이 없거나, 사업을 아예 시작하지 않았더라도(무실적 신고)'</b> 제출해야 합니다. 기한 내에 제출을 게을리하면 상당히 높은 법적 벌금이 부과됩니다."
                },
                {
                    "question": "무한책임사원은 사회보험을 위해 본인의 급여를 공제해야 합니까?",
                    "answer": "<b>필요 없습니다.</b> 귀하는 무한책임사원이자 사업주로서 직원이 아닌 <b>'고용주'</b>의 입장이 됩니다. 따라서 자신의 합자회사에서 피보험자(제33조)로 등록할 수 없으며 그럴 필요도 없습니다.\n\n다만 합자회사가 <b>'정규직 직원'</b>을 고용하기 시작하면, 법에 따라 합자회사는 고용주 등록을 하고 직원이 근무를 시작한 날로부터 30일 이내에 직원을 위한 사회보험료를 납부해야 합니다."
                }
            ]
        }
    },
    "de": {
        "hero": {
            "title": "Registrierung einer Limited Partnership (Kommanditgesellschaft). Einfach zu verwalten, kostengünstig.",
            "subtitle": "Die perfekte Wahl für kleine Unternehmen.",
            "description": "Treten Sie als vollständig registrierte juristische Person auf, um die Glaubwürdigkeit bei Ihren Partnern und Kunden zu erhöhen. Mit einer Limited Partnership-Struktur, die einfacher zu verwalten und kostengünstiger ist, müssen Sie sich keine Sorgen mehr über komplexe rechtliche Angelegenheiten machen. Wir stehen bereit, um als Ihr persönlicher Assistent alles von Anfang bis Ende zu erledigen, damit Sie startklar für Ihr Geschäft sind.",
            "cta": "+669 2882 5556"
        },
        "promotion": {
            "title": "Sonderaktion!",
            "subtitle": "Verpassen Sie nicht die Sonderpreise und die vielen exklusiven Vorteile für alle, die kostengünstig ein Unternehmen gründen möchten.",
            "cta": "Jetzt Aktion ansehen",
            "slug": "limited-partnership-registration-deal"
        },
        "features": {
            "title": "Alles, was Sie brauchen, um eine Limited Partnership zu gründen",
            "items": [
                {
                    "title": "Beratung und Haftungsstrukturierung",
                    "description": "Analyse und Beratung bei der Festlegung des \"Managing Partner\" und des \"Limited Liability Partner\", um Ihr Privatvermögen fallweise vor Risiken zu schützen.",
                    "icon": "Lightbulb"
                },
                {
                    "title": "Dokumenten- und Antragsstellung",
                    "description": "Genaue Erstellung der Registrierungsanträge und Angabe der Kapitalbeteiligungen über das digitale Registrierungssystem für juristische Personen (DBD Biz Regist).",
                    "icon": "FileSignature"
                },
                {
                    "title": "Einreichung der Registrierung",
                    "description": "Wir handeln als Ihr Vertreter und kümmern uns in jeder Phase um die Beantragung und Einreichung beim Department of Business Development des Handelsministeriums.",
                    "icon": "Landmark"
                },
                {
                    "title": "Beantragung der Steuernummer",
                    "description": "Abwicklung der Beantragung der Firmennummer und der Steuernummer, um das Steuersystem für Ihre Limited Partnership vorzubereiten.",
                    "icon": "Calculator"
                }
            ]
        },
        "benefits": {
            "title": "Volle Ausstattung! Exklusive Privilegien nur für Sie",
            "items": [
                { "title": "Keine monatliche Buchhaltungsverpflichtung!", "icon": "Unlock" },
                { "title": "KOSTENLOS! Prüfung und Reservierung von bis zu 3 Namen für die Limited Partnership", "icon": "SearchCheck" },
                { "title": "KOSTENLOS! 1 selbstfärbender Firmenstempel", "icon": "Stamp" },
                { "title": "KOSTENLOS! Beantragung des e-Filing-Passworts für das DBD", "icon": "KeySquare" },
                { "title": "KOSTENLOS! Beantragung des Passworts für das Finanzamt (Revenue Department)", "icon": "KeyRound" },
                { "title": "KOSTENLOS! Dokumenten-Set zur Eröffnung eines Firmen-Bankkontos", "icon": "Wallet" },
                { "title": "KOSTENLOS! Kompletter Satz von Unternehmenszertifikaten (DBD)", "icon": "ScrollText" },
                { "title": "KOSTENLOS! Schulungskurs für Steuertechniken (Wert 5.900 THB)", "icon": "GraduationCap" },
                { "title": "KOSTENLOS! Visitenkarten zur Ausstellung von Quittungen/Steuerrechnungen", "icon": "Contact2" }
            ]
        },
        "requirements": {
            "title": "Was Sie für die Registrierung der Limited Partnership vorbereiten müssen",
            "subtitle": "Bereiten Sie einfach die grundlegenden Informationen vor, wir erledigen den Rest.",
            "documents": {
                "title": "1. Erforderliche wichtige Dokumente",
                "items": [
                    "Mindestens 2 Partner \n\n1. Thailändische Partner: Kopie des Personalausweises (Klare Kopie der Vorder- und Rückseite)\n\n2. Ausländische Partner: Kopie des Reisepasses (Nur die erste Seite mit dem Foto)",
                    "Hausregistrierung (Tabien Baan), die als Hauptsitz der Limited Partnership genutzt wird.",
                    "Stempeldesign (falls vorhanden)"
                ]
            },
            "information": {
                "title": "2. Grundlegende Geschäftsinformationen",
                "items": [
                    "Gewünschter Name der Limited Partnership (Thai-Englisch)",
                    "Höhe der Kapitalbeteiligung jeder Person (z. B. Herr A bringt 990.000 THB ein, Herr B bringt 10.000 THB ein)",
                    "Angabe des Partnerstatus (Wer fungiert als \"Managing Partner\" und wer als \"Limited Liability Partner\")",
                    "Beschreibung der Geschäftstätigkeit",
                    "Kontaktinformationen der Limited Partnership \n1. Telefonnummer \n2. E-Mail",
                    "Kontaktinformationen jedes Partners \n1. Telefonnummer \n2. E-Mail \n3. LINE ID"
                ]
            }
        },
        "process": {
            "title": "4 einfache Registrierungsschritte",
            "steps": [
                {
                    "title": "Beratung und Namensreservierung",
                    "description": "Wir besprechen alles, um Informationen zu sammeln, helfen bei der Planung der Struktur der Limited Partnership, die Ihren Bedürfnissen am besten entspricht, und fahren mit der Namensreservierung fort.",
                    "icon": "MessageSquareText"
                },
                {
                    "title": "Vorbereitung der Dokumente über das Regierungssystem",
                    "description": "Unser Team bereitet alle Dokumente und Formulare über das digitale Registrierungssystem für juristische Personen (DBD Biz Regist) vor.",
                    "icon": "FileStack"
                },
                {
                    "title": "Online-Identitätsprüfung (Bequem, keine Anreise erforderlich)",
                    "description": "Partner und der Managing Partner verifizieren ihre Identität über die App ThaiD oder DBD e-Service. Sie können wählen, ob sie einen QR-Code scannen oder zur Verifizierung auf einen Link in ihrer persönlichen E-Mail klicken möchten.",
                    "icon": "SmartphoneNfc"
                },
                {
                    "title": "Einreichung der Registrierung und Lieferung",
                    "description": "Unser Team reicht den Antrag beim Department of Business Development ein. Sobald er genehmigt ist, prüfen wir die Richtigkeit und liefern die wichtigen Dokumente zusammen mit den Gratisgeschenken direkt an Sie aus.",
                    "icon": "Gift"
                }
            ]
        },
        "faq": {
            "title": "Häufig gestellte Fragen (FAQ)",
            "items": [
                {
                    "question": "Was ist der Unterschied zwischen einem Managing Partner und einem Limited Liability Partner?",
                    "answer": "Das Gesetz unterteilt die Partner in einer Limited Partnership in zwei Haupttypen, was sich auf ihre Haftung hinsichtlich des Privatvermögens wie folgt auswirkt:\n\n<b>1. Managing Partner</b> \nDas Gesetz schreibt vor, dass eine Limited Partnership mindestens einen Partner dieser Art haben muss, um das Geschäft zu leiten. Sie haben die volle Befugnis, die Limited Partnership vertraglich zu binden. Zu beachten ist jedoch, dass sie für die Schulden der Limited Partnership <b>\"unbeschränkt\"</b> haften müssen (wenn das Unternehmen Probleme hat und schließen muss, kann das Privatvermögen des Managing Partners zur Schuldentilgung herangezogen werden).\n\n<b>2. Limited Liability Partner</b> \nFungiert nur als \"Mitinvestor\" ohne das Recht, Anweisungen zu unterzeichnen oder das Geschäft zu leiten. Der Vorteil ist, dass die Haftung für die Schulden der Limited Partnership <b>\"auf den Betrag beschränkt ist, den sie zu investieren versprochen haben\"</b> (100% sicher für das Privatvermögen)."
                },
                {
                    "question": "Was ist der Unterschied zwischen einer Company Limited (Co., Ltd.) und einer Limited Partnership (Ltd. Part.) und welche sollte ich wählen?",
                    "answer": "Obwohl beide Strukturen den Status einer <b>\"juristischen Person\"</b> haben und denselben Steuersätzen unterliegen, gibt es große Unterschiede in Bezug auf <b>\"Haftung für Schulden\"</b>, <b>\"Glaubwürdigkeit\"</b> und <b>\"Beschränkungen für Ausländer\"</b>. Zum leichteren Verständnis und zur Entscheidungsfindung hier ein Vergleich:\n\n<b>1. Company Limited</b>\n• <b>Haftung:</b> <i>\"Beschränkte Haftung\"</i> (außer für Direktoren). Alle Aktionäre haften für die Schulden des Unternehmens nur bis zur Höhe des nicht eingezahlten Betrags der von ihnen gehaltenen Aktien (dies trennt private Finanzen klar von geschäftlichen Finanzen und schützt das Privatvermögen).\n• <b>Glaubwürdigkeit:</b> Sehr hoch. Geeignet für langfristige Geschäfte, Regierungsaufträge, große Projekte, die Gewinnung von Investoren oder B2B-Geschäfte (Business-to-Business).\n• <b>Im Falle von Ausländern / Beantragung einer Arbeitserlaubnis (Work Permit):</b> Sehr gut geeignet. Das Gesetz und die Regierungsbehörden unterstützen die Struktur der Company Limited in vollem Umfang, sei es bei ausländischen Beteiligungen (bis zu 49%), Beantragung einer Arbeitserlaubnis, Geschäftsvisa oder BOI-Investitionsförderungen usw.\n• <b>Anzahl der Gründer:</b> Derzeit sind für die Registrierung mindestens 2 Aktionäre erforderlich.\n\n<b>2. Limited Partnership</b>\n• <b>Haftung:</b> Das Gesetz schreibt vor, dass mindestens 1 Partner als <i>\"Managing Partner\"</i> fungieren muss, der für die Schulden des Unternehmens <b>\"unbeschränkt\"</b> haftet (wenn das Unternehmen Probleme hat, muss der Managing Partner möglicherweise Privatvermögen zur Schuldentilgung heranziehen). Die Haftung der anderen Partner ist auf das investierte Geld beschränkt.\n• <b>Glaubwürdigkeit:</b> Moderat. Geeignet für kleine Unternehmen, Familienunternehmen oder Unternehmen, bei denen die Partner nicht allzu streng mit der Form der juristischen Person sind.\n• <b>Im Falle von Ausländern:</b> Nicht empfohlen. Ausländer in einer Limited Partnership unterliegen sehr komplexen rechtlichen Einschränkungen. Wenn ein Ausländer Managing Partner wird, könnte dies als ausländische juristische Person ausgelegt werden, was den Geschäftsbetrieb und die Beantragung einer Arbeitserlaubnis viel schwieriger macht als bei einer Company Limited.\n• <b>Anzahl der Gründer:</b> Benötigt nur 2 Gründer, genau wie bei der Registrierung eines Unternehmens.\n\n<b>Zusammenfassung: Welche sollten Sie wählen?</b>\n• Wählen Sie eine <b>\"Company Limited\"</b>, wenn Sie höchste Glaubwürdigkeit anstreben, Pläne zur zukünftigen Erweiterung des Unternehmens oder der Filialen haben, das Risiko für Ihr Privatvermögen begrenzen möchten, ausländische Aktionäre haben oder planen, ausländische Mitarbeiter einzustellen (Beantragung einer Arbeitserlaubnis).\n• Wählen Sie eine <b>\"Limited Partnership\"</b>, wenn es sich um ein Familienunternehmen handelt oder enge Vertraute, denen Sie zu 100% vertrauen, das Unternehmen kein hohes Schuldenrisiko hat, es keine ausländischen Partner gibt und Sie Wert auf die einfachste Managementstruktur legen.\n\n<i><b>Hinweis:</b> Derzeit unterscheiden sich die Kosten für Registrierung, monatliche Buchhaltung und Jahresabschluss für Co., Ltd. und Ltd. Part. nicht wesentlich. Die Registrierung als \"Company Limited\" bietet auf lange Sicht im Allgemeinen die maximalen Vorteile.</i>"
                },
                {
                    "question": "Spart die Registrierung einer Limited Partnership wirklich Kosten bei der jährlichen Buchprüfung (CPA / TA)?",
                    "answer": "<b>Wahr.</b> Dies ist einer der wichtigsten Vorteile bei der Registrierung einer Limited Partnership.\n\nWenn Ihre Limited Partnership laut Gesetz die Kriterien eines Kleinunternehmens (Small SME) erfüllt, d.h. ein <b>registriertes Kapital von höchstens 5 Millionen THB, Gesamteinnahmen von höchstens 30 Millionen THB und eine Bilanzsumme von höchstens 30 Millionen THB</b> hat, sind Sie berechtigt, einen <b>Steuerprüfer (TA - Tax Auditor)</b> zur Prüfung und Unterzeichnung des Jahresabschlusses heranzuziehen.\n\nNormalerweise sind die Servicegebühren eines TA wirtschaftlicher und zugänglicher im Vergleich zur Beauftragung eines Wirtschaftsprüfers (CPA), den das Gesetz für \"Company Limited\" aller Unternehmensgrößen vorschreibt. Dies führt dazu, dass die Limited Partnership niedrigere jährliche Verwaltungskosten hat."
                },
                {
                    "question": "Was ist das registrierte Kapital (Kapitalbeteiligung) einer Limited Partnership? Kann ich mich registrieren, wenn ich nicht den gesamten Pauschalbetrag habe?",
                    "answer": "Bei einer Limited Partnership bezeichnen wir das registrierte Kapital als <b>\"Kapitalbeteiligung\"</b>, die in Form von Bargeld, Vermögenswerten oder Arbeit investiert werden kann. <i>\"Einzahlung der Kapitalbeteiligung\"</i> bedeutet nicht, dass Sie jemandem Geld zahlen, sondern dass Sie Kapital auf ein Bankkonto im Namen der Limited Partnership einzahlen, um es als Betriebskapital für das Geschäft zu verwenden (das Konto kann nach Abschluss der Registrierung der Limited Partnership eröffnet werden).\n\n• <b>Wenn Sie nicht den gesamten Pauschalbetrag haben:</b> Sie können nach Eröffnung des Kontos der Limited Partnership schrittweise Geld auf das Konto einzahlen (das Gesetz zwingt Sie nicht dazu, sofort 100% vollständig zu zahlen). Sie können zunächst das Konto der Limited Partnership mit 1.000 THB eröffnen. Wenn geschäftsbezogene Ausgaben anfallen, können Sie Geld auf das Konto einzahlen und es dann auszahlen. Dieser Pauschalbetrag muss nicht ungenutzt auf dem Konto liegen.\n• <b>Vorsichtsmaßnahmen:</b> Außer in dem Fall, dass die Limited Partnership eine Gesamtinvestition von <b>mehr als 5 Millionen THB</b> hat. Das Gesetz verlangt in diesem Fall, dass das tatsächliche Geld vorhanden sein muss und ein Bankzertifikat (Bank Certificate) aller Partner während des Registrierungsprozesses vorgelegt werden muss."
                },
                {
                    "question": "Können Ausländer Partner in einer Limited Partnership werden?",
                    "answer": "Rechtlich ist dies möglich, <b>aber praktisch und verwaltungstechnisch raten wir dringend davon ab.</b>\n\nEinen Ausländer als Partner in einer Limited Partnership zu haben, ist mit recht komplexen rechtlichen Einschränkungen verbunden. Besonders wenn ein Ausländer \"Managing Partner\" wird, könnte die Limited Partnership als <b>\"Ausländische juristische Person\"</b> ausgelegt werden, was zu Folgendem führen könnte:\n1. Einschränkung des Betriebs vieler Arten von Unternehmen in Thailand (gemäß dem Gesetz über ausländische Unternehmen).\n2. Die Beantragung einer Arbeitserlaubnis (Work Permit) und eines Geschäftsvisums für Ausländer kann kompliziert sein und hat eine viel höhere Chance auf Ablehnung als bei einer Company Limited.\n<i>(Wenn es ausländische Mitinvestitionen gibt, empfehlen wir die Registrierung als \"Company Limited\", was reibungsloser abläuft und auf lange Sicht maximale Vorteile bietet.)</i>"
                },
                {
                    "question": "Wenn ich noch kein Büro habe oder ein gemietetes Haus/eine Eigentumswohnung als Standort verwende, kann ich mich dann registrieren?",
                    "answer": "<b>Kann registriert werden</b> unter folgenden Bedingungen:\n• <b>Bei einem gemieteten Haus/gemieteten Raum:</b> Sie müssen eine <i>\"Einverständniserklärung zur Nutzung der Räumlichkeiten\"</i> zusammen mit ordnungsgemäß beglaubigten Kopien des Personalausweises und der Hausregistrierung des \"Hausmeisters oder Grundstückseigentümers\" beifügen.\n• <b>Im Falle einer Eigentumswohnung (Condominium):</b> Obwohl das Gesetz dies zulässt, sollten Sie sich zunächst bei der juristischen Person der Eigentumswohnung erkundigen, da viele Projekte interne Vorschriften haben, die es nicht erlauben, Wohnräume als Büro zu registrieren.\n<i>(Wenn die Nutzung Ihres eigenen Ortes für Sie nicht praktikabel ist, steht Ihnen unser <b>Virtual Office</b>-Service zur Verfügung, um dieses Problem zu lösen.)</i>"
                },
                {
                    "question": "Muss ich mich nach der Registrierung der Limited Partnership sofort für die Mehrwertsteuer (VAT 7%) registrieren?",
                    "answer": "Nicht unbedingt. Die Registrierung einer Limited Partnership und die Registrierung für die Mehrwertsteuer (VAT) sind zwei verschiedene Dinge. Eine Limited Partnership ist nur dann zur Registrierung für die Mehrwertsteuer verpflichtet, wenn sie Geschäftseinnahmen von <b>mehr als 1,8 Millionen THB pro Jahr</b> erzielt.\n\nWenn die Limited Partnership jedoch Waren importieren/exportieren muss oder mit B2B-Partnern zusammenarbeitet, bei denen Partner die Ausstellung von Steuerrechnungen verlangen, <b>muss die Limited Partnership die Mehrwertsteuerregistrierung beantragen</b>, um von Beginn des Geschäfts an Steuerrechnungen an die Partner ausstellen zu können."
                },
                {
                    "question": "Muss ich nach der Registrierung der Limited Partnership, auch wenn noch keine Verkäufe getätigt oder keine Einnahmen erzielt wurden, Buchhaltung betreiben?",
                    "answer": "<b>Muss erledigt werden.</b> Laut Gesetz (Rechnungslegungsgesetz B.E. 2543) sind alle Arten von juristischen Personen verpflichtet, Konten zu führen und Jahresabschlüsse beim Department of Business Development und beim Revenue Department einzureichen, <b>\"selbst wenn in diesem Jahr keine Einnahmen, keine Ausgaben oder der Geschäftsbetrieb noch nicht aufgenommen wurde (Nullerklärung)\"</b>. Ein Versäumnis, diese rechtzeitig einzureichen, zieht relativ hohe gesetzliche Geldstrafen nach sich."
                },
                {
                    "question": "Muss der Managing Partner sein eigenes Gehalt für die Sozialversicherung abziehen?",
                    "answer": "<b>Nicht nötig.</b> Da Sie der Managing Partner und Geschäftsinhaber sind, haben Sie die Position eines <b>\"Arbeitgebers\"</b> inne, nicht die eines Arbeitnehmers. Daher können und müssen Sie sich in Ihrer eigenen Limited Partnership nicht als versicherte Person (Artikel 33) registrieren.\n\nWenn die Limited Partnership jedoch beginnt, <b>\"Vollzeitmitarbeiter\"</b> einzustellen, ist die Limited Partnership gesetzlich verpflichtet, sich als Arbeitgeber zu registrieren und die Sozialversicherung für die Mitarbeiter innerhalb von 30 Tagen ab dem Datum der Einstellung abzuführen."
                }
            ]
        }
    },
    "fr": {
        "hero": {
            "title": "Enregistrement de Société en Commandite (Limited Partnership). Gestion facile, économique.",
            "subtitle": "Le choix idéal pour les petites entreprises.",
            "description": "Faites le pas vers une personne morale à part entière pour renforcer votre crédibilité auprès de vos partenaires et clients. Avec une structure de Société en Commandite plus facile à gérer et plus économique, vous n'avez plus à vous soucier des lois complexes. Nous sommes prêts à être votre assistant personnel, en nous occupant de tout, du début à la fin, jusqu'à ce que vous soyez prêt à exploiter votre entreprise.",
            "cta": "+669 2882 5556"
        },
        "promotion": {
            "title": "Promotion Spéciale !",
            "subtitle": "Ne manquez pas les prix spéciaux et les privilèges complets pour ceux qui souhaitent démarrer une entreprise de manière rentable.",
            "cta": "Voir la promotion maintenant",
            "slug": "limited-partnership-registration-deal"
        },
        "features": {
            "title": "Tout ce dont vous avez besoin pour démarrer une Société en Commandite",
            "items": [
                {
                    "title": "Conseil et structuration des responsabilités",
                    "description": "Analyse et conseils sur la désignation du « Commandité » et du « Commanditaire » afin de protéger vos biens personnels contre les risques, au cas par cas.",
                    "icon": "Lightbulb"
                },
                {
                    "title": "Préparation des documents et de la demande",
                    "description": "Préparation précise des formulaires de demande d'enregistrement et spécification des détails de l'apport en capital via le système d'enregistrement numérique des personnes morales (DBD Biz Regist).",
                    "icon": "FileSignature"
                },
                {
                    "title": "Soumission de l'enregistrement de la personne morale",
                    "description": "Nous agissons en tant que votre représentant pour soumettre les demandes au Département du Développement des Affaires, Ministère du Commerce, à chaque étape.",
                    "icon": "Landmark"
                },
                {
                    "title": "Demande de numéro d'identification fiscale",
                    "description": "Prise en charge de la demande du numéro d'entité juridique et du numéro d'identification fiscale pour préparer le système fiscal de votre Société en Commandite.",
                    "icon": "Calculator"
                }
            ]
        },
        "benefits": {
            "title": "Complet ! Des privilèges exclusifs rien que pour vous",
            "items": [
                { "title": "Aucun engagement comptable mensuel !", "icon": "Unlock" },
                { "title": "GRATUIT ! Vérification et réservation de jusqu'à 3 noms de Société en Commandite", "icon": "SearchCheck" },
                { "title": "GRATUIT ! 1 tampon de Société en Commandite auto-encreur", "icon": "Stamp" },
                { "title": "GRATUIT ! Demande de mot de passe e-Filing pour le DBD", "icon": "KeySquare" },
                { "title": "GRATUIT ! Demande de mot de passe pour le Département du Revenu", "icon": "KeyRound" },
                { "title": "GRATUIT ! Ensemble de documents pour l'ouverture d'un compte bancaire professionnel", "icon": "Wallet" },
                { "title": "GRATUIT ! Ensemble complet de certificats de Société en Commandite (DBD)", "icon": "ScrollText" },
                { "title": "GRATUIT ! Cours de formation en techniques fiscales (Valeur 5 900 THB)", "icon": "GraduationCap" },
                { "title": "GRATUIT ! Cartes de visite pour l'émission de reçus / factures fiscales", "icon": "Contact2" }
            ]
        },
        "requirements": {
            "title": "Ce qu'il faut préparer pour l'enregistrement d'une Société en Commandite",
            "subtitle": "Préparez simplement les informations de base, nous nous occupons du reste.",
            "documents": {
                "title": "1. Documents importants requis",
                "items": [
                    "Au moins 2 partenaires \n\n1. Partenaires thaïlandais : Copie de la carte d'identité (Copie claire du recto et du verso)\n\n2. Partenaires étrangers : Copie du passeport (Uniquement la première page avec photo)",
                    "Livret de famille (Tabien Baan) à utiliser comme siège social de la Société en Commandite.",
                    "Conception du tampon (le cas échéant)"
                ]
            },
            "information": {
                "title": "2. Informations de base sur l'entreprise",
                "items": [
                    "Nom de Société en Commandite souhaité (Thaï-Anglais)",
                    "Montant de l'apport en capital de chaque personne (par ex., M. A apporte 990 000 THB, M. B apporte 10 000 THB)",
                    "Spécification du statut du partenaire (Qui agit en tant que « Commandité » et qui est le « Commanditaire »)",
                    "Description des opérations commerciales",
                    "Coordonnées de la Société en Commandite \n1. Numéro de téléphone \n2. E-mail",
                    "Coordonnées de chaque partenaire \n1. Numéro de téléphone \n2. E-mail \n3. ID LINE"
                ]
            }
        },
        "process": {
            "title": "4 étapes simples pour l'enregistrement",
            "steps": [
                {
                    "title": "Consultation et réservation de nom",
                    "description": "Nous discuterons pour recueillir des informations, aiderons à planifier la structure de Société en Commandite qui correspond le mieux à vos besoins, et procéderons à la réservation du nom.",
                    "icon": "MessageSquareText"
                },
                {
                    "title": "Préparation des documents via le système gouvernemental",
                    "description": "Notre équipe prépare tous les documents et formulaires via le système d'enregistrement numérique des personnes morales (DBD Biz Regist).",
                    "icon": "FileStack"
                },
                {
                    "title": "Vérification d'identité en ligne (Pratique, sans déplacement)",
                    "description": "Les partenaires et le commandité vérifient leur identité via l'application ThaiD ou DBD e-Service. Ils peuvent choisir de scanner un code QR ou de cliquer pour vérifier via leur e-mail personnel.",
                    "icon": "SmartphoneNfc"
                },
                {
                    "title": "Soumission de l'enregistrement et livraison",
                    "description": "Notre équipe soumet la demande au Département du Développement des Affaires. Une fois approuvée, nous vérifierons l'exactitude et vous livrerons directement les documents essentiels ainsi que vos cadeaux gratuits.",
                    "icon": "Gift"
                }
            ]
        },
        "faq": {
            "title": "Foire Aux Questions",
            "items": [
                {
                    "question": "Quelle est la différence entre un Commandité et un Commanditaire ?",
                    "answer": "La loi divise les partenaires d'une Société en Commandite en 2 types principaux, ce qui affecte leur responsabilité vis-à-vis des biens personnels, comme suit :\n\n<b>1. Commandité</b> \nLa loi exige qu'une Société en Commandite ait au moins 1 partenaire de ce type pour gérer l'entreprise. Ils ont le plein pouvoir de signer et d'engager la Société en Commandite. Cependant, la mise en garde est qu'ils doivent être responsables des dettes de la Société en Commandite de manière <b>« illimitée »</b> (si l'entreprise rencontre des problèmes et doit fermer, les biens personnels du commandité peuvent être utilisés pour rembourser les dettes).\n\n<b>2. Commanditaire</b> \nAgit uniquement en tant que « co-investisseur » sans droit de signer des ordres ou de gérer l'entreprise. L'avantage est qu'ils seront responsables des dettes de la Société en Commandite <b>« limitées à un montant ne dépassant pas celui qu'ils ont promis d'investir »</b> (100 % sûr pour les biens personnels)."
                },
                {
                    "question": "Quelle est la différence entre une Company Limited (Co., Ltd.) et une Société en Commandite (Ltd. Part.), et laquelle dois-je choisir ?",
                    "answer": "Bien que les deux structures aient le statut de <b>« Personne Morale »</b> et partagent les mêmes taux d'imposition, les principales différences résident dans la <b>« Responsabilité pour les dettes »</b>, la <b>« Crédibilité »</b> et les <b>« Restrictions sur les étrangers »</b>. Pour faciliter la compréhension et la décision, voici une comparaison :\n\n<b>1. Company Limited (Co., Ltd.)</b>\n• <b>Responsabilité :</b> <i>« Responsabilité limitée »</i> (sauf pour les directeurs). Tous les actionnaires ne sont responsables des dettes de l'entreprise qu'à hauteur du montant non libéré de leurs actions (cela sépare clairement les finances personnelles des finances de l'entreprise, protégeant ainsi les biens personnels).\n• <b>Crédibilité :</b> Très élevée. Convient aux affaires à long terme, aux appels d'offres gouvernementaux, aux grands projets, à l'attraction d'investisseurs ou aux opérations B2B.\n• <b>Cas des étrangers / Demande de permis de travail :</b> Fortement recommandé. La loi et les agences gouvernementales soutiennent pleinement la structure de Company Limited, qu'il s'agisse de la participation étrangère (jusqu'à 49 %), des demandes de permis de travail, des visas d'affaires ou des promotions d'investissement du BOI.\n• <b>Fondateurs requis :</b> Actuellement, un minimum de seulement 2 actionnaires est requis pour s'inscrire.\n\n<b>2. Société en Commandite (Limited Partnership)</b>\n• <b>Responsabilité :</b> La loi exige qu'au moins 1 partenaire agisse en tant que <i>« Commandité »</i>, qui doit être responsable des dettes de l'entreprise de manière <b>« illimitée »</b> (si l'entreprise rencontre des problèmes, le commandité pourrait devoir utiliser ses biens personnels pour rembourser les dettes). La responsabilité des autres partenaires est limitée à l'argent qu'ils ont investi.\n• <b>Crédibilité :</b> Modérée. Convient aux petites entreprises, aux entreprises familiales ou aux entreprises où les partenaires ne sont pas stricts quant au format juridique.\n• <b>Cas des étrangers :</b> Non recommandé. Avoir des étrangers dans une Société en Commandite implique des restrictions légales très complexes. Si un étranger devient commandité, l'entreprise pourrait être interprétée comme une entité étrangère, rendant les opérations et les demandes de permis de travail beaucoup plus difficiles qu'une Company Limited.\n• <b>Fondateurs requis :</b> Ne nécessite que 2 fondateurs, comme pour l'enregistrement d'une société.\n\n<b>Résumé : Laquelle choisir ?</b>\n• Choisissez une <b>« Company Limited »</b> si vous recherchez la crédibilité maximale, prévoyez d'étendre l'entreprise, souhaitez limiter les risques sur vos biens personnels, avez des actionnaires étrangers ou prévoyez d'embaucher des employés étrangers.\n• Choisissez une <b>« Société en Commandite »</b> si c'est une entreprise familiale ou avec des proches en qui vous avez 100 % confiance, si l'entreprise n'a pas de risques d'endettement élevés, s'il n'y a pas de partenaires étrangers et si vous privilégiez la structure de gestion la plus simple.\n\n<i><b>Remarque :</b> Actuellement, les coûts d'enregistrement, de comptabilité mensuelle et de clôture financière annuelle pour Co., Ltd. et Ltd. Part. ne diffèrent pas de manière significative. L'enregistrement en tant que « Company Limited » offre généralement les avantages maximaux à long terme.</i>"
                },
                {
                    "question": "L'enregistrement d'une Société en Commandite permet-il vraiment de réduire les coûts d'audit comptable annuel (CPA / TA) ?",
                    "answer": "<b>Vrai.</b> C'est l'un des avantages les plus importants de l'enregistrement d'une Société en Commandite.\n\nSelon la loi, si votre Société en Commandite répond aux critères d'une petite entreprise (Small SME), c'est-à-dire avoir un <b>capital enregistré ne dépassant pas 5 millions de THB, des revenus totaux ne dépassant pas 30 millions de THB et des actifs totaux ne dépassant pas 30 millions de THB</b>, vous avez le droit de faire appel à un <b>Auditeur Fiscal (TA - Tax Auditor)</b> pour auditer et signer les états financiers annuels.\n\nNormalement, les frais de service d'un TA sont plus économiques et accessibles que ceux d'un Expert-Comptable Agréé (CPA), que la loi rend obligatoire pour les « Company Limited » de toutes tailles. Cela permet à la Société en Commandite d'avoir des coûts de gestion annuels plus bas."
                },
                {
                    "question": "Qu'est-ce que le capital enregistré (apport en capital) d'une Société en Commandite ? Puis-je m'inscrire si je n'ai pas la totalité de la somme ?",
                    "answer": "Dans une Société en Commandite, nous appelons le capital enregistré <b>« Apport en capital »</b>, qui peut être investi en espèces, en actifs ou en main-d'œuvre. <i>« Payer l'apport en capital »</i> ne signifie pas payer de l'argent à quelqu'un, mais déposer du capital sur un compte bancaire au nom de la Société en Commandite pour être utilisé comme fonds de roulement (le compte peut être ouvert une fois l'enregistrement de la Société en Commandite terminé).\n\n• <b>Si vous n'avez pas la totalité de la somme :</b> Vous pouvez déposer de l'argent progressivement sur le compte une fois celui-ci ouvert (la loi ne vous oblige pas à payer 100 % immédiatement). Vous pouvez commencer par ouvrir le compte avec 1 000 THB. S'il y a des dépenses professionnelles, vous pouvez déposer de l'argent puis le dépenser. Cet argent n'a pas besoin de rester inactif sur le compte.\n• <b>Précautions :</b> Sauf dans le cas où l'investissement total de la Société en Commandite <b>dépasse 5 millions de THB</b>. La loi exige alors que l'argent réel soit présent et un certificat bancaire (Bank Certificate) de tous les partenaires doit être présenté lors du processus d'enregistrement."
                },
                {
                    "question": "Les étrangers peuvent-ils devenir partenaires dans une Société en Commandite ?",
                    "answer": "Légalement, c'est possible, <b>mais en pratique et pour la gestion, nous le déconseillons fortement.</b>\n\nAvoir un étranger comme partenaire dans une Société en Commandite implique des restrictions légales assez complexes. Surtout si un étranger devient le « Commandité », la Société en Commandite pourrait être interprétée comme une <b>« Personne Morale Étrangère »</b>, ce qui pourrait conduire à :\n1. Être restreint d'exploiter de nombreux types d'entreprises en Thaïlande (selon la loi sur les entreprises étrangères).\n2. La demande d'un permis de travail (Work Permit) et d'un visa d'affaires pour les étrangers peut être compliquée et a beaucoup plus de chances d'être rejetée que pour une Company Limited.\n<i>(S'il y a un co-investissement étranger, nous recommandons de s'inscrire en tant que « Company Limited », ce qui sera plus fluide et offrira un maximum d'avantages à long terme.)</i>"
                },
                {
                    "question": "Si je n'ai pas encore de bureau, ou si j'utilise une maison/un appartement en location comme adresse, puis-je m'inscrire ?",
                    "answer": "<b>Peut être enregistré</b> sous les conditions suivantes :\n• <b>Dans le cas d'une maison louée/un espace loué :</b> Vous devez avoir une <i>« Lettre de consentement pour utiliser les locaux »</i> accompagnée de copies dûment certifiées de la carte d'identité et du livret de famille du « Propriétaire ou Maître de maison ».\n• <b>Dans le cas d'une copropriété (Condominium) :</b> Bien que la loi le permette, vous devez d'abord vérifier auprès de la personne morale de la copropriété, car de nombreux projets ont des règlements internes interdisant l'enregistrement d'unités résidentielles en tant que bureaux.\n<i>(Si vous ne pouvez pas utiliser votre propre lieu, nous avons un service de <b>Bureau Virtuel (Virtual Office)</b> disponible pour résoudre ce problème.)</i>"
                },
                {
                    "question": "Une fois la Société en Commandite enregistrée, dois-je m'inscrire immédiatement à la Taxe sur la Valeur Ajoutée (TVA 7 %) ?",
                    "answer": "Pas nécessairement. L'enregistrement d'une Société en Commandite et l'enregistrement à la TVA sont deux choses différentes. Une Société en Commandite n'est obligée de s'inscrire à la TVA que lorsque ses revenus commerciaux <b>dépassent 1,8 million de THB par an</b>.\n\nCependant, si la Société en Commandite doit importer/exporter des biens, ou traiter avec des partenaires B2B qui exigent des factures fiscales, elle <b>doit demander l'enregistrement à la TVA</b> pour pouvoir émettre des factures fiscales dès le début de l'activité."
                },
                {
                    "question": "Après l'enregistrement de la Société en Commandite, mais avant qu'elle n'ait commencé à vendre ou généré des revenus, dois-je tenir une comptabilité ?",
                    "answer": "<b>Doit être fait.</b> Selon la loi (Loi sur la Comptabilité B.E. 2543), tous les types de personnes morales sont tenues de préparer des comptes et de soumettre des états financiers au Département du Développement des Affaires et au Département du Revenu <b>« même s'il n'y a pas de revenus, pas de dépenses, ou si l'entreprise n'a pas encore commencé ses opérations cette année-là (Déclaration à zéro) »</b>. Ne pas les soumettre à temps entraînera des amendes légales relativement élevées."
                },
                {
                    "question": "Le Commandité doit-il déduire son propre salaire pour la Sécurité Sociale ?",
                    "answer": "<b>Pas besoin.</b> En tant que commandité et propriétaire de l'entreprise, vous êtes dans la position d'un <b>« Employeur »</b>, et non d'un employé. Par conséquent, vous ne pouvez pas et n'avez pas besoin de vous inscrire comme personne assurée (Article 33) dans votre propre Société en Commandite.\n\nCependant, dès que la Société en Commandite commence à embaucher des <b>« employés à temps plein »</b>, la loi exige qu'elle s'inscrive comme employeur et soumette la Sécurité Sociale pour les employés dans les 30 jours suivant la date d'embauche."
                }
            ]
        }
    },
    "it": {
        "hero": {
            "title": "Registrazione di Società in Accomandita (Limited Partnership). Facile da gestire, economica.",
            "subtitle": "La scelta perfetta per le piccole imprese.",
            "description": "Fai il passo verso una persona giuridica a tutti gli effetti per aumentare la credibilità con partner e clienti. Con una struttura di Società in Accomandita più facile da gestire e più economica, non devi più preoccuparti delle complessità legali. Siamo pronti a essere il tuo assistente personale, occupandoci di tutto dall'inizio alla fine finché non sarai pronto per gestire la tua attività.",
            "cta": "+669 2882 5556"
        },
        "promotion": {
            "title": "Promozione Speciale!",
            "subtitle": "Non perderti i prezzi speciali e i vantaggi completi per chi desidera avviare un'attività in modo conveniente.",
            "cta": "Vedi la Promozione ora",
            "slug": "limited-partnership-registration-deal"
        },
        "features": {
            "title": "Tutto ciò che serve per avviare una Società in Accomandita",
            "items": [
                {
                    "title": "Consulenza e Strutturazione delle Responsabilità",
                    "description": "Analisi e consulenza sulla designazione del \"Socio Accomandatario\" e del \"Socio Accomandante\" per proteggere i tuoi beni personali dai rischi, caso per caso.",
                    "icon": "Lightbulb"
                },
                {
                    "title": "Preparazione dei Documenti e della Domanda",
                    "description": "Preparazione accurata dei moduli di domanda di registrazione e specifica dei dettagli del conferimento di capitale tramite il sistema digitale di registrazione delle persone giuridiche (DBD Biz Regist).",
                    "icon": "FileSignature"
                },
                {
                    "title": "Presentazione della Registrazione della Persona Giuridica",
                    "description": "Agiamo come tuo rappresentante per elaborare e presentare le domande al Department of Business Development, Ministero del Commercio, in ogni fase.",
                    "icon": "Landmark"
                },
                {
                    "title": "Richiesta del Numero di Identificazione Fiscale",
                    "description": "Gestione della richiesta del numero di entità giuridica e del numero di identificazione fiscale per preparare il sistema fiscale della tua Società in Accomandita.",
                    "icon": "Calculator"
                }
            ]
        },
        "benefits": {
            "title": "Completo! Privilegi esclusivi solo per te",
            "items": [
                { "title": "Nessun vincolo contabile mensile!", "icon": "Unlock" },
                { "title": "GRATIS! Verifica e prenotazione fino a 3 nomi per la Società in Accomandita", "icon": "SearchCheck" },
                { "title": "GRATIS! 1 timbro autoinchiostrante per la Società in Accomandita", "icon": "Stamp" },
                { "title": "GRATIS! Richiesta password e-Filing per il DBD", "icon": "KeySquare" },
                { "title": "GRATIS! Richiesta password per l'Agenzia delle Entrate", "icon": "KeyRound" },
                { "title": "GRATIS! Set di documenti per l'apertura di un conto bancario aziendale", "icon": "Wallet" },
                { "title": "GRATIS! Set completo di certificati della Società in Accomandita (DBD)", "icon": "ScrollText" },
                { "title": "GRATIS! Corso di formazione sulle tecniche fiscali (Valore 5.900 THB)", "icon": "GraduationCap" },
                { "title": "GRATIS! Biglietti da visita per l'emissione di ricevute/fatture fiscali", "icon": "Contact2" }
            ]
        },
        "requirements": {
            "title": "Cosa preparare per la registrazione della Società in Accomandita",
            "subtitle": "Prepara semplicemente le informazioni di base e lascia il resto a noi.",
            "documents": {
                "title": "1. Documenti importanti richiesti",
                "items": [
                    "Almeno 2 partner \n\n1. Partner thailandesi: Copia della carta d'identità (Copia chiara fronte e retro)\n\n2. Partner stranieri: Copia del passaporto (Solo la prima pagina con foto)",
                    "Registrazione della casa (Tabien Baan) da utilizzare come sede principale della Società in Accomandita.",
                    "Design del timbro (se presente)"
                ]
            },
            "information": {
                "title": "2. Informazioni aziendali di base",
                "items": [
                    "Nome desiderato della Società in Accomandita (Tailandese-Inglese)",
                    "Importo del conferimento di capitale di ciascun partner (es. Sig. A conferisce 990.000 THB, Sig. B conferisce 10.000 THB)",
                    "Specifica dello status del partner (Chi agisce come \"Socio Accomandatario\" e chi come \"Socio Accomandante\")",
                    "Descrizione delle operazioni aziendali",
                    "Informazioni di contatto della Società in Accomandita \n1. Numero di telefono \n2. Email",
                    "Informazioni di contatto di ciascun partner \n1. Numero di telefono \n2. Email \n3. ID LINE"
                ]
            }
        },
        "process": {
            "title": "4 semplici passaggi per la registrazione",
            "steps": [
                {
                    "title": "Consulenza e Prenotazione del Nome",
                    "description": "Discuteremo per raccogliere informazioni, aiutare a pianificare una struttura di Società in Accomandita più adatta alle tue esigenze e procedere con la prenotazione del nome.",
                    "icon": "MessageSquareText"
                },
                {
                    "title": "Preparazione dei Documenti tramite il Sistema Governativo",
                    "description": "Il nostro team prepara tutti i documenti e i moduli tramite il sistema digitale di registrazione delle persone giuridiche (DBD Biz Regist).",
                    "icon": "FileStack"
                },
                {
                    "title": "Verifica dell'Identità Online (Comodo, senza spostamenti)",
                    "description": "I partner e il Socio Accomandatario verificano la loro identità tramite l'app ThaiD o DBD e-Service. Possono scegliere di scansionare un codice QR o fare clic per verificare tramite la propria email personale.",
                    "icon": "SmartphoneNfc"
                },
                {
                    "title": "Invio della Registrazione e Consegna",
                    "description": "Il nostro team presenta la domanda al Department of Business Development. Una volta approvata, verificheremo l'accuratezza e consegneremo i documenti essenziali insieme ai regali direttamente a te.",
                    "icon": "Gift"
                }
            ]
        },
        "faq": {
            "title": "Domande Frequenti (FAQ)",
            "items": [
                {
                    "question": "Qual è la differenza tra un Socio Accomandatario e un Socio Accomandante?",
                    "answer": "La legge divide i partner di una Società in Accomandita in 2 tipi principali, il che influisce sulla loro responsabilità sui beni personali, come segue:\n\n<b>1. Socio Accomandatario</b> \nLa legge richiede che una Società in Accomandita abbia almeno 1 partner di questo tipo per gestire l'azienda. Hanno piena autorità per firmare e vincolare la Società in Accomandita. Tuttavia, l'avvertenza è che devono essere responsabili per i debiti della Società in Accomandita in modo <b>\"illimitato\"</b> (se l'azienda affronta problemi e deve chiudere, i beni personali del Socio Accomandatario potrebbero essere utilizzati per ripagare i debiti).\n\n<b>2. Socio Accomandante</b> \nAgisce solo come \"co-investitore\" senza alcun diritto di firmare ordini o gestire l'azienda. Il vantaggio è che saranno responsabili per i debiti della Società in Accomandita <b>\"limitatamente a un importo non superiore a quello che hanno promesso di investire\"</b> (sicurezza al 100% per i beni personali)."
                },
                {
                    "question": "Qual è la differenza tra una Company Limited (Co., Ltd.) e una Società in Accomandita (Ltd. Part.), e quale dovrei scegliere?",
                    "answer": "Sebbene entrambe le strutture abbiano lo status di <b>\"Persona Giuridica\"</b> e condividano le stesse aliquote fiscali, ci sono importanti differenze riguardo a <b>\"Responsabilità per i debiti\"</b>, <b>\"Credibilità\"</b> e <b>\"Restrizioni per gli stranieri\"</b>. Per facilitare la comprensione e la decisione, confrontiamole come segue:\n\n<b>1. Company Limited (Co., Ltd.)</b>\n• <b>Responsabilità:</b> <i>\"Responsabilità limitata\"</i> (eccetto per i direttori). Tutti gli azionisti sono responsabili per i debiti della società solo fino all'importo non versato delle loro azioni (questo separa chiaramente le finanze personali da quelle aziendali, mantenendo al sicuro i beni personali).\n• <b>Credibilità:</b> Molto alta. Adatta per affari a lungo termine, gare d'appalto governative, grandi progetti, attrazione di investitori o operazioni B2B.\n• <b>In caso di stranieri / Richiesta di Permesso di Lavoro (Work Permit):</b> Altamente consigliato. La legge e le agenzie governative supportano eccellentemente la struttura della Company Limited, sia che si tratti di stranieri che detengono azioni (fino al 49%), richieste di permessi di lavoro, visti d'affari o promozioni di investimento BOI, ecc.\n• <b>Fondatori richiesti:</b> Attualmente, è richiesto un minimo di soli 2 azionisti per la registrazione.\n\n<b>2. Società in Accomandita (Limited Partnership)</b>\n• <b>Responsabilità:</b> La legge richiede che almeno 1 partner agisca come <i>\"Socio Accomandatario\"</i>, il quale deve essere responsabile dei debiti dell'azienda in modo <b>\"illimitato\"</b> (se l'azienda ha problemi, il socio accomandatario potrebbe dover utilizzare beni personali per pagare i debiti). La responsabilità degli altri partner è limitata al denaro investito.\n• <b>Credibilità:</b> Moderata. Adatta per piccole imprese, aziende familiari o imprese in cui i partner non sono troppo rigidi sul formato della persona giuridica.\n• <b>In caso di stranieri:</b> Sconsigliato. Avere stranieri in una Società in Accomandita comporta restrizioni legali molto complesse. Se uno straniero diventa Socio Accomandatario, potrebbe essere interpretata come una persona giuridica straniera, rendendo le operazioni aziendali e le richieste di permesso di lavoro molto più difficili rispetto a una Company Limited.\n• <b>Fondatori richiesti:</b> Richiede solo 2 fondatori, esattamente come la registrazione di un'azienda.\n\n<b>Riepilogo: Quale scegliere?</b>\n• Scegli una <b>\"Company Limited\"</b> se cerchi la massima credibilità, hai piani per espandere l'azienda o le filiali in futuro, vuoi limitare i rischi sui beni personali, hai azionisti stranieri o prevedi di assumere dipendenti stranieri.\n• Scegli una <b>\"Società in Accomandita\"</b> se si tratta di un'azienda familiare o di persone vicine di cui ti fidi al 100%, l'azienda non ha alti rischi di debito, non ci sono partner stranieri e preferisci la struttura di gestione più semplice in assoluto.\n\n<i><b>Nota:</b> Attualmente, i costi per la registrazione, la contabilità mensile e la chiusura finanziaria annuale per Co., Ltd. e Ltd. Part. non sono molto diversi. Registrarsi come \"Company Limited\" offre generalmente i massimi vantaggi a lungo termine.</i>"
                },
                {
                    "question": "La registrazione di una Società in Accomandita fa davvero risparmiare sui costi per le revisioni contabili annuali (CPA / TA)?",
                    "answer": "<b>Vero.</b> Questo è uno dei vantaggi più importanti della registrazione di una Società in Accomandita.\n\nPer legge, se la tua Società in Accomandita soddisfa i criteri di una piccola impresa (Small SME), il che significa avere un <b>capitale registrato non superiore a 5 milioni di THB, entrate totali non superiori a 30 milioni di THB e beni totali non superiori a 30 milioni di THB</b>, hai il diritto di utilizzare un <b>Revisore Fiscale (TA - Tax Auditor)</b> per la revisione e la firma del bilancio annuale.\n\nNormalmente, le tariffe di servizio di un TA sono più economiche e accessibili rispetto all'utilizzo di un Revisore Contabile (CPA), che la legge rende obbligatorio per le \"Company Limited\" di tutte le dimensioni. Ciò si traduce in costi di gestione annuali inferiori per la Società in Accomandita."
                },
                {
                    "question": "Cos'è il Capitale Registrato (Conferimento di Capitale) di una Società in Accomandita? Posso registrarmi se non possiedo l'intera somma forfettaria?",
                    "answer": "In una Società in Accomandita, ci riferiamo al capitale registrato come <b>\"Conferimento di Capitale\"</b>, che può essere investito in contanti, beni o lavoro. <i>\"Versare il conferimento di capitale\"</i> non significa pagare denaro a nessuno, ma significa depositare capitale in un conto bancario a nome della Società in Accomandita per essere utilizzato come capitale circolante per l'attività (il conto può essere aperto dopo il completamento della registrazione della Società in Accomandita).\n\n• <b>Se non hai l'intera somma in un'unica soluzione:</b> Puoi depositare gradualmente il denaro nel conto una volta aperto il conto della Società in Accomandita (la legge non ti obbliga a pagare il 100% per intero immediatamente). Puoi iniziare aprendo il conto con 1.000 THB. Se ci sono spese relative all'attività, puoi depositare denaro nel conto e poi pagarlo. Questo importo non deve rimanere inattivo nel conto.\n• <b>Precauzioni:</b> Tranne nel caso in cui la Società in Accomandita abbia un investimento totale di <b>oltre 5 milioni di THB</b>. In questo caso la legge richiede che il denaro reale sia presente e durante il processo di registrazione deve essere mostrato un Certificato Bancario (Bank Certificate) di tutti i partner."
                },
                {
                    "question": "Gli stranieri possono diventare partner in una Società in Accomandita?",
                    "answer": "Legalmente si può fare, <b>ma a livello pratico e gestionale, lo sconsigliamo vivamente.</b>\n\nAvere uno straniero come partner in una Società in Accomandita comporta restrizioni legali piuttosto complesse. Soprattutto se uno straniero diventa un \"Socio Accomandatario\", la Società in Accomandita potrebbe essere interpretata come una <b>\"Persona Giuridica Straniera\"</b>, il che potrebbe portare a:\n1. Essere limitati nell'operare in molti tipi di attività in Thailandia (secondo il Foreign Business Act).\n2. La richiesta di un Permesso di Lavoro (Work Permit) e di un visto d'affari per gli stranieri potrebbe essere complicata e ha una probabilità molto maggiore di essere respinta rispetto a una Company Limited.\n<i>(Se c'è un co-investimento straniero, consigliamo di scegliere di registrarsi come \"Company Limited\", che sarà più agevole e fornirà i massimi vantaggi a lungo termine.)</i>"
                },
                {
                    "question": "Se non ho ancora un ufficio, o utilizzo una casa in affitto/condominio come sede, posso registrarmi?",
                    "answer": "<b>Può essere registrato</b> alle seguenti condizioni:\n• <b>In caso di casa in affitto/spazio in affitto:</b> Devi avere una <i>\"Lettera di Consenso all'Uso dei Locali\"</i> insieme a copie debitamente certificate della carta d'identità e della registrazione della casa del \"Proprietario dell'Immobile\".\n• <b>In caso di condominio:</b> Sebbene la legge lo consenta, dovresti prima verificare con la persona giuridica del condominio, perché molti progetti hanno regolamenti interni che non consentono di registrare le stanze residenziali come uffici.\n<i>(Se non ti è comodo utilizzare il tuo spazio, abbiamo un servizio di <b>Virtual Office</b> disponibile per risolvere questo problema.)</i>"
                },
                {
                    "question": "Una volta registrata la Società in Accomandita, devo registrarmi immediatamente per l'Imposta sul Valore Aggiunto (IVA 7%)?",
                    "answer": "Non necessariamente. Registrare una Società in Accomandita e registrarsi per l'IVA sono due cose diverse. Una Società in Accomandita è obbligata a registrarsi per l'IVA solo quando ha un reddito d'impresa <b>superiore a 1,8 milioni di THB all'anno</b>.\n\nTuttavia, se la Società in Accomandita ha necessità di importare/esportare beni, o trattare con partner B2B che richiedono l'emissione di fatture fiscali, <b>deve richiedere la registrazione IVA</b> per poter emettere fatture fiscali ai partner fin dall'inizio dell'attività."
                },
                {
                    "question": "Dopo la registrazione della Società in Accomandita, ma prima di aver iniziato a vendere o generato reddito, devo tenere la contabilità?",
                    "answer": "<b>Deve essere fatto.</b> Per legge (Accounting Act B.E. 2543), tutti i tipi di persone giuridiche sono tenuti a preparare i conti e presentare i rendiconti finanziari al Department of Business Development e al Revenue Department <b>\"anche se in quell'anno non ci sono state entrate, uscite, o l'attività non è ancora iniziata (Dichiarazione a zero)\"</b>. La mancata presentazione in tempo comporterà multe legali relativamente alte."
                },
                {
                    "question": "Il Socio Accomandatario deve dedurre il proprio stipendio da versare alla Previdenza Sociale?",
                    "answer": "<b>Non necessario.</b> In qualità di Socio Accomandatario e titolare dell'attività, sei considerato un <b>\"Datore di Lavoro\"</b>, non un dipendente. Pertanto, non puoi e non hai bisogno di registrarti come persona assicurata (Articolo 33) nella tua stessa Società in Accomandita.\n\nTuttavia, ogni volta che la Società in Accomandita inizia ad assumere <b>\"dipendenti a tempo pieno\"</b>, la legge richiede che l'azienda si registri come datore di lavoro e versi la Previdenza Sociale per i dipendenti entro 30 giorni dalla data di assunzione."
                }
            ]
        }
    },
    "nl": {
        "hero": {
            "title": "Registratie van Commanditaire Vennootschap (Limited Partnership). Eenvoudig te beheren, kosteneffectief.",
            "subtitle": "De perfecte keuze voor kleine bedrijven.",
            "description": "Zet de stap naar een volledig geregistreerde rechtspersoon om de geloofwaardigheid bij uw partners en klanten te vergroten. Met een structuur van een Commanditaire Vennootschap die gemakkelijker te beheren en kosteneffectiever is, hoeft u zich geen zorgen meer te maken over complexe juridische zaken. Wij staan klaar om uw persoonlijke assistent te zijn en alles van begin tot eind voor u te regelen totdat u klaar bent om uw bedrijf te runnen.",
            "cta": "+669 2882 5556"
        },
        "promotion": {
            "title": "Speciale Aanbieding!",
            "subtitle": "Mis de speciale prijzen en volledige voordelen niet voor degenen die kosteneffectief een bedrijf willen starten.",
            "cta": "Bekijk de aanbieding nu",
            "slug": "limited-partnership-registration-deal"
        },
        "features": {
            "title": "Alles wat u nodig heeft om een Commanditaire Vennootschap te starten",
            "items": [
                {
                    "title": "Advies en Aansprakelijkheidsstructurering",
                    "description": "Analyseer en adviseer bij het aanwijzen van de \"Beherend Vennoot\" en de \"Commanditaire Vennoot\" om uw persoonlijke bezittingen per geval te beschermen tegen risico's.",
                    "icon": "Lightbulb"
                },
                {
                    "title": "Documenten- en Aanvraagvoorbereiding",
                    "description": "Bereid registratieformulieren nauwkeurig voor en specificeer details van de kapitaalinbreng via het digitale registratiesysteem voor rechtspersonen (DBD Biz Regist).",
                    "icon": "FileSignature"
                },
                {
                    "title": "Indiening Bedrijfsregistratie",
                    "description": "Treed in elke fase op als uw vertegenwoordiger om aanvragen in te dienen bij het Department of Business Development, Ministerie van Handel.",
                    "icon": "Landmark"
                },
                {
                    "title": "Aanvraag Fiscaal Identificatienummer",
                    "description": "Handel de aanvraag voor het bedrijfsnummer en fiscaal identificatienummer af om het belastingsysteem voor uw Commanditaire Vennootschap voor te bereiden.",
                    "icon": "Calculator"
                }
            ]
        },
        "benefits": {
            "title": "Compleet! Exclusieve privileges speciaal voor u",
            "items": [
                { "title": "Geen maandelijkse boekhoudverplichting!", "icon": "Unlock" },
                { "title": "GRATIS! Controle en reservering van maximaal 3 bedrijfsnamen", "icon": "SearchCheck" },
                { "title": "GRATIS! 1 zelfinktende bedrijfsstempel", "icon": "Stamp" },
                { "title": "GRATIS! Vraag e-Filing wachtwoord aan voor de DBD", "icon": "KeySquare" },
                { "title": "GRATIS! Vraag een wachtwoord aan voor de Belastingdienst", "icon": "KeyRound" },
                { "title": "GRATIS! Documentenset voor het openen van een zakelijke bankrekening", "icon": "Wallet" },
                { "title": "GRATIS! Complete set bedrijfscertificaten (DBD)", "icon": "ScrollText" },
                { "title": "GRATIS! Trainingscursus belastingtechniek (Waarde 5.900 THB)", "icon": "GraduationCap" },
                { "title": "GRATIS! Visitekaartjes voor het uitschrijven van bonnen/belastingfacturen", "icon": "Contact2" }
            ]
        },
        "requirements": {
            "title": "Wat moet u voorbereiden voor de registratie van de Commanditaire Vennootschap",
            "subtitle": "Bereid eenvoudig de basisinformatie voor, en wij doen de rest.",
            "documents": {
                "title": "1. Belangrijke vereiste documenten",
                "items": [
                    "Minimaal 2 partners \n\n1. Thaise partners: Kopie identiteitskaart (Duidelijke kopie van voor- en achterkant)\n\n2. Buitenlandse partners: Kopie paspoort (Alleen de eerste pagina met foto)",
                    "Huisregistratie (Tabien Baan) te gebruiken als hoofdkantoor van de Commanditaire Vennootschap.",
                    "Stempelontwerp (indien aanwezig)"
                ]
            },
            "information": {
                "title": "2. Basis bedrijfsinformatie",
                "items": [
                    "Gewenste naam Commanditaire Vennootschap (Thais-Engels)",
                    "Bedrag kapitaalinbreng van elke persoon (bijv. Dhr. A brengt 990.000 THB in, Dhr. B brengt 10.000 THB in)",
                    "Specificeer partnerstatus (Wie treedt op als de \"Beherend Vennoot\" en wie is de \"Commanditaire Vennoot\")",
                    "Beschrijving van de bedrijfsactiviteiten",
                    "Contactgegevens Commanditaire Vennootschap \n1. Telefoonnummer \n2. E-mail",
                    "Contactgegevens van elke partner \n1. Telefoonnummer \n2. E-mail \n3. LINE ID"
                ]
            }
        },
        "process": {
            "title": "4 eenvoudige registratiestappen",
            "steps": [
                {
                    "title": "Advies en Naamsreservering",
                    "description": "We zullen overleggen om informatie te verzamelen, helpen bij het plannen van een structuur die het beste aan uw behoeften voldoet, en doorgaan met naamsreservering.",
                    "icon": "MessageSquareText"
                },
                {
                    "title": "Voorbereiding Documenten via Overheidssysteem",
                    "description": "Ons team bereidt alle documenten en formulieren voor via het digitale registratiesysteem voor rechtspersonen (DBD Biz Regist).",
                    "icon": "FileStack"
                },
                {
                    "title": "Online Identiteitsverificatie (Handig, geen reizen nodig)",
                    "description": "Partners en de Beherend Vennoot verifiëren hun identiteit via de ThaiD of DBD e-Service app. Ze kunnen ervoor kiezen om een QR-code te scannen of te klikken om te verifiëren via hun persoonlijke e-mail.",
                    "icon": "SmartphoneNfc"
                },
                {
                    "title": "Registratie Indienen en Levering",
                    "description": "Ons team dient de aanvraag in bij het Department of Business Development. Zodra deze is goedgekeurd, verifiëren we de juistheid en leveren we essentiële documenten en gratis geschenken rechtstreeks aan u af.",
                    "icon": "Gift"
                }
            ]
        },
        "faq": {
            "title": "Veelgestelde Vragen (FAQ)",
            "items": [
                {
                    "question": "Wat is het verschil tussen een Beherend Vennoot en een Commanditaire Vennoot?",
                    "answer": "De wet verdeelt partners in een Commanditaire Vennootschap in 2 hoofdtypen, wat als volgt invloed heeft op hun verantwoordelijkheid over persoonlijke bezittingen:\n\n<b>1. Beherend Vennoot</b> \nDe wet vereist dat een Commanditaire Vennootschap ten minste 1 partner van dit type heeft om het bedrijf te leiden. Zij hebben de volledige bevoegdheid om te tekenen en de Commanditaire Vennootschap te binden. De waarschuwing is echter dat zij <b>\"onbeperkt\"</b> aansprakelijk moeten zijn voor de schulden van de Commanditaire Vennootschap (als het bedrijf problemen heeft en moet sluiten, kunnen de persoonlijke bezittingen van de Beherend Vennoot worden gebruikt om schulden af te betalen).\n\n<b>2. Commanditaire Vennoot</b> \nTrekt alleen op als een \"mede-investeerder\" zonder enig recht om opdrachten te ondertekenen of het bedrijf te beheren. Het voordeel is dat zij verantwoordelijk zullen zijn voor de schulden van de Commanditaire Vennootschap, <b>\"beperkt tot niet meer dan het bedrag dat zij hebben beloofd te investeren\"</b> (100% veilig voor persoonlijke bezittingen)."
                },
                {
                    "question": "Wat is het verschil tussen een Company Limited (Co., Ltd.) en een Commanditaire Vennootschap (Ltd. Part.), en welke moet ik kiezen?",
                    "answer": "Hoewel beide structuren de status van een <b>\"Rechtspersoon\"</b> hebben en dezelfde belastingtarieven delen, zijn er grote verschillen met betrekking tot <b>\"Aansprakelijkheid voor schulden\"</b>, <b>\"Geloofwaardigheid\"</b> en <b>\"Beperkingen voor buitenlanders\"</b>. Om het gemakkelijker te begrijpen en te beslissen, laten we ze als volgt vergelijken:\n\n<b>1. Company Limited (Co., Ltd.)</b>\n• <b>Aansprakelijkheid:</b> <i>\"Beperkte aansprakelijkheid\"</i> (behalve voor directeuren). Alle aandeelhouders zijn slechts aansprakelijk voor de schulden van de onderneming tot het onbetaalde bedrag van hun aandelen (dit scheidt persoonlijke financiën duidelijk van zakelijke financiën, waardoor persoonlijke bezittingen veilig blijven).\n• <b>Geloofwaardigheid:</b> Zeer hoog. Geschikt voor zakendoen op de lange termijn, overheidsaanbestedingen, grote projecten aannemen, investeerders aantrekken of B2B-activiteiten (Business-to-Business).\n• <b>In het geval van buitenlanders / Aanvragen van een werkvergunning (Work Permit):</b> Zeer geschikt. De wet en overheidsinstanties ondersteunen de Company Limited-structuur uitstekend, of het nu gaat om buitenlanders die aandelen bezitten (tot 49%), aanvragen voor werkvergunningen, zakelijke visa of BOI-investeringspromoties, enz.\n• <b>Aantal oprichters:</b> Momenteel is een minimum van slechts 2 aandeelhouders vereist om te registreren.\n\n<b>2. Commanditaire Vennootschap (Limited Partnership)</b>\n• <b>Aansprakelijkheid:</b> De wet vereist dat ten minste 1 partner optreedt als de <i>\"Beherend Vennoot\"</i>, die <b>\"onbeperkt\"</b> aansprakelijk moet zijn voor de schulden van de onderneming (als de onderneming problemen heeft, moet de beherend vennoot mogelijk persoonlijke bezittingen gebruiken om schulden te betalen). De aansprakelijkheid van andere partners is beperkt tot het door hen geïnvesteerde geld.\n• <b>Geloofwaardigheid:</b> Matig. Geschikt voor kleine bedrijven, familiebedrijven of ondernemingen waar partners niet te streng zijn over het formaat van de rechtspersoon.\n• <b>In het geval van buitenlanders:</b> Niet aanbevolen. Het hebben van buitenlanders in een Commanditaire Vennootschap brengt zeer complexe wettelijke beperkingen met zich mee. Als een buitenlander Beherend Vennoot wordt, kan dit worden geïnterpreteerd als een buitenlandse rechtspersoon, wat de bedrijfsvoering en het aanvragen van werkvergunningen veel moeilijker maakt dan bij een Company Limited.\n• <b>Aantal oprichters:</b> Vereist slechts 2 oprichters, net als bij het registreren van een bedrijf.\n\n<b>Samenvatting: Welke moet u kiezen?</b>\n• Kies een <b>\"Company Limited\"</b> als u de hoogste geloofwaardigheid zoekt, plannen heeft om het bedrijf of filialen in de toekomst uit te breiden, risico's voor uw persoonlijke bezittingen wilt beperken, buitenlandse aandeelhouders heeft, of van plan bent buitenlandse werknemers in dienst te nemen.\n• Kies een <b>\"Commanditaire Vennootschap\"</b> als het een familiebedrijf is of naaste mensen die u 100% vertrouwt, het bedrijf geen hoge schuldenrisico's heeft, er geen buitenlandse partners zijn, en u de nadruk legt op de eenvoudigste beheerstructuur.\n\n<i><b>Opmerking:</b> Momenteel verschillen de kosten voor registratie, maandelijkse boekhouding en de jaarlijkse financiële afsluiting voor Co., Ltd. en Ltd. Part. niet significant. Registreren als een \"Company Limited\" levert over het algemeen op de lange termijn de maximale voordelen op.</i>"
                },
                {
                    "question": "Bespaart het registreren van een Commanditaire Vennootschap echt kosten voor jaarlijkse boekhoudkundige controles (CPA / TA)?",
                    "answer": "<b>Waar.</b> Dit is een van de belangrijkste voordelen van het registreren van een Commanditaire Vennootschap.\n\nVolgens de wet heeft u, als uw Commanditaire Vennootschap voldoet aan de criteria van een kleine onderneming (Small SME), wat betekent dat deze een <b>geregistreerd kapitaal heeft van niet meer dan 5 miljoen THB, een totale omzet van niet meer dan 30 miljoen THB en totale activa van niet meer dan 30 miljoen THB</b>, het recht om een <b>Belastingcontroleur (TA - Tax Auditor)</b> te gebruiken om de jaarlijkse financiële overzichten te controleren en te ondertekenen.\n\nNormaal gesproken zijn de servicekosten van een TA zuiniger en toegankelijker in vergelijking met het gebruik van een Registeraccountant (CPA), die de wet verplicht stelt voor \"Company Limited\" van elke bedrijfsgrootte. Dit resulteert in lagere jaarlijkse beheerkosten voor de Commanditaire Vennootschap."
                },
                {
                    "question": "Wat is het Geregistreerd Kapitaal (Kapitaalinbreng) van een Commanditaire Vennootschap? Kan ik me registreren als ik niet het volledige bedrag in één keer heb?",
                    "answer": "In een Commanditaire Vennootschap verwijzen we naar het geregistreerd kapitaal als <b>\"Kapitaalinbreng\"</b>, dat in contanten, activa of arbeid kan worden geïnvesteerd. <i>\"De kapitaalinbreng betalen\"</i> betekent niet dat u geld aan iemand betaalt, maar het betekent dat u kapitaal stort op een bankrekening op naam van de Commanditaire Vennootschap om te worden gebruikt als werkkapitaal voor het bedrijf (de rekening kan worden geopend nadat de registratie van de Commanditaire Vennootschap is voltooid).\n\n• <b>Als u niet het volledige bedrag in één keer heeft:</b> U kunt het geld geleidelijk op de rekening storten zodra de rekening van de Commanditaire Vennootschap is geopend (de wet dwingt u niet om meteen de volledige 100% te storten). U kunt beginnen door de rekening te openen met 1.000 THB. Als er zakelijke uitgaven zijn, kunt u geld op de rekening storten en het dan uitbetalen. Dit bedrag hoeft niet stil te staan op de rekening.\n• <b>Voorzorgsmaatregelen:</b> Behalve in het geval dat de Commanditaire Vennootschap een totale investering heeft van <b>meer dan 5 miljoen THB</b>. De wet vereist in dat geval dat het daadwerkelijke geld aanwezig is, en tijdens het registratieproces moet een bankverklaring (Bank Certificate) van alle partners worden getoond."
                },
                {
                    "question": "Mogen buitenlanders partner worden in een Commanditaire Vennootschap?",
                    "answer": "Wettelijk kan het, <b>maar praktisch en beheersmatig raden wij het ten zeerste af.</b>\n\nHet hebben van een buitenlander als partner in een Commanditaire Vennootschap brengt nogal complexe wettelijke beperkingen met zich mee. Vooral als een buitenlander de \"Beherend Vennoot\" wordt, kan de Commanditaire Vennootschap worden geïnterpreteerd als een <b>\"Buitenlandse Rechtspersoon\"</b>, wat kan leiden tot:\n1. Beperkt zijn om in Thailand veel soorten bedrijven te runnen (volgens de wet op buitenlandse bedrijven).\n2. Het aanvragen van een werkvergunning (Work Permit) en een zakelijk visum voor buitenlanders kan ingewikkeld zijn en heeft een veel grotere kans om te worden afgewezen dan bij een Company Limited.\n<i>(Als er sprake is van buitenlandse mede-investeringen, raden we aan om te kiezen voor registratie als een \"Company Limited\", wat soepeler zal verlopen en op de lange termijn maximale voordelen zal opleveren.)</i>"
                },
                {
                    "question": "Als ik nog geen kantoor heb, of een huurhuis/condo als locatie gebruik, kan ik me dan registreren?",
                    "answer": "<b>Kan worden geregistreerd</b> onder de volgende voorwaarden:\n• <b>In het geval van een huurhuis/gehuurde ruimte:</b> U moet beschikken over een <i>\"Toestemmingsbrief om het pand te gebruiken\"</i> samen met naar behoren gewaarmerkte kopieën van de ID-kaart en huisregistratie van de \"Huismeester of Eigenaar van het onroerend goed\".\n• <b>In het geval van een condominium:</b> Hoewel de wet het toestaat, moet u dit eerst controleren bij de beheerder (juristic person) van het condominium, omdat veel projecten interne reglementen hebben die niet toestaan dat woonruimtes als kantoren worden geregistreerd.\n<i>(Als het voor u niet handig is om uw eigen ruimte te gebruiken, hebben we een <b>Virtual Office</b>-service beschikbaar om dit probleem op te lossen.)</i>"
                },
                {
                    "question": "Moet ik me, nadat de Commanditaire Vennootschap is geregistreerd, onmiddellijk registreren voor de Belasting over de Toegevoegde Waarde (BTW 7%)?",
                    "answer": "Niet noodzakelijkerwijs. Een Commanditaire Vennootschap registreren en u registreren voor de Belasting over de Toegevoegde Waarde (BTW) zijn twee verschillende dingen. Een Commanditaire Vennootschap is pas verplicht zich voor de BTW te registreren wanneer deze een bedrijfsinkomen heeft dat <b>hoger is dan 1,8 miljoen THB per jaar</b>.\n\nEchter, als de Commanditaire Vennootschap goederen moet importeren/exporteren, of te maken heeft met B2B-partners die vereisen dat er belastingfacturen worden uitgeschreven, <b>moet de Commanditaire Vennootschap een BTW-registratie aanvragen</b> om vanaf de start van het bedrijf belastingfacturen aan partners te kunnen uitschrijven."
                },
                {
                    "question": "Moet ik na registratie, ook al ben ik nog niet begonnen met verkopen of inkomsten genereren, toch een boekhouding bijhouden?",
                    "answer": "<b>Moet worden gedaan.</b> Volgens de wet (Boekhoudwet B.E. 2543) zijn alle soorten rechtspersonen verplicht om rekeningen op te stellen en financiële overzichten in te dienen bij het Department of Business Development en de Belastingdienst, <b>\"zelfs als er in dat jaar geen inkomsten, geen uitgaven zijn of als de bedrijfsactiviteiten nog niet zijn gestart (Nulaangifte)\"</b>. Het niet tijdig indienen zal leiden tot relatief hoge wettelijke boetes."
                },
                {
                    "question": "Moet de Beherend Vennoot zijn eigen salaris inhouden voor de Sociale Zekerheid?",
                    "answer": "<b>Niet nodig.</b> Aangezien u de Beherend Vennoot en bedrijfseigenaar bent, bevindt u zich in de positie van een <b>\"Werkgever\"</b>, niet van een werknemer. Daarom kunt u zich niet registreren als verzekerde persoon (Artikel 33) in uw eigen Commanditaire Vennootschap en hoeft u dat ook niet te doen.\n\nEchter, wanneer de Commanditaire Vennootschap begint met het inhuren van <b>\"fulltime werknemers\"</b>, vereist de wet dat de Commanditaire Vennootschap zich registreert als werkgever en de Sociale Zekerheid voor de werknemers indient binnen 30 dagen na de aanwervingsdatum."
                }
            ]
        }
    },
    "ms": {
        "hero": {
            "title": "Pendaftaran Perkongsian Terhad (Ltd. Part.). Mudah diurus, menjimatkan kos.",
            "subtitle": "Pilihan tepat untuk perniagaan kecil.",
            "description": "Melangkah ke status entiti sah (juristic person) untuk meningkatkan kredibiliti dengan rakan kongsi dan pelanggan anda. Dengan struktur Perkongsian Terhad yang lebih mudah diurus dan kos yang lebih rendah, anda tidak perlu lagi risau tentang kerumitan undang-undang. Kami sedia menjadi pembantu peribadi anda, menguruskan semuanya dari mula hingga akhir sehingga anda bersedia untuk menjalankan perniagaan anda.",
            "cta": "+669 2882 5556"
        },
        "promotion": {
            "title": "Promosi Istimewa!",
            "subtitle": "Jangan lepaskan harga istimewa dan keistimewaan penuh untuk mereka yang ingin memulakan perniagaan dengan kos yang menjimatkan.",
            "cta": "Lihat Promosi sekarang",
            "slug": "limited-partnership-registration-deal"
        },
        "features": {
            "title": "Segalanya yang anda perlukan untuk memulakan Perkongsian Terhad",
            "items": [
                {
                    "title": "Perundingan dan Penstrukturan Liabiliti",
                    "description": "Menganalisis dan memberi nasihat mengenai penetapan \"Rakan Kongsi Pengurus\" dan \"Rakan Kongsi Liabiliti Terhad\" untuk melindungi aset peribadi anda daripada risiko mengikut kes.",
                    "icon": "Lightbulb"
                },
                {
                    "title": "Penyediaan Dokumen dan Permohonan",
                    "description": "Sediakan borang permohonan pendaftaran dengan tepat dan nyatakan butiran sumbangan modal melalui sistem pendaftaran entiti sah digital (DBD Biz Regist).",
                    "icon": "FileSignature"
                },
                {
                    "title": "Penyerahan Pendaftaran Entiti Sah",
                    "description": "Bertindak sebagai wakil anda untuk memproses dan menyerahkan permohonan kepada Jabatan Pembangunan Perniagaan, Kementerian Perdagangan pada setiap langkah.",
                    "icon": "Landmark"
                },
                {
                    "title": "Permohonan Nombor Pengenalan Cukai",
                    "description": "Uruskan permohonan nombor entiti sah dan nombor pengenalan cukai untuk menyediakan sistem cukai bagi Perkongsian Terhad anda.",
                    "icon": "Calculator"
                }
            ]
        },
        "benefits": {
            "title": "Keistimewaan eksklusif hanya untuk anda",
            "items": [
                { "title": "Tiada komitmen perakaunan bulanan!", "icon": "Unlock" },
                { "title": "PERCUMA! Semak dan tempah sehingga 3 nama Perkongsian Terhad", "icon": "SearchCheck" },
                { "title": "PERCUMA! 1 cop Perkongsian Terhad berdakwat sendiri", "icon": "Stamp" },
                { "title": "PERCUMA! Mohon kata laluan e-Filing untuk DBD", "icon": "KeySquare" },
                { "title": "PERCUMA! Mohon kata laluan untuk Jabatan Hasil", "icon": "KeyRound" },
                { "title": "PERCUMA! Set dokumen untuk membuka akaun bank korporat", "icon": "Wallet" },
                { "title": "PERCUMA! Set lengkap dokumen sijil Perkongsian Terhad (DBD)", "icon": "ScrollText" },
                { "title": "PERCUMA! Kursus latihan teknik cukai (Bernilai 5,900 THB)", "icon": "GraduationCap" },
                { "title": "PERCUMA! Kad perniagaan untuk pengeluaran resit/invois cukai", "icon": "Contact2" }
            ]
        },
        "requirements": {
            "title": "Apa yang perlu disediakan untuk pendaftaran Perkongsian Terhad",
            "subtitle": "Sediakan maklumat asas, dan serahkan selebihnya kepada kami.",
            "documents": {
                "title": "1. Dokumen penting yang diperlukan",
                "items": [
                    "Sekurang-kurangnya 2 rakan kongsi \n\n1. Rakan kongsi Thai: Salinan kad pengenalan (Salinan depan dan belakang yang jelas)\n\n2. Rakan kongsi asing: Salinan pasport (Hanya halaman pertama dengan gambar)",
                    "Pendaftaran rumah (Tabien Baan) yang akan digunakan sebagai ibu pejabat Perkongsian Terhad.",
                    "Reka bentuk cop (jika ada)"
                ]
            },
            "information": {
                "title": "2. Maklumat asas perniagaan",
                "items": [
                    "Nama Perkongsian Terhad yang dikehendaki (Thai-Inggeris)",
                    "Jumlah sumbangan modal setiap orang (cth., En. A menyumbang 990,000 THB, En. B menyumbang 10,000 THB)",
                    "Nyatakan status rakan kongsi (Siapa yang bertindak sebagai \"Rakan Kongsi Pengurus\" dan siapa \"Rakan Kongsi Liabiliti Terhad\")",
                    "Penerangan tentang operasi perniagaan",
                    "Maklumat hubungan Perkongsian Terhad \n1. Nombor telefon \n2. E-mel",
                    "Maklumat hubungan setiap rakan kongsi \n1. Nombor telefon \n2. E-mel \n3. ID LINE"
                ]
            }
        },
        "process": {
            "title": "4 langkah pendaftaran mudah",
            "steps": [
                {
                    "title": "Perundingan dan Tempahan Nama",
                    "description": "Kami akan berbincang untuk mengumpul maklumat, membantu merancang struktur Perkongsian Terhad yang paling sesuai dengan keperluan anda, dan meneruskan tempahan nama.",
                    "icon": "MessageSquareText"
                },
                {
                    "title": "Penyediaan Dokumen melalui Sistem Kerajaan",
                    "description": "Pasukan kami menyediakan semua dokumen dan borang melalui sistem pendaftaran entiti sah digital (DBD Biz Regist).",
                    "icon": "FileStack"
                },
                {
                    "title": "Pengesahan Identiti Dalam Talian (Mudah, Tidak perlu hadir)",
                    "description": "Rakan kongsi dan Rakan Kongsi Pengurus mengesahkan identiti mereka melalui aplikasi ThaiD atau DBD e-Service. Mereka boleh memilih untuk mengimbas Kod QR atau klik untuk mengesahkan melalui e-mel peribadi mereka.",
                    "icon": "SmartphoneNfc"
                },
                {
                    "title": "Penyerahan Pendaftaran dan Penghantaran",
                    "description": "Pasukan kami menyerahkan permohonan kepada Jabatan Pembangunan Perniagaan. Setelah diluluskan, kami akan mengesahkan ketepatannya dan menghantar dokumen penting bersama hadiah percuma terus kepada anda.",
                    "icon": "Gift"
                }
            ]
        },
        "faq": {
            "title": "Soalan Lazim (FAQ)",
            "items": [
                {
                    "question": "Apakah perbezaan antara Rakan Kongsi Pengurus dan Rakan Kongsi Liabiliti Terhad?",
                    "answer": "Undang-undang membahagikan rakan kongsi dalam Perkongsian Terhad kepada 2 jenis utama, yang memberi kesan kepada tanggungjawab mereka ke atas aset peribadi, seperti berikut:\n\n<b>1. Rakan Kongsi Pengurus</b> \nUndang-undang mewajibkan Perkongsian Terhad mempunyai sekurang-kurangnya 1 rakan kongsi jenis ini untuk menguruskan perniagaan. Mereka mempunyai kuasa penuh untuk menandatangani dan mengikat Perkongsian Terhad. Walau bagaimanapun, peringatannya ialah mereka mesti bertanggungjawab ke atas hutang Perkongsian Terhad secara <b>\"tidak terhad\"</b> (jika perniagaan menghadapi masalah dan terpaksa ditutup, aset peribadi Rakan Kongsi Pengurus boleh digunakan untuk membayar hutang).\n\n<b>2. Rakan Kongsi Liabiliti Terhad</b> \nBertindak hanya sebagai \"pelabur bersama\" tanpa hak untuk menandatangani arahan atau mengurus perniagaan. Kelebihannya ialah mereka akan bertanggungjawab ke atas hutang Perkongsian Terhad <b>\"terhad kepada tidak lebih daripada jumlah yang mereka janjikan untuk melabur\"</b> (100% selamat untuk aset peribadi)."
                },
                {
                    "question": "Apakah perbezaan antara Syarikat Berhad (Company Limited / Co., Ltd.) dan Perkongsian Terhad (Limited Partnership / Ltd. Part.), dan yang manakah harus saya pilih?",
                    "answer": "Walaupun kedua-dua struktur mempunyai status <b>\"Entiti Sah\"</b> dan berkongsi kadar cukai yang sama, terdapat perbezaan besar mengenai <b>\"Liabiliti untuk hutang\"</b>, <b>\"Kredibiliti\"</b>, dan <b>\"Sekatan ke atas warga asing\"</b>. Untuk memudahkan pemahaman dan keputusan, mari kita bandingkan seperti berikut:\n\n<b>1. Syarikat Berhad (Company Limited)</b>\n• <b>Liabiliti:</b> <i>\"Liabiliti terhad\"</i> (kecuali untuk pengarah). Semua pemegang saham hanya bertanggungjawab ke atas hutang syarikat setakat jumlah saham mereka yang belum dibayar (ini secara jelas memisahkan kewangan peribadi daripada kewangan perniagaan, memastikan aset peribadi selamat).\n• <b>Kredibiliti:</b> Sangat tinggi. Sesuai untuk perniagaan jangka panjang, bidaan kerajaan, projek besar, menarik pelabur, atau operasi B2B (Perniagaan-ke-Perniagaan).\n• <b>Dalam kes warga asing / Permohonan Permit Kerja:</b> Sangat sesuai. Undang-undang dan agensi kerajaan menyokong sepenuhnya struktur Syarikat Berhad, sama ada ia melibatkan warga asing yang memegang saham (sehingga 49%), permohonan Permit Kerja, visa perniagaan, atau promosi pelaburan BOI, dsb.\n• <b>Bilangan pengasas:</b> Pada masa ini, minimum hanya 2 pemegang saham diperlukan untuk mendaftar.\n\n<b>2. Perkongsian Terhad (Limited Partnership)</b>\n• <b>Liabiliti:</b> Undang-undang menetapkan sekurang-kurangnya 1 rakan kongsi mesti bertindak sebagai <i>\"Rakan Kongsi Pengurus\"</i>, yang bertanggungjawab ke atas hutang perniagaan secara <b>\"tidak terhad\"</b> (jika perniagaan menghadapi masalah, rakan kongsi pengurus mungkin perlu menggunakan aset peribadi untuk membayar hutang). Liabiliti rakan kongsi lain terhad kepada wang yang mereka laburkan.\n• <b>Kredibiliti:</b> Sederhana. Sesuai untuk perniagaan kecil, Perniagaan Keluarga, atau syarikat di mana rakan kongsi tidak terlalu tegas mengenai format entiti sah.\n• <b>Dalam kes warga asing:</b> Tidak disyorkan. Melibatkan warga asing dalam Perkongsian Terhad tertakluk kepada sekatan undang-undang yang agak rumit. Jika warga asing menjadi Rakan Kongsi Pengurus, ia mungkin ditafsirkan sebagai entiti sah asing, menjadikan operasi perniagaan dan permohonan Permit Kerja lebih sukar berbanding Syarikat Berhad.\n• <b>Bilangan pengasas:</b> Hanya memerlukan 2 pengasas, sama seperti pendaftaran syarikat.\n\n<b>Ringkasan: Yang manakah patut anda pilih?</b>\n• Pilih <b>\"Syarikat Berhad\"</b> jika anda mencari kredibiliti tertinggi, mempunyai rancangan untuk mengembangkan perniagaan atau cawangan pada masa hadapan, ingin mengehadkan risiko ke atas aset peribadi, mempunyai pemegang saham asing, atau merancang untuk mengambil pekerja asing.\n• Pilih <b>\"Perkongsian Terhad\"</b> jika ia adalah perniagaan keluarga atau orang terdekat yang anda percayai 100%, perniagaan itu tidak mempunyai risiko hutang yang tinggi, tiada rakan kongsi asing, dan anda menekankan struktur pengurusan yang paling ringkas.\n\n<i><b>Nota:</b> Pada masa ini, kos pendaftaran, perakaunan bulanan, dan penutupan kewangan tahunan untuk Co., Ltd. dan Ltd. Part. tidak banyak berbeza. Mendaftar sebagai \"Syarikat Berhad\" secara amnya memberikan faedah maksimum dalam jangka masa panjang.</i>"
                },
                {
                    "question": "Adakah pendaftaran Perkongsian Terhad benar-benar menjimatkan kos audit perakaunan tahunan (CPA / TA)?",
                    "answer": "<b>Benar.</b> Ini adalah salah satu kelebihan terpenting bagi pendaftaran Perkongsian Terhad.\n\nMengikut undang-undang, jika Perkongsian Terhad anda memenuhi kriteria perusahaan kecil (Small SME) yang bermaksud mempunyai <b>modal berdaftar tidak melebihi 5 juta THB, jumlah hasil tidak melebihi 30 juta THB, dan jumlah aset tidak melebihi 30 juta THB</b>, anda berhak menggunakan <b>Juruaudit Cukai (TA - Tax Auditor)</b> untuk mengaudit dan menandatangani penyata kewangan tahunan.\n\nBiasanya, yuran perkhidmatan TA adalah lebih ekonomi dan mudah diakses berbanding menggunakan Akauntan Awam Bertauliah (CPA), yang diwajibkan oleh undang-undang untuk \"Syarikat Berhad\" dari semua saiz perniagaan. Ini menyebabkan Perkongsian Terhad mempunyai kos pengurusan tahunan yang lebih rendah."
                },
                {
                    "question": "Apakah Modal Berdaftar (Sumbangan Modal) bagi Perkongsian Terhad? Bolehkah saya mendaftar jika saya tidak mempunyai jumlah penuh?",
                    "answer": "Dalam Perkongsian Terhad, kami merujuk modal berdaftar sebagai <b>\"Sumbangan Modal\"</b>, yang boleh dilaburkan dalam bentuk tunai, aset, atau tenaga kerja. <i>\"Membayar sumbangan modal\"</i> tidak bermaksud membayar wang kepada sesiapa, tetapi ia bermaksud mendepositkan modal ke dalam akaun bank di bawah nama Perkongsian Terhad untuk digunakan sebagai modal kerja perniagaan (akaun boleh dibuka selepas pendaftaran Perkongsian Terhad selesai).\n\n• <b>Jika anda tidak mempunyai jumlah penuh sekali gus:</b> Anda boleh mendepositkan wang secara beransur-ansur ke dalam akaun sebaik sahaja akaun Perkongsian Terhad dibuka (undang-undang tidak memaksa anda membayar 100% dengan segera). Anda boleh bermula dengan membuka akaun Perkongsian Terhad dengan 1,000 THB. Jika terdapat perbelanjaan berkaitan perniagaan, anda boleh memasukkan wang ke dalam akaun dan kemudian membayarnya. Jumlah ini tidak perlu terbiar di dalam akaun.\n• <b>Langkah berjaga-jaga:</b> Kecuali dalam kes di mana Perkongsian Terhad mempunyai jumlah pelaburan <b>lebih daripada 5 juta THB</b>, undang-undang menetapkan bahawa wang sebenar mesti ada, dan Sijil Bank (Bank Certificate) semua rakan kongsi mesti ditunjukkan semasa proses pendaftaran."
                },
                {
                    "question": "Bolehkah warga asing menjadi rakan kongsi dalam Perkongsian Terhad?",
                    "answer": "Di sisi undang-undang ia boleh dilakukan, <b>tetapi secara praktikal dan pengurusan, kami amat tidak mengesyorkannya.</b>\n\nMempunyai warga asing sebagai rakan kongsi dalam Perkongsian Terhad melibatkan sekatan undang-undang yang agak rumit. Terutama jika warga asing menjadi \"Rakan Kongsi Pengurus\", Perkongsian Terhad tersebut mungkin ditafsirkan sebagai <b>\"Entiti Sah Asing\"</b>, yang boleh membawa kepada:\n1. Disekat daripada mengendalikan pelbagai jenis perniagaan di Thailand (mengikut Akta Perniagaan Asing).\n2. Memohon Permit Kerja dan visa perniagaan untuk warga asing mungkin menjadi rumit dan mempunyai peluang yang jauh lebih tinggi untuk ditolak berbanding Syarikat Berhad.\n<i>(Jika terdapat pelaburan bersama warga asing, kami mengesyorkan agar memilih untuk mendaftar sebagai \"Syarikat Berhad\", yang akan menjadi lebih lancar dan memberikan faedah maksimum dalam jangka masa panjang.)</i>"
                },
                {
                    "question": "Jika saya belum mempunyai pejabat, atau menggunakan rumah sewa/kondo sebagai lokasi, bolehkah saya mendaftar?",
                    "answer": "<b>Boleh didaftarkan</b> di bawah syarat-syarat berikut:\n• <b>Dalam kes rumah sewa/ruang sewa:</b> Anda mesti mempunyai <i>\"Surat Kebenaran Menggunakan Premis\"</i> bersama salinan kad pengenalan dan pendaftaran rumah \"Tuan Rumah atau Pemilik Hartanah\" yang disahkan.\n• <b>Dalam kes kondominium:</b> Walaupun undang-undang membenarkannya, anda harus menyemak dengan pengurusan kondo tersebut terlebih dahulu, kerana banyak projek mempunyai peraturan dalaman yang tidak membenarkan bilik kediaman didaftarkan sebagai pejabat.\n<i>(Jika anda tidak selesa menggunakan tempat anda sendiri, kami mempunyai perkhidmatan <b>Pejabat Maya (Virtual Office)</b> untuk menyelesaikan masalah ini.)</i>"
                },
                {
                    "question": "Setelah Perkongsian Terhad didaftarkan, adakah saya perlu mendaftar Cukai Nilai Tambah (VAT 7%) serta-merta?",
                    "answer": "Tidak semestinya. Mendaftar Perkongsian Terhad dan mendaftar Cukai Nilai Tambah (VAT) adalah dua perkara berbeza. Perkongsian Terhad hanya diwajibkan mendaftar VAT apabila ia mempunyai pendapatan perniagaan <b>melebihi 1.8 juta THB setahun</b>.\n\nWalau bagaimanapun, jika Perkongsian Terhad perlu mengimport-mengeksport barangan, atau berurusan dengan rakan kongsi B2B yang memerlukan invois cukai dikeluarkan, Perkongsian Terhad <b>mesti memohon pendaftaran Cukai Nilai Tambah (VAT)</b> untuk membolehkan pengeluaran invois cukai kepada rakan kongsi sejak permulaan perniagaan."
                },
                {
                    "question": "Selepas Perkongsian Terhad didaftarkan, tetapi belum mula menjual atau belum menjana pendapatan, adakah saya perlu melakukan perakaunan?",
                    "answer": "<b>Mesti dilakukan.</b> Mengikut undang-undang (Akta Perakaunan B.E. 2543), semua jenis entiti sah diwajibkan untuk menyediakan akaun dan menyerahkan penyata kewangan kepada Jabatan Pembangunan Perniagaan dan Jabatan Hasil <b>\"walaupun tiada pendapatan, tiada perbelanjaan, atau perniagaan belum mula beroperasi pada tahun tersebut (Pengisytiharan Sifar)\"</b>. Mengabaikan penyerahan pada masanya akan mengakibatkan denda undang-undang yang agak tinggi."
                },
                {
                    "question": "Adakah Rakan Kongsi Pengurus perlu memotong gaji sendiri untuk diserahkan kepada Keselamatan Sosial?",
                    "answer": "<b>Tidak perlu.</b> Memandangkan anda adalah Rakan Kongsi Pengurus dan pemilik perniagaan, anda berada dalam kedudukan <b>\"Majikan\"</b>, bukan pekerja. Oleh itu, anda tidak boleh dan tidak perlu mendaftar sebagai orang yang diinsuranskan (Perkara 33) dalam Perkongsian Terhad anda sendiri.\n\nWalau bagaimanapun, apabila Perkongsian Terhad mula mengambil <b>\"pekerja sepenuh masa\"</b>, undang-undang mewajibkan Perkongsian Terhad untuk mendaftar sebagai majikan dan menyerahkan Keselamatan Sosial bagi pekerja dalam tempoh 30 hari dari tarikh pengambilan bekerja."
                }
            ]
        }
    },
    "hi": {
        "hero": {
            "title": "सीमित भागीदारी (लिमिटेड पार्टनरशिप / Ltd. Part.) पंजीकरण। प्रबंधित करने में आसान, लागत प्रभावी।",
            "subtitle": "छोटे व्यवसायों के लिए सही विकल्प।",
            "description": "अपने भागीदारों और ग्राहकों के साथ विश्वसनीयता बढ़ाने के लिए पूरी तरह से पंजीकृत कानूनी इकाई के रूप में कदम बढ़ाएं। प्रबंधन में आसान और कम लागत वाली सीमित भागीदारी संरचना के साथ, आपको जटिल कानूनी मामलों के बारे में चिंता करने की आवश्यकता नहीं है। हम आपके व्यक्तिगत सहायक बनने के लिए तैयार हैं, जो शुरू से अंत तक हर चीज का ध्यान रखते हैं जब तक कि आप अपना व्यवसाय संचालित करने के लिए तैयार न हो जाएं।",
            "cta": "+669 2882 5556"
        },
        "promotion": {
            "title": "विशेष छूट!",
            "subtitle": "उन लोगों के लिए विशेष कीमतों और पूर्ण लाभों को न चूकें जो लागत प्रभावी ढंग से व्यवसाय शुरू करना चाहते हैं।",
            "cta": "अभी प्रमोशन देखें",
            "slug": "limited-partnership-registration-deal"
        },
        "features": {
            "title": "सीमित भागीदारी शुरू करने के लिए आवश्यक सब कुछ",
            "items": [
                {
                    "title": "परामर्श और देयता संरचना",
                    "description": "केस-दर-केस के आधार पर आपकी व्यक्तिगत संपत्तियों को जोखिमों से बचाने के लिए \"प्रबंध भागीदार\" और \"सीमित देयता भागीदार\" को नामित करने पर विश्लेषण और सलाह प्रदान करना।",
                    "icon": "Lightbulb"
                },
                {
                    "title": "दस्तावेज़ और आवेदन की तैयारी",
                    "description": "डिजिटल पंजीकरण प्रणाली (DBD Biz Regist) के माध्यम से पंजीकरण आवेदन पत्र सटीक रूप से तैयार करें और पूंजी योगदान विवरण निर्दिष्ट करें।",
                    "icon": "FileSignature"
                },
                {
                    "title": "पंजीकरण आवेदन जमा करना",
                    "description": "हर चरण में वाणिज्य मंत्रालय के व्यवसाय विकास विभाग (DBD) को आवेदन जमा करने और संसाधित करने के लिए आपके प्रतिनिधि के रूप में कार्य करना।",
                    "icon": "Landmark"
                },
                {
                    "title": "कर पहचान संख्या (Tax ID) का अनुरोध",
                    "description": "आपकी सीमित भागीदारी के लिए कर प्रणाली तैयार करने के लिए कॉर्पोरेट आईडी और कर पहचान संख्या के अनुरोध को संभालना।",
                    "icon": "Calculator"
                }
            ]
        },
        "benefits": {
            "title": "पूरी तरह से लोडेड! सिर्फ आपके लिए विशेष लाभ",
            "items": [
                { "title": "कोई मासिक लेखांकन प्रतिबद्धता नहीं!", "icon": "Unlock" },
                { "title": "मुफ़्त! 3 सीमित भागीदारी नामों की जाँच और आरक्षण", "icon": "SearchCheck" },
                { "title": "मुफ़्त! 1 स्व-स्याही (self-inking) रबर स्टाम्प", "icon": "Stamp" },
                { "title": "मुफ़्त! DBD के लिए ई-फाइलिंग (e-Filing) पासवर्ड अनुरोध", "icon": "KeySquare" },
                { "title": "मुफ़्त! राजस्व विभाग के लिए पासवर्ड अनुरोध", "icon": "KeyRound" },
                { "title": "मुफ़्त! कॉर्पोरेट बैंक खाता खोलने के लिए दस्तावेज़ सेट", "icon": "Wallet" },
                { "title": "मुफ़्त! कंपनी प्रमाणपत्र दस्तावेजों का पूरा सेट (DBD)", "icon": "ScrollText" },
                { "title": "मुफ़्त! कर तकनीक प्रशिक्षण पाठ्यक्रम (मूल्य 5,900 THB)", "icon": "GraduationCap" },
                { "title": "मुफ़्त! रसीद/कर चालान जारी करने के लिए बिजनेस कार्ड", "icon": "Contact2" }
            ]
        },
        "requirements": {
            "title": "सीमित भागीदारी पंजीकरण के लिए क्या तैयार करें",
            "subtitle": "बस बुनियादी जानकारी तैयार करें, बाकी हम पर छोड़ दें।",
            "documents": {
                "title": "1. आवश्यक महत्वपूर्ण दस्तावेज़",
                "items": [
                    "कम से कम 2 भागीदार \n\n1. थाई भागीदार: आईडी कार्ड की कॉपी (आगे और पीछे की स्पष्ट कॉपी)\n\n2. विदेशी भागीदार: पासपोर्ट की कॉपी (केवल फोटो वाला पहला पेज)",
                    "मुख्यालय के रूप में उपयोग किए जाने के लिए हाउस रजिस्ट्रेशन (Tabien Baan)।",
                    "स्टाम्प डिज़ाइन (यदि कोई हो)"
                ]
            },
            "information": {
                "title": "2. बुनियादी व्यावसायिक जानकारी",
                "items": [
                    "वांछित सीमित भागीदारी का नाम (थाई-अंग्रेजी)",
                    "प्रत्येक व्यक्ति की पूंजी योगदान राशि (उदा., श्रीमान A 990,000 THB का योगदान देता है, श्रीमान B 10,000 THB का योगदान देता है)",
                    "भागीदार की स्थिति निर्दिष्ट करें (कौन \"प्रबंध भागीदार\" के रूप में कार्य करता है और कौन \"सीमित देयता भागीदार\" है)",
                    "व्यापार संचालन का विवरण",
                    "सीमित भागीदारी संपर्क जानकारी \n1. फोन नंबर \n2. ईमेल",
                    "प्रत्येक भागीदार की संपर्क जानकारी \n1. फोन नंबर \n2. ईमेल \n3. LINE ID"
                ]
            }
        },
        "process": {
            "title": "4 सरल पंजीकरण चरण",
            "steps": [
                {
                    "title": "परामर्श और नाम आरक्षण",
                    "description": "हम जानकारी इकट्ठा करने के लिए चर्चा करेंगे, एक सीमित भागीदारी संरचना की योजना बनाने में मदद करेंगे जो आपकी आवश्यकताओं के लिए सबसे उपयुक्त है, और नाम आरक्षण के साथ आगे बढ़ेंगे。",
                    "icon": "MessageSquareText"
                },
                {
                    "title": "सरकारी प्रणाली के माध्यम से दस्तावेज़ तैयार करना",
                    "description": "हमारी टीम डिजिटल पंजीकरण प्रणाली (DBD Biz Regist) के माध्यम से सभी दस्तावेज़ और फॉर्म तैयार करती है।",
                    "icon": "FileStack"
                },
                {
                    "title": "ऑनलाइन पहचान सत्यापन (सुविधाजनक, कोई यात्रा आवश्यक नहीं)",
                    "description": "भागीदार और प्रबंध भागीदार ThaiD या DBD e-Service ऐप के माध्यम से अपनी पहचान सत्यापित करते हैं। वे QR कोड स्कैन करना चुन सकते हैं या अपने व्यक्तिगत ईमेल के माध्यम से सत्यापित करने के लिए क्लिक कर सकते हैं।",
                    "icon": "SmartphoneNfc"
                },
                {
                    "title": "पंजीकरण जमा करना और डिलीवरी",
                    "description": "हमारी टीम व्यवसाय विकास विभाग में आवेदन जमा करती है। एक बार स्वीकृत होने के बाद, हम सटीकता की पुष्टि करेंगे और मुफ्त उपहारों के साथ आवश्यक दस्तावेज़ सीधे आप तक पहुंचाएंगे।",
                    "icon": "Gift"
                }
            ]
        },
        "faq": {
            "title": "अक्सर पूछे जाने वाले प्रश्न (FAQ)",
            "items": [
                {
                    "question": "प्रबंध भागीदार और सीमित देयता भागीदार में क्या अंतर है?",
                    "answer": "कानून एक सीमित भागीदारी में भागीदारों को 2 मुख्य प्रकारों में विभाजित करता है, जो व्यक्तिगत संपत्ति पर उनकी जिम्मेदारी को निम्नानुसार प्रभावित करता है:\n\n<b>1. प्रबंध भागीदार</b> \nकानून की आवश्यकता है कि व्यवसाय का प्रबंधन करने के लिए एक सीमित भागीदारी में इस प्रकार का कम से कम 1 भागीदार होना चाहिए। उनके पास सीमित भागीदारी पर हस्ताक्षर करने और बाध्य करने का पूर्ण अधिकार है। हालांकि, चेतावनी यह है कि उन्हें सीमित भागीदारी के ऋणों के लिए <b>\"असीमित\"</b> आधार पर जिम्मेदार होना चाहिए (यदि व्यवसाय को समस्याओं का सामना करना पड़ता है और इसे बंद करना पड़ता है, तो प्रबंध भागीदार की व्यक्तिगत संपत्तियों का उपयोग ऋण चुकाने के लिए किया जा सकता है)।\n\n<b>2. सीमित देयता भागीदार</b> \nआदेशों पर हस्ताक्षर करने या व्यवसाय का प्रबंधन करने के किसी भी अधिकार के बिना केवल \"सह-निवेशक\" के रूप में कार्य करता है। लाभ यह है कि वे सीमित भागीदारी के ऋणों के लिए जिम्मेदार होंगे, जो <b>\"उनके द्वारा निवेश करने का वादा की गई राशि से अधिक नहीं होगा\"</b> (व्यक्तिगत संपत्ति के लिए 100% सुरक्षित)।"
                },
                {
                    "question": "कंपनी लिमिटेड (Co., Ltd.) और सीमित भागीदारी (Ltd. Part.) में क्या अंतर है, और मुझे कौन सा चुनना चाहिए?",
                    "answer": "हालांकि दोनों संरचनाओं को <b>\"कानूनी इकाई\"</b> का दर्जा प्राप्त है और वे समान कर दरों को साझा करते हैं, <b>\"ऋण के लिए देयता\"</b>, <b>\"विश्वसनीयता\"</b> और <b>\"विदेशी नागरिकों पर प्रतिबंध\"</b> के संबंध में बड़े अंतर हैं। इसे समझना और निर्णय लेना आसान बनाने के लिए, आइए हम उनकी तुलना इस प्रकार करें:\n\n<b>1. कंपनी लिमिटेड (Company Limited)</b>\n• <b>देयता:</b> <i>\"सीमित देयता\"</i> (निदेशकों को छोड़कर)। सभी शेयरधारक कंपनी के ऋणों के लिए केवल उनके शेयरों की अवैतनिक राशि तक ही उत्तरदायी हैं (यह व्यक्तिगत वित्त को व्यावसायिक वित्त से स्पष्ट रूप से अलग करता है, जिससे व्यक्तिगत संपत्ति सुरक्षित रहती है)।\n• <b>विश्वसनीयता:</b> बहुत अधिक। दीर्घकालिक व्यापार, सरकारी बोली, बड़ी परियोजनाओं को लेने, निवेशकों को आकर्षित करने, या B2B (व्यवसाय-से-व्यवसाय) संचालन के लिए उपयुक्त।\n• <b>विदेशियों के मामले में / वर्क परमिट (Work Permit) अनुरोध:</b> अत्यधिक उपयुक्त। कानून और सरकारी एजेंसियां कंपनी लिमिटेड संरचना का उत्कृष्ट रूप से समर्थन करती हैं, चाहे वह विदेशियों के शेयर रखने (49% तक), वर्क परमिट अनुरोध, व्यावसायिक वीजा, या BOI निवेश प्रोत्साहन आदि से संबंधित हो।\n• <b>आवश्यक संस्थापकों की संख्या:</b> वर्तमान में, पंजीकरण के लिए कम से कम 2 शेयरधारकों की आवश्यकता होती है।\n\n<b>2. सीमित भागीदारी (Limited Partnership)</b>\n• <b>देयता:</b> कानून की आवश्यकता है कि कम से कम 1 भागीदार <i>\"प्रबंध भागीदार\"</i> के रूप में कार्य करे, जिसे <b>\"असीमित\"</b> आधार पर व्यवसाय के ऋणों के लिए जिम्मेदार होना चाहिए (यदि व्यवसाय को समस्या होती है, तो प्रबंध भागीदार को ऋण चुकाने के लिए व्यक्तिगत संपत्ति का उपयोग करना पड़ सकता है)। अन्य भागीदारों की देयता उनके द्वारा निवेश किए गए धन तक सीमित है।\n• <b>विश्वसनीयता:</b> मध्यम। छोटे व्यवसायों, पारिवारिक व्यवसायों, या ऐसे उद्यमों के लिए उपयुक्त जहां भागीदार कानूनी इकाई प्रारूप के बारे में बहुत सख्त नहीं हैं।\n• <b>विदेशियों के मामले में:</b> अनुशंसित नहीं। सीमित भागीदारी में विदेशियों के होने से अत्यधिक जटिल कानूनी प्रतिबंध लगते हैं। यदि कोई विदेशी प्रबंध भागीदार बन जाता है, तो इसकी व्याख्या विदेशी कानूनी इकाई के रूप में की जा सकती है, जिससे कंपनी लिमिटेड की तुलना में व्यावसायिक संचालन और वर्क परमिट अनुरोध बहुत अधिक कठिन हो जाते हैं।\n• <b>आवश्यक संस्थापकों की संख्या:</b> कंपनी के पंजीकरण के समान केवल 2 संस्थापकों की आवश्यकता है।\n\n<b>सारांश: आपको कौन सा चुनना चाहिए?</b>\n• यदि आप सर्वोच्च विश्वसनीयता की तलाश में हैं, भविष्य में व्यवसाय या शाखाओं का विस्तार करने की योजना बना रहे हैं, व्यक्तिगत संपत्ति को प्रभावित करने वाले जोखिमों को सीमित करना चाहते हैं, विदेशी शेयरधारक हैं, या विदेशी कर्मचारियों (वर्क परमिट अनुरोध) को काम पर रखने की योजना बना रहे हैं, तो एक <b>\"कंपनी लिमिटेड\"</b> चुनें।\n• <b>\"सीमित भागीदारी\"</b> चुनें यदि यह एक पारिवारिक व्यवसाय है या करीबी लोग जिन पर आप 100% भरोसा करते हैं, व्यवसाय में उच्च ऋण जोखिम नहीं हैं, कोई विदेशी भागीदार नहीं हैं, और आप सबसे सरल प्रबंधन संरचना पर जोर देते हैं।\n\n<i><b>नोट:</b> वर्तमान में, Co., Ltd. और Ltd. Part. के लिए पंजीकरण, मासिक लेखांकन और वार्षिक वित्तीय समापन की लागत बहुत अलग नहीं है। \"कंपनी लिमिटेड\" के रूप में पंजीकरण करने से आम तौर पर लंबे समय में अधिकतम लाभ मिलता है।</i>"
                },
                {
                    "question": "क्या सीमित भागीदारी दर्ज करने से वास्तव में वार्षिक लेखा परीक्षा (CPA / TA) की लागत बचती है?",
                    "answer": "<b>सच है।</b> यह सीमित भागीदारी को पंजीकृत करने का सबसे महत्वपूर्ण लाभों में से एक है。\n\nकानून द्वारा, यदि आपकी सीमित भागीदारी एक छोटे उद्यम (Small SME) के मानदंडों को पूरा करती है जिसका अर्थ है कि <b>पंजीकृत पूंजी 5 मिलियन THB से अधिक नहीं है, कुल राजस्व 30 मिलियन THB से अधिक नहीं है, और कुल संपत्ति 30 मिलियन THB से अधिक नहीं है</b>, तो आप वार्षिक वित्तीय विवरणों का ऑडिट करने और हस्ताक्षर करने के लिए एक <b>कर लेखा परीक्षक (TA - Tax Auditor)</b> का उपयोग करने के हकदार हैं。\n\nआमतौर पर, प्रमाणित सार्वजनिक लेखाकार (CPA) का उपयोग करने की तुलना में TA की सेवा शुल्क अधिक किफायती और सुलभ होते हैं, जिसे कानून सभी व्यावसायिक आकारों के \"कंपनी लिमिटेड\" के लिए अनिवार्य करता है। इसके परिणामस्वरूप सीमित भागीदारी के लिए वार्षिक प्रबंधन लागत कम होती है।"
                },
                {
                    "question": "सीमित भागीदारी की पंजीकृत पूंजी (पूंजी योगदान) क्या है? यदि मेरे पास पूरी एकमुश्त राशि नहीं है तो क्या मैं पंजीकरण कर सकता हूँ?",
                    "answer": "सीमित भागीदारी में, हम पंजीकृत पूंजी को <b>\"पूंजी योगदान\"</b> कहते हैं, जिसे नकद, संपत्ति या श्रम में निवेश किया जा सकता है। <i>\"पूंजी योगदान का भुगतान करने\"</i> का अर्थ किसी को पैसे का भुगतान करना नहीं है, बल्कि इसका अर्थ व्यवसाय के लिए कार्यशील पूंजी (working capital) के रूप में उपयोग करने के लिए सीमित भागीदारी के नाम पर एक बैंक खाते में पूंजी जमा करना है (सीमित भागीदारी पंजीकरण पूरा होने के बाद खाता खोला जा सकता है)।\n\n• <b>यदि आपके पास पूरी एकमुश्त राशि नहीं है:</b> एक बार सीमित भागीदारी का खाता खुलने के बाद आप धीरे-धीरे खाते में पैसा जमा कर सकते हैं (कानून आपको तुरंत 100% भुगतान करने के लिए बाध्य नहीं करता है)। आप 1,000 THB के साथ सीमित भागीदारी का खाता खोलकर शुरुआत कर सकते हैं। यदि व्यवसाय से संबंधित खर्च हैं, तो आप खाते में पैसा जमा कर सकते हैं और फिर उसका भुगतान कर सकते हैं। इस एकमुश्त राशि को खाते में बेकार पड़े रहने की आवश्यकता नहीं है।\n• <b>सावधानियां:</b> उस मामले को छोड़कर जहां सीमित भागीदारी का कुल निवेश <b>5 मिलियन THB से अधिक</b> है, कानून को वास्तविक धन की आवश्यकता होती है, और पंजीकरण प्रक्रिया के दौरान सभी भागीदारों का बैंक प्रमाणपत्र (Bank Certificate) दिखाया जाना चाहिए।"
                },
                {
                    "question": "क्या विदेशी एक सीमित भागीदारी में भागीदार बन सकते हैं?",
                    "answer": "कानूनी तौर पर यह किया जा सकता है, <b>लेकिन व्यावहारिक और प्रबंधकीय रूप से, हम इसकी बिल्कुल अनुशंसा नहीं करते हैं।</b>\n\nसीमित भागीदारी में भागीदार के रूप में किसी विदेशी का होना काफी जटिल कानूनी प्रतिबंधों से जुड़ा है। विशेष रूप से यदि कोई विदेशी \"प्रबंध भागीदार\" बन जाता है, तो सीमित भागीदारी की व्याख्या एक <b>\"विदेशी कानूनी इकाई\"</b> के रूप में की जा सकती है, जिसके परिणामस्वरूप यह हो सकता है:\n1. थाईलैंड में कई प्रकार के व्यवसायों के संचालन से प्रतिबंधित होना (विदेशी व्यापार अधिनियम के अनुसार)।\n2. विदेशियों के लिए वर्क परमिट और बिजनेस वीजा का अनुरोध करना जटिल हो सकता है और कंपनी लिमिटेड की तुलना में खारिज होने की संभावना बहुत अधिक है।\n<i>(यदि विदेशी सह-निवेश है, तो हम \"कंपनी लिमिटेड\" के रूप में पंजीकरण करने का विकल्प चुनने की सलाह देते हैं, जो लंबे समय में आसान होगा और अधिकतम लाभ प्रदान करेगा।)</i>"
                },
                {
                    "question": "यदि मेरे पास अभी तक कोई कार्यालय नहीं है, या मैं स्थान के रूप में किराए के घर/कोंडो का उपयोग करता हूँ, तो क्या मैं पंजीकरण कर सकता हूँ?",
                    "answer": "<b>पंजीकृत किया जा सकता है</b> निम्नलिखित शर्तों के तहत:\n• <b>किराए के घर/किराए के स्थान के मामले में:</b> आपके पास \"मकान के मालिक या संपत्ति के मालिक\" के आईडी कार्ड और हाउस रजिस्ट्रेशन की प्रमाणित प्रतियों के साथ <i>\"परिसर का उपयोग करने के लिए सहमति पत्र\"</i> होना चाहिए।\n• <b>कोंडोमिनियम के मामले में:</b> यद्यपि कानून इसकी अनुमति देता है, आपको पहले कोंडो के न्यायिक व्यक्ति (juristic person) से जांच करनी चाहिए, क्योंकि कई परियोजनाओं में आंतरिक नियम हैं जो आवासीय कमरों को कार्यालयों के रूप में पंजीकृत करने की अनुमति नहीं देते हैं।\n<i>(यदि आप अपने स्वयं के स्थान का उपयोग करने में सुविधाजनक नहीं हैं, तो इस समस्या को हल करने के लिए हमारे पास एक <b>वर्चुअल ऑफिस (Virtual Office)</b> सेवा उपलब्ध है।)</i>"
                },
                {
                    "question": "एक बार सीमित भागीदारी पंजीकृत हो जाने के बाद, क्या मुझे तुरंत मूल्य वर्धित कर (VAT 7%) के लिए पंजीकरण करना होगा?",
                    "answer": "जरूरी नहीं। सीमित भागीदारी को पंजीकृत करना और मूल्य वर्धित कर (VAT) के लिए पंजीकरण करना दो अलग-अलग चीजें हैं। एक सीमित भागीदारी को वैट के लिए पंजीकरण करने के लिए तभी मजबूर किया जाता है जब उसकी व्यावसायिक आय <b>प्रति वर्ष 1.8 मिलियन THB से अधिक हो</b>।\n\nहालांकि, यदि सीमित भागीदारी को माल आयात-निर्यात करने की आवश्यकता है, या B2B भागीदारों के साथ सौदा करने की आवश्यकता है जिन्हें कर चालान जारी करने की आवश्यकता है, तो व्यापार की शुरुआत से ही भागीदारों को कर चालान जारी करने में सक्षम होने के लिए सीमित भागीदारी को <b>मूल्य वर्धित कर (VAT) पंजीकरण के लिए आवेदन करना चाहिए</b>।"
                },
                {
                    "question": "सीमित भागीदारी पंजीकृत होने के बाद, लेकिन बिक्री शुरू नहीं हुई है या अभी तक आय उत्पन्न नहीं हुई है, क्या मुझे लेखांकन (Accounting) करने की आवश्यकता है?",
                    "answer": "<b>करना ही होगा।</b> कानून (लेखांकन अधिनियम B.E. 2543) द्वारा, सभी प्रकार के कानूनी व्यक्तियों को खाते तैयार करने और व्यवसाय विकास विभाग और राजस्व विभाग को वित्तीय विवरण प्रस्तुत करने की आवश्यकता होती है <b>\"भले ही कोई आय न हो, कोई खर्च न हो, या व्यवसाय ने उस वर्ष में काम करना शुरू नहीं किया हो (शून्य घोषणा - Zero declaration)\"</b>। समय पर जमा करने की उपेक्षा करने पर अपेक्षाकृत अधिक कानूनी जुर्माना लगेगा।"
                },
                {
                    "question": "क्या प्रबंध भागीदार को सामाजिक सुरक्षा (Social Security) में जमा करने के लिए अपने स्वयं के वेतन में कटौती करनी होगी?",
                    "answer": "<b>जरूरत नहीं है।</b> चूंकि आप प्रबंध भागीदार और व्यवसाय के मालिक हैं, आप एक <b>\"नियोक्ता (Employer)\"</b> की स्थिति में हैं, कर्मचारी की नहीं। इसलिए, आप अपनी सीमित भागीदारी में बीमित व्यक्ति (अनुच्छेद 33) के रूप में पंजीकरण नहीं कर सकते हैं और आपको इसकी आवश्यकता नहीं है।\n\nहालांकि, जब भी सीमित भागीदारी <b>\"पूर्णकालिक कर्मचारियों\"</b> को काम पर रखना शुरू करती है, तो कानून की आवश्यकता होती है कि सीमित भागीदारी एक नियोक्ता के रूप में पंजीकरण करे और काम पर रखने की तारीख से 30 दिनों के भीतर कर्मचारियों के लिए सामाजिक सुरक्षा जमा करे।"
                }
            ]
        }
    },
    "ta": {
        "hero": {
            "title": "வரையறுக்கப்பட்ட கூட்டாண்மை (Limited Partnership / Ltd. Part.) பதிவு. நிர்வகிக்க எளிதானது, செலவு குறைந்ததாகும்.",
            "subtitle": "சிறு வணிகங்களுக்கான சரியான தேர்வு.",
            "description": "உங்கள் கூட்டாளர்கள் மற்றும் வாடிக்கையாளர்களுடன் நம்பகத்தன்மையை அதிகரிக்க முழுமையாகப் பதிவுசெய்யப்பட்ட சட்டபூர்வமான நபராக மாறுங்கள். நிர்வகிக்க எளிதான மற்றும் குறைந்த செலவுடைய ஒரு வரையறுக்கப்பட்ட கூட்டாண்மை அமைப்பு மூலம், சிக்கலான சட்ட விதிமுறைகளைப் பற்றி நீங்கள் கவலைப்படுவதை நிறுத்தலாம். நாங்கள் உங்கள் தனிப்பட்ட உதவியாளராக இருக்கத் தயாராக உள்ளோம், ஆரம்பம் முதல் நீங்கள் உங்கள் வணிகத்தை இயக்கத் தயாராகும் வரை அனைத்தையும் கவனித்துக்கொள்கிறோம்.",
            "cta": "+669 2882 5556"
        },
        "promotion": {
            "title": "சிறப்பு சலுகை!",
            "subtitle": "செலவு குறைந்த முறையில் வணிகத்தைத் தொடங்க விரும்புவோருக்கான சிறப்பு விலைகள் மற்றும் முழுமையான சலுகைகளைத் தவறவிடாதீர்கள்.",
            "cta": "இப்போது சலுகையைக் காண்க",
            "slug": "limited-partnership-registration-deal"
        },
        "features": {
            "title": "வரையறுக்கப்பட்ட கூட்டாண்மையைத் தொடங்க உங்களுக்குத் தேவையான அனைத்தும்",
            "items": [
                {
                    "title": "ஆலோசனை மற்றும் பொறுப்பு கட்டமைப்பு",
                    "description": "ஒவ்வொரு சந்தர்ப்பத்திலும் ஆபத்துகளிலிருந்து உங்கள் தனிப்பட்ட சொத்துக்களைப் பாதுகாக்க \"நிர்வாகப் கூட்டாளர்\" மற்றும் \"வரையறுக்கப்பட்ட பொறுப்புக் கூட்டாளர்\" ஆகியோரை நியமிப்பது குறித்து பகுப்பாய்வு செய்து ஆலோசனை வழங்குகிறோம்.",
                    "icon": "Lightbulb"
                },
                {
                    "title": "ஆவணம் மற்றும் விண்ணப்ப தயாரிப்பு",
                    "description": "டிஜிட்டல் பதிவு அமைப்பு (DBD Biz Regist) மூலம் பதிவு விண்ணப்பப் படிவங்களை துல்லியமாகத் தயாரித்து மூலதனப் பங்களிப்பு விவரங்களைக் குறிப்பிடவும்.",
                    "icon": "FileSignature"
                },
                {
                    "title": "நிறுவனப் பதிவு சமர்ப்பிப்பு",
                    "description": "ஒவ்வொரு கட்டத்திலும் வர்த்தக அமைச்சகத்தின் வணிக மேம்பாட்டுத் துறைக்கு (DBD) விண்ணப்பங்களைச் செயலாக்க மற்றும் சமர்ப்பிக்க உங்கள் பிரதிநிதியாகச் செயல்படுகிறோம்.",
                    "icon": "Landmark"
                },
                {
                    "title": "வரி அடையாள எண் (Tax ID) கோரிக்கை",
                    "description": "உங்கள் வரையறுக்கப்பட்ட கூட்டாண்மைக்கான வரி அமைப்பைத் தயாரிக்க கார்ப்பரேட் ஐடி மற்றும் வரி அடையாள எண் கோரிக்கைகளைக் கையாளுகிறோம்.",
                    "icon": "Calculator"
                }
            ]
        },
        "benefits": {
            "title": "முழுமையானது! உங்களுக்கான பிரத்தியேக சலுகைகள்",
            "items": [
                { "title": "மாதாந்திர கணக்கியல் அர்ப்பணிப்பு இல்லை!", "icon": "Unlock" },
                { "title": "இலவசம்! 3 வரையறுக்கப்பட்ட கூட்டாண்மை பெயர்களை சரிபார்த்து முன்பதிவு செய்தல்", "icon": "SearchCheck" },
                { "title": "இலவசம்! 1 சுய மையிடும் (self-inking) வரையறுக்கப்பட்ட கூட்டாண்மை முத்திரை", "icon": "Stamp" },
                { "title": "இலவசம்! DBD க்கான இ-ஃபைலிங் (e-Filing) கடவுச்சொல் கோரிக்கை", "icon": "KeySquare" },
                { "title": "இலவசம்! வருவாய்த் துறைக்கான கடவுச்சொல் கோரிக்கை", "icon": "KeyRound" },
                { "title": "இலவசம்! கார்ப்பரேட் வங்கி கணக்கு திறப்பதற்கான ஆவணங்களின் தொகுப்பு", "icon": "Wallet" },
                { "title": "இலவசம்! வரையறுக்கப்பட்ட கூட்டாண்மை சான்றிதழின் முழுமையான தொகுப்பு (DBD)", "icon": "ScrollText" },
                { "title": "இலவசம்! வரி நுட்ப பயிற்சி பாடநெறி (மதிப்பு 5,900 THB)", "icon": "GraduationCap" },
                { "title": "இலவசம்! ரசீதுகள்/வரி இன்வாய்ஸ்களை வழங்குவதற்கான வணிக அட்டைகள்", "icon": "Contact2" }
            ]
        },
        "requirements": {
            "title": "வரையறுக்கப்பட்ட கூட்டாண்மை பதிவுக்கு என்ன தயார் செய்ய வேண்டும்",
            "subtitle": "அடிப்படை தகவல்களை தயார் செய்யுங்கள், மீதமுள்ளவற்றை எங்களிடம் விட்டுவிடுங்கள்.",
            "documents": {
                "title": "1. தேவையான முக்கிய ஆவணங்கள்",
                "items": [
                    "குறைந்தது 2 கூட்டாளர்கள் \n\n1. தாய் கூட்டாளர்கள்: அடையாள அட்டை நகல் (முன்புறம் மற்றும் பின்புறத்தின் தெளிவான நகல்)\n\n2. வெளிநாட்டு கூட்டாளர்கள்: பாஸ்போர்ட் நகல் (புகைப்படத்துடன் கூடிய முதல் பக்கம் மட்டுமே)",
                    "வரையறுக்கப்பட்ட கூட்டாண்மையின் தலைமையகமாகப் பயன்படுத்தப்படும் வீட்டின் பதிவு (Tabien Baan).",
                    "முத்திரை வடிவமைப்பு (ஏதேனும் இருந்தால்)"
                ]
            },
            "information": {
                "title": "2. அடிப்படை வணிக தகவல்",
                "items": [
                    "விரும்பிய வரையறுக்கப்பட்ட கூட்டாண்மை பெயர் (தாய்-ஆங்கிலம்)",
                    "ஒவ்வொரு நபரின் மூலதனப் பங்களிப்புத் தொகை (எ.கா., திரு. A 990,000 THB பங்களிக்கிறார், திரு. B 10,000 THB பங்களிக்கிறார்)",
                    "கூட்டாளர் நிலையை குறிப்பிடவும் (யார் \"நிர்வாகப் கூட்டாளர்\" ஆக செயல்படுகிறார், யார் \"வரையறுக்கப்பட்ட பொறுப்புக் கூட்டாளர்\")",
                    "வணிக செயல்பாடுகளின் விளக்கம்",
                    "வரையறுக்கப்பட்ட கூட்டாண்மை தொடர்பு தகவல் \n1. தொலைபேசி எண் \n2. மின்னஞ்சல்",
                    "ஒவ்வொரு கூட்டாளரின் தொடர்பு தகவல் \n1. தொலைபேசி எண் \n2. மின்னஞ்சல் \n3. LINE ID"
                ]
            }
        },
        "process": {
            "title": "4 எளிய பதிவு படிகள்",
            "steps": [
                {
                    "title": "ஆலோசனை & பெயர் முன்பதிவு",
                    "description": "தகவல்களைச் சேகரிக்க நாங்கள் விவாதிப்போம், உங்கள் தேவைகளுக்குச் சிறப்பாகப் பொருந்தக்கூடிய வரையறுக்கப்பட்ட கூட்டாண்மை அமைப்பைத் திட்டமிட உதவுவோம், மேலும் பெயர் முன்பதிவைத் தொடருவோம்.",
                    "icon": "MessageSquareText"
                },
                {
                    "title": "அரசு அமைப்பு மூலம் ஆவணங்களைத் தயார் செய்தல்",
                    "description": "டிஜிட்டல் பதிவு அமைப்பு (DBD Biz Regist) மூலம் எங்கள் குழு அனைத்து ஆவணங்களையும் படிவங்களையும் தயாரிக்கிறது.",
                    "icon": "FileStack"
                },
                {
                    "title": "ஆன்லைன் அடையாள சரிபார்ப்பு (வசதியானது, பயணம் தேவையில்லை)",
                    "description": "கூட்டாளர்கள் மற்றும் நிர்வாகப் கூட்டாளர் ThaiD அல்லது DBD e-Service செயலி மூலம் தங்கள் அடையாளத்தை சரிபார்க்கிறார்கள். அவர்கள் QR குறியீட்டை ஸ்கேன் செய்ய தேர்வு செய்யலாம் அல்லது அவர்களின் தனிப்பட்ட மின்னஞ்சல் மூலம் சரிபார்க்க கிளிக் செய்யலாம்.",
                    "icon": "SmartphoneNfc"
                },
                {
                    "title": "பதிவைச் சமர்ப்பித்து டெலிவரி பெறுதல்",
                    "description": "எங்கள் குழு விண்ணப்பத்தை வணிக மேம்பாட்டுத் துறையிடம் (DBD) சமர்ப்பிக்கிறது. அங்கீகரிக்கப்பட்டதும், நாங்கள் துல்லியத்தைச் சரிபார்த்து, அத்தியாவசிய ஆவணங்களையும் இலவசப் பரிசுகளையும் நேரடியாக உங்களிடம் வழங்குவோம்.",
                    "icon": "Gift"
                }
            ]
        },
        "faq": {
            "title": "அடிக்கடி கேட்கப்படும் கேள்விகள் (FAQ)",
            "items": [
                {
                    "question": "நிர்வாகப் கூட்டாளர் மற்றும் வரையறுக்கப்பட்ட பொறுப்புக் கூட்டாளர் இடையே உள்ள வேறுபாடு என்ன?",
                    "answer": "ஒரு வரையறுக்கப்பட்ட கூட்டாண்மையில் உள்ள கூட்டாளர்களை சட்டம் 2 முக்கிய வகைகளாகப் பிரிக்கிறது, இது பின்வருமாறு தனிப்பட்ட சொத்துக்களின் மீதான அவர்களின் பொறுப்பை பாதிக்கிறது:\n\n<b>1. நிர்வாகப் கூட்டாளர்</b> \nவணிகத்தை நிர்வகிக்க வரையறுக்கப்பட்ட கூட்டாண்மைக்கு குறைந்தபட்சம் 1 இந்த வகையான கூட்டாளர் இருக்க வேண்டும் என்று சட்டம் கோருகிறது. வரையறுக்கப்பட்ட கூட்டாண்மையில் கையெழுத்திடவும் பிணைக்கவும் அவர்களுக்கு முழு அதிகாரம் உள்ளது. எவ்வாறாயினும், எச்சரிக்கை என்னவென்றால், வரையறுக்கப்பட்ட கூட்டாண்மையின் கடன்களுக்கு <b>\"வரம்பற்ற\"</b> அடிப்படையில் அவர்கள் பொறுப்பேற்க வேண்டும் (வணிகம் சிக்கல்களை எதிர்கொண்டு மூடப்பட்டால், நிர்வாகக் கூட்டாளரின் தனிப்பட்ட சொத்துக்களைக் கடன்களை அடைக்கப் பயன்படுத்தப்படலாம்).\n\n<b>2. வரையறுக்கப்பட்ட பொறுப்புக் கூட்டாளர்</b> \nஉத்தரவுகளில் கையெழுத்திடவோ அல்லது வணிகத்தை நிர்வகிக்கவோ எந்த உரிமையும் இல்லாமல் \"இணை முதலீட்டாளராக\" மட்டுமே செயல்படுகிறார். நன்மைகள் என்னவென்றால், வரையறுக்கப்பட்ட கூட்டாண்மையின் கடன்களுக்கு அவர்கள் பொறுப்பாவார்கள், இது <b>\"அவர்கள் முதலீடு செய்வதாக உறுதியளித்த தொகையை விட அதிகமாக இருக்காது\"</b> (தனிப்பட்ட சொத்துக்களுக்கு 100% பாதுகாப்பானது)."
                },
                {
                    "question": "கம்பெனி லிமிடெட் (Co., Ltd.) மற்றும் லிமிடெட் பார்ட்னர்ஷிப் (Ltd. Part.) இடையே உள்ள வேறுபாடு என்ன, நான் எதை தேர்வு செய்ய வேண்டும்?",
                    "answer": "இரண்டு அமைப்புகளும் <b>\"சட்டபூர்வ நபர்\"</b> என்ற அந்தஸ்தைக் கொண்டிருந்தாலும் மற்றும் ஒரே வரி விகிதங்களைப் பகிர்ந்து கொண்டாலும், <b>\"கடன்களுக்கான பொறுப்பு\"</b>, <b>\"நம்பகத்தன்மை\"</b> மற்றும் <b>\"வெளிநாட்டவர்களுக்கான கட்டுப்பாடுகள்\"</b> குறித்து பெரும் வேறுபாடுகள் உள்ளன. புரிந்துகொள்வதையும் முடிவெடுப்பதையும் எளிதாக்க, அவற்றை பின்வருமாறு ஒப்பிடுவோம்:\n\n<b>1. கம்பெனி லிமிடெட் (Company Limited)</b>\n• <b>பொறுப்பு:</b> <i>\"வரையறுக்கப்பட்ட பொறுப்பு\"</i> (இயக்குநர்கள் தவிர). அனைத்து பங்குதாரர்களும் தாங்கள் வைத்திருக்கும் பங்குகளின் செலுத்தப்படாத தொகைக்கு மட்டுமே நிறுவனத்தின் கடன்களுக்கு பொறுப்பாவார்கள் (இது தனிப்பட்ட நிதிகளை வணிக நிதியிலிருந்து தெளிவாகப் பிரிக்கிறது, தனிப்பட்ட சொத்துக்களைப் பாதுகாப்பாக வைத்திருக்கிறது).\n• <b>நம்பகத்தன்மை:</b> மிக அதிகம். நீண்ட கால வணிகம், அரசாங்க ஏலம், பெரிய திட்டங்களை ஏற்றுக்கொள்வது, முதலீட்டாளர்களை ஈர்ப்பது அல்லது B2B (வணிகத்திலிருந்து வணிகம்) செயல்பாடுகளுக்கு ஏற்றது.\n• <b>வெளிநாட்டவர்கள் / பணி அனுமதி (Work Permit) கோரிக்கைகள் ஏற்பட்டால்:</b> மிகவும் பொருத்தமானது. வெளிநாட்டவர்கள் பங்குகளை வைத்திருப்பது (49% வரை), பணி அனுமதி கோரிக்கைகள், வணிக விசாக்கள் அல்லது BOI முதலீட்டு விளம்பரங்கள் போன்ற எதையும் கம்பெனி லிமிடெட் அமைப்பை சட்டமும் அரசு நிறுவனங்களும் மிகச் சிறப்பாக ஆதரிக்கின்றன.\n• <b>தேவையான நிறுவனர்களின் எண்ணிக்கை:</b> தற்போது, பதிவு செய்ய குறைந்தபட்சம் 2 பங்குதாரர்கள் மட்டுமே தேவை.\n\n<b>2. லிமிடெட் பார்ட்னர்ஷிப் (Limited Partnership)</b>\n• <b>பொறுப்பு:</b> குறைந்தபட்சம் 1 கூட்டாளர் <i>\"நிர்வாகப் கூட்டாளராக\"</i> செயல்பட வேண்டும் என்று சட்டம் கோருகிறது, அவர் <b>\"வரம்பற்ற\"</b> அடிப்படையில் வணிகத்தின் கடன்களுக்கு பொறுப்பேற்க வேண்டும் (வணிகத்தில் சிக்கல்கள் இருந்தால், நிர்வாகக் கூட்டாளர் கடன்களை அடைக்க தனிப்பட்ட சொத்துக்களைப் பயன்படுத்த வேண்டியிருக்கும்). மற்ற கூட்டாளர்களின் பொறுப்பு அவர்கள் முதலீடு செய்த பணத்திற்கு மட்டுமே வரையறுக்கப்பட்டுள்ளது.\n• <b>நம்பகத்தன்மை:</b> மிதமானது. சிறு வணிகங்கள், குடும்ப வணிகங்கள் அல்லது கூட்டாளர்கள் சட்டபூர்வ நபர் வடிவமைப்பைப் பற்றி மிகவும் கடுமையாக இல்லாத நிறுவனங்களுக்கு ஏற்றது.\n• <b>வெளிநாட்டவர்கள் ஏற்பட்டால்:</b> பரிந்துரைக்கப்படவில்லை. ஒரு வரையறுக்கப்பட்ட கூட்டாண்மையில் வெளிநாட்டவர்களைக் கொண்டிருப்பது மிகவும் சிக்கலான சட்டக் கட்டுப்பாடுகளை உள்ளடக்கியது. ஒரு வெளிநாட்டவர் நிர்வாகக் கூட்டாளராக மாறினால், அது ஒரு வெளிநாட்டு சட்டபூர்வ நிறுவனமாகப் புரிந்துகொள்ளப்படலாம், இதனால் வணிக செயல்பாடுகள் மற்றும் பணி அனுமதி கோரிக்கைகள் கம்பெனி லிமிடெட்டை விட மிகவும் கடினமாக்கப்படும்.\n• <b>தேவையான நிறுவனர்களின் எண்ணிக்கை:</b> நிறுவனப் பதிவைப் போலவே 2 நிறுவனர்கள் மட்டுமே தேவை.\n\n<b>சுருக்கம்: நீங்கள் எதை தேர்வு செய்ய வேண்டும்?</b>\n• நீங்கள் அதிக நம்பகத்தன்மையைத் தேடுகிறீர்களானால், எதிர்காலத்தில் வணிகம் அல்லது கிளைகளை விரிவுபடுத்தத் திட்டமிட்டிருந்தால், தனிப்பட்ட சொத்துக்களைப் பாதிக்கும் அபாயங்களைக் கட்டுப்படுத்த விரும்பினால், வெளிநாட்டுப் பங்குதாரர்களைக் கொண்டிருந்தால் அல்லது வெளிநாட்டு ஊழியர்களைப் பணியமர்த்தத் திட்டமிட்டிருந்தால் (பணி அனுமதி கோரிக்கைகள்), <b>\"கம்பெனி லிமிடெட்\"</b> என்பதைத் தேர்ந்தெடுக்கவும்.\n• இது குடும்ப வணிகமாகவோ அல்லது நீங்கள் 100% நம்பும் நெருங்கிய நபர்களாகவோ இருந்தால், வணிகத்தில் அதிக கடன் அபாயங்கள் இல்லை என்றால், வெளிநாட்டுக் கூட்டாளர்கள் இல்லை என்றால், மற்றும் எளிமையான நிர்வாக அமைப்பை நீங்கள் வலியுறுத்தினால் <b>\"லிமிடெட் பார்ட்னர்ஷிப்\"</b> என்பதைத் தேர்ந்தெடுக்கவும்.\n\n<i><b>குறிப்பு:</b> தற்போது, Co., Ltd. மற்றும் Ltd. Part. ஆகியவற்றுக்கான பதிவு, மாதாந்திர கணக்கியல் மற்றும் வருடாந்திர நிதி முடிப்பு செலவுகள் மிகவும் வேறுபட்டவை அல்ல. \"கம்பெனி லிமிடெட்\" ஆகப் பதிவு செய்வது பொதுவாக நீண்ட காலத்திற்கு அதிகபட்ச நன்மைகளைத் தருகிறது.</i>"
                },
                {
                    "question": "ஒரு வரையறுக்கப்பட்ட கூட்டாண்மையைப் பதிவு செய்வது வருடாந்திர கணக்கியல் தணிக்கைகளில் (CPA / TA) செலவுகளைச் சேமிக்கிறதா?",
                    "answer": "<b>உண்மை.</b> ஒரு வரையறுக்கப்பட்ட கூட்டாண்மையைப் பதிவு செய்வதன் மிக முக்கியமான நன்மைகளில் இதுவும் ஒன்றாகும்.\n\nசட்டத்தின்படி, உங்கள் வரையறுக்கப்பட்ட கூட்டாண்மை ஒரு சிறு வணிகத்தின் (Small SME) அளவுகோல்களை பூர்த்தி செய்தால், அதாவது <b>5 மில்லியன் THB க்கு மிகாமல் பதிவு செய்யப்பட்ட மூலதனம், 30 மில்லியன் THB க்கு மிகாமல் மொத்த வருவாய் மற்றும் 30 மில்லியன் THB க்கு மிகாமல் மொத்த சொத்துக்களைக் கொண்டிருத்தல்</b>, வருடாந்திர நிதி அறிக்கைகளை தணிக்கை செய்து கையொப்பமிட <b>வரி தணிக்கையாளர் (TA - Tax Auditor)</b> ஐப் பயன்படுத்த உங்களுக்கு உரிமை உண்டு.\n\nவழக்கமாக, அனைத்து வணிக அளவிலான \"கம்பெனி லிமிடெட்\" க்கும் சட்டம் கட்டாயமாக்கும் சான்றளிக்கப்பட்ட பொது கணக்காளர் (CPA) ஐப் பயன்படுத்துவதை விட TA இன் சேவை கட்டணம் மிகவும் சிக்கனமானவை மற்றும் அணுகக்கூடியவை. இதன் விளைவாக வரையறுக்கப்பட்ட கூட்டாண்மை குறைந்த வருடாந்திர மேலாண்மை செலவுகளைக் கொண்டுள்ளது."
                },
                {
                    "question": "வரையறுக்கப்பட்ட கூட்டாண்மையின் பதிவு செய்யப்பட்ட மூலதனம் (மூலதன பங்களிப்பு) என்றால் என்ன? என்னிடம் முழுத் தொகையும் இல்லையென்றால் நான் பதிவு செய்ய முடியுமா?",
                    "answer": "ஒரு வரையறுக்கப்பட்ட கூட்டாண்மையில், நாங்கள் பதிவு செய்யப்பட்ட மூலதனத்தை <b>\"மூலதனப் பங்களிப்பு (Capital Contribution)\"</b> என்று குறிப்பிடுகிறோம், இது பணம், சொத்துக்கள் அல்லது தொழிலாளர் என முதலீடு செய்யப்படலாம். <i>\"மூலதனப் பங்களிப்பைச் செலுத்துதல்\"</i> என்பது யாருக்கும் பணம் செலுத்துவதைக் குறிக்காது, மாறாக வணிகத்திற்கான நடைமுறை மூலதனமாகப் பயன்படுத்த வரையறுக்கப்பட்ட கூட்டாண்மையின் பெயரில் வங்கிக் கணக்கில் மூலதனத்தை டெபாசிட் செய்வதைக் குறிக்கிறது (வரையறுக்கப்பட்ட கூட்டாண்மை பதிவு முடிந்ததும் கணக்கைத் திறக்கலாம்).\n\n• <b>உங்களிடம் முழுத் தொகையும் மொத்தமாக இல்லை என்றால்:</b> வரையறுக்கப்பட்ட கூட்டாண்மையின் கணக்கு திறக்கப்பட்டதும் நீங்கள் படிப்படியாக பணத்தை கணக்கில் டெபாசிட் செய்யலாம் (சட்டம் உடனடியாக 100% முழுமையாகச் செலுத்த உங்களை கட்டாயப்படுத்தாது). வரையறுக்கப்பட்ட கூட்டாண்மையின் கணக்கை 1,000 THB உடன் திறப்பதன் மூலம் நீங்கள் தொடங்கலாம். வணிகம் தொடர்பான செலவுகள் இருந்தால், நீங்கள் கணக்கில் பணத்தை டெபாசிட் செய்து பின்னர் அதைச் செலுத்தலாம். இந்த மொத்த தொகை கணக்கில் சும்மா இருக்க வேண்டியதில்லை.\n• <b>முன்னெச்சரிக்கைகள்:</b> வரையறுக்கப்பட்ட கூட்டாண்மை <b>5 மில்லியன் THB க்கும் அதிகமான</b> மொத்த முதலீட்டைக் கொண்டிருப்பதைத் தவிர, உண்மையான பணம் இருக்க வேண்டும் என்று சட்டம் கோருகிறது, மேலும் பதிவுச் செயல்பாட்டின் போது அனைத்து கூட்டாளர்களின் வங்கிக் சான்றிதழ் (Bank Certificate) காட்டப்பட வேண்டும்."
                },
                {
                    "question": "வெளிநாட்டவர்கள் ஒரு வரையறுக்கப்பட்ட கூட்டாண்மையில் கூட்டாளர்களாக ஆக முடியுமா?",
                    "answer": "சட்டப்பூர்வமாக இதைச் செய்யலாம், <b>ஆனால் நடைமுறையிலும் மேலாண்மை ரீதியாகவும் இதை நாங்கள் கடுமையாகப் பரிந்துரைக்கவில்லை.</b>\n\nஒரு வரையறுக்கப்பட்ட கூட்டாண்மையில் வெளிநாட்டவரைப் கூட்டாளராகக் கொண்டிருப்பது மிகவும் சிக்கலான சட்டக் கட்டுப்பாடுகளை உள்ளடக்கியது. குறிப்பாக ஒரு வெளிநாட்டவர் \"நிர்வாகப் கூட்டாளர்\" ஆக மாறினால், வரையறுக்கப்பட்ட கூட்டாண்மை ஒரு <b>\"வெளிநாட்டு சட்டபூர்வ நிறுவனம்\"</b> ஆகப் புரிந்துகொள்ளப்படலாம், இது பின்வருவனவற்றுக்கு வழிவகுக்கும்:\n1. தாய்லாந்தில் பல வகையான வணிகங்களைச் செயல்படுத்துவதில் இருந்து கட்டுப்படுத்தப்படுதல் (வெளிநாட்டு வணிகச் சட்டத்தின்படி).\n2. வெளிநாட்டவர்களுக்கான பணி அனுமதி (Work Permit) மற்றும் வணிக விசா கோருவது சிக்கலானதாக இருக்கலாம் மற்றும் கம்பெனி லிமிடெட்டை விட நிராகரிக்கப்படுவதற்கான அதிக வாய்ப்பு உள்ளது.\n<i>(வெளிநாட்டு இணை முதலீடு இருந்தால், \"கம்பெனி லிமிடெட்\" ஆகப் பதிவு செய்யத் தேர்வுசெய்யுமாறு நாங்கள் பரிந்துரைக்கிறோம், இது சுமுகமாக இருக்கும் மற்றும் நீண்ட காலத்திற்கு அதிகபட்ச நன்மைகளை வழங்கும்.)</i>"
                },
                {
                    "question": "என்னிடம் இன்னும் அலுவலகம் இல்லை என்றால் அல்லது வாடகை வீடு/காண்டோவை இருப்பிடமாகப் பயன்படுத்தினால், நான் பதிவு செய்ய முடியுமா?",
                    "answer": "<b>பதிவு செய்யலாம்</b> பின்வரும் நிபந்தனைகளின் கீழ்:\n• <b>வாடகை வீடு/வாடகை இடம் விஷயத்தில்:</b> உங்களிடம் <i>\"வளாகத்தைப் பயன்படுத்துவதற்கான சம்மதக் கடிதம்\"</i> மற்றும் \"வீட்டு எஜமானர் அல்லது சொத்து உரிமையாளரின்\" அடையாள அட்டை மற்றும் வீட்டுப் பதிவின் சான்றளிக்கப்பட்ட நகல்கள் இருக்க வேண்டும்.\n• <b>காண்டோமினியம் விஷயத்தில்:</b> சட்டம் இதை அனுமதித்தாலும், நீங்கள் முதலில் காண்டோவின் நிர்வாகத்திடம் (Juristic person) சரிபார்க்க வேண்டும், ஏனெனில் பல திட்டங்களில் குடியிருப்பு அறைகளை அலுவலகங்களாகப் பதிவு செய்ய அனுமதிக்காத உள் விதிமுறைகள் உள்ளன.\n<i>(உங்கள் சொந்த இடத்தைப் பயன்படுத்துவது உங்களுக்கு வசதியாக இல்லை என்றால், இந்தச் சிக்கலைத் தீர்க்க எங்களிடம் <b>விர்ச்சுவல் ஆஃபீஸ் (Virtual Office)</b> சேவை உள்ளது.)</i>"
                },
                {
                    "question": "வரையறுக்கப்பட்ட கூட்டாண்மை பதிவு செய்யப்பட்டவுடன், நான் உடனடியாக மதிப்பு கூட்டப்பட்ட வரிக்கு (VAT 7%) பதிவு செய்ய வேண்டுமா?",
                    "answer": "கட்டாயமில்லை. வரையறுக்கப்பட்ட கூட்டாண்மையைப் பதிவு செய்வதற்கும் மதிப்பு கூட்டப்பட்ட வரிக்கு (VAT) பதிவு செய்வதற்கும் இரண்டு வெவ்வேறு விஷயங்கள். வணிக வருமானம் <b>ஆண்டுக்கு 1.8 மில்லியன் THB க்கு மேல்</b> இருக்கும் போது மட்டுமே ஒரு வரையறுக்கப்பட்ட கூட்டாண்மை VAT க்கு பதிவு செய்ய நிர்பந்திக்கப்படுகிறது.\n\nஇருப்பினும், வரையறுக்கப்பட்ட கூட்டாண்மை பொருட்களை இறக்குமதி-ஏற்றுமதி செய்ய வேண்டியிருந்தால், அல்லது வரி இன்வாய்ஸ்கள் வழங்கப்பட வேண்டிய B2B கூட்டாளர்களுடன் ஒப்பந்தம் செய்ய வேண்டியிருந்தால், வணிகத்தின் தொடக்கத்திலிருந்தே கூட்டாளர்களுக்கு வரி இன்வாய்ஸ்களை வழங்க <b>மதிப்பு கூட்டப்பட்ட வரி (VAT) பதிவுக்கு விண்ணப்பிக்க வேண்டும்</b>."
                },
                {
                    "question": "வரையறுக்கப்பட்ட கூட்டாண்மை பதிவு செய்யப்பட்ட பிறகு, ஆனால் விற்பனையைத் தொடங்கவில்லை அல்லது இன்னும் வருமானத்தை உருவாக்கவில்லை என்றால், நான் கணக்கியல் (Accounting) செய்ய வேண்டுமா?",
                    "answer": "<b>செய்ய வேண்டும்.</b> சட்டத்தின்படி (கணக்கியல் சட்டம் B.E. 2543), அனைத்து வகையான சட்டப்பூர்வ நிறுவனங்களும் கணக்குகளைத் தயாரித்து, வணிக மேம்பாட்டுத் துறை மற்றும் வருவாய்த் துறைக்கு நிதி அறிக்கைகளைச் சமர்ப்பிக்க வேண்டும் <b>\"அந்த ஆண்டில் வருமானம் இல்லை என்றாலும், செலவுகள் இல்லை என்றாலும், அல்லது வணிகம் இன்னும் செயல்படத் தொடங்கவில்லை என்றாலும் (பூஜ்ஜிய அறிவிப்பு - Zero Declaration)\"</b>. சரியான நேரத்தில் சமர்ப்பிக்கத் தவறினால் ஒப்பீட்டளவில் அதிக சட்ட அபராதங்கள் விதிக்கப்படும்."
                },
                {
                    "question": "சமூகப் பாதுகாப்பிற்குச் (Social Security) சமர்ப்பிக்க நிர்வாகப் கூட்டாளர் தனது சொந்த சம்பளத்தைக் கழிக்க வேண்டுமா?",
                    "answer": "<b>அவசியமில்லை.</b> நீங்கள் நிர்வாகக் கூட்டாளர் மற்றும் வணிக உரிமையாளராக இருப்பதால், நீங்கள் ஒரு <b>\"முதலாளியின்\"</b> நிலையில் இருக்கிறீர்கள், ஊழியர் அல்ல. எனவே, உங்களின் சொந்த வரையறுக்கப்பட்ட கூட்டாண்மையில் காப்பீடு செய்யப்பட்ட நபராக (பிரிவு 33) நீங்கள் பதிவு செய்ய முடியாது மற்றும் பதிவு செய்ய வேண்டியதில்லை.\n\nஇருப்பினும், வரையறுக்கப்பட்ட கூட்டாண்மை <b>\"முழுநேர ஊழியர்களை\"</b> பணியமர்த்தத் தொடங்கும் போது, நிறுவனம் ஒரு முதலாளியாகப் பதிவு செய்து, பணியமர்த்தப்பட்ட தேதியிலிருந்து 30 நாட்களுக்குள் ஊழியர்களுக்கான சமூகப் பாதுகாப்பைச் சமர்ப்பிக்க வேண்டும் என்று சட்டம் கோருகிறது."
                }
            ]
        }
    }

};

function processLanguage(lang) {
    const filePath = path.join(MESSAGES_DIR, `${lang}.json`);
    if (!fs.existsSync(filePath)) {
        console.error(`File not found: ${filePath}`);
        return;
    }

    try {
        const fileContent = fs.readFileSync(filePath, 'utf8');
        const data = JSON.parse(fileContent);

        if (data.services && data.services.items && data.services.items['limited-partnership']) {
            // Preserve existing title and summary
            const existingTitle = data.services.items['limited-partnership'].title;
            const existingSummary = data.services.items['limited-partnership'].summary;

            // Select content based on language
            const newContent = lang === 'th' ? THAI_CONTENT : (EMPTY_CONTENT[lang] || {});

            // Update the object
            data.services.items['limited-partnership'] = {
                title: existingTitle,
                summary: existingSummary,
                ...newContent
            };

            // Write back to file with proper formatting (2 spaces for indentation)
            fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
            console.log(`✅ Successfully updated limited-partnership content for ${lang}.json`);
        } else {
            console.warn(`⚠️ Warning: services.items['limited-partnership'] not found in ${lang}.json`);
        }
    } catch (error) {
        console.error(`❌ Error processing ${lang}.json:`, error.message);
    }
}

console.log('🚀 Starting limited-partnership translation updates...');
LANGUAGES.forEach(processLanguage);
console.log('✨ All updates completed!');
