FROM node:latest

COPY . .

RUN npm install

CMD [ "npm", "run", "start" ]
