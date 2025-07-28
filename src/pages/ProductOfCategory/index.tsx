import { useEffect, useState } from "react";
import { Link, redirect, useNavigate, useParams } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Filter from "../../components/Filter";
import Seemore from "../../components/SeeMore";
import CategorySlider from "../../components/CategorySlider";
import ProductComponent from "../../components/Product";
import {
  fetchCategoryBySlug,
  fetchProductsByCategory,
} from "../../services/categoryService";
import type { Category, Product } from "../../types";
import { formatProductForDisplay } from "../../services/productService";
import { useSearchParams } from "react-router-dom";

const ProductOfCategory = () => {
  const { slug } = useParams();
  const [category, setCategory] = useState<Category | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const handleSeeMore = () => {
    const page = parseInt(searchParams.get("page") || "1", 10);
    setSearchParams({ page: (page + 1).toString() });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        if (!slug) return;

        // 1. Lấy category từ slug
        const categoryData = await fetchCategoryBySlug(slug);
        setCategory(categoryData);
        if (!categoryData) {
          navigate("/not-found");
        }

        // 2. Gọi API lấy sản phẩm theo slug
        const result = await fetchProductsByCategory(slug, {
          page: 1,
          pageSize: 8,
          sort: "created_at",
        });

        if (result?.items) {
          setProducts(result.items.map(formatProductForDisplay));
        }
      } catch (err) {
        console.error("Lỗi lấy sản phẩm theo danh mục:", err);
        setError("Đã xảy ra lỗi khi tải dữ liệu.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [slug]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    navigate("/not-found");
  }

  return (
    <>
      <Header />
      <div className="product-of-category">
        {/* Banner Section */}
        <div className="category-banner">
          <div className="container-fluid">
            <div className="banner-image">
              <img
                src={category?.category_banner}
                alt="Sản phẩm trong danh mục Ghế - Các loại ghế hiện đại"
              />
              <div className="banner-content">
                <h1>{category?.category_name}</h1>
              </div>
            </div>
          </div>
        </div>

        <div className="breadcrumb-container">
          <div className="container">
            <div className="breadcrumb">
              <Link to="/">Trang chủ</Link>
              <span>/</span>
              <Link to="/san-pham">Sản phẩm</Link>
              <span>/</span>
              <span className="active">{category?.category_name}</span>
            </div>
          </div>
        </div>

        <section className="product-listing">
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
        <Seemore onClick={handleSeeMore} />

        <section className="product-categories">
          <div className="container">
            <h2 className="section-title">Danh Mục Sản Phẩm</h2>

            <CategorySlider />
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default ProductOfCategory;
