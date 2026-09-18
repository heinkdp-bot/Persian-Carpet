import { CheckoutSuccessView } from "@/components/CheckoutSuccessView";

export const metadata = {
  title: "Order received",
};

export default async function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ mode?: string; session_id?: string }>;
}) {
  const { mode, session_id } = await searchParams;
  const resolvedMode = mode === "demo" ? "demo" : session_id ? "stripe" : "stripe";

  return <CheckoutSuccessView mode={resolvedMode} />;
}
