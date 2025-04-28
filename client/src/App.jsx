import DashboardLayout from './layouts/DashboardLayout';
import MainLayout from './layouts/MainLayout';
import UserDashboard from './components/UserDashboard';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PageNotFound from './pages/404';
import Applications from './components/Applications';
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
import Overview from './components/admin/Overview';
import WorkGrid from './components/WorkGrid';

const queryClient = new QueryClient({});

function App() {
  return (
    <Router>
      <QueryClientProvider client={queryClient}>
            <Route
            ></Route>
            <Route path="/chat/:username" element={<ChatPage />}></Route>
          </Route>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </Router>
  );
}

export default App;
