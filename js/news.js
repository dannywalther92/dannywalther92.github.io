/**
 * news.js – Zentrale Datenquelle für alle News-/Blogbeiträge
 * ============================================================
 * Hier werden Beiträge EINMALIG gepflegt.
 * index.html (Teaser-Kacheln) und pages/blog.html (vollständige Liste)
 * lesen dieselbe Datei.
 *
 * Einbinden NACH news.js, VOR components.js:
 *   <script src="/js/news.js"></script>
 *   <script src="/js/components.js"></script>
 *
 * Reihenfolge im Array = Sortierung neueste zuerst.
 */

const NEWS = [
  {
    slug: "projekttreffen-pillnitz",
    tag: "Veranstaltung",
    title: "Projekttreffen am 26.05.2026 am Designcampus Pillnitz",
    date: "26. Mai 2026",
    dateISO: "2026-05-26",
    image: "/pic/pic_gruppe.jpg",
    alt: "Gruppenfoto der Projektpartner",
    teaser: `Am 26.05.2026 trafen sich die Projektpartner im Beisein des Projektträgers
             im Wasserpalais des Schlosses Pillnitz. Es war das erste persönliche
             Kennenlernen aller Projektbeteiligten in perfekter Atmosphäre.`,
    body: [
      `Am 26.05.2026 trafen sich die Projektpartner im Beisein des Projektträgers im
       Wasserpalais des Schlosses Pillnitz. Es war das erste persönliche Kennenlernen
       aller Projektbeteiligten in perfekter Atmosphäre.`,
      `Der Tag bot Raum für fachlichen Austausch, die Abstimmung der nächsten
       Arbeitsschritte und den Aufbau eines persönlichen Netzwerks zwischen
       Wissenschaft, Restaurierung und Technologiepartnern.`
    ]
  },
  {
    slug: "anforderungen-projektpartner",
    tag: "Forschung",
    title: "Anwendungsszenarien und Anforderungsdefinitionen werden identifiziert",
    date: "15. April 2026",
    dateISO: "2026-04-15",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&q=70",
    alt: "Analyse von Forschungsdaten am Computer",
    teaser: `Im intensiven Austausch der Projektteilnehmer werden die Prozesse aufgenommen.
             Der nächste Schritt ist die Erarbeitung der Anforderungen von den Projektpartnern.`,
    body: [
      `Im intensiven Austausch der Projektteilnehmer werden die Prozesse aufgenommen.
       Der nächste Schritt ist die Erarbeitung der Anforderungen von den Projektpartnern.`,
      `Auf Basis der gesammelten Anwendungsszenarien aus Wissenschaft, Restaurierung und
       Denkmalpflege entsteht ein gemeinsames Lastenheft, das als Grundlage für die
       technische Konzeption des KI-Assistenzsystems dient.`
    ]
  },
  {
    slug: "offizieller-projektstart",
    tag: "Projektstart",
    title: "Offizieller Projektbeginn 01.01.2026: Die RekonKI-Partner starten in das Projekt",
    date: "05. Januar 2026",
    dateISO: "2026-01-05",
    image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=900&q=70",
    alt: "Projektteam beim Kickoff-Meeting",
    teaser: `Nach intensiver Vorbereitungsphase ist das Projekt offiziell gestartet.
             Das Team lernt sich am 03.02.2026 innerhalb eines Workshops kennen und
             erarbeitet die Projektplanung.`,
    body: [
      `Nach intensiver Vorbereitungsphase ist das Projekt offiziell gestartet. Das Team
       lernt sich am 03.02.2026 innerhalb eines Workshops kennen und erarbeitet die
       Projektplanung gemeinsam.`,
      `Im Mittelpunkt des Kickoffs standen die Vorstellung aller Projektpartner, die
       Klärung der Zuständigkeiten sowie ein erster Zeitplan für die kommenden
       Arbeitspakete.`
    ]
  }
];

/* ─── Sortierung ──────────────────────────────────────────────────── */

/**
 * getSortedNews()
 * Gibt alle Beiträge zurück, neueste zuerst (nach dateISO).
 * Die Reihenfolge im NEWS-Array oben spielt dadurch keine Rolle mehr –
 * neue Artikel können an beliebiger Stelle ergänzt werden.
 */
function getSortedNews() {
  return [...NEWS].sort((a, b) => new Date(b.dateISO) - new Date(a.dateISO));
}

/* ─── Render-Funktionen ───────────────────────────────────────────── */

/**
 * renderNewsTeaser(containerId, count)
 * Kompakte Teaser-Kacheln für index.html (News-Feed-Sektion).
 * Zeigt immer die `count` aktuellsten Beiträge, neuestes Datum zuerst.
 * Verlinkt auf den jeweiligen Beitrag in pages/blog.html.
 */
function renderNewsTeaser(containerId, count = 3) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = getSortedNews().slice(0, count).map(n => `
    <a href="/pages/blog.html#post-${n.slug}" class="news-card reveal" aria-label="Blogartikel: ${n.title}">
      <img
        class="news-card-img"
        src="${n.image}"
        alt="${n.alt}"
        loading="lazy"
      />
      <div class="news-card-body">
        <span class="news-tag">${n.tag}</span>
        <h3>${n.title}</h3>
        <p>${n.teaser}</p>
        <p class="news-date">${n.date}</p>
      </div>
    </a>
  `).join("");
}

/**
 * renderNewsList(containerId)
 * Vollständige Beitragsliste für pages/blog.html.
 */
function renderNewsList(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = getSortedNews().map(n => `
    <article class="blog-post reveal" id="post-${n.slug}">
      <img src="${n.image}" alt="${n.alt}" loading="lazy" />
      <div class="blog-post-body">
        <span class="news-tag">${n.tag}</span>
        <p class="news-date" style="margin:0.5rem 0;">${n.date}</p>
        <h2>${n.title}</h2>
        ${n.body.map(p => `<p>${p}</p>`).join("")}
      </div>
    </article>
  `).join("");
}

/**
 * renderNewsTags(containerId)
 * Dynamische Tag-Cloud (Sidebar) aus allen vorhandenen Kategorien.
 */
function renderNewsTags(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const tags = [...new Set(NEWS.map(n => n.tag))];
  container.innerHTML = tags.map(t => `<span class="tag">${t}</span>`).join("");
}
