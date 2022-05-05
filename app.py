from flask import Flask
app = Flask(__name__)
@app.route('/')
def index():
    with open("index.html", "r") as f:
        return f.read()
app.run(host="0.0.0.0")