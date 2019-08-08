# Node + React Sample App

This example shows how to leverage [Okteto](https://okteto.com) to develop a Node + React Sample App directly in the cloud. The Node + React Sample App is deployed using raw Kubernetes manifests and exposes three services:

- A *React* based front-end, using [webpack](https://webpack.js.org) as bundler and *hot-reload server* for development.
- A very simple Node.js API using [Express](https://expressjs.com).
- A [MongoDB](https://www.mongodb.com) database.

Okteto works in any Kubernetes cluster by reading your local Kubernetes credentials. For a empowered experience, follow this [guide](https://okteto.com/docs/samples/node/) to deploy the Node + React Sample App in [Okteto Cloud](https://cloud.okteto.com), a free-trial Kubernetes cluster.


## Step 1: Install the Okteto CLI

Install the Okteto CLI by following our [installation guides](https://github.com/okteto/okteto/blob/master/docs/installation.md).


## Step 2: Create your Okteto Environments

Clone the samples repository:

```console
$ git clone https://github.com/okteto/samples
$ cd samples/node
```

In the `manifest/` directory you also have raw Kubernetes manifests that we will use in this guide to deploy the application in the cluster. Okteto works however independently of your common deployment practices or tools.

> If you don't have `kubectl` installed, follow this [guide](https://kubernetes.io/docs/tasks/tools/install-kubectl/).

Run the Movies app by executing:

```console
$ kubectl apply -f manifests
deployment.apps "movies-api" created
service "movies-api" created
deployment.apps "movies-frontend" created
service "movies-frontend" created
service "mongo" created
statefulset.apps "mongo" created
```

### Step 3: Create your Okteto Environment for the frontend

Move to the movies front-end code directory:

```console
$ cd frontend
```

From the frontend's root directory, launch the following command:

```console
$ okteto up
 ✓  Okteto Environment activated
 ✓  Files synchronized
 ✓  Your Okteto Environment is ready
    Namespace: cindy
    Name:      movies-frontend
    Forward:   8080 -> 8080

root@movies-frontend-8c8997bd6-h5rq5:/src#
```

The `okteto up` command will automatically start an Okteto Environment. It will also start a *file synchronization service* to keep your changes up to date between your local filesystem and your Okteto Environment, without rebuilding containers (eliminating the docker build/push/pull/redeploy cycle).

Once the Okteto Environment is ready, the Okteto Terminal will automatically open. Use it to run your frontend with the same flow you would have locally:

```console
okteto> yarn start
```

This will compile and run webpack-dev-server listening on port 8080.

The frontend of your application is now ready and in development mode. You can access it at http://localhost:8080.

## Step 4: Develop directly in the cloud

Now things get even more exciting. You can now develop *directly in the cluster*. The API service and database will be available at all times. No need to mock services nor use any kind of redirection.
 
In your IDE edit the file `frontend/src/App.jsx` and change the `Okteflix` text in line 92 to `Netflix`. Save your changes.

Go back to the browser, and cool! Your changes are automatically live with no need to refresh your browser. Everything happened in the cluster but no commit or push was required 😎!

<p align="center"><img src="frontend/static/okteflix.gif" width="650" /></p>

## Step 5: Cleanup

Cancel the `okteto up` command by pressing `ctrl + c` + `exit` and run the following commands to remove the resources created by this guide: 

```console
$ okteto down -v
 ✓  Okteto Environment deactivated
 
```


```console
$ kubectl delete -f ../manifests
deployment.apps "movies-api" deleted
service "movies-api" deleted
deployment.apps "movies-frontend" deleted
service "movies-frontend" deleted
service "mongo" deleted
statefulset.apps "mongo" deleted
```