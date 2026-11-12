import type { ReactNode } from "react";

/** Überschrift, die sich aus einer Maske nach oben schiebt, sobald sie ins Bild kommt. */
export function Title({ as: Tag = "h2", className = "h-section", id, children }: { as?: "h1" | "h2" | "h3"; className?: string; id?: string; children: ReactNode }) {
  return (
    <Tag id={id} className={`${className} mask`} data-mask>
      <span>{children}</span>
    </Tag>
  );
}
