// Shared UX behaviors used across pages (safe to include site-wide).
(function () {
  const isEnglish =
    (document.documentElement.lang || "").toLowerCase().startsWith("en") ||
    /-en\.html$/i.test(window.location.pathname);

  const LABEL_OPEN = isEnglish ? "Open menu" : "Ouvrir le menu";
  const LABEL_CLOSE = isEnglish ? "Close menu" : "Fermer le menu";

  function setYear() {
    const year = document.getElementById("year");
    if (year) year.textContent = String(new Date().getFullYear());
  }

  function initMobileMenu() {
    const btn = document.getElementById("menuBtn");
    const menu = document.getElementById("mobileMenu");
    if (!btn || !menu) return;

    btn.setAttribute("aria-controls", "mobileMenu");

    const iconPath = btn.querySelector("path");
    const iconBurger = iconPath ? iconPath.getAttribute("d") : null;
    const iconClose = "M6 18L18 6M6 6l12 12";

    let overlay = document.getElementById("mobileMenuOverlay");
    if (!overlay) {
      overlay = document.createElement("div");
      overlay.id = "mobileMenuOverlay";
      overlay.className = "mobile-menu-overlay hidden";
      overlay.setAttribute("aria-hidden", "true");
      document.body.appendChild(overlay);
    }

    function setOpen(open) {
      const willOpen = Boolean(open);

      menu.classList.toggle("hidden", !willOpen);
      overlay.classList.toggle("hidden", !willOpen);
      document.body.classList.toggle("menu-open", willOpen);

      btn.setAttribute("aria-expanded", willOpen ? "true" : "false");
      btn.setAttribute("aria-label", willOpen ? LABEL_CLOSE : LABEL_OPEN);
      menu.setAttribute("aria-hidden", willOpen ? "false" : "true");

      if (iconPath && iconBurger) {
        iconPath.setAttribute("d", willOpen ? iconClose : iconBurger);
      }

      if (willOpen) {
        menu.classList.remove("mobile-menu-enter");
        // Restart animation
        void menu.offsetWidth;
        menu.classList.add("mobile-menu-enter");
        const firstLink = menu.querySelector("[data-mobile-link]");
        if (firstLink && typeof firstLink.focus === "function") firstLink.focus();
      }
    }

    function isOpen() {
      return !menu.classList.contains("hidden");
    }

    btn.addEventListener("click", () => setOpen(!isOpen()));
    overlay.addEventListener("click", () => setOpen(false));

    menu.querySelectorAll("[data-mobile-link]").forEach((link) => {
      link.addEventListener("click", () => setOpen(false));
    });

    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape") setOpen(false);
    });

    const mq = window.matchMedia("(min-width: 768px)");
    const onChange = (e) => {
      if (e.matches) setOpen(false);
    };
    if (typeof mq.addEventListener === "function") mq.addEventListener("change", onChange);
    else if (typeof mq.addListener === "function") mq.addListener(onChange);

    // Ensure initial ARIA state is consistent.
    setOpen(false);
  }

  document.addEventListener("DOMContentLoaded", () => {
    setYear();
    initMobileMenu();
  });
})();

