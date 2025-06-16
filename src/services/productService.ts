import type { Product } from "../types";
import { getProductBySlug, getAllProducts } from "../api/product";

/**
 * Format raw product from API to usable Product type
 */
export const formatProductForDisplay = (product: any): Product => {
  const colorHexArray: string[] = Array.isArray(product.color_hex)
    ? product.color_hex
    : [];
  // const colorHexString = res.colors.map((c: any) => c.colorHex);
  const isSale = !!product.price_sale && product.price_sale < product.price;

  const createdDate = new Date(product.created_at);
  const today = new Date();
  const threeDaysAgo = new Date(today);
  threeDaysAgo.setDate(today.getDate() - 3);

  const isNew =
    createdDate >= new Date(threeDaysAgo.setHours(0, 0, 0, 0)) &&
    createdDate <= new Date(today.setHours(23, 59, 59, 999));
  return {
    id: product.id,
    name: product.name,
    slug: product.slug || "",
    price: product.price ?? 0,
    priceSale: product.price_sale ?? 0,
    image: product.image || "",
    isNew,
    isSale,
    isWishlist: false,
    created_at: product.created_at,
    updated_at: product.updated_at,
    category: {
      id: product.category_id ?? 0,
      name: product.category_name ?? "",
    },
    colors: colorHexArray, // ✅ Đúng theo kiểu string[]
    specifications: [], // nếu chưa cần, có thể bỏ trống
    description: product.description ?? "",
    sold: product.sold ?? 0,
    view: product.view ?? 0,
    material: product.materials ?? "",
    height: product.height ? Number(product.height) : undefined,
    width: product.width ? Number(product.width) : undefined,
    depth: product.depth ? Number(product.depth) : undefined,
    seating_height: product.seating_height
      ? Number(product.seating_height)
      : undefined,
    maxium_weight: product.max_weight_load
      ? Number(product.max_weight_load)
      : undefined,
    stock: product.defaultQuantity ?? 0,
    images: product.defaultImages || [],
    variants: product.variants || [], // Thêm variants vào đây
  };
};

/**
 * Fetch all products and format them
 */
export const fetchAllProducts = async (
  page: number = 1,
  limit: number = 8
): Promise<{ products: Product[]; totalPages: number }> => {
  try {
    const rawProducts = await getAllProducts(page, limit);
    const formatted = rawProducts.items.map(formatProductForDisplay);
    return {
      products: formatted,
      totalPages: rawProducts.totalPages,
    };
  } catch (error) {
    console.error("Error in fetchAllProducts:", error);
    return { products: [], totalPages: 1 };
  }
};

/**
 * Fetch a product by its slug
 */
export const fetchProductBySlug = async (
  slug: string
): Promise<{
  product: Product | null;
  colors: string[];
  relatedProducts: {
    id: number;
    name: string;
    slug: string;
  }[];
}> => {
  try {
    const {
      product,
      colors = [],
      related_products = [],
    } = await getProductBySlug(slug);

    const formatted = formatProductForDisplay({
      ...product,
      price: parseFloat(product.defaultPrice),
      price_sale: parseFloat(product.defaultPriceSale),
      image: product.defaultImage,
      color_hex: colors.map((c) => c.colorHex),
    });

    return {
      product: formatted,
      colors: colors.map((c) => c.colorName),
      relatedProducts: related_products,
    };
  } catch (error) {
    console.error("Error in fetchProductBySlug:", error);
    return {
      product: null,
      colors: [],
      relatedProducts: [],
    };
  }
};
