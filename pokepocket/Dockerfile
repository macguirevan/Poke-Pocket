# Use a base image with OpenJDK
FROM openjdk:17-jdk-slim as build

# Set the working directory inside the container
WORKDIR /app

# Copy the Maven build file (or Gradle build file) and the source code
COPY . .

# Build the application (assuming you're using Maven, change to Gradle if applicable)
RUN ./mvnw clean package -DskipTests

# Run the Spring Boot application
ENTRYPOINT ["java", "-jar", "target/poke-pocket.jar"]
