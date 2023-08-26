# lempire-technical-challenge
Challenge technique pour Lempire


# Descriptioin
Lemport est un outil pour faire des exports.

Chaque utilisateurs peut enregistrer des exports et à la fin de ceux-ci il obtiendra un lien personnalisé.

La home page ("/") sert de présentation du produit

La page exports ("/exports") est la page où on peut faire ses exportations

La page login ("/login") permet de se connecter aux comptes 2 pré existants : "meteorite" et "meteorite2" en username & "password" pour le mot de passe. Ces 2 comptes n'ont aucun export lors de la première connexion. À vous d'en ajouter.

# Améliorations faites depuis la soumission du challenge
* Amélioration du design
* Création des exports via un html input files. Séparation de la page entre "Export files" et "Export fake file". Création de exports.insert_list en backend pour exporter plusieurs éléments à la fois


# Commandes 
To install the packages :
meteor npm install

To run the app :
meteor

To run the tests:
TEST_WATCH=1 meteor test --driver-package meteortesting:mocha




