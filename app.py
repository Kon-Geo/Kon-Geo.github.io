from flask import Flask
app = Flask(__name__)
app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0
@app.route('/')
def index():
    with open("index.html", "r") as f: return f.read()
app.run(host="0.0.0.0", port=80, debug=True)