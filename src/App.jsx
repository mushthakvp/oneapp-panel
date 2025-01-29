import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import AuthPage from './pages/auth/AuthPage';
import OtpPage from './pages/auth/otp/OtpPage';
import Home from './pages/home/Home';
import Dashboard from './pages/vendor/dashboard/Dashboard';
import Products from './pages/vendor/products/Products';
import AddProducts from './pages/vendor/products/AddProducts/AddProducts';
import ProductDetail from './pages/vendor/productDetail/ProductDetail';
import Profile from './pages/vendor/profile/Profile';
import Orders from './pages/vendor/orders/Orders';
import OrderDetail from './pages/vendor/orderDetail/OrderDetail';
import Revenue from './pages/vendor/revenue/Revenue';
import PayoutDetail from './pages/vendor/payoutDetails/PayoutDetails';

import ViewCoupons from './pages/vendor/coupens/ViewCoupens';
import CouponDetail from './pages/vendor/couponDetail/CouponDetail';
import LoggedIn from './pages/protectedRoutes/LoggedIn';
import AdminRoute from './pages/protectedRoutes/AdminRoute';
import AdminRoutes from './pages/admin/adminRouts/AdminRoutes';
import AdminHome from './pages/home/AdminHome';
import LoggedOut from './pages/protectedRoutes/LoggedOut';
import ProcessingPage from './pages/auth/ProcessingScreen';
import RejectedScreen from './pages/auth/RejectedScreen';
import AllVideos from './pages/vendor/videos/AllVideos';
import AddVideos from './pages/vendor/videos/AddVideos';
import VideoDetails from './pages/vendor/videos/Videodeatils';
import StorageUsageHistory from './pages/vendor/videos/StorageUsageHistory';
import Clouds from './pages/vendor/clouds/Clouds';


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<LoggedIn />}>
          <Route path="" element={<Home />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/products" element={<Products />} />
            <Route path="/add-videos" element={<AddVideos />} />
            <Route path='/videoDetail' element={<VideoDetails />} />
            <Route path='/useHistory' element ={<StorageUsageHistory/>}/>
            <Route path="/videos" element={<AllVideos />} />
            <Route path='/clouds' element={<Clouds/>}/>
            <Route path="/add-products" element={<AddProducts />} />
            <Route path="/product-detail" element={<ProductDetail />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/order-detail" element={<OrderDetail />} />
            <Route path="/revenue" element={<Revenue />} />
            <Route path="/payout-detail" element={<PayoutDetail />} />
            <Route path="/coupons" element={<ViewCoupons />} />
            <Route path="/coupon-detail" element={<CouponDetail />} />
          </Route>
        </Route>
        {/* adminRouts */}
        <Route element={<AdminRoute />}>
          <Route path="" element={<AdminHome />}>
            <Route path="/admin/*" element={<AdminRoutes />} />
          </Route>
        </Route>
        <Route element={<LoggedOut />}>
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/otp-verify" element={<OtpPage />} />
          <Route path="/processing" element={<ProcessingPage />} />
          <Route path="/rejected" element={<RejectedScreen />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App
