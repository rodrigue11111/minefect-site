/**
 * MINEFECT — wow.js
 * Scroll progress bar · Back-to-top · Header compact · Scroll reveal · Animated counters
 */
(function () {

  /* ───────────────────────────────────────────────
     1. Scroll progress bar
  ─────────────────────────────────────────────── */
  function initProgressBar() {
    const bar = document.getElementById('scroll-progress');
    if (!bar) return;
    function update() {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.width = (total > 0 ? Math.min((window.scrollY / total) * 100, 100) : 0) + '%';
    }
    window.addEventListener('scroll', update, { passive: true });
    update();
  }

  /* ───────────────────────────────────────────────
     2. Back-to-top button
  ─────────────────────────────────────────────── */
  function initBackToTop() {
    const btn = document.getElementById('back-to-top');
    if (!btn) return;
    window.addEventListener('scroll', () => {
      btn.classList.toggle('visible', window.scrollY > 400);
    }, { passive: true });
    btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ───────────────────────────────────────────────
     3. Header compact on scroll
  ─────────────────────────────────────────────── */
  function initHeaderShrink() {
    const header = document.querySelector('header');
    if (!header) return;
    window.addEventListener('scroll', () => {
      header.classList.toggle('header-compact', window.scrollY > 80);
    }, { passive: true });
  }

  /* ───────────────────────────────────────────────
     4. Scroll reveal (Intersection Observer)
  ─────────────────────────────────────────────── */
  function initScrollReveal() {
    const els = document.querySelectorAll('[data-reveal]');
    if (!els.length || !window.IntersectionObserver) {
      // Fallback: just show everything
      els.forEach(el => el.classList.add('revealed'));
      return;
    }
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('revealed');
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    els.forEach(el => obs.observe(el));
  }

  /* ───────────────────────────────────────────────
     5. Animated counters
  ─────────────────────────────────────────────── */
  function animateCounter(el, target, duration) {
    const suffix = el.dataset.suffix || '';
    const prefix = el.dataset.prefix || '';
    let startTime = null;
    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = prefix + Math.round(eased * target) + suffix;
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  function initCounters() {
    const counters = document.querySelectorAll('[data-counter]');
    if (!counters.length || !window.IntersectionObserver) return;
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const target = parseInt(e.target.dataset.counter, 10);
          animateCounter(e.target, target, 1400);
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.5 });
    counters.forEach(el => obs.observe(el));
  }

  /* ───────────────────────────────────────────────
     Init
  ─────────────────────────────────────────────── */
  document.addEventListener('DOMContentLoaded', () => {
    initProgressBar();
    initBackToTop();
    initHeaderShrink();
    initScrollReveal();
    initCounters();
  });

})();
