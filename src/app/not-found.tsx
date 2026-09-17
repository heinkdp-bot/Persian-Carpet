import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-24 text-center">
      <p className="text-[11px] uppercase tracking-[0.22em] text-muted">404</p>
      <h1 className="mt-3 font-serif text-4xl text-ink">Carpet not found</h1>
      <p className="mt-4 text-muted">This piece is not in the current catalog.</p>
      <Link
        href="/collection"
        className="mt-8 inline-flex min-h-12 items-center border border-ink px-6 text-sm uppercase tracking-[0.16em]"
      >
        View collection
      </Link>
    </div>
  );
}
