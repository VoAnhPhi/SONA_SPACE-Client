import React from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { BannerSection } from "../../components/BannerSection";
import { useRegister } from "../../hooks/useRegister";
import "./styles.css";

const SignUp: React.FC = () => {
  const {
    formData,
    errors,
    loading,
    success,
    apiError,
    handleChange,
    handleCheckboxChange,
    handleSubmit
  } = useRegister();

  return (
    <>
      <Header />
      <BannerSection title={"Đăng Ký Tài Khoản"} />
      <div className="signup-page">
        <div className="container">
          <div className="signup-content">
            <h1>Đăng Ký Tài Khoản</h1>
            <p className="signup-description">Đăng ký thành viên để nhận thêm nhiều ưu đãi hấp dẫn</p>
            
            {success && (
              <div className="success-message">
                Đăng ký thành công! Đang chuyển hướng đến trang đăng nhập...
              </div>
            )}
            
            {apiError && (
              <div className="error-message api-error">
                {apiError}
              </div>
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
                {errors.fullName && <p className="error-message">{errors.fullName}</p>}
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
                {errors.email && <p className="error-message">{errors.email}</p>}
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
                {errors.phone && <p className="error-message">{errors.phone}</p>}
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
                {errors.password && <p className="error-message">{errors.password}</p>}
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
                {errors.confirmPassword && <p className="error-message">{errors.confirmPassword}</p>}
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
                {errors.address && <p className="error-message">{errors.address}</p>}
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
                  Tôi đã đọc và đồng ý với <Link to="/dieu-khoan">Điều Khoản</Link> và <Link to="/chinh-sach">Chính Sách Bảo Mật</Link>
                </label>
                {errors.agreeToTerms && <p className="error-message">{errors.agreeToTerms}</p>}
              </div>
              
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
              
              <button className="google-signup-btn" disabled={loading || success}>
                <img src="/images/sign-up/Google.svg" alt="Google" />
                <span>Google</span>
              </button>
            </div>
            
            <div className="login-link">
              <p>Đã có tài khoản? <Link to="/dang-nhap">Đăng Nhập</Link></p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SignUp;
