FROM node:18

WORKDIR /app

COPY . .

RUN npm install


RUN npm run build


EXPOSE 3333


CMD ["node", "server.js"]
