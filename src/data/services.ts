import type { Locale, RouteKey } from '@/i18n/utils';

interface L { fr: string; en: string }
export interface ServiceStat { value: string; label: L }
export interface ServiceItem { title: L; body: L }
export interface ServiceStep { title: L; body: L }
export interface Service {
  id: string;
  slug: { fr: string; en: string };
  num: string;
  title: L;
  /** Hero subtitle. */
  lead: L;
  /** Short description used on the home + index cards. */
  teaser: L;
  image: string;
  stats: ServiceStat[];
  /** Intro paragraph: what this service is and why it matters. */
  context: L;
  /** Concrete deliverables. */
  offerings: ServiceItem[];
  /** How we work — sequential steps. */
  process: ServiceStep[];
  /** Optional secondary CTA pointing to a related top-level route. */
  relatedKey?: RouteKey;
  relatedLabel?: L;
}

/** The three MINEFECT service lines — one source feeding the home trio, the /services index and each detail page (FR + EN). */
export const SERVICES: Service[] = [
  {
    id: 'formation',
    slug: { fr: 'formation', en: 'training' },
    num: '01',
    title: { fr: 'Formation professionnelle', en: 'Professional training' },
    lead: {
      fr: 'Montée en compétences sur site · Sécurité · Performance opérationnelle',
      en: 'On-site upskilling · Safety · Operational performance',
    },
    teaser: {
      fr: "Des programmes ciblés pour renforcer les compétences techniques et opérationnelles sur le terrain — conduite d'engins, maintenance préventive, gestion HSE.",
      en: 'Targeted programs that build technical and operational skills on the ground — machine operation, preventive maintenance, HSE management.',
    },
    image: '/assets/images/services/formation.webp',
    stats: [
      { value: '20+', label: { fr: 'modules disponibles', en: 'available modules' } },
      { value: 'HSE', label: { fr: 'au cœur de chaque programme', en: 'at the core of every program' } },
      { value: 'FR / EN', label: { fr: '& langues locales', en: '& local languages' } },
      { value: 'Sur site', label: { fr: 'ou en salle dédiée', en: 'or dedicated classroom' } },
    ],
    context: {
      fr: "La performance d'une mine repose autant sur ses équipements que sur les femmes et les hommes qui les opèrent. En Afrique subsaharienne, la pénurie de main-d'œuvre qualifiée et la rotation rapide des équipes pèsent directement sur la productivité et la sécurité. MINEFECT conçoit des programmes de formation pratiques, ancrés dans la réalité du terrain, pour transformer vos opérateurs et techniciens en équipes autonomes, sûres et efficaces — sur vos propres installations, avec vos propres équipements.",
      en: "A mine's performance rests as much on its equipment as on the people who operate it. In Sub-Saharan Africa, the shortage of skilled labour and high team turnover weigh directly on productivity and safety. MINEFECT designs hands-on training programs, grounded in field reality, to turn your operators and technicians into autonomous, safe and efficient teams — on your own sites, with your own equipment.",
    },
    offerings: [
      { title: { fr: "Conduite et opération d'engins lourds", en: 'Heavy-equipment operation' }, body: { fr: "Chargeuses, tombereaux, foreuses : opération sûre et économe, adaptée à vos machines.", en: 'Loaders, haul trucks, drill rigs: safe, efficient operation tailored to your machines.' } },
      { title: { fr: 'Maintenance préventive et diagnostic', en: 'Preventive maintenance & diagnostics' }, body: { fr: "Plans de maintenance, détection précoce des pannes et allongement de la durée de vie des équipements.", en: 'Maintenance planning, early fault detection and extended equipment life.' } },
      { title: { fr: 'Sécurité et gestion HSE', en: 'Safety & HSE management' }, body: { fr: "Analyse des risques, procédures et culture sécurité conformes aux standards internationaux.", en: 'Risk analysis, procedures and a safety culture aligned with international standards.' } },
      { title: { fr: "Procédures d'urgence et premiers secours", en: 'Emergency procedures & first aid' }, body: { fr: "Préparation aux situations critiques : incendie, gaz, accident, évacuation.", en: 'Preparedness for critical situations: fire, gas, accident, evacuation.' } },
      { title: { fr: 'Utilisation des équipements fournis', en: 'Use of supplied equipment' }, body: { fr: "Prise en main des consommables et matériels livrés par MINEFECT, pour un rendement immédiat.", en: 'Onboarding on the consumables and equipment supplied by MINEFECT, for immediate output.' } },
      { title: { fr: 'Gestion des consommables et des stocks', en: 'Consumables & inventory management' }, body: { fr: "Suivi des usures, prévision des besoins et réduction des ruptures critiques.", en: 'Wear tracking, demand forecasting and fewer critical stockouts.' } },
    ],
    process: [
      { title: { fr: 'Évaluation des besoins', en: 'Needs assessment' }, body: { fr: "Audit des compétences et des écarts sur votre site, en concertation avec vos chefs d'équipe.", en: 'On-site skills and gap audit, in coordination with your team leaders.' } },
      { title: { fr: 'Programme sur mesure', en: 'Tailored curriculum' }, body: { fr: "Modules construits autour de vos équipements, vos procédés et vos objectifs de production.", en: 'Modules built around your equipment, processes and production targets.' } },
      { title: { fr: 'Formation sur le terrain', en: 'On-site delivery' }, body: { fr: "Théorie courte, pratique intensive — directement sur vos installations.", en: 'Short theory, intensive practice — directly on your installations.' } },
      { title: { fr: 'Évaluation et certification', en: 'Assessment & certification' }, body: { fr: "Mesure des acquis, attestation et recommandations de suivi.", en: 'Measurement of learning, certification and follow-up recommendations.' } },
    ],
    relatedKey: 'contact',
    relatedLabel: { fr: 'Demander un programme', en: 'Request a program' },
  },
  {
    id: 'fourniture',
    slug: { fr: 'fourniture-equipements', en: 'equipment-supply' },
    num: '02',
    title: { fr: "Fourniture d'équipements", en: 'Equipment supply' },
    lead: {
      fr: "Consommables · Pièces d'usure · Équipements lourds · Logistique Afrique",
      en: 'Consumables · Wear parts · Heavy equipment · Africa-wide logistics',
    },
    teaser: {
      fr: "Des blindages de broyeur aux explosifs, des pompes aux réactifs de flottation — des équipements sélectionnés pour leur robustesse en conditions extrêmes.",
      en: 'From mill liners to explosives, pumps to flotation reagents — equipment selected for ruggedness in extreme conditions.',
    },
    image: '/assets/images/services/fourniture.webp',
    stats: [
      { value: '7', label: { fr: 'catégories de produits', en: 'product categories' } },
      { value: '40+', label: { fr: 'références actives', en: 'active references' } },
      { value: '< 48 h', label: { fr: 'délai de devis', en: 'quote turnaround' } },
      { value: 'Afrique', label: { fr: "livraison jusqu'au site", en: 'delivery to site' } },
    ],
    context: {
      fr: "Une rupture de consommable ou une pièce d'usure indisponible peut immobiliser une opération entière et coûter des dizaines de milliers de dollars par heure. MINEFECT sélectionne, qualifie et achemine les équipements et consommables adaptés aux conditions extrêmes des mines africaines — chaleur, poussières abrasives, éloignement logistique. De la pièce d'usure au réactif de traitement, nous garantissons la bonne référence, au bon endroit, au bon moment.",
      en: "A consumable stockout or an unavailable wear part can idle an entire operation and cost tens of thousands of dollars per hour. MINEFECT selects, qualifies and delivers the equipment and consumables suited to the extreme conditions of African mines — heat, abrasive dust, logistical distance. From wear parts to processing reagents, we guarantee the right reference, in the right place, at the right time.",
    },
    offerings: [
      { title: { fr: "Blindages et pièces d'usure", en: 'Liners & wear parts' }, body: { fr: "Blindages de broyeur, bords de coupe, dents de godet adaptés à la dureté de votre roche.", en: 'Mill liners, cutting edges and bucket teeth matched to your rock hardness.' } },
      { title: { fr: 'Explosifs et accessoires de tir', en: 'Explosives & blasting accessories' }, body: { fr: "Solutions de forage-sautage pour une fragmentation optimale et des coûts maîtrisés.", en: 'Drill-and-blast solutions for optimal fragmentation and controlled costs.' } },
      { title: { fr: 'Pompes, hydraulique et filtration', en: 'Pumps, hydraulics & filtration' }, body: { fr: "Pompes de surface et submersibles, circuits hydrauliques et médias filtrants.", en: 'Surface and submersible pumps, hydraulic circuits and filtration media.' } },
      { title: { fr: 'Réactifs et médias de traitement', en: 'Processing reagents & media' }, body: { fr: "Collecteurs, moussants, boulets de broyage et charbon actif pour vos circuits.", en: 'Collectors, frothers, grinding media and activated carbon for your circuits.' } },
      { title: { fr: 'Lubrifiants et fluides spécialisés', en: 'Specialised lubricants & fluids' }, body: { fr: "Formulations haute performance pour les températures et poussières extrêmes.", en: 'High-performance formulations for extreme heat and dust.' } },
      { title: { fr: 'EPI et équipements de sécurité', en: 'PPE & safety equipment' }, body: { fr: "Protection individuelle, détection de gaz et matériel de premiers secours.", en: 'Personal protection, gas detection and first-aid equipment.' } },
    ],
    process: [
      { title: { fr: 'Analyse du besoin', en: 'Requirement analysis' }, body: { fr: "Votre roche, vos volumes, vos contraintes climatiques et logistiques.", en: 'Your rock, your volumes, your climate and logistics constraints.' } },
      { title: { fr: 'Sélection et qualification', en: 'Selection & qualification' }, body: { fr: "La référence la plus adaptée à votre coût total — pas seulement la moins chère.", en: 'The reference best suited to your total cost — not just the cheapest.' } },
      { title: { fr: 'Devis et approvisionnement', en: 'Quotation & sourcing' }, body: { fr: "Devis sous 48 h et sourcing auprès des meilleurs fabricants mondiaux.", en: 'Quote within 48 h and sourcing from the best global manufacturers.' } },
      { title: { fr: 'Logistique et stock tampon', en: 'Logistics & buffer stock' }, body: { fr: "Livraison jusqu'au site et gestion de stock pour éviter toute rupture critique.", en: 'Delivery to site and stock management to prevent any critical stockout.' } },
    ],
    relatedKey: 'products',
    relatedLabel: { fr: 'Voir le catalogue', en: 'View the catalogue' },
  },
  {
    id: 'ingenierie',
    slug: { fr: 'ingenierie-conseil', en: 'engineering-consulting' },
    num: '03',
    title: { fr: 'Ingénierie & conseil', en: 'Engineering & consulting' },
    lead: {
      fr: 'Optimisation des procédés · Sélection des consommables · Réduction des coûts',
      en: 'Process optimisation · Consumable selection · Cost reduction',
    },
    teaser: {
      fr: "Optimisation des circuits de traitement, choix des consommables, amélioration des taux de récupération et réduction des coûts opératoires.",
      en: 'Processing-circuit optimization, consumable selection, recovery-rate improvement and operating-cost reduction.',
    },
    image: '/assets/images/services/ingenierie.webp',
    stats: [
      { value: '3–15 pts', label: { fr: 'de récupération en jeu', en: 'recovery points at stake' } },
      { value: '30–70%', label: { fr: 'des coûts = consommables', en: 'of costs = consumables' } },
      { value: 'Sur site', label: { fr: "audits d'usure terrain", en: 'field wear audits' } },
      { value: 'Data', label: { fr: 'décisions chiffrées', en: 'data-driven decisions' } },
    ],
    context: {
      fr: "Les consommables — blindages, boulets, réactifs, fluides — représentent 30 à 70 % des coûts opératoires d'une mine et déterminent directement les taux de récupération. Un mauvais choix coûte cher ; le bon choix, multiplié sur des milliers de tonnes, change l'économie d'une opération. MINEFECT met son expertise métallurgique et procédés au service de vos résultats : nous diagnostiquons vos circuits, identifions les leviers d'optimisation et vous accompagnons jusqu'à la mesure des gains.",
      en: "Consumables — liners, grinding media, reagents, fluids — account for 30 to 70% of a mine's operating costs and directly drive recovery rates. The wrong choice is expensive; the right one, multiplied across thousands of tonnes, changes an operation's economics. MINEFECT puts its metallurgical and process expertise to work for your results: we diagnose your circuits, identify optimisation levers and support you through to measuring the gains.",
    },
    offerings: [
      { title: { fr: 'Optimisation des circuits de traitement', en: 'Processing-circuit optimisation' }, body: { fr: "Broyage, flottation, lixiviation : maximiser le rendement à coût maîtrisé.", en: 'Grinding, flotation, leaching: maximise yield at controlled cost.' } },
      { title: { fr: "Audit d'usure et de consommation", en: 'Wear & consumption audits' }, body: { fr: "Mesure des taux d'usure réels et identification des postes de surcoût.", en: 'Measuring real wear rates and identifying cost-overrun areas.' } },
      { title: { fr: 'Sélection et substitution de consommables', en: 'Consumable selection & substitution' }, body: { fr: "Le bon alliage, le bon réactif, le bon média pour votre minerai.", en: 'The right alloy, reagent and media for your ore.' } },
      { title: { fr: 'Amélioration des taux de récupération', en: 'Recovery-rate improvement' }, body: { fr: "Quelques points de récupération gagnés se chiffrent en revenus directs.", en: 'A few recovery points gained translate into direct revenue.' } },
      { title: { fr: 'Réduction des coûts opératoires', en: 'Operating-cost reduction' }, body: { fr: "Réduction du coût à la tonne par l'optimisation des consommables et des cycles.", en: 'Lower cost per tonne through consumable and cycle optimisation.' } },
      { title: { fr: 'Accompagnement technique continu', en: 'Ongoing technical support' }, body: { fr: "Un interlocuteur expert qui suit vos résultats dans la durée.", en: 'An expert point of contact who tracks your results over time.' } },
    ],
    process: [
      { title: { fr: 'Diagnostic terrain', en: 'Field diagnostic' }, body: { fr: "Relevés, données de production et observation directe de vos circuits.", en: 'Surveys, production data and direct observation of your circuits.' } },
      { title: { fr: 'Analyse et recommandations', en: 'Analysis & recommendations' }, body: { fr: "Des recommandations chiffrées, priorisées par retour sur investissement.", en: 'Quantified recommendations, prioritised by return on investment.' } },
      { title: { fr: 'Mise en œuvre', en: 'Implementation' }, body: { fr: "Essais, ajustements et accompagnement sur site jusqu'au déploiement.", en: 'Trials, adjustments and on-site support through to rollout.' } },
      { title: { fr: 'Mesure des gains', en: 'Gain measurement' }, body: { fr: "Indicateurs avant/après et reporting transparent des résultats obtenus.", en: 'Before/after KPIs and transparent reporting of the results achieved.' } },
    ],
    relatedKey: 'sectors',
    relatedLabel: { fr: 'Voir les secteurs', en: 'View the sectors' },
  },
];

export const serviceHref = (s: Service, lang: Locale): string =>
  lang === 'fr' ? `/services/${s.slug.fr}/` : `/en/services/${s.slug.en}/`;
