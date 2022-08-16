FROM node

WORKDIR /usr/app

COPY ./prisma prisma

COPY package.json ./

RUN npm install

COPY . .

EXPOSE 3333

CMD ["npm", "run", "dev"]