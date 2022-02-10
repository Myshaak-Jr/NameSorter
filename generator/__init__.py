from flask import Flask, render_template
import os.path

app = Flask(__name__)


@app.route("/")
def index():
	return render_template("index.html")
