import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import axios from "axios";
interface OrderProduct {
  id: string;
  name: string;
  image: string;
  price: number;
  color: string;
  size: string;
  quantity: number;
}

interface OrderDetails {
  id: string;
  date: string;
  status: string;
  statusStep: number;
  recipientName: string;
  recipientPhone: string;
  address: string;
  subtotal: number;
  shippingFee: number;
  discount: number;
  total: number;
  products: OrderProduct[];
}

const DetailOrder: React.FC = () => {
  const [order, setOrder] = useState<any>(null);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const token = sessionStorage.getItem("authToken");
        const res = await axios.get(`http://localhost:3501/api/orders/hash/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (res.data.success) {
          setOrder(res.data.order);
        }
      } catch (err) {
        console.error("Lỗi khi tải đơn hàng:", err);
      }
    };

    fetchOrder();
  }, [id]);

  const formatDate = (dateString: string): string | undefined => {
    const date = new Date(dateString);
    // Lấy các phần
    const DD = ('0' + date.getDate()).slice(-2);
    const MM = ('0' + (date.getMonth() + 1)).slice(-2);
    const YYYY = date.getFullYear();
    const HH = ('0' + date.getHours()).slice(-2);
    const mm = ('0' + date.getMinutes()).slice(-2);
    const ss = ('0' + date.getSeconds()).slice(-2);

    return `${DD}/${MM}/${YYYY} ${HH}:${mm}:${ss}`;
  };

  // Format price with commas
  const formatPrice = (price: number): string => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + "đ";
  };
  if (!order) return <p>Đang tải đơn hàng...</p>;
  return (
    <>
      <Header />

      <section className="detail-order-page">
        <div className="container">
          <div className="order-overview">
            <div className="order-header">
              <div className="order-id">
                <h2>Đơn hàng: {order.id}</h2>
                <p className="order-date">Ngày đặt: {formatDate(order.date)}</p>
              </div>
              <div className="order-actions">
                <div className="order-status"><span className="status">Chờ xác nhận</span></div>
              </div>
            </div>

            {/* Order Status Progress */}
            <div className="order-status-progress">
              <div className="status-timeline">
                <div className={`status-step ${order.statusStep >= 1 ? 'active' : ''}`}>
                  <div className="status-icon">
                    <i className="icon-check"></i>
                  </div>
                  <div className="status-label">
                    <p>Chờ xác nhận</p>
                    <span>23/5/2023</span>
                  </div>
                </div>
                <div className="status-line"></div>
                <div className={`status-step ${order.statusStep >= 2 ? 'active' : ''}`}>
                  <div className="status-icon">
                    <i className="icon-check"></i>
                  </div>
                  <div className="status-label">
                    <p>Xác nhận đơn</p>
                    <span>23/5/2023</span>
                  </div>
                </div>
                <div className="status-line"></div>
                <div className={`status-step ${order.statusStep >= 3 ? 'active' : ''}`}>
                  <div className="status-icon">
                    <i className="icon-delivery"></i>
                  </div>
                  <div className="status-label">
                    <p>Đang giao hàng</p>
                  </div>
                </div>
                <div className="status-line"></div>
                <div className={`status-step ${order.statusStep >= 4 ? 'active' : ''}`}>
                  <div className="status-icon">
                    <i className="icon-complete"></i>
                  </div>
                  <div className="status-label">
                    <p>Hoàn thành</p>
                  </div>
                </div>
                <div className="status-line"></div>
                <div className={`status-step ${order.statusStep >= 5 ? 'active' : ''}`}>
                  <div className="status-icon">
                    <i className="icon-rate"></i>
                  </div>
                  <div className="status-label">
                    <p>Đánh giá</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Delivery Information */}
          <div className="delivery-info">
            <h3>Địa chỉ nhận hàng</h3>
            <div className="recipient-info">
              <div className="recipient-name">
                <p><strong>{order.recipientName}</strong></p>
                <p>{order.recipientPhone}</p>
              </div>
              <div className="recipient-address">
                <p>{order.address}</p>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="order-summary">
            <div className="summary-header">
              <h3>Tổng sản phẩm</h3>
            </div>
            <div className="product-list">
              {order.products?.map((product: any) => (
                <div className="product-item" key={product.id}>
                  <div className="product-image">
                    <img src={product.image} alt={product.name} />
                  </div>
                  <div className="product-detailss">
                    <h4>{product.name}</h4>
                    <div className="product-meta">
                      <span className="product-color" style={{ backgroundColor: product.color.hex }}></span>
                      <span className="product-size">{product.size}</span>
                    </div>
                  </div>
                  <div className="product-price">
                    <p>Thành tiền: <span>{formatPrice(product.price)}</span></p>
                  </div>
                  <div className="product-actions">
                    <Link to={`/san-pham/${product.slug}`}>
                      <button className="btn-product-action">Xem chi tiết</button>
                    </Link>

                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Payment Summary */}
          <div className="payment-summary">
            <div className="summary-row">
              <span className="row1">Tổng tiền hàng:</span>
              <span className="row2">{formatPrice(order.subtotal)}</span>
            </div>
            <div className="summary-row">
              <span className="row1">Phí vận chuyển:</span>
              <span className="row2">30.000 đ</span>
            </div>
            {order.discount > 0 && (
              <div className="summary-row discount">
                <span className="row1">Khuyến mãi:</span>
                <span className="row2">-{formatPrice(order.discount)}</span>
              </div>
            )}
            <div className="summary-row total">
              <span className="row1">Thành tiền:</span>
              <span className="row2">{formatPrice(order.total)}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="order-actions-bottom">
            <button className="btn-primary">Hủy đơn hàng</button>
            <button className="btn-outline">Liên hệ với SONA</button>
          </div>
        </div>

        {/* Design Services Showcase */}
      </section>
      <Footer />
    </>
  );
};

export default DetailOrder;
