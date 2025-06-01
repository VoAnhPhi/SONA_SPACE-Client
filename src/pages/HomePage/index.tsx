import React from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const HomePage: React.FC = () => {
  return (
    <>
      <Header />
      <div className="homepage">
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
              Chúng tôi đã tuyển chọn một số sản phẩm mà bạn có thể sẽ quan tâm
              dựa trên lịch sử tìm kiếm của bạn. Hãy khám phá các mẫu nội thất
              và đồ trang trí mới nhất của chúng tôi.
            </p>

            <div className="recommendation-grid">
              <div className="grid-item large">
                <div className="product-card">
                  <img src="/images/living-room.jpg" alt="Phòng Khách" />
                  <div className="card-content">
                    <h3>Nội Thất Cho Phòng Khách</h3>
                    <a href="/phong-khach" className="btn btn-outline">
                      Xem Sản Phẩm
                    </a>
                  </div>
                </div>
              </div>
              <div className="grid-item">
                <div className="product-card">
                  <img src="/images/bedroom.jpg" alt="Phòng Ngủ" />
                  <div className="card-content">
                    <h3>Nội Thất Cho Phòng Ngủ</h3>
                    <a href="/phong-ngu" className="btn btn-outline">
                      Xem Sản Phẩm
                    </a>
                  </div>
                </div>
              </div>
              <div className="grid-item">
                <div className="product-card">
                  <img src="/images/dining-room.jpg" alt="Phòng Ăn" />
                  <div className="card-content">
                    <h3>Nội Thất Cho Phòng Ăn</h3>
                    <a href="/phong-an" className="btn btn-outline">
                      Xem Sản Phẩm
                    </a>
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
                    <img
                      src={`/images/product-${item}.jpg`}
                      alt={`Product ${item}`}
                    />
                  </div>
                  <div className="product-info">
                    <h3 className="product-name">
                      Ghế Wooden 2.0 nordic với nhiên liệu tương tự
                    </h3>
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
                    <img
                      src={`/images/hot-product-${item}.jpg`}
                      alt={`Hot Product ${item}`}
                    />
                  </div>
                  <div className="product-info">
                    <h3 className="product-name">
                      Ghế Wooden 2.0 nordic với nhiên liệu tương tự
                    </h3>
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
            <p className="section-description">
              Khám phá dịch vụ thiết kế nội thất cao cấp của chúng tôi
            </p>

            <div className="design-grid">
              <div className="design-item">
                <div className="design-image">
                  <img
                    src="/images/interior-1.jpg"
                    alt="Nội Thất Theo Yêu Cầu"
                  />
                </div>
                <div className="design-content">
                  <h3>Nội Thất Theo Yêu Cầu</h3>
                  <p>
                    Với hơn 10 năm kinh nghiệm thiết kế nội thất, Tại SONA
                    SPACE, chúng tôi tự hào mang đến những giải pháp thiết kế
                    nội thất thông minh, hiện đại và đẳng cấp.
                  </p>
                  <a href="/dich-vu" className="btn btn-primary">
                    Liên Hệ Ngay
                  </a>
                </div>
              </div>
              <div className="design-item">
                <div className="design-image">
                  <img
                    src="/images/interior-2.jpg"
                    alt="Tư Vấn Không Gian Sống"
                  />
                </div>
                <div className="design-content">
                  <h3>Tư Vấn Không Gian Sống</h3>
                  <p>
                    Không chỉ là cung cấp nội thất, chúng tôi còn giúp bạn thiết
                    kế một không gian sống hoàn hảo, phù hợp với phong cách và
                    nhu cầu của bạn.
                  </p>
                  <a href="/tu-van" className="btn btn-primary">
                    Liên Hệ Ngay
                  </a>
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
                  Looking for personalized design solutions? Our dedicated
                  experts are ready to help you create the perfect space.
                  Contact us to discuss your interior design vision.
                </p>
                <p>
                  We provide full-service residential, commercial, and interior
                  design. Let's create to impress.
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
                  <h3>
                    Create your signature style with customization options
                  </h3>
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
      </div>
      <Footer />
    </>
  );
};

export default HomePage;
