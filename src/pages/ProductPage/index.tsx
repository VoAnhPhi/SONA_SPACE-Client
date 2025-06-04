import React, { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import PopularCategory from "../../components/popular-category";
import Filter from "../../components/filter";
import ListProduct from "../../components/listProduct";
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
  createdAt?: string;
  priceSale?: number;
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
        },
        {
          id: 2,
          name: "Sofa Modular 2.5 seater với nhièu varian option",
          price: 22150000,
          image: "/images/products/product1.jpg",
           colors: ["#7d5a50", "#a3a380", "#757575"],
                createdAt: ("2025-05-01"),
          priceSale: 20000000,
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
        },
        {
          id: 5,
          name: "Sofa Modular 2.5 seater với nhièu varian option",
          price: 22150000,
          image: "/images/products/product1.jpg",
          colors: ["#D8C1A9", "#E5E5E5", "#555555"],
               createdAt: ("2025-01-01"),
          priceSale: 19000000,
        },
        {
          id: 6,
          name: "Sofa Modular 2.5 seater với nhièu varian option",
          price: 22150000,
          image: "/images/products/product1.jpg",
          colors: ["#4A2932", "#E5E5E5", "#555555"],
               createdAt: ("2025-03-01"),
          priceSale: 18000000,
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
        },
        {
          id: 8,
          name: "Sofa Modular 2.5 seater với nhièu varian option",
          price: 22150000,
          image: "/images/products/product1.jpg",
          colors: ["#D8C1A9", "#E5E5E5", "#555555"],
               createdAt: ("2025-06-01"),
          priceSale: 16000000,
        },
        {
          id: 9,
          name: "Sofa Modular 2.5 seater với nhièu varian option",
          price: 22150000,
            image: "/images/products/product1.jpg",
          colors: ["#333333", "#555555", "#777777"],
               createdAt: ("2025-06-01"),
          priceSale: 18900000,
        },
        {
          id: 10,
          name: "Sofa Modular 2.5 seater với nhièu varian option",
          price: 22150000,
          image: "/images/products/product1.jpg",
          colors: ["#D8C1A9", "#E5E5E5", "#555555"],
               createdAt: ("2025-06-01"),
          priceSale: 13400000,
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
           <div className="container">
        <section className="section-box-products">
            <div className="box-products-container">
          {products.map((product) => (
          <ListProduct key={product.id} product={product} />
            ))}

    </div>
        </section>
</div>
        {/* Products Grid */}


        {/* See More Section */}
     <div className="box-seemore">
        <div className="container">
            <p>Xem thêm sản phẩm</p>
            <div className="arow-seemore">
                <img src="/images/products/arow.svg" alt="" />
                <img src="/images/products/arow.svg" alt="" />
            </div>
            </div>
        </div>
        {/* Policy */}
        <PolicyProduct />
        
        {/* Get in Touch Section */}
        <Getintouch />
      <Footer />
    </>
  );
};

export default ProductPage;
