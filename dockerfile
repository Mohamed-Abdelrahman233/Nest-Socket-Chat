# ===== BUILD STAGE =====
FROM node:20-alpine AS build

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build


# ===== PRODUCTION STAGE =====
FROM node:20-alpine

WORKDIR /usr/src/app


COPY --from=build /usr/src/app/dist ./dist

COPY package*.json ./

RUN npm install --only=production

EXPOSE 8000

CMD ["node", "dist/src/main.js"]