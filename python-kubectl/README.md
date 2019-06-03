# Voting App deployed with raw Kubernetes manifests

This example shows how to leverage [Okteto](https://okteto.com) to develop a python app directly in the cloud.
This example is deployed using raw Kubernetes manifests.

## Step 1: Install the Okteto CLI

Install the Okteto CLI by running the following command in your local terminal:

MacOS:

```console
$ brew tap okteto/cli
$ brew install okteto
```

Linux:

```console
$ curl https://get.okteto.com -sSfL | sh
```

Windows:

```console
$ wget https://downloads.okteto.com/cli/okteto-Windows-x86_64 -OutFile c:\windows\system32\okteto.exe
```

If you want to use your own Kubernetes cluster, jump to Step 4.

## Step 2: Login from the Okteto CLI

```console
$ okteto login
```

The `login` command will automatically create an account for you in [Okteto](https://cloud.okteto.com). It will also create `kubectl` credentials configured to work in our multi-tenant cluster. These credentials have network policies, quotas, pod security policies, admission webhooks, roles, role bindings and limit ranges to control what you can do in your Okteto namespaces.

## Step 3: Switch to Kubernetes namespace and context

```console
$ okteto namespace
```

The `namespace` command helps you easily switch between Kubernetes namespaces. If no namespace is provided, the command will switch to your Okteto personal namespace.


## Step 4: Deploy the sample app

Get a local version of the sample application by executing the following commands in your local terminal:

```console
git clone https://github.com/okteto/cloud-samples
cd cloud-samples/python-kubectl
```

You now have a functioning git repository that contains a simple python application and a `requirements.txt`, which is used by Python’s dependency manager, `pip`.

In the `manifest/` directory you also have raw Kubernetes manifests that we will use in this guide to deploy the application in the cluster. Okteto works however independently of your common deployment practices or tools.

> If you don´t have `kubectl` installed, follow this [guide](https://kubernetes.io/docs/tasks/tools/install-kubectl/).

Run the voting app by executing:

```console
kubectl apply -f manifests
```

> Wait for one or two minutes until the application is running. If you are using the Okteto cluster, you can access the app at https://vote-[githubid].cloud.okteto.net. If not, it will be available at https://localhost:8080.


## Step 5: Create your Okteto Environment

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
    Name:     vote

 * Serving Flask app "app" (lazy loading)
 * Environment: production
   WARNING: Do not use the development server in a production environment.
   Use a production WSGI server instead.
 * Debug mode: on
 * Running on http://0.0.0.0:8080/ (Press CTRL+C to quit)
 * Restarting with stat
 * Debugger is active!
 * Debugger PIN: 899-835-619
 ```

## Step 6: Develop directly in the cloud

Now things get more exciting. Open `vote/app.py` in your favorite local IDE and modify the `getOptions` function with the following code, and save your file:

```python
def getOptions():
    optionA = 'Otters'
    optionB = 'Dogs'
    return optionA, optionB
```

Go back to the terminal and notice that flask already detected the code changes and reloaded your application.

```console
...
 * Detected change in '/src/app.py', reloading
 * Restarting with stat
 * Debugger is active!
 * Debugger PIN: 778-756-428
```

Go back to the browser, and reload the page. Notice how your changes are instantly applied. No commit, build or push required 😎! 


## Step 7: Cleanup

Cancel the `okteto up` command by pressing `ctrl + c` and run the following commands to remove the resources created by this guide: 

```console
kubectl delete -f manifests
```
