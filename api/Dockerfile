FROM node:16-alpine3.18

WORKDIR /api/app

COPY package*.json ./

RUN npm install

RUN npm install -g nodemon

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
