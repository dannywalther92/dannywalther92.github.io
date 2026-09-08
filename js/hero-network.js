// ── HERO: heilendes Struktur-Gitter ─────────────────────────────────────
// Symbolisiert die Kernidee des Projekts: aus einer beschädigten Struktur
// (Molekülgitter / Gewebe) fehlen einzelne Verbindungen. Diese "Bindungen"
// heilen nacheinander farblich zu (Sand → Gold), bleiben eine Weile intakt
// und brechen danach an anderer Stelle wieder auf – ein endloser
// Rekonstruktionszyklus. Läuft nur, solange der Hero sichtbar ist, und
// respektiert prefers-reduced-motion.

(() => {
  const canvas = document.getElementById('hero-network');
  if (!canvas) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const ctx = canvas.getContext('2d');
  const hero = canvas.closest('#hero');

  const SAND_RGB = [217, 204, 196];
  const GOLD_RGB = [233, 167, 83];
  const DOT_COLOR = 'rgba(233, 167, 83, 0.5)';

  const MISSING_RATIO = 0.32;       // Anteil der Bindungen, die initial "beschädigt" sind
  const JITTER_FACTOR = 0.16;       // Unregelmäßigkeit der Gitterpositionen
  const WOBBLE_FACTOR = 0.22;       // Amplitude der leichten Eigenbewegung

  let width, height, dpr;
  let points = [];
  let edges = [];
  let gridSpacing = 0;
  let running = false;
  let rafId = null;

  function targetPointCount() {
    const area = width * height;
    return Math.min(90, Math.max(28, Math.round(area / 18000)));
  }

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
    seedGrid();
  }

  function seedGrid() {
    const desired = targetPointCount();
    gridSpacing = Math.sqrt((width * height) / (desired * 0.866));
    const spacingY = gridSpacing * 0.866;
    const jitter = gridSpacing * JITTER_FACTOR;

    points = [];
    let row = 0;
    for (let y = -spacingY / 2; y < height + spacingY; y += spacingY, row++) {
      const offsetX = row % 2 === 0 ? 0 : gridSpacing / 2;
      for (let x = -gridSpacing / 2 + offsetX; x < width + gridSpacing; x += gridSpacing) {
        const gx = x + (Math.random() - 0.5) * jitter;
        const gy = y + (Math.random() - 0.5) * jitter;
        points.push({
          gx, gy,
          x: gx, y: gy,
          phase: Math.random() * Math.PI * 2,
          speed: 0.25 + Math.random() * 0.2,
          amp: gridSpacing * WOBBLE_FACTOR * 0.5,
          r: Math.random() * 1.3 + 0.9,
        });
      }
    }
    buildEdges();
  }

  function buildEdges() {
    const now = performance.now();
    const threshold = gridSpacing * 1.05;
    edges = [];
    for (let i = 0; i < points.length; i++) {
      for (let j = i + 1; j < points.length; j++) {
        const dx = points[i].gx - points[j].gx;
        const dy = points[i].gy - points[j].gy;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < threshold) {
          const missing = Math.random() < MISSING_RATIO;
          edges.push({
            a: i,
            b: j,
            state: missing ? 'missing' : 'intact',
            progress: 0,
            healDuration: 1400 + Math.random() * 900,
            settleDuration: 900 + Math.random() * 500,
            phaseStart: now,
            nextEventAt: now + (missing
              ? 400 + Math.random() * 9000
              : 8000 + Math.random() * 12000),
          });
        }
      }
    }
  }

  function updateEdge(edge, now) {
    switch (edge.state) {
      case 'missing':
        if (now >= edge.nextEventAt) {
          edge.state = 'healing';
          edge.phaseStart = now;
        }
        break;
      case 'healing':
        edge.progress = Math.min(1, (now - edge.phaseStart) / edge.healDuration);
        if (edge.progress >= 1) {
          edge.state = 'settling';
          edge.phaseStart = now;
          edge.progress = 0;
        }
        break;
      case 'settling':
        edge.progress = Math.min(1, (now - edge.phaseStart) / edge.settleDuration);
        if (edge.progress >= 1) {
          edge.state = 'intact';
          edge.nextEventAt = now + 9000 + Math.random() * 12000;
        }
        break;
      case 'intact':
        if (now >= edge.nextEventAt) {
          edge.state = 'missing';
          edge.nextEventAt = now + 1500 + Math.random() * 5000;
        }
        break;
    }
  }

  function drawEdge(edge) {
    const a = points[edge.a];
    const b = points[edge.b];

    if (edge.state === 'missing') {
      ctx.setLineDash([2, 5]);
      ctx.strokeStyle = 'rgba(217, 204, 196, 1)';
      ctx.globalAlpha = 0.05;
      ctx.lineWidth = 0.75;
      ctx.beginPath();
      ctx.moveTo(a.x, a.y);
      ctx.lineTo(b.x, b.y);
      ctx.stroke();
      ctx.setLineDash([]);
      return;
    }

    let energy = 0;
    if (edge.state === 'healing') energy = edge.progress;
    else if (edge.state === 'settling') energy = 1 - edge.progress;

    ctx.strokeStyle = mixColor(energy);
    ctx.globalAlpha = 0.13 + energy * 0.45;
    ctx.lineWidth = 1 + energy * 0.6;
    ctx.beginPath();
    ctx.moveTo(a.x, a.y);
    ctx.lineTo(b.x, b.y);
    ctx.stroke();
  }

  function step(now) {
    ctx.clearRect(0, 0, width, height);

    for (const p of points) {
      p.x = p.gx + Math.cos(now * 0.0006 * p.speed + p.phase) * p.amp;
      p.y = p.gy + Math.sin(now * 0.0006 * p.speed * 1.3 + p.phase) * p.amp;
    }

    for (const edge of edges) {
      updateEdge(edge, now);
      drawEdge(edge);
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
