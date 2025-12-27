// Single source of truth for the Products catalog (English pages).
// Loaded on `products-en.html` / `contact-en.html` before renderer scripts.
(function () {
  /** @type {const} */
  const UNIT = {
    PCE: "PCE",
    KG: "KG",
    M: "M",
  };

  /**
   * NOTE:
   * The site renderer expects `title/description` on categories and `name_fr/description_fr` on products.
   * For English pages, we reuse these display fields with English copy to avoid duplicating renderer logic.
   */

  const PLACEHOLDER_PRODUCT_IMAGE = "assets/images/placeholders/product.png";

  /** @type {import('./catalog.js').MINEFECT_CATALOG extends never ? any : any} */
  const CATEGORIES = [
    {
      id: "equipements-lourds",
      title: "Heavy equipment",
      description: "Jackhammers, compressors, accessories and machine parts.",
      image: "assets/images/categories/equipements-lourds.png",
      subcategories: [
        {
          id: "marteaux-piqueurs",
          title: "Jackhammers & accessories",
          products: [
            {
              id: "jackhammer",
              name_fr: "Pneumatic jackhammer",
              ref_original: "JACKHAMMER",
              description_fr:
                "Heavy-duty pneumatic jackhammer for demolition and rock work, designed for high production rates and easy on-site maintenance.",
              image: "assets/images/products/marteau-piqueur.png",
              unit: "PCE",
            },
            {
              id: "body-hammer-125-jieshida",
              name_fr: "Jieshida 125 hammer body",
              ref_original: "BODY HAMMER 125 JIESHIDA",
              description_fr:
                "Body/casing for Jieshida 125 hammer, built to withstand impacts and ensure stable guidance of internal components.",
              image: "assets/images/products/corps-marteau-jieshida-125.png",
              unit: "PCE",
            },
            {
              id: "piston",
              name_fr: "Piston",
              ref_original: "PISTON",
              description_fr:
                "Replacement piston for jackhammer, machined to maintain impact energy and preserve overall tool efficiency.",
              image: "assets/images/products/piston.png",
              unit: "PCE",
            },
            {
              id: "bague-piston-za",
              name_fr: "Piston bushing (ZA)",
              ref_original: "BOULAGE ZA PISTON",
              description_fr:
                "Piston bushing (ZA) for guidance and mechanical support of the moving assembly, helping reduce wear and play.",
              image: "assets/images/products/bague-piston-za.png",
              unit: "PCE",
            },
            {
              id: "bague-zo-mugitwe",
              name_fr: "Bushing (ZO Mugitwe)",
              ref_original: "BOULAGE ZO MUGITWE",
              description_fr:
                "Bushing (ZO) for assembly and maintenance; original reference kept to ensure compatibility.",
              image: "assets/images/products/bague-zo-mugitwe.png",
              unit: "PCE",
            },
            {
              id: "porte-bobine-jieshida-125",
              name_fr: "Jieshida 125 brush holder",
              ref_original: "PORTE BOBINE /JIESHIDA 125",
              description_fr:
                "Brush/coil holder (brush holder) for Jieshida 125, ensuring secure brush retention and reliable electrical contact.",
              image: "assets/images/products/porte-bobine-jieshida-125.png",
              unit: "PCE",
            },
            {
              id: "burins-longs",
              name_fr: "Long chisels for jackhammer",
              ref_original: "CHISELS /JACKHAMMERS /LONG",
              description_fr:
                "Long chisels for jackhammers; heat-treated steel for improved wear resistance and effective penetration on site.",
              image: "assets/images/products/burins-longs.png",
              unit: "PCE",
            },
            {
              id: "burins-b47",
              name_fr: "Chisels for B47",
              ref_original: "CHISELS FOR B47",
              description_fr:
                "B47-compatible chisels for drilling/demolition work, with geometry and heat treatment designed for durability.",
              image: "assets/images/products/burins-b47.png",
              unit: "PCE",
            },
            {
              id: "burins-tcd-20",
              name_fr: "Chisels for TCD 20",
              ref_original: "CHISELS FOR TCD 20",
              description_fr:
                "TCD 20-compatible chisels designed for consistent performance and optimized lifetime in abrasive conditions.",
              image: "assets/images/products/burins-tcd-20.png",
              unit: "PCE",
            },
          ],
        },
        {
          id: "compresseurs-air",
          title: "B47 compressors & parts",
          products: [
            {
              id: "compresseur-b47",
              name_fr: "B47 compressor",
              ref_original: "B 47 COMPRESSOR",
              description_fr:
                "B47 pneumatic compressor for heavy-duty field work, with robust design, available spares, and simplified maintenance.",
              image: "assets/images/products/compresseur-b47.png",
              unit: "PCE",
            },
            {
              id: "b47-tappet-seat",
              name_fr: "B47 tappet seat",
              ref_original: "B47 TAPPET SEAT",
              description_fr:
                "Tappet seat for B47; support component ensuring proper guidance and stable operating cycles.",
              image: "assets/images/products/siege-poussoir-b47.png",
              unit: "PCE",
            },
            {
              id: "b47-front-head",
              name_fr: "B47 front head",
              ref_original: "B47 FRONT HEAD",
              description_fr:
                "B47-compatible front head, providing guidance, protection and stability of the assembly in operation.",
              image: "assets/images/products/tete-avant-b47.png",
              unit: "PCE",
            },
            {
              id: "b47-steel-retainer",
              name_fr: "B47 steel retainer ring",
              ref_original: "B47 STEEL RETAINER",
              description_fr:
                "Steel retainer ring for B47 assembly, designed to hold components under vibration and shock loads.",
              image: "assets/images/products/bague-retenue-acier-b47.png",
              unit: "PCE",
            },
            {
              id: "b47-rubber-cover",
              name_fr: "B47 rubber cover",
              ref_original: "B47 RUBBER COVER",
              description_fr:
                "Rubber cover for B47; reduces dust ingress and dampens impacts to extend service life.",
              image: "assets/images/products/protection-caoutchouc-b47.png",
              unit: "PCE",
            },
          ],
        },
        {
          id: "dents-accessoires",
          title: "Tips & machine accessories",
          products: [
            {
              id: "pointe-1u3352rc-pin-lock",
              name_fr: "1U3352RC tip + locking pin",
              ref_original: "TIPS/1U3352RC+PIN LOCK",
              description_fr:
                "1U3352RC-type tip with locking pin, built for abrasion resistance and secure mounting on teeth.",
              image: "assets/images/products/pointe-1u3352rc-pin-lock.png",
              unit: "PCE",
            },
            {
              id: "moteur-dumper",
              name_fr: "Dumper engine",
              ref_original: "MOTEUR DUMPER",
              description_fr:
                "Dumper engine (model-dependent). Replacement solution to maintain equipment availability; selected by reference.",
              image: "assets/images/products/moteur-dumper.png",
              unit: "PCE",
            },
          ],
        },
      ],
    },

    {
      id: "pieces-consommables",
      title: "Spare parts & consumables",
      description: "Filters, bearings, belts, maintenance kits…",
      image: "assets/images/categories/pieces-consommables.png",
      subcategories: [
        {
          id: "electricite-moteurs",
          title: "Electrical & motors",
          products: [
            {
              id: "induit-jieshida",
              name_fr: "Jieshida armature (rotor)",
              ref_original: "INDUIT /JIESHIDA",
              description_fr:
                "Armature/rotor for Jieshida equipment, balanced for stable operation and consistent torque under load.",
              image: "assets/images/products/induit-jieshida.png",
              unit: "PCE",
            },
            {
              id: "interrupteur",
              name_fr: "Switch",
              ref_original: "SWITCH",
              description_fr:
                "Replacement switch for tools/equipment, designed for reliable contacts and extended service life.",
              image: "assets/images/products/interrupteur.png",
              unit: "PCE",
            },
            {
              id: "verrou",
              name_fr: "Lock",
              ref_original: "LOCK",
              description_fr: "Locking component for retention/assembly to secure parts and minimize play in service.",
              image: "assets/images/products/verrou.png",
              unit: "PCE",
            },
            {
              id: "fil-bobinage-075",
              name_fr: "Rewinding wire 0.75 mm",
              ref_original: "REWINDING WIRE 0.75",
              description_fr:
                "Enameled copper rewinding wire 0.75 mm for motor rewinding, with insulation suitable for workshop conditions.",
              image: "assets/images/products/fil-bobinage.png",
              unit: "KG",
            },
            {
              id: "fil-bobinage-09",
              name_fr: "Rewinding wire 0.9 mm",
              ref_original: "REWINDING WIRE 0.9",
              description_fr:
                "Enameled copper rewinding wire 0.9 mm for motor rewinding, ensuring good electrical and thermal performance.",
              image: "assets/images/products/fil-bobinage.png",
              unit: "KG",
            },
            {
              id: "fil-bobinage-10",
              name_fr: "Rewinding wire 1.0 mm",
              ref_original: "REWINDING WIRE 1",
              description_fr:
                "Enameled copper rewinding wire 1.0 mm for repairs, meeting insulation and reliability requirements.",
              image: "assets/images/products/fil-bobinage.png",
              unit: "KG",
            },
          ],
        },
        {
          id: "outillage-electroportatif",
          title: "Power tools",
          products: [
            {
              id: "meuleuse-ga9020",
              name_fr: "Angle grinder 230 mm (GA9020 type)",
              ref_original: "PONCEUSES GA 9020/CUTTING MACHINE",
              description_fr:
                "230 mm angle grinder (GA9020 type) for cutting and grinding; high power and site-ready ergonomics.",
              image: "assets/images/products/meuleuse-ga9020.png",
              unit: "PCE",
            },
            {
              id: "induit-ga9020",
              name_fr: "Armature for GA9020 grinder",
              ref_original: "INDUIT/PONCEUSE GA 9020",
              description_fr:
                "Replacement armature for GA9020-type grinder; balanced and insulated to limit heating.",
              image: "assets/images/products/induit-ga9020.png",
              unit: "PCE",
            },
            {
              id: "balais-ga9020",
              name_fr: "Carbon brushes for GA9020",
              ref_original: "CHARBON PONCEUSE MAKITA GA9020",
              description_fr:
                "Carbon brush set for GA9020-type grinder, ensuring stable contact, consistent wear and reduced sparking.",
              image: "assets/images/products/balais-ga9020.png",
              unit: "PCE",
            },
            {
              id: "bride-ga9020",
              name_fr: "Clamp flange for GA9020",
              ref_original: "BRIDE/PONCEUSEGA9020",
              description_fr:
                "Clamping flange for GA9020-type grinder, ensuring safe disc retention and spindle compatibility.",
              image: "assets/images/products/bride-ga9020.png",
              unit: "PCE",
            },
            {
              id: "pignon-engrenage",
              name_fr: "Pinion + gear set",
              ref_original: "PIGNON+ENGLENAGE",
              description_fr:
                "Pinion + gear set for transmission (machine-dependent), precision machined for smooth and durable meshing.",
              image: "assets/images/products/pignon-engrenage.png",
              unit: "PCE",
            },
          ],
        },
        {
          id: "roulements-consommables",
          title: "Bearings & consumables",
          products: [
            {
              id: "roulements-brouette",
              name_fr: "Wheelbarrow wheel bearings",
              ref_original: "BEARINGS FOR WHEEL BARROW",
              description_fr:
                "Bearings for wheelbarrow wheels, providing smooth rotation and good resistance to dust and loads.",
              image: "assets/images/products/roulements-brouette.png",
              unit: "PCE",
            },
            {
              id: "balais-carbone-95",
              name_fr: "Carbon brushes 95",
              ref_original: "CHARBON 95",
              description_fr:
                "Carbon brushes (ref. 95) for motors/tools, designed for good contact and controlled wear.",
              image: "assets/images/products/balais-carbone.png",
              unit: "PCE",
            },
            {
              id: "balais-carbone-125",
              name_fr: "Carbon brushes 125",
              ref_original: "CHARBON 125",
              description_fr:
                "Carbon brushes (ref. 125) for motors/tools, ensuring stable conduction and good service life.",
              image: "assets/images/products/balais-carbone.png",
              unit: "PCE",
            },
            {
              id: "futs-bidons",
              name_fr: "Drums / jerrycans (containers)",
              ref_original: "CASKS",
              description_fr:
                "Containers (drums/jerrycans) for storage and transport of consumables and liquids, with options by volume and use case.",
              image: "assets/images/products/futs-bidons.png",
              unit: "PCE",
            },
          ],
        },
      ],
    },

    {
      id: "securite-epi",
      title: "Safety & PPE",
      description: "Helmets, glasses, gloves, harnesses, signage…",
      image: "assets/images/categories/securite-epi.png",
      subcategories: [
        {
          id: "eclairage-site",
          title: "Lighting & signage",
          products: [
            {
              id: "lampe-led-double-flexible",
              name_fr: "Dual flexible LED lamp",
              ref_original: "LED DOUBLE SNAKE LIGHT",
              description_fr:
                "Dual flexible LED lamp for work and inspection areas, low power consumption and quick orientation on site.",
              image: "assets/images/products/lampe-led-double-flexible.png",
              unit: "PCE",
            },
            {
              id: "signalisation",
              name_fr: "Signage & marking",
              description_fr:
                "Barrier tape, cones, signs and marking accessories to secure risk areas and manage site traffic.",
              image: PLACEHOLDER_PRODUCT_IMAGE,
              unit: "PCE",
            },
          ],
        },
      ],
    },

    {
      id: "instrumentation-capteurs",
      title: "Instrumentation & sensors",
      description: "Vibration, temperature, level and pressure monitoring…",
      image: "assets/images/categories/instrumentation-capteurs.png",
      subcategories: [
        {
          id: "surveillance-mesures",
          title: "Monitoring & measurements",
          products: [
            {
              id: "capteur-vibration",
              name_fr: "Vibration sensor",
              description_fr:
                "Condition monitoring sensor for rotating machinery, enabling early fault detection and reduced downtime.",
              image: PLACEHOLDER_PRODUCT_IMAGE,
              unit: "PCE",
            },
            {
              id: "capteur-pression",
              name_fr: "Pressure sensor",
              description_fr:
                "Industrial pressure sensor for hydraulic and process applications, providing stable measurement in harsh environments.",
              image: PLACEHOLDER_PRODUCT_IMAGE,
              unit: "PCE",
            },
          ],
        },
      ],
    },

    {
      id: "services-techniques",
      title: "Technical services",
      description: "Maintenance, safety audits, fleet optimization…",
      image: "assets/images/categories/services-techniques.png",
      subcategories: [
        {
          id: "maintenance",
          title: "Maintenance & support",
          products: [
            {
              id: "plan-maintenance",
              name_fr: "Maintenance plan",
              description_fr:
                "Preventive maintenance planning (tasks, intervals, critical spares) to reduce downtime and control costs.",
              image: PLACEHOLDER_PRODUCT_IMAGE,
              unit: "PCE",
            },
            {
              id: "audit-securite",
              name_fr: "Safety audit",
              description_fr:
                "On-site HSE audit with findings, action prioritization and practical recommendations to strengthen compliance.",
              image: PLACEHOLDER_PRODUCT_IMAGE,
              unit: "PCE",
            },
          ],
        },
      ],
    },

    {
      id: "reactifs-medias-traitement",
      title: "Reagents & process media",
      description:
        "Process reagents and consumables for ore and water treatment: lime, flocculants, activated carbon, grinding media…",
      image: "assets/images/categories/reactifs-medias-traitement.png",
      subcategories: [
        {
          id: "reactifs",
          title: "Reagents",
          products: [
            {
              id: "chaux",
              name_fr: "Lime",
              description_fr:
                "Industrial lime for pH control, neutralization and slurry conditioning, with process-adapted particle size.",
              image: "assets/images/products/chaux.png",
              unit: "KG",
            },
            {
              id: "floculant",
              name_fr: "Flocculant",
              description_fr:
                "Polymer flocculant for thickening/clarification to improve settling and recycled water quality.",
              image: "assets/images/products/floculant.png",
              unit: "KG",
            },
            {
              id: "charbon-actif",
              name_fr: "Activated carbon",
              description_fr:
                "High-surface-area activated carbon for adsorption and final polishing, suitable for water treatment and process applications.",
              image: "assets/images/products/charbon-actif.png",
              unit: "KG",
            },
          ],
        },
        {
          id: "medias-broyage",
          title: "Grinding media",
          products: [
            {
              id: "boulets",
              name_fr: "Grinding balls",
              description_fr:
                "Steel grinding balls for mills, available in various diameters/hardness grades to optimize wear and performance.",
              image: "assets/images/products/boulets.png",
              unit: "KG",
            },
          ],
        },
      ],
    },

    {
      id: "conseil-ingenierie",
      title: "Consulting & engineering",
      description: "Studies, sizing, optimization and on-site support.",
      image: "assets/images/categories/conseil-ingenierie.png",
      subcategories: [
        {
          id: "etudes",
          title: "Studies & sizing",
          products: [
            {
              id: "etude-dimensionnement",
              name_fr: "Sizing study",
              description_fr:
                "Sizing study (flows, loads, site constraints) and calculation note to support robust equipment decisions.",
              image: PLACEHOLDER_PRODUCT_IMAGE,
              unit: "PCE",
            },
            {
              id: "audit-procedes",
              name_fr: "Process audit",
              description_fr:
                "Process performance audit to identify bottlenecks and deliver an actionable improvement plan.",
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

