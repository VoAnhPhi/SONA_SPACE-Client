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
      <div className="payment-page">
        {/* Breadcrumb */}
        <div className="breadcrumb-container">
          <div className="container">
            <div className="breadcrumb">
              <Link to="/">Trang chủ</Link>
              <span>/</span>
              <Link to="/gio-hang">Giỏ hàng</Link>
              <span>/</span>
              <span className="active">Thanh toán</span>
            </div>
          </div>
        </div>

        {/* Payment Content */}
        <div className="payment-content">
          <div className="container">
            <h1 className="page-title">Thanh toán</h1>
            
            <form onSubmit={handleSubmit} className="payment-form">
              <div className="payment-grid">
                {/* Shipping Information */}
                <div className="shipping-info">
                  <h2 className="section-title">Thông tin giao hàng</h2>
                  
                  <div className="form-group">
                    <label htmlFor="fullName">Họ và tên</label>
                    <input 
                      type="text" 
                      id="fullName" 
                      name="fullName" 
                      placeholder="Nhập họ và tên" 
                      value={formData.fullName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="phone">Số điện thoại</label>
                      <input 
                        type="tel" 
                        id="phone" 
                        name="phone" 
                        placeholder="Nhập số điện thoại" 
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="email">Email</label>
                      <input 
                        type="email" 
                        id="email" 
                        name="email" 
                        placeholder="Nhập email" 
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="address">Địa chỉ</label>
                    <input 
                      type="text" 
                      id="address" 
                      name="address" 
                      placeholder="Nhập email" 
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  {/* Payment Methods */}
                  <div className="payment-methods">
                    <h2 className="section-title">Phương thức thanh toán</h2>
                    
                    <div className="payment-options">
                      <div className={`payment-option ${paymentMethod === 'card' ? 'active' : ''}`}>
                        <label>
                          <input 
                            type="radio" 
                            name="paymentMethod" 
                            checked={paymentMethod === 'card'} 
                            onChange={() => handlePaymentMethodChange('card')} 
                          />
                          <span className="radio-label">Thanh toán thẻ ngân hàng</span>
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
                          <span className="radio-label">Chuyển khoản qua ngân hàng</span>
                        </label>
                      </div>
                    </div>
                    
                    {paymentMethod === 'card' && (
                      <div className="card-details">
                        <div className="form-row">
                          <div className="form-group">
                            <label htmlFor="cardName">Tên chủ thẻ</label>
                            <input 
                              type="text" 
                              id="cardName" 
                              name="cardName" 
                              placeholder="Nhập họ và tên" 
                              value={formData.cardName}
                              onChange={handleInputChange}
                              required
                            />
                          </div>
                          
                          <div className="form-group">
                            <label htmlFor="cardNumber">Số thẻ</label>
                            <input 
                              type="text" 
                              id="cardNumber" 
                              name="cardNumber" 
                              placeholder="Nhập số thẻ" 
                              value={formData.cardNumber}
                              onChange={handleInputChange}
                              required
                            />
                          </div>
                        </div>
                        
                        <div className="form-row">
                          <div className="form-group">
                            <label htmlFor="cvv">CVV</label>
                            <input 
                              type="text" 
                              id="cvv" 
                              name="cvv" 
                              placeholder="Nhập CVV" 
                              value={formData.cvv}
                              onChange={handleInputChange}
                              required
                            />
                          </div>
                          
                          <div className="form-group">
                            <label htmlFor="expiryDate">Ngày hết hạn</label>
                            <input 
                              type="text" 
                              id="expiryDate" 
                              name="expiryDate" 
                              placeholder="Nhập ngày hết hạn" 
                              value={formData.expiryDate}
                              onChange={handleInputChange}
                              required
                            />
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {paymentMethod === 'transfer' && (
                      <div className="transfer-info">
                        <p className="transfer-note">Tôi chấp nhận mọi <span className="text-highlight">điều khoản và điều kiện</span> của SONA SPACE</p>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Order Summary */}
                <div className="order-summary">
                  <h2 className="summary-title">Đơn hàng</h2>
                  
                  <div className="summary-row">
                    <span className="label">Tổng giá</span>
                    <span className="value">{formatPrice(orderSummary.subtotal)} đ</span>
                  </div>
                  
                  <div className="summary-row">
                    <span className="label">Vận chuyển</span>
                    <span className="value">{formatPrice(orderSummary.shipping)} đ</span>
                  </div>
                  
                  <div className="summary-row discount">
                    <span className="label">Thành viên giảm giá</span>
                    <span className="value">-{orderSummary.discountPercent}%</span>
                  </div>
                  
                  <div className="summary-row promo-code">
                    <span className="label">Mã giảm giá:</span>
                    <div className="promo-input">
                      <input 
                        type="text" 
                        name="promoCode"
                        placeholder="Nhập mã giảm giá" 
                        value={formData.promoCode}
                        onChange={handleInputChange}
                      />
                      <button 
                        type="button" 
                        className="apply-btn"
                        onClick={applyPromoCode}
                      >
                        Áp dụng
                      </button>
                    </div>
                  </div>
                  
                  <div className="summary-total">
                    <span className="label">Tổng cộng</span>
                    <span className="value">{formatPrice(orderSummary.total)} đ</span>
                  </div>
                  
                  <button type="submit" className="checkout-btn">Tiến hành thanh toán</button>
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* Features Section */}
        <section className="features-section">
          <div className="container">
            <div className="features-grid">
              <div className="feature-item">
                <div className="feature-icon">
                  <img src="/images/icons/policy-icon.svg" alt="Chính sách & hỗ trợ" />
                </div>
                <h3>Chính sách & hỗ trợ</h3>
                <p>
                  Chúng tôi cung cấp các chính sách hỗ trợ và đổi trả linh hoạt
                  giúp bạn mua sắm an tâm.
                </p>
              </div>
              <div className="feature-item">
                <div className="feature-icon">
                  <img src="/images/icons/shipping-icon.svg" alt="Vận chuyển" />
                </div>
                <h3>Vận chuyển</h3>
                <p>
                  Giao hàng nhanh chóng, đúng hẹn với đội ngũ vận chuyển chuyên
                  nghiệp, nhiệt tình.
                </p>
              </div>
              <div className="feature-item">
                <div className="feature-icon">
                  <img src="/images/icons/support-icon.svg" alt="Hỗ trợ 24/7" />
                </div>
                <h3>Hỗ trợ 24/7</h3>
                <p>
                  Đội ngũ tư vấn viên luôn sẵn sàng giúp đỡ bạn với mọi thắc mắc
                  và yêu cầu.
                </p>
              </div>
              <div className="feature-item">
                <div className="feature-icon">
                  <img src="/images/icons/warranty-icon.svg" alt="Hoàn tiền & Bảo hành" />
                </div>
                <h3>Hoàn tiền & Bảo hành</h3>
                <p>
                  Chúng tôi cam kết chất lượng sản phẩm với chính sách bảo hành
                  dài hạn và uy tín.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Design Blog Section */}
        <section className="design-blog">
          <div className="container">
            <h2 className="section-title">Thiết kế có nhân hóa</h2>
            <div className="blog-grid">
              <div className="blog-item">
                <img src="/images/blog/interior-design-tips-1.jpg" alt="Liên hệ ngay để tư vấn" />
                <h3>Liên hệ ngay để tư vấn</h3>
              </div>
              <div className="blog-item">
                <img src="/images/blog/material-samples-1.jpg" alt="Tìm hiểu thêm về vật liệu nội thất" />
                <h3>Tìm hiểu thêm về vật liệu nội thất</h3>
              </div>
              <div className="blog-item">
                <img src="/images/blog/customer-service-1.jpg" alt="Bạn cần tư vấn gì?" />
                <h3>Bạn cần tư vấn gì?</h3>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default Payment;
