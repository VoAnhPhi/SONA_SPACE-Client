//Product
import React, { useState } from "react";
import { Link } from "react-router-dom";

import type { Product, Variant } from "../../types";

const ProductComponent = ({ product }: { product: Product; slug: string }) => {
  const [wishlist, setWishlist] = useState<boolean>(
    product.isWishlist || false
  );
  const [hoveredColor, setHoveredColor] = useState<string | null>(null);

  const toggleWishlist = () => {
    setWishlist(!wishlist);
    // Có thể gọi API để lưu trạng thái wishlist ở backend
  };

  const today = new Date();
  const threeDaysAgo = new Date();
  threeDaysAgo.setDate(today.getDate() - 3);
  const price = Number(product.price); // "8000000.00" -> 8000000
  const priceSale =
    product.priceSale !== undefined ? Number(product.priceSale) : undefined;
  const hasValidSale =
    priceSale !== undefined && priceSale > 1000 && priceSale < price;

  const parseDate = (dateStr?: string) =>
    dateStr ? new Date(dateStr) : new Date(0);

  const isNew = (createdAt?: string) => {
    if (!createdAt) return false;
    const createdDate = parseDate(createdAt);
    return createdDate >= threeDaysAgo && createdDate <= today;
  };

  const getDiscountPercent = (
    price: number,
    priceSale?: number
  ): number => {
    if (priceSale === undefined) return 0;
    if (priceSale <= 1000 || priceSale >= price) return 0; // giá sale quá nhỏ hoặc không hợp lệ
    return Math.round(((price - priceSale) / price) * 100);
  };

  const formatPrice = (price: number): string => {
    const rounded = Math.round(price); // bỏ phần thập phân nếu có
    return rounded.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  // Tìm tên màu dựa vào mã hex
  const findColorName = (hexColor: string): string => {
    if (!product.variants) return "";
    
    const variant = product.variants.find((v) => 
      v.color_hex && v.color_hex.toLowerCase() === hexColor.toLowerCase());
    
    return variant?.color_name || "";
  };

  const isProductNew = isNew(product.created_at);
  const discountPercent = getDiscountPercent(
    product.price ?? 0,
    product.priceSale
  );
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
                  ? "/images/products/heart-red.svg" // hình trái tim đỏ
                  : "/images/products/heart.svg" // trái tim màu thường
              }
              alt=""
              style={{ width: "20px", height: "20px" }}
            />
          </div>
        </div>
        <div className="products-frame-image">
          <Link to={`/san-pham/${product.slug}`}>
            <img src={product.image} alt={product.name} />
          </Link>
        </div>
        <div className="products-frame-name">
          <span>{product.name}</span>
        </div>
        <div className="products-frame-description">
          <span>{product.category?.name}</span>
        </div>
        <div className="products-frame-color">
          <div className="color-name">
            Màu {hoveredColor && <span style={{ fontSize: '14px', color: '#666', fontStyle: 'italic', marginLeft: '4px' }}>: {hoveredColor}</span>}
          </div>
          <div className="color-section">
            {product.colors?.map((color, index) => {
              const colorName = findColorName(color);
              return (
                <span
                  key={index}
                  className={`color-${index + 1}`}
                  style={{ 
                    backgroundColor: color,
                    cursor: 'pointer',
                    position: 'relative',
                    border: '1px solid #ccc'
                  }}
                  onMouseEnter={() => setHoveredColor(colorName)}
                  onMouseLeave={() => setHoveredColor(null)}
                  title={colorName}
                ></span>
              );
            })}
          </div>
        </div>
        <div className="products-frame-cart">
          <div className="cart-price">
            <div className="cart-price">
              {hasValidSale ? (
                <>
                  <span className="price1">
                    <del>{formatPrice(price)}</del>
                    <span className="unit"> đ</span>
                  </span>
                  <span className="price2">{formatPrice(priceSale!)} đ</span>
                </>
              ) : (
                <span className="price2">
                  {formatPrice(price)} <span className="unit">đ</span>
                </span>
              )}
            </div>
          </div>
          <div className="cart-button">
            <Link to={`/san-pham/${product.slug}`}>
              {" "}
              <button>Xem chi tiết</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductComponent;
