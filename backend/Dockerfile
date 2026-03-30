# syntax=docker/dockerfile:1.7

FROM eclipse-temurin:21-jdk-jammy AS builder
WORKDIR /app

COPY gradlew gradlew.bat build.gradle.kts settings.gradle.kts ./
COPY gradle ./gradle
RUN chmod +x gradlew

COPY src ./src
RUN --mount=type=cache,target=/root/.gradle ./gradlew bootJar --no-daemon

FROM eclipse-temurin:21-jre-jammy AS runner
WORKDIR /app
ENV SPRING_PROFILES_ACTIVE=prod

RUN useradd --create-home --shell /usr/sbin/nologin spring

COPY --from=builder /app/build/libs/*.jar app.jar

USER spring
EXPOSE 8080

ENTRYPOINT ["java", "-jar", "/app/app.jar"]
