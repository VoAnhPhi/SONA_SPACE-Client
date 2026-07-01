import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";
import { getBannersByPage, type Banner } from "../../api/banner";
import { SkeletonBlock } from "../StateFeedback";

import "swiper/swiper-bundle.css";
import "./styles.scss";

interface BannerSliderProps {
  className?: string;
  page?: string;
}

type BannerFallbackConfig = {
  subtitle: string;
  title: string;
  description: string;
  link: string;
  buttonText: string;
};

const pageBannerFallbacks: Record<string, BannerFallbackConfig> = {
  home: {
    subtitle: "SONA SPACE",
    title: "Thiáº¿t Káº¿ Ná»™i Tháº¥t Cao Cáº¥p",
    description:
      "KhÃ¡m phÃ¡ bá»™ sÆ°u táº­p ná»™i tháº¥t Ä‘á»™c Ä‘Ã¡o vÃ  hiá»‡n Ä‘áº¡i. Táº¡o nÃªn khÃ´ng gian sá»‘ng hoÃ n háº£o cho ngÃ´i nhÃ  cá»§a báº¡n.",
    link: "/san-pham",
    buttonText: "KhÃ¡m PhÃ¡ Ngay",
  },
  "san-pham": {
    subtitle: "Bá»˜ SÆ¯U Táº¬P",
    title: "KhÃ¡m PhÃ¡ Sáº£n Pháº©m Ná»™i Tháº¥t",
    description:
      "Lá»±a chá»n nhá»¯ng thiáº¿t káº¿ phÃ¹ há»£p cho phÃ²ng khÃ¡ch, phÃ²ng ngá»§ vÃ  khÃ´ng gian sá»‘ng hiá»‡n Ä‘áº¡i.",
    link: "/san-pham",
    buttonText: "Xem Sáº£n Pháº©m",
  },
  "khong-gian": {
    subtitle: "KHÃ”NG GIAN Sá»NG",
    title: "Gá»£i Ã Bá»‘ TrÃ­ Ná»™i Tháº¥t",
    description:
      "Tham kháº£o cÃ¡c mÃ´ hÃ¬nh khÃ´ng gian Ä‘á»ƒ tÃ¬m phong cÃ¡ch phÃ¹ há»£p vá»›i ngÃ´i nhÃ  cá»§a báº¡n.",
    link: "/khong-gian",
    buttonText: "KhÃ¡m PhÃ¡ KhÃ´ng Gian",
  },
  "gio-hang": {
    subtitle: "HOÃ€N Táº¤T ÄÆ N HÃ€NG",
    title: "Kiá»ƒm Tra Giá» HÃ ng Cá»§a Báº¡n",
    description:
      "Xem láº¡i sáº£n pháº©m Ä‘Ã£ chá»n, cáº­p nháº­t sá»‘ lÆ°á»£ng vÃ  sáºµn sÃ ng cho bÆ°á»›c thanh toÃ¡n.",
    link: "/thanh-toan",
    buttonText: "Tiáº¿n HÃ nh Thanh ToÃ¡n",
  },
  "tai-khoan": {
    subtitle: "TÃ€I KHOáº¢N",
    title: "Quáº£n LÃ½ ÄÆ¡n HÃ ng VÃ  Æ¯u ÄÃ£i",
    description:
      "Theo dÃµi Ä‘Æ¡n hÃ ng, cáº­p nháº­t thÃ´ng tin cÃ¡ nhÃ¢n vÃ  sá»­ dá»¥ng cÃ¡c Æ°u Ä‘Ã£i dÃ nh cho báº¡n.",
    link: "/tai-khoan",
    buttonText: "Xem TÃ i Khoáº£n",
  },
  "tin-tuc": {
    subtitle: "SONA JOURNAL",
    title: "Cáº­p Nháº­t Tin Tá»©c Ná»™i Tháº¥t",
    description:
      "KhÃ¡m phÃ¡ xu hÆ°á»›ng, kinh nghiá»‡m bá»‘ trÃ­ vÃ  cÃ¢u chuyá»‡n thiáº¿t káº¿ má»›i nháº¥t tá»« SONA SPACE.",
    link: "/tin-tuc",
    buttonText: "Äá»c Tin Má»›i",
  },
};

