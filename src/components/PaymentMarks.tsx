import { paymentMethods } from "@/data/catalog";

/**
 * Zahlungsarten der Kasse, alle gleich hoch. Die offiziellen Zeichen fehlen
 * noch, deshalb steht der Name als Text in einer neutralen Kapsel.
 */
export function PaymentMarks({ id }: { id?: string }) {
  return (
    <ul className="pay" aria-label="Zahlungsarten" id={id}>
      {paymentMethods.map((name) => (
        <li key={name}>{name}</li>
      ))}
    </ul>
  );
}
