// Single source of truth for the Products catalog.
// Loaded on `products.html` before `products-page.js`.
(function () {
  /** @type {const} */
  const UNIT = {
    PCE: "PCE",
    KG: "KG",
    M: "M",
  };

  /**
   * @typedef {{
   *  id: string;
   *  name_fr: string;
   *  description_fr: string;
   *  image: string;
   *  unit: keyof typeof UNIT;
   *  ref_original?: string;
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

  const PLACEHOLDER_PRODUCT_IMAGE = "assets/images/placeholders/product.png";

  /** @type {Category[]} */
  const CATEGORIES = [
    {
      id: "equipements-lourds",
      title: "Équipements lourds",
      description: "Marteaux piqueurs, compresseurs, accessoires et pièces d’engins.",
      image: "assets/images/categories/equipements-lourds.png",
      subcategories: [
        {
          id: "marteaux-piqueurs",
          title: "Marteaux piqueurs & accessoires",
          products: [
            {
              id: "jackhammer",
              name_fr: "Marteau piqueur",
              ref_original: "JACKHAMMER",
              description_fr:
                "Marteau piqueur pneumatique robuste pour démolition et travaux de roche, conçu pour une cadence élevée et une maintenance simplifiée sur site.",
              image: "assets/images/products/marteau-piqueur.png",
              unit: "PCE",
            },
            {
              id: "body-hammer-125-jieshida",
              name_fr: "Corps de marteau Jieshida 125",
              ref_original: "BODY HAMMER 125 JIESHIDA",
              description_fr:
                "Corps (carter) pour marteau Jieshida 125, conçu pour résister aux chocs et assurer un guidage stable des organes internes.",
              image: "assets/images/products/corps-marteau-jieshida-125.png",
              unit: "PCE",
            },
            {
              id: "piston",
              name_fr: "Piston",
              ref_original: "PISTON",
              description_fr:
                "Piston de rechange pour marteau piqueur, usiné pour garantir l’énergie d’impact et préserver le rendement de l’outil.",
              image: "assets/images/products/piston.png",
              unit: "PCE",
            },
            {
              id: "bague-piston-za",
              name_fr: "Bague de piston (ZA)",
              ref_original: "BOULAGE ZA PISTON",
              description_fr:
                "Bague de piston (ZA) pour guidage et tenue mécanique de l’ensemble mobile, contribuant à réduire l’usure et les jeux.",
              image: "assets/images/products/bague-piston-za.png",
              unit: "PCE",
            },
            {
              id: "bague-zo-mugitwe",
              name_fr: "Bague (ZO Mugitwe)",
              ref_original: "BOULAGE ZO MUGITWE",
              description_fr:
                "Bague (ZO) destinée à l’assemblage et à la maintenance, avec référence d’origine conservée pour assurer la compatibilité.",
              image: "assets/images/products/bague-zo-mugitwe.png",
              unit: "PCE",
            },
            {
              id: "porte-bobine-jieshida-125",
              name_fr: "Porte-bobine Jieshida 125",
              ref_original: "PORTE BOBINE /JIESHIDA 125",
              description_fr:
                "Porte-bobine (porte-charbons) pour Jieshida 125, assurant un maintien fiable des balais et un bon contact électrique.",
              image: "assets/images/products/porte-bobine-jieshida-125.png",
              unit: "PCE",
            },
            {
              id: "burins-longs",
              name_fr: "Burins longs pour marteau piqueur",
              ref_original: "CHISELS /JACKHAMMERS /LONG",
              description_fr:
                "Burins longs pour marteau piqueur, acier traité pour une meilleure tenue à l’usure et une pénétration efficace en chantier.",
              image: "assets/images/products/burins-longs.png",
              unit: "PCE",
            },
            {
              id: "burins-b47",
              name_fr: "Burins pour B47",
              ref_original: "CHISELS FOR B47",
              description_fr:
                "Burins compatibles B47, adaptés aux travaux de percement/démolition, avec géométrie et trempe pensées pour l’endurance.",
              image: "assets/images/products/burins-b47.png",
              unit: "PCE",
            },
            {
              id: "burins-tcd-20",
              name_fr: "Burins pour TCD 20",
              ref_original: "CHISELS FOR TCD 20",
              description_fr:
                "Burins compatibles TCD 20, conçus pour une performance régulière et une durée de vie optimisée en conditions abrasives.",
              image: "assets/images/products/burins-tcd-20.png",
              unit: "PCE",
            },
          ],
        },
        {
          id: "compresseurs-air",
          title: "Compresseurs & pièces B47",
          products: [
            {
              id: "compresseur-b47",
              name_fr: "Compresseur B47",
              ref_original: "B 47 COMPRESSOR",
              description_fr:
                "Compresseur pneumatique B47 pour travaux intensifs sur site, avec conception robuste, pièces disponibles et entretien simplifié.",
              image: "assets/images/products/compresseur-b47.png",
              unit: "PCE",
            },
            {
              id: "b47-tappet-seat",
              name_fr: "Siège de poussoir B47",
              ref_original: "B47 TAPPET SEAT",
              description_fr:
                "Siège de poussoir pour B47, pièce d’appui assurant le bon guidage et la régularité du cycle de fonctionnement.",
              image: "assets/images/products/siege-poussoir-b47.png",
              unit: "PCE",
            },
            {
              id: "b47-front-head",
              name_fr: "Tête avant B47",
              ref_original: "B47 FRONT HEAD",
              description_fr:
                "Tête avant compatible B47, support avant assurant le guidage, la protection et la stabilité de l’ensemble en service.",
              image: "assets/images/products/tete-avant-b47.png",
              unit: "PCE",
            },
            {
              id: "b47-steel-retainer",
              name_fr: "Bague de retenue acier B47",
              ref_original: "B47 STEEL RETAINER",
              description_fr:
                "Bague de retenue en acier pour assemblage B47, conçue pour maintenir les composants malgré vibrations et chocs.",
              image: "assets/images/products/bague-retenue-acier-b47.png",
              unit: "PCE",
            },
            {
              id: "b47-rubber-cover",
              name_fr: "Protection caoutchouc B47",
              ref_original: "B47 RUBBER COVER",
              description_fr:
                "Protection caoutchouc pour B47, limite l’entrée de poussières et amortit les chocs pour prolonger la durée de vie.",
              image: "assets/images/products/protection-caoutchouc-b47.png",
              unit: "PCE",
            },
          ],
        },
        {
          id: "dents-accessoires",
          title: "Pointes & accessoires d’engins",
          products: [
            {
              id: "pointe-1u3352rc-pin-lock",
              name_fr: "Pointe 1U3352RC + goupille de verrouillage",
              ref_original: "TIPS/1U3352RC+PIN LOCK",
              description_fr:
                "Pointe type 1U3352RC avec goupille de verrouillage, conçue pour résister à l’abrasion et sécuriser le montage sur dents.",
              image: "assets/images/products/pointe-1u3352rc-pin-lock.png",
              unit: "PCE",
            },
            {
              id: "moteur-dumper",
              name_fr: "Moteur de dumper",
              ref_original: "MOTEUR DUMPER",
              description_fr:
                "Moteur de dumper (selon modèle), solution de remplacement pour maintenir la disponibilité de l’engin; sélection sur référence.",
              image: "assets/images/products/moteur-dumper.png",
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
          id: "electricite-moteurs",
          title: "Électricité & moteurs",
          products: [
            {
              id: "induit-jieshida",
              name_fr: "Induit Jieshida",
              ref_original: "INDUIT /JIESHIDA",
              description_fr:
                "Induit (rotor) pour équipements Jieshida, équilibré pour un fonctionnement stable et un couple régulier en charge.",
              image: "assets/images/products/induit-jieshida.png",
              unit: "PCE",
            },
            {
              id: "interrupteur",
              name_fr: "Interrupteur",
              ref_original: "SWITCH",
              description_fr:
                "Interrupteur de remplacement pour outillage/équipement, conçu pour des contacts fiables et une bonne durée de vie.",
              image: "assets/images/products/interrupteur.png",
              unit: "PCE",
            },
            {
              id: "verrou",
              name_fr: "Verrou",
              ref_original: "LOCK",
              description_fr:
                "Verrou de maintien/assemblage, destiné à sécuriser les organes et limiter les jeux en service.",
              image: "assets/images/products/verrou.png",
              unit: "PCE",
            },
            {
              id: "fil-bobinage-075",
              name_fr: "Fil de bobinage 0,75 mm",
              ref_original: "REWINDING WIRE 0.75",
              description_fr:
                "Fil de bobinage cuivre émaillé 0,75 mm pour rebobinage moteur, avec isolation adaptée aux contraintes d’atelier.",
              image: "assets/images/products/fil-bobinage.png",
              unit: "KG",
            },
            {
              id: "fil-bobinage-09",
              name_fr: "Fil de bobinage 0,9 mm",
              ref_original: "REWINDING WIRE 0.9",
              description_fr:
                "Fil de bobinage cuivre émaillé 0,9 mm pour rebobinage moteur, garantissant une bonne tenue électrique et thermique.",
              image: "assets/images/products/fil-bobinage.png",
              unit: "KG",
            },
            {
              id: "fil-bobinage-10",
              name_fr: "Fil de bobinage 1,0 mm",
              ref_original: "REWINDING WIRE 1",
              description_fr:
                "Fil de bobinage cuivre émaillé 1,0 mm pour rebobinage et réparation, conforme aux exigences d’isolation et de fiabilité.",
              image: "assets/images/products/fil-bobinage.png",
              unit: "KG",
            },
          ],
        },
        {
          id: "outillage-electroportatif",
          title: "Outillage électroportatif",
          products: [
            {
              id: "meuleuse-ga9020",
              name_fr: "Meuleuse Makita GA9020",
              ref_original: "PONCEUSES GA 9020/CUTTING MACHINE",
              description_fr:
                "Meuleuse d’angle 230 mm type GA9020, idéale pour coupe et ébarbage; puissance élevée et ergonomie adaptée au chantier.",
              image: "assets/images/products/meuleuse-ga9020.png",
              unit: "PCE",
            },
            {
              id: "induit-ga9020",
              name_fr: "Induit pour meuleuse GA9020",
              ref_original: "INDUIT/PONCEUSE GA 9020",
              description_fr:
                "Induit de remplacement pour meuleuse type GA9020, équilibrage et isolation conçus pour limiter l’échauffement.",
              image: "assets/images/products/induit-ga9020.png",
              unit: "PCE",
            },
            {
              id: "balais-ga9020",
              name_fr: "Balais carbone pour Makita GA9020",
              ref_original: "CHARBON PONCEUSE MAKITA GA9020",
              description_fr:
                "Jeu de balais carbone pour meuleuse type GA9020, assurant un contact stable, une usure régulière et moins d’étincelles.",
              image: "assets/images/products/balais-ga9020.png",
              unit: "PCE",
            },
            {
              id: "bride-ga9020",
              name_fr: "Bride pour GA9020",
              ref_original: "BRIDE/PONCEUSEGA9020",
              description_fr:
                "Bride de serrage pour meuleuse type GA9020, garantissant un maintien sûr du disque et une compatibilité avec l’arbre.",
              image: "assets/images/products/bride-ga9020.png",
              unit: "PCE",
            },
            {
              id: "pignon-engrenage",
              name_fr: "Pignon + engrenage",
              ref_original: "PIGNON+ENGLENAGE",
              description_fr:
                "Ensemble pignon + engrenage pour transmission (selon machine), usinage précis pour un engrènement régulier et durable.",
              image: "assets/images/products/pignon-engrenage.png",
              unit: "PCE",
            },
          ],
        },
        {
          id: "roulements-consommables",
          title: "Roulements & consommables",
          products: [
            {
              id: "roulements-brouette",
              name_fr: "Roulements de brouette",
              ref_original: "BEARINGS FOR WHEEL BARROW",
              description_fr:
                "Roulements pour roue de brouette, offrant une rotation fluide et une bonne résistance à la poussière et aux charges.",
              image: "assets/images/products/roulements-brouette.png",
              unit: "PCE",
            },
            {
              id: "balais-carbone-95",
              name_fr: "Balais carbone 95",
              ref_original: "CHARBON 95",
              description_fr:
                "Balais carbone (réf. 95) pour moteurs/outillage, conçus pour un bon contact et une usure maîtrisée.",
              image: "assets/images/products/balais-carbone.png",
              unit: "PCE",
            },
            {
              id: "balais-carbone-125",
              name_fr: "Balais carbone 125",
              ref_original: "CHARBON 125",
              description_fr:
                "Balais carbone (réf. 125) pour moteurs/outillage, assurant une conduction stable et une bonne durée de service.",
              image: "assets/images/products/balais-carbone.png",
              unit: "PCE",
            },
            {
              id: "futs-bidons",
              name_fr: "Fûts / bidons (contenants)",
              ref_original: "CASKS",
              description_fr:
                "Contenants (fûts/bidons) pour stockage et transport de consommables et fluides, avec options selon volume et usage.",
              image: "assets/images/products/futs-bidons.png",
              unit: "PCE",
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
              id: "lampe-led-double-flexible",
              name_fr: "Lampe LED double flexible",
              ref_original: "LED DOUBLE SNAKE LIGHT",
              description_fr:
                "Lampe LED double flexible pour zones de travail et inspection, à faible consommation et orientation rapide sur site.",
              image: "assets/images/products/lampe-led-double-flexible.png",
              unit: "PCE",
            },
            {
              id: "signalisation",
              name_fr: "Signalisation & balisage",
              description_fr:
                "Rubalise, cônes, panneaux et accessoires de balisage pour sécuriser les zones à risque et la circulation sur site.",
              image: PLACEHOLDER_PRODUCT_IMAGE,
              unit: "PCE",
            },
          ],
        },
      ],
    },

    {
      id: "instrumentation-capteurs",
      title: "Instrumentation & capteurs",
      description: "Surveillance vibratoire, thermique, niveau, pression…",
      image: "assets/images/categories/instrumentation-capteurs.png",
      subcategories: [
        {
          id: "surveillance-mesures",
          title: "Surveillance & mesures",
          products: [
            {
              id: "capteur-vibration",
              name_fr: "Capteur de vibration",
              description_fr:
                "Capteur de vibration pour monitoring conditionnel des machines tournantes, permettant une détection précoce des défauts.",
              image: PLACEHOLDER_PRODUCT_IMAGE,
              unit: "PCE",
            },
            {
              id: "capteur-pression",
              name_fr: "Capteur de pression",
              description_fr:
                "Capteur de pression industriel pour hydraulique et procédé, offrant une mesure stable en environnement terrain exigeant.",
              image: PLACEHOLDER_PRODUCT_IMAGE,
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
              name_fr: "Plan de maintenance",
              description_fr:
                "Élaboration de plans de maintenance préventive (gammes, périodicités, pièces critiques) pour réduire les arrêts et maîtriser les coûts.",
              image: PLACEHOLDER_PRODUCT_IMAGE,
              unit: "PCE",
            },
            {
              id: "audit-securite",
              name_fr: "Audit sécurité",
              description_fr:
                "Audit HSE terrain avec constats, priorisation des actions et recommandations opérationnelles pour renforcer la conformité.",
              image: PLACEHOLDER_PRODUCT_IMAGE,
              unit: "PCE",
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
              name_fr: "Chaux",
              description_fr:
                "Chaux industrielle pour régulation du pH, neutralisation et conditionnement de pulpe, avec granulométrie adaptée selon procédé.",
              image: "assets/images/products/chaux.png",
              unit: "KG",
            },
            {
              id: "floculant",
              name_fr: "Floculant",
              description_fr:
                "Floculant polymère pour épaississement/clarification, améliorant la décantation et la qualité de l’eau recyclée.",
              image: "assets/images/products/floculant.png",
              unit: "KG",
            },
            {
              id: "charbon-actif",
              name_fr: "Charbon actif",
              description_fr:
                "Charbon actif à haute surface spécifique pour adsorption et polissage final, adapté au traitement des eaux et aux applications procédé.",
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
              name_fr: "Boulets",
              description_fr:
                "Boulets de broyage en acier pour broyeurs, disponibles en plusieurs diamètres/duretés pour optimiser l’usure et la performance.",
              image: "assets/images/products/boulets.png",
              unit: "KG",
            },
          ],
        },
      ],
    },

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
              name_fr: "Étude de dimensionnement",
              description_fr:
                "Étude de dimensionnement (débits, charge, contraintes terrain) et note de calcul pour fiabiliser vos choix d’équipement.",
              image: PLACEHOLDER_PRODUCT_IMAGE,
              unit: "PCE",
            },
            {
              id: "audit-procedes",
              name_fr: "Audit de procédés",
              description_fr:
                "Audit de procédés avec diagnostic performance, identification des goulots et plan d’amélioration actionnable.",
              image: PLACEHOLDER_PRODUCT_IMAGE,
              unit: "PCE",
            },
          ],
        },
      ],
    },
  ];

  window.MINEFECT_CATALOG = { CATEGORIES, UNIT };
})();
