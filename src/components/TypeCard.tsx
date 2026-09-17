import Link from "next/link";
import { productImageSrc, productLabel, typeHref } from "@/lib/catalog";
import type { Product } from "@/lib/types";
import { CarpetImage } from "./CarpetImage";

export function TypeCard({
  type,
  count,
  featured,
}: {
  type: string;
  count: number;
  featured?: Product;
}) {
  return (
    <Link href={typeHref(type)} className="group block focus-visible:outline-none">
      <article className="space-y-3">
        <div className="relative aspect-[3/4] overflow-hidden bg-sand">
          {featured ? (
            <CarpetImage
              src={productImageSrc(featured)}
              alt={productLabel(featured)}
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              sizes="(min-width: 1024px) 20vw, (min-width: 640px) 45vw, 100vw"
            />
          ) : (
            <div className="absolute inset-0 bg-sand" />
          )}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/50 via-ink/0 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-4 text-paper">
            <h3 className="font-serif text-2xl">{type}</h3>
            <p className="mt-1 text-[11px] uppercase tracking-[0.2em] text-paper/80">
              {count} {count === 1 ? "carpet" : "carpets"}
            </p>
          </div>
        </div>
      </article>
    </Link>
  );
}
