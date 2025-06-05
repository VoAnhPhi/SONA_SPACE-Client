import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import PopularCategory from "../../components/PopularCategory";
import InteriorDesign from "../../components/InteriorDesign";
import ProductSlider from "../../components/ProductSlider";
import CategorySlider from "../../components/RoomSlider";

const Rooms: React.FC = () => {
  return (
    <>
      <Header />
      <div className="rooms-page">

        {/* Banner */}
        <section className="room-banner">
          <div className="container-fluid">
            <div className="banner-image">
              <img src="/images/rooms/banner_room.jpg" alt="Khám phá không gian sống" />
            </div>
          </div>
        </section>

        {/* Breadcrumb */}
        <div className="breadcrumb-container">
          <div className="container">
            <div className="breadcrumb">
              <Link to="/">Trang chủ</Link>
              <span>/</span>
              <span className="active">Không gian</span>
            </div>
          </div>
        </div>

        {/* Room Categories */}
        <section className="room-categories">
          <div className="container">
            <h1 className="section-title">Khám phá thêm các căn phòng</h1>
            <CategorySlider />
          </div>
        </section>

        {/* Featured Products */}
        <section className="featured-products">
          <div className="container">
            <h2 className="section-title">Sản Phẩm Mới</h2>
            <ProductSlider />
          </div>
        </section>

        {/* Interior Design */}
        <InteriorDesign />

        {/* Popular Category */}
        <PopularCategory />

      </div>
      <Footer />
    </>
  );
};

export default Rooms;
