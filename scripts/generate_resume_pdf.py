#!/usr/bin/env python3
"""Generate a one-page resume PDF with a classic serif layout."""

from pathlib import Path
import sys

PROJECT_ROOT = Path(__file__).resolve().parents[1]
if str(PROJECT_ROOT) not in sys.path:
    sys.path.insert(0, str(PROJECT_ROOT))

from portfolio_data import PORTFOLIO


PAGE_WIDTH = 612
PAGE_HEIGHT = 792
LEFT = 36
RIGHT = 576


def escape_pdf_text(text: str) -> str:
    return text.replace("\\", "\\\\").replace("(", "\\(").replace(")", "\\)")


def width_factor(font: str) -> float:
    factors = {
        "F1": 0.47,  # Times-Roman
        "F2": 0.50,  # Times-Bold
        "F3": 0.47,  # Times-Italic
        "F4": 0.50,  # Times-BoldItalic
    }
    return factors.get(font, 0.48)


def text_width(text: str, font: str, size: int) -> float:
    return len(text) * size * width_factor(font)


def wrap_text(text: str, font: str, size: int, max_width: float) -> list[str]:
    words = text.split()
    if not words:
        return [""]

    lines: list[str] = []
    current = words[0]
    for word in words[1:]:
        candidate = f"{current} {word}"
        if text_width(candidate, font, size) <= max_width:
            current = candidate
        else:
            lines.append(current)
            current = word
    lines.append(current)
    return lines


def text_cmd(x: float, y: float, font: str, size: int, text: str) -> str:
    return f"BT /{font} {size} Tf {x:.2f} {y:.2f} Td ({escape_pdf_text(text)}) Tj ET"


def centered_text_cmd(y: float, font: str, size: int, text: str) -> str:
    x = (LEFT + RIGHT) / 2 - (text_width(text, font, size) / 2)
    return text_cmd(x, y, font, size, text)


def right_text_cmd(y: float, font: str, size: int, text: str) -> str:
    x = RIGHT - text_width(text, font, size)
    return text_cmd(x, y, font, size, text)


def line_cmd(x1: float, y1: float, x2: float, y2: float) -> str:
    return f"0.55 w 0 G {x1:.2f} {y1:.2f} m {x2:.2f} {y2:.2f} l S"


def clean_link(url: str) -> str:
    return url.replace("https://", "").replace("http://", "").rstrip("/")


def build_pdf(output_path: Path) -> None:
    personal = PORTFOLIO["personal"]
    socials = personal.get("socials", {})

    github_url = clean_link(socials.get("GitHub", "github.com/gran4"))
    asdrp_github_url = clean_link(
        socials.get("ASDRP GitHub", "github.com/Grant-Hur-asdrp-account")
    )
    linkedin_url = clean_link(socials.get("LinkedIn", ""))

    content: list[str] = []
    y = 754.0

    def add_centered(font: str, size: int, text: str, step: float) -> None:
        nonlocal y
        content.append(centered_text_cmd(y, font, size, text))
        y -= step

    def add_section(title: str) -> None:
        nonlocal y
        y -= 3
        content.append(text_cmd(LEFT, y, "F2", 11, title.upper()))
        y -= 3
        content.append(line_cmd(LEFT, y, RIGHT, y))
        y -= 10

    def add_entry(
        title: str,
        right_title: str,
        subtitle: str,
        right_subtitle: str,
        bullets: list[str],
    ) -> None:
        nonlocal y
        content.append(text_cmd(LEFT, y, "F2", 11, title))
        if right_title:
            content.append(right_text_cmd(y, "F2", 10, right_title))
        y -= 11

        if subtitle or right_subtitle:
            if subtitle:
                content.append(text_cmd(LEFT, y, "F3", 9, subtitle))
            if right_subtitle:
                content.append(right_text_cmd(y, "F3", 9, right_subtitle))
            y -= 10

        for bullet in bullets:
            wrapped = wrap_text(f"- {bullet}", "F1", 9, RIGHT - LEFT - 8)
            for idx, line in enumerate(wrapped):
                x = LEFT + (0 if idx == 0 else 9)
                content.append(text_cmd(x, y, "F1", 9, line))
                y -= 9.5
            y -= 1
        y -= 3

    add_centered("F2", 24, personal["name"], 20)
    contact_primary = f"{personal['phone']} | {personal['email']}"
    contact_secondary_parts = [part for part in [linkedin_url, github_url, asdrp_github_url] if part]
    contact_secondary = " | ".join(contact_secondary_parts)

    for line in wrap_text(contact_primary, "F1", 9, RIGHT - LEFT):
        add_centered("F1", 9, line, 10.5)
    for line in wrap_text(contact_secondary, "F1", 9, RIGHT - LEFT):
        add_centered("F1", 9, line, 10.5)

    y -= 2

    add_section("Education")
    add_entry(
        title="King's Academy's PSP Program",
        right_title="San Jose, CA",
        subtitle="High School, 12th Grade",
        right_subtitle="Expected May 2026",
        bullets=[
            "AP Scores: Computer Science A (5), Calculus BC (5), Chemistry (5), "
            "Physics 1 (5), US History (5), Government (5), Precalculus (5), "
            "Psychology (5), CSP (5), English Language (4).",
        ],
    )

    add_section("Experience")
    add_entry(
        title="ASDRP Student Researcher",
        right_title="San Jose, CA",
        subtitle="Applied Scientific Discovery through Research Program (ASDRP)",
        right_subtitle="Summer after 10th Grade - Present",
        bullets=[
            "Built an iOS app that centralizes ASDRP deadlines, attendance, forms, and member discovery.",
            "Implemented to-do and important-forms modules to provide lab-specific, due-date-driven workflows.",
            "Developed Project Deep Freezer: Raspberry Pi and OCR monitoring with PagerDuty alerts for freezer temperature risks.",
        ],
    )
    add_entry(
        title="STEM Mentor and AP CSP Support",
        right_title="San Jose, CA",
        subtitle="King's Academy Bridge Program",
        right_subtitle="2024 - Present",
        bullets=[
            "Mentor students in school STEM activities and support project planning and debugging.",
            "Helped teach sections of AP Computer Science Principles through Bridge.",
        ],
    )

    add_section("Projects")
    add_entry(
        title="ASDRP Mobile App",
        right_title="In Progress",
        subtitle="Swift, Firebase Auth, Firestore",
        right_subtitle="",
        bullets=[
            "Designed core student workflows for lab updates, attendance, and tasks in a single iOS interface.",
            "Implemented profile explorer and internal navigation patterns to improve discoverability across labs.",
        ],
    )
    add_entry(
        title="Project Deep Freezer",
        right_title="Completed",
        subtitle="Raspberry Pi, OpenCV, EasyOCR, PagerDuty",
        right_subtitle="",
        bullets=[
            "Built low-cost OCR-based freezer monitoring to detect temperature drift from native displays.",
            "Added ROI selection flow and OCR testing to reduce false alarms and improve reliability.",
        ],
    )
    add_entry(
        title="AI-InvestiBot",
        right_title="Completed",
        subtitle="Python, PyTorch, Pandas",
        right_subtitle="",
        bullets=[
            "Created a reusable training pipeline with walk-forward validation for stock-model experiments.",
            "Implemented model-voting evaluation to compare directional and return-based strategies.",
        ],
    )

    add_section("Technical Skills")
    skills_lines = [
        "Languages: Python, Swift, Java",
        "Frameworks: Flask, Firebase Auth, Firestore, PyTorch, OpenCV, EasyOCR",
        "Developer Tools: Git, GitHub, PagerDuty, Raspberry Pi",
        "Focus Areas: iOS app development, OCR monitoring, applied machine learning",
    ]
    for line in skills_lines:
        for wrapped in wrap_text(line, "F1", 9, RIGHT - LEFT):
            content.append(text_cmd(LEFT, y, "F1", 9, wrapped))
            y -= 10

    stream = "\n".join(content).encode("utf-8")

    objects: list[bytes] = [
        b"<< /Type /Catalog /Pages 2 0 R >>",
        b"<< /Type /Pages /Kids [3 0 R] /Count 1 >>",
        (
            b"<< /Type /Page /Parent 2 0 R /MediaBox [0 0 "
            + str(PAGE_WIDTH).encode("ascii")
            + b" "
            + str(PAGE_HEIGHT).encode("ascii")
            + b"] /Contents 4 0 R /Resources << /Font << /F1 5 0 R /F2 6 0 R /F3 7 0 R /F4 8 0 R >> >> >>"
        ),
        b"<< /Length " + str(len(stream)).encode("ascii") + b" >>\nstream\n" + stream + b"\nendstream",
        b"<< /Type /Font /Subtype /Type1 /BaseFont /Times-Roman >>",
        b"<< /Type /Font /Subtype /Type1 /BaseFont /Times-Bold >>",
        b"<< /Type /Font /Subtype /Type1 /BaseFont /Times-Italic >>",
        b"<< /Type /Font /Subtype /Type1 /BaseFont /Times-BoldItalic >>",
    ]

    out = bytearray()
    out.extend(b"%PDF-1.4\n%\n")
    offsets = [0]

    for idx, obj in enumerate(objects, start=1):
        offsets.append(len(out))
        out.extend(f"{idx} 0 obj\n".encode("ascii"))
        out.extend(obj)
        out.extend(b"\nendobj\n")

    xref_offset = len(out)
    out.extend(f"xref\n0 {len(offsets)}\n".encode("ascii"))
    out.extend(b"0000000000 65535 f \n")
    for offset in offsets[1:]:
        out.extend(f"{offset:010d} 00000 n \n".encode("ascii"))

    out.extend(
        (
            "trailer\n"
            f"<< /Size {len(offsets)} /Root 1 0 R >>\n"
            f"startxref\n{xref_offset}\n"
            "%%EOF\n"
        ).encode("ascii")
    )

    output_path.parent.mkdir(parents=True, exist_ok=True)
    output_path.write_bytes(out)


if __name__ == "__main__":
    build_pdf(Path("static/documents/grant-hur-resume.pdf"))
