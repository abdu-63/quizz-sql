## 🟢 Requêtes simples (SELECT, WHERE, LIKE, ORDER BY)

> [!question]- **Question 1 :** Afficher toutes les colonnes de la table ARTICLE.
> ```sql
> SELECT * FROM article;
> ```
```sql

```

> [!question]- **Question 2 :** Afficher le libellé et le prix de tous les articles.
> ```sql
> SELECT libelle, prix FROM article;
> ```
```sql

```

> [!question]- **Question 3 :** Afficher les articles qui sont bio (bio = 1).
> ```sql
> SELECT * FROM article WHERE bio = 1;
> ```
```sql

```

> [!question]- **Question 4 :** Afficher le libellé des articles non bio.
> ```sql
> SELECT libelle FROM article WHERE bio = 0;
> ```
```sql

```

> [!question]- **Question 5 :** Afficher les articles dont le prix est strictement supérieur à 5€.
> ```sql
> SELECT * FROM article WHERE prix > 5;
> ```
```sql

```

> [!question]- **Question 6 :** Afficher les articles dont le prix est compris entre 2€ et 10€.
> ```sql
> SELECT * FROM article WHERE prix BETWEEN 2 AND 10;
> ```
```sql

```

> [!question]- **Question 7 :** Afficher les articles appartenant au rayon numéro 3.
> ```sql
> SELECT * FROM article WHERE idrayon = 3;
> ```
```sql

```

> [!question]- **Question 8 :** Afficher les articles de la marque numéro 12.
> ```sql
> SELECT * FROM article WHERE idmarque = 12;
> ```
```sql

```

> [!question]- **Question 9 :** Afficher les articles conditionnés en 'boite en carton'.
> ```sql
> SELECT * FROM article WHERE packaging = 'boite en carton';
> ```
```sql

```

> [!question]- **Question 10 :** Afficher les articles dont l'unité de mesure est 'L' ou 'kg'.
> ```sql
> SELECT * FROM article WHERE unitemesure IN ('L', 'kg');
> ```
```sql

```

> [!question]- **Question 11 :** Afficher le libellé et le prix des articles bio, triés du plus cher au moins cher.
> ```sql
> SELECT libelle, prix FROM article WHERE bio = 1 ORDER BY prix DESC;
> ```
```sql

```

> [!question]- **Question 12 :** Afficher les articles dont le libellé commence par 'Jus'.
> ```sql
> SELECT * FROM article WHERE libelle LIKE 'Jus%';
> ```
```sql

```

> [!question]- **Question 13 :** Afficher les articles dont le libellé contient le mot 'pomme'.
> ```sql
> SELECT * FROM article WHERE libelle LIKE '%pomme%';
> ```
```sql

```

> [!question]- **Question 14 :** Afficher les différents types de packaging (sans doublons).
> ```sql
> SELECT DISTINCT packaging FROM article;
> ```
```sql

```

> [!question]- **Question 15 :** Afficher les différentes unités de mesure utilisées (sans doublons).
> ```sql
> SELECT DISTINCT unitemesure FROM article;
> ```
```sql

```

## 🟢 Requêtes simples (Filtres avancés)

> [!question]- **Question 16 :** Afficher tous les fournisseurs.
> ```sql
> SELECT * FROM fournisseur;
> ```
```sql

```

> [!question]- **Question 17 :** Afficher la raison sociale et l'email de tous les fournisseurs.
> ```sql
> SELECT raisonsociale, email FROM fournisseur;
> ```
```sql

```

> [!question]- **Question 18 :** Afficher les fournisseurs situés à 'Paris'.
> ```sql
> SELECT * FROM fournisseur WHERE adresseville = 'Paris';
> ```
```sql

```

> [!question]- **Question 19 :** Afficher les fournisseurs situés à 'Paris', 'Lyon' ou 'Marseille'.
> ```sql
> SELECT * FROM fournisseur WHERE adresseville IN ('Paris', 'Lyon', 'Marseille');
> ```
```sql

```

> [!question]- **Question 20 :** Afficher les fournisseurs situés à moins de 50 km de distance.
> ```sql
> SELECT * FROM fournisseur WHERE distancekm < 50;
> ```
```sql

```

> [!question]- **Question 21 :** Afficher les fournisseurs situés à plus de 100 km, triés par distance croissante.
> ```sql
> SELECT * FROM fournisseur WHERE distancekm > 100 ORDER BY distancekm ASC;
> ```
```sql

```

> [!question]- **Question 22 :** Afficher les fournisseurs ayant une adresse email se terminant par '@gmail.com'.
> ```sql
> SELECT * FROM fournisseur WHERE email LIKE '%@gmail.com';
> ```
```sql

```

> [!question]- **Question 23 :** Afficher les fournisseurs dont le numéro de téléphone commence par '06'.
> ```sql
> SELECT * FROM fournisseur WHERE numerotelephone LIKE '06%';
> ```
```sql

```

> [!question]- **Question 24 :** Afficher la raison sociale et la ville des fournisseurs dont le code postal commence par '75'.
> ```sql
> SELECT raisonsociale, adresseville FROM fournisseur WHERE adressecp LIKE '75%';
> ```
```sql

```

> [!question]- **Question 25 :** Afficher les fournisseurs dont la rue n'est pas renseignée (NULL).
> ```sql
> SELECT * FROM fournisseur WHERE adresserue IS NULL;
> ```
```sql

```

> [!question]- **Question 26 :** Afficher tous les lots enregistrés.
> ```sql
> SELECT * FROM lot;
> ```
```sql

```

> [!question]- **Question 27 :** Afficher les lots dont la date de péremption est dépassée (avant la date du jour, supposons '2026-01-01').
> ```sql
> SELECT * FROM lot WHERE dateperemption < '2026-01-01';
> ```
```sql

```

> [!question]- **Question 28 :** Afficher les lots livrés au mois d'octobre 2025.
> ```sql
> SELECT * FROM lot WHERE datelivraison BETWEEN '2025-10-01' AND '2025-10-31';
> ```
```sql

```

> [!question]- **Question 29 :** Afficher tous les achats.
> ```sql
> SELECT * FROM achat;
> ```
```sql

```

> [!question]- **Question 30 :** Afficher les achats d'un montant total supérieur à 100€.
> ```sql
> SELECT * FROM achat WHERE montanttotal > 100;
> ```
```sql

```

> [!question]- **Question 31 :** Afficher la date et le montant des achats triés du plus récent au plus ancien.
> ```sql
> SELECT dateachat, montanttotal FROM achat ORDER BY dateachat DESC;
> ```
```sql

```

## 🟠 Modification de données (INSERT, UPDATE, DELETE)

> [!question]- **Question 32 :** Insérer une nouvelle marque nommée 'SuperBio' avec l'ID 50.
> ```sql
> INSERT INTO marque (idmarque, nom) VALUES (50, 'SuperBio');
> ```
```sql

```

> [!question]- **Question 33 :** Insérer un nouveau rayon nommé 'Produits Frais' avec l'ID 10.
> ```sql
> INSERT INTO rayon (idrayon, libelle) VALUES (10, 'Produits Frais');
> ```
```sql

```

> [!question]- **Question 34 :** Augmenter le prix de tous les articles de 5%.
> ```sql
> UPDATE article SET prix = prix * 1.05;
> ```
```sql

```

> [!question]- **Question 35 :** Mettre à jour la distance à 30 km pour le fournisseur d'ID 5.
> ```sql
> UPDATE fournisseur SET distancekm = 30 WHERE idfournisseur = 5;
> ```
```sql

```

> [!question]- **Question 36 :** Passer en 'bio' tous les articles du rayon 10.
> ```sql
> UPDATE article SET bio = 1 WHERE idrayon = 10;
> ```
```sql

```

> [!question]- **Question 37 :** Supprimer l'article ayant l'ID 99.
> ```sql
> DELETE FROM article WHERE idarticle = 99;
> ```
```sql

```

> [!question]- **Question 38 :** Supprimer tous les lots dont la date de péremption est antérieure au '2024-01-01'.
> ```sql
> DELETE FROM lot WHERE dateperemption < '2024-01-01';
> ```
```sql

```

> [!question]- **Question 39 :** Diminuer de 1€ le prix des articles qui coûtent plus de 20€.
> ```sql
> UPDATE article SET prix = prix - 1 WHERE prix > 20;
> ```
```sql

```

> [!question]- **Question 40 :** Insérer un achat avec l'ID 1001, date du jour '2026-04-19', et montant 45.50.
> ```sql
> INSERT INTO achat (idachat, dateachat, montanttotal) VALUES (1001, '2026-04-19', 45.50);
> ```
```sql

```

> [!question]- **Question 41 :** Supprimer les marques dont le nom commence par 'Test'.
> ```sql
> DELETE FROM marque WHERE nom LIKE 'Test%';
> ```
```sql

```

## 🟡 Fonctions d'agrégation (COUNT, SUM, AVG, MIN, MAX)

> [!question]- **Question 42 :** Compter le nombre total d'articles dans le magasin.
> ```sql
> SELECT COUNT(*) FROM article;
> ```
```sql

```

> [!question]- **Question 43 :** Afficher le prix moyen de tous les articles.
> ```sql
> SELECT AVG(prix) FROM article;
> ```
```sql

```

> [!question]- **Question 44 :** Afficher le prix de l'article le plus cher.
> ```sql
> SELECT MAX(prix) FROM article;
> ```
```sql

```

> [!question]- **Question 45 :** Afficher le prix de l'article le moins cher.
> ```sql
> SELECT MIN(prix) FROM article;
> ```
```sql

```

> [!question]- **Question 46 :** Compter le nombre d'articles bio.
> ```sql
> SELECT COUNT(*) FROM article WHERE bio = 1;
> ```
```sql

```

> [!question]- **Question 47 :** Calculer la somme totale des montants de tous les achats.
> ```sql
> SELECT SUM(montanttotal) FROM achat;
> ```
```sql

```

> [!question]- **Question 48 :** Compter le nombre de fournisseurs enregistrés.
> ```sql
> SELECT COUNT(*) FROM fournisseur;
> ```
```sql

```

> [!question]- **Question 49 :** Calculer la distance moyenne des fournisseurs.
> ```sql
> SELECT AVG(distancekm) FROM fournisseur;
> ```
```sql

```

> [!question]- **Question 50 :** Compter le nombre de lots fournis par le fournisseur ID 12.
> ```sql
> SELECT COUNT(*) FROM lot WHERE idfournisseur = 12;
> ```
```sql

```

> [!question]- **Question 51 :** Afficher le montant moyen d'un achat.
> ```sql
> SELECT AVG(montanttotal) FROM achat;
> ```
```sql

```

## 🟡 Regroupements (GROUP BY, HAVING)

> [!question]- **Question 52 :** Afficher le nombre d'articles pour chaque marque (idmarque).
> ```sql
> SELECT idmarque, COUNT(*) FROM article GROUP BY idmarque;
> ```
```sql

```

> [!question]- **Question 53 :** Afficher le prix moyen des articles par rayon (idrayon).
> ```sql
> SELECT idrayon, AVG(prix) FROM article GROUP BY idrayon;
> ```
```sql

```

> [!question]- **Question 54 :** Afficher, pour chaque fournisseur, le nombre de lots livrés.
> ```sql
> SELECT idfournisseur, COUNT(*) FROM lot GROUP BY idfournisseur;
> ```
```sql

```

> [!question]- **Question 55 :** Afficher le nombre d'articles bio et non bio.
> ```sql
> SELECT bio, COUNT(*) FROM article GROUP BY bio;
> ```
```sql

```

> [!question]- **Question 56 :** Afficher, par type de packaging, le nombre d'articles.
> ```sql
> SELECT packaging, COUNT(*) FROM article GROUP BY packaging;
> ```
```sql

```

> [!question]- **Question 57 :** Afficher les idmarque ayant plus de 10 articles.
> ```sql
> SELECT idmarque, COUNT(*) FROM article GROUP BY idmarque HAVING COUNT(*) > 10;
> ```
```sql

```

> [!question]- **Question 58 :** Afficher les idrayon dont le prix moyen des articles dépasse 15€.
> ```sql
> SELECT idrayon, AVG(prix) FROM article GROUP BY idrayon HAVING AVG(prix) > 15;
> ```
```sql

```

> [!question]- **Question 59 :** Afficher, par ville de fournisseur, le nombre de fournisseurs.
> ```sql
> SELECT adresseville, COUNT(*) FROM fournisseur GROUP BY adresseville;
> ```
```sql

```

> [!question]- **Question 60 :** Afficher les villes abritant au moins 3 fournisseurs.
> ```sql
> SELECT adresseville, COUNT(*) FROM fournisseur GROUP BY adresseville HAVING COUNT(*) >= 3;
> ```
```sql

```

> [!question]- **Question 61 :** Afficher pour chaque achat (idachat), le nombre d'articles différents dans la liste de courses.
> ```sql
> SELECT idachat, COUNT(idarticle) FROM listecourses GROUP BY idachat;
> ```
```sql

```

## 🟠 Jointures : 2 tables

> [!question]- **Question 62 :** Afficher le libellé de l'article et le nom de sa marque.
> ```sql
> SELECT article.libelle, marque.nom FROM article JOIN marque ON article.idmarque = marque.idmarque;
> ```
```sql

```

> [!question]- **Question 63 :** Afficher le libellé de l'article et le libellé de son rayon.
> ```sql
> SELECT a.libelle AS article_libelle, r.libelle AS rayon_libelle FROM article a JOIN rayon r ON a.idrayon = r.idrayon;
> ```
```sql

```

> [!question]- **Question 64 :** Afficher les noms des marques proposant des articles bio.
> ```sql
> SELECT DISTINCT m.nom FROM marque m JOIN article a ON m.idmarque = a.idmarque WHERE a.bio = 1;
> ```
```sql

```

> [!question]- **Question 65 :** Afficher l'identifiant du lot et le libellé de l'article correspondant.
> ```sql
> SELECT l.idlot, a.libelle FROM lot l JOIN article a ON l.idarticle = a.idarticle;
> ```
```sql

```

> [!question]- **Question 66 :** Afficher l'identifiant du lot et la raison sociale du fournisseur.
> ```sql
> SELECT l.idlot, f.raisonsociale FROM lot l JOIN fournisseur f ON l.idfournisseur = f.idfournisseur;
> ```
```sql

```

> [!question]- **Question 67 :** Afficher le libellé des rayons contenant des articles dont le prix est inférieur à 5€.
> ```sql
> SELECT DISTINCT r.libelle FROM rayon r JOIN article a ON r.idrayon = a.idrayon WHERE a.prix < 5;
> ```
```sql

```

> [!question]- **Question 68 :** Afficher la liste des articles (libellé) et la quantité achetée pour l'achat numéro 100.
> ```sql
> SELECT a.libelle, lc.quantite FROM article a JOIN listecourses lc ON a.idarticle = lc.idarticle WHERE lc.idachat = 100;
> ```
```sql

```

> [!question]- **Question 69 :** Afficher le nombre d'articles par nom de marque.
> ```sql
> SELECT m.nom, COUNT(a.idarticle) FROM marque m JOIN article a ON m.idmarque = a.idmarque GROUP BY m.nom;
> ```
```sql

```

> [!question]- **Question 70 :** Afficher le prix moyen des articles par nom de rayon.
> ```sql
> SELECT r.libelle, AVG(a.prix) FROM rayon r JOIN article a ON r.idrayon = a.idrayon GROUP BY r.libelle;
> ```
```sql

```

> [!question]- **Question 71 :** Afficher toutes les marques, même celles n'ayant aucun article associé.
> ```sql
> SELECT m.nom, a.libelle FROM marque m LEFT JOIN article a ON m.idmarque = a.idmarque;
> ```
```sql

```

## 🔴 Jointures complexes : 3 tables et plus

> [!question]- **Question 72 :** Afficher le libellé de l'article, le nom de la marque et le libellé du rayon.
> ```sql
> SELECT a.libelle, m.nom, r.libelle FROM article a JOIN marque m ON a.idmarque = m.idmarque JOIN rayon r ON a.idrayon = r.idrayon;
> ```
```sql

```

> [!question]- **Question 73 :** Afficher pour chaque lot : idlot, le libellé de l'article et la raison sociale du fournisseur.
> ```sql
> SELECT l.idlot, a.libelle, f.raisonsociale FROM lot l JOIN article a ON l.idarticle = a.idarticle JOIN fournisseur f ON l.idfournisseur = f.idfournisseur;
> ```
```sql

```

> [!question]- **Question 74 :** Afficher les raisons sociales des fournisseurs qui fournissent des articles bio.
> ```sql
> SELECT DISTINCT f.raisonsociale FROM fournisseur f JOIN lot l ON f.idfournisseur = l.idfournisseur JOIN article a ON l.idarticle = a.idarticle WHERE a.bio = 1;
> ```
```sql

```

> [!question]- **Question 75 :** Afficher le nom des marques pour lesquelles le fournisseur 'BioDistrib' a livré des lots.
> ```sql
> SELECT DISTINCT m.nom FROM marque m JOIN article a ON m.idmarque = a.idmarque JOIN lot l ON a.idarticle = l.idarticle JOIN fournisseur f ON l.idfournisseur = f.idfournisseur WHERE f.raisonsociale = 'BioDistrib';
> ```
```sql

```

> [!question]- **Question 76 :** Afficher pour l'achat 200 : la date, le libellé de l'article, la quantité et le nom de la marque.
> ```sql
> SELECT ac.dateachat, a.libelle, lc.quantite, m.nom FROM achat ac JOIN listecourses lc ON ac.idachat = lc.idachat JOIN article a ON lc.idarticle = a.idarticle JOIN marque m ON a.idmarque = m.idmarque WHERE ac.idachat = 200;
> ```
```sql

```

> [!question]- **Question 77 :** Afficher le nombre total de lots fournis par rayon (libellé du rayon).
> ```sql
> SELECT r.libelle, COUNT(l.idlot) FROM rayon r JOIN article a ON r.idrayon = a.idrayon JOIN lot l ON a.idarticle = l.idarticle GROUP BY r.libelle;
> ```
```sql

```

> [!question]- **Question 78 :** Afficher les articles (libellé) présents dans la liste de courses d'achats effectués en octobre 2025.
> ```sql
> SELECT DISTINCT a.libelle FROM article a JOIN listecourses lc ON a.idarticle = lc.idarticle JOIN achat ac ON lc.idachat = ac.idachat WHERE ac.dateachat BETWEEN '2025-10-01' AND '2025-10-31';
> ```
```sql

```

> [!question]- **Question 79 :** Afficher le libellé du rayon et la raison sociale des fournisseurs qui l'approvisionnent.
> ```sql
> SELECT DISTINCT r.libelle, f.raisonsociale FROM rayon r JOIN article a ON r.idrayon = a.idrayon JOIN lot l ON a.idarticle = l.idarticle JOIN fournisseur f ON l.idfournisseur = f.idfournisseur;
> ```
```sql

```

> [!question]- **Question 80 :** Afficher les marques dont les articles ont été achetés au moins une fois.
> ```sql
> SELECT DISTINCT m.nom FROM marque m JOIN article a ON m.idmarque = a.idmarque JOIN listecourses lc ON a.idarticle = lc.idarticle;
> ```
```sql

```

> [!question]- **Question 81 :** Calculer le chiffre d'affaires généré par chaque nom de marque (somme des prix * quantite vendue).
> ```sql
> SELECT m.nom, SUM(a.prix * lc.quantite) AS CA FROM marque m JOIN article a ON m.idmarque = a.idmarque JOIN listecourses lc ON a.idarticle = lc.idarticle GROUP BY m.nom;
> ```
```sql

```

## 🔴 Sous-requêtes

> [!question]- **Question 82 :** Afficher les articles dont le prix est supérieur au prix moyen de tous les articles.
> ```sql
> SELECT * FROM article WHERE prix > (SELECT AVG(prix) FROM article);
> ```
```sql

```

> [!question]- **Question 83 :** Afficher les fournisseurs n'ayant jamais fourni de lot (avec une sous-requête IN/NOT IN).
> ```sql
> SELECT * FROM fournisseur WHERE idfournisseur NOT IN (SELECT idfournisseur FROM lot);
> ```
```sql

```

> [!question]- **Question 84 :** Afficher les articles appartenant au même rayon que l'article nommé 'Jus d''orange'.
> ```sql
> SELECT * FROM article WHERE idrayon = (SELECT idrayon FROM article WHERE libelle = 'Jus d''orange');
> ```
```sql

```

> [!question]- **Question 85 :** Afficher les marques n'ayant aucun article associé (avec NOT EXISTS).
> ```sql
> SELECT * FROM marque m WHERE NOT EXISTS (SELECT 1 FROM article a WHERE a.idmarque = m.idmarque);
> ```
```sql

```

> [!question]- **Question 86 :** Afficher les achats dont le montant est supérieur à la moyenne des montants d'achats.
> ```sql
> SELECT * FROM achat WHERE montanttotal > (SELECT AVG(montanttotal) FROM achat);
> ```
```sql

```

> [!question]- **Question 87 :** Afficher les articles ayant le prix le plus élevé du magasin.
> ```sql
> SELECT * FROM article WHERE prix = (SELECT MAX(prix) FROM article);
> ```
```sql

```

> [!question]- **Question 88 :** Afficher le nom de la marque qui propose l'article le moins cher.
> ```sql
> SELECT nom FROM marque WHERE idmarque = (SELECT idmarque FROM article WHERE prix = (SELECT MIN(prix) FROM article));
> ```
```sql

```

> [!question]- **Question 89 :** Afficher les fournisseurs fournissant plus de lots que la moyenne des lots par fournisseur.
> ```sql
> SELECT idfournisseur, COUNT(*) FROM lot GROUP BY idfournisseur HAVING COUNT(*) > (SELECT COUNT(*)/COUNT(DISTINCT idfournisseur) FROM lot);
> ```
```sql

```

> [!question]- **Question 90 :** Afficher les articles jamais achetés (jamais dans listecourses).
> ```sql
> SELECT * FROM article WHERE idarticle NOT IN (SELECT idarticle FROM listecourses);
> ```
```sql

```

> [!question]- **Question 91 :** Afficher les rayons qui ne contiennent aucun article bio.
> ```sql
> SELECT * FROM rayon WHERE idrayon NOT IN (SELECT idrayon FROM article WHERE bio = 1);
> ```
```sql

```

## 🟣 Requêtes complexes, Calculs et Vues

> [!question]- **Question 92 :** Créer une vue VUE_ARTICLES_COMPLETS contenant le libellé de l'article, son prix, le nom de sa marque et le nom de son rayon.
> ```sql
> CREATE VIEW VUE_ARTICLES_COMPLETS AS
SELECT a.libelle, a.prix, m.nom AS marque, r.libelle AS rayon
FROM article a
JOIN marque m ON a.idmarque = m.idmarque
JOIN rayon r ON a.idrayon = r.idrayon;
> ```
```sql

```

> [!question]- **Question 93 :** Afficher à partir de la vue VUE_ARTICLES_COMPLETS uniquement les articles du rayon 'Boissons'.
> ```sql
> SELECT * FROM VUE_ARTICLES_COMPLETS WHERE rayon = 'Boissons';
> ```
```sql

```

> [!question]- **Question 94 :** Afficher pour chaque article (idarticle, libelle) la quantité totale achetée (somme des quantités dans listecourses).
> ```sql
> SELECT a.idarticle, a.libelle, SUM(lc.quantite) AS total_vendu FROM article a JOIN listecourses lc ON a.idarticle = lc.idarticle GROUP BY a.idarticle, a.libelle;
> ```
```sql

```

> [!question]- **Question 95 :** Afficher l'achat (idachat) comportant le plus grand nombre de produits distincts.
> ```sql
> SELECT idachat FROM listecourses GROUP BY idachat ORDER BY COUNT(idarticle) DESC LIMIT 1;
> ```
```sql

```

> [!question]- **Question 96 :** Créer une vue VUE_STATS_FOURNISSEUR avec la raison sociale et le nombre de lots fournis.
> ```sql
> CREATE VIEW VUE_STATS_FOURNISSEUR AS
SELECT f.raisonsociale, COUNT(l.idlot) as nb_lots
FROM fournisseur f
LEFT JOIN lot l ON f.idfournisseur = l.idfournisseur
GROUP BY f.raisonsociale;
> ```
```sql

```

> [!question]- **Question 97 :** Calculer le temps moyen de livraison d'un lot (différence entre dateLivraison et dateFabrication).
> ```sql
> SELECT AVG(datelivraison - datefabrication) FROM lot;
> ```
```sql

```

> [!question]- **Question 98 :** Afficher le nom de la marque ayant généré le plus de ventes (en quantité totale).
> ```sql
> SELECT m.nom FROM marque m JOIN article a ON m.idmarque = a.idmarque JOIN listecourses lc ON a.idarticle = lc.idarticle GROUP BY m.nom ORDER BY SUM(lc.quantite) DESC LIMIT 1;
> ```
```sql

```

> [!question]- **Question 99 :** Afficher les fournisseurs dont tous les lots ont été livrés (dateLivraison IS NOT NULL pour tous leurs lots).
> ```sql
> SELECT f.idfournisseur, f.raisonsociale FROM fournisseur f WHERE NOT EXISTS (SELECT 1 FROM lot l WHERE l.idfournisseur = f.idfournisseur AND l.datelivraison IS NULL);
> ```
```sql

```

> [!question]- **Question 100 :** Afficher, pour chaque jour d'achat, le chiffre d'affaires total généré.
> ```sql
> SELECT dateachat, SUM(montanttotal) FROM achat GROUP BY dateachat;
> ```
```sql

```

