const Footer = () => {
  return (
    <>
      {/* Footer */}
      <footer className="footer">

        <div className="design-tips">
          <div className="container">
            <div className="tips-grid">
              <div className="tips-grid-aside">
                <div className="tip-item">
                  <img className="tip-item-img" src="/images/tip-1.jpg" alt="Thiết kế có nhân hóa" />
                  <div className="content">
                    <h3>Thiết kế cá nhân hóa</h3>
                    <p>Liên hệ ngay để được tư vấn</p>
                  </div>
                </div>
              </div>
              <div className="tips-grid-bside">
                <div className="tip-item">
                  <img src="/images/tip-2.jpg" alt="Mẫu vật liệu" />
                  <h3>Tìm hiểu thêm về các mẫu vật liệu</h3>
                </div>
                <div className="tip-item">
                  <img src="/images/tip-3.jpg" alt="Thư viện" />
                  <h3>Bạn cần liên hệ hỗ trợ</h3>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="footer-grid">
            <div className="footer-column">
              <ul>
                <li>
                  <a href="/dich-vu">Dịch vụ khách hàng</a>
                </li>
                <li>
                  <a href="/cua-hang-gan-ban">Tìm cửa hàng gần bạn</a>
                </li>
                <li>
                  <a href="/the-qua-tang">Mua thẻ quà tặng</a>
                </li>
                <li>
                  <a href="/ve-chung-toi">Về Sona Space</a>
                </li>
              </ul>
            </div>
            <div className="footer-column">
              <ul>
                <li>
                  <a href="/room">Phong cách</a>
                </li>
                <li>
                  <a href="/ho-so">Trung tâm hỗ trợ</a>
                </li>
                <li>
                  <a href="/ve-chung-toi">Câu chuyện thương hiệu</a>
                </li>
              </ul>
            </div>
            <div className="footer-column">
              <ul>
                <li>
                  <a href="/faq">Câu hỏi thường gặp</a>
                </li>
                <li>
                  <a href="/orders">Theo dõi đơn hàng</a>
                </li>
                <li>
                  <a href="/privacy-policy">Chính sách đổi trả</a>
                </li>
              </ul>
            </div>
            <div className="footer-column">
              <ul>
                <li>
                  <a href="/thong-tin-van-chuyen">Thông tin vận chuyển</a>
                </li>
                <li>
                  <a href="/khuyen-mai">Chương trình thành viên</a>
                </li>
                <li>
                  <a href="/khuyen-mai-doc-quyen">Ưu đãi độc quyền</a>
                </li>
              </ul>
            </div>
            <div className="footer-column">
              <h3>Theo dõi chúng tôi</h3>
              <div className="social-icons">
                <a href="#" className="social-icon facebook">
                  <img src="./public/images/icons/facebook.svg" alt="" />
                </a>
                <a href="#" className="social-icon instagram">
                  <img src="./public/images/icons/ins.svg" alt="" />
                </a>
                <a href="#" className="social-icon pinterest">
                  <img src="./public/images/icons/pint.svg" alt="" />
                </a>
                <a href="#" className="social-icon phone">
                  <img src="./public/images/icons/phone.svg" alt="" />
                </a>
              </div>
            </div>
            <div className="footer-column">
              <h3>Xem thêm ưu đãi</h3>
              <a href="/dang-ky" className="btn btn-primary">
                Đăng ký ngay
              </a>
            </div>
          </div>

          <div className="footer-bottom">
            <p>
              Tất cả giá đều là giá bán lẻ đề xuất bằng Việt Nam Đồng (₫) và đã
              bao gồm VAT.
            </p>
            <p>
              <a href="/chinh-sach-bao-mat">Thông tin cookie</a>
            </p>
            <p>
              <a href="/dieu-khoan-su-dung">Chính sách bảo mật</a>
            </p>
            <div className="payment-icons">
              <img src="/images/payment-icons.png" alt="Payment methods" />
            </div>
            <div className="language">
              <p>Translate</p>
              <div className="language-icons">
                <img src="/images/icons/lang_vie.svg" alt="Language icons" />
                <span>Việt Nam</span>
                <span className="icon-arrow-down"><img src="/images/icons/arrow-down-black.svg" alt="" /></span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
