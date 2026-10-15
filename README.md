# LearnHub — LibraryUI Challenge

> Plateforme de formations en ligne (développement, design, data) : catalogue, panier avec codes promo, confirmation de commande et tableau de bord d'apprentissage.

Projet réalisé pour le **LibraryUI Challenge** (octobre 2026) avec **Angular** et les composants de **LibraryUI**.

- 🔗 **Démo en ligne :** `https://learnhub-six-delta.vercel.app/`
- 💻 **Code source :** `https://github.com/wilfriedtankwe/learnhub`

---

## Description du projet

LearnHub est une plateforme d'e-learning fictive. Elle permet à un apprenant de :

1. **Découvrir** les formations à la une, lire des témoignages et consulter la FAQ ;
2. **Parcourir le catalogue** : recherche par titre, filtre par catégorie, ajout au panier et aux favoris ;
3. **Passer commande** : appliquer un code promo, confirmer le retrait d'une formation ou le paiement, recevoir une page de confirmation ;
4. **Suivre sa progression** dans un tableau de bord : cours en cours ou terminés, filtres, recherche, détail et leçons.

Le projet n'a pas de backend : les données sont fictives et l'état (panier, coupon, commande) est géré côté client avec les signals d'Angular.

**Parti pris design :** une seule palette (indigo / violet / slate), une seule typographie (Inter) et des composants LibraryUI harmonisés entre eux pour une interface cohérente sur mobile, tablette et ordinateur.

---

## Composants LibraryUI utilisés

**10 composants LibraryUI** sont intégrés. Ils sont tous regroupés dans le dossier [`src/app/libraryui/`](src/app/libraryui) et repérables dans le code par un commentaire `<!-- LibraryUI : … -->` en tête de chaque template.

| # | Composant LibraryUI | Dossier | Où le voir |
|---|---|---|---|
| 1 | **Banner** | `libraryui/banner-2` | Accueil (`/`), section d'en-tête |
| 2 | **Slide** (carrousel) | `libraryui/cluster-carousel` | Accueil, « Formations à la une » |
| 3 | **Témoignage** | `libraryui/testimony-person` | Accueil, avis des apprenants |
| 4 | **FAQ** | `libraryui/faq-accordion` | Accueil, questions fréquentes |
| 5 | **Call to action** | `libraryui/call-to-action-1` | Accueil, bandeau final |
| 6 | **Products list shopping** | `libraryui/product-list-favorite` | Catalogue (`/catalogue`) |
| 7 | **Coupon** | `libraryui/coupon` | Panier (`/panier`) |
| 8 | **Confirmations** | `libraryui/confirmation-inline` | Panier : retrait d'une formation et validation du paiement |
| 9 | **Cookie** | `libraryui/cookie-consent-1` | Toutes les pages (bandeau en bas, choix mémorisé) |
| 10 | **Dashboard e-learning** | `libraryui/courses-dashboard` | Espace apprenant (`/dashboard`) |

### Adaptations apportées

Les composants ont été adaptés sans en changer la structure de base :

- textes traduits en français et données remplacées par celles de LearnHub ;
- palette unifiée (indigo) pour obtenir un rendu homogène ;
- branchement sur un service commun (`CourseService`) : le catalogue, le panier, le coupon et la commande partagent le même état ;
- `Confirmations` rendu réutilisable (`variant`, `message`, événements `confirmed` / `cancelled`) ;
- `Coupon` relié au panier réel, avec calcul de la réduction et émission d'un événement `checkout` ;
- améliorations d'accessibilité (`aria-label`, `aria-current`, `aria-expanded`).

---

## Pages et navigation

| Route | Contenu |
|---|---|
| `/` | Accueil : Banner, Slide, Témoignages, FAQ, Call to action |
| `/catalogue` | Recherche, filtres par catégorie et liste de formations |
| `/panier` | Récapitulatif, codes promo, confirmations, email |
| `/confirmation` | Confirmation de commande |
| `/dashboard` | Tableau de bord e-learning (layout dédié avec sidebar) |

Les pages sont chargées à la demande (*lazy loading*). Le lien actif de la navbar est mis en évidence (bleu et souligné).

### Codes promo de démonstration

| Code | Effet |
|---|---|
| `LEARN10` | -10 % sur la commande |
| `ANGULAR20` | -20 % dès 80 € d'achat (réduction plafonnée à 50 €) |
| `FLAT15` | -15 € dès 60 € d'achat |

---

## Technologies

- **Angular** : composants *standalone*, **signals**, nouveau contrôle de flux (`@if`, `@for`, `@switch`), routing avec chargement différé
- **Tailwind CSS 4** (via `@tailwindcss/postcss`)
- **Iconify** (`@iconify/tailwind4`) pour les icônes
- **TypeScript**

---

## Responsive

L'interface a été pensée pour trois tailles d'écran :

- **Mobile (≈ 375 px)** : menu hamburger, grille à 1 colonne, sidebar du dashboard repliable, carrousel avec geste de balayage ;
- **Tablette (≈ 768 px)** : grille à 2 colonnes, filtres sur plusieurs lignes ;
- **Ordinateur (≥ 1024 px)** : grille à 3 colonnes, dashboard en 3 panneaux.

---

## Installation et lancement

Prérequis : Node.js et Angular CLI.

```bash
# 1. Cloner le dépôt
git clone https://github.com/VOTRE-COMPTE/learnhub.git
cd learnhub

# 2. Installer les dépendances
npm install --force

# 3. Lancer le serveur de développement
ng serve
```

L'application est disponible sur `http://localhost:4200`.

### Build de production

```bash
ng build
```

Les fichiers générés se trouvent dans `dist/`.

---

## Déploiement

### Vercel

1. Importer le dépôt GitHub sur [vercel.com](https://vercel.com).
2. Build command : `ng build`.
3. Output directory : `dist/learnhub/browser` (à adapter selon le nom du projet).
4. Ajouter un fichier `vercel.json` pour que le routing Angular fonctionne au rechargement :

---

## Structure du projet

```
src/app/
├── core/
│   └── layout/              # Navbar, footer, navigation active
├── libraryui/               # Les 10 composants LibraryUI
│   ├── banner-2/
│   ├── call-to-action-1/
│   ├── cluster-carousel/
│   ├── confirmation-inline/
│   ├── cookie-consent-1/
│   ├── coupon/
│   ├── courses-dashboard/
│   ├── faq-accordion/
│   ├── product-list-favorite/
│   └── testimony-person/
├── pages/
│   ├── home/
│   ├── catalog/
│   ├── cart/
│   └── confirmation/
├── shared/
│   ├── course.model.ts      # Modèle de données
│   └── course.service.ts    # État : catalogue, panier, coupon, commande
├── app.routes.ts
└── app.ts
```

---

## Auteur

Projet réalisé par **VOTRE NOM** dans le cadre du LibraryUI Challenge 2026.

- GitHub : `https://github.com/VOTRE-COMPTE`
- LinkedIn : `https://www.linkedin.com/in/VOTRE-PROFIL`

Les composants LibraryUI appartiennent à leurs auteurs respectifs. Les images de démonstration proviennent de [picsum.photos](https://picsum.photos) et [pravatar.cc](https://pravatar.cc).
