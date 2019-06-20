# Django + Celery Sample App

This example shows how to leverage [Okteto](https://okteto.com) to develop a Django + Celery Sample App directly in Kubernetes. The Django + Celery Sample App is deployed using raw Kubernetes manifests.

Okteto works in any Kubernetes cluster (local or remote) by reading your local Kubernetes credentials.

## Step 1: Install the Okteto CLI

Install the Okteto CLI by following our [installation guides](https://github.com/okteto/okteto/blob/master/docs/installation.md).


## Step 2: Django + Celery Sample App

Clone the repository and go to the java-kubectl folder.

```console
git clone https://github.com/okteto/samples
cd samples/django
```

Deploy the Django + Celery Sample App by using the following command:
```console
kubectl apply -f manifests
statefulset.apps "cache" created
service "cache" created
statefulset.apps "db" created
service "db" created
statefulset.apps "queue" created
service "queue" created
deployment.apps "web" created
service "web" created
deployment.apps "worker" created
```

Check that all pods are running ok. Now you can access you app, the easiest way is to execute:

```
kubectl port-forward $(kubectl get pod -l app=web -o jsonpath="{.items[0].metadata.name}") 8080:8080
```

and access http://localhost:8080/jobs/.

## Step 3: Create your Okteto Environment

In order to activate your Cloud Native Development, execute:

```console
okteto up
 ✓  Files synchronized
 ✓  Okteto Environment activated
    Namespace: pchico83
    Name:      shell

root@shell-f6f5d9d5d-kd5qb:/okteto# 
```

The `okteto up` command will start a remote development environment that automatically synchronizes and applies your code changes without rebuilding containers (eliminating the **docker build/push/pull/redeploy** cycle). 

Verify that everything is up and running by executing:

```console
curl web:8080/jobs/ | python -m json.tool
```

Note that your web app is accessible via *web*. This is because everything is running inside kubernetes.

## Step 4: Develop directly in the cloud

If your place a `fibonacci` operation for the argument 5, and check the result in https://web-pchico83.cloud.okteto.net/jobs/1/ you will notice that the result is wrong. Edit the file `myproject/myproject/models.py` in line 29 and modify the code:

```
task = TASK_MAPPING['power']
```

by 

```
task = TASK_MAPPING[self.type]
```

Place a new `fibonacci` operation for the argument 5 and the result is now right.

Your changes were automatically applied, no commit, build or push required 💪! 

## Step 5: Cleanup

Cancel the `okteto up` command by pressing `ctrl + c` and run the following command to remove the resources created by this guide: 

```console
okteto down -v
 ✓  Okteto Environment deactivated

```
 and finally:

```console
kubectl delete -f manifests
statefulset.apps "cache" deleted
service "cache" deleted
statefulset.apps "db" deleted
service "db" deleted
statefulset.apps "queue" deleted
service "queue" deleted
deployment.apps "web" deleted
service "web" deleted
deployment.apps "worker" deleted
```
