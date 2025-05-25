# BankingAppWeb

Ce projet est une application web bancaire développée avec Angular. Elle permet la gestion des clients, des comptes et des opérations bancaires.

## Structure du projet

La structure du projet est organisée comme suit :

```
src/
  app/
    accounts/         # Composants et logique liés aux comptes bancaires
    customers/        # Composants pour la gestion des clients
    model/            # Définition des modèles TypeScript (Customer, Account, etc.)
      enums/          # Types énumérés pour les statuts et types d'opérations
    navbar/           # Barre de navigation réutilisable
    new-customer/     # Formulaire d'ajout de client
    new-operation/    # Formulaire d'ajout d'opération bancaire
    services/         # Services pour l'accès aux API (AccountService, CustomerService)
    environments/     # Configuration des environnements (API, production, etc.)
    app.component.*   # Composant racine de l'application
    app.config.ts     # Configuration principale Angular (routes, providers)
    app.routes.ts     # Définition des routes de l'application
  assets/             # Fichiers statiques (images, icônes)
  styles.css          # Styles globaux
  index.html          # Point d'entrée HTML
```

## Modèles

Les modèles sont définis dans le dossier `model/` :

- **Customer** : représente un client avec un identifiant, un nom et un email.
- **AccountDetails** : détaille un compte bancaire (id, solde, opérations, pagination).
- **AccountOperation** : décrit une opération bancaire (crédit/débit, montant, date, description).
- **Enums** : types pour le statut d'un compte (`AccountStatus`) et le type d'opération (`OperationType`).

## Composant Accounts

Le dossier `accounts/` contient le composant principal pour la gestion et la consultation des comptes bancaires. Il permet :

- La recherche d'un compte par identifiant.
- L'affichage du solde et de l'historique des opérations.
- La pagination des opérations.
- L'accès à un formulaire pour ajouter une nouvelle opération.

## Services

Les services dans `services/` centralisent l'accès aux API REST :

- **AccountService** : gestion des requêtes liées aux comptes (consultation, ajout d'opération).
- **CustomerService** : gestion des clients (création, recherche, suppression).

Cette séparation permet de réutiliser la logique métier et de faciliter les tests unitaires.

## Utilité de la structure choisie

La structure modulaire du projet facilite la maintenance, la lisibilité et l'évolutivité :

- **Séparation des responsabilités** : chaque dossier a un rôle précis (modèles, services, composants).
- **Réutilisabilité** : les services et composants peuvent être utilisés dans plusieurs parties de l'application.
- **Scalabilité** : il est facile d'ajouter de nouvelles fonctionnalités (par exemple, de nouveaux modules pour d'autres entités bancaires).
- **Tests** : la structure permet d'écrire des tests unitaires ciblés pour chaque service ou composant.

## Lancement du projet

Pour démarrer le serveur de développement :

```bash
ng serve
```

Puis ouvrez [http://localhost:4200](http://localhost:4200) dans votre navigateur.

Pour exécuter les tests unitaires :

```bash
ng test
```

## Guards

Les guards sont utilisés pour contrôler l'accès aux routes. Ils permettent d'autoriser ou de bloquer la navigation vers une page en fonction de certaines conditions (comme l'authentification, les rôles, ...).

Dans notre application on a utilisé les guards `Auth` et `Admin` :

- Le guard `Auth` permet de vérifier si l'utilisateur est connécté.
- Le guard `Admin` vérifie si l'utilisateur est un admin ou pas.

## Interceptors

Les interceptors interceptent toutes les requêtes HTTP sortantes et les réponses entrantes. Ils permettent de modifier les requêtes (ajouter des headers, tokens JWT, ...) ou de gérer les erreurs globalement (ex : erreurs 401, 403, 500...).

Dans l'application on a utilisé l'intercepteur `Auth` pour ajouter le **Bearer token** à chaque requête envoyée de la part du client.

---

Ce projet met en avant les bonnes pratiques Angular pour une application bancaire moderne, modulaire et maintenable.
