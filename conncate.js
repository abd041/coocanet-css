(() => {
    function initializeNestedLinks() {
        function openLink(url, rel, target) {
            let anchor = document.createElement("a");
            anchor.href = url;
            anchor.target = target;
            anchor.rel = rel;
            document.body.appendChild(anchor);
            anchor.click();
            anchor.remove();
        }

        function handleClick(event) {
            if (this.dataset.hydrated) {
                this.removeEventListener("click", handleClick);
                return;
            }

            event.preventDefault();
            event.stopPropagation();

            let href = this.getAttribute("href");
            if (!href) return;

            if (/Mac|iPod|iPhone|iPad/u.test(navigator.userAgent) ? event.metaKey : event.ctrlKey) {
                return openLink(href, "", "_blank");
            }

            let rel = this.getAttribute("rel") || "";
            let target = this.getAttribute("target") || "";
            openLink(href, rel, target);
        }

        function handleAuxClick(event) {
            if (this.dataset.hydrated) {
                this.removeEventListener("auxclick", handleAuxClick);
                return;
            }

            event.preventDefault();
            event.stopPropagation();

            let href = this.getAttribute("href");
            if (href) {
                openLink(href, "", "_blank");
            }
        }

        function handleKeyDown(event) {
            if (this.dataset.hydrated) {
                this.removeEventListener("keydown", handleKeyDown);
                return;
            }

            if (event.key !== "Enter") return;

            event.preventDefault();
            event.stopPropagation();

            let href = this.getAttribute("href");
            if (!href) return;

            let rel = this.getAttribute("rel") || "";
            let target = this.getAttribute("target") || "";
            openLink(href, rel, target);
        }

        document.querySelectorAll("[data-nested-link]").forEach(element => {
            if (element instanceof HTMLElement) {
                element.addEventListener("click", handleClick);
                element.addEventListener("auxclick", handleAuxClick);
                element.addEventListener("keydown", handleKeyDown);
            }
        });
    }

    return initializeNestedLinks;
})();


(() => {
    function i() {
        for (let e of document.querySelectorAll("[data-framer-original-sizes]")) {
            let t = e.getAttribute("data-framer-original-sizes");
            t === "" ? e.removeAttribute("sizes") : e.setAttribute("sizes", t), e.removeAttribute("data-framer-original-sizes")
        }
    }

    function a() {
        window.__framer_onRewriteBreakpoints = i
    }
    return a
})()()


function c(t, r) {
    let n = r.indexOf("#"),
        a = n === -1 ? r : r.substring(0, n),
        o = n === -1 ? "" : r.substring(n),
        e = a.indexOf("?");
    if (e === -1) return a + t + o;
    let f = new URLSearchParams(t),
        u = a.substring(e + 1),
        s = new URLSearchParams(u);
    for (let [i, h] of f) s.has(i) || s.append(i, h);
    return a.substring(0, e + 1) + s.toString() + o
}
if (window.location.search) {
    let t = document.querySelectorAll('div#main a[href^="#"],div#main a[href^="/"],div#main a[href^="."]');
    for (let r of t) {
        let n = c(window.location.search, r.href);
        r.setAttribute("href", n)
    }
}




(() => {
    function s(r, n, t) {
        window.__framer_disable_appear_effects_optimization__ || typeof animator > "u" || requestAnimationFrame(() => {
            performance.mark("framer-appear-start"), animator.animateAppearEffects(JSON.parse(window.__framer__appearAnimationsContent.text), (i, o, p) => {
                let e = document.querySelector(i);
                if (e)
                    for (let [a, m] of Object.entries(o)) animator.startOptimizedAppearAnimation(e, a, m, p[a])
            }, r, n, t && window.matchMedia("(prefers-reduced-motion:reduce)").matches === !0, animator.getActiveVariantHash(JSON.parse(window.__framer__breakpoints.text))), performance.mark("framer-appear-end"), performance.measure("framer-appear", "framer-appear-start", "framer-appear-end")
        })
    }
    return s
})()("data-framer-appear-id", "__Appear_Animation_Transform__", false)
