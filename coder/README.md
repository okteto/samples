# Coder.com with Kubernetes

This example shows how to leverage [Okteto](https://okteto.com) to develop a Python Sample App directly in the cloud using [Coder](https://coder.com/). The Python Sample App is deployed using raw Kubernetes manifests.

Okteto works in any Kubernetes cluster by reading your local Kubernetes credentials. For a empowering experience, follow this [blog post](https://medium.com/okteto/run-coder-directly-in-kubernetes-696a53dc94de) to deploy the Python Sample App in our free-trial [Okteto Kubernetes Cluster](https://cloud.okteto.com).

## Step 1: Install the Okteto CLI

Install the Okteto CLI by following our [installation guides](https://github.com/okteto/okteto/blob/master/docs/installation.md).

## Step 2: Deploy the sample app

Get a local version of the sample application by executing the following commands in your local terminal:

```console
git clone https://github.com/okteto/samples
cd samples/coder
```

You now have a functioning git repository that contains a simple python application and a `requirements.txt`, which is used by Python’s dependency manager, `pip`.

In the `manifest/` directory you also have raw Kubernetes manifests that we will use in this guide to deploy the application in the cluster. Okteto works however independently of your common deployment practices or tools.

> If you don´t have `kubectl` installed, follow this [guide](https://kubernetes.io/docs/tasks/tools/install-kubectl/).

Run the Python Sample App by executing:

```console
kubectl apply -f manifests
service "redis" created
statefulset.apps "redis" created
deployment.apps "vote" created
service "vote" created
```

Wait for a few minutes until your application is ready.

## Step 3: Create your Okteto Environment

With the app deployed, you can start your Okteto Environment by running the following command:

```console
$ okteto up
 ✓  Okteto Environment activated
 ✓  Files synchronized
 ✓  Your Okteto Environment is ready
    Namespace: cindy
    Name:      vote
    Forward:   8443 -> 8443
    Forward:   8080 -> 8080
...    
INFO  code-server development
...
INFO  Connected to shared process
 ```

The `okteto up` command will automatically start an Okteto Environment. It will also start a file synchronization service to keep your changes up to date between your local filesystem and your Okteto Environment.

You can now access the Coder at http://localhost:8443.

## Step 4: Develop directly in the cloud

Go to http://localhost:8443 and your Coder IDE will be ready! Open `app.py` and modify the `getOptions` function to vote between *Local* and *Cloud*. Save your changes and execute `python3 app.py`from your Coder Terminal.

Go back to the application endpoint and yes, your changes are instantly applied! No commit, build or push required 😎! Keep editing your files and enjoy all the Coder features and VS Code extensions, but run everything remotely in a production-like environment!

## Step 5: Cleanup

Cancel the `okteto up` command by pressing `ctrl + c` and run the following commands to remove the resources created by this guide: 

```console
okteto down -v
 ✓  Okteto Environment deactivated
 
```

```console
kubectl delete -f manifests
service "redis" deleted
statefulset.apps "redis" deleted
deployment.apps "vote" deleted
service "vote" deleted
```
