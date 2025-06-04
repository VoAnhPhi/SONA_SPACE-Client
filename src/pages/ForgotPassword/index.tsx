import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

enum RecoveryStep {
  EMAIL_INPUT = 1,
  OTP_VERIFICATION = 2,
  NEW_PASSWORD = 3
}

interface FormData {
  email: string;
  otp: string[];
  newPassword: string;
  confirmPassword: string;
}

const ForgotPassword: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<RecoveryStep>(RecoveryStep.EMAIL_INPUT);
  const [formData, setFormData] = useState<FormData>({
    email: "",
    otp: ["", "", "", "", "", ""],
    newPassword: "",
    confirmPassword: ""
  });
  const [passwordsMatch, setPasswordsMatch] = useState<boolean>(true);

  // Handle email input change
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      email: e.target.value
    });
  };

  // Handle OTP input change
  const handleOtpChange = (index: number, value: string) => {
    const newOtp = [...formData.otp];
    // Only allow one digit
    newOtp[index] = value.replace(/[^0-9]/g, "").slice(0, 1);
    
    setFormData({
      ...formData,
      otp: newOtp
    });

    // Auto focus to next input field if current field is filled
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) {
        nextInput.focus();
      }
    }
  };

  // Handle OTP input keydown for backspace
  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    // If backspace is pressed and current field is empty, focus previous field
    if (e.key === "Backspace" && !formData.otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      if (prevInput) {
        prevInput.focus();
      }
    }
  };

  // Handle password input change
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    // Check if passwords match when either password field changes
    if (name === "newPassword") {
      setPasswordsMatch(value === formData.confirmPassword || formData.confirmPassword === "");
    } else if (name === "confirmPassword") {
      setPasswordsMatch(value === formData.newPassword);
    }
  };

  // Handle email submission
  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the email to your backend
    // and request an OTP to be sent to the user's email
    console.log("Email submitted:", formData.email);
    setCurrentStep(RecoveryStep.OTP_VERIFICATION);
  };

  // Handle OTP verification
  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically verify the OTP with your backend
    console.log("OTP submitted:", formData.otp.join(""));
    setCurrentStep(RecoveryStep.NEW_PASSWORD);
  };

  // Handle resend OTP
  const handleResendOtp = () => {
    // Here you would typically resend the OTP to the user's email
    console.log("Resending OTP to:", formData.email);
    alert("Mã OTP đã được gửi lại đến email của bạn.");
  };

  // Handle new password submission
  const handleNewPasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate passwords match
    if (formData.newPassword !== formData.confirmPassword) {
      setPasswordsMatch(false);
      return;
    }
    
    // Here you would typically send the new password to your backend
    console.log("New password submitted");
    alert("Mật khẩu đã được đặt lại thành công. Vui lòng đăng nhập với mật khẩu mới.");
    // Redirect to login page after successful password reset
    window.location.href = "/dang-nhap";
  };

  return (
    <>
      <Header />
      <div className="forgot-password-page">
        <div className="container">
          <div className="forgot-password-content">
            {/* Step 1: Email Input */}
            {currentStep === RecoveryStep.EMAIL_INPUT && (
              <div className="step-content">
                <h1>Quên mật khẩu</h1>
                <p className="description">
                  Nếu bạn quên mật khẩu, hãy nhập địa chỉ email để đăng ký để nhận hướng dẫn đặt lại mật khẩu.
                </p>
                
                <form className="email-form" onSubmit={handleEmailSubmit}>
                  <div className="form-group">
                    <input 
                      type="email" 
                      id="email" 
                      name="email" 
                      placeholder="Email"
                      value={formData.email} 
                      onChange={handleEmailChange} 
                      required 
                    />
                  </div>
                  
                  <button type="submit" className="submit-btn">Xác nhận</button>
                </form>
              </div>
            )}
            
            {/* Step 2: OTP Verification */}
            {currentStep === RecoveryStep.OTP_VERIFICATION && (
              <div className="step-content">
                <h1>Nhập OTP</h1>
                <p className="description">
                  Bạn hãy kiểm tra email, chúng tôi đã gửi cho bạn mã OTP để thực hiện đặt lại mật khẩu.
                </p>
                
                <form className="otp-form" onSubmit={handleOtpSubmit}>
                  <div className="otp-inputs">
                    {formData.otp.map((digit, index) => (
                      <input 
                        key={index}
                        id={`otp-${index}`}
                        type="text" 
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleOtpChange(index, e.target.value)}
                        onKeyDown={(e) => handleOtpKeyDown(index, e)}
                        required
                      />
                    ))}
                  </div>
                  
                  <div className="resend-otp">
                    <button type="button" onClick={handleResendOtp}>Gửi lại mã</button>
                  </div>
                  
                  <button type="submit" className="submit-btn">Xác nhận</button>
                </form>
              </div>
            )}
            
            {/* Step 3: New Password */}
            {currentStep === RecoveryStep.NEW_PASSWORD && (
              <div className="step-content">
                <h1>Đặt lại mật khẩu mới</h1>
                <p className="description">
                  Hãy đặt lại mật khẩu mới cho lần đăng nhập tiếp theo.
                </p>
                
                <form className="new-password-form" onSubmit={handleNewPasswordSubmit}>
                  <div className="form-group">
                    <input 
                      type="password" 
                      id="newPassword" 
                      name="newPassword" 
                      placeholder="Mật Khẩu mới"
                      value={formData.newPassword} 
                      onChange={handlePasswordChange} 
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
                      onChange={handlePasswordChange} 
                      required
                      className={!passwordsMatch ? "error" : ""}
                    />
                    {!passwordsMatch && <p className="error-message">Mật khẩu không khớp</p>}
                  </div>
                  
                  <button type="submit" className="submit-btn">Xác nhận</button>
                </form>
              </div>
            )}
          </div>
        </div>
        
        {/* Design Services Showcase
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
                <img src="/images/design/design-consultation.jpg" alt="Bạn cần liên hệ hỗ trợ?" />
                <h3>Bạn cần liên hệ hỗ trợ?</h3>
              </div>
            </div>
          </div>
        </div> */}
      </div>
      <Footer />
    </>
  );
};

export default ForgotPassword;
