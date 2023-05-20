FROM node:lts-alpine3.17
#Δημιουργία server's container
#Και δημιούργησα και το dockerignore


WORKDIR /server

COPY . .

RUN npm install
#RUN npm i @fastify/mysql

EXPOSE 3000

CMD ["node", "server.js"]