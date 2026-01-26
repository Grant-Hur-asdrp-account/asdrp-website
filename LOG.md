# Build Journal

## Current Iteration

### Copy + Tone Cleanup
- **Timeline**: Updated the hero bio/tagline to sound more specific, removed generic phrases like "problem solver," removed the star badge on the home page, adjusted the About copy to focus on software + design, and trimmed the timeline intro copy for small screens.
- **Thought Process**: Specific roles and outputs read more authentic than broad claims.
- **Resources Used**: Existing page content to keep voice consistent across sections.
- **Challenges**: Keeping small-screen copy short without losing context.
- **What I Learned**: Minor wording changes shift the feel of the entire site.

### Timeline Lock Tuning (Desktop + Short Windows)
- **Timeline**: Moved the lock target to the timeline header, separated lock padding for normal vs short windows, and let the lock run on narrow desktop windows by removing width-only CSS that disabled scrolling.
- **Thought Process**: The header should remain visible when the lock engages, and the lock should behave consistently even when the window is short.
- **Resources Used**: Manual resize testing and scroll behavior checks in the browser.
- **Challenges**: The lock only works when the timeline scroller stays scrollable; width-based CSS overrides prevented that.
- **What I Learned**: Scroll-lock behavior is sensitive to the lock target and to whether the inner scroller can actually scroll.

## Foundations

### Core Setup
- **Timeline**: Initialized the Flask repo, created `.venv`, installed Flask/Flask-WTF, scaffolded `app.py`, `portfolio_data.py`, and the key templates (home/about/courses/projects/resume/contact). Added `forms.py` plus `.gitignore` rules for `.venv`, logs, and `.DS_Store`.
- **Thought Process**: Keep all editable content in `portfolio_data.py` so I can tweak the site later without touching templates. Use Bootstrap to get a responsive layout quickly and stick to proper template files instead of inline HTML strings. For the hero, borrow familiar conventions: GitHub-style heading structure with a left-aligned description, right-aligned profile photo, and keyword chips similar to tags on GitHub/itch.io project pages so recruiters can scan important terms (AI, Flask, Swift, etc.). The blue/white palette felt nice. It stays minimal yet modern without drawing attention away from the content.
- **Resources Used**: Flask documentation (routing/context processors), Bootstrap 5 navbar + hero examples, Flask-WTF quickstart for CSRF/validation patterns.
- **Challenges**: Realized `request` isn’t automatically available in templates; fixed it by adding an `@app.context_processor` that injects nav links and metadata.
- **What I Learned**: Designing the `PORTFOLIO` data structure first makes the rest of the build smoother. WTForms saves time even for simple contact forms.

## Deployment + Assets

### Hosting + Placeholder Media
- **Timeline**: Installed `gunicorn`, updated `requirements.txt`, pushed to GitHub, edited `.git/config` manually to switch the remote to the `github-asdrp` SSH alias (CLI command couldn’t lock the file), and deployed on Render with `gunicorn app:app`. Added placeholder SVGs/images and a resume README under `static/`.
- **Thought Process**: Wanted the Render URL live early to test on phones and meet the “public deployment” requirement. Using separate SSH aliases prevents mixing personal vs ASDRP GitHub credentials.
- **Resources Used**: Render Python quickstart, Git remote documentation, quick SVG snippets for temp artwork.
- **Challenges**: `git remote set-url` failed with “could not lock config”; solved by editing `.git/config` manually. Render deployed successfully on the first build.
- **What I Learned**: Keep deploy commands minimal so troubleshooting is easy. Shipping placeholder assets avoids broken layouts while waiting for real media.

## Content & Case Studies

### Project Details + Courses
- **Timeline**: Wrote detailed entries for ASDRP Mobile App and Project Deep Freezer (strengths/limitations/internal badges). Added personal projects SantaFest (`gran4/RTSGameV2`) and AI-InvestiBot (`gran4/AI-InvestiBot`), updated bios, dual GitHub links, and contact info. Rebuilt the AP course list with grade levels + scores and added an AP Exam Scores grid. Tweaked project image CSS repeatedly until the framing felt right.
- **Thought Process**: Split ASDRP vs personal work so it’s obvious which code is private/internal and which lives on GitHub. Highlight AP exam success with a dedicated score section instead of hiding it in text. The project cards follow a consistent pattern (image + name + keywords) inspired by GitHub’s list views and itch.io game listings; keeping keywords visible boosts discoverability and mirrors how people browse portfolio sites.
- **Resources Used**: My own GitHub repos for accurate descriptions, College Board course info for terminology, Bootstrap grid utilities for the score layout.
- **Challenges**: Project thumbnails either over- or under-cropped; iterated on `object-fit`, `max-height`, and padding to get a light zoom without losing context.
- **What I Learned**: Listing strengths + limitations makes each project read like a case study. Internal projects need badges instead of dead “View on GitHub” buttons.

## Layout + Resume Polish

### Footer + Placeholder Resume
- **Timeline**: Converted `base.html` to use `d-flex flex-column min-vh-100` with `main.flex-grow-1` so the footer stays pinned at the bottom. Authored a temporary resume PDF summarizing core projects/skills/contact info and placed it at `static/documents/resume-placeholder.pdf`. Updated this log accordingly.
- **Thought Process**: Short pages looked awkward without a pinned footer, so flexbox fixes the layout. Even a temporary resume should provide substance so visitors aren’t left with an empty download.
- **Resources Used**: Bootstrap flex utilities, a simple PDF text template (Helvetica + coordinates) for the filler resume.
- **Challenges**: Footer change meant reorganizing the entire body structure; solved by wrapping `<body>` in a flex column. Needed multiple passes on the PDF to tighten copy and fix typos before committing.
- **What I Learned**: Treat downloads and layout polish as first-class features. Capturing thought process/resources/challenges right after each milestone keeps this journal accurate for the assignment.

