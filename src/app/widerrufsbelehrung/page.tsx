import type { Metadata } from "next";
import { LegalPlaceholder } from "@/components/LegalPlaceholder";

export const metadata: Metadata = { title: "Widerrufsbelehrung" };

export default function Page() {
  return <LegalPlaceholder title="Widerrufsbelehrung" />;
}
