/**
 * partners.js – Zentrale Datenquelle für alle Projektpartner
 * ============================================================
 * Hier werden Partner EINMALIG gepflegt.
 * index.html und pages/partner.html lesen dieselbe Datei.
 */

const PARTNERS = [
  {
    name: "Technische Universität Bergakademie Freiberg",
    type: "Wissenschaft",
    logo: "/img/logo_tubaf.svg",
    url: "https://tu-freiberg.de/",
    short: `Die TU Bergakademie Freiberg setzt sich in Lehre und Forschung 
            mit den Grundlagen und den Prozessen rund um Rohstoffe, Energie 
            und Material an der kompletten Wertschöpfungskette auseinander. 
            Rohstoffe werden erkundet und gewonnen, zu Materialien veredelt, 
            zu Werkstoffen verarbeitet und als Sekundärrohstoffe recycelt.`,
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
    name: "pons asini LINKE, DÄHNE & PARTNER RESTAURATOREN",
    type: "Restaurierung",
    logo: "/img/logo_pons.png",
    url: "https://pons-asini.de/",
    short: `pons asini bezieht in das Arbeitsspektrum weit mehr als nur 
            Denkmale ein. Gerade aus dem Umgang mit historischer Substanz 
            resultiert eine gezielte Problemanalyse für jeden Einzelfall.`,
    description: `pons asini bezieht in das Arbeitsspektrum weit mehr als nur 
            Denkmale ein. Gerade aus dem Umgang mit historischer Substanz 
            resultiert eine gezielte Problemanalyse, welche auch und gerade 
            auf den normalen Sanierungsfall angewendet werden muss. 
            Nur bei genauer Kenntnis der Umstände jedes Einzelfalles lässt sich die 
            angestrebte Nachhaltigkeit einer Sanierung tatsächlich erreichen – aus 
            konstruktiver, funktioneller, betriebstechnischer und finanzieller Sicht.`
  },
  {
    name: "Staatliche Kunstsammlungen Dresden",
    type: "Kultur & Museen",
    logo: "/img/log_skd.png",
    url: "https://www.skd.museum/",
    short: `Die Staatlichen Kunstsammlungen Dresden sind ein Museumsverbund von
            internationaler Strahlkraft und vereinen insgesamt 15 Museen mit 
            einer thematischen Vielfalt, die in ihrer Art international einzigartig ist.`,
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
    logo: "/img/logo_hreut.svg",
    url: "https://www.reutlingen-university.de/",
    short: `Die Hochschule Reutlingen – rund 5.000 Studierende aus über 80 Ländern, 
            sechs Fakultäten und mehr als 49 Studiengänge in einem 
            breitgefächerten Spektrum.`,
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
    logo: "/img/logo_titv.png",
    url: "https://www.titv-greiz.de/de/",
    short: `Das TITV Greiz ist eine wirtschaftsnahe Forschungseinrichtung. 
            Über 60 Mitarbeiter mit interdisziplinären Kompetenzen arbeiten 
            an High-Tech-Lösungen auf Basis klassischer Textiltechnologie.`,
    description: `Das TITV Greiz ist eine wirtschaftsnahe Forschungseinrichtung in der
            Rechtsform eines eingetragenen Vereins. Die Mitglieder des Vereins sind 
            Personen aus Wissenschaft und Wirtschaft. Über 60 Mitarbeiter mit 
            interdisziplinären Kompetenzen arbeiten an High-Tech-Lösungen, 
            bei denen die klassische Textiltechnologie Basis für neue Materialien, 
            smarte Produkte und Prozesse ist.`
  },
  {
    name: "Netzwerk Südwestsachsen Digital e. V.",
    type: "Netzwerk & Transfer",
    logo: "/img/logo_sws.png",
    url: "https://www.sws-digital.de/",
    short: `Ziel des gemeinnützigen Vereins ist der Aufbau eines 
            Kooperationsnetzwerkes zur Unterstützung von Unternehmen 
            bei der Gestaltung der Digitalisierung in der Region Südwestsachsen.`,
    description: `Das Ziel des gemeinnützigen Vereins Südwestsachsen Digital e.V. ist 
            der Aufbau eines Kooperationsnetzwerkes, um Unternehmen bei der 
            erfolgreichen Gestaltung der Digitalisierung zu unterstützen. 
            Das Kooperationsnetzwerk soll Teil einer verbesserten wirtschaftsnahen 
            Infrastruktur sein, um in der Region Südwestsachsen Wachstum, 
            Wettbewerbsfähigkeit und Lebensstandard zu sichern und zu steigern 
            und so zur Zukunftsfähigkeit der Region beizutragen.`
  }
];

/* ─── Render-Funktionen ───────────────────────────────────────────── */

/**
 * renderPartnerList(containerId)
 * Kompakte Partnerliste für index.html
 */
function renderPartnerList(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = PARTNERS.map(p => `
    <li class="partner-item reveal">
      <div class="partner-logo-cell">
        <a href="${p.url}" target="_blank" rel="noopener noreferrer"
           aria-label="Zur Webseite: ${p.name}">
          <img
            src="${p.logo}"
            alt="Logo ${p.name}"
            style="max-width:120px; max-height:90px; object-fit:contain;"
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
 * renderPartnerDetails(containerId)
 * Ausführliche Detailansicht für pages/partner.html
 */
function renderPartnerDetails(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = PARTNERS.map(p => `
    <article class="partner-detail reveal">
      <div>
        <div class="partner-logo-box">
          <a href="${p.url}" target="_blank" rel="noopener noreferrer"
             aria-label="Zur Webseite: ${p.name}">
            <img
              src="${p.logo}"
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
