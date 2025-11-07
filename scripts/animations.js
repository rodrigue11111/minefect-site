// scripts/animations.js

// Reveal on scroll (stagger)
(() => {
  const els = document.querySelectorAll("[data-reveal]");
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.style.animationDelay = (e.target.dataset.delay || "0s");
        e.target.classList.add("animate-fadeInUp");
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.15 });

  els.forEach((el, i) => {
    if (!el.dataset.delay) el.dataset.delay = `${i * 0.06}s`;
    io.observe(el);
  });
})();

// Parallax (hero images / banners)
(() => {
  const layers = document.querySelectorAll("[data-parallax]");
  function onScroll() {
    const y = window.scrollY;
    layers.forEach((el) => {
      const speed = parseFloat(el.dataset.speed || "0.25");
      el.style.transform = `translateY(${y * speed}px)`;
    });
  }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
})();

// Simple testimonials slider (if present)
(() => {
  const slides = document.getElementById("slides");
  if (!slides) return;
  const dots = document.querySelectorAll(".dot");
  let idx = 0;
  const go = (i) => {
    idx = i;
    slides.style.transform = `translateX(-${i * 100}%)`;
    dots.forEach((d) => d.classList.toggle("active", +d.dataset.dot === i));
  };
  dots.forEach((d) => d.addEventListener("click", () => go(+d.dataset.dot)));
  setInterval(() => go((idx + 1) % dots.length), 6000);
})();
