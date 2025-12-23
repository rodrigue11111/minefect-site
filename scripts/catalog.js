// Single source of truth for the Products catalog.
// Loaded on `products.html` before `products-page.js`.
(function () {
  /** @type {const} */
  const UNIT = {
    PCE: "PCE",
    KG: "KG",
    L: "L",
    M: "M",
  };

  /**
   * @typedef {{
   *  id: string;
   *  name: string;
   *  description: string;
   *  image?: string;
   *  unit?: keyof typeof UNIT;
   *  sku?: string;
   * }} Product
   *
   * @typedef {{
   *  id: string;
   *  title: string;
   *  description?: string;
   *  products: Product[];
   * }} Subcategory
   *
   * @typedef {{
   *  id: string;
   *  title: string;
   *  description: string;
   *  image: string;
   *  subcategories: Subcategory[];
   * }} Category
   */

  /** @type {Category[]} */
  const CATEGORIES = [
    {
      id: "equipements-lourds",
      title: "Équipements lourds",
      description: "Godets, convoyeurs, foreuses, compresseurs…",
      image: "assets/images/categories/equipements-lourds.png",
      subcategories: [
        {
          id: "forage",
          title: "Forage & perforation",
          products: [
            {
              id: "foreuse-rotative",
              name: "Foreuse rotative",
              description: "Solution robuste pour campagnes d’exploration et production sur site.",
              image: "assets/images/placeholders/product.png",
              unit: "PCE",
            },
            {
              id: "marteau-hydraulique",
              name: "Marteau hydraulique",
              description: "Accessoire de démolition pour engins (performance et longévité terrain).",
              image: "assets/images/placeholders/product.png",
              unit: "PCE",
            },
          ],
        },
        {
          id: "air-comprime",
          title: "Air comprimé",
          products: [
            {
              id: "compresseur-mobile",
              name: "Compresseur mobile",
              description: "Air comprimé fiable pour opérations minières, maintenance et ateliers.",
              image: "assets/images/placeholders/product.png",
              unit: "PCE",
            },
            {
              id: "accessoires-air",
              name: "Kits & accessoires air",
              description: "Raccords, flexibles et accessoires pour installations et interventions.",
              image: "assets/images/placeholders/product.png",
              unit: "PCE",
            },
          ],
        },
      ],
    },

    {
      id: "pieces-consommables",
      title: "Pièces & consommables",
      description: "Filtres, roulements, courroies, kits d’entretien…",
      image: "assets/images/categories/pieces-consommables.png",
      subcategories: [
        {
          id: "b47",
          title: "Pièces B47",
          products: [
            {
              id: "b47-front-head",
              name: "B47 Front Head",
              description: "Tête avant compatible B47.",
              image: "assets/images/placeholders/product.png",
              unit: "PCE",
            },
            {
              id: "b47-rubber-cover",
              name: "B47 Rubber Cover",
              description: "Protection caoutchouc pour assemblage B47.",
              image: "assets/images/placeholders/product.png",
              unit: "PCE",
            },
          ],
        },
        {
          id: "fils-bobinage",
          title: "Fils de bobinage",
          products: [
            {
              id: "rewinding-wire-075",
              name: "Rewinding Wire 0.75",
              description: "Fil de bobinage 0.75 pour maintenance moteur/induit.",
              image: "assets/images/placeholders/product.png",
              unit: "KG",
            },
          ],
        },
      ],
    },

    {
      id: "securite-epi",
      title: "Sécurité & EPI",
      description: "Casques, lunettes, gants, harnais, signalisation…",
      image: "assets/images/categories/securite-epi.png",
      subcategories: [
        {
          id: "eclairage-site",
          title: "Éclairage & signalisation",
          products: [
            {
              id: "led-double-snake-light",
              name: "LED Double Snake Light",
              description: "Éclairage flexible pour zones de travail et inspection.",
              image: "assets/images/placeholders/product.png",
              unit: "M",
            },
            {
              id: "signalisation",
              name: "Signalisation & balisage",
              description: "Solutions de balisage pour zones à risque et circulation sur site.",
              image: "assets/images/placeholders/product.png",
              unit: "PCE",
            },
          ],
        },
      ],
    },

    {
      id: "instrumentation-capteurs",
      title: "Instrumentation & capteurs",
      description: "Monitoring vibratoire, thermique, niveau, pression…",
      image: "assets/images/categories/instrumentation-capteurs.png",
      subcategories: [
        {
          id: "monitoring",
          title: "Monitoring & mesures",
          products: [
            {
              id: "capteur-vibration",
              name: "Capteur de vibration",
              description: "Surveillance d’état pour anticiper les pannes et réduire les arrêts.",
              image: "assets/images/placeholders/product.png",
              unit: "PCE",
            },
            {
              id: "capteur-pression",
              name: "Capteur de pression",
              description: "Mesure fiable pour hydraulique/process en conditions terrain.",
              image: "assets/images/placeholders/product.png",
              unit: "PCE",
            },
          ],
        },
      ],
    },

    {
      id: "services-techniques",
      title: "Services techniques",
      description: "Maintenance, audits sécurité, optimisation de flotte…",
      image: "assets/images/categories/services-techniques.png",
      subcategories: [
        {
          id: "maintenance",
          title: "Maintenance & support",
          products: [
            {
              id: "plan-maintenance",
              name: "Plan de maintenance",
              description: "Organisation, périodicités et listes de pièces pour sécuriser l’exploitation.",
              image: "assets/images/placeholders/product.png",
            },
            {
              id: "audit-securite",
              name: "Audit sécurité",
              description: "Évaluation terrain + actions prioritaires pour réduire les risques.",
              image: "assets/images/placeholders/product.png",
            },
          ],
        },
      ],
    },

    {
      id: "reactifs-medias-traitement",
      title: "Réactifs & médias de traitement",
      description:
        "Réactifs et consommables de procédé pour le traitement des minerais et des eaux : chaux, floculants, charbon actif, médias de broyage…",
      image: "assets/images/categories/reactifs-medias-traitement.png",
      subcategories: [
        {
          id: "reactifs",
          title: "Réactifs",
          products: [
            {
              id: "chaux",
              name: "Chaux",
              description: "Chaux pour contrôle du pH, neutralisation et préparation de pulpe.",
              image: "assets/images/products/chaux.png",
              unit: "KG",
            },
            {
              id: "floculant",
              name: "Floculant",
              description: "Floculant pour épaississement, clarification et traitement des eaux.",
              image: "assets/images/products/floculant.png",
              unit: "KG",
            },
            {
              id: "charbon-actif",
              name: "Charbon actif",
              description: "Charbon actif pour adsorption (traitement, récupération, polishing).",
              image: "assets/images/products/charbon-actif.png",
              unit: "KG",
            },
          ],
        },
        {
          id: "medias-broyage",
          title: "Médias de broyage",
          products: [
            {
              id: "boulets",
              name: "Boulets",
              description:
                "Boulets de broyage pour broyeurs, adaptés aux contraintes d’usure et performance.",
              image: "assets/images/products/boulets.png",
              unit: "KG",
            },
          ],
        },
      ],
    },

    // Engineering consulting
    {
      id: "conseil-ingenierie",
      title: "Conseil & ingénierie",
      description: "Études, dimensionnement, optimisation et accompagnement terrain.",
      image: "assets/images/categories/conseil-ingenierie.png",
      subcategories: [
        {
          id: "etudes",
          title: "Études & dimensionnement",
          products: [
            {
              id: "etude-dimensionnement",
              name: "Étude de dimensionnement",
              description: "Analyse technique et dimensionnement selon vos contraintes terrain.",
              image: "assets/images/placeholders/product.png",
            },
            {
              id: "audit-procedes",
              name: "Audit de procédés",
              description: "Diagnostic de performance + recommandations actionnables.",
              image: "assets/images/placeholders/product.png",
            },
          ],
        },
      ],
    },
  ];

  window.MINEFECT_CATALOG = { CATEGORIES, UNIT };
})();
