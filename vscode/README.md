# VS Code Remote Development with Kubernetes

This example shows how to leverage [Okteto](https://github.com/okteto/okteto) to develop a Python Sample App directly in the cloud using VS Code Remote Development. The Python Sample App is deployed using raw Kubernetes manifests.

Okteto works in any Kubernetes cluster by reading your local Kubernetes credentials. For a empowered experience, follow this [blog post](https://medium.com/okteto/vs-code-remote-development-in-kubernetes-d7eef7cea4fd) to deploy the Python Sample App in [Okteto Cloud](https://cloud.okteto.com), a free-trial Kubernetes cluster.

## Step 1: Install the Okteto CLI

Install the Okteto CLI by following our [installation guides](https://github.com/okteto/okteto/blob/master/docs/installation.md).

## Step 2: Deploy the Voting App

Clone this repository and move to this example folder.

```console
$ git clone https://github.com/okteto/samples
$ cd samples/vscode
```

Run the Voting App by executing:

```console
$ kubectl apply -f manifests
deployment.apps "vote" created
service "vote" created
```

Wait for one or two minutes until the application is running. You can access it at http://localhost:8080.

## Step 3: Develop as a Cloud Native Developer

Now start your Okteto Environment by running the following command:

```console
$ okteto up --remote 22000
 ✓  Okteto Environment activated
 ✓  Files synchronized
 ✓  Your Okteto Environment is ready
    Namespace: pchico83
    Name:      vote
    Forward:   8080 -> 8080
               22000 -> 22001

```

The `okteto up` command will automatically start an Okteto Environment. It will also start a file synchronization service to keep your changes up to date between your local filesystem and your Okteto Environment. Last but least, it exposes a container ssh port to localhost:22000 to integrate with VS Code Remote SSH Development.

Everything is ready now to set up your VS Code Remote SSH extension to point to `localhost:22000` (follow this [link](https://code.visualstudio.com/docs/remote/ssh#_connect-to-a-remote-host) if you are not familiar with this process). In order to indicate the remote server in VS Code, write `-p 22000 root@localhost` as the Remote Host.

From VS Code, open the remote folder `/src`, then open a terminal and execute the following command:

```console
$ python app.py
 * Serving Flask app "app" (lazy loading)
 * Debug mode: on
 * Running on http://0.0.0.0:8080/ (Press CTRL+C to quit)
 * Restarting with stat
 * Debugger is active!
 * Debugger PIN: 117-959-944
 ```

This command will start the python service on your remote development environment. You can verify that everything is up and running by going to your service's endpoint at https://localhost:8080.

Now let's make a code change. Open `app.py` in VS Code and modify the `getOptions` function with the code below:

```
def getOptions():
    optionA = 'Otters'
    optionB = 'Dogs'
    return optionA, optionB
```

Go to the browser again and reload the page. Your changes were applied instantly. No commit, build or push required 😎! And what is even more awesome, enjoy all the VS Code features and extensions, but run everything remotely in a production-like environment!

> We recommend to keep Git extensions locally. This way they use your local keys and you don´t need to install them remotely.

## Step 4: Cleanup

Cancel the `okteto up` command by pressing `ctrl + c` and run the following commands to remove the resources created by this guide: 

```console
$ okteto down -v
 ✓  Okteto Environment deactivated
 
```

```console
$ kubectl delete -f manifests
deployment.apps "vote" deleted
service "vote" deleted
```
