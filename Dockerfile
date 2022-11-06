FROM node:16-alpine

WORKDIR /vue-app
COPY . .
RUN npm install
EXPOSE 8080
CMD ["npm", "run", "serve"]
