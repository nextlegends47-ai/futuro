"use client";

import Link from "next/link";
import { toastStore, useStore } from "@/lib/store";

/** Kurze Meldungen am unteren Rand. Vorlese-Programme bekommen jede Meldung angesagt. */
export function Toaster() {
  const toasts = useStore(toastStore);
  return (
    <div className="toasts" role="status" aria-live="polite">
      {toasts.map((t) =>
        t.silent ? (
          <span key={t.id} className="sr-only">
            {t.text}
          </span>
        ) : (
          <div key={t.id} className="toast">
            <span>{t.text}</span>
            {t.link ? <Link href={t.link.href}>{t.link.label}</Link> : null}
          </div>
        ),
      )}
    </div>
  );
}
