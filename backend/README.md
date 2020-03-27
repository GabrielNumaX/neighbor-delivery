# backend

## server up
Server is running on `localhost:8080`

`npm start` to run the server

`npm run dev` to run the server on dev mode (nodemon)

`npm run inspect` to run inspect the server on debug mode

## api

Routes will be under the `/api` route prefix

## google oauth

Route for auth:
`GET /api/oauth/google`

Route for auth callback:
`GET /api/oauth/google/callback`

## mongo
Served by docker-compose on port `27017`. Make the directory `.mongo` on `backend` to persist your db on localhost

`docker-compose up -d`

## dependency injection
Create your modules and inject the dependencies on them on file `src/injection.js`.
