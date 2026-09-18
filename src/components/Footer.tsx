import Link from "next/link";
import { PRICE_DISCLAIMER, STORE_NAME, STORE_TAGLINE } from "@/lib/config";
import { getTypes, typeToSlug } from "@/lib/catalog";

export function Footer() {
  const types = getTypes();

  return (
    <footer className="mt-auto border-t border-line bg-paper">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 md:grid-cols-3 md:px-8">
        <div>
          <p className="font-serif text-2xl text-ink">{STORE_NAME}</p>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted">
            {STORE_TAGLINE}
          </p>
        </div>
        <div>
          <p className="text-[11px] uppercase tracking-[0.2em] text-muted">Types</p>
          <ul className="mt-4 space-y-2 text-sm text-ink">
            {types.map((type) => (
              <li key={type}>
                <Link href={`/type/${typeToSlug(type)}`} className="hover:text-madder">
                  {type}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-[11px] uppercase tracking-[0.2em] text-muted">Notes</p>
          <p className="mt-4 text-sm leading-relaxed text-muted">
            {PRICE_DISCLAIMER}. Each carpet is a unique piece. Sizes are listed in
            metres where known.
          </p>
        </div>
      </div>
    </footer>
  );
}
