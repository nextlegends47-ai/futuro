"use client";

import { useEffect } from "react";
import { markViewed } from "@/lib/store";

/** Merkt sich das Produkt für „Zuletzt angesehen“ – nur für diesen Besuch, nicht auf dem Gerät. */
export function MarkViewed({ slug }: { slug: string }) {
  useEffect(() => {
    markViewed(slug);
  }, [slug]);
  return null;
}
