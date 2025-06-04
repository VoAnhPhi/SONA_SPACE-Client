import React, { useState } from "react";

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
const ListProduct = ({ product }: { product: ProductProps }) => {
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
        price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

    const isProductNew = isNew(product.createdAt);
    const discountPercent = getDiscountPercent(product.price, product.priceSale);
    const showNewLabel = isProductNew;
    const showDiscountLabel = discountPercent > 0;

  return (
    <>
                  {/* Products Grid */}

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
                        <div className="news-icon">
                            <img src="/images/products/heart.svg" alt="" />
                        </div>
                    </div>
                    <div className="products-frame-image">
                        <img src={product.image}  alt="" />
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
                            <span  className="color-1" style={{ backgroundColor: product.colors[0] }}></span>
                            <span  className="color-2" style={{ backgroundColor: product.colors[1] }}></span>
                            <span  className="color-3" style={{ backgroundColor: product.colors[2] }}></span>

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
    <span className="price2">{formatPrice(product.price)} <span className="unit">đ</span></span>
  )}
</div>
                        <div className="cart-button">
                            <button>Mua ngay</button>
                        </div>
                    </div>
                </div>
                         
    </>
  );
};

export default ListProduct;
