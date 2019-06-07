# Golang Sample App

This example shows how to leverage [Okteto](https://okteto.com) to develop a Golang Sample App directly in the cloud. The Golang Sample App is deployed using raw Kubernetes manifests.

Okteto works in any Kubernetes cluster by reading your local Kubernetes credentials. For a empowered experience, follow this [guide](https://okteto.com/docs/samples/golang/) to deploy the Golang Sample App in our Free Trial Okteto Kubernetes Cluster](https://cloud.okteto.com).

## Step 1: Install the Okteto CLI

Install the Okteto CLI by following our [installation guides](https://github.com/okteto/okteto/blob/master/docs/installation.md).

## Step 2: Deploy the Golang Sample App

Get a local version of the Golang Sample App by executing the following commands in your local terminal:

```console
$ git clone https://github.com/okteto/samples
$ cd samples/golang
```

In the `manifest/` directory you also have raw Kubernetes manifests that we will use in this guide to deploy the application in the cluster. Okteto works however independently of your common deployment practices or tools.

> If you don't have `kubectl` installed, follow this [guide](https://kubernetes.io/docs/tasks/tools/install-kubectl/).

Run the Golang Sample App by executing:

```console
$ kubectl apply -f manifests
deployment.apps "math" created
service "math" created
```

## Step 3: Create your Okteto Environment

With the app deployed, you can start your Okteto Environment by running the following command:

```console
$ okteto up
 ✓  Okteto Environment activated
 ✓  Files synchronized
 ✓  Your Okteto Environment is ready
    Namespace: cindy
    Name:      math
    Forward:   8080 -> 8080

okteto>
```

The `okteto up` command will automatically start an Okteto Environment. It will also start a file synchronization service to keep your changes up to date between your local filesystem and your Okteto Environment.

Once the Okteto Environment is ready, start your application by executing the following command in your Okteto Terminal:

```console
okteto> go run main.go
Starting beego server...
2019/06/07 08:37:41.155 [I] [asm_amd64.s:1333]  http server Running on http://:8080
```

You can now access the Golang Sample App at http://localhost:8080/mult/3/4.

## Step 4: Develop directly in the cloud

Now things get more exciting. Edit the file `main.go` and switch the word `mult` by `times` at line 43. Save your changes. Cancel the execution of `go run main.go` from your Okteto Terminal by pressing `ctrl + c`. Run your tests to check that everything is fine with your changes:

```console
okteto> go test ./...
```

And finally rerun your application:

```console
okteto> go run main.go
```

Go back to the browser, and go to the new endpoint http://localhost:8080/times/3/4. Notice how your changes are instantly applied. No commit, build or push required 😎! 


## Step 5: Cleanup

Cancel the `okteto up` command by pressing `ctrl + c` + `exit` and run the following commands to remove the resources created by this guide: 

```console
kubectl delete -f manifests
deployment.apps "math" deleted
service "math" deleted
```
