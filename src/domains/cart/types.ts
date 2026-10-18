import type { OrderProduct } from "@/domains/orders/types";

export interface CartItem extends OrderProduct {
  slug: string;
}

// Promotion related interfaces
export interface PromoCode {
  code: string;
  discount: string;
  description: string;
  validUntil: string;
  minOrder: string;
  used: boolean;
}

export interface PromoCodeWithTimer extends PromoCode {
  validFrom: string;
  isFlashSale: boolean;
  timeRemaining?: { hours: number; minutes: number; seconds: number };
  combinations: string;
  status: number;
  userUsedStatus: number;
}

export interface CouponCode {
  code: string;
  discount: string;
  description: string;
  validUntil: string;
  validFrom: string;
  minOrder: string;
  used: boolean;
  isFlashSale: boolean;
  combinations: string;
  timeRemaining?: {
    hours: number;
    minutes: number;
    seconds: number;
  };
}
