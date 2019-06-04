from flask import Flask, render_template, request, make_response, g
import os
import socket
import random
import json

option_a = os.getenv('OPTION_A', 'Cats')
option_b = os.getenv('OPTION_B', 'Dogs')
hostname = socket.gethostname()
namespace = os.getenv('CND_KUBERNETES_NAMESPACE', 'localhost')
votes = {option_a: 0, option_b: 0}

app = Flask(__name__)

@app.route("/", methods=['POST','GET'])
def hello():
    vote = None
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
        namespace=namespace
    ))
    return resp


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=80, debug=True)
