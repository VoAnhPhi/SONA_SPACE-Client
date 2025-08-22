import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
import { getBannersByPage, type Banner } from '../../api/banner';

// Import Swiper styles
import 'swiper/swiper-bundle.css';
import './styles.scss';

interface BannerSliderProps {
  className?: string;
  page?: string; // Trang để lấy banner (home, san-pham, etc.)
}

const BannerSlider: React.FC<BannerSliderProps> = ({ className = '', page = 'home' }) => {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // console.log(`Starting to fetch banners for page: ${page}...`);
        const bannerData = await getBannersByPage(page);
        // console.log('Received banner data:', bannerData);
        // console.log('Banner data type:', typeof bannerData);
        // console.log('Banner data length:', Array.isArray(bannerData) ? bannerData.length : 'Not an array');
        
        if (Array.isArray(bannerData) && bannerData.length > 0) {
          // console.log('First banner sample:', bannerData[0]);
        }
        
        // Sắp xếp theo position và chỉ lấy những banner có status = 1
        const activeBanners = bannerData
          .filter((banner: Banner) => {
            // console.log(`Banner ${banner.id}: status = ${banner.status}, position = ${banner.position}`);
            return banner.status === 1;
          })
          .sort((a: Banner, b: Banner) => a.position - b.position);
        
        // console.log('Active banners after filtering:', activeBanners);
        // console.log('Number of active banners:', activeBanners.length);
        setBanners(activeBanners);
        
        if (activeBanners.length === 0) {
          // console.warn(`No active banners found for page: ${page} - showing fallback content`);
        } else {
          // console.log(`Successfully loaded ${activeBanners.length} active banners for page: ${page}`);
        }
      } catch (err) {
        console.error('Error fetching banners:', err);
        setError('Không thể tải banner. Vui lòng thử lại sau.');
        setBanners([]); // Set empty array on error
      } finally {
        setLoading(false);
      }
    };

    fetchBanners();
  }, [page]); // Thêm page vào dependency array

  if (loading) {
    return (
      <section className={`hero-banner loading ${className}`}>
        <div className="loading-placeholder">
          <div className="loading-spinner"></div>
          <p>Đang tải banner...</p>
        </div>
      </section>
    );
  }

  if (error || banners.length === 0) {
    return (
      <section className={`hero-banner ${className}`}>
        <div className="banner-slide">
          <div className="banner-image">
            <img 
              src="/images/default-banner.jpg" 
              alt="SONA SPACE - Thiết kế nội thất cao cấp"
              loading="lazy"
              onError={(e) => {
                // If default image fails, use a placeholder gradient
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                target.parentElement!.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
              }}
            />
          </div>
          <div className="banner-content">
            <div className="container">
              <div className="banner-text">
                <p className="banner-subtitle">SONA SPACE</p>
                <h1 className="banner-title">Thiết Kế Nội Thất Cao Cấp</h1>
                <p className="banner-description">
                  Khám phá bộ sưu tập nội thất độc đáo và hiện đại. 
                  Tạo nên không gian sống hoàn hảo cho ngôi nhà của bạn.
                </p>
                <a href="/san-pham" className="banner-button">
                  Khám Phá Ngay
                  <i className="fas fa-arrow-right"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
        {error && (
          <div className="error-notice">
            <p>{error}</p>
          </div>
        )}
      </section>
    );
  }

  return (
    <section className={`hero-banner ${className}`}>
      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        spaceBetween={0}
        slidesPerView={1}
        navigation={{
          nextEl: '.banner-slider-next',
          prevEl: '.banner-slider-prev',
        }}
        pagination={{
          el: '.banner-slider-pagination',
          clickable: true,
          bulletClass: 'banner-bullet',
          bulletActiveClass: 'banner-bullet-active',
        }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        effect="fade"
        fadeEffect={{
          crossFade: true,
        }}
        loop={banners.length > 1}
        className="banner-swiper"
      >
        {banners.map((banner) => (
          <SwiperSlide key={banner.id}>
            <div className="banner-slide">
              <div className="banner-image">
                <img 
                  src={banner.image} 
                  alt={banner.title}
                  loading="lazy"
                />
              </div>
              <div className="banner-content">
                <div className="container">
                  <div className="banner-text">
                    <p className="banner-subtitle">{banner.subtitle || "SONA SPACE"}</p>
                    <h1 className="banner-title">{banner.title}</h1>
                    <p className="banner-description">
                      {banner.description || "Khám phá bộ sưu tập nội thất độc đáo và hiện đại"}
                    </p>
                    <a 
                      href={banner.link || "/san-pham"} 
                      className="banner-button"
                      target={banner.link?.startsWith('http') ? '_blank' : '_self'}
                      rel={banner.link?.startsWith('http') ? 'noopener noreferrer' : undefined}
                    >
                      {banner.button_text || "Khám Phá Ngay"}
                      <i className="fas fa-arrow-right"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Navigation Arrows */}
      {banners.length > 1 && (
        <>
          {/* <div className="banner-slider-prev banner-nav-arrow">
            <i className="fas fa-chevron-left"></i>
          </div>
          <div className="banner-slider-next banner-nav-arrow">
            <i className="fas fa-chevron-right"></i>
          </div> */}
        </>
      )}

      {/* Pagination */}
      {/* {banners.length > 1 && (
        <div className="banner-slider-pagination"></div>
      )} */}
    </section>
  );
};

export default BannerSlider;
