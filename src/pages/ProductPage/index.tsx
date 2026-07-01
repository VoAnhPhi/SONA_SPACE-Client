"use client";
import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";

// Component
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Filter from "../../components/Filter";
import ProductComponent from "../../components/Product";
import PolicyProduct from "../../components/Policy";
import GetInTouch from "../../components/GetInTouch";
import PopularCategory from "../../components/PopularCategory";
import Seemore from "../../components/seemore";
import BannerSlider from "../../components/BannerSlider";
import {
  EmptyState,
  InlineErrorState,
  PageSectionSkeleton,
  RetryState,
} from "../../components/StateFeedback";

// Type
import type { Product } from "../../types";

// Service or API
import { fetchAllProducts } from "../../services/productService";

const DEFAULT_FILTER_LABELS = [
  "Chọn danh mục",
  "Chọn phòng",
  "Chọn giá",
  "Chọn màu",
  "Sắp xếp",
];

const ProductPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState<{ [key: string]: string }>({});
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);

  const fetchProducts = async (
    pageNumber: number,
    currentFilters = {},
    isLoadMore = false
  ) => {
    if (isLoadMore) {
      setIsLoadingMore(true);
    } else {
      setLoading(true);
    }
    setError(null);

    try {
      const { products: newProducts, totalPages } = await fetchAllProducts(
        pageNumber,
        8,
        currentFilters
      );

      if (isLoadMore) {
        setProducts((prevProducts) => [...prevProducts, ...newProducts]);
      } else {
        setProducts(newProducts);
      }

      setTotalPages(totalPages);
    } catch (err) {
      console.error("Error fetching products:", err);
      setError("Không thể tải danh sách sản phẩm.");
    } finally {
      setLoading(false);
      setIsLoadingMore(false);
    }
  };

  useEffect(() => {
    const pageParam = parseInt(searchParams.get("page") || "1", 10);
    setPage(pageParam);

    const urlFilters: { [key: string]: string } = {};
    const category = searchParams.get("category");
    const room = searchParams.get("room");
    const price = searchParams.get("price");
    const color = searchParams.get("color");
    const sort = searchParams.get("sort");

    if (category && category !== "Chọn danh mục")
      urlFilters.category = category;
    if (room && room !== "Chọn phòng") urlFilters.room = room;
    if (price && price !== "Chọn giá") urlFilters.price = price;
    if (color && color !== "Chọn màu") urlFilters.color = color;
    if (sort && sort !== "Sắp xếp") urlFilters.sort = sort;

    setFilters(urlFilters);
    fetchProducts(pageParam, urlFilters, false);
  }, []);

  useEffect(() => {
    const params: { [key: string]: string } = {};

    if (page > 1) {
      params.page = page.toString();
    }

    Object.entries(filters).forEach(([key, value]) => {
      if (value && !DEFAULT_FILTER_LABELS.includes(value)) {
        params[key] = value;
      }
    });

    if (Object.keys(params).length > 0) {
      setSearchParams(new URLSearchParams(params));
    } else {
      setSearchParams({});
    }
  }, [page, filters, setSearchParams]);

  const handleFilterChange = (newFilters: { [key: string]: string }) => {
    setPage(1);
    setFilters(newFilters);
    fetchProducts(1, newFilters, false);
  };

  const handleSeeMore = () => {
    if (page < totalPages) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchProducts(nextPage, filters, true);
    }
  };

  return (
    <>
      <Header />
      <BannerSlider page="san-pham" />
      <div className="breadcrumb-container">
        <div className="container">
          <div className="breadcrumb">
            <Link to="/">Trang chủ</Link>
            <span>/</span>
            <span className="active">Sản phẩm</span>
          </div>
        </div>
      </div>

      <section className="product-section mt-94">
        <PopularCategory />
      </section>

      <section className="product-section mt-94">
        <Filter onFilterChange={handleFilterChange} />
        <div className="boxProducts">
          <div className="container">
            <div className="section-box-products">
              {loading && <PageSectionSkeleton count={8} />}
              {!loading && error && (
                <RetryState
                  message={error}
                  onRetry={() => fetchProducts(page, filters, false)}
                  secondaryActionLabel="Về trang chủ"
                  secondaryActionTo="/"
                />
              )}
              {!loading && !error && products.length === 0 && (
                <EmptyState
                  title="Không có sản phẩm phù hợp"
                  message="Hãy thử đổi bộ lọc hoặc quay lại danh sách sản phẩm đầy đủ."
                  actionLabel="Xóa bộ lọc"
                  onAction={() => handleFilterChange({})}
                  secondaryActionLabel="Về trang chủ"
                  secondaryActionTo="/"
                />
              )}
              {!loading && !error && products.length > 0 && (
                <div className="box-products-container">
                  {products.map((product) => (
                    <ProductComponent
                      key={product.id}
                      product={product}
                      slug={product.slug}
                    />
                  ))}
                </div>
              )}
              {isLoadingMore && (
                <InlineErrorState message="Đang tải thêm sản phẩm..." />
              )}
              {!loading && !error && !isLoadingMore && page < totalPages && (
                <Seemore onClick={handleSeeMore} />
              )}
            </div>
          </div>
        </div>
      </section>
      <section className="policy-product mt-94">
        <PolicyProduct />
      </section>
      <section className="get-in-touch mt-94">
        <GetInTouch />
      </section>
      <Footer />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        style={{ marginTop: "100px" }}
      />
    </>
  );
};

export default ProductPage;
