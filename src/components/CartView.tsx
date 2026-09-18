"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/components/CartProvider";
import { formatZar } from "@/lib/money";
import { PRICE_DISCLAIMER } from "@/lib/config";

export function CartView() {
  const { items, removeItem, subtotal } = useCart();

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-5 py-20 text-center md:px-8">
        <p className="text-[11px] uppercase tracking-[0.22em] text-muted">Cart</p>
        <h1 className="mt-3 font-serif text-4xl text-ink">Your cart is empty</h1>
        <p className="mt-4 text-muted">Browse the collection and add a unique piece.</p>
        <Link
          href="/collection"
          className="mt-8 inline-flex min-h-12 items-center border border-ink px-6 text-sm uppercase tracking-[0.16em] text-ink hover:bg-ink hover:text-paper"
        >
          View collection
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-5 py-12 md:px-8 md:py-16">
      <p className="text-[11px] uppercase tracking-[0.22em] text-muted">Cart</p>
      <h1 className="mt-3 font-serif text-4xl text-ink md:text-5xl">Selected pieces</h1>

      <ul className="mt-10 divide-y divide-line border-y border-line">
        {items.map((item) => (
          <li key={item.id} className="grid grid-cols-[5.5rem_1fr_auto] items-center gap-4 py-5 md:grid-cols-[7rem_1fr_auto_auto] md:gap-6">
            <div className="relative aspect-[3/4] overflow-hidden bg-sand">
              <Image
                src={item.imageSrc}
                alt={`${item.type} ${item.id}`}
                fill
                sizes="112px"
                className="object-cover"
              />
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-[0.18em] text-muted">
                {item.type}
              </p>
              <Link href={`/carpet/${item.id}`} className="font-serif text-2xl text-ink">
                {item.id}
              </Link>
              <p className="mt-1 text-sm text-muted">{item.size_label}</p>
              <p className="mt-2 text-sm text-ink md:hidden">{formatZar(item.price_zar)}</p>
            </div>
            <p className="hidden text-sm text-ink md:block">{formatZar(item.price_zar)}</p>
            <button
              type="button"
              onClick={() => removeItem(item.id)}
              className="justify-self-end text-[11px] uppercase tracking-[0.16em] text-muted hover:text-ink"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>

      <div className="mt-10 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
        <div>
          <p className="text-[11px] uppercase tracking-[0.2em] text-muted">Subtotal</p>
          <p className="mt-2 font-serif text-3xl text-ink">{formatZar(subtotal)}</p>
          <p className="mt-2 max-w-sm text-xs text-muted">{PRICE_DISCLAIMER}</p>
        </div>
        <Link
          href="/checkout"
          className="inline-flex min-h-12 items-center bg-madder px-8 text-sm uppercase tracking-[0.16em] text-paper hover:bg-ink"
        >
          Checkout
        </Link>
      </div>
    </div>
  );
}
