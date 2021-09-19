FROM node:14-alpine AS builder

WORKDIR /usr/src/app

COPY ./src /usr/src/app/

RUN npm i typescript@latest mocha -g

RUN npm install \
    && tsc \
    && npm test

FROM node:14-alpine

WORKDIR /usr/src/app

COPY --from=builder /usr/src/app/dist ./
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/docs ./docs


CMD ["node", "app.js"]

