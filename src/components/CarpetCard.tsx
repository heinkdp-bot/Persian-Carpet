import Link from "next/link";
import { productHref, productImageSrc, productLabel } from "@/lib/catalog";
import { formatSize } from "@/lib/money";
import type { Product } from "@/lib/types";
import { CarpetImage } from "./CarpetImage";
import { PriceTag } from "./PriceTag";

export function CarpetCard({
  product,
  featured = false,
}: {
  product: Product;
  featured?: boolean;
}) {
  return (
    <Link
      href={productHref(product)}
      className="group block focus-visible:outline-none"
    >
      <article className={featured ? "space-y-4" : "space-y-3"}>
        <div
          className={`relative overflow-hidden bg-sand ${
            featured ? "aspect-[3/4] md:aspect-[4/5]" : "aspect-[3/4]"
          }`}
        >
          <CarpetImage
            src={productImageSrc(product)}
            alt={productLabel(product)}
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            sizes={
              featured
                ? "(min-width: 1024px) 30vw, 100vw"
                : "(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
            }
          />
        </div>
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[11px] uppercase tracking-[0.22em] text-muted">
              {product.type}
            </p>
            <h3
              className={`mt-1 font-serif text-ink ${
                featured ? "text-2xl" : "text-xl"
              }`}
            >
              {product.id}
            </h3>
            <p className="mt-1 text-sm text-muted">{formatSize(product)}</p>
          </div>
          <PriceTag amount={product.price_zar} size="sm" showDisclaimer={false} />
        </div>
      </article>
    </Link>
  );
}
