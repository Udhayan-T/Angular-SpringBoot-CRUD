FROM java:8 -jre
ENV MYSQL_DATABASE=AuthenticationServiceDB
ENV MYSQL_USER=root
ENV MYSQL_PASSWORD=root
ENV MYSQL_CI_URL=jdbc:mysql://localhost:3306/AuthenticationServiceDB
ADD ./target/UserAuthentication-Service-0.0.1-SNAPSHOT.jar UserAuthentication-Service-0.0.1-SNAPSHOT.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", UserAuthentication-Service-0.0.1-SNAPSHOT.jar]
