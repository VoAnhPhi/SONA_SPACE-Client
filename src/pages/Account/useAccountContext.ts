import { createContext, useContext } from "react";
import type { AccountContext } from "./useAccountPage";

export const AccountCtx = createContext<AccountContext | null>(null);

/** Shared account state for the tab components rendered inside the account layout. */
export const useAccountContext = (): AccountContext => {
  const context = useContext(AccountCtx);
  if (!context) throw new Error("useAccountContext must be used inside the account layout");
  return context;
};
