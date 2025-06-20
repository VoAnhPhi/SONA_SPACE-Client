import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
// Loại bỏ import CSS, sử dụng SCSS chung của dự án
// Các styles sẽ được lấy từ file public/scss/imports/components/_wishListSideBar.scss

// Định nghĩa kiểu dữ liệu cho wishlist item
interface WishlistItem {
  wishlist_id: number;
  status: number;
  created_at: string;
  variant_id: number;
  product_id: number;
  variant_product_price: string;
  variant_product_price_sale: string | null;
  variant_product_list_image: string;
  user_id: number;
  user_name: string;
  user_gmail: string;
  user_address: string;
  product_name?: string; // Thêm trường tên sản phẩm
}

// Định nghĩa kiểu dữ liệu cho product
interface Product {
  product_id: number;
  product_name: string;
  product_description: string;
  product_price: string;
  product_image: string;
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

  // Ngăn chặn scroll khi sidebar hiển thị
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      fetchWishlistItems();
    } else {
      document.body.style.overflow = '';
    }

    // Cleanup khi component unmount
    return () => {
      document.body.style.overflow = '';
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
          const response = await axios.get(`http://localhost:3501/api/products/${productId}`, {
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
      
      // Lấy user_id từ sessionStorage
      const userDataStr = sessionStorage.getItem('user');
      if (!userDataStr) {
        setError('Bạn cần đăng nhập để xem danh sách yêu thích');
        setLoading(false);
        return;
      }
      
      const userData = JSON.parse(userDataStr);
      const userId = userData.id;
      
      // Lấy token từ sessionStorage
      const token = sessionStorage.getItem('authToken');
      if (!token) {
        setError('Phiên đăng nhập đã hết hạn');
        setLoading(false);
        return;
      }
      
      // Gọi API để lấy danh sách wishlist
      const response = await axios.get(`http://localhost:3501/api/wishlists-id/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      // Log dữ liệu trả về để kiểm tra cấu trúc
      console.log('API Response:', response.data);
      
      let items: WishlistItem[] = [];
      
      // Kiểm tra cấu trúc dữ liệu và đảm bảo wishlistItems luôn là một mảng
      if (response.data) {
        if (Array.isArray(response.data)) {
          // Nếu response.data là mảng, sử dụng trực tiếp
          items = response.data;
        } else if (response.data.wishlists && Array.isArray(response.data.wishlists)) {
          // Nếu response.data có thuộc tính wishlists là mảng
          items = response.data.wishlists;
        } else if (typeof response.data === 'object') {
          // Nếu response.data là một đối tượng, tìm thuộc tính là mảng
          const possibleArrays = Object.values(response.data).filter(Array.isArray);
          if (possibleArrays.length > 0) {
            // Sử dụng mảng đầu tiên tìm thấy
            items = possibleArrays[0];
          } else {
            // Nếu không tìm thấy mảng nào, đặt là mảng rỗng
            console.error('Không tìm thấy mảng trong dữ liệu API:', response.data);
            items = [];
          }
        } else {
          // Trường hợp khác, đặt là mảng rỗng
          console.error('Dữ liệu API không phải là mảng hoặc không chứa mảng:', response.data);
          items = [];
        }
      } else {
        // Nếu không có dữ liệu, đặt là mảng rỗng
        items = [];
      }
      
      setWishlistItems(items);
      
      // Lấy danh sách product_id để lấy tên sản phẩm
      if (items.length > 0) {
        const productIds = items.map(item => item.product_id);
        fetchProductNames(productIds);
      }
    } catch (err) {
      console.error('Lỗi khi lấy danh sách yêu thích:', err);
      setError('Không thể lấy danh sách yêu thích. Vui lòng thử lại sau.');
      setWishlistItems([]); // Đảm bảo wishlistItems là mảng rỗng khi có lỗi
    } finally {
      setLoading(false);
    }
  };

  // Xử lý xóa sản phẩm khỏi wishlist
  const handleRemoveFromWishlist = async (wishlistId: number) => {
    try {
      // Lấy token từ sessionStorage
      const token = sessionStorage.getItem('authToken');
      if (!token) {
        setError('Phiên đăng nhập đã hết hạn');
        return;
      }
      
      // Gọi API để xóa sản phẩm khỏi wishlist
      await axios.delete(`http://localhost:3501/api/wishlists/${wishlistId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      // Cập nhật lại danh sách wishlist
      setWishlistItems(wishlistItems.filter(item => item.wishlist_id !== wishlistId));
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
                    <Link to={`/san-pham/${item.product_id}`}>
                      <img src={getFirstImageUrl(item.variant_product_list_image)} alt="Product" />
                    </Link>
                  </div>
                  <div className="wishlist-item-info">
                    <Link to={`/san-pham/${item.product_id}`} className="wishlist-item-name">
                      {item.product_name || productNames[item.product_id] || `Sản phẩm #${item.product_id}`}
                    </Link>
                    <div className="wishlist-item-price">
                      {item.variant_product_price_sale ? (
                        <>
                          <span className="sale-price">{formatPrice(item.variant_product_price_sale)}</span>
                          <span className="original-price">{formatPrice(item.variant_product_price)}</span>
                        </>
                      ) : (
                        <span className="regular-price">{formatPrice(item.variant_product_price)}</span>
                      )}
                    </div>
                    <div className="wishlist-item-actions">
                      <button 
                        className="remove-button"
                        onClick={() => handleRemoveFromWishlist(item.wishlist_id)}
                      >
                        <img src="/images/icons/trash-2.svg" alt="Xóa" />
                      </button>
                      <button className="add-to-cart-button">
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
  );
};

export default WishlistSidebar; 