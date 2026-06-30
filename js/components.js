/**
 * components.js – Gemeinsame Komponenten: Navigation & Footer
 * =============================================================
 * Einbinden auf ALLEN Seiten:
 *   <script src="/js/components.js"></script>
 *
 * Im <body> Platzhalter setzen:
 *   <div id="site-nav"></div>
 *   <div id="site-footer"></div>
 */

(function () {

  /* ─── Navigation ────────────────────────────────────────────────── */
  function buildNav() {
    const el = document.getElementById("site-nav");
    if (!el) return;

    el.outerHTML = `
      <nav id="main-nav" role="navigation" aria-label="Hauptnavigation">
        <div class="nav-inner">
          <a href="/index.html" class="nav-logo" aria-label="REKONKI Startseite">
            <img src="/img/logo_v1.png" alt="REKONKI Logo" />
            <span class="nav-logo-text">Projekt RekonKI</span>
          </a>
          <ul class="nav-links" id="nav-links">
            <li><a href="/index.html">Startseite</a></li>
            <li class="nav-dropdown">
              <a href="#">Über uns</a>
              <ul class="dropdown-menu">
                <li><a href="/pages/team.html">Projektteam</a></li>
                <li><a href="/pages/partner.html">Projektpartner</a></li>
                <li><a href="/pages/traeger.html">Projektträger</a></li>
                <li><a href="/pages/entwicklung.html">Projektentwicklung</a></li>
              </ul>
            </li>
            <li class="nav-dropdown">
              <a href="#">Aktuelles</a>
              <ul class="dropdown-menu">
                <li><a href="/pages/blog.html">Blog</a></li>
                <li><a href="/pages/veranstaltungen.html">Veranstaltungen</a></li>
              </ul>
            </li>
            <li><a href="/pages/kontakt.html">Kontakt</a></li>
          </ul>
          <button class="burger" id="burger" aria-label="Menü öffnen" aria-expanded="false">
            <span></span><span></span><span></span>
          </button>
        </div>
      </nav>`;

    initBurger();
  }

  /* ─── Footer ────────────────────────────────────────────────────── */
  function buildFooter() {
    const el = document.getElementById("site-footer");
    if (!el) return;

    el.outerHTML = `
      <footer role="contentinfo">
        <div class="container">
          <div class="footer-top">

            <!-- Brand -->
            <div class="footer-brand">
              <p class="footer-tagline">Projekt REKONKI</p>
              <img src="/img/logo_v1.png" alt="REKONKI Logo" />
              <p>KI-gestützte Rekonstruktion historischer Bauwerke und kulturellen Erbes. 
                 Vergangenheit digital erfahrbar machen.</p>
            </div>

            <!-- Gefördert durch -->
            <div class="footer-traeger">
              <p class="footer-traeger-label">Gefördert durch</p>
              <div class="footer-traeger-logo">
                <img src="/img/logo_bmftr.png"
                     alt="Logo Projektträger"
                     style="max-width:100%; max-height:100%; object-fit:contain;" />
              </div>
            </div>

            <!-- Quick Links -->
            <nav aria-label="Footer-Navigation">
              <p class="footer-tagline" style="margin-bottom:1rem;">Navigation</p>
              <ul style="list-style:none; display:flex; flex-direction:column; gap:0.5rem;">
                <li><a href="/index.html"              style="color:rgba(217,204,196,0.6); text-decoration:none; font-size:0.85rem;">Startseite</a></li>
                <li><a href="/pages/team.html"         style="color:rgba(217,204,196,0.6); text-decoration:none; font-size:0.85rem;">Projektteam</a></li>
                <li><a href="/pages/blog.html"         style="color:rgba(217,204,196,0.6); text-decoration:none; font-size:0.85rem;">Blog</a></li>
                <li><a href="/pages/veranstaltungen.html" style="color:rgba(217,204,196,0.6); text-decoration:none; font-size:0.85rem;">Veranstaltungen</a></li>
                <li><a href="/pages/kontakt.html"      style="color:rgba(217,204,196,0.6); text-decoration:none; font-size:0.85rem;">Kontakt</a></li>
              </ul>
            </nav>

          </div><!-- /footer-top -->

          <div class="footer-bottom">
            <p class="footer-copy">&copy; ${new Date().getFullYear()} Projekt REKONKI. Alle Rechte vorbehalten.</p>
            <ul class="footer-links">
              <li><a href="/pages/impressum.html">Impressum</a></li>
              <li><a href="/pages/datenschutz.html">Datenschutz</a></li>
              <li><a href="/pages/kontakt.html">Kontakt</a></li>
            </ul>
          </div>
        </div>
      </footer>`;
  }

  /* ─── Burger-Menü ───────────────────────────────────────────────── */
  function initBurger() {
    const burger   = document.getElementById("burger");
    const navLinks = document.getElementById("nav-links");
    if (!burger || !navLinks) return;

    burger.addEventListener("click", () => {
      const open = navLinks.classList.toggle("open");
      burger.setAttribute("aria-label", open ? "Menü schließen" : "Menü öffnen");
      burger.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  /* ─── Init ──────────────────────────────────────────────────────── */
  document.addEventListener("DOMContentLoaded", () => {
    renderPartnerList("partner-list");
    renderNewsTeaser("news-grid", 3);
    buildNav();
    buildFooter();
  });

})();
