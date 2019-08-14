# JIB sample application

This example shows how to leverage Okteto to develop a Java App directly in the cloud with JIB. The Java Sample App is deployed using raw Kubernetes manifests. It's based on [Baeldung's tutorial](https://www.baeldung.com/jib-dockerizing).

# Deploy
`kubectl apply -f manifest`


# Compile for dev mode
`gradle build`
`cp -r /okteto/out/classes/java/main/hello /okteto/build/classes/java/main`
then restart hello pod 

# Where is the application in the container filesystem?
Jib packages your Java application into the following paths on the image:

- /app/libs/ contains all the dependency artifacts
- /app/resources/ contains all the resource files
- /app/classes/ contains all the classes files

The contents of the extra directory (default src/main/jib) are placed relative to the container's root directory (/)
