import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getFeaturedCategories, formatCategoryForDisplay } from "../../services/categoryService";
import type { Category } from "../../types";

export const PopularCategory = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        setLoading(true);
        // console.log("PopularCategory: Fetching featured categories");
        const data = await getFeaturedCategories(6); // Lấy 6 danh mục nổi bật
        // console.log("PopularCategory: Received categories:", data);
        setCategories(data);
        setError(null);
      } catch (err) {
        console.error("Error loading featured categories:", err);
        setError("Không thể tải danh mục sản phẩm");
        // Sử dụng dữ liệu mặc định nếu API lỗi
        // setCategories(defaultCategories);
      } finally {
        setLoading(false);
      }
    };

    loadCategories();
  }, []);

  if (loading) {
    return (
      <div className="popular-category-loading">
        <div className="loading-spinner"></div>
        <p>Đang tải danh mục sản phẩm...</p>
      </div>
    );
  }

  // Chia danh mục thành 2 nhóm: 2 danh mục đầu và các danh mục còn lại
  const topCategories = categories.slice(0, 2);
  const remainingCategories = categories.slice(2);

  return (
    <section className="PopularCategory-full">
      <div className="container">
        <div className="category-of-products">
          <div className="category-of-products-s1">
            <div className="products-s1-frame-1">
              <div className="frame-1-text">
                <a className="frame-1-text1">Các danh mục sản phẩm phổ biến nhất</a>
                <a className="frame-1-text2">
                  Khám phá những danh mục sản phẩm được ưa chuộng và lựa chọn nhiều nhất hiện nay
                </a>
              </div>
            </div>

            {topCategories.map((category) => {
              const formattedCategory = formatCategoryForDisplay(category);
              return (
                <div className="products-s1-frame-2" key={formattedCategory.id}>
                  <img 
                    src={formattedCategory.image} 
                    alt={formattedCategory.name}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.onerror = null;
                      target.src = "/images/placeholder.jpg";
                    }}
                  />
                  <div className="frame-2-t">
                    <h3>{formattedCategory.name}</h3>
                    <Link className="btn btn-primary" to={`/danh-muc/${formattedCategory.slug}`}>
                      Xem Sản Phẩm
                      <i className="icon">
                        <svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M13.9128 4L9.8048 1M13.9128 4L9.8048 7M13.9128 4H1.12402"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </i>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="category-of-products-s2">
            {remainingCategories.map((category) => {
              const formattedCategory = formatCategoryForDisplay(category);
              return (
                <div className="products-s2-frame-1" key={formattedCategory.id}>
                  <img 
                    src={formattedCategory.image} 
                    alt={formattedCategory.name}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.onerror = null;
                      target.src = "/images/placeholder.jpg";
                    }}
                  />
                  <div className="frame-2-t">
                    <h3>{formattedCategory.name}</h3>
                    <Link className="btn btn-cate" to={`/danh-muc/${formattedCategory.slug}`}>
                      Xem Sản Phẩm
                      <i className="icon">
                        <svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M13.9128 4L9.8048 1M13.9128 4L9.8048 7M13.9128 4H1.12402"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </i>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PopularCategory;

