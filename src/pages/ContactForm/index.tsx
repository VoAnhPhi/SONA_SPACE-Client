import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import type { ContactForm } from "../../types";
import {
  sendContactFormService,
  validateContactForm,
} from "../../services/contactForm.ts";
import { toast, ToastContainer } from "react-toastify";

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<ContactForm>({
    fullName: "",
    email: "",
    phone: "",
    message: "",
    agreeToTerms: false,
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      setFormData({
        ...formData,
        [name]: (e.target as HTMLInputElement).checked,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors = validateContactForm(formData);
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      toast.error("Vui lòng kiểm tra lại thông tin đã nhập.");
      return;
    }

    setIsLoading(true);

    try {
      // Call the new service function
      await sendContactFormService(formData);
      toast.success(
        "Cảm ơn bạn đã gửi yêu cầu. Chúng tôi sẽ liên hệ với bạn sớm nhất có thể!"
      );
      // Clear form on successful submission
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        message: "",
        agreeToTerms: false,
      });
    } catch (error: any) {
      // Service layer throws a formatted error, so we can use it directly
      const msg = error?.message || "Đã xảy ra lỗi. Vui lòng thử lại sau.";
      toast.error(msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Header />
      <div className="contact-design-page">
        <div className="container ">
          <div className="contact-design-wrapper S">
            {/* Store Information Section */}
            <div className="store-info-section ">
              <h1>Hãy liên hệ với chúng tôi</h1>
              <p className="intro-text">
                Nâng tầm không gian của bạn với những thiết kế nội thất mang
                biệt phản ánh phong cách và trải nghiệm đẳng cấp của bạn, được
                chăm sóc và tinh xảo để mang đến trải nghiệm sống khó quên.
              </p>
              <div className="info-items ">
                <div className="info-item">
                  <div className="icon">
                    <img
                      src="/images/Contact/map-pinned.svg"
                      alt="Location Icon"
                      className="rounded-full "
                    />
                  </div>
                  <div className="content">
                    <h3>Địa chỉ</h3>
                    <p>
                      <a
                        href="https://www.google.com/maps?q=235+PNVB+Avenue,+New+York,+NY+10003"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Nhà T, CS3-Tòa nhà QTSC9, CVPM QUang Trung, Phường Trung Mỹ Tây, TP HCM
                      </a>
                    </p>
                  </div>
                </div>
                <div className="info-item ">
                  <div className="icon">
                    <img src="/images/Contact/clock.svg" alt="Clock Icon" />
                  </div>
                  <div className="content">
                    <h3>Giờ làm việc</h3>
                    <p>Thứ bảy - Chủ nhật: 9:00 - 21:00</p>
                    <p>Thứ hai -Thứ sáu: 9:00 - 22:00</p>
                  </div>
                </div>
                <div className="info-item">
                  <div className="icon">
                    <img
                      src="/images/Contact/phone.svg"
                      alt="Phone Icon"
                      className="rounded-full "
                    />
                  </div>
                  <div className="content">
                    <h3>Số điện thoại</h3>
                    <p>
                      Mobile:{" "}
                      <a href="tel:+845466789" className="">
                        (+84) 546-6789
                      </a>
                    </p>
                    <p>
                      Hotline:{" "}
                      <a href="tel:+845466789" className="">
                        (+84) 546-6789
                      </a>
                    </p>
                  </div>
                </div>
              </div>
              <div className="contact-message">
                <h2>Chúng tôi rất mong nhận được phản hồi từ bạn</h2>
                <p>
                  Để biết thêm thông tin về sản phẩm và dịch vụ của chúng tôi.
                  Vui lòng gửi email cho chúng tôi. Đội ngũ nhân viên của chúng
                  tôi luôn sẵn sàng trả lời bạn. Đừng ngại ngùng!
                </p>
                <p className="email-contact ">
                  Hoặc liên hệ trực tiếp với chúng tôi qua{" "}
                  <a
                    href="https://mail.google.com/mail/?view=cm&fs=1&to=sonaspace.furniture@gmail.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className=""
                  >
                    <strong>sonaspce.furniture@gmail.com</strong>
                  </a>
                </p>
              </div>
            </div>
            {/* Contact Form Section */}
            <div className="contact-form-container flex-1">
              <form className="design-contact-form" onSubmit={handleSubmit}>
                <div className="form-group ">
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    placeholder="Nhập họ và tên"
                    value={formData.fullName}
                    onChange={handleChange}
                    className=""
                  />
                  {errors.fullName && (
                    <p className="error-message ">{errors.fullName}</p>
                  )}
                </div>
                <div className="form-group ">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    className=""
                  />
                  {errors.email && (
                    <p className="error-message ">{errors.email}</p>
                  )}
                </div>
                <div className="form-group ">
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    placeholder="Số Điện Thoại"
                    value={formData.phone}
                    onChange={handleChange}
                    className=""
                  />
                  {errors.phone && (
                    <p className="error-message ">{errors.phone}</p>
                  )}
                </div>
                <div className="form-group ">
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    placeholder="Tin nhắn"
                    value={formData.message}
                    onChange={handleChange}
                    className=""
                  ></textarea>
                  {errors.message && (
                    <p className="error-message ">{errors.message}</p>
                  )}
                </div>
                <div className="form-group ">
                  <div className="checkbox-text ">
                    <input
                      type="checkbox"
                      id="agreeToTerms"
                      name="agreeToTerms"
                      checked={formData.agreeToTerms}
                      onChange={handleChange}
                      className="mt-1"
                    />
                    Tôi đồng ý với
                    <a
                      href="/dieu-khoan-su-dung"
                      target="_blank"
                      rel="noopener noreferrer"
                      className=""
                    >
                      Điều khoản dịch vụ
                    </a>
                    &nbsp;và&nbsp;
                    <a
                      href="/chinh-sach-bao-mat"
                      target="_blank"
                      rel="noopener noreferrer"
                      className=""
                    >
                      Chính sách bảo mật
                    </a>
                  </div>
                </div>
                {errors.agreeToTerms && (
                  <p className="error-message">{errors.agreeToTerms}</p>
                )}
                <button
                  type="submit"
                  className="submit-btn "
                  disabled={isLoading}
                >
                  {isLoading ? "Đang gửi..." : "Gửi"}
                </button>
              </form>
            </div>
          </div>
          <div className="my-project">
            <p className="member">Thành viên dự án</p>
            <p className="section-description">
              Chúng tôi – những thành viên đứng sau dự án SONA SPACE – luôn mang trong mình ngọn lửa nhiệt huyết, <br /> mong muốn lan tỏa sản phẩm nội thất đến nhiều người dùng, mang lại những giá trị thiết thực và bền vững cho cuộc sống.
            </p>
            <div className="project-grid">
              <div className="project-item">
                <img src="https://res.cloudinary.com/dmgrdgvcf/image/upload/v1756121499/z6943089968774_f0b000d346a9bc76249002ff8ab337cc_gfach5.jpg" alt="Project 1" />
                <div className="overlay">
                  <h3>Võ Đoàn Anh Phi</h3>
                  <p> Một chàng trai đầy khát vọng, nuôi dưỡng ước mơ trở thành
                    Business Analyst và Full-Stack Developer. Không chỉ dừng lại ở công nghệ,
                    cậu ấy còn hướng đến hành trình chinh phục tấm bằng Cử nhân Công nghệ thông tin –
                    nơi đam mê gặp gỡ tri thức.</p>
                </div>
              </div>

              <div className="project-item">
                <img src="https://res.cloudinary.com/dmgrdgvcf/image/upload/v1756121989/z6943793633210_dc3e8ed626ba024756464067d780e34e_n0ldqn.jpg" alt="Project 2" />
                <div className="overlay">
                  <h3>Nguyễn Hồng Thái</h3>
                  <p>    Một người đầy nhiệt huyết, khao khát trở thành Team Leader bản lĩnh,
                    đồng thời theo đuổi con đường Business Analyst và Full Stack Developer.
                    Anh hướng đến việc gắn kết công nghệ với giá trị kinh doanh, dẫn dắt
                    đội nhóm chạm tới thành công. </p>
                </div>
              </div>

              <div className="project-item">
                <img src="https://res.cloudinary.com/dmgrdgvcf/image/upload/v1756122329/z6943811819910_04e48941c6a73fa10ed931cb2ea605e4_crmlbj.jpg" alt="Project 3" />
                <div className="overlay">
                  <h3>Tô Trọng Nhân</h3>
                  <p>Với đam mê công nghệ và khát vọng chinh phục tri thức,
                    Nhân định hướng trở thành một Full Stack Developer chuyên nghiệp.
                    Cậu mong muốn không ngừng phát triển, làm chủ cả front-end lẫn back-end,
                    để tạo ra những sản phẩm công nghệ sáng tạo và giá trị.</p>
                </div>
              </div>

              <div className="project-item">
                <img src="https://res.cloudinary.com/dmgrdgvcf/image/upload/v1756122644/z6943829101313_cb3ced254846ccd82c24d9a9bf01a170_nw0usy.jpg" alt="Project 4" />
                <div className="overlay">
                  <h3>Trần Thanh Tú</h3>
                  <p> Một người đầy khát vọng với mục tiêu trở thành Business Analyst và Full Stack Developer.
                    Tú hướng đến việc làm chủ nhiều ngôn ngữ lập trình, phát triển toàn diện kỹ năng để khẳng định
                    bản thân trong những dự án công nghệ đầy thử thách.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ContactForm;
