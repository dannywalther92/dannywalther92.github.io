/**
 * partners.js – Zentrale Datenquelle für alle Projektpartner
 * ============================================================
 * Hier werden Partner EINMALIG gepflegt.
 * index.html und pages/partner.html lesen dieselbe Datei.
 *
 * Felder pro Partner:
 *   name        – Vollständiger Name der Institution
 *   type        – Kategorie (wird als Label angezeigt)
 *   logo        – Pfad zum Logo (relativ zur jeweiligen HTML-Seite)
 *   url         – Externe Website
 *   short       – Kurzbeschreibung (für index.html Partnerliste)
 *   description – Ausführliche Beschreibung (für partner.html Detailansicht)
 */

const PARTNERS = [
  {
    name: "Technische Universität Bergakademie Freiberg",
    type: "Wissenschaft",
    logo: { root: "img/logo_tubaf.svg", pages: "../img/logo_tubaf.svg" },
    url: "https://tu-freiberg.de/",
    short: `Die TU Bergakademie Freiberg setzt sich in Lehre und Forschung 
            mit den Grundlagen und Prozessen rund um Rohstoffe, Energie und Material 
            an der kompletten Wertschöpfungskette auseinander.`,
    description: `Die TU Bergakademie Freiberg setzt sich in Lehre und Forschung 
            mit den Grundlagen und den Prozessen rund um Rohstoffe, Energie 
            und Material an der kompletten Wertschöpfungskette auseinander. 
            Rohstoffe werden erkundet und gewonnen, zu Materialien veredelt, 
            zu Werkstoffen verarbeitet und als Sekundärrohstoffe recycelt. 
            Gerade aus dem Umgang mit historischer Substanz resultiert eine 
            gezielte Problemanalyse, welche auch und gerade auf den normalen 
            Sanierungsfall angewendet werden muss. Nur bei genauer Kenntnis 
            der Umstände jedes Einzelfalles lässt sich die angestrebte 
            Nachhaltigkeit einer Sanierung tatsächlich erreichen – aus 
            konstruktiver, funktioneller, betriebstechnischer und finanzieller Sicht.`
  },
  {
    name: "Staatliche Kunstsammlungen Dresden",
    type: "Kultur & Museen",
    logo: { root: "img/log_skd.png", pages: "../img/log_skd.png" },
    url: "https://www.skd.museum/",
    short: `Die Staatlichen Kunstsammlungen Dresden sind ein Museumsverbund 
            von internationaler Strahlkraft und vereinen insgesamt 15 Museen 
            mit einzigartiger thematischer Vielfalt.`,
    description: `Die Staatlichen Kunstsammlungen Dresden sind ein Museumsverbund von
            internationaler Strahlkraft und vereinen insgesamt 15 Museen. Zusammen 
            mit vier Institutionen repräsentiert er eine thematische Vielfalt, die 
            in ihrer Art international einzigartig ist. Im Rahmen von REKONKI 
            stellen die SKD umfangreiche historische Bilddaten und Archivmaterial 
            zur Verfügung, die als Trainingsdaten für die KI-gestützte 
            Rekonstruktion dienen.`
  },
  {
    name: "Hochschule Reutlingen",
    type: "Wissenschaft",
    logo: { root: "img/logo_hreut.svg", pages: "../img/logo_hreut.svg" },
    url: "https://www.reutlingen-university.de/",
    short: `Die Hochschule Reutlingen vereint rund 5.000 Studierende aus über 
            80 Ländern und bietet an sechs Fakultäten mehr als 49 Studiengänge 
            in einem breitgefächerten Spektrum.`,
    description: `Die Hochschule Reutlingen – das sind rund 5.000 Studierende aus über 
            80 Ländern. An unseren sechs Fakultäten ESB Business School, Informatik, 
            Life Sciences, NXT Nachhaltigkeit und Technologie, Technik und TEXOVERSUM 
            bieten wir in mehr als 49 Studiengängen ein breitgefächertes Studienangebot. 
            Im Projekt REKONKI bringt die Hochschule Reutlingen Expertise in den 
            Bereichen KI-Anwendungsentwicklung und digitale Bildverarbeitung ein.`
  },
  {
    name: "Textilforschungsinstitut Thüringen-Vogtland e.V.",
    type: "Forschung",
    logo: { root: "img/logo_titv.png", pages: "../img/logo_titv.png" },
    url: "https://www.titv-greiz.de/de/",
    short: `Das TITV Greiz ist eine wirtschaftsnahe Forschungseinrichtung. 
            Über 60 Mitarbeiter mit interdisziplinären Kompetenzen arbeiten 
            an High-Tech-Lösungen auf Basis klassischer Textiltechnologie.`,
    description: `Das TITV Greiz ist eine wirtschaftsnahe Forschungseinrichtung in der
            Rechtsform eines eingetragenen Vereins. Die Mitglieder des Vereins sind 
            Personen aus Wissenschaft und Wirtschaft. Über 60 Mitarbeiter mit 
            interdisziplinären Kompetenzen arbeiten an High-Tech-Lösungen, 
            bei denen die klassische Textiltechnologie Basis für neue Materialien, 
            smarte Produkte und Prozesse ist. Im Kontext von REKONKI liefert das 
            TITV materialwissenschaftliche Expertise für die Analyse historischer 
            Textilien und Dekorationen.`
  },
  {
    name: "Netzwerk Südwestsachsen Digital e. V.",
    type: "Netzwerk & Transfer",
    logo: { root: "img/logo_sws.png", pages: "../img/logo_sws.png" },
    url: "https://www.sws-digital.de/",
    short: `Ziel des gemeinnützigen Vereins Südwestsachsen Digital e.V. ist 
            der Aufbau eines Kooperationsnetzwerkes zur Unterstützung von 
            Unternehmen bei der Gestaltung der Digitalisierung.`,
    description: `Das Ziel des gemeinnützigen Vereins Südwestsachsen Digital e.V. ist 
            der Aufbau eines Kooperationsnetzwerkes, um Unternehmen bei der 
            erfolgreichen Gestaltung der Digitalisierung zu unterstützen. 
            Im Projekt REKONKI übernimmt der Verein Aufgaben im Bereich 
            Wissenstransfer, Vernetzung regionaler Akteure und Öffentlichkeitsarbeit, 
            um die Projektergebnisse in die Breite zu tragen.`
  },
  {
    name: "Malerei und Restaurierung Anja Tomaschewski",
    type: "Restaurierung",
    logo: { root: "img/logo_atoma.png", pages: "../img/logo_atoma.png" },
    url: "https://www.anja-tomaschewski.de/",
    short: `Mit handwerklichem Hintergrund klassischer Porzellanmalerei 
            restauriert und rekonstruiert Anja Tomaschewski seit 1999 
            Innenraumgestaltungen in Sachsen und international.`,
    description: `Mit dem handwerklichem Hintergrund klassischer Porzellanmalerei 
            an der Wiege des europäischen Porzellans in Meißen und großem 
            Interesse für klassische Raumgestaltungen restauriere und 
            rekonstruiere ich seit 1999 vor allem Innenraumgestaltungen 
            im Dresdener Elbland, ganz Sachsen aber auch deutschlandweit 
            und international (England, Ägypten). Die praxisnahe Restaurierungsexpertise 
            ist für REKONKI unverzichtbar, um KI-Ergebnisse handwerklich zu 
            validieren und in reale Restaurierungsprozesse zu übersetzen.`
  },
  {
    name: "pons asini LINKE, DÄHNE & PARTNER RESTAURATOREN",
    type: "Restaurierung",
    logo: { root: "img/logo_pons.png", pages: "../img/logo_pons.png" },
    url: "https://pons-asini.de/",
    short: `pons asini bezieht in das Arbeitsspektrum weit mehr als nur 
            Denkmale ein. Aus dem Umgang mit historischer Substanz resultiert 
            eine gezielte Problemanalyse für jeden Einzelfall.`,
    description: `pons asini bezieht in das Arbeitsspektrum weit mehr als nur 
            Denkmale ein. Gerade aus dem Umgang mit historischer Substanz 
            resultiert eine gezielte Problemanalyse, welche auch und gerade 
            auf den normalen Sanierungsfall angewendet werden muss. 
            Nur bei genauer Kenntnis der Umstände jedes Einzelfalles lässt sich die 
            angestrebte Nachhaltigkeit einer Sanierung tatsächlich erreichen – aus 
            konstruktiver, funktioneller, betriebstechnischer und finanzieller Sicht. 
            pons asini bringt diese praxiserprobte Herangehensweise in die 
            Qualitätssicherung der REKONKI-Ergebnisse ein.`
  }
];

