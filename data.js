// ============================================================
// data.js — Base de données de questions et flashcards SQL
// ============================================================
// Basé sur les cours 4, 5, 6, TDTP3, TDTP4, TDTP5
// et les évaluations NS1 / NS2 de Dr. Salma Sassi (ECE B1)
// ============================================================
// STRUCTURE D'UNE QUESTION :
// {
//   id: Number (unique),
//   category: String,
//   difficulty: String ("facile" | "moyen" | "difficile"),
//   question: String (énoncé),
//   options: Array<String> (4 choix),
//   correct: Number (index 0-based de la bonne réponse),
//   explanation: String (explication détaillée)
// }
//
// STRUCTURE D'UNE FLASHCARD :
// {
//   id: Number (unique),
//   category: String,
//   difficulty: String,
//   front: String (concept / question côté recto),
//   back: String (réponse / requête SQL côté verso)
// }
// ============================================================

const QUESTIONS = [

  // ╔══════════════════════════════════════════════════════════╗
  // ║  COURS 4 — DDL : CREATE TABLE, Contraintes, ALTER      ║
  // ╚══════════════════════════════════════════════════════════╝

  {
    id: 1,
    category: "DDL",
    difficulty: "facile",
    question: "Quelles sont les 3 catégories principales du langage SQL ?",
    options: [
      "SELECT, INSERT, UPDATE",
      "DDL, DML et DCL",
      "CREATE, ALTER, DROP",
      "Tables, Vues, Index"
    ],
    correct: 1,
    explanation: "SQL se divise en 3 catégories :\n• DDL (Data Definition Language) : définir le schéma (CREATE, ALTER, DROP)\n• DML (Data Manipulation Language) : manipuler les données (SELECT, INSERT, UPDATE, DELETE)\n• DCL (Data Control Language) : contrôler l'accès (GRANT, REVOKE)"
  },
  {
    id: 2,
    category: "DDL",
    difficulty: "facile",
    question: "Quelle est la syntaxe correcte pour créer la table Internaute avec un email et un nom ?",
    options: [
      "NEW TABLE Internaute (email VARCHAR(50), nom VARCHAR(20));",
      "CREATE TABLE Internaute (email VARCHAR(50), nom VARCHAR(20));",
      "MAKE TABLE Internaute (email VARCHAR(50), nom VARCHAR(20));",
      "ADD TABLE Internaute (email VARCHAR(50), nom VARCHAR(20));"
    ],
    correct: 1,
    explanation: "La syntaxe standard est CREATE TABLE nom_table (attribut1 type, attribut2 type, ...). Le nom de la table doit commencer par une lettre, ne pas dépasser 30 caractères, et ne pas être un mot réservé SQL."
  },
  {
    id: 3,
    category: "DDL",
    difficulty: "facile",
    question: "Que signifie la contrainte NOT NULL sur une colonne ?",
    options: [
      "La colonne doit contenir la valeur zéro",
      "La colonne doit toujours avoir une valeur (pas d'absence de valeur)",
      "La colonne ne peut contenir que des nombres",
      "La colonne ne peut pas être modifiée"
    ],
    correct: 1,
    explanation: "NOT NULL signifie que l'attribut doit TOUJOURS avoir une valeur. Attention : NULL n'est PAS la valeur zéro ni une chaîne vide — c'est l'absence de valeur. On ne peut pas faire d'opération ni de comparaison avec NULL (pas de = NULL)."
  },
  {
    id: 4,
    category: "DDL",
    difficulty: "moyen",
    question: "Quelle est la différence entre PRIMARY KEY et UNIQUE ?",
    options: [
      "Il n'y a aucune différence",
      "PRIMARY KEY implique NOT NULL + UNIQUE et il ne peut y en avoir qu'une par table ; UNIQUE autorise les NULL et on peut en avoir plusieurs",
      "UNIQUE est plus restrictif que PRIMARY KEY",
      "PRIMARY KEY peut contenir des doublons, UNIQUE ne peut pas"
    ],
    correct: 1,
    explanation: "PRIMARY KEY = NOT NULL + UNIQUE, et il ne peut y en avoir qu'une seule par table. UNIQUE garantit l'unicité mais autorise les NULL. On peut avoir plusieurs contraintes UNIQUE dans une même table. Exemple du cours : CONSTRAINT emp_nom_KT UNIQUE(ename)."
  },
  {
    id: 5,
    category: "DDL",
    difficulty: "moyen",
    question: "Comment déclarer une clé primaire composée de deux attributs (idFilm et email) ?",
    options: [
      "idFilm INTEGER PRIMARY KEY, email VARCHAR(50) PRIMARY KEY",
      "PRIMARY KEY (idFilm, email) — au niveau table",
      "COMPOSITE KEY (idFilm, email)",
      "KEY (idFilm + email)"
    ],
    correct: 1,
    explanation: "Une clé primaire composée se déclare au niveau TABLE (pas au niveau colonne). Exemple du cours :\nCREATE TABLE Notation (\n  idFilm INTEGER NOT NULL,\n  email VARCHAR(50) NOT NULL,\n  note INTEGER DEFAULT 0,\n  PRIMARY KEY (idFilm, email)\n);"
  },
  {
    id: 6,
    category: "DDL",
    difficulty: "moyen",
    question: "À quoi sert la clause ON DELETE CASCADE sur une FOREIGN KEY ?",
    options: [
      "Elle empêche la suppression de la ligne référencée",
      "Elle supprime automatiquement les lignes de la table fille quand la ligne référencée dans la table mère est supprimée",
      "Elle met les valeurs à NULL dans la table fille",
      "Elle crée un index automatiquement"
    ],
    correct: 1,
    explanation: "ON DELETE CASCADE signifie : quand on supprime une ligne dans la table mère, toutes les lignes de la table fille qui la référencent sont aussi supprimées automatiquement. Exemple du cours : Si on supprime un cinéma, toutes ses salles sont supprimées automatiquement.\nAutres options : ON DELETE SET NULL (met à NULL), ON DELETE RESTRICT (interdit la suppression — comportement par défaut)."
  },
  {
    id: 7,
    category: "DDL",
    difficulty: "moyen",
    question: "Que fait la contrainte CHECK dans cette déclaration ?\nCREATE TABLE Film (\n  annee INTEGER CHECK (annee BETWEEN 1890 AND 2000)\n);",
    options: [
      "Elle crée un index sur la colonne annee",
      "Elle vérifie que la valeur insérée est comprise entre 1890 et 2000",
      "Elle trie automatiquement les films par année",
      "Elle empêche la modification de la colonne"
    ],
    correct: 1,
    explanation: "La contrainte CHECK vérifie qu'une valeur insérée ou modifiée respecte une condition logique. Ici, seules les années entre 1890 et 2000 sont acceptées. On peut aussi l'utiliser avec IN : CHECK (genre IN ('Histoire','Western','Drame'))."
  },
  {
    id: 8,
    category: "DDL",
    difficulty: "moyen",
    question: "Que fait ON DELETE SET NULL sur une clé étrangère ?",
    options: [
      "Supprime la ligne de la table fille",
      "Empêche la suppression dans la table mère",
      "Met la clé étrangère à NULL dans la table fille quand la ligne référencée est supprimée",
      "Supprime toute la table"
    ],
    correct: 2,
    explanation: "ON DELETE SET NULL : quand on supprime un enregistrement dans la table mère (ex: un Artiste), la clé étrangère dans la table fille (ex: idRealisateur dans Film) est mise à NULL.\nExemple du cours : FOREIGN KEY (idRealisateur) REFERENCES Artiste ON DELETE SET NULL."
  },
  {
    id: 9,
    category: "DDL",
    difficulty: "facile",
    question: "Comment ajouter une colonne 'region' de type VARCHAR(10) à la table Film ?",
    options: [
      "INSERT COLUMN region INTO Film;",
      "ALTER TABLE Film ADD COLUMN region VARCHAR(10);",
      "UPDATE TABLE Film ADD region VARCHAR(10);",
      "MODIFY Film ADD region VARCHAR(10);"
    ],
    correct: 1,
    explanation: "ALTER TABLE permet de modifier la structure d'une table existante. Les actions possibles sont :\n• ADD : ajouter une colonne\n• MODIFY : modifier le type d'une colonne\n• DROP : supprimer une colonne\n• RENAME COLUMN ancien TO nouveau : renommer"
  },
  {
    id: 10,
    category: "DDL",
    difficulty: "moyen",
    question: "Quelle est la différence entre TRUNCATE TABLE et DELETE FROM ?",
    options: [
      "Il n'y a aucune différence",
      "TRUNCATE vide la table ET libère l'espace de stockage ; DELETE supprime les lignes mais ne libère PAS l'espace",
      "DELETE est plus rapide que TRUNCATE",
      "TRUNCATE permet un WHERE, DELETE non"
    ],
    correct: 1,
    explanation: "Comme vu en cours :\n• TRUNCATE TABLE : vide entièrement la table et libère l'espace de stockage. Pas de WHERE possible.\n• DELETE FROM : supprime les lignes (peut utiliser WHERE) mais ne libère pas l'espace. Plus lent car chaque suppression est journalisée."
  },

  // ╔══════════════════════════════════════════════════════════╗
  // ║  COURS 4 — DML : INSERT, UPDATE, DELETE                ║
  // ╚══════════════════════════════════════════════════════════╝

  {
    id: 11,
    category: "INSERT",
    difficulty: "facile",
    question: "Quelle est la syntaxe correcte pour insérer un pays dans la table Pays ?",
    options: [
      "ADD INTO Pays VALUES (1, 'France', 'Français');",
      "INSERT INTO Pays VALUES (1, 'France', 'Français');",
      "INSERT Pays SET (1, 'France', 'Français');",
      "PUT INTO Pays VALUES (1, 'France', 'Français');"
    ],
    correct: 1,
    explanation: "La syntaxe d'insertion est :\nINSERT INTO nom_table [(col1, col2, ...)] VALUES (val1, val2, ...);\nSans préciser les colonnes, l'ordre des valeurs doit correspondre à l'ordre des colonnes de la table. Les valeurs texte et date doivent être entre guillemets simples."
  },
  {
    id: 12,
    category: "INSERT",
    difficulty: "moyen",
    question: "Comment insérer des données depuis une autre table ?",
    options: [
      "INSERT INTO Emp (empno, ename) COPY FROM SCOTT.EMP;",
      "INSERT INTO Emp (empno, ename) SELECT empno, ename FROM SCOTT.EMP WHERE job = 'manager';",
      "INSERT INTO Emp FROM SCOTT.EMP WHERE job = 'manager';",
      "COPY SCOTT.EMP INTO Emp WHERE job = 'manager';"
    ],
    correct: 1,
    explanation: "On peut insérer des données provenant d'une autre table en remplaçant VALUES par un SELECT :\nINSERT INTO Emp (empno, ename, sal)\nSELECT empno, ename, sal FROM SCOTT.EMP WHERE job = 'manager';\nLes colonnes du SELECT doivent correspondre en nombre et en type."
  },
  {
    id: 13,
    category: "UPDATE",
    difficulty: "facile",
    question: "D'après le cours, comment augmenter de 10% le salaire des employés du département 20 ?",
    options: [
      "UPDATE Employe SET salaire = salaire + 10% WHERE deptno = 20;",
      "UPDATE Employe SET salaire = salaire * 1.10 WHERE deptno = 20;",
      "ALTER Employe SET salaire = salaire * 1.10 WHERE deptno = 20;",
      "MODIFY Employe salaire = salaire * 1.10 WHERE deptno = 20;"
    ],
    correct: 1,
    explanation: "La syntaxe UPDATE est :\nUPDATE nom_table SET colonne = nouvelle_valeur [WHERE condition];\nPour +10%, on multiplie par 1.10. L'opérateur % n'est pas valide ici. Sans WHERE, TOUTES les lignes seraient modifiées !"
  },
  {
    id: 14,
    category: "DELETE",
    difficulty: "facile",
    question: "Que se passe-t-il si on exécute DELETE FROM Film; sans clause WHERE ?",
    options: [
      "Rien, la requête échouera",
      "Toutes les lignes de la table Film sont supprimées",
      "Seule la première ligne est supprimée",
      "La structure de la table est supprimée"
    ],
    correct: 1,
    explanation: "Attention ! Si vous omettez la clause WHERE dans un DELETE, TOUTES les lignes de la table sont supprimées. La syntaxe correcte est :\nDELETE FROM nom_table [WHERE condition];\nToujours vérifier avec un SELECT avant d'exécuter un DELETE."
  },

  // ╔══════════════════════════════════════════════════════════╗
  // ║  TDTP3 — Intégrité référentielle (FK en pratique)      ║
  // ╚══════════════════════════════════════════════════════════╝

  {
    id: 15,
    category: "DDL",
    difficulty: "difficile",
    question: "D'après le TD3 (base Cinéma) : que se passe-t-il si on tente DELETE FROM Film WHERE idFilm = 101; alors que des séances référencent ce film avec ON DELETE RESTRICT ?",
    options: [
      "Le film et toutes ses séances sont supprimés",
      "La suppression échoue car ON DELETE RESTRICT empêche de supprimer un film tant qu'il existe des séances associées",
      "Les séances sont mises à NULL",
      "Le film est supprimé mais les séances restent avec un idFilm orphelin"
    ],
    correct: 1,
    explanation: "ON DELETE RESTRICT (comportement par défaut) empêche la suppression d'une ligne dans la table mère si des lignes de la table fille la référencent.\nPour supprimer correctement, il faut d'abord supprimer les séances associées :\n1. DELETE FROM Seance WHERE idFilm = 101;\n2. DELETE FROM Film WHERE idFilm = 101;"
  },
  {
    id: 16,
    category: "UPDATE",
    difficulty: "moyen",
    question: "D'après le TD3 : comment réduire de 5% le prix des séances dont la salle a une capacité < 100 ? (jointure UPDATE)",
    options: [
      "UPDATE Seance SET prix = prix * 0.95 WHERE capacite < 100;",
      "UPDATE Seance s JOIN Salle sa ON s.nomCinema = sa.nomCinema AND s.noSalle = sa.noSalle SET s.prix = ROUND(s.prix * 0.95, 2) WHERE sa.capacite < 100;",
      "UPDATE Seance, Salle SET prix = prix - 5 WHERE capacite < 100;",
      "ALTER Seance SET prix = prix * 0.95 WHERE capacite < 100;"
    ],
    correct: 1,
    explanation: "Un UPDATE avec JOIN permet de mettre à jour une table en se basant sur les données d'une autre table. Ici on joint Seance et Salle pour accéder à la capacité, puis on applique la réduction de 5% (multiplier par 0.95). ROUND(..., 2) arrondit à 2 décimales."
  },

  // ╔══════════════════════════════════════════════════════════╗
  // ║  COURS 5 — SELECT, WHERE, ORDER BY                     ║
  // ╚══════════════════════════════════════════════════════════╝

  {
    id: 17,
    category: "SELECT",
    difficulty: "facile",
    question: "Quelle clause indique la table dans laquelle on va chercher les informations ?",
    options: [
      "SELECT",
      "FROM",
      "WHERE",
      "TABLE"
    ],
    correct: 1,
    explanation: "• SELECT précise les colonnes à afficher\n• FROM indique la ou les tables sources\n• WHERE filtre les lignes selon une condition\nExemple : SELECT nom, prenom, note FROM Etudiant;"
  },
  {
    id: 18,
    category: "SELECT",
    difficulty: "facile",
    question: "À quoi sert le mot-clé AS dans cette requête ?\nSELECT nom AS \"Nom de famille\" FROM Etudiant;",
    options: [
      "Il filtre les résultats",
      "Il renomme temporairement la colonne dans le résultat (alias)",
      "Il crée une nouvelle colonne permanente",
      "Il trie les résultats"
    ],
    correct: 1,
    explanation: "AS crée un alias : il renomme temporairement une colonne dans le résultat de la requête. Cela :\n• Facilite la lecture\n• N'affecte PAS le nom réel de la colonne dans la table\nOn peut aussi renommer les tables (alias de table) : FROM Etudiant e."
  },
  {
    id: 19,
    category: "WHERE",
    difficulty: "facile",
    question: "Comment afficher les étudiants de licence 2 avec une note ≥ 12 ?\n(Table Etudiant avec colonnes : nom, prenom, licence, note, dep)",
    options: [
      "SELECT * FROM Etudiant WHERE licence = '2' OR note >= 12;",
      "SELECT * FROM Etudiant WHERE licence = '2' AND note >= 12;",
      "SELECT * FROM Etudiant WHERE licence = '2', note >= 12;",
      "SELECT * FROM Etudiant HAVING licence = '2' AND note >= 12;"
    ],
    correct: 1,
    explanation: "On combine les conditions avec :\n• AND → toutes les conditions doivent être vraies\n• OR → au moins une condition doit être vraie\n• NOT → inverse le résultat\nIci on veut les DEUX conditions, donc AND. HAVING ne s'utilise qu'après GROUP BY."
  },
  {
    id: 20,
    category: "ORDER BY",
    difficulty: "facile",
    question: "Comment trier les étudiants par note décroissante ?",
    options: [
      "SELECT nom, prenom, note FROM Etudiant SORT BY note DESC;",
      "SELECT nom, prenom, note FROM Etudiant ORDER BY note DESC;",
      "SELECT nom, prenom, note FROM Etudiant ORDER BY note DESCENDING;",
      "SELECT nom, prenom, note FROM Etudiant ORDER note DESC;"
    ],
    correct: 1,
    explanation: "La clause ORDER BY trie les résultats :\n• ASC (par défaut) : ordre croissant\n• DESC : ordre décroissant\nOn peut trier sur plusieurs colonnes : ORDER BY dep ASC, note DESC."
  },

  // ╔══════════════════════════════════════════════════════════╗
  // ║  COURS 5 — LIKE, IN, BETWEEN, IS NULL                  ║
  // ╚══════════════════════════════════════════════════════════╝

  {
    id: 21,
    category: "LIKE",
    difficulty: "facile",
    question: "Quel est le rôle du joker % dans LIKE ?\nExemple : WHERE dep LIKE '7%'",
    options: [
      "Il remplace exactement un caractère",
      "Il remplace n'importe quelle suite de caractères (y compris vide)",
      "Il calcule un pourcentage",
      "Il trie les résultats"
    ],
    correct: 1,
    explanation: "LIKE utilise deux jokers :\n• % remplace n'importe quelle suite de caractères (0 ou plus)\n• _ remplace exactement un caractère\nExemple du cours : WHERE dep LIKE '7%' → trouve 75, 77, etc.\nWHERE nom LIKE 'M_____' → un M suivi de 5 caractères exactement."
  },
  {
    id: 22,
    category: "LIKE",
    difficulty: "moyen",
    question: "D'après le cours, que retourne :\nSELECT nom, prenom FROM Etudiant WHERE nom LIKE 'M_____';",
    options: [
      "Tous les noms commençant par M",
      "Les noms commençant par M et comportant exactement 6 lettres au total",
      "Les noms contenant la lettre M",
      "Les noms se terminant par M"
    ],
    correct: 1,
    explanation: "Le joker _ remplace exactement UN caractère. 'M_____' signifie M suivi de 5 caractères = 6 lettres au total.\nRésultat du cours : Martin (Véra) et Martin (Annie).\nAvec % à la place, 'M%' aurait trouvé tous les noms commençant par M, quelle que soit leur longueur."
  },
  {
    id: 23,
    category: "IN",
    difficulty: "facile",
    question: "Comment afficher les étudiants du département 75 ou 92 ?",
    options: [
      "SELECT * FROM Etudiant WHERE dep = 75 AND dep = 92;",
      "SELECT * FROM Etudiant WHERE dep IN (75, 92);",
      "SELECT * FROM Etudiant WHERE dep BETWEEN 75 AND 92;",
      "SELECT * FROM Etudiant WHERE dep = (75, 92);"
    ],
    correct: 1,
    explanation: "La clause IN vérifie si une valeur fait partie d'un ensemble. C'est équivalent à :\nWHERE dep = 75 OR dep = 92\nmais plus lisible. BETWEEN ne convient pas ici car il inclut tous les départements entre 75 et 92 (76, 77, etc.)."
  },
  {
    id: 24,
    category: "BETWEEN",
    difficulty: "facile",
    question: "Que retourne cette requête ?\nSELECT nom, prenom FROM Etudiant WHERE note BETWEEN 10 AND 15;",
    options: [
      "Les étudiants avec une note > 10 et < 15",
      "Les étudiants avec une note >= 10 et <= 15 (bornes incluses)",
      "Les étudiants avec une note > 10 et <= 15",
      "Les étudiants avec une note >= 10 et < 15"
    ],
    correct: 1,
    explanation: "BETWEEN inclut les deux bornes. C'est strictement équivalent à :\nWHERE note >= 10 AND note <= 15\nExemple du cours : les étudiants avec 10, 11.5, 13.5, 15.0 sont tous inclus."
  },
  {
    id: 25,
    category: "NULL",
    difficulty: "facile",
    question: "Comment afficher les étudiants dont la note n'a pas encore été saisie ?",
    options: [
      "WHERE note = NULL",
      "WHERE note IS NULL",
      "WHERE note == NULL",
      "WHERE note = ''"
    ],
    correct: 1,
    explanation: "On utilise IS NULL (et IS NOT NULL pour l'inverse). JAMAIS = NULL !\nNULL n'est PAS une valeur — c'est l'absence de valeur. Toute comparaison avec = retourne UNKNOWN. La chaîne vide '' n'est pas NULL non plus."
  },
  {
    id: 26,
    category: "NULL",
    difficulty: "moyen",
    question: "Si la note d'un étudiant est NULL, quel est le résultat de note / 2 ?",
    options: [
      "0",
      "NULL",
      "Une erreur",
      "La moitié de la dernière note saisie"
    ],
    correct: 1,
    explanation: "Comme vu en cours : si une valeur utilisée dans un calcul est NULL, le résultat de l'opération sera NULL également. Aucune opération ni comparaison incluant NULL ne donne un résultat défini. C'est pourquoi on utilise COALESCE() ou IS NULL pour gérer les valeurs manquantes."
  },

  // ╔══════════════════════════════════════════════════════════╗
  // ║  COURS 5 — DISTINCT, CONCAT, opérateurs arithmétiques  ║
  // ╚══════════════════════════════════════════════════════════╝

  {
    id: 27,
    category: "SELECT",
    difficulty: "facile",
    question: "Comment afficher la liste des départements sans répétition ?",
    options: [
      "SELECT UNIQUE dep FROM Etudiant;",
      "SELECT DISTINCT dep FROM Etudiant;",
      "SELECT dep FROM Etudiant GROUP BY dep;",
      "Les réponses B et C donnent toutes les deux le bon résultat"
    ],
    correct: 3,
    explanation: "DISTINCT et GROUP BY peuvent tous deux éliminer les doublons.\n• SELECT DISTINCT dep FROM Etudiant → valeurs uniques\n• SELECT dep FROM Etudiant GROUP BY dep → même résultat\nNote du cours : les valeurs NULL sont considérées comme identiques : une seule sera affichée."
  },
  {
    id: 28,
    category: "SELECT",
    difficulty: "facile",
    question: "Comment afficher le nom complet des étudiants en une seule colonne ?",
    options: [
      "SELECT nom + prenom FROM Etudiant;",
      "SELECT CONCAT(nom, ' ', prenom) AS \"Nom complet\" FROM Etudiant;",
      "SELECT MERGE(nom, prenom) FROM Etudiant;",
      "SELECT nom & prenom FROM Etudiant;"
    ],
    correct: 1,
    explanation: "CONCAT() est la fonction de concaténation de chaînes. On peut ajouter un espace ' ' entre les champs. Avec l'alias AS, on renomme le résultat \"Nom complet\".\nNote : l'opérateur || fonctionne aussi en standard SQL : nom || ' ' || prenom."
  },

  // ╔══════════════════════════════════════════════════════════╗
  // ║  COURS 5 — Fonctions d'agrégation                      ║
  // ╚══════════════════════════════════════════════════════════╝

  {
    id: 29,
    category: "Agrégation",
    difficulty: "facile",
    question: "Quelle fonction calcule la moyenne des notes ?",
    options: [
      "MEAN(note)",
      "AVG(note)",
      "AVERAGE(note)",
      "MOY(note)"
    ],
    correct: 1,
    explanation: "Les 5 fonctions d'agrégation standard sont :\n• AVG(col) → moyenne\n• COUNT(*) → nombre de lignes\n• MIN(col) / MAX(col) → bornes\n• SUM(col) → somme\nExemple du cours : SELECT AVG(note) AS moyenne_globale FROM etudiants; → 12,24."
  },
  {
    id: 30,
    category: "Agrégation",
    difficulty: "facile",
    question: "D'après le cours, à quoi sert COUNT(*) ?",
    options: [
      "Compter les colonnes de la table",
      "Compter le nombre total de lignes, y compris celles avec des NULL",
      "Compter uniquement les valeurs non-NULL",
      "Calculer le nombre de tables dans la base"
    ],
    correct: 1,
    explanation: "COUNT(*) compte TOUTES les lignes de la table, y compris celles contenant des NULL.\nCOUNT(colonne) ne compte que les lignes où cette colonne n'est pas NULL.\nExemple du cours : SELECT COUNT(*) AS nb_etudiants FROM etudiants; → 6."
  },
  {
    id: 31,
    category: "Agrégation",
    difficulty: "moyen",
    question: "D'après le cours, quel est le résultat de :\nSELECT MIN(note) AS note_min, MAX(note) AS note_max FROM etudiants;",
    options: [
      "note_min = 0, note_max = 20",
      "note_min = 5.7, note_max = 15.5",
      "note_min = 11.5, note_max = 15.5",
      "note_min = NULL, note_max = 15.5"
    ],
    correct: 1,
    explanation: "MIN et MAX retournent les valeurs extrêmes d'une colonne, en ignorant les NULL. D'après les données du cours :\n• Salma Sassi a la note la plus basse : 5.7\n• Martin Annie a la note la plus haute : 15.5\nNote : Dupond Laurent a une note NULL, elle est ignorée."
  },

  // ╔══════════════════════════════════════════════════════════╗
  // ║  COURS 5 — GROUP BY & HAVING                           ║
  // ╚══════════════════════════════════════════════════════════╝

  {
    id: 32,
    category: "GROUP BY",
    difficulty: "moyen",
    question: "Quelle est la requête correcte pour compter le nombre d'étudiants par département ?",
    options: [
      "SELECT dep, COUNT(Nom) FROM Etudiant;",
      "SELECT dep, COUNT(Nom) AS Total_étudiants FROM Etudiant GROUP BY dep;",
      "SELECT dep, COUNT(*) FROM Etudiant ORDER BY dep;",
      "SELECT dep, SUM(Nom) FROM Etudiant GROUP BY dep;"
    ],
    correct: 1,
    explanation: "GROUP BY regroupe les lignes ayant les mêmes valeurs. Sans GROUP BY, les fonctions d'agrégation s'appliquent à toute la table. Résultat du cours :\ndep 77 → 2 étudiants, dep 75 → 1, dep 93 → 1, dep 92 → 1, NULL → 1."
  },
  {
    id: 33,
    category: "GROUP BY",
    difficulty: "moyen",
    question: "Comment combiner COUNT et AVG dans un même GROUP BY ?",
    options: [
      "On ne peut utiliser qu'une seule fonction d'agrégation par requête",
      "SELECT dep, COUNT(nom) AS Total, AVG(note) AS moyenne FROM Etudiant GROUP BY dep;",
      "SELECT dep, COUNT(nom), AVG(note) FROM Etudiant ORDER BY dep;",
      "SELECT dep FROM Etudiant GROUP BY COUNT(nom), AVG(note);"
    ],
    correct: 1,
    explanation: "On peut combiner plusieurs fonctions d'agrégation dans un même SELECT avec GROUP BY. Exemple du cours :\nSELECT dep, count(nom) AS Total_étudiants, AVG(note) AS moyenne_notes\nFROM Etudiant\nGROUP BY dep;\nRésultat : pour le département 77 → 2 étudiants, moyenne 14.25."
  },
  {
    id: 34,
    category: "HAVING",
    difficulty: "moyen",
    question: "Pourquoi cette requête est-elle INCORRECTE ?\nSELECT dep, AVG(note) FROM Etudiant GROUP BY dep WHERE AVG(note) > 12;",
    options: [
      "On ne peut pas utiliser AVG dans un GROUP BY",
      "WHERE ne peut pas contenir une fonction d'agrégation — il faut utiliser HAVING",
      "Il manque un alias AS",
      "GROUP BY doit être après WHERE"
    ],
    correct: 1,
    explanation: "WHERE filtre les lignes AVANT le regroupement et ne peut PAS contenir de fonctions d'agrégation. Pour filtrer APRÈS le regroupement, on utilise HAVING.\nRequête corrigée :\nSELECT dep, AVG(note) AS moyenne_notes FROM Etudiant GROUP BY dep HAVING AVG(note) > 12;\nOrdre : FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY."
  },
  {
    id: 35,
    category: "HAVING",
    difficulty: "difficile",
    question: "D'après le cours : afficher les départements où la moyenne des notes est > 14.5, pour les étudiants ayant une note > 10.\nQuelle requête est correcte ?",
    options: [
      "SELECT dep, AVG(note) FROM Etudiant WHERE note > 10 HAVING AVG(note) > 14.5;",
      "SELECT dep, COUNT(nom) AS nb, AVG(note) AS moy FROM Etudiant WHERE note > 10 GROUP BY dep HAVING AVG(note) > 14.5;",
      "SELECT dep, AVG(note) FROM Etudiant HAVING AVG(note) > 14.5 WHERE note > 10 GROUP BY dep;",
      "SELECT dep, AVG(note) FROM Etudiant GROUP BY dep WHERE note > 10 AND AVG(note) > 14.5;"
    ],
    correct: 1,
    explanation: "L'ordre des clauses est strict : SELECT → FROM → WHERE → GROUP BY → HAVING → ORDER BY.\n1. WHERE note > 10 filtre d'abord les étudiants (AVANT le regroupement)\n2. GROUP BY dep regroupe par département\n3. HAVING AVG(note) > 14.5 ne garde que les groupes avec une moyenne > 14.5\nC'est l'exemple « WHERE vs HAVING » du cours."
  },

  // ╔══════════════════════════════════════════════════════════╗
  // ║  COURS 5 — Dates et fonctions                          ║
  // ╚══════════════════════════════════════════════════════════╝

  {
    id: 36,
    category: "Fonctions",
    difficulty: "facile",
    question: "Comment comparer des dates en SQL ? Comment afficher les étudiants nés après le 1er janvier 1985 ?",
    options: [
      "WHERE date_n AFTER '1985-01-01'",
      "WHERE date_n > '1985-01-01'",
      "WHERE date_n GREATER '1985-01-01'",
      "WHERE YEAR(date_n) AFTER 1985"
    ],
    correct: 1,
    explanation: "Les dates s'écrivent au format AAAA-MM-JJ entre guillemets simples. On utilise les opérateurs de comparaison habituels : <, >, <=, >=, =. SQL compare les dates chronologiquement."
  },
  {
    id: 37,
    category: "Fonctions",
    difficulty: "moyen",
    question: "D'après le cours, quelle fonction permet d'extraire l'année d'une date ?",
    options: [
      "EXTRACT(date_n)",
      "YEAR(date_n)",
      "GET_YEAR(date_n)",
      "DATE_YEAR(date_n)"
    ],
    correct: 1,
    explanation: "YEAR(date) extrait l'année d'une date. On a aussi MONTH() et DAY().\nExemple du cours : SELECT * FROM Etudiant WHERE YEAR(date_n) = 1985;\n→ Retourne Martin Véra (31/10/1985) et Martin Annie (31/12/1985).\nNote : EXTRACT(YEAR FROM date) est la syntaxe SQL standard."
  },

  // ╔══════════════════════════════════════════════════════════╗
  // ║  TDTP4 — Requêtes simples (base Cinéma)                ║
  // ╚══════════════════════════════════════════════════════════╝

  {
    id: 38,
    category: "SELECT",
    difficulty: "facile",
    question: "D'après le TD4 : comment afficher le titre des films avec un alias 'Titre_du_Film' ?",
    options: [
      "SELECT titre = 'Titre_du_Film' FROM Film;",
      "SELECT titre AS Titre_du_Film FROM Film;",
      "SELECT 'Titre_du_Film' FROM Film;",
      "SELECT titre RENAME Titre_du_Film FROM Film;"
    ],
    correct: 1,
    explanation: "L'alias AS renomme temporairement une colonne dans le résultat. Si l'alias contient des espaces, on utilise des guillemets doubles : AS \"Titre du Film\".\nNote : AS est optionnel syntaxiquement, mais recommandé pour la clarté."
  },
  {
    id: 39,
    category: "WHERE",
    difficulty: "moyen",
    question: "D'après le TD4 : afficher les films sortis avant 2015 OU ayant une durée > 150 min.\nQuel opérateur logique utiliser ?",
    options: [
      "WHERE annee < 2015 AND dureeMin > 150",
      "WHERE annee < 2015 OR dureeMin > 150",
      "WHERE annee < 2015 THEN dureeMin > 150",
      "WHERE annee < 2015, dureeMin > 150"
    ],
    correct: 1,
    explanation: "OR signifie « au moins une condition vraie ». Ici, on veut les films qui sont SOIT sortis avant 2015, SOIT durent plus de 150 minutes (ou les deux).\nAND exigerait que les DEUX conditions soient vraies en même temps."
  },
  {
    id: 40,
    category: "LIKE",
    difficulty: "moyen",
    question: "D'après le TD4 : comment afficher les films dont le titre contient la lettre 'n' (minuscule) ?",
    options: [
      "WHERE titre = '%n%'",
      "WHERE titre LIKE '%n%'",
      "WHERE titre CONTAINS 'n'",
      "WHERE titre HAS 'n'"
    ],
    correct: 1,
    explanation: "LIKE '%n%' recherche la lettre 'n' n'importe où dans le titre. Le % avant et après signifie « n'importe quels caractères avant et après ».\nAttention : la comparaison est sensible à la casse sur certains SGBD. 'n' ≠ 'N'."
  },
  {
    id: 41,
    category: "Agrégation",
    difficulty: "moyen",
    question: "D'après le TD4 : comment afficher les films (idFilm) ayant plus d'une séance ?",
    options: [
      "SELECT idFilm FROM Seance WHERE COUNT(*) > 1 GROUP BY idFilm;",
      "SELECT idFilm, COUNT(*) FROM Seance GROUP BY idFilm HAVING COUNT(*) > 1;",
      "SELECT idFilm, COUNT(*) FROM Seance HAVING COUNT(*) > 1;",
      "SELECT idFilm FROM Seance GROUP BY idFilm WHERE COUNT(*) > 1;"
    ],
    correct: 1,
    explanation: "Pour filtrer des groupes, on utilise HAVING après GROUP BY. L'ordre est :\nSELECT → FROM → WHERE → GROUP BY → HAVING\nWHERE ne peut pas contenir de fonction d'agrégation. Il faut d'abord grouper, puis filtrer avec HAVING."
  },

  // ╔══════════════════════════════════════════════════════════╗
  // ║  COURS 6 — JOINTURES                                   ║
  // ╚══════════════════════════════════════════════════════════╝

  {
    id: 42,
    category: "JOIN",
    difficulty: "facile",
    question: "Qu'est-ce qu'une jointure en SQL ?",
    options: [
      "Une opération qui supprime les doublons",
      "Une opération qui relie plusieurs tables pour combiner leurs données",
      "Un synonyme de GROUP BY",
      "Une opération qui crée une nouvelle table"
    ],
    correct: 1,
    explanation: "Une jointure relie plusieurs tables dans une base de données pour combiner leurs données. Elle permet d'extraire les informations liées dans une seule requête.\nExemple : lier la table Etudiant et la table Département pour afficher le nom de chaque département à côté de chaque étudiant."
  },
  {
    id: 43,
    category: "JOIN",
    difficulty: "moyen",
    question: "D'après le cours, quels sont les 3 types de syntaxe pour faire une jointure interne ?",
    options: [
      "LEFT JOIN, RIGHT JOIN, FULL JOIN",
      "NATURAL JOIN, INNER JOIN (avec ON), jointure implicite (WHERE)",
      "INNER JOIN, OUTER JOIN, CROSS JOIN",
      "SELECT JOIN, FROM JOIN, WHERE JOIN"
    ],
    correct: 1,
    explanation: "Le cours présente 3 syntaxes équivalentes pour la jointure interne :\n1. NATURAL JOIN : jointure automatique sur colonnes de même nom\n2. INNER JOIN ... ON : condition explicite (recommandé)\n3. FROM t1, t2 WHERE t1.col = t2.col : jointure implicite (à éviter)\nLe mot clé INNER est facultatif : JOIN = INNER JOIN."
  },
  {
    id: 44,
    category: "JOIN",
    difficulty: "moyen",
    question: "D'après le cours, quelle est la différence entre NATURAL JOIN et INNER JOIN ?",
    options: [
      "Aucune différence",
      "NATURAL JOIN fait la jointure automatiquement sur les colonnes de même nom ; INNER JOIN nécessite une condition ON explicite",
      "INNER JOIN est plus lent",
      "NATURAL JOIN ne fonctionne qu'avec 2 tables"
    ],
    correct: 1,
    explanation: "D'après le comparatif du cours :\n• NATURAL JOIN : automatique, pas de doublons de colonnes, mais peu flexible (dépend des noms)\n• INNER JOIN ... ON : explicite, très flexible, recommandé pour tous les projets\n• WHERE (implicite) : la relation se noie dans le WHERE, à éviter\nINNER JOIN est recommandé pour sa clarté."
  },
  {
    id: 45,
    category: "JOIN",
    difficulty: "moyen",
    question: "Que retourne un LEFT OUTER JOIN ?",
    options: [
      "Uniquement les lignes ayant une correspondance dans les deux tables",
      "Toutes les lignes de la table de gauche, même sans correspondance à droite (avec NULL)",
      "Toutes les lignes de la table de droite",
      "Le produit cartésien des deux tables"
    ],
    correct: 1,
    explanation: "LEFT JOIN retourne TOUTES les lignes de la table de gauche (table du FROM). Si aucune correspondance n'existe dans la table de droite, les colonnes de droite contiennent NULL.\nExemple du cours : Left Join entre Etudiant et Département → Lefèvre (département non référencé) apparaît avec dep_num = NULL et dep_nom = NULL."
  },
  {
    id: 46,
    category: "JOIN",
    difficulty: "moyen",
    question: "Quelle est la différence entre LEFT JOIN et RIGHT JOIN ?",
    options: [
      "Il n'y a aucune différence",
      "LEFT JOIN garde toutes les lignes de gauche ; RIGHT JOIN garde toutes les lignes de droite",
      "LEFT JOIN est plus rapide",
      "RIGHT JOIN ne fonctionne qu'avec INNER"
    ],
    correct: 1,
    explanation: "• LEFT JOIN : conserve toutes les lignes de la table de GAUCHE (FROM)\n• RIGHT JOIN : conserve toutes les lignes de la table de DROITE\nAttention : inverser l'ordre des tables donne le même résultat. Un LEFT JOIN t1 t2 équivaut à un RIGHT JOIN t2 t1."
  },
  {
    id: 47,
    category: "JOIN",
    difficulty: "difficile",
    question: "D'après le cours, que retourne un FULL OUTER JOIN ?",
    options: [
      "Uniquement les lignes communes aux deux tables",
      "Toutes les lignes des deux tables, avec NULL là où il n'y a pas de correspondance",
      "Le produit cartésien",
      "Seulement les lignes sans correspondance"
    ],
    correct: 1,
    explanation: "FULL OUTER JOIN = UNION des résultats de LEFT JOIN et RIGHT JOIN. Il retourne TOUTES les lignes des deux tables.\n⚠️ MySQL ne supporte PAS directement FULL OUTER JOIN. Il faut le simuler avec :\nSELECT * FROM t1 LEFT JOIN t2 ON ...\nUNION\nSELECT * FROM t1 RIGHT JOIN t2 ON ...;"
  },
  {
    id: 48,
    category: "JOIN",
    difficulty: "difficile",
    question: "D'après le cours (Vrai/Faux) : « Un LEFT JOIN et un RIGHT JOIN donnent toujours le même résultat, quel que soit l'ordre des tables. »",
    options: [
      "Vrai",
      "Faux — ils donnent des résultats différents sauf si on inverse l'ordre des tables",
      "Vrai, mais seulement avec INNER JOIN",
      "Cela dépend du SGBD"
    ],
    correct: 1,
    explanation: "C'est FAUX. LEFT JOIN et RIGHT JOIN donnent des résultats différents car ils privilégient des tables différentes.\nCependant : A LEFT JOIN B = B RIGHT JOIN A (même résultat si on inverse les tables). L'exercice Vrai/Faux du cours confirme cela."
  },

  // ╔══════════════════════════════════════════════════════════╗
  // ║  TDTP5 — Jointures en pratique (base Cinéma)           ║
  // ╚══════════════════════════════════════════════════════════╝

  {
    id: 49,
    category: "JOIN",
    difficulty: "moyen",
    question: "D'après le TD5 : comment afficher pour chaque film son titre et le nom/prénom de son réalisateur ?",
    options: [
      "SELECT titre, nom, prenom FROM Film, Artiste;",
      "SELECT f.titre, a.nom, a.prenom FROM Film f INNER JOIN Artiste a ON f.idRealisateur = a.id;",
      "SELECT titre, nom FROM Film JOIN Artiste;",
      "SELECT titre, nom FROM Film WHERE Film.id = Artiste.id;"
    ],
    correct: 1,
    explanation: "On utilise INNER JOIN avec ON pour relier Film et Artiste via la clé étrangère idRealisateur. Les alias 'f' et 'a' simplifient l'écriture.\nSans condition ON, la requête A ferait un produit cartésien (chaque film × chaque artiste), ce qui est incorrect."
  },
  {
    id: 50,
    category: "JOIN",
    difficulty: "difficile",
    question: "D'après le TD5 : comment afficher tous les films, même ceux sans réalisateur (idRealisateur = NULL) ?",
    options: [
      "SELECT f.titre, a.nom FROM Film f INNER JOIN Artiste a ON f.idRealisateur = a.id;",
      "SELECT f.titre, a.nom, a.prenom FROM Film f LEFT JOIN Artiste a ON f.idRealisateur = a.id;",
      "SELECT f.titre, a.nom FROM Film f RIGHT JOIN Artiste a ON f.idRealisateur = a.id;",
      "SELECT f.titre, a.nom FROM Film f NATURAL JOIN Artiste a;"
    ],
    correct: 1,
    explanation: "LEFT JOIN conserve TOUS les films (table de gauche), même ceux dont idRealisateur est NULL (comme 'Lost in Tokyo').\nINNER JOIN exclurait ces films car il n'y a pas de correspondance dans Artiste.\nRIGHT JOIN conserverait tous les artistes mais pas nécessairement tous les films."
  },

  // ╔══════════════════════════════════════════════════════════╗
  // ║  COURS 6 — Sous-requêtes                               ║
  // ╚══════════════════════════════════════════════════════════╝

  {
    id: 51,
    category: "Subqueries",
    difficulty: "moyen",
    question: "D'après le cours : comment trouver les étudiants qui ont une note supérieure à la moyenne générale ?",
    options: [
      "SELECT nom, note FROM etudiants WHERE note > AVG(note);",
      "SELECT nom, prenom, note FROM etudiants WHERE note > (SELECT AVG(note) FROM etudiants);",
      "SELECT nom, note FROM etudiants HAVING note > AVG(note);",
      "SELECT nom, note FROM etudiants WHERE note > AVERAGE(note);"
    ],
    correct: 1,
    explanation: "On ne peut pas mettre AVG() directement dans WHERE. Il faut une sous-requête :\nWHERE note > (SELECT AVG(note) FROM etudiants)\nLe résultat de la sous-requête (une seule valeur) est comparé à chaque note. Résultat du cours : Martin Véra (13.5), Martin Annie (15.5), Dupont Sylvie (15.0)."
  },
  {
    id: 52,
    category: "Subqueries",
    difficulty: "moyen",
    question: "Où peut-on placer une sous-requête ?",
    options: [
      "Uniquement dans WHERE",
      "Dans WHERE, HAVING ou SELECT",
      "Uniquement dans SELECT",
      "Uniquement dans FROM"
    ],
    correct: 1,
    explanation: "D'après le cours, le résultat d'une sous-requête peut être utilisé :\n• dans WHERE pour filtrer\n• dans HAVING pour restreindre des groupes\n• dans SELECT pour enrichir le résultat\nExemple WHERE : WHERE note > (SELECT AVG(note) FROM etudiants)."
  },

  // ╔══════════════════════════════════════════════════════════╗
  // ║  COURS 6 — Vues                                        ║
  // ╚══════════════════════════════════════════════════════════╝

  {
    id: 53,
    category: "Vues",
    difficulty: "moyen",
    question: "D'après le cours, qu'est-ce qu'une vue en SQL ?",
    options: [
      "Une copie physique des données sur le disque",
      "Une table virtuelle définie par une requête, qui ne stocke pas de données",
      "Un index pour accélérer les requêtes",
      "Un synonyme de TABLE"
    ],
    correct: 1,
    explanation: "Une vue est une table VIRTUELLE définie par une requête. Elle ne stocke pas de données physiquement. Chaque fois qu'on interroge la vue, la requête sous-jacente est exécutée.\nAvantages :\n• Évite de réécrire les mêmes requêtes complexes\n• Sert de couche intermédiaire pour l'analyse\n• On l'interroge comme une table classique."
  },
  {
    id: 54,
    category: "Vues",
    difficulty: "moyen",
    question: "D'après le cours, quelle est la syntaxe pour créer une vue des moyennes par département ?",
    options: [
      "CREATE VIEW moyennes_par_dep AS SELECT dep, AVG(note) AS moyenne_note FROM etudiants GROUP BY dep;",
      "MAKE VIEW moyennes_par_dep FROM SELECT dep, AVG(note) FROM etudiants GROUP BY dep;",
      "INSERT VIEW moyennes_par_dep AS SELECT dep, AVG(note) FROM etudiants;",
      "CREATE TABLE VIEW moyennes_par_dep AS SELECT dep, AVG(note) FROM etudiants GROUP BY dep;"
    ],
    correct: 0,
    explanation: "La syntaxe est : CREATE VIEW nom AS requête_SELECT;\nExemple du cours :\nCREATE VIEW moyennes_par_dep AS\nSELECT dep, AVG(note) AS moyenne_note FROM etudiants GROUP BY dep;\nOn peut ensuite interroger la vue : SELECT * FROM moyennes_par_dep;"
  },
  {
    id: 55,
    category: "Vues",
    difficulty: "moyen",
    question: "D'après le TD5 : comment supprimer une vue ?",
    options: [
      "DELETE VIEW Vue_Salles_Cinemas;",
      "DROP VIEW Vue_Salles_Cinemas;",
      "REMOVE VIEW Vue_Salles_Cinemas;",
      "ALTER VIEW Vue_Salles_Cinemas DROP;"
    ],
    correct: 1,
    explanation: "DROP VIEW nom_vue; supprime la vue. Cela ne supprime pas les données des tables sous-jacentes — uniquement la définition de la vue."
  },

  // ╔══════════════════════════════════════════════════════════╗
  // ║  ÉVAL NS2 — CREATE TABLE, INSERT, UPDATE, requêtes     ║
  // ╚══════════════════════════════════════════════════════════╝

  {
    id: 56,
    category: "DDL",
    difficulty: "moyen",
    question: "D'après l'évaluation NS2 : quelle est la syntaxe correcte pour créer la table 'article' avec une clé primaire et des clés étrangères au niveau TABLE ?",
    options: [
      "CREATE TABLE article (\n  idarticle INTEGER NOT NULL PRIMARY KEY,\n  idmarque INTEGER FOREIGN KEY marque(idmarque)\n);",
      "CREATE TABLE article (\n  idarticle INTEGER NOT NULL,\n  idmarque INTEGER NOT NULL,\n  CONSTRAINT id_article_pk PRIMARY KEY (idarticle),\n  CONSTRAINT id_marque_fk FOREIGN KEY (idmarque) REFERENCES marque(idmarque)\n);",
      "CREATE article TABLE (\n  idarticle INTEGER PRIMARY,\n  idmarque INTEGER FOREIGN marque\n);",
      "NEW TABLE article (idarticle INT PK, idmarque INT FK marque);"
    ],
    correct: 1,
    explanation: "Au niveau TABLE, on nomme les contraintes avec CONSTRAINT :\n• CONSTRAINT nom PRIMARY KEY (colonne)\n• CONSTRAINT nom FOREIGN KEY (colonne) REFERENCES table(colonne)\nC'est la méthode recommandée car elle permet de nommer les contraintes pour les référencer plus tard (ALTER TABLE, etc.)."
  },
  {
    id: 57,
    category: "INSERT",
    difficulty: "moyen",
    question: "D'après l'évaluation NS2 : comment insérer l'article \"Jus d'orange\" à 2.89€ dans le rayon 5 ?",
    options: [
      "INSERT article VALUES (1, \"Jus d'orange\", 2.89, 0, 12, 5);",
      "INSERT INTO article (idarticle, libelle, prix, bio, idmarque, idrayon) VALUES (1, 'Jus d''orange', 2.89, 0, 12, 5);",
      "ADD INTO article VALUES (1, 'Jus d''orange', 2.89);",
      "INSERT INTO article SET libelle = 'Jus d''orange', prix = 2.89;"
    ],
    correct: 1,
    explanation: "Syntaxe : INSERT INTO table (col1, col2, ...) VALUES (val1, val2, ...);\nNote importante : pour les apostrophes dans les valeurs texte, on les double : 'Jus d''orange' (deux apostrophes simples). En précisant les colonnes, on s'assure de l'ordre correct des valeurs."
  },
  {
    id: 58,
    category: "UPDATE",
    difficulty: "facile",
    question: "D'après l'évaluation NS2 : comment augmenter de 10% le prix des articles bio (bio = 1) ?",
    options: [
      "UPDATE article SET prix = prix + 10% WHERE bio = 1;",
      "UPDATE article SET prix = prix * 1.1 WHERE bio = 1;",
      "ALTER article SET prix = prix * 1.1 WHERE bio = 1;",
      "MODIFY article prix = prix * 110% WHERE bio = 1;"
    ],
    correct: 1,
    explanation: "UPDATE table SET colonne = expression WHERE condition;\nPour +10%, on multiplie par 1.1 (pas 1.10%). Le % n'est pas un opérateur arithmétique valide en SQL (c'est le modulo)."
  },
  {
    id: 59,
    category: "Agrégation",
    difficulty: "moyen",
    question: "D'après l'évaluation NS2 : comment afficher le prix moyen des articles par marque ?",
    options: [
      "SELECT idmarque, AVG(prix) FROM article;",
      "SELECT idmarque, AVG(prix) FROM article GROUP BY idmarque;",
      "SELECT AVG(prix) FROM article ORDER BY idmarque;",
      "SELECT idmarque, MEAN(prix) FROM article GROUP BY idmarque;"
    ],
    correct: 1,
    explanation: "GROUP BY idmarque regroupe les articles par marque, puis AVG(prix) calcule la moyenne pour chaque groupe. Sans GROUP BY, la moyenne serait calculée sur TOUS les articles confondus."
  },
  {
    id: 60,
    category: "WHERE",
    difficulty: "facile",
    question: "D'après l'évaluation NS2 : comment afficher les fournisseurs de Lyon, Paris ou Bordeaux ?",
    options: [
      "SELECT raisonSociale FROM fournisseur WHERE adresseVille = 'Lyon' AND 'Paris' AND 'Bordeaux';",
      "SELECT raisonSociale FROM fournisseur WHERE adresseVille IN ('Lyon', 'Paris', 'Bordeaux');",
      "SELECT raisonSociale FROM fournisseur WHERE adresseVille BETWEEN 'Lyon' AND 'Bordeaux';",
      "SELECT raisonSociale FROM fournisseur WHERE adresseVille LIKE 'Lyon, Paris, Bordeaux';"
    ],
    correct: 1,
    explanation: "IN vérifie si une valeur appartient à un ensemble de valeurs. C'est plus lisible que :\nWHERE adresseVille = 'Lyon' OR adresseVille = 'Paris' OR adresseVille = 'Bordeaux'.\nBETWEEN ne fonctionne pas pour des listes de valeurs texte spécifiques."
  },

  // ╔══════════════════════════════════════════════════════════╗
  // ║  TDTP5 — Sous-requêtes et jointures combinées          ║
  // ╚══════════════════════════════════════════════════════════╝

  {
    id: 61,
    category: "Subqueries",
    difficulty: "difficile",
    question: "D'après le TD5 : comment afficher les films dont la durée est supérieure à la durée moyenne ?",
    options: [
      "SELECT * FROM Film WHERE dureeMin > AVG(dureeMin);",
      "SELECT * FROM Film WHERE dureeMin > (SELECT AVG(dureeMin) FROM Film);",
      "SELECT * FROM Film HAVING dureeMin > AVG(dureeMin);",
      "SELECT * FROM Film WHERE dureeMin > AVERAGE(Film.dureeMin);"
    ],
    correct: 1,
    explanation: "On ne peut PAS utiliser AVG() directement dans WHERE. Il faut une sous-requête scalaire :\n(SELECT AVG(dureeMin) FROM Film)\nqui calcule d'abord la moyenne, puis la requête externe compare chaque film à cette valeur."
  },
  {
    id: 62,
    category: "Subqueries",
    difficulty: "difficile",
    question: "D'après le TD5 : comment afficher les films qui ont été projetés au moins une fois ?",
    options: [
      "SELECT * FROM Film WHERE idFilm IN Seance;",
      "SELECT * FROM Film WHERE idFilm IN (SELECT idFilm FROM Seance);",
      "SELECT * FROM Film JOIN Seance WHERE projected = true;",
      "SELECT * FROM Film WHERE EXISTS Seance;"
    ],
    correct: 1,
    explanation: "La sous-requête (SELECT idFilm FROM Seance) retourne la liste des idFilm qui ont au moins une séance. IN vérifie si l'idFilm du film fait partie de cette liste.\nAlternative avec EXISTS : WHERE EXISTS (SELECT 1 FROM Seance s WHERE s.idFilm = Film.idFilm)."
  },

  // ╔══════════════════════════════════════════════════════════╗
  // ║  TDTP4 — Requêtes avancées (regroupement, dates)       ║
  // ╚══════════════════════════════════════════════════════════╝

  {
    id: 63,
    category: "Agrégation",
    difficulty: "moyen",
    question: "D'après le TD4 : comment afficher les cinémas ayant au moins 2 salles ?",
    options: [
      "SELECT nomCinema FROM Salle WHERE COUNT(*) >= 2;",
      "SELECT nomCinema FROM Salle GROUP BY nomCinema HAVING COUNT(*) >= 2;",
      "SELECT nomCinema, COUNT(*) FROM Salle HAVING COUNT(*) >= 2;",
      "SELECT nomCinema FROM Salle GROUP BY nomCinema WHERE COUNT(*) >= 2;"
    ],
    correct: 1,
    explanation: "1. GROUP BY nomCinema regroupe les salles par cinéma\n2. COUNT(*) compte le nombre de salles par cinéma\n3. HAVING COUNT(*) >= 2 ne garde que les cinémas avec 2+ salles\nRappel : WHERE filtre AVANT le regroupement, HAVING filtre APRÈS."
  },
  {
    id: 64,
    category: "Agrégation",
    difficulty: "moyen",
    question: "D'après le TD4 : quelle est la différence entre COUNT(*) et COUNT(colonne) ?",
    options: [
      "Aucune différence",
      "COUNT(*) compte toutes les lignes ; COUNT(colonne) ne compte que les lignes où cette colonne n'est pas NULL",
      "COUNT(colonne) est plus rapide",
      "COUNT(*) ne compte que les lignes non-NULL"
    ],
    correct: 1,
    explanation: "C'est une distinction fondamentale :\n• COUNT(*) = nombre total de lignes (inclut les NULL)\n• COUNT(colonne) = nombre de lignes où la colonne n'est pas NULL\nExemple : si 3 films sur 5 ont un idRealisateur, COUNT(idRealisateur) = 3 mais COUNT(*) = 5."
  },
  {
    id: 65,
    category: "DDL",
    difficulty: "facile",
    question: "Quel mot-clé permet de définir une valeur par défaut pour une colonne ?",
    options: [
      "INIT",
      "DEFAULT",
      "SET",
      "AUTO"
    ],
    correct: 1,
    explanation: "DEFAULT définit la valeur utilisée si aucune valeur n'est fournie lors de l'insertion.\nExemple du cours :\nCREATE TABLE Cinema (nom VARCHAR(50) NOT NULL, adresse VARCHAR(50) DEFAULT 'Inconnue');\nExemple TD3 : prix DECIMAL(5,2) DEFAULT 9.50 pour le prix par défaut d'une séance."
  },
  {
    id: 66,
    category: "JOIN",
    difficulty: "difficile",
    question: "D'après le cours : « Le mot-clé JOIN sans précision est équivalent à INNER JOIN. » Vrai ou Faux ?",
    options: [
      "Faux",
      "Vrai",
      "Cela dépend du SGBD",
      "JOIN sans précision fait un CROSS JOIN"
    ],
    correct: 1,
    explanation: "C'est VRAI. D'après l'exercice Vrai/Faux du cours :\nJOIN = INNER JOIN par défaut.\nDe même : LEFT JOIN = LEFT OUTER JOIN (le mot OUTER est facultatif)."
  },
  {
    id: 67,
    category: "JOIN",
    difficulty: "difficile",
    question: "D'après le cours : « Si toutes les valeurs de jointure existent dans les deux tables, INNER JOIN, LEFT JOIN, RIGHT JOIN et FULL JOIN donnent le même résultat. » Vrai ou Faux ?",
    options: [
      "Faux",
      "Vrai — s'il n'y a aucune valeur sans correspondance, toutes les jointures sont identiques",
      "Vrai, mais seulement pour 2 tables",
      "Faux, car FULL JOIN produit des doublons"
    ],
    correct: 1,
    explanation: "C'est VRAI. Si chaque ligne a une correspondance dans l'autre table, il n'y a pas de NULL ajouté, donc LEFT, RIGHT, FULL et INNER donnent le même résultat. La différence n'apparaît que quand il y a des lignes sans correspondance."
  },

  // ╔══════════════════════════════════════════════════════════╗
  // ║  Étude de cas — Bibliothèque (Cours 6)                 ║
  // ╚══════════════════════════════════════════════════════════╝

  {
    id: 68,
    category: "Agrégation",
    difficulty: "moyen",
    question: "D'après l'étude de cas (bibliothèque) : comment afficher les emprunts non encore rendus ?",
    options: [
      "SELECT * FROM Emprunt WHERE date_retour = '';",
      "SELECT * FROM Emprunt WHERE date_retour IS NULL;",
      "SELECT * FROM Emprunt WHERE date_retour = 0;",
      "SELECT * FROM Emprunt WHERE date_retour NOT EXISTS;"
    ],
    correct: 1,
    explanation: "Un emprunt non rendu a une date_retour = NULL (pas encore renseignée). On teste avec IS NULL, pas = NULL.\nRappel : NULL n'est pas une valeur, c'est l'absence de valeur. '' (chaîne vide) et 0 ne sont PAS NULL."
  },
  {
    id: 69,
    category: "Subqueries",
    difficulty: "difficile",
    question: "D'après l'étude de cas (bibliothèque) : comment afficher les adhérents dont l'âge est supérieur à la moyenne ?",
    options: [
      "SELECT * FROM Adherent WHERE age > AVG(age);",
      "SELECT * FROM Adherent WHERE age > (SELECT AVG(age) FROM Adherent);",
      "SELECT * FROM Adherent HAVING age > AVG(age);",
      "SELECT * FROM Adherent WHERE age > MEAN(age);"
    ],
    correct: 1,
    explanation: "Exactement comme pour les notes des étudiants, on utilise une sous-requête :\nWHERE age > (SELECT AVG(age) FROM Adherent)\nLa sous-requête calcule d'abord la moyenne d'âge, puis la requête principale filtre les adhérents au-dessus."
  },
  {
    id: 70,
    category: "Vues",
    difficulty: "difficile",
    question: "D'après l'étude de cas (bibliothèque) : comment créer une vue affichant le nombre de livres et d'emprunts par catégorie ?",
    options: [
      "CREATE TABLE Vue_StatCategorie AS SELECT nom_categorie, COUNT(*) FROM Livre;",
      "CREATE VIEW Vue_StatCategorie AS\nSELECT c.nom_categorie, COUNT(DISTINCT l.id_livre) AS nb_livres, COUNT(e.id_emprunt) AS nb_emprunts\nFROM Categorie c\nLEFT JOIN Livre l ON c.id_categorie = l.id_categorie\nLEFT JOIN Emprunt e ON l.id_livre = e.id_livre\nGROUP BY c.nom_categorie;",
      "MAKE VIEW Vue_StatCategorie FROM Categorie, Livre, Emprunt;",
      "INSERT VIEW Vue_StatCategorie SELECT * FROM Categorie;"
    ],
    correct: 1,
    explanation: "CREATE VIEW ... AS SELECT utilise des LEFT JOIN pour inclure toutes les catégories (même sans livre ni emprunt), GROUP BY pour regrouper, et COUNT pour compter. COUNT(DISTINCT) évite de compter les doublons de livres quand un même livre a plusieurs emprunts."
  }
];

