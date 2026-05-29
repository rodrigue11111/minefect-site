export const LOCALES = ['fr', 'en'] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = 'fr';

/** Detect locale from a URL pathname (/en/... → 'en', else 'fr'). */
export function getLangFromUrl(url: URL): Locale {
  const first = url.pathname.split('/').filter(Boolean)[0];
  return first === 'en' ? 'en' : 'fr';
}

/** Canonical localized paths for every top-level route (FR at root, EN under /en/). */
export const ROUTES = {
  home: { fr: '/', en: '/en/' },
  products: { fr: '/produits/', en: '/en/products/' },
  sectors: { fr: '/secteurs/', en: '/en/sectors/' },
  partners: { fr: '/partenaires/', en: '/en/partners/' },
  about: { fr: '/a-propos/', en: '/en/about/' },
  contact: { fr: '/contact/', en: '/en/contact/' },
} as const;

export type RouteKey = keyof typeof ROUTES;

export function path(key: RouteKey, lang: Locale): string {
  return ROUTES[key][lang];
}

/** URL of the current page in the opposite language. */
export function altLangUrl(key: RouteKey, lang: Locale): string {
  return ROUTES[key][lang === 'fr' ? 'en' : 'fr'];
}
