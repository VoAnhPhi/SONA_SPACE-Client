const InteriorDesign = () => {
      return (
            <section className="interior-design">
                  <div className="container">
                        <div className="section-title">
                              <h2 className="title">Nội Thất Theo Yêu Cầu</h2>
                              <p className="description">Khám phá dịch vụ thiết kế nội thất cao cấp của chúng tôi</p>
                        </div>
                        <div className="design-grid">
                              <div className="design-item">
                                    <div className="design-image">
                                          <img
                                                src="/images/interior-1.jpg"
                                                alt="Nội Thất Theo Yêu Cầu"
                                          />
                                    </div>
                                    <div className="design-content">
                                          <h3>Nội Thất Theo Yêu Cầu</h3>
                                          <p>
                                                Với hơn 10 năm kinh nghiệm thiết kế nội thất, Tại SONA
                                                SPACE, chúng tôi tự hào mang đến những giải pháp thiết kế
                                                nội thất thông minh, hiện đại và đẳng cấp.
                                          </p>
                                          <a href="/dich-vu" className="btn btn-primary">
                                                Liên Hệ Ngay
                                          </a>
                                    </div>
                              </div>
                              <div className="design-item">
                                    <div className="design-image">
                                          <img
                                                src="/images/interior-2.jpg"
                                                alt="Tư Vấn Không Gian Sống"
                                          />
                                    </div>
                                    <div className="design-content">
                                          <h3>Tư Vấn Không Gian Sống</h3>
                                          <p>
                                                Không chỉ là cung cấp nội thất, chúng tôi còn giúp bạn thiết
                                                kế một không gian sống hoàn hảo, phù hợp với phong cách và
                                                nhu cầu của bạn.
                                          </p>
                                          <a href="/tu-van" className="btn btn-primary">
                                                Liên Hệ Ngay
                                          </a>
                                    </div>
                              </div>
                        </div>
                  </div>
            </section>
      )
}
export default InteriorDesign;