const fallbackBannerImage = "/images/default-banner.jpg";

const BannerSlider: React.FC<BannerSliderProps> = ({
  className = "",
  page = "home",
}) => {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        setLoading(true);
        setError(null);

        const bannerData = await getBannersByPage(page);
        const activeBanners = bannerData
          .filter((banner: Banner) => banner.status === 1)
          .sort((a: Banner, b: Banner) => a.position - b.position);

        setBanners(activeBanners);
      } catch (err) {
        console.error("Error fetching banners:", err);
        setError("KhÃ´ng thá»ƒ táº£i banner. Äang hiá»ƒn thá»‹ ná»™i dung dá»± phÃ²ng.");
        setBanners([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBanners();
  }, [page]);

  const pageFallback = pageBannerFallbacks[page] ?? pageBannerFallbacks.home;
  const fallbackBanner = {
    ...pageFallback,
    image: fallbackBannerImage,
  };

  const isExternalLink = (link?: string) =>
    Boolean(link && /^https?:\/\//i.test(link));

  const getBannerLink = (banner?: Banner) => banner?.link || pageFallback.link;

  const getBannerButtonText = (banner?: Banner) =>
    banner?.button_text || pageFallback.buttonText;

  const getBannerSubtitle = (banner?: Banner) =>
    banner?.subtitle || pageFallback.subtitle;

  const getBannerDescription = (banner?: Banner) =>
    banner?.description || pageFallback.description;

  if (loading) {
    return (
      <section className={`hero-banner loading ${className}`}>
        <div className="banner-slide">
          <SkeletonBlock className="banner-image" height="100%" />
          <div className="banner-content">
            <div className="container">
              <div className="banner-text">
                <SkeletonBlock width="120px" height={16} />
                <SkeletonBlock width="58%" height={58} />
                <SkeletonBlock width="42%" height={18} />
                <SkeletonBlock width="220px" height={56} />
              </div>
            </div>
          </div>
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
              src={fallbackBanner.image}
              alt="SONA SPACE - Thiáº¿t káº¿ ná»™i tháº¥t cao cáº¥p"
              loading="lazy"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = "none";
                target.parentElement!.style.background =
                  "linear-gradient(135deg, #667eea 0%, #764ba2 100%)";
              }}
            />
          </div>
          <div className="banner-content">
            <div className="container">
              <div className="banner-text">
                <p className="banner-subtitle">{fallbackBanner.subtitle}</p>
                <h1 className="banner-title">{fallbackBanner.title}</h1>
                <p className="banner-description">
                  {fallbackBanner.description}
                </p>
                <Link to={fallbackBanner.link} className="banner-button">
                  {fallbackBanner.buttonText}
                  <i className="fas fa-arrow-right" />
                </Link>
              </div>
            </div>
          </div>
        </div>
        {error && (
          <div className="error-notice" role="status">
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
          nextEl: ".banner-slider-next",
          prevEl: ".banner-slider-prev",
        }}
        pagination={{
          el: ".banner-slider-pagination",
          clickable: true,
          bulletClass: "banner-bullet",
          bulletActiveClass: "banner-bullet-active",
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
        {banners.map((banner) => {
          const bannerLink = getBannerLink(banner);

          return (
            <SwiperSlide key={banner.id}>
              <div className="banner-slide">
                <div className="banner-image">
                  <img src={banner.image} alt={banner.title} loading="lazy" />
                </div>
                <div className="banner-content">
                  <div className="container">
                    <div className="banner-text">
                      <p className="banner-subtitle">
                        {getBannerSubtitle(banner)}
                      </p>
                      <h1 className="banner-title">{banner.title}</h1>
                      <p className="banner-description">
                        {getBannerDescription(banner)}
                      </p>
                      {isExternalLink(bannerLink) ? (
                        <a
                          href={bannerLink}
                          className="banner-button"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {getBannerButtonText(banner)}
                          <i className="fas fa-arrow-right" />
                        </a>
                      ) : (
                        <Link to={bannerLink} className="banner-button">
                          {getBannerButtonText(banner)}
                          <i className="fas fa-arrow-right" />
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </section>
  );
};

export default BannerSlider;
