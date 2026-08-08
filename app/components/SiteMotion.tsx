"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Ports the site's shared vanilla-JS motion layer (design/v2_sync's
 * assets/site.js) as a single client component mounted once in the root
 * layout. It operates directly on the DOM — same spirit as the original
 * script — rather than as idiomatic per-element React state, since the
 * design's behavior (rect-based reveal/count triggers, pointer tilt,
 * parallax, real click-to-filter, lightbox) is inherently imperative.
 *
 * Because Next's App Router keeps this component mounted across
 * client-side navigations between pages, page-scoped bindings
 * (reveal targets, counters, card tilt, filters, contact form, lightbox
 * zoomables) are re-queried and rebound whenever the pathname changes,
 * while the scroll-progress bar and the lightbox overlay singleton are
 * created once for the whole session.
 */
export function SiteMotion() {
  // One-time setup: "js" class, scroll-progress bar, lightbox overlay.
  useEffect(() => {
    const root = document.documentElement;
    const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!reducedMotion) root.classList.add("js");

    const bar = document.createElement("div");
    bar.className = "scroll-progress";
    document.body.appendChild(bar);

    function progress() {
      const h = document.documentElement.scrollHeight - innerHeight;
      bar.style.transform = `scaleX(${h > 0 ? scrollY / h : 0})`;
    }
    addEventListener("scroll", progress, { passive: true });
    progress();

    const lightbox = document.createElement("div");
    lightbox.className = "lightbox";
    lightbox.innerHTML = '<span class="close">&#10005;</span><div class="frame"></div>';
    document.body.appendChild(lightbox);
    const closeLightbox = () => lightbox.classList.remove("open");
    lightbox.addEventListener("click", closeLightbox);
    function onEscape(e: KeyboardEvent) {
      if (e.key === "Escape") closeLightbox();
    }
    addEventListener("keydown", onEscape);

    return () => {
      removeEventListener("scroll", progress);
      removeEventListener("keydown", onEscape);
      bar.remove();
      lightbox.remove();
      root.classList.remove("js");
    };
  }, []);

  const pathname = usePathname();

  // Page-scoped bindings: re-run every time the route changes.
  useEffect(() => {
    const cleanups: Array<() => void> = [];

    /* reveal on scroll (rect-based) */
    let revealEls = Array.from(
      document.querySelectorAll<HTMLElement>(".reveal, .section-header")
    ).filter((el) => !el.classList.contains("in-view"));

    function checkReveal() {
      const vh = innerHeight || 800;
      for (let i = revealEls.length - 1; i >= 0; i--) {
        const el = revealEls[i];
        const r = el.getBoundingClientRect();
        if (r.top < vh * 0.94 && r.bottom > -80) {
          el.classList.add("in-view");
          revealEls.splice(i, 1);
        }
      }
    }
    checkReveal();
    addEventListener("scroll", checkReveal, { passive: true });
    addEventListener("resize", checkReveal);
    const t1 = setTimeout(checkReveal, 350);
    const t2 = setTimeout(checkReveal, 1200);

    /* animated counters */
    let counters = Array.from(document.querySelectorAll<HTMLElement>(".count"));

    function runCount(el: HTMLElement) {
      const target = parseFloat(el.dataset.count || "0");
      const suffix = el.dataset.suffix || "";
      let start: number | null = null;
      function step(ts: number) {
        if (start === null) start = ts;
        const p = Math.min((ts - start) / 1200, 1);
        el.textContent = Math.round((1 - Math.pow(1 - p, 3)) * target) + suffix;
        if (p < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    }
    function checkCount() {
      for (let i = counters.length - 1; i >= 0; i--) {
        const r = counters[i].getBoundingClientRect();
        if (r.top < (innerHeight || 800) && r.bottom > 0) {
          runCount(counters[i]);
          counters.splice(i, 1);
        }
      }
    }
    checkCount();
    addEventListener("scroll", checkCount, { passive: true });
    const t3 = setTimeout(checkCount, 600);

    /* safety net: if the visitor never scrolls, show everything */
    let scrolled = false;
    function onFirstScroll() {
      scrolled = true;
    }
    addEventListener("scroll", onFirstScroll, { passive: true, once: true });
    const t4 = setTimeout(() => {
      if (scrolled) return;
      revealEls.forEach((el) => {
        el.style.transition = "none";
        el.classList.add("in-view");
      });
      revealEls = [];
      counters.forEach((el) => {
        const target = parseFloat(el.dataset.count || "0");
        el.textContent = Math.round(target) + (el.dataset.suffix || "");
      });
      counters = [];
    }, 2600);

    /* parallax on decorative blobs + hero visual */
    const floaters = Array.from(document.querySelectorAll<HTMLElement>(".blob"));
    const visual = document.querySelector<HTMLElement>(".hero-visual");
    let raf: number | null = null;
    function onParallaxScroll() {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = null;
        const y = scrollY;
        floaters.forEach((b, i) => {
          b.style.translate = `0 ${(y * (0.06 + i * 0.04)).toFixed(1)}px`;
        });
        if (visual && y < 700) {
          visual.style.translate = `0 ${(y * -0.05).toFixed(1)}px`;
        }
      });
    }
    addEventListener("scroll", onParallaxScroll, { passive: true });

    /* pointer tilt on cards */
    const cards = Array.from(document.querySelectorAll<HTMLElement>(".card"));
    function onCardPointerMove(this: HTMLElement, ev: PointerEvent) {
      const r = this.getBoundingClientRect();
      const dx = (ev.clientX - r.left) / r.width - 0.5;
      const dy = (ev.clientY - r.top) / r.height - 0.5;
      this.style.transform = `translateY(-6px) perspective(700px) rotateX(${(-dy * 5).toFixed(2)}deg) rotateY(${(dx * 5).toFixed(2)}deg)`;
    }
    function onCardPointerLeave(this: HTMLElement) {
      this.style.transform = "";
    }
    cards.forEach((card) => {
      card.addEventListener("pointermove", onCardPointerMove);
      card.addEventListener("pointerleave", onCardPointerLeave);
    });

    /* chip / tab filtering (data-filter on chips, data-cat on items) */
    const filterChips = Array.from(document.querySelectorAll<HTMLElement>("[data-filter]"));
    function onFilterClick(this: HTMLElement) {
      const group = this.closest(".filters, .news-filters, .gallery-tabs");
      if (group) {
        group.querySelectorAll("[data-filter]").forEach((c) => c.classList.remove("is-active"));
      }
      this.classList.add("is-active");
      const want = this.dataset.filter;
      document.querySelectorAll<HTMLElement>("[data-cat]").forEach((item) => {
        const show = want === "all" || item.dataset.cat === want;
        item.style.transition = "opacity .3s ease, transform .3s ease";
        item.style.opacity = show ? "1" : "0";
        item.style.transform = show ? "none" : "scale(.96)";
        setTimeout(() => {
          item.style.display = show ? "" : "none";
        }, show ? 0 : 260);
      });
    }
    filterChips.forEach((chip) => chip.addEventListener("click", onFilterClick));

    /* contact form: inline success feedback (demo) */
    const contactForms = Array.from(document.querySelectorAll<HTMLElement>(".contact-form"));
    const formHandlers: Array<{ btn: HTMLElement; handler: (e: Event) => void }> = [];
    contactForms.forEach((form) => {
      const btn = form.querySelector<HTMLElement>(".btn-primary");
      if (!btn) return;
      const handler = (e: Event) => {
        e.preventDefault();
        if (form.querySelector(".form-ok")) return;
        const ok = document.createElement("div");
        ok.className = "form-ok";
        ok.style.cssText =
          "margin-top:14px;padding:12px 14px;border-radius:12px;font-size:13px;font-weight:650;color:#0B7A5B;background:#E4F8F0;border:1px solid #B8E9D8;animation:fadeUp .4s both";
        ok.textContent = "Merci — votre message a bien été envoyé. L’accueil vous répond sous 24 h.";
        form.appendChild(ok);
      };
      btn.addEventListener("click", handler);
      formHandlers.push({ btn, handler });
    });

    /* lightbox for placeholders marked data-zoom */
    const lightbox = document.querySelector<HTMLElement>(".lightbox");
    const frame = lightbox?.querySelector<HTMLElement>(".frame");
    const zoomables = Array.from(document.querySelectorAll<HTMLElement>("[data-zoom]"));
    function onZoomClick(this: HTMLElement) {
      if (!lightbox || !frame) return;
      frame.textContent = this.dataset.zoom || this.textContent?.trim() || "";
      lightbox.classList.add("open");
    }
    zoomables.forEach((z) => {
      z.style.cursor = "zoom-in";
      z.addEventListener("click", onZoomClick);
    });

    cleanups.push(() => {
      removeEventListener("scroll", checkReveal);
      removeEventListener("resize", checkReveal);
      removeEventListener("scroll", checkCount);
      removeEventListener("scroll", onFirstScroll);
      removeEventListener("scroll", onParallaxScroll);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      cards.forEach((card) => {
        card.removeEventListener("pointermove", onCardPointerMove);
        card.removeEventListener("pointerleave", onCardPointerLeave);
      });
      filterChips.forEach((chip) => chip.removeEventListener("click", onFilterClick));
      formHandlers.forEach(({ btn, handler }) => btn.removeEventListener("click", handler));
      zoomables.forEach((z) => z.removeEventListener("click", onZoomClick));
    });

    return () => cleanups.forEach((fn) => fn());
  }, [pathname]);

  return null;
}
