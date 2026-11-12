"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Blatt über der Seite auf Basis des <dialog>-Elements: Der Fokus bleibt im
 * Blatt, Escape schließt es, die Seite dahinter ist gesperrt.
 */
export function Sheet({ open, onClose, className, label, children }: { open: boolean; onClose: () => void; className: string; label: string; children: ReactNode }) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      dialog.showModal();
      // Fokus gezielt setzen: auf das markierte Feld, sonst auf den ersten Knopf (Schließen)
      const target = dialog.querySelector<HTMLElement>("[data-autofocus]") ?? dialog.querySelector<HTMLElement>("button, a[href], input");
      target?.focus({ preventScroll: true });
    }
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      className={`sheet ${className}`}
      aria-label={label}
      onClose={onClose}
      onClick={(event) => {
        // Ein Klick neben das Blatt trifft das <dialog> selbst
        if (event.target === event.currentTarget) onClose();
      }}
    >
      {open ? <div className="sheet__body">{children}</div> : null}
    </dialog>
  );
}
