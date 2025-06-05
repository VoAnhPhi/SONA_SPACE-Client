import Header from "../../components/Header";
import Footer from "../../components/Footer";
import InteriorDesign from "../../components/InteriorDesign";
import CategorySlider from "../../components/CategorySlider";
import ProductSlider from "../../components/ProductSlider";
import GetInTouch from "../../components/GetInTouch";

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
                      <img src="/images/icons/arrow-right-1.svg" alt="" />
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
                      <img src="/images/icons/arrow-right-1.svg" alt="" />
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
                      <img src="/images/icons/arrow-right-1.svg" alt="" />
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

            <CategorySlider />
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

        {/* Design Tips */}
        <section className="design-tips">
          <div className="container">
            <div className="tips-grid">
              <div className="tips-grid-aside">
                <div className="tip-item">
                  <img src="/images/tip-1.jpg" alt="Thiết kế có nhân hóa" />
                  <div className="content">
                    <h3>Thiết kế cá nhân hóa</h3>
                    <p>Liên hệ ngay để được tư vấn</p>
                  </div>
                </div>
              </div>
              <div className="tips-grid-bside">
                <div className="tip-item">
                  <img src="/images/tip-2.jpg" alt="Mẫu vật liệu" />
                  <h3>Tìm hiểu thêm về các mẫu vật liệu</h3>
                </div>
                <div className="tip-item">
                  <img src="/images/tip-3.jpg" alt="Thư viện" />
                  <h3>Bạn cần liên hệ hỗ trợ</h3>
                </div>
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
