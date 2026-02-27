// Clean .html extension from URL for nicer paths
(function () {
  if (location.pathname.endsWith('.html') &&
      location.hostname !== 'localhost' &&
      location.hostname !== '127.0.0.1') {
    history.replaceState(null, '',
      location.pathname.replace('.html', '') + location.search + location.hash);
  }
})();

// Rewrite all internal .html hrefs → extension-less so navigation never shows .html
(function () {
  if (location.hostname === 'localhost' || location.hostname === '127.0.0.1') return;
  function rewriteLinks() {
    document.querySelectorAll('a[href]').forEach(function (a) {
      var h = a.getAttribute('href');
      if (h && /\.html(\?|#|$)/.test(h) && !/^(https?:)?\/\//.test(h)) {
        a.setAttribute('href', h.replace(/\.html(?=\?|#|$)/, ''));
      }
    });
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', rewriteLinks);
  } else {
    rewriteLinks();
  }
})();

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

  function normalizePath(pathname) {
    let path = pathname || "/";
    if (path.length > 1 && path.endsWith("/")) path = path.slice(0, -1);
    path = path.replace(/\.html$/i, "");
    if (path === "/index") return "/";
    return path || "/";
  }

  function initCurrentNav() {
    const currentPath = normalizePath(window.location.pathname);
    document.querySelectorAll('a[href]').forEach((link) => {
      const href = link.getAttribute("href");
      if (!href) return;
      if (href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:") || href.startsWith("javascript:")) {
        return;
      }

      let targetUrl;
      try {
        targetUrl = new URL(href, window.location.href);
      } catch (_e) {
        return;
      }
      if (targetUrl.origin !== window.location.origin) return;

      const targetPath = normalizePath(targetUrl.pathname);
      if (targetPath === currentPath) link.setAttribute("aria-current", "page");
      else link.removeAttribute("aria-current");
    });
  }

  function initMobileMenu() {
    const btn = document.getElementById("menuBtn");
    const menu = document.getElementById("mobileMenu");
    if (!btn || !menu) return;

    btn.setAttribute("aria-controls", "mobileMenu");

    const iconPath = btn.querySelector("path");
    const iconBurger = iconPath ? iconPath.getAttribute("d") : null;
    const iconClose = "M6 18L18 6M6 6l12 12";
    let lastFocusedEl = null;

    let overlay = document.getElementById("mobileMenuOverlay");
    if (!overlay) {
      overlay = document.createElement("div");
      overlay.id = "mobileMenuOverlay";
      overlay.className = "mobile-menu-overlay hidden";
      overlay.setAttribute("aria-hidden", "true");
      document.body.appendChild(overlay);
    }

    function getFocusableMenuItems() {
      return Array.from(menu.querySelectorAll('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])')).filter(
        (el) => !el.hasAttribute("disabled") && el.getAttribute("aria-hidden") !== "true"
      );
    }

    function setOpen(open) {
      const willOpen = Boolean(open);
      const wasOpen = isOpen();

      menu.classList.toggle("hidden", !willOpen);
      overlay.classList.toggle("hidden", !willOpen);
      document.body.classList.toggle("menu-open", willOpen);
      overlay.setAttribute("aria-hidden", willOpen ? "false" : "true");

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
      } else if (wasOpen) {
        const target = lastFocusedEl && typeof lastFocusedEl.focus === "function" ? lastFocusedEl : btn;
        target.focus();
      }
    }

    function isOpen() {
      return !menu.classList.contains("hidden");
    }

    btn.addEventListener("click", () => {
      lastFocusedEl = document.activeElement;
      setOpen(!isOpen());
    });
    overlay.addEventListener("click", () => setOpen(false));

    menu.querySelectorAll("[data-mobile-link]").forEach((link) => {
      link.addEventListener("click", () => setOpen(false));
    });

    window.addEventListener("keydown", (e) => {
      if (!isOpen()) return;

      if (e.key === "Escape") {
        e.preventDefault();
        setOpen(false);
        return;
      }

      if (e.key !== "Tab") return;

      const focusables = getFocusableMenuItems();
      if (focusables.length === 0) {
        e.preventDefault();
        btn.focus();
        return;
      }

      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const active = document.activeElement;

      if (e.shiftKey) {
        if (active === first || active === menu) {
          e.preventDefault();
          last.focus();
        }
      } else if (active === last) {
        e.preventDefault();
        first.focus();
      }
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
    initCurrentNav();
    initMobileMenu();
  });
})();
