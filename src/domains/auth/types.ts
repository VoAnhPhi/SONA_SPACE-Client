import type { Address } from "@/domains/account/types";
import type { Product } from "@/domains/catalog/types";

// User related interfaces
export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  address?: string;
  addresses: Address[];
  wishlist?: Product[];
  full_name?: string;
}
