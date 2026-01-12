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
            "GitHub": "https://github.com/Grant-Hur-asdrp-account",
            "LinkedIn": "https://www.linkedin.com/feed/",
        },
    },
    "courses": [
        {
            "name": "AP Computer Science A",
            "term": "2023-2024",
            "topics": ["Java", "Data Structures", "Object-Oriented Design"],
        },
        {
            "name": "Multivariable Calculus",
            "term": "Fall 2024",
            "topics": ["Vector Calculus", "Applications", "Proof Writing"],
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
                    "title": "Low-Cost Air Quality Monitor",
                    "summary": (
                        "Led hardware integration and calibration for a portable PM2.5 "
                        "monitor that streams data to a Flask dashboard."
                    ),
                },
                {
                    "title": "STEM Outreach Portal",
                    "summary": (
                        "Built a student-facing portal to catalog research programs, "
                        "using peer feedback to refine UX and onboarding."
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
                "technologies": ["Swift", "Firebase Auth", "Firestore", "Kotlin (planned)"],
                "link": "https://github.com/Grant-Hur-asdrp-account/asdrp-mobile-app",
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
                "title": "Low-Cost Air Quality Monitor",
                "description": (
                    "Designed and assembled a portable PM2.5 monitor with Python-based "
                    "data logging and a responsive web dashboard."
                ),
                "technologies": ["Python", "Flask", "CircuitPython", "Tailwind"],
                "link": "https://github.com/Grant-Hur-asdrp-account/air-quality-monitor",
                "image": "images/project-air-quality.svg",
                "highlights": [
                    "Rapid prototypes let us validate sensors with real outdoor readings.",
                    "Documented calibration workflow for the next ASDRP cohort.",
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
                "link": "https://github.com/Grant-Hur-asdrp-account/project-deep-freezer",
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
                "title": "STEM Outreach Portal",
                "description": (
                    "Built a resource hub for local students to discover research programs, "
                    "complete with search, bookmarking, and newsletter automation."
                ),
                "technologies": ["React", "Firebase", "SendGrid"],
                "link": "https://github.com/Grant-Hur-asdrp-account/stem-portal",
                "image": "images/project-portal.svg",
            },
            {
                "title": "Smart Habit Tracker",
                "description": (
                    "A cross-platform tracker that syncs with wearables and uses "
                    "lightweight ML to nudge better routines."
                ),
                "technologies": ["Flutter", "Firebase", "Python"],
                "link": "https://github.com/Grant-Hur-asdrp-account/habit-tracker",
                "image": "images/project-habits.svg",
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
