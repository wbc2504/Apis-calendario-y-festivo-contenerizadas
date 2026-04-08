FROM maven:3.9.9-eclipse-temurin-17 AS build
WORKDIR /workspace

COPY pom.xml .
COPY aplicacion/pom.xml aplicacion/pom.xml
COPY core/pom.xml core/pom.xml
COPY dominio/pom.xml dominio/pom.xml
COPY infraestructura/pom.xml infraestructura/pom.xml
COPY presentacion/pom.xml presentacion/pom.xml

COPY aplicacion/src aplicacion/src
COPY core/src core/src
COPY dominio/src dominio/src
COPY infraestructura/src infraestructura/src
COPY presentacion/src presentacion/src

RUN mvn -q -pl presentacion -am clean package -DskipTests

FROM eclipse-temurin:17-jre
WORKDIR /app

ENV SERVER_PORT=8080
ENV SPRING_DATASOURCE_URL=jdbc:postgresql://postgres-db:5432/CalendarioLaboral
ENV SPRING_DATASOURCE_USERNAME=postgres
ENV SPRING_DATASOURCE_PASSWORD=1234
ENV EXPRESS_API_BASE_URL=http://express-api:3000
ENV EXPRESS_API_USUARIO=frayosorio
ENV EXPRESS_API_CLAVE=123

COPY --from=build /workspace/presentacion/target/presentacion-0.0.1-SNAPSHOT.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "/app/app.jar"]
