FROM node:12
WORKDIR /usr/app
COPY . .
RUN npm install
RUN npx sequelize-cli db:create
RUN npx sequelize-cli db:migrate
CMD [ "npm", "start" ]