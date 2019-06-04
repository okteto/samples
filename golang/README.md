# Golang Sample App

This example shows how to leverage [Okteto](https://okteto.com) to develop a Go application directly in the cloud.

This example is deployed using raw Kubernetes manifests.

## Step 1: Install the Okteto CLI

Install the Okteto CLI by running the following command in your local terminal:

MacOS/Linux:

```console
$ curl https://get.okteto.com -sSfL | sh
```

Windows:

```console
$ wget https://downloads.okteto.com/cli/okteto-Windows-x86_64 -OutFile c:\windows\system32\okteto.exe
```

This example works in any Kubernetes cluster (Okteto reads your local Kubernetes credentials), but we recommend to use https://cloud.okteto.com to follow this guide.

## Step 2: Deploy the sample app

Get a local version of the golang sample application by executing the following commands in your local terminal:

```console
git clone https://github.com/okteto/samples
cd samples/golang
```

In the `manifest/` directory you also have raw Kubernetes manifests that we will use in this guide to deploy the application in the cluster. Okteto works however independently of your common deployment practices or tools.

> If you don't have `kubectl` installed, follow this [guide](https://kubernetes.io/docs/tasks/tools/install-kubectl/).

Run the Math app by executing:

```console
kubectl apply -f manifests
```

> Wait for one or two minutes until the application is running. You can access the Math app at https://localhost:8080/mult/3/4.


## Step 3: Create your Okteto Environment

Now start your Okteto Environment by running the following command:

```console
okteto up
```

The `okteto up` command will automatically start an Okteto Environment. It will also start a file synchronization service to keep your changes up to date between your local filesystem and your Okteto Environment.

```console
$ okteto up
 ✓  Okteto Environment activated
 ✓  Files synchronized
 ✓  Your Okteto Environment is ready
    Name:     math

okteto>
```

Once the Okteto Environment is ready, start your application by executing the following command in your Okteto Terminal:

```console
okteto> go run main.go
```

## Step 4: Develop directly in the cloud

Now things get more exciting. Edit the file `main.go` and switch the word `mult` by `times` at line 43. Save your changes. Cancel the execution of `go run main.go` from your Okteto Terminal by pressing `ctrl + c`. Run your tests to check that everything is fine with your changes:

```console
okteto> go test ./...
```

And finally rerun your application:

```console
okteto> go run main.go
```

Go back to the browser, and go to the new endpoint https://localhost:8080/times/3/4. Notice how your changes are instantly applied. No commit, build or push required 😎! 


## Step 5: Cleanup

Cancel the `okteto up` command by pressing `ctrl + c` + `exit` and run the following commands to remove the resources created by this guide: 

```console
kubectl delete -f manifests
```