const FLASHCARDS = [

  // ╔══════════════════════════════════════════════════════════╗
  // ║  DDL — CREATE, ALTER, Contraintes (Cours 4)             ║
  // ╚══════════════════════════════════════════════════════════╝

  {
    id: 1,
    category: "DDL",
    difficulty: "facile",
    front: "Les 3 catégories du langage SQL et leurs rôles.",
    back: "• DDL (Data Definition Language) :\n  CREATE, ALTER, DROP → définir le schéma\n\n• DML (Data Manipulation Language) :\n  SELECT, INSERT, UPDATE, DELETE → manipuler les données\n\n• DCL (Data Control Language) :\n  GRANT, REVOKE → contrôler l'accès"
  },
  {
    id: 2,
    category: "DDL",
    difficulty: "facile",
    front: "Créer la table Internaute avec email (PK), nom (NOT NULL), prénom et année de naissance.",
    back: "CREATE TABLE Internaute (\n  email VARCHAR(50) NOT NULL,\n  nom VARCHAR(20) NOT NULL,\n  prenom VARCHAR(20),\n  anneeNaiss INTEGER(4),\n  PRIMARY KEY (email)\n);\n\nNOT NULL = la colonne doit toujours avoir une valeur.\nNULL ≠ zéro ≠ chaîne vide."
  },
  {
    id: 3,
    category: "DDL",
    difficulty: "moyen",
    front: "Les 6 types de contraintes SQL et leur syntaxe.",
    back: "1. NOT NULL → valeur obligatoire\n2. UNIQUE → pas de doublons\n3. PRIMARY KEY → NOT NULL + UNIQUE (1 seule/table)\n4. FOREIGN KEY ... REFERENCES → intégrité référentielle\n5. CHECK (condition) → vérification logique\n6. DEFAULT valeur → valeur par défaut\n\nSyntaxe au niveau TABLE :\nCONSTRAINT nom_contrainte TYPE (colonne)"
  },
  {
    id: 4,
    category: "DDL",
    difficulty: "moyen",
    front: "Les 3 options ON DELETE d'une FOREIGN KEY et leurs effets.",
    back: "FOREIGN KEY (col) REFERENCES table(col)\n\n• ON DELETE RESTRICT (défaut) :\n  Interdit la suppression si des lignes filles existent\n\n• ON DELETE CASCADE :\n  Supprime aussi les lignes filles automatiquement\n\n• ON DELETE SET NULL :\n  Met la FK à NULL dans la table fille\n\nExemple : FOREIGN KEY (idRéalisateur) REFERENCES Artiste ON DELETE SET NULL"
  },
  {
    id: 5,
    category: "DDL",
    difficulty: "moyen",
    front: "Les 4 actions possibles avec ALTER TABLE.",
    back: "ALTER TABLE nom_table\n\n• ADD COLUMN col type;\n  → Ajouter une colonne\n\n• MODIFY col nouveau_type;\n  → Modifier le type\n\n• DROP COLUMN col;\n  → Supprimer une colonne\n\n• RENAME COLUMN ancien TO nouveau;\n  → Renommer une colonne\n\n• RENAME TO nouveau_nom;\n  → Renommer la table"
  },

  // ╔══════════════════════════════════════════════════════════╗
  // ║  DML — INSERT, UPDATE, DELETE (Cours 4 + TD3)           ║
  // ╚══════════════════════════════════════════════════════════╝

  {
    id: 6,
    category: "DML",
    difficulty: "facile",
    front: "Syntaxe INSERT INTO avec et sans colonnes + insertion depuis une autre table.",
    back: "-- Avec colonnes (recommandé) :\nINSERT INTO Emp (empno, ename, sal)\nVALUES (5555, 'BARTH', 2500);\n\n-- Sans colonnes (ordre exact requis) :\nINSERT INTO Emp\nVALUES (5555, 'BARTH', NULL, NULL, SYSDATE, 2500, NULL, NULL);\n\n-- Depuis une autre table :\nINSERT INTO Emp (empno, ename)\nSELECT empno, ename FROM SCOTT.EMP\nWHERE job = 'manager';"
  },
  {
    id: 7,
    category: "DML",
    difficulty: "facile",
    front: "Syntaxe UPDATE et DELETE — avec exemples du cours.",
    back: "-- UPDATE :\nUPDATE Employe\nSET salaire = salaire * 1.10\nWHERE deptno = 20;\n\n-- DELETE :\nDELETE FROM Film\nWHERE idFilm = 101;\n\n⚠️ Sans WHERE :\n• UPDATE modifie TOUTES les lignes\n• DELETE supprime TOUTES les lignes\n\nDifférence DELETE vs TRUNCATE :\n• DELETE : journalisé, WHERE possible\n• TRUNCATE : vide tout + libère la mémoire"
  },

  // ╔══════════════════════════════════════════════════════════╗
  // ║  SELECT, WHERE, LIKE, IN, BETWEEN (Cours 5)            ║
  // ╚══════════════════════════════════════════════════════════╝

  {
    id: 8,
    category: "SELECT",
    difficulty: "facile",
    front: "Les opérateurs de comparaison et les clauses de filtrage en SQL.",
    back: "Opérateurs : =, <>, <, >, <=, >=\n\nClauses de filtrage :\n• WHERE col = valeur\n• WHERE col BETWEEN a AND b (bornes incluses)\n• WHERE col IN (val1, val2, val3)\n• WHERE col LIKE 'motif'\n  % = 0 ou N caractères\n  _ = exactement 1 caractère\n• WHERE col IS NULL / IS NOT NULL\n\nOpérateurs logiques : AND, OR, NOT"
  },
  {
    id: 9,
    category: "SELECT",
    difficulty: "facile",
    front: "Alias (AS), DISTINCT et opérateurs arithmétiques dans SELECT.",
    back: "-- Alias :\nSELECT nom AS \"Nom de famille\" FROM Etudiant;\n→ Renomme temporairement (n'affecte pas la table)\n\n-- DISTINCT :\nSELECT DISTINCT dep FROM Etudiant;\n→ Élimine les doublons (NULL comptés comme identiques)\n\n-- Calculs :\nSELECT nom, note / 2 AS \"Note sur 10\" FROM Etudiant;\n→ Opérateurs : +, -, *, /\n⚠️ Si une valeur est NULL → résultat = NULL"
  },

  // ╔══════════════════════════════════════════════════════════╗
  // ║  Agrégation, GROUP BY, HAVING (Cours 5)                 ║
  // ╚══════════════════════════════════════════════════════════╝

  {
    id: 10,
    category: "Agrégation",
    difficulty: "moyen",
    front: "Les 5 fonctions d'agrégation SQL avec exemples du cours.",
    back: "SELECT\n  AVG(note)  AS moyenne,   -- → 12,24\n  COUNT(*)   AS nb_lignes, -- → 6\n  COUNT(note) AS nb_notes, -- → 5 (ignore NULL)\n  MIN(note)  AS note_min,  -- → 5.7\n  MAX(note)  AS note_max,  -- → 15.5\n  SUM(note)  AS somme      -- → 61.2\nFROM etudiants;\n\n⚠️ Les agrégats ne vont PAS dans WHERE.\nPour filtrer : sous-requête ou GROUP BY + HAVING."
  },
  {
    id: 11,
    category: "GROUP BY",
    difficulty: "moyen",
    front: "GROUP BY et HAVING — Synthèse et ordre d'exécution.",
    back: "Ordre d'exécution SQL :\nFROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY\n\n• WHERE filtre les LIGNES (avant regroupement)\n• HAVING filtre les GROUPES (après regroupement)\n\nExemple du cours :\nSELECT dep, COUNT(nom), AVG(note)\nFROM Etudiant\nWHERE note > 10         -- filtre les lignes\nGROUP BY dep\nHAVING AVG(note) > 14.5 -- filtre les groupes\n\n⚠️ WHERE ne peut PAS contenir AVG, COUNT, etc."
  },

  // ╔══════════════════════════════════════════════════════════╗
  // ║  JOINTURES (Cours 6)                                    ║
  // ╚══════════════════════════════════════════════════════════╝

  {
    id: 12,
    category: "JOIN",
    difficulty: "moyen",
    front: "Les 3 syntaxes de jointure interne (du cours).",
    back: "1. NATURAL JOIN (automatique) :\nSELECT * FROM Etudiant NATURAL JOIN Département;\n→ Join sur colonnes de même nom, pas de doublons\n\n2. INNER JOIN + ON (recommandé) :\nSELECT * FROM Etudiant e\nINNER JOIN Département d ON e.dep = d.dep_num;\n→ Condition explicite, très flexible\n\n3. Jointure implicite WHERE (à éviter) :\nSELECT * FROM Etudiant e, Département d\nWHERE e.dep = d.dep_num;\n→ Relation noyée dans le WHERE"
  },
  {
    id: 13,
    category: "JOIN",
    difficulty: "moyen",
    front: "LEFT JOIN, RIGHT JOIN et FULL OUTER JOIN — Résumé.",
    back: "• LEFT JOIN :\n  Toutes les lignes de gauche + correspondances droite\n  → NULL si pas de correspondance à droite\n\n• RIGHT JOIN :\n  Toutes les lignes de droite + correspondances gauche\n  → NULL si pas de correspondance à gauche\n\n• FULL OUTER JOIN :\n  Toutes les lignes des deux tables\n  → NULL des deux côtés si pas de correspondance\n\n⚠️ MySQL : pas de FULL OUTER JOIN natif\n→ Simuler avec LEFT JOIN UNION RIGHT JOIN"
  },
  {
    id: 14,
    category: "JOIN",
    difficulty: "difficile",
    front: "7 affirmations Vrai/Faux sur les jointures (exercice du cours).",
    back: "✅ INNER JOIN = uniquement les correspondances\n✅ LEFT JOIN peut produire des NULL à droite\n❌ RIGHT JOIN n'affiche PAS la table gauche complète (c'est la droite)\n✅ FULL OUTER JOIN = LEFT ∪ RIGHT\n✅ Si tout correspond → INNER = LEFT = RIGHT = FULL\n❌ LEFT JOIN ≠ RIGHT JOIN (sauf si on inverse les tables)\n✅ FULL OUTER JOIN peut avoir des NULL des deux côtés\n✅ JOIN sans précision = INNER JOIN\n✅ On peut chaîner plusieurs jointures"
  },

  // ╔══════════════════════════════════════════════════════════╗
  // ║  Sous-requêtes et Vues (Cours 6)                        ║
  // ╚══════════════════════════════════════════════════════════╝

  {
    id: 15,
    category: "Subqueries",
    difficulty: "moyen",
    front: "Les sous-requêtes : définition, emplacements et exemple.",
    back: "Une sous-requête = requête SQL à l'intérieur d'une autre.\n\nEmplacements possibles :\n• WHERE → filtrer\n• HAVING → filtrer des groupes\n• SELECT → enrichir le résultat\n\nExemple :\nSELECT nom, note FROM etudiants\nWHERE note > (SELECT AVG(note) FROM etudiants);\n→ Étudiants au-dessus de la moyenne\n\nAvec IN :\nWHERE idFilm IN (SELECT idFilm FROM Seance)\n→ Films ayant au moins une séance"
  },
  {
    id: 16,
    category: "Vues",
    difficulty: "moyen",
    front: "Les vues SQL : création, utilisation et suppression.",
    back: "-- Créer :\nCREATE VIEW moyennes_par_dep AS\nSELECT dep, AVG(note) AS moyenne_note\nFROM etudiants\nGROUP BY dep;\n\n-- Interroger (comme une table) :\nSELECT * FROM moyennes_par_dep\nWHERE moyenne_note > 10;\n\n-- Supprimer :\nDROP VIEW moyennes_par_dep;\n\nAvantages :\n• Table virtuelle (pas de stockage physique)\n• Évite de réécrire des requêtes complexes\n• Couche d'abstraction pour l'analyse"
  },

  // ╔══════════════════════════════════════════════════════════╗
  // ║  Évaluation — Patterns clés                             ║
  // ╚══════════════════════════════════════════════════════════╝

  {
    id: 17,
    category: "DDL",
    difficulty: "moyen",
    front: "Créer une table avec contraintes au niveau TABLE vs au niveau COLONNE.",
    back: "-- AU NIVEAU COLONNE (inline) :\nCREATE TABLE EMP (\n  empno NUMBER(4) PRIMARY KEY,\n  ename VARCHAR2(10) UNIQUE,\n  deptno NUMBER(7,2) NOT NULL\n);\n\n-- AU NIVEAU TABLE (nommé) :\nCREATE TABLE EMP (\n  empno NUMBER(4),\n  ename VARCHAR2(10),\n  deptno NUMBER(7,2) NOT NULL,\n  CONSTRAINT emp_pk PRIMARY KEY (empno),\n  CONSTRAINT emp_uq UNIQUE (ename),\n  CONSTRAINT emp_fk FOREIGN KEY (deptno)\n    REFERENCES DEPT(deptno)\n);\n\n→ Niveau TABLE requis pour : clé composée, FK nommée"
  },
  {
    id: 18,
    category: "Fonctions",
    difficulty: "facile",
    front: "Fonctions de date vues en cours.",
    back: "-- Extraire l'année :\nSELECT * FROM Etudiant\nWHERE YEAR(date_n) = 1985;\n\n-- Extraire le mois / jour :\nMONTH(date_n), DAY(date_n)\n\n-- Date du jour :\nCURTIME ou CURRENT_DATE (selon SGBD)\n\n-- Comparer des dates :\nWHERE date_n > '1985-01-01'\nWHERE date_n BETWEEN '1985-01-01' AND '1990-12-31'\n\nFormat standard : AAAA-MM-JJ"
  },
  {
    id: 19,
    category: "Fonctions",
    difficulty: "facile",
    front: "CONCAT et les opérateurs de concaténation.",
    back: "-- Avec CONCAT() :\nSELECT CONCAT(Nom, ' ', Prenom) AS \"Nom complet\"\nFROM Etudiant;\n\n-- Avec || (SQL standard) :\nSELECT Nom || ' ' || Prenom AS \"Nom complet\"\nFROM Etudiant;\n\nRésultat :\nMartin Véra\nMartin Annie\nDupont Sylvie\n..."
  },
  {
    id: 20,
    category: "DDL",
    difficulty: "difficile",
    front: "Intégrité référentielle : pourquoi DELETE échoue et comment résoudre (TD3).",
    back: "Problème (TD3 base Cinéma) :\nDELETE FROM Film WHERE idFilm = 101;\n→ ÉCHOUE si ON DELETE RESTRICT (défaut)\n   car des Seances référencent ce film.\n\nSolution 1 — supprimer les dépendances d'abord :\nDELETE FROM Seance WHERE idFilm = 101;\nDELETE FROM Film WHERE idFilm = 101;\n\nSolution 2 — changer le modèle :\nFOREIGN KEY (idFilm) REFERENCES Film\n  ON DELETE CASCADE\n→ Supprime auto les séances du film.\n\n⚠️ CASCADE = pratique mais dangereux !"
  }
];

