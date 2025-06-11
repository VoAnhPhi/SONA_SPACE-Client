import React from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import InteriorDesign from "../../components/InteriorDesign";
import ProductSlider from "../../components/ProductSlider";
import GetInTouch from "../../components/GetInTouch";
import CategorySlider from "../../components/CategorySlider";

const HomePage = () => {
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
              Khám phá sản phẩm được yêu thích và đánh giá cao nhất bởi khách
              hàng của chúng tôi.
              <br />
              Với thiết kế tinh tế, chất liệu cao cấp và sự thoải mái trong sử
              dụng — đây là lựa chọn hoàn hảo để nâng tầm không gian sống của
              bạn
            </p>

            <div className="recommendation-grid">
              <div className="grid-item large">
                <div className="product-card">
                  <img src="/images/living-room.jpg" alt="Phòng Khách" />
                  <div className="card-content">
                    <h3>Nội Thất Cho Phòng Khách</h3>
                    <a href="/phong-khach" className="btn btn-outline">
                      Xem Sản Phẩm{" "}
                      <i>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                          <path fill-rule="evenodd" clip-rule="evenodd" d="M8.64645 2.64645C8.84171 2.45118 9.15829 2.45118 9.35355 2.64645L14.3536 7.64645C14.5488 7.84171 14.5488 8.15829 14.3536 8.35355L9.35355 13.3536C9.15829 13.5488 8.84171 13.5488 8.64645 13.3536C8.45118 13.1583 8.45118 12.8417 8.64645 12.6464L12.7929 8.5H2C1.72386 8.5 1.5 8.27614 1.5 8C1.5 7.72386 1.72386 7.5 2 7.5H12.7929L8.64645 3.35355C8.45118 3.15829 8.45118 2.84171 8.64645 2.64645Z" />
                        </svg>
                      </i>
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
                      Xem Sản Phẩm{" "}
                      <i>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                          <path fill-rule="evenodd" clip-rule="evenodd" d="M8.64645 2.64645C8.84171 2.45118 9.15829 2.45118 9.35355 2.64645L14.3536 7.64645C14.5488 7.84171 14.5488 8.15829 14.3536 8.35355L9.35355 13.3536C9.15829 13.5488 8.84171 13.5488 8.64645 13.3536C8.45118 13.1583 8.45118 12.8417 8.64645 12.6464L12.7929 8.5H2C1.72386 8.5 1.5 8.27614 1.5 8C1.5 7.72386 1.72386 7.5 2 7.5H12.7929L8.64645 3.35355C8.45118 3.15829 8.45118 2.84171 8.64645 2.64645Z" />
                        </svg>
                      </i>
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
                      Xem Sản Phẩm{" "}
                      <i>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                          <path fill-rule="evenodd" clip-rule="evenodd" d="M8.64645 2.64645C8.84171 2.45118 9.15829 2.45118 9.35355 2.64645L14.3536 7.64645C14.5488 7.84171 14.5488 8.15829 14.3536 8.35355L9.35355 13.3536C9.15829 13.5488 8.84171 13.5488 8.64645 13.3536C8.45118 13.1583 8.45118 12.8417 8.64645 12.6464L12.7929 8.5H2C1.72386 8.5 1.5 8.27614 1.5 8C1.5 7.72386 1.72386 7.5 2 7.5H12.7929L8.64645 3.35355C8.45118 3.15829 8.45118 2.84171 8.64645 2.64645Z" />
                        </svg>
                      </i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* All Categories - Hiển thị tất cả danh mục */}
        <section className="all-categories-section">
          <div className="container">
            <h2 className="section-title">Tất cả danh mục sản phẩm</h2>
            {/* <CategoryList showProductCount={true} /> */}
            <CategorySlider showProductCount={true} />
          </div>
        </section>

        {/* Featured Products */}
        <section className="featured-products">
          <div className="container">
            <h2 className="section-title">Sản Phẩm Mới</h2>
            <ProductSlider />
          </div>
        </section>

        {/* Hot Products */}
        <section className="hot-products">
          <div className="container">
            <h2 className="section-title">Sản Phẩm Hot</h2>
            <ProductSlider />
          </div>
        </section>

        {/* Interior Design */}
        <InteriorDesign />

        {/* Contact Section */}
        <GetInTouch />
      </div>
      <Footer />
    </>
  );
};

export default HomePage;
