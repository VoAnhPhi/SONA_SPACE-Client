import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import type { NewsArticle } from "../../types";
import { getNewsByCategory } from "../../api/new";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';

export default function Showcase({ categoryName }: { categoryName: string }) {
      const [items, setItems] = useState<NewsArticle[]>([]);
      const [loading, setLoading] = useState(true);
      const [error, setError] = useState<string | null>(null);

      useEffect(() => {
            const fetchItems = async () => {
                  try {
                        setLoading(true);
                        setError(null);
                        const res = await getNewsByCategory(categoryName);
                        setItems(res || []);
                  } catch (error) {
                        setError(error instanceof Error ? error.message : "Lỗi khi tải dự án");
                        setItems([]);
                  } finally {
                        setLoading(false);
                  }
            };
            fetchItems();
      }, [categoryName]);

      return (
            <section className="design-showcase-swiper mt-94">
                  <div className="container">
                        <h2 className="section-title">Dự án tiêu biểu</h2>
                        {loading && <div className="showcase-loading">Đang tải dự án...</div>}
                        {error && <div className="showcase-error">{error}</div>}
                        {!loading && !error && (
                              items.length === 0 ? (
                                    <div className="showcase-empty">Chưa có dự án nào!</div>
                              ) : (
                                    <Swiper
                                          modules={[Autoplay, Navigation]}
                                          spaceBetween={32}
                                          slidesPerView="auto"
                                          navigation
                                          autoplay={{
                                                delay: 3000,
                                                disableOnInteraction: false,
                                                pauseOnMouseEnter: true,
                                          }}
                                          loop={items.length > 1}
                                          className="showcase-swiper"
                                    >
                                          {items.map((item) => (
                                                <SwiperSlide key={item.news_id}>
                                                      <div className="showcase-item">
                                                            <Link to={`/tin-tuc/${item.news_slug}`} className="showcase-thumb-link">
                                                                  <img src={item.news_image} alt={item.news_title} />
                                                            </Link>
                                                            <div className="showcase-content">
                                                                  <h3 className="showcase-title">
                                                                        <Link to={`/tin-tuc/${item.news_slug}`}>{item.news_title}</Link>
                                                                  </h3>
                                                                  <p className="showcase-desc">
                                                                        {item.news_summary?.length > 120
                                                                              ? item.news_summary.slice(0, 120) + "..."
                                                                              : item.news_summary}
                                                                  </p>
                                                                  {item.news_publishDate && (
                                                                        <div className="showcase-date">
                                                                              <span>{item.news_publishDate}</span>
                                                                        </div>
                                                                  )}
                                                            </div>
                                                      </div>
                                                </SwiperSlide>
                                          ))}
                                    </Swiper>
                              )
                        )}
                  </div>
            </section>
      );
}
