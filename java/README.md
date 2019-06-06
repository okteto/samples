# Java Sample App

This example shows how to leverage [Okteto](https://okteto.com) to develop a Java Sample App directly in the cloud. The Python Sample App is deployed using raw Kubernetes manifests. It's based on [Spring's gs-rest-service example](https://github.com/spring-guides/gs-rest-service).

Okteto works in any Kubernetes cluster by reading your local Kubernetes credentials. For a empowered experience, follow this [guide](https://okteto.com/docs/samples/java/) to deploy the Java Sample App in our [Free Trial Okteto Enterprise](https://cloud.okteto.com) offering.


## Step 1: Install the Okteto CLI

Install the Okteto CLI by following our [installation guides](https://github.com/okteto/okteto/blob/master/docs/installation.md).


## Deploy the payroll service

Clone the repository and go to the java-kubectl folder.

```console
git clone https://github.com/okteto/samples
cd samples/java
```

Deploy the Payroll application by using the following command:
```console
kubectl apply -f manifests
```

## Cloud native development

In order to activate your Cloud Native Development, execute:

```console
okteto up
```

The `okteto up` command will start a remote development environment that automatically synchronizes and applies your code changes without rebuilding containers (eliminating the **docker build/push/pull/redeploy** cycle). 

This development environment includes java dev tools (e.g. gradle) and it's configured to  automatically start the application by running `gradle bootRun`, configured to reload the process after a successful compilation.  It will also start forwarding port 8080 to your local machine.

Verify that everything is up and running by calling the `/employees` endpoint from your local machine:
```console
curl http://localhost:8080/employees
```

The response to a successful request is a list of employees:
```json
[
    {"id":1,"name":"Pablo Chico de Guzman"},{"id":2,"name":"Ramon Lamana"},
    {"id":3,"name":"Ramiro Berrelleza"},{"id":4,"name":"Cindy Lopez"}
]
```

You can also get a single employee by passing an employee ID:
```console
curl http://localhost:8080/employees/4
```
```json
{
    "id":4,
    "name":"Cindy Lopez"
}
```

 Time to write some code. Let's say that the company just hired employee #5, and you're tasked with adding her to the employee list. First, we'll check and see if someone else already took care of the work by calling the API:

 ```console
curl http://localhost:8080/employees/5
```
```json
{
    "timestamp":"2019-01-12T04:36:29.225+0000",
    "status":404,
    "error":"Not Found",
    "message":"employee not found",
    "path":"/employees/5"
}
```
 
 Alright, the new employee is not yet in the system. Open [payroll/src/main/java/payroll/PayrollController.java](payroll/src/main/java/payroll/PayrollController.java) with your favorite IDE. Add the new employee to the list (look around line 20) and save your changes.
 ```java
 ...
    this.employees.put(4, new Employee(4, "Cindy Lopez"));
    this.employees.put(5, new Employee(5, "Alexandra Greyson"));
...
 ```

Open a second terminal in the same folder, and compile your new code with the command below. This command will compile the code directly in the Okteto development, so we can benefit from the gradle's hot reloading capabilities:

```console
$ okteto exec -- gradle build
```

 Go back to your terminal and call API again:
```console
curl http://localhost:8080/employees/5
```
```json
{
    "id":5,
    "name":"Alexandra Greyson"
}
```

Your changes were automatically applied, no docker, kubectl or even a local jvm required 💪! 

*review [okteto's usage](https://okteto.com/docs/reference/cli) guide to see other commands available to help you speed you up your development.*

## Cleanup

Cancel the `okteto up` command by pressing `ctrl + c` and run the following command to remove the resources created by this guide: 

```console
kubectl delete -f manifests
```