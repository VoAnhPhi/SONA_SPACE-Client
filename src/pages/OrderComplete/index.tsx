import React from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

interface OrderSummaryProps {
  orderId: string;
  orderDate: string;
  itemCount: number;
  total: number;
}

const OrderComplete: React.FC = () => {
  // Mock order data
  const orderSummary: OrderSummaryProps = {
    orderId: "#105555554",
    orderDate: "Ngày 2 tháng 8 năm 2023",
    itemCount: 4,
    total: 85190000
  };

  // Format price with commas
  const formatPrice = (price: number): string => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  return (
    <>
      <Header />
      <div className="order-complete-page">
        <div className="order-complete-content">
          <div className="container">
            <div className="logo-section">
              <div className="logo">
                <img src="/images/logo.svg" alt="Sona Space" />
              </div>
            </div>
            
            <div className="thank-you-section">
              <h1 className="thank-you-title">Cảm ơn bạn đã mua hàng</h1>
              <div className="thank-you-script">Mahalo</div>
            </div>
            
            <div className="order-message">
              <p>
                Bạn sẽ sớm nhận được email xác nhận với thông tin chi tiết về đơn hàng của bạn. 
                Nếu không nhận được email, vui lòng kiểm tra thư mục thư rác hoặc liên hệ với chúng tôi.
              </p>
            </div>
            
            <div className="order-summary-container">
              <div className="order-summary-card">
                <h2 className="summary-title">Tóm tắt đơn hàng</h2>
                
                <div className="summary-row">
                  <div className="label">Mã đơn hàng</div>
                  <div className="value">{orderSummary.orderId}</div>
                </div>
                
                <div className="summary-row">
                  <div className="label">Thời gian thanh toán</div>
                  <div className="value">
                    <div>12 giờ 50 phút</div>
                    <div>{orderSummary.orderDate}</div>
                  </div>
                </div>
                
                <div className="summary-row">
                  <div className="label">Sản phẩm đã mua</div>
                  <div className="value">{orderSummary.itemCount} sản phẩm</div>
                </div>
                
                <div className="summary-row total">
                  <div className="label">Tổng giá</div>
                  <div className="value">{formatPrice(orderSummary.total)} đ</div>
                </div>
                
                <Link to="/don-hang" className="view-order-btn">
                  Xem chi tiết đơn hàng
                </Link>
              </div>
            </div>
            
            <div className="contact-section">
              <p>
                Cảm ơn bạn đã mua sắm với chúng tôi! Nếu bạn có bất kỳ câu hỏi hoặc 
                thắc mắc nào, vui lòng liên hệ với nhóm hỗ trợ khách hàng của chúng 
                tôi theo địa chỉ:
              </p>
              <div className="contact-info">
                <div className="email">Email: sona.furniture@gmail.com</div>
                <div className="phone">Số điện thoại: 0900909090</div>
              </div>
            </div>
            
            <div className="action-buttons">
              <Link to="/" className="btn-home">Quay về trang chủ</Link>
              <Link to="/san-pham" className="btn-continue-shopping">Tiếp tục mua sắm</Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default OrderComplete;
