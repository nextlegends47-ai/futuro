import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import type { ReactNode } from "react";
import { CookieNotice } from "@/components/CookieNotice";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { MotionRoot } from "@/components/MotionRoot";
import { Toaster } from "@/components/Toaster";
import { site } from "@/config/site";
import "@/styles/base.css";
import "@/styles/chrome.css";
import "@/styles/shop.css";
import "@/styles/home.css";
import "@/styles/flow.css";

/* Inter liegt auf dem eigenen Server und zeigt sofort Text. Nichts lädt von fremden Servern. */
const inter = localFont({
  src: "../fonts/inter-latin-wght-normal.woff2",
  weight: "100 900",
  style: "normal",
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: {
    default: "instantcodes – Gutscheine, Spiele-Keys und Guthaben per E-Mail",
    template: "%s · instantcodes",
  },
  description:
    "Gutscheine, Spiele-Keys, Gaming-Guthaben und Handy-Aufladungen von 153 Marken. Sicher bezahlen über Stripe, Code per E-Mail, Lieferzeit bis zu 24 Stunden.",
  applicationName: "instantcodes",
  icons: { icon: "/logo-ring.webp" },
  formatDetection: { telephone: false, email: false, address: false },
  // Der Entwurf läuft unter einer Testadresse und bleibt aus Suchmaschinen heraus
  robots: site.draft ? { index: false, follow: false } : { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#ffffff",
};

/* Vor dem ersten Bild: Bewegung nur mit Skript vorbereiten. Bleibt das Skript hängen, wird alles sichtbar. */
const boot = `document.documentElement.classList.add("js");setTimeout(function(){if(!window.__motionReady)document.documentElement.classList.add("reveal-all")},4000);`;

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="de" className={inter.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: boot }} />
      </head>
      <body>
        <a className="skip" href="#inhalt">
          Zum Inhalt springen
        </a>
        <Header />
        <main id="inhalt">{children}</main>
        <Footer />
        <Toaster />
        <CookieNotice />
        <MotionRoot />
      </body>
    </html>
  );
}
