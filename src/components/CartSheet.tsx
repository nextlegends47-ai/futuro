"use client";

import { closePanel, panelStore, useStore } from "@/lib/store";
import { CartView } from "./CartView";
import { Icon } from "./Icon";
import { Sheet } from "./Sheet";

/** Warenkorb am Computer: ein Blatt von rechts über der Seite. */
export function CartSheet() {
  const open = useStore(panelStore) === "cart";
  return (
    <Sheet open={open} onClose={closePanel} className="sheet--right" label="Warenkorb">
      <div className="sheet__head">
        <h2 className="sheet__title">Warenkorb</h2>
        <button type="button" className="iconbtn iconbtn--solid" aria-label="Warenkorb schließen" onClick={closePanel}>
          <Icon name="x" />
        </button>
      </div>
      <div className="sheet__content">
        <CartView />
      </div>
    </Sheet>
  );
}
