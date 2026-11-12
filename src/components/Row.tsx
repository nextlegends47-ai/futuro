"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { Icon } from "./Icon";

/**
 * Reihe mit Kacheln zum Wischen. Am Computer erscheinen zusätzlich zwei
 * Pfeile, damit sich die Reihe auch mit der Maus bewegen lässt.
 */
export function Row({ children, label }: { children: ReactNode; label?: string }) {
  const ref = useRef<HTMLUListElement>(null);
  const [can, setCan] = useState({ prev: false, next: false });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => {
      const prev = el.scrollLeft > 4;
      const next = el.scrollLeft + el.clientWidth < el.scrollWidth - 4;
      setCan((state) => (state.prev === prev && state.next === next ? state : { prev, next }));
    };
    update();
    el.addEventListener("scroll", update, { passive: true });
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => {
      el.removeEventListener("scroll", update);
      observer.disconnect();
    };
  }, [children]);

  const move = (direction: 1 | -1) => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollBy({ left: direction * el.clientWidth * 0.8, behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <div className="rowwrap">
      <ul ref={ref} className="row" aria-label={label}>
        {children}
      </ul>
      {can.prev ? (
        <button type="button" className="rownav rownav--prev" aria-label="Zurück" onClick={() => move(-1)}>
          <Icon name="arrow" size={20} />
        </button>
      ) : null}
      {can.next ? (
        <button type="button" className="rownav rownav--next" aria-label="Weiter" onClick={() => move(1)}>
          <Icon name="arrow" size={20} />
        </button>
      ) : null}
    </div>
  );
}
