import React, { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ListProduct from "../../components/listProduct";
import Filter from "../../components/filter";

interface ProductProps {
  id: number;
  name: string;
  price: number;
  image: string;
  colors: string[];
  isNew?: boolean;
  isSale?: boolean;
  createdAt?: string;
  priceSale?: number;
  slug: string;
}

interface CategoryProps {
  id: number;
  name: string;
  image: string;
  slug: string;
  category: string;

}

const ProductOfCategory: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<string>("Chọn danh mục");
  const [selectedSort, setSelectedSort] = useState<string>("Chọn danh mục");
  const [selectedSpace, setSelectedSpace] = useState<string>("Chọn danh mục");

  // Sample categories for the bottom section
  const categories: CategoryProps[] = [
    {
      id: 1,
      name: "Latest Edition",
      image: "/images/categories/latest-edition.jpg",
      slug: "latest-edition",
      category: "Latest Edition"
    },
    {
      id: 2,
      name: "Sofas",
      image: "/images/categories/sofas.jpg",
      slug: "sofas",
      category: "Sofas"
    },
    {
      id: 3,
      name: "Ghế",
      image: "/images/categories/ghe.jpg",
      slug: "ghe",
      category: "Ghế"
    },
    {
      id: 4,
      name: "Bàn",
      image: "/images/categories/ban.jpg",
      slug: "ban",
      category: "Bàn"
    },
    {
      id: 5,
      name: "Tủ",
      image: "/images/categories/tu.jpg",
      slug: "tu",
      category: "Tủ"
    }
  ];

 // Sample product data
  const products: ProductProps[] = [
    {
      id: 1,
      name: "Sofa Modular 2.5 seater với nhièu varian option",
      price: 22150000,
      image: "/images/products/product1.jpg",
      colors: ["#7d5a50", "#a3a380", "#757575"],
      createdAt: ("2025-06-02"),
      priceSale: 20000000,
      slug: 'Sofa-Modular-2.5-seater-với-nhièu-varian-option'
    },
    {
      id: 2,
      name: "Sofa Modular 2.5 seater với nhièu varian option",
      price: 22150000,
      image: "/images/products/product1.jpg",
      colors: ["#7d5a50", "#a3a380", "#757575"],
      createdAt: ("2025-05-01"),
      priceSale: 20000000,
      slug: 'Sofa-Modular-2.5-seater-với-nhièu-varian-option'
    },
    {
      id: 3,
      name: "Sofa Modular 2.5 seater với nhièu varian option",
      price: 22150000,
      image: "/images/products/product1.jpg",
      colors: ["#D8C1A9", "#555555", "#333333"],
      isNew: true,
      createdAt: ("2025-02-01"),
      priceSale: 22000000,
      slug: 'Sofa-Modular-2.5-seater-với-nhièu-varian-option'
    },
    {
      id: 4,
      name: "Sofa Modular 2.5 seater với nhièu varian option",
      price: 22150000,
      image: "/images/products/product1.jpg",
      colors: ["#D8C1A9", "#E5E5E5", "#555555"],
      isSale: true,
      createdAt: ("2025-06-04"),
      priceSale: 21000000,
      slug: 'Sofa-Modular-2.5-seater-với-nhièu-varian-option'
    },
    {
      id: 5,
      name: "Sofa Modular 2.5 seater với nhièu varian option",
      price: 22150000,
      image: "/images/products/product1.jpg",
      colors: ["#D8C1A9", "#E5E5E5", "#555555"],
      createdAt: ("2025-01-01"),
      priceSale: 19000000,
      slug: 'Sofa-Modular-2.5-seater-với-nhièu-varian-option'
    },
    {
      id: 6,
      name: "Sofa Modular 2.5 seater với nhièu varian option",
      price: 22150000,
      image: "/images/products/product1.jpg",
      colors: ["#4A2932", "#E5E5E5", "#555555"],
      createdAt: ("2025-03-01"),
      priceSale: 18000000,
      slug: 'Sofa-Modular-2.5-seater-với-nhièu-varian-option'
    },
    {
      id: 7,
      name: "Sofa Modular 2.5 seater với nhièu varian option",
      price: 22150000,
      image: "/images/products/product1.jpg",
      colors: ["#333333", "#555555", "#777777"],
      isNew: true,
      createdAt: ("2025-01-01"),
      priceSale: 10000000,
      slug: 'Sofa-Modular-2.5-seater-với-nhièu-varian-option'
    },
    {
      id: 8,
      name: "Sofa Modular 2.5 seater với nhièu varian option",
      price: 22150000,
      image: "/images/products/product1.jpg",
      colors: ["#D8C1A9", "#E5E5E5", "#555555"],
      createdAt: ("2025-06-01"),
      priceSale: 16000000,
      slug: 'Sofa-Modular-2.5-seater-với-nhièu-varian-option'
    },
    {
      id: 9,
      name: "Sofa Modular 2.5 seater với nhièu varian option",
      price: 22150000,
      image: "/images/products/product1.jpg",
      colors: ["#333333", "#555555", "#777777"],
      createdAt: ("2025-06-01"),
      priceSale: 18900000,
      slug: 'Sofa-Modular-2.5-seater-với-nhièu-varian-option'
    },
    {
      id: 10,
      name: "Sofa Modular 2.5 seater với nhièu varian option",
      price: 22150000,
      image: "/images/products/product1.jpg",
      colors: ["#D8C1A9", "#E5E5E5", "#555555"],
      createdAt: ("2025-06-01"),
      priceSale: 13400000,
      slug: 'Sofa-Modular-2.5-seater-với-nhièu-varian-option'
    },
    {
      id: 11,
      name: "Sofa Modular 2.5 seater với nhièu varian option",
      price: 22150000,
      image: "/images/products/product1.jpg",
      colors: ["#333333", "#555555", "#777777"],
      isNew: true,
      createdAt: ("2025-06-01"),
      priceSale: 20000000,
      slug: 'Sofa-Modular-2.5-seater-với-nhièu-varian-option'
    },
    {
      id: 12,
      name: "Sofa Modular 2.5 seater với nhièu varian option",
      price: 22150000,
      image: "/images/products/product1.jpg",
      colors: ["#D8C1A9", "#E5E5E5", "#555555"],
      isSale: true,
      createdAt: ("2025-06-01"),
      priceSale: 20000000,
      slug: 'Sofa-Modular-2.5-seater-với-nhièu-varian-option'
    },
  ];

  

  // Format price with commas
  const formatPrice = (price: number): string => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  return (
    <>
      <Header />
      <div className="product-of-category">
        {/* Banner Section */}
        <section className="category-banner">
          <div className="container-fluid">
            <div className="banner-image">
              <img src="/images/productsCategory/banner-chair.jpg" alt="Sản phẩm trong danh mục Ghế - Các loại ghế hiện đại" />
              <div className="banner-content">
                {/* <div className="breadcrumb">
                  <span>Trang chủ / </span>
                  <span className="active">Ghế</span>
                </div> */}
                <h1>Sản phẩm trong danh mục Ghế</h1>
              </div>
            </div>
          </div>
        </section>

        {/* Filter and Products */}
        <section className="product-listing">
         
            {/* Filter Row */}
            {/* <div className="filter-row">
              <div className="filter-left">
                <div className="filter-icon">
                  <img src="/images/icons/filter-icon.svg" alt="Filter" />
                  <span>Bộ lọc:</span>
                </div>
                <div className="filter-dropdown">
                  <button className="dropdown-toggle">
                    <span>Danh mục: {selectedFilter}</span>
                    <i className="dropdown-icon"></i>
                  </button>
                </div>
                <div className="filter-dropdown">
                  <button className="dropdown-toggle">
                    <span>Danh mục: {selectedSort}</span>
                    <i className="dropdown-icon"></i>
                  </button>
                </div>
                <div className="filter-dropdown">
                  <button className="dropdown-toggle">
                    <span>Danh mục: {selectedSpace}</span>
                    <i className="dropdown-icon"></i>
                  </button>
                </div>
              </div>
              <div className="filter-right">
                <div className="filter-view">
                  <button className="view-option active">
                    <img src="/images/icons/grid-view.svg" alt="Grid View" />
                  </button>
                  <button className="view-option">
                    <img src="/images/icons/list-view.svg" alt="List View" />
                  </button>
                </div>
                <div className="filter-sort">
                  <button className="sort-toggle">
                    <img src="/images/icons/sort-icon.svg" alt="Sort" />
                    <span>Sắp xếp</span>
                    <i className="dropdown-icon"></i>
                  </button>
                </div>
              </div>
            </div> */}
            <Filter />
            <div className="container">
            {products.map((product) => (
                <ListProduct key={product.id} product={product} slug={product.slug} />
              ))}
            {/* Products Grid */}
            {/* <div className="products-grid">
              {products.map((product) => (
                <div key={product.id} className="product-item">
                  <div className="product-image">
                    {product.isNew && <span className="badge new">NEW</span>}
                    {product.isSale && <span className="badge sale">SALE</span>}
                    <img src={product.image} alt={`${product.name} - ${categories.find(c => c.slug === product.category)?.category}`} />
                    <div className="product-actions">
                      <button className="wishlist-btn">
                        <img src="/images/icons/heart-icon.svg" alt="Add to wishlist" />
                      </button>
                    </div>
                  </div>
                  <div className="product-info">
                    <div className="product-category">Sofas</div>
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
                    <div className="product-action">
                      <a href="#" className="view-product">Xem ngay</a>
                    </div>
                  </div>
                </div>
              ))}
            </div> */}


            {/* <div className="product-grid" role="list" aria-label="Danh sách sản phẩm">
              <article className="product-card" role="listitem" aria-label="Sản phẩm Sofa Modena 2,5 seater">
                <div className="product-badges">
                  <div className="badge-text"><span>Mới</span></div>
                  <div className="badge-icon">
                    <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/4f6f26cd391f5d0e6006bf2b21f9dc97caa013e3?placeholderIfAbsent=true&apiKey=c01b0b1f77f44db1a01eba6bb534c16f" alt="Biểu tượng nhãn sản phẩm" />
                  </div>
                </div>
                <div className="product-image">
                  <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/48a94b3d17a6a5c483f0afc304952e54d075f18f?placeholderIfAbsent=true&apiKey=c01b0b1f77f44db1a01eba6bb534c16f" alt="Sofa Modena 2.5 seater" />
                </div>
                <div className="product-info">
                  <h2>Sofa Modena 2,5 seater ofa odena sema seater</h2>
                  <p>Sofa</p>
                </div>
                <div className="color-selector" role="group" aria-label="Chọn màu sắc">
                  <div className="colors">
                    <span>Màu</span>
                    <button className="color-button color-dark-brown" aria-label="Màu nâu đậm" type="button"></button>
                    <button className="color-button color-light-brown" aria-label="Màu nâu sáng" type="button"></button>
                    <button className="color-button color-gray" aria-label="Màu xám" type="button"></button>
                  </div>
                </div>
                <hr className="divider" />
                <div className="price-section">
                  <div className="price-info">
                    <p className="original-price">25.000.000 ₫</p>
                    <p className="sale-price">15.190.000 ₫</p>
                  </div>
                  <button className="buy-button" type="button">Mua ngay</button>
                </div>
              </article> <article className="product-card" role="listitem" aria-label="Sản phẩm Sofa Modena 2,5 seater">
                <div className="product-badges">
                  <div className="badge-text"><span>Mới</span></div>
                  <div className="badge-icon">
                    <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/4f6f26cd391f5d0e6006bf2b21f9dc97caa013e3?placeholderIfAbsent=true&apiKey=c01b0b1f77f44db1a01eba6bb534c16f" alt="Biểu tượng nhãn sản phẩm" />
                  </div>
                </div>
                <div className="product-image">
                  <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/48a94b3d17a6a5c483f0afc304952e54d075f18f?placeholderIfAbsent=true&apiKey=c01b0b1f77f44db1a01eba6bb534c16f" alt="Sofa Modena 2.5 seater" />
                </div>
                <div className="product-info">
                  <h2>Sofa Modena 2,5 seater ofa odena sema seater</h2>
                  <p>Sofa</p>
                </div>
                <div className="color-selector" role="group" aria-label="Chọn màu sắc">
                  <div className="colors">
                    <span>Màu</span>
                    <button className="color-button color-dark-brown" aria-label="Màu nâu đậm" type="button"></button>
                    <button className="color-button color-light-brown" aria-label="Màu nâu sáng" type="button"></button>
                    <button className="color-button color-gray" aria-label="Màu xám" type="button"></button>
                  </div>
                </div>
                <hr className="divider" />
                <div className="price-section">
                  <div className="price-info">
                    <p className="original-price">25.000.000 ₫</p>
                    <p className="sale-price">15.190.000 ₫</p>
                  </div>
                  <button className="buy-button" type="button">Mua ngay</button>
                </div>
              </article> <article className="product-card" role="listitem" aria-label="Sản phẩm Sofa Modena 2,5 seater">
                <div className="product-badges">
                  <div className="badge-text"><span>Mới</span></div>
                  <div className="badge-icon">
                    <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/4f6f26cd391f5d0e6006bf2b21f9dc97caa013e3?placeholderIfAbsent=true&apiKey=c01b0b1f77f44db1a01eba6bb534c16f" alt="Biểu tượng nhãn sản phẩm" />
                  </div>
                </div>
                <div className="product-image">
                  <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/48a94b3d17a6a5c483f0afc304952e54d075f18f?placeholderIfAbsent=true&apiKey=c01b0b1f77f44db1a01eba6bb534c16f" alt="Sofa Modena 2.5 seater" />
                </div>
                <div className="product-info">
                  <h2>Sofa Modena 2,5 seater ofa odena sema seater</h2>
                  <p>Sofa</p>
                </div>
                <div className="color-selector" role="group" aria-label="Chọn màu sắc">
                  <div className="colors">
                    <span>Màu</span>
                    <button className="color-button color-dark-brown" aria-label="Màu nâu đậm" type="button"></button>
                    <button className="color-button color-light-brown" aria-label="Màu nâu sáng" type="button"></button>
                    <button className="color-button color-gray" aria-label="Màu xám" type="button"></button>
                  </div>
                </div>
                <hr className="divider" />
                <div className="price-section">
                  <div className="price-info">
                    <p className="original-price">25.000.000 ₫</p>
                    <p className="sale-price">15.190.000 ₫</p>
                  </div>
                  <button className="buy-button" type="button">Mua ngay</button>
                </div>
              </article> <article className="product-card" role="listitem" aria-label="Sản phẩm Sofa Modena 2,5 seater">
                <div className="product-badges">
                  <div className="badge-text"><span>Mới</span></div>
                  <div className="badge-icon">
                    <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/4f6f26cd391f5d0e6006bf2b21f9dc97caa013e3?placeholderIfAbsent=true&apiKey=c01b0b1f77f44db1a01eba6bb534c16f" alt="Biểu tượng nhãn sản phẩm" />
                  </div>
                </div>
                <div className="product-image">
                  <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/48a94b3d17a6a5c483f0afc304952e54d075f18f?placeholderIfAbsent=true&apiKey=c01b0b1f77f44db1a01eba6bb534c16f" alt="Sofa Modena 2.5 seater" />
                </div>
                <div className="product-info">
                  <h2>Sofa Modena 2,5 seater ofa odena sema seater</h2>
                  <p>Sofa</p>
                </div>
                <div className="color-selector" role="group" aria-label="Chọn màu sắc">
                  <div className="colors">
                    <span>Màu</span>
                    <button className="color-button color-dark-brown" aria-label="Màu nâu đậm" type="button"></button>
                    <button className="color-button color-light-brown" aria-label="Màu nâu sáng" type="button"></button>
                    <button className="color-button color-gray" aria-label="Màu xám" type="button"></button>
                  </div>
                </div>
                <hr className="divider" />
                <div className="price-section">
                  <div className="price-info">
                    <p className="original-price">25.000.000 ₫</p>
                    <p className="sale-price">15.190.000 ₫</p>
                  </div>
                  <button className="buy-button" type="button">Mua ngay</button>
                </div>
              </article> <article className="product-card" role="listitem" aria-label="Sản phẩm Sofa Modena 2,5 seater">
                <div className="product-badges">
                  <div className="badge-text"><span>Mới</span></div>
                  <div className="badge-icon">
                    <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/4f6f26cd391f5d0e6006bf2b21f9dc97caa013e3?placeholderIfAbsent=true&apiKey=c01b0b1f77f44db1a01eba6bb534c16f" alt="Biểu tượng nhãn sản phẩm" />
                  </div>
                </div>
                <div className="product-image">
                  <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/48a94b3d17a6a5c483f0afc304952e54d075f18f?placeholderIfAbsent=true&apiKey=c01b0b1f77f44db1a01eba6bb534c16f" alt="Sofa Modena 2.5 seater" />
                </div>
                <div className="product-info">
                  <h2>Sofa Modena 2,5 seater ofa odena sema seater</h2>
                  <p>Sofa</p>
                </div>
                <div className="color-selector" role="group" aria-label="Chọn màu sắc">
                  <div className="colors">
                    <span>Màu</span>
                    <button className="color-button color-dark-brown" aria-label="Màu nâu đậm" type="button"></button>
                    <button className="color-button color-light-brown" aria-label="Màu nâu sáng" type="button"></button>
                    <button className="color-button color-gray" aria-label="Màu xám" type="button"></button>
                  </div>
                </div>
                <hr className="divider" />
                <div className="price-section">
                  <div className="price-info">
                    <p className="original-price">25.000.000 ₫</p>
                    <p className="sale-price">15.190.000 ₫</p>
                  </div>
                  <button className="buy-button" type="button">Mua ngay</button>
                </div>
              </article> <article className="product-card" role="listitem" aria-label="Sản phẩm Sofa Modena 2,5 seater">
                <div className="product-badges">
                  <div className="badge-text"><span>Mới</span></div>
                  <div className="badge-icon">
                    <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/4f6f26cd391f5d0e6006bf2b21f9dc97caa013e3?placeholderIfAbsent=true&apiKey=c01b0b1f77f44db1a01eba6bb534c16f" alt="Biểu tượng nhãn sản phẩm" />
                  </div>
                </div>
                <div className="product-image">
                  <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/48a94b3d17a6a5c483f0afc304952e54d075f18f?placeholderIfAbsent=true&apiKey=c01b0b1f77f44db1a01eba6bb534c16f" alt="Sofa Modena 2.5 seater" />
                </div>
                <div className="product-info">
                  <h2>Sofa Modena 2,5 seater ofa odena sema seater</h2>
                  <p>Sofa</p>
                </div>
                <div className="color-selector" role="group" aria-label="Chọn màu sắc">
                  <div className="colors">
                    <span>Màu</span>
                    <button className="color-button color-dark-brown" aria-label="Màu nâu đậm" type="button"></button>
                    <button className="color-button color-light-brown" aria-label="Màu nâu sáng" type="button"></button>
                    <button className="color-button color-gray" aria-label="Màu xám" type="button"></button>
                  </div>
                </div>
                <hr className="divider" />
                <div className="price-section">
                  <div className="price-info">
                    <p className="original-price">25.000.000 ₫</p>
                    <p className="sale-price">15.190.000 ₫</p>
                  </div>
                  <button className="buy-button" type="button">Mua ngay</button>
                </div>
              </article> <article className="product-card" role="listitem" aria-label="Sản phẩm Sofa Modena 2,5 seater">
                <div className="product-badges">
                  <div className="badge-text"><span>Mới</span></div>
                  <div className="badge-icon">
                    <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/4f6f26cd391f5d0e6006bf2b21f9dc97caa013e3?placeholderIfAbsent=true&apiKey=c01b0b1f77f44db1a01eba6bb534c16f" alt="Biểu tượng nhãn sản phẩm" />
                  </div>
                </div>
                <div className="product-image">
                  <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/48a94b3d17a6a5c483f0afc304952e54d075f18f?placeholderIfAbsent=true&apiKey=c01b0b1f77f44db1a01eba6bb534c16f" alt="Sofa Modena 2.5 seater" />
                </div>
                <div className="product-info">
                  <h2>Sofa Modena 2,5 seater ofa odena sema seater</h2>
                  <p>Sofa</p>
                </div>
                <div className="color-selector" role="group" aria-label="Chọn màu sắc">
                  <div className="colors">
                    <span>Màu</span>
                    <button className="color-button color-dark-brown" aria-label="Màu nâu đậm" type="button"></button>
                    <button className="color-button color-light-brown" aria-label="Màu nâu sáng" type="button"></button>
                    <button className="color-button color-gray" aria-label="Màu xám" type="button"></button>
                  </div>
                </div>
                <hr className="divider" />
                <div className="price-section">
                  <div className="price-info">
                    <p className="original-price">25.000.000 ₫</p>
                    <p className="sale-price">15.190.000 ₫</p>
                  </div>
                  <button className="buy-button" type="button">Mua ngay</button>
                </div>
              </article> <article className="product-card" role="listitem" aria-label="Sản phẩm Sofa Modena 2,5 seater">
                <div className="product-badges">
                  <div className="badge-text"><span>Mới</span></div>
                  <div className="badge-icon">
                    <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/4f6f26cd391f5d0e6006bf2b21f9dc97caa013e3?placeholderIfAbsent=true&apiKey=c01b0b1f77f44db1a01eba6bb534c16f" alt="Biểu tượng nhãn sản phẩm" />
                  </div>
                </div>
                <div className="product-image">
                  <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/48a94b3d17a6a5c483f0afc304952e54d075f18f?placeholderIfAbsent=true&apiKey=c01b0b1f77f44db1a01eba6bb534c16f" alt="Sofa Modena 2.5 seater" />
                </div>
                <div className="product-info">
                  <h2>Sofa Modena 2,5 seater ofa odena sema seater</h2>
                  <p>Sofa</p>
                </div>
                <div className="color-selector" role="group" aria-label="Chọn màu sắc">
                  <div className="colors">
                    <span>Màu</span>
                    <button className="color-button color-dark-brown" aria-label="Màu nâu đậm" type="button"></button>
                    <button className="color-button color-light-brown" aria-label="Màu nâu sáng" type="button"></button>
                    <button className="color-button color-gray" aria-label="Màu xám" type="button"></button>
                  </div>
                </div>
                <hr className="divider" />
                <div className="price-section">
                  <div className="price-info">
                    <p className="original-price">25.000.000 ₫</p>
                    <p className="sale-price">15.190.000 ₫</p>
                  </div>
                  <button className="buy-button" type="button">Mua ngay</button>
                </div>
              </article>
              <article className="product-card" role="listitem" aria-label="Sản phẩm Sofa Modena 2,5 seater">
                <div className="product-badges">
                  <div className="badge-text"><span>Mới</span></div>
                  <div className="badge-icon">
                    <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/4f6f26cd391f5d0e6006bf2b21f9dc97caa013e3?placeholderIfAbsent=true&apiKey=c01b0b1f77f44db1a01eba6bb534c16f" alt="Biểu tượng nhãn sản phẩm" />
                  </div>
                </div>
                <div className="product-image">
                  <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/48a94b3d17a6a5c483f0afc304952e54d075f18f?placeholderIfAbsent=true&apiKey=c01b0b1f77f44db1a01eba6bb534c16f" alt="Sofa Modena 2.5 seater" />
                </div>
                <div className="product-info">
                  <h2>Sofa Modena 2,5 seater ofa odena sema seater</h2>
                  <p>Sofa</p>
                </div>
                <div className="color-selector" role="group" aria-label="Chọn màu sắc">
                  <div className="colors">
                    <span>Màu</span>
                    <button className="color-button color-dark-brown" aria-label="Màu nâu đậm" type="button"></button>
                    <button className="color-button color-light-brown" aria-label="Màu nâu sáng" type="button"></button>
                    <button className="color-button color-gray" aria-label="Màu xám" type="button"></button>
                  </div>
                </div>
                <hr className="divider" />
                <div className="price-section">
                  <div className="price-info">
                    <p className="original-price">25.000.000 ₫</p>
                    <p className="sale-price">15.190.000 ₫</p>
                  </div>
                  <button className="buy-button" type="button">Mua ngay</button>
                </div>
              </article>


              <article className="product-card" role="listitem" aria-label="Sản phẩm Sofa Modena 2,5 seater">
                <div className="product-badges">
                  <div className="badge-text"><span>Mới</span></div>
                  <div className="badge-icon">
                    <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/4f6f26cd391f5d0e6006bf2b21f9dc97caa013e3?placeholderIfAbsent=true&apiKey=c01b0b1f77f44db1a01eba6bb534c16f" alt="Biểu tượng nhãn sản phẩm" />
                  </div>
                </div>
                <div className="product-image">
                  <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/48a94b3d17a6a5c483f0afc304952e54d075f18f?placeholderIfAbsent=true&apiKey=c01b0b1f77f44db1a01eba6bb534c16f" alt="Sofa Modena 2.5 seater" />
                </div>
                <div className="product-info">
                  <h2>Sofa Modena 2,5 seater ofa odena sema seater</h2>
                  <p>Sofa</p>
                </div>
                <div className="color-selector" role="group" aria-label="Chọn màu sắc">
                  <div className="colors">
                    <span>Màu</span>
                    <button className="color-button color-dark-brown" aria-label="Màu nâu đậm" type="button"></button>
                    <button className="color-button color-light-brown" aria-label="Màu nâu sáng" type="button"></button>
                    <button className="color-button color-gray" aria-label="Màu xám" type="button"></button>
                  </div>
                </div>
                <hr className="divider" />
                <div className="price-section">
                  <div className="price-info">
                    <p className="original-price">25.000.000 ₫</p>
                    <p className="sale-price">15.190.000 ₫</p>
                  </div>
                  <button className="buy-button" type="button">Mua ngay</button>
                </div>
              </article>


              <article className="product-card" role="listitem" aria-label="Sản phẩm Sofa Modena 2,5 seater">
                <div className="product-badges">
                  <div className="badge-text"><span>Mới</span></div>
                  <div className="badge-icon">
                    <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/4f6f26cd391f5d0e6006bf2b21f9dc97caa013e3?placeholderIfAbsent=true&apiKey=c01b0b1f77f44db1a01eba6bb534c16f" alt="Biểu tượng nhãn sản phẩm" />
                  </div>
                </div>
                <div className="product-image">
                  <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/48a94b3d17a6a5c483f0afc304952e54d075f18f?placeholderIfAbsent=true&apiKey=c01b0b1f77f44db1a01eba6bb534c16f" alt="Sofa Modena 2.5 seater" />
                </div>
                <div className="product-info">
                  <h2>Sofa Modena 2,5 seater ofa odena sema seater</h2>
                  <p>Sofa</p>
                </div>
                <div className="color-selector" role="group" aria-label="Chọn màu sắc">
                  <div className="colors">
                    <span>Màu</span>
                    <button className="color-button color-dark-brown" aria-label="Màu nâu đậm" type="button"></button>
                    <button className="color-button color-light-brown" aria-label="Màu nâu sáng" type="button"></button>
                    <button className="color-button color-gray" aria-label="Màu xám" type="button"></button>
                  </div>
                </div>
                <hr className="divider" />
                <div className="price-section">
                  <div className="price-info">
                    <p className="original-price">25.000.000 ₫</p>
                    <p className="sale-price">15.190.000 ₫</p>
                  </div>
                  <button className="buy-button" type="button">Mua ngay</button>
                </div>
              </article>


              <article className="product-card" role="listitem" aria-label="Sản phẩm Sofa Modena 2,5 seater">
                <div className="product-badges">
                  <div className="badge-text"><span>Mới</span></div>
                  <div className="badge-icon">
                    <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/4f6f26cd391f5d0e6006bf2b21f9dc97caa013e3?placeholderIfAbsent=true&apiKey=c01b0b1f77f44db1a01eba6bb534c16f" alt="Biểu tượng nhãn sản phẩm" />
                  </div>
                </div>
                <div className="product-image">
                  <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/48a94b3d17a6a5c483f0afc304952e54d075f18f?placeholderIfAbsent=true&apiKey=c01b0b1f77f44db1a01eba6bb534c16f" alt="Sofa Modena 2.5 seater" />
                </div>
                <div className="product-info">
                  <h2>Sofa Modena 2,5 seater ofa odena sema seater</h2>
                  <p>Sofa</p>
                </div>
                <div className="color-selector" role="group" aria-label="Chọn màu sắc">
                  <div className="colors">
                    <span>Màu</span>
                    <button className="color-button color-dark-brown" aria-label="Màu nâu đậm" type="button"></button>
                    <button className="color-button color-light-brown" aria-label="Màu nâu sáng" type="button"></button>
                    <button className="color-button color-gray" aria-label="Màu xám" type="button"></button>
                  </div>
                </div>
                <hr className="divider" />
                <div className="price-section">
                  <div className="price-info">
                    <p className="original-price">25.000.000 ₫</p>
                    <p className="sale-price">15.190.000 ₫</p>
                  </div>
                  <button className="buy-button" type="button">Mua ngay</button>
                </div>
              </article>


            </div> */}
            {/* Pagination */}
            <div className="pagination">
              <span className="pagination-text">Xem thêm sản phẩm</span>
              <div className="pagination-dots">
                <span className="dot active"></span>
                <span className="dot"></span>
                <span className="dot"></span>
              </div>
            </div>
          </div>
        </section>

        {/* Category Navigation */}
        <section className="category-navigation">
          <div className="container">
            <h2 className="section-title">Danh Mục Sản Phẩm</h2>
            <div className="categories-grid">
              {categories.map((category) => (
                <div key={category.id} className="category-item">
                  <a href={`/danh-muc/${category.slug}`} className="category-link">
                    <img src={category.image} alt={`Danh mục ${category.name}`} />
                    <h3>{category.name}</h3>
                  </a>
                </div>
              ))}
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

export default ProductOfCategory;