// ============================================================
// WRITTEN_QUESTIONS — Quiz à l'écrit (réponse libre SQL)
// ============================================================
const WRITTEN_QUESTIONS = [
  // 🟢 Requêtes simples (SELECT, WHERE, LIKE, ORDER BY)
  { id: 1, category: "SELECT", difficulty: "facile", question: "Afficher toutes les colonnes de la table ARTICLE.", answer: "SELECT * FROM article;" },
  { id: 2, category: "SELECT", difficulty: "facile", question: "Afficher le libellé et le prix de tous les articles.", answer: "SELECT libelle, prix FROM article;" },
  { id: 3, category: "WHERE", difficulty: "facile", question: "Afficher les articles qui sont bio (bio = 1).", answer: "SELECT * FROM article WHERE bio = 1;" },
  { id: 4, category: "WHERE", difficulty: "facile", question: "Afficher le libellé des articles non bio.", answer: "SELECT libelle FROM article WHERE bio = 0;" },
  { id: 5, category: "WHERE", difficulty: "facile", question: "Afficher les articles dont le prix est strictement supérieur à 5€.", answer: "SELECT * FROM article WHERE prix > 5;" },
  { id: 6, category: "BETWEEN", difficulty: "facile", question: "Afficher les articles dont le prix est compris entre 2€ et 10€.", answer: "SELECT * FROM article WHERE prix BETWEEN 2 AND 10;" },
  { id: 7, category: "WHERE", difficulty: "facile", question: "Afficher les articles appartenant au rayon numéro 3.", answer: "SELECT * FROM article WHERE idrayon = 3;" },
  { id: 8, category: "WHERE", difficulty: "facile", question: "Afficher les articles de la marque numéro 12.", answer: "SELECT * FROM article WHERE idmarque = 12;" },
  { id: 9, category: "WHERE", difficulty: "facile", question: "Afficher les articles conditionnés en 'boite en carton'.", answer: "SELECT * FROM article WHERE packaging = 'boite en carton';" },
  { id: 10, category: "IN", difficulty: "facile", question: "Afficher les articles dont l'unité de mesure est 'L' ou 'kg'.", answer: "SELECT * FROM article WHERE unitemesure IN ('L', 'kg');" },
  { id: 11, category: "ORDER BY", difficulty: "facile", question: "Afficher le libellé et le prix des articles bio, triés du plus cher au moins cher.", answer: "SELECT libelle, prix FROM article WHERE bio = 1 ORDER BY prix DESC;" },
  { id: 12, category: "LIKE", difficulty: "facile", question: "Afficher les articles dont le libellé commence par 'Jus'.", answer: "SELECT * FROM article WHERE libelle LIKE 'Jus%';" },
  { id: 13, category: "LIKE", difficulty: "facile", question: "Afficher les articles dont le libellé contient le mot 'pomme'.", answer: "SELECT * FROM article WHERE libelle LIKE '%pomme%';" },
  { id: 14, category: "DISTINCT", difficulty: "facile", question: "Afficher les différents types de packaging (sans doublons).", answer: "SELECT DISTINCT packaging FROM article;" },
  { id: 15, category: "DISTINCT", difficulty: "facile", question: "Afficher les différentes unités de mesure utilisées (sans doublons).", answer: "SELECT DISTINCT unitemesure FROM article;" },

  // 🟢 Requêtes simples (Filtres avancés)
  { id: 16, category: "SELECT", difficulty: "facile", question: "Afficher tous les fournisseurs.", answer: "SELECT * FROM fournisseur;" },
  { id: 17, category: "SELECT", difficulty: "facile", question: "Afficher la raison sociale et l'email de tous les fournisseurs.", answer: "SELECT raisonsociale, email FROM fournisseur;" },
  { id: 18, category: "WHERE", difficulty: "facile", question: "Afficher les fournisseurs situés à 'Paris'.", answer: "SELECT * FROM fournisseur WHERE adresseville = 'Paris';" },
  { id: 19, category: "IN", difficulty: "facile", question: "Afficher les fournisseurs situés à 'Paris', 'Lyon' ou 'Marseille'.", answer: "SELECT * FROM fournisseur WHERE adresseville IN ('Paris', 'Lyon', 'Marseille');" },
  { id: 20, category: "WHERE", difficulty: "facile", question: "Afficher les fournisseurs situés à moins de 50 km de distance.", answer: "SELECT * FROM fournisseur WHERE distancekm < 50;" },
  { id: 21, category: "ORDER BY", difficulty: "facile", question: "Afficher les fournisseurs situés à plus de 100 km, triés par distance croissante.", answer: "SELECT * FROM fournisseur WHERE distancekm > 100 ORDER BY distancekm ASC;" },
  { id: 22, category: "LIKE", difficulty: "facile", question: "Afficher les fournisseurs ayant une adresse email se terminant par '@gmail.com'.", answer: "SELECT * FROM fournisseur WHERE email LIKE '%@gmail.com';" },
  { id: 23, category: "LIKE", difficulty: "facile", question: "Afficher les fournisseurs dont le numéro de téléphone commence par '06'.", answer: "SELECT * FROM fournisseur WHERE numerotelephone LIKE '06%';" },
  { id: 24, category: "LIKE", difficulty: "facile", question: "Afficher la raison sociale et la ville des fournisseurs dont le code postal commence par '75'.", answer: "SELECT raisonsociale, adresseville FROM fournisseur WHERE adressecp LIKE '75%';" },
  { id: 25, category: "NULL", difficulty: "facile", question: "Afficher les fournisseurs dont la rue n'est pas renseignée (NULL).", answer: "SELECT * FROM fournisseur WHERE adresserue IS NULL;" },
  { id: 26, category: "SELECT", difficulty: "facile", question: "Afficher tous les lots enregistrés.", answer: "SELECT * FROM lot;" },
  { id: 27, category: "WHERE", difficulty: "facile", question: "Afficher les lots dont la date de péremption est dépassée (avant le '2026-01-01').", answer: "SELECT * FROM lot WHERE dateperemption < '2026-01-01';" },
  { id: 28, category: "BETWEEN", difficulty: "facile", question: "Afficher les lots livrés au mois d'octobre 2025.", answer: "SELECT * FROM lot WHERE datelivraison BETWEEN '2025-10-01' AND '2025-10-31';" },
  { id: 29, category: "SELECT", difficulty: "facile", question: "Afficher tous les achats.", answer: "SELECT * FROM achat;" },
  { id: 30, category: "WHERE", difficulty: "facile", question: "Afficher les achats d'un montant total supérieur à 100€.", answer: "SELECT * FROM achat WHERE montanttotal > 100;" },
  { id: 31, category: "ORDER BY", difficulty: "facile", question: "Afficher la date et le montant des achats triés du plus récent au plus ancien.", answer: "SELECT dateachat, montanttotal FROM achat ORDER BY dateachat DESC;" },

  // 🟠 Modification de données (INSERT, UPDATE, DELETE)
  { id: 32, category: "INSERT", difficulty: "moyen", question: "Insérer une nouvelle marque nommée 'SuperBio' avec l'ID 50.", answer: "INSERT INTO marque (idmarque, nom) VALUES (50, 'SuperBio');" },
  { id: 33, category: "INSERT", difficulty: "moyen", question: "Insérer un nouveau rayon nommé 'Produits Frais' avec l'ID 10.", answer: "INSERT INTO rayon (idrayon, libelle) VALUES (10, 'Produits Frais');" },
  { id: 34, category: "UPDATE", difficulty: "moyen", question: "Augmenter le prix de tous les articles de 5%.", answer: "UPDATE article SET prix = prix * 1.05;" },
  { id: 35, category: "UPDATE", difficulty: "moyen", question: "Mettre à jour la distance à 30 km pour le fournisseur d'ID 5.", answer: "UPDATE fournisseur SET distancekm = 30 WHERE idfournisseur = 5;" },
  { id: 36, category: "UPDATE", difficulty: "moyen", question: "Passer en 'bio' tous les articles du rayon 10.", answer: "UPDATE article SET bio = 1 WHERE idrayon = 10;" },
  { id: 37, category: "DELETE", difficulty: "moyen", question: "Supprimer l'article ayant l'ID 99.", answer: "DELETE FROM article WHERE idarticle = 99;" },
  { id: 38, category: "DELETE", difficulty: "moyen", question: "Supprimer tous les lots dont la date de péremption est antérieure au '2024-01-01'.", answer: "DELETE FROM lot WHERE dateperemption < '2024-01-01';" },
  { id: 39, category: "UPDATE", difficulty: "moyen", question: "Diminuer de 1€ le prix des articles qui coûtent plus de 20€.", answer: "UPDATE article SET prix = prix - 1 WHERE prix > 20;" },
  { id: 40, category: "INSERT", difficulty: "moyen", question: "Insérer un achat avec l'ID 1001, date du jour '2026-04-19', et montant 45.50.", answer: "INSERT INTO achat (idachat, dateachat, montanttotal) VALUES (1001, '2026-04-19', 45.50);" },
  { id: 41, category: "DELETE", difficulty: "moyen", question: "Supprimer les marques dont le nom commence par 'Test'.", answer: "DELETE FROM marque WHERE nom LIKE 'Test%';" },

  // 🟡 Fonctions d'agrégation (COUNT, SUM, AVG, MIN, MAX)
  { id: 42, category: "Agrégation", difficulty: "moyen", question: "Compter le nombre total d'articles dans le magasin.", answer: "SELECT COUNT(*) FROM article;" },
  { id: 43, category: "Agrégation", difficulty: "moyen", question: "Afficher le prix moyen de tous les articles.", answer: "SELECT AVG(prix) FROM article;" },
  { id: 44, category: "Agrégation", difficulty: "moyen", question: "Afficher le prix de l'article le plus cher.", answer: "SELECT MAX(prix) FROM article;" },
  { id: 45, category: "Agrégation", difficulty: "moyen", question: "Afficher le prix de l'article le moins cher.", answer: "SELECT MIN(prix) FROM article;" },
  { id: 46, category: "Agrégation", difficulty: "moyen", question: "Compter le nombre d'articles bio.", answer: "SELECT COUNT(*) FROM article WHERE bio = 1;" },
  { id: 47, category: "Agrégation", difficulty: "moyen", question: "Calculer la somme totale des montants de tous les achats.", answer: "SELECT SUM(montanttotal) FROM achat;" },
  { id: 48, category: "Agrégation", difficulty: "moyen", question: "Compter le nombre de fournisseurs enregistrés.", answer: "SELECT COUNT(*) FROM fournisseur;" },
  { id: 49, category: "Agrégation", difficulty: "moyen", question: "Calculer la distance moyenne des fournisseurs.", answer: "SELECT AVG(distancekm) FROM fournisseur;" },
  { id: 50, category: "Agrégation", difficulty: "moyen", question: "Compter le nombre de lots fournis par le fournisseur ID 12.", answer: "SELECT COUNT(*) FROM lot WHERE idfournisseur = 12;" },
  { id: 51, category: "Agrégation", difficulty: "moyen", question: "Afficher le montant moyen d'un achat.", answer: "SELECT AVG(montanttotal) FROM achat;" },

  // 🟡 Regroupements (GROUP BY, HAVING)
  { id: 52, category: "GROUP BY", difficulty: "moyen", question: "Afficher le nombre d'articles pour chaque marque (idmarque).", answer: "SELECT idmarque, COUNT(*) FROM article GROUP BY idmarque;" },
  { id: 53, category: "GROUP BY", difficulty: "moyen", question: "Afficher le prix moyen des articles par rayon (idrayon).", answer: "SELECT idrayon, AVG(prix) FROM article GROUP BY idrayon;" },
  { id: 54, category: "GROUP BY", difficulty: "moyen", question: "Afficher, pour chaque fournisseur, le nombre de lots livrés.", answer: "SELECT idfournisseur, COUNT(*) FROM lot GROUP BY idfournisseur;" },
  { id: 55, category: "GROUP BY", difficulty: "moyen", question: "Afficher le nombre d'articles bio et non bio.", answer: "SELECT bio, COUNT(*) FROM article GROUP BY bio;" },
  { id: 56, category: "GROUP BY", difficulty: "moyen", question: "Afficher, par type de packaging, le nombre d'articles.", answer: "SELECT packaging, COUNT(*) FROM article GROUP BY packaging;" },
  { id: 57, category: "HAVING", difficulty: "moyen", question: "Afficher les idmarque ayant plus de 10 articles.", answer: "SELECT idmarque, COUNT(*) FROM article GROUP BY idmarque HAVING COUNT(*) > 10;" },
  { id: 58, category: "HAVING", difficulty: "moyen", question: "Afficher les idrayon dont le prix moyen des articles dépasse 15€.", answer: "SELECT idrayon, AVG(prix) FROM article GROUP BY idrayon HAVING AVG(prix) > 15;" },
  { id: 59, category: "GROUP BY", difficulty: "moyen", question: "Afficher, par ville de fournisseur, le nombre de fournisseurs.", answer: "SELECT adresseville, COUNT(*) FROM fournisseur GROUP BY adresseville;" },
  { id: 60, category: "HAVING", difficulty: "moyen", question: "Afficher les villes abritant au moins 3 fournisseurs.", answer: "SELECT adresseville, COUNT(*) FROM fournisseur GROUP BY adresseville HAVING COUNT(*) >= 3;" },
  { id: 61, category: "GROUP BY", difficulty: "moyen", question: "Afficher pour chaque achat (idachat), le nombre d'articles différents dans la liste de courses.", answer: "SELECT idachat, COUNT(idarticle) FROM listecourses GROUP BY idachat;" },

  // 🟠 Jointures : 2 tables
  { id: 62, category: "JOIN", difficulty: "moyen", question: "Afficher le libellé de l'article et le nom de sa marque.", answer: "SELECT article.libelle, marque.nom FROM article JOIN marque ON article.idmarque = marque.idmarque;" },
  { id: 63, category: "JOIN", difficulty: "moyen", question: "Afficher le libellé de l'article et le libellé de son rayon.", answer: "SELECT a.libelle AS article_libelle, r.libelle AS rayon_libelle FROM article a JOIN rayon r ON a.idrayon = r.idrayon;" },
  { id: 64, category: "JOIN", difficulty: "moyen", question: "Afficher les noms des marques proposant des articles bio.", answer: "SELECT DISTINCT m.nom FROM marque m JOIN article a ON m.idmarque = a.idmarque WHERE a.bio = 1;" },
  { id: 65, category: "JOIN", difficulty: "moyen", question: "Afficher l'identifiant du lot et le libellé de l'article correspondant.", answer: "SELECT l.idlot, a.libelle FROM lot l JOIN article a ON l.idarticle = a.idarticle;" },
  { id: 66, category: "JOIN", difficulty: "moyen", question: "Afficher l'identifiant du lot et la raison sociale du fournisseur.", answer: "SELECT l.idlot, f.raisonsociale FROM lot l JOIN fournisseur f ON l.idfournisseur = f.idfournisseur;" },
  { id: 67, category: "JOIN", difficulty: "moyen", question: "Afficher le libellé des rayons contenant des articles dont le prix est inférieur à 5€.", answer: "SELECT DISTINCT r.libelle FROM rayon r JOIN article a ON r.idrayon = a.idrayon WHERE a.prix < 5;" },
  { id: 68, category: "JOIN", difficulty: "moyen", question: "Afficher la liste des articles (libellé) et la quantité achetée pour l'achat numéro 100.", answer: "SELECT a.libelle, lc.quantite FROM article a JOIN listecourses lc ON a.idarticle = lc.idarticle WHERE lc.idachat = 100;" },
  { id: 69, category: "JOIN", difficulty: "moyen", question: "Afficher le nombre d'articles par nom de marque.", answer: "SELECT m.nom, COUNT(a.idarticle) FROM marque m JOIN article a ON m.idmarque = a.idmarque GROUP BY m.nom;" },
  { id: 70, category: "JOIN", difficulty: "moyen", question: "Afficher le prix moyen des articles par nom de rayon.", answer: "SELECT r.libelle, AVG(a.prix) FROM rayon r JOIN article a ON r.idrayon = a.idrayon GROUP BY r.libelle;" },
  { id: 71, category: "JOIN", difficulty: "moyen", question: "Afficher toutes les marques, même celles n'ayant aucun article associé.", answer: "SELECT m.nom, a.libelle FROM marque m LEFT JOIN article a ON m.idmarque = a.idmarque;" },

  // 🔴 Jointures complexes : 3 tables et plus
  { id: 72, category: "JOIN", difficulty: "difficile", question: "Afficher le libellé de l'article, le nom de la marque et le libellé du rayon.", answer: "SELECT a.libelle, m.nom, r.libelle FROM article a JOIN marque m ON a.idmarque = m.idmarque JOIN rayon r ON a.idrayon = r.idrayon;" },
  { id: 73, category: "JOIN", difficulty: "difficile", question: "Afficher pour chaque lot : idlot, le libellé de l'article et la raison sociale du fournisseur.", answer: "SELECT l.idlot, a.libelle, f.raisonsociale FROM lot l JOIN article a ON l.idarticle = a.idarticle JOIN fournisseur f ON l.idfournisseur = f.idfournisseur;" },
  { id: 74, category: "JOIN", difficulty: "difficile", question: "Afficher les raisons sociales des fournisseurs qui fournissent des articles bio.", answer: "SELECT DISTINCT f.raisonsociale FROM fournisseur f JOIN lot l ON f.idfournisseur = l.idfournisseur JOIN article a ON l.idarticle = a.idarticle WHERE a.bio = 1;" },
  { id: 75, category: "JOIN", difficulty: "difficile", question: "Afficher le nom des marques pour lesquelles le fournisseur 'BioDistrib' a livré des lots.", answer: "SELECT DISTINCT m.nom FROM marque m JOIN article a ON m.idmarque = a.idmarque JOIN lot l ON a.idarticle = l.idarticle JOIN fournisseur f ON l.idfournisseur = f.idfournisseur WHERE f.raisonsociale = 'BioDistrib';" },
  { id: 76, category: "JOIN", difficulty: "difficile", question: "Afficher pour l'achat 200 : la date, le libellé de l'article, la quantité et le nom de la marque.", answer: "SELECT ac.dateachat, a.libelle, lc.quantite, m.nom FROM achat ac JOIN listecourses lc ON ac.idachat = lc.idachat JOIN article a ON lc.idarticle = a.idarticle JOIN marque m ON a.idmarque = m.idmarque WHERE ac.idachat = 200;" },
  { id: 77, category: "JOIN", difficulty: "difficile", question: "Afficher le nombre total de lots fournis par rayon (libellé du rayon).", answer: "SELECT r.libelle, COUNT(l.idlot) FROM rayon r JOIN article a ON r.idrayon = a.idrayon JOIN lot l ON a.idarticle = l.idarticle GROUP BY r.libelle;" },
  { id: 78, category: "JOIN", difficulty: "difficile", question: "Afficher les articles (libellé) présents dans la liste de courses d'achats effectués en octobre 2025.", answer: "SELECT DISTINCT a.libelle FROM article a JOIN listecourses lc ON a.idarticle = lc.idarticle JOIN achat ac ON lc.idachat = ac.idachat WHERE ac.dateachat BETWEEN '2025-10-01' AND '2025-10-31';" },
  { id: 79, category: "JOIN", difficulty: "difficile", question: "Afficher le libellé du rayon et la raison sociale des fournisseurs qui l'approvisionnent.", answer: "SELECT DISTINCT r.libelle, f.raisonsociale FROM rayon r JOIN article a ON r.idrayon = a.idrayon JOIN lot l ON a.idarticle = l.idarticle JOIN fournisseur f ON l.idfournisseur = f.idfournisseur;" },
  { id: 80, category: "JOIN", difficulty: "difficile", question: "Afficher les marques dont les articles ont été achetés au moins une fois.", answer: "SELECT DISTINCT m.nom FROM marque m JOIN article a ON m.idmarque = a.idmarque JOIN listecourses lc ON a.idarticle = lc.idarticle;" },
  { id: 81, category: "JOIN", difficulty: "difficile", question: "Calculer le chiffre d'affaires généré par chaque nom de marque (somme des prix × quantité vendue).", answer: "SELECT m.nom, SUM(a.prix * lc.quantite) AS CA FROM marque m JOIN article a ON m.idmarque = a.idmarque JOIN listecourses lc ON a.idarticle = lc.idarticle GROUP BY m.nom;" },

  // 🔴 Sous-requêtes
  { id: 82, category: "Subqueries", difficulty: "difficile", question: "Afficher les articles dont le prix est supérieur au prix moyen de tous les articles.", answer: "SELECT * FROM article WHERE prix > (SELECT AVG(prix) FROM article);" },
  { id: 83, category: "Subqueries", difficulty: "difficile", question: "Afficher les fournisseurs n'ayant jamais fourni de lot (avec NOT IN).", answer: "SELECT * FROM fournisseur WHERE idfournisseur NOT IN (SELECT idfournisseur FROM lot);" },
  { id: 84, category: "Subqueries", difficulty: "difficile", question: "Afficher les articles appartenant au même rayon que l'article nommé 'Jus d'orange'.", answer: "SELECT * FROM article WHERE idrayon = (SELECT idrayon FROM article WHERE libelle = 'Jus d''orange');" },
  { id: 85, category: "Subqueries", difficulty: "difficile", question: "Afficher les marques n'ayant aucun article associé (avec NOT EXISTS).", answer: "SELECT * FROM marque m WHERE NOT EXISTS (SELECT 1 FROM article a WHERE a.idmarque = m.idmarque);" },
  { id: 86, category: "Subqueries", difficulty: "difficile", question: "Afficher les achats dont le montant est supérieur à la moyenne des montants d'achats.", answer: "SELECT * FROM achat WHERE montanttotal > (SELECT AVG(montanttotal) FROM achat);" },
  { id: 87, category: "Subqueries", difficulty: "difficile", question: "Afficher les articles ayant le prix le plus élevé du magasin.", answer: "SELECT * FROM article WHERE prix = (SELECT MAX(prix) FROM article);" },
  { id: 88, category: "Subqueries", difficulty: "difficile", question: "Afficher le nom de la marque qui propose l'article le moins cher.", answer: "SELECT nom FROM marque WHERE idmarque = (SELECT idmarque FROM article WHERE prix = (SELECT MIN(prix) FROM article));" },
  { id: 89, category: "Subqueries", difficulty: "difficile", question: "Afficher les fournisseurs fournissant plus de lots que la moyenne des lots par fournisseur.", answer: "SELECT idfournisseur, COUNT(*) FROM lot GROUP BY idfournisseur HAVING COUNT(*) > (SELECT COUNT(*)/COUNT(DISTINCT idfournisseur) FROM lot);" },
  { id: 90, category: "Subqueries", difficulty: "difficile", question: "Afficher les articles jamais achetés (jamais dans listecourses).", answer: "SELECT * FROM article WHERE idarticle NOT IN (SELECT idarticle FROM listecourses);" },
  { id: 91, category: "Subqueries", difficulty: "difficile", question: "Afficher les rayons qui ne contiennent aucun article bio.", answer: "SELECT * FROM rayon WHERE idrayon NOT IN (SELECT idrayon FROM article WHERE bio = 1);" },

  // 🟣 Requêtes complexes, Calculs et Vues
  { id: 92, category: "Vues", difficulty: "difficile", question: "Créer une vue VUE_ARTICLES_COMPLETS contenant le libellé de l'article, son prix, le nom de sa marque et le nom de son rayon.", answer: "CREATE VIEW VUE_ARTICLES_COMPLETS AS\nSELECT a.libelle, a.prix, m.nom AS marque, r.libelle AS rayon\nFROM article a\nJOIN marque m ON a.idmarque = m.idmarque\nJOIN rayon r ON a.idrayon = r.idrayon;" },
  { id: 93, category: "Vues", difficulty: "difficile", question: "Afficher à partir de la vue VUE_ARTICLES_COMPLETS uniquement les articles du rayon 'Boissons'.", answer: "SELECT * FROM VUE_ARTICLES_COMPLETS WHERE rayon = 'Boissons';" },
  { id: 94, category: "JOIN", difficulty: "difficile", question: "Afficher pour chaque article (idarticle, libelle) la quantité totale achetée.", answer: "SELECT a.idarticle, a.libelle, SUM(lc.quantite) AS total_vendu FROM article a JOIN listecourses lc ON a.idarticle = lc.idarticle GROUP BY a.idarticle, a.libelle;" },
  { id: 95, category: "GROUP BY", difficulty: "difficile", question: "Afficher l'achat (idachat) comportant le plus grand nombre de produits distincts.", answer: "SELECT idachat FROM listecourses GROUP BY idachat ORDER BY COUNT(idarticle) DESC LIMIT 1;" },
  { id: 96, category: "Vues", difficulty: "difficile", question: "Créer une vue VUE_STATS_FOURNISSEUR avec la raison sociale et le nombre de lots fournis.", answer: "CREATE VIEW VUE_STATS_FOURNISSEUR AS\nSELECT f.raisonsociale, COUNT(l.idlot) as nb_lots\nFROM fournisseur f\nLEFT JOIN lot l ON f.idfournisseur = l.idfournisseur\nGROUP BY f.raisonsociale;" },
  { id: 97, category: "Agrégation", difficulty: "difficile", question: "Calculer le temps moyen de livraison d'un lot (différence entre dateLivraison et dateFabrication).", answer: "SELECT AVG(datelivraison - datefabrication) FROM lot;" },
  { id: 98, category: "JOIN", difficulty: "difficile", question: "Afficher le nom de la marque ayant généré le plus de ventes (en quantité totale).", answer: "SELECT m.nom FROM marque m JOIN article a ON m.idmarque = a.idmarque JOIN listecourses lc ON a.idarticle = lc.idarticle GROUP BY m.nom ORDER BY SUM(lc.quantite) DESC LIMIT 1;" },
  { id: 99, category: "Subqueries", difficulty: "difficile", question: "Afficher les fournisseurs dont tous les lots ont été livrés (dateLivraison IS NOT NULL pour tous leurs lots).", answer: "SELECT f.idfournisseur, f.raisonsociale FROM fournisseur f WHERE NOT EXISTS (SELECT 1 FROM lot l WHERE l.idfournisseur = f.idfournisseur AND l.datelivraison IS NULL);" },
  { id: 100, category: "GROUP BY", difficulty: "difficile", question: "Afficher, pour chaque jour d'achat, le chiffre d'affaires total généré.", answer: "SELECT dateachat, SUM(montanttotal) FROM achat GROUP BY dateachat;" },
];

