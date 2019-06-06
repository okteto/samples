FROM gradle:5.1-jdk11 as builder
USER gradle
WORKDIR /home/gradle
COPY --chown=gradle:gradle . .
RUN gradle build

FROM openjdk:11-jre-slim
RUN useradd -u 1000 gradle
USER gradle
EXPOSE 8080
WORKDIR /app
COPY --from=builder /home/gradle/build/libs/*.jar .
CMD java -jar *.jar