"use client";

import { useEffect, useState, type ReactNode } from "react";

let firstPage = true;

/** Weiche Überblendung beim Seitenwechsel. Die erste Seite erscheint ohne Verzögerung. */
export default function Template({ children }: { children: ReactNode }) {
  const [fade] = useState(() => !firstPage);
  useEffect(() => {
    firstPage = false;
  }, []);
  return <div className={fade ? "page-fade" : undefined}>{children}</div>;
}
