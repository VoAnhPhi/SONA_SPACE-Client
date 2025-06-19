import axios from "axios";

const API_URL = "http://localhost:3501/api";

export const saveToCart = async ({
  variant_id,
  status,
}: {
  variant_id: number;
  status: number;
}) => {
  try {
const token = localStorage.getItem("authToken");

    const response = await axios.post(
      `${API_URL}/wishlists`,
      { variant_id, status },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (err) {
    console.error("API saveToCart error:", err);
    throw err;
  }
};

