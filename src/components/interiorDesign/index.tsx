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
                                                Mỗi khách hàng đều mang một cá tính riêng. Tại SONA SPACE, bạn được tự do chọn phong cách, màu sắc và bố trí theo đúng ý tưởng. Đội ngũ chuyên gia sẽ lắng nghe và hiện thực hóa từng chi tiết theo đúng "gu" sống của bạn.
                                          </p>
                                          <a href="/dich-vu" className="btn btn-primary">
                                                Xem thêm
                                                <i className="icon">
                                                      <svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M13.9128 4L9.8048 1M13.9128 4L9.8048 7M13.9128 4H1.12402"
                                                                  stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                                      </svg>
                                                </i>
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
                                                Không chỉ đẹp mà còn thông minh – thiết kế của chúng tôi chú trọng vào sự tiện nghi và bố trí hợp lý. Dù là căn hộ nhỏ hay biệt thự rộng rãi, mọi thứ sẽ được sắp xếp tinh tế và tối ưu nhất.
                                          </p>
                                          <a href="/tu-van" className="btn btn-primary">
                                                Xem thêm
                                                <i className="icon">
                                                      <svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M13.9128 4L9.8048 1M13.9128 4L9.8048 7M13.9128 4H1.12402"
                                                                  stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                                      </svg>
                                                </i>
                                          </a>
                                    </div>
                              </div>
                        </div>
                  </div>
            </section>
      )
}
export default InteriorDesign;
