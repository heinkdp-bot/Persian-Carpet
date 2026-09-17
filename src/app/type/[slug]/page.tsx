import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { CarpetCard } from "@/components/CarpetCard";
import { CarpetImage } from "@/components/CarpetImage";
import { PriceTag } from "@/components/PriceTag";
import {
  getFeaturedForType,
  getProductsByType,
  getTypeBySlug,
  getTypes,
  productHref,
  productImageSrc,
  productLabel,
  typeToSlug,
} from "@/lib/catalog";
import { TYPE_COPY } from "@/lib/config";
import { formatSize } from "@/lib/money";
import Link from "next/link";

export function generateStaticParams() {
  return getTypes().map((type) => ({ slug: typeToSlug(type) }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const type = getTypeBySlug(slug);
  if (!type) return { title: "Type" };
  return { title: type };
}

export default async function TypePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const type = getTypeBySlug(slug);
  if (!type) notFound();

  const products = getProductsByType(type);
  const featured = getFeaturedForType(type);

  return (
    <div>
      <section className="mx-auto max-w-7xl px-5 pt-10 md:px-8 md:pt-14">
        <p className="text-[11px] uppercase tracking-[0.22em] text-muted">Type</p>
        <h1 className="mt-3 font-serif text-4xl text-ink md:text-6xl">{type}</h1>
        <p className="mt-4 max-w-2xl text-muted">
          {TYPE_COPY[type] ?? `${products.length} carpets`}
        </p>
        <p className="mt-2 text-sm text-muted">
          {products.length} {products.length === 1 ? "carpet" : "carpets"}
        </p>
      </section>

      {featured ? (
        <section className="mx-auto mt-10 grid max-w-7xl items-center gap-8 px-5 md:grid-cols-[1.15fr_0.85fr] md:px-8">
          <Link href={productHref(featured)} className="relative block aspect-[3/4] overflow-hidden bg-sand md:aspect-[4/5]">
            <CarpetImage
              src={productImageSrc(featured)}
              alt={productLabel(featured)}
              priority
              className="object-cover"
              sizes="(min-width: 1024px) 55vw, 100vw"
            />
          </Link>
          <div>
            <p className="text-[11px] uppercase tracking-[0.22em] text-muted">
              Featured {type}
            </p>
            <h2 className="mt-3 font-serif text-4xl text-ink">{featured.id}</h2>
            <p className="mt-3 text-muted">{formatSize(featured)}</p>
            <div className="mt-6">
              <PriceTag amount={featured.price_zar} size="lg" />
            </div>
            <Link
              href={productHref(featured)}
              className="mt-8 inline-flex min-h-12 items-center bg-madder px-6 text-sm uppercase tracking-[0.16em] text-paper hover:bg-ink"
            >
              View carpet
            </Link>
          </div>
        </section>
      ) : null}

      <section className="mx-auto max-w-7xl px-5 py-16 md:px-8">
        <h2 className="font-serif text-3xl text-ink">All {type}</h2>
        <div className="mt-10 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <CarpetCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}
