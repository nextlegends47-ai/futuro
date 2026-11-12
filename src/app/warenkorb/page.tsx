import type { Metadata } from "next";
import { CartView } from "@/components/CartView";
import { Crumbs } from "@/components/Crumbs";

export const metadata: Metadata = { title: "Warenkorb", robots: { index: false, follow: false } };

export default function CartPage() {
  return (
    <div className="wrap page-top">
      <Crumbs items={[{ label: "Start", href: "/" }, { label: "Warenkorb" }]} />
      <h1 className="h-page">Warenkorb</h1>
      <div className="cartpage">
        <CartView />
      </div>
    </div>
  );
}
