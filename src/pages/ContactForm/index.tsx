import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  projectType: string;
  budget: string;
  message: string;
  agreeToTerms: boolean;
}

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    projectType: "",
    budget: "",
    message: "",
    agreeToTerms: false
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData({
      ...formData,
      [name]: checked
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Here you would typically send the data to your backend
    alert("Cảm ơn bạn đã gửi yêu cầu. Chúng tôi sẽ liên hệ với bạn sớm nhất có thể!");
  };

  return (
    <>
      <Header />
      <div className="contact-form-page">
        {/* Banner Section */}
        <section className="banner-section">
          <div className="container-fluid">
            <div className="banner-image">
              <img src="/images/banners/interior-design-banner.jpg" alt="Thiết kế nội thất" />
            </div>
          </div>
        </section>

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

        {/* Interior Design Intro */}
        <section className="design-intro">
          <div className="container">
            <h1 className="page-title">Interior Design</h1>
            <p className="intro-text">
              Bước vào thế giới nội thất thiết kế nội thất được chọn chút ít mỹ. Kết hợp hài 
              hòa giữa vẻ đẹp vượt thời gian và sự đổi mới hiện đại - giúp bạn biến không gian 
              sống thành hiện hữu hàng ngày và sáng tạo và điêu chuốt.
            </p>

            <div className="stats-container">
              <div className="stat-item">
                <h2>400+</h2>
                <p>Dự án đã hoàn thành</p>
              </div>
              <div className="stat-item">
                <h2>200+</h2>
                <p>Khách hàng hài lòng</p>
              </div>
              <div className="stat-item">
                <h2>100+</h2>
                <p>Phòng cách thiết kế</p>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="services-section">
          <div className="container">
            <h2 className="section-title">Dịch vụ của chúng tôi</h2>
            
            <div className="services-grid">
              <div className="service-item">
                <div className="service-icon">
                  <img src="/images/icons/lighting-design.svg" alt="Lighting Design" />
                </div>
                <div className="service-content">
                  <h3>Lighting Design</h3>
                  <p>Thiết kế ánh sáng cho không gian sống của bạn - Phối hợp ánh sáng tự nhiên và bổ sung nhân tạo.</p>
                </div>
              </div>
              
              <div className="service-item">
                <div className="service-icon">
                  <img src="/images/icons/interior-design.svg" alt="Interior Design" />
                </div>
                <div className="service-content">
                  <h3>Interior Design</h3>
                  <p>Kiến tạo nội thất giúp hiện mỹ và công năng - mỗi không gian kể câu chuyện sống của bạn.</p>
                </div>
              </div>
              
              <div className="service-item">
                <div className="service-icon">
                  <img src="/images/icons/outdoor-design.svg" alt="Outdoor Design" />
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
        <section className="how-we-work">
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
                  <img src="/images/design/connect-with-designer.jpg" alt="Kết nối với nhà thiết kế" />
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
                  <img src="/images/design/collaboration.jpg" alt="Hợp tác thiết kế" />
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
                  <img src="/images/design/completed-design.jpg" alt="Thiết kế hoàn thiện" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="contact-form-section">
          <div className="container">
            <h2 className="section-title">Bắt đầu hành trình thiết kế của bạn</h2>
            <p className="form-intro">
              Hãy cho chúng tôi biết về dự án của bạn và chúng tôi sẽ liên hệ với bạn để thảo luận chi tiết. Đội ngũ thiết kế của chúng tôi sẽ giúp bạn tạo ra không gian sống lý tưởng.
            </p>
            
            <form className="design-contact-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="fullName">Họ và tên *</label>
                  <input 
                    type="text" 
                    id="fullName" 
                    name="fullName" 
                    value={formData.fullName} 
                    onChange={handleChange} 
                    required 
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="email">E-mail *</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    value={formData.email} 
                    onChange={handleChange} 
                    required 
                  />
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="phone">Số điện thoại *</label>
                  <input 
                    type="tel" 
                    id="phone" 
                    name="phone" 
                    value={formData.phone} 
                    onChange={handleChange} 
                    required 
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="address">Địa chỉ dự án *</label>
                  <input 
                    type="text" 
                    id="address" 
                    name="address" 
                    value={formData.address} 
                    onChange={handleChange} 
                    required 
                  />
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="projectType">Loại dự án</label>
                  <select 
                    id="projectType" 
                    name="projectType" 
                    value={formData.projectType} 
                    onChange={handleChange}
                  >
                    <option value="">Chọn loại dự án</option>
                    <option value="apartment">Căn hộ</option>
                    <option value="house">Nhà phố</option>
                    <option value="villa">Biệt thự</option>
                    <option value="office">Văn phòng</option>
                    <option value="commercial">Thương mại</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label htmlFor="budget">Ngân sách dự kiến</label>
                  <select 
                    id="budget" 
                    name="budget" 
                    value={formData.budget} 
                    onChange={handleChange}
                  >
                    <option value="">Chọn ngân sách</option>
                    <option value="under-100m">Dưới 100 triệu</option>
                    <option value="100m-300m">100 - 300 triệu</option>
                    <option value="300m-500m">300 - 500 triệu</option>
                    <option value="500m-1b">500 triệu - 1 tỷ</option>
                    <option value="over-1b">Trên 1 tỷ</option>
                  </select>
                </div>
              </div>
              
              <div className="form-group full-width">
                <label htmlFor="message">Mô tả chi tiết dự án của bạn</label>
                <textarea 
                  id="message" 
                  name="message" 
                  rows={5} 
                  value={formData.message} 
                  onChange={handleChange}
                ></textarea>
              </div>
              
              <div className="form-group checkbox-group">
                <input 
                  type="checkbox" 
                  id="agreeToTerms" 
                  name="agreeToTerms" 
                  checked={formData.agreeToTerms} 
                  onChange={handleCheckboxChange} 
                  required 
                />
                <label htmlFor="agreeToTerms">
                  Tôi đồng ý với <a href="/dieu-khoan">Điều khoản dịch vụ</a> và <a href="/chinh-sach">Chính sách bảo mật</a>
                </label>
              </div>
              
              <button type="submit" className="submit-btn">Gửi</button>
            </form>
          </div>
        </section>

        {/* Design Showcase */}
        <section className="design-showcase">
          <div className="container">
            <div className="showcase-grid">
              <div className="showcase-item">
                <img src="/images/design/personalized-design.jpg" alt="Thiết kế cá nhân hóa" />
                <h3>Thiết kế cá nhân hóa</h3>
                <p>Làm nổi bật cá tính của bạn</p>
              </div>
              
              <div className="showcase-item">
                <img src="/images/design/material-samples.jpg" alt="Tìm hiểu về các mẫu vật liệu" />
                <h3>Tìm hiểu về các mẫu vật liệu</h3>
                <p>Đa dạng chất liệu cao cấp</p>
              </div>
              
              <div className="showcase-item">
                <img src="/images/design/design-consultation.jpg" alt="Bạn cần tư vấn thiết kế?" />
                <h3>Bạn cần tư vấn thiết kế?</h3>
                <p>Đội ngũ chuyên gia sẵn sàng hỗ trợ</p>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default ContactForm;
