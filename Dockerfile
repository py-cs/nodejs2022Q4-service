FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY prisma ./prisma/

RUN npx prisma generate

COPY . .

EXPOSE ${PORT}

CMD ["npm", "run", "start:dev"]