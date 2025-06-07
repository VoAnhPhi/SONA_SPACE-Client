const PolicyProduct = () => {
  return (
    <>
      {/* Header/Navigation */}
      <section className="Policy-full">
        <div className="container">
        <div className="box-policy">

            <div className="box-policy-1">
                <div className="policy-text">Chính sách & Hỗ trợ</div>
                <p className="p">Chúng tôi cung cấp chính sách đổi trả linh hoạt và hỗ trợ tận tình để bạn an tâm khi mua sắm nội thất.</p>
            </div>
            <div className="box-policy-2">
                <img src="/images/products/ship.svg" alt="" />
                <div className="policy-text">Vận chuyển</div>
                <p className="p">Giao hàng nhanh chóng, an toàn đến tận nhà bạn với dịch vụ vận chuyển chuyên nghiệp.</p>
            </div>
            <div className="box-policy-2">
                <img src="/images/products/support.svg" alt="" />
                <div className="policy-text">Hỗ trợ 24/7</div>
                <p className="p">Đội ngũ tư vấn luôn sẵn sàng giải đáp mọi thắc mắc của bạn mọi lúc, mọi nơi.</p>
            </div>
            <div className="box-policy-2">
               <img src="/images/products/money.svg" alt="" />
                <div className="policy-text">Hoàn tiền & Bảo hành</div>
                <p className="p">Chính sách hoàn tiền linh hoạt và bảo hành dài hạn, đảm bảo quyền lợi khách hàng.</p>
            </div>
        </div>
        </div>
        </section>
    </>
  );
};

export default PolicyProduct;
