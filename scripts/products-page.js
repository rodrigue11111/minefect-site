// Products page renderer — category → subcategory → product.
// Redesigned for premium UX: gradient-border cards, icons, animated CTAs, polished modal.
(function () {
  const root = document.getElementById("productsApp");
  if (!root) return;

  const catalog = window.MINEFECT_CATALOG || {};
  const categories = Array.isArray(catalog.CATEGORIES) ? catalog.CATEGORIES : [];

  const PLACEHOLDER_PRODUCT_IMAGE  = "assets/images/placeholders/product.png";
  const PLACEHOLDER_CATEGORY_IMAGE = "assets/images/placeholders/category.png";

  const isEnglish =
    (document.documentElement.lang || "").toLowerCase().startsWith("en") ||
    /-en\.html$/i.test(window.location.pathname);

  const T = isEnglish
    ? {
        products      : "Products",
        headerTitle   : "Products & Services",
        headerHint    : "Select a category to explore equipment, spare parts and services.",
        explore       : "Explore",
        viewProducts  : "View products",
        details       : "Details",
        requestQuote  : "Request a quote",
        close         : "Close",
        reference     : "Ref",
        emptySubcats  : "No subcategories listed yet — contact us for your specific needs.",
        emptyProducts : "No products listed for this subcategory.",
        countRefs     : (n) => `${n} reference${n !== 1 ? "s" : ""}`,
        catalogue     : "Catalogue",
        zoomHint      : "click to zoom",
      }
    : {
        products      : "Produits",
        headerTitle   : "Produits & Services",
        headerHint    : "Sélectionnez une catégorie pour explorer équipements, pièces et services.",
        explore       : "Explorer",
        viewProducts  : "Voir les produits",
        details       : "Détails",
        requestQuote  : "Demander un devis",
        close         : "Fermer",
        reference     : "Réf",
        emptySubcats  : "Aucune sous-catégorie listée — contactez-nous pour vos besoins spécifiques.",
        emptyProducts : "Aucun produit listé pour cette sous-catégorie.",
        countRefs     : (n) => `${n} référence${n > 1 ? "s" : ""}`,
        catalogue     : "Catalogue",
        zoomHint      : "cliquer pour agrandir",
      };

  const contactHref = isEnglish ? "contact-en.html" : "contact.html";

  /* ── DOM helper ──────────────────────────────────────────────── */
  function el(tag, attrs, children) {
    const node = document.createElement(tag);
    if (attrs) {
      Object.entries(attrs).forEach(([k, v]) => {
        if (v == null) return;
        if (k === "class")  node.className = v;
        else if (k === "html") node.innerHTML = v;
        else if (k.startsWith("on") && typeof v === "function")
          node.addEventListener(k.slice(2).toLowerCase(), v);
        else node.setAttribute(k, String(v));
      });
    }
    (children || []).forEach((child) => {
      if (child == null) return;
      node.appendChild(typeof child === "string" ? document.createTextNode(child) : child);
    });
    return node;
  }

  /* ── URL state ───────────────────────────────────────────────── */
  function getSearch() { return new URLSearchParams(window.location.search); }

  function setSearch(next) {
    const url = new URL(window.location.href);
    url.search = next.toString();
    window.history.pushState({}, "", url.toString());
    render();
  }

  function findCategory(id)          { return categories.find((c) => c.id === id) || null; }
  function findSubcategory(cat, id)  { return (cat?.subcategories || []).find((s) => s.id === id) || null; }

  /* ── SVG helpers ─────────────────────────────────────────────── */
  function chevronRight() {
    const s = el("span", { class: "text-slate-600 flex items-center shrink-0" });
    s.innerHTML = '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M9 18l6-6-6-6"/></svg>';
    return s;
  }

  function arrowSVG() {
    const s = el("span", { class: "flex items-center" });
    s.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>';
    return s;
  }

  /* ── Breadcrumb ──────────────────────────────────────────────── */
  function renderBreadcrumb(items) {
    const nav = el("nav", { class: "flex items-center flex-wrap gap-1.5 text-sm mb-8", "aria-label": "Breadcrumb" });
    items.forEach((it, idx) => {
      if (!it) return;
      if (idx > 0) nav.appendChild(chevronRight());
      const isLast = idx === items.length - 1;
      nav.appendChild(
        isLast
          ? el("span", { class: "text-slate-200 font-medium" }, [it.label])
          : el("button", {
              type: "button",
              class: "text-blue-400 hover:text-blue-300 hover:underline underline-offset-2 transition-colors",
              onclick: () => setSearch(it.params),
            }, [it.label])
      );
    });
    return nav;
  }

  /* ── Image zoom lightbox ─────────────────────────────────────── */
  function openImageZoom({ src, alt }) {
    const overlay = el("div", {
      class: "fixed inset-0 z-[60] bg-black/85 backdrop-blur-sm flex items-center justify-center p-4",
      role: "dialog", "aria-modal": "true",
    });
    const close = () => overlay.remove();
    overlay.addEventListener("click", (e) => { if (e.target === overlay) close(); });
    window.addEventListener("keydown", (e) => { if (e.key === "Escape") close(); }, { once: true });
    overlay.appendChild(el("img", {
      class: "max-w-full max-h-[88vh] object-contain rounded-2xl border border-slate-700 shadow-2xl",
      src: src || PLACEHOLDER_PRODUCT_IMAGE,
      alt: alt || "",
      onerror: (e) => { e.target.onerror = null; e.target.src = PLACEHOLDER_PRODUCT_IMAGE; },
    }));
    document.body.appendChild(overlay);
  }

  /* ── Product detail modal ────────────────────────────────────── */
  function openModal(product, category, subcategory) {
    const quoteParams = new URLSearchParams({ cat: category.id, sub: subcategory.id, prod: product.id });
    const quoteHref = `${contactHref}?${quoteParams}#quoteForm`;

    const overlay = el("div", {
      class: "fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm px-4 py-8",
      role: "dialog", "aria-modal": "true",
    });
    const close = () => overlay.remove();
    overlay.addEventListener("click", (e) => { if (e.target === overlay) close(); });
    window.addEventListener("keydown", (e) => { if (e.key === "Escape") close(); }, { once: true });

    /* Card shell — flex column, max height so it scrolls on mobile */
    const card = el("div", {
      class: "w-full max-w-2xl bg-[#020f2e] border border-slate-800/80 rounded-2xl shadow-2xl flex flex-col max-h-[92vh] overflow-hidden",
    });

    /* Header */
    card.appendChild(el("div", {
      class: "shrink-0 flex items-start justify-between gap-4 px-5 md:px-6 py-5 border-b border-slate-800 bg-slate-950/60",
    }, [
      el("div", { class: "flex-1 min-w-0" }, [
        el("p", { class: "text-blue-400/80 text-xs uppercase tracking-[0.14em] mb-1.5" }, [
          `${category.title} › ${subcategory.title}`,
        ]),
        el("h3", { class: "text-base md:text-lg font-semibold text-[#E5E7EB] leading-snug" }, [product.name_fr]),
        product.ref_original
          ? el("p", { class: "text-slate-500 text-xs mt-1" }, [`${T.reference}: ${product.ref_original}`])
          : null,
        product.unit
          ? el("div", { class: "mt-2.5" }, [
              el("span", { class: "text-xs px-2.5 py-1 rounded-full bg-slate-800 border border-slate-700 text-slate-300" }, [product.unit])
            ])
          : null,
      ]),
      el("button", {
        type: "button",
        class: "shrink-0 w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center text-lg leading-none transition",
        onclick: close, "aria-label": T.close,
      }, ["×"]),
    ]));

    /* Scrollable area */
    const scrollable = el("div", { class: "overflow-y-auto flex-1" });

    /* Product image with zoom */
    const imgArea = el("div", {
      class: "relative bg-slate-950 border-b border-slate-800 cursor-zoom-in group",
      onclick: () => openImageZoom({ src: product.image, alt: product.name_fr }),
    });
    imgArea.appendChild(el("img", {
      class: "w-full h-56 sm:h-72 md:h-80 object-contain p-4 transition-transform duration-300 group-hover:scale-[1.03]",
      src: product.image || PLACEHOLDER_PRODUCT_IMAGE,
      alt: product.name_fr,
      loading: "lazy",
      onerror: (e) => { e.target.onerror = null; e.target.src = PLACEHOLDER_PRODUCT_IMAGE; },
    }));
    const zoomHint = el("p", { class: "absolute bottom-2 right-3 text-slate-600 text-[10px] uppercase tracking-widest pointer-events-none" });
    zoomHint.textContent = T.zoomHint;
    imgArea.appendChild(zoomHint);
    scrollable.appendChild(imgArea);

    /* Description + actions */
    scrollable.appendChild(el("div", { class: "p-5 md:p-6" }, [
      el("p", { class: "text-slate-300 text-sm leading-relaxed mb-6" }, [product.description_fr]),
      el("div", { class: "flex flex-wrap gap-3" }, [
        el("a", {
          href: quoteHref,
          class: "btn-glow flex-1 min-w-[140px] inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl text-sm font-medium transition shadow-lg shadow-blue-900/30",
        }, [T.requestQuote]),
        el("button", {
          type: "button",
          class: "flex-1 min-w-[110px] inline-flex items-center justify-center border border-slate-700 hover:border-slate-500 text-slate-300 hover:text-white px-5 py-3 rounded-xl text-sm transition",
          onclick: close,
        }, [T.close]),
      ]),
    ]));

    card.appendChild(scrollable);
    overlay.appendChild(card);
    document.body.appendChild(overlay);
  }

  /* ── Category grid ───────────────────────────────────────────── */
  function renderCategoryGrid() {
    const grid = el("div", { class: "catalog-grid" });

    categories.forEach((cat) => {
      const params     = new URLSearchParams({ cat: cat.id });
      const totalRefs  = (cat.subcategories || []).reduce((acc, s) => acc + (s.products || []).length, 0);

      /* card-gradient-border handles the animated gradient border + dark bg */
      const card = el("div", {
        class: "card-gradient-border group overflow-hidden shadow-xl hover:-translate-y-2 hover:shadow-blue-900/20 hover:shadow-2xl transition-all duration-300 flex flex-col h-full",
      });

      /* Image with Ken-Burns on hover */
      card.appendChild(el("div", { class: "overflow-hidden" }, [
        el("img", {
          src: cat.image || PLACEHOLDER_CATEGORY_IMAGE,
          alt: cat.title,
          class: "w-full h-52 object-cover transition-transform duration-500 group-hover:scale-105",
          loading: "lazy",
          onerror: (e) => { e.target.onerror = null; e.target.src = PLACEHOLDER_CATEGORY_IMAGE; },
        }),
      ]));

      /* Body */
      const body = el("div", { class: "p-5 flex flex-col flex-1" });
      body.appendChild(el("h3", { class: "font-semibold text-[#E5E7EB] mb-2 leading-snug" }, [cat.title]));
      body.appendChild(el("p",  { class: "text-slate-400 text-sm leading-relaxed flex-1" }, [cat.description]));

      /* Reference count */
      if (totalRefs > 0) {
        body.appendChild(el("p", { class: "text-xs text-blue-400 mt-3" }, [T.countRefs(totalRefs)]));
      }

      /* CTA */
      const btn = el("button", {
        type: "button",
        class: "btn-glow mt-4 w-full inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-xl text-sm font-medium transition shadow-md shadow-blue-900/30",
        onclick: () => setSearch(params),
      }, [T.explore]);
      btn.appendChild(arrowSVG());
      body.appendChild(btn);

      card.appendChild(body);
      grid.appendChild(card);
    });

    return grid;
  }

  /* ── Subcategory grid ────────────────────────────────────────── */
  function renderSubcategoryGrid(category) {
    const subs = category.subcategories || [];
    if (subs.length === 0) {
      return el("div", {
        class: "py-12 text-center text-slate-400 text-sm bg-slate-900/40 rounded-2xl border border-slate-800",
      }, [T.emptySubcats]);
    }

    const grid = el("div", { class: "catalog-grid" });
    subs.forEach((sub) => {
      const params = new URLSearchParams({ cat: category.id, sub: sub.id });
      const count  = (sub.products || []).length;

      const card = el("div", {
        class: "card-gradient-border shadow-xl hover:-translate-y-2 hover:shadow-blue-900/20 hover:shadow-2xl transition-all duration-300 flex flex-col h-full",
      });

      const body = el("div", { class: "p-5 flex flex-col flex-1" });

      /* Icon */
      const icon = el("div", { class: "service-icon mb-4" });
      icon.innerHTML = '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>';
      body.appendChild(icon);

      body.appendChild(el("h3", { class: "font-semibold text-[#E5E7EB] mb-2" }, [sub.title]));
      body.appendChild(el("p",  { class: "text-slate-400 text-sm leading-relaxed flex-1" }, [
        sub.description || T.countRefs(count),
      ]));

      /* Count badge */
      body.appendChild(el("div", { class: "mt-3 mb-4" }, [
        el("span", { class: "text-xs text-blue-400 bg-blue-950/50 border border-blue-900/40 px-2.5 py-1 rounded-full" }, [
          T.countRefs(count),
        ]),
      ]));

      const btn = el("button", {
        type: "button",
        class: "btn-glow w-full inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-xl text-sm font-medium transition shadow-md shadow-blue-900/30",
        onclick: () => setSearch(params),
      }, [T.viewProducts]);
      btn.appendChild(arrowSVG());
      body.appendChild(btn);

      card.appendChild(body);
      grid.appendChild(card);
    });

    return grid;
  }

  /* ── Subcategory tab nav (when > 1 subcategory) ──────────────── */
  function renderSubcategoryNav(category, activeSubId) {
    const subs = category.subcategories || [];
    if (subs.length <= 1) return null;

    const wrap = el("div", { class: "flex flex-wrap gap-2 mb-8 pb-6 border-b border-slate-800/60" });
    subs.forEach((sub) => {
      const params   = new URLSearchParams({ cat: category.id, sub: sub.id });
      const isActive = sub.id === activeSubId;
      wrap.appendChild(el("button", {
        type: "button",
        class: (isActive
          ? "bg-blue-600 text-white border-blue-500 shadow-lg shadow-blue-900/30"
          : "bg-slate-900/60 text-slate-300 border-slate-700 hover:border-blue-500 hover:text-blue-300") +
          " border px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200",
        onclick: () => setSearch(params),
      }, [sub.title]));
    });
    return wrap;
  }

  /* ── Product grid ────────────────────────────────────────────── */
  function renderProductGrid(category, subcategory) {
    const products = subcategory.products || [];
    if (products.length === 0) {
      return el("div", {
        class: "py-12 text-center text-slate-400 text-sm bg-slate-900/40 rounded-2xl border border-slate-800",
      }, [T.emptyProducts]);
    }

    const grid = el("div", { class: "catalog-grid" });
    products.forEach((product) => {
      const quoteParams = new URLSearchParams({ cat: category.id, sub: subcategory.id, prod: product.id });
      const quoteHref   = `${contactHref}?${quoteParams}#quoteForm`;

      const card = el("div", {
        class: "card-gradient-border shadow-xl hover:-translate-y-2 hover:shadow-blue-900/20 hover:shadow-2xl transition-all duration-300 flex flex-col h-full overflow-hidden",
      });

      /* Product image */
      card.appendChild(el("div", { class: "overflow-hidden border-b border-slate-800/60 bg-slate-950" }, [
        el("img", {
          src: product.image || PLACEHOLDER_PRODUCT_IMAGE,
          alt: product.name_fr || "",
          class: "w-full h-44 md:h-48 object-contain p-3 transition-transform duration-500",
          loading: "lazy",
          onerror: (e) => { e.target.onerror = null; e.target.src = PLACEHOLDER_PRODUCT_IMAGE; },
        }),
      ]));

      const body = el("div", { class: "p-5 flex flex-col flex-1" });

      /* Name + unit badge */
      const nameRow = el("div", { class: "flex items-start justify-between gap-2 mb-1" });
      nameRow.appendChild(el("h3", { class: "font-semibold text-[#E5E7EB] leading-snug" }, [product.name_fr]));
      if (product.unit) {
        nameRow.appendChild(el("span", {
          class: "shrink-0 text-xs px-2 py-1 rounded-full bg-slate-800 border border-slate-700 text-slate-300",
        }, [product.unit]));
      }
      body.appendChild(nameRow);

      if (product.ref_original) {
        body.appendChild(el("p", { class: "text-slate-500 text-xs mb-3" }, [
          `${T.reference}: ${product.ref_original}`,
        ]));
      }

      body.appendChild(el("p", { class: "text-slate-400 text-sm leading-relaxed flex-1" }, [product.description_fr]));

      /* Action buttons */
      body.appendChild(el("div", { class: "mt-5 flex gap-2" }, [
        el("button", {
          type: "button",
          class: "flex-1 inline-flex items-center justify-center border border-slate-700 hover:border-blue-500 text-slate-300 hover:text-blue-300 px-3 py-2.5 rounded-xl text-sm transition-all duration-200",
          onclick: () => openModal(product, category, subcategory),
        }, [T.details]),
        el("a", {
          href: quoteHref,
          class: "btn-glow flex-1 inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white px-3 py-2.5 rounded-xl text-sm font-medium transition shadow-md shadow-blue-900/20",
        }, [T.requestQuote]),
      ]));

      card.appendChild(body);
      grid.appendChild(card);
    });

    return grid;
  }

  /* ── Main render ─────────────────────────────────────────────── */
  function render() {
    root.innerHTML = "";

    const search     = getSearch();
    const catId      = search.get("cat");
    const subId      = search.get("sub");
    const category   = catId ? findCategory(catId) : null;
    const subcategory = category && subId ? findSubcategory(category, subId) : null;

    /* Section header */
    const quoteBtn = el("a", {
      href: contactHref,
      class: "btn-glow hidden md:inline-flex items-center justify-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-xl text-sm font-medium shadow-lg shadow-blue-900/30 transition shrink-0",
    }, [T.requestQuote]);
    quoteBtn.appendChild(arrowSVG());

    root.appendChild(el("div", {
      class: "flex items-end justify-between gap-4 pb-6 mb-8 border-b border-slate-800/60",
    }, [
      el("div", { class: "flex-1" }, [
        el("p", { class: "text-blue-400 uppercase tracking-[0.18em] text-xs mb-2" }, [T.catalogue]),
        el("h2", { class: "text-2xl md:text-3xl font-semibold" }, [
          category ? category.title : T.headerTitle,
        ]),
        el("p", { class: "text-slate-400 text-sm mt-1 max-w-2xl leading-relaxed" }, [
          category ? category.description : T.headerHint,
        ]),
      ]),
      quoteBtn,
    ]));

    /* Root: category grid */
    if (!category) {
      root.appendChild(renderCategoryGrid());
      return;
    }

    /* Breadcrumb */
    const crumbs = [
      { label: T.products, params: new URLSearchParams() },
      { label: category.title, params: new URLSearchParams({ cat: category.id }) },
    ];
    if (subcategory) {
      crumbs.push({
        label: subcategory.title,
        params: new URLSearchParams({ cat: category.id, sub: subcategory.id }),
      });
    }
    root.appendChild(renderBreadcrumb(crumbs));

    /* Category level: subcategory grid */
    if (!subcategory) {
      root.appendChild(renderSubcategoryGrid(category));
      return;
    }

    /* Subcategory level: tab nav + product grid */
    const nav = renderSubcategoryNav(category, subcategory.id);
    if (nav) root.appendChild(nav);
    root.appendChild(renderProductGrid(category, subcategory));
  }

  window.addEventListener("popstate", render);
  render();
})();
