from flask import Flask, render_template, request, make_response, g
from redis import Redis, RedisError
import socket
import random
import json

hostname = socket.gethostname()

redis = Redis(host="redis", db=0)
app = Flask(__name__)

def getOptions():
    optionA = 'Cats'
    optionB = 'Dogs'
    return optionA, optionB

@app.route("/", methods=['POST','GET'])
def hello():
    optionA, optionB = getOptions()

    try:
        votesA = int(redis.get(optionA) or 0) 
        votesB = int(redis.get(optionB) or 0)
    except RedisError:
        votesA = "<i>cannot connect to Redis, counter disabled</i>"
        votesB = "<i>cannot connect to Redis, counter disabled</i>"
        
    if request.method == 'POST':
        try:
            vote = request.form['vote']
            if vote == "a":
                votesA = redis.incr(optionA)
            else:
                votesB = redis.incr(optionB)
        except Exception as e:
            print(e)
            votesA = "<i>An error occured</i>"
            votesB = "<i>An error occured</i>"

    resp = make_response(render_template(
        'index.html',
        option_a=optionA,
        option_b=optionB,
        hostname=hostname,
        votes_a=votesA,
        votes_b=votesB,
    ))
    return resp


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=8080, debug=True)
