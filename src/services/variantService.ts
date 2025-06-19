// src/services/variant.service.ts
import { getVariantBySlugAndColor } from "../api/variant";
import type { Variant } from "../types";

export const fetchVariantBySlugAndColor = async (
  slug: string,
  colorId: number
): Promise<Variant | null> => {
  try {
    const raw = await getVariantBySlugAndColor(slug, colorId);

    const formatted: Variant = {
      variant_id: raw.variantId,
      productId: raw.productId,
      color: {
        id: raw.colorId,
        name: raw.colorName,
        hex: raw.colorHex,
        priority: raw.colorPriority,
        slug: raw.slug,
      },
      quantity: raw.quantity,
      price: parseFloat(raw.price),
      priceSale: parseFloat(raw.priceSale),
      images: raw.listImage
        ? raw.listImage.split(",").map((img: string) => img.trim())
        : [],
    };

    return formatted;
  } catch (error) {
    console.error("Error in fetchVariantBySlugAndColor:", error);
    return null;
  }
};
