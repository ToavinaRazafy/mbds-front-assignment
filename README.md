# mbds-front-assignment
Dans ce repository, on a les codes sources de la partie FrontEnd.
Dans cette partie FrontEnd, on peut voir les pages suivantes :
-page de login (page de démarrage de l'application)
-page pour voir la liste des assignments avec des paramétrages de CRUD
-page d'ajout d'assignment

Afin de faire tourner l'application sur une machine localement, il faut faire comme suit :
Installation BackEnd
-Cloner le repository https://github.com/Heggy19/mbds-back-assignments
-Ouvrir un terminal depuis l'emplacement du fichier BackEnd
-entré la commande suivante : npm install
-puis entré la commande suivante : node server

Installation FrontEnd
-Cloner le repository https://github.com/ToavinaRazafy/mbds-front-assignment
-Ouvrir le fichier src\app\user\jwt-interceptor.ts puis changer la valeur de l’URL a la ligne 13 avec : http://localhost:4000/  (URL BackEnd)
-Ouvrir un terminal depuis l'emplacement du fichier FrontEnd
-entré la commande suivante : npm install
-puis entré la commande suivante : ng serve
Une fois terminer, un lien vous sera proposé dans le terminal que vous allez entrer dans un navigateur.

Comme l’on a utilisé Json Web Tokens(JWT) pour la gestion de l'authentification, pour y accéder à l’application, voici les identifiants :
LOGIN : admin
MOTDEPASSE : mbds

Caractéristique du projet :
Dans la page montrant la liste des assignments :
L’écran affiche :
-Une liste des assignments non rendus avec pagination.
-Une liste des assignments rendus avec pagination.
-Sur le haut de la page s’affiche une zone de recherche qui contient deux input (Auteur et matière).
La liste s’actualisera en dépits de ce qu’on écrit ou de ce que l’on choisit sur les inputs.
Sur chaque material card, il y a trois boutons respectifs :
-pour noter (la notation est possible si l’assignment n’est pas encore rendu, et un changement automatique du statut en rendu une fois la note attribuer).
-pour modifier les informations (une notification s’affichera une fois l’update effectué).
- pour supprimer un assignment.

Dans la page d’ajout d’un assignment :
L’ajout d'un assignment se fait via un formulaire de type Stepper :
Step 1 : informations sur le devoir
Step 2 : information sur l’auteur et la date de rendu
Step 3 : confirmation des données

