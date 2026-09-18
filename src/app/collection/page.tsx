import { CarpetCard } from "@/components/CarpetCard";
import { getProducts, getTypes, typeHref } from "@/lib/catalog";
import Link from "next/link";

export const metadata = {
  title: "Collection",
};

export default function CollectionPage() {
  const products = getProducts();
  const types = getTypes();

  return (
    <div className="mx-auto max-w-7xl px-5 py-12 md:px-8 md:py-16">
      <p className="text-[11px] uppercase tracking-[0.22em] text-muted">Collection</p>
      <h1 className="mt-3 font-serif text-4xl text-ink md:text-5xl">All carpets</h1>
      <p className="mt-4 max-w-xl text-muted">
        {products.length} unique pieces. Filter by type, or open any carpet for
        size and price.
      </p>

      <div className="mt-8 flex flex-wrap gap-2">
        {types.map((type) => (
          <Link
            key={type}
            href={typeHref(type)}
            className="border border-line px-3 py-2 text-[11px] uppercase tracking-[0.16em] text-muted hover:border-ink hover:text-ink"
          >
            {type}
          </Link>
        ))}
      </div>

      <div className="mt-12 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <CarpetCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
