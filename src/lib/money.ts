import type { Product } from "./types";

export function formatZar(amount: number): string {
  return new Intl.NumberFormat("en-ZA", {
    style: "currency",
    currency: "ZAR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatSize(product: Pick<Product, "size_label" | "length_m" | "width_m">): string {
  if (product.size_label) return product.size_label;
  if (product.length_m && product.width_m) {
    return `${product.length_m}×${product.width_m} m`;
  }
  return "Size on request";
}

export function hasMeasuredSize(product: Pick<Product, "size_label" | "length_m" | "width_m">): boolean {
  return Boolean(product.size_label || (product.length_m && product.width_m));
}
