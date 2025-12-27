// Shared JS entrypoint (safe to include site-wide).
// Currently implements the Contact quote form logic when present.
(function () {
  const OTHER_VALUE = "__other__";

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
      placeholder: "Sélectionnez une catégorie",
      emptyLabel: "Aucune catégorie disponible",
      items: [...categories.map((c) => ({ value: c.id, label: c.title })), { value: OTHER_VALUE, label: "Autre (précisez)" }],
    });

    setOptions(subcategorySelect, {
      placeholder: "Sélectionnez une sous-catégorie",
      emptyLabel: "Choisissez d’abord une catégorie",
      items: [],
    });
    subcategorySelect.disabled = true;

    setOptions(productSelect, {
      placeholder: "Sélectionnez un produit",
      emptyLabel: "Choisissez d’abord une sous-catégorie",
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
      const isOther = countrySelect.value === "Autre";
      countryOtherWrap.classList.toggle("hidden", !isOther);
      countryOtherInput.required = isOther;
      if (!isOther) countryOtherInput.value = "";
    }

    function resetProducts(reasonLabel) {
      setOptions(productSelect, {
        placeholder: "Sélectionnez un produit",
        emptyLabel: reasonLabel || "Choisissez d’abord une sous-catégorie",
        items: [],
      });
      productSelect.disabled = true;
      updateProductOther();
    }

    function resetSubcategories(reasonLabel) {
      setOptions(subcategorySelect, {
        placeholder: "Sélectionnez une sous-catégorie",
        emptyLabel: reasonLabel || "Choisissez d’abord une catégorie",
        items: [],
      });
      subcategorySelect.disabled = true;
      resetProducts("Choisissez d’abord une sous-catégorie");
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
        resetSubcategories("Choisissez d’abord une catégorie");
        return;
      }

      const category = getCurrentCategory();
      if (!category) {
        resetSubcategories("Choisissez d’abord une catégorie");
        return;
      }

      const subs = category.subcategories || [];
      if (subs.length === 0) {
        resetSubcategories("Aucune sous-catégorie disponible");
        return;
      }

      setOptions(subcategorySelect, {
        placeholder: "Sélectionnez une sous-catégorie",
        emptyLabel: "Aucune sous-catégorie disponible",
        items: [...subs.map((s) => ({ value: s.id, label: s.title })), { value: OTHER_VALUE, label: "Autre (précisez)" }],
      });
      subcategorySelect.disabled = false;

      resetProducts("Choisissez d’abord une sous-catégorie");
    });

    subcategorySelect.addEventListener("change", () => {
      updateProductOther();

      if (subcategorySelect.value === OTHER_VALUE) {
        resetProducts("Sélectionnez un produit ou choisissez Autre");
        return;
      }

      const category = getCurrentCategory();
      const sub = getCurrentSubcategory(category);
      if (!sub) {
        resetProducts("Choisissez d’abord une sous-catégorie");
        return;
      }

      const products = sub.products || [];
      if (products.length === 0) {
        setOptions(productSelect, {
          placeholder: "Aucun produit disponible — choisissez Autre",
          emptyLabel: "Aucun produit disponible",
          items: [{ value: "__other__", label: "Autre (précisez)" }],
        });
        productSelect.disabled = false;
        updateProductOther();
        return;
      }

      setOptions(productSelect, {
        placeholder: "Sélectionnez un produit",
        emptyLabel: "Aucun produit disponible",
        items: [...products.map((p) => ({ value: p.id, label: p.name_fr })), { value: OTHER_VALUE, label: "Autre (précisez)" }],
      });
      productSelect.disabled = false;
      updateProductOther();
    });

    productSelect.addEventListener("change", updateProductOther);

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

      const subject = payload.product ? `Demande de devis - ${payload.product}` : "Demande de devis - MINEFECT";

      const bodyLines = [
        `Nom / Entreprise: ${payload.name || "-"}`,
        `Email: ${payload.email || "-"}`,
        `Téléphone: ${payload.phone || "-"}`,
        `Pays: ${payload.country || "-"}`,
        "",
        `Catégorie: ${payload.category || "-"}`,
        `Sous-catégorie: ${payload.subcategory || "-"}`,
        `Produit: ${payload.product || "-"}`,
      ];

      if (payload.product_ref) {
        bodyLines.push(`Réf: ${payload.product_ref}`);
      }

      bodyLines.push("", "Message:", payload.message || "-");

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
