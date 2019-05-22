# Accelerate Serverless Development with Cloud Run and Okteto

Based on this [blog post](https://medium.com/okteto/accelerate-serverless-development-with-cloud-run-and-okteto-33343e4fcbd8).

Cloud Run is a solution for deploying your code as containers with no infrastructure management. It is a step forward for serverless platforms, eliminating most of the architectural restrictions that Lambda functions have.

There is an official Cloud Run contract for supported containers that we can summarize in the following points:

- Compile your container for 64-bit Linux;
- Your container listens on port 8080 for HTTP requests;
- Your HTTP must be ready within four minutes after receiving a request;
- The available memory per request is 2GB;
- Computation is stateless and scoped to a single request.

If your application meets these requirements it will work in Cloud Run. Note that there is no restriction on the programming language used by your application.

Cloud Run runs on top of Kubernetes, but you don’t need to know anything about Kubernetes to deploy your applications in Cloud Run. Let’s see how easy it is with a sample application, the Voting App.

## Deploy the Voting App to Cloud Run

> I assume you are already familiar with GCP (Google Cloud Platform) and Cloud Run. If you are not, check this excellent [blog post](https://medium.com/@aconchillo/google-cloud-run-or-how-to-run-your-static-website-in-5-minutes-and-much-more-dbe8f2804395) to get a sense of it. For the purpose of this sample, we will just need a Project ID on which to deploy Cloud Run applications.

Get a local version of the Voting App, by executing the following commands from your terminal:

```console
$ git clone git@github.com:okteto/cloud-samples.git
$ cd cloud-samples/cloud-run
```

You now have a functioning git repository that contains a simple python 3 application and a Dockerfile to generate the associate Docker Image. The Voting App consists of a flask app that allows you to vote for your favorite animals. Build the Docker image by executing:

```console
$ gcloud builds submit --tag gcr.io/[project-id]/vote
```

After about 30 seconds you will have your Docker image built and uploaded to the Google Container Registry. Deploy your image to Cloud Run by executing the command below:

```console
$ gcloud beta run deploy --image gcr.io/[project-id]/vote
Service name: (vote):
Deploying container to Cloud Run service [vote] in project [project-id] region [us-central1]
Allow unauthenticated invocations to new service [vote]? (y/N)?  y
✓ Deploying new service... Done.
✓ Creating Revision...
✓ Routing traffic...
Done.
Service [vote] revision [vote-00001] has been deployed and is serving traffic at https://vote-cg2bjntyuq-uc.a.run.app
```

After another 30 seconds or so you will be able to browse to the generated URL and see the Voting App online! Really cool, isn’t it?

## Develop the Voting App with Okteto

Now it is time to do some work on the Voting App. Building and deploying the Voting App to Cloud Run takes about 1 minute for every change we want to test. If you don’t want to kill your productivity, you will need to take a different approach.

Let me introduce you to Okteto. Okteto provides instant cloud-based environments to code and collaborate. Instead of having to build and deploy a container every time you want to see your changes in action, Okteto lets you develop your applications directly in the cloud.

The first thing we need to do is install the Okteto CLI by running the command below:

MacOS/Linux

```console
curl https://get.okteto.com -sSfL | sudo sh
```

Windows

```console
wget https://downloads.okteto.com/cloud/cli/okteto-Windows-x86_64 -OutFile c:\windows\system32\okteto.exe
```

Once the CLI is installed, run the okteto login command to create your Okteto account and get an API token for your workstation.

```console
$ okteto login
```

Now start your Okteto Development Environment by executing the okteto up command:

```console
$ okteto up
✓  Okteto Environment activated
✓  Files synchronized
✓  Your Okteto Environment is ready
Name:     vote
Endpoint: https://vote-pchico83.okteto.net
* Serving Flask app "app" (lazy loading)
* Environment: production
  WARNING: Do not use the development server in a production environment.
  Use a production WSGI server instead.
* Debug mode: on
* Running on http://0.0.0.0:8080/ (Press CTRL+C to quit)
* Restarting with stat
* Debugger is active!
* Debugger PIN: 117-959-944
```

After a couple of seconds, you will be able to browse to the generated URL and see the Voting App online!

> Note that Okteto creates HTTPs endpoints and takes care of the infrastructure for your Okteto Development Environment, but this environment isn’t highly available. It is just meant for development purposes.

Now you are ready to see the power of Okteto in action. Open your local IDE, go to `app.py` and modify the `getOptions` function with the code below:

```
def getOptions():
    optionA = 'Otters'
    optionB = 'Dogs'
    return optionA, optionB
```

Go to the browser again and reload the page. Your changes were applied instantly. No commit, build or push required 😎!

Edit the source code as many times as you need. With Okteto you can iterate in your code instantly, instead of wasting minutes building and deploying images. This is possible because Okteto instantly synchronizes your local filesystem to your cloud development environment.

Once you are happy with your changes, deploy them to production with Cloud Run:

```console
$ gcloud builds submit --tag gcr.io/[project-id]/vote
$ gcloud beta run deploy --image gcr.io/[project-id]/vote
```

## Conclusion

We have shown how easy is to deploy applications in Cloud Run, and how to [use Okteto](https://okteto.com) to do efficient development in the cloud. And what it is even more awesome, is that you have been able to efficiently develop, build and deploy a Docker-based application without typing a single docker command, thanks to the combined powers of Cloud Run and [Okteto](https://okteto.com)!
