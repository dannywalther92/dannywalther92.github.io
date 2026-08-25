// ── HERO: animiertes Datenpunkte-Netzwerk ───────────────────────────────
// Symbolisiert die Vernetzung/Rekonstruktion von Datenpunkten im
// Hero-Hintergrund. Läuft nur, solange der Hero sichtbar ist, und
// respektiert prefers-reduced-motion.

(() => {
  const canvas = document.getElementById('hero-network');
  if (!canvas) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const ctx = canvas.getContext('2d');
  const hero = canvas.closest('#hero');

  const DOT_COLOR = 'rgba(233, 167, 83, 0.55)';   // --gold
  const LINE_COLOR = 'rgba(217, 204, 196, 0.12)';  // --sand
  const LINK_DIST = 140;
  const SPEED = 0.18;

  let width, height, dpr;
  let points = [];
  let running = false;
  let rafId = null;

  function pointCount() {
    const area = width * height;
    return Math.min(90, Math.max(28, Math.round(area / 18000)));
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
    seedPoints();
  }

  function seedPoints() {
    const count = pointCount();
    points = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * SPEED,
      vy: (Math.random() - 0.5) * SPEED,
      r: Math.random() * 1.4 + 0.6,
    }));
  }

  function step() {
    ctx.clearRect(0, 0, width, height);

    for (const p of points) {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > width) p.vx *= -1;
      if (p.y < 0 || p.y > height) p.vy *= -1;
    }

    for (let i = 0; i < points.length; i++) {
      for (let j = i + 1; j < points.length; j++) {
        const a = points[i], b = points[j];
        const dx = a.x - b.x, dy = a.y - b.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < LINK_DIST) {
          ctx.strokeStyle = LINE_COLOR;
          ctx.globalAlpha = 1 - dist / LINK_DIST;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
    }
    ctx.globalAlpha = 1;

    ctx.fillStyle = DOT_COLOR;
    for (const p of points) {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
    }

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
