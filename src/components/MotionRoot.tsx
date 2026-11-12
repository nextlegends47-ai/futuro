"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { closePanel } from "@/lib/store";
import { notifyRouteChange } from "@/lib/transition";

declare global {
  interface Window {
    __motionReady?: boolean;
  }
}

/**
 * Steuert die Bewegung der ganzen Seite an einer Stelle:
 * – Abschnitte, Kacheln und Überschriften erscheinen einmal, wenn sie ins Bild kommen.
 * – Dauerbewegungen pausieren, sobald sie nicht mehr im Bild sind.
 * – Mit „Bewegung reduzieren“ erscheint alles sofort.
 */
export function MotionRoot() {
  const pathname = usePathname();

  useEffect(() => {
    notifyRouteChange();
    closePanel();
  }, [pathname]);

  useEffect(() => {
    const selector = "[data-reveal]:not([data-in]), [data-mask]:not([data-in])";
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.__motionReady = true;

    if (reduce || !("IntersectionObserver" in window)) {
      const showAll = () => document.querySelectorAll(selector).forEach((el) => el.setAttribute("data-in", ""));
      showAll();
      const observer = new MutationObserver(showAll);
      observer.observe(document.body, { childList: true, subtree: true });
      return () => observer.disconnect();
    }

    const reveal = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.setAttribute("data-in", "");
          reveal.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -6% 0px", threshold: 0.06 },
    );

    const loops = new IntersectionObserver((entries) => {
      for (const entry of entries) (entry.target as HTMLElement).dataset.paused = entry.isIntersecting ? "false" : "true";
    });

    const seenLoops = new WeakSet<Element>();
    const scan = () => {
      document.querySelectorAll(selector).forEach((el) => reveal.observe(el));
      document.querySelectorAll("[data-loop]").forEach((el) => {
        if (seenLoops.has(el)) return;
        seenLoops.add(el);
        loops.observe(el);
      });
    };

    let scheduled = 0;
    const schedule = () => {
      if (scheduled) return;
      scheduled = window.setTimeout(() => {
        scheduled = 0;
        scan();
      }, 80);
    };

    scan();
    const mutations = new MutationObserver(schedule);
    mutations.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.clearTimeout(scheduled);
      mutations.disconnect();
      reveal.disconnect();
      loops.disconnect();
    };
  }, []);

  return null;
}
