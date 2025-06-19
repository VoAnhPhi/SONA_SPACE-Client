import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useAuth } from "../../contexts/AuthContext";
interface OrderSummaryProps {
  subtotal: number;
  shipping: number;
  discount: number;
  discountPercent: number;
  total: number;
}
interface CartItemProps {
  id: number;
  name: string;
  price: number;
  oldPrice?: number;
  image: string;
  color: string;
  quantity: number;
  category: string;
}
const Payment: React.FC = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [cartItems, setCartItems] = useState<CartItemProps[]>([]);
  const [paymentMethod, setPaymentMethod] = useState<string>("card");

  // Order summary state
const [orderSummary, setOrderSummary] = useState<OrderSummaryProps>({
  subtotal: 0,
  shipping: 30000,
  discount: 0,
  discountPercent: 10,
  total: 30000, // subtotal = 0 + shipping = 30000
});

  // Form data
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    address: "",
    cardName: "",
    cardNumber: "",
    cvv: "",
    expiryDate: "",
    promoCode: ""
  });

  // Format price with commas
  const formatPrice = (price: number): string => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle payment method change
  const handlePaymentMethodChange = (method: string) => {
    setPaymentMethod(method);
  };

  // Handle form submission
const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();

  // 1. Tạo mã đơn hàng ngẫu nhiên
  const orderId = "#OD" + Math.floor(100000 + Math.random() * 900000); // 6 chữ số
  
  // 2. Lấy thời gian hiện tại (theo định dạng tiếng Việt)
  const orderDate = new Date().toLocaleString("vi-VN");

  // 3. Tạo dữ liệu đơn hàng
  const orderData = {
    orderId,
    orderDate,
    itemCount: cartItems.length,
    total: orderSummary.total,
    cartItems,
    userInfo: formData,
    paymentMethod,
  };

  try {
    // ✅ Lưu đơn hàng vào localStorage để hiển thị bên OrderComplete
    localStorage.setItem("lastOrder", JSON.stringify(orderData));

    // ✅ Xóa giỏ hàng khỏi localStorage
    localStorage.removeItem("cart");

    // ✅ Điều hướng sang trang hoàn tất đơn hàng
    navigate("/dat-hang-thanh-cong");
  } catch (error) {
    console.error("Lỗi khi xử lý đơn hàng:", error);
    alert("Có lỗi xảy ra khi xử lý đơn hàng.");
  }
};

  // Apply promo code
const applyPromoCode = () => {
  if (formData.promoCode.trim() !== "") {
    const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    const discount = subtotal * (orderSummary.discountPercent / 100);
    const total = subtotal + orderSummary.shipping - discount;

    alert(`Mã giảm giá "${formData.promoCode}" đã được áp dụng!`);

    setOrderSummary({
      ...orderSummary,
      discount,
      total,
    });

    setFormData({
      ...formData,
      promoCode: "",
    });
  }
};

  // useEffect(() => {
  //   if (!isAuthenticated) {
  //     alert("Bạn cần đăng nhập để thanh toán!");
  //     navigate("/dang-nhap"); // hoặc điều hướng sang trang đăng nhập
  //   }
  // }, [isAuthenticated])

