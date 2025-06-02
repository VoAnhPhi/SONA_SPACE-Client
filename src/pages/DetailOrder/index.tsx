import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

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
  // Mock data for order details
  const [order] = useState<OrderDetails>({
    id: "12123212",
    date: "23/5/2023",
    status: "Đang giao hàng",
    statusStep: 2,
    recipientName: "Nguyễn Minh Duy",
    recipientPhone: "0866453032",
    address: "123/5 Lê Thương Kiệt / đầu đường 123/14/102 đường 3, quận Tân Bình, Phường 7, Quận Tân Bình, TP. Hồ Chí Minh",
    subtotal: 15190000,
    shippingFee: 0,
    discount: 0,
    total: 15190000,
    products: [
      {
        id: "1",
        name: "Sofa Moderno 2.5 seater Sofa",
        image: "/images/products/sofa-1.jpg",
        price: 15190000,
        color: "Màu nâu",
        size: "Số lượng: 1",
        quantity: 1
      },
      {
        id: "2",
        name: "Sofa Moderno 2.5 seater Bàn",
        image: "/images/products/table-1.jpg",
        price: 15190000,
        color: "Màu nâu",
        size: "Số lượng: 1",
        quantity: 1
      },
      {
        id: "3",
        name: "Sofa Moderno 2.5 seater Tủ",
        image: "/images/products/cabinet-1.jpg",
        price: 15190000,
        color: "Màu nâu",
        size: "Số lượng: 1",
        quantity: 1
      }
    ]
  });

  // Format price with commas
  const formatPrice = (price: number): string => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + "đ";
  };

  return (
    <>
      <Header />
      <div className="detail-order-page">
        <div className="container">
          <div className="order-overview">
            <div className="order-header">
              <div className="order-id">
                <h2>Đơn hàng: {order.id}</h2>
                <p className="order-date">Ngày đặt: {order.date}</p>
              </div>
              <div className="order-actions">
                <button className="btn-order-detail">Chỉnh sửa</button>
                <button className="btn-order-detail">Liên hệ với SONA</button>
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
              {order.products.map((product) => (
                <div className="product-item" key={product.id}>
                  <div className="product-image">
                    <img src={product.image} alt={product.name} />
                  </div>
                  <div className="product-details">
                    <h4>{product.name}</h4>
                    <div className="product-meta">
                      <span className="product-color">{product.color}</span>
                      <span className="product-size">{product.size}</span>
                    </div>
                  </div>
                  <div className="product-price">
                    <p>Thành tiền: <span>{formatPrice(product.price)}</span></p>
                  </div>
                  <div className="product-actions">
                    <button className="btn-product-action">Xem chi tiết</button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Payment Summary */}
          <div className="payment-summary">
            <div className="summary-row">
              <span>Tổng tiền hàng:</span>
              <span>{formatPrice(order.subtotal)}</span>
            </div>
            <div className="summary-row">
              <span>Phí vận chuyển:</span>
              <span>{order.shippingFee === 0 ? "Miễn phí" : formatPrice(order.shippingFee)}</span>
            </div>
            {order.discount > 0 && (
              <div className="summary-row discount">
                <span>Khuyến mãi:</span>
                <span>-{formatPrice(order.discount)}</span>
              </div>
            )}
            <div className="summary-row total">
              <span>Thành tiền:</span>
              <span>{formatPrice(order.total)}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="order-actions-bottom">
            <button className="btn-primary">Hủy đơn hàng</button>
            <button className="btn-outline">Liên hệ với SONA</button>
          </div>
        </div>

        {/* Design Services Showcase */}
        <div className="design-services">
          <div className="container">
            <div className="services-grid">
              <div className="service-item">
                <img src="/images/design/personalized-design.jpg" alt="Thiết kế cá nhân hóa" />
                <h3>Thiết kế cá nhân hóa</h3>
                <p>Liên hệ ngay để được tư vấn</p>
              </div>
              
              <div className="service-item">
                <img src="/images/design/material-samples.jpg" alt="Tìm hiểu về các mẫu vật liệu" />
                <h3>Tìm hiểu thêm về các mẫu vật liệu</h3>
              </div>
              
              <div className="service-item">
                <img src="/images/design/design-consultation.jpg" alt="Bạn cần liên hệ hỗ trợ?" />
                <h3>Bạn cần liên hệ hỗ trợ?</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default DetailOrder;
