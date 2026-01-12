const initRevealAnimations = () => {
    const items = Array.from(document.querySelectorAll("[data-reveal]"));
    if (items.length === 0) {
        return;
    }

    const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
        items.forEach((item) => item.classList.add("is-visible"));
        return;
    }

    if (window.gsap && window.ScrollTrigger) {
        window.gsap.registerPlugin(window.ScrollTrigger);
        items.forEach((item) => {
            const delay = Number(item.dataset.revealDelay || 0);
            window.gsap.fromTo(
                item,
                { autoAlpha: 0, y: 24 },
                {
                    autoAlpha: 1,
                    y: 0,
                    duration: 0.8,
                    ease: "power2.out",
                    delay,
                    scrollTrigger: {
                        trigger: item,
                        start: "top 85%",
                        once: true,
                    },
                }
            );
        });
        return;
    }

    const observer = new IntersectionObserver(
        (entries, io) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    io.unobserve(entry.target);
                }
            });
        },
        { rootMargin: "0px 0px -10% 0px", threshold: 0.1 }
    );

    items.forEach((item) => observer.observe(item));
};

const initTimelineHighlight = () => {
    const items = Array.from(document.querySelectorAll("[data-timeline]"));
    if (items.length === 0) {
        return;
    }

    const setActive = (target) => {
        items.forEach((item) => {
            item.classList.toggle("is-active", item === target);
        });
    };

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActive(entry.target);
                }
            });
        },
        { rootMargin: "-10% 0px -55% 0px", threshold: 0.1 }
    );

    items.forEach((item) => observer.observe(item));
    setActive(items[0]);
};

const initTimelineScrollLock = () => {
    const section = document.querySelector("#timeline");
    const scroller = document.querySelector("[data-timeline-scroll]");
    if (!section || !scroller) {
        return;
    }

    const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
        return;
    }

    let active = false;
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.target === section) {
                    active = entry.isIntersecting;
                }
            });
        },
        { threshold: 0.6 }
    );

    observer.observe(section);

    document.addEventListener(
        "wheel",
        (event) => {
            if (!active) {
                return;
            }

            if (event.ctrlKey || event.metaKey) {
                return;
            }

            const delta = event.deltaY;
            const atTop = scroller.scrollTop <= 0;
            const atBottom =
                scroller.scrollTop + scroller.clientHeight >=
                scroller.scrollHeight - 1;

            if ((delta < 0 && atTop) || (delta > 0 && atBottom)) {
                return;
            }

            event.preventDefault();
            scroller.scrollBy({ top: delta, left: 0 });
        },
        { passive: false }
    );
};

document.addEventListener("DOMContentLoaded", () => {
    initRevealAnimations();
    initTimelineHighlight();
    initTimelineScrollLock();
});
