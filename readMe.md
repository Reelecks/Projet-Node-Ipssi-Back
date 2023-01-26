# Node Js Ipssi Projet
## Description
The objective of the project is to create the CRUD of a blog, we use node Js.

# Use Projet 

## Routes
### User
|`/signup`|`/signin`|
|----------|---------|
|Post to create new user|Post to log|
### Post
|`/api/post`|`/api/post/all`|`/api/post/:uuid`|
|----------|---------|-------|
|Get all posts and comments from the logged in user|Get all posts and comments|Get a post|
|Post a post|---------|Put to uptade a post|
|----------|---------|Delete a post|
### Comment
|`/api/comment`|`/api/comment/:uuid`|
|----------|---------|
|Get comment|Put to uptade a comment|
|Post a comment|Delete a comment|

# Installation du projet
## Etape 1
Clone the project where you wish
## Etape 2
Create new database and put in `.env` DATABASE_URL and JWT_SECRET
## Etape 3
Use the commande `$ pnpm install`
## Etape 4
Use the commande `$ pnpm prisma format`
## Etape 5
Use the commande `npm i @prisma/client --save`
## Etape 6
Use the commande `$ pnpm prisma migrate dev --name init`
## Etape 7
Use the commande `$ pnpm dev`
