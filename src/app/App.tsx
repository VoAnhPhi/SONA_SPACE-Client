import '@/styles/style.scss'
import '@/styles/fonts.css'
import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from '@/pages/HomePage'
import { AuthProvider } from '@/domains/auth/AuthContext'
import ScrollToTop from '@/components/ScrollToTop'
import SiteLayout from '@/layouts/SiteLayout'
import MotionProvider from '@/motion/MotionProvider'
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import RouteFallback from '@/layouts/RouteFallback'

const Products = lazy(() => import('@/pages/Products'))
const CategoryProducts = lazy(() => import('@/pages/CategoryProducts'))
const ProductDetail = lazy(() => import('@/pages/ProductDetail'))
const Wishlist = lazy(() => import('@/pages/Wishlist'))
const CartPage = lazy(() => import('@/pages/CartPage'))
const Checkout = lazy(() => import('@/pages/Checkout'))
const OrderComplete = lazy(() => import('@/pages/OrderComplete'))
const Rooms = lazy(() => import('@/pages/Rooms'))
const RoomDetail = lazy(() => import('@/pages/RoomDetail'))
const About = lazy(() => import('@/pages/About'))
const ArchitectureProfile = lazy(() => import('@/pages/ArchitectureProfile'))
const DesignService = lazy(() => import('@/pages/DesignService'))
const SignUp = lazy(() => import('@/pages/SignUp'))
const SignIn = lazy(() => import('@/pages/SignIn'))
const ForgotPassword = lazy(() => import('@/pages/ForgotPassword'))
const Account = lazy(() => import('@/pages/Account'))
const OrderDetail = lazy(() => import('@/pages/OrderDetail'))
const Terms = lazy(() => import('@/pages/Terms'))
const PrivacyPolicy = lazy(() => import('@/pages/PrivacyPolicy'))
const News = lazy(() => import('@/pages/News'))
const NewsDetail = lazy(() => import('@/pages/NewsDetail'))
const NotFoundPage = lazy(() => import('@/pages/NotFound'))
const PaymentResult = lazy(() => import('@/pages/PaymentResult'))
const EmailVerified = lazy(() => import('@/pages/EmailVerified'))

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <ScrollToTop />
        <MotionProvider />
        <Routes>
          <Route element={<SiteLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/san-pham" element={<Products />} />
            <Route path="/danh-muc/:slug" element={<CategoryProducts />} />
            <Route path="/san-pham/:slug" element={<ProductDetail />} />
            <Route path="/san-pham-yeu-thich" element={<Wishlist />} />
            <Route path="/gio-hang" element={<CartPage />} />
            <Route path="/thanh-toan" element={<Checkout />} />
            <Route path="/dat-hang-thanh-cong/:orderHash" element={<OrderComplete />} />
            <Route path="/khong-gian" element={<Rooms />} />
            <Route path="/khong-gian/:slug" element={<RoomDetail />} />
            <Route path="/dich-vu-thiet-ke" element={<DesignService />} />
            <Route path="/ho-so-kien-truc" element={<ArchitectureProfile />} />
            <Route path="/lien-he" element={<About />} />
            <Route path="/dang-ky" element={<SignUp />} />
            <Route path="/dang-nhap" element={<SignIn />} />
            <Route path="/quen-mat-khau" element={<ForgotPassword />} />
            <Route path="/tai-khoan" element={<Account />} />
            <Route path="/tai-khoan/thong-tin" element={<Account />} />
            <Route path="/tai-khoan/ma-giam-gia" element={<Account />} />
            <Route path="/tai-khoan/don-hang" element={<Account />} />
            <Route path="/chi-tiet-don-hang/:id" element={<OrderDetail />} />
            <Route path="/dieu-khoan-su-dung" element={<Terms />} />
            <Route path="/chinh-sach-bao-mat" element={<PrivacyPolicy />} />
            <Route path="/tin-tuc" element={<News />} />
            <Route path="/tin-tuc/:slug" element={<NewsDetail />} />
            <Route path="/xac-thuc-email" element={<EmailVerified />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
          <Route
            path="/thanh-toan-result"
            element={
              <Suspense fallback={<RouteFallback />}>
                <PaymentResult />
              </Suspense>
            }
          />
        </Routes>
        <ToastContainer
          position="top-right"
          autoClose={1000}
          style={{ marginTop: "var(--height-header)", zIndex: "var(--z-toast)" }}
        />
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
