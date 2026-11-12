import type { CSSProperties } from "react";
import type { Product } from "@/data/catalog";

const tint = (color: string) => ({ "--c": color }) as CSSProperties;

/**
 * Gutscheinkarte im Format einer Bankkarte in der Farbe der Marke.
 * Solange das offizielle Logo fehlt, steht der Markenname als Text in einer
 * neutralen Kapsel. Es wird kein Logo nachgezeichnet und kein Kartenmotiv nachgebildet.
 */
export function GiftCard({ name, color, label }: { name: string; color: string; label?: string }) {
  return (
    <span className="gcard" style={tint(color)} {...(label ? { role: "img", "aria-label": label } : { "aria-hidden": true })}>
      <span className="gcard__name">{name}</span>
    </span>
  );
}

/** Platzhalter für das offizielle Cover im Hochformat, mit kleinem Plattform-Zeichen. */
export function GameCover({ name, color, platform, label }: { name: string; color: string; platform?: string; label?: string }) {
  return (
    <span className="cover" style={tint(color)} {...(label ? { role: "img", "aria-label": label } : { "aria-hidden": true })}>
      {platform ? <span className="cover__platform">{platform}</span> : null}
      <span className="cover__name">{name}</span>
    </span>
  );
}

/** Bild eines Produkts. Mit `describe` bekommt es einen Bildtext, sonst ist es Schmuck neben dem Namen. */
export function ProductArt({ product, describe = false }: { product: Product; describe?: boolean }) {
  if (product.kind === "game") {
    const label = describe ? `Cover von ${product.name}${product.platform ? ` für ${product.platform.label}` : ""}` : undefined;
    return <GameCover name={product.name} color={product.color} platform={product.platform?.label} label={label} />;
  }
  return <GiftCard name={product.name} color={product.color} label={describe ? `Gutscheinkarte ${product.name}` : undefined} />;
}
