"""Central place to update personal content shown throughout the site."""

PORTFOLIO = {
    "personal": {
        "name": "Grant Hur",
        "grade": "12th Grade",
        "school": "ASDRP Academy",
        "location": "San Jose, CA",
        "bio": (
            "Aspiring engineer focused on blending software, hardware, and design to "
            "solve real-world problems. I enjoy building polished tools that feel "
            "delightful on both desktop and mobile devices."
        ),
        "tagline": "Student Researcher • Builder • Problem Solver",
        "photo": "images/profile-placeholder.svg",  # Replace with your own photo
        "resume_static_path": None,  # e.g. "documents/grant-hur-resume.pdf"
        "email": "you@example.com",
        "phone": "(555) 123-4567",
        "socials": {
            "GitHub": "https://github.com/Grant-Hur-asdrp-account",
            "LinkedIn": "https://www.linkedin.com/in/example",
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
            "name": "ASDRP Research Lab",
            "term": "2024-2025",
            "topics": ["Machine Learning", "Electronics", "Technical Writing"],
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
        "Rock climbing and trail running",
        "Community STEM mentorship",
    ],
}

