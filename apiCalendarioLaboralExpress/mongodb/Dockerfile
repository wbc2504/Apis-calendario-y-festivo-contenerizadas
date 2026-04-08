FROM mongo:7

ENV MONGO_INITDB_DATABASE=calendario_laboral

COPY 01-init-db.mongodb.js /docker-entrypoint-initdb.d/01-init-db.js
COPY 02-seed-data.mongodb.js /docker-entrypoint-initdb.d/02-seed-data.js
