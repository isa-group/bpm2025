# stage 1: build the app
FROM eclipse-temurin:21-jdk-jammy AS builder

WORKDIR /app

COPY . .

RUN chmod +x mvnw

RUN ./mvnw clean package -DskipTests

# Use an official Java 21 runtime as a parent image
FROM eclipse-temurin:21-jre-jammy

# Set the working directory in the container
WORKDIR /app

# Copy the project’s jar file into the container
COPY --from=builder /app/target/Springsecurity-1.0-SNAPSHOT.jar app.jar

# Expose port 8080
EXPOSE 8080

# Run the jar file with the Docker profile
ENTRYPOINT ["java", "-jar", "app.jar", "--spring.profiles.active=docker"]
