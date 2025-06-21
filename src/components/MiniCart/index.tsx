import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { Link } from 'react-router-dom';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  color: string;
  image: string;
}

interface MiniCartHandle {
  toggleMiniCart: () => void;
  closeMiniCart: () => void;
  isVisible: boolean;
}

const MiniCart = forwardRef<MiniCartHandle>((_, ref) => {
  const [isVisible, setIsVisible] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Expose methods to parent via ref
  useImperativeHandle(ref, () => ({
    toggleMiniCart: () => setIsVisible(prev => !prev),
    closeMiniCart: () => setIsVisible(false),
    isVisible,
    refreshCart: () => {
      const stored = localStorage.getItem("cart");
      setCartItems(stored ? JSON.parse(stored) : []);
    }
  }));

  // Load cart from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("cart");
    if (stored) {
      try {
        setCartItems(JSON.parse(stored));
      } catch {
        setCartItems([]);
      }
    }
  }, [isVisible]); // Refresh every time MiniCart opens

  // Format VND
  const formatPrice = (price: number) =>
    new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' })
      .format(price)
      .replace('₫', 'đ');

  // Calculate total
  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // Delete item (optional)
  const handleRemoveItem = (id: number) => {
    const updatedCart = cartItems.filter(item => item.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  return (
    <div className={`mini-cart ${isVisible ? 'show' : ''}`}>
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
                      <div className="item-color" style={{ backgroundColor: item.color }}></div>
                    </div>
                    <div className="item-quantity"><span>SL: {item.quantity}</span></div>
                  </div>
                  <div className="item-price">{formatPrice(item.price)}</div>
                </div>
                <button
                  className="remove-item"
                  onClick={() => handleRemoveItem(item.id)}
                  aria-label="Xóa sản phẩm"
                >
                  <img src="/images/icons/close.svg" alt="Xóa" />
                </button>
              </div>
            ))
          ) : (
            <div className="empty-cart">
              <div className="empty-cart-icon">
                <img src="/images/icons/empty-cart.svg" alt="Giỏ hàng trống" />
              </div>
              <p>Giỏ hàng của bạn đang trống</p>
              <Link to="/san-pham" className="btn-browse">Mua sắm ngay</Link>
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
              <Link to="/gio-hang" className="view-cart-btn">Xem giỏ hàng</Link>
              <Link to="/thanh-toan" className="checkout-btn">Thanh toán</Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
});

export default MiniCart;
