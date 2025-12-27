// Products page renderer (category -> subcategory -> product).
(function () {
  const root = document.getElementById("productsApp");
  if (!root) return;

  const catalog = window.MINEFECT_CATALOG || {};
  const categories = Array.isArray(catalog.CATEGORIES) ? catalog.CATEGORIES : [];

  const PLACEHOLDER_PRODUCT_IMAGE = "assets/images/placeholders/product.png";
  const PLACEHOLDER_CATEGORY_IMAGE = "assets/images/placeholders/category.png";

  const isEnglish =
    (document.documentElement.lang || "").toLowerCase().startsWith("en") ||
    /-en\.html$/i.test(window.location.pathname);

  const T = isEnglish
    ? {
        products: "Products",
        headerTitle: "Products & Services",
        headerHint: "Choose a category, then a subcategory to view products.",
        view: "View",
        viewProducts: "View products",
        details: "Details",
        requestQuote: "Request a quote",
        close: "Close",
        reference: "Ref",
        emptySubcategories: "No subcategories listed yet. Contact us for your needs.",
        emptyProducts: "No products listed for this subcategory.",
        countProducts: (count) => `${count} item(s)`,
      }
    : {
        products: "Produits",
        headerTitle: "Produits & Services",
        headerHint: "Choisissez une catégorie, puis une sous-catégorie pour voir les produits.",
        view: "Voir",
        viewProducts: "Voir les produits",
        details: "Détails",
        requestQuote: "Demander un devis",
        close: "Fermer",
        reference: "Réf",
        emptySubcategories: "Aucune sous-catégorie n’est encore listée ici. Contactez-nous pour vos besoins.",
        emptyProducts: "Aucun produit listé pour cette sous-catégorie.",
        countProducts: (count) => `${count} produit(s)`,
      };

  const contactHref = isEnglish ? "contact-en.html" : "contact.html";

  function el(tag, attrs, children) {
    const node = document.createElement(tag);
    if (attrs) {
      Object.entries(attrs).forEach(([key, value]) => {
        if (value === undefined || value === null) return;
        if (key === "class") node.className = value;
        else if (key === "html") node.innerHTML = value;
        else if (key.startsWith("on") && typeof value === "function") {
          node.addEventListener(key.slice(2).toLowerCase(), value);
        } else {
          node.setAttribute(key, String(value));
        }
      });
    }
    (children || []).forEach((child) => {
      if (child === null || child === undefined) return;
      node.appendChild(typeof child === "string" ? document.createTextNode(child) : child);
    });
    return node;
  }

  function getSearch() {
    return new URLSearchParams(window.location.search);
  }

  function setSearch(next) {
    const url = new URL(window.location.href);
    url.search = next.toString();
    window.history.pushState({}, "", url.toString());
    render();
  }

  function findCategory(catId) {
    return categories.find((c) => c.id === catId) || null;
  }

  function findSubcategory(category, subId) {
    if (!category) return null;
    return (category.subcategories || []).find((s) => s.id === subId) || null;
  }

  function buttonLink(text, params, extraClass) {
    return el(
      "button",
      {
        type: "button",
        class:
          extraClass ||
          "inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm",
        onclick: () => setSearch(params),
      },
      [text]
    );
  }

  function renderBreadcrumb(items) {
    const withSeparators = [];
    items.forEach((it, idx) => {
      if (!it) return;
      if (idx > 0) withSeparators.push(el("span", { class: "text-slate-500" }, [" / "]));
      const isLast = idx === items.length - 1;
      withSeparators.push(
        isLast
          ? el("span", { class: "text-slate-200" }, [it.label])
          : el(
              "button",
              { type: "button", class: "text-blue-300 hover:text-blue-400", onclick: () => setSearch(it.params) },
              [it.label]
            )
      );
    });
    return el("div", { class: "text-sm mb-6" }, withSeparators);
  }

  function openImageZoom({ src, alt }) {
    const zoomOverlay = el("div", {
      class: "fixed inset-0 z-[60] bg-black/80 backdrop-blur flex items-center justify-center p-4",
      role: "dialog",
      "aria-modal": "true",
    });

    const close = () => zoomOverlay.remove();
    zoomOverlay.addEventListener("click", (e) => {
      if (e.target === zoomOverlay) close();
    });
    window.addEventListener(
      "keydown",
      (e) => {
        if (e.key === "Escape") close();
      },
      { once: true }
    );

    zoomOverlay.appendChild(
      el("img", {
        class: "max-w-full max-h-[85vh] object-contain rounded-xl border border-slate-700",
        src: src || PLACEHOLDER_PRODUCT_IMAGE,
        alt: alt || "",
        onerror: (e) => {
          e.target.onerror = null;
          e.target.src = PLACEHOLDER_PRODUCT_IMAGE;
        },
      })
    );

    document.body.appendChild(zoomOverlay);
  }

  function openModal(product, category, subcategory) {
    const overlay = el("div", {
      class: "fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur px-4 py-10",
      role: "dialog",
      "aria-modal": "true",
    });

    const close = () => overlay.remove();

    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) close();
    });
    window.addEventListener(
      "keydown",
      (e) => {
        if (e.key === "Escape") close();
      },
      { once: true }
    );

    const unitBadge = product.unit
      ? el(
          "span",
          { class: "inline-flex text-xs px-2 py-1 rounded-full bg-slate-800 border border-slate-700" },
          [product.unit]
        )
      : null;

    const card = el("div", {
      class: "w-full max-w-3xl bg-slate-950 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden",
    });

    const header = el(
      "div",
      { class: "flex items-start justify-between gap-4 p-5 border-b border-slate-800" },
      [
        el("div", null, [
          el("div", { class: "text-slate-400 text-xs uppercase tracking-[0.14em]" }, [
            `${category.title} › ${subcategory.title}`,
          ]),
          el("h3", { class: "text-lg md:text-xl font-semibold mt-1" }, [product.name_fr]),
          product.ref_original
            ? el("div", { class: "text-slate-400 text-xs mt-1" }, [`${T.reference}: ${product.ref_original}`])
            : null,
          unitBadge ? el("div", { class: "mt-2" }, [unitBadge]) : null,
        ]),
        el(
          "button",
          {
            type: "button",
            class: "text-slate-300 hover:text-white text-2xl leading-none",
            onclick: close,
            "aria-label": "Fermer",
          },
          ["×"]
        ),
      ]
    );

    const img = el("img", {
      class:
        "w-full h-72 sm:h-80 md:h-[420px] object-contain bg-slate-950 border-b border-slate-800 cursor-zoom-in",
      src: product.image || PLACEHOLDER_PRODUCT_IMAGE,
      alt: product.name_fr,
      loading: "lazy",
      onclick: () => openImageZoom({ src: product.image, alt: product.name_fr }),
      onerror: (e) => {
        e.target.onerror = null;
        e.target.src = PLACEHOLDER_PRODUCT_IMAGE;
      },
    });

    const body = el("div", { class: "p-5" }, [
      el("p", { class: "text-slate-200 text-sm leading-relaxed" }, [product.description_fr]),
      el("div", { class: "mt-5 flex flex-wrap gap-3" }, [
        el(
          "a",
            {
              href: contactHref,
              class:
                "inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg text-sm",
            },
            [T.requestQuote]
          ),
        el(
          "button",
          {
            type: "button",
            class:
              "inline-flex items-center justify-center border border-slate-700 hover:border-slate-500 px-5 py-3 rounded-lg text-sm",
            onclick: close,
          },
          [T.close]
        ),
      ]),
    ]);

    card.appendChild(header);
    card.appendChild(img);
    card.appendChild(body);
    overlay.appendChild(card);
    document.body.appendChild(overlay);
  }

  function renderCategoryGrid() {
    const grid = el("div", { class: "catalog-grid" });

    categories.forEach((category) => {
      const params = new URLSearchParams();
      params.set("cat", category.id);

      const card = el("div", {
        class:
          "bg-slate-900/80 border border-slate-800 rounded-2xl p-4 shadow-lg hover:-translate-y-1 hover:shadow-2xl transition flex flex-col h-full",
      });

      card.appendChild(
        el("img", {
          src: category.image || PLACEHOLDER_CATEGORY_IMAGE,
          alt: category.title,
          class: "w-full h-40 object-cover rounded-xl mb-3 border border-slate-800",
          loading: "lazy",
          onerror: (e) => {
            e.target.onerror = null;
            e.target.src = PLACEHOLDER_CATEGORY_IMAGE;
          },
        })
      );

      card.appendChild(el("h3", { class: "font-medium mb-1" }, [category.title]));
      card.appendChild(el("p", { class: "text-slate-300 text-sm flex-1" }, [category.description]));
      card.appendChild(el("div", { class: "mt-4" }, [buttonLink(T.view, params)]));

      grid.appendChild(card);
    });

    return grid;
  }

  function renderSubcategoryGrid(category) {
    const subs = Array.isArray(category.subcategories) ? category.subcategories : [];
    if (subs.length === 0) {
      return el("div", { class: "text-slate-300 text-sm" }, [
        T.emptySubcategories,
      ]);
    }

    const grid = el("div", { class: "catalog-grid" });
    subs.forEach((sub) => {
      const params = new URLSearchParams();
      params.set("cat", category.id);
      params.set("sub", sub.id);

      const count = (sub.products || []).length;
      const card = el("div", {
        class:
          "bg-slate-900/80 border border-slate-700 rounded-2xl p-5 shadow-lg hover:-translate-y-1 hover:shadow-2xl transition flex flex-col h-full",
      });

      card.appendChild(el("h3", { class: "font-medium mb-2" }, [sub.title]));
      card.appendChild(el("p", { class: "text-slate-300 text-sm flex-1" }, [sub.description || T.countProducts(count)]));
      card.appendChild(el("div", { class: "mt-4" }, [buttonLink(T.viewProducts, params)]));

      grid.appendChild(card);
    });

    return grid;
  }

  function renderSubcategoryNav(category, activeSubId) {
    const subs = Array.isArray(category.subcategories) ? category.subcategories : [];
    if (subs.length <= 1) return null;

    const wrap = el("div", { class: "flex flex-wrap gap-2 mb-6" });
    subs.forEach((sub) => {
      const params = new URLSearchParams();
      params.set("cat", category.id);
      params.set("sub", sub.id);
      const isActive = sub.id === activeSubId;

      wrap.appendChild(
        el(
          "button",
          {
            type: "button",
            class:
              (isActive
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-slate-900/60 text-slate-200 border-slate-700 hover:border-slate-500") +
              " border px-3 py-2 rounded-lg text-sm transition",
            onclick: () => setSearch(params),
          },
          [sub.title]
        )
      );
    });

    return wrap;
  }

  function renderProductGrid(category, subcategory) {
    const products = Array.isArray(subcategory.products) ? subcategory.products : [];
    if (products.length === 0) {
      return el("div", { class: "text-slate-300 text-sm" }, [T.emptyProducts]);
    }

    const grid = el("div", { class: "catalog-grid" });
    products.forEach((product) => {
      const unitBadge = product.unit
        ? el(
            "span",
            {
              class:
                "inline-flex text-xs px-2 py-1 rounded-full bg-slate-800 border border-slate-700 text-slate-200",
            },
            [product.unit]
          )
        : null;

      const card = el("div", {
        class:
          "bg-slate-900/80 border border-slate-700 rounded-2xl p-4 shadow-lg hover:-translate-y-1 hover:shadow-2xl transition flex flex-col h-full",
      });

      card.appendChild(
        el("img", {
          src: product.image || PLACEHOLDER_PRODUCT_IMAGE,
          alt: product.name_fr,
          class:
            "w-full h-44 md:h-48 object-contain bg-slate-950/60 p-2 rounded-xl mb-3 border border-slate-800",
          loading: "lazy",
          onerror: (e) => {
            e.target.onerror = null;
            e.target.src = PLACEHOLDER_PRODUCT_IMAGE;
          },
        })
      );

      card.appendChild(
        el("div", { class: "flex items-start justify-between gap-3" }, [
          el("h3", { class: "font-medium mb-1" }, [product.name_fr]),
          unitBadge,
        ])
      );

      if (product.ref_original) {
        card.appendChild(
          el("div", { class: "text-slate-400 text-xs mb-2" }, [`${T.reference}: ${product.ref_original}`])
        );
      }

      card.appendChild(el("p", { class: "text-slate-300 text-sm flex-1" }, [product.description_fr]));

      card.appendChild(
        el("div", { class: "mt-4 flex flex-wrap gap-3" }, [
          el(
            "button",
            {
              type: "button",
              class:
                "inline-flex items-center justify-center border border-slate-700 hover:border-slate-500 px-4 py-2 rounded-lg text-sm",
              onclick: () => openModal(product, category, subcategory),
            },
            [T.details]
          ),
          el(
            "a",
            {
              href: contactHref,
              class:
                "inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm",
            },
            [T.requestQuote]
          ),
        ])
      );

      grid.appendChild(card);
    });

    return grid;
  }

  function render() {
    root.innerHTML = "";

    const search = getSearch();
    const catId = search.get("cat");
    const subId = search.get("sub");

    const category = catId ? findCategory(catId) : null;
    const subcategory = category && subId ? findSubcategory(category, subId) : null;

    const header = el("div", { class: "flex items-end justify-between mb-6 gap-4" }, [
      el("div", null, [
        el("h2", { class: "text-2xl font-semibold" }, [category ? category.title : T.headerTitle]),
        el("p", { class: "text-slate-300 text-sm mt-1 max-w-3xl" }, [
          category ? category.description : T.headerHint,
        ]),
      ]),
      el(
        "a",
        {
          href: contactHref,
          class:
            "hidden md:inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm",
        },
        [T.requestQuote]
      ),
    ]);

    root.appendChild(header);

    if (!category) {
      root.appendChild(renderCategoryGrid());
      return;
    }

    const crumbItems = [
      { label: T.products, params: new URLSearchParams() },
      { label: category.title, params: new URLSearchParams({ cat: category.id }) },
    ];
    if (subcategory) {
      crumbItems.push({
        label: subcategory.title,
        params: new URLSearchParams({ cat: category.id, sub: subcategory.id }),
      });
    }
    root.appendChild(renderBreadcrumb(crumbItems));

    if (!subcategory) {
      root.appendChild(renderSubcategoryGrid(category));
      return;
    }

    const nav = renderSubcategoryNav(category, subcategory.id);
    if (nav) root.appendChild(nav);

    root.appendChild(renderProductGrid(category, subcategory));
  }

  window.addEventListener("popstate", render);
  render();
})();
