import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import type { ContactFormDesign, Room } from "../../types";
import { sendContactFormDesignService } from "../../services/contactService";
import { toast } from "react-toastify";
import { fetchRoomSimilar } from "../../services/roomService";
import { validateFormContactDesign } from "../../services/contactService";
import Showcase from "../../components/ShowCase/ShowCase";

const ContactFormDesign: React.FC = () => {
  const [agreeToTerms, setAgreeToTerms] = useState<boolean>(false);
  const [roomSimilar, setRoomSimilar] = useState<Room[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState<ContactFormDesign>({
    name: "",
    email: "",
    phone: "",
    room_name: "",
    custom_room_name: "",
    design_description: "",
    require_design: "",
    style_design: "",
    budget: "",
    different_information: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const fetchRoomSimilarData = async () => {
      const roomSimilarData = await fetchRoomSimilar();
      setRoomSimilar(roomSimilarData);
      // console.log("roomSimilarData", roomSimilarData);
    };
    fetchRoomSimilarData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    if (type === "checkbox") {
      setAgreeToTerms(checked);
    } else {
      const newFormData = { ...formData, [name]: value };
      setFormData(newFormData);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validateFormContactDesign({ ...formData, agreeToTerms });
    if (!agreeToTerms) newErrors.agreeToTerms = "Bạn phải đồng ý với điều khoản và chính sách";
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;
    setIsLoading(true);

    const payload = {
      ...formData,
      room_name: formData.room_name == "__custom" ? formData.custom_room_name || "" : formData.room_name,
    }

    delete payload.custom_room_name;

    try {
      const response = await sendContactFormDesignService(payload);
      if (response) {
        toast.success("Cảm ơn bạn đã gửi yêu cầu. Chúng tôi sẽ liên hệ với bạn sớm nhất có thể!");
        setFormData({
          name: "",
          email: "",
          phone: "",
          room_name: "",
          design_description: "",
          style_design: "",
          require_design: "",
          budget: "",
          different_information: "",
        });
        setAgreeToTerms(false);
      }
    } catch (error: any) {
      const msg = error?.response?.data?.error || error?.message || "Gửi yêu cầu thất bại";
      toast.error(msg);
    } finally {
      setIsLoading(false);
    }
  };

  const scrollToForm = () => {
    const form = document.querySelector(".contact-form-section") as HTMLElement;
    form && window.scrollTo({
      top: form.getBoundingClientRect().top + window.scrollY - 100,
      behavior: "smooth"
    });
  };

  return (
    <>
      <Header />
      <div className="contact-form-page">
        {/* Banner Section */}
        <div className="banner-section">
          <div className="container-fluid">
            <div className="container">
              <img src="/images/ContactFormDesign/bannerdesign.jpg" alt="Thiết kế nội thất" />
            </div>
          </div>
        </div>

        {/* Breadcrumb */}
        <div className="breadcrumb-container">
          <div className="container">
            <div className="breadcrumb">
              <Link to="/">Trang chủ</Link>
              <span>/</span>
              <span className="active">Thiết kế nội thất</span>
            </div>
          </div>
        </div>

        {/* Services Section */}
        <section className="services-section mt-94">
          <div className="container">
            <h2 className="section-title">Dịch vụ của chúng tôi</h2>

            <div className="services-grid">
              <div className="service-item">
                <div className="service-icon">
                  <img src="/images/ContactFormDesign/Lightingdesignicon.jpg" alt="Lighting Design" />
                </div>
                <div className="service-content">
                  <h3>Lighting Design</h3>
                  <p>Thiết kế ánh sáng cho không gian sống của bạn - Phối hợp ánh sáng tự nhiên và bổ sung nhân tạo.</p>
                </div>
              </div>

              <div className="service-item">
                <div className="service-icon">
                  <img src="/images/ContactFormDesign/Interiordesignicon.jpg" alt="Interior Design" />
                </div>
                <div className="service-content">
                  <h3>Interior Design</h3>
                  <p>Kiến tạo nội thất giúp hiện mỹ và công năng - mỗi không gian kể câu chuyện sống của bạn.</p>
                </div>
              </div>

              <div className="service-item">
                <div className="service-icon">
                  <img src="/images/ContactFormDesign/Outdoordesignicon.jpg" alt="Outdoor Design" />
                </div>
                <div className="service-content">
                  <h3>Outdoor Design</h3>
                  <p>Biến không gian ngoài vườn thành nơi thư giãn và nghỉ ngơi - sống xanh với phong cách sống - bồn mưa điều hòa tạo cảm hứng mới.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How We Work Section */}
        <section className="how-we-work mt-94">
          <div className="container">
            <h2 className="section-title">Cách Sona Space Hoạt Động</h2>

            <div className="steps-container">
              <div className="step-item">
                <div className="step-number">01</div>
                <div className="step-content">
                  <h3>Kết nối với nhà thiết kế phù hợp</h3>
                  <p>
                    Với hơn 10 năm kinh nghiệm cùng 100.000+ Khách hàng hài lòng, đội ngũ của chúng tôi sẽ giúp bạn tìm kiếm nhà thiết kế phù hợp với phong cách và ngân sách của bạn. Chúng tôi sẽ hỗ trợ bạn trong suốt quá trình thiết kế.
                  </p>
                </div>
                <div className="step-image">
                  <img src="/images/ContactFormDesign/connect_01.jpg" alt="Kết nối với nhà thiết kế" />
                </div>
              </div>

              <div className="step-item">
                <div className="step-number">02</div>
                <div className="step-content">
                  <h3>Hợp tác để tạo nên không gian lý tưởng</h3>
                  <p>
                    Làm việc trực tiếp với nhà thiết kế để cùng bạn tạo nên không gian vừa đáp ứng công năng vừa có tính thẩm mỹ cao. Mỗi thiết kế sẽ được tùy chỉnh không quá 30 ngày thực hiện, chính nghi thiết kế hoàn hảo.
                  </p>
                </div>
                <div className="step-image">
                  <img src="/images/ContactFormDesign/connect_02.jpg" alt="Hợp tác thiết kế" />
                </div>
              </div>

              <div className="step-item">
                <div className="step-number">03</div>
                <div className="step-content">
                  <h3>Để dáng mạng thiết kế về ngôi nhà của bạn</h3>
                  <p>
                    Chúng tôi hợp tác với hơn 100 thương hiệu nội thất uy tín, đảm bảo mỗi không gian đều đặc sắc, đầy cá tính và sáng tạo. Với SONA SPACE, bạn có thể thanh toàn nhanh chóng, kiểm soát ngân sách và được cam kết với giá hợp lý nhất.
                  </p>
                </div>
                <div className="step-image">
                  <img src="/images/ContactFormDesign/connect_03.jpg" alt="Thiết kế hoàn thiện" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* quy trình thiết kế nội thất */}
        <section className="design-process mt-94" aria-labelledby="design-process-title">
          <div className="container">
            <h2 id="design-process-title" className="section-title">Quy trình thiết kế tại Sona Space</h2>

            <ol className="process-timeline">
              {/* 01. Tiếp nhận yêu cầu */}
              <li className="process-step">
                <div className="step-index">01</div>
                <div className="step-body">
                  <h3 className="step-title">Tiếp nhận yêu cầu</h3>
                  <p className="step-desc">
                    Hệ thống ghi nhận thông tin dự án của bạn.
                    <br />
                    Trong vòng 24 giờ làm việc, đội ngũ sẽ liên hệ để xác nhận lại nhu cầu và gợi ý stylist/phong cách phù hợp.
                  </p>
                </div>
              </li>

              {/* 02. Liên hệ & chốt khảo sát */}
              <li className="process-step">
                <div className="step-index">02</div>
                <div className="step-body">
                  <h3 className="step-title">Liên hệ &amp; chốt lịch khảo sát</h3>
                  <p className="step-desc">
                    Đội ngũ của Sona Space sẽ liên hệ với bạn để <b>chốt địa chỉ</b> và <b>ngày/giờ khảo sát</b> công trình mà khách hàng muốn thiết kế.
                    <br /> Gửi checklist những gì cần chuẩn bị.
                  </p>
                </div>
              </li>

              {/* 03. Khảo sát hiện trạng */}
              <li className="process-step">
                <div className="step-index">03</div>
                <div className="step-body">
                  <h3 className="step-title">Khảo sát công trình hiện trạng</h3>
                  <p className="step-desc">
                    Các nhà thiết kế nội thất của Sona Space sẽ đo đạc, chụp ảnh, ghi nhận hiện trạng điện–nước–kết cấu (phần kết cấu phối hợp kiến trúc sư).
                    <br /> Cùng với đó lập mặt bằng hiện trạng 2D và tiến hành thảo luận về phong cách thiết kế.
                  </p>
                </div>
              </li>

              {/* 04. Concept & wireframe + cọc 30% */}
              <li className="process-step">
                <div className="step-index">04</div>
                <div className="step-body">
                  <h3 className="step-title">Lên concept &amp; wireframe</h3>
                  <p className="step-desc">
                    Sau khi làm rõ các ý tưởng của bạn, nhà thiết kế của chúng tôi sẽ xây dựng moodboard, phối hợp phong cách, bố trí mặt bằng 2D sơ bộ.
                    <br />
                    Đồng thời Sona Space sẽ thu <b>cọc 30%</b> để khởi động vòng lặp chỉnh sửa theo ý kiến của bạn cho đến khi bạn ưng ý hoàn toàn với bản thiết kế.
                    <br />
                    Sau khi bạn ưng ý với bản thiết kế, nhà thiết kế có thể sẽ đề xuất một số sản phẩm của Sona Space để bạn có thể lựa chọn.
                  </p>
                </div>
              </li>
              {/* 05. Bàn giao & quyết toán */}
              <li className="process-step">
                <div className="step-index">05</div>
                <div className="step-body">
                  <h3 className="step-title">Bàn giao hồ sơ &amp; quyết toán</h3>
                  <p className="step-desc">
                    Bàn giao file CAD, PDF, ảnh 3D, bảng khối lượng &amp; báo giá thi công.
                    <br />
                    Quyết toán phần phí còn lại.
                  </p>
                </div>
              </li>
            </ol>

            {/* Meta khuôn mẫu: mốc thanh toán, chỉnh sửa, trạng thái mapping */}
            <div className="process-infobox">
              <div className="infobox-item">
                <h4>Các mốc thanh toán</h4>
                <ul>
                  <li><b>Lần 1 — 30%:</b> Khi duyệt concept &amp; wireframe.</li>
                  <li><b>Lần 2:</b> Khi bàn giao toàn bộ hồ sơ.</li>
                </ul>
              </div>
              <div className="infobox-item">
                <h4>Chính sách chỉnh sửa</h4>
                <ul>
                  <li>Chỉnh sửa theo vòng phản hồi ở giai đoạn concept cho đến khi ưng ý.</li>
                  <li>Giai đoạn hồ sơ chi tiết: cho phép chỉnh tối ưu nhỏ trong phạm vi công năng.</li>
                  <li>Render 3D cuối: phí 500.000đ nếu yêu cầu xem/in bộ ảnh xuất ra.</li>
                </ul>
              </div>
              <div className="infobox-item">
                <h4>Tóm tắt luồng thiết kế</h4>
                <ul>
                  <li><b>Tiếp nhận yêu cầu</b></li>
                  <li><b>Liên hệ & chốt lịch khảo sát</b></li>
                  <li><b>Khảo sát công trình hiện trạng</b></li>
                  <li><b>Lên concept & wireframe</b></li>
                  <li><b>Bàn giao hồ sơ & quyết toán</b></li>
                </ul>
              </div>
            </div>

            <div className="process-cta">
              {/* Thêm id cho form ở dưới để anchor hoạt động */}
              <a className="btn-primary" href="#design-form" onClick={scrollToForm}>Bắt đầu dự án của bạn ngay</a>
            </div>
          </div>
        </section>


        <section className="showcase-section mt-94">
          <div className="container">
            <Showcase categoryName="tu-van-va-thiet-ke" />
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="contact-form-section mt-94">
          <div className="container">
            <div className="form-intro-container">
              <h2 className="section-title">Bắt đầu hành trình thiết kế của bạn</h2>
              <p className="form-intro">
                Hãy cho chúng tôi biết về dự án của bạn và chúng tôi sẽ liên hệ với bạn để thảo luận chi tiết. Đội ngũ thiết kế của chúng tôi sẽ giúp bạn tạo ra không gian sống lý tưởng.
              </p>
            </div>

            <form className="design-contact-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group floating-label">
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder=" "
                    value={formData.name}
                    onChange={handleChange}
                  />
                  <label htmlFor="name">Họ và tên *</label>
                  {errors.name && <p className="error-message">{errors.name}</p>}
                </div>

                <div className="form-group floating-label">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder=" "
                    value={formData.email}
                    onChange={handleChange}
                  />
                  <label htmlFor="email">E-mail *</label>
                  {errors.email && <p className="error-message">{errors.email}</p>}
                </div>
              </div>

              <div className="form-row">

                <div className="form-group floating-label">
                  <select
                    id="room_name"
                    name="room_name"
                    value={formData.room_name}
                    onChange={handleChange}
                  >
                    <option value="" disabled hidden>Chọn không gian</option>
                    {roomSimilar.map((room) => (
                      <option key={room.room_name} value={room.room_name}>{room.room_name}</option>
                    ))}
                    <option value="__custom">Khác</option>
                  </select>
                  {/* Nếu chọn Khác thì hiện ô nhập tên không gian */}
                  <label htmlFor="room_name">Không gian *</label>
                  {errors.room_name && <p className="error-message">{errors.room_name}</p>}
                  {formData.room_name == "__custom" && (
                    <input
                      type="text"
                      name="custom_room_name"
                      placeholder="Nhập không gian khác..."
                      value={formData.custom_room_name || ""}
                      onChange={handleChange}
                      style={{ marginTop: "12px" }}
                    />
                  )}
                  {errors.custom_room_name && <p className="error-message">{errors.custom_room_name}</p>}
                </div>

                <div className="form-group floating-label">
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    placeholder=" "
                    value={formData.phone}
                    onChange={handleChange}
                  />
                  <label htmlFor="phone">Số điện thoại *</label>
                  {errors.phone && <p className="error-message">{errors.phone}</p>}
                </div>
              </div>

              <div className="form-group full-width floating-label">
                <textarea
                  id="design_description"
                  name="design_description"
                  placeholder=" "
                  rows={5}
                  value={formData.design_description}
                  onChange={handleChange}
                ></textarea>
                <label htmlFor="design_description">Mô tả sơ lược về yêu cầu thiết kế</label>
                {errors.design_description && <p className="error-message">{errors.design_description}</p>}
              </div>

              <div className="form-group floating-label">
                <input
                  type="text"
                  id="style_design"
                  name="style_design"
                  placeholder=" "
                  value={formData.style_design}
                  onChange={handleChange}
                />
                <label htmlFor="style_design">Phong cách bạn muốn</label>
                {errors.style_design && <p className="error-message">{errors.style_design}</p>}
              </div>

              <div className="form-group floating-label">
                <input
                  type="text"
                  id="require_design"
                  name="require_design"
                  placeholder=" "
                  value={formData.require_design}
                  onChange={handleChange}
                />
                <label htmlFor="require_design">Yêu cầu khác</label>
                {errors.require_design && <p className="error-message">{errors.require_design}</p>}
              </div>

              <div className={`form-group floating-label ${formData.budget ? 'has-value' : ''}`}>
                <select
                  id="budget"
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                >
                  <option value="" disabled hidden>Chọn ngân sách</option>
                  <option value="30000000">Dưới 30 triệu</option>
                  <option value="50000000">30 - 50 triệu</option>
                  <option value="100000000">50 - 100 triệu</option>
                  <option value="200000000">100 - 200 triệu</option>
                  <option value="300000000">Trên 200 triệu</option>
                </select>
                <label htmlFor="budget">Ngân sách</label>
                {errors.budget && <p className="error-message">{errors.budget}</p>}
              </div>


              <div className="form-group full-width floating-label">
                <textarea
                  id="different_information"
                  name="different_information"
                  placeholder=" "
                  value={formData.different_information}
                  onChange={handleChange}
                ></textarea>
                <label htmlFor="different_information">Lưu ý khác</label>
              </div>

              <div className="form-group checkbox-group">
                <input
                  type="checkbox"
                  id="agreeToTerms"
                  name="agreeToTerms"
                  checked={agreeToTerms}
                  onChange={handleChange}
                />
                <div className="checkbox-text">
                  Tôi đồng ý với
                  <a href="/dieu-khoan-su-dung" target="_blank" rel="noopener noreferrer">Điều khoản dịch vụ</a> &nbsp;và&nbsp;
                  <a href="/chinh-sach-bao-mat" target="_blank" rel="noopener noreferrer">Chính sách bảo mật</a>
                </div>
              </div>
              {errors.agreeToTerms && <p className="error-message">{errors.agreeToTerms}</p>}
              <button disabled={isLoading} type="submit" className="submit-btn">
                {isLoading ? "Đang gửi..." : "Gửi"}
              </button>
            </form>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default ContactFormDesign;