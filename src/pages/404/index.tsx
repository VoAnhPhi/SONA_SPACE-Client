import React from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const NotFoundPage = () => {
  return (
    <>
      <Header />
      <div className="not-found-page">
        <div className="container">
          <div className="not-found-content">
            <h1 className="not-found-title">Chúng tôi không thể tìm thấy trang mà bạn đang tìm</h1>
            
            <Link to="/" className="back-to-home">
              Về lại trang chủ <span className="arrow">→</span>
            </Link>
            
            <div className="not-found-image">
              <img src="/images/404-illustration.png" alt="404 Not Found" />
            </div>
          </div>
        </div>
        
        <div className="design-services-section">
          <div className="container">
            <div className="services-row">
              <div className="service-card">
                <img src="/images/services/personalized-design.jpg" alt="Thiết kế cá nhân hóa" />
                <div className="service-content">
                  <h3>Thiết kế cá nhân hóa</h3>
                  <p>Liên hệ ngay để được tư vấn</p>
                </div>
              </div>
              
              <div className="service-card">
                <img src="/images/services/material-samples.jpg" alt="Tìm hiểu thêm về các mẫu vật liệu" />
                <div className="service-content">
                  <h3>Tìm hiểu thêm về các mẫu vật liệu</h3>
                </div>
              </div>
              
              <div className="service-card">
                <img src="/images/services/customer-support.jpg" alt="Bạn cần liên hệ hỗ trợ?" />
                <div className="service-content">
                  <h3>Bạn cần liên hệ hỗ trợ?</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default NotFoundPage;
