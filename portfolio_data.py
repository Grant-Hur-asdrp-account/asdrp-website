"""Central place to update personal content shown throughout the site."""

PORTFOLIO = {
    "personal": {
        "name": "Grant Hur",
        "grade": "12th Grade",
        "school": "The King's Academy",
        "location": "San Jose, CA",
        "bio": "Student engineer building tools for ASDRP and school labs.",
        "tagline": "Student Researcher • Software • Design",
        "photo": "images/profile.png",
        "resume_static_path": "documents/resume-placeholder.pdf",
        "email": "grant.hur@students.asdrp.org",
        "phone": "(555) 123-4567",
        "socials": {
            "GitHub": "https://github.com/gran4",
            "ASDRP GitHub": "https://github.com/Grant-Hur-asdrp-account",
            "LinkedIn": "https://www.linkedin.com/feed/",
        },
    },
    "artifacts": [
        {
            "title": "Clam Chowder Pasta",
            "meta": "Seafood | Cozy",
            "detail": "Clams, white wine, and parsley in a chowder-style cream sauce.",
            "image": "images/Clam Chowder Pasta.jpg",
            "image_alt": "Clam chowder pasta",
            "image_slot": False,
            "link": None,
        },
        {
            "title": "Creamy Miso Ramen",
            "meta": "Noodles | Umami",
            "detail": "Miso + sesame broth with soft egg, scallions, and chili oil.",
            "image": "images/Creamy Miso Ramen.jpg",
            "image_alt": "Creamy miso ramen",
            "image_slot": False,
            "link": None,
        },
        {
            "title": "Fried Chicken",
            "meta": "Comfort | Crispy",
            "detail": "Brined, double-dredged, and fried for a shattery crust.",
            "image": "images/Fried Chicken.jpg",
            "image_alt": "Fried chicken",
            "image_slot": False,
            "link": None,
        },
    ],
    "courses": [
        {
            "name": "AP US History",
            "term": "9th Grade",
            "topics": ["Historical analysis", "Long-form writing"],
            "score": "5",
        },
        {
            "name": "AP Precalculus",
            "term": "10th Grade",
            "topics": ["Functions", "Modeling", "Trigonometry"],
            "score": "5",
        },
        {
            "name": "AP Government & Politics",
            "term": "10th Grade",
            "topics": ["Civics", "Policy analysis"],
            "score": "5",
        },
        {
            "name": "AP Computer Science Principles",
            "term": "10th Grade",
            "topics": ["Computational thinking", "Creative project"],
            "score": "5",
        },
        {
            "name": "AP Psychology",
            "term": "10th Grade",
            "topics": ["Cognition", "Behavioral science"],
            "score": "5",
        },
        {
            "name": "AP English Language & Composition",
            "term": "11th Grade",
            "topics": ["Rhetorical analysis", "Argumentation"],
            "score": "4",
        },
        {
            "name": "AP Chemistry",
            "term": "11th Grade",
            "topics": ["Stoichiometry", "Thermodynamics"],
            "score": "5",
        },
        {
            "name": "AP Physics 1",
            "term": "11th Grade",
            "topics": ["Mechanics", "Lab skills"],
            "score": "5",
        },
        {
            "name": "AP Calculus BC",
            "term": "11th Grade",
            "topics": ["Series", "Differential equations"],
            "score": "5",
        },
        {
            "name": "AP Computer Science A",
            "term": "11th Grade",
            "topics": ["Java", "Data structures"],
            "score": "5",
        },
        {
            "name": "AP English Literature",
            "term": "12th Grade",
            "topics": ["Literary analysis", "Comparative essays"],
            "score": None,
        },
        {
            "name": "AP Statistics",
            "term": "12th Grade",
            "topics": ["Probability", "Inference"],
            "score": None,
        },
        {
            "name": "AP Physics C: Mechanics",
            "term": "12th Grade",
            "topics": ["Classical mechanics", "Calculus-based modeling"],
            "score": None,
        },
        {
            "name": "AP World History",
            "term": "12th Grade",
            "topics": ["Global perspectives", "Document-based essays"],
            "score": None,
        },
    ],
    "projects": {
        "asdrp": [
            {
                "title": "ASDRP Mobile App",
                "description": (
                    "In-progress iOS app that centralizes ASDRP logistics (deadlines, "
                    "attendance, and lab updates). Students and advisors see only their "
                    "lab’s info instead of scattered emails and calendars."
                ),
                "technologies": ["Swift", "Firebase Auth", "Firestore"],
                "link": None,
                "image": "images/asdrp-mobile-app.png",
                "highlights": [
                    "Implemented the to-do list + important forms modules so every student sees actionable tasks by due date.",
                    "Built the profile explorer that lets students browse labs and connect like a lightweight LinkedIn.",
                ],
                "status_note": (
                    "Project is ongoing. The iOS build is live for internal testing. "
                    "Kotlin port and chatbot are planned next."
                ),
                "strengths": [
                    "Tailors announcements per lab, reducing noise from mass emails.",
                    "Integrates attendance tracking with Firebase for reliable timestamps.",
                ],
                "limitations": [
                    "Currently available only on iOS. Android support will follow in later phases.",
                    "Requires strong campus Wi-Fi for real-time syncing.",
                ],
            },
            {
                "title": "Project Deep Freezer",
                "description": (
                    "Raspberry Pi + camera system that reads ultra-low temp displays with OCR "
                    "and triggers PagerDuty alerts when temps drift. Built to be low cost and "
                    "easy for labs to document and maintain."
                ),
                "technologies": ["Raspberry Pi", "OpenCV", "EasyOCR", "PagerDuty"],
                "link": None,
                "image": "images/project-deep-freezer.png",
                "highlights": [
                    "Analyzed failure stories to articulate the risk (lost samples worth years of work).",
                    "Implemented automated unit tests for the OCR pipeline to reduce false alarms.",
                    "Built the UI for selecting the region of interest so the camera zooms on the correct digits.",
                ],
                "status_note": (
                    "Project is done and ready for extended lab testing. Accuracy still depends on lighting and placement."
                ),
                "strengths": [
                    "Low cost—no subscriptions or vendor lock-in.",
                    "Installs without probes or freezer modifications.",
                    "Works with most freezers by reading the native display.",
                ],
                "limitations": [
                    "Relies on the freezer's built-in display staying readable.",
                    "Needs stable power/network and good lighting for OCR.",
                ],
            },
        ],
        "personal": [
            {
                "title": "SantaFest Destiny",
                "description": (
                    "Real-time strategy game where you build Santa’s workshop across "
                    "procedurally generated islands, hit gift quotas, and survive raids. "
                    "Runs include permanent upgrades for the next attempt."
                ),
                "technologies": ["Arcade 3", "Python"],
                "link": "https://github.com/gran4/RTSGameV2",
                "image": "images/SantaFestDestiny.png",
                "highlights": [
                    "Upgraded the engine to Arcade 3 in 2025 for smoother performance and better visuals.",
                    "Iterated on adjustable game speed, save system, and permanent progression UI.",
                    "Started in a middle-school elective and kept expanding through self-study.",
                ],
                "status_note": "Paused for now. I plan to come back to it.",
            },
            {
                "title": "AI-InvestiBot",
                "description": (
                    "Experiment harness for stock modeling: LSTM models + indicators, "
                    "walk-forward validation, and a voting layer to compare strategies "
                    "without touching live markets."
                ),
                "technologies": ["Python", "PyTorch", "Pandas"],
                "link": "https://github.com/gran4/AI-InvestiBot",
                "image": "images/AI-Investibot.png",
                "highlights": [
                    "Reusable pipeline handles data download, indicator caching, model training, and walk-forward evaluation.",
                    "Decision layer aggregates multiple strategy votes so I can compare price, return, and directional models.",
                ],
                "status_note": (
                    "Core training + validation loop works. I’m iterating on additional tests "
                    "and refinements before automating more strategies."
                ),
            },
        ],
    },
    "interests": [
        "Edge AI and embedded systems",
        "Soccer",
        "Community STEM mentorship",
        "Most important book: Titans of History by Simon Sebag Montefiore",
    ],
    "shelf_items": [
        {
            "title": "Civ 6 Domination Run",
            "meta": "Games | Strategy",
            "detail": "Civ 6 > Civ 7. Domination snowballs fast once you get rolling.",
            "media": "images/Civ 6 Game.jpg",
            "media_type": "image",
            "media_alt": "Civ 6 game screenshot",
        },
        {
            "title": "Me and my brother",
            "meta": "Family | Snapshot",
            "detail": "A quick photo that I keep coming back to.",
            "media": "images/Me and my brother.jpg",
            "media_type": "image",
            "media_alt": "Me and my brother",
        },
        {
            "title": "Choosing an ASDRP advisor",
            "meta": "Notes | ASDRP",
            "detail": "Short notes on what I looked for when picking a lab advisor.",
            "media": "images/Notes for choosing ASDRP advisor.png",
            "media_type": "image",
            "media_alt": "Notes for choosing an ASDRP advisor",
        },
    ],
    "milestones": [
        {
            "year": "2008",
            "title": "Born",
            "detail": "May 22, 2008",
            "image": "images/Me When Baby.jpg",
        },
        {
            "year": "5th Grade",
            "title": "First coding curiosity",
            "detail": "Started exploring basic programming concepts.",
            "image": "images/python for the absolute beginner.jpg",
        },
        {
            "year": "6th Grade",
            "title": "First game build",
            "detail": "Built a game for an elective class and kept iterating on it.",
            "image": "images/SantaFestDestiny.png",
        },
        {
            "year": "8th Grade",
            "title": "Basketball tournament win",
            "detail": "Won a 3-person team tournament and kept the teamwork mindset.",
            "image": "images/Middle School Sports Trophies.jpg",
        },
        {
            "year": "9th Grade",
            "title": "GitHub launch",
            "detail": "Started publishing code and tracking projects on GitHub.",
            "image": "images/github.png",
        },
        {
            "year": "10th Grade",
            "title": "AI-InvestiBot begins",
            "detail": "Started my experimental ML stock modeling framework.",
            "image": "images/AI-Investibot.png",
        },
        {
            "year": "Summer after 10th",
            "title": "Joined ASDRP",
            "detail": "Began lab research focused on real-world engineering problems.",
            "image": "images/ASDRP logo.avif",
        },
        {
            "year": "11th Grade",
            "title": "Project Deep Freezer",
            "detail": "Built the freezer monitoring system and the OCR test pipeline.",
            "image": "images/project-deep-freezer.png",
        },
        {
            "year": "12th Grade",
            "title": "Now: ASDRP Mobile App",
            "detail": "Leading the mobile app build with personalized tooling for ASDRP.",
            "image": "images/asdrp-mobile-app.png",
        },
    ],
}
