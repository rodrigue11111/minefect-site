// Products page renderer.
(function () {
  const root = document.getElementById("productsApp");
  if (!root) return;

  const catalog = window.MINEFECT_CATALOG;
  const categories = (catalog && catalog.CATEGORIES) || [];

  const PLACEHOLDER_PRODUCT_IMAGE = "assets/images/placeholders/product.png";
  const PLACEHOLDER_CATEGORY_IMAGE = "assets/images/placeholders/category.png";

  function escapeHtml(str) {
    return String(str).replace(/[&<>"']/g, (ch) => {
      switch (ch) {
        case "&":
          return "&amp;";
        case "<":
          return "&lt;";
        case ">":
          return "&gt;";
        case '"':
          return "&quot;";
        case "'":
          return "&#039;";
        default:
          return ch;
      }
    });
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
    return category.subcategories.find((s) => s.id === subId) || null;
  }

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
    const parts = items.map((it, idx) => {
      if (!it) return null;
      const isLast = idx === items.length - 1;
      if (isLast) {
        return el("span", { class: "text-slate-200" }, [it.label]);
      }
      return el(
        "button",
        {
          type: "button",
          class: "text-blue-300 hover:text-blue-400",
          onclick: () => setSearch(it.params),
        },
        [it.label]
      );
    });

    const withSeparators = [];
    parts.forEach((p, idx) => {
      if (!p) return;
      if (idx > 0) withSeparators.push(el("span", { class: "text-slate-500" }, [" / "]));
      withSeparators.push(p);
    });

    return el("div", { class: "text-sm mb-6" }, withSeparators);
  }

  function openModal(product, category, subcategory) {
    const overlay = el("div", {
      class:
        "fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur px-4 py-10",
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
      class:
        "w-full max-w-3xl bg-slate-950 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden",
    });

    const header = el(
      "div",
      { class: "flex items-start justify-between gap-4 p-5 border-b border-slate-800" },
      [
        el("div", null, [
          el("div", { class: "text-slate-400 text-xs uppercase tracking-[0.14em]" }, [
            `${category.title} • ${subcategory.title}`,
          ]),
          el("h3", { class: "text-lg md:text-xl font-semibold mt-1" }, [product.name]),
          unitBadge ? el("div", { class: "mt-2" }, [unitBadge]) : null,
        ]),
        el(
          "button",
          {
            type: "button",
            class: "text-slate-300 hover:text-white",
            onclick: close,
            "aria-label": "Fermer",
          },
          ["✕"]
        ),
      ]
    );

    const body = el("div", { class: "p-5 grid md:grid-cols-2 gap-5" }, [
      el("img", {
        class: "w-full h-56 md:h-full object-cover rounded-xl border border-slate-800",
        src: product.image || PLACEHOLDER_PRODUCT_IMAGE,
        alt: product.name,
        loading: "lazy",
        onerror: (e) => {
          e.target.onerror = null;
          e.target.src = PLACEHOLDER_PRODUCT_IMAGE;
        },
      }),
      el("div", null, [
        el("p", { class: "text-slate-200 text-sm leading-relaxed" }, [product.description]),
        el("div", { class: "mt-5 flex flex-wrap gap-3" }, [
          el(
            "a",
            {
              href: "contact.html",
              class:
                "inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg text-sm",
            },
            ["Demander un devis"]
          ),
          el(
            "button",
            {
              type: "button",
              class:
                "inline-flex items-center justify-center border border-slate-700 hover:border-slate-500 px-5 py-3 rounded-lg text-sm",
              onclick: close,
            },
            ["Fermer"]
          ),
        ]),
      ]),
    ]);

    card.appendChild(header);
    card.appendChild(body);
    overlay.appendChild(card);
    document.body.appendChild(overlay);
  }

  function renderCategoryGrid() {
    const grid = el("div", { class: "grid sm:grid-cols-2 lg:grid-cols-3 gap-6" });
    categories.forEach((category) => {
      const params = new URLSearchParams();
      params.set("cat", category.id);
      const card = el("div", {
        class:
          "bg-slate-900/80 border border-slate-800 rounded-2xl p-4 shadow-lg hover:-translate-y-1 hover:shadow-2xl transition",
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
      card.appendChild(el("p", { class: "text-slate-300 text-sm" }, [category.description]));
      card.appendChild(el("div", { class: "mt-4" }, [buttonLink("Voir", params)]));

      grid.appendChild(card);
    });
    return grid;
  }

  function renderSubcategoryGrid(category) {
    const hasSubs = Array.isArray(category.subcategories) && category.subcategories.length > 0;
    if (!hasSubs) {
      return el("div", { class: "text-slate-300 text-sm" }, [
        "Aucune sous-catégorie n’est encore listée ici. Contactez-nous pour vos besoins.",
      ]);
    }

    const grid = el("div", { class: "grid sm:grid-cols-2 lg:grid-cols-3 gap-6" });
    category.subcategories.forEach((sub) => {
      const params = new URLSearchParams();
      params.set("cat", category.id);
      params.set("sub", sub.id);
      const count = (sub.products || []).length;

      const card = el("div", {
        class:
          "bg-slate-900/80 border border-slate-700 rounded-2xl p-5 shadow-lg hover:-translate-y-1 hover:shadow-2xl transition",
        html: `
          <h3 class="font-medium mb-2">${escapeHtml(sub.title)}</h3>
          <p class="text-slate-300 text-sm">${escapeHtml(sub.description || `${count} item(s)`)}</p>
          <div class="mt-4"></div>
        `,
      });
      card.querySelector("div.mt-4").appendChild(buttonLink("Voir les produits", params));
      grid.appendChild(card);
    });
    return grid;
  }

  function renderSubcategoryNav(category, activeSubId) {
    const wrap = el("div", { class: "flex flex-wrap gap-2 mb-6" });

    category.subcategories.forEach((sub) => {
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
    const products = subcategory.products || [];
    if (products.length === 0) {
      return el("div", { class: "text-slate-300 text-sm" }, ["Aucun produit listé pour cette sous-catégorie."]);
    }

    const grid = el("div", { class: "grid sm:grid-cols-2 lg:grid-cols-3 gap-6" });
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
          "bg-slate-900/80 border border-slate-700 rounded-2xl p-4 shadow-lg hover:-translate-y-1 hover:shadow-2xl transition",
      });

      card.appendChild(
        el("img", {
          src: product.image || PLACEHOLDER_PRODUCT_IMAGE,
          alt: product.name,
          class: "w-full h-40 object-cover rounded-xl mb-3 border border-slate-800",
          loading: "lazy",
          onerror: (e) => {
            e.target.onerror = null;
            e.target.src = PLACEHOLDER_PRODUCT_IMAGE;
          },
        })
      );
      card.appendChild(
        el("div", { class: "flex items-start justify-between gap-3" }, [
          el("h3", { class: "font-medium mb-1" }, [product.name]),
          unitBadge,
        ])
      );
      card.appendChild(el("p", { class: "text-slate-300 text-sm" }, [product.description]));
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
            ["Détails"]
          ),
          el(
            "a",
            {
              href: "contact.html",
              class:
                "inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm",
            },
            ["Demander un devis"]
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
        el("h2", { class: "text-2xl font-semibold" }, [category ? category.title : "Produits & Services"]),
        el("p", { class: "text-slate-300 text-sm mt-1 max-w-3xl" }, [
          category ? category.description : "Choisissez une catégorie, puis une sous-catégorie pour voir les produits.",
        ]),
      ]),
      el(
        "a",
        {
          href: "contact.html",
          class:
            "hidden md:inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm",
        },
        ["Demander un devis"]
      ),
    ]);

    root.appendChild(header);

    if (!category) {
      root.appendChild(renderCategoryGrid());
      return;
    }

    const crumbItems = [
      { label: "Produits", params: new URLSearchParams() },
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

    if (category.subcategories.length > 1) {
      root.appendChild(renderSubcategoryNav(category, subcategory.id));
    }

    root.appendChild(renderProductGrid(category, subcategory));
  }

  window.addEventListener("popstate", render);
  render();
})();
