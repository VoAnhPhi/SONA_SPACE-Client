import { createContext, useContext } from "react";
import type { OrderDetailContext } from "./useOrderDetail";

export const OrderDetailCtx = createContext<OrderDetailContext | null>(null);

/** Page state shared with the sections of this page. */
export const useOrderDetailContext = (): OrderDetailContext => {
  const context = useContext(OrderDetailCtx);
  if (!context) throw new Error("useOrderDetailContext must be used inside the OrderDetail page");
  return context;
};
