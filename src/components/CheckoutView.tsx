"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/components/CartProvider";
import { PRICE_DISCLAIMER } from "@/lib/config";
import { formatZar } from "@/lib/money";

type CheckoutMode = "demo" | "stripe" | "loading";

export function CheckoutView() {
  const router = useRouter();
  const { items, subtotal, clear } = useCart();
  const [mode, setMode] = useState<CheckoutMode>("loading");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/checkout")
      .then((res) => res.json())
      .then((data: { mode?: string }) => {
        setMode(data.mode === "stripe" ? "stripe" : "demo");
      })
      .catch(() => setMode("demo"));
  }, []);

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-5 py-20 text-center">
        <h1 className="font-serif text-4xl text-ink">Nothing to check out</h1>
        <p className="mt-4 text-muted">Add a carpet to your cart first.</p>
        <a
          href="/collection"
          className="mt-8 inline-flex min-h-12 items-center border border-ink px-6 text-sm uppercase tracking-[0.16em]"
        >
          View collection
        </a>
      </div>
    );
  }

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setBusy(true);
    setError(null);

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer: { name, email },
          items: items.map((item) => ({
            id: item.id,
            type: item.type,
            price_zar: item.price_zar,
          })),
        }),
      });

      const data = (await response.json()) as {
        url?: string;
        mode?: string;
        error?: string;
      };

      if (!response.ok || !data.url) {
        throw new Error(data.error || "Checkout could not start.");
      }

      if (data.mode === "demo") {
        const order = {
          name,
          email,
          items,
          subtotal,
          createdAt: new Date().toISOString(),
        };
        window.sessionStorage.setItem("steenberg-last-order", JSON.stringify(order));
        clear();
      }

      router.push(data.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Checkout failed.");
      setBusy(false);
    }
  }

  return (
    <div className="mx-auto grid max-w-5xl gap-12 px-5 py-12 md:grid-cols-[1.1fr_0.9fr] md:px-8 md:py-16">
      <div>
        <p className="text-[11px] uppercase tracking-[0.22em] text-muted">Checkout</p>
        <h1 className="mt-3 font-serif text-4xl text-ink">Complete your enquiry</h1>
        <p className="mt-4 max-w-md text-sm leading-relaxed text-muted">
          {mode === "stripe"
            ? "You will be redirected to Stripe to pay securely."
            : "Stripe keys are not configured, so this is a demo checkout. No payment will be taken."}
        </p>

        {mode === "demo" ? (
          <div className="mt-6 border border-gold/40 bg-sand/60 px-4 py-3 text-sm text-ink">
            Demo payment path — add <code className="text-xs">STRIPE_SECRET_KEY</code> to
            enable Stripe Checkout.
          </div>
        ) : null}

        <form onSubmit={onSubmit} className="mt-8 space-y-5">
          <label className="block">
            <span className="text-[11px] uppercase tracking-[0.18em] text-muted">
              Name
            </span>
            <input
              required
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="mt-2 w-full border border-line bg-paper px-3 py-3 text-sm text-ink outline-none focus:border-ink"
            />
          </label>
          <label className="block">
            <span className="text-[11px] uppercase tracking-[0.18em] text-muted">
              Email
            </span>
            <input
              required
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="mt-2 w-full border border-line bg-paper px-3 py-3 text-sm text-ink outline-none focus:border-ink"
            />
          </label>

          {error ? <p className="text-sm text-madder">{error}</p> : null}

          <button
            type="submit"
            disabled={busy || mode === "loading"}
            className="inline-flex min-h-12 w-full items-center justify-center bg-madder px-6 text-sm uppercase tracking-[0.16em] text-paper hover:bg-ink disabled:opacity-60 sm:w-auto"
          >
            {busy
              ? "Please wait…"
              : mode === "stripe"
                ? "Pay with Stripe"
                : "Place demo order"}
          </button>
        </form>
      </div>

      <aside className="border border-line bg-paper p-6">
        <p className="text-[11px] uppercase tracking-[0.2em] text-muted">Order</p>
        <ul className="mt-5 space-y-4">
          {items.map((item) => (
            <li key={item.id} className="flex items-start justify-between gap-4 text-sm">
              <span>
                {item.type} {item.id}
                <span className="block text-muted">{item.size_label}</span>
              </span>
              <span>{formatZar(item.price_zar)}</span>
            </li>
          ))}
        </ul>
        <div className="mt-6 border-t border-line pt-4">
          <div className="flex justify-between font-medium text-ink">
            <span>Total</span>
            <span>{formatZar(subtotal)}</span>
          </div>
          <p className="mt-2 text-xs text-muted">{PRICE_DISCLAIMER}</p>
        </div>
      </aside>
    </div>
  );
}
