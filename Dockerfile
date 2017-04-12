FROM node

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY package.json /user/src/app

RUN npm install

COPY . /usr/src/app

EXPOSE 80 443

RUN npm start
