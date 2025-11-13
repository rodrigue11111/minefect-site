
// Mobile menu toggle
const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");
if(menuBtn){
  menuBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");
  });
}

// Simple fade animation
const revealEls = document.querySelectorAll("[data-reveal]");
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if(e.isIntersecting){
      e.target.classList.add("animate-fadeInUp");
      observer.unobserve(e.target);
    }
  });
}, {threshold: 0.2});
revealEls.forEach(el => observer.observe(el));
