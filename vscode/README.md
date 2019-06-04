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
wget https://downloads.okteto.com/cli/okteto-Windows-x86_64 -OutFile c:\windows\system32\okteto.exe
```

This example works in any Kubernetes cluster (Okteto reads your local Kubernetes credentials), but we recommend to use https://cloud.okteto.com to follow this guide.


## Step 2: Deploy the Voting App

Clone this repository and move to this example folder.

```console
git clone https://github.com/okteto/samples
cd samples/vscode
```

Run the Voting App by executing:

```console
kubectl apply -f manifests
```

Wait for one or two minutes until the application is running. You can access it at https://localhost:8080.

## Step 3: Develop as a Cloud Native Developer

Now start your Okteto Environment by running the following command:

```console
okteto up
```

The `okteto up` command will automatically start an Okteto Environment. It will also start a file synchronization service to keep your changes up to date between your local filesystem and your Okteto Environment. Last but least, it exposes the container port 22 to localhost:22000 to integrate with VS Code Remote SSH Development.

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

## Step 5: Cleanup

Cancel the `okteto up` command by pressing `ctrl + c` and run the following commands to remove the resources created by this guide: 

```console
kubectl delete -f manifests
```
