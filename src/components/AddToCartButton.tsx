"use client";

import { useState } from "react";
import { useCart } from "@/components/CartProvider";
import { productImageSrc } from "@/lib/catalog";
import { formatSize } from "@/lib/money";
import type { Product } from "@/lib/types";

export function AddToCartButton({ product }: { product: Product }) {
  const { addItem, hasItem } = useCart();
  const inCart = hasItem(product.id);
  const [justAdded, setJustAdded] = useState(false);

  function onAdd() {
    addItem({
      id: product.id,
      type: product.type,
      size_label: formatSize(product),
      price_zar: product.price_zar,
      imageSrc: productImageSrc(product),
    });
    setJustAdded(true);
  }

  if (inCart) {
    return (
      <p className="text-sm text-muted">
        {justAdded ? "Added to cart." : "This carpet is in your cart."}{" "}
        <a href="/cart" className="text-ink underline decoration-line underline-offset-4">
          View cart
        </a>
      </p>
    );
  }

  return (
    <button
      type="button"
      onClick={onAdd}
      className="inline-flex min-h-12 w-full items-center justify-center bg-madder px-6 text-sm tracking-[0.16em] text-paper uppercase transition-colors hover:bg-ink sm:w-auto"
    >
      Add to cart
    </button>
  );
}
