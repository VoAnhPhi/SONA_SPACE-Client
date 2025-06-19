import React, { useState, forwardRef, useImperativeHandle } from 'react';
import { Link } from 'react-router-dom';

// Interface cho thông tin sản phẩm trong giỏ hàng
interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  color: string;
  image: string;
}

// Định nghĩa các hàm và thuộc tính mà component cha có thể truy cập
interface MiniCartHandle {
  toggleMiniCart: () => void;
  closeMiniCart: () => void;
  isVisible: boolean;
}

const MiniCart = forwardRef<MiniCartHandle, {}>((props, ref) => {
  // State quản lý việc hiển thị MiniCart khi click trên mobile
  const [isVisible, setIsVisible] = useState(false);

  // Cung cấp các hàm cho component cha thông qua ref
  useImperativeHandle(ref, () => ({
    toggleMiniCart: () => {
      setIsVisible(prev => !prev);
    },
    closeMiniCart: () => {
      setIsVisible(false);
    },
    isVisible
  }));

  // Mock data - sau này sẽ được lấy từ context hoặc redux store
  const cartItems: CartItem[] = [
    {
      id: '1',
      name: 'Ghế sofa phòng khách Sona Dolce',
      price: 12500000,
      quantity: 1,
      color: 'Xám',
      image: '/images/products/sofa-1.jpg'
    },
    {
      id: '2',
      name: 'Bàn trà Sona Elegance',
      price: 4800000,
      quantity: 1,
      color: 'Nâu gỗ',
      image: '/images/products/table-1.jpg'
    }
  ];

  // Tính tổng tiền
  const totalAmount = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  // Format số tiền VND
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' })
      .format(price)
      .replace('₫', 'đ');
  };

  // Đóng MiniCart
  const handleClose = () => {
    setIsVisible(false);
  };

  return (
    <div className={`mini-cart ${isVisible ? 'show' : ''}`}>
      <div className="mini-cart-content">
        <div className="mini-cart-header">
          <h3>Giỏ hàng của bạn ({cartItems.length})</h3>
          <button className="close-mini-cart" onClick={handleClose}>
            <img src="/images/icons/close.svg" alt="Đóng" />
          </button>
        </div>
        
        <div className="mini-cart-items">
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <div key={item.id} className="mini-cart-item">
                <div className="item-image">
                  <img src={item.image} alt={item.name} />
                </div>
                <div className="item-info">
                  <h4 className="item-name">{item.name}</h4>
                  <div className="item-details">
                    <div className="item-color">
                      <span>Màu:</span> {item.color}
                    </div>
                    <div className="item-quantity">
                      <span>SL:</span> {item.quantity}
                    </div>
                  </div>
                  <div className="item-price">
                    {formatPrice(item.price)}
                  </div>
                </div>
                <button className="remove-item" aria-label="Xóa sản phẩm">
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
