/**
 * Eine kleine Karte fliegt zum Warenkorb-Symbol. Bewegt werden nur Position,
 * Größe und Deckkraft. Mit „Bewegung reduzieren“ entfällt der Flug.
 * Das Versprechen löst sich auf, sobald die Karte angekommen ist.
 */
export function flyToCart(from: Element | null, color: string): Promise<void> {
  if (typeof window === "undefined" || !from) return Promise.resolve();
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return Promise.resolve();

  const target = Array.from(document.querySelectorAll<HTMLElement>("[data-cart-target]")).find((el) => el.getClientRects().length > 0);
  if (!target || typeof target.animate !== "function") return Promise.resolve();

  const a = from.getBoundingClientRect();
  const b = target.getBoundingClientRect();
  const w = 56;
  const h = 36;
  const sx = a.left + a.width / 2 - w / 2;
  const sy = a.top + a.height / 2 - h / 2;
  const ex = b.left + b.width / 2 - w / 2;
  const ey = b.top + b.height / 2 - h / 2;

  const card = document.createElement("div");
  card.className = "flycard";
  card.style.setProperty("--c", color);
  card.setAttribute("aria-hidden", "true");
  document.body.appendChild(card);

  return new Promise((resolve) => {
    const animation = card.animate(
      [
        { transform: `translate3d(${sx}px, ${sy}px, 0) scale(1.7)`, opacity: 0 },
        { transform: `translate3d(${sx}px, ${sy - 12}px, 0) scale(1.7)`, opacity: 1, offset: 0.16 },
        { transform: `translate3d(${ex}px, ${ey}px, 0) scale(0.42)`, opacity: 1, offset: 0.92 },
        { transform: `translate3d(${ex}px, ${ey}px, 0) scale(0.2)`, opacity: 0 },
      ],
      { duration: 720, easing: "cubic-bezier(0.16, 1, 0.3, 1)" },
    );
    const done = () => {
      card.remove();
      resolve();
    };
    animation.onfinish = done;
    animation.oncancel = done;
  });
}
