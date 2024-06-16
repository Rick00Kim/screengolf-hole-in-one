FROM node:20-alpine

USER $user

EXPOSE 3000

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

RUN npm i -g serve --silent

ADD ./build /app

RUN chown -R node:node /app

CMD ["npx", "serve", "-p", "3000"]
