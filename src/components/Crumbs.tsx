import Link from "next/link";
import { Fragment } from "react";
import { Icon } from "./Icon";

/** Pfad, zum Beispiel „Start, Gaming-Guthaben, Steam“. */
export function Crumbs({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav className="crumbs" aria-label="Pfad">
      {items.map((item, i) => (
        <Fragment key={item.label}>
          {i > 0 ? <Icon name="chevronRight" size={14} /> : null}
          {item.href ? <Link href={item.href}>{item.label}</Link> : <span aria-current="page">{item.label}</span>}
        </Fragment>
      ))}
    </nav>
  );
}
