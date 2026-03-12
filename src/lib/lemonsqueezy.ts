const STORE_URL =
  process.env.LEMONSQUEEZY_STORE_URL || "https://store.lemonsqueezy.com";

const variantIds: Record<string, string> = {
  "self-paced": process.env.LEMONSQUEEZY_SELF_PACED_ID || "",
  cohort: process.env.LEMONSQUEEZY_COHORT_ID || "",
  enterprise: process.env.LEMONSQUEEZY_ENTERPRISE_ID || "",
};

export function getCheckoutUrl(variantId: string): string {
  const id = variantIds[variantId];
  if (!id) return "#";
  return `${STORE_URL}/checkout/buy/${id}`;
}
