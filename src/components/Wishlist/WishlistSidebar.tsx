import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { saveToOrCart } from "../../services/cartService";
import { toast } from "react-toastify";
import type { MiniCartHandle } from "../../components/MiniCart";
import { convertToAdminApiUrl } from "../../utils/url";

// Định nghĩa kiểu dữ liệu cho wishlist item
interface WishlistItem {
  wishlist_id: number;
  status: number;
  created_at: string;
  variant_id: number;
  product_id: number;
  price: string;
  price_sale: string | null;
  image: string;
  product_name: string;
  category: string;
  product_slug: string;
  color_name?: string;
  color_hex?: string;
  slug: string;
}


interface WishlistSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const WishlistSidebar: React.FC<WishlistSidebarProps> = ({ isOpen, onClose }) => {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [productNames, setProductNames] = useState<Record<number, string>>({});
  const miniCartRef = useRef<MiniCartHandle>(null);
  // Ngăn chặn scroll khi sidebar hiển thị
  useEffect(() => {
    const handleWishlistChanged = () => {
      if (isOpen) {
        fetchWishlistItems();
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      fetchWishlistItems();
      window.addEventListener("wishlist-changed", handleWishlistChanged);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener("wishlist-changed", handleWishlistChanged);
    };
  }, [isOpen]);


  // Lấy tên sản phẩm từ API
  const fetchProductNames = async (productIds: number[]) => {
    if (productIds.length === 0) return;

    try {
      // Lấy token từ sessionStorage
      const token = sessionStorage.getItem('authToken');
      if (!token) return;

      // Tạo một đối tượng để lưu trữ tên sản phẩm
      const names: Record<number, string> = {};

      // Lấy tên sản phẩm cho từng product_id
      await Promise.all(productIds.map(async (productId) => {
        try {
          const response = await axios.get(convertToAdminApiUrl(`/wishlists?status=1`), {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          });

          if (response.data && response.data.product_name) {
            names[productId] = response.data.product_name;
          } else {
            names[productId] = `Sản phẩm #${productId}`;
          }
        } catch (err) {
          console.error(`Lỗi khi lấy tên sản phẩm cho ID ${productId}:`, err);
          names[productId] = `Sản phẩm #${productId}`;
        }
      }));

      // Cập nhật state
      setProductNames(names);
    } catch (err) {
      console.error('Lỗi khi lấy tên sản phẩm:', err);
    }
  };

  // Lấy danh sách wishlist từ API
  const fetchWishlistItems = async () => {
    try {
      setLoading(true);
      setError(null);

      const token = sessionStorage.getItem('authToken');
      if (!token) {
        setError('Vui lòng đăng nhập để thêm được vào wishlist');
        setLoading(false);
        return;
      }

      const response = await axios.get(convertToAdminApiUrl(`/wishlists?status=1`), {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // console.log('wishlist item', response)
      const items: WishlistItem[] = Array.isArray(response.data) ? response.data : [];

      setWishlistItems(items);
    } catch (err) {
      console.error('Lỗi khi lấy danh sách yêu thích:', err);
      setError('Không thể lấy danh sách yêu thích. Vui lòng thử lại sau.');
      setWishlistItems([]);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async (variantId: number) => {
    try {
      const token = sessionStorage.getItem("authToken");
      if (!token) {
        toast.warning("Vui lòng đăng nhập để thêm vào giỏ hàng.", {
          position: "top-right",
          autoClose: 1500,
        });
        return;
      }

      const response = await saveToOrCart({
        status: 0,
        cartItems: [
          {
            variant_id: Number(variantId),
            quantity: 1,
          },
        ],
      });

      if (response.success) {
        toast.success("Đã thêm vào giỏ hàng!", {
          position: "top-right",
          autoClose: 1000,
        });

        if (miniCartRef.current) {
          miniCartRef.current.notifyCartChanged();
          miniCartRef.current.toggleMiniCart();
        }
      } else {
        toast.error("Lỗi khi thêm vào giỏ hàng: " + response.message, {
          position: "top-right",
          autoClose: 1500,
        });
      }
    } catch (error) {
      console.error("Lỗi khi thêm vào giỏ hàng:", error);
      toast.error("Không thể thêm vào giỏ hàng. Vui lòng thử lại sau.", {
        position: "top-right",
        autoClose: 1500,
      });
    }
  };




  // Xử lý xóa sản phẩm khỏi wishlist
  const handleRemoveFromWishlist = async (wishlistId: number) => {
    try {
      const token = sessionStorage.getItem('authToken');
      if (!token) {
        setError('Xóa sản phẩm khỏi wishlist');
        return;
      }

      // Tìm item bị xóa để lấy variant_id
      const removedItem = wishlistItems.find(item => item.wishlist_id === wishlistId);

      // Gọi API xóa
      await axios.delete(convertToAdminApiUrl(`/wishlists/${wishlistId}`), {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      // Cập nhật lại danh sách wishlist
      setWishlistItems(wishlistItems.filter(item => item.wishlist_id !== wishlistId));

      // Dispatch event nếu có removedItem
      if (removedItem) {
        const event = new CustomEvent("wishlist-changed", {
          detail: { variantId: removedItem.variant_id },
        });
        window.dispatchEvent(event);
      }

    } catch (err) {
      console.error('Lỗi khi xóa sản phẩm khỏi danh sách yêu thích:', err);
      setError('Không thể xóa sản phẩm. Vui lòng thử lại sau.');
    }
  };


  // Lấy URL hình ảnh đầu tiên từ chuỗi URL
  const getFirstImageUrl = (imageUrls: string): string => {
    if (!imageUrls) return "";

    // Nếu chuỗi chứa dấu phẩy, lấy URL đầu tiên
    if (imageUrls.includes(',')) {
      return imageUrls.split(',')[0];
    }

    return imageUrls;
  };

  // Format giá tiền
  const formatPrice = (price: string | null): string => {
    if (!price) return "0đ";
    return parseInt(price).toLocaleString('vi-VN') + 'đ';
  };

  // Handle click outside to close
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <>
      <div
        className={`wishlist-sidebar-container ${isOpen ? 'open' : ''}`}
        onClick={handleOverlayClick}
      >
        <div className="wishlist-sidebar">
          <div className="wishlist-sidebar-header">
            <h2>Danh sách yêu thích</h2>
            <button className="close-button" onClick={onClose}>
              <img src="/images/icons/close.svg" alt="Đóng" />
            </button>
          </div>
          <div className="wishlist-sidebar-content">
            {loading ? (
              <div className="loading-state">
                <p>Đang tải danh sách yêu thích...</p>
              </div>
            ) : error ? (
              <div className="error-state">
                <p>{error}</p>
              </div>
            ) : wishlistItems.length === 0 ? (
              <div className="empty-wishlist">
                <div className="empty-wishlist-icon">
                  <img src="/images/icons/wishlist-empty.svg" alt="Danh sách trống" />
                </div>
                <p>Danh sách yêu thích của bạn đang trống</p>
                <a href="/san-pham" className="btn-browse">Khám phá sản phẩm</a>
              </div>
            ) : (
              <div className="wishlist-items">
                {Array.isArray(wishlistItems) ? wishlistItems.map((item) => (
                  <div className="wishlist-item" key={item.wishlist_id}>
                    <div className="wishlist-item-image">
                      <Link to={`/san-pham/${item.slug}`}>
                        <img src={getFirstImageUrl(item.image)} alt="Product" />
                      </Link>
                    </div>
                    <div className="wishlist-item-info">
                      <Link to={`/san-pham/${item.slug}`} className="wishlist-item-name">
                        {item.product_name || productNames[item.product_id] || `Sản phẩm #${item.product_id}`}
                      </Link>
                      <div className="wishlist-item-price">
                        {Number(item.price_sale) > 0 && Number(item.price_sale) < Number(item.price) ? (
                          <>
                            <span className="sale-price">{formatPrice(item.price_sale)}</span>
                            <span className="original-price">{formatPrice(item.price)}</span>
                          </>
                        ) : (
                          <span className="regular-price">{formatPrice(item.price)}</span>
                        )}
                      </div>
                      <div className="wishlist-item-actions">
                        <button
                          className="remove-button"
                          onClick={() => handleRemoveFromWishlist(item.wishlist_id)}
                        >
                          <img src="/images/icons/trash-2.svg" alt="Xóa" />
                        </button>
                        <button
                          className="add-to-cart-button"
                          onClick={() => handleAddToCart(item.variant_id)}
                        >
                          <img src="/images/icons/shopping-basket.svg" alt="Thêm vào giỏ hàng" />
                        </button>

                      </div>
                    </div>
                  </div>
                )) : (
                  <div className="error-state">
                    <p>Lỗi hiển thị danh sách yêu thích</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>

  );
};

export default WishlistSidebar; 