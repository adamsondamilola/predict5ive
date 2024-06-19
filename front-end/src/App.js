import logo from './logo.svg';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import './App.css';
import 'react-toastify/dist/ReactToastify.css'; 
import { Route, Routes } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import Login from './Views/auth/Login';
import ForgotPassword from './Views/auth/ForgotPassword';
import Signup from './Views/auth/Signup';
import DashBoard from './Views/users/Dashboard';
import { ToastContainer } from 'react-toastify';
import BlogLayout from './components/layouts/blog-layout';
import AuthLayout from './components/layouts/auth-layout';
import AddGame from './Views/users/AddGame';
import BettingTips from './Views/games/bettingTips';
import BettingRisks from './Views/games/bettingRisks';
import PremiumGames from './Views/users/PredmiumGames';
import PayLaterSub from './Views/users/PayLaterSub';
import BookingCodes from './Views/games/bookingCodes';
import SportsPredictionsTips from './Views/games/tips';
import ViewPost from './components/posts/viewPost';
import PrivacyPolicy from './Views/privacyPolicy';
import ViewGame from './components/games/viewGame';
import Aviator from './Views/virtuals/aviator';

function App() {
  return ( 
    <BrowserRouter>
    <Routes>

    <Route path="/" element={<BlogLayout />}> 
    <Route path="/" element={<DashBoard />} />
    <Route path="/privacy-policy" element={<PrivacyPolicy />} />
    <Route path="/premium" element={<PremiumGames />} />
    <Route path="/post/:id/:slug" element={<ViewPost />} />
    <Route path="/game/:id/:slug" element={<ViewGame />} />
    <Route path="/predictions" element={<SportsPredictionsTips />} />
    <Route path="/pay-later-subscription" element={<PayLaterSub />} />
    <Route path="/post-game" element={<AddGame />} />
    <Route path="/booking-codes" element={<BookingCodes />} />
    <Route path="/betting-tips" element={<BettingTips />} />
    <Route path="/risks-of-gambling" element={<BettingRisks />} />
    <Route path="/risks-of-betting" element={<BettingRisks />} />
    </Route>

    <Route path="/virtual" element={<BlogLayout />}> 
    <Route path="/virtual/aviator" element={<Aviator />} />
    </Route>

    <Route path="/auth" element={<AuthLayout />}> 
    <Route path="/auth/login" element={<Login />} />
    <Route path="/auth/forgot" element={<ForgotPassword />} />
    <Route path="/auth/signup" element={<Signup />} />
      <Route path="/auth/:referer/signup" element={<Signup />} />
        {/*<Route path="*" element={<PageNotFound />} />*/}
      </Route>

    </Routes>
    <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
