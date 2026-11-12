import type { Metadata } from "next";
import { Checkout } from "@/components/Checkout";

export const metadata: Metadata = { title: "Kasse", robots: { index: false, follow: false } };

export default function CheckoutPage() {
  return (
    <div className="wrap page-top">
      {/* In der Kasse bewegt sich nur, was auf eine Eingabe antwortet */}
      <h1 className="h-page">Kasse</h1>
      <div style={{ marginTop: 24 }}>
        <Checkout />
      </div>
    </div>
  );
}