## Layout & Navigation Adjustments

### Home Flow + CTA Tweaks
- **Timeline**: Reworked the home page into a scrollytelling overview, then trimmed it back to a single featured ASDRP project plus courses/interests preview. Restored the hero buttons to “About Me” + “Contact”, removed “case study” wording, and added a lab group button pointing to the ASDRP Google Site.
- **Thought Process**: Wanted a modern scroll flow but kept the home page light so visitors can reach dedicated pages quickly. The featured project gives a strong entry point without overwhelming the homepage.
- **Challenges**: The scroll progress bar disappeared behind the sticky nav; fixed by boosting z-index and later removing body transforms that broke fixed positioning.
- **What I Learned**: Small hero CTA tweaks have big impact on first impressions, so it’s worth iterating quickly and keeping the action choices minimal.

## Interactions & Motion

### Scroll Effects
- **Timeline**: Added GSAP ScrollTrigger reveals and a top scroll progress bar on the home page. Implemented global page enter/exit transitions and refined them after they interfered with the fixed progress bar.
- **Thought Process**: Subtle motion should guide attention without feeling flashy. Using GSAP only on the home page keeps other pages lightweight.
- **Challenges**: Page exit transitions initially used a body translate which broke fixed-position elements; solved by switching to opacity-only transitions.
- **What I Learned**: Fixed elements and transforms don’t mix; keep transforms on inner containers if a fixed overlay is required.

## Visual Tweaks & Content Cleanup

### Cards + Thumbnails
- **Timeline**: Unified the featured project image and description into a single rounded white card with beveled edges. Tuned project thumbnail framing until it felt right. Removed unused placeholder images from `static/images`.
- **Thought Process**: A single card reads cleaner and more modern than two separate blocks; subtle bevels keep it premium without extra color noise.
- **Challenges**: Achieving the right “zoom” required multiple CSS passes; kept final settings as `object-fit: contain` with controlled padding.
- **What I Learned**: Visual polish often depends on small spacing decisions, so it helps to compare before/after screenshots during tweaks.

## Timeline Scroll Lock + Milestones

### Lock Behavior + Media
- **Timeline**: Reworked the home timeline scroll lock repeatedly to feel consistent across wheel + keyboard inputs. Added arrow/page key handling, smoothed the arrow-key lock-in animation, tuned unlock buffering, and made the lock carry remaining scroll into the timeline so it feels continuous. Updated the top scroll progress bar to include timeline scrolling. Tuned lock offsets, wheel speed, and entry carry to keep fast scrolling smooth. Swapped milestone images for real assets (ASDRP logo, SantaFestDestiny, AI-InvestiBot, GitHub, Project Deep Freezer, ASDRP Mobile App, Python book).
- **Timeline**: Iterated on the lock exit behavior to eliminate arrow-key stalls at the timeline edges, added native-smooth window scrolling for non-timeline sections, and wired the progress bar to the lock’s actual position so it continues through the timeline even when the page scroll is pinned.
- **Thought Process**: The timeline is meant to feel like a controlled scrollytelling module, so I wanted the transition into the lock to feel like a seamless continuation of the user’s scroll, not a hard snap. Keyboard navigation should feel as polished as mouse scroll, and progress feedback should continue even when the page is temporarily locked.
- **Resources Used**: DOM scroll/keyboard event handling references, on-page testing with rapid scroll + arrow keys to validate lock behavior.
- **Challenges**: Fast scrolling caused jitter or early locks from below; fixed by locking only at the snap point and by carrying overflow scroll into the timeline. Matching the progress bar to internal scrolling required a custom “virtual scroll” calculation. Fast scroll entry still needed extra carry tuning to feel continuous.
- **What I Learned**: Scroll-lock experiences need careful handling of overshoot and release buffers to feel natural. Small timing changes can dramatically change perceived smoothness.

## Mobile Navigation Offcanvas

### Drawer Navigation
- **Navigation**: Converted the mobile navbar collapse into an off-canvas drawer with a dimmed backdrop, blocked body scroll while open, and added a JS fallback so the toggle works even if Bootstrap JS fails to load.
- **Navigation**: Lifted the navbar above the backdrop so the toggle stays clickable, and raised the scroll progress bar to keep it visible while resizing.
- **Navigation**: Removed the fixed-height override that was blocking the collapse animation so the drawer can close correctly.
- **Navigation**: Lifted the hamburger button above the drawer so it remains clickable when the menu is open.

## Personal Artifact Drawer

### Artifacts Panel
- **Interaction**: Added a fixed “Artifacts” drawer on the home page with quick notes from builds, sketches, and experiments, plus a lightweight toggle and outside-click/escape close behavior.
- **Interaction**: Nudged the drawer lower on the viewport for a calmer default placement.
- **Interaction**: Dropped the drawer closer to the bottom edge for easier reach.
- **Thought Process**: Off-canvas keeps the hero layout stable while making the navigation feel intentional on smaller screens.
- **Timeline**: Added a resize sync so the lock position and scroll progress stay accurate after viewport changes.
