// Shared JS entrypoint (safe to include site-wide).
// Currently implements the Contact quote form logic when present.

(function () {
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
      items: categories.map((c) => ({ value: c.id, label: c.title })),
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
    }

    function resetSubcategories(reasonLabel) {
      setOptions(subcategorySelect, {
        placeholder: "Sélectionnez une sous-catégorie",
        emptyLabel: reasonLabel || "Choisissez d’abord une catégorie",
        items: [],
      });
      subcategorySelect.disabled = true;
      resetProducts("Choisissez d’abord une sous-catégorie");
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

    categorySelect.addEventListener("change", () => {
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
        items: subs.map((s) => ({ value: s.id, label: s.title })),
      });
      subcategorySelect.disabled = false;

      resetProducts("Choisissez d’abord une sous-catégorie");
    });

    subcategorySelect.addEventListener("change", () => {
      const category = getCurrentCategory();
      const sub = getCurrentSubcategory(category);
      if (!sub) {
        resetProducts("Choisissez d’abord une sous-catégorie");
        return;
      }

      const products = sub.products || [];
      if (products.length === 0) {
        setOptions(productSelect, {
          placeholder: "Sélectionnez un produit",
          emptyLabel: "Aucun produit disponible",
          items: [],
        });
        productSelect.disabled = true;
        return;
      }

      setOptions(productSelect, {
        placeholder: "Sélectionnez un produit",
        emptyLabel: "Aucun produit disponible",
        items: products.map((p) => ({ value: p.id, label: p.name })),
      });
      productSelect.disabled = false;
    });

    if (countrySelect) {
      countrySelect.addEventListener("change", updateCountryOther);
      updateCountryOther();
    }

    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const category = getCurrentCategory();
      const sub = getCurrentSubcategory(category);

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
        product: getSelectedText(productSelect),
        message: (messageInput && messageInput.value.trim()) || "",
      };

      const subject = payload.product ? `Demande de devis — ${payload.product}` : "Demande de devis — MINEFECT";
      const bodyLines = [
        `Nom / Entreprise: ${payload.name || "-"}`,
        `Email: ${payload.email || "-"}`,
        `Téléphone: ${payload.phone || "-"}`,
        `Pays: ${payload.country || "-"}`,
        "",
        `Catégorie: ${payload.category || "-"}`,
        `Sous-catégorie: ${payload.subcategory || "-"}`,
        `Produit: ${payload.product || "-"}`,
        "",
        "Message:",
        payload.message || "-",
      ];

      const mailto = `mailto:contact@minefect.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
        bodyLines.join("\n")
      )}`;

      window.location.href = mailto;
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    initContactForm();
  });
})();
