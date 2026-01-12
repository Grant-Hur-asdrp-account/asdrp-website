document.addEventListener("DOMContentLoaded", () => {
    document.documentElement.classList.add("js-enabled");
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
