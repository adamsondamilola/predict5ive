import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import logo from './logo.svg';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';  
import Layout from './Views/layout-components/Layout';
import Home from './Views/landing-components/Home';
import Faq from './Views/landing-components/Faq';
import PageNotFound from './Views/landing-components/PageNotFound';
import Posts from "./Views/landing-components/Posts";
import Register from "./Views/auth-components/Register";
import Dashboard from "./Views/dashboard-components/user/Dashboard";
import Login from "./Views/auth-components/Login";
import RegisterByReferral from "./Views/auth-components/RegisterByReferral";
import ViewPost from "./Views/landing-components/ViewPost";
import ContactUs from "./Views/landing-components/ContactUs";
import LayoutDashboard from "./Views/layout-components/LayoutDashboard";
import DashboardAdmin from "./Views/dashboard-components/admin/Dashboard";
import AddGame from "./Views/dashboard-components/admin/AddGame";
import UpdateGame from "./Views/dashboard-components/admin/UpdateGame";
import Games from "./Views/dashboard-components/admin/Games";
import DashboardPageNotFound from "./Views/layout-components/PageNotFoundDashboard";
import DashboardUser from "./Views/dashboard-components/user/Dashboard";
import Referrals from "./Views/dashboard-components/user/Referrals";
import UserLayoutDashboard from "./Views/layout-components/UserLayoutDashboard";
import PredictionsDashboard from "./Views/dashboard-components/user/Predictions";
import BuyCoupon from "./Views/dashboard-components/user/BuyCoupon";
import Withdraw from "./Views/dashboard-components/user/Withdraw";
import Coupons from "./Views/dashboard-components/vendor/Coupons";
import AddPrediction from "./Views/dashboard-components/user/AddPrediction";
import UserPrediction from "./Views/dashboard-components/user/UserPrediction";
import Announcements from "./Views/dashboard-components/admin/Announcements";
import Transactions from "./Views/dashboard-components/user/Transactions";
import Faqs from "./Views/dashboard-components/user/Faq";
import Account from "./Views/dashboard-components/user/Account";
import PaymentOptions from "./Views/dashboard-components/user/PaymentOptions";
import BookingCodes from "./Views/dashboard-components/admin/BookingCodes";
import ViewContent from "./Views/post-components/viewContent";
import AllContents from "./Views/post-components/allContents";
import FilterContents from "./Views/post-components/filterContents";
import FilterAllContents from "./Views/post-components/filterAllContents";
import CreateContent from "./Views/post-components/createContent";
import PendingContents from "./Views/post-components/pendingContents";
import { ToastContainer } from "react-toastify";
function App() {
  return (
    <BrowserRouter>
    <Routes>
    
    <Route path="/" element={<Layout />}> 
        <Route index element={<Home />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/:id/post" element={<ViewPost />} />
        <Route path="/register" element={<Register />} />
        <Route path="/:referrer/register" element={<RegisterByReferral />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="*" element={<PageNotFound />} />
      </Route>

      <Route path="/admin" element={<LayoutDashboard />}> 
      <Route path="/admin/dashboard" element={<DashboardAdmin />} />
      <Route path="/admin/predictions" element={<PredictionsDashboard />} />
      <Route path="/admin/add_game" element={<AddGame />} />
      <Route path="/admin/:id/update_game" element={<UpdateGame />} />
      <Route path="/admin/games" element={<Games />} />
      <Route path="/admin/announcements" element={<Announcements />} />
      <Route path="/admin/bookings" element={<BookingCodes />} />
        <Route path="*" element={<DashboardPageNotFound />} />
      </Route>

      <Route path="/content" element={<LayoutDashboard />}> 
      <Route path="/content/:userId/:id/:slug" element={<ViewContent />} />
      <Route path="/content/:id/:slug" element={<ViewContent />} />
      <Route path="/content/all" element={<AllContents />} />
      <Route path="/content/filter" element={<FilterContents />} />
      <Route path="/content/filter/all" element={<FilterAllContents />} />
      <Route path="/content/new" element={<CreateContent />} />
      <Route path="/content/pending" element={<PendingContents />} />
      <Route path="*" element={<DashboardPageNotFound />} />
      </Route>

      <Route path="/user" element={<UserLayoutDashboard />}> 
      <Route path="/user/dashboard" element={<DashboardUser />} />
      <Route path="/user/referrals" element={<Referrals />} />
      <Route path="/user/predictions" element={<PredictionsDashboard />} />
      <Route path="/user/buy_coupon" element={<BuyCoupon />} />
      <Route path="/user/coupon" element={<Coupons />} />
      <Route path="/user/payment_options" element={<PaymentOptions />} />
      <Route path="/user/withdraw" element={<Withdraw />} />
      <Route path="/user/transactions" element={<Transactions />} />
      <Route path="/user/add_prediction" element={<AddPrediction />} />
      <Route path="/user/your_predictions" element={<UserPrediction />} />
      <Route path="/user/account" element={<Account />} />
      <Route path="/user/faq" element={<Faqs />} />
        <Route path="*" element={<DashboardPageNotFound />} />
      </Route>

      </Routes>
      <ToastContainer/>
      </BrowserRouter>
  );
}

export default App;