// ============================================================
// EXAMS — Évaluations NS1 & NS2
// ============================================================
const EXAMS = [
  {
    id: 'ns2',
    title: 'Interrogation n°2 — SQL (NS2)',
    date: '24/03/2026',
    duration: '30 min',
    teacher: 'Laurent Debize',
    description: 'Écrire la requête SQL correspondant à chacune des questions suivantes (annexe fournie).',
    pdfPath: 'data/2025-2026-B1-BDD-NS2.pdf',
    needsAnnexe: true,
    questions: [
      {
        id: 1,
        points: '',
        question: "Créer la table article (voir annexe pour la structure).",
        answer: "CREATE TABLE article (\n  idarticle INTEGER NOT NULL,\n  libelle VARCHAR(50) NOT NULL,\n  prix INTEGER NOT NULL,\n  packaging VARCHAR(50) NOT NULL,\n  unitemesure VARCHAR(10) NOT NULL,\n  bio INTEGER NOT NULL,\n  idmarque INTEGER NOT NULL,\n  idrayon INTEGER NOT NULL,\n  CONSTRAINT id_article_pk PRIMARY KEY (idarticle),\n  CONSTRAINT id_marque_fk FOREIGN KEY (idmarque) REFERENCES marque(idmarque),\n  CONSTRAINT id_rayon_fk FOREIGN KEY (idrayon) REFERENCES rayon(idrayon)\n);"
      },
      {
        id: 2,
        points: '',
        question: "Ajouter l'article suivant :\nJus d'orange, 2.89€, 2L en boîte en carton, non bio, au rayon 5 et de la marque 12.",
        answer: "INSERT INTO article (idarticle, libelle, prix, packaging, unitemesure, quantite, bio, idmarque, idrayon)\nVALUES (1, 'Jus d''orange', 2.89, 'boite en carton', 'L', 2, 0, 12, 5);"
      },
      {
        id: 3,
        points: '',
        question: "Augmenter de 10% le prix des articles bio (bio = 1).",
        answer: "UPDATE article\nSET prix = prix * 1.1\nWHERE bio = 1;"
      },
      {
        id: 4,
        points: '',
        question: "La liste des dates de fabrication, dates de livraison et dates de péremption des lots en renommant :\n• dateFabrication → « date de fabrication »\n• dateLivraison → « date de livraison »\n• datePeremption → « date de péremption »",
        answer: "SELECT\n  dateFabrication AS \"date de fabrication\",\n  dateLivraison AS \"date de livraison\",\n  datePeremption AS \"date de peremption\"\nFROM lot;"
      },
      {
        id: 5,
        points: '',
        question: "Le nom des articles dont le prix est inférieur à 10€.",
        answer: "SELECT libelle\nFROM article\nWHERE prix < 10;"
      },
      {
        id: 6,
        points: '',
        question: "La raison sociale des fournisseurs qui sont dans les villes suivantes : Lyon, Paris, Bordeaux.",
        answer: "SELECT raisonSociale\nFROM fournisseur\nWHERE adresseVille IN ('Lyon', 'Paris', 'Bordeaux');"
      },
      {
        id: 7,
        points: '',
        question: "Les marques dont le nom commence par « M ».",
        answer: "SELECT nom\nFROM marque\nWHERE nom LIKE 'M%';"
      },
      {
        id: 8,
        points: '',
        question: "Le nombre de rayons du magasin, renommé « Nombre de rayons ».",
        answer: "SELECT COUNT(*) AS \"Nombre de rayons\"\nFROM rayon;"
      },
      {
        id: 9,
        points: '',
        question: "Afficher, pour chaque marque, le prix moyen des articles (depuis ARTICLE).",
        answer: "SELECT idmarque, AVG(prix)\nFROM article\nGROUP BY idmarque;"
      }
    ]
  },
  {
    id: 'ns1',
    title: 'Évaluation n°1 — MCD/MLD/Normalisation (NS1)',
    date: '05/03/2026',
    duration: '1h',
    teacher: 'Laurent Debize',
    description: 'Exercices de modélisation (MCD, MLD) et normalisation. Pas de SQL mais des concepts fondamentaux.',
    pdfPath: 'data/25-26-B1-BDD-NS1.pdf',
    needsAnnexe: false,
    questions: [
      {
        id: 1,
        points: '4 pts',
        question: "Exercice 1 — Un concessionnaire de voitures électriques fait appel à vous pour réaliser son application de gestion de commandes.\n\nLes modèles sont repérés par un code, un nom et une puissance. Ils sont disponibles en différents coloris (code + nom). Un client commande un modèle dans un coloris. On doit connaître la date et l'état de la commande (en commande, en cours de livraison, reçu, livré). Le vendeur (nom, prénom, date embauche) est enregistré. Chaque commande = 1 voiture, 1 client.\n\n→ Proposer un modèle entité/association (MCD).",
        answer: "Entités :\n• Client (idClient, nom, prénom, numPièceIdentité)\n• Modèle (codeModèle, nomModèle, puissance)\n• Coloris (idColoris, désignation)\n• Commande (idCommande, date, #idClient, #idModèle, #idColoris, #idVendeur, #idÉtat)\n• Vendeur (idVendeur, nom, prénom, dateEmbauche)\n• État (idÉtat, nom)\n\nAssociations :\n• êtreDisponible (#codeModèle, #idColoris)\n• Un client (0,n) passe une commande (1,1)\n• Un vendeur (0,n) prend une commande (1,1)\n• Un modèle (0,n) est commandé (1,1)\n• Un coloris (0,n) est choisi (1,1)"
      },
      {
        id: 2,
        points: '3 pts',
        question: "Exercice 1 (suite) — Transformer le MCD précédent en modèle relationnel (MLD).",
        answer: "Client(idClient, nom, prénom, numPièceIdentité)\nModele(codeModele, nomModele, puissance)\nColoris(idColoris, designation)\nCommande(idCommande, date, #idClient, #idModele, #idColoris, #idVendeur, #idEtat)\nVendeur(idVendeur, nom, prénom, dateEmbauche)\nEtat(idEtat, nom)\netreDisponible(#codeModele, #idColoris)"
      },
      {
        id: 3,
        points: '1 pt',
        question: "Exercice 2 — Soit la relation :\nR(ISBN, Titre, Auteur, Editeur, anneePublication, IDEmprunt, IDMembre, DateEmprunt, DateRetour, Nom, Prénom, coordonnées, IDBibliothèque, AdresseBibliothèque)\n\nDF :\n• ISBN → Titre, Auteur, Editeur, AnneePublication\n• IDEmprunt, IDBibliothèque → IDMembre, DateEmprunt, DateRetour, ISBN, Nom\n• IDBibliothèque → AdresseBibliothèque\n• IDMembre → Nom, Prénom, Coordonnées\n\nQuelle est la clé de cette relation ?",
        answer: "La clé est : (IDEmprunt, IDBibliothèque)\n\nCar à partir de cette paire, on peut déterminer tous les autres attributs via les dépendances fonctionnelles."
      },
      {
        id: 4,
        points: '1 pt',
        question: "Exercice 2 (suite) — Cette relation est-elle en 1NF ? Justifier. Si non, proposer les modifications.",
        answer: "Non, la relation n'est PAS en 1NF car :\n• « adresse » n'est pas atomique → diviser en rue, codePostal, ville\n• « coordonnées » n'est pas atomique → diviser en téléphone, email\n• « auteur » pourrait aussi être divisé en nomAuteur, prénomAuteur\n\nLa 1NF exige que tous les attributs soient atomiques (indivisibles)."
      },
      {
        id: 5,
        points: '1 pt',
        question: "Exercice 2 (suite) — En quelle forme normale est la relation après la modification précédente ? Justifier.",
        answer: "Après modification, la relation est en 1NF mais PAS en 2NF.\n\nJustification : Il existe des dépendances partielles :\n• IDBibliothèque → AdresseBibliothèque (dépend d'une PARTIE de la clé, pas de la clé entière)\n\nPour être en 2NF, tous les attributs non-clé doivent dépendre de la TOTALITÉ de la clé."
      },
      {
        id: 6,
        points: '2.5 pts',
        question: "Exercice 2 (suite) — Proposer une décomposition en 3NF.",
        answer: "Décomposition en 3NF :\n\nMembre(IDMembre, nom, prénom, tél, email)\nLivre(ISBN, Titre, auteur, Editeur, anneePublication)\nBibliothèque(IDBibliothèque, rue, codePostal, ville)\nEmprunt(IDEmprunt, #IDBibliothèque, #ISBN, DateEmprunt, DateRetour, #IDMembre)\n\nChaque relation est en 3NF : pas de dépendance partielle ni transitive."
      }
    ]
  }
];
