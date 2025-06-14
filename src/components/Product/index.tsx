import React, { useState } from "react";
import { Link } from "react-router-dom";
// import type { ProductProps } from "../../types";

interface ProductProps {
  id: number;
  name: string;
  price: number;
  image: string;
  isNew?: boolean;
  isSale?: boolean;
  created_at?: string;
  priceSale?: number;
  slug: string;
  isWishlist?: boolean;
  category?: { id: number; name: string };
  specifications?: { name: string; label: string; value: string }[];
  relatedProducts?: ProductProps[];
  description?: string;
  colors?: {
    colorId: number;
    colorName: string;
    colorHex: string;
    image: string;
    slug: string;
    colorPriority?: number;
  }[];
}

const ProductComponent = ({
  product,
}: {
  product: ProductProps;
  slug: string;
}) => {
  const [wishlist, setWishlist] = useState<boolean>(
    product.isWishlist || false
  );

  const toggleWishlist = () => {
    setWishlist(!wishlist);
    // Có thể gọi API để lưu trạng thái wishlist ở backend
  };

  const getDiscountPercent = (price: number, priceSale?: number): number => {
    if (!priceSale || priceSale >= price) return 0;
    return Math.round(((price - priceSale) / price) * 100);
  };

  const formatPrice = (price?: number) => {
    if (typeof price !== "number") return "";
    const formatted = price.toLocaleString("vi-VN", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    });
    return formatted;
  };

  const isProductNew = product.isNew || false;
  const discountPercent = getDiscountPercent(product.price, product.priceSale);
  const showNewLabel = isProductNew;
  const showDiscountLabel = discountPercent > 0;

  return (
    <>
      <div className="box-products-frame">
        <div className="products-frame-news">
          <div className="news-t">
            {showNewLabel && <span className="news-tt">Mới</span>}
            {showDiscountLabel && (
              <span className="news-tt-1">Giảm {discountPercent}% </span>
            )}
          </div>
          <div className="news-icon" onClick={toggleWishlist}>
            <img
              src={
                wishlist
                  ? "/images/products/heart-red.svg"
                  : "/images/products/heart.svg"
              }
              alt=""
              style={{ width: "20px", height: "20px" }}
            />
          </div>
        </div>
        <div className="products-frame-image">
          <Link to={`/san-pham/${product.slug}`}>
            <img src={product.image} alt="" />
          </Link>
        </div>
        <div className="products-frame-name">
          <span>{product.name}</span>
        </div>
        <div className="products-frame-description">
          <span>{product.category?.name}</span>
        </div>
        <div className="products-frame-color">
          <div className="color-name">Màu</div>
          <div className="color-section">
            {product.colors?.slice(0, 3).map((color, index) => (
              <span
                key={index}
                style={{ backgroundColor: color.colorHex }}
                className={`color-${index + 1}`}
              ></span>
            ))}
            {product.colors && product.colors.length > 3 && (
              <span className="color-more">+{product.colors.length - 3}</span>
            )}
          </div>
        </div>
        <div className="products-frame-cart">
          <div className="cart-price">
            {product.priceSale && product.priceSale < product.price ? (
              <>
                <span className="price1">
                  <del>{formatPrice(product.price)} </del>
                  <span className="unit">đ</span>
                </span>
                <span className="price2">
                  {formatPrice(product.priceSale)}{" "}
                  <span className="unit">đ</span>
                </span>
              </>
            ) : (
              <span className="price2">
                {formatPrice(product.price)} <span className="unit">đ</span>
              </span>
            )}
          </div>

          <div className="cart-button">
            <Link to={`cart/${product.slug}`}>
              {" "}
              <button>Mua ngay</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductComponent;
