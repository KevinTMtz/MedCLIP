FROM node:14

WORKDIR /app

COPY package.json ./

COPY ./ ./

RUN yarn install

CMD ["yarn", "run", "start"]