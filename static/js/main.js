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
    const html = document.documentElement;
    const lockOffset = 190;
    window.__timelineLockOffset = lockOffset;
    let locked = false;
    let lockAnimating = false;
    let released = false;
    let lockY = 0;
    let lastScrollY = window.scrollY;

    const lockTarget = section.querySelector("[data-timeline-lock]") || section;
    const getTop = (element) => element.getBoundingClientRect().top + window.scrollY;

    const getBounds = () => {
        const sectionTop = getTop(section);
        const sectionBottom = sectionTop + section.offsetHeight;
        const lockTop = getTop(lockTarget);
        return { sectionTop, sectionBottom, lockTop };
    };

    const getLockPoint = (scrollY) => scrollY + lockOffset;

    const getLockY = () => {
        const { lockTop } = getBounds();
        return lockTop - lockOffset;
    };

    const crossedLock = (prevY, nextY) => {
        const lockY = getLockY();
        const minY = Math.min(prevY, nextY);
        const maxY = Math.max(prevY, nextY);
        return minY <= lockY && maxY >= lockY;
    };

    const lockScroll = (smooth = false) => {
        if (locked) {
            return;
        }
        lockY = getLockY();
        html.style.scrollBehavior = "auto";
        locked = true;
        if (!smooth) {
            window.scrollTo(0, lockY);
            return;
        }

        lockAnimating = true;
        const startY = window.scrollY;
        const distance = lockY - startY;
        const duration = 160;
        const startTime = performance.now();
        const easeOut = (t) => 1 - Math.pow(1 - t, 3);
        const tick = (now) => {
            const progress = Math.min((now - startTime) / duration, 1);
            const eased = easeOut(progress);
            window.scrollTo(0, startY + distance * eased);
            if (progress < 1 && lockAnimating) {
                requestAnimationFrame(tick);
                return;
            }
            lockAnimating = false;
            window.scrollTo(0, lockY);
        };
        requestAnimationFrame(tick);
    };

    const unlockScroll = () => {
        if (!locked) {
            return;
        }
        locked = false;
        lockAnimating = false;
        released = true;
        html.style.scrollBehavior = "";
    };

    const unlockBuffer = 140;
    const wheelSpeed = 1.25;
    let keyScrollRaf = null;
    const isEditableTarget = (target) => {
        if (!target) {
            return false;
        }
        const tag = target.tagName ? target.tagName.toLowerCase() : "";
        return (
            tag === "input" ||
            tag === "textarea" ||
            tag === "select" ||
            target.isContentEditable
        );
    };

    const scrollTimelineBy = (delta, windowDelta = delta) => {
        const maxScroll = scroller.scrollHeight - scroller.clientHeight;
        const atTop = scroller.scrollTop <= 1;
        const atBottom = scroller.scrollTop >= maxScroll - 2;

        if ((delta < 0 && atTop) || (delta > 0 && atBottom)) {
            window.scrollBy(0, windowDelta);
            unlockScroll();
            return false;
        }

        scroller.scrollTop = clamp(scroller.scrollTop + delta, 0, maxScroll);
        if (window.scrollY !== lockY) {
            window.scrollTo(0, lockY);
        }
        window.dispatchEvent(new Event("timeline-scroll"));
        return true;
    };

    const lockWithCarry = (carryDelta, smooth = false) => {
        const hasCarry = Number.isFinite(carryDelta) && Math.abs(carryDelta) > 0;
        lockScroll(smooth);
        if (hasCarry) {
            scrollTimelineBy(carryDelta * wheelSpeed, carryDelta);
        }
    };

    const smoothScrollTimelineBy = (delta) => {
        if (keyScrollRaf) {
            cancelAnimationFrame(keyScrollRaf);
        }
        const steps = 6;
        let currentStep = 0;
        const stepDelta = delta / steps;
        const tick = () => {
            if (!locked || currentStep >= steps) {
                keyScrollRaf = null;
                return;
            }
            const shouldContinue = scrollTimelineBy(stepDelta);
            currentStep += 1;
            if (!shouldContinue || !locked) {
                keyScrollRaf = null;
                return;
            }
            keyScrollRaf = requestAnimationFrame(tick);
        };
        keyScrollRaf = requestAnimationFrame(tick);
    };

    const onWindowScroll = () => {
        if (!isScrollable()) {
            return;
        }
        const currentY = window.scrollY;

        if (released) {
            const buffer = unlockBuffer;
            const exitedUp = currentY < lockY - buffer;
            const exitedDown = currentY > lockY + buffer;
            if (exitedUp || exitedDown) {
                released = false;
            }
            lastScrollY = currentY;
            return;
        }

        if (!locked) {
            if (crossedLock(lastScrollY, currentY)) {
                const targetLockY = getLockY();
                const carry = currentY - targetLockY;
                lockWithCarry(carry);
            }
        }

        if (locked && !lockAnimating && currentY !== lockY) {
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

            if (!event.cancelable) {
                return;
            }

            if (released) {
                return;
            }

            if (!locked) {
                const predictedY = window.scrollY + event.deltaY;
                if (crossedLock(window.scrollY, predictedY)) {
                    event.preventDefault();
                    const targetLockY = getLockY();
                    const distanceToLock = targetLockY - window.scrollY;
                    const carry = event.deltaY - distanceToLock;
                    lockWithCarry(carry);
                }
                return;
            }

            const rawDelta = event.deltaY;
            const delta = rawDelta * wheelSpeed;
            event.preventDefault();
            scrollTimelineBy(delta, rawDelta);
        },
        { passive: false }
    );

    window.addEventListener("keydown", (event) => {
        if (!isScrollable()) {
            return;
        }

        if (event.ctrlKey || event.metaKey || event.altKey) {
            return;
        }

        if (isEditableTarget(event.target)) {
            return;
        }

        const key = event.key;
        const pageDelta = window.innerHeight * 0.9;
        let delta = 0;
        const useSmooth = key === "ArrowDown" || key === "ArrowUp";

        if (key === "ArrowDown") {
            delta = 120;
        } else if (key === "ArrowUp") {
            delta = -120;
        } else if (key === "PageDown") {
            delta = pageDelta;
        } else if (key === "PageUp") {
            delta = -pageDelta;
        } else if (key === " " || key === "Spacebar") {
            delta = event.shiftKey ? -pageDelta : pageDelta;
        } else if (key === "Home") {
            delta = -Infinity;
        } else if (key === "End") {
            delta = Infinity;
        } else {
            return;
        }

        if (released) {
            return;
        }

        if (!locked) {
            const predictedY =
                delta === Infinity
                    ? Number.POSITIVE_INFINITY
                    : delta === -Infinity
                      ? Number.NEGATIVE_INFINITY
                      : window.scrollY + delta;
            if (crossedLock(window.scrollY, predictedY)) {
                event.preventDefault();
                lockScroll(true);
                if (Number.isFinite(delta)) {
                    if (useSmooth) {
                        smoothScrollTimelineBy(delta);
                    } else {
                        scrollTimelineBy(delta);
                    }
                }
            }
            return;
        }

        event.preventDefault();
        const maxScroll = scroller.scrollHeight - scroller.clientHeight;
        if (delta === -Infinity) {
            scroller.scrollTop = 0;
            if (window.scrollY !== lockY) {
                window.scrollTo(0, lockY);
            }
            return;
        }
        if (delta === Infinity) {
            scroller.scrollTop = maxScroll;
            if (window.scrollY !== lockY) {
                window.scrollTo(0, lockY);
            }
            return;
        }
        if (useSmooth) {
            smoothScrollTimelineBy(delta);
        } else {
            scrollTimelineBy(delta);
        }
    });
};

document.addEventListener("DOMContentLoaded", () => {
    initRevealAnimations();
    initTimelineHighlight();
    initTimelineScrollLock();
});
