import React, { useState } from "react";


interface ProductProps {
  id: number;
  name: string;
  price: number;
  image: string;
  colors: string[];
  isNew?: boolean;
  isSale?: boolean;
}
const ListProduct12: React.FC = () => {
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
      {/* Products Grid */}
      <section className="section-box-products">
        <div className="box-products-container">
          {products.map((product) => (
            <div className="box-products-frame" key={product.id}>
              <div className="products-frame-news" >
                {product.isNew && <span className="news-tt">Mới</span>}
                {product.isSale && <span className="news-tt-1">Giảm 20%</span>}
                <div className="news-icon">
                  <img src="/images/products/heart.jpg" alt="" />
                </div>
              </div>
              <div className="products-frame-image">
                <img src={product.image} alt="" />
              </div>
              <div className="products-frame-name">
                <span>Sofa Modena 2,5 seater ofa odena sema seater</span>
              </div>
              <div className="products-frame-description">
                <span>Sofa</span>
              </div>
              <div className="products-frame-color">
                <div className="color-name">Màu</div>
                <div className="color-section">
                  {product.colors.map((color, index) => (
                    <span key={index} className="color-1" style={{ backgroundColor: color }}>
                    </span>
                  ))}
                </div>
              </div>
              <div className="products-frame-cart">
                <div className="cart-price">
                  <span className="price1"><del>25.000.000 <sup>đ</sup></del></span>
                  <span className="price2">{formatPrice(product.price)}</span>
                </div>
                <div className="cart-button">
                  <button>Mua ngay</button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </section>

    </>
  );
};

export default ListProduct12;
