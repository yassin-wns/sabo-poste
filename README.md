# SABO POSTE 2.0 — Plateforme d'Information du Bureau de Poste
## Bureau de Poste de Sidi Ali Ben Aoun (Gouvernorat de Sidi Bouzid — Code Postal 9120)

[![Angular 19](https://img.shields.io/badge/Angular-19.2-dd0031.svg?logo=angular)](https://angular.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue.svg?logo=typescript)](https://www.typescriptlang.org/)
[![JSON Server](https://img.shields.io/badge/REST_API-JSON_Server-green.svg)](https://github.com/typicode/json-server)
[![i18n](https://img.shields.io/badge/Multilingual-FR%20%7C%20%D8%B9%D8%B1%D8%A8%D9%8A%20%7C%20EN-orange.svg)]()
[![License](https://img.shields.io/badge/License-Academic%20Project-blue.svg)]()

---

## 1. Contexte & Présentation du Projet

**SABO POSTE 2.0** est une application web moderne développée pour reconstruire et sublimer le projet universitaire initial réalisé lors du **Stage de Perfectionnement** (du 05 au 31 Janvier 2026) au sein du **Bureau de Poste de Sidi Ali Ben Aoun** (La Poste Tunisienne), encadré à l'**Institut Supérieur des Études Technologiques de SIDI BOUZID (ISET Sidi Bouzid)** par **M. Abed El Monem Jawadi** et élaboré par **Yassin Wannassi**.

La plateforme originale (hébergée à l'adresse historique `https://saboposte.infinityfreeapp.com/?i=1`) a été entièrement réarchitecturée en une application monopage (Single Page Application - SPA) de niveau entreprise, basée sur **Angular 19 Standalone**, **TypeScript**, et une **API REST JSON Server**.

---

## 2. Problématique Métier Résolue

L'immersion sur le terrain au guichet du bureau de poste de Sidi Ali Ben Aoun a révélé plusieurs difficultés majeures :
1. **Confusion des usagers** face aux nouveaux services numériques (application mobile **D17**, cartes prépayées **e-DINAR**, paiement des factures STEG/SONEDE).
2. **Surcharge des agents de guichet**, consacrant une part considérable de leur temps à répéter oralement les mêmes démarches et les documents requis.
3. **Dispersion et manque de centralisation de l'information** (affiches murales dégradées, brochures papier épuisées).
4. **Files d'attente et engorgement du bureau**, souvent causés par de simples déplacements pour des demandes de renseignements.

**SABO POSTE 2.0** centralise l'intégralité des prestations postales et financières, offre des guides interactifs pas-à-pas, calcule en direct l'état d'ouverture du bureau et permet aux citoyens d'envoyer leurs questions à distance.

---

## 3. Architecture & Technologies Utilisées

| Composant | Technologie | Rôle |
|---|---|---|
| **Frontend Framework** | **Angular 19.2** (Standalone Components) | Structure modulaire réactive et performante sans NgModules |
| **Langage** | **TypeScript 5.7** | Typage strict des entités et robustesse du code |
| **API & Persistance** | **JSON Server 0.17.4** (`db.json`) | API REST complète avec persistance des données et opérations CRUD |
| **Design System** | **HTML5 / CSS3 personnalisé** | Charte graphique officielle de la Poste Tunisienne (Bleu Royal & Or Postal) |
| **Internationalisation** | **Moteur i18n réactif personnalisé** | Support trilingue intégral (Français, العربية avec RTL `dir="rtl"`, English) |
| **Gestion des Formulaires** | **Angular Reactive Forms** | Validation en temps réel, alertes dynamiques et retour visuel |

---

## 4. Modules & Fonctionnalités Réalisés

### A. Accueil / Home (`/`)
- **Bannière Hero interactive** avec barre de recherche rapide par mot-clé et accès direct aux démarches.
- **Badge d'état en direct** : calcul dynamique en temps réel de l'ouverture du bureau (*Ouvert actuellement* / *Fermé actuellement* / *Séance de samedi*).
- **Accès rapide par pôles** : Courrier & Colis, Mandats & Transferts, Cartes e-DINAR, Paiement de factures, Services monétiques.
- **Grille des services phares** avec délai de traitement et modal de consultation complète.
- **Mise en lumière de l'application D17** (DIGI POST BANK) et de ses atouts.
- **Aperçu des horaires officiels** et des coordonnées du bureau.
- **Fil d'actualités et avis aux usagers**.

### B. Centre des Services Postaux (`/services`)
- Filtrage instantané par catégorie et recherche textuelle multi-champs.
- Fiches de présentation claires : icônes, résumé, badges de popularité et délais moyens.
- **Modal de démarche complète** : liste des pièces d'identité et documents requis, étapes séquentielles de traitement et coordonnées du guichet.

### C. Horaires & Agence (`/horaires`)
- Tableau hebdomadaire complet (du lundi au dimanche) avec mise en valeur automatique du jour actuel.
- Informations officielles vérifiées du **Bureau de Poste de Sidi Ali Ben Aoun** (Avenue Habib Bourguiba, 9120 Sidi Ali Ben Aoun, +216 76 661 100).
- Détail des guichets opérationnels (4 guichets actifs, Distributeur DAB 24/7).
- Lien interactif vers Google Maps pour l'itinéraire.

### D. Espace D17 & Cartes e-DINAR (`/d17`)
- Présentation détaillée de l'écosystème **D17 / DIGI POST BANK**.
- **Guides pratiques pas-à-pas interactifs** : Téléchargement et activation, paiement de factures (STEG/SONEDE), transferts d'argent.
- **Focus Étudiants & Boursiers** : Informations dédiées sur la carte **e-DINAR Jeune** (bourses et inscription universitaire).
- **Répertoire des cartes et plateformes compatibles** (e-DINAR SMART, PRO, Corporate, DigiCard, Mobi Tamkeen, Mobi Tasshil, Mobitamweel, Mobilcred, Sobflous, Farmasi, Forever, Macoco).
- Foire aux questions et dépannage spécifique à D17.

### E. Système de Contact & Feedback (`/contact`)
- Formulaire réactif avec contrôle strict des saisies (nom, e-mail, téléphone, catégorie, objet, message).
- Enregistrement immédiat dans la base JSON Server (`POST /messages`).
- Notifications toast et bannières de confirmation.

### F. Foire Aux Questions (`/faq`)
- Moteur de recherche de questions par mot-clé.
- Filtres par thème (D17, e-DINAR, Mandats, Factures, Horaires).
- Accordéon ergonomique avec réponses officielles vérifiées.

### G. Actualités & Avis aux Citoyens (`/articles`)
- Liste des avis récents publiés par l'administration locale.
- Modal de lecture détaillée.

### H. Tableau de Bord Administratif Sécurisé (`/admin`)
Protégé par `AuthGuard` avec page de connexion (`/login`) :
1. **Vue d'ensemble (Dashboard)** : Indicateurs clés (KPIs) en temps réel (services, catégories, articles, messages reçus, messages en attente, guides).
2. **Gestion des Services** : Opérations CRUD complètes (Création, Lecture, Modification, Suppression) avec gestion trilingue des titres, descriptions, pièces requises et étapes.
3. **Gestion des Catégories** : CRUD complet des catégories de services.
4. **Gestion des Actualités** : Publication, édition et suppression des avis aux usagers.
5. **Gestion des Guides D17** : Éditeur d'étapes séquentielles et temps de lecture.
6. **Gestion des FAQ** : CRUD des questions/réponses trilingues.
7. **Boîte de Réception des Messages** : Consultation des requêtes des citoyens, filtrage par statut (*En attente*, *En cours d'examen*, *Répondu*), ajout de notes internes de guichet et suppression.
8. **Gestion des Utilisateurs** : Gestion des comptes d'accès (SuperAdmin, Admin, Agent).
9. **Paramètres de la Plateforme** : Configuration de la bannière d'annonce d'urgence, coordonnées téléphoniques et informations de l'agence.

---

## 5. Support Multilingue & Direction de Lecture (RTL / LTR)

L'application intègre un sélecteur de langue persistant sauvegardé en `localStorage` :
- **Français (`fr`)** : Direction de gauche à droite (LTR).
- **العربية (`ar`)** : Direction de droite à gauche (RTL) via `dir="rtl"` et adaptation complète des marges, icônes et typographie arabe (*Cairo / Tajawal*).
- **English (`en`)** : Direction de gauche à droite (LTR).

L'ensemble des pages publiques et des panneaux administratifs respecte scrupuleusement la langue sélectionnée.

---

## 6. Installation et Lancement

### Prérequis
- **Node.js** (v18 ou supérieur, testé avec Node v24)
- **npm** (v9 ou supérieur)

### Étape 1 : Cloner le dépôt et installer les dépendances
```bash
git clone <URL_DU_DEPOT>
cd "service poste"
npm install
```

### Étape 2 : Lancer le serveur de données (JSON Server)
Dans un terminal dédié :
```bash
npm run server
```
L'API REST démarre sur `http://localhost:3000`.

### Étape 3 : Lancer l'application frontend Angular
Dans un second terminal :
```bash
npm start
```
L'application est accessible dans votre navigateur à l'adresse : **`http://localhost:4200`**.

### Lancement combiné (Recommandé)
Vous pouvez également lancer le frontend et le backend simultanément avec une seule commande :
```bash
npm run dev
```

---

## 7. Identifiants de Démonstration (Espace Admin)

Rendez-vous sur `http://localhost:4200/login` ou cliquez sur **Connexion Admin** :

- **SuperAdmin** :
  - Identifiant : `admin`
  - Mot de passe : `admin`
- **Agent de Guichet** :
  - Identifiant : `agent_aoun`
  - Mot de passe : `admin`

*(Des boutons d'accès rapide préremplissent automatiquement les identifiants sur la page de connexion pour faciliter les tests).*

---

## 8. Structure du Projet

```
service-poste/
├── db.json                     # Base de données REST JSON Server
├── angular.json                # Configuration Angular CLI
├── package.json                # Dépendances et scripts de démarrage
├── README.md                   # Présentation générale du projet
├── PROJECT_ANALYSIS.md         # Analyse approfondie du rapport de stage
├── ARCHITECTURE.md             # Architecture technique et flux de données
├── DATABASE_DESIGN.md          # Schéma conceptuel et collections JSON
├── API_DOCUMENTATION.md        # Spécification détaillée des endpoints REST
├── TESTING.md                  # Plan de tests et validation qualité
└── src/
    ├── index.html              # HTML racine avec polices et métadonnées
    ├── styles.css              # Charte graphique globale & variables CSS
    └── app/
        ├── core/
        │   ├── guards/         # AuthGuard pour sécuriser /admin
        │   ├── models/         # Modèles TypeScript stricts
        │   └── services/       # ApiService, LanguageService, AuthService, NotificationService
        ├── layout/
        │   ├── public-layout/  # Header, Annonces, Footer public
        │   └── admin-layout/   # Sidebar administrative, Topbar, Toast
        ├── shared/
        │   ├── components/     # Header, Footer, Toast
        │   └── pipes/          # LocalizedPipe pour extraction multilingue
        └── features/
            ├── home/           # Page d'accueil moderne & indicateur direct
            ├── services/       # Catalogue des prestations et fiches détails
            ├── horaires/       # Horaires hebdomadaires et fiche agence
            ├── d17/            # Hub digital D17 et cartes compatibles
            ├── contact/        # Formulaire réactif avec validation
            ├── faq/            # Base de connaissances interactive
            ├── articles/       # Actualités et avis aux usagers
            ├── auth/login/     # Connexion sécurisée
            └── admin/          # Modules de gestion Dashboard, Services, Catégories,
                                # Articles, Guides, FAQs, Messages, Users, Settings
```

---

## 9. Validation & Tests Effectués

- [x] **Compilation de production (`ng build`)** : 0 erreurs TypeScript, bundles optimisés avec lazy-loading.
- [x] **Connectivité API REST** : Requêtes GET, POST, PUT, PATCH et DELETE validées sur JSON Server.
- [x] **Persistance des données** : Les modifications de contenu et les messages de contact sont immédiatement enregistrés dans `db.json`.
- [x] **Validation des formulaires** : Contrôle réactif des champs obligatoires et formats email/téléphone.
- [x] **Comportement RTL/LTR** : Inversion complète de la mise en page lors du passage en langue arabe.
- [x] **Calcul dynamique des horaires** : Statut d'ouverture instantané calculé d'après l'heure et le jour système.
- [x] **Responsive Design** : Affichage fluide sur écran mobile, tablette et ordinateur de bureau.

---

## 10. Crédits Académiques

- **Étudiant Développeur** : Yassin Wannassi
- **Encadrant Pédagogique** : M. Abed El Monem Jawadi
- **Établissement** : Institut Supérieur des Études Technologiques de SIDI BOUZID (ISET Sidi Bouzid)
- **Organisme d'Accueil** : La Poste Tunisienne — Bureau de Poste de Sidi Ali Ben Aoun (Gouvernorat de Sidi Bouzid)
- **Année Universitaire** : 2025/2026
