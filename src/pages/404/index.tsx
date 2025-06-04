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
              <img src="/images/404/404.svg" alt="404 Not Found" />
            </div>
          </div>
        </div>
        
        
      </div>
      <Footer />
    </>
  );
};

export default NotFoundPage;
