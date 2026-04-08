FROM postgres:16-alpine

ENV POSTGRES_DB=CalendarioLaboral
ENV POSTGRES_USER=postgres
ENV POSTGRES_PASSWORD=1234

COPY init /docker-entrypoint-initdb.d/
