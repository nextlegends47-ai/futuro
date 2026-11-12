import type { MetadataRoute } from "next";
import { site } from "@/config/site";

/** Solange die Seite ein Entwurf unter einer Testadresse ist, bleibt sie für Suchmaschinen gesperrt. */
export default function robots(): MetadataRoute.Robots {
  return site.draft ? { rules: { userAgent: "*", disallow: "/" } } : { rules: { userAgent: "*", allow: "/", disallow: ["/kasse", "/warenkorb", "/merkliste", "/suche"] } };
}
