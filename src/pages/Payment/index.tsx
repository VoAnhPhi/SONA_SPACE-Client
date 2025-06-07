import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

interface OrderSummaryProps {
  subtotal: number;
  shipping: number;
  discount: number;
  discountPercent: number;
  total: number;
}

const Payment: React.FC = () => {
  const navigate = useNavigate();

  // Payment methods
  const [paymentMethod, setPaymentMethod] = useState<string>("card");

  // Order summary state
  const [orderSummary, setOrderSummary] = useState<OrderSummaryProps>({
    subtotal: 500000,
    shipping: 30000,
    discount: 50000,
    discountPercent: 10,
    total: 480000
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
    // Process payment logic would go here
    console.log("Processing payment with data:", { formData, paymentMethod, orderSummary });

    // Redirect to order complete page
    navigate("/dat-hang-thanh-cong");
  };

  // Apply promo code
  const applyPromoCode = () => {
    if (formData.promoCode) {
      // Mock promo code logic
      alert(`Mã giảm giá "${formData.promoCode}" đã được áp dụng!`);
      // Update order summary
      const newDiscount = orderSummary.subtotal * 0.1; // Example: 10% discount
      setOrderSummary({
        ...orderSummary,
        discount: newDiscount,
        total: orderSummary.subtotal + orderSummary.shipping - newDiscount
      });
      // Clear promo code field
      setFormData({
        ...formData,
        promoCode: ""
      });
    }
  };

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
                    <span className="discount1">Thêm mã giảm giá</span>
                    <span className="discount2">-{orderSummary.discountPercent}%</span>
                  </div>
                  <div className="info-right-bill-discount-code">
                    <input type="text"
                      name="promoCode"
                      placeholder="Nhập mã giảm giá"
                      value={formData.promoCode}
                      onChange={handleInputChange}
                      className="discount-code" />
                    <button type="button"
                      className="apply-btn"
                      onClick={applyPromoCode}>Áp dụng</button>
                  </div>
                  <div className="info-right-bill-total">
                    <span className="total1">Tổng cộng</span>
                    <span className="stotal2">{formatPrice(orderSummary.total)} đ</span>
                  </div>
                  <div className="info-right-bill-button">
                    <Link to={``}><button type="submit" className="cart-button">Tiến hành thanh toán</button></Link>
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
