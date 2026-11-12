import type { CSSProperties } from "react";
import { wallBrands } from "@/data/catalog";

/** Dauer eines Durchlaufs je Spalte: 40 bis 54 Sekunden */
const DURATIONS = [46, 52, 40, 54, 44, 50, 42];
const BLOCKS_PER_SET = 9;

/**
 * Markenwand im Einstieg: Blöcke in der Farbe einer Marke, in Spalten, die
 * endlos und langsam gegeneinander laufen. Die Wand ist Schmuck. Sie behauptet
 * keine Partnerschaft und ist für Vorlese-Programme ausgeblendet.
 * Solange offizielle Logos fehlen, steht der Markenname in einer neutralen Kapsel.
 */
export function BrandWall() {
  return (
    <div className="wall" aria-hidden="true">
      <div className="wall__stage">
        {DURATIONS.map((duration, col) => {
          const blocks = Array.from({ length: BLOCKS_PER_SET }, (_, i) => wallBrands[(col * 5 + i * 7) % wallBrands.length]);
          return (
            <div key={col} className="wall__col" style={{ "--dur": `${duration}s` } as CSSProperties}>
              {/* Zwei gleiche Sätze hintereinander ergeben die endlose Schleife */}
              {[0, 1].map((set) => (
                <div key={set} className="wall__set">
                  {blocks.map((brand, i) => (
                    <div key={i} className="wall__block" style={{ "--c": brand.color } as CSSProperties}>
                      <span className="wall__name">{brand.name}</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}
