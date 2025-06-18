import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import CategorySlider from "../../components/CategorySlider";
import Filter from "../../components/Filter";
import ProductComponent from "../../components/Product";
import { fetchRoomBySlug, fetchProductsByRoom } from "../../services/roomService";
import type { Room, Product } from "../../types";
import Seemore from "../../components/SeeMore";

const RoomDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [room, setRoom] = useState<Room | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  useEffect(() => {
    if (!slug) {
      setError("Không gian không tồn tại");
      setLoading(false);
      return;
    }

    const fetchRoomAndProducts = async () => {
      try {
        const roomData = await fetchRoomBySlug(slug);
        setRoom(roomData[0] || roomData);
        const { products: newProducts, totalPages } = await fetchProductsByRoom(
          slug || "",
          page,
          8
        );
        setProducts(newProducts);
        setTotalPages(totalPages);
      } catch (error) {
        setError("Không tìm thấy không gian");
      } finally {
        setLoading(false);
      }
    };

    fetchRoomAndProducts();
  }, [slug]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const handleSeeMore = () => {
    if (page < totalPages) {
      setPage((prev) => prev + 1);
    }
  };

  return (
    <>
      <Header />
      <div className="room-detail-page">
        {/* Banner Section */}
        <div className="room-banner">
          <div className="container-fluid">
            <div className="banner-image">
              <img src={room?.room_banner} alt={room?.room_name} />
              <div className="banner-text">
                <h1>{room?.room_name}</h1>
                <p>{room?.room_description}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Breadcrumb */}
        <div className="breadcrumb-container">
          <div className="container">
            <div className="breadcrumb">
              <Link to="/">Trang chủ</Link>
              <span>/</span>
              <Link to="/khong-gian">Không gian</Link>
              <span>/</span>
              <span className="active">{room?.room_name}</span>
            </div>
          </div>
        </div>

        {/* Product Section */}
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

        {/* Inspiration Section */}
        <section className="inspiration-section">
          <div className="container">
            <div className="inspiration-content">
              <div className="inspiration-text">
                <h2>Thiết kế không gian sống theo phong cách của bạn</h2>
                <p>
                  SONA SPACE cung cấp dịch vụ thiết kế nội thất chuyên nghiệp,
                  giúp bạn tạo ra không gian sống lý tưởng phù hợp với phong
                  cách và nhu cầu cá nhân. Đội ngũ thiết kế của chúng tôi sẽ làm
                  việc chặt chẽ với bạn để hiểu rõ mong muốn và đưa ra giải pháp
                  tối ưu cho không gian của bạn.
                </p>
                <a href="/lien-he" className="discover-btn">
                  Liên hệ ngay
                  <i className="icon">
                    <svg
                      width="14"
                      height="8"
                      viewBox="0 0 14 8"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M13.9128 4L9.8048 1M13.9128 4L9.8048 7M13.9128 4H1.12402"
                        stroke="currentColor"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </i>
                </a>
              </div>

              <div className="inspiration-image">
                <img
                  src="/images/rooms/room-detail/image-banner.jpg"
                  alt="Thiết kế nội thất chuyên nghiệp"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="categories-section">
          <div className="container">
            <h2 className="section-title">Khám phá thêm các căn phòng</h2>
            <CategorySlider />
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default RoomDetail;
