# Ruby on Rails Sample App

This example shows how to develop a Ruby on Rails web app with [okteto](https://okteto.com). It's based on [Ruby on Rails' getting started guide](https://guides.rubyonrails.org/getting_started.html).

This example works in any Kubernetes cluster. Cloud Native Development provides more value in remote Kubernetes clusters, but in order to make it simple to follow this guide, we recommend to use Docker for Mac (with Kubernetes support) or [minikube](https://github.com/kubernetes/minikube). 

## Deploy the blog service

Clone the repository and go to the rails-kubectl folder.

```console
$ git clone https://github.com/okteto/samples
$ cd samples/ruby
```

Deploy the blog application by using the following command:
```console
$ kubectl apply -f manifests
```

## Cloud Native Development

In order to activate your Cloud Native Development, execute:

```console
$ cd blog
$ okteto up
```

The `okteto up` command will start a remote development environment that automatically synchronizes and applies your code changes without rebuilding containers. The environment already includes the ruby dev tools, and will automatically forward port 8080 to your local machine.

Now execute the command below in the Okteto terminal. The command will start your service and reload it automatically after every successful change.

```console
$ rails s
```

Once the server is running, browse to the application at http://localhost:8080 and you'll see an error message similar to this one in your browser:
```console
Migrations are pending. To resolve this issue, run: bin/rails db:migrate RAILS_ENV=development 
```

This is because we have a migration pending. Press `ctrl + c` and run the following commands from your terminal:

```console
$ rails db:migrate
$ rails s
```

Notice that even though you don't have the application running locally (and you don't have rails installed), the command still runs successfully. This is because okteto is running the command directly in your dev environment in the browser!

Browse again to your application, it should load without any issues. At this point, you have a web application that can create, show, list, update and destroy articles.

To keep testing the power of cloud native development, continue with the rest of the [getting started guide](https://guides.rubyonrails.org/getting_started.html#adding-a-second-model). Keep creating and editing files in your IDE. 

Happy coding!