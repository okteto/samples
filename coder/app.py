from flask import Flask, render_template, request, make_response, g
from redis import Redis, RedisError

import os
import socket
import random
import json
import collections

hostname = socket.gethostname()

redis = Redis(host="redis", db=0)
app = Flask(__name__)

def getOptions():
    option_a = 'Cats'
    option_b = 'Dogs'
    return option_a, option_b

@app.route("/", methods=['POST','GET'])
def hello():
    option_a, option_b = getOptions()

    try:
        votesA = int(redis.get(option_a) or 0) 
        votesB = int(redis.get(option_b) or 0)
    except RedisError:
        votesA = "<i>cannot connect to Redis, counter disabled</i>"
        votesB = "<i>cannot connect to Redis, counter disabled</i>"

    if request.method == 'POST':
        try:
            vote = request.form['vote']
            if vote == "a":
                votesA = redis.incr(option_a)
            else:
                votesB = redis.incr(option_b)
        except Exception as e:
            print(e)
            votesA = "<i>An error occured</i>"
            votesB = "<i>An error occured</i>"

    with open('/var/run/secrets/kubernetes.io/serviceaccount/namespace', 'r') as fp:
        namespace = fp.read()

    resp = make_response(render_template(
        'index.html',
        option_a=option_a,
        option_b=option_b,
        hostname=hostname,
        namespace=namespace,
        votes_a=votesA,
        votes_b=votesB,
    ))
    return resp


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=8080, debug=True)
