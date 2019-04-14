# Voting App

This example shows how to leverage [Okteto](https://cloud.okteto.com) to develop a python app directly in the cloud. 

## Create your Okteto environment

Clone this repository and move to this example folder.

```console
git clone https://github.com/okteto/cloud-samples
cd cloud-samples/vote
```

Install the Okteto CLI by running:

```console
curl https://get.okteto.com -sSfL | sh
```

and login from your Okteto CLI by running:

```console
okteto login
```

and finally execute:

```console
okteto up
```

The `okteto up` command will create an Okteto environment that automatically synchronizes and applies your local code changes. In the remote terminal, execute:

```console
pip install -r requirements.txt
python app.py
```

Check that your application is running by going to [Okteto](https://cloud.okteto.com) and clicking the endpoint of your application.

As you can see, the app is failing because it requires a redis database running on your Okteto environment.
[Okteto](https://cloud.okteto.com) and click the `+` buttom on the right, pick `Database` and the `Redis`. Check again your application and now you should have your python application up and running.

Now your app is ready for code changes. Edit the file `vote/app.py` and change the `optionA` in line 8 from "Cats" to "Otters". Save your changes.

Finally, refresh the Voting App UI, and cool! your code changes are live!
