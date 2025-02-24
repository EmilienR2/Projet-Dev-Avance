# API de Gestion des Utilisateurs

Cette API RESTful permet la gestion des utilisateurs avec authentification JWT et gestion des rôles (user/admin).

## 🚀 Technologies utilisées

- Node.js
- Hapi.js
- SQLite
- JWT pour l'authentification
- Joi pour la validation des données

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

## 🚦 Démarrage

Pour lancer le serveur en mode développement :
```bash
npm start
```

## 👥 Rôles et Permissions

- **user** : Accès en lecture seule
- **admin** : Accès complet (lecture, modification, suppression)

## 🧪 Tests

Pour exécuter les tests :
```bash
npm test
```

## 📚 Documentation API

La documentation Swagger est disponible à l'adresse :
```
http://localhost:3000/documentation
```
