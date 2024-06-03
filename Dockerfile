FROM node:18-alpine AS base

WORKDIR /app

ADD . /app/

RUN npm install

RUN npm run build

CMD ["npm", "run", "start"]