import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { BannerSection } from "../../components/BannerSection";

interface FormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

const SignIn: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
    rememberMe: false
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
    // and handle authentication
  };

  return (
    <>
      <Header />
      <BannerSection title={"Đăng Nhập"} />
      <div className="signin-page">
        <div className="container">
          <div className="signin-content">
            <h1>Đăng Nhập</h1>
            <p className="signin-description">Chào mừng bạn trở lại!</p>
            
            <form className="signin-form" onSubmit={handleSubmit}>
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
                  type="password" 
                  id="password" 
                  name="password" 
                  placeholder="Mật Khẩu"
                  value={formData.password} 
                  onChange={handleChange} 
                  required
                />
              </div>
              
              <div className="form-options">
                <div className="remember-me">
                  <input 
                    type="checkbox" 
                    id="rememberMe" 
                    name="rememberMe" 
                    checked={formData.rememberMe} 
                    onChange={handleCheckboxChange} 
                  />
                  <label htmlFor="rememberMe">Ghi nhớ tài khoản</label>
                </div>
                <div className="forgot-password">
                  <Link to="/quen-mat-khau">Quên mật khẩu?</Link>
                </div>
              </div>
              
              <button type="submit" className="signin-btn">Đăng Nhập</button>
            </form>
            
            <div className="social-signin">
              <div className="divider">
                <span>Đăng nhập với Google</span>
              </div>
              
              <button className="google-signin-btn">
                <img src="/images/sign-up/Google.svg" alt="Google" />
                <span>Google</span>
              </button>
            </div>  
            
            <div className="signup-link">
              <p>Bạn chưa có tài khoản? <Link to="/dang-ky">Đăng Ký ngay</Link></p>
            </div>
          </div>
        </div>
        
       
      </div>
      <Footer />
    </>
  );
};

export default SignIn;
