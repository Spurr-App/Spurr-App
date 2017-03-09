FROM node
RUN npm install -g --silent bower

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package.json /user/src/app
RUN npm install
RUN bower install
COPY . /usr/src/app

EXPOSE 5000
