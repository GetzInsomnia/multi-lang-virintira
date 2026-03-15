/**
 * Translate promotion items for CJK languages (zh-Hans, zh-Hant, ja, ko).
 * Each language has complete translations preserving all original content.
 * 
 * Run: node translate-promotions-items-cjk.js
 */
const fs = require('fs');
const path = require('path');
const MESSAGES_DIR = path.join(__dirname, 'src', 'messages');

// Common structure: shortInfo for company-registration is the same across CJK
const ITEMS = {
  'zh-Hans': {
    "company-registration-deal": {
      slug: "company-registration-deal", category: "注册", categoryId: "registration",
      title: "有限公司注册", imagePlaceholder: "4:3",
      shortInfo: ["已含政府规费——无额外收费","无需绑定月度记账合同","在线身份验证——无需出行","免费！咨询及全套文件准备","免费！公司证书全套（DBD）","免费！公司自动盖章一枚","免费！企业开户所需文件","免费！DBD 电子申报密码注册","免费！税务局密码注册","免费！用于开具收据/增值税发票的名片","免费！税务技巧培训课程（价值 5,900 泰铢）"],
      price: "起价 9,900 泰铢", originalPrice: "起价 12,900",
      pricingTiers: [
        {name:"全部泰籍股东",price:"9,900",originalPrice:"12,900"},
        {name:"外籍股东持股不超过 49%",price:"12,900",originalPrice:"15,900"},
        {name:"外籍股东 100% 持股",price:"15,900",originalPrice:"18,900"},
        {name:"法人股东",price:"19,900",originalPrice:"22,900"}
      ],
      benefits: [
        "<b>一价全包！已含政府规费</b> 最透明、最超值的报价——本促销价已包含向商业发展厅缴纳的公司注册费用（注册资本不超过 500 万泰铢），绝无任何额外收费。",
        "<b>选择自由——无强制记账合同</b> 我们对服务品质充满信心，因此绝不要求客户签署长期月度记账或年度财务结算合同以换取此优惠。",
        "<b>极致便捷的在线身份验证（e-KYC）</b> 无需出行签署纸质文件。可通过 ThaID 应用（泰籍人士）、DBD e-Service 应用（外籍人士）或 DBD 系统发送至各股东个人邮箱的验证链接完成身份验证。",
        "<b>免费！专业咨询和全套文件准备</b> 从注册前的规划到完成，我们提供系统化指导，帮助您全面了解流程。从准备到完成政府表格——一站式全程服务。",
        "<b>免费！全套创业启动礼包</b>\n• 公司证书全套（DBD）——即可使用\n• 自动盖章一枚（免费设计）\n• 企业银行开户所需文件\n• DBD 电子申报密码注册\n• 税务局密码注册\n• 用于开具收据/增值税发票的名片\n• 报价单、发票等模板",
        "<b>独家！税务技巧培训课程（价值 5,900 泰铢）</b> 构建每位企业主都应掌握的税务和会计基础知识，让您安全经营并最大限度节税。"
      ],
      conditions: "• 本服务费率已包含注册资本不超过 500 万泰铢的公司注册政府规费。\n• 注册资本超过 500 万泰铢的，按每百万 3,000 泰铢加收政府规费和服务费。\n• 所有流程均通过商业发展厅 DBD Biz Regist 系统进行电子注册。\n• 董事和所有股东无需出行签署纸质文件，需通过以下任一渠道进行在线身份验证：\n  1. ThaID 应用（泰籍人士）\n  2. DBD e-Service 应用（外籍人士）\n  3. 通过 DBD 系统发送至各股东个人邮箱的验证链接"
    },
    "partnership-registration-deal": {
      slug: "partnership-registration-deal", category: "注册", categoryId: "registration",
      title: "有限合伙企业注册", imagePlaceholder: "4:3",
      shortInfo: ["已含政府规费——无额外收费","无需绑定月度记账合同","在线身份验证——无需出行","免费！咨询及全套文件准备","免费！合伙企业证书全套（DBD）","免费！合伙企业自动盖章一枚","免费！企业开户所需文件","免费！DBD 电子申报密码注册","免费！税务局密码注册","免费！用于开具收据/增值税发票的名片","免费！税务技巧培训课程（价值 5,900 泰铢）"],
      price: "起价 5,900 泰铢", originalPrice: "起价 8,900",
      pricingTiers: [
        {name:"全部泰籍合伙人",price:"5,900",originalPrice:"8,900"},
        {name:"外籍合伙人出资不超过 49%",price:"8,900",originalPrice:"11,900"}
      ],
      benefits: [
        "<b>一价全包！已含政府规费</b> 最透明、最超值——本促销价已包含有限合伙企业在商业发展厅的注册费用（注册资本不超过 500 万泰铢），绝无额外收费。",
        "<b>选择自由——无强制记账合同</b> 我们对服务品质充满信心，绝不要求客户签署长期月度记账或年度结算合同以换取此优惠。",
        "<b>极致便捷的在线身份验证（e-KYC）</b> 无需出行签署纸质文件。可通过 ThaID 应用（泰籍人士）、DBD e-Service 应用（外籍人士）或验证链接完成身份验证。",
        "<b>免费！专业咨询和全套文件准备</b> 从规划到完成，系统化指导，全程一站式服务。",
        "<b>免费！全套创业启动礼包</b>\n• 合伙企业证书全套（DBD）——即可使用\n• 自动盖章一枚（免费设计）\n• 企业银行开户所需文件\n• DBD 电子申报密码注册\n• 税务局密码注册\n• 用于开具收据/增值税发票的名片\n• 报价单、发票等模板",
        "<b>独家！税务技巧培训课程（价值 5,900 泰铢）</b> 构建税务和会计基础知识，让您安全经营并最大限度节税。"
      ],
      conditions: "• 本服务费率已包含注册资本不超过 500 万泰铢的有限合伙企业注册政府规费。\n• 注册资本超过 500 万泰铢的，按每百万 3,000 泰铢加收。\n• 所有流程通过 DBD Biz Regist 电子注册系统进行。\n• 执行合伙人和所有合伙人无需出行，需通过以下渠道之一进行在线身份验证：\n  1. ThaID 应用（泰籍人士）\n  2. DBD e-Service 应用（外籍人士）\n  3. DBD 系统发送至各合伙人个人邮箱的验证链接"
    },
    "commercial-shop-registration-deal": {
      slug: "commercial-shop-registration-deal", category: "注册", categoryId: "registration",
      title: "商业店铺注册", imagePlaceholder: "4:3",
      shortInfo: ["已含政府规费——无额外收费","涵盖网店和实体店注册","无忧——我们代您办理所有政府手续","快速获取商业登记证（PorKor.0403）","提升网店可信度——客户 100% 放心","文件可立即用于贷款、商户开户或业务拓展"],
      price: "起价 3,500 泰铢", originalPrice: "起价 5,500", pricingTiers: [],
      benefits: [
        "<b>超值——一价全包！已含政府规费</b> 我们以一口价保证透明度，已包含所有政府注册费用，无隐藏费用。",
        "<b>涵盖网店和实体店</b> 无论您的业务是线上销售还是传统实体店，我们都能按各类型要求正确办理。",
        "<b>无忧体验</b> 我们全程代理，免除您准备复杂表格和出行至政府机构的负担。",
        "<b>快速获取商业登记证（PorKor.0403）</b> 凭借我们的专业经验，最大限度减少文件错误，帮助您迅速获得登记证。",
        "<b>提升可信度——客户 100% 放心</b> 商业登记证和认证标志证明您的店铺真实存在且可查验，增强客户购买信心。",
        "<b>拓展业务——立即开设商户账户或申请贷款</b> 商业登记证是开设企业银行账户、申请支付网关或提交商业贷款申请的重要文件。\n\n（建议：如计划用于贷款申请，建议提前向银行了解条件，部分银行可能要求登记证至少满 6 个月或 1 年。）"
      ],
      conditions: "以上服务费率为曼谷地区标准费率。办公地址在曼谷以外的，可能根据实际距离收取额外的服务费和交通费。我们将在您决定使用服务前提供价格评估。"
    },
    "monthly-bookkeeping-and-tax-bundle": {
      slug: "monthly-bookkeeping-and-tax-bundle", category: "会计与审计", categoryId: "accounting",
      title: "月度企业记账与税务套餐", imagePlaceholder: "4:3",
      shortInfo: ["完整准确的标准化记账","按时申报 PND.1、3、53 和 PP.30 税表","月度财务报表汇总"],
      price: "起价 1,500 泰铢/月", originalPrice: "起价 2,500/月",
      pricingTiers: [
        {name:"S 号\n（每月不超过 50 份文件）",price:"2,500",originalPrice:"3,500"},
        {name:"M 号\n（每月不超过 70 份文件）",price:"3,000",originalPrice:"4,000"},
        {name:"L 号\n（每月不超过 100 份文件）",price:"3,500",originalPrice:"4,500"},
        {name:"XL 号\n（每月超过 100 份文件）",price:"联系报价"},
        {name:"空白报表提交\n（每类报表）",price:"500",originalPrice:"700"}
      ],
      benefits: ["使用符合标准的软件进行收入和支出记账","编制和申报预扣税和增值税报表","社会保险缴费提交","合同期内免费会计和税务咨询"],
      conditions: "定价取决于文件数量、业务类型、复杂程度和每月会计活动水平。"
    },
    "individual-tax-clearing": {
      slug: "individual-tax-clearing", category: "会计与审计", categoryId: "accounting",
      title: "个人所得税清算", imagePlaceholder: "4:3",
      shortInfo: ["最大化减免，精确计税","清理欠税问题——代理向税务局说明","按时处理所有申报（PND.90/91/94）","代您管理复杂的收入/支出文件","规划减免以最大限度为您省钱","深度咨询是否应成立法人"],
      price: "起价 2,500 泰铢", originalPrice: "起价 4,500", pricingTiers: [],
      benefits: [
        "<b>最大化税务减免规划</b>\n我们不只是填写数字，团队会详细分析您的收入和支出，充分利用每项可用的税务优惠和减免，帮助您合法节税。",
        "<b>复杂文件管理一手包办</b>\n不再为整理收入/支出文件（如预扣税证明）而头疼，我们代您整理和分类，防止将来可能触发审计的错误。",
        "<b>专业的欠税处理</b>\n如果您有未申报税款、少报收入或欠税问题，我们随时准备审查、制定策略并找到最佳解决方案以最小化罚款和附加费。",
        "<b>代理向税务局说明</b>\n如果税务人员要求提供文件或召见，您无需独自面对。我们的团队将作为您的代表，专业地回答问题和谈判。",
        "<b>完整的申报管理——始终按时</b>\n我们通过税务局的 e-Filing 系统处理所有个人所得税申报（PND.90/91/94），确保 100% 按时完成。",
        "<b>助力成长的深度咨询</b>\n逐案评估您的收入状况，判断从个人转为成立法人（有限公司/有限合伙企业）是否\"划算\"，实现更有效的长期税务规划。"
      ],
      conditions: "个人所得税清算费用取决于业务类型复杂程度和文件数量，不包含代理客户前往税务局说明的差旅费。"
    },
    "close-financial-deal": {
      slug: "close-financial-deal", category: "会计与审计", categoryId: "accounting",
      title: "年度财务报表结算", imagePlaceholder: "4:3",
      shortInfo: ["由注册会计师（CPA）审计财务报表","100% 合法合规——保证","编制 PND.50 并提交电子申报"],
      price: "起价 9,900 泰铢", originalPrice: "起价 12,900", pricingTiers: [],
      benefits: ["年度财务报表审计和认证","编制企业所得税申报表（PND.50）","通过 DBD e-Filing 提交财务报表","编制 SBCh.3 和股东名册（BorOrJor.5）"],
      conditions: "审计服务费取决于业务的复杂程度和规模。"
    }
  }
};

// zh-Hant: Traditional Chinese version
ITEMS['zh-Hant'] = JSON.parse(JSON.stringify(ITEMS['zh-Hans']));
// Override with Traditional Chinese characters
const zhT = ITEMS['zh-Hant'];
zhT['company-registration-deal'].title = "有限公司註冊";
zhT['company-registration-deal'].shortInfo = ["已含政府規費——無額外收費","無需綁定月度記帳合約","線上身份驗證——無需出行","免費！諮詢及全套文件準備","免費！公司證書全套（DBD）","免費！公司自動蓋章一枚","免費！企業開戶所需文件","免費！DBD 電子申報密碼註冊","免費！稅務局密碼註冊","免費！用於開具收據/增值稅發票的名片","免費！稅務技巧培訓課程（價值 5,900 泰銖）"];
zhT['company-registration-deal'].price = "起價 9,900 泰銖";
zhT['company-registration-deal'].originalPrice = "起價 12,900";
zhT['company-registration-deal'].pricingTiers = [
  {name:"全部泰籍股東",price:"9,900",originalPrice:"12,900"},
  {name:"外籍股東持股不超過 49%",price:"12,900",originalPrice:"15,900"},
  {name:"外籍股東 100% 持股",price:"15,900",originalPrice:"18,900"},
  {name:"法人股東",price:"19,900",originalPrice:"22,900"}
];
zhT['company-registration-deal'].benefits = zhT['company-registration-deal'].benefits.map(b => b.replace(/注册/g, '註冊').replace(/规费/g, '規費').replace(/记账/g, '記帳').replace(/验证/g, '驗證').replace(/无/g, '無').replace(/经营/g, '經營').replace(/节税/g, '節稅').replace(/准备/g, '準備').replace(/开户/g, '開戶').replace(/发票/g, '發票').replace(/报价/g, '報價'));
zhT['company-registration-deal'].conditions = zhT['company-registration-deal'].conditions.replace(/注册/g, '註冊').replace(/规费/g, '規費').replace(/验证/g, '驗證');

zhT['partnership-registration-deal'].title = "有限合夥企業註冊";
zhT['partnership-registration-deal'].shortInfo = zhT['partnership-registration-deal'].shortInfo.map(s => s.replace(/注册/g, '註冊').replace(/记账/g, '記帳').replace(/验证/g, '驗證'));
zhT['partnership-registration-deal'].price = "起價 5,900 泰銖";
zhT['partnership-registration-deal'].originalPrice = "起價 8,900";
zhT['partnership-registration-deal'].pricingTiers = [
  {name:"全部泰籍合夥人",price:"5,900",originalPrice:"8,900"},
  {name:"外籍合夥人出資不超過 49%",price:"8,900",originalPrice:"11,900"}
];
zhT['partnership-registration-deal'].benefits = zhT['partnership-registration-deal'].benefits.map(b => b.replace(/注册/g, '註冊').replace(/规费/g, '規費').replace(/记账/g, '記帳').replace(/验证/g, '驗證').replace(/无/g, '無').replace(/经营/g, '經營').replace(/节税/g, '節稅'));
zhT['partnership-registration-deal'].conditions = zhT['partnership-registration-deal'].conditions.replace(/注册/g, '註冊').replace(/规费/g, '規費').replace(/验证/g, '驗證');

zhT['commercial-shop-registration-deal'].title = "商業店舖註冊";
zhT['commercial-shop-registration-deal'].shortInfo = zhT['commercial-shop-registration-deal'].shortInfo.map(s => s.replace(/注册/g, '註冊').replace(/无/g, '無'));
zhT['commercial-shop-registration-deal'].price = "起價 3,500 泰銖";
zhT['commercial-shop-registration-deal'].originalPrice = "起價 5,500";
zhT['commercial-shop-registration-deal'].benefits = zhT['commercial-shop-registration-deal'].benefits.map(b => b.replace(/注册/g, '註冊').replace(/规费/g, '規費').replace(/无/g, '無').replace(/开设/g, '開設'));
zhT['commercial-shop-registration-deal'].conditions = zhT['commercial-shop-registration-deal'].conditions.replace(/费率/g, '費率');

zhT['monthly-bookkeeping-and-tax-bundle'].title = "月度企業記帳與稅務套餐";
zhT['monthly-bookkeeping-and-tax-bundle'].shortInfo = ["完整準確的標準化記帳","按時申報 PND.1、3、53 和 PP.30 稅表","月度財務報表匯總"];
zhT['monthly-bookkeeping-and-tax-bundle'].price = "起價 1,500 泰銖/月";
zhT['monthly-bookkeeping-and-tax-bundle'].originalPrice = "起價 2,500/月";

zhT['individual-tax-clearing'].title = "個人所得稅清算";
zhT['individual-tax-clearing'].price = "起價 2,500 泰銖";
zhT['individual-tax-clearing'].originalPrice = "起價 4,500";

zhT['close-financial-deal'].title = "年度財務報表結算";
zhT['close-financial-deal'].price = "起價 9,900 泰銖";
zhT['close-financial-deal'].originalPrice = "起價 12,900";

// Japanese
ITEMS['ja'] = {
  "company-registration-deal": {
    slug: "company-registration-deal", category: "登記", categoryId: "registration",
    title: "有限会社（株式会社）登記", imagePlaceholder: "4:3",
    shortInfo: ["政府手数料込み——追加費用なし","月次記帳契約の義務なし","オンライン本人確認——移動不要","無料！相談＆書類一式準備","無料！会社証明書フルセット（DBD）","無料！自動インク式会社印 1本","無料！法人口座開設用書類","無料！DBD電子申告パスワード登録","無料！歳入局パスワード登録","無料！領収書/税務請求書用名刺","無料！税務テクニック研修（5,900バーツ相当）"],
    price: "9,900バーツから", originalPrice: "12,900から",
    pricingTiers: [{name:"タイ国籍株主のみ",price:"9,900",originalPrice:"12,900"},{name:"外国人株主49%以下",price:"12,900",originalPrice:"15,900"},{name:"外国人100%出資",price:"15,900",originalPrice:"18,900"},{name:"法人株主あり",price:"19,900",originalPrice:"22,900"}],
    benefits: ["<b>一括価格！政府手数料込み</b> 最も透明でお得なプラン——登録資本金500万バーツ以下の会社設立登記手数料が含まれています。追加費用は一切ありません。","<b>自由な選択——記帳契約の義務なし</b> サービス品質に自信があるため、本プロモーションと引き換えに長期記帳契約を強制することは一切ありません。","<b>オンライン本人確認（e-KYC）で究極の利便性</b> 紙書類への署名のための移動は不要。ThaIDアプリ（タイ国籍者）、DBD e-Serviceアプリ（外国人）、またはDBDシステムから各株主のメールに送信される認証リンクで本人確認可能。","<b>無料！専門相談＆書類一式準備</b> 登記前の計画から完了まで、体系的なガイダンスを提供。政府書類の作成から完了まで——ワンストップサービス。","<b>無料！ビジネススターターキット一式</b>\n• 会社証明書フルセット（DBD）——すぐに使用可能\n• 自動インク式会社印1本（デザイン無料）\n• 法人口座開設用書類一式\n• DBD電子申告パスワード登録\n• 歳入局パスワード登録\n• 領収書/税務請求書用名刺\n• 見積書、請求書テンプレート等","<b>特別！税務テクニック研修（5,900バーツ相当）</b> 事業主が知るべき税務・会計の基礎知識を構築し、安全な経営と最大限の節税を実現。"],
    conditions: "• 本料金は登録資本金500万バーツ以下の会社登記の政府手数料を含みます。\n• 500万バーツを超える場合、100万バーツごとに3,000バーツの追加手数料が発生します。\n• 全手続きはDBD Biz Registシステムによる電子登記で行われます。\n• 取締役および全株主は紙書類への署名のための移動は不要。以下のいずれかでオンライン本人確認が必要：\n  1. ThaIDアプリ（タイ国籍者）\n  2. DBD e-Serviceアプリ（外国人）\n  3. DBDシステムから各株主のメールに送信される認証リンク"
  },
  "partnership-registration-deal": {
    slug: "partnership-registration-deal", category: "登記", categoryId: "registration",
    title: "合資会社（有限責任組合）登記", imagePlaceholder: "4:3",
    shortInfo: ["政府手数料込み——追加費用なし","月次記帳契約の義務なし","オンライン本人確認——移動不要","無料！相談＆書類一式準備","無料！合資会社証明書フルセット（DBD）","無料！自動インク式会社印1本","無料！法人口座開設用書類","無料！DBD電子申告パスワード登録","無料！歳入局パスワード登録","無料！領収書/税務請求書用名刺","無料！税務テクニック研修（5,900バーツ相当）"],
    price: "5,900バーツから", originalPrice: "8,900から",
    pricingTiers: [{name:"全員タイ国籍パートナー",price:"5,900",originalPrice:"8,900"},{name:"外国人パートナー出資49%以下",price:"8,900",originalPrice:"11,900"}],
    benefits: ["<b>一括価格！政府手数料込み</b> 合資会社登記手数料込み（500万バーツ以下）。追加費用なし。","<b>自由な選択——記帳契約の義務なし</b> 長期契約の強制は一切ありません。","<b>オンライン本人確認（e-KYC）</b> ThaIDアプリ、DBD e-Serviceアプリ、またはメール認証リンクで本人確認可能。","<b>無料！専門相談＆書類一式</b> 計画から完了まで、ワンストップサービス。","<b>無料！スターターキット一式</b>\n• 合資会社証明書フルセット（DBD）\n• 自動インク式印1本（デザイン無料）\n• 口座開設用書類\n• DBD・歳入局パスワード登録\n• 名刺・テンプレート等","<b>特別！税務テクニック研修（5,900バーツ相当）</b> 税務・会計基礎知識で安全経営と最大節税を実現。"],
    conditions: "• 登録資本金500万バーツ以下の合資会社登記手数料込み。\n• 超過分は100万バーツごとに3,000バーツ追加。\n• DBD Biz Registによる電子登記。\n• 全パートナーはオンライン本人確認が必要。"
  },
  "commercial-shop-registration-deal": {
    slug: "commercial-shop-registration-deal", category: "登記", categoryId: "registration",
    title: "商業店舗登記", imagePlaceholder: "4:3",
    shortInfo: ["政府手数料込み——追加費用なし","オンラインショップ・実店舗の両方対応","面倒な手続き不要——政府への申請を代行","商業登記証（PorKor.0403）を迅速取得","ネットショップの信頼性向上——顧客100%安心","書類をすぐにローンや口座開設に利用可能"],
    price: "3,500バーツから", originalPrice: "5,500から", pricingTiers: [],
    benefits: ["<b>お得な一括価格！政府手数料込み</b> 登録費用すべて込みの定額制。隠れた費用なし。","<b>オンライン・実店舗の両方対応</b> どちらの業態でも正確に対応。","<b>手続き不要</b> 全工程を代行。複雑な書類準備や役所への移動は不要。","<b>商業登記証を迅速取得</b> 書類エラーを最小限に抑え、迅速に証明書を取得。","<b>信頼性向上——顧客100%安心</b> 登記証は店舗の実在を証明し、顧客の購買意欲を高めます。","<b>事業拡大——口座開設やローン申請にすぐ利用可能</b> 法人口座開設、決済ゲートウェイ申請、ローン申請にすぐ使える重要書類。\n\n（ご参考：ローン申請に使用する場合、銀行によっては登記証の取得から6ヶ月～1年以上の経過が必要な場合があります。）"],
    conditions: "上記料金はバンコク都内の事業所向け標準料金です。都外の場合、距離に応じた追加料金が発生する場合があります。"
  },
  "monthly-bookkeeping-and-tax-bundle": {
    slug: "monthly-bookkeeping-and-tax-bundle", category: "会計・監査", categoryId: "accounting",
    title: "月次法人記帳＆税務パッケージ", imagePlaceholder: "4:3",
    shortInfo: ["基準に準拠した正確な記帳","PND.1・3・53およびPP.30の期限内申告","月次財務諸表サマリー"],
    price: "月額1,500バーツから", originalPrice: "月額2,500から",
    pricingTiers: [{name:"Sサイズ\n（月50件以下）",price:"2,500",originalPrice:"3,500"},{name:"Mサイズ\n（月70件以下）",price:"3,000",originalPrice:"4,000"},{name:"Lサイズ\n（月100件以下）",price:"3,500",originalPrice:"4,500"},{name:"XLサイズ\n（月100件超）",price:"お問い合わせ"},{name:"空白レポート提出\n（1レポートにつき）",price:"500",originalPrice:"700"}],
    benefits: ["標準準拠ソフトによる収支記帳","源泉徴収税・付加価値税の申告書作成・提出","社会保険料の納付手続き","契約期間中の会計・税務相談無料"],
    conditions: "料金は書類量・業種・複雑さ・月次会計活動レベルにより決定。"
  },
  "individual-tax-clearing": {
    slug: "individual-tax-clearing", category: "会計・監査", categoryId: "accounting",
    title: "個人所得税精算", imagePlaceholder: "4:3",
    shortInfo: ["控除最大化と正確な税計算","過去の税務問題解決——歳入局への代理対応","全申告（PND.90/91/94）を期限内処理","複雑な収支書類を代行管理","控除プランで最大限の節約","法人化すべきかの専門アドバイス"],
    price: "2,500バーツから", originalPrice: "4,500から", pricingTiers: [],
    benefits: ["<b>税控除の最大化プランニング</b>\n数字を記入するだけでなく、収支を詳細に分析し、利用可能な税優遇措置と控除を最大限活用して合法的に節税します。","<b>複雑な書類管理をお任せ</b>\n源泉徴収証明書等の収支書類の整理・分類を代行し、将来の税務調査リスクを防止。","<b>プロによる未納税務処理</b>\n未申告や過少申告の税務問題がある場合、最善の解決策を見つけ、ペナルティを最小限に。","<b>歳入局への代理対応</b>\n税務調査の際、専門チームが代理として対応・交渉。","<b>完全な申告管理——常に期限内</b>\n全個人所得税申告をe-Filingで100%期限内完了。","<b>成長のための専門アドバイス</b>\n個人から法人化が「得策」かをケースバイケースで評価し、長期的な税務計画を支援。"],
    conditions: "個人所得税精算料金は業種の複雑さと書類量により異なり、歳入局への代理出向費は含まれません。"
  },
  "close-financial-deal": {
    slug: "close-financial-deal", category: "会計・監査", categoryId: "accounting",
    title: "年次決算書作成", imagePlaceholder: "4:3",
    shortInfo: ["公認会計士（CPA）による財務諸表監査","100%法令遵守——保証","PND.50作成および電子申告"],
    price: "9,900バーツから", originalPrice: "12,900から", pricingTiers: [],
    benefits: ["年次財務諸表の監査・認証","法人所得税申告書（PND.50）の作成","DBD e-Filing経由の財務諸表提出","SBCh.3および株主名簿（BorOrJor.5）の作成"],
    conditions: "監査サービス料金は事業の複雑さと規模により異なります。"
  }
};

// Korean
ITEMS['ko'] = {
  "company-registration-deal": {
    slug: "company-registration-deal", category: "등기", categoryId: "registration",
    title: "유한회사 설립 등기", imagePlaceholder: "4:3",
    shortInfo: ["정부 수수료 포함 — 추가 요금 없음","월 기장 계약 의무 없음","온라인 본인 인증 — 이동 불필요","무료! 상담 및 전체 서류 준비","무료! 회사 증명서 풀 세트(DBD)","무료! 자동 잉크 회사 도장 1개","무료! 법인 계좌 개설용 서류","무료! DBD 전자 신고 비밀번호 등록","무료! 국세청 비밀번호 등록","무료! 영수증/세금계산서용 명함","무료! 세무 테크닉 교육 과정(5,900밧 상당)"],
    price: "9,900밧부터", originalPrice: "12,900부터",
    pricingTiers: [{name:"태국인 주주만",price:"9,900",originalPrice:"12,900"},{name:"외국인 주주 49% 이하",price:"12,900",originalPrice:"15,900"},{name:"외국인 100% 소유",price:"15,900",originalPrice:"18,900"},{name:"법인 주주",price:"19,900",originalPrice:"22,900"}],
    benefits: ["<b>원스톱 가격! 정부 수수료 포함</b> 가장 투명하고 가치 있는 제안 — 등록자본금 500만 밧 이하 회사 설립 등기 수수료가 포함되어 있습니다. 추가 비용은 일절 없습니다.","<b>선택의 자유 — 기장 계약 의무 없음</b> 서비스 품질에 자신이 있으므로, 이 프로모션과 교환하여 장기 기장 계약을 강제하지 않습니다.","<b>온라인 본인 인증(e-KYC)의 극대 편의</b> 서류 서명을 위한 이동 불필요. ThaID 앱(태국인), DBD e-Service 앱(외국인), 또는 DBD 시스템의 이메일 인증 링크로 본인 확인 가능.","<b>무료! 전문 상담 및 전체 서류 준비</b> 등기 전 계획부터 완료까지 체계적 안내 - 원스톱 서비스.","<b>무료! 비즈니스 스타터 키트</b>\n• 회사 증명서 풀 세트(DBD) — 즉시 사용 가능\n• 자동 잉크 회사 도장 1개(디자인 무료)\n• 법인 계좌 개설용 서류\n• DBD 전자 신고 비밀번호 등록\n• 국세청 비밀번호 등록\n• 영수증/세금계산서용 명함\n• 견적서, 청구서 템플릿 등","<b>독점! 세무 테크닉 교육 과정(5,900밧 상당)</b> 사업주가 알아야 할 세무·회계 기초 지식으로 안전한 경영과 최대 절세를 실현."],
    conditions: "• 본 요금은 등록자본금 500만 밧 이하 회사 설립 등기 정부 수수료를 포함합니다.\n• 500만 밧 초과 시 100만 밧당 3,000밧 추가.\n• DBD Biz Regist 전자 등기 시스템으로 진행.\n• 이사 및 모든 주주는 서류 서명을 위한 이동 불필요, 온라인 본인 인증 필요:\n  1. ThaID 앱(태국인)\n  2. DBD e-Service 앱(외국인)\n  3. DBD 시스템의 이메일 인증 링크"
  },
  "partnership-registration-deal": {
    slug: "partnership-registration-deal", category: "등기", categoryId: "registration",
    title: "합자회사 설립 등기", imagePlaceholder: "4:3",
    shortInfo: ["정부 수수료 포함 — 추가 요금 없음","월 기장 계약 의무 없음","온라인 본인 인증 — 이동 불필요","무료! 상담 및 전체 서류 준비","무료! 합자회사 증명서 풀 세트(DBD)","무료! 자동 잉크 도장 1개","무료! 법인 계좌 개설용 서류","무료! DBD 전자 신고 비밀번호 등록","무료! 국세청 비밀번호 등록","무료! 영수증/세금계산서용 명함","무료! 세무 테크닉 교육 과정(5,900밧 상당)"],
    price: "5,900밧부터", originalPrice: "8,900부터",
    pricingTiers: [{name:"전원 태국인 파트너",price:"5,900",originalPrice:"8,900"},{name:"외국인 파트너 출자 49% 이하",price:"8,900",originalPrice:"11,900"}],
    benefits: ["<b>원스톱 가격! 정부 수수료 포함</b> 합자회사 등기 수수료 포함(500만 밧 이하). 추가 비용 없음.","<b>선택의 자유 — 기장 계약 의무 없음</b>","<b>온라인 본인 인증(e-KYC)</b>","<b>무료! 전문 상담 및 전체 서류</b> 계획부터 완료까지 원스톱 서비스.","<b>무료! 스타터 키트</b>\n• 합자회사 증명서 풀 세트(DBD)\n• 자동 잉크 도장 1개(디자인 무료)\n• 계좌 개설용 서류\n• 비밀번호 등록\n• 명함·템플릿 등","<b>독점! 세무 테크닉 교육 과정(5,900밧 상당)</b>"],
    conditions: "• 등록자본금 500만 밧 이하 합자회사 등기 수수료 포함.\n• 초과 시 100만 밧당 3,000밧 추가.\n• DBD Biz Regist 전자 등기.\n• 모든 파트너는 온라인 본인 인증 필요."
  },
  "commercial-shop-registration-deal": {
    slug: "commercial-shop-registration-deal", category: "등기", categoryId: "registration",
    title: "상업 점포 등록", imagePlaceholder: "4:3",
    shortInfo: ["정부 수수료 포함 — 추가 요금 없음","온라인 및 오프라인 점포 모두 지원","번거로움 없음 — 정부 업무 대행","상업등록증(PorKor.0403) 신속 취득","온라인 점포 신뢰도 향상 — 고객 100% 안심","서류를 대출, 상인 계좌, 사업 확장에 즉시 활용 가능"],
    price: "3,500밧부터", originalPrice: "5,500부터", pricingTiers: [],
    benefits: ["<b>합리적 가격! 정부 수수료 포함</b> 정부 등록비 포함 정찰제. 숨겨진 비용 없음.","<b>온라인·오프라인 점포 모두 지원</b>","<b>번거로움 없는 경험</b> 전 과정 대행.","<b>상업등록증 신속 취득</b>","<b>신뢰도 향상 — 고객 100% 안심</b>","<b>사업 확장 — 계좌 개설이나 대출 즉시 가능</b>\n\n(참고: 대출 신청 시 일부 은행은 등록증 취득 후 6개월~1년 이상 경과를 요구할 수 있습니다.)"],
    conditions: "위 요금은 방콕 수도권 사업장 기준입니다. 방콕 외 지역은 거리에 따른 추가 요금이 발생할 수 있습니다."
  },
  "monthly-bookkeeping-and-tax-bundle": {
    slug: "monthly-bookkeeping-and-tax-bundle", category: "회계 및 감사", categoryId: "accounting",
    title: "월별 법인 기장 및 세무 패키지", imagePlaceholder: "4:3",
    shortInfo: ["기준에 맞는 완전하고 정확한 기장","PND.1, 3, 53 및 PP.30 적시 신고","월별 재무제표 요약"],
    price: "월 1,500밧부터", originalPrice: "월 2,500부터",
    pricingTiers: [{name:"S사이즈\n(월 50건 이하)",price:"2,500",originalPrice:"3,500"},{name:"M사이즈\n(월 70건 이하)",price:"3,000",originalPrice:"4,000"},{name:"L사이즈\n(월 100건 이하)",price:"3,500",originalPrice:"4,500"},{name:"XL사이즈\n(월 100건 초과)",price:"문의"},{name:"공란 보고서 제출\n(보고서 유형당)",price:"500",originalPrice:"700"}],
    benefits: ["기준 준수 소프트웨어를 사용한 수입/지출 기장","원천징수세 및 부가가치세 신고서 작성·제출","사회보험료 납부","계약 기간 중 무료 회계·세무 상담"],
    conditions: "요금은 서류량, 업종, 복잡도, 월별 회계 활동 수준에 따라 결정됩니다."
  },
  "individual-tax-clearing": {
    slug: "individual-tax-clearing", category: "회계 및 감사", categoryId: "accounting",
    title: "개인 소득세 정산", imagePlaceholder: "4:3",
    shortInfo: ["공제 최대화 및 정확한 세금 계산","체납 세금 해결 — 국세청 대리 대응","모든 신고(PND.90/91/94) 기한 내 처리","복잡한 수입/지출 서류 대행 관리","공제 계획으로 최대 절약","법인화 여부에 대한 전문 상담"],
    price: "2,500밧부터", originalPrice: "4,500부터", pricingTiers: [],
    benefits: ["<b>세금 공제 최대화</b>\n수입과 지출을 상세 분석하여 가용 세제 혜택과 공제를 최대한 활용, 합법적 절세 지원.","<b>복잡한 서류 관리 대행</b>\n원천징수증명서 등 수입/지출 서류를 정리·분류하여 향후 세무조사 리스크를 방지.","<b>전문적인 체납 세금 처리</b>\n미신고, 과소신고 등 세무 문제 발생 시 최선의 해결책으로 벌금 최소화.","<b>국세청 대리 대응</b>\n세무조사 시 전문팀이 대리로 대응·협상.","<b>완전한 신고 관리 — 항상 기한 내</b>\n모든 개인소득세 신고를 e-Filing으로 100% 기한 내 완료.","<b>성장을 위한 전문 상담</b>\n개인에서 법인(유한회사/합자회사)으로의 전환이 '유리한지' 케이스별 평가."],
    conditions: "개인 소득세 정산 수수료는 업종 복잡도와 서류량에 따라 다르며, 국세청 대리 출석 교통비는 미포함."
  },
  "close-financial-deal": {
    slug: "close-financial-deal", category: "회계 및 감사", categoryId: "accounting",
    title: "연간 재무제표 결산", imagePlaceholder: "4:3",
    shortInfo: ["공인회계사(CPA)에 의한 재무제표 감사","100% 법적 준수 — 보장","PND.50 작성 및 e-Filing 제출"],
    price: "9,900밧부터", originalPrice: "12,900부터", pricingTiers: [],
    benefits: ["연간 재무제표 감사 및 인증","법인소득세 신고서(PND.50) 작성","DBD e-Filing을 통한 재무제표 제출","SBCh.3 및 주주명부(BorOrJor.5) 작성"],
    conditions: "감사 서비스 수수료는 사업의 복잡도와 규모에 따라 다릅니다."
  }
};

// Write all CJK
for (const [locale, items] of Object.entries(ITEMS)) {
  const filePath = path.join(MESSAGES_DIR, `${locale}.json`);
  if (!fs.existsSync(filePath)) continue;
  const json = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  json.promotions.items = items;
  
  // Also update metadata
  const metaTitles = {'zh-Hans':'Virintira | 促销','zh-Hant':'Virintira | 促銷','ja':'Virintira | プロモーション','ko':'Virintira | 프로모션'};
  const metaDescs = {'zh-Hans':'汇集最优惠价格和超值套餐，帮助您降低成本并提升创业能力。','zh-Hant':'匯集最優惠價格和超值套餐，幫助您降低成本並提升創業能力。','ja':'コスト削減とビジネス立ち上げ力の向上を実現する最もお得なパッケージ。','ko':'비용 절감과 사업 시작 능력 향상을 위한 최고의 패키지.'};
  json.promotions.metadata = {
    title: metaTitles[locale] || json.promotions.metadata?.title || '',
    description: metaDescs[locale] || json.promotions.metadata?.description || '',
    keywords: json.promotions.metadata?.keywords || []
  };
  
  fs.writeFileSync(filePath, JSON.stringify(json, null, 2) + '\n', 'utf-8');
  console.log(`✅ ${locale}.json — all 6 promotion items translated`);
}

console.log('\nDone! CJK promotion items translated.');
