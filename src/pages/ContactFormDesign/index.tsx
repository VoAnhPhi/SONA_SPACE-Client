import React, { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  message: string;
  agreeToTerms: boolean;
}

const ContactFormDesign: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    phone: "",
    message: "",
    agreeToTerms: false
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
      <div className="contact-design-page">
        {/* Banner Section */}
        <div className="store-banner">
          <img src="/images/store-front.jpg" alt="SONA SPACE Store Front" />
        </div>

        <div className="container">
          <div className="contact-design-wrapper">
            {/* Store Information Section */}
            <div className="store-info-section">
              <h1>Hãy liên hệ với chúng tôi</h1>
              <p className="intro-text">
                Nâng tầm không gian của bạn với những thiết kế nội thất mang biệt phẩm ánh. 
                Phong cách và trải nghiệm đẳng cấp của bạn, được chăm sóc và tinh 
                xảo để mang đến trải nghiệm sống khó quên.
              </p>

              <div className="info-items">
                <div className="info-item">
                  <div className="icon">
                    <img src="/images/icons/location.svg" alt="Location Icon" />
                  </div>
                  <div className="content">
                    <h3>Địa chỉ</h3>
                    <p>235 PNVB Avenue, New York, NY 10003, United States</p>
                  </div>
                </div>

                <div className="info-item">
                  <div className="icon">
                    <img src="/images/icons/clock.svg" alt="Clock Icon" />
                  </div>
                  <div className="content">
                    <h3>Giờ làm việc</h3>
                    <p>Saturday-Sunday: 9:00 - 21:00</p>
                    <p>Monday-Friday: 9:00 - 22:00</p>
                  </div>
                </div>

                <div className="info-item">
                  <div className="icon">
                    <img src="/images/icons/phone.svg" alt="Phone Icon" />
                  </div>
                  <div className="content">
                    <h3>Số điện thoại</h3>
                    <p>Mobile: (+84) 546-6789</p>
                    <p>Hotline: (+84) 546-6789</p>
                  </div>
                </div>
              </div>

              <div className="contact-message">
                <h2>Chúng tôi rất mong nhận được phản hồi từ bạn</h2>
                <p>
                  Để biết thêm thông tin về sản phẩm và dịch vụ của chúng tôi. Vui lòng gửi 
                  email cho chúng tôi. Đội ngũ nhân viên của chúng tôi luôn sẵn sàng trả lời 
                  bạn. Đừng ngại ngùng!
                </p>
                <p className="email-contact">Hoặc liên hệ trực tiếp với chúng tôi qua <strong>sonaspce.@gmail.com</strong></p>
              </div>
            </div>

            {/* Contact Form Section */}
            <div className="contact-form-container">
              <form className="design-contact-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <input 
                    type="text" 
                    id="fullName" 
                    name="fullName" 
                    placeholder="Nhập họ và tên"
                    value={formData.fullName} 
                    onChange={handleChange} 
                    required 
                  />
                </div>
                
                <div className="form-group">
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    placeholder="Email"
                    value={formData.email} 
                    onChange={handleChange} 
                    required 
                  />
                </div>
                
                <div className="form-group">
                  <input 
                    type="tel" 
                    id="phone" 
                    name="phone" 
                    placeholder="Số Điện Thoại"
                    value={formData.phone} 
                    onChange={handleChange} 
                  />
                </div>
                
                <div className="form-group">
                  <textarea 
                    id="message" 
                    name="message" 
                    rows={5} 
                    placeholder="Tin nhắn"
                    value={formData.message} 
                    onChange={handleChange}
                    required
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
                    I agree to the terms and privacy policy
                  </label>
                </div>
                
                <button type="submit" className="submit-btn">Gửi</button>
              </form>
            </div>
          </div>
        </div>

        {/* Design Services Showcase */}
        <div className="design-services">
          <div className="container">
            <div className="services-grid">
              <div className="service-item">
                <img src="/images/design/personalized-design.jpg" alt="Thiết kế cá nhân hóa" />
                <h3>Thiết kế cá nhân hóa</h3>
                <p>Liên hệ ngay để được tư vấn</p>
              </div>
              
              <div className="service-item">
                <img src="/images/design/material-samples.jpg" alt="Tìm hiểu về các mẫu vật liệu" />
                <h3>Tìm hiểu thêm về các mẫu vật liệu</h3>
              </div>
              
              <div className="service-item">
                <img src="/images/design/design-consultation.jpg" alt="Bạn cần tư vấn thiết kế?" />
                <h3>Bạn cần liên hệ hỗ trợ?</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ContactFormDesign;