/* ─── Render-Funktionen ───────────────────────────────────────────── */

/**
 * renderPartnerList(containerId, basePath)
 * Rendert die kompakte Partnerliste für index.html
 *
 * @param {string} containerId  – ID des <ul>-Elements im HTML
 * @param {string} basePath     – "root" (index.html) oder "pages" (Unterseiten)
 */
function renderPartnerList(containerId, basePath = "root") {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = PARTNERS.map(p => `
    <li class="partner-item reveal">
      <div class="partner-logo-cell">
        <a href="${p.url}" target="_blank" rel="noopener noreferrer"
           aria-label="Zur Webseite: ${p.name}">
          <img
            src="${p.logo[basePath]}"
            alt="Logo ${p.name}"
            style="max-width:120px; max-height:60px; object-fit:contain;"
          />
        </a>
      </div>
      <div class="partner-info">
        <h3>${p.name}</h3>
        <p>${p.short}</p>
      </div>
    </li>
  `).join("");
}

/**
 * renderPartnerDetails(containerId, basePath)
 * Rendert die ausführliche Detailansicht für pages/partner.html
 *
 * @param {string} containerId  – ID des <div>-Elements im HTML
 * @param {string} basePath     – "root" oder "pages"
 */
function renderPartnerDetails(containerId, basePath = "pages") {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = PARTNERS.map(p => `
    <article class="partner-detail reveal">
      <div>
        <div class="partner-logo-box">
          <a href="${p.url}" target="_blank" rel="noopener noreferrer"
             aria-label="Zur Webseite: ${p.name}">
            <img
              src="${p.logo[basePath]}"
              alt="Logo ${p.name}"
              style="max-width:160px; max-height:80px; object-fit:contain;"
            />
          </a>
        </div>
      </div>
      <div>
        <p class="partner-type">${p.type}</p>
        <h3>${p.name}</h3>
        <p>${p.description}</p>
      </div>
    </article>
  `).join("");
}
