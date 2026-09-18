"use client";

import Link from "next/link";
import { useMemo, useSyncExternalStore } from "react";
import type { CartItem } from "@/lib/types";
import { formatZar } from "@/lib/money";

type LastOrder = {
  name: string;
  email: string;
  items: CartItem[];
  subtotal: number;
};

function subscribe(onStoreChange: () => void) {
  window.addEventListener("storage", onStoreChange);
  return () => window.removeEventListener("storage", onStoreChange);
}

function getSnapshot() {
  try {
    return window.sessionStorage.getItem("steenberg-last-order");
  } catch {
    return null;
  }
}

function getServerSnapshot() {
  return null;
}

export function CheckoutSuccessView({ mode }: { mode: string }) {
  const raw = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const order = useMemo<LastOrder | null>(() => {
    if (!raw) return null;
    try {
      return JSON.parse(raw) as LastOrder;
    } catch {
      return null;
    }
  }, [raw]);

  return (
    <div className="mx-auto max-w-3xl px-5 py-20 text-center md:px-8">
      <p className="text-[11px] uppercase tracking-[0.22em] text-muted">
        {mode === "demo" ? "Demo order" : "Payment received"}
      </p>
      <h1 className="mt-3 font-serif text-4xl text-ink md:text-5xl">Thank you</h1>
      <p className="mx-auto mt-4 max-w-md text-muted">
        {mode === "demo"
          ? "This was a placeholder checkout. No payment was taken. When Stripe keys are added, this step becomes a live card payment."
          : "Your payment was submitted through Stripe Checkout."}
      </p>

      {order ? (
        <div className="mx-auto mt-10 max-w-md border border-line bg-paper px-5 py-6 text-left">
          <p className="text-sm text-ink">
            {order.name}
            <span className="block text-muted">{order.email}</span>
          </p>
          <ul className="mt-4 space-y-2 text-sm">
            {order.items.map((item) => (
              <li key={item.id} className="flex justify-between gap-4">
                <span>
                  {item.type} {item.id}
                </span>
                <span>{formatZar(item.price_zar)}</span>
              </li>
            ))}
          </ul>
          <p className="mt-4 flex justify-between border-t border-line pt-3 font-medium">
            <span>Total</span>
            <span>{formatZar(order.subtotal)}</span>
          </p>
        </div>
      ) : null}

      <Link
        href="/collection"
        className="mt-10 inline-flex min-h-12 items-center border border-ink px-6 text-sm uppercase tracking-[0.16em] text-ink hover:bg-ink hover:text-paper"
      >
        Continue browsing
      </Link>
    </div>
  );
}
