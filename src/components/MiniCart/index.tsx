import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { Link } from 'react-router-dom';
import { loadCartService } from '../../services/cartService';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  color: string;
  image: string;
}
interface MiniCartProps {
  userId?: number;
}
export interface MiniCartHandle {
  toggleMiniCart: () => void;
  closeMiniCart: () => void;
  isVisible: boolean;
  refreshCart: () => void;
}

const MiniCart = forwardRef<MiniCartHandle, MiniCartProps>(({ userId }, ref) => {
  const [isVisible, setIsVisible] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // expose methods to parent
  useImperativeHandle(ref, () => ({
    toggleMiniCart: () => {
      setIsVisible(prev => !prev);
      refreshCart();
    },
    closeMiniCart: () => setIsVisible(false),
    isVisible,
    refreshCart,
  }));
  useEffect(() => {
    if (isVisible) {
      const token = sessionStorage.getItem("authToken");
      if (token) {
        refreshCart();
      } else {
        console.warn("Token chưa tồn tại. Không thể load cart.");
      }
    }
  }, [isVisible]);
  const refreshCart = async () => {
    try {
      const { success, wishlistItems } = await loadCartService();
      if (success && wishlistItems) {
        wishlistItems.forEach((item: any) => {
          console.log("Item status:", item.status);
        });
        const formatted = wishlistItems.map((item: any, index: number) => ({
          id: item.wishlist_id || index,
          name: item.product_name,
          price: item.price,
          quantity: item.quantity,
          color: item.color_hex || '',
          image: item.image?.split(',')[0] || '/images/default.jpg',
        }));
        setCartItems(formatted);
      }
    } catch (error) {
      console.error("Lỗi khi tải MiniCart:", error);
    }
  };


  const formatPrice = (price: number) =>
    new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    })
      .format(price)
      .replace("₫", "đ");

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className={`mini-cart ${isVisible ? "show" : ""}`}>
      <div className="mini-cart-content">
        <div className="mini-cart-header">
          <h3>Giỏ hàng của bạn ({cartItems.length})</h3>
          <button className="close-mini-cart" onClick={() => setIsVisible(false)}>
            <img src="/images/icons/close.svg" alt="Đóng" />
          </button>
        </div>

        <div className="mini-cart-items">
          {cartItems.length > 0 ? (
            cartItems.map(item => (
              <div key={item.id} className="mini-cart-item">
                <div className="item-image">
                  <img src={item.image} alt={item.name} />
                </div>
                <div className="item-info">
                  <h4 className="item-name">{item.name}</h4>
                  <div className="item-details">
                    <div className="item-coloss">
                      <span>Màu:</span>
                      <div
                        className="item-color"
                        style={{ backgroundColor: item.color }}
                      ></div>
                    </div>
                    <div className="item-quantity">
                      <span>SL: {item.quantity}</span>
                    </div>
                  </div>
                  <div className="item-price">{formatPrice(item.price)}</div>
                </div>
              </div>
            ))
          ) : (
            <div className="empty-cart">
              <div className="empty-cart-icon">
                <img src="/images/icons/empty-cart.svg" alt="Giỏ hàng trống" />
              </div>
              <p>Giỏ hàng của bạn đang trống</p>
              <Link to="/san-pham" className="btn-browse">
                Mua sắm ngay
              </Link>
            </div>
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="mini-cart-footer">
            <div className="mini-cart-total">
              <span>Tổng tiền:</span>
              <span className="total-amount">{formatPrice(totalAmount)}</span>
            </div>
            <div className="mini-cart-actions">
              <Link to="/gio-hang" className="view-cart-btn">
                Xem giỏ hàng
              </Link>
              <Link to="/thanh-toan" className="checkout-btn">
                Thanh toán
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
});

export default MiniCart;
