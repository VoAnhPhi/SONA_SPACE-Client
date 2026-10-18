import React from "react";
import { useCheckoutContext } from "../useCheckoutContext";

const PaymentMethodPicker: React.FC = () => {
  const {
    paymentMethod,
    handlePaymentMethodChange,
  } = useCheckoutContext();

  return (
    <div className="info-left-title-2">
      <h5>PHƯƠNG THỨC THANH TOÁN</h5>
      <div className={`payment-option ${paymentMethod === 'transfer' ? 'active' : ''}`}>
        <div className="method-option">
          <input
            className="input-radio"
            type="radio"
            name="paymentMethod"
            checked={paymentMethod === 'transfer'}
            onChange={() => handlePaymentMethodChange('transfer')}
          />
          <img src="/images/icons/cod.svg" alt="" width={30} height={30} />
          <span className="radio-label">Thanh toán khi nhận hàng</span>
        </div>
      </div>
      <div className={`payment-option ${paymentMethod === 'card' ? 'active' : ''}`}>
        <div className="method-option">
          <input
            className="input-radio"
            type="radio"
            name="paymentMethod"
            checked={paymentMethod === 'card'}
            onChange={() => handlePaymentMethodChange('card')}
          />
          <img src="/images/icons/momo.svg" alt="" width={30} height={30} />
          <span className="radio-label">Thanh toán qua ví momo</span>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethodPicker;
