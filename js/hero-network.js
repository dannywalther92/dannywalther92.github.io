// ── HERO: heilender Gewebefaden ─────────────────────────────────────────
// Symbolisiert die Kernidee des Projekts: ein einzelner, welliger Faden
// verläuft über die Hero-Breite und schwingt vertikal im mittleren
// Drittel der Hero-Höhe. Einzelne Stücke des Fadens sind gerissen
// ("missing"); sie fügen sich nacheinander farblich zusammen
// (Sand → Gold), bleiben eine Weile verbunden und reißen danach an
// anderer Stelle wieder auf – ein endloser Rekonstruktionszyklus.
// Läuft nur, solange der Hero sichtbar ist, und respektiert
// prefers-reduced-motion.

(() => {
  const canvas = document.getElementById('hero-network');
  if (!canvas) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const ctx = canvas.getContext('2d');
  const hero = canvas.closest('#hero');

  const SAND_RGB = [217, 204, 196];
  const GOLD_RGB = [233, 167, 83];

  const BAND_FRACTION = 1 / 3;   // Faden schwingt im mittleren Drittel der Höhe
  const MISSING_RATIO = 0.4;     // Anteil der Fadenstücke, die initial getrennt sind

  let width, height, dpr;
  let points = [];
  let links = [];
  let bandCenterY = 0;
  let bandAmp = 0;
  let running = false;
  let rafId = null;

  function lerp(a, b, t) {
    return a + (b - a) * t;
  }

  function mixColor(t) {
    const r = lerp(SAND_RGB[0], GOLD_RGB[0], t);
    const g = lerp(SAND_RGB[1], GOLD_RGB[1], t);
    const b = lerp(SAND_RGB[2], GOLD_RGB[2], t);
    return `rgb(${r | 0}, ${g | 0}, ${b | 0})`;
  }

  function resize() {
    dpr = window.devicePixelRatio || 1;
    width = hero.clientWidth;
    height = hero.clientHeight;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    seedThread();
  }

  function seedThread() {
    const count = Math.min(18, Math.max(9, Math.round(width / 90)));
    const marginX = width * 0.08;
    const usableW = width - marginX * 2;
    bandCenterY = height / 2;
    bandAmp = Math.min(height * BAND_FRACTION * 0.5 * 0.85, 70);

    points = [];
    for (let i = 0; i < count; i++) {
      points.push({
        homeX: marginX + (usableW * i) / (count - 1),
        x: 0,
        y: bandCenterY,
        phase: i * 0.55 + Math.random() * 0.4,
        ampScale: 0.75 + Math.random() * 0.3,
        speed: 0.85 + Math.random() * 0.3,
        jitterPhase: Math.random() * Math.PI * 2,
      });
    }
    buildLinks();
  }

  function buildLinks() {
    const now = performance.now();
    links = [];
    for (let i = 0; i < points.length - 1; i++) {
      const missing = Math.random() < MISSING_RATIO;
      links.push({
        a: i,
        b: i + 1,
        state: missing ? 'missing' : 'intact',
        progress: 0,
        healDuration: 1500 + Math.random() * 1000,
        settleDuration: 900 + Math.random() * 500,
        phaseStart: now,
        nextEventAt: now + (missing
          ? 400 + Math.random() * 9000
          : 7000 + Math.random() * 11000),
      });
    }
  }

  function updateLink(link, now) {
    switch (link.state) {
      case 'missing':
        if (now >= link.nextEventAt) {
          link.state = 'healing';
          link.phaseStart = now;
        }
        break;
      case 'healing':
        link.progress = Math.min(1, (now - link.phaseStart) / link.healDuration);
        if (link.progress >= 1) {
          link.state = 'settling';
          link.phaseStart = now;
          link.progress = 0;
        }
        break;
      case 'settling':
        link.progress = Math.min(1, (now - link.phaseStart) / link.settleDuration);
        if (link.progress >= 1) {
          link.state = 'intact';
          link.nextEventAt = now + 7000 + Math.random() * 11000;
        }
        break;
      case 'intact':
        if (now >= link.nextEventAt) {
          link.state = 'missing';
          link.nextEventAt = now + 400 + Math.random() * 6000;
        }
        break;
    }
  }

  function catmullRom(p0, p1, p2, p3) {
    return {
      cp1x: p1.x + (p2.x - p0.x) / 6,
      cp1y: p1.y + (p2.y - p0.y) / 6,
      cp2x: p2.x - (p3.x - p1.x) / 6,
      cp2y: p2.y - (p3.y - p1.y) / 6,
    };
  }

  function drawLink(link, index, total) {
    const p0 = points[Math.max(0, link.a - 1)];
    const p1 = points[link.a];
    const p2 = points[link.b];
    const p3 = points[Math.min(points.length - 1, link.b + 1)];
    const { cp1x, cp1y, cp2x, cp2y } = catmullRom(p0, p1, p2, p3);
    const taper = 1 - Math.min(1, Math.abs(index - (total - 1) / 2) / ((total - 1) / 2)) * 0.35;

    if (link.state === 'missing') {
      ctx.setLineDash([2, 5]);
      ctx.strokeStyle = 'rgba(217, 204, 196, 1)';
      ctx.globalAlpha = 0.06;
      ctx.lineWidth = 0.9 * taper;
      ctx.beginPath();
      ctx.moveTo(p1.x, p1.y);
      ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, p2.x, p2.y);
      ctx.stroke();
      ctx.setLineDash([]);
      return;
    }

    let energy = 0;
    if (link.state === 'healing') energy = link.progress;
    else if (link.state === 'settling') energy = 1 - link.progress;

    ctx.strokeStyle = mixColor(energy);
    ctx.globalAlpha = 0.22 + energy * 0.5;
    ctx.lineWidth = (1.3 + energy * 0.9) * taper;
    ctx.beginPath();
    ctx.moveTo(p1.x, p1.y);
    ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, p2.x, p2.y);
    ctx.stroke();

    if (link.state === 'healing') {
      const midX = (p1.x + p2.x) / 2;
      const midY = (p1.y + p2.y) / 2;
      ctx.globalAlpha = energy * 0.85;
      ctx.fillStyle = mixColor(1);
      ctx.beginPath();
      ctx.arc(midX, midY, 1.5 + energy * 2.5, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function step(now) {
    ctx.clearRect(0, 0, width, height);

    for (const p of points) {
      const wave = Math.sin(now * 0.00042 * p.speed + p.phase) * bandAmp * p.ampScale;
      const wobble = Math.sin(now * 0.0011 + p.jitterPhase) * bandAmp * 0.06;
      p.y = bandCenterY + wave + wobble;
      p.x = p.homeX + Math.sin(now * 0.00015 + p.jitterPhase) * 5;
    }

    const total = links.length;
    links.forEach((link, i) => {
      updateLink(link, now);
      drawLink(link, i, total);
    });
    ctx.globalAlpha = 1;

    if (running) rafId = requestAnimationFrame(step);
  }

  function start() {
    if (running) return;
    running = true;
    rafId = requestAnimationFrame(step);
  }

  function stop() {
    running = false;
    if (rafId) cancelAnimationFrame(rafId);
  }

  resize();

  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => (entry.isIntersecting ? start() : stop()));
  }, { threshold: 0 });
  io.observe(hero);

  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(resize, 200);
  });
})();
