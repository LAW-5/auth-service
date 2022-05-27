FROM node:alpine as prod
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
RUN npm install glob rimraf
COPY . .
RUN npm run build
CMD ["node", "dist/main"]