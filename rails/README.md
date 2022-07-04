# Ruby on Rails Sample App

This example shows how to leverage [Okteto](https://github.com/okteto/okteto) to develop a Ruby on Rails Sample App directly in the cloud. The Ruby on Rails Sample App is deployed using raw Kubernetes manifests.

Okteto works in any Kubernetes cluster by reading your local Kubernetes credentials. For a empowered experience, follow this [guide](https://okteto.com/docs/samples/ruby/) to deploy the Ruby on Rails Sample App in [Okteto Cloud](https://cloud.okteto.com), a free-trial Kubernetes cluster.

## Step 1: Install the Okteto CLI

Install the Okteto CLI by following our [installation guides](https://www.okteto.com/docs/getting-started/).

## Step 2: Clone the Rails Sample App

Clone the repository and go to the rails-kubectl folder.

```console
$ git clone https://github.com/okteto/samples
$ cd samples/ruby
```

## Step 3: Cloud Native Development

In order to activate your Cloud Native Development, execute:

```console
$ okteto up
 ✓  Development container activated
 ✓  Files synchronized
    Namespace: cindy
    Name:      blog
    Forward:   8080 -> 8080

root@blog-545d954cd5-96fh2:/usr/src/app#
```

The `okteto up` command will start a development container that automatically synchronizes and applies your code changes without rebuilding containers. The development container already includes the ruby dev tools, and will automatically forward port 8080 to your local machine.

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

Notice that even though you don't have the application running locally (and you don't have rails installed), the command still runs successfully. This is because okteto is running the command directly in your development container in the browser!

Browse again to your application, it should load without any issues. At this point, you have a web application that can create, show, list, update and destroy articles.

To keep testing the power of cloud native development, continue with the rest of the [getting started guide](https://guides.rubyonrails.org/getting_started.html#adding-a-second-model). Keep creating and editing files in your IDE. 
