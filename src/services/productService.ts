import type { Product, Variant, ProductSpecification } from "../types";
import { getProductBySlug, getAllProducts } from "../api/product";

/**
 * Format raw product from API to usable Product type
 */
export const formatProductForDisplay = (product: any): Product => {
  const variants = Array.isArray(product.variants) ? product.variants : [];

  // Không có biến thể thì trả về sản phẩm cơ bản
  if (variants.length === 0) {
    return {
      id: product.id,
      name: product.name,
      price: 0,
      priceSale: 0,
      image: "",
      colors: [],
      slug: "",
      isNew: false,
      isSale: false,
      isWishlist: false,
      created_at: product.created_at || "",
      category: {
        id: product.category_id ?? 0,
        name: product.category_name ?? "",
      },
      specifications: [],
    };
  }

  // Sắp xếp theo độ ưu tiên màu
  const sortedVariants = variants.sort(
    (a: Variant, b: Variant) => b.color_priority - a.color_priority
  ) as Variant[];
  const mainVariant = sortedVariants[0];

  const imageList =
    typeof mainVariant.variant_images === "string"
      ? mainVariant.variant_images.split(",").map((url: string) => url.trim())
      : [];

  const firstImage = imageList[0] || "";

  const isSale =
    !!mainVariant.variant_price_sale &&
    mainVariant.variant_price_sale < mainVariant.variant_price;
  const createdDate = new Date(product.created_at);
  const today = new Date();
  const threeDaysAgo = new Date();
  threeDaysAgo.setDate(today.getDate() - 3);

  // Làm tròn giờ để chỉ so sánh theo ngày
  const createdDateOnly = new Date(
    createdDate.getFullYear(),
    createdDate.getMonth(),
    createdDate.getDate()
  );
  const todayOnly = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );
  const threeDaysAgoOnly = new Date(
    threeDaysAgo.getFullYear(),
    threeDaysAgo.getMonth(),
    threeDaysAgo.getDate()
  );

  const isNew =
    createdDateOnly.getTime() >= threeDaysAgoOnly.getTime() &&
    createdDateOnly.getTime() <= todayOnly.getTime();

  return {
    id: product.id,
    name: product.name,
    price: mainVariant.variant_price ?? 0,
    priceSale: mainVariant.variant_price_sale ?? 0,
    image: firstImage,
    slug: product.slug || "",
    isNew,
    isSale,
    isWishlist: false,
    created_at: product.created_at,
    category: {
      id: product.category_id ?? 0,
      name: product.category_name ?? "",
    },

    colors: variants.map((v: any) => ({
      colorId: v.color_id,
      colorName: v.color_name,
      colorHex: v.color_hex,
      image: v.variant_images?.split(",")[0]?.trim() || "",
      slug: v.variant_slug,
      price: v.variant_price,
      priceSale: v.variant_price_sale,
    })),

    specifications: [
      {
        label: "Chiều cao",
        value: `${mainVariant.variant_height ?? 0} cm`,
      },
      {
        label: "Chiều rộng",
        value: `${mainVariant.variant_width ?? 0} cm`,
      },
      {
        label: "Chiều sâu",
        value: `${mainVariant.variant_depth ?? 0} cm`,
      },
    ] as ProductSpecification[],
  };
};

/**
 * Fetch all products and format them
 */
export const fetchAllProducts = async (): Promise<Product[]> => {
  try {
    console.log("Service: Fetching all products");

    const response = await getAllProducts();
    const rawProducts = response.items;

    const formatted = rawProducts.map(formatProductForDisplay);

    console.log(`Service: Received ${formatted.length} products`);
    return formatted;
  } catch (error) {
    console.error("Error in fetchAllProducts:", error);
    return [];
  }
};

/**
 * Fetch a product by its slug
 */
export const fetchProductBySlug = async (
  slug: string
): Promise<Product | null> => {
  try {
    console.log(`Service: Fetching product with slug: ${slug}`);
    const rawProduct = await getProductBySlug(slug);
    const formatted = formatProductForDisplay(rawProduct);
    console.log(`Service: Received product with ID: ${formatted.id}`);
    return formatted;
  } catch (error) {
    console.error(`Error fetching product with slug "${slug}":`, error);
    return null;
  }
};
