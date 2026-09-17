import Link from "next/link";
import { CarpetCard } from "@/components/CarpetCard";
import { CarpetImage } from "@/components/CarpetImage";
import { TypeCard } from "@/components/TypeCard";
import {
  getHomepageFeatured,
  getHomepageHero,
  getTypeSummaries,
  productHref,
  productImageSrc,
  productLabel,
} from "@/lib/catalog";
import { STORE_NAME, STORE_TAGLINE, TYPE_COPY } from "@/lib/config";
import { formatSize } from "@/lib/money";

export default function HomePage() {
  const hero = getHomepageHero();
  const featured = getHomepageFeatured().filter((product) => product.id !== hero.id);
  const types = getTypeSummaries();

  return (
    <div>
      <section className="mx-auto grid max-w-7xl items-center gap-8 px-5 py-8 md:grid-cols-2 md:gap-14 md:px-8 md:py-10">
        <Link
          href={productHref(hero)}
          className="relative block aspect-[3/4] overflow-hidden bg-sand md:aspect-auto md:h-[calc(100dvh-7.5rem)]"
        >
          <CarpetImage
            src={productImageSrc(hero)}
            alt={productLabel(hero)}
            priority
            className="object-cover object-center"
            sizes="(min-width: 1024px) 50vw, 100vw"
          />
        </Link>
        <div>
          <p className="text-[11px] uppercase tracking-[0.28em] text-muted">
            {hero.type} · {formatSize(hero)}
          </p>
          <h1 className="mt-4 font-serif text-4xl tracking-tight text-ink md:text-6xl">
            {STORE_NAME}
          </h1>
          <p className="mt-4 max-w-md text-base leading-relaxed text-muted md:text-lg">
            {STORE_TAGLINE}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href={productHref(hero)}
              className="inline-flex min-h-12 items-center bg-madder px-6 text-sm uppercase tracking-[0.16em] text-paper hover:bg-ink"
            >
              View featured carpet
            </Link>
            <Link
              href="/collection"
              className="inline-flex min-h-12 items-center border border-ink px-6 text-sm uppercase tracking-[0.16em] text-ink hover:bg-ink hover:text-paper"
            >
              Browse collection
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-8 md:px-8 md:py-16">
        <div className="max-w-2xl">
          <p className="text-[11px] uppercase tracking-[0.22em] text-muted">Featured</p>
          <h2 className="mt-3 font-serif text-3xl text-ink md:text-4xl">
            Selected pieces
          </h2>
          <p className="mt-4 text-muted">
            One featured carpet from each type, chosen from pieces with confirmed
            sizes where the catalog allows.
          </p>
        </div>
        <div className="mt-12 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((product) => (
            <CarpetCard key={product.id} product={product} featured />
          ))}
        </div>
      </section>

      <section className="border-t border-line bg-paper">
        <div className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
          <div className="max-w-2xl">
            <p className="text-[11px] uppercase tracking-[0.22em] text-muted">
              Browse by type
            </p>
            <h2 className="mt-3 font-serif text-3xl text-ink md:text-4xl">
              The collection
            </h2>
          </div>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {types.map((entry) => (
              <div key={entry.type}>
                <TypeCard
                  type={entry.type}
                  count={entry.count}
                  featured={entry.featured}
                />
                {TYPE_COPY[entry.type] ? (
                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    {TYPE_COPY[entry.type]}
                  </p>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
