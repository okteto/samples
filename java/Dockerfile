FROM gradle:5.1-jdk11 as builder

RUN mkdir -p /home/gradle/src
COPY --chown=gradle:gradle build.gradle /home/gradle
COPY --chown=gradle:gradle src /home/gradle/src
WORKDIR /home/gradle
RUN gradle build

FROM openjdk:11-jre-slim
EXPOSE 8080
WORKDIR /app
COPY --from=builder /home/gradle/build/libs/*.jar .
CMD java -jar *.jar