/**
 * Translate promotion ITEMS from Thai to English.
 * This handles the 6 promotion deals with their full content.
 * 
 * Run: node translate-promotions-items-en.js
 */
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'messages', 'en.json');
const json = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

json.promotions.items = {
  "company-registration-deal": {
    "slug": "company-registration-deal",
    "category": "Registration",
    "categoryId": "registration",
    "title": "Company Limited Registration",
    "imagePlaceholder": "4:3",
    "shortInfo": [
      "Government fees included — no additional charges",
      "No obligation for monthly bookkeeping contracts",
      "Online identity verification — no travel required",
      "Free! Consultation and complete document preparation",
      "Free! Full set of company certificates (DBD)",
      "Free! Self-inking company stamp (1 piece)",
      "Free! Documents for opening a business bank account",
      "Free! DBD e-Filing password registration",
      "Free! Revenue Department password registration",
      "Free! Business cards for issuing receipts/tax invoices",
      "Free! Tax techniques training course (valued at 5,900 THB)"
    ],
    "price": "Starting at 9,900 THB",
    "originalPrice": "Starting at 12,900",
    "pricingTiers": [
      { "name": "All Thai shareholders", "price": "9,900", "originalPrice": "12,900" },
      { "name": "Foreign shareholder(s) up to 49%", "price": "12,900", "originalPrice": "15,900" },
      { "name": "100% foreign-owned", "price": "15,900", "originalPrice": "18,900" },
      { "name": "Corporate shareholder(s)", "price": "19,900", "originalPrice": "22,900" }
    ],
    "benefits": [
      "<b>One price, all-inclusive! Government fees already included</b> The most transparent and value-packed offer — this promotional price covers all registration fees with the Department of Business Development (for registered capital up to 5 million THB). No additional charges whatsoever.",
      "<b>Freedom of choice — no mandatory bookkeeping contract</b> We are confident in our service quality, so we never require clients to sign long-term monthly bookkeeping or annual financial closing contracts in exchange for this promotion.",
      "<b>Ultimate convenience with online identity verification (e-KYC)</b> No need to travel for paper document signing. Verify your identity via ThaID app (for Thai nationals), DBD e-Service app (for foreigners), or through a personal email verification link sent by the DBD system to each shareholder.",
      "<b>Free! Expert consultation and complete document preparation</b> From pre-registration planning to completion, we provide systematic guidance and help you see the full picture. We handle all government forms from start to finish — a complete end-to-end service.",
      "<b>Free! Full starter kit with business-ready documents</b>\n• Complete set of company certificates (DBD) — ready to use\n• Self-inking company stamp (1 piece) — free design included\n• Essential documents for opening a business bank account\n• DBD e-Filing password registration\n• Revenue Department password registration\n• Business cards for issuing receipts/tax invoices\n• Quotation templates, invoices, etc.",
      "<b>Exclusive! Tax techniques training course (valued at 5,900 THB)</b> Build foundational knowledge in tax and accounting that every business owner should know, so you can manage your business safely and maximize tax savings."
    ],
    "conditions": "• This service rate includes government fees for company registration with registered capital up to 5 million THB only.\n• For registered capital exceeding 5 million THB, additional government fees and service charges apply at a rate of 3,000 THB per million.\n• All processes are conducted via electronic registration (e-Registration) through the DBD Biz Regist system of the Department of Business Development.\n• Directors and all shareholders do not need to travel for paper document signing. Online identity verification is required through one of the following channels:\n  1. ThaID app (for Thai nationals)\n  2. DBD e-Service app (for foreigners)\n  3. Verification link sent via email by the DBD system to each shareholder's personal email"
  },
  "partnership-registration-deal": {
    "slug": "partnership-registration-deal",
    "category": "Registration",
    "categoryId": "registration",
    "title": "Limited Partnership Registration",
    "imagePlaceholder": "4:3",
    "shortInfo": [
      "Government fees included — no additional charges",
      "No obligation for monthly bookkeeping contracts",
      "Online identity verification — no travel required",
      "Free! Consultation and complete document preparation",
      "Free! Full set of partnership certificates (DBD)",
      "Free! Self-inking partnership stamp (1 piece)",
      "Free! Documents for opening a business bank account",
      "Free! DBD e-Filing password registration",
      "Free! Revenue Department password registration",
      "Free! Business cards for issuing receipts/tax invoices",
      "Free! Tax techniques training course (valued at 5,900 THB)"
    ],
    "price": "Starting at 5,900 THB",
    "originalPrice": "Starting at 8,900",
    "pricingTiers": [
      { "name": "All Thai partners", "price": "5,900", "originalPrice": "8,900" },
      { "name": "Foreign partner(s) contributing up to 49%", "price": "8,900", "originalPrice": "11,900" }
    ],
    "benefits": [
      "<b>One price, all-inclusive! Government fees already included</b> The most transparent and value-packed offer — this promotional price covers all registration fees with the Department of Business Development for limited partnership registration (for registered capital up to 5 million THB). No additional charges whatsoever.",
      "<b>Freedom of choice — no mandatory bookkeeping contract</b> We are confident in our service quality, so we never require clients to sign long-term monthly bookkeeping or annual financial closing contracts in exchange for this promotion.",
      "<b>Ultimate convenience with online identity verification (e-KYC)</b> No need to travel for paper document signing. Verify your identity via ThaID app (for Thai nationals), DBD e-Service app (for foreigners), or through a personal email verification link sent by the DBD system to each partner.",
      "<b>Free! Expert consultation and complete document preparation</b> From pre-registration planning to completion, we provide systematic guidance and help you see the full picture. We handle all government forms from start to finish — a complete end-to-end service.",
      "<b>Free! Full starter kit with business-ready documents</b>\n• Complete set of partnership certificates (DBD) — ready to use\n• Self-inking partnership stamp (1 piece) — free design included\n• Essential documents for opening a business bank account\n• DBD e-Filing password registration\n• Revenue Department password registration\n• Business cards for issuing receipts/tax invoices\n• Quotation templates, invoices, etc.",
      "<b>Exclusive! Tax techniques training course (valued at 5,900 THB)</b> Build foundational knowledge in tax and accounting that every business owner should know, so you can manage your business safely and maximize tax savings."
    ],
    "conditions": "• This service rate includes government fees for limited partnership registration with registered capital up to 5 million THB only.\n• For registered capital exceeding 5 million THB, additional government fees and service charges apply at a rate of 3,000 THB per million.\n• All processes are conducted via electronic registration (e-Registration) through the DBD Biz Regist system of the Department of Business Development.\n• The managing partner and all partners do not need to travel for paper document signing. Online identity verification is required through one of the following channels:\n  1. ThaID app (for Thai nationals)\n  2. DBD e-Service app (for foreigners)\n  3. Verification link sent via email by the DBD system to each partner's personal email"
  },
  "commercial-shop-registration-deal": {
    "slug": "commercial-shop-registration-deal",
    "category": "Registration",
    "categoryId": "registration",
    "title": "Commercial Shop Registration",
    "imagePlaceholder": "4:3",
    "shortInfo": [
      "Government fees included — no additional charges",
      "Covers both online and physical store registration",
      "Hassle-free — we handle all government submissions on your behalf",
      "Receive your commercial registration certificate (PorKor.0403) quickly",
      "Build credibility for your online store — 100% customer confidence",
      "Use documents for loans, merchant accounts, or business expansion immediately"
    ],
    "price": "Starting at 3,500 THB",
    "originalPrice": "Starting at 5,500",
    "pricingTiers": [],
    "benefits": [
      "<b>Great value — one price, all-inclusive! Government fees included</b> We guarantee transparency with a flat-rate service fee that already covers all government registration fees. No hidden costs or surprise charges afterward.",
      "<b>Covers both online and physical stores</b> Whether your business operates through online sales channels or as a traditional brick-and-mortar store, we are ready to handle everything correctly according to each business type's requirements.",
      "<b>Hassle-free experience</b> We act as your representative throughout the entire process, eliminating the burden of preparing complex forms and traveling to government offices. Our expert team will submit all documents and manage everything from start to finish.",
      "<b>Receive your commercial registration certificate (PorKor.0403) quickly</b> With our expertise, we minimize document errors, enabling you to receive your commercial registration certificate promptly, ready for legitimate business operations.",
      "<b>Build credibility — 100% customer confidence</b> Having a commercial registration certificate and verification mark guarantees that your store truly exists and can be verified, boosting customer confidence to make purchases and transfers with peace of mind.",
      "<b>Expand your business — open merchant accounts or apply for loans immediately</b> Your commercial registration certificate serves as essential documentation for opening business bank accounts, applying for payment gateway services, or submitting business loan applications.\n\n(Recommendation: If you plan to use these documents for loan applications, we advise checking conditions with your bank in advance, as some banks may require the certificate to be at least 6 months to 1 year old.)"
    ],
    "conditions": "The above service rates are standard rates for businesses located in Bangkok Metropolitan Area. For offices located outside this area, additional service and travel fees may apply based on actual distance. We will provide a price assessment for your consideration before you decide to use our services."
  },
  "monthly-bookkeeping-and-tax-bundle": {
    "slug": "monthly-bookkeeping-and-tax-bundle",
    "category": "Accounting & Audit",
    "categoryId": "accounting",
    "title": "Monthly Corporate Bookkeeping & Tax Package",
    "imagePlaceholder": "4:3",
    "shortInfo": [
      "Complete and accurate bookkeeping per standards",
      "Timely filing of PND.1, 3, 53 and PP.30 tax returns",
      "Monthly financial statement summaries"
    ],
    "price": "Starting at 1,500 THB/month",
    "originalPrice": "Starting at 2,500 per month",
    "pricingTiers": [
      { "name": "Size S \n(Up to 50 documents/month)", "price": "2,500", "originalPrice": "3,500" },
      { "name": "Size M \n(Up to 70 documents/month)", "price": "3,000", "originalPrice": "4,000" },
      { "name": "Size L \n(Up to 100 documents/month)", "price": "3,500", "originalPrice": "4,500" },
      { "name": "Size XL \n(More than 100 documents/month)", "price": "Contact for quote" },
      { "name": "Blank report filing \n(Per report type)", "price": "500", "originalPrice": "700" }
    ],
    "benefits": [
      "Income and expense bookkeeping using standard-compliant software",
      "Preparation and filing of withholding tax and VAT returns",
      "Social security contribution submissions",
      "Free accounting and tax consultation throughout the contract period"
    ],
    "conditions": "Pricing is determined by document volume, business type, complexity, and monthly accounting activity levels."
  },
  "individual-tax-clearing": {
    "slug": "individual-tax-clearing",
    "category": "Accounting & Audit",
    "categoryId": "accounting",
    "title": "Personal Income Tax Clearing",
    "imagePlaceholder": "4:3",
    "shortInfo": [
      "Maximize deductions with precise tax calculations",
      "Clear back-tax issues — represent you before Revenue Dept.",
      "Handle all filings (PND.90/91/94) on time",
      "Manage complex income/expense documentation for you",
      "Plan deductions to save you the most money",
      "In-depth advice on whether to incorporate"
    ],
    "price": "Starting at 2,500 THB",
    "originalPrice": "Starting at 4,500",
    "pricingTiers": [],
    "benefits": [
      "<b>Maximum tax deduction planning</b> \nWe don't just fill in numbers for filing. Our team analyzes your income and expenses in detail to leverage every available tax benefit and deduction, helping you save on taxes legally.",
      "<b>Complex document management handled for you</b> \nNo more headaches sorting income/expense documents (such as withholding tax certificates). We organize and categorize complex documents on your behalf to prevent errors that could trigger future audits.",
      "<b>Professional back-tax resolution</b> \nIf you have a history of unfiled taxes, under-reported income, or back-tax concerns, we're ready to review, strategize, and find the best solution to minimize penalties and surcharges.",
      "<b>Represent you before the Revenue Department</b> \nIf tax officers request documents or call you in, you don't have to face it alone. Our team will serve as your representative, answering questions and negotiating on your behalf professionally.",
      "<b>Complete filing management — always on time</b> \nWe handle all personal income tax return filings (PND.90 for multiple income sources, PND.91 for salary earners, or PND.94 for mid-year tax) via the Revenue Department's e-Filing system, ensuring 100% on-time completion.",
      "<b>In-depth consultation for growth</b> \nWe assess your income trajectory case by case to determine if it's \"worth it\" to transition from individual status to incorporating as a company (Company Limited / Limited Partnership), enabling more effective long-term tax planning."
    ],
    "conditions": "Personal income tax clearing fees depend on business type complexity and document volume. Travel expenses for representing clients at the Revenue Department office are not included."
  },
  "close-financial-deal": {
    "slug": "close-financial-deal",
    "category": "Accounting & Audit",
    "categoryId": "accounting",
    "title": "Annual Financial Statement Closing",
    "imagePlaceholder": "4:3",
    "shortInfo": [
      "Financial statements audited by Certified Public Accountant (CPA)",
      "100% legally compliant — guaranteed",
      "Preparation of PND.50 and e-Filing submission"
    ],
    "price": "Starting at 9,900 THB",
    "originalPrice": "Starting at 12,900",
    "pricingTiers": [],
    "benefits": [
      "Annual financial statement audit and certification",
      "Preparation of corporate income tax return (PND.50)",
      "Financial statement submission via DBD e-Filing",
      "Preparation of SBCh.3 and shareholder list (BorOrJor.5)"
    ],
    "conditions": "Audit service fees depend on the complexity and size of the business."
  }
};

// Also update metadata
json.promotions.metadata = {
  "title": "Virintira | Promotions",
  "description": "Discover the best deals and value-packed packages from us, designed to reduce costs and boost your ability to start a business.",
  "keywords": ["promotions", "value packages", "company registration", "bookkeeping", "reduce business costs"]
};

fs.writeFileSync(filePath, JSON.stringify(json, null, 2) + '\n', 'utf-8');
console.log('✅ en.json — all 6 promotion items + metadata translated');
