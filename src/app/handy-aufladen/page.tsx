import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Crumbs } from "@/components/Crumbs";
import { Title } from "@/components/Title";
import { TopupFlow } from "@/components/TopupFlow";
import { features } from "@/config/site";

export const metadata: Metadata = {
  title: "Handy aufladen",
  description: "Prepaid-Guthaben für 19 Anbieter. Nummer eingeben, Betrag wählen, bezahlen. Lieferzeit: bis zu 24 Stunden.",
};

export default function TopupPage() {
  if (!features.topup) notFound();
  return (
    <div className="wrap page-top">
      <Crumbs items={[{ label: "Start", href: "/" }, { label: "Handy aufladen" }]} />
      <header className="pagehead">
        <Title as="h1" className="h-page">
          Handy aufladen
        </Title>
        <p className="lead">Guthaben für 19 Anbieter. Nummer eingeben, Betrag wählen, bezahlen – das Guthaben wird nach der Zahlung gebucht. Lieferzeit: bis zu 24 Stunden.</p>
      </header>
      <TopupFlow />
    </div>
  );
}
