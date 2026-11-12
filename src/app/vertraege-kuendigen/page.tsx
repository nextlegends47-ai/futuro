import type { Metadata } from "next";
import { LegalPlaceholder } from "@/components/LegalPlaceholder";

export const metadata: Metadata = { title: "Verträge hier kündigen" };

export default function Page() {
  return <LegalPlaceholder title="Verträge hier kündigen" />;
}
