import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import PolicyProduct from "../../components/Policy";
import ListProduct from "../../components/listProduct";

interface ProductProps {
  id: number;
  name: string;
  price: number;
  oldPrice?: number;
  images: string[];
  colors: {
    code: string;
    name: string;
  }[];
  rating: number;
  reviewCount: number;
  stock: number;
  category: string;
  description: string;
  features: {
    title: string;
    value: string;
  }[];
  slug: string;
}

interface RelatedProductProps {
  id: number;
  name: string;
  price: number;
  oldPrice?: number;
  image: string;
  colors: string[];
  category: string;
  slug: string;
}

const ProductDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [selectedColor, setSelectedColor] = useState<string>("#D8C1A9");
  const [quantity, setQuantity] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<string>("description");
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);

  // Mock product data
  const product: ProductProps = {
    id: 1,
    name: "Sofa Modena 2.5 seater ofa odena sema seater",
    price: 15190000,
    oldPrice: 18950000,
    images: [
      "/images/detail/detail1.png",
      "/images/detail/detail2.png",
      "/images/detail/detail3.png",
      "/images/detail/detail4.png",
      "/images/detail/detail5.png",
      "/images/detail/detail6.png",
      "/images/detail/detail7.png",
    ],
    colors: [
      { code: "#D8C1A9", name: "Beige" },
      { code: "#333333", name: "Black" },
      { code: "#777777", name: "Gray" },
    ],
    rating: 4.5,
    reviewCount: 1481,
    stock: 300,
    category: "Sofas",
    description:
      "Lorem ipsum dolor sit amet consectetur. Non imperdiet quisque quam sed semper nec semper. Ipsum mattis odio accumsan molestie dictum et urna.",
    features: [
      { title: "Màu sắc", value: "Đa dạng" },
      { title: "Chất liệu", value: "Cao cấp" },
      { title: "Kích thước", value: "Phù hợp" },
      { title: "Màu sắc", value: "Đa dạng" },
      { title: "Chất liệu", value: "Cao cấp" },
      { title: "Kích thước", value: "Phù hợp" },
    ],
    slug: "Sofa-Modular-2.5-seater-với-nhièu-varian-option",
  };

  // Mock related products
  const relatedProducts: RelatedProductProps[] = [
    {
      id: 2,
      name: "Sofa Modena 2.5 seater với nhiều varian option",
      price: 15190000,
      image: "/images/products/product(1).png",
      colors: ["#D8C1A9", "#333333", "#777777"],
      category: "Sofas",
      slug: "Sofa-Modular-2.5-seater-với-nhièu-varian-option",
    },
    {
      id: 3,
      name: "Sofa Modena 2.5 seater với nhiều varian option",
      price: 15190000,
      image: "/images/products/product(2).png",
      colors: ["#4A2932", "#E5E5E5", "#555555"],
      category: "Sofas",
      slug: "Sofa-Modular-2.5-seater-với-nhièu-varian-option",
    },
    {
      id: 4,
      name: "Sofa Modena 2.5 seater với nhiều varian option",
      price: 15190000,
      image: "/images/products/product(3).png",
      colors: ["#333333", "#555555", "#777777"],
      category: "Sofas",
      slug: "Sofa-Modular-2.5-seater-với-nhièu-varian-option",
    },
    {
      id: 5,
      name: "Sofa Modena 2.5 seater với nhiều varian option",
      price: 15190000,
      image: "/images/products/product(4).png",
      colors: ["#D8C1A9", "#E5E5E5", "#555555"],
      category: "Sofas",
      slug: "Sofa-Modular-2.5-seater-với-nhièu-varian-option",
    },
  ];

  // Format price with commas
  const formatPrice = (price: number): string => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  // Handle quantity change
  const handleQuantityChange = (amount: number) => {
    const newQuantity = quantity + amount;
    if (newQuantity > 0) {
      setQuantity(newQuantity);
    }
  };

  // Generate star rating
  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= Math.floor(rating)) {
        // sao đầy
        stars.push(<img key={i} src="/images/detail/star.svg" alt="" />);
      } else if (i - 0.5 === rating) {
        // sao nửa đầy
        stars.push(
          <img key={i} src="/images/detail/star-half-filled.svg" alt="" />
        );
      } else {
        // sao rỗng
        stars.push(<img key={i} src="/images/detail/star-filled.svg" alt="" />);
      }
    }
    return stars;
  };

  return (
    <>
      <Header />
      <div className="product-details">
        <div className="detail-page-link">
          <div className="container">
            <div className="detail-link">
            <span className="link1">Sản phẩm | </span>
            <span className="link2">Ghế sofa MOHO HALDEN</span>
            </div>
          </div>
        </div>

    <section className="product-detail-info">
    <div className="container">
        <div className="detail-products">
            <div className="detail-image">
                <div className="image-full">
                  <div className="image1">
                    <img src={product.images[0]} alt="" />
                  </div>
                  <div className="image2">
                    <div className="image2-1">
                      <img src={product.images[1]} alt="" />
                    </div>
                    <div className="image2-2">
                      <img src={product.images[2]} alt="" />
                    </div>
                  </div>
                  <div className="image3">
                    <div className="image3-1">
                      <img src={product.images[3]} alt="" />
                    </div>
                    <div className="image3-2">
                      <img src={product.images[4]} alt="" />
                    </div>
                  </div>
                  <div className="image4">
                    <img src={product.images[5]} alt="" />
                  </div>
                  <div className="image5">
                    <img src={product.images[6]} alt="" />
                  </div>
                </div>
              </div>
              <div className="detail-content">
                <div className="content-name">
                  <h3>{product.name}</h3>
                </div>
                <div className="content-description">
                  <span>{product.category}</span>
                </div>
                <div className="content-price">
                  <span className="price">{formatPrice(product.price)} đ</span>
                  {product.oldPrice && (
                    <span className="price-old">
                      {formatPrice(product.oldPrice)} đ
                    </span>
                  )}
                </div>
                <div className="content-rating">
                  <div className="rating-icon">
                    <div className="icon-star">
                      {renderStars(product.rating)}
                    </div>
                    <div className="icon-star-number">
                      <span>{product.rating} </span>
                    </div>
                  </div>
                  <div className="rating-evaluate">
                    <span> {product.reviewCount} lượt đánh giá</span>
                  </div>
                </div>
                <div className="content-quantity">
                  <span>Số lượng trong kho : </span>
                  <span className="quantity-number">{product.stock}</span>
                </div>
                <div className="content-view">
                  <span>Lượt xem: 300</span>
                  <span className="view1"> Sản phẩm đã bán: 500</span>
                </div>
                <div className="content-color">
                  <span>Chọn màu sắc</span>
                  <div className="color-options">
                    {product.colors.map((color) => (
                      <div
                        key={color.code}
                        className={`color-option ${
                          selectedColor === color.code ? "active" : ""
                        }`}
                        style={{ backgroundColor: color.code }}
                        onClick={() => setSelectedColor(color.code)}
                      ></div>
                    ))}
                        </div>
                    </div>
                    <div className="content-input-quantity">
                        <span>Chọn số lượng</span>
                        <div className="input-options">
                        <button 
                            className="quantity-input-" 
                            onClick={() => handleQuantityChange(-1)}
                            disabled={quantity <= 1}
                            > -
                        </button>
                            <input type="text"   value={quantity} 
                      readOnly  className="quantity-inputt" />
                        <button 
                            className="quantity-btn increase" 
                            onClick={() => handleQuantityChange(1)}
                            > +
                        </button>
                        </div>
                    </div>
                    <div className="content-button">
                        <button className="button-add-cart">Thêm vào giỏ</button>
                        <div className="button-icon-i">
                          <div className="icon-img">
                              <img src="/images/detail/heart.svg" alt="" />
                          </div>
                             <div className="icon-img">
                              <img src="/images/detail/share.svg" alt="" />
                          </div>
                            
                        </div>

                    </div>
            </div>
        </div>
    </div>
    </section>

          <section className="detail-decriptionn">
            <div className="container">
            <div className="detail-decription-evaluate">
              <div className="description-avalute-title">
                <div className="tabs-header">
                  <button
                    className={`tab-btn ${
                      activeTab === "description" ? "active" : ""
                    }`}
                    onClick={() => setActiveTab("description")}
                  >
                    Mô tả
                  </button>
                  <button
                    className={`tab-btn ${
                      activeTab === "review" ? "active" : ""
                    }`}
                    onClick={() => setActiveTab("review")}
                  >
                    Đánh giá
                  </button>
                </div>
              </div>
              <div className="description-avalute-content">
                <div className="description-avalute-content-text">
                  <p>
                    Lorem ipsum dolor sit amet consectetur. Non imperdiet
                    quisque quam sed semper nec semper. Ipsum mattis accumsan
                    natoque dictum et enim. Aliquam scelerisque at fames cras.{" "}
                    <br />
                    <br />
                    Et sollicitudin gravida bibendum tellus pulvinar elementum
                    egestas eu enim. Arcu tincidunt est nibh quisque. Nec
                    aliquam turpis in etiam. Morbi augue lectus maecenas enim
                    orci cursus quam ac. Id eget turpis sit sit etiam arcu ipsum
                    commodo id.
                  </p>
                </div>
                <div className="description-avalute-content-size">
                  <button className="color-info">
                    <span>Màu sắc </span>
                    <span>Đỏ, Trắng</span>
                  </button>
                  <button className="color-info">
                    <span>Màu sắc </span>
                    <span>Đỏ, Trắng</span>
                  </button>
                  <button className="color-info">
                    <span>Màu sắc </span>
                    <span>Đỏ, Trắng</span>
                  </button>
                  <button className="color-info">
                    <span>Màu sắc </span>
                    <span>Đỏ, Trắng</span>
                  </button>
                  <button className="color-info">
                    <span>Màu sắc </span>
                    <span>Đỏ, Trắng</span>
                  </button>
                  <button className="color-info">
                    <span>Màu sắc </span>
                    <span>Đỏ, Trắng</span>
                  </button>
                </div>
              </div>
            </div>
            </div>
          </section>

              <section className="detail-banner-slider">
                <div className="container">
               <div className="detail-banner">
                        <img src="/images/detail/banner-detail.jpg" alt="" />
                </div>
            </div>
              </section>


            <PolicyProduct />
         
                {/* boxsanpham */}
      <section className="boxProducts">
       
      <div className="container">
        <section className="section-box-products">
               <h5>Các sản phẩm tương tự</h5>
          <div className="box-products-container">
            {relatedProducts.map((product) => (
              <ListProduct key={product.id} product={product} slug={product.slug} />
            ))}

          </div>
        </section>
      </div>
      </section>


      </div>
      <Footer />
    </>
  );
};

export default ProductDetailPage;
