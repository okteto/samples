# Voting App deployed with raw Kubernetes manifests

This example shows how to leverage [Okteto](https://cloud.okteto.com) to develop a python app directly in the cloud.
This example is deployed using raw Kubernetes manifests.

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
cd cloud-samples/python-kubectl
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
cd vote
okteto up
```

The `okteto up` command will automatically start an Okteto Environment. It will also start a file synchronization service to keep your changes up to date between your local filesystem and your Okteto Environment.

Now things get more exciting. Open `vote/app.py` in your favorite local IDE and modify the `getOptions` function with the following code, and save your file:

```python
def getOptions():
    optionA = 'Otters'
    optionB = 'Dogs'
    return optionA, optionB
```

Go back to the Okteto Terminal and notice that flask already detected the code changes and reloaded your application.

```console
...
 * Detected change in '/src/app.py', reloading
 * Restarting with stat
 * Debugger is active!
 * Debugger PIN: 778-756-428
```

Go back to the browser, and reload the page. Notice how your changes are instantly applied. No commit, build or push required 😎! 

## Step 5: Cleanup

Cancel the `okteto up` command by pressing `ctrl + c` and run the following commands to remove the resources created by this guide: 

```console
cd ..
kubectl delete -f manifests
```

## Conclusions

We have shown how easy is to deploy Kubernetes applications in Okteto, and how to use Okteto to do efficient development in the cloud. And what it is even more awesome, is that you have been able to efficiently develop a Kubernetes-based application without typing a single `docker` or `kubectl` command, thanks to the power of Okteto! You don´t even need to install Docker o Minikube in your laptop!
