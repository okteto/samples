# Helm: Voting App

This example shows how to leverage [Okteto](https://okteto.com) to develop the Voting App directly in the cloud. The Voting App is deployed using raw Kubernetes manifests.

Okteto works in any Kubernetes cluster by reading your local Kubernetes credentials. 

## Step 1: Install the Okteto CLI

Install the Okteto CLI by following our [installation guides](https://github.com/okteto/okteto/blob/master/docs/installation.md).


## Step 2: Deploy the chart

Clone the repository and go to the `helm` folder:

```console
git clone https://github.com/okteto/samples
cd samples/helm
```

Deploy the Voting chart using the following command:
```console
helm install --name vote ./chart/vote
```

Wait for one or two minutes until the application is running. 

## Step 3: Create your Okteto Environment

With the app deployed, you can start your Okteto Environment by running the following command:

```console
$ okteto up
 ✓  Okteto Environment activated
 ✓  Files synchronized
 ✓  Your Okteto Environment is ready
    Namespace: cindy
    Name:      vote
    Forward:   8080 -> 8080
    
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

The `okteto up` command will automatically start an Okteto Environment. It will also start a file synchronization service to keep your changes up to date between your local filesystem and your Okteto Environment.


You can now access the Voting App at http://localhost:8080.

## Step 4: Develop directly in the cloud

Now things get more exciting. Open `app.py` in your favorite local IDE and modify the `getOptions` function with the following code, and save your file:

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


## Step 5: Cleanup

Cancel the `okteto up` command by pressing `ctrl + c` and run the following command to  remove the resources created by this guide: 

```console
helm delete --purge vote
```




