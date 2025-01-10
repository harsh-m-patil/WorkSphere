import { Provider } from 'react-redux';
import { store } from './redux/store';
import DashboardLayout from './layouts/DashboardLayout';
import MainLayout from './layouts/MainLayout';
import UserDashboard from './components/UserDashboard';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PageNotFound from './pages/404';
import Applications from './components/Applications';
import Works from './components/Works';
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
import Dashboard from './components/AdminDashboard';
import Layout from './components/shared/Adminlayout';
import './index.css';
import ManageUsers from './components/AdminManageUsers';
import ManageJobs from './components/AdminManageJobs';
import Analytics from './components/AdminAnalytics';
import ManageClients from './components/AdminManageClients';
import BusinessModelPage from './components/BusinessModelPage';
import Home from './components/Home';
import AboutUs from './components/AboutUs';
import Freelancersignup from './components/FreelancerSignup';
import Clientsignup from './components/ClientSignup';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import AdminDashboardLayOut from './pages/AdminDashboardLayOut';
import Dummy from './pages/Dummy';
import Overview from './components/admin/Overview';

const queryClient = new QueryClient({});

function App() {
  return (
    <Router>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <Toaster
            richColors
            toastOptions={{ className: 'text-xl border border-xl' }}
          />
          <Routes>
            <Route path="/admin" element={<Layout />}>
              <Route index element={<Dashboard />} />
              <Route path="ManageClients" element={<ManageClients />} />
              <Route path="ManageUsers" element={<ManageUsers />} />
              <Route path="ManageJobs" element={<ManageJobs />} />
              <Route path="Analytics" element={<Analytics />} />
            </Route>
            <Route path="/user/dashboard" element={<DashboardLayout />}>
              <Route index element={<UserDashboard />} />
              <Route path="applications" element={<Applications />} />
              <Route path="works" element={<MyWorks />} />
              <Route path="settings" element={<SettingsPage />} />
              <Route path="profile" element={<ProfilePage />} />
            </Route>
            <Route path="/v2" element={<AdminDashboardLayOut />}>
              <Route index element={<Overview />} />
            </Route>
            <Route path="/admin" element={<Layout />}>
              <Route index element={<Dashboard />} />
              <Route path="ManageClients" element={<ManageClients />} />
              <Route path="ManageUsers" element={<ManageUsers />} />
              <Route path="ManageJobs" element={<ManageJobs />} />
              <Route path="Analytics" element={<Analytics />} />
            </Route>
            <Route path="/" element={<MainLayout />}>
              <Route index element={<Home />} />
              <Route path="/freelancer/signup" element={<Freelancersignup />} />
              <Route path="/client/signup" element={<Clientsignup />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="business" element={<BusinessModelPage />}></Route>
              <Route path="login" element={<Login />}></Route>
              <Route path="works" element={<Works />}></Route>
              <Route path="works/:id" element={<Work />}></Route>
              <Route path="freelancers" element={<Freelancers />}></Route>
              <Route path="freelancers/:id" element={<Freelancer />}></Route>
            </Route>
            <Route
              path="/client/dashboard"
              element={<ClientDashboard />}
            ></Route>
            <Route
              path="/client/dashboard/works"
              element={<ClientWorksPosted />}
            ></Route>
            <Route
              path="/client/dashboard/works/single"
              element={<ClientFilterWork />}
            ></Route>
            <Route
              path="/client/dashboard/postwork"
              element={<ClientPostWork />}
            ></Route>
            {/* Catch-all route for 404 page */}
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </Provider>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </Router>
  );
}

export default App;
