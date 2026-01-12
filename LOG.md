# Build Journal

## 2025-01-14 &mdash; Build Day

### Morning: Foundations
- **Timeline**: Initialized the Flask repo, created `.venv`, installed
  Flask/Flask-WTF, scaffolded `app.py`, `portfolio_data.py`, and the key
  templates (home/about/courses/projects/resume/contact). Added `forms.py` plus
  `.gitignore` rules for `.venv`, logs, and `.DS_Store`.
- **Thought Process**: Keep all editable content in `portfolio_data.py` so I can
  tweak the site later without touching templates. Use Bootstrap to get a
  responsive layout quickly and stick to proper template files instead of inline
  HTML strings. For the hero, borrow familiar conventions: GitHub-style heading
  structure with a left-aligned description, right-aligned profile photo, and
  keyword chips similar to tags on GitHub/itch.io project pages so recruiters
  can scan important terms (AI, Flask, Swift, etc.). The blue/white palette felt
  familiar from other tech portfolios—it stays minimal yet modern without drawing
  attention away from the content.
- **Resources Used**: Flask documentation (routing/context processors), Bootstrap
  5 navbar + hero examples, Flask-WTF quickstart for CSRF/validation patterns.
- **Challenges**: Realized `request` isn’t automatically available in templates;
  fixed it by adding an `@app.context_processor` that injects nav links and
  metadata.
- **What I Learned**: Designing the `PORTFOLIO` data structure first makes the
  rest of the build smoother. WTForms saves time even for simple contact forms.

### Midday: Deployment + Assets
- **Timeline**: Installed `gunicorn`, updated `requirements.txt`, pushed to
  GitHub, edited `.git/config` manually to switch the remote to the
  `github-asdrp` SSH alias (CLI command couldn’t lock the file), and deployed on
  Render with `gunicorn app:app`. Added placeholder SVGs/images and a resume
  README under `static/`.
- **Thought Process**: Wanted the Render URL live early to test on phones and
  meet the “public deployment” requirement. Using separate SSH aliases prevents
  mixing personal vs ASDRP GitHub credentials.
- **Resources Used**: Render Python quickstart, Git remote documentation, quick
  SVG snippets for temp artwork.
- **Challenges**: `git remote set-url` failed with “could not lock config”; solved
  by editing `.git/config` manually. Render deployed successfully on the first
  build.
- **What I Learned**: Keep deploy commands minimal so troubleshooting is easy.
  Shipping placeholder assets avoids broken layouts while waiting for real media.

### Afternoon: Content & Case Studies
- **Timeline**: Wrote detailed entries for ASDRP Mobile App and Project Deep
  Freezer (strengths/limitations/internal badges). Added personal projects
  SantaFest (`gran4/RTSGameV2`) and AI-InvestiBot (`gran4/AI-InvestiBot`), updated
  bios, dual GitHub links, and contact info. Rebuilt the AP course list with
  grade levels + scores and added an AP Exam Scores grid. Tweaked project image
  CSS repeatedly until the framing felt right.
- **Thought Process**: Split ASDRP vs personal work so it’s obvious which code is
  private/internal and which lives on GitHub. Highlight AP exam success with a
  dedicated score section instead of hiding it in text. The project cards follow
  a consistent pattern (image + name + keywords) inspired by GitHub’s list views
  and itch.io game listings; keeping keywords visible boosts discoverability and
  mirrors how people browse portfolio sites.
- **Resources Used**: My own GitHub repos for accurate descriptions, College
  Board course info for terminology, Bootstrap grid utilities for the score
  layout.
- **Challenges**: Project thumbnails either over- or under-cropped; iterated on
  `object-fit`, `max-height`, and padding to get a light zoom without losing
  context.
- **What I Learned**: Listing strengths + limitations makes each project read
  like a case study. Internal projects need badges instead of dead “View on
  GitHub” buttons.

### Evening: Polish + Placeholder Resume
- **Timeline**: Converted `base.html` to use `d-flex flex-column min-vh-100`
  with `main.flex-grow-1` so the footer stays pinned at the bottom. Authored a
  temporary resume PDF summarizing core projects/skills/contact info and placed
  it at `static/documents/resume-placeholder.pdf`. Updated this log accordingly.
- **Thought Process**: Short pages looked awkward without a pinned footer, so
  flexbox fixes the layout. Even a temporary resume should provide substance so
  visitors aren’t left with an empty download.
- **Resources Used**: Bootstrap flex utilities, a simple PDF text template
  (Helvetica + coordinates) for the filler resume.
- **Challenges**: Footer change meant reorganizing the entire body structure;
  solved by wrapping `<body>` in a flex column. Needed multiple passes on the
  PDF to tighten copy and fix typos before committing.
- **What I Learned**: Treat downloads and layout polish as first-class features.
  Capturing thought process/resources/challenges right after each milestone
  keeps this journal accurate for the assignment.
