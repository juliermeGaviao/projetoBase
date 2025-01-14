FROM docker.io/library/maven:latest AS builder

WORKDIR /usr/src/mymaven

## Copia o pom.xml e o diretório src primeiro para aproveitar o cache do Docker
COPY backend/pom.xml .
COPY backend/src ./src

# Executa o Maven para compilar o projeto
RUN mvn clean package -DskipTests

FROM registry.access.redhat.com/ubi9/openjdk-21:latest

# Copia o JAR gerado para o local correto
COPY --from=builder /usr/src/mymaven/target/base.jar /deployments/
