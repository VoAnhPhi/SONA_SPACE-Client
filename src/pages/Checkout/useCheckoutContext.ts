import { createContext, useContext } from "react";
import type { CheckoutContext } from "./useCheckout";

export const CheckoutCtx = createContext<CheckoutContext | null>(null);

/** Page state shared with the sections of this page. */
export const useCheckoutContext = (): CheckoutContext => {
  const context = useContext(CheckoutCtx);
  if (!context) throw new Error("useCheckoutContext must be used inside the Checkout page");
  return context;
};
