import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useAuth } from "../../contexts/AuthContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
interface OrderSummaryProps {
  subtotal: number;
  shipping: number;
  discount: number;
  // discountPercent: number;
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
  const [agreeToTerms, setAgreeToTerms] = useState<boolean>(false);
  const [cartItems, setCartItems] = useState<CartItemProps[]>([]);
  const [paymentMethod, setPaymentMethod] = useState<string>("transfer");

  // Order summary state
  const [orderSummary, setOrderSummary] = useState<OrderSummaryProps>({
    subtotal: 0,
    shipping: 30000,
    discount: 0,
    // discountPercent: 10,
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

    if (!agreeToTerms) {
      alert("Vui lòng đồng ý với điều khoản và điều kiện trước khi thanh toán.");
      return;
    }

    const orderId = "SN" + Math.floor(100000 + Math.random() * 900000);
    const orderDate = new Date().toLocaleString("vi-VN");

    const orderData = {
      orderId,
      orderDate,
      status: "Đang xử lý",         // hoặc giá trị mặc định
      statusStep: 1,
      itemCount: cartItems.length,
      recipientName: formData.fullName,
      recipientPhone: formData.phone,
      address: formData.address,
      subtotal: orderSummary.subtotal,
      shippingFee: orderSummary.shipping,
      discount: orderSummary.discount,
      total: orderSummary.total,
      products: cartItems // 👈 sử dụng key này để đồng bộ với DetailOrder
    };

    try {
      localStorage.setItem("lastOrder", JSON.stringify(orderData));
      localStorage.removeItem("cart");

      toast.success("🎉 Thanh toán thành công! Đang chuyển hướng...", {
        position: "top-right",
        autoClose: 2000,
      });

      setTimeout(() => {
        navigate("/dat-hang-thanh-cong");
      }, 2000);
    } catch (error) {
      console.error("Lỗi khi xử lý đơn hàng:", error);
      toast.error("❌ Có lỗi xảy ra.");
    }
  };
  // Apply promo code
  const applyPromoCode = () => {
    if (formData.promoCode.trim() !== "") {
      const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
      const discount = 0;
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
        // const discountPercent = 10; // Đồng bộ với CartPage
        const discount = 0;
        const total = subtotal + shipping - discount;

        setOrderSummary({
          subtotal,
          shipping,
          discount,
          // discountPercent,
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


                </div>
                {paymentMethod === 'transfer' && (
                  <div className="info-left-clause">
                    <input type="checkbox" id="clause" checked={agreeToTerms} onChange={(e) => setAgreeToTerms(e.target.checked)} required />
                    <span>Tôi đồng ý với <Link to={`/dieu-khoan-su-dung`}>điều khoản và điều kiện</Link> của SONA SPACE</span>
                  </div>
                )}
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
                      <input type="checkbox" id="clause" checked={agreeToTerms} onChange={(e) => setAgreeToTerms(e.target.checked)} required />
                      <span>Tôi đồng ý với <Link to={`/dieu-khoan-su-dung`}>điều khoản và điều kiện</Link> của SONA SPACE</span>
                    </div>
                  </>
                )}



              </form>
              <div className="cart-summary">
                <div className="summary-title">Đơn hàng</div>
                <div className="summary-row">
                  <span className="label">Tổng tiền:</span>
                  <span className="value">
                    {formatPrice(orderSummary.subtotal)} đ
                  </span>
                </div>
                <div className="summary-row">
                  <span className="label">Vận chuyển:</span>
                  <span className="value">
                    {formatPrice(orderSummary.shipping)} đ
                  </span>
                </div>
                <div className="summary-row promo-code">
                  <span className="label">Mã giảm giá:</span>
                  <div className="promo-input">
                    <input type="text" placeholder="Nhập mã giảm giá" />
                    <button className="apply-btn">Áp dụng</button>
                  </div>
                </div>
                <div className="summary-total">
                  <span className="label">Tổng cộng</span>
                  <span className="value">
                    {formatPrice(orderSummary.total)} đ
                  </span>
                </div>
                <div className="checkout-btn" onClick={handleSubmit}>
                  Tiến hành thanh toán
                </div>
              </div>

              {/* <div className="pay-info-right">
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
              </div> */}
            </div>

          </div>
        </div>
      </div>

      <Footer />
      <ToastContainer position="top-right"
        autoClose={3000}
        style={{ marginTop: "100px" }} />
    </>
  );
};

export default Payment;
