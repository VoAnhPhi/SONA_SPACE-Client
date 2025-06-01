import React from 'react'
import './HomePage.scss'

const HomePage: React.FC = () => {
  return (
    <div className="homepage">
      {/* Header/Navigation */}
      <header className="header">
        <div className="container">
          <div className="header-wrapper">
            <div className="logo">
              <a href="/">
                <img src="/images/logo.png" alt="SONA Space" />
              </a>
            </div>
            <nav className="main-nav">
              <ul>
                <li><a href="/" className="active">Trang Chủ</a></li>
                <li><a href="/san-pham">Sản Phẩm</a></li>
                <li><a href="/khong-gian">Không Gian</a></li>
                <li><a href="/blog">Blog</a></li>
                <li><a href="/ve-chung-toi">Về Chúng Tôi</a></li>
              </ul>
            </nav>
            <div className="header-actions">
              <button className="btn-icon search-btn">
                <i className="icon-search"></i>
              </button>
              <button className="btn-icon wishlist-btn">
                <i className="icon-heart"></i>
              </button>
              <button className="btn-icon cart-btn">
                <i className="icon-cart"></i>
              </button>
              <a href="/dang-nhap" className="btn btn-outline">Đăng Nhập</a>
              <a href="/dang-ky" className="btn btn-primary">Đăng Ký</a>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Banner */}
      <section className="hero-banner">
        <div className="container-fluid">
          <div className="banner-image">
            <img src="/images/hero-banner.png" alt="SONA Space Interior" />
          </div>
        </div>
      </section>

      {/* Product Recommendations */}
      <section className="product-recommendations">
        <div className="container">
          <h2 className="section-title">Sản Phẩm Được Đề Xuất Cho Bạn</h2>
          <p className="section-description">
            Chúng tôi đã tuyển chọn một số sản phẩm mà bạn có thể sẽ quan tâm dựa trên lịch sử tìm kiếm của bạn.
            Hãy khám phá các mẫu nội thất và đồ trang trí mới nhất của chúng tôi.
          </p>

          <div className="recommendation-grid">
            <div className="grid-item large">
              <div className="product-card">
                <img src="/images/living-room.jpg" alt="Phòng Khách" />
                <div className="card-content">
                  <h3>Nội Thất Cho Phòng Khách</h3>
                  <a href="/phong-khach" className="btn btn-outline">Xem Sản Phẩm</a>
                </div>
              </div>
            </div>
            <div className="grid-item">
              <div className="product-card">
                <img src="/images/bedroom.jpg" alt="Phòng Ngủ" />
                <div className="card-content">
                  <h3>Nội Thất Cho Phòng Ngủ</h3>
                  <a href="/phong-ngu" className="btn btn-outline">Xem Sản Phẩm</a>
                </div>
              </div>
            </div>
            <div className="grid-item">
              <div className="product-card">
                <img src="/images/dining-room.jpg" alt="Phòng Ăn" />
                <div className="card-content">
                  <h3>Nội Thất Cho Phòng Ăn</h3>
                  <a href="/phong-an" className="btn btn-outline">Xem Sản Phẩm</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Categories */}
      <section className="product-categories">
        <div className="container">
          <h2 className="section-title">Danh Mục Sản Phẩm</h2>
          
          <div className="category-slider">
            <div className="category-item">
              <img src="/images/category-1.jpg" alt="Limited Edition" />
              <h3>Limited Edition</h3>
            </div>
            <div className="category-item">
              <img src="/images/category-2.jpg" alt="Sofa" />
              <h3>Sofa</h3>
            </div>
            <div className="category-item">
              <img src="/images/category-3.jpg" alt="Ghế" />
              <h3>Ghế</h3>
            </div>
            <div className="category-item">
              <img src="/images/category-4.jpg" alt="Bàn" />
              <h3>Bàn</h3>
            </div>
            <div className="category-item">
              <img src="/images/category-5.jpg" alt="Tủ" />
              <h3>Tủ</h3>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="featured-products">
        <div className="container">
          <h2 className="section-title">Sản Phẩm Mới</h2>
          
          <div className="products-grid">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="product-item">
                <div className="product-image">
                  <img src={`/images/product-${item}.jpg`} alt={`Product ${item}`} />
                </div>
                <div className="product-info">
                  <h3 className="product-name">Ghế Wooden 2.0 nordic với nhiên liệu tương tự</h3>
                  <div className="product-colors">
                    <span className="color-option brown"></span>
                    <span className="color-option beige"></span>
                    <span className="color-option gray"></span>
                  </div>
                  <div className="product-price">
                    <span className="price">15.190.000 ₫</span>
                    <span className="price-tag">Giá bán</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hot Products */}
      <section className="hot-products">
        <div className="container">
          <h2 className="section-title">Sản Phẩm Hot</h2>
          
          <div className="products-grid">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="product-item">
                <div className="product-image">
                  <img src={`/images/hot-product-${item}.jpg`} alt={`Hot Product ${item}`} />
                </div>
                <div className="product-info">
                  <h3 className="product-name">Ghế Wooden 2.0 nordic với nhiên liệu tương tự</h3>
                  <div className="product-colors">
                    <span className="color-option brown"></span>
                    <span className="color-option beige"></span>
                    <span className="color-option gray"></span>
                  </div>
                  <div className="product-price">
                    <span className="price">15.190.000 ₫</span>
                    <span className="price-tag">Giá bán</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interior Design Section */}
      <section className="interior-design">
        <div className="container">
          <h2 className="section-title">Nội Thất Theo Yêu Cầu</h2>
          <p className="section-description">Khám phá dịch vụ thiết kế nội thất cao cấp của chúng tôi</p>
          
          <div className="design-grid">
            <div className="design-item">
              <div className="design-image">
                <img src="/images/interior-1.jpg" alt="Nội Thất Theo Yêu Cầu" />
              </div>
              <div className="design-content">
                <h3>Nội Thất Theo Yêu Cầu</h3>
                <p>
                  Với hơn 10 năm kinh nghiệm thiết kế nội thất, Tại SONA SPACE, chúng tôi tự hào mang đến những giải pháp thiết kế nội thất thông minh, hiện đại và đẳng cấp.
                </p>
                <a href="/dich-vu" className="btn btn-primary">Liên Hệ Ngay</a>
              </div>
            </div>
            <div className="design-item">
              <div className="design-image">
                <img src="/images/interior-2.jpg" alt="Tư Vấn Không Gian Sống" />
              </div>
              <div className="design-content">
                <h3>Tư Vấn Không Gian Sống</h3>
                <p>
                  Không chỉ là cung cấp nội thất, chúng tôi còn giúp bạn thiết kế một không gian sống hoàn hảo, phù hợp với phong cách và nhu cầu của bạn.
                </p>
                <a href="/tu-van" className="btn btn-primary">Liên Hệ Ngay</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact-section">
        <div className="container">
          <h2 className="section-title">Get in touch</h2>
          
          <div className="contact-grid">
            <div className="contact-info">
              <p>
                Looking for personalized design solutions? Our dedicated experts are ready to help you create the perfect space. Contact us to discuss your interior design vision.
              </p>
              <p>
                We provide full-service residential, commercial, and interior design. Let's create to impress.
              </p>
            </div>
            <div className="contact-options">
              <div className="contact-option">
                <h3>Chat with our Interior Designers</h3>
              </div>
              <div className="contact-option">
                <h3>Discover our space with immersive furniture design</h3>
              </div>
              <div className="contact-option">
                <h3>A designer furniture store like no other</h3>
              </div>
              <div className="contact-option">
                <h3>Create your signature style with customization options</h3>
              </div>
              <div className="contact-option">
                <h3>Convenient online shopping experience</h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Design Tips */}
      <section className="design-tips">
        <div className="container">
          <div className="tips-grid">
            <div className="tip-item">
              <img src="/images/tip-1.jpg" alt="Thiết kế có nhân hóa" />
              <h3>Thiết kế có nhân hóa</h3>
              <p>Làm thế nào để làm điều đó</p>
            </div>
            <div className="tip-item">
              <img src="/images/tip-2.jpg" alt="Mẫu vật liệu" />
              <h3>Mẫu vật liệu</h3>
            </div>
            <div className="tip-item">
              <img src="/images/tip-3.jpg" alt="Thư viện" />
              <h3>Thư viện</h3>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-column">
              <h3>Dịch vụ khách hàng</h3>
              <ul>
                <li><a href="/lien-he">Liên hệ</a></li>
                <li><a href="/tra-cuu-don-hang">Tra cứu đơn hàng</a></li>
                <li><a href="/chinh-sach-van-chuyen">Chính sách vận chuyển</a></li>
                <li><a href="/chinh-sach-doi-tra">Chính sách đổi trả</a></li>
              </ul>
            </div>
            <div className="footer-column">
              <h3>Thông tin</h3>
              <ul>
                <li><a href="/ve-chung-toi">Về chúng tôi</a></li>
                <li><a href="/blog">Blog</a></li>
                <li><a href="/cua-hang">Cửa hàng</a></li>
              </ul>
            </div>
            <div className="footer-column">
              <h3>Liên hệ với chúng tôi</h3>
              <ul>
                <li><a href="tel:+84123456789">+84 123 456 789</a></li>
                <li><a href="mailto:info@sonaspace.com">info@sonaspace.com</a></li>
                <li><p>123 Đường ABC, Quận XYZ, TP.HCM</p></li>
              </ul>
            </div>
            <div className="footer-column">
              <h3>Theo dõi chúng tôi</h3>
              <div className="social-icons">
                <a href="#" className="social-icon facebook"></a>
                <a href="#" className="social-icon instagram"></a>
                <a href="#" className="social-icon youtube"></a>
                <a href="#" className="social-icon tiktok"></a>
              </div>
            </div>
            <div className="footer-column">
              <h3>Xem thêm ưu đãi</h3>
              <a href="/dang-ky" className="btn btn-primary">Đăng ký ngay</a>
            </div>
          </div>
          
          <div className="footer-bottom">
            <p>Tất cả giá đều là giá bán lẻ đề xuất bằng Việt Nam Đồng (₫) và đã bao gồm VAT.</p>
            <p>Thông tin cookie</p>
            <p>Chính sách bảo mật</p>
            <div className="payment-icons">
              <img src="/images/payment-icons.png" alt="Payment methods" />
            </div>
            <div className="language">
              <p>Translate</p>
              <div className="language-icons">
                <img src="/images/language-icons.png" alt="Language icons" />
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default HomePage
