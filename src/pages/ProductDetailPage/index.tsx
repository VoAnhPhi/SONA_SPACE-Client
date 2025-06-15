"use client";
// Import necessary libraries
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

// import components
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import PolicyProduct from "../../components/Policy";
import ListProduct from "../../components/Product";

// import API
import { getProductBySlug } from "../../api/product";

// import types
import type { Product, Variant } from "../../types";
import Comment from "../../components/Comment";

const ProductDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<string>("description");
  const selectedVariant = product?.variants?.find(
    (variant: any) => variant.color_hex === selectedColor
  );

  const imageList = selectedVariant?.listImage?.split(",") || [];

  useEffect(() => {
    if (slug) {
      (async () => {
        try {
          const res = await getProductBySlug(slug);

          // Chuẩn hóa lại data product và variants từ API
          const productData = {
            ...res.product,
            variants: (res.variants || []).map((v: any) => ({
              variant_id: v.variantId,
              color_id: v.colorId,
              color_name: v.colorName,
              color_hex: v.colorHex,
              color_priority: v.colorPriority,
              variant_price: Number(v.price),
              variant_price_sale: Number(v.priceSale),
              quantity: v.quantity,
              variant_slug: v.slug,
              listImage: v.listImage,
            })),
          };

          // Sắp xếp variants theo color_priority ASC (ưu tiên 1 lên đầu)
          productData.variants = productData.variants.sort(
            (a: any, b: any) =>
              (a.color_priority ?? 99) - (b.color_priority ?? 99)
          );

          setProduct(productData);
          setRelatedProducts(res.relatedProducts || []);

          // Ưu tiên chọn biến thể có color_priority = 1
          const defaultVariant = productData.variants?.[0];
          setSelectedColor(defaultVariant?.color_hex || "#000");
        } catch (error) {
          console.error("Lỗi khi lấy sản phẩm:", error);
        }
      })();
    }
  }, [slug]);

  const formatPrice = (price?: number): string => {
    if (typeof price !== "number" || isNaN(price)) return "0";
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const handleQuantityChange = (amount: number) => {
    const newQuantity = quantity + amount;
    if (newQuantity > 0) setQuantity(newQuantity);
  };

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= Math.floor(rating)) {
        stars.push(<img key={i} src="/images/detail/star.svg" alt="" />);
      } else if (i - 0.5 === rating) {
        stars.push(
          <img key={i} src="/images/detail/star-half-filled.svg" alt="" />
        );
      } else {
        stars.push(<img key={i} src="/images/detail/star-filled.svg" alt="" />);
      }
    }
    return stars;
  };

  if (!product) return <p className="text-center">Đang tải sản phẩm...</p>;

  return (
    <>
      <Header />
      <div className="product-details">
        <div className="detail-page-link">
          <div className="container">
            <div className="detail-link">
              <span className="link1">Sản phẩm | </span>
              <span className="link2">{product.name}</span>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="detail-products">
            <div className="detail-image">
              <div className="image-full">
                <div className="image1">
                  <img
                    src={imageList[0]?.trim() || "/images/placeholder.jpg"}
                    alt=""
                  />
                </div>
                <div className="image2">
                  <div className="image2-1">
                    <img
                      src={imageList[1]?.trim() || "/images/placeholder.jpg"}
                      alt=""
                    />
                  </div>
                  <div className="image2-2">
                    <img
                      src={imageList[2]?.trim() || "/images/placeholder.jpg"}
                      alt=""
                    />
                  </div>
                </div>
                <div className="image3">
                  <div className="image3-1">
                    <img
                      src={imageList[3]?.trim() || "/images/placeholder.jpg"}
                      alt=""
                    />
                  </div>
                  <div className="image3-2">
                    <img
                      src={imageList[4]?.trim() || "/images/placeholder.jpg"}
                      alt=""
                    />
                  </div>
                </div>
                <div className="image4">
                  <img
                    src={imageList[5]?.trim() || "/images/placeholder.jpg"}
                    alt=""
                  />
                </div>
                <div className="image5">
                  <img
                    src={imageList[6]?.trim() || "/images/placeholder.jpg"}
                    alt=""
                  />
                </div>
              </div>
            </div>
            <div className="detail-content">
              <div className="content-name">
                <h3>{product.name}</h3>
              </div>
              <div className="content-description">
                <span>
                  {product.category?.name || "Danh mục không xác định"}
                </span>
              </div>
              <div className="content-price">
                <span className="price">
                  {formatPrice(selectedVariant?.variant_price || product.price)}{" "}
                  đ
                </span>
                {selectedVariant?.variant_price_sale && (
                  <span className="price-old">
                    {formatPrice(selectedVariant?.variant_price_sale)} đ
                  </span>
                )}
              </div>
              <div className="content-rating">
                {/* <div className="rating-icon">
                  <div className="icon-star">{renderStars(product.rating)}</div>
                  <div className="icon-star-number">
                    <span>{product.rating} </span>
                  </div>

                </div> */}
                <div className="rating-evaluate">
                  <span> 80 lượt đánh giá</span>
                </div>
              </div>
              <div className="content-quantity">
                <span>Số lượng trong kho : {product.stock}</span>
                <span className="quantity-number">{product.quantity}</span>
              </div>
              <div className="content-view">
                <span>Lượt xem: {product.view}</span>
                <span className="view1"> Sản phẩm đã bán: {product.sold}</span>
              </div>
              <div className="content-color">
                <span>Chọn màu sắc</span>
                <div className="color-options">
                  {product.variants?.map((v: any) => (
                    <div
                      key={v.color_id}
                      style={{ backgroundColor: v.color_hex }}
                      className={`color-option ${
                        selectedColor === v.color_hex ? "active" : ""
                      }`}
                      onClick={() => setSelectedColor(v.color_hex)}
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
                  >
                    {" "}
                    <img src="/images/detail/tru.svg" alt="" />
                  </button>
                  <input
                    type="text"
                    value={quantity}
                    readOnly
                    className="quantity-inputt"
                  />
                  <button
                    className="quantity-btn increase"
                    onClick={() => handleQuantityChange(1)}
                  >
                    {" "}
                    <img src="/images/detail/cong.svg" alt="" />
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

        <div className="detail-decriptionn">
          <div className="container">
            <div className="detail-decription-evaluate">
              <div className="description-avalute-title">
              <div className="tabs-header">
                  <button
                    className={`tab-btn ${activeTab === 'description' ? 'active' : ''}`}
                    onClick={() => setActiveTab('description')}
                  >
                    Mô tả
                  </button>
                  <button
                    className={`tab-btn ${activeTab === 'review' ? 'active' : ''}`}
                    onClick={() => setActiveTab('review')}
                  >
                    Đánh giá
                  </button>
                </div>
              </div>
              {activeTab === 'description' && (
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

              )}
              {activeTab === "review" && <Comment />}
            </div>
          </div>
        </div>

        <div className="detail-banner-slider">
          <div className="container">
            <div className="detail-banner">
              <img
                src={imageList[6]?.trim() || "/images/placeholder.jpg"}
                alt=""
              />
            </div>
          </div>
        </div>

        <PolicyProduct />

        {/* boxsanpham */}
        <div className="boxProducts">
          <div className="container">
            <div className="section-box-products">
              <h5>Các sản phẩm tương tự</h5>
              <div className="box-products-container">
                {relatedProducts.map((product) => (
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
      </div>
      <Footer />
    </>
  );
};

export default ProductDetailPage;
