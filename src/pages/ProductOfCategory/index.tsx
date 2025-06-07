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
          <div className="boxProducts">
            <div className="container">
              <div className="section-box-products">
                <div className="box-products-container">
                  {products.map((product) => (
                    <ListProduct key={product.id} product={product} slug={product.slug} />
                  ))}
                </div>
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
