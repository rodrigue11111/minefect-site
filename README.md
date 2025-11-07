# MINEFECT — Starter (VS Code)

## Option A — VS Code Live Server (le plus simple)
1) Installe **Visual Studio Code**.
2) Installe l'extension **Live Server** (Ritwick Dey).
3) Décompressez ce dossier `minefect-starter/`.
4) Dans VS Code, **File → Open Folder…** et ouvrez `minefect-starter`.
5) Ouvrez `index.html`, puis clic droit → **Open with Live Server**.
6) Le site s'ouvre sur `http://127.0.0.1:5500` (ou similaire).

## Option B — Sans extension (Node ou Python)
- **Node** (si vous avez Node) :
  ```bash
  npx serve .
  ```
  puis ouvrez l’URL affichée (ex: http://localhost:3000)

- **Python** (installé par défaut sur macOS) :
  ```bash
  # Python 3
  python3 -m http.server 8080
  # ou Python 2
  python -m SimpleHTTPServer 8080
  ```
  puis ouvrez http://localhost:8080

## Dépannage (si la page reste blanche)
- Ouvrez la **Console** du navigateur (DevTools → Console).
- Si vous voyez des erreurs liées à `cdn.tailwindcss.com` ou Google Fonts :
  - Vérifiez votre connexion internet (le CDN est en ligne, pas hors-ligne).
  - Essayez un autre réseau ou **désactivez un VPN/pare-feu** qui bloque le CDN.
- Si l’image Unsplash ne charge pas, ce n’est pas bloquant (c’est un décor). Le reste doit s’afficher.

## Test rapide du CDN Tailwind
Créez un nouveau fichier `test-tailwind.html` à la racine avec le contenu suivant, puis ouvrez-le via Live Server. Si le carré est **orange cuivré**, Tailwind fonctionne.

```html
<!doctype html>
<html>
<head>
  <meta charset="utf-8"/>
  <script>
    window.tailwind = { config: { theme: { extend: { colors: { copper: '#B87333' } } } } };
  </script>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="p-10">
  <div class="w-24 h-24 bg-copper"></div>
</body>
</html>
```

## Prochaines étapes
- Remplacez les **placeholders** (logos, images, textes).
- Dites-moi si vous voulez une **version “offline”** (CSS statique compilé sans CDN) — on pourra la générer.
