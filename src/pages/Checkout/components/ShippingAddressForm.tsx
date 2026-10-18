import React from "react";
import { useCheckoutContext } from "../useCheckoutContext";

const ShippingAddressForm: React.FC = () => {
  const {
    formErrors,
    validateField,
    formData,
    handleInputChange,
    setShowAddressModal,
  } = useCheckoutContext();

  return (
<>
    <div className="info-left-title">
      <h5>THÔNG TIN GIAO HÀNG</h5>
    </div>
    <div className="info-left-form">
      <div className="form-info">
        <label htmlFor="fullName" >Họ và tên</label><br />
        <input type="text"
          id="fullName"
          name="fullName"
          placeholder="Nhập họ và tên"
          value={formData.fullName}
          onChange={handleInputChange}
          onBlur={(e) => validateField("fullName", e.target.value)}
          required />
        {formErrors.fullName && <small className="text-error">{formErrors.fullName}  </small>}
      </div>
      <div className="form-info">
        <label htmlFor="phone" >Số điện thoại</label><br />
        <input type="tel"
          id="phone"
          name="phone"
          placeholder="Nhập số điện thoại"
          value={formData.phone}
          onChange={handleInputChange}
          onBlur={(e) => validateField("phone", e.target.value)}
          required />
        {formErrors.phone && <small className="text-error">{formErrors.phone}  </small>}
      </div>
      <div className="form-info">
        <label htmlFor="email">Email</label><br />
        <input type="email"
          id="email"
          name="email"
          placeholder="Nhập email"
          value={formData.email}
          onChange={handleInputChange}
          onBlur={(e) => validateField("email", e.target.value)}
          required />
        {formErrors.email && <small className="text-error">{formErrors.email}  </small>}
      </div>
      <div className="form-info">
        <label htmlFor="address">Địa chỉ</label><br />
        <div className="address-input-wrapper">
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            readOnly
            placeholder="Nhập địa chỉ"
            onClick={() => setShowAddressModal(true)}
            onBlur={(e) => validateField("address", e.target.value)}
            required
          />
          <button
            type="button"
            className="edit-addr-btn"
            aria-label="Chỉnh sửa địa chỉ"
            onClick={() => setShowAddressModal(true)}
            title="Chỉnh sửa địa chỉ"
          >
            {/* Pencil (feather-like) */}
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"
              width="18" height="18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12.3 5.3l6.4 6.4M4 20l4.5-1 10.8-10.8a2 2 0 0 0 0-2.8l-1.7-1.7a2 2 0 0 0-2.8 0L4 15.2V20z" />
            </svg>
          </button>

        </div>
        {formErrors.address && <small className="text-error">{formErrors.address}</small>}
      </div>

    </div>
</>
  );
};

export default ShippingAddressForm;
