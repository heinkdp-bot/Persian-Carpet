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
      <section className="relative min-h-[78vh] overflow-hidden bg-sand">
        <CarpetImage
          src={productImageSrc(hero)}
          alt={productLabel(hero)}
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/15 to-ink/10" />
        <div className="absolute inset-x-0 bottom-0 px-5 py-10 md:px-10 md:py-14">
          <div className="mx-auto max-w-7xl">
            <p className="text-[11px] uppercase tracking-[0.28em] text-paper/80">
              {hero.type} · {formatSize(hero)}
            </p>
            <h1 className="mt-3 max-w-xl font-serif text-4xl text-paper md:text-6xl">
              {STORE_NAME}
            </h1>
            <p className="mt-3 max-w-md text-base text-paper/85 md:text-lg">
              {STORE_TAGLINE}
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href={productHref(hero)}
                className="inline-flex min-h-12 items-center bg-paper px-6 text-sm uppercase tracking-[0.16em] text-ink hover:bg-cream"
              >
                View featured carpet
              </Link>
              <Link
                href="/collection"
                className="inline-flex min-h-12 items-center border border-paper/70 px-6 text-sm uppercase tracking-[0.16em] text-paper hover:bg-paper hover:text-ink"
              >
                Browse collection
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
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
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
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
