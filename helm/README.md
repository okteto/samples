# Voting App

Example helm + python app

A simple helm chart that deploys a Python app (using Flask) to demo the power of [okteto](https:/okteto.com).

This example works in any Kubernetes cluster. Cloud Native Development provides more value in remote Kubernetes clusters, but in order to make it simple to follow this guide, we recommend to use Docker for Mac (with Kubernetes support) or [minikube](https://github.com/kubernetes/minikube). 

For this example you also need to have helm installed and configured in your cluster. 


## Deploy the chart

Clone the repository and go to the python-helm folder.

```console
git clone https://github.com/okteto/samples
cd samples/helm
```

Deploy the Voting chart using the following command:
```console
helm install --name vote ./chart/vote
```

Wait for one or two minutes until the application is running. 

## Develop as a Cloud Native Developer

In order to activate your Cloud Native Development, execute:

```console
okteto up
```

The `okteto up` command will start a remote development environment that automatically synchronizes and applies your code changes without rebuilding containers (eliminating the **docker build/push/pull/redeploy** cycle).

Edit the file `vote/app.py` and change the `option_a` in line 8 from "Cats" to "Otters". Save your changes.

Finally, refresh the Voting App UI, and cool! your code changes are live!

## Cleanup

Cancel the `okteto up` command by pressing `ctrl + c` and run the following command to  remove the resources created by this guide: 

```console
helm delete --purge vote
```




