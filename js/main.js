// ── BURGER / MOBILE NAV ──────────────────────────────────────────────────
const burger = document.getElementById('burger');
const navLinks = document.getElementById('nav-links');
const dropdowns = document.querySelectorAll('.nav-dropdown');

if (burger && navLinks) {
  burger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });
}

// Mobile: tap dropdown to expand
dropdowns.forEach(dd => {
  const link = dd.querySelector('a');
  link.addEventListener('click', e => {
    if (window.innerWidth <= 768) {
      e.preventDefault();
      dd.classList.toggle('open');
    }
  });
});

// Close nav when clicking outside
document.addEventListener('click', e => {
  if (!e.target.closest('#main-nav')) {
    navLinks?.classList.remove('open');
    dropdowns.forEach(d => d.classList.remove('open'));
  }
});


// ── CAROUSEL ─────────────────────────────────────────────────────────────
const track = document.getElementById('carousel-track');
const dots = document.querySelectorAll('.dot');
const prevBtn = document.getElementById('carousel-prev');
const nextBtn = document.getElementById('carousel-next');

let current = 0;
let autoTimer;
const TOTAL = 3;
const AUTO_DELAY = 5000;

function goTo(index) {
  current = (index + TOTAL) % TOTAL;
  if (track) track.style.transform = `translateX(-${current * 100}%)`;
  dots.forEach((d, i) => d.classList.toggle('active', i === current));
}

function autoplay() {
  clearInterval(autoTimer);
  autoTimer = setInterval(() => goTo(current + 1), AUTO_DELAY);
}

if (track) {
  prevBtn?.addEventListener('click', () => { goTo(current - 1); autoplay(); });
  nextBtn?.addEventListener('click', () => { goTo(current + 1); autoplay(); });
  dots.forEach((d, i) => d.addEventListener('click', () => { goTo(i); autoplay(); }));

  // Touch swipe
  let startX = 0;
  track.addEventListener('touchstart', e => startX = e.touches[0].clientX, { passive: true });
  track.addEventListener('touchend', e => {
    const diff = startX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) { goTo(current + (diff > 0 ? 1 : -1)); autoplay(); }
  });

  goTo(0);
  autoplay();
}


// ── SCROLL REVEAL ─────────────────────────────────────────────────────────
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver(entries => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // Stagger based on position in NodeList
      const delay = Array.from(reveals).indexOf(entry.target) % 3 * 100;
      setTimeout(() => entry.target.classList.add('visible'), delay);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

reveals.forEach(el => observer.observe(el));
