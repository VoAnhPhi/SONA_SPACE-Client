import axios from "axios";

export const addToWishlist = async (variant_id: number,quantity: number) => {
    const token = sessionStorage.getItem("authToken");

    try {
        const response = await axios.post(
            "http://localhost:3501/api/wishlists",
            {
                variant_id,
                quantity,
                status: 1,

            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return response.data;
    } catch (error: any) {
        console.error("❌ Lỗi khi gọi addToWishlist:", error?.response?.data || error.message || error);
        throw error;
    }
};

export const fetchWishlistFromDatabase = async () => {
  const token = sessionStorage.getItem("authToken");
  if (!token) throw new Error("Bạn chưa đăng nhập");

  const response = await axios.get("http://localhost:3501/api/wishlists?status=1", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const loadWishlistService = async () => {
  try {
    const data = await fetchWishlistFromDatabase();
    return {
      success: true,
      wishlistItems: data,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Lỗi không xác định khi load wishlist",
    };
  }
};

// 👉 Đổi tên rõ ràng hơn:
export const removeFromWishlistService = async (variantId: number) => {
  const token = sessionStorage.getItem("authToken");
  if (!token) throw new Error("Bạn chưa đăng nhập");

  const response = await axios.delete(`http://localhost:3501/api/wishlists/variant/${variantId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};



