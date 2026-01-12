document.addEventListener("DOMContentLoaded", () => {
    document.documentElement.classList.add("js-enabled");
    window.requestAnimationFrame(() => {
        document.body.classList.add("page-loaded");
    });
});
