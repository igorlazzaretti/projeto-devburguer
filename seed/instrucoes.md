# Populando novo Banco Postgres para o DevBurguer
Créditos: Igor Lazzaretti (igorlazzaretti.com) e Pedro Lucas Brandao Da Silva

## Docker
Apague o container postgres e recrie-o.
Comando:

```
js docker run --name devburguer-postgres -e POSTGRES_PASSWORD=postgres -p 5433:5432 -d postgres
```
Rode os dois containeres, o Mongo e o recém criado Postgre
## Beekeper
Conecte-se e Crie o banco de dados com o Beekeeper

## Migrations
Rode a Migrations no ambiente da sua API

```
npx sequelize-cli db:migrate
```
## Usuário ADMIN
Crie um usuário admin, crie uma sessions e salve este token (exemplo abaixo)

“eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjA0Y2Q1NjRlLWU4YTgtNDk3MC04Y2VjLTg0OWRiZGIzZmU1YiIsIm5hbWUiOiJSb2RvbGZvIiwiaWF0IjoxNzU1MzI0MDk2LCJleHAiOjE3NTU3NTYwOTZ9.WpxsWFJatkMv-rwZyoDx6XDVxvHcTcGIT2MbZG96fOg”

## Seed
No config do Repo Seed atualize este arquivo com este token e confira a porta

```
src/config.js
```
Agora, instale as dependências e após dê o start
```
npm

npm start
```

