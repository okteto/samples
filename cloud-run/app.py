from flask import Flask, render_template, request, make_response, g
import os
import socket
import random
import json
import collections

hostname = socket.gethostname()
votes = collections.defaultdict(int)

app = Flask(__name__)

def getOptions():
    option_a = 'Cats'
    option_b = 'Dogs'
    return option_a, option_b

@app.route("/", methods=['POST','GET'])
def hello():
    vote = None
    option_a, option_b = getOptions()
    if request.method == 'POST':
        vote = request.form['vote']
        vote = option_a if vote == "a" else option_b
        votes[vote] = votes[vote] + 1
    resp = make_response(render_template(
        'index.html',
        option_a=option_a,
        option_b=option_b,
        hostname=hostname,
        votes_a=votes[option_a],
        votes_b=votes[option_b],
    ))
    return resp


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=8080, debug=True)
