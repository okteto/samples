# Voting App

This example shows how to leverage [Okteto](https://okteto.com) to develop a python app directly in the cloud.

This example is deployed using Helm.


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




