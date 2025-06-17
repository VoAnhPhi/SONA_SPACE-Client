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
      {/* <Header /> */}
      <div className="order-Complete-context">
        <div className="order-Complete-text1">
          <img src="/images/Order-Completed/sonaspace.png" alt="" />
        </div>
        <div className="order-Complete-text2">
          <div className="Complete-text2-1">
            <h5>Cảm ơn bạn đã mua hàng</h5>
          </div>
          <div className="Complete-text2-2">
            <img src="/images/Order-Completed/Mahalo.png" alt="" />
          </div>
        </div>
        <div className="order-Complete-text3">
          <p className="text3-1">Bạn sẽ sớm nhận được email xác nhận với thông tin chi tiết về đơn hàng của bạn. Nếu không nhận </p>
          <p className="text3-2">được email, vui lòng kiểm tra thư mục thư rác hoặc liên hệ với chúng tôi.
            <span></span>
          </p>
        </div>
      </div>
      <div className="Order-Complete-Bill">
        <div className="container">
          <div className="Order-complete-right">
            <div className="complete-right-bill">
              <h4>Tóm tắt đơn hàng</h4>
              <div className="complete-right-bill-voucher">
                <span className="voucher1">Mã đơn hàng</span>
                <span className="voucher2">{orderSummary.orderId}</span>
              </div>
              <div className="complete-right-bill-shipping">
                <span className="shipping1">Thời gian thanh toán</span>
                <span className="shipping2">{orderSummary.orderDate}</span>
              </div>
              <div className="complete-right-bill-discount">
                <span className="discount1">Sản phẩm đã mua</span>
                <span className="discount2">{orderSummary.itemCount} sản phẩm</span>
              </div>
              <div className="complete-right-bill-total">
                <span className="total1">Tổng giá</span>
                <span className="stotal2">{formatPrice(orderSummary.total)} đ</span>
              </div>
              <div className="complete-right-bill-button">
                <Link to={``}><button type="submit" className="cart-button">Xem chi tiết đơn hàng</button></Link>
              </div>
            </div>
          </div>
          <div className="Order-complete-center">
            <span>Cảm ơn bạn đã mua sắm với chúng tôi! Nếu bạn có bất kỳ câu hỏi hoặc thắc mắc nào, vui lòng liên hệ với nhóm hỗ trợ khách hàng của chúng tôi theo địa chỉ: </span>
            <div className="center-text">
              <span>Email: sona.furniture@gmail.com</span>
              <span>Số điện thoại: 0900909090</span>
            </div>
          </div>
        </div>
      </div>


      <Footer />
    </>
  );
};

export default OrderComplete;
