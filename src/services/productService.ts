import type { PaginatedResponse, Product, Variant } from "../types";
import { getProductBySlug, getAllProducts } from "../api/product";
import { getProductsByRoom } from "../api/room";

/**
 * Format raw product from API to usable Product type
 */
export const formatProductForDisplay = (product: any): Product => {
  // Xử lý mảng màu sắc
  let colorHexArray: string[] = [];
  
  // Trường hợp 1: Lấy màu từ variants nếu có
  if (Array.isArray(product.variants) && product.variants.length > 0) {
    // Lấy các màu không trùng lặp từ variants
    const uniqueColors = new Map();
    product.variants.forEach((variant: {
      color_hex?: string;
      color_id?: number;
      color_name?: string;
      color_priority?: number;
    }) => {
      if (variant.color_hex && variant.color_id) {
        uniqueColors.set(variant.color_id, {
          color_hex: variant.color_hex,
          color_name: variant.color_name || "",
          color_id: variant.color_id,
          color_priority: variant.color_priority || 0
        });
      }
    });
    
    // Chuyển Map thành mảng và sắp xếp theo priority
    const sortedColors = Array.from(uniqueColors.values())
      .sort((a, b) => a.color_priority - b.color_priority);
    
    // Lấy ra mảng các mã màu
    colorHexArray = sortedColors.map(color => color.color_hex);
  }
  // Trường hợp 2: product.color_hex là mảng
  else if (Array.isArray(product.color_hex)) {
    colorHexArray = product.color_hex;
  } 
  // Trường hợp 3: product.colors là mảng
  else if (Array.isArray(product.colors)) {
    colorHexArray = product.colors;
  } 
  // Trường hợp 4: Mặc định một số màu cơ bản
  else {
    colorHexArray = ["#3C5838", "#D9A13B", "#DDC8A6"];
  }

  // Xử lý giá và giá khuyến mãi, đảm bảo là số
  let price = 0;
  if (product.price !== undefined && product.price !== null) {
    price = Number(product.price);
  } else if (product.variant_price !== undefined && product.variant_price !== null) {
    price = Number(product.variant_price);
  }
  
  // Nếu không có giá, sử dụng giá mặc định
  if (isNaN(price) || price <= 0) {
    price = 5000000; // Giá mặc định
  }
  
  // Xử lý giá khuyến mãi
  let priceSale: number | undefined = undefined;
  if (product.price_sale !== undefined && product.price_sale !== null) {
    priceSale = Number(product.price_sale);
  } else if (product.variant_price_sale !== undefined && product.variant_price_sale !== null) {
    priceSale = Number(product.variant_price_sale);
  }
  
  // Kiểm tra giá khuyến mãi hợp lệ
  if (priceSale !== undefined && (isNaN(priceSale) || priceSale <= 0 || priceSale >= price)) {
    priceSale = undefined; // Không có khuyến mãi nếu giá không hợp lệ
  }
  
  const isSale = priceSale !== undefined && priceSale > 0;

  // Kiểm tra sản phẩm mới
  const createdDate = new Date(product.created_at);
  const today = new Date();
  const threeDaysAgo = new Date(today);
  threeDaysAgo.setDate(today.getDate() - 3);

  const isNew =
    createdDate >= new Date(threeDaysAgo.setHours(0, 0, 0, 0)) &&
    createdDate <= new Date(today.setHours(23, 59, 59, 999));

  // Xử lý thông tin danh mục
  const category = {
    id: product.category_id || 0,
    name: product.category_name || "",
  };

  // Xử lý hình ảnh - kiểm tra các định dạng URL khác nhau
  let image = product.product_image || product.image || "";
  
  // Xử lý trường hợp URL ảnh có chứa dấu phẩy
  if (image && image.includes(',')) {
    const imageArray = image.split(',');
    image = imageArray[0].trim();
  }
  
  // Xử lý trường hợp URL ảnh có chứa \n
  if (image && image.includes('\\n')) {
    const imageArray = image.split('\\n');
    image = imageArray[0].trim();
  }
  
  // Xử lý trường hợp URL ảnh có chứa \r\n
  if (image && image.includes('\\r\\n')) {
    const imageArray = image.split('\\r\\n');
    image = imageArray[0].trim();
  }

  // Xử lý trường hợp URL ảnh có chứa newline literal
  if (image && image.includes('\n')) {
    const imageArray = image.split('\n');
    image = imageArray[0].trim();
  }

  // Nếu không có ảnh, sử dụng ảnh mặc định
  if (!image) {
    image = "/images/placeholder.jpg";
  }
  
  // Xử lý các thuộc tính vật lý
  const height = product.variant_height ? Number(product.variant_height) : undefined;
  const width = product.variant_width ? Number(product.variant_width) : undefined;
  const depth = product.variant_depth ? Number(product.variant_depth) : undefined;
  const seating_height = product.variant_seating_height ? Number(product.variant_seating_height) : undefined;
  const maxium_weight = product.variant_maximum_weight_load ? Number(product.variant_maximum_weight_load) : undefined;

  return {
    id: product.product_id || product.id,
    name: product.product_name || product.name || "",
    slug: product.product_slug || product.slug || "",
    price: price,
    price_sale: priceSale,
    priceSale: priceSale,
    image: image,
    isNew,
    isSale,
    isWishlist: false,
    created_at: product.created_at,
    updated_at: product.updated_at,
    category: category,
    colors: colorHexArray,
    specifications: [],
    description: product.product_description || product.description || "",
    sold: product.product_sold || product.sold || 0,
    view: product.product_view || product.view || 0,
    material: product.variant_materials || product.material || "",
    height,
    width,
    depth,
    seating_height,
    maxium_weight,
    stock: product.product_stock || product.stock || 0,
    images: product.images || [],
    variants: product.variants || [],
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
    console.log("formatted", formatted);
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

