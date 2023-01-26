# Node Js Ipssi Projet
## Description

# Use Projet 
## Routes
### User

### Post
|`/api/post`|`/api/post/all`|`/api/post/:uuid`|
|----------|---------|-------|
|Get all posts and comments from the logged in user, Post a post|Get all posts and comments|Get a post, Put to uptade a post, Delete a post|

### Comment


# Installation du projet
## Etape 1
Cloner le projet où vous le souhaiter
## Etape 2
Vous rendre dans le dosser en utilisant l'invite de commande de votre terminal
## Etape 3
Utiliser la commande `pnpm install`
## Etape 4
Utiliser la commande `pnpm run dev`
Vous pouvez maintenant vous rendre à l'adresse indiquer par le terminal et profiter de notre projet

# Utilisation de notre Projet

## Pages pricipales
Nous disposons de 3 pages principales présentant les Personnages, les episodes et les lieux de Rick et Morty
Lors de l'arrivée sur le site la page automatiquement présenté est celle montrant les personnages
Il est possible, sur la page personnage, de cliquer sur le bouton "More", une nouvelle page affichant uniquement le personnage choisit et avec plus d'informations sera alors présenté.

## Recherche

Il est possible de rechercher plus spécifiquement un personnage, un épisode ou un lieu. Pour ce faire il faut utiliser la barre de recherche dans la barre de navigation. Vous pouvez alors selectionner ce que vous voulez chercher et sur quel critère vous voulez baser votre recherche. Voici le tableau des critères pour chaque type :

|Characters|Locations|Episode|
|----------|---------|-------|
|Name, Species|Name, Type, Dimension|Name, Episode|


# Vous pouvez trouver le projet sur Vecel à cette adresse :
https://js-final-project-d7jyugm9n-reelecks.vercel.app/