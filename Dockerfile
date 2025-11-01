FROM node:24

COPY package*.json /

RUN npm install

COPY . /

EXPOSE 5050


CMD [ "npm", "start" ]