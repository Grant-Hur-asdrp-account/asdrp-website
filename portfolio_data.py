"""Central place to update personal content shown throughout the site."""

PORTFOLIO = {
    "personal": {
        "name": "Grant Hur",
        "grade": "12th Grade",
        "school": "The King's Academy",
        "location": "San Jose, CA",
        "bio": (
            "Aspiring engineer focused on blending software, hardware, and design to "
            "solve real-world problems. I enjoy building code that's reliable "
            "and innovative, mainly in Python."
        ),
        "tagline": "Student Researcher • Builder • Problem Solver",
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
            "title": "Freezer OCR test log",
            "meta": "Lab monitoring | 2024",
            "detail": "Notes from OCR calibration runs and the edge cases that broke early builds.",
            "link": None,
        },
        {
            "title": "Mobile app onboarding sketch",
            "meta": "ASDRP iOS | 2025",
            "detail": "Storyboard snippet mapping the student onboarding flow and lab selection.",
            "link": None,
        },
        {
            "title": "AI-InvestiBot experiment card",
            "meta": "Modeling | 2023",
            "detail": "A one-page setup for testing model votes and walk-forward validation.",
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
                    "An in-progress iOS application that centralizes ASDRP logistics so "
                    "students and advisors only see the information relevant to their "
                    "department, lab, and current deadlines. It consolidates scattered "
                    "emails, calendars, and attendance tools into one personalized feed."
                ),
                "technologies": ["Swift", "Firebase Auth", "Firestore"],
                "link": None,
                "image": "images/asdrp-mobile-app.png",
                "highlights": [
                    "Implemented the to-do list + important forms modules so every student sees actionable tasks by due date.",
                    "Built the profile explorer that lets students browse labs and connect like a lightweight LinkedIn.",
                ],
                "status_note": (
                    "Project is ongoing: iOS build is live for internal testing; Kotlin port and chatbot are planned next."
                ),
                "strengths": [
                    "Tailors announcements per lab, reducing noise from mass emails.",
                    "Integrates attendance tracking with Firebase for reliable timestamps.",
                ],
                "limitations": [
                    "Currently available only on iOS; Android support will follow in later phases.",
                    "Requires strong campus Wi-Fi for real-time syncing.",
                ],
            },
            {
                "title": "Project Deep Freezer",
                "description": (
                    "Built a low-cost, done-and-documented freezer monitoring system that "
                    "uses a Raspberry Pi camera and OCR to read ultra-low temperature "
                    "displays and raise PagerDuty alerts when anything drifts out of range."
                ),
                "technologies": ["Raspberry Pi", "OpenCV", "EasyOCR", "PagerDuty"],
                "link": None,
                "image": "images/project-deep-freezer.png",
                "highlights": [
                    "Analyzed failure stories to articulate the risk (lost samples worth years of work).",
                    "Implemented automated unit tests for the OCR pipeline to reduce false alarms.",
                    "Built the UI for selecting the region of interest so the camera zooms on the correct digits.",
                ],
                "status_note": "Project is done and ready for extended lab testing; accuracy still depends on lighting/placement.",
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
                    "A fast-paced real-time strategy game about building Santa's workshop "
                    "across procedurally generated snowy islands while meeting gift quotas "
                    "and surviving child raids. Each failed run feeds permanent upgrades "
                    "for the next attempt."
                ),
                "technologies": ["Arcade 3", "Python"],
                "link": "https://github.com/gran4/RTSGameV2",
                "image": "images/SantaFestDestiny.png",
                "highlights": [
                    "Upgraded the engine to Arcade 3 in 2025 for smoother performance and better visuals.",
                    "Iterated on adjustable game speed, save system, and permanent progression UI.",
                    "Started in a middle-school elective and kept expanding through self-study.",
                ],
                "status_note": "Actively maintained hobby project with ongoing content updates.",
            },
            {
                "title": "AI-InvestiBot",
                "description": (
                    "An experimental stock-modeling framework that lets me compare "
                    "indicator-heavy LSTM architectures, walk-forward validation setups, "
                    "and automated decision votes without touching live markets."
                ),
                "technologies": ["Python", "PyTorch", "Pandas"],
                "link": "https://github.com/gran4/AI-InvestiBot",
                "image": "images/AI-Investibot.png",
                "highlights": [
                    "Reusable pipeline handles data download, indicator caching, model training, and walk-forward evaluation.",
                    "Decision layer aggregates multiple strategy votes so I can compare price, return, and directional models.",
                ],
                "status_note": (
                    "Core training + validation loop works; I’m iterating on additional tests "
                    "and refinements before automating more strategies."
                ),
            },
        ],
    },
    "interests": [
        "Human-centered design",
        "Edge AI and embedded systems",
        "Soccer",
        "Community STEM mentorship",
    ],
    "milestones": [
        {
            "year": "2008",
            "title": "Born",
            "detail": "May 22, 2008",
            "image": "images/milestone-placeholder.svg",
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
            "image": "images/milestone-placeholder.svg",
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
