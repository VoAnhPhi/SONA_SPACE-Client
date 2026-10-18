import React, { lazy, Suspense } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import PageHero from "@/components/PageHero";
import { EmptyState } from "@/components/StateFeedback";
import { getAuthToken } from "@/shared/auth/token-storage";
import NotFoundPage from "@/pages/NotFound";
import { useAccountPage } from "./useAccountPage";
import { AccountCtx } from "./useAccountContext";
import OrdersTab from "./tabs/OrdersTab";
import InfoTab from "./tabs/InfoTab";
import PromoTab from "./tabs/PromoTab";
import PurchasesTab from "./tabs/PurchasesTab";

const CancelOrderModal = lazy(() => import("@/components/CancelOrderModal"));

const TAB_PATHS: Record<string, string> = {
  orders: "/tai-khoan",
  info: "/tai-khoan/thong-tin",
  promo: "/tai-khoan/ma-giam-gia",
  wishlist: "/tai-khoan/don-hang",
};

const tabFromPath = (pathname: string): string => {
  if (pathname === "/tai-khoan/thong-tin") return "info";
  if (pathname === "/tai-khoan/ma-giam-gia") return "promo";
  if (pathname === "/tai-khoan/don-hang") return "wishlist";
  return "orders";
};

const isKnownPath = (pathname: string): boolean =>
  pathname.replace(/\/$/, "") === "/tai-khoan" ||
  Object.values(TAB_PATHS).includes(pathname.replace(/\/$/, ""));

const Account: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const account = useAccountPage();
  const { handleLogout, showCancelModal, handleCancelModalClose, handleCancelOrderSubmit, isCancelling, selectedOrderHash, selectedOrderId } = account;
  const activeTab = tabFromPath(location.pathname);
  if (!isKnownPath(location.pathname)) return <NotFoundPage />;
  const handleTabNavigation = (tab: string) => navigate(TAB_PATHS[tab] ?? TAB_PATHS.orders);

  const accountHero = (
    <PageHero
      title="Tài khoản của bạn"
      breadcrumbs={[{ label: "Trang chủ", to: "/" }, { label: "Tài khoản" }]}
    />
  );

  if (!getAuthToken()) {
    return (
      <>
        {accountHero}
        <div className="account-guest">
          <EmptyState
            title="Đăng nhập để xem tài khoản"
            message="Theo dõi đơn hàng, quản lý địa chỉ và mã giảm giá sau khi đăng nhập."
            actionLabel="Đăng nhập"
            actionTo="/dang-nhap"
            secondaryActionLabel="Tạo tài khoản"
            secondaryActionTo="/dang-ky"
          />
        </div>
      </>
    );
  }

  return (
    <>
      {accountHero}
      <div className="user-account-page">
        <div className="container">
          <div className="account-wrapper">
            {/* Sidebar Navigation */}
            <div className="account-sidebar">
              <div className="sidebar-header">
                <h3>Quản lý tài khoản</h3>
              </div>
              <ul className="sidebar-menu">
                <li className={activeTab === "orders" ? "active" : ""}>
                  <button onClick={() => handleTabNavigation("orders")}>
                    <i className="icon-box">
                      <img src="/images/icons/Puzzle.svg" alt="icon-box" />
                    </i>
                    <span>Tổng quan</span>
                  </button>
                </li>
                <li className={activeTab === "info" ? "active" : ""}>
                  <button onClick={() => handleTabNavigation("info")}>
                    <i className="icon-user">
                      <img src="/images/icons/User_02.svg" alt="icon-box" />
                    </i>
                    <span>Thông tin cá nhân</span>
                  </button>
                </li>
                <li className={activeTab === "promo" ? "active" : ""}>
                  <button onClick={() => handleTabNavigation("promo")}>
                    <i className="icon-gift">
                      <img
                        src="/images/icons/Ticket_Voucher.svg"
                        alt="icon-box"
                      />
                    </i>
                    <span>Mã giảm giá</span>
                  </button>
                </li>
                <li className={activeTab === "wishlist" ? "active" : ""}>
                  <button onClick={() => handleTabNavigation("wishlist")}>
                    <i className="icon-heart">
                      <img
                        src="/images/icons/Shopping_Cart_02.svg"
                        alt="icon-box"
                      />
                    </i>
                    <span>Đơn hàng</span>
                  </button>
                </li>
                <li>
                  <button onClick={handleLogout}>
                    <i className="icon-logout">
                      <img src="/images/icons/Log_Out.svg" alt="icon-box" />
                    </i>
                    <span>Đăng xuất</span>
                  </button>
                </li>
              </ul>
            </div>

            {/* Main Content Area */}
            <div className="account-content">
              <AccountCtx.Provider value={account}>
                <Routes>
                  <Route index element={<OrdersTab />} />
                  <Route path="thong-tin" element={<InfoTab />} />
                  <Route path="ma-giam-gia" element={<PromoTab />} />
                  <Route path="don-hang" element={<PurchasesTab />} />
                </Routes>
              </AccountCtx.Provider>
            </div>
          </div>
        </div>

        {/* Design Services Showcase */}
      </div>

      {/* Modal hủy đơn hàng */}
      {showCancelModal && (
        <Suspense fallback={null}>
          <CancelOrderModal
            visible={showCancelModal}
            onCancel={handleCancelModalClose}
            onSubmit={handleCancelOrderSubmit}
            loading={isCancelling}
            orderHash={selectedOrderHash}
            orderId={selectedOrderId || undefined}
          />
        </Suspense>
      )}
    </>
  );
};

export default Account;
