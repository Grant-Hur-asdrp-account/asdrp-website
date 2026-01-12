# Build Journal

## 2025-01-14 &mdash; Build Day

### Morning: Foundations
- Initialized the Flask project, created `.venv`, installed Flask/Flask-WTF,
  and scaffolded `app.py` with route stubs plus `portfolio_data.py` to centralize
  content (bio, placeholder courses/projects/interests).
- Added Bootstrap-based `base.html` and hero layout, then wired new templates
  (home, about, courses, projects, resume, contact) to render via
  `render_template`. Logged decisions about keeping HTML in templates instead of
  `render_template_string`.
- Created `forms.py` with a `ContactForm` and ensured submissions append to
  `contact_submissions.log`. Added `.gitignore` entries for logs, `.venv/`, and
  `.DS_Store`.

### Midday: Deployment + Assets
- Installed `gunicorn`, updated `requirements.txt`, and pushed the repo to
  `Grant-Hur-asdrp-account/asdrp-website`. Swapped the Git remote to the
  `github-asdrp` SSH alias by editing `.git/config` (initial commands failed due
  to permission issues). Render deployment succeeded with `gunicorn app:app`.
- Added placeholder SVGs (profile, generic project art) under `static/images`,
  plus a template `static/documents/README` for the resume. Captured the process
  in this log per assignment instructions.
- Hooked in real assets when available: `profile.png`, `asdrp-mobile-app.png`,
  `project-deep-freezer.png`, `SantaFestDestiny.png`, and `AI-Investibot.png`.

### Afternoon: Content & Case Studies
- Documented two ASDRP projects (Mobile App + Project Deep Freezer) with
  strengths, limitations, highlights, and internal-only badges when links are
  private. Added personal projects SantaFest (repo `gran4/RTSGameV2`) and
  AI-InvestiBot (repo `gran4/AI-InvestiBot`), moving STEM Outreach off the list.
- Rebuilt the courses array with every AP class, grade level, and `score`
  attributes; created an “AP Exam Scores” grid on the courses page so exam
  results stand apart. Flagged senior-year scores as pending to avoid implying
  results exist.
- Tweaked project image CSS repeatedly to balance “see the whole mockup” vs.
  “fill the card”. Final setting: `object-fit: contain`, `max-height: 250px`,
  light padding.
- Added dual social links (personal GitHub `gran4` plus `Grant-Hur-asdrp-account`,
  LinkedIn) and swapped bios to mention The King’s Academy + accurate contact
  emails.

### Evening: Polish + Placeholder Resume
- Footer floated mid-page on short routes, so `base.html` now uses
  `d-flex flex-column min-vh-100` with `main.flex-grow-1`, pinning the footer to
  the bottom everywhere.
- Wrote a filler PDF at `static/documents/resume-placeholder.pdf` summarizing
  major projects/skills so the download button works until the real resume is
  ready.
- Recorded lessons learned: centralize content early, double-check image framing
  on every viewport, and keep this journal updated after each milestone so the
  assignment requirement is met.
