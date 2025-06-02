import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

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

const CartPage: React.FC = () => {
  // Mock cart items
  const [cartItems, setCartItems] = useState<CartItemProps[]>([
    {
      id: 1,
      name: "Sofa Modena 2.5 seater ofa odena sema seater",
      price: 15190000,
      oldPrice: 25000000,
      image: "/images/products/sofa-gray-1.jpg",
      color: "#999999",
      quantity: 1,
      category: "Sofa"
    },
    {
      id: 2,
      name: "Sofa Modena 2.5 seater ofa odena sema seater",
      price: 15190000,
      oldPrice: 25000000,
      image: "/images/products/sofa-beige-1.jpg",
      color: "#D8C1A9",
      quantity: 1,
      category: "Sofa"
    }
  ]);

  // Cart summary state
  const [cartSummary, setCartSummary] = useState({
    subtotal: 0,
    shipping: 30000,
    discount: 0,
    discountPercent: 10,
    total: 0
  });

  // Format price with commas
  const formatPrice = (price: number): string => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  // Update quantity of an item
  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    setCartItems(cartItems.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    ));
  };

  // Remove item from cart
  const removeItem = (id: number) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  // Calculate cart summary
  useEffect(() => {
    const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    const discount = subtotal * (cartSummary.discountPercent / 100);
    const total = subtotal + cartSummary.shipping - discount;
    
    setCartSummary({
      ...cartSummary,
      subtotal,
      discount,
      total
    });
  }, [cartItems]);

  return (
    <>
      <Header />
      <div className="cart-page">
        {/* Banner Section */}
        <section className="cart-banner">
          <div className="container-fluid">
            <div className="banner-image">
              <img src="/images/banners/cart-banner.jpg" alt="Giỏ hàng - Mua sắm nội thất cao cấp" />
            </div>
          </div>
        </section>

        {/* Breadcrumb */}
        <div className="breadcrumb-container">
          <div className="container">
            <div className="breadcrumb">
              <Link to="/">Trang chủ</Link>
              <span>/</span>
              <span className="active">Giỏ hàng</span>
            </div>
          </div>
        </div>

        {/* Cart Content */}
        <section className="cart-content">
          <div className="container">
            <div className="page-title">
              <h1>Giỏ hàng</h1>
              <p className="items-count">{cartItems.length} sản phẩm</p>
            </div>

            {cartItems.length > 0 ? (
              <div className="cart-grid">
                {/* Cart Items */}
                <div className="cart-items">
                  {cartItems.map((item) => (
                    <div key={item.id} className="cart-item">
                      <div className="item-image">
                        <img src={item.image} alt={item.name} />
                      </div>
                      <div className="item-details">
                        <div className="item-info">
                          <h3 className="item-name">{item.name}</h3>
                          <div className="item-category">{item.category}</div>
                          <div className="item-color">
                            <span className="color-label">Màu:</span>
                            <span 
                              className="color-dot" 
                              style={{ backgroundColor: item.color }}
                            ></span>
                          </div>
                        </div>
                        <div className="item-price">
                          <div className="current-price">{formatPrice(item.price)} đ</div>
                          {item.oldPrice && (
                            <div className="old-price">{formatPrice(item.oldPrice)} đ</div>
                          )}
                        </div>
                        <div className="item-actions">
                          <div className="quantity-selector">
                            <button 
                              className="quantity-btn decrease" 
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              disabled={item.quantity <= 1}
                            >
                              -
                            </button>
                            <input 
                              type="text" 
                              value={item.quantity} 
                              readOnly 
                              className="quantity-input" 
                            />
                            <button 
                              className="quantity-btn increase" 
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            >
                              +
                            </button>
                          </div>
                          <button 
                            className="remove-btn"
                            onClick={() => removeItem(item.id)}
                            aria-label="Xóa sản phẩm khỏi giỏ hàng"
                          >
                            <i className="icon-trash"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Cart Summary */}
                <div className="cart-summary">
                  <div className="summary-title">Đơn hàng</div>
                  <div className="summary-row">
                    <span className="label">Tổng tiền:</span>
                    <span className="value">{formatPrice(cartSummary.subtotal)} đ</span>
                  </div>
                  <div className="summary-row">
                    <span className="label">Vận chuyển:</span>
                    <span className="value">{formatPrice(cartSummary.shipping)} đ</span>
                  </div>
                  <div className="summary-row discount">
                    <span className="label">Thành viên giảm giá:</span>
                    <span className="value">-{cartSummary.discountPercent}%</span>
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
                    <span className="value">{formatPrice(cartSummary.total)} đ</span>
                  </div>
                  <Link to="/thanh-toan" className="checkout-btn">Tiến hành thanh toán</Link>
                </div>
              </div>
            ) : (
              <div className="empty-cart">
                <div className="empty-icon">
                  <i className="icon-cart-empty"></i>
                </div>
                <h2>Giỏ hàng của bạn đang trống</h2>
                <p>Hãy thêm sản phẩm vào giỏ hàng để tiến hành mua sắm.</p>
                <Link to="/san-pham" className="btn-shop-now">Khám phá sản phẩm ngay</Link>
              </div>
            )}
          </div>
        </section>

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

        {/* FAQ Section */}
        <section className="faq-section">
          <div className="container">
            <h2 className="section-title">Get in touch</h2>
            <div className="faq-content">
              <div className="faq-text">
                <p>
                  Looking for Vietnamese Design Furniture? Our dedicated customer service 
                  team is ready to answer any enquiries you may have. Whether it's about our 
                  products, delivery, or customization options, we're here to help.
                </p>
              </div>
              <div className="faq-accordion">
                <div className="accordion-item">
                  <div className="accordion-header">
                    <span>Chat with our Interior Designers</span>
                    <i className="icon-arrow-down"></i>
                  </div>
                </div>
                <div className="accordion-item">
                  <div className="accordion-header">
                    <span>Elevate your space with Vietnamese furniture design</span>
                    <i className="icon-arrow-down"></i>
                  </div>
                </div>
                <div className="accordion-item">
                  <div className="accordion-header">
                    <span>A designer furniture store like no other</span>
                    <i className="icon-arrow-down"></i>
                  </div>
                </div>
                <div className="accordion-item">
                  <div className="accordion-header">
                    <span>Create your signature look with customization options</span>
                    <i className="icon-arrow-down"></i>
                  </div>
                </div>
                <div className="accordion-item">
                  <div className="accordion-header">
                    <span>Convenient online shopping experience</span>
                    <i className="icon-arrow-down"></i>
                  </div>
                </div>
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

export default CartPage;
