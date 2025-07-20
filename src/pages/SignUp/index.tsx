import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { BannerSection } from "../../components/BannerSection";
import { useRegister } from "../../hooks/useRegister";
import { useLogin } from "../../hooks/useLogin";

const SignUp: React.FC = () => {
  const {
    formData,
    errors,
    loading,
    success,
    apiError,
    handleChange,
    handleCheckboxChange,
    handleSubmit,
  } = useRegister();
  const { handleGoogleLogin, handleGoogleError } = useLogin();

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (success) {
      setShowModal(true);
    }
  }, [success]);

  return (
    <>
      <Header />
      <BannerSection title={"Đăng Ký Tài Khoản"} />
      <div className="signup-page">
        <div className="container">
          <div className="signup-content">
            <h1>Đăng Ký Tài Khoản</h1>
            <p className="signup-description">
              Đăng ký thành viên để nhận thêm nhiều ưu đãi hấp dẫn
            </p>

            {apiError && (
              <div className="error-message api-error">{apiError}</div>
            )}

            <form className="signup-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  placeholder="Nhập Họ Và Tên"
                  value={formData.fullName}
                  onChange={handleChange}
                  className={errors.fullName ? "error" : ""}
                />
                {errors.fullName && (
                  <p className="error-message">{errors.fullName}</p>
                )}
              </div>

              <div className="form-group">
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  className={errors.email ? "error" : ""}
                />
                {errors.email && (
                  <p className="error-message">{errors.email}</p>
                )}
              </div>

              <div className="form-group">
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  placeholder="Số điện thoại"
                  value={formData.phone}
                  onChange={handleChange}
                  className={errors.phone ? "error" : ""}
                />
                {errors.phone && (
                  <p className="error-message">{errors.phone}</p>
                )}
              </div>

              <div className="form-group">
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Mật Khẩu"
                  value={formData.password}
                  onChange={handleChange}
                  className={errors.password ? "error" : ""}
                />
                {errors.password && (
                  <p className="error-message">{errors.password}</p>
                )}
              </div>

              <div className="form-group">
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="Nhập lại mật khẩu"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={errors.confirmPassword ? "error" : ""}
                />
                {errors.confirmPassword && (
                  <p className="error-message">{errors.confirmPassword}</p>
                )}
              </div>

              <div className="form-group">
                <textarea
                  id="address"
                  name="address"
                  placeholder="Địa chỉ"
                  value={formData.address}
                  onChange={handleChange}
                  className={errors.address ? "error" : ""}
                  rows={3}
                ></textarea>
                {errors.address && (
                  <p className="error-message">{errors.address}</p>
                )}
              </div>

              <div className="form-group checkbox-group">
                <input
                  type="checkbox"
                  id="agreeToTerms"
                  name="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={handleCheckboxChange}
                />
                <label htmlFor="agreeToTerms">
                  Tôi đã đọc và đồng ý với{" "}
                  <Link to="/dieu-khoan">Điều Khoản</Link> và{" "}
                  <Link to="/chinh-sach">Chính Sách Bảo Mật</Link>
                </label>
              </div>
              {errors.agreeToTerms && (
                <p className="error-message">{errors.agreeToTerms}</p>
              )}

              <button
                type="submit"
                className="signup-btn"
                disabled={loading || success}
              >
                {loading ? "Đang xử lý..." : "Đăng ký"}
              </button>
            </form>

            <div className="social-signup">
              <div className="divider">
                <span>Đăng ký với Google</span>
              </div>

              <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
                <GoogleLogin
                  onSuccess={handleGoogleLogin}
                  onError={() => {
                    console.log("Login error");
                  }}
                />
              </GoogleOAuthProvider>
              {/* <button className="google-signin-btn" disabled={loading || success}>
                <img src="/images/sign-up/Google.svg" alt="Google" />
                <span>Google</span>
              </button> */}
            </div>

            <div className="login-link">
              <p>
                Đã có tài khoản? <Link to="/dang-nhap">Đăng Nhập</Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="custom-modal-backdrop">
          <div className="custom-modal">

            <div className="modal-header">
              <div className="success-icon">
                <img src="/images/Email/checked.png" alt="" />
              </div>
              <h2>Đăng ký tài khoản thành công!</h2>
            </div>

            <div className="modal-body">
              <div className="success-message">
                <p>
                  Chúc mừng! Bạn đã hoàn tất bước đầu tiên để trở thành thành viên của chúng tôi.
                </p>
              </div>

              <div className="next-steps">
                <div className="step-item">
                  <img src="/images/Email/mail.png" alt="" className="step-icon" />
                  <div className="step-content">
                    <h4>Kiểm tra email xác thực</h4>
                    <p>Chúng tôi đã gửi email xác thực đến địa chỉ email bạn đã đăng ký</p>
                  </div>
                </div>

                <div className="step-item">
                  <img src="/images/Email/clock.png" alt="" className="step-icon" />
                  <div className="step-content">
                    <h4>Thời gian hiệu lực</h4>
                    <p>Link xác thực có hiệu lực trong vòng 24 giờ</p>
                  </div>
                </div>

                <div className="step-item">
                  <img src="/images/Email/shield.png" alt="" className="step-icon" />
                  <div className="step-content">
                    <h4>Bảo mật tài khoản</h4>
                    <p>Xác thực email giúp bảo vệ tài khoản của bạn</p>
                  </div>
                </div>
              </div>

              <div className="help-section">
                <p className="help-text">
                  <strong>Không nhận được email?</strong> Kiểm tra thư mục spam hoặc
                  <button className="link-button">gửi lại email xác thực</button>
                </p>
              </div>
            </div>

            <div className="modal-footer">
              <button
                className="modal-ok-button"
                onClick={() => setShowModal(false)}
              >
                Đã hiểu
              </button>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
};

export default SignUp;
