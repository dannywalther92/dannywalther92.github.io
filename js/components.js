/**
 * components.js – Gemeinsame Komponenten: Navigation & Footer
 * =============================================================
 * Diese Datei wird von ALLEN Seiten eingebunden.
 * Änderungen hier wirken sich automatisch auf die gesamte Website aus.
 *
 * Aufruf im HTML:
 *   <script src="js/components.js"></script>          (von root)
 *   <script src="../js/components.js"></script>       (von /pages/)
 *
 * Dann im <body>:
 *   <div id="site-nav"></div>
 *   <div id="site-footer"></div>
 */

(function () {

  /* ─── Pfad-Erkennung ──────────────────────────────────────────────
   * Ermittelt automatisch, ob wir uns auf Root- oder Unterseiten-Ebene
   * befinden, um relative Pfade korrekt zu setzen.
   * ---------------------------------------------------------------- */
  const isSubpage = window.location.pathname.includes("/pages/");
  const root      = isSubpage ? "../"  : "";
  const pagesDir  = isSubpage ? ""     : "pages/";

  /* ─── Navigationsdaten ────────────────────────────────────────────
   * Hier alle Menüpunkte pflegen – einmalig für die gesamte Website.
   * ---------------------------------------------------------------- */
  const NAV_ITEMS = [
    { label: "Startseite", href: `${root}index.html` },
    {
      label: "Über uns",
      dropdown: [
        { label: "Projektteam",       href: `${root}${pagesDir}team.html` },
        { label: "Projektpartner",    href: `${root}${pagesDir}partner.html` },
        { label: "Projektträger",     href: `${root}${pagesDir}traeger.html` },
        { label: "Projektentwicklung",href: `${root}${pagesDir}entwicklung.html` }
      ]
    },
    {
      label: "Aktuelles",
      dropdown: [
        { label: "Blog",            href: `${root}${pagesDir}blog.html` },
        { label: "Veranstaltungen", href: `${root}${pagesDir}veranstaltungen.html` }
      ]
    },
    { label: "Kontakt", href: `${root}${pagesDir}kontakt.html` }
  ];

  /* ─── Footer-Links ────────────────────────────────────────────── */
  const FOOTER_LINKS = [
    { label: "Impressum",   href: `${root}${pagesDir}impressum.html` },
    { label: "Datenschutz", href: `${root}${pagesDir}datenschutz.html` },
    { label: "Kontakt",     href: `${root}${pagesDir}kontakt.html` }
  ];

  /* ─── Navigation rendern ──────────────────────────────────────── */
  function buildNav() {
    const el = document.getElementById("site-nav");
    if (!el) return;

    const items = NAV_ITEMS.map(item => {
      if (item.dropdown) {
        const links = item.dropdown
          .map(d => `<li><a href="${d.href}">${d.label}</a></li>`)
          .join("");
        return `
          <li class="nav-dropdown">
            <a href="#">${item.label}</a>
            <ul class="dropdown-menu">${links}</ul>
          </li>`;
      }
      return `<li><a href="${item.href}">${item.label}</a></li>`;
    }).join("");

    el.outerHTML = `
      <nav id="main-nav" role="navigation" aria-label="Hauptnavigation">
        <div class="nav-inner">
          <a href="${root}index.html" class="nav-logo">
            <img src="${root}img/logo_v1.png" alt="REKONKI Logo" />
            <span class="nav-logo-text">Projekt RekonKI</span>
          </a>
          <ul class="nav-links" id="nav-links">
            ${items}
          </ul>
          <button class="burger" id="burger" aria-label="Menü öffnen">
            <span></span><span></span><span></span>
          </button>
        </div>
      </nav>`;

    /* Burger-Menü reaktivieren (da Element neu erstellt wurde) */
    initBurger();
  }

  /* ─── Footer rendern ──────────────────────────────────────────── */
  function buildFooter() {
    const el = document.getElementById("site-footer");
    if (!el) return;

    const links = FOOTER_LINKS
      .map(l => `<li><a href="${l.href}">${l.label}</a></li>`)
      .join("");

    el.outerHTML = `
      <footer role="contentinfo">
        <div class="container">
          <div class="footer-bottom"
               style="border-top:1px solid rgba(217,204,196,0.12);
                      padding-top:2rem;
                      display:flex;
                      align-items:center;
                      justify-content:space-between;
                      flex-wrap:wrap;
                      gap:1rem;">
            <p class="footer-copy">
              &copy; ${new Date().getFullYear()} Projekt REKONKI. Alle Rechte vorbehalten.
            </p>
            <ul class="footer-links">${links}</ul>
          </div>
        </div>
      </footer>`;
  }

  /* ─── Burger-Menü-Logik ───────────────────────────────────────── */
  function initBurger() {
    const burger   = document.getElementById("burger");
    const navLinks = document.getElementById("nav-links");
    if (!burger || !navLinks) return;

    burger.addEventListener("click", () => {
      const open = navLinks.classList.toggle("open");
      burger.setAttribute("aria-label", open ? "Menü schließen" : "Menü öffnen");
    });
  }

  /* ─── Init: sobald DOM bereit ist ────────────────────────────── */
  document.addEventListener("DOMContentLoaded", () => {
    buildNav();
    buildFooter();
  });

})();
