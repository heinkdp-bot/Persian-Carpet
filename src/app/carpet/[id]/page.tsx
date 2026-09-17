import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AddToCartButton } from "@/components/AddToCartButton";
import { CarpetImage } from "@/components/CarpetImage";
import { PriceTag } from "@/components/PriceTag";
import {
  getProduct,
  getProducts,
  productImageSrc,
  productLabel,
  typeHref,
} from "@/lib/catalog";
import { ENQUIRY_NOTE } from "@/lib/config";
import { formatSize } from "@/lib/money";

export function generateStaticParams() {
  return getProducts().map((product) => ({ id: product.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const product = getProduct(id);
  if (!product) return { title: "Carpet" };
  return { title: productLabel(product) };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = getProduct(id);
  if (!product) notFound();

  return (
    <div className="mx-auto grid max-w-7xl gap-10 px-5 py-10 md:grid-cols-[1.15fr_0.85fr] md:items-start md:gap-16 md:px-8 md:py-16">
      <div className="relative aspect-[3/4] overflow-hidden bg-sand">
        <CarpetImage
          src={productImageSrc(product)}
          alt={productLabel(product)}
          priority
          className="object-cover object-center"
          sizes="(min-width: 1024px) 55vw, 100vw"
        />
      </div>

      <div className="md:sticky md:top-28">
        <nav className="text-[11px] uppercase tracking-[0.18em] text-muted">
          <Link href="/" className="hover:text-ink">
            Home
          </Link>
          <span className="px-2">/</span>
          <Link href={typeHref(product.type)} className="hover:text-ink">
            {product.type}
          </Link>
        </nav>

        <p className="mt-6 text-[11px] uppercase tracking-[0.22em] text-muted">
          {product.type}
        </p>
        <h1 className="mt-3 font-serif text-4xl text-ink md:text-5xl">
          {product.id}
        </h1>
        <p className="mt-4 text-lg text-muted">{formatSize(product)}</p>

        <div className="mt-8 border-t border-line pt-8">
          <PriceTag amount={product.price_zar} size="lg" />
        </div>

        <div className="mt-8">
          <AddToCartButton product={product} />
        </div>

        <p className="mt-8 max-w-sm text-sm leading-relaxed text-muted">
          Each carpet is a unique piece. {ENQUIRY_NOTE}
        </p>
      </div>
    </div>
  );
}
