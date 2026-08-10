# ⚡ SQL Master — Quiz & Révision SQL Interactive

> Application web interactive pour apprendre, pratiquer et maîtriser le SQL (QCM, requêtes, flashcards & examens).

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![License](https://img.shields.io/badge/License-MIT-green.style=for-the-badge)

---

## 📌 Présentation

**SQL Master** est une plateforme web d'apprentissage du langage SQL conçue pour offrir une expérience ludique, structurée et efficace. Elle propose une grande variété d'exercices allant du simple QCM jusqu'à la rédaction de requêtes complexes avec assistance en temps réel.

---

## ✨ Fonctionnalités Clés

- 🧠 **Quiz QCM Interactif** :
  - Filtres par niveau (Facile, Moyen, Difficile) et par catégorie (DDL, DML, Jointures, Regroupements, etc.).
  - Explications pédagogiques détaillées pour chaque question.
- ✍️ **Quiz Écrit & Éditeur SQL** :
  - Saisie directe de requêtes avec une banque de mots interactive (*Word Bank*).
  - Évaluation de la syntaxe et des mots-clés SQL.
- ⏱️ **Examens & Évaluations Chronométrés** :
  - Mises en situation réelles pour évaluer son niveau global sous contrainte de temps.
- 🎴 **Flashcards & Répétition Espacée** :
  - Recto/Verso pour mémoriser les concepts clés, types de données et fonctions SQL.
  - Possibilité d'ajouter des cartes personnalisées.
- 🎯 **Carnet d'Erreurs (Mode Révision)** :
  - Enregistrement automatique des questions échouées (via `localStorage`) pour cibler ses points faibles.
- 📊 **Statistiques & Suivi de Progression** :
  - Calcul du score global, taux de réussite par catégorie et historique de session.
- 🌓 **Interface Dynamique & Dark Mode** :
  - Design moderne, typographie soignée (*Inter* & *JetBrains Mono*) et bascule automatique thème sombre/clair.

---

## 🛠️ Stack Technique

- **Frontend** : HTML5, CSS3 Vanilla (variables CSS, Flexbox/Grid, thèmes dynamiques), JavaScript (ES6+ Vanilla).
- **Stockage Local** : `localStorage` pour la persistance du score, des réponses et des listes de révision.
- **Déploiement** : Prêt pour Vercel / GitHub Pages.

---

## 🚀 Installation & Utilisation

Aucune dépendance ni installation requise ! L'application fonctionne à 100% côté client.

1. **Cloner le repository** :
   ```bash
   git clone https://github.com/votre-compte/quizz-sql.git
   cd quizz-sql
   ```

2. **Lancer l'application** :
   - Ouvrez simplement `index.html` dans n'importe quel navigateur web moderne.
   - *Optionnel* : Utilisez une extension comme **Live Server** sur VS Code pour le rechargement automatique.

---

## 📁 Structure du Projet

```
quizz-sql/
├── index.html       # Structure HTML5 et conteneurs de vue
├── style.css        # Système de design, thèmes et styles réactifs
├── app.js           # Gestionnaire d'état, logique métier et navigation
├── data.js          # Base de questions, examens et flashcards
└── vercel.json      # Configuration de déploiement Vercel
```

---

## 📄 Licence

Ce projet est sous licence MIT. Libre à vous de l'utiliser et de l'adapter.
