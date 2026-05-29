import type { Locale } from './utils';

/** Shared chrome strings (nav, footer, common CTAs). Page body copy lives with each page component. */
export const ui = {
  fr: {
    'brand.tagline': 'Mining Supplies',
    'nav.home': 'Accueil',
    'nav.products': 'Produits',
    'nav.sectors': 'Secteurs',
    'nav.partners': 'Partenaires',
    'nav.about': 'À propos',
    'cta.quote': 'Demander un devis',
    'cta.quoteFree': 'Demander un devis gratuit',
    'lang.switch': 'EN',
    'lang.switchAria': 'Voir en anglais',
    'menu.open': 'Ouvrir le menu',
    'menu.close': 'Fermer le menu',
    'footer.tagline': 'Solutions intégrées pour le secteur minier africain — équipements, formation et conseil.',
    'footer.links': 'Liens',
    'footer.contact': 'Contact',
    'footer.rights': 'Tous droits réservés.',
    'backToTop': 'Retour en haut',
  },
  en: {
    'brand.tagline': 'Mining Supplies',
    'nav.home': 'Home',
    'nav.products': 'Products',
    'nav.sectors': 'Sectors',
    'nav.partners': 'Partners',
    'nav.about': 'About',
    'cta.quote': 'Request a quote',
    'cta.quoteFree': 'Request a free quote',
    'lang.switch': 'FR',
    'lang.switchAria': 'View in French',
    'menu.open': 'Open menu',
    'menu.close': 'Close menu',
    'footer.tagline': 'Integrated solutions for the African mining sector — equipment, training and consulting.',
    'footer.links': 'Links',
    'footer.contact': 'Contact',
    'footer.rights': 'All rights reserved.',
    'backToTop': 'Back to top',
  },
} as const;

export type UIKey = keyof (typeof ui)['fr'];

export function useTranslations(lang: Locale) {
  return function t(key: UIKey): string {
    return ui[lang][key] ?? ui.fr[key];
  };
}

/** Company contact constants (single source of truth). */
export const CONTACT = {
  email: 'adilbelem@minefect.com',
  phone: '+1 (819) 208-7067',
  phoneHref: '+18192087067',
} as const;