useEffect(() => {
  const storedCart = localStorage.getItem("cart");
  if (storedCart) {
    try {
      const parsedCart = JSON.parse(storedCart);
      setCartItems(parsedCart);

      const subtotal = parsedCart.reduce(
        (total: number, item: CartItemProps) => total + item.price * item.quantity,
        0
      );

      const shipping = 30000;
      const discountPercent = 10; // Đồng bộ với CartPage
      const discount = subtotal * (discountPercent / 100);
      const total = subtotal + shipping - discount;

      setOrderSummary({
        subtotal,
        shipping,
        discount,
        discountPercent,
        total,
      });
    } catch (error) {
      console.error("Lỗi khi đọc giỏ hàng từ localStorage:", error);
    }
  }
}, []);

  useEffect(() => {
    if (user && isAuthenticated) {
      setFormData(prev => ({
        ...prev,
        fullName: user.full_name || "",
        email: user.email || "",
        phone: user.phone || "",
        address: user.address || ""
      }));
    }
  }, [user, isAuthenticated]);

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      try {
        setCartItems(JSON.parse(storedCart));
      } catch (error) {
        console.error("Lỗi khi parse giỏ hàng:", error);
        setCartItems([]);
      }
    }
  }, []);

  return (
    <>
      <Header />
      <div className="bill-payment">
        <div className="detail-page-link">
          <div className="container">
            <div className="detail-link">
              <span className="link1">Giỏ hàng | </span>
              <span className="link2">Thanh toán</span>
            </div>
          </div>
        </div>

        <div className="pay-cart">
          <div className="container">
            <h3>Thanh toán</h3>
          </div>
        </div>

        <div className="Pay-billment">
          <div className="container">
            <div className="pay-info">
              <form onSubmit={handleSubmit} className="pay-info-left">
                <div className="info-left-title">
                  <h5>Thông tin giao hàng</h5>
                </div>
                <div className="info-left-form">
                  <div className="form-info">
                    <label htmlFor="fullName" >Họ và tên</label><br />
                    <input type="text"
                      id="fullName"
                      name="fullName"
                      placeholder="Nhập họ và tên"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      required />
                  </div>
                  <div className="form-info">
                    <label htmlFor="phone" >Số điện thoại</label><br />
                    <input type="tel"
                      id="phone"
                      name="phone"
                      placeholder="Nhập số điện thoại"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required />
                  </div>
                  <div className="form-info">
                    <label htmlFor="email">Email</label><br />
                    <input type="email"
                      id="email"
                      name="email"
                      placeholder="Nhập email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required />
                  </div>
                  <div className="form-info">
                    <label htmlFor="address">Địa chỉ</label><br />
                    <input type="text"
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      required placeholder="Nhập địa chỉ" />
                  </div>
                </div>

                <div className="info-left-title-2">
                  <h5>Phương thức thanh toán</h5>
                  <div className={`payment-option ${paymentMethod === 'card' ? 'active' : ''}`}>
                    <label>
                      <input
                        type="radio"
                        name="paymentMethod"
                        checked={paymentMethod === 'card'}
                        onChange={() => handlePaymentMethodChange('card')}
                      />
                      <span className="radio-label">Chuyển khoản qua ngân hàng</span>
                    </label>
                  </div>

                  <div className={`payment-option ${paymentMethod === 'transfer' ? 'active' : ''}`}>
                    <label>
                      <input
                        type="radio"
                        name="paymentMethod"
                        checked={paymentMethod === 'transfer'}
                        onChange={() => handlePaymentMethodChange('transfer')}
                      />
                      <span className="radio-label">Thanh toán khi nhận hàng</span>
                    </label>
                  </div>
                </div>

                {paymentMethod === 'card' && (
                  <>
                    <div className="info-left-form">
                      <div className="form-info">
                        <label >Tên chủ thẻ</label><br />
                        <input type="text"
                          id="cardName"
                          name="cardName"
                          placeholder="Nhập họ và tên"
                          value={formData.cardName}
                          onChange={handleInputChange}
                          required />
                      </div>
                      <div className="form-info">
                        <label >Số thẻ</label><br />
                        <input type="text"
                          id="cardNumber"
                          name="cardNumber"
                          placeholder="Nhập số thẻ"
                          value={formData.cardNumber}
                          onChange={handleInputChange}
                          required />
                      </div>
                      <div className="form-info">
                        <label >Nhập CCV</label><br />
                        <input type="text"
                          id="cvv"
                          name="cvv"
                          placeholder="Nhập CVV"
                          value={formData.cvv}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="form-info">
                        <label >Ngày hết hạn</label><br />
                        <input type="text"
                          id="expiryDate"
                          name="expiryDate"
                          placeholder="Nhập ngày hết hạn"
                          value={formData.expiryDate}
                          onChange={handleInputChange}
                          required />
                      </div>

                    </div>
                    <div className="info-left-clause">
                      <input type="checkbox" id="clause" required />
                      <span>Tôi đồng ý với <a href="#">điều khoản và điều kiện</a> của SONA SPACE</span>
                    </div>
                  </>
                )}
                {paymentMethod === 'transfer' && (
                  <div className="info-left-clause">
                    <input type="checkbox" id="clause" required />
                    <span>Tôi đồng ý với <a href="#">điều khoản và điều kiện</a> của SONA SPACE</span>
                  </div>
                )}


              </form>
              <div className="pay-info-right">
                <div className="info-right-bill">
                  <h4>Đơn hàng</h4>

                  <div className="info-right-bill-sum">
                    <span className="sum1">Tổng giá</span>
                    <span className="sum2">{formatPrice(orderSummary.subtotal)} đ</span>
                  </div>
                  <div className="info-right-bill-shipping">
                    <span className="shipping1">Vận chuyển</span>
                    <span className="shipping2">{formatPrice(orderSummary.shipping)} đ</span>
                  </div>
                  <div className="info-right-bill-discount">
                    <span className="discount1">Thành viên  giảm giá</span>
                    <span className="discount2">-{orderSummary.discountPercent}%</span>
                  </div>
                  <div className="info-right-bill-discount-code">
                    <input
                      type="text"
                      name="promoCode"
                      placeholder="Nhập mã giảm giá"
                      value={formData.promoCode}
                      onChange={handleInputChange}
                      className="discount-code"
                    />
                    <button type="button"
                      className="apply-btn"
                      onClick={applyPromoCode}>Áp dụng</button>
                  </div>
                  <div className="info-right-bill-total">
                    <span className="total1">Tổng cộng</span>
                    <span className="stotal2">{formatPrice(orderSummary.total)} đ</span>
                  </div>
                  <div className="info-right-bill-button">
                    <button type="submit" className="cart-button" onClick={handleSubmit}>
                      Tiến hành thanh toán
                    </button>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Payment;
