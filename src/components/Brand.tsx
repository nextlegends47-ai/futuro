import Link from "next/link";

/** Schriftzug: „instant“ fett, „codes“ normal, klein und in einem Wort. */
export function Wordmark() {
  return (
    <span className="brand__name">
      <b>instant</b>codes
    </span>
  );
}

/** Logo-Ring (unveränderte Datei des Betreibers) mit Schriftzug, als Link zur Startseite. */
export function Brand({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <Link className="brand" href="/" aria-label="instantcodes, zur Startseite" onClick={onNavigate}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="brand__ring" src="/logo-ring.webp" width={64} height={64} alt="" decoding="async" />
      <Wordmark />
    </Link>
  );
}
