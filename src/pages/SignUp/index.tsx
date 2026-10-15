import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import AuthLayout, { GoogleButton } from "../../components/AuthLayout";
import { useRegister } from "../../hooks/useRegister";
import { useGoogleLogin } from "../../hooks/useGoogleLogin";

type Province = { code: number; name: string };
type Ward = {
  code: number;
  name: string;
  division_type?: string;
  codename?: string;
  province_code?: number;
};

const OPEN_API = "https://provinces.open-api.vn/api/v2/";

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
    setFormData,
    handleChangeSelect,
  } = useRegister();

  const {
    googleLoading,
    googleError,
    handleGoogleLogin,
    handleGoogleError,
  } = useGoogleLogin();

  const [showModal, setShowModal] = useState(false);
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [wards, setWards] = useState<Ward[]>([]);
  const [street, setStreet] = useState<string>("");

  // Load provinces
  useEffect(() => {
    const ac = new AbortController();
    (async () => {
      try {
        const r = await fetch(`${OPEN_API}p/`, { signal: ac.signal });
        if (!r.ok) throw new Error("fetch provinces failed");
        const arr = await r.json();
        const list: Province[] = Array.isArray(arr)
          ? arr.map((p: any) => ({ code: p.code, name: p.name }))
          : [];
        setProvinces(list);
      } catch {
        setProvinces([]);
      }
    })();
    return () => ac.abort();
  }, []);

  // Load wards theo tỉnh
  useEffect(() => {
    const provinceCode = formData.provinceCode;
    if (!provinceCode) {
      setWards([]);
      // clear wardCode khi đổi tỉnh
      setFormData((prev) => ({ ...prev, wardCode: "" }));
      return;
    }

    const ac = new AbortController();
    (async () => {
      try {
        const r = await fetch(`${OPEN_API}p/${provinceCode}?depth=2`, {
          signal: ac.signal,
        });
        if (!r.ok) throw new Error("fetch province failed");
        const data = await r.json();

        let list: Ward[] = Array.isArray(data?.wards) ? data.wards : [];

        if ((!list || list.length === 0) && Array.isArray(data?.districts)) {
          const wardBatches = await Promise.all(
            data.districts.map((d: any) =>
              fetch(`${OPEN_API}d/${d.code}`, { signal: ac.signal })
                .then((x) => (x.ok ? x.json() : null))
                .catch(() => null)
            )
          );
          list = wardBatches.flatMap((d: any) =>
            Array.isArray(d?.wards) ? d.wards : []
          );
        }

        list = (list || []).filter((w) => {
          const t = (w.division_type || "").toLowerCase();
          return t === "phường" || t === "xã" || t === "thị trấn";
        });

        setWards(list);
        // clear wardCode khi đổi tỉnh
        setFormData((prev) => ({ ...prev, wardCode: "" }));
      } catch {
        setWards([]);
        setFormData((prev) => ({ ...prev, wardCode: "" }));
      }
    })();

    return () => ac.abort();
  }, [formData.provinceCode, setFormData]);

  // Tự ghép địa chỉ đầy đủ từ street + wardName + provinceName
  const provinceName = useMemo(
    () => provinces.find((p) => String(p.code) === formData.provinceCode)?.name,
    [provinces, formData.provinceCode]
  );
  const wardName = useMemo(
    () => wards.find((w) => String(w.code) === formData.wardCode)?.name,
    [wards, formData.wardCode]
  );

  useEffect(() => {
    const newAddress = [street, wardName, provinceName].filter(Boolean).join(", ");
    setFormData((prev) =>
      prev.address === newAddress ? prev : { ...prev, address: newAddress }
    );
  }, [street, wardName, provinceName, setFormData]);

  // Mở modal khi đăng ký thành công
  useEffect(() => {
    if (success) setShowModal(true);
  }, [success]);

  return (
    <>
      <AuthLayout
        title="Đăng ký tài khoản"
        subtitle="Đăng ký thành viên để nhận thêm nhiều ưu đãi hấp dẫn"
        wide
      >
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
          <div className="auth-row">
            <div className="auth-field">
              <label htmlFor="fullName">Họ và tên</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                autoComplete="name"
                placeholder="Nguyễn Văn A"
                value={formData.fullName}
                onChange={handleChange}
                className={errors.fullName ? "error" : ""}
                aria-invalid={!!errors.fullName}
                disabled={loading || success}
              />
              {errors.fullName && <p className="auth-error">{errors.fullName}</p>}
            </div>
            <div className="auth-field">
              <label htmlFor="phone">Số điện thoại</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                autoComplete="tel"
                placeholder="09xx xxx xxx"
                value={formData.phone}
                onChange={handleChange}
                className={errors.phone ? "error" : ""}
                aria-invalid={!!errors.phone}
                disabled={loading || success}
              />
              {errors.phone && <p className="auth-error">{errors.phone}</p>}
            </div>
          </div>

          <div className="auth-field">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              autoComplete="email"
              placeholder="ten@email.com"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? "error" : ""}
              aria-invalid={!!errors.email}
              disabled={loading || success}
            />
            {errors.email && <p className="auth-error">{errors.email}</p>}
          </div>

          <div className="auth-row">
            <div className="auth-field">
              <label htmlFor="password">Mật khẩu</label>
              <input
                type="password"
                id="password"
                name="password"
                autoComplete="new-password"
                value={formData.password}
                onChange={handleChange}
                className={errors.password ? "error" : ""}
                aria-invalid={!!errors.password}
                disabled={loading || success}
              />
              {errors.password && <p className="auth-error">{errors.password}</p>}
            </div>
            <div className="auth-field">
              <label htmlFor="confirmPassword">Nhập lại mật khẩu</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                autoComplete="new-password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={errors.confirmPassword ? "error" : ""}
                aria-invalid={!!errors.confirmPassword}
                disabled={loading || success}
              />
              {errors.confirmPassword && <p className="auth-error">{errors.confirmPassword}</p>}
            </div>
          </div>

          <div className="auth-row">
            <div className="auth-field">
              <label htmlFor="province">Tỉnh/Thành phố</label>
              <select
                id="province"
                name="provinceCode"
                value={formData.provinceCode}
                onChange={handleChangeSelect}
                className={errors.provinceCode ? "error" : ""}
                aria-invalid={!!errors.provinceCode}
                disabled={loading || success}
              >
                <option value="">Chọn Tỉnh/Thành phố</option>
                {provinces.map((p) => (
                  <option key={p.code} value={String(p.code)}>
                    {p.name}
                  </option>
                ))}
              </select>
              {errors.provinceCode && <p className="auth-error">{errors.provinceCode}</p>}
            </div>
            <div className="auth-field">
              <label htmlFor="ward">Phường/Xã</label>
              <select
                id="ward"
                name="wardCode"
                value={formData.wardCode}
                onChange={handleChangeSelect}
                disabled={!formData.provinceCode || loading || success}
                className={errors.wardCode ? "error" : ""}
                aria-invalid={!!errors.wardCode}
              >
                <option value="">Chọn Phường/Xã</option>
                {wards.map((w) => (
                  <option key={w.code} value={String(w.code)}>
                    {w.name}
                  </option>
                ))}
              </select>
              {errors.wardCode && <p className="auth-error">{errors.wardCode}</p>}
            </div>
          </div>

          <div className="auth-field">
            <label htmlFor="address">Địa chỉ</label>
            <input
              id="address"
              type="text"
              autoComplete="street-address"
              placeholder="Số nhà, tên đường"
              value={street}
              onChange={(e) => setStreet(e.target.value)}
              className={errors.address ? "error" : ""}
              aria-invalid={!!errors.address}
              disabled={loading || success}
            />
            {errors.address && <p className="auth-error">{errors.address}</p>}
          </div>

          <div className="auth-check">
            <input
              type="checkbox"
              id="agreeToTerms"
              name="agreeToTerms"
              checked={formData.agreeToTerms}
              onChange={handleCheckboxChange}
              disabled={loading || success}
            />
            <label htmlFor="agreeToTerms">
              Tôi đã đọc và đồng ý với <Link to="/dieu-khoan-su-dung">Điều khoản</Link> và{" "}
              <Link to="/chinh-sach-bao-mat">Chính sách bảo mật</Link>
            </label>
          </div>
          {errors.agreeToTerms && <p className="auth-error">{errors.agreeToTerms}</p>}

          <button type="submit" className="auth-btn" disabled={loading || success}>
            {loading ? "Đang xử lý..." : "Đăng ký"}
          </button>

          <div className="auth-divider">{googleLoading ? "Đang xử lý Google..." : "hoặc"}</div>
          {/* The Google provider is mounted at the root (main.tsx) */}
          <GoogleButton onSuccess={handleGoogleLogin} onError={handleGoogleError} text="signup_with" />

          <p className="auth-switch">
            Đã có tài khoản? <Link to="/dang-nhap">Đăng nhập</Link>
          </p>
        </form>
      </AuthLayout>

      {showModal && (
        <div className="custom-modal-backdrop" role="dialog" aria-modal="true">
          <div className="custom-modal">
            <div className="modal-header">
              <div className="success-icon">
                {/* Với Vite, ảnh trong public/ được truy cập từ /images/... */}
                <img src="/images/Email/checked.png" alt="Thành công" />
              </div>
              <h2>Đăng ký tài khoản thành công!</h2>
            </div>

            <div className="modal-body">
              <div className="success-message">
                <p>Chúc mừng! Bạn đã hoàn tất bước đầu tiên để trở thành thành viên của chúng tôi.</p>
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
                  <strong>Không nhận được email?</strong> Kiểm tra thư mục spam hoặc{" "}
                  <button className="link-button" type="button">
                    gửi lại email xác thực
                  </button>
                </p>
              </div>
            </div>

            <div className="modal-footer">
              <button className="modal-ok-button" onClick={() => setShowModal(false)}>
                Đã hiểu
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SignUp;
