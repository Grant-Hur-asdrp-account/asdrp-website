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

    const clamp = (value, min, max) => Math.min(Math.max(value, min), max);
    const lockOffset = 160;
    let locked = false;
    let released = false;
    let lockY = 0;
    let lastScrollY = window.scrollY;

    const getBounds = () => {
        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.offsetHeight;
        return { sectionTop, sectionBottom };
    };

    const isWithinZone = (scrollY) => {
        const { sectionTop, sectionBottom } = getBounds();
        const lockPoint = scrollY + lockOffset;
        return lockPoint >= sectionTop && lockPoint <= sectionBottom;
    };

    const lockScroll = () => {
        if (locked) {
            return;
        }
        const { sectionTop } = getBounds();
        lockY = sectionTop - lockOffset;
        window.scrollTo(0, lockY);
        locked = true;
    };

    const unlockScroll = () => {
        if (!locked) {
            return;
        }
        locked = false;
        released = true;
    };

    const onWindowScroll = () => {
        if (!isScrollable()) {
            return;
        }
        const currentY = window.scrollY;

        if (released) {
            if (!isWithinZone(currentY)) {
                released = false;
            }
            lastScrollY = currentY;
            return;
        }

        if (!locked) {
            const { sectionTop, sectionBottom } = getBounds();
            const wasAbove = lastScrollY + lockOffset < sectionTop;
            const wasBelow = lastScrollY + lockOffset > sectionBottom;
            const nowWithin = isWithinZone(currentY);
            const crossedDown = wasAbove && nowWithin;
            const crossedUp = wasBelow && nowWithin;

            if (crossedDown || crossedUp) {
                lockScroll();
            }
        }

        if (locked && currentY !== lockY) {
            window.scrollTo(0, lockY);
        }

        lastScrollY = currentY;
    };

    window.addEventListener("scroll", onWindowScroll, { passive: true });

    window.addEventListener(
        "wheel",
        (event) => {
            if (!isScrollable()) {
                return;
            }

            if (event.ctrlKey || event.metaKey) {
                return;
            }

            if (!locked) {
                return;
            }

            if (!event.cancelable) {
                return;
            }

            if (!locked) {
                lockScroll();
            }

            const delta = event.deltaY;
            const maxScroll = scroller.scrollHeight - scroller.clientHeight;
            const atTop = scroller.scrollTop <= 1;
            const atBottom = scroller.scrollTop >= maxScroll - 2;

            if ((delta < 0 && atTop) || (delta > 0 && atBottom)) {
                unlockScroll();
                return;
            }

            event.preventDefault();
            scroller.scrollTop = clamp(
                scroller.scrollTop + delta * 0.32,
                0,
                maxScroll
            );
            if (window.scrollY !== lockY) {
                window.scrollTo(0, lockY);
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
