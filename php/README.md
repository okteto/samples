# PHP-FPM, Webpack and NGINX

This example shows how to leverage [Okteto](https://github.com/okteto/okteto) to develop a PHP-FPM + Webpack application fronted by an NGINX instance.

Okteto works in any Kubernetes cluster (local or remote) by reading your local Kubernetes credentials.

## Step 1: Install the Okteto CLI

Install the Okteto CLI by following our [installation guides](https://github.com/okteto/okteto/blob/master/docs/installation.md).


## Step 2: Launch the app

Clone the repository and go to the php folder.

```console
$ git clone https://github.com/okteto/samples
$ cd samples/php
```

The PHP-FPM + Webpack sample application consists of a php-fpm worker and an NGINX instance to serve Webpack-generate static files and proxy the PHP requests. 
Deploy the entire application by using the following command:

```console
$ kubectl apply -f manifests
configmap/nginx-config created
deployment.extensions/php created
service/php created
deployment.extensions/web created
service/web created
```

Check that all pods are ready. You can do it by running the command below:
```
$ kubectl get pod                                                                                      
NAME                   READY   STATUS    RESTARTS   AGE
php-84d6bd7955-cwnvf   1/1     Running   0          104s
web-6485689c6b-258m9   1/1     Running   0          47s
```

## Step 3: Create your Okteto Environment

In order to activate your Cloud Native Development, execute:

```console
$ okteto up
Deployment dev doesn't exist in namespace php-rberrelleza. Do you want to create a new one? [y/n]: y
 ✓  Files synchronized
 ✓  Development environment activated
    Namespace: php-rberrelleza
    Name:      dev

Welcome to your development environment. Happy coding!
okteto>
```

The `okteto up` command will start a remote development environment that automatically synchronizes and applies your code changes to the web and worker deployments without having to rebuild or redeploy (eliminating the **docker build/push/pull/redeploy** cycle). You can control how your development environment is created by modifying `okteto.yml`.

Since our application is formed of multiple services, we decided to configure `okteto.yml` to create a multi-service remote development environment:

```yaml
name: dev
image: okteto/dev:latest
command:
  - bash
services:
  - name: php
    mountpath: /usr/src/app
    subpath: app
  - name: web
    mountpath: /usr/share/nginx/html
    subpath: dist
persistentVolume:
  enabled: true
```

The `name`,`image`, and `command` keys will give Okteto information about your development environment, while the `services` list tells Okteto which other services you want to have as part of your development environment.

The `mountpath` and `subpath` keys in the `services` keys tells Okteto [where to mount your local folder](https://okteto.com/docs/reference/manifest/index.html#mountpath-string-optional) in your serivces.  [This page](https://okteto.com/docs/reference/manifest/index.html#services-object-optional) has more information about services, and all the values you can configure.

## Step 4: Install your dependencies

Since we are using a generic development environment (`okteto/dev:latest`), we'll have to install our dev dependencies (on a realistic scenario, we recommend that you extend our dev environments to already include them and save you time and effort).

Start by running `yarn install` in your development environment to install all the webpack dev dependencies:

```console
okteto> yarn install
yarn install v1.17.3
[1/4] Resolving packages...
...
Done in 0.62s
```

Now run `yarn dev` to tell webpack to generate all the static files (html and javascript in this case). The `yarn dev` command is configured to also start a watcher so that you keep it running and it will automatically rebuild the files as needed. 

```console
okteto> yarn dev
yarn run v1.17.3
$ webpack --config=webpack.config.dev.js

webpack is watching the files…

Hash: 49290a32868bd198995d
Version: webpack 4.39.3
Time: 721ms
Built at: 09/06/2019 7:11:58 PM
  Asset     Size  Chunks             Chunk Names
main.js  552 KiB    main  [emitted]  main
Entrypoint main = main.js
[./node_modules/webpack/buildin/global.js] (webpack)/buildin/global.js 472 bytes {main} [built]
[./node_modules/webpack/buildin/module.js] (webpack)/buildin/module.js 497 bytes {main} [built]
[./src/index.js] 307 bytes {main} [built]
    + 1 hidden module
```

To keep things simple, we'll use a port-forward to access the NGINX service directly via `localhost:80`. Open a local terminal and run the following `kubectl` command:

```console
kubectl port-forward svc/web 8080:80
```

Open http://localhost:8080/ in your browser and, if everything went right, you should see the following text: 'Hello webpack'.

## Step 5: Live coding

Now that we have a development environment running in Kubernetes, let's do some live coding. Fire up your favorite IDE, and open [./src/index.js](src/index.js). 

Replace line 7 with the following text:
```javascript
element.innerHTML = 'Hello okteto';
```
Go back to your browser and reload the page. Notice how the text changed to `Hello okteto`.

How did this happen? Well, with Okteto, your changes were automatically applied as soon as you saved them, no commit, build, push or redeploy required 💪!  

### API Love

Since we have a PHP backend running, why don't we give our API some ❤️ and connect everything together?

Go back to your IDE and replace the content of [./src/index.js](src/index.js) with the code below:

```javascript
function component() {  
    const element = document.createElement('div');
    var request = new XMLHttpRequest();
    request.open('GET', '/hello.php', true)
    request.onload = function() {
      element.innerHTML = this.response
    }

    request.send();
    return element;
  }
  
document.body.appendChild(component());
```

Go back to your browser and reload the page. Instead of `Hello okteto`, you'll see `Hello PHP`, since now we are calling the API.

Finally, open [api/hello.php](api/hello.php), change the text to "Hello Kubernetes", go back to your browser and reload. 

## Step 5: Cleanup

Cancel the `okteto up` command by pressing `ctrl + c` and run the following command to remove the resources created by this guide: 

```console
$ okteto down -v
 ✓  Okteto Environment deactivated

```
 and finally delete the application by running:

```console
$ kubectl delete -f manifests
configmap "nginx-config" deleted
deployment.extensions "php" deleted
service "php" deleted
deployment.extensions "web" deleted
service "web" deleted
```
