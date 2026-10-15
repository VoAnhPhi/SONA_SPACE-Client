import React from "react";
import { Link } from "react-router-dom";
import AuthLayout, { GoogleButton } from "../../components/AuthLayout";
import { useLogin } from "../../hooks/useLogin";
import { useGoogleLogin } from "../../hooks/useGoogleLogin";

const SignIn: React.FC = () => {
  const {
    formData,
    errors,
    loading,
    success,
    apiError,
    handleChange,
    handleCheckboxChange,
    handleSubmit,
    unverifiedError,
  } = useLogin();
  const { googleLoading, googleError, handleGoogleLogin, handleGoogleError } = useGoogleLogin();

  return (
    <AuthLayout title="Đăng nhập" subtitle="Chào mừng bạn trở lại!">
      {success && (
        <div className="auth-alert auth-alert--ok" role="status">
          Đăng nhập thành công! Đang chuyển hướng đến trang chủ...
        </div>
      )}
      {unverifiedError && (
        <div className="auth-alert" role="alert">
          {unverifiedError}
        </div>
      )}
      {apiError && (
        <div className="auth-alert" role="alert">
          {apiError}
        </div>
      )}
      {googleError && (
        <div className="auth-alert" role="alert">
          {googleError}
        </div>
      )}

      <form className="auth-form" onSubmit={handleSubmit} noValidate>
        <div className="auth-field">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="ten@email.com"
            autoComplete="username"
            value={formData.email}
            onChange={handleChange}
            className={errors.email ? "error" : ""}
            aria-invalid={!!errors.email}
          />
          {errors.email && <p className="auth-error">{errors.email}</p>}
        </div>

        <div className="auth-field">
          <label htmlFor="password">Mật khẩu</label>
          <input
            type="password"
            id="password"
            name="password"
            autoComplete="current-password"
            value={formData.password}
            onChange={handleChange}
            className={errors.password ? "error" : ""}
            aria-invalid={!!errors.password}
          />
          {errors.password && <p className="auth-error">{errors.password}</p>}
        </div>

        <div className="auth-options">
          <div className="auth-check">
            <input
              type="checkbox"
              id="rememberMe"
              name="rememberMe"
              checked={formData.rememberMe}
              onChange={handleCheckboxChange}
            />
            <label htmlFor="rememberMe">Ghi nhớ tài khoản</label>
          </div>
          <Link to="/quen-mat-khau">Quên mật khẩu?</Link>
        </div>

        <button type="submit" className="auth-btn" disabled={loading || success}>
          {loading ? "Đang xử lý..." : "Đăng nhập"}
        </button>

        <div className="auth-divider">{googleLoading ? "Đang xử lý Google..." : "hoặc"}</div>
        <GoogleButton onSuccess={handleGoogleLogin} onError={handleGoogleError} text="signin_with" />

        <p className="auth-switch">
          Bạn chưa có tài khoản? <Link to="/dang-ky">Đăng ký ngay</Link>
        </p>
      </form>
    </AuthLayout>
  );
};

export default SignIn;
