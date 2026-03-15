/**
 * Translate promotion items for European languages (de, fr, it, nl).
 * Run: node translate-promotions-items-eu.js
 */
const fs = require('fs');
const path = require('path');
const MESSAGES_DIR = path.join(__dirname, 'src', 'messages');

// Read EN items as template
const enJson = JSON.parse(fs.readFileSync(path.join(MESSAGES_DIR, 'en.json'), 'utf-8'));
const enItems = enJson.promotions.items;

const TRANSLATIONS = {
  de: {
    meta: { title: "Virintira | Aktionen", description: "Entdecken Sie unsere besten Angebote und wertgeladenen Pakete." },
    overrides: {
      "company-registration-deal": {
        title: "Gründung einer Gesellschaft mit beschränkter Haftung",
        price: "Ab 9.900 THB", originalPrice: "Ab 12.900",
        shortInfo: ["Behördengebühren inklusive — keine Zusatzkosten","Keine Pflicht für monatliche Buchhaltungsverträge","Online-Identitätsprüfung — kein Reisen erforderlich","Gratis! Beratung und vollständige Dokumentenvorbereitung","Gratis! Kompletter Satz Firmenurkunden (DBD)","Gratis! Firmenstempel mit Selbstfärbung (1 Stück)","Gratis! Unterlagen für die Eröffnung eines Geschäftskontos","Gratis! DBD-e-Filing-Passwortregistrierung","Gratis! Finanzamt-Passwortregistrierung","Gratis! Visitenkarten für Quittungen/Steuerrechnungen","Gratis! Steuer-Technikkurs (Wert 5.900 THB)"],
        pricingTiers: [{name:"Nur thailändische Gesellschafter",price:"9.900",originalPrice:"12.900"},{name:"Ausländische Gesellschafter bis 49%",price:"12.900",originalPrice:"15.900"},{name:"100% ausländisch gehalten",price:"15.900",originalPrice:"18.900"},{name:"Juristische Personen als Gesellschafter",price:"19.900",originalPrice:"22.900"}],
        benefits: ["<b>Ein Preis, alles inklusive! Behördengebühren enthalten</b> Das transparenteste Angebot — der Aktionspreis deckt alle Registrierungsgebühren beim DBD ab (Stammkapital bis 5 Mio. THB). Keine versteckten Kosten.","<b>Wahlfreiheit — kein Pflichtbuchhaltungsvertrag</b> Wir sind von unserer Servicequalität überzeugt und verlangen keine langfristigen Verträge.","<b>Höchster Komfort mit Online-Identitätsprüfung (e-KYC)</b> Keine Reise zur Unterschrift nötig. Verifizierung über ThaID-App, DBD e-Service-App oder E-Mail-Link.","<b>Gratis! Expertenberatung und Dokumentenerstellung</b> Von der Planung bis zum Abschluss — ein kompletter End-to-End-Service.","<b>Gratis! Business-Starterpaket</b>\n• Firmenurkunden-Set (DBD)\n• Firmenstempel (1 Stück, Design inklusive)\n• Kontoeröffnungsunterlagen\n• DBD & Finanzamt-Passwortregistrierung\n• Visitenkarten und Vorlagen","<b>Exklusiv! Steuertechnikkurs (Wert 5.900 THB)</b> Grundlegendes Steuer- und Buchhaltungswissen für sicheres Wirtschaften und maximale Steuerersparnis."],
        conditions: "• Gebühren für Stammkapital bis 5 Mio. THB inklusive.\n• Darüber hinaus 3.000 THB pro Million.\n• Elektronische Registrierung über DBD Biz Regist.\n• Online-Verifizierung über ThaID, DBD e-Service oder E-Mail-Link."
      },
      "partnership-registration-deal": {
        title: "Gründung einer Kommanditgesellschaft",
        price: "Ab 5.900 THB", originalPrice: "Ab 8.900",
        shortInfo: ["Behördengebühren inklusive","Keine Pflichtverträge","Online-Identitätsprüfung","Gratis! Beratung & Dokumentenvorbereitung","Gratis! Partnerschaftsurkunden (DBD)","Gratis! Firmenstempel (1 Stück)","Gratis! Kontoeröffnungsunterlagen","Gratis! DBD-Passwortregistrierung","Gratis! Finanzamt-Passwortregistrierung","Gratis! Visitenkarten","Gratis! Steuerkurs (5.900 THB Wert)"],
        pricingTiers: [{name:"Nur thailändische Partner",price:"5.900",originalPrice:"8.900"},{name:"Ausländische Partner bis 49%",price:"8.900",originalPrice:"11.900"}],
        benefits: ["<b>Ein Preis, alles inklusive!</b> KG-Registrierungsgebühren enthalten (bis 5 Mio. THB).","<b>Wahlfreiheit</b> Keine Pflichtverträge.","<b>Online-Verifizierung (e-KYC)</b>","<b>Gratis! Beratung & Dokumente</b>","<b>Gratis! Starterpaket</b>\n• Partnerschaftsurkunden\n• Stempel (Design inklusive)\n• Kontoeröffnungsunterlagen\n• Passwortregistrierungen\n• Visitenkarten & Vorlagen","<b>Steuertechnikkurs (5.900 THB Wert)</b>"],
        conditions: "• Gebühren bis 5 Mio. THB Stammkapital inklusive.\n• Darüber 3.000 THB/Million.\n• Elektronische Registrierung."
      },
      "commercial-shop-registration-deal": {
        title: "Gewerbeanmeldung",
        price: "Ab 3.500 THB", originalPrice: "Ab 5.500",
        shortInfo: ["Behördengebühren inklusive","Online- und Ladengeschäft abgedeckt","Wir übernehmen alle Behördengänge","Schnelle Gewerberegistrierungsbescheinigung","Vertrauenswürdigkeit für Online-Shops","Sofort nutzbar für Kredite und Kontoeröffnung"],
        pricingTiers: [],
        benefits: ["<b>Alles inklusive! Behördengebühren enthalten</b>","<b>Online- und Ladengeschäft</b>","<b>Ohne Aufwand</b> Wir erledigen alles.","<b>Schnelle Bescheinigung</b>","<b>Vertrauen aufbauen</b>","<b>Geschäftserweiterung</b>"],
        conditions: "Standardtarife für Bangkok. Außerhalb ggf. Zuschläge."
      },
      "monthly-bookkeeping-and-tax-bundle": {
        title: "Monatliches Buchhaltungs- und Steuerpaket",
        price: "Ab 1.500 THB/Monat", originalPrice: "Ab 2.500/Monat",
        shortInfo: ["Vollständige standardkonforme Buchführung","Fristgerechte Steuererklärungen","Monatliche Finanzberichtsübersicht"],
        pricingTiers: [{name:"Größe S\n(Bis 50 Belege/Monat)",price:"2.500",originalPrice:"3.500"},{name:"Größe M\n(Bis 70 Belege/Monat)",price:"3.000",originalPrice:"4.000"},{name:"Größe L\n(Bis 100 Belege/Monat)",price:"3.500",originalPrice:"4.500"},{name:"Größe XL\n(Über 100 Belege/Monat)",price:"Auf Anfrage"},{name:"Leermeldung\n(Pro Berichtstyp)",price:"500",originalPrice:"700"}],
        benefits: ["Einnahmen-/Ausgabenbuchführung","Steuererklärungs-Erstellung und -Einreichung","Sozialversicherungsbeiträge","Kostenlose Beratung während der Vertragslaufzeit"],
        conditions: "Preise nach Belegmenge, Branche und Komplexität."
      },
      "individual-tax-clearing": {
        title: "Einkommensteuererklärung für Privatpersonen",
        price: "Ab 2.500 THB", originalPrice: "Ab 4.500",
        shortInfo: ["Abzüge maximieren","Steuerschulden klären","Fristgerechte Abgabe","Dokumentenmanagement","Steuerplanung","Beratung zur Firmengründung"],
        pricingTiers: [],
        benefits: ["<b>Maximale Steuerabzüge</b>","<b>Dokumentenmanagement</b>","<b>Professionelle Steuerschuldenklärung</b>","<b>Vertretung beim Finanzamt</b>","<b>Fristgerechte Abgabe — immer pünktlich</b>","<b>Wachstumsberatung</b>"],
        conditions: "Gebühren nach Komplexität und Belegmenge. Reisekosten zum Finanzamt nicht enthalten."
      },
      "close-financial-deal": {
        title: "Jahresabschluss",
        price: "Ab 9.900 THB", originalPrice: "Ab 12.900",
        shortInfo: ["CPA-geprüfter Jahresabschluss","100% gesetzeskonform","PND.50 und e-Filing"],
        pricingTiers: [],
        benefits: ["Jahresabschlussprüfung und -zertifizierung","Körperschaftsteuererklärung (PND.50)","DBD e-Filing Einreichung","Aktionärsliste und SBCh.3"],
        conditions: "Prüfungsgebühren nach Unternehmensgröße und Komplexität."
      }
    }
  },
  fr: {
    meta: { title: "Virintira | Promotions", description: "Les meilleures offres et forfaits avantageux pour lancer votre entreprise." },
    overrides: {
      "company-registration-deal": {
        title: "Enregistrement de société à responsabilité limitée",
        price: "À partir de 9 900 THB", originalPrice: "À partir de 12 900",
        shortInfo: ["Frais gouvernementaux inclus","Pas d'obligation de contrat de comptabilité","Vérification d'identité en ligne","Gratuit ! Consultation et préparation de documents","Gratuit ! Certificats de société complets (DBD)","Gratuit ! Tampon automatique (1 pièce)","Gratuit ! Documents pour ouverture de compte","Gratuit ! Inscription mot de passe DBD","Gratuit ! Inscription mot de passe fiscal","Gratuit ! Cartes pour factures/reçus","Gratuit ! Formation fiscale (valeur 5 900 THB)"],
        pricingTiers: [{name:"Actionnaires thaïlandais uniquement",price:"9 900",originalPrice:"12 900"},{name:"Actionnaire(s) étranger(s) ≤ 49%",price:"12 900",originalPrice:"15 900"},{name:"100% détenu par des étrangers",price:"15 900",originalPrice:"18 900"},{name:"Actionnaire(s) personne morale",price:"19 900",originalPrice:"22 900"}],
        benefits: ["<b>Un prix tout compris ! Frais gouvernementaux inclus</b>","<b>Liberté de choix — pas de contrat obligatoire</b>","<b>Vérification d'identité en ligne (e-KYC)</b>","<b>Gratuit ! Consultation et préparation complète</b>","<b>Gratuit ! Kit de démarrage complet</b>","<b>Exclusif ! Formation fiscale (5 900 THB)</b>"],
        conditions: "• Capital ≤ 5M THB inclus. Au-delà : 3 000 THB/million.\n• Inscription électronique via DBD Biz Regist."
      },
      "partnership-registration-deal": {
        title: "Enregistrement de société en commandite",
        price: "À partir de 5 900 THB", originalPrice: "À partir de 8 900",
        shortInfo: ["Frais gouvernementaux inclus","Pas de contrat obligatoire","Vérification en ligne","Gratuit ! Consultation complète","Gratuit ! Certificats (DBD)","Gratuit ! Tampon (1 pièce)","Gratuit ! Documents bancaires","Gratuit ! Inscription DBD","Gratuit ! Inscription fiscale","Gratuit ! Cartes de visite","Gratuit ! Formation fiscale (5 900 THB)"],
        pricingTiers: [{name:"Associés thaïlandais uniquement",price:"5 900",originalPrice:"8 900"},{name:"Associé(s) étranger(s) ≤ 49%",price:"8 900",originalPrice:"11 900"}],
        benefits: ["<b>Tout compris !</b>","<b>Pas de contrat obligatoire</b>","<b>Vérification en ligne</b>","<b>Consultation gratuite</b>","<b>Kit de démarrage gratuit</b>","<b>Formation fiscale exclusive</b>"],
        conditions: "• Capital ≤ 5M THB inclus. Au-delà : 3 000 THB/million."
      },
      "commercial-shop-registration-deal": {
        title: "Enregistrement de commerce",
        price: "À partir de 3 500 THB", originalPrice: "À partir de 5 500",
        shortInfo: ["Frais inclus","En ligne et physique","Nous gérons tout","Certificat rapide","Crédibilité 100%","Prêt pour prêts et comptes"],
        pricingTiers: [],
        benefits: ["<b>Tout compris !</b>","<b>En ligne et physique</b>","<b>Sans tracas</b>","<b>Certificat rapide</b>","<b>Crédibilité garantie</b>","<b>Expansion commerciale</b>"],
        conditions: "Tarifs Bangkok. Supplément possible hors zone."
      },
      "monthly-bookkeeping-and-tax-bundle": {
        title: "Forfait comptabilité et fiscalité mensuel",
        price: "À partir de 1 500 THB/mois", originalPrice: "À partir de 2 500/mois",
        shortInfo: ["Comptabilité complète et conforme","Déclarations fiscales dans les délais","Résumés financiers mensuels"],
        pricingTiers: [{name:"Taille S\n(≤ 50 documents/mois)",price:"2 500",originalPrice:"3 500"},{name:"Taille M\n(≤ 70 documents/mois)",price:"3 000",originalPrice:"4 000"},{name:"Taille L\n(≤ 100 documents/mois)",price:"3 500",originalPrice:"4 500"},{name:"Taille XL\n(> 100 documents/mois)",price:"Sur devis"},{name:"Déclaration vierge\n(Par type)",price:"500",originalPrice:"700"}],
        benefits: ["Comptabilité recettes/dépenses","Préparation et dépôt des déclarations","Cotisations sociales","Consultation gratuite pendant le contrat"],
        conditions: "Tarification selon volume, type et complexité."
      },
      "individual-tax-clearing": {
        title: "Déclaration d'impôt sur le revenu personnel",
        price: "À partir de 2 500 THB", originalPrice: "À partir de 4 500",
        shortInfo: ["Déductions maximisées","Résolution d'arriérés","Déclarations dans les délais","Gestion documentaire","Planification fiscale","Conseil en création d'entreprise"],
        pricingTiers: [],
        benefits: ["<b>Déductions maximales</b>","<b>Gestion documentaire</b>","<b>Résolution d'arriérés professionnelle</b>","<b>Représentation fiscale</b>","<b>Toujours dans les délais</b>","<b>Conseil pour la croissance</b>"],
        conditions: "Tarifs selon complexité. Frais de déplacement non inclus."
      },
      "close-financial-deal": {
        title: "Clôture annuelle des comptes",
        price: "À partir de 9 900 THB", originalPrice: "À partir de 12 900",
        shortInfo: ["Audit par expert-comptable (CPA)","100% conforme","PND.50 et e-Filing"],
        pricingTiers: [],
        benefits: ["Audit et certification annuels","Déclaration d'impôt société (PND.50)","Dépôt via DBD e-Filing","Registre des actionnaires"],
        conditions: "Frais selon taille et complexité de l'entreprise."
      }
    }
  },
  it: {
    meta: { title: "Virintira | Promozioni", description: "Le migliori offerte e pacchetti vantaggiosi per avviare la vostra attività." },
    overrides: {
      "company-registration-deal": { title: "Registrazione Società a Responsabilità Limitata", price: "Da 9.900 THB", originalPrice: "Da 12.900", shortInfo: ["Tasse governative incluse","Nessun obbligo contrattuale","Verifica identità online","Gratis! Consulenza e documenti","Gratis! Certificati società (DBD)","Gratis! Timbro aziendale","Gratis! Documenti apertura conto","Gratis! Registrazione password DBD","Gratis! Registrazione password fiscale","Gratis! Biglietti da visita","Gratis! Corso fiscale (5.900 THB)"], pricingTiers: [{name:"Solo azionisti thailandesi",price:"9.900",originalPrice:"12.900"},{name:"Azionista/i straniero/i ≤ 49%",price:"12.900",originalPrice:"15.900"},{name:"100% proprietà straniera",price:"15.900",originalPrice:"18.900"},{name:"Azionisti persona giuridica",price:"19.900",originalPrice:"22.900"}], benefits: ["<b>Prezzo tutto incluso!</b>","<b>Libertà di scelta</b>","<b>Verifica identità online (e-KYC)</b>","<b>Consulenza e documenti gratuiti</b>","<b>Kit di avvio gratuito</b>","<b>Corso fiscale esclusivo (5.900 THB)</b>"], conditions: "• Capitale ≤ 5M THB incluso. Oltre: 3.000 THB/milione." },
      "partnership-registration-deal": { title: "Registrazione Società in Accomandita", price: "Da 5.900 THB", originalPrice: "Da 8.900", shortInfo: ["Tasse incluse","Nessun obbligo","Verifica online","Consulenza gratuita","Certificati (DBD)","Timbro gratuito","Documenti bancari","Registrazione DBD","Registrazione fiscale","Biglietti da visita","Corso fiscale (5.900 THB)"], pricingTiers: [{name:"Solo soci thailandesi",price:"5.900",originalPrice:"8.900"},{name:"Socio/i straniero/i ≤ 49%",price:"8.900",originalPrice:"11.900"}], benefits: ["<b>Tutto incluso!</b>","<b>Nessun obbligo contrattuale</b>","<b>Verifica online</b>","<b>Consulenza gratuita</b>","<b>Kit di avvio</b>","<b>Corso fiscale</b>"], conditions: "• Capitale ≤ 5M THB incluso." },
      "commercial-shop-registration-deal": { title: "Registrazione Attività Commerciale", price: "Da 3.500 THB", originalPrice: "Da 5.500", shortInfo: ["Tasse incluse","Online e fisico","Gestiamo tutto","Certificato rapido","Credibilità 100%","Pronto per prestiti"], pricingTiers: [], benefits: ["<b>Tutto incluso!</b>","<b>Online e fisico</b>","<b>Senza problemi</b>","<b>Certificato rapido</b>","<b>Credibilità garantita</b>","<b>Espansione commerciale</b>"], conditions: "Tariffe Bangkok. Possibile supplemento fuori zona." },
      "monthly-bookkeeping-and-tax-bundle": { title: "Pacchetto Contabilità e Fiscalità Mensile", price: "Da 1.500 THB/mese", originalPrice: "Da 2.500/mese", shortInfo: ["Contabilità completa e conforme","Dichiarazioni fiscali puntuali","Report finanziari mensili"], pricingTiers: [{name:"Taglia S\n(≤ 50 documenti/mese)",price:"2.500",originalPrice:"3.500"},{name:"Taglia M\n(≤ 70 documenti/mese)",price:"3.000",originalPrice:"4.000"},{name:"Taglia L\n(≤ 100 documenti/mese)",price:"3.500",originalPrice:"4.500"},{name:"Taglia XL\n(> 100 documenti/mese)",price:"Su preventivo"},{name:"Report vuoto\n(Per tipo)",price:"500",originalPrice:"700"}], benefits: ["Contabilità entrate/uscite","Preparazione e invio dichiarazioni","Contributi previdenziali","Consulenza gratuita durante il contratto"], conditions: "Prezzi in base a volume, tipo e complessità." },
      "individual-tax-clearing": { title: "Dichiarazione Imposta sul Reddito Personale", price: "Da 2.500 THB", originalPrice: "Da 4.500", shortInfo: ["Deduzioni massimizzate","Risoluzione arretrati","Dichiarazioni puntuali","Gestione documentale","Pianificazione fiscale","Consulenza costituzione società"], pricingTiers: [], benefits: ["<b>Deduzioni massime</b>","<b>Gestione documentale</b>","<b>Risoluzione arretrati</b>","<b>Rappresentanza fiscale</b>","<b>Sempre puntuali</b>","<b>Consulenza crescita</b>"], conditions: "Tariffe secondo complessità. Spese di viaggio escluse." },
      "close-financial-deal": { title: "Chiusura Bilancio Annuale", price: "Da 9.900 THB", originalPrice: "Da 12.900", shortInfo: ["Revisione da CPA","100% conforme","PND.50 e e-Filing"], pricingTiers: [], benefits: ["Revisione e certificazione annuale","Dichiarazione imposte società (PND.50)","Invio via DBD e-Filing","Registro azionisti"], conditions: "Tariffe secondo dimensione e complessità." }
    }
  },
  nl: {
    meta: { title: "Virintira | Aanbiedingen", description: "De beste deals en voordelige pakketten voor uw bedrijfsstart." },
    overrides: {
      "company-registration-deal": { title: "Registratie Besloten Vennootschap", price: "Vanaf 9.900 THB", originalPrice: "Vanaf 12.900", shortInfo: ["Overheidskosten inbegrepen","Geen verplicht boekhoudcontract","Online identiteitsverificatie","Gratis! Advies en documentvoorbereiding","Gratis! Bedrijfscertificaten (DBD)","Gratis! Bedrijfsstempel (1 stuk)","Gratis! Documenten voor bankrekening","Gratis! DBD e-Filing registratie","Gratis! Belastingdienst registratie","Gratis! Visitekaartjes","Gratis! Belastingcursus (5.900 THB)"], pricingTiers: [{name:"Alleen Thaise aandeelhouders",price:"9.900",originalPrice:"12.900"},{name:"Buitenlandse aandeelhouder(s) ≤ 49%",price:"12.900",originalPrice:"15.900"},{name:"100% buitenlands eigendom",price:"15.900",originalPrice:"18.900"},{name:"Rechtspersoon als aandeelhouder",price:"19.900",originalPrice:"22.900"}], benefits: ["<b>Alles inbegrepen!</b>","<b>Vrije keuze</b>","<b>Online verificatie (e-KYC)</b>","<b>Gratis advies en documenten</b>","<b>Gratis starterspakket</b>","<b>Exclusieve belastingcursus (5.900 THB)</b>"], conditions: "• Kapitaal ≤ 5M THB inbegrepen. Daarboven: 3.000 THB/miljoen." },
      "partnership-registration-deal": { title: "Registratie Commanditaire Vennootschap", price: "Vanaf 5.900 THB", originalPrice: "Vanaf 8.900", shortInfo: ["Overheidskosten inbegrepen","Geen verplicht contract","Online verificatie","Gratis! Advies","Gratis! CV-certificaten","Gratis! Stempel","Gratis! Bankdocumenten","Gratis! DBD registratie","Gratis! Belastingregistratie","Gratis! Visitekaartjes","Gratis! Belastingcursus (5.900 THB)"], pricingTiers: [{name:"Alleen Thaise partners",price:"5.900",originalPrice:"8.900"},{name:"Buitenlandse partner(s) ≤ 49%",price:"8.900",originalPrice:"11.900"}], benefits: ["<b>Alles inbegrepen!</b>","<b>Vrije keuze</b>","<b>Online verificatie</b>","<b>Gratis advies</b>","<b>Gratis starterspakket</b>","<b>Belastingcursus</b>"], conditions: "• Kapitaal ≤ 5M THB inbegrepen." },
      "commercial-shop-registration-deal": { title: "Registratie Commercieel Bedrijf", price: "Vanaf 3.500 THB", originalPrice: "Vanaf 5.500", shortInfo: ["Kosten inbegrepen","Online en fysiek","Wij regelen alles","Snel certificaat","100% betrouwbaar","Direct te gebruiken"], pricingTiers: [], benefits: ["<b>Alles inbegrepen!</b>","<b>Online en fysiek</b>","<b>Zonder gedoe</b>","<b>Snel certificaat</b>","<b>Betrouwbaarheid</b>","<b>Bedrijfsuitbreiding</b>"], conditions: "Standaardtarieven Bangkok. Buiten Bangkok mogelijk toeslag." },
      "monthly-bookkeeping-and-tax-bundle": { title: "Maandelijks Boekhouding & Belasting Pakket", price: "Vanaf 1.500 THB/maand", originalPrice: "Vanaf 2.500/maand", shortInfo: ["Volledige conforme boekhouding","Tijdige belastingaangiften","Maandelijkse financiële overzichten"], pricingTiers: [{name:"S\n(≤ 50 documenten/maand)",price:"2.500",originalPrice:"3.500"},{name:"M\n(≤ 70 documenten/maand)",price:"3.000",originalPrice:"4.000"},{name:"L\n(≤ 100 documenten/maand)",price:"3.500",originalPrice:"4.500"},{name:"XL\n(> 100 documenten/maand)",price:"Op aanvraag"},{name:"Blanco rapport\n(Per type)",price:"500",originalPrice:"700"}], benefits: ["Inkomsten-/uitgavenboekhouding","Belastingaangiften opstellen en indienen","Sociale premies","Gratis advies tijdens contractperiode"], conditions: "Prijzen op basis van volume en complexiteit." },
      "individual-tax-clearing": { title: "Aangifte Inkomstenbelasting", price: "Vanaf 2.500 THB", originalPrice: "Vanaf 4.500", shortInfo: ["Aftrekposten maximaliseren","Belastingschulden oplossen","Tijdige aangifte","Documentbeheer","Belastingplanning","Advies over rechtsvorm"], pricingTiers: [], benefits: ["<b>Maximale aftrekposten</b>","<b>Documentbeheer</b>","<b>Professionele schuldoplossing</b>","<b>Vertegenwoordiging</b>","<b>Altijd op tijd</b>","<b>Groeiadvies</b>"], conditions: "Tarieven op basis van complexiteit. Reiskosten niet inbegrepen." },
      "close-financial-deal": { title: "Jaarlijkse Jaarafsluiting", price: "Vanaf 9.900 THB", originalPrice: "Vanaf 12.900", shortInfo: ["CPA-controle","100% wettelijk conform","PND.50 en e-Filing"], pricingTiers: [], benefits: ["Jaarlijkse controle en certificering","Vennootschapsbelastingaangifte (PND.50)","DBD e-Filing indiening","Aandeelhoudersregister"], conditions: "Controletarieven op basis van bedrijfsomvang." }
    }
  }
};

// Apply translations using EN structure as base
for (const [locale, { meta, overrides }] of Object.entries(TRANSLATIONS)) {
  const filePath = path.join(MESSAGES_DIR, `${locale}.json`);
  if (!fs.existsSync(filePath)) continue;
  const json = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  
  // Build items from EN template + locale overrides
  const items = {};
  for (const [slug, enItem] of Object.entries(enItems)) {
    const override = overrides[slug] || {};
    items[slug] = {
      slug: enItem.slug,
      category: override.category || enItem.category,
      categoryId: enItem.categoryId,
      title: override.title || enItem.title,
      imagePlaceholder: enItem.imagePlaceholder,
      shortInfo: override.shortInfo || enItem.shortInfo,
      price: override.price || enItem.price,
      originalPrice: override.originalPrice || enItem.originalPrice,
      pricingTiers: override.pricingTiers !== undefined ? override.pricingTiers : enItem.pricingTiers,
      benefits: override.benefits || enItem.benefits,
      conditions: override.conditions || enItem.conditions,
    };
  }
  
  json.promotions.items = items;
  json.promotions.metadata = { ...meta, keywords: json.promotions.metadata?.keywords || [] };
  
  fs.writeFileSync(filePath, JSON.stringify(json, null, 2) + '\n', 'utf-8');
  console.log(`✅ ${locale}.json — all 6 promotion items translated`);
}

console.log('\nDone! European promotion items translated (de, fr, it, nl).');
