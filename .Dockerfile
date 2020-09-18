FROM node:12.13-alpine

WORKDIR /app

COPY package*.json ./

RUN npm i

COPY . .

RUN npm run build

CMD ["node", "dist/main"]