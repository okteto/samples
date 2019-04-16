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
[Okteto](https://cloud.okteto.com) and click the `+` symbol in the bottom right, pick `Database` and the `Redis`. Reload your browser and your python application will be up and running.

Now your app is ready for code changes. Open `vote/app.py` in your favorite IDE and modify the `getOptions` function with the following code, and save your file:

```python
def getOptions():
    optionA = 'Otters'
    optionB = 'Dogs'
    return optionA, optionB
```

Go back to the browser, and reload the page. Notice how your changes are instantly applied. No commit or push required 😎! 
