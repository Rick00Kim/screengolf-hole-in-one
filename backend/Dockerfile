FROM node:14.18-alpine

USER $user

EXPOSE 5500

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json /app/package.json
COPY package-lock.json /app/package-lock.json

ADD . /app

RUN chown -R node:node /app