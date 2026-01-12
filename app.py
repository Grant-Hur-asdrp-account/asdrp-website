from flask import Flask, render_template

app = Flask(__name__)


@app.route("/")
def home():
    """Simple landing page served at http://localhost:5000/"""
    return render_template("index.html", title="Hello from Flask")


if __name__ == "__main__":
    app.run(debug=True)
