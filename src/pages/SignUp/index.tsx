import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  agreeToTerms: boolean;
}

const SignUp: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false
  });

  const [passwordsMatch, setPasswordsMatch] = useState<boolean>(true);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    // Check if passwords match when either password field changes
    if (name === "password" || name === "confirmPassword") {
      if (name === "password") {
        setPasswordsMatch(value === formData.confirmPassword || formData.confirmPassword === "");
      } else {
        setPasswordsMatch(value === formData.password);
      }
    }
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
    
    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setPasswordsMatch(false);
      return;
    }
    
    console.log("Form submitted:", formData);
    // Here you would typically send the data to your backend
    alert("Đăng ký thành công! Vui lòng đăng nhập để tiếp tục.");
    // Redirect to login page or home page after successful registration
  };

  return (
    <>
      <Header />
      <div className="signup-page">
        <div className="container">
          <div className="signup-content">
            <h1>Đăng Ký Tài Khoản</h1>
            <p className="signup-description">Đăng ký thành viên để nhận thêm nhiều ưu đãi hấp dẫn</p>
            
            <form className="signup-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <input 
                  type="text" 
                  id="fullName" 
                  name="fullName" 
                  placeholder="Nhập Họ Và Tên"
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
                  placeholder="Số điện thoại"
                  value={formData.phone} 
                  onChange={handleChange} 
                  required
                />
              </div>
              
              <div className="form-group">
                <input 
                  type="password" 
                  id="password" 
                  name="password" 
                  placeholder="Mật Khẩu"
                  value={formData.password} 
                  onChange={handleChange} 
                  required
                />
              </div>
              
              <div className="form-group">
                <input 
                  type="password" 
                  id="confirmPassword" 
                  name="confirmPassword" 
                  placeholder="Nhập lại mật khẩu"
                  value={formData.confirmPassword} 
                  onChange={handleChange} 
                  required
                  className={!passwordsMatch ? "error" : ""}
                />
                {!passwordsMatch && <p className="error-message">Mật khẩu không khớp</p>}
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
                  Tôi đã đọc và đồng ý với <Link to="/dieu-khoan">Điều Khoản</Link> và <Link to="/chinh-sach">Chính Sách Bảo Mật</Link>
                </label>
              </div>
              
              <button type="submit" className="signup-btn">Đăng ký</button>
            </form>
            
            <div className="social-signup">
              <div className="divider">
                <span>Đăng ký với Google</span>
              </div>
              
              <button className="google-signup-btn">
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
