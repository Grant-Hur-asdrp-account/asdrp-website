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
        return rect.top <= 120 && rect.bottom >= window.innerHeight - 120;
    };

    let targetScroll = scroller.scrollTop;
    let rafId = null;

    const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

    const animateScroll = () => {
        const current = scroller.scrollTop;
        const diff = targetScroll - current;
        if (Math.abs(diff) < 0.5) {
            scroller.scrollTop = targetScroll;
            rafId = null;
            return;
        }

        scroller.scrollTop = current + diff * 0.2;
        rafId = window.requestAnimationFrame(animateScroll);
    };

    scroller.addEventListener("scroll", () => {
        if (!rafId) {
            targetScroll = scroller.scrollTop;
        }
    });

    document.addEventListener(
        "wheel",
        (event) => {
            if (!isScrollable() || !isInView()) {
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
            const maxScroll = scroller.scrollHeight - scroller.clientHeight;
            targetScroll = clamp(targetScroll + delta * 0.32, 0, maxScroll);
            if (!rafId) {
                rafId = window.requestAnimationFrame(animateScroll);
            }
        },
        { passive: false }
    );
};

document.addEventListener("DOMContentLoaded", () => {
    initRevealAnimations();
    initTimelineHighlight();
    initTimelineScrollLock();
});
