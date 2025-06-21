import React from "react";

interface SeemoreProps {
  onClick: () => void;
}

const Seemore: React.FC<SeemoreProps> = ({ onClick }) => {
  return (
    <div
      className="box-seemore"
      onClick={onClick}
      style={{ cursor: "pointer" }}
    >
      <div className="container">
        <p style={{ textAlign: "center", margin: "0" }}>Xem thêm sản phẩm</p>
        <div className="arow-seemore">
          <img src="/images/products/arow.svg" alt="arrow" />
          <img src="/images/products/arow.svg" alt="arrow" />
          
        </div>
      </div>
    </div>
  );
};

export default Seemore;
