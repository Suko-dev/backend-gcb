FROM node

WORKDIR /app/server

COPY . .

RUN npm install

EXPOSE 3000

CMD ["npm","run","start:dev"]