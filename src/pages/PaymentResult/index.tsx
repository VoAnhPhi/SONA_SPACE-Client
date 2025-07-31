import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { convertToAdminApiUrl } from "../../utils/url";

const PaymentResult: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const processPaymentResult = async () => {
      const searchParams = new URLSearchParams(window.location.search);
      const resultCode = searchParams.get("resultCode");
      const orderInfo = searchParams.get("orderInfo"); 
      const orderHash = orderInfo?.split("#")[1];

      if (resultCode === "0" && orderHash) {
        try {
          const res = await axios.get(convertToAdminApiUrl(`/orders/hash/${orderHash}`));

          if (res.data.success && res.data.order) {
            navigate(`/dat-hang-thanh-cong/${orderHash}`);
          } else {
            navigate("/thanh-toan");
          }
        } catch (error) {
          console.error("Lỗi khi xác minh đơn hàng:", error);
          navigate("/thanh-toan");
        }
      } else {
        navigate("/thanh-toan");
      }

      setLoading(false);
    };

    processPaymentResult();
  }, [navigate]);

  return <p>{loading ? "Đang xử lý kết quả thanh toán..." : "Đang chuyển hướng..."}</p>;
};

export default PaymentResult;
