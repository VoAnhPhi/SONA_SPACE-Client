const Footer = () => {
  return (
    <>
      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-column">
              <h3>Dịch vụ khách hàng</h3>
              <ul>
                <li>
                  <a href="/lien-he">Liên hệ</a>
                </li>
                <li>
                  <a href="/tra-cuu-don-hang">Tra cứu đơn hàng</a>
                </li>
                <li>
                  <a href="/chinh-sach-van-chuyen">Chính sách vận chuyển</a>
                </li>
                <li>
                  <a href="/chinh-sach-doi-tra">Chính sách đổi trả</a>
                </li>
              </ul>
            </div>
            <div className="footer-column">
              <h3>Thông tin</h3>
              <ul>
                <li>
                  <a href="/ve-chung-toi">Về chúng tôi</a>
                </li>
                <li>
                  <a href="/blog">Blog</a>
                </li>
                <li>
                  <a href="/cua-hang">Cửa hàng</a>
                </li>
              </ul>
            </div>
            <div className="footer-column">
              <h3>Liên hệ với chúng tôi</h3>
              <ul>
                <li>
                  <a href="tel:+84123456789">+84 123 456 789</a>
                </li>
                <li>
                  <a href="mailto:info@sonaspace.com">info@sonaspace.com</a>
                </li>
                <li>
                  <p>123 Đường ABC, Quận XYZ, TP.HCM</p>
                </li>
              </ul>
            </div>
            <div className="footer-column">
              <h3>Theo dõi chúng tôi</h3>
              <div className="social-icons">
                <a href="#" className="social-icon facebook"></a>
                <a href="#" className="social-icon instagram"></a>
                <a href="#" className="social-icon youtube"></a>
                <a href="#" className="social-icon tiktok"></a>
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
            <p>Thông tin cookie</p>
            <p>Chính sách bảo mật</p>
            <div className="payment-icons">
              <img src="/images/payment-icons.png" alt="Payment methods" />
            </div>
            <div className="language">
              <p>Translate</p>
              <div className="language-icons">
                <img src="/images/language-icons.png" alt="Language icons" />
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
