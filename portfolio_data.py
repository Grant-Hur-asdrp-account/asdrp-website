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
    "projects": [
        {
            "title": "Low-Cost Air Quality Monitor",
            "description": (
                "Designed and assembled a portable PM2.5 monitor with Python-based "
                "data logging and a responsive web dashboard."
            ),
            "technologies": ["Python", "Flask", "CircuitPython", "Tailwind"],
            "link": "https://github.com/Grant-Hur-asdrp-account/air-quality-monitor",
            "image": "images/project-air-quality.svg",
        },
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
    ],
    "interests": [
        "Human-centered design",
        "Edge AI and embedded systems",
        "Soccer",
        "Community STEM mentorship",
    ],
}
