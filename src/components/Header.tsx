"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/components/CartProvider";

export function Header({
  storeName,
  types,
}: {
  storeName: string;
  types: string[];
}) {
  const { count } = useCart();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-line/80 bg-cream/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-5 py-4 md:px-8">
        <Link href="/" className="font-serif text-xl tracking-tight text-ink md:text-2xl">
          {storeName}
        </Link>

        <nav className="hidden items-center gap-7 text-[12px] uppercase tracking-[0.18em] text-muted lg:flex">
          {types.map((type) => (
            <Link
              key={type}
              href={`/type/${type.toLowerCase()}`}
              className="transition-colors hover:text-ink"
            >
              {type}
            </Link>
          ))}
          <Link href="/collection" className="transition-colors hover:text-ink">
            All
          </Link>
          <Link href="/cart" className="text-ink">
            Cart{count > 0 ? ` (${count})` : ""}
          </Link>
        </nav>

        <div className="flex items-center gap-4 lg:hidden">
          <Link href="/cart" className="text-[12px] uppercase tracking-[0.18em] text-ink">
            Cart{count > 0 ? ` (${count})` : ""}
          </Link>
          <button
            type="button"
            aria-expanded={open}
            aria-label="Open menu"
            onClick={() => setOpen((value) => !value)}
            className="text-[12px] uppercase tracking-[0.18em] text-ink"
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>
      </div>

      {open ? (
        <div className="border-t border-line bg-cream px-5 py-5 lg:hidden">
          <nav className="flex flex-col gap-3 text-sm uppercase tracking-[0.16em] text-ink">
            {types.map((type) => (
              <Link
                key={type}
                href={`/type/${type.toLowerCase()}`}
                onClick={() => setOpen(false)}
              >
                {type}
              </Link>
            ))}
            <Link href="/collection" onClick={() => setOpen(false)}>
              All carpets
            </Link>
            <Link href="/cart" onClick={() => setOpen(false)}>
              Cart
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
