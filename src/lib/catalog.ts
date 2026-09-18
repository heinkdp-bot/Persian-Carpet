import catalogJson from "../../data/catalog.json";
import { HOMEPAGE_HERO_ID } from "./config";
import { formatSize, hasMeasuredSize } from "./money";
import type { Catalog, Product } from "./types";

const catalog = catalogJson as Catalog;

export function getCatalog(): Catalog {
  return catalog;
}

export function getProducts(): Product[] {
  return catalog.products;
}

export function getProduct(id: string): Product | undefined {
  return catalog.products.find((product) => product.id === id);
}

export function getTypes(): string[] {
  return catalog.types;
}

export function typeToSlug(type: string): string {
  return type.trim().toLowerCase().replace(/\s+/g, "-");
}

export function getTypeBySlug(slug: string): string | undefined {
  return catalog.types.find((type) => typeToSlug(type) === slug);
}

export function getProductsByType(type: string): Product[] {
  return catalog.products.filter((product) => product.type === type);
}

export function productImageSrc(product: Pick<Product, "image">): string {
  const filename = product.image.replace(/^images\//, "");
  return `/carpets/${filename}`;
}

export function productHref(product: Pick<Product, "id">): string {
  return `/carpet/${encodeURIComponent(product.id)}`;
}

export function typeHref(type: string): string {
  return `/type/${typeToSlug(type)}`;
}

export function getFeaturedForType(type: string): Product | undefined {
  const ofType = getProductsByType(type);
  return (
    ofType.find((product) => product.featured_in_type) ??
    ofType
      .filter(hasMeasuredSize)
      .sort((a, b) => b.featured_score - a.featured_score)[0] ??
    ofType[0]
  );
}

export function getHomepageHero(): Product {
  if (HOMEPAGE_HERO_ID) {
    const configured = getProduct(HOMEPAGE_HERO_ID);
    if (configured) return configured;
  }

  const sizedFeatured = catalog.products
    .filter((product) => product.featured_in_type && hasMeasuredSize(product))
    .sort((a, b) => b.featured_score - a.featured_score);

  return sizedFeatured[0] ?? catalog.products[0];
}

export function getHomepageFeatured(): Product[] {
  const hero = getHomepageHero();
  const featured = catalog.products.filter((product) => product.featured_in_type);

  const ordered = featured
    .slice()
    .sort((a, b) => {
      const sizeRank = Number(hasMeasuredSize(b)) - Number(hasMeasuredSize(a));
      if (sizeRank !== 0) return sizeRank;
      return b.featured_score - a.featured_score;
    });

  const withoutHero = ordered.filter((product) => product.id !== hero.id);
  return [hero, ...withoutHero].filter(
    (product, index, list) => list.findIndex((item) => item.id === product.id) === index,
  );
}

export function getTypeSummaries() {
  return catalog.types.map((type) => {
    const products = getProductsByType(type);
    const featured = getFeaturedForType(type);
    return {
      type,
      slug: typeToSlug(type),
      href: typeHref(type),
      count: products.length,
      featured,
    };
  });
}

export function productLabel(product: Pick<Product, "id" | "type">): string {
  return `${product.type} ${product.id}`;
}

export function productSubtitle(product: Product): string {
  return `${product.type} · ${formatSize(product)}`;
}
