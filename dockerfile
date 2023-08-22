FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3010

ENV PGHOST=db
ENV PGPORT=5432
ENV PGUSER=victal-circle_user
ENV PGPASSWORD=victal-circle_password
ENV PGDATABASE=victal-circle

RUN apt-get update && apt-get install -y postgresql-client

CMD ["yarn", "start"]
