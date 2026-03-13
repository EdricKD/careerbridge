import { SUBSCRIPTION_PRICING } from "@/lib/constants";

export function getIndividualCheckoutAmount(licensed: boolean) {
  return licensed
    ? SUBSCRIPTION_PRICING.individual.licensedTopUp
    : SUBSCRIPTION_PRICING.individual.standalone;
}

export function getUniversitySeatPrice(quantity: number) {
  if (quantity <= 500) return 8;
  if (quantity <= 2000) return 6;
  return 4;
}
