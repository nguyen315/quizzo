# syntax=docker/dockerfile:1
FROM node:12-alpine as base

WORKDIR /app

COPY package.json ./

FROM base as dev
RUN npm install
COPY . .
CMD ["npm", "run", "start:dev"]

FROM base as prod
RUN npm install --production
COPY . .
CMD ["npm", "start"]