import React, { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import PopularCategory from "../../components/PopularCategory";
import Filter from "../../components/Filter";
import ListProduct from "../../components/ListProduct";
import PolicyProduct from "../../components/Policy";
import GetInTouch from "../../components/GetInTouch";
import Seemore from "../../components/SeeMore";

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

const ProductPage: React.FC = () => {

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
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + "d";
};
  return (
    <>
      <Header />
      {/* Banner Section */}
      <div className="banner-slider">
        <div className="header-banner">
          <img src="images/products/banner-slider.jpg" alt="" />
        </div>
        <div className="header-text">
          <div className="text1">Chào mừng đến với</div>
          <div className="text2">Bộ sưu tập nội thất của chúng tôi</div>
          <div className="text3">Khám phá nhiều loại đồ nội thất chất lượng cao của chúng tôi.</div>
        </div>
      </div>

      {/* PopularCategory */}
      <PopularCategory />

      {/* Filter Section */}
      <Filter />

      {/* boxsanpham */}
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

      {/* See More Section */}
      <Seemore />

      {/* Policy */}
      <PolicyProduct />

      {/* Get in Touch Section */}
      <GetInTouch />

      {/* Footer */}
      <Footer />
    </>
  );
};

export default ProductPage;
