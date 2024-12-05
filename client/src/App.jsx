import { Provider } from 'react-redux';
import { store } from './redux/store';
import DashboardLayout from './layouts/DashboardLayout';
import MainLayout from './layouts/MainLayout';
import UserDashboard from './components/UserDashboard';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PageNotFound from './pages/404';
import Applications from './components/Applications';
import Works from './components/Works';
import Dummy from './pages/Dummy';
import Work from './components/Work';
import Freelancers from './components/Freelancers';
import Freelancer from './components/Freelancer';
import Login from './components/Login';
import MyWorks from './components/MyWorks';
import SettingsPage from './components/UserSettings';
import ProfilePage from './components/UserProfile';
import { Toaster } from 'sonner';
import ClientDashboard from './components/ClientDashboard';
import ClientWorksPosted from './components/ClientWorksPosted';
import ClientFilterWork from './components/ClientFilterWork';
import ClientPostWork from './components/ClientPostWork';

function App() {
  return (
    <Router>
      <Provider store={store}>
        <Toaster
          richColors
          toastOptions={{ className: 'text-xl border border-xl' }}
        />
        <Routes>
          <Route path="/user/dashboard" element={<DashboardLayout />}>
            <Route index element={<UserDashboard />} />
            <Route path="applications" element={<Applications />} />
            <Route path="works" element={<MyWorks />} />
            <Route path="settings" element={<SettingsPage />} />
            <Route path="profile" element={<ProfilePage />} />
          </Route>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Dummy />} />
            <Route path="login" element={<Login />}></Route>
            <Route path="works" element={<Works />}></Route>
            <Route path="works/:id" element={<Work />}></Route>
            <Route path="freelancers" element={<Freelancers />}></Route>
            <Route path="freelancers/:id" element={<Freelancer />}></Route>
          </Route>
          <Route path="/client/dashboard" element={<ClientDashboard/>}></Route>
          <Route path="/client/dashboard/works" element={<ClientWorksPosted/>}></Route>
          <Route path="/client/dashboard/works/single" element={<ClientFilterWork/>}></Route>
          <Route path="/client/dashboard/postwork" element={<ClientPostWork/>}></Route>
          
          {/* Catch-all route for 404 page */}
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Provider>
    </Router>
  );
}

export default App;
