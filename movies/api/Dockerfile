FROM node:10

WORKDIR /usr/src/app

COPY package.json yarn.lock ./
RUN yarn install

COPY . .

EXPOSE 8000

CMD ["yarn", "start"]
