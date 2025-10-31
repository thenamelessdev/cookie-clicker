FROM node:24

COPY package*.json /

RUN npm install

COPY . /

EXPOSE 5050

EXPOSE 8080

CMD [ "npm", "start" ]