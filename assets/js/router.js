// ============================================================
//  router.js — DETEKSI DEVICE & REDIRECT
//  Cek userAgent + lebar layar → arahkan ke /mobile/ atau /desktop/
// ============================================================

(function () {
    const MOBILE_MAX_WIDTH = 1024; // px

    function isMobileDevice() {
        const ua = navigator.userAgent || "";
        const isMobileUA = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i.test(ua);
        const isNarrow = window.innerWidth < MOBILE_MAX_WIDTH;
        return isMobileUA || isNarrow;
    }

    const base = (function () {
        // Deteksi base path (root project)
        const scripts = document.querySelectorAll("script[src]");
        for (const s of scripts) {
            if (s.src.includes("router.js")) {
                return s.src.replace("assets/js/router.js", "");
            }
        }
        return window.location.origin + "/";
    })();

    const params = new URLSearchParams(window.location.search);
    const forceView = params.get("view") || params.get("mode");

    if (forceView === "mobile" || (forceView !== "desktop" && isMobileDevice())) {
        window.location.replace(base + "mobile/index.html");
    } else {
        window.location.replace(base + "desktop/index.html");
    }
})();
