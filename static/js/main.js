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

    const isSmallScreen = window.matchMedia("(max-width: 991.98px)").matches;
    const isCoarsePointer = window.matchMedia("(pointer: coarse)").matches;
    const isTouchDevice =
        "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isCoarsePointer || (isSmallScreen && isTouchDevice)) {
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
    const getLineHeight = () => {
        const bodyStyle = window.getComputedStyle(document.body);
        const htmlStyle = window.getComputedStyle(document.documentElement);
        const bodyLine = parseFloat(bodyStyle.lineHeight);
        if (Number.isFinite(bodyLine)) {
            return bodyLine;
        }
        const htmlLine = parseFloat(htmlStyle.lineHeight);
        if (Number.isFinite(htmlLine)) {
            return htmlLine;
        }
        const fontSize = parseFloat(htmlStyle.fontSize);
        return Number.isFinite(fontSize) ? fontSize * 1.2 : 16;
    };
    const getWheelDelta = (event) => {
        let delta = event.deltaY;
        if (event.deltaMode === 1) {
            delta *= getLineHeight();
        } else if (event.deltaMode === 2) {
            delta *= window.innerHeight;
        }
        return delta;
    };
    const getLockOffset = () => {
        const styles = getComputedStyle(document.documentElement);
        const navHeight = parseFloat(styles.getPropertyValue("--navbar-height")) || 0;
        const progressHeight =
            parseFloat(styles.getPropertyValue("--scroll-progress-height")) || 0;
        const safeAreaTop =
            parseFloat(styles.getPropertyValue("--safe-area-top")) || 0;
        const basePad =
            parseFloat(styles.getPropertyValue("--timeline-lock-padding")) || 32;
        const shortPad = parseFloat(
            styles.getPropertyValue("--timeline-lock-padding-short")
        );
        const timelinePad =
            window.innerHeight < 700 && Number.isFinite(shortPad)
                ? shortPad
                : basePad;
        return navHeight + progressHeight + safeAreaTop + timelinePad;
    };
    let lockOffset = getLockOffset();
    window.__timelineLockOffset = lockOffset;
    let locked = false;
    let lockAnimating = false;
    let released = false;
    let lockY = 0;
    let lastScrollY = window.scrollY;
    let keyLockIntent = false;
    let keyLockIntentTime = 0;
    const keyLockIntentWindow = 180;
    window.__timelineLocked = locked;
    window.__timelineLockY = lockY;
    window.__timelineScrollTop = 0;

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
        cancelWindowKeyScroll();
        lockY = getLockY();
        html.style.scrollBehavior = "auto";
        locked = true;
        window.__timelineLocked = true;
        window.__timelineLockY = lockY;
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
        window.__timelineLocked = false;
        html.style.scrollBehavior = "";
    };

    const unlockBuffer = 140;
    const wheelSpeed = 1.25;
    const entryCarryBoost = 1.2;
    let keyScrollRaf = null;
    let restoreScrollRaf = null;
    let windowKeyRaf = null;
    let windowKeyPending = 0;
    let edgeExitCarry = 0;
    let edgeExitDir = 0;
    const isTimelineTarget = (target) => {
        if (!target) {
            return false;
        }
        return target === scroller || scroller.contains(target);
    };
    const scheduleScrollBehaviorRestore = () => {
        if (restoreScrollRaf) {
            cancelAnimationFrame(restoreScrollRaf);
        }
        restoreScrollRaf = requestAnimationFrame(() => {
            restoreScrollRaf = null;
            if (!locked) {
                html.style.scrollBehavior = "";
            }
        });
    };
    const applyWindowScrollTo = (targetY, behavior = "auto") => {
        if (behavior === "smooth") {
            if (restoreScrollRaf) {
                cancelAnimationFrame(restoreScrollRaf);
                restoreScrollRaf = null;
            }
            html.style.scrollBehavior = "";
            window.scrollTo({ top: targetY, behavior: "smooth" });
            return;
        }
        html.style.scrollBehavior = "auto";
        window.scrollTo(0, targetY);
        scheduleScrollBehaviorRestore();
    };
    const applyWindowScrollBy = (deltaY, behavior = "auto") => {
        if (behavior === "smooth") {
            if (restoreScrollRaf) {
                cancelAnimationFrame(restoreScrollRaf);
                restoreScrollRaf = null;
            }
            html.style.scrollBehavior = "";
            window.scrollBy({ top: deltaY, behavior: "smooth" });
            return;
        }
        html.style.scrollBehavior = "auto";
        window.scrollBy(0, deltaY);
        scheduleScrollBehaviorRestore();
    };
    const refreshLockMetrics = () => {
        lockOffset = getLockOffset();
        window.__timelineLockOffset = lockOffset;
        if (!isScrollable()) {
            if (locked) {
                unlockScroll();
            }
            syncTimelineScroll();
            lastScrollY = window.scrollY;
            return;
        }

        const nextLockY = getLockY();
        lockY = nextLockY;
        if (locked) {
            window.__timelineLockY = lockY;
            html.style.scrollBehavior = "auto";
            window.scrollTo(0, lockY);
            scheduleScrollBehaviorRestore();
        }
        syncTimelineScroll();
        lastScrollY = window.scrollY;
        window.dispatchEvent(new Event("timeline-scroll"));
    };
    const cancelWindowKeyScroll = () => {
        if (windowKeyRaf) {
            cancelAnimationFrame(windowKeyRaf);
            windowKeyRaf = null;
        }
        windowKeyPending = 0;
    };
    const smoothWindowScrollBy = (delta) => {
        windowKeyPending += delta;
        if (windowKeyRaf) {
            return;
        }
        const tick = () => {
            if (Math.abs(windowKeyPending) < 0.5) {
                windowKeyPending = 0;
                windowKeyRaf = null;
                return;
            }
            const doc = document.documentElement;
            const maxY = doc.scrollHeight - doc.clientHeight;
            const step = clamp(windowKeyPending, -40, 40);
            const targetY = clamp(window.scrollY + step, 0, maxY);
            const actualStep = targetY - window.scrollY;
            if (Math.abs(actualStep) < 0.5) {
                windowKeyPending = 0;
                windowKeyRaf = null;
                return;
            }
            applyWindowScrollBy(actualStep);
            windowKeyPending -= actualStep;
            windowKeyRaf = requestAnimationFrame(tick);
        };
        windowKeyRaf = requestAnimationFrame(tick);
    };
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

    const syncTimelineScroll = () => {
        window.__timelineScrollTop = scroller.scrollTop;
    };

    const scrollTimelineBy = (delta, windowDelta = delta) => {
        const maxScroll = scroller.scrollHeight - scroller.clientHeight;
        const startTop = scroller.scrollTop;
        const desiredTop = startTop + delta;
        const nextTop = clamp(desiredTop, 0, maxScroll);
        scroller.scrollTop = nextTop;
        syncTimelineScroll();

        const consumedTimeline = nextTop - startTop;
        const leftoverTimeline = delta - consumedTimeline;
        const speed = windowDelta !== 0 ? delta / windowDelta : 1;

        if (Math.abs(leftoverTimeline) > 0.5 && speed !== 0) {
            const leftoverRaw = leftoverTimeline / speed;
            unlockScroll();
            applyWindowScrollTo(lockY + leftoverRaw);
            return false;
        }

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
            const boostedCarry = carryDelta * entryCarryBoost;
            scrollTimelineBy(boostedCarry * wheelSpeed, boostedCarry);
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
                const remaining = delta - stepDelta * currentStep;
                if (Math.abs(remaining) > 0.5) {
                    applyWindowScrollBy(remaining);
                }
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
            const crossed = crossedLock(lastScrollY, currentY);
            if (exitedUp || exitedDown || crossed) {
                released = false;
            } else {
                lastScrollY = currentY;
                return;
            }
        }

        if (!locked) {
            if (crossedLock(lastScrollY, currentY)) {
                const targetLockY = getLockY();
                const carry = currentY - targetLockY;
                const shouldSmooth =
                    keyLockIntent &&
                    performance.now() - keyLockIntentTime < keyLockIntentWindow;
                keyLockIntent = false;
                lockWithCarry(carry, shouldSmooth);
            }
            if (
                keyLockIntent &&
                performance.now() - keyLockIntentTime >= keyLockIntentWindow
            ) {
                keyLockIntent = false;
            }
        }

        if (locked && !lockAnimating && currentY !== lockY) {
            const windowDelta = currentY - lockY;
            scrollTimelineBy(windowDelta, windowDelta);
            lastScrollY = lockY;
            return;
        }

        lastScrollY = currentY;
    };

    window.addEventListener("scroll", onWindowScroll, { passive: true });
    window.addEventListener("resize", refreshLockMetrics);
    window.addEventListener("load", refreshLockMetrics);
    if ("ResizeObserver" in window) {
        let resizeRaf = null;
        const scheduleRefresh = () => {
            if (resizeRaf) {
                return;
            }
            resizeRaf = requestAnimationFrame(() => {
                resizeRaf = null;
                refreshLockMetrics();
            });
        };
        const resizeObserver = new ResizeObserver(scheduleRefresh);
        resizeObserver.observe(section);
        resizeObserver.observe(scroller);
    }

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
                const predictedY = window.scrollY + getWheelDelta(event);
                if (crossedLock(window.scrollY, predictedY)) {
                    event.preventDefault();
                    const targetLockY = getLockY();
                    const distanceToLock = targetLockY - window.scrollY;
                    const carry = getWheelDelta(event) - distanceToLock;
                    lockWithCarry(carry);
                }
                return;
            }

            const rawDelta = getWheelDelta(event);
            const maxScroll = scroller.scrollHeight - scroller.clientHeight;
            const atTop = scroller.scrollTop <= 1;
            const atBottom = scroller.scrollTop >= maxScroll - 1;
            const wantsUp = rawDelta < 0;
            const wantsDown = rawDelta > 0;
            if ((atTop && wantsUp) || (atBottom && wantsDown)) {
                event.preventDefault();
                const dir = Math.sign(rawDelta);
                if (edgeExitDir !== 0 && dir !== edgeExitDir) {
                    edgeExitCarry = 0;
                }
                edgeExitDir = dir;
                edgeExitCarry += rawDelta;
                if (Math.abs(edgeExitCarry) >= 24) {
                    const carry = edgeExitCarry;
                    edgeExitCarry = 0;
                    edgeExitDir = 0;
                    unlockScroll();
                    applyWindowScrollBy(carry);
                }
                return;
            }
            edgeExitCarry = 0;
            edgeExitDir = 0;
            const delta = rawDelta * wheelSpeed;
            event.preventDefault();
            scrollTimelineBy(delta, rawDelta);
        },
        { passive: false, capture: true }
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
        const isTimelineKeyTarget = isTimelineTarget(event.target);

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

        if (!locked && !isTimelineKeyTarget) {
            keyLockIntent = true;
            keyLockIntentTime = performance.now();
            return;
        }

        event.preventDefault();
        if (!locked) {
            if (!released) {
                const predictedY =
                    delta === Infinity
                        ? Number.POSITIVE_INFINITY
                        : delta === -Infinity
                          ? Number.NEGATIVE_INFINITY
                          : window.scrollY + delta;
                if (crossedLock(window.scrollY, predictedY)) {
                    let carry = 0;
                    if (Number.isFinite(delta)) {
                        const targetLockY = getLockY();
                        const distanceToLock = targetLockY - window.scrollY;
                        carry = delta - distanceToLock;
                    }
                    lockScroll(true);
                    if (Number.isFinite(delta) && Math.abs(carry) > 0.5) {
                        if (useSmooth) {
                            smoothScrollTimelineBy(carry);
                        } else {
                            scrollTimelineBy(carry);
                        }
                    }
                    return;
                }
            }
            if (delta === -Infinity) {
                applyWindowScrollTo(0, "smooth");
                return;
            }
            if (delta === Infinity) {
                const doc = document.documentElement;
                const maxY = doc.scrollHeight - doc.clientHeight;
                applyWindowScrollTo(maxY, "smooth");
                return;
            }
            if (Number.isFinite(delta)) {
                applyWindowScrollBy(delta, "smooth");
            }
            return;
        }
        const maxScroll = scroller.scrollHeight - scroller.clientHeight;
        if (Number.isFinite(delta)) {
            const startTop = scroller.scrollTop;
            const desiredTop = startTop + delta;
            const nextTop = clamp(desiredTop, 0, maxScroll);
            const consumedTimeline = nextTop - startTop;
            const leftover = delta - consumedTimeline;

            if (Math.abs(leftover) > 0.5) {
                if (keyScrollRaf) {
                    cancelAnimationFrame(keyScrollRaf);
                    keyScrollRaf = null;
                }
                scroller.scrollTop = nextTop;
                unlockScroll();
                applyWindowScrollTo(lockY + leftover);
                window.dispatchEvent(new Event("timeline-scroll"));
                return;
            }
        }
        if (delta === -Infinity) {
            scroller.scrollTop = 0;
            syncTimelineScroll();
            if (window.scrollY !== lockY) {
                window.scrollTo(0, lockY);
            }
            return;
        }
        if (delta === Infinity) {
            scroller.scrollTop = maxScroll;
            syncTimelineScroll();
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
