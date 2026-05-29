# MINEFECT — site web

Site marketing bilingue (FR/EN) de MINEFECT, fournisseur d'équipements & services miniers
pour l'Afrique. Construit avec **Astro** + **Tailwind CSS v4**, déployé en statique sur **GitHub Pages**
(domaine `minefect.com`).

## Développement

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # génère dist/ (statique)
npm run preview    # sert dist/ localement
```

## Architecture

- `src/pages/` — routes. FR à la racine (`/produits/`), EN sous `/en/` (`/en/products/`).
- `src/layouts/BaseLayout.astro` — `<head>`, header, footer, SEO, polices auto-hébergées.
- `src/components/` — `Header`, `Footer`, `Seo`, `ProductCatalog`, `QuoteForm`, `SectorDetail`,
  et les composants de page dans `pages/`.
- `src/data/catalog.ts` — **source unique** du catalogue produits (`{ fr, en }`).
- `src/data/sectors.ts` — **source unique** des 6 secteurs (contenu FR/EN).
- `src/i18n/` — chaînes de navigation/pied de page (`ui.ts`) + utilitaires de routes (`utils.ts`).
- `src/styles/global.css` — design system « Midnight + Metallic » (tokens `@theme` + couche composants).
- `public/` — copié tel quel vers `dist/` : `assets/`, `CNAME`, `.nojekyll`, favicons,
  `site.webmanifest`, `robots.txt`, et les **stubs de redirection** des anciennes URL `.html`.

## Formulaire de devis (Web3Forms)

Le formulaire de contact envoie via [Web3Forms](https://web3forms.com) (250 envois/mois gratuits,
fonctionne sur hébergement statique). **Avant la mise en production**, créez une clé d'accès gratuite
et renseignez-la, soit :

- dans un fichier `.env` : `PUBLIC_WEB3FORMS_KEY=xxxxxxxx-xxxx-...`, soit
- en remplaçant `YOUR_WEB3FORMS_ACCESS_KEY` dans `src/components/QuoteForm.astro`.

Sans clé, le formulaire bascule automatiquement sur un lien `mailto:` de secours (aucune perte de lead).

## Déploiement

Le workflow `.github/workflows/deploy.yml` construit le site et le publie sur GitHub Pages à chaque
push sur `main`. **Une seule fois** : dans *Settings → Pages*, choisir la source **« GitHub Actions »**
et conserver le domaine `minefect.com` + « Enforce HTTPS ».
