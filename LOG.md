# Build Journal

## 2025-01-11
- Set up the Flask project structure with templates and static folders so the
  site can grow cleanly.
- Added placeholder content (bio, courses, projects, resume instructions) in
  `portfolio_data.py` for quick editing.
- Implemented a responsive Bootstrap layout, hero section, and multiple pages
  (home, about, courses, projects, resume, contact).
- Wired up a Flask-WTF contact form that logs submissions to
  `contact_submissions.log` for now.
- Deployed dependencies (`Flask-WTF`, `gunicorn`, `email-validator`) in the
  virtual environment and recorded them in `requirements.txt`.
