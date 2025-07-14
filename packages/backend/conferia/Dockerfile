# Use an official OpenJDK runtime as a parent image
FROM openjdk:17-slim

# Set the working directory in the container
WORKDIR /app

# Copy the project’s jar file into the container
COPY target/Springsecurity-1.0-SNAPSHOT.jar app.jar

# Expose port 8080
EXPOSE 8080

# Run the jar file with the Docker profile
ENTRYPOINT ["java", "-jar", "app.jar", "--spring.profiles.active=docker"]