import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ProductComponent from "../../components/Product";
import { loadWishlistService1 } from "../../services/wishlistService";
import { fetchWishlistFromDatabase1 } from "../../services/wishlistService";
import type { Product } from "../../types";
import PolicyProduct from "../../components/Policy";

const Wishlist: React.FC = () => {
  const [wishlistProducts, setWishlistProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [wishlistVariantIds, setWishlistVariantIds] = useState<number[]>([]);


  useEffect(() => {
    const loadWishlist = async () => {
      try {
        const data = await fetchWishlistFromDatabase1();
        const ids = data.map((item: any) => item.variant_id); // đảm bảo item có `variant_id`
        setWishlistVariantIds(ids);
      } catch (err) {
        console.warn("Không thể load wishlist:", err);
      }
    };

    loadWishlist();
  }, []);


  useEffect(() => {
    const fetchWishlist = async () => {
      const res = await loadWishlistService1();
      // console.log("Wishlist data:", res);
      if (res.success) {
        setWishlistProducts(res.wishlistItems);
      } else {
        console.error("Lỗi khi tải wishlist:", res.message);
      }
      setLoading(false);
    };

    fetchWishlist();
  }, []);

  const removeFromWishlist = (productId: number) => {
    setWishlistProducts((prev) => prev.filter((product) => product.id !== productId));
  };

  const formatPrice = (price: number): string => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  return (
    <>
      <Header />
      <div className="wishlist-pages">
        {/* Breadcrumb */}
        <div className="breadcrumb-container">
          <div className="container">
            <div className="breadcrumb">
              <Link to="/san-pham">Sản phẩm</Link>
              <span>/</span>
              <span className="active">Yêu thích</span>
            </div>
          </div>
        </div>

        {/* Wishlist Content */}
        <section className="wishlist-content">
          {loading ? (
            <p>Đang tải danh sách yêu thích...</p>
          ) : wishlistProducts.length > 0 ? (
            <>
              <div className="wishlist-title">
                <h4>Sản Phẩm Yêu Thích - Lưu giữ những món đồ bạn ấn tượng</h4>
                <p>
                  Lưu lại những sản phẩm bạn yêu thích để dễ dàng tìm lại và mua sắm
                  khi bạn sẵn sàng,
                  <br />
                  giúp việc mua sắm trở nên tiện lợi và nhanh chóng hơn bao giờ hết.
                </p>
              </div>

              <section className="boxProducts">
                <div className="container">
                  <section className="section-box-products">
                    <div className="box-products-container">
                      {wishlistProducts.map((product) => (
                        <ProductComponent
                          key={product.id}
                          product={product}
                          slug={product.slug}
                        />
                      ))}
                    </div>
                  </section>
                </div>
              </section>
            </>
          ) : (
            <div className="empty-wishlist">
              <div className="wishlist-title">
                <h4>Danh sách yêu thích của bạn đang trống</h4>
                <p>
                  Hãy thêm sản phẩm vào danh sách yêu thích để dễ dàng theo dõi
                  và mua sắm sau này.
                </p>
                <Link to="/san-pham" className="btn-shop-now">
                  Khám phá sản phẩm ngay
                </Link>
              </div>
            </div>
          )}
        </section>
      </div>
      <section className="policy-product mt-94">
        <PolicyProduct />
      </section>
      <Footer />
    </>
  );
};

export default Wishlist;
