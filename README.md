# API de Gestion des Utilisateurs

Cette API RESTful permet la gestion des utilisateurs avec authentification JWT et gestion des rôles (user/admin).

## 🚀 Technologies utilisées

- Node.js
- Hapi.js
- SQLite
- JWT pour l'authentification
- Joi pour la validation des données
- Swagger pour la documentation API

## 📋 Prérequis

- Node.js (v20.18.2 ou supérieur)
- npm


## 🛠️ Installation

1. Clonez le repository
```bash
git clone <votre-repo>
cd iut-project
```

2. Installez les dépendances
```bash
npm install
```

3. Exécutez l'application
```bash
npm start
```

## 💾 Base de données

Par défaut, l'application utilise SQLite avec une base de données en mémoire. Les migrations sont exécutées automatiquement au démarrage de l'application en mode développement.

Pour modifier la configuration de la base de données, vous pouvez ajuster les paramètres dans `server/manifest.js`.

## 🚦 Démarrage

Pour lancer le serveur en mode développement :
```bash
npm start
```

Le serveur sera accessible à l'adresse : `http://localhost:3000`

## 👥 Rôles et Permissions

- **user** : Accès en lecture seule aux données
- **admin** : Accès complet (lecture, création, modification, suppression)

Les routes protégées nécessitent un token JWT valide, obtenu lors de l'authentification.

## 🔐 Authentification

L'API utilise l'authentification JWT. Pour obtenir un token :

1. Créez un compte utilisateur via `/users`
2. Connectez-vous via `/login` avec vos identifiants
3. Utilisez le token JWT reçu dans le header `Authorization: Bearer <token>` pour les requêtes suivantes

## 📚 Documentation API

La documentation Swagger est disponible à l'adresse :
```
http://localhost:3000/documentation
```

Elle détaille toutes les routes disponibles, les paramètres requis et les réponses possibles.
