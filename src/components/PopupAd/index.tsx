// src/components/PopupAd.jsx
import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";

export interface Event {
  id: number;
  title?: string;
  image_url?: string;
  link_url?: string;
}

const PopupAd: React.FC = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [activeEvents, setActiveEvents] = useState<Event[]>([]);

  useEffect(() => {
    const SESSION_TIMEOUT_MINUTES = 30;
    const SESSION_TIMEOUT_MS = SESSION_TIMEOUT_MINUTES * 60 * 1000;

    const hasShownInSession = sessionStorage.getItem("popupShownInSession");
    const lastShownTime = localStorage.getItem("popupLastShownTime");
    const currentTime = Date.now();

    const shouldShowPopup =
      !hasShownInSession ||
      (lastShownTime &&
        currentTime - parseInt(lastShownTime, 10) > SESSION_TIMEOUT_MS);

    if (shouldShowPopup) {
      fetch("http://localhost:3501/api/events/active")
        .then((response) => {
          if (!response.ok) {
            if (response.status === 404) return null;
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then((data: Event[] | null) => {
          if (data && data.length > 0) {
            setActiveEvents(data);
            setIsVisible(true);
            sessionStorage.setItem("popupShownInSession", "true");
            localStorage.setItem("popupLastShownTime", currentTime.toString());
          } else {
            setIsVisible(false);
          }
        })
        .catch(() => setIsVisible(false));
    }
  }, []);

  const handleClosePopup = () => {
    setIsVisible(false);
  };

  if (!isVisible || activeEvents.length === 0) return null;

  return (
    <div className="popup-overlay">
      <div className="popup-container">
        <button className="popup-close-btn" onClick={handleClosePopup}>
          &times;
        </button>
        <Swiper
          pagination={{ clickable: true }}
          modules={[Pagination]}
          className="mySwiper"
        >
          {activeEvents.map((event) => (
            <SwiperSlide key={event.id}>
              {event.image_url && event.link_url && (
                <a
                  href={event.link_url}
                  className="popup-image-link"
                  // Khi nhấp vào liên kết ảnh, gọi hàm đóng popup
                  onClick={handleClosePopup}
                >
                  <img
                    src={event.image_url}
                    alt={event.title || "Promotion Banner"}
                    className="popup-image"
                  />
                </a>
              )}
              {event.image_url && !event.link_url && (
                <img
                  src={event.image_url}
                  alt={event.title || "Promotion Banner"}
                  className="popup-image"
                />
              )}
              {!event.image_url && (
                <div className="no-image-placeholder">
                  <p>{event.title || "No advertisement image to display."}</p>
                  {event.link_url && (
                    <a
                      href={event.link_url}
                      // Khi nhấp vào liên kết văn bản, gọi hàm đóng popup
                      onClick={handleClosePopup}
                    >
                      View program details
                    </a>
                  )}
                </div>
              )}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default PopupAd;
