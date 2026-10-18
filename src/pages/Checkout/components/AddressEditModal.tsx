import React from "react";
import { useCheckoutContext } from "../useCheckoutContext";

const AddressEditModal: React.FC = () => {
  const {
    setShowAddressModal,
    provinces,
    wards,
    provinceCode,
    setProvinceCode,
    wardCode,
    setWardCode,
    street,
    setStreet,
    handleSaveAddress,
  } = useCheckoutContext();

  return (
    <div className="address-edit-overlay" onClick={() => setShowAddressModal(false)}>
      <div
        className="address-edit-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="address-edit-title"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="aem-header">
          <h3 id="address-edit-title">Cập nhật địa chỉ giao hàng</h3>
          <button
            type="button"
            className="aem-close"
            onClick={() => setShowAddressModal(false)}
            aria-label="Đóng hộp thoại địa chỉ"
          >
            ×
          </button>
        </div>

        <div className="aem-body">
          <div className="form-row">
            <label htmlFor="address-province">Tỉnh/Thành phố</label>
            <select
              id="address-province"
              value={provinceCode}
              onChange={e => setProvinceCode(e.target.value)}
              className="select-field"
            >
              <option value="">-- Chọn Tỉnh/Thành --</option>
              {provinces.map(p => (
                <option key={p.code} value={p.code}>{p.name}</option>
              ))}
            </select>
          </div>

          <div className="form-row">
            <label htmlFor="address-ward">Phường/Xã</label>
            <select
              id="address-ward"
              value={wardCode}
              onChange={e => setWardCode(e.target.value)}
              disabled={!provinceCode}
              className="select-field"
            >
              <option value="">-- Chọn Phường/Xã --</option>
              {wards.map(w => (
                <option key={w.code} value={w.code}>{w.name}</option>
              ))}
            </select>
          </div>

          <div className="form-row">
            <label htmlFor="address-street">Số nhà, Tên đường</label>
            <input
              id="address-street"
              type="text"
              value={street}
              onChange={e => setStreet(e.target.value)}
              placeholder="VD: 123 Lê Lợi"
            />
          </div>
        </div>

        <div className="aem-footer">
          <button type="button" className="btn-secondary" onClick={() => setShowAddressModal(false)}>Hủy</button>
          <button type="button" className="btn-primary" onClick={handleSaveAddress}>Lưu</button>
        </div>
      </div>
    </div>
  );
};

export default AddressEditModal;
