const fs = require('fs');

const summaryUpdates = {
    th: {
        "company-name": "บริการจดทะเบียนเปลี่ยนแปลงชื่อนิติบุคคล ครอบคลุมถึงการแก้ไขเอกสารที่เกี่ยวข้องกับทุกหน่วยงานราชการให้ถูกต้องและครบถ้วน เพื่อรองรับภาพลักษณ์ใหม่ของธุรกิจคุณ",
        "company-seal": "บริการจดทะเบียนเปลี่ยนแปลงหรือแก้ไขตราประทับนิติบุคคล (ตรายาง) ให้ถูกต้องตามกฎหมาย เพื่อความรัดกุมและปลอดภัยในการทำธุรกรรมต่างๆ",
        "directors": "บริการจดทะเบียนเพิ่ม ลด หรือเปลี่ยนแปลงข้อมูลกรรมการ ดำเนินการด้านเอกสารอย่างรอบคอบ เพื่อให้โครงสร้างการบริหารงานอัปเดตและสอดคล้องกับสถานะปัจจุบัน",
        "signing-authority": "บริการแก้ไขเปลี่ยนแปลงเงื่อนไขและอำนาจกรรมการในการลงนามผูกพันนิติบุคคล จัดทำข้อกำหนดอย่างชัดเจนเพื่อป้องกันความเสี่ยงและเพิ่มความคล่องตัวในการบริหาร",
        "shareholders": "บริการแก้ไขเปลี่ยนแปลงข้อมูลบัญชีรายชื่อผู้ถือหุ้น (บอจ.5) ครอบคลุมการโอนหุ้น เปลี่ยนแปลงสัดส่วน หรือปรับปรุงข้อมูลผู้ถือหุ้นให้ถูกต้องตามหลักเกณฑ์",
        "capital": "บริการจดทะเบียนเพิ่มหรือลดทุนจดทะเบียนของนิติบุคคล ดูแลขั้นตอนและเอกสารประกอบการพิจารณาอย่างละเอียด เพื่อรองรับการขยายตัวหรือการปรับโครงสร้างธุรกิจ",
        "address": "บริการจดทะเบียนย้ายที่ตั้งสำนักงานใหญ่ หรือเพิ่ม/ลดสำนักงานสาขา จัดการแจ้งเปลี่ยนข้อมูลกับกรมพัฒนาธุรกิจการค้า กรมสรรพากร และสำนักงานประกันสังคมให้ครบจบในที่เดียว",
        "objectives": "บริการจดทะเบียนแก้ไขหรือเพิ่มเติมวัตถุประสงค์ของนิติบุคคล เพื่อขยายขอบเขตการประกอบธุรกิจให้รองรับบริการและสินค้าใหม่ๆ ได้อย่างถูกต้องตามกฎหมาย",
        "dissolution": "บริการจดทะเบียนเลิกนิติบุคคลและชำระบัญชี ดูแลครบทุกขั้นตอนตั้งแต่แจ้งเลิก เคลียร์ภาระภาษี จนถึงการปิดงบ เพื่อให้คุณยุติธุรกิจได้อย่างสมบูรณ์และไร้ข้อกังวลในภายหลัง"
    },
    en: {
        "company-name": "Corporate name change registration service, covering complete and accurate document amendments with all government agencies to support your new business image.",
        "company-seal": "Registration service for legally changing or amending the corporate seal (stamp), ensuring strictness and safety in various transactions.",
        "directors": "Registration service for adding, removing, or changing director information. We handle all documentation carefully to keep your management structure updated and aligned with your current status.",
        "signing-authority": "Service to amend the conditions and authority of directors to bind the corporate entity, clearly defining terms to prevent risks and enhance management agility.",
        "shareholders": "Service to update the list of shareholders (BOJ.5), covering share transfers, ratio changes, or updating shareholder information in accordance with regulations.",
        "capital": "Registration service for increasing or decreasing corporate registered capital. We meticulously manage the procedures and supporting documents to accommodate business expansion or restructuring.",
        "address": "Registration service for relocating the head office or adding/removing branches. We seamlessly manage the notification of changes to the DBD, Revenue Department, and Social Security Office all in one place.",
        "objectives": "Registration service to amend or add corporate objectives, legally expanding your business scope to accommodate new services and products.",
        "dissolution": "Corporate dissolution and liquidation registration service. We handle every step from dissolution notification and tax clearance to final accounting closure, allowing you to end the business completely and worry-free."
    },
    "zh-Hans": {
        "company-name": "公司名称变更注册服务，包括向所有政府机构进行准确、完整的文件修改，以支持您的新业务形象。",
        "company-seal": "依法变更或修改公司印章的注册服务，确保各项交易的严密性和安全性。",
        "directors": "增加、减少或变更董事信息的注册服务。我们谨慎处理相关文件，使管理架构与当前状况保持同步。",
        "signing-authority": "修改董事对公司具有约束力的签字条件和权限的服务。明确规定以防范风险，并提高管理灵活性。",
        "shareholders": "股东名册（BOJ.5）信息变更服务，涵盖股份转让、比例变更或按规定更新股东信息。",
        "capital": "增加或减少公司注册资本的注册服务。我们仔细处理审核程序和证明文件，以适应业务扩张或结构调整。",
        "address": "总部搬迁或增减分支机构的注册服务。一站式处理向商务部（DBD）、税务局和社保局的信息变更通知。",
        "objectives": "修改或增加公司营业目的的注册服务，合法扩大业务范围，以涵盖新的服务和产品。",
        "dissolution": "公司注销和清算注册服务。全程处理从注销通知、税务结清到最终财务结账的所有步骤，让您无后顾之忧地彻底结束业务。"
    },
    "zh-Hant": {
        "company-name": "公司名稱變更註冊服務，包括向所有政府機構進行準確、完整的文件修改，以支持您的新業務形象。",
        "company-seal": "依法變更或修改公司印章的註冊服務，確保各項交易的嚴密性和安全性。",
        "directors": "增加、減少或變更董事資訊的註冊服務。我們謹慎處理相關文件，使管理架構與當前狀況保持同步。",
        "signing-authority": "修改董事對公司具有約束力的簽字條件和權限的服務。明確規定以防範風險，並提高管理靈活性。",
        "shareholders": "股東名冊（BOJ.5）資訊變更服務，涵蓋股份轉讓、比例變更或按規定更新股東資訊。",
        "capital": "增加或減少公司註冊資本的註冊服務。我們仔細處理審核程序和證明文件，以適應業務擴張或結構調整。",
        "address": "總部搬遷或增減分支機構的註冊服務。一站式處理向商務部（DBD）、稅務局和社保局的資訊變更通知。",
        "objectives": "修改或增加公司營業目的的註冊服務，合法擴大業務範圍，以涵蓋新的服務和產品。",
        "dissolution": "公司註銷和清算註冊服務。全程處理從註銷通知、稅務結清到最終財務結帳的所有步驟，讓您無後顧之憂地徹底結束業務。"
    },
    ja: {
        "company-name": "法人名変更の登記サービス。すべての政府機関における文書の正確かつ完全な修正を含み、新しいビジネスイメージをサポートします。",
        "company-seal": "取引の厳密性と安全性を確保するため、法的に適切な社印（ゴム印）の変更または修正の登記サービス。",
        "directors": "役員の追加、削除、または変更の登記サービス。管理体制を最新の状態に保つため、書類作成を慎重に行います。",
        "signing-authority": "法人を拘束する役員の署名条件および権限の変更サービス。リスクを防ぎ、管理の柔軟性を高めるために規定を明確にします。",
        "shareholders": "株主名簿（BOJ.5）の変更サービス。株式譲渡、比率の変更、または規制に基づく株主情報の更新をカバーします。",
        "capital": "法人の登録資本金の増資または減資の登記サービス。事業の拡大や再編に合わせて、手続きや必要書類を慎重に処理します。",
        "address": "本店の移転、または支店の追加/削除の登記サービス。事業開発局（DBD）、歳入局、社会保険事務局への変更通知をワンストップで処理します。",
        "objectives": "法人の事業目的の変更または追加の登記サービス。新しいサービスや製品に法的に対応できるよう、事業範囲を拡大します。",
        "dissolution": "法人の解散および清算の登記サービス。解散通知から税務処理、最終決算まで全工程をサポートし、安心して事業を完全に終了できます。"
    },
    ko: {
        "company-name": "새로운 비즈니스 이미지를 지원하기 위해 모든 정부 기관과 관련된 문서를 정확하고 완벽하게 수정하는 법인명 변경 등록 서비스입니다.",
        "company-seal": "다양한 거래에서 안전성과 엄격함을 보장하기 위해 법인 인감을 합법적으로 변경하거나 수정하는 등록 서비스입니다.",
        "directors": "임원 정보를 추가, 삭제 또는 변경하는 등록 서비스입니다. 관리 구조를 현재 상태와 일치하도록 최신 상태로 유지하기 위해 문서를 신중하게 처리합니다.",
        "signing-authority": "법인에 구속력을 갖는 임원의 서명 조건 및 권한을 수정하는 서비스입니다. 위험을 방지하고 관리의 유연성을 높이기 위해 규정을 명확히 합니다.",
        "shareholders": "주주 명부(BOJ.5) 정보 수정 서비스로, 규정에 따른 주식 양도, 비율 변경 또는 주주 정보 업데이트를 포괄합니다.",
        "capital": "법인의 등록 자본금을 늘리거나 줄이는 등록 서비스입니다. 비즈니스 확장 또는 구조 조정을 수용할 수 있도록 절차 및 증빙 서류를 신중하게 관리합니다.",
        "address": "본점 이전 또는 지점 추가/삭제 등록 서비스입니다. 상무부(DBD), 국세청 및 사회보장청에 대한 정보 변경 통지를 한 곳에서 원스톱으로 처리합니다.",
        "objectives": "새로운 서비스 및 제품을 합법적으로 수용할 수 있도록 사업 범위를 확장하기 위해 법인의 사업 목적을 수정하거나 추가하는 등록 서비스입니다.",
        "dissolution": "법인 해산 및 청산 등록 서비스입니다. 해산 통지, 세금 문제 해결부터 최종 회계 마감까지 모든 단계를 처리하여 걱정 없이 사업을 완전히 종료할 수 있도록 돕습니다."
    },
    de: {
        "company-name": "Registrierungsservice für Firmennamensänderungen, einschließlich der vollständigen und genauen Änderung von Dokumenten bei allen Regierungsbehörden, um Ihr neues Geschäftsimage zu unterstützen.",
        "company-seal": "Registrierungsservice für die rechtskonforme Änderung oder Anpassung des Firmenstempels, um Sicherheit und Strenge bei allen Transaktionen zu gewährleisten.",
        "directors": "Registrierungsservice zum Hinzufügen, Entfernen oder Ändern von Geschäftsführerinformationen. Wir bearbeiten Dokumente sorgfältig, um Ihre Managementstruktur auf dem neuesten Stand zu halten.",
        "signing-authority": "Service zur Änderung der Bedingungen und Befugnisse von Geschäftsführern zur rechtlichen Bindung des Unternehmens. Klare Definition der Bestimmungen zur Risikoprävention und Erhöhung der Managementflexibilität.",
        "shareholders": "Service zur Änderung des Aktionärsregisters (BOJ.5), der Aktienübertragungen, Verhältnisänderungen oder die Aktualisierung von Aktionärsinformationen gemäß den Vorschriften umfasst.",
        "capital": "Registrierungsservice für die Erhöhung oder Herabsetzung des eingetragenen Kapitals. Wir kümmern uns sorgfältig um die Verfahren und Belege, um Geschäftserweiterungen oder Umstrukturierungen anzupassen.",
        "address": "Registrierungsservice für die Verlegung des Hauptsitzes oder das Hinzufügen/Entfernen von Zweigniederlassungen. Wir verwalten die Änderungsmeldungen beim Department of Business Development (DBD), dem Finanzamt und der Sozialversicherungsbehörde aus einer Hand.",
        "objectives": "Registrierungsservice zur Änderung oder Ergänzung des Unternehmenszwecks, um den Geschäftsumfang rechtmäßig für neue Dienstleistungen und Produkte zu erweitern.",
        "dissolution": "Registrierungsservice für die Auflösung und Liquidation von Unternehmen. Wir kümmern uns um jeden Schritt, von der Auflösungsmeldung über die Steuerabwicklung bis zum endgültigen Jahresabschluss, damit Sie Ihr Geschäft vollständig und sorgenfrei beenden können."
    },
    fr: {
        "company-name": "Service d'enregistrement de changement de nom de l'entreprise, couvrant la modification complète et précise des documents auprès de toutes les agences gouvernementales pour soutenir votre nouvelle image commerciale.",
        "company-seal": "Service d'enregistrement pour modifier ou ajuster légalement le sceau de l'entreprise, garantissant la sécurité et la rigueur de toutes les transactions.",
        "directors": "Service d'enregistrement pour ajouter, supprimer ou modifier les informations sur les directeurs. Nous traitons les documents avec soin pour maintenir votre structure de gestion à jour.",
        "signing-authority": "Service pour modifier les conditions et les pouvoirs des directeurs pour engager l'entreprise, définissant clairement les termes pour prévenir les risques et accroître l'agilité de gestion.",
        "shareholders": "Service pour modifier la liste des actionnaires (BOJ.5), couvrant les transferts d'actions, les changements de ratio, ou la mise à jour des informations des actionnaires conformément à la réglementation.",
        "capital": "Service d'enregistrement pour augmenter ou réduire le capital social. Nous gérons méticuleusement les procédures et les pièces justificatives pour accompagner l'expansion ou la restructuration de l'entreprise.",
        "address": "Service d'enregistrement pour le déménagement du siège social ou l'ajout/suppression de succursales. Nous gérons la notification des changements au DBD, au département des impôts et à la sécurité sociale en un seul endroit.",
        "objectives": "Service d'enregistrement pour modifier ou ajouter des objectifs à l'entreprise, élargissant légalement le champ d'activité pour inclure de nouveaux services et produits.",
        "dissolution": "Service d'enregistrement de dissolution et de liquidation d'entreprise. Nous gérons chaque étape, de la notification de dissolution à l'apurement des impôts et à la clôture des comptes finaux, pour vous permettre de mettre fin à votre entreprise en toute tranquillité."
    },
    it: {
        "company-name": "Servizio di registrazione della modifica del nome della società, che copre l'emendamento completo e accurato dei documenti presso tutte le agenzie governative per supportare la nuova immagine aziendale.",
        "company-seal": "Servizio di registrazione per modificare o emendare legalmente il timbro della società, garantendo sicurezza e rigore in tutte le transazioni.",
        "directors": "Servizio di registrazione per aggiungere, rimuovere o modificare le informazioni sugli amministratori. Gestiamo attentamente i documenti per mantenere la struttura di gestione aggiornata con lo stato attuale.",
        "signing-authority": "Servizio per modificare le condizioni e i poteri degli amministratori di vincolare la società, definendo chiaramente i termini per prevenire i rischi e aumentare l'agilità gestionale.",
        "shareholders": "Servizio per modificare l'elenco degli azionisti (BOJ.5), che copre i trasferimenti di azioni, le variazioni delle quote o l'aggiornamento delle informazioni sugli azionisti secondo le normative.",
        "capital": "Servizio di registrazione per aumentare o diminuire il capitale sociale. Gestiamo meticolosamente le procedure e i documenti di supporto per assecondare l'espansione o la ristrutturazione aziendale.",
        "address": "Servizio di registrazione per il trasferimento della sede centrale o l'aggiunta/rimozione di filiali. Gestiamo la notifica delle modifiche al DBD, all'Agenzia delle Entrate e all'Ufficio di Sicurezza Sociale in un'unica soluzione.",
        "objectives": "Servizio di registrazione per modificare o aggiungere obiettivi aziendali, espandendo legalmente l'ambito di attività per accogliere nuovi servizi e prodotti.",
        "dissolution": "Servizio di registrazione per lo scioglimento e la liquidazione della società. Gestiamo ogni fase, dalla notifica di scioglimento alla liquidazione delle imposte fino alla chiusura del bilancio finale, permettendoti di chiudere l'attività completamente e senza preoccupazioni."
    },
    nl: {
        "company-name": "Registratieservice voor naamswijzigingen van bedrijven, inclusief de volledige en nauwkeurige wijziging van documenten bij alle overheidsinstanties ter ondersteuning van uw nieuwe bedrijfsimago.",
        "company-seal": "Registratieservice voor het legaal wijzigen of aanpassen van de bedrijfsstempel, om de veiligheid en striktheid van alle transacties te waarborgen.",
        "directors": "Registratieservice voor het toevoegen, verwijderen of wijzigen van directiegegevens. Wij behandelen documenten zorgvuldig om uw managementstructuur up-to-date te houden met de huidige status.",
        "signing-authority": "Service om de voorwaarden en bevoegdheden van bestuurders om het bedrijf te binden te wijzigen. Duidelijke bepalingen worden opgesteld om risico's te voorkomen en de managementflexibiliteit te vergroten.",
        "shareholders": "Service voor het wijzigen van het aandeelhoudersregister (BOJ.5), ter dekking van aandelenoverdrachten, verhoudingswijzigingen of het bijwerken van aandeelhoudersinformatie volgens de regelgeving.",
        "capital": "Registratieservice voor het verhogen of verlagen van het geregistreerde kapitaal. Wij beheren zorgvuldig de procedures en ondersteunende documenten om bedrijfsuitbreiding of -herstructurering te faciliteren.",
        "address": "Registratieservice voor het verplaatsen van het hoofdkantoor of het toevoegen/verwijderen van vestigingen. Wij beheren de kennisgeving van wijzigingen aan het DBD, de Belastingdienst en de Sociale Verzekeringsbank allemaal op één plek.",
        "objectives": "Registratieservice voor het wijzigen of toevoegen van bedrijfsdoelstellingen, waarmee de bedrijfsomvang legaal wordt uitgebreid om nieuwe diensten en producten te accommoderen.",
        "dissolution": "Registratieservice voor de ontbinding en liquidatie van bedrijven. Wij regelen elke stap, van de ontbindingsmelding en het afwikkelen van belastingen tot de definitieve financiële afsluiting, zodat u uw bedrijf volledig en zorgeloos kunt beëindigen."
    },
    ms: {
        "company-name": "Perkhidmatan pendaftaran pertukaran nama korporat, meliputi pindaan dokumen yang lengkap dan tepat dengan semua agensi kerajaan untuk menyokong imej perniagaan baharu anda.",
        "company-seal": "Perkhidmatan pendaftaran untuk menukar atau meminda cop korporat secara sah, memastikan ketelitian dan keselamatan dalam pelbagai transaksi.",
        "directors": "Perkhidmatan pendaftaran untuk menambah, membuang, atau menukar maklumat pengarah. Kami menguruskan dokumen dengan teliti untuk memastikan struktur pengurusan sentiasa dikemas kini dan selaras dengan status semasa.",
        "signing-authority": "Perkhidmatan untuk meminda syarat dan kuasa pengarah untuk mengikat entiti korporat, menetapkan terma yang jelas untuk mencegah risiko dan meningkatkan ketangkasan pengurusan.",
        "shareholders": "Perkhidmatan untuk mengemas kini senarai pemegang saham (BOJ.5), meliputi pemindahan saham, perubahan nisbah, atau mengemas kini maklumat pemegang saham mengikut peraturan.",
        "capital": "Perkhidmatan pendaftaran untuk menambah atau mengurangkan modal berdaftar korporat. Kami menguruskan prosedur dan dokumen sokongan dengan teliti untuk menampung pengembangan atau penstrukturan semula perniagaan.",
        "address": "Perkhidmatan pendaftaran untuk memindahkan ibu pejabat atau menambah/membuang cawangan. Kami menguruskan pemberitahuan perubahan kepada DBD, Jabatan Hasil, dan Pejabat Keselamatan Sosial di satu tempat.",
        "objectives": "Perkhidmatan pendaftaran untuk meminda atau menambah objektif korporat, memperluaskan skop perniagaan untuk menampung perkhidmatan dan produk baharu secara sah.",
        "dissolution": "Perkhidmatan pendaftaran pembubaran dan pencairan korporat. Kami menguruskan setiap langkah dari pemberitahuan pembubaran, penyelesaian cukai hingga penutupan kewangan akhir, membolehkan anda menamatkan perniagaan dengan lengkap dan tanpa bimbang."
    },
    hi: {
        "company-name": "कॉर्पोरेट नाम परिवर्तन पंजीकरण सेवा, जो आपकी नई व्यावसायिक छवि का समर्थन करने के लिए सभी सरकारी एजेंसियों के साथ सटीक और पूर्ण दस्तावेज़ संशोधन को कवर करती है।",
        "company-seal": "विभिन्न लेनदेन में सुरक्षा और सख्ती सुनिश्चित करने के लिए कॉर्पोरेट मुहर को कानूनी रूप से बदलने या संशोधित करने के लिए पंजीकरण सेवा।",
        "directors": "निदेशक की जानकारी जोड़ने, हटाने या बदलने के लिए पंजीकरण सेवा। प्रबंधन संरचना को अद्यतन और वर्तमान स्थिति के अनुरूप रखने के लिए हम दस्तावेजों को सावधानीपूर्वक संभालते हैं।",
        "signing-authority": "कंपनी को बाध्य करने के लिए निदेशकों की शर्तों और अधिकार को संशोधित करने की सेवा, जोखिमों को रोकने और प्रबंधन चपलता बढ़ाने के लिए स्पष्ट रूप से शर्तों को परिभाषित करना।",
        "shareholders": "शेयरधारकों की सूची (BOJ.5) को संशोधित करने के लिए सेवा, जिसमें शेयर हस्तांतरण, अनुपात में परिवर्तन या नियमों के अनुसार शेयरधारक जानकारी को अपडेट करना शामिल है।",
        "capital": "पंजीकृत पूंजी को बढ़ाने या घटाने के लिए पंजीकरण सेवा। हम व्यवसाय विस्तार या पुनर्गठन को समायोजित करने के लिए प्रक्रियाओं और सहायक दस्तावेजों का सावधानीपूर्वक प्रबंधन करते हैं।",
        "address": "प्रधान कार्यालय को स्थानांतरित करने या शाखाओं को जोड़ने/हटाने के लिए पंजीकरण सेवा। हम डीबीडी, राजस्व विभाग और सामाजिक सुरक्षा कार्यालय को एक ही स्थान पर बदलाव की अधिसूचना प्रबंधित करते हैं।",
        "objectives": "कॉर्पोरेट उद्देश्यों को संशोधित करने या जोड़ने के लिए पंजीकरण सेवा, नई सेवाओं और उत्पादों को कानूनी रूप से समायोजित करने के लिए व्यवसाय के दायरे का विस्तार करना।",
        "dissolution": "कॉर्पोरेट विघटन और परिसमापन पंजीकरण सेवा। हम विघटन की अधिसूचना और कर निकासी से लेकर अंतिम वित्तीय समापन तक हर कदम को संभालते हैं, जिससे आप अपना व्यवसाय पूरी तरह से और चिंता मुक्त होकर बंद कर सकते हैं।"
    },
    ta: {
        "company-name": "உங்கள் புதிய வணிகப் பிம்பத்தை ஆதரிப்பதற்காக அனைத்து அரசு நிறுவனங்களுடனான ஆவணங்களை துல்லியமாகவும் முழுமையாகவும் மாற்றுவதை உள்ளடக்கிய நிறுவனத்தின் பெயர் மாற்றப் பதிவுச் சேவை.",
        "company-seal": "பல்வேறு பரிவர்த்தனைகளில் பாதுகாப்பையும் கண்டிப்பையும் உறுதி செய்வதற்காக நிறுவனத்தின் முத்திரையை சட்டப்பூர்வமாக மாற்றுவதற்கான அல்லது திருத்துவதற்கான பதிவுச் சேவை.",
        "directors": "இயக்குநரின் தகவல்களைச் சேர்க்க, நீக்க அல்லது மாற்ற பதிவுச் சேவை. தற்போதைய நிலைக்கு ஏற்ப மேலாண்மை கட்டமைப்பைப் புதுப்பித்த நிலையில் வைத்திருக்க ஆவணங்களை நாங்கள் கவனமாகக் கையாளுகிறோம்.",
        "signing-authority": "அபாயங்களைத் தடுக்கவும், நிர்வாகச் சுறுசுறுப்பை அதிகரிக்கவும் நிபந்தனைகளைத் தெளிவாக வரையறுத்து, நிறுவனத்தைக் கட்டுப்படுத்தும் இயக்குநர்களின் நிபந்தனைகளையும் அதிகாரத்தையும் திருத்துவதற்கான சேவை.",
        "shareholders": "பங்குதாரர்களின் பட்டியலை (BOJ.5) திருத்துவதற்கான சேவை, இதில் பங்கு பரிமாற்றங்கள், விகித மாற்றங்கள் அல்லது விதிமுறைகளின்படி பங்குதாரர் தகவல்களைப் புதுப்பித்தல் ஆகியவை அடங்கும்.",
        "capital": "பதிவுசெய்யப்பட்ட மூலதனத்தை அதிகரிப்பதற்கான அல்லது குறைப்பதற்கான பதிவுச் சேவை. வணிக விரிவாக்கம் அல்லது மறுசீரமைப்பிற்கு இடமளிக்கும் வகையில் நடைமுறைகள் மற்றும் துணை ஆவணங்களை நாங்கள் கவனமாக நிர்வகிக்கிறோம்.",
        "address": "தலைமை அலுவலகத்தை மாற்றுவதற்கு அல்லது கிளைகளைச் சேர்ப்பதற்கு/நீக்குவதற்கான பதிவுச் சேவை. DBD, வருவாய்த் துறை மற்றும் சமூக பாதுகாப்பு அலுவலகம் ஆகியவற்றுக்கு மாற்றங்களை அறிவிப்பதை ஒரே இடத்தில் நாங்கள் நிர்வகிக்கிறோம்.",
        "objectives": "புதிய சேவைகளுக்கும் தயாரிப்புகளுக்கும் சட்டப்பூர்வமாக இடமளிக்கும் வகையில் வணிக நோக்கங்களை விரிவுபடுத்த நிறுவன நோக்கங்களைத் திருத்துவதற்கான அல்லது சேர்ப்பதற்கான பதிவுச் சேவை.",
        "dissolution": "நிறுவனக் கலைப்பு மற்றும் கலைப்பு பதிவுச் சேவை. கலைப்பு அறிவிப்பு மற்றும் வரிச் சுமையைத் தீர்ப்பதில் இருந்து இறுதி நிதிக் கணக்கை முடிப்பது வரையிலான ஒவ்வொரு படியையும் நாங்கள் கையாளுகிறோம், இதனால் நீங்கள் கவலையின்றி வணிகத்தை முழுமையாக முடிக்க முடியும்."
    }
};



const files = fs.readdirSync('src/messages').filter(f => f.endsWith('.json'));

files.forEach(file => {
    const locale = file.replace('.json', '');
    if (!summaryUpdates[locale]) return;

    const filePath = `src/messages/${file}`;
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    let modified = false;

    const updates = summaryUpdates[locale];

    if (data.services && data.services.items) {
        for (const [key, newSummary] of Object.entries(updates)) {
            if (data.services.items[key] && data.services.items[key].summary !== newSummary) {
                data.services.items[key].summary = newSummary;
                modified = true;
            }
        }
    }

    if (modified) {
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n');
        console.log(`✅ Updated corporate-change summaries for: ${file}`);
    } else {
        console.log(`⏩ No changes needed for: ${file}`);
    }
});
