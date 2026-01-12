from __future__ import annotations

import json
import os
from datetime import datetime
from pathlib import Path

from flask import Flask, flash, redirect, render_template, url_for

from forms import ContactForm
from portfolio_data import PORTFOLIO

app = Flask(__name__)
app.config["SECRET_KEY"] = os.environ.get("SECRET_KEY", "dev-secret-key")
app.config["PORTFOLIO"] = PORTFOLIO
CONTACT_LOG = Path("contact_submissions.log")


@app.context_processor
def inject_globals():
    return {
        "personal": PORTFOLIO["personal"],
        "nav_links": [
            ("home", "Home"),
            ("about", "About"),
            ("courses", "Courses"),
            ("projects", "Projects"),
            ("resume", "Resume"),
            ("contact", "Contact"),
        ],
        "current_year": datetime.utcnow().year,
    }


@app.route("/")
def home():
    limited_courses = PORTFOLIO["courses"][:4]
    return render_template(
        "home.html",
        courses=limited_courses,
        interests=PORTFOLIO["interests"],
        featured_project=PORTFOLIO["projects"]["asdrp"][0],
        milestones=PORTFOLIO["milestones"],
    )


@app.route("/about")
def about():
    return render_template("about.html", interests=PORTFOLIO["interests"])


@app.route("/courses")
def courses():
    return render_template("courses.html", courses=PORTFOLIO["courses"])


@app.route("/projects")
def projects():
    return render_template("projects.html", projects=PORTFOLIO["projects"])


@app.route("/resume")
def resume():
    return render_template("resume.html")


@app.route("/contact", methods=["GET", "POST"])
def contact():
    form = ContactForm()
    if form.validate_on_submit():
        contact_entry = {
            "name": form.name.data,
            "email": form.email.data,
            "subject": form.subject.data,
            "message": form.message.data,
            "timestamp": datetime.utcnow().isoformat(),
        }
        CONTACT_LOG.parent.mkdir(parents=True, exist_ok=True)
        with CONTACT_LOG.open("a", encoding="utf-8") as log_file:
            log_file.write(json.dumps(contact_entry) + "\n")
        flash("Thanks! I'll get back to you soon.", "success")
        return redirect(url_for("contact"))
    return render_template("contact.html", form=form)


if __name__ == "__main__":
    app.run(debug=True)
