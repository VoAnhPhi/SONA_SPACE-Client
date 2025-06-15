"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Filter from "../../components/Filter";
import ProductComponent from "../../components/Product";
import PolicyProduct from "../../components/Policy";
import GetInTouch from "../../components/GetInTouch";
import PopularCategory from "../../components/PopularCategory";
import Seemore from "../../components/SeeMore";
import {
  fetchAllProducts,
  formatProductForDisplay,
} from "../../services/productService";

import type { Product } from "../../types";

const ProductPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const formattedProducts = await fetchAllProducts(); // đã format xong
        console.log("Fetched products:", formattedProducts);
        setProducts(formattedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
        setProducts([]);

        setError("Không thể tải danh sách sản phẩm.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <>
      <Header />

      {/* Debug Preview */}
      {/* <pre>{JSON.stringify(products, null, 2)}</pre> */}

      {/* Banner */}
      <div className="banner-slider">
        <div className="header-banner">
          <img src="images/products/banner-slider.jpg" alt="" />
        </div>
        <div className="header-text">
          <div className="text1">Chào mừng đến với</div>
          <div className="text2">Bộ sưu tập nội thất của chúng tôi</div>
          <div className="text3">
            Khám phá nhiều loại đồ nội thất chất lượng cao của chúng tôi.
          </div>
        </div>
      </div>

      {/* Product section ( all products) */}

      <PopularCategory />
      <section className="product-section">
        <Filter />
        <div className="boxProducts">
          <div className="container">
            <div className="section-box-products">
              <div className="box-products-container">
                {products.map((product) => (
                  <ProductComponent
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
      <PolicyProduct />
      <GetInTouch />
      <Footer />
    </>
  );
};

export default ProductPage;
