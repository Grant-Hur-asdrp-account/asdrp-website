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
    "courses": [
        {
            "name": "AP US History",
            "term": "9th Grade",
            "topics": ["Historical Analysis", "Essay Writing", "College Board Exam 5"],
        },
        {
            "name": "AP Precalculus",
            "term": "10th Grade",
            "topics": ["Functions", "Trigonometry", "Exam Score 5"],
        },
        {
            "name": "AP Government & Politics",
            "term": "10th Grade",
            "topics": ["Civics", "Policy Analysis", "Exam Score 5"],
        },
        {
            "name": "AP Computer Science Principles",
            "term": "10th Grade",
            "topics": ["Computational Thinking", "Creative Project", "Exam Score 5"],
        },
        {
            "name": "AP Psychology",
            "term": "10th Grade",
            "topics": ["Cognition", "Behavioral Science", "Exam Score 5"],
        },
        {
            "name": "AP English Language & Composition",
            "term": "11th Grade",
            "topics": ["Rhetorical Analysis", "Argumentation", "Exam Score 4"],
        },
        {
            "name": "AP Chemistry",
            "term": "11th Grade",
            "topics": ["Stoichiometry", "Thermodynamics", "Exam Score 5"],
        },
        {
            "name": "AP Physics 1",
            "term": "11th Grade",
            "topics": ["Mechanics", "Laboratory Skills", "Exam Score 5"],
        },
        {
            "name": "AP Calculus BC",
            "term": "11th Grade",
            "topics": ["Series", "Differential Equations", "Exam Score 5"],
        },
        {
            "name": "AP Computer Science A",
            "term": "11th Grade",
            "topics": ["Java", "Data Structures", "Exam Score 5"],
        },
        {
            "name": "AP English Literature",
            "term": "12th Grade",
            "topics": ["Literary Analysis", "Comparative Essays"],
        },
        {
            "name": "AP Statistics",
            "term": "12th Grade",
            "topics": ["Probability", "Inference"],
        },
        {
            "name": "AP Physics C: Mechanics",
            "term": "12th Grade",
            "topics": ["Classical Mechanics", "Calculus-based Modeling"],
        },
        {
            "name": "AP World History",
            "term": "12th Grade",
            "topics": ["Global Perspectives", "Essay Writing"],
        },
        {
            "name": "ASDRP Research Fellowship",
            "term": "2024-2025",
            "topics": ["iOS Mobile Development", "Electronics", "Technical Writing"],
            "description": (
                "A year-long independent study at ASDRP focused on building polished "
                "prototypes and documenting each iteration from proposal to poster."
            ),
            "projects": [
                {
                    "title": "ASDRP Mobile App",
                    "summary": (
                        "Centralized to-do lists, profile explorer, and attendance system "
                        "to reduce program communication overload."
                    ),
                },
                {
                    "title": "Project Deep Freezer",
                    "summary": (
                        "Raspberry Pi + OCR monitoring system that sends alerts when "
                        "ultra-low freezers drift out of range."
                    ),
                },
            ],
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
}
