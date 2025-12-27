// Shared JS entrypoint (safe to include site-wide).
// Currently implements the Contact quote form logic when present.
(function () {
  const OTHER_VALUE = "__other__";
  const isEnglish =
    (document.documentElement.lang || "").toLowerCase().startsWith("en") ||
    /-en\.html$/i.test(window.location.pathname);

  const T = isEnglish
    ? {
        categoryPlaceholder: "Select a category",
        categoryEmpty: "No categories available",
        subcategoryPlaceholder: "Select a subcategory",
        subcategoryChooseCategory: "Choose a category first",
        subcategoryEmpty: "No subcategories available",
        productPlaceholder: "Select a product",
        productChooseSubcategory: "Choose a subcategory first",
        productEmpty: "No products available",
        otherSpecify: "Other (specify)",
        subjectPrefix: "Quote request",
        bodyName: "Name / Company",
        bodyEmail: "Email",
        bodyPhone: "Phone",
        bodyCountry: "Country",
        bodyCategory: "Category",
        bodySubcategory: "Subcategory",
        bodyProduct: "Product",
        bodyRef: "Ref",
        bodyMessage: "Message",
      }
    : {
        categoryPlaceholder: "Sélectionnez une catégorie",
        categoryEmpty: "Aucune catégorie disponible",
        subcategoryPlaceholder: "Sélectionnez une sous-catégorie",
        subcategoryChooseCategory: "Choisissez d’abord une catégorie",
        subcategoryEmpty: "Aucune sous-catégorie disponible",
        productPlaceholder: "Sélectionnez un produit",
        productChooseSubcategory: "Choisissez d’abord une sous-catégorie",
        productEmpty: "Aucun produit disponible",
        otherSpecify: "Autre (précisez)",
        subjectPrefix: "Demande de devis",
        bodyName: "Nom / Entreprise",
        bodyEmail: "Email",
        bodyPhone: "Téléphone",
        bodyCountry: "Pays",
        bodyCategory: "Catégorie",
        bodySubcategory: "Sous-catégorie",
        bodyProduct: "Produit",
        bodyRef: "Réf",
        bodyMessage: "Message",
      };

  function setOptions(select, { placeholder, emptyLabel, items }) {
    select.innerHTML = "";

    const ph = document.createElement("option");
    ph.value = "";
    ph.textContent = placeholder;
    select.appendChild(ph);

    if (!items || items.length === 0) {
      const empty = document.createElement("option");
      empty.value = "";
      empty.textContent = emptyLabel;
      select.appendChild(empty);
      return;
    }

    items.forEach((item) => {
      const opt = document.createElement("option");
      opt.value = item.value;
      opt.textContent = item.label;
      select.appendChild(opt);
    });
  }

  function getSelectedText(select) {
    if (!select) return "";
    if (!select.value) return "";
    const opt = select.options[select.selectedIndex];
    return opt ? opt.textContent.trim() : "";
  }

  function initContactForm() {
    const form = document.getElementById("quoteForm");
    if (!form) return;

    const categories = (window.MINEFECT_CATALOG && window.MINEFECT_CATALOG.CATEGORIES) || [];

    const categorySelect = document.getElementById("qCategory");
    const subcategorySelect = document.getElementById("qSubcategory");
    const productSelect = document.getElementById("qProduct");
    const subcategoryWrap = document.getElementById("qSubcategoryWrap");
    const productWrap = document.getElementById("qProductWrap");
    const productOtherWrap = document.getElementById("qProductOtherWrap");
    const productOtherInput = document.getElementById("qProductOther");

    const countrySelect = document.getElementById("qCountry");
    const countryOtherWrap = document.getElementById("qCountryOtherWrap");
    const countryOtherInput = document.getElementById("qCountryOther");

    const nameInput = document.getElementById("qName");
    const emailInput = document.getElementById("qEmail");
    const phoneInput = document.getElementById("qPhone");
    const messageInput = document.getElementById("qMessage");

    if (!categorySelect || !subcategorySelect || !productSelect) return;

    setOptions(categorySelect, {
      placeholder: T.categoryPlaceholder,
      emptyLabel: T.categoryEmpty,
      items: [...categories.map((c) => ({ value: c.id, label: c.title })), { value: OTHER_VALUE, label: T.otherSpecify }],
    });

    setOptions(subcategorySelect, {
      placeholder: T.subcategoryPlaceholder,
      emptyLabel: T.subcategoryChooseCategory,
      items: [],
    });
    subcategorySelect.disabled = true;

    setOptions(productSelect, {
      placeholder: T.productPlaceholder,
      emptyLabel: T.productChooseSubcategory,
      items: [],
    });
    productSelect.disabled = true;

    let didFocusOther = false;
    function updateProductOther() {
      if (!productSelect || !productOtherWrap || !productOtherInput) return;
      const categoryIsOther = categorySelect && categorySelect.value === OTHER_VALUE;
      const subcategoryIsOther = !categoryIsOther && subcategorySelect && subcategorySelect.value === OTHER_VALUE;
      const productIsOther = !categoryIsOther && !subcategoryIsOther && productSelect.value === OTHER_VALUE;
      const isOther = categoryIsOther || subcategoryIsOther || productIsOther;

      if (subcategoryWrap) subcategoryWrap.classList.toggle("hidden", categoryIsOther);
      if (productWrap) productWrap.classList.toggle("hidden", categoryIsOther || subcategoryIsOther);

      productOtherWrap.classList.toggle("hidden", !isOther);
      productOtherInput.required = isOther;

      if (!isOther) {
        productOtherInput.value = "";
        didFocusOther = false;
      } else if (!didFocusOther) {
        didFocusOther = true;
        setTimeout(() => productOtherInput.focus(), 0);
      }
    }

    function updateCountryOther() {
      if (!countrySelect || !countryOtherWrap || !countryOtherInput) return;
      const isOther = countrySelect.value === "Autre" || countrySelect.value === "Other";
      countryOtherWrap.classList.toggle("hidden", !isOther);
      countryOtherInput.required = isOther;
      if (!isOther) countryOtherInput.value = "";
    }

    function resetProducts(reasonLabel) {
      setOptions(productSelect, {
        placeholder: T.productPlaceholder,
        emptyLabel: reasonLabel || T.productChooseSubcategory,
        items: [],
      });
      productSelect.disabled = true;
      updateProductOther();
    }

    function resetSubcategories(reasonLabel) {
      setOptions(subcategorySelect, {
        placeholder: T.subcategoryPlaceholder,
        emptyLabel: reasonLabel || T.subcategoryChooseCategory,
        items: [],
      });
      subcategorySelect.disabled = true;
      resetProducts(T.productChooseSubcategory);
      updateProductOther();
    }

    function getCurrentCategory() {
      const catId = categorySelect.value;
      return categories.find((c) => c.id === catId) || null;
    }

    function getCurrentSubcategory(category) {
      const subId = subcategorySelect.value;
      if (!category || !subId) return null;
      return (category.subcategories || []).find((s) => s.id === subId) || null;
    }

    function getCurrentProduct(subcategory) {
      const productId = productSelect.value;
      if (!subcategory || !productId) return null;
      return (subcategory.products || []).find((p) => p.id === productId) || null;
    }

    categorySelect.addEventListener("change", () => {
      updateProductOther();

      if (categorySelect.value === OTHER_VALUE) {
        resetSubcategories(T.subcategoryChooseCategory);
        return;
      }

      const category = getCurrentCategory();
      if (!category) {
        resetSubcategories(T.subcategoryChooseCategory);
        return;
      }

      const subs = category.subcategories || [];
      if (subs.length === 0) {
        resetSubcategories(T.subcategoryEmpty);
        return;
      }

      setOptions(subcategorySelect, {
        placeholder: T.subcategoryPlaceholder,
        emptyLabel: T.subcategoryEmpty,
        items: [...subs.map((s) => ({ value: s.id, label: s.title })), { value: OTHER_VALUE, label: T.otherSpecify }],
      });
      subcategorySelect.disabled = false;

      resetProducts(T.productChooseSubcategory);
    });

    subcategorySelect.addEventListener("change", () => {
      updateProductOther();

      if (subcategorySelect.value === OTHER_VALUE) {
        resetProducts(T.productChooseSubcategory);
        return;
      }

      const category = getCurrentCategory();
      const sub = getCurrentSubcategory(category);
      if (!sub) {
        resetProducts(T.productChooseSubcategory);
        return;
      }

      const products = sub.products || [];
      if (products.length === 0) {
        setOptions(productSelect, {
          placeholder: T.productEmpty,
          emptyLabel: T.productEmpty,
          items: [{ value: OTHER_VALUE, label: T.otherSpecify }],
        });
        productSelect.disabled = false;
        updateProductOther();
        return;
      }

      setOptions(productSelect, {
        placeholder: T.productPlaceholder,
        emptyLabel: T.productEmpty,
        items: [...products.map((p) => ({ value: p.id, label: p.name_fr })), { value: OTHER_VALUE, label: T.otherSpecify }],
      });
      productSelect.disabled = false;
      updateProductOther();
    });

    productSelect.addEventListener("change", updateProductOther);

    function applyPrefillFromQuery() {
      const params = new URLSearchParams(window.location.search);
      const cat = params.get("cat");
      const sub = params.get("sub");
      const prod = params.get("prod");

      if (!cat) return;

      const catExists = Array.from(categorySelect.options).some((o) => o.value === cat);
      if (!catExists) return;

      categorySelect.value = cat;
      categorySelect.dispatchEvent(new Event("change"));

      if (!sub) return;
      const subExists = Array.from(subcategorySelect.options).some((o) => o.value === sub);
      if (!subExists) return;

      subcategorySelect.value = sub;
      subcategorySelect.dispatchEvent(new Event("change"));

      if (!prod) return;
      const prodExists = Array.from(productSelect.options).some((o) => o.value === prod);
      if (!prodExists) return;

      productSelect.value = prod;
      productSelect.dispatchEvent(new Event("change"));
    }

    applyPrefillFromQuery();

    if (countrySelect) {
      countrySelect.addEventListener("change", updateCountryOther);
      updateCountryOther();
    }

    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const category = getCurrentCategory();
      const sub = getCurrentSubcategory(category);
      const product = getCurrentProduct(sub);

      const country =
        countrySelect && countrySelect.value === "Autre" && countryOtherInput && countryOtherInput.value.trim()
          ? countryOtherInput.value.trim()
          : (countrySelect && countrySelect.value) || "";

      const payload = {
        name: (nameInput && nameInput.value.trim()) || "",
        email: (emailInput && emailInput.value.trim()) || "",
        phone: (phoneInput && phoneInput.value.trim()) || "",
        country,
        category: category ? category.title : "",
        subcategory: sub ? sub.title : "",
        product:
          ((categorySelect && categorySelect.value === OTHER_VALUE) ||
            (subcategorySelect && subcategorySelect.value === OTHER_VALUE) ||
            (productSelect && productSelect.value === OTHER_VALUE)) &&
          productOtherInput &&
          productOtherInput.value.trim()
            ? productOtherInput.value.trim()
            : product
              ? product.name_fr
              : getSelectedText(productSelect),
        product_ref:
          (categorySelect && categorySelect.value === OTHER_VALUE) ||
          (subcategorySelect && subcategorySelect.value === OTHER_VALUE) ||
          (productSelect && productSelect.value === OTHER_VALUE)
            ? ""
            : (product && product.ref_original) || "",
        message: (messageInput && messageInput.value.trim()) || "",
      };

      const subject = payload.product ? `${T.subjectPrefix} - ${payload.product}` : `${T.subjectPrefix} - MINEFECT`;

      const bodyLines = [
        `${T.bodyName}: ${payload.name || "-"}`,
        `${T.bodyEmail}: ${payload.email || "-"}`,
        `${T.bodyPhone}: ${payload.phone || "-"}`,
        `${T.bodyCountry}: ${payload.country || "-"}`,
        "",
        `${T.bodyCategory}: ${payload.category || "-"}`,
        `${T.bodySubcategory}: ${payload.subcategory || "-"}`,
        `${T.bodyProduct}: ${payload.product || "-"}`,
      ];

      if (payload.product_ref) {
        bodyLines.push(`${T.bodyRef}: ${payload.product_ref}`);
      }

      bodyLines.push("", `${T.bodyMessage}:`, payload.message || "-");

      const mailto = `mailto:adilbelem@minefect.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
        bodyLines.join("\n")
      )}`;

      window.location.href = mailto;
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    initContactForm();
  });
})();
