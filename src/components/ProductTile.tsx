import { features } from "@/config/site";
import { isBuyable, metaLine, priceLabel, productHref, type Product } from "@/data/catalog";
import { ProductArt } from "./Art";
import { Icon } from "./Icon";
import { ProductLink, QuickBuy, WishButton } from "./tile-actions";

/**
 * Produktkachel. Sie sieht überall gleich aus: Startseite, Kategorien, Suche, Merkliste.
 * Hellgrau, 26 px Rundung, ohne Rahmen und ohne Schatten.
 */
export function ProductTile({ product, as: Heading = "h3" }: { product: Product; as?: "h2" | "h3" }) {
  const price = priceLabel(product);
  const buyable = isBuyable(product);
  const available = product.amounts?.filter((a) => !a.soldOut) ?? [];
  const href = productHref(product);

  return (
    <article className="tile">
      <ProductLink href={href} className="tile__link">
        <div className={`tile__media${product.kind === "game" ? " tile__media--game" : ""}`}>
          <div className="tile__art" data-art>
            <ProductArt product={product} />
          </div>
        </div>
        <div className="tile__body">
          <span className="tile__badge">
            <Icon name="shield" size={13} />
            Offizieller Code
          </span>
          <Heading className="tile__name">{product.name}</Heading>
          <span className="tile__meta">{metaLine(product)}</span>
        </div>
      </ProductLink>
      <div className="tile__foot">
        {product.soldOut ? (
          <p className="tile__soldout">Ausverkauft</p>
        ) : price ? (
          <p className="price tile__price">{price}</p>
        ) : (
          <p className="tile__price--none">Preis folgt</p>
        )}
        {buyable ? <QuickBuy slug={product.slug} name={product.name} color={product.color} href={href} amountId={available.length === 1 ? available[0].id : null} /> : null}
      </div>
      {features.wishlist ? <WishButton slug={product.slug} name={product.name} /> : null}
    </article>
  );
}
