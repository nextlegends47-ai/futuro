"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type ReactNode } from "react";
import { flyToCart } from "@/lib/fly";
import { addToCart, toast, toggleWish, useStore, wishlistStore } from "@/lib/store";
import { canTransition, navigateWithTransition } from "@/lib/transition";
import { Icon } from "./Icon";

/** Bestätigt das Hinzufügen: angesagt für Vorlese-Programme, sichtbar, wenn keine Karte fliegt. */
export function confirmAdded(text: string) {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  toast(text, reduce ? { link: { href: "/warenkorb", label: "Zum Warenkorb" } } : { silent: true });
}

/** Link zum Produkt. Beim Öffnen gleitet das Bild der Kachel an seinen Platz auf der Produktseite. */
export function ProductLink({ href, className, children }: { href: string; className?: string; children: ReactNode }) {
  const router = useRouter();
  return (
    <Link
      href={href}
      className={className}
      onClick={(event) => {
        if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
        if (!canTransition()) return;
        event.preventDefault();
        const art = event.currentTarget.closest(".tile")?.querySelector<HTMLElement>("[data-art]");
        navigateWithTransition((to) => router.push(to), href, art);
      }}
    >
      {children}
    </Link>
  );
}

/** Herz für die Merkliste. Ein Tipp füllt es. */
export function WishButton({ slug, name, large = false }: { slug: string; name: string; large?: boolean }) {
  const wished = useStore(wishlistStore).includes(slug);
  return (
    <button
      type="button"
      className={`wish${large ? " wish--lg" : ""}`}
      aria-pressed={wished}
      aria-label={`${name} merken`}
      onClick={() => {
        if (toggleWish(slug)) toast("Auf der Merkliste", { link: { href: "/merkliste", label: "Zur Merkliste" } });
        else toast("Von der Merkliste entfernt", { silent: true });
      }}
    >
      <Icon name="heart" size={large ? 22 : 19} />
    </button>
  );
}

/**
 * Schnellkauf an der Kachel. Hat das Produkt genau einen Preis, legt der Knopf
 * es in den Warenkorb. Bei mehreren Beträgen führt er zur Betragswahl.
 */
export function QuickBuy({ slug, name, color, href, amountId }: { slug: string; name: string; color: string; href: string; amountId: string | null }) {
  const [busy, setBusy] = useState(false);

  if (!amountId) {
    return (
      <Link className="tile__quick" href={href} aria-label={`${name}: Betrag wählen`}>
        <Icon name="cart" size={18} />
      </Link>
    );
  }

  return (
    <button
      type="button"
      className="tile__quick"
      aria-label={`${name} in den Warenkorb`}
      disabled={busy}
      onClick={(event) => {
        const art = event.currentTarget.closest(".tile")?.querySelector("[data-art]") ?? event.currentTarget;
        setBusy(true);
        flyToCart(art, color).then(() => {
          addToCart(slug, amountId);
          confirmAdded(`${name} liegt im Warenkorb`);
          setBusy(false);
        });
      }}
    >
      <Icon name="cart" size={18} />
    </button>
  );
}
