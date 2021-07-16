# syntax=docker/dockerfile:1
# build stage
FROM node:12-alpine as dev
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .
CMD ["npm", "start"]

# production stage
FROM dev AS prod

CMD ["npm", "run", "build"]
