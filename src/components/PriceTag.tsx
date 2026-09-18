import { PRICE_DISCLAIMER } from "@/lib/config";
import { formatZar } from "@/lib/money";

export function PriceTag({
  amount,
  size = "md",
  align = "left",
  showDisclaimer = true,
}: {
  amount: number;
  size?: "sm" | "md" | "lg";
  align?: "left" | "center";
  showDisclaimer?: boolean;
}) {
  const priceClass =
    size === "lg"
      ? "text-2xl md:text-3xl"
      : size === "sm"
        ? "text-sm"
        : "text-lg";

  return (
    <div className={align === "center" ? "text-center" : ""}>
      <p className={`font-medium tracking-tight text-ink ${priceClass}`}>
        {formatZar(amount)}
      </p>
      {showDisclaimer ? (
        <p className="mt-1 text-[11px] leading-snug tracking-wide text-muted">
          {PRICE_DISCLAIMER}
        </p>
      ) : null}
    </div>
  );
}
