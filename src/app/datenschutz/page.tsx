import type { Metadata } from "next";
import { LegalPlaceholder } from "@/components/LegalPlaceholder";

export const metadata: Metadata = { title: "Datenschutz" };

export default function Page() {
  return <LegalPlaceholder title="Datenschutz" />;
}
