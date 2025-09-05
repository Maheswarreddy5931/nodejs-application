FROM node:16
MAINTAINER name = maheswarreddy
LABEL This is a Nodejs application
WORKDIR /app
COPY package*.json /app
RUN npm install
COPY . .
EXPOSE 3000
CMD ["node", "server.js"]
