# Node Js Ipssi Projet
## Description
The objective of the project is to create the CRUD of a blog, we use node Js.

# Use Projet 
website can be seen on https://blog-ipssi.r-landais.com/
the link of our API is https://nd-rl-blog-api.onrender.com/

## Routes
### User
|`/signup`|`/signin`|`/api/user/:uuid`|
|----------|---------|---------|
|Post to create new user|Post to log|Delete a user (Admin only)|
### Post
|`/api/post`|`/api/post/all`|`/api/post/:uuid`|`/api/post/filter`|
|----------|---------|-------|-------|
|Get all posts and comments from the logged in user|Get all posts and comments|Get a post|Get filter use "filter?from=1674820800000" for exemple|
|Post a post|---------|Put to uptade a post|----------|
|----------|---------|Delete a post|----------|
### Comment
|`/api/comment`|`/api/comment/:uuid`|
|----------|---------|
|Get comment|Put to uptade a comment|
|Post a comment|Delete a comment|

# Installation du projet
we had some issue with prisma/client importation. Branch-back works fine on our localhost but didnt work online so we made production's branch to fix this

## Etape 1
Clone the project where you wish
## Etape 2
Create new database and put in `.env` DATABASE_URL"your link" and JWT_SECRET"your password"
## Etape 3
Use the commande `$ pnpm install` & `$ pnpm init` 
## Etape 4
Use the commande `$ pnpm prisma format`
## Etape 5
Use the commande `npm i @prisma/client --save`
## Etape 6
Use the commande `$ pnpm prisma migrate dev --name init`
## Etape 7
Use the commande `$ pnpm dev`
