import { categories, categoryBySlug, products, type Category, type Product } from "@/data/catalog";

const norm = (s: string) =>
  s
    .toLowerCase()
    .replace(/ß/g, "ss")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");

const productIndex = products.map((product) => ({
  product,
  name: norm(product.name),
  hay: norm([product.name, categoryBySlug(product.category)?.name, product.platform?.label, product.platform?.group, product.kind === "game" ? "spiel key" : "gutschein guthaben code"].filter(Boolean).join(" ")),
}));

const categoryIndex = categories.map((category) => ({ category, hay: norm(`${category.name} ${category.shortName} ${category.blurb}`) }));

export interface SearchResult {
  products: Product[];
  categories: Category[];
}

/** Einfache Suche über Marken, Spiele und Kategorien. Jedes Wort der Eingabe muss vorkommen. */
export function searchCatalog(query: string): SearchResult {
  const tokens = norm(query).split(/\s+/).filter(Boolean);
  if (!tokens.length) return { products: [], categories: [] };

  const hits = productIndex
    .filter((entry) => tokens.every((t) => entry.hay.includes(t)))
    .map((entry) => ({ product: entry.product, rank: entry.name.startsWith(tokens[0]) ? 0 : entry.name.includes(tokens[0]) ? 1 : 2 }))
    .sort((a, b) => a.rank - b.rank);

  return {
    products: hits.map((h) => h.product),
    categories: categoryIndex.filter((entry) => tokens.every((t) => entry.hay.includes(t))).map((entry) => entry.category),
  };
}
