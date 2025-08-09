"use client";
import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

// Component
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Filter from "../../components/Filter";
import ProductComponent from "../../components/Product";
import PolicyProduct from "../../components/Policy";
import GetInTouch from "../../components/GetInTouch";
import PopularCategory from "../../components/PopularCategory";
import Seemore from "../../components/seemore";
import { toast, ToastContainer } from "react-toastify";

// Type
import type { Product } from "../../types";

// Service or API
import { fetchAllProducts } from "../../services/productService";
import BannerSlider from "../../components/BannerSlider";

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

    try {
      const { products: newProducts, totalPages } = await fetchAllProducts(
        pageNumber,
        8,
        currentFilters
      );

      if (isLoadMore) {
        // Thêm sản phẩm mới vào danh sách hiện tại
        setProducts((prevProducts) => [...prevProducts, ...newProducts]);
      } else {
        // Load lại từ đầu (khi thay đổi filter)
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

    // Lấy các tham số lọc từ URL và chỉ lấy các giá trị không rỗng và không phải giá trị mặc định
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
    // Cập nhật URL với các tham số lọc, chỉ thêm các giá trị không rỗng và không phải giá trị mặc định
    const params: { [key: string]: string } = {};

    // Chỉ thêm page vào URL khi page > 1
    if (page > 1) {
      params.page = page.toString();
    }

    Object.entries(filters).forEach(([key, value]) => {
      if (
        value &&
        value !== "Chọn danh mục" &&
        value !== "Chọn phòng" &&
        value !== "Chọn giá" &&
        value !== "Chọn màu" &&
        value !== "Sắp xếp"
      ) {
        params[key] = value;
      }
    });

    // Chỉ set search params khi có tham số thực sự
    if (Object.keys(params).length > 0) {
      setSearchParams(new URLSearchParams(params));
    } else {
      setSearchParams({});
    }
  }, [page, filters]);

  const handleFilterChange = (newFilters: { [key: string]: string }) => {
    setPage(1); // Reset về trang 1 khi thay đổi bộ lọc
    setFilters(newFilters);
    fetchProducts(1, newFilters, false); // Load lại từ đầu khi thay đổi filter
  };

  const handleSeeMore = () => {
    if (page < totalPages) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchProducts(nextPage, filters, true); // Load thêm sản phẩm
    }
  };

  return (
    <>
      <Header />
      <BannerSlider page="san-pham" />
      {/* <div className="banner-slider">
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
      </div> */}
      {/* Breadcrumb */}
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
              {loading && <p className="empty-text">Đang tải sản phẩm...</p>}
              {products.length === 0 && !loading && (
                <p className="empty-text">
                  Không có sản phẩm phù hợp với bộ lọc.
                </p>
              )}
              <div className="box-products-container">
                {!loading &&
                  products.map((product) => (
                    <ProductComponent
                      key={product.id}
                      product={product}
                      slug={product.slug}
                    />
                  ))}
              </div>
              {isLoadingMore && <p>Đang tải thêm sản phẩm...</p>}
              {!loading && !isLoadingMore && page < totalPages && (
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
