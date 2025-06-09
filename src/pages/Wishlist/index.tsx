import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ListProduct from "../../components/Product";
import Seemore from "../../components/SeeMore";

interface WishlistProductProps {
  id: number;
  name: string;
  price: number;
  oldPrice?: number;
  image: string;
  colors: string[];
  category: string;
  isNew?: boolean;
  priceSale: number;
  isSale?: boolean;
  slug: string;
  isWhishlist?: boolean;
}

const Wishlist: React.FC = () => {
  // Mock wishlist products data
  const [wishlistProducts, setWishlistProducts] = useState<
    WishlistProductProps[]
  >([
    {
      id: 1,
      name: "Sofa Modena 2.5 seater ofa odena sema seater",
      price: 15190000,
      priceSale: 14000000,
      image: "/images/products/product(1).png",
      colors: ["#D8C1A9", "#333333", "#777777"],
      category: "Sofa",
      slug: "Sofa-Modular-2.5-seater-với-nhièu-varian-option",
    },
    {
      id: 2,
      name: "Sofa Modena 2.5 seater ofa odena sema seater",
      price: 15190000,
      priceSale: 20000000,
      image: "/images/products/product(2).png",
      colors: ["#D8C1A9", "#E5E5E5", "#555555"],
      category: "Sofa",
      isSale: true,
      slug: "Sofa-Modular-2.5-seater-với-nhièu-varian-option",
    },
    {
      id: 3,
      name: "Sofa Modena 2.5 seater ofa odena sema seater",
      price: 15190000,
      priceSale: 20000000,
      image: "/images/products/product(3).png",
      colors: ["#D8C1A9", "#333333", "#555555"],
      category: "Sofa",
      isNew: true,
      slug: "Sofa-Modular-2.5-seater-với-nhièu-varian-option",
    },
    {
      id: 4,
      name: "Sofa Modena 2.5 seater ofa odena sema seater",
      price: 15190000,
      priceSale: 20000000,
      image: "/images/products/product(4).png",
      colors: ["#D8C1A9", "#333333", "#777777"],
      category: "Ghế",
      isSale: true,
      slug: "Sofa-Modular-2.5-seater-với-nhièu-varian-option",
    },
    {
      id: 5,
      name: "Sofa Modena 2.5 seater ofa odena sema seater",
      price: 15190000,
      priceSale: 20000000,
      image: "/images/products/product(5).png",
      colors: ["#4A2932", "#E5E5E5", "#555555"],
      category: "Ghế",
      slug: "Sofa-Modular-2.5-seater-với-nhièu-varian-option",
    },
    {
      id: 6,
      name: "Sofa Modena 2.5 seater ofa odena sema seater",
      price: 15190000,
      priceSale: 20000000,
      image: "/images/products/product(6).png",
      colors: ["#333333", "#555555", "#777777"],
      category: "Bàn",
      slug: "Sofa-Modular-2.5-seater-với-nhièu-varian-option",
    },
    {
      id: 7,
      name: "Sofa Modena 2.5 seater ofa odena sema seater",
      price: 15190000,
      priceSale: 20000000,
      image: "/images/products/product(7).png",
      colors: ["#D8C1A9", "#E5E5E5", "#555555"],
      category: "Gạch",
      slug: "Sofa-Modular-2.5-seater-với-nhièu-varian-option",
    },
    {
      id: 8,
      name: "Sofa Modena 2.5 seater ofa odena sema seater",
      price: 15190000,
      priceSale: 20000000,
      image: "/images/products/product(8).png",
      colors: ["#D8C1A9", "#333333", "#777777"],
      category: "Thảm",
      isNew: true,
      slug: "Sofa-Modular-2.5-seater-với-nhièu-varian-option",
    },
  ]);

  // Format price with commas
  const formatPrice = (price: number): string => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  // Remove product from wishlist
  const removeFromWishlist = (productId: number) => {
    setWishlistProducts(
      wishlistProducts.filter((product) => product.id !== productId)
    );
  };

  return (
    <>
      <Header />
      <div className="wishlist-pages">
        {/* Breadcrumb */}
        <section className="detail-page-link">
          <div className="container">
            <div className="detail-link">
              <span className="link1">Sản phẩm | </span>
              <span className="link2">Sản phẩm yêu thích</span>
            </div>
          </div>
        </section>

        {/* Wishlist Content */}
        <section className="wishlist-content">
          <div className="wishlist-title">
            <h4>Sản Phẩm Yêu Thích - Lưu giữ những món đồ bạn ấn tượng</h4>
            <p>
              Lưu lại những sản phẩm bạn yêu thích để dễ dàng tìm lại và mua sắm
              khi bạn sẵn sàng,
              <br />
              giúp việc mua sắm trở nên tiện lợi và nhanh chóng hơn bao giờ hết.
            </p>
          </div>

          {wishlistProducts.length > 0 ? (
            <>
              <section className="boxProducts">
                <div className="container">
                  <section className="section-box-products">
                    <div className="box-products-container">
                      {wishlistProducts.map((product) => (
                        <ListProduct
                          key={product.id}
                          product={{ ...product, isWishlist: true }}
                          slug={product.slug}
                        />
                      ))}
                    </div>
                  </section>
                </div>
              </section>
              <Seemore />
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
      <Footer />
    </>
  );
};

export default Wishlist;
