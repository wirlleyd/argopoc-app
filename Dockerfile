FROM node:16-alpine as builder

WORKDIR /usr/src/app

COPY package*.json ./

RUN yarn install --production

COPY . .

RUN yarn build

# ---

FROM node:16-alpine

ENV NODE_ENV production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY --from=builder /usr/src/app/package*.json ./
COPY --from=builder /usr/src/app/node_modules/ ./node_modules/
COPY --from=builder /usr/src/app/dist/ ./dist/

CMD ["node", "dist/main.js"]