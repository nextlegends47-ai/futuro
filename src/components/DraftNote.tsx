import type { ReactNode } from "react";
import { site } from "@/config/site";
import { Icon } from "./Icon";

/** Hinweis, der nur im Entwurf erscheint: sagt offen, was noch fehlt. */
export function DraftNote({ children, className }: { children: ReactNode; className?: string }) {
  if (!site.draft) return null;
  return (
    <p className={`note${className ? ` ${className}` : ""}`}>
      <Icon name="info" size={20} />
      <span>{children}</span>
    </p>
  );
}
