import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Filter from "../../components/filter";
import Seemore from "../../components/seemore";
import CategorySlider from "../../components/CategorySlider";
import ProductComponent from "../../components/Product";
import {
  fetchCategoryBySlug,
  fetchProductsByCategory,
} from "../../services/categoryService";
import type { Product } from "../../types";
import { formatProductForDisplay } from "../../services/productService";

const ProductOfCategory = () => {
  const { slug } = useParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        if (!slug) return;

        // 1. Lấy category từ slug
        const category = await fetchCategoryBySlug(slug);
        if (!category) {
          setError("Không tìm thấy danh mục");
          return;
        }

        // 2. Gọi API lấy sản phẩm theo category_id
        const result = await fetchProductsByCategory(category.category_id, {
          page: 1,
          pageSize: 12,
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

  return (
    <>
      <Header />
      <div className="product-of-category">
        {/* Banner Section */}
        <section className="category-banner">
          <div className="container-fluid">
            <div className="banner-image">
              <img
                src="/images/productsCategory/banner-chair.jpg"
                alt="Sản phẩm trong danh mục Ghế - Các loại ghế hiện đại"
              />
              <div className="banner-content">
                {/* <div className="breadcrumb">
                  <span>Trang chủ / </span>
                  <span className="active">Ghế</span>
                </div> */}
                <h1>Sản phẩm trong danh mục Ghế</h1>
              </div>
            </div>
          </div>
        </section>

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
        <Seemore />

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
