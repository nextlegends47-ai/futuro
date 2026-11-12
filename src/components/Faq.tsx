import type { Faq } from "@/data/catalog";
import { Icon } from "./Icon";

/** Fragen zum Aufklappen. Funktioniert auch ohne Skript. */
export function FaqList({ items }: { items: Faq[] }) {
  return (
    <div className="faq">
      {items.map((item) => (
        <details key={item.q} className="faq__item">
          <summary>
            {item.q}
            <Icon name="chevronDown" size={20} />
          </summary>
          <p className="faq__answer">{item.a}</p>
        </details>
      ))}
    </div>
  );
}
