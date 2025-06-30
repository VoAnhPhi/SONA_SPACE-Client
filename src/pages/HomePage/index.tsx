import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import InteriorDesign from "../../components/InteriorDesign";
import GetInTouch from "../../components/GetInTouch";
import CategorySlider from "../../components/CategorySlider";
import type { Product as ProductType } from "../../types";
import ProductComponent from "../../components/Product";
import { getNewestProducts } from "../../api/product";
import { formatProductForDisplay } from "../../services/productService";

// Định nghĩa kiểu dữ liệu phù hợp với component Product


const HomePage = () => {
  const [newestProducts, setNewestProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Lấy danh sách sản phẩm mới nhất khi component mount
  useEffect(() => {
    const fetchNewestProducts = async () => {
      try {
        setLoading(true);
        const products = await getNewestProducts(8); // Lấy 8 sản phẩm mới nhất
        console.log("Fetched newest products:", products);
        
        // Format sản phẩm để phù hợp với component Product
        const formattedProducts = products.map((product, index) => {
          return formatProductForDisplay(product);
        });
        
        // Đảm bảo các id là duy nhất
        const uniqueProducts = formattedProducts.filter((product, index, self) => 
          index === self.findIndex(p => p.id === product.id)
        );
        
        console.log("Formatted products:", uniqueProducts);
        setNewestProducts(uniqueProducts);
        setError(null);
      } catch (error) {
        console.error("Error fetching newest products:", error);
        setError("Không thể tải sản phẩm mới nhất. Vui lòng thử lại sau.");
      } finally {
        setLoading(false);
      }
    };

    fetchNewestProducts();
  }, []);

  // Sản phẩm hot - chọn ngẫu nhiên 4 sản phẩm từ danh sách sản phẩm mới
  const getRandomProducts = (count: number) => {
    if (newestProducts.length <= count) return newestProducts;
    
    // Tạo một mảng các index ngẫu nhiên từ mảng newestProducts
    const shuffledIndices = [...Array(newestProducts.length).keys()]
      .sort(() => 0.5 - Math.random())
      .slice(0, count);
    
    // Lấy các sản phẩm theo index đã chọn
    return shuffledIndices.map(index => newestProducts[index]);
  };

  const hotProducts = getRandomProducts(4);

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
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="currentColor"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M8.64645 2.64645C8.84171 2.45118 9.15829 2.45118 9.35355 2.64645L14.3536 7.64645C14.5488 7.84171 14.5488 8.15829 14.3536 8.35355L9.35355 13.3536C9.15829 13.5488 8.84171 13.5488 8.64645 13.3536C8.45118 13.1583 8.45118 12.8417 8.64645 12.6464L12.7929 8.5H2C1.72386 8.5 1.5 8.27614 1.5 8C1.5 7.72386 1.72386 7.5 2 7.5H12.7929L8.64645 3.35355C8.45118 3.15829 8.45118 2.84171 8.64645 2.64645Z"
                          />
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
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="currentColor"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M8.64645 2.64645C8.84171 2.45118 9.15829 2.45118 9.35355 2.64645L14.3536 7.64645C14.5488 7.84171 14.5488 8.15829 14.3536 8.35355L9.35355 13.3536C9.15829 13.5488 8.84171 13.5488 8.64645 13.3536C8.45118 13.1583 8.45118 12.8417 8.64645 12.6464L12.7929 8.5H2C1.72386 8.5 1.5 8.27614 1.5 8C1.5 7.72386 1.72386 7.5 2 7.5H12.7929L8.64645 3.35355C8.45118 3.15829 8.45118 2.84171 8.64645 2.64645Z"
                          />
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
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="currentColor"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M8.64645 2.64645C8.84171 2.45118 9.15829 2.45118 9.35355 2.64645L14.3536 7.64645C14.5488 7.84171 14.5488 8.15829 14.3536 8.35355L9.35355 13.3536C9.15829 13.5488 8.84171 13.5488 8.64645 13.3536C8.45118 13.1583 8.45118 12.8417 8.64645 12.6464L12.7929 8.5H2C1.72386 8.5 1.5 8.27614 1.5 8C1.5 7.72386 1.72386 7.5 2 7.5H12.7929L8.64645 3.35355C8.45118 3.15829 8.45118 2.84171 8.64645 2.64645Z"
                          />
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
            <CategorySlider/>
          </div>
        </section>

        {/* Featured Products */}
        <section className="featured-products">
          <div className="container">
            <div className="section-box-products">
              <h5>Sản Phẩm Mới</h5>
              {loading && <div className="loading-indicator">Đang tải sản phẩm...</div>}
              {error && <div className="error-message">{error}</div>}
              <div className="box-products-container">
                {newestProducts.map((product) => (
                  <ProductComponent 
                    key={`new-${product.id}`} 
                    product={product}
                    slug={product.slug}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Hot Products */}
        <section className="hot-products">
          <div className="container">
            <div className="section-box-products">
              <h5>Sản Phẩm Hot</h5>
              <div className="box-products-container">
                {hotProducts.map((product, index) => (
                  <ProductComponent 
                    key={`hot-${product.id}-${index}`}
                    product={product}
                      slug={product.slug}
                  />
                ))}
              </div>
            </div>
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
