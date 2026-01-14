document.addEventListener("DOMContentLoaded", () => {
    document.documentElement.classList.add("js-enabled");

    const initScrollProgress = () => {
        const bar = document.querySelector("[data-scroll-progress]");
        if (!bar) {
            return;
        }

        const updateProgress = () => {
            const doc = document.documentElement;
            const scrollTop = doc.scrollTop || document.body.scrollTop;
            const scrollHeight = doc.scrollHeight - doc.clientHeight;
            let virtualScroll = scrollTop;
            let virtualMax = scrollHeight;

            const timeline = document.querySelector("#timeline");
            const scroller = document.querySelector("[data-timeline-scroll]");
            if (timeline && scroller) {
                const maxExtra = scroller.scrollHeight - scroller.clientHeight;
                if (maxExtra > 0) {
                    const lockTarget =
                        timeline.querySelector("[data-timeline-lock]") ||
                        timeline;
                    const lockOffset = window.__timelineLockOffset || 0;
                    const timelineTop =
                        timeline.getBoundingClientRect().top + scrollTop;
                    const timelineBottom =
                        timelineTop + timeline.offsetHeight;
                    const lockTargetTop =
                        lockTarget.getBoundingClientRect().top + scrollTop;
                    const lockStartFallback = lockTargetTop - lockOffset;
                    const lockStart = Number.isFinite(window.__timelineLockY)
                        ? window.__timelineLockY
                        : lockStartFallback;
                    const timelineScrollTop = Number.isFinite(window.__timelineScrollTop)
                        ? window.__timelineScrollTop
                        : scroller.scrollTop;

                    virtualMax += maxExtra;
                    if (scrollTop >= timelineBottom - lockOffset) {
                        virtualScroll = scrollTop + maxExtra;
                    } else if (
                        scrollTop >= lockStart ||
                        timelineScrollTop > 0 ||
                        window.__timelineLocked
                    ) {
                        virtualScroll = scrollTop + timelineScrollTop;
                    }
                }
            }

            const progress = virtualMax > 0 ? virtualScroll / virtualMax : 0;
            bar.style.transform = `scaleX(${progress})`;
        };

        let ticking = false;
        const onScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    updateProgress();
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener("scroll", onScroll);
        window.addEventListener("resize", updateProgress);
        const timelineScroller = document.querySelector("[data-timeline-scroll]");
        if (timelineScroller) {
            timelineScroller.addEventListener("scroll", onScroll);
        }
        window.addEventListener("timeline-scroll", onScroll);
        updateProgress();
    };

    initScrollProgress();

    window.requestAnimationFrame(() => {
        document.body.classList.add("page-loaded");
    });

    const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
        return;
    }

    document.addEventListener("click", (event) => {
        const link = event.target.closest("a");
        if (!link) {
            return;
        }

        const href = link.getAttribute("href");
        if (!href || href.startsWith("#")) {
            return;
        }

        if (link.target === "_blank" || link.hasAttribute("download")) {
            return;
        }

        if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
            return;
        }

        const url = new URL(href, window.location.href);
        if (url.origin !== window.location.origin) {
            return;
        }

        event.preventDefault();
        document.body.classList.remove("page-loaded");
        document.body.classList.add("page-exit");

        window.setTimeout(() => {
            window.location.href = url.href;
        }, 180);
    });
});
