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

    const isScrollable = () =>
        scroller.scrollHeight > scroller.clientHeight + 2;

    const isInView = () => {
        const rect = section.getBoundingClientRect();
        return rect.top < window.innerHeight && rect.bottom > 0;
    };

    const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

    document.addEventListener(
        "wheel",
        (event) => {
            if (!isScrollable()) {
                return;
            }

            if (event.ctrlKey || event.metaKey) {
                return;
            }

            if (!isInView()) {
                return;
            }

            const delta = event.deltaY;
            const maxScroll = scroller.scrollHeight - scroller.clientHeight;
            const atTop = scroller.scrollTop <= 1;
            const atBottom = scroller.scrollTop >= maxScroll - 1;

            if ((delta < 0 && atTop) || (delta > 0 && atBottom)) {
                return;
            }

            event.preventDefault();
            scroller.scrollTop = clamp(
                scroller.scrollTop + delta * 0.35,
                0,
                maxScroll
            );
        },
        { passive: false }
    );
};

document.addEventListener("DOMContentLoaded", () => {
    initRevealAnimations();
    initTimelineHighlight();
    initTimelineScrollLock();
});
