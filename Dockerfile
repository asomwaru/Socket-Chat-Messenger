# build node.js server application
FROM node:14.17
WORKDIR /usr/app

COPY package*.json ./
RUN npm i

COPY . .
RUN tsc

EXPOSE 8080
CMD npm start


# build postgres database
FROM postgres
ENV POSTGRES_DB messenger

EXPOSE 5432

COPY schema.sql /docker-entrypoint-initdb.d/

