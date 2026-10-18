import React from "react";
import { useAccountContext } from "../useAccountContext";

const InfoTab: React.FC = () => {
  const {
    userInfo,
    setUserInfo,
    handleUserInfoSubmit,
    showEditModal,
    setShowEditModal,
    showPasswordForm,
    setShowPasswordForm,
    passwordData,
    setPasswordData,
    provinces,
    wards,
    provinceCode,
    setProvinceCode,
    wardCode,
    setWardCode,
    street,
    setStreet,
    handlePasswordChange,
  } = useAccountContext();

  return (
    <div className="content-section info-section">
      {!showPasswordForm ? (
        <div className="profile-info-container">
          <div className="heading-content">
            <h2>Hồ sơ cá nhân</h2>
            <p>
              Xem và cập nhật thông tin hồ sơ của bạn, bao gồm tên,
              email và số điện thoại của bạn. Bạn cũng có thể cập
              nhật địa chỉ thanh toán hoặc thay đổi mật khẩu của
              mình.
            </p>
          </div>
          <div className="profile-info-header">
            <h3>Thông tin cá nhân</h3>
          </div>

          <div className="profile-info-grid">
            <div className="profile-info-item">
              <div className="info-label">Tên</div>
              <div className="info-value">
                {userInfo.full_name || userInfo.name}
              </div>
            </div>

            <div className="profile-info-item">
              <div className="info-label">Email</div>
              <div className="info-value">{userInfo.email}</div>
            </div>

            <div className="profile-info-item">
              <div className="info-label">Số điện thoại</div>
              <div className="info-value">{userInfo.phone}</div>
            </div>

            <div className="profile-info-item">
              <div className="info-label">Địa chỉ</div>
              <div className="info-value">
                {typeof userInfo.address === "string"
                  ? userInfo.address
                  : userInfo.address && userInfo.address.length > 0
                    ? userInfo.address[0]
                    : "Chưa cập nhật địa chỉ"}
              </div>
            </div>
          </div>

          <div className="profile-actions">
            <button
              className="btn-secondary"
              onClick={() => setShowPasswordForm(true)}
            >
              Đổi mật khẩu
            </button>
            <button
              className="btn-primary"
              onClick={() => setShowEditModal(true)}
            >
              Chỉnh sửa
            </button>
          </div>
        </div>
      ) : (
        <div className="profile-info-container">
          <div className="profile-info-header">
            <h3>Đổi mật khẩu</h3>
          </div>

          <div className="password-change-container">
            <p className="password-instruction">
              Bạn có thể thay đổi mật khẩu tài khoản của mình tại
              đây. Vui lòng nhập mật khẩu hiện tại, sau đó nhập mật
              khẩu mới và xác nhận lại để hoàn tất quá trình. Đảm
              bảo mật khẩu mới có độ bảo mật cao để bảo vệ tài khoản
              của bạn.
            </p>

            <form
              className="password-form"
              onSubmit={handlePasswordChange}
            >
              <div className="form-group">
                <div className="info-label">Nhập mật khẩu cũ</div>
                <input
                  type="password"
                  value={passwordData.currentPassword}
                  onChange={(e) =>
                    setPasswordData({
                      ...passwordData,
                      currentPassword: e.target.value,
                    })
                  }
                  className="password-input"
                  placeholder="Mật khẩu cũ"
                  required
                />
              </div>

              <div className="form-group">
                <div className="info-label">Nhập mật khẩu mới</div>
                <input
                  type="password"
                  value={passwordData.newPassword}
                  onChange={(e) =>
                    setPasswordData({
                      ...passwordData,
                      newPassword: e.target.value,
                    })
                  }
                  className="password-input"
                  placeholder="Mật khẩu mới"
                  required
                />
              </div>

              <div className="form-group">
                <div className="info-label">
                  Nhập lại mật khẩu mới
                </div>
                <input
                  type="password"
                  value={passwordData.confirmPassword}
                  onChange={(e) =>
                    setPasswordData({
                      ...passwordData,
                      confirmPassword: e.target.value,
                    })
                  }
                  className="password-input"
                  placeholder="Nhập lại mật khẩu mới"
                  required
                />
              </div>

              <div className="forgot-password">
                <a href="#">Quên mật khẩu?</a>
              </div>

              <div className="password-actions">
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => {
                    setShowPasswordForm(false);
                    setPasswordData({
                      currentPassword: "",
                      newPassword: "",
                      confirmPassword: "",
                    });
                  }}
                >
                  Trở về
                </button>
                <button type="submit" className="btn-primary">
                  Xác nhận
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal chỉnh sửa thông tin */}
      {showEditModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Chỉnh sửa thông tin</h3>
            <form
              className="info-form"
              onSubmit={handleUserInfoSubmit}
            >
              <div className="form-group">
                <label htmlFor="fullName">Họ và tên</label>
                <input
                  type="text"
                  id="fullName"
                  value={userInfo.name}
                  onChange={(e) =>
                    setUserInfo({
                      ...userInfo,
                      name: e.target.value,
                    })
                  }
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  value={userInfo.email}
                  onChange={(e) =>
                    setUserInfo({
                      ...userInfo,
                      email: e.target.value,
                    })
                  }
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone">Số điện thoại</label>
                <input
                  type="tel"
                  id="phone"
                  value={userInfo.phone}
                  onChange={(e) =>
                    setUserInfo({
                      ...userInfo,
                      phone: e.target.value,
                    })
                  }
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="address">Địa chỉ</label>

                {/* Tỉnh/Thành */}
                <select
                  aria-label="Tỉnh/Thành phố"
                  value={provinceCode}
                  onChange={(e) => setProvinceCode(e.target.value)}
                >
                  <option value="">Chọn Tỉnh/Thành phố (Việt Nam)</option>
                  {provinces.map(p => (
                    <option key={p.code} value={String(p.code)}>{p.name}</option>
                  ))}
                </select>

                {/* Phường/Xã */}
                <select
                  aria-label="Phường/Xã"
                  value={wardCode}
                  onChange={(e) => setWardCode(e.target.value)}
                  disabled={!provinceCode}
                  style={{ marginTop: 10 }}
                >
                  <option value="">Chọn Phường/Xã</option>
                  {wards.map(w => (
                    <option key={w.code} value={String(w.code)}>{w.name}</option>
                  ))}
                </select>

                {/* Số nhà, tên đường */}
                <input
                  type="text"
                  placeholder="Số nhà, tên đường"
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                  style={{ marginTop: 10 }}
                />
              </div>


              <div className="modal-actions">
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => setShowEditModal(false)}
                >
                  Hủy
                </button>
                <button type="submit" className="btn-primary">
                  Lưu thay đổi
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default InfoTab;
