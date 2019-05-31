# VS Code Remote Development with Kubernetes

This example shows how to leverage [Okteto](https://okteto.com) to develop a python app directly in the cloud using VS Code Remote Development.

## Step 1: Install the Okteto CLI

Install the Okteto CLI by running the following command in your local terminal:

MacOS/Linux

```console
curl https://get.okteto.com -sSfL | sh
```

Windows

```console
wget https://downloads.okteto.com/cloud/cli/okteto-Windows-x86_64 -OutFile c:\windows\system32\okteto.exe
```

## Step 2: Login from the Okteto CLI

```console
$ okteto login
```

This command will give you an Okteto Space, where you can create Okteto Environments to code and collaborate.
Under the hood, an Okteto Space is mapped to a Kubernetes Namespace.

## Step 3: Configure kubectl to point to Okteto

> If you don´t have `kubectl` installed, follow this [guide](https://kubernetes.io/docs/tasks/tools/install-kubectl/).

Okteto gives you `kubectl` credentials configured to work in our multi-tenant cluster. These credentials have network policies, quotas, pod security policies, admission webhooks, roles, role bindings and limit ranges to control what you can do in your Okteto Space. In order to download the credentials, execute:

```console
$ okteto kubeconfig
 ✓  Kubeconfig stored at $HOME/.okteto/.kubeconfig
 i  Configure kubectl to work on your Okteto Space by running:
    export KUBECONFIG=$HOME/.okteto/.kubeconfig
```

and now execute:

```console
$ export KUBECONFIG=$HOME/.okteto/.kubeconfig
```

## Step 4: Deploy the Voting App

Clone this repository and move to this example folder.

```console
git clone https://github.com/okteto/cloud-samples
cd cloud-samples/vscode-ssh
```

Edit the file `manifests\ingress.yaml` and substitute `cindy` by your Github ID in lines 9 and 18.

> Okteto only let you create ingress rules for domains ending in `-[githubid].cloud.okteto.net`.

Save and run the Voting App by executing:

```console
kubectl apply -f manifests
```

Wait for one or two minutes until the application is running. You can access it at https://vote-[githubid].cloud.okteto.net.

## Step 5: Develop as a Cloud Native Developer

Now start your Okteto Environment by running the following command:

```console
okteto up
```

The `okteto up` command will automatically start an Okteto Environment. It will also start a file synchronization service to keep your changes up to date between your local filesystem and your Okteto Environment. Last but least, it exposes the container port 22 to localhost:22000 to integrate with VS Code Remote SSH Development.

Everything is ready now to set up your VS Code Remote SSH extension to point to `localhost:22000` (follow this [link](https://code.visualstudio.com/docs/remote/ssh#_connect-to-a-remote-host) if you are not familiar with this process). In order to indicate the remote server in VS Code, write `-p 22000 root@localhost` as the Remote Host.

From VS Code, open the remote folder `/usr/src/app`, then open a terminal and execute the following command:

```console
$ python app.py
 * Serving Flask app "app" (lazy loading)
 * Debug mode: on
 * Running on http://0.0.0.0:8080/ (Press CTRL+C to quit)
 * Restarting with stat
 * Debugger is active!
 * Debugger PIN: 117-959-944
 ```

This command will start the python service on your remote development environment. You can verify that everything is up and running by going to your service's endpoint at https://vote-[githubid].cloud.okteto.net.

Now let's make a code change. Open `app.py` in VS Code and modify the `getOptions` function with the code below:

```
def getOptions():
    optionA = 'Otters'
    optionB = 'Dogs'
    return optionA, optionB
```

Go to the browser again and reload the page. Your changes were applied instantly. No commit, build or push required 😎! And what is even more awesome, enjoy all the VS Code features and extensions, but run everything remotely in a production-like environment!

> We recommend to keep Git extensions locally. This way they use your local keys and you don´t need to install them remotely.

## Conclusions

We explained the advantages of developing directly in Kubernetes while keeping the same developer experience than working on a local machine. Working on the Cloud is always better. You don't work on your spreadsheets and listen to media files locally, do you? Stop dealing with local environments and become a Cloud Native Developer today 😎!

> Interested in improving your Kubernetes and Docker development workflows? [Contact us](mailto:sales@okteto.com?Subject=Improve%20my%20development%20workflow) to see how to install our platform in your own infrastructure.
