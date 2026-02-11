document.addEventListener("DOMContentLoaded", () => {
    document.documentElement.classList.add("js-enabled");

    const initNavbarHeight = () => {
        const nav = document.querySelector(".navbar");
        if (!nav) {
            return;
        }

        const update = () => {
            const height = nav.getBoundingClientRect().height;
            if (height > 0) {
                document.documentElement.style.setProperty(
                    "--navbar-height",
                    `${height}px`
                );
            }
        };

        update();
        window.addEventListener("resize", update);
        window.addEventListener("orientationchange", update);
    };

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
                    const lockStart =
                        window.__timelineLocked &&
                        Number.isFinite(window.__timelineLockY)
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

    initNavbarHeight();
    initScrollProgress();

    const initNavbarOffcanvas = () => {
        const toggler = document.querySelector(".navbar-toggler");
        const collapse = document.querySelector("#mainNav");
        const backdrop = document.querySelector("[data-nav-backdrop]");
        if (!toggler || !collapse) {
            return;
        }

        if (!backdrop) {
            return;
        }

        const hasBootstrap =
            window.bootstrap && typeof window.bootstrap.Collapse === "function";

        const syncExpanded = (expanded) => {
            document.body.classList.toggle("nav-open", expanded);
            document.documentElement.classList.toggle("nav-open", expanded);
            backdrop.classList.toggle("is-visible", expanded);
            toggler.setAttribute("aria-expanded", expanded ? "true" : "false");
            if (!hasBootstrap) {
                collapse.classList.toggle("show", expanded);
            }
        };

        const isOpen = () =>
            collapse.classList.contains("show") ||
            collapse.classList.contains("collapsing");
        const collapseInstance = hasBootstrap
            ? window.bootstrap.Collapse.getOrCreateInstance(collapse, {
                  toggle: false,
              })
            : null;
        const requestClose = () => {
            if (hasBootstrap && collapseInstance) {
                collapseInstance.hide();
                return;
            }
            syncExpanded(false);
        };

        toggler.addEventListener("click", (event) => {
            if (hasBootstrap) {
                return;
            }
            event.preventDefault();
            syncExpanded(!isOpen());
        });

        backdrop.addEventListener("click", () => {
            requestClose();
        });

        collapse.addEventListener("click", (event) => {
            const link = event.target.closest("a");
            if (!link) {
                return;
            }
            requestClose();
        });

        document.addEventListener("keydown", (event) => {
            if (event.key !== "Escape") {
                return;
            }
            if (!isOpen()) {
                return;
            }
            requestClose();
        });

        if (hasBootstrap) {
            collapse.addEventListener("shown.bs.collapse", () => {
                syncExpanded(true);
            });
            collapse.addEventListener("hidden.bs.collapse", () => {
                syncExpanded(false);
            });
        }
    };

    initNavbarOffcanvas();

    const initArtifactDrawer = () => {
        const drawer = document.querySelector("[data-artifact-drawer]");
        if (!drawer) {
            return;
        }

        const toggle = drawer.querySelector("[data-artifact-toggle]");
        const panel = drawer.querySelector("[data-artifact-panel]");
        const scrollContainer = drawer.querySelector("[data-artifact-scrollable]");
        const scrollTrack = drawer.querySelector("[data-artifact-scroll-track]");
        const scrollThumb = drawer.querySelector("[data-artifact-scroll-thumb]");
        const scroller = scrollContainer || panel;
        if (!toggle || !panel || !scroller) {
            return;
        }

        const clampValue = (value, min, max) => Math.min(max, Math.max(min, value));

        const getScrollMetrics = () => {
            if (!scrollTrack || !scrollThumb) {
                return null;
            }

            const trackHeight = scrollTrack.clientHeight;
            if (trackHeight <= 0) {
                return null;
            }

            const maxScroll = Math.max(0, scroller.scrollHeight - scroller.clientHeight);
            const minThumbHeight = 26;
            const fallbackThumbHeight = Math.min(
                trackHeight,
                Math.max(minThumbHeight, trackHeight * 0.35)
            );
            const thumbHeight =
                maxScroll <= 1
                    ? fallbackThumbHeight
                    : Math.max(
                          minThumbHeight,
                          (scroller.clientHeight / scroller.scrollHeight) * trackHeight
                      );
            const thumbTravel = Math.max(0, trackHeight - thumbHeight);

            return {
                trackHeight,
                maxScroll,
                thumbHeight,
                thumbTravel,
            };
        };

        const syncScrollIndicator = () => {
            const metrics = getScrollMetrics();
            if (!metrics || !scrollThumb) {
                return;
            }

            if (metrics.maxScroll <= 1 || metrics.thumbTravel <= 0) {
                scrollThumb.style.height = `${metrics.thumbHeight}px`;
                scrollThumb.style.transform = "translateY(0)";
                scrollThumb.style.opacity = "0.45";
                return;
            }

            const scrollRatio = clampValue(scroller.scrollTop / metrics.maxScroll, 0, 1);
            const thumbTop = metrics.thumbTravel * scrollRatio;
            scrollThumb.style.height = `${metrics.thumbHeight}px`;
            scrollThumb.style.transform = `translateY(${thumbTop}px)`;
            scrollThumb.style.opacity = "1";
        };

        const setScrollFromThumbTop = (rawThumbTop) => {
            const metrics = getScrollMetrics();
            if (!metrics) {
                return;
            }

            const thumbTop = clampValue(rawThumbTop, 0, metrics.thumbTravel);
            if (metrics.maxScroll <= 1 || metrics.thumbTravel <= 0) {
                scroller.scrollTop = 0;
                syncScrollIndicator();
                return;
            }

            const scrollRatio = thumbTop / metrics.thumbTravel;
            scroller.scrollTop = scrollRatio * metrics.maxScroll;
            syncScrollIndicator();
        };

        const setOpen = (open) => {
            drawer.classList.toggle("is-open", open);
            toggle.setAttribute("aria-expanded", open ? "true" : "false");
            panel.setAttribute("aria-hidden", open ? "false" : "true");
            if (open) {
                panel.focus({ preventScroll: true });
                window.requestAnimationFrame(syncScrollIndicator);
            }
        };

        let syncRaf = null;
        const runSyncLoop = () => {
            syncScrollIndicator();
            if (!drawer.classList.contains("is-open")) {
                syncRaf = null;
                return;
            }
            syncRaf = window.requestAnimationFrame(runSyncLoop);
        };
        const startSyncLoop = () => {
            if (syncRaf !== null) {
                return;
            }
            syncRaf = window.requestAnimationFrame(runSyncLoop);
        };
        const stopSyncLoop = () => {
            if (syncRaf === null) {
                return;
            }
            window.cancelAnimationFrame(syncRaf);
            syncRaf = null;
        };

        let dragState = null;
        const isPrimaryPointerDown = (event) =>
            event.pointerType !== "mouse" || event.button === 0;
        const stopDrag = () => {
            if (!dragState) {
                return;
            }
            dragState = null;
            drawer.classList.remove("is-dragging-scroll");
            if (scrollThumb) {
                scrollThumb.classList.remove("is-dragging");
            }
            window.removeEventListener("pointermove", handleDragMove);
            window.removeEventListener("pointerup", handleDragEnd);
            window.removeEventListener("pointercancel", handleDragEnd);
        };
        const handleDragMove = (event) => {
            if (!dragState || !scrollTrack) {
                return;
            }
            if (event.pointerId !== dragState.pointerId) {
                return;
            }
            const trackRect = scrollTrack.getBoundingClientRect();
            const thumbTop = event.clientY - trackRect.top - dragState.offsetY;
            setScrollFromThumbTop(thumbTop);
            event.preventDefault();
        };
        const handleDragEnd = (event) => {
            if (!dragState) {
                return;
            }
            if (event && event.pointerId !== dragState.pointerId) {
                return;
            }
            stopDrag();
        };
        const startDrag = (event, offsetY) => {
            if (!scrollTrack || !scrollThumb) {
                return;
            }
            dragState = { pointerId: event.pointerId, offsetY };
            drawer.classList.add("is-dragging-scroll");
            scrollThumb.classList.add("is-dragging");
            window.addEventListener("pointermove", handleDragMove);
            window.addEventListener("pointerup", handleDragEnd);
            window.addEventListener("pointercancel", handleDragEnd);
            event.preventDefault();
        };

        setOpen(false);
        syncScrollIndicator();

        toggle.addEventListener("click", () => {
            setOpen(!drawer.classList.contains("is-open"));
            if (drawer.classList.contains("is-open")) {
                startSyncLoop();
                return;
            }
            stopDrag();
            stopSyncLoop();
        });

        if (scrollTrack && scrollThumb) {
            scrollThumb.addEventListener("pointerdown", (event) => {
                if (!isPrimaryPointerDown(event)) {
                    return;
                }
                const thumbRect = scrollThumb.getBoundingClientRect();
                const offsetY = event.clientY - thumbRect.top;
                startDrag(event, offsetY);
            });

            scrollTrack.addEventListener("pointerdown", (event) => {
                if (!isPrimaryPointerDown(event)) {
                    return;
                }
                if (event.target === scrollThumb) {
                    return;
                }
                const metrics = getScrollMetrics();
                if (!metrics) {
                    return;
                }
                const trackRect = scrollTrack.getBoundingClientRect();
                const thumbTop = event.clientY - trackRect.top - metrics.thumbHeight / 2;
                setScrollFromThumbTop(thumbTop);
                startDrag(event, metrics.thumbHeight / 2);
            });
        }

        scroller.addEventListener("scroll", syncScrollIndicator, { passive: true });
        window.addEventListener("resize", syncScrollIndicator);
        window.addEventListener("load", syncScrollIndicator, { once: true });
        if (window.ResizeObserver) {
            const observer = new ResizeObserver(syncScrollIndicator);
            observer.observe(panel);
            observer.observe(scroller);
            const list = panel.querySelector(".artifact-list");
            if (list) {
                observer.observe(list);
            }
        }

        document.addEventListener("click", (event) => {
            if (!drawer.classList.contains("is-open")) {
                return;
            }
            if (drawer.contains(event.target)) {
                return;
            }
            setOpen(false);
            stopDrag();
            stopSyncLoop();
        });

        document.addEventListener("keydown", (event) => {
            if (event.key !== "Escape") {
                return;
            }
            if (!drawer.classList.contains("is-open")) {
                return;
            }
            setOpen(false);
            stopDrag();
            stopSyncLoop();
            toggle.focus({ preventScroll: true });
        });
    };

    initArtifactDrawer();

    const initExpandableImages = () => {
        const images = document.querySelectorAll("img");
        images.forEach((img) => {
            if (img.closest(".lightbox")) {
                return;
            }
            if (img.hasAttribute("data-no-expand")) {
                return;
            }
            if (!img.hasAttribute("data-expandable")) {
                img.setAttribute("data-expandable", "");
            }
            img.classList.add("is-expandable");
        });
    };

    initExpandableImages();

    const initLightbox = () => {
        const lightbox = document.querySelector("[data-lightbox]");
        if (!lightbox) {
            return;
        }

        const overlay = lightbox.querySelector("[data-lightbox-overlay]");
        const closeButton = lightbox.querySelector("[data-lightbox-close]");
        const image = lightbox.querySelector("[data-lightbox-image]");
        const caption = lightbox.querySelector("[data-lightbox-caption]");

        if (!overlay || !closeButton || !image || !caption) {
            return;
        }

        let lastActiveElement = null;

        const openLightbox = (target) => {
            const src = target.getAttribute("data-full-src") || target.getAttribute("src");
            if (!src) {
                return;
            }

            image.src = src;
            image.alt = target.getAttribute("alt") || "";
            caption.textContent =
                target.getAttribute("data-expandable-caption") ||
                target.getAttribute("alt") ||
                "";
            lightbox.classList.add("is-open");
            lightbox.setAttribute("aria-hidden", "false");
            document.body.classList.add("lightbox-open");
            lastActiveElement = document.activeElement;
            closeButton.focus({ preventScroll: true });
        };

        const closeLightbox = () => {
            if (!lightbox.classList.contains("is-open")) {
                return;
            }
            lightbox.classList.remove("is-open");
            lightbox.setAttribute("aria-hidden", "true");
            document.body.classList.remove("lightbox-open");
            image.removeAttribute("src");
            caption.textContent = "";
            if (lastActiveElement) {
                lastActiveElement.focus({ preventScroll: true });
            }
        };

        document.addEventListener("click", (event) => {
            const target = event.target.closest("[data-expandable]");
            if (!target) {
                return;
            }
            event.preventDefault();
            openLightbox(target);
        });

        overlay.addEventListener("click", closeLightbox);
        closeButton.addEventListener("click", closeLightbox);

        document.addEventListener("keydown", (event) => {
            if (event.key !== "Escape") {
                return;
            }
            closeLightbox();
        });
    };

    initLightbox();

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
