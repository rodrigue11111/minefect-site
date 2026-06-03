/**
 * Restrained scroll/interaction polish — imported once in BaseLayout.
 * Scroll progress bar · header compaction · back-to-top · [data-reveal] fade-up · [data-counter].
 * No infinite at-rest animation; honors prefers-reduced-motion.
 */
function onReady(fn: () => void): void {
  if (document.readyState !== 'loading') fn();
  else document.addEventListener('DOMContentLoaded', fn);
}

onReady(() => {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Boot: flips the hero entrance sequence + one-time CTA shimmer after first paint.
  requestAnimationFrame(() => document.body.classList.add('loaded'));

  const progress = document.getElementById('scroll-progress');
  const toTop = document.getElementById('back-to-top');
  const header = document.querySelector<HTMLElement>('[data-site-header]');

  const onScroll = (): void => {
    const st = window.scrollY || document.documentElement.scrollTop;
    const h = document.documentElement.scrollHeight - window.innerHeight;
    if (progress) progress.style.width = h > 0 ? `${(st / h) * 100}%` : '0%';
    if (toTop) toTop.classList.toggle('visible', st > 400);
    if (header) header.classList.toggle('is-scrolled', st > 80);
    if (!reduced) document.documentElement.style.setProperty('--scroll', String(st / 600));
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
  toTop?.addEventListener('click', () =>
    window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' }),
  );

  // Scroll reveal
  const revealEls = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'));
  if (!('IntersectionObserver' in window)) {
    revealEls.forEach((el) => el.classList.add('revealed'));
  } else {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('revealed');
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 },
    );
    revealEls.forEach((el) => io.observe(el));
  }

  // Counters
  const counters = Array.from(document.querySelectorAll<HTMLElement>('[data-counter]'));
  const run = (el: HTMLElement): void => {
    const target = parseFloat(el.dataset.counter || '0');
    const prefix = el.dataset.prefix || '';
    const suffix = el.dataset.suffix || '';
    if (reduced) {
      el.textContent = `${prefix}${target}${suffix}`;
      return;
    }
    const dur = 1400;
    let start: number | null = null;
    const step = (ts: number): void => {
      if (start === null) start = ts;
      const p = Math.min((ts - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = `${prefix}${Math.floor(eased * target)}${suffix}`;
      if (p < 1) requestAnimationFrame(step);
      else el.textContent = `${prefix}${target}${suffix}`;
    };
    requestAnimationFrame(step);
  };
  if ('IntersectionObserver' in window) {
    const cio = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            run(e.target as HTMLElement);
            cio.unobserve(e.target);
          }
        });
      },
      { threshold: 0.5 },
    );
    counters.forEach((el) => cio.observe(el));
  } else {
    counters.forEach(run);
  }
});
