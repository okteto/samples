# Node + React Sample App

This example shows how to leverage [Okteto](https://okteto.com) to develop a Node + React Sample App directly in the cloud. The Node + React Sample App is deployed using raw Kubernetes manifests and exposes three services:

- A *React* based front-end, using [webpack](https://webpack.js.org) as bundler and *hot-reload server* for development.
- A very simple Node.js API using [Express](https://expressjs.com).
- A [MongoDB](https://www.mongodb.com) database.

Okteto works in any Kubernetes cluster by reading your local Kubernetes credentials. For a empowered experience, follow this [guide](https://okteto.com/docs/samples/node/) to deploy the Node + React Sample App in our [Free Trial Okteto Enterprise](https://cloud.okteto.com) offering.


## Step 1: Install the Okteto CLI

Install the Okteto CLI by following our [installation guides](https://github.com/okteto/okteto/blob/master/docs/installation.md).


## Step 2: Create your Okteto Environments

Clone the samples repository:

```console
$ git clone https://github.com/okteto/samples
```

Now that you have the application code in your local machine, let's create Okteto Environments to run the application directly in the cluster.

### Step 3.1: Launch front-end environment

Move to the movies front-end code directory:

```console
$ cd samples/node/frontend
```

From the frontend's root directory, launch the following command:

```console
$ okteto up
```

The `okteto up` command will automatically start an Okteto Environment. It will also start a *file synchronization service* to keep your changes up to date between your local filesystem and your Okteto Environment, without rebuilding containers (eliminating the docker build/push/pull/redeploy cycle).

```
$ okteto up
 ✓  Okteto Environment activated
 ✓  Files synchronized
 ✓  Your Okteto Environment is ready
    Name:     movies-frontend
```

Once the Okteto Environment is ready, the Okteto Terminal will automatically open. Use it to run your frontend with the same flow you would have locally:

```console
okteto> yarn start
```

The frontend of your application is now ready to be tested. You can check it by browsing the application's endpoint (see console output). 

> Note that Okteto creates a public HTTPS endpoint forwarding to the port 8080 of your application.

<p align="center"><img src="frontend/static/movies-frontend.jpg" width="550" /></p>

### Step 3.2: Launch API environment

You may have noticed that the app is missing information and there are errors in your browser's console. The frontend depends on an API and a database to retrieve the movies data. 

The API uses a MongoDB database. You can simply deploy a MongoDB database into your Okteto Space by running the following command in a **new terminal** :

```console
$ okteto database mongo
```

Now we need the API service for the frontend to connect to. Open a new terminal, go to the API's source directory, and run the Okteto CLI again to create a second environment:

```console
$ cd samples/movies/api
$ okteto run okteto/movies:api
```

This command deploys the API express server in your Okteto Space.

Go back to your browser and refresh the page. You'll see how the front-end is now populated with all the movies information.

Congratulations, you just deployed your first multi-service application using Okteto 🚀! 

## Step 3: Develop directly in the cloud

Now things get even more exciting. You can now develop *directly in the cluster*. The API service and database will be available at all times. No need to mock services nor use any kind of redirection.
 
In your IDE edit the file `frontend/src/App.jsx` and change the `Okteflix` text in line 92 to `Netflix`. Save your changes.

Go back to the browser, and cool! Your changes are automatically live with no need to refresh your browser. Everything happened in the cluster but no commit or push was required 😎!

<p align="center"><img src="frontend/static/okteflix.gif" width="650" /></p>

## Step 4: Deploy your application

Now that you are happy with your changes, it is time to deploy them.

Press `ctrl + c` and `ctrl + d` to go back to your local terminal at the `frontend` folder, and execute:

```console
$ okteto run okteto/movies:frontend
```

This command replaces your Okteto Environment by a service running `okteto/movies:frontend`. If you want to use another docker image, you will need to build and push it to a public docker registry. (*[Contact us](mailto:sales@okteto.com?Subject=Support%20for%20private%20images)  if you're interested in support for private images*).
