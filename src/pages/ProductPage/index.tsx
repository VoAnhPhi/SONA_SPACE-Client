"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

// Component
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Filter from "../../components/Filter";
import ProductComponent from "../../components/Product";
import PolicyProduct from "../../components/Policy";
import GetInTouch from "../../components/GetInTouch";
import PopularCategory from "../../components/PopularCategory";
import Seemore from "../../components/SeeMore";

// Type
import type { Product } from "../../types";

// Service or API
import { fetchAllProducts } from "../../services/productService";

const ProductPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const fetchProducts = async (pageNumber: number) => {
    setLoading(true);
    try {
      const { products: newProducts, totalPages } = await fetchAllProducts(
        pageNumber,
        8
      );
      if (pageNumber === 1) {
        setProducts(newProducts);
      } else {
        setProducts((prev) => [...prev, ...newProducts]);
      }
      setTotalPages(totalPages);
    } catch (err) {
      console.error("Error fetching products:", err);
      setError("Không thể tải danh sách sản phẩm.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const pageParam = parseInt(searchParams.get("page") || "1", 10);
    setPage(pageParam);
    const fetchAll = async () => {
      setLoading(true);
      let allProducts: Product[] = [];
      let totalPages = 1;
      for (let i = 1; i <= pageParam; i++) {
        const { products: newProducts, totalPages: tp } =
          await fetchAllProducts(i, 8);
        allProducts = [...allProducts, ...newProducts];
        totalPages = tp;
      }
      setProducts(allProducts);
      setTotalPages(totalPages);
      setLoading(false);
    };

    fetchAll();
  }, []);

  useEffect(() => {
    setSearchParams({ page: page.toString(), limit: "8" });
    if (page !== parseInt(searchParams.get("page") || "1", 10)) {
      fetchProducts(page);
    }
  }, [page]);

  const handleSeeMore = () => {
    if (page < totalPages) {
      setPage((prev) => prev + 1);
    }
  };

  return (
    <>
      <Header />
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
              {loading && <p>Đang tải thêm sản phẩm...</p>}
              {!loading && page < totalPages && (
                <Seemore onClick={handleSeeMore} />
              )}
            </div>
          </div>
        </div>
      </section>
      <PolicyProduct />
      <GetInTouch />
      <Footer />
    </>
  );
};

export default ProductPage;
