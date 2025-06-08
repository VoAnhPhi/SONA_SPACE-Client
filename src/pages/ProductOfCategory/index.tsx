import React, { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
<<<<<<< HEAD
import ListProduct from "../../components/listProduct";
import Filter from "../../components/filter";
=======
import ListProduct from "../../components/Product";
import CategorySlider from "../../components/CategorySlider";
import Filter from "../../components/Filter";
import Seemore from "../../components/seemore";
>>>>>>> 9f0706bb50eab869a34702f004353b547672e494

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
      category: "Latest Edition",
    },
    {
      id: 2,
      name: "Sofas",
      image: "/images/categories/sofas.jpg",
      slug: "sofas",
      category: "Sofas",
    },
    {
      id: 3,
      name: "Ghế",
      image: "/images/categories/ghe.jpg",
      slug: "ghe",
      category: "Ghế",
    },
    {
      id: 4,
      name: "Bàn",
      image: "/images/categories/ban.jpg",
      slug: "ban",
      category: "Bàn",
    },
    {
      id: 5,
      name: "Tủ",
      image: "/images/categories/tu.jpg",
      slug: "tu",
      category: "Tủ",
    },
  ];

  // Sample product data
  const products: ProductProps[] = [
    {
      id: 1,
      name: "Sofa Modular 2.5 seater với nhièu varian option",
      price: 22150000,
      image: "/images/products/product1.jpg",
      colors: ["#7d5a50", "#a3a380", "#757575"],
      createdAt: "2025-06-02",
      priceSale: 20000000,
      slug: "Sofa-Modular-2.5-seater-với-nhièu-varian-option",
    },
    {
      id: 2,
      name: "Sofa Modular 2.5 seater với nhièu varian option",
      price: 22150000,
      image: "/images/products/product1.jpg",
      colors: ["#7d5a50", "#a3a380", "#757575"],
      createdAt: "2025-05-01",
      priceSale: 20000000,
      slug: "Sofa-Modular-2.5-seater-với-nhièu-varian-option",
    },
    {
      id: 3,
      name: "Sofa Modular 2.5 seater với nhièu varian option",
      price: 22150000,
      image: "/images/products/product1.jpg",
      colors: ["#D8C1A9", "#555555", "#333333"],
      isNew: true,
      createdAt: "2025-02-01",
      priceSale: 22000000,
      slug: "Sofa-Modular-2.5-seater-với-nhièu-varian-option",
    },
    {
      id: 4,
      name: "Sofa Modular 2.5 seater với nhièu varian option",
      price: 22150000,
      image: "/images/products/product1.jpg",
      colors: ["#D8C1A9", "#E5E5E5", "#555555"],
      isSale: true,
      createdAt: "2025-06-04",
      priceSale: 21000000,
      slug: "Sofa-Modular-2.5-seater-với-nhièu-varian-option",
    },
    {
      id: 5,
      name: "Sofa Modular 2.5 seater với nhièu varian option",
      price: 22150000,
      image: "/images/products/product1.jpg",
      colors: ["#D8C1A9", "#E5E5E5", "#555555"],
      createdAt: "2025-01-01",
      priceSale: 19000000,
      slug: "Sofa-Modular-2.5-seater-với-nhièu-varian-option",
    },
    {
      id: 6,
      name: "Sofa Modular 2.5 seater với nhièu varian option",
      price: 22150000,
      image: "/images/products/product1.jpg",
      colors: ["#4A2932", "#E5E5E5", "#555555"],
      createdAt: "2025-03-01",
      priceSale: 18000000,
      slug: "Sofa-Modular-2.5-seater-với-nhièu-varian-option",
    },
    {
      id: 7,
      name: "Sofa Modular 2.5 seater với nhièu varian option",
      price: 22150000,
      image: "/images/products/product1.jpg",
      colors: ["#333333", "#555555", "#777777"],
      isNew: true,
      createdAt: "2025-01-01",
      priceSale: 10000000,
      slug: "Sofa-Modular-2.5-seater-với-nhièu-varian-option",
    },
    {
      id: 8,
      name: "Sofa Modular 2.5 seater với nhièu varian option",
      price: 22150000,
      image: "/images/products/product1.jpg",
      colors: ["#D8C1A9", "#E5E5E5", "#555555"],
      createdAt: "2025-06-01",
      priceSale: 16000000,
      slug: "Sofa-Modular-2.5-seater-với-nhièu-varian-option",
    },
    {
      id: 9,
      name: "Sofa Modular 2.5 seater với nhièu varian option",
      price: 22150000,
      image: "/images/products/product1.jpg",
      colors: ["#333333", "#555555", "#777777"],
      createdAt: "2025-06-01",
      priceSale: 18900000,
      slug: "Sofa-Modular-2.5-seater-với-nhièu-varian-option",
    },
    {
      id: 10,
      name: "Sofa Modular 2.5 seater với nhièu varian option",
      price: 22150000,
      image: "/images/products/product1.jpg",
      colors: ["#D8C1A9", "#E5E5E5", "#555555"],
      createdAt: "2025-06-01",
      priceSale: 13400000,
      slug: "Sofa-Modular-2.5-seater-với-nhièu-varian-option",
    },
    {
      id: 11,
      name: "Sofa Modular 2.5 seater với nhièu varian option",
      price: 22150000,
      image: "/images/products/product1.jpg",
      colors: ["#333333", "#555555", "#777777"],
      isNew: true,
      createdAt: "2025-06-01",
      priceSale: 20000000,
      slug: "Sofa-Modular-2.5-seater-với-nhièu-varian-option",
    },
    {
      id: 12,
      name: "Sofa Modular 2.5 seater với nhièu varian option",
      price: 22150000,
      image: "/images/products/product1.jpg",
      colors: ["#D8C1A9", "#E5E5E5", "#555555"],
      isSale: true,
      createdAt: "2025-06-01",
      priceSale: 20000000,
      slug: "Sofa-Modular-2.5-seater-với-nhièu-varian-option",
    },
  ];

  return (
    <>
      <Header />
      <div className="product-of-category">
        {/* Banner Section */}
        <section className="category-banner">
          <div className="container-fluid">
            <div className="banner-image">
              <img
                src="/images/productsCategory/banner-chair.jpg"
                alt="Sản phẩm trong danh mục Ghế - Các loại ghế hiện đại"
              />
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

        <section className="product-listing">
          <Filter />
          <div className="boxProducts">
            <div className="container">
              <div className="section-box-products">
                <div className="box-products-container">
                  {products.map((product) => (
                    <ListProduct
                      key={product.id}
                      product={product}
                      slug={product.slug}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
        <Seemore />

        <section className="product-categories">
          <div className="container">
            <h2 className="section-title">Danh Mục Sản Phẩm</h2>

            <CategorySlider />
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default ProductOfCategory;
