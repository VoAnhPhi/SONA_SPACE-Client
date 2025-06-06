import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

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
  isWishlist?: boolean;
}
const ListProduct = ({ product, slug }: { product: ProductProps, slug: string }) => {
  const [isHeartActive, setIsHeartActive] = useState(false);
  const heartRef = useRef<HTMLImageElement>(null);
  const today = new Date();
  const threeDaysAgo = new Date();
  threeDaysAgo.setDate(today.getDate() - 3);

  const parseDate = (dateStr?: string) => (dateStr ? new Date(dateStr) : new Date(0));

  const isNew = (createdAt?: string) => {
    if (!createdAt) return false;
    const createdDate = parseDate(createdAt);
    return createdDate >= threeDaysAgo && createdDate <= today;
  };


  const getDiscountPercent = (price: number, priceSale?: number): number => {
    if (!priceSale || priceSale >= price) return 0;
    return Math.round(((price - priceSale) / price) * 100);
  };

  const formatPrice = (price: number): string =>
    price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + "đ";

  const isProductNew = isNew(product.createdAt);
  const discountPercent = getDiscountPercent(product.price, product.priceSale);
  const showNewLabel = isProductNew;
  const showDiscountLabel = discountPercent > 0;

  // Initialize heart active state based on wishlist status
  useEffect(() => {
    if (product.isWishlist) {
      setIsHeartActive(true);
    }
  }, [product.isWishlist]);

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    
    // Toggle heart active state with a slight delay for better visual effect
    setIsHeartActive(prev => !prev);
  };

  return (
    <>
      <div className="box-products-frame">
        <div className="products-frame-news" >
          <div className="news-t">
            {showNewLabel && (
              <span className="news-tt">Mới</span>
            )}
            {showDiscountLabel && (
              <span className="news-tt-1">Giảm {discountPercent}%  </span>
            )}
          </div>
          <div className="news-icon" onClick={handleWishlistClick}>
            <img
              ref={heartRef}
              src="/images/products/heart.svg"
              alt=""
              className={isHeartActive ? "heart-icon active" : "heart-icon"}
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
          <span>Sofa</span>
        </div>
        <div className="products-frame-color">
          <div className="color-name">Màu</div>
          <div className="color-section">
            <span className="color-1" style={{ backgroundColor: product.colors[0] }}></span>
            <span className="color-2" style={{ backgroundColor: product.colors[1] }}></span>
            <span className="color-3" style={{ backgroundColor: product.colors[2] }}></span>

          </div>
        </div>
        <div className="products-frame-cart">
          <div className="cart-price">
            {product.priceSale && (
              <span className="price1"><del>{formatPrice(product.price)} </del><span className="unit">đ</span></span>
            )}
            {product.priceSale && (
              <span className="price2">{formatPrice(product.priceSale)}</span>
            )}
            {!product.priceSale && (
              <span className="price2">{formatPrice(product.price)} </span>
            )}
          </div>
          <div className="cart-button">
            <Link to={`/san-pham/${product.slug}`}>
              <button className="button">Mua ngay</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default ListProduct;
