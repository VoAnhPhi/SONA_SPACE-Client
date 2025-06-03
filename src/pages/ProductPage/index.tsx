import React, { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import PopularCategory from "../../components/popular-category";
import Filter from "../../components/filter";
import ListProduct12 from "../../components/listProduct12";
import PolicyProduct from "../../components/Policy";
import Getintouch from "../../components/getintouch";

interface ProductProps {
  id: number;
  name: string;
  price: number;
  image: string;
  colors: string[];
  isNew?: boolean;
  isSale?: boolean;
}

const ProductPage: React.FC = () => {
    const [selectedCategory, setSelectedCategory] = useState<string>("Chọn danh mục");
      const [selectedSubCategory, setSelectedSubCategory] = useState<string>("Chọn danh mục");
      const [selectedSpace, setSelectedSpace] = useState<string>("Chọn danh mục");
    
      // Sample product data
      const products: ProductProps[] = [
        {
          id: 1,
          name: "Sofa Modular 2.5 seater với nhièu varian option",
          price: 22150000,
          image: "/images/products/product1.jpg",
          colors: ["#7d5a50", "#a3a380", "#757575"],
        },
        {
          id: 2,
          name: "Sofa Modular 2.5 seater với nhièu varian option",
          price: 22150000,
          image: "/images/products/product1.jpg",
           colors: ["#7d5a50", "#a3a380", "#757575"],
        },
        {
          id: 3,
          name: "Sofa Modular 2.5 seater với nhièu varian option",
          price: 22150000,
           image: "/images/products/product1.jpg",
          colors: ["#D8C1A9", "#555555", "#333333"],
          isNew: true,
        },
        {
          id: 4,
          name: "Sofa Modular 2.5 seater với nhièu varian option",
          price: 22150000,
        image: "/images/products/product1.jpg",
          colors: ["#D8C1A9", "#E5E5E5", "#555555"],
          isSale: true,
        },
        {
          id: 5,
          name: "Sofa Modular 2.5 seater với nhièu varian option",
          price: 22150000,
       image: "/images/products/product1.jpg",
          colors: ["#D8C1A9", "#E5E5E5", "#555555"],
        },
        {
          id: 6,
          name: "Sofa Modular 2.5 seater với nhièu varian option",
          price: 22150000,
             image: "/images/products/product1.jpg",
          colors: ["#4A2932", "#E5E5E5", "#555555"],
        },
        {
          id: 7,
          name: "Sofa Modular 2.5 seater với nhièu varian option",
          price: 22150000,
          image: "/images/products/product1.jpg",
          colors: ["#333333", "#555555", "#777777"],
          isNew: true,
        },
        {
          id: 8,
          name: "Sofa Modular 2.5 seater với nhièu varian option",
          price: 22150000,
          image: "/images/products/product1.jpg",
          colors: ["#D8C1A9", "#E5E5E5", "#555555"],
        },
        {
          id: 9,
          name: "Sofa Modular 2.5 seater với nhièu varian option",
          price: 22150000,
            image: "/images/products/product1.jpg",
          colors: ["#333333", "#555555", "#777777"],
        },
        {
          id: 10,
          name: "Sofa Modular 2.5 seater với nhièu varian option",
          price: 22150000,
          image: "/images/products/product1.jpg",
          colors: ["#D8C1A9", "#E5E5E5", "#555555"],
        },
        {
          id: 11,
          name: "Sofa Modular 2.5 seater với nhièu varian option",
          price: 22150000,
            image: "/images/products/product1.jpg",
          colors: ["#333333", "#555555", "#777777"],
          isNew: true,
        },
        {
          id: 12,
          name: "Sofa Modular 2.5 seater với nhièu varian option",
          price: 22150000,
            image: "/images/products/product1.jpg",
          colors: ["#D8C1A9", "#E5E5E5", "#555555"],
          isSale: true,
        },
      ];
    
      // Format price with commas
      const formatPrice = (price: number): string => {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
      };
  return (
    <>
      <Header />
        {/* Banner Section */}
           <section className="banner-slider">
            <div className="header-banner">
                <img src="images/products/banner-slider.jpg" alt=""/>
            </div>
            <div className="header-text">
                <div className="text1">Chào mừng đến với</div>
                <div className="text2">Bộ sưu tập nội thất của chúng tôi</div>
                <div className="text3">Khám phá nhiều loại đồ nội thất chất lượng cao của chúng tôi.</div>
            </div>
        </section>

        {/* PopularCategory */}
        <PopularCategory />

        {/* Filter Section */}
        <Filter/>
        {/* Product Filter and List */}
        {/* <section className="product-listing">
          <div className="container">
            {/* Filter Row */}
            {/* <div className="filter-row">
              <div className="filter-dropdowns">
                <div className="filter-dropdown">
                  <button className="dropdown-toggle">
                    <span>{selectedCategory}</span>
                    <i className="dropdown-icon"></i>
                  </button>
                </div>
                <div className="filter-dropdown">
                  <button className="dropdown-toggle">
                    <span>{selectedSubCategory}</span>
                    <i className="dropdown-icon"></i>
                  </button>
                </div>
                <div className="filter-dropdown">
                  <button className="dropdown-toggle">
                    <span>{selectedSpace}</span>
                    <i className="dropdown-icon"></i>
                  </button>
                </div>
              </div>
              <div className="filter-view">
                <button className="view-option active">
                  <i className="icon-grid"></i>
                </button>
                <button className="view-option">
                  <i className="icon-list"></i>
                </button>
              </div>
            </div>

            {/* Products Grid */}
         
            {/* <div className="products-grid">
              {products.map((product) => (
                <div key={product.id} className="product-item">
                  <div className="product-image">
                    {product.isNew && <span className="badge new">NEW</span>}
                    {product.isSale && <span className="badge sale">SALE</span>}
                    <img src={product.image} alt={product.name} />
                    <div className="product-actions">
                      <button className="action-btn">
                        <i className="icon-heart"></i>
                      </button>
                      <button className="action-btn">
                        <i className="icon-cart"></i>
                      </button>
                    </div>
                  </div>
                  <div className="product-info">
                    <h3 className="product-name">{product.name}</h3>
                    <div className="product-colors">
                      {product.colors.map((color, index) => (
                        <span
                          key={index}
                          className="color-option"
                          style={{ backgroundColor: color }}
                        ></span>
                      ))}
                    </div>
                    <div className="product-price">
                      <span className="price">{formatPrice(product.price)} ₫</span>
                      <span className="price-label">Giá bán</span>
                    </div>
                  </div>
                </div>
              ))}
            </div> */}

            {/* Pagination */}
            {/* <div className="pagination">
              <span className="pagination-text">Xem thêm sản phẩm</span>
              <div className="pagination-dots">
                <span className="dot active"></span>
                <span className="dot"></span>
                <span className="dot"></span>
              </div>
            </div>
          </div>
        </section> */}
   <ListProduct12/>
        {/* See More Section */}
     <div className="box-seemore">
            <p>Xem thêm sản phẩm</p>
            <i className="fa-solid fa-angles-down"></i>
        </div>
        {/* Policy */}
        <PolicyProduct />
        
        {/* Get in Touch Section */}
        <Getintouch />
        {/* Contact Section */}
        {/* <section className="contact-section">
          <div className="container">
            <div className="contact-grid">
              <div className="contact-info">
                <h2>Get in touch</h2>
                <p>
                  Looking for personalized design solutions? Our dedicated experts
                  are ready to help you create the perfect space. Contact us to
                  discuss your interior design vision.
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
                  <h3>Create your signature style with customization options</h3>
                </div>
                <div className="contact-option">
                  <h3>Convenient online shopping experience</h3>
                </div>
              </div>
            </div>
          </div>
        </section> */}

        {/* Design Blog Section */}
        {/* <section className="design-blog">
          <div className="container">
            <h2 className="section-title">Thiết kế có nhân hóa</h2>
            <div className="blog-grid">
              <div className="blog-item">
                <img src="/images/blog/blog-1.jpg" alt="Cách để chọn đồ nội thất phù hợp" />
                <h3>Cách để chọn đồ nội thất phù hợp</h3>
              </div>
              <div className="blog-item">
                <img src="/images/blog/blog-2.jpg" alt="Tìm hiểu thêm về vật liệu nội thất" />
                <h3>Tìm hiểu thêm về vật liệu nội thất</h3>
              </div>
              <div className="blog-item">
                <img src="/images/blog/blog-3.jpg" alt="Bạn nên chọn gì khi mua sofa?" />
                <h3>Bạn nên chọn gì khi mua sofa?</h3>
              </div>
            </div>
          </div>
        </section> */}
      <Footer />
    </>
  );
};

export default ProductPage;
