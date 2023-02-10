FROM node:18-alpine AS builder

WORKDIR /usr/src/app

COPY package.json package-lock.json ./
COPY prisma ./prisma/

RUN npm ci
RUN npx prisma generate

COPY . .

FROM node:18-alpine AS development

WORKDIR /usr/src/app

COPY --from=builder /usr/src/app .

FROM node:18-alpine AS production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY --from=development /usr/src/app/ .

EXPOSE 4000

CMD [ "node", "dist/main" ]