import type { Metadata } from "next";
import { Icon } from "@/components/Icon";
import { OrderPreview } from "@/components/OrderPreview";
import { Title } from "@/components/Title";

export const metadata: Metadata = { title: "Bestellseite (Beispiel)", robots: { index: false, follow: false } };

export default function OrderExamplePage() {
  return (
    <div className="wrap page-top">
      <header className="pagehead">
        <Title as="h1" className="h-page">
          Deine Bestellung
        </Title>
        <p className="note narrow">
          <Icon name="info" size={20} />
          <span>
            <strong>Beispiel.</strong> So sieht die Bestellseite nach einem Kauf aus. Das ist keine echte Bestellung, alle Angaben sind Platzhalter.
          </span>
        </p>
      </header>
      <OrderPreview />
    </div>
  );
}
