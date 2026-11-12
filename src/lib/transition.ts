"use client";

/**
 * Seitenwechsel mit weicher Überblendung. Beim Öffnen eines Produkts gleitet
 * das Produktbild von der Kachel an seinen Platz. Browser ohne diese Technik
 * und Geräte mit „Bewegung reduzieren“ wechseln die Seite ganz normal.
 */

interface ViewTransitionLike {
  finished: Promise<void>;
}

type TransitionDocument = Document & { startViewTransition?: (update: () => Promise<void> | void) => ViewTransitionLike };

let pending: (() => void) | null = null;

/** Meldet, dass die neue Seite steht. Wird nach jedem Seitenwechsel aufgerufen. */
export function notifyRouteChange() {
  pending?.();
  pending = null;
}

export function canTransition() {
  if (typeof document === "undefined") return false;
  return typeof (document as TransitionDocument).startViewTransition === "function" && !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function navigateWithTransition(push: (href: string) => void, href: string, art?: HTMLElement | null) {
  const doc = document as TransitionDocument;
  if (!canTransition() || !doc.startViewTransition) {
    push(href);
    return;
  }

  // Der Name darf je Seite nur einmal vorkommen. Auf einer Produktseite trägt ihn schon das große Bild.
  const named = art && !document.querySelector(".pdp__art") ? art : null;
  if (named) named.style.setProperty("view-transition-name", "product-art");
  document.documentElement.dataset.vt = "true";

  const transition = doc.startViewTransition(
    () =>
      new Promise<void>((resolve) => {
        const done = () => {
          named?.style.removeProperty("view-transition-name");
          resolve();
        };
        pending = done;
        push(href);
        // Sicherheitsnetz, falls die neue Seite ungewöhnlich lange braucht
        window.setTimeout(done, 1500);
      }),
  );

  transition.finished
    .catch(() => undefined)
    .finally(() => {
      delete document.documentElement.dataset.vt;
    });
}
