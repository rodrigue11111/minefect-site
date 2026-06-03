import type { Locale } from '@/i18n/utils';

interface L { fr: string; en: string }
export interface SectorStat { value: string | L; label: L }
export interface SectorItem { title: L; body: L }
export interface Sector {
  id: string;
  slug: { fr: string; en: string };
  title: L;
  lead: L;
  teaser: L;
  image: string;
  stats: SectorStat[];
  context: L;
  challenges: SectorItem[];
  solutions: SectorItem[];
}

/** The six intervention sectors — one source replacing the 12 legacy sector HTML files (FR + EN). */
export const SECTORS: Sector[] = [
  {
    id: 'ciel-ouvert',
    slug: { fr: 'ciel-ouvert', en: 'open-pit' },
    title: { fr: 'Mines à ciel ouvert', en: 'Open-pit mining' },
    lead: { fr: 'Production à grande échelle · Engins lourds · Gestion des poussières', en: 'Large-scale production · Heavy equipment · Dust management' },
    teaser: { fr: 'Forage, sautage, chargement et transport à grande échelle.', en: 'Large-scale drilling, blasting, loading and haulage.' },
    image: '/assets/images/sectors/mines-ciel-ouvert.png',
    stats: [
      { value: '10M+', label: { fr: 't/an traités', en: 't/year processed' } },
      { value: '200+', label: { fr: 'engins par site', en: 'machines per site' } },
      { value: '>90%', label: { fr: 'disponibilité cible', en: 'target availability' } },
      { value: '24/7', label: { fr: 'opérations continues', en: 'continuous operations' } },
    ],
    context: {
      fr: "Les mines à ciel ouvert dominent la production mondiale de métaux et de minéraux industriels. Ces opérations mobilisent des flottes d'engins lourds et génèrent des volumes colossaux. En Afrique subsaharienne, où MINEFECT concentre son activité, ces sites font face à des défis amplifiés : chaleur intense, poussières abrasives et éloignement logistique. Chaque heure d'arrêt non planifié peut coûter entre 5 000 $ et 30 000 $ — MINEFECT vous accompagne avec des consommables haute performance, des pièces d'usure et une gestion logistique pour sécuriser vos objectifs de production.",
      en: 'Open-pit mines dominate global production of metals and industrial minerals. These operations deploy massive equipment fleets and generate enormous volumes. In Sub-Saharan Africa, where MINEFECT focuses, sites face amplified challenges: intense heat, abrasive dust and logistical distance. Each unplanned downtime hour can cost between $5,000 and $30,000 — MINEFECT supports you with high-performance consumables, wear parts and logistics to secure your production targets.',
    },
    challenges: [
      { title: { fr: 'Usure accélérée des composants', en: 'Accelerated component wear' }, body: { fr: "L'environnement abrasif soumet bords de coupe, blindages de benne et filtres à une usure intensive — la durée de vie peut être divisée par deux ou trois sans consommables adaptés.", en: 'The abrasive environment subjects cutting edges, bucket liners and filters to intensive wear — service life can be cut two- or three-fold without adapted consumables.' } },
      { title: { fr: 'Optimisation des cycles forage-tir', en: 'Optimising drill-blast cycles' }, body: { fr: 'La qualité des consommables de forage influence directement la fragmentation, et donc les coûts de chargement, transport et concassage primaire.', en: 'Drilling-consumable quality directly drives fragmentation, and therefore loading, hauling and primary-crushing costs.' } },
      { title: { fr: 'Contrôle des émissions de poussières', en: 'Dust emission control' }, body: { fr: 'Pistes, zones de déchargement et fronts d’abattage émettent des poussières — un enjeu sanitaire et réglementaire croissant en Afrique.', en: 'Haul roads, dump areas and blast faces emit dust — a growing health and regulatory issue across Africa.' } },
    ],
    solutions: [
      { title: { fr: 'Lubrifiants synthétiques haute performance', en: 'High-performance synthetic lubricants' }, body: { fr: 'Adaptés aux températures extrêmes africaines, prolongeant les intervalles de vidange.', en: 'Formulated for extreme African temperatures, extending drain intervals.' } },
      { title: { fr: "Pièces d'usure sur mesure", en: 'Custom wear parts' }, body: { fr: 'Bords de coupe, dents de godet et blindages selon la dureté et l’abrasivité de votre roche.', en: 'Cutting edges, bucket teeth and liners matched to your rock hardness and abrasivity.' } },
      { title: { fr: 'Consommables de forage', en: 'Drilling consumables' }, body: { fr: 'Couronnes tricônes, tiges et stabilisateurs pour maximiser la pénétration.', en: 'Tricone bits, drill rods and stabilisers to maximise penetration rate.' } },
      { title: { fr: 'Systèmes de suppression des poussières', en: 'Dust suppression systems' }, body: { fr: 'Buses, additifs de fixation et arroseurs automatisés pour pistes et zones de transbordement.', en: 'Nozzles, binding additives and automated watering for haul roads and transfer points.' } },
      { title: { fr: 'Support logistique en zones isolées', en: 'Remote logistics support' }, body: { fr: 'Livraisons programmées et gestion de stock tampon pour éviter toute rupture critique.', en: 'Scheduled deliveries and buffer-stock management to prevent critical disruption.' } },
    ],
  },
  {
    id: 'souterrain',
    slug: { fr: 'souterrain', en: 'underground' },
    title: { fr: 'Mines souterraines', en: 'Underground mining' },
    lead: { fr: 'Ventilation · Sécurité critique · Environnements confinés', en: 'Ventilation · Critical safety · Confined environments' },
    teaser: { fr: 'Soutènement, ventilation et équipements adaptés au fond.', en: 'Ground support, ventilation and underground-ready equipment.' },
    image: '/assets/images/sectors/mines-souterraines.jpg',
    stats: [
      { value: '3km+', label: { fr: 'galeries en profondeur', en: 'gallery depth' } },
      { value: '300+', label: { fr: 'travailleurs simultanés', en: 'simultaneous workers' } },
      { value: '24/7', label: { fr: 'ventilation critique', en: 'critical ventilation' } },
      { value: '99%', label: { fr: 'fiabilité sécurité exigée', en: 'required safety reliability' } },
    ],
    context: {
      fr: "Les mines souterraines représentent les environnements les plus exigeants de l'industrie. À des centaines ou milliers de mètres de profondeur, les équipes travaillent sous haute pression, température et humidité, en présence potentielle de gaz dangereux. La moindre défaillance d'un équipement de sécurité peut avoir des conséquences irréversibles. MINEFECT sélectionne des équipements certifiés ATEX ou équivalent et assure une disponibilité de stock critique pour les composants qui ne tolèrent aucune rupture.",
      en: 'Underground mines are the most demanding environments in the industry. Hundreds or thousands of metres below surface, teams work under high pressure, temperature and humidity, with potential hazardous gases. Any safety-system failure can have irreversible consequences. MINEFECT selects ATEX-certified (or equivalent) equipment and ensures critical-stock availability for components that tolerate zero interruption.',
    },
    challenges: [
      { title: { fr: "Ventilation et qualité de l'air", en: 'Ventilation and air quality' }, body: { fr: 'La ventilation est le premier système de sécurité — un arrêt peut imposer l’évacuation immédiate de la mine.', en: 'Ventilation is the primary safety system — a failure can trigger immediate mine evacuation.' } },
      { title: { fr: 'Soutènement et géomécanique', en: 'Ground support and geomechanics' }, body: { fr: 'La stabilité des galeries dépend de la qualité du soutènement : boulons, gunitage, cintres et grillages.', en: 'Gallery stability depends on support quality: rock bolts, shotcrete, steel sets and mesh.' } },
      { title: { fr: 'Fiabilité des systèmes critiques', en: 'Critical system reliability' }, body: { fr: 'Pompes de dénoyage, éclairage de secours et détecteurs de gaz doivent fonctionner à 100 % — la disponibilité des pièces est non négociable.', en: 'Dewatering pumps, emergency lighting and gas detectors must run at 100% — parts availability is non-negotiable.' } },
    ],
    solutions: [
      { title: { fr: 'Composants de ventilation certifiés', en: 'Certified ventilation components' }, body: { fr: 'Ventilateurs, conduits flexibles et rigides homologués pour usage souterrain.', en: 'Fans, flexible and rigid ducting approved for underground use.' } },
      { title: { fr: 'Matériaux de soutènement', en: 'Ground support materials' }, body: { fr: 'Boulons d’ancrage (mécanique, résine, câblé), treillis, profilés et béton projeté.', en: 'Rock bolts (mechanical, resin, cable), mesh, steel sets and shotcrete.' } },
      { title: { fr: 'Pompes de dénoyage et pièces', en: 'Dewatering pumps and spares' }, body: { fr: 'Pompes submersibles et de surface avec stocks de pièces critiques.', en: 'Submersible and surface pumps with critical spare-parts stock.' } },
      { title: { fr: 'Détecteurs de gaz et équipements ATEX', en: 'Gas detectors and ATEX equipment' }, body: { fr: 'Équipements certifiés atmosphères explosibles.', en: 'Equipment certified for explosive atmospheres.' } },
      { title: { fr: 'Lubrifiants biodégradables', en: 'Biodegradable lubricants' }, body: { fr: 'Formules à faible toxicité pour les espaces confinés.', en: 'Low-toxicity formulations for confined spaces.' } },
    ],
  },
  {
    id: 'carrieres',
    slug: { fr: 'carrieres', en: 'quarries' },
    title: { fr: 'Carrières & granulats', en: 'Quarries & aggregates' },
    lead: { fr: "Concassage · Criblage · Gestion de l'usure", en: 'Crushing · Screening · Wear management' },
    teaser: { fr: 'Concassage, criblage et production de granulats.', en: 'Crushing, screening and aggregate production.' },
    image: '/assets/images/sectors/carrieres-granulats.jpg',
    stats: [
      { value: '500 t', label: { fr: 'capacité concasseur/h', en: 'crusher capacity/hr' } },
      { value: '80%', label: { fr: "d'usure sur 20% des pièces", en: 'wear on 20% of parts' } },
      { value: { fr: '6 mois', en: '6 months' }, label: { fr: 'durée de vie blindage moy.', en: 'avg. liner service life' } },
      { value: '-40%', label: { fr: 'poussières (bons systèmes)', en: 'dust with right systems' } },
    ],
    context: {
      fr: "Les carrières de granulats alimentent les grands projets d'infrastructure en Afrique. Ces opérations combinent concassage, criblage, lavage et convoyage qui soumettent les équipements à une usure intense. L'optimisation des coûts passe par la maîtrise de l'usure : blindages, toiles et panneaux de criblage représentent 30 à 50 % des coûts opératoires. MINEFECT vous aide à sélectionner les consommables adaptés à votre roche, vos volumes et vos objectifs de granulométrie.",
      en: 'Aggregate quarries supply major infrastructure projects across Africa. These operations combine crushing, screening, washing and conveying that subject equipment to intense wear. Cost optimisation hinges on wear management: liners, screen cloths and panels represent 30–50% of operating costs. MINEFECT helps you select consumables matched to your rock, volumes and grading objectives.',
    },
    challenges: [
      { title: { fr: 'Usure des organes de concassage', en: 'Crusher wear-component degradation' }, body: { fr: 'Un alliage de blindage inadapté à la dureté de votre roche entraîne remplacements prématurés et arrêts fréquents.', en: 'A liner alloy poorly matched to your rock hardness causes premature replacements and frequent stoppages.' } },
      { title: { fr: 'Efficacité du criblage', en: 'Screening efficiency' }, body: { fr: 'Des panneaux colmatés ou déchirés dégradent la granulométrie et augmentent les retraitements.', en: 'Blinded or torn panels degrade sizing and increase reprocessing.' } },
      { title: { fr: 'Émissions de poussières et conformité', en: 'Dust emissions and compliance' }, body: { fr: 'Les poussières siliceuses sont un risque sanitaire et la réglementation africaine se durcit.', en: 'Siliceous dust is a health risk and African regulation is tightening.' } },
    ],
    solutions: [
      { title: { fr: 'Blindages de concasseur', en: 'Crusher liners' }, body: { fr: 'Acier manganèse, alliage chromé ou bi-métal selon la dureté et l’abrasivité.', en: 'Manganese steel, chrome alloy or bi-metal matched to hardness and abrasivity.' } },
      { title: { fr: 'Panneaux et toiles de criblage', en: 'Screen panels and cloths' }, body: { fr: 'Polyuréthane, caoutchouc et toiles métalliques pour criblage sec ou humide.', en: 'Polyurethane, rubber and wire cloth for dry or wet screening.' } },
      { title: { fr: 'Revêtements anti-usure', en: 'Anti-wear liners' }, body: { fr: 'Plaques chromées, polyuréthane et caoutchouc pour trémies et goulottes.', en: 'Chrome plate, polyurethane and rubber for hoppers and chutes.' } },
      { title: { fr: 'Courroies et jonctions de convoyeur', en: 'Conveyor belts and splices' }, body: { fr: 'Courroies EP/ST avec jonctions mécaniques ou vulcanisées.', en: 'EP/ST belts with mechanical or vulcanised splices.' } },
      { title: { fr: 'Systèmes de suppression des poussières', en: 'Dust suppression systems' }, body: { fr: 'Rampes de brumisation et additifs hygroscopiques aux points de transfert.', en: 'Misting ramps and hygroscopic additives at transfer points.' } },
    ],
  },
  {
    id: 'exploration',
    slug: { fr: 'exploration', en: 'exploration' },
    title: { fr: 'Exploration & forages', en: 'Exploration & drilling' },
    lead: { fr: 'Forages carottiers · Géologie de terrain · Zones isolées', en: 'Core drilling · Field geology · Remote zones' },
    teaser: { fr: 'Forages, carottage et instrumentation de terrain.', en: 'Drilling, core sampling and field instrumentation.' },
    image: '/assets/images/sectors/exploration-forages.png',
    stats: [
      { value: '2000 m', label: { fr: 'profondeur forage max', en: 'max drilling depth' } },
      { value: '85%', label: { fr: 'récupération carotte visée', en: 'target core recovery' } },
      { value: { fr: '60 j+', en: '60+ days' }, label: { fr: 'durée campagne type', en: 'typical campaign' } },
      { value: '100%', label: { fr: 'traçabilité échantillons', en: 'sample traceability' } },
    ],
    context: {
      fr: "L'exploration détermine la viabilité et la valeur d'un gisement. La qualité des données géologiques — liée aux consommables utilisés — conditionne des décisions d'investissement de plusieurs centaines de millions de dollars. En Afrique subsaharienne, les campagnes se déroulent souvent en zones reculées sans infrastructure. MINEFECT vous accompagne avec des consommables optimisés pour votre formation, une instrumentation fiable et une logistique capable d'atteindre les sites les plus isolés.",
      en: "Exploration determines a deposit's viability and value. Geological-data quality — tied to the consumables used — conditions investment decisions worth hundreds of millions. In Sub-Saharan Africa, campaigns often run in remote areas without infrastructure. MINEFECT supports you with consumables optimised for your formation, reliable instrumentation and logistics that reach the most isolated sites.",
    },
    challenges: [
      { title: { fr: 'Qualité et récupération des carottes', en: 'Core quality and recovery' }, body: { fr: 'Un mauvais choix de tube, couronne ou fluide peut désagréger les carottes et fausser l’interprétation.', en: 'Poor barrel, bit or fluid choice can disintegrate core and distort interpretation.' } },
      { title: { fr: 'Logistique en zones isolées', en: 'Logistics in remote zones' }, body: { fr: 'Une rupture de consommables peut interrompre une campagne entière pendant des semaines.', en: 'A consumable stockout can interrupt an entire campaign for weeks.' } },
      { title: { fr: 'Durabilité des équipements de forage', en: 'Drilling-equipment durability' }, body: { fr: 'Une défaillance de tige en profondeur peut entraîner une perte de garniture et l’abandon du trou.', en: 'Rod failure at depth can cause loss of string and hole abandonment.' } },
    ],
    solutions: [
      { title: { fr: 'Couronnes de forage diamantées', en: 'Diamond drilling crowns' }, body: { fr: 'Couronnes imprégnées ou serties pour formations tendres à très dures.', en: 'Impregnated or set crowns for soft to very hard formations.' } },
      { title: { fr: 'Tubes carottiers et enveloppes', en: 'Core barrels and casing' }, body: { fr: 'Systèmes wireline NQ, HQ, PQ pour la récupération en profondeur.', en: 'Wireline NQ, HQ, PQ systems for deep core recovery.' } },
      { title: { fr: 'Tiges et raccords de forage', en: 'Drill rods and couplings' }, body: { fr: 'Tiges haute résistance à la fatigue et raccords filetés de précision.', en: 'High fatigue-resistant rods and precision threaded couplings.' } },
      { title: { fr: 'Fluides de forage et polymères', en: 'Drilling fluids and polymers' }, body: { fr: 'Boues biodégradables et additifs rhéologiques pour toutes conditions.', en: 'Biodegradable muds and rheological additives for all conditions.' } },
      { title: { fr: 'Logistique d’approvisionnement terrain', en: 'Field supply logistics' }, body: { fr: 'Acheminement air/piste/pirogue avec conditionnement adapté.', en: 'Delivery by air, road or river with adapted packaging.' } },
    ],
  },
  {
    id: 'traitement',
    slug: { fr: 'traitement', en: 'processing' },
    title: { fr: 'Usine de traitement', en: 'Processing plant' },
    lead: { fr: 'Broyage · Flottation · Lixiviation · Filtration', en: 'Grinding · Flotation · Leaching · Filtration' },
    teaser: { fr: 'Broyage, flottation, réactifs et médias de traitement.', en: 'Grinding, flotation, reagents and processing media.' },
    image: '/assets/images/sectors/usine-traitement.jpg',
    stats: [
      { value: '>90%', label: { fr: 'récupération métallurgique', en: 'metallurgical recovery' } },
      { value: '70%', label: { fr: 'coûts liés aux consommables', en: 'costs from consumables' } },
      { value: '24/7', label: { fr: 'fonctionnement continu', en: 'continuous operation' } },
      { value: { fr: '18 mois', en: '18 months' }, label: { fr: 'durée vie blindages max', en: 'max liner service life' } },
    ],
    context: {
      fr: "L'usine de traitement est le cœur économique d'une opération minière : c'est là que le minerai devient concentré ou métal. Les circuits fonctionnent 24/7 et tout arrêt se traduit en pertes de revenus. Les consommables — blindages, boulets, réactifs, toiles filtrantes — représentent 60 à 70 % des coûts opératoires et déterminent le taux de récupération. MINEFECT vous aide à optimiser chacun de ces paramètres avec des fournitures de qualité et une expertise de terrain.",
      en: 'The processing plant is the economic heart of a mine: where ore becomes concentrate or metal. Circuits run 24/7 and any stop means lost revenue. Consumables — liners, grinding media, reagents, filter cloths — are 60–70% of operating costs and determine recovery. MINEFECT helps you optimise each parameter with quality supplies and field expertise.',
    },
    challenges: [
      { title: { fr: 'Usure des blindages et boulets', en: 'Mill liner & grinding-media wear' }, body: { fr: 'Un mauvais choix d’alliage peut réduire la capacité de l’usine de 10 à 20 %.', en: 'A poor alloy choice can reduce plant throughput by 10–20%.' } },
      { title: { fr: 'Performance des réactifs de flottation', en: 'Flotation reagent performance' }, body: { fr: 'Des réactifs mal dosés peuvent faire chuter la récupération de 5 à 15 points.', en: 'Poorly dosed reagents can drop recovery by 5–15 points.' } },
      { title: { fr: 'Disponibilité des circuits de filtration', en: 'Filtration circuit availability' }, body: { fr: 'Un colmatage de toile en production crée des goulots d’étranglement en aval.', en: 'Cloth blinding in production creates downstream bottlenecks.' } },
    ],
    solutions: [
      { title: { fr: 'Blindages de broyeurs SAG et à boulets', en: 'SAG & ball mill liners' }, body: { fr: 'Alliages chromés, caoutchouc et composites selon le minerai et la finesse visée.', en: 'Chrome alloy, rubber and composite liners for ore type and target grind.' } },
      { title: { fr: 'Boulets de broyage en acier forgé', en: 'Forged steel grinding balls' }, body: { fr: 'Haute dureté (60+ HRC) et rondeur uniforme.', en: 'High hardness (60+ HRC) and uniform roundness.' } },
      { title: { fr: 'Réactifs de flottation', en: 'Flotation reagents' }, body: { fr: 'Collecteurs, moussants et régulateurs de pH pour circuits sulfures, oxydes et mixtes.', en: 'Collectors, frothers and pH modifiers for sulphide, oxide and mixed circuits.' } },
      { title: { fr: 'Toiles et membranes de filtration', en: 'Filter cloths & membranes' }, body: { fr: 'Pour la déshydratation des concentrés et résidus.', en: 'For concentrate and tailings dewatering.' } },
      { title: { fr: 'Consommables de lixiviation', en: 'Leaching consumables' }, body: { fr: 'Chaux, cyanure (conformité ICMC), charbon actif pour CIL/CIP/Heap Leach.', en: 'Lime, cyanide (ICMC compliance), activated carbon for CIL/CIP/Heap Leach.' } },
    ],
  },
  {
    id: 'environnement',
    slug: { fr: 'environnement', en: 'environment' },
    title: { fr: 'Environnement minier', en: 'Mining environment' },
    lead: { fr: "Gestion de l'eau · Poussières · Résidus · Conformité HSE", en: 'Water management · Dust control · Tailings · HSE compliance' },
    teaser: { fr: "Gestion des résidus, traitement de l'eau et réhabilitation.", en: 'Tailings management, water treatment and rehabilitation.' },
    image: '/assets/images/sectors/environnement-minier.jpg',
    stats: [
      { value: 'ISO 14001', label: { fr: '& IFC PS3', en: '& IFC PS3' } },
      { value: '-80%', label: { fr: 'émissions poussières possibles', en: 'dust emissions achievable' } },
      { value: '95%', label: { fr: 'recyclage eau circuit fermé', en: 'closed-loop water recycling' } },
      { value: '$50M+', label: { fr: 'coûts non-conformité évitables', en: 'avoidable non-compliance costs' } },
    ],
    context: {
      fr: "La gestion environnementale est un pilier stratégique de l'industrie minière africaine. Investisseurs, bailleurs (IFC, AFD) et gouvernements exigent le respect de standards stricts (ISO 14001, IFC Performance Standards). Une non-conformité peut suspendre le permis ou faire perdre des financements. Au-delà de la conformité, une bonne gestion génère des bénéfices opérationnels directs. MINEFECT vous accompagne avec des solutions techniques éprouvées pour chacun de ces enjeux.",
      en: 'Environmental management is a strategic pillar of African mining. Investors, development banks (IFC, AFD) and governments require strict standards (ISO 14001, IFC Performance Standards). Non-compliance can suspend permits or lose financing. Beyond compliance, strong management yields direct operational benefits. MINEFECT supports you with proven technical solutions for each challenge.',
    },
    challenges: [
      { title: { fr: "Gestion de l'eau et des effluents", en: 'Water & effluent management' }, body: { fr: 'La contamination des eaux peut engager la responsabilité de l’opérateur pendant des décennies.', en: 'Water contamination can expose the operator to liability for decades.' } },
      { title: { fr: 'Contrôle des émissions de poussières', en: 'Dust emission control' }, body: { fr: 'Les poussières minières sont un risque sanitaire et une exigence réglementaire croissante.', en: 'Mining dust is a health risk and a growing regulatory requirement.' } },
      { title: { fr: 'Gestion des résidus et stériles', en: 'Tailings & waste-rock management' }, body: { fr: "Une rupture de digue de résidus peut avoir des conséquences catastrophiques.", en: 'A tailings-dam failure can have catastrophic consequences.' } },
    ],
    solutions: [
      { title: { fr: 'Systèmes de traitement des eaux de mine', en: 'Mine water treatment systems' }, body: { fr: 'Neutralisation, précipitation, coagulation et floculation.', en: 'Neutralisation, precipitation, coagulation and flocculation.' } },
      { title: { fr: "Géomembranes et imperméabilisation", en: 'Geomembranes & liner systems' }, body: { fr: 'HDPE, LLDPE et géosynthétiques pour parcs à résidus et bassins.', en: 'HDPE, LLDPE and geosynthetics for tailings facilities and ponds.' } },
      { title: { fr: 'Équipements de suppression des poussières', en: 'Dust suppression equipment' }, body: { fr: 'Canons à eau, brumisateurs et fixateurs pour pistes et stockages.', en: 'Water cannons, foggers and binders for haul roads and stockpiles.' } },
      { title: { fr: 'Instruments de monitoring environnemental', en: 'Environmental monitoring instruments' }, body: { fr: 'Sondes de qualité d’eau et capteurs de poussières PM2.5/PM10.', en: 'Water-quality probes and PM2.5/PM10 dust sensors.' } },
      { title: { fr: 'EPI et équipements HSE de terrain', en: 'PPE & field HSE equipment' }, body: { fr: 'Masques P3, détecteurs de gaz portatifs et kits de premiers secours.', en: 'P3 masks, portable gas detectors and first-aid kits.' } },
    ],
  },
];

export const sectorHref = (s: Sector, lang: Locale): string =>
  lang === 'fr' ? `/secteurs/${s.slug.fr}/` : `/en/sectors/${s.slug.en}/`;

export const PLACEHOLDER_SECTOR = '/assets/images/placeholders/sector.png';
