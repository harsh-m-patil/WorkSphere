import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Main from "./pages/Main";
import Users from "./pages/Users";
import NavBar from "./components/NavBar";
import UserProfile from "./components/UserProfile";
import UserDashBoard from "./pages/UserDashBoard";
import LoginPage from "./pages/Login";
import { AuthProvider, useAuth } from "./context/AuthContext";
import UserDashboardWorks from "./components/UserDashboardWorks";
import UserDashboardReviews from "./components/UserDashboardReviews";
import UserSettings from "./components/UserDashBoardSettings";
import FindWork from "./pages/FindWork";
import ClientDashBoard from "./pages/ClientDashBoard";
import ClientWorksPosted from "./components/ClientWorksPosted";
import ClientFilterWork from "./components/ClientFilterWork";
import AdminDashboard from "./components/AdminDashboard";
import AdminUsers from "./components/AdminUsers";
import AdminJobs from "./components/AdminJobs"; // Import Jobs component
import AdminAnalytics from "./components/AdminAnalytics";
import Freelancersignup from "./pages/FreelancerSignup";
import Clientsignup from "./pages/ClientSignup";
import AboutUs from "./pages/Aboutus";
// import CreateReview from "./pages/CreateReview";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      cacheTime: Infinity,
    },
  },
});

// Create a PrivateRoute component to protect dashboard routes
function PrivateRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>; // Add a loading state
  }

  return isAuthenticated ? children : <LoginPage />;
}

function App() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <NavBar/>
          <Routes>
            <Route
              path="/admin/dashboard"
              element={
                <PrivateRoute>
                  <AdminDashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/admin/dashboard/users"
              element={
                <PrivateRoute>
                  <AdminUsers />
                </PrivateRoute>
              }
            />
            <Route
              path="/admin/dashboard/jobs"
              element={
                <PrivateRoute>
                  <AdminJobs />
                </PrivateRoute>
              }
            />
            <Route
              path="/admin/dashboard/analytics"
              element={
                <PrivateRoute>
                  <AdminAnalytics />
                </PrivateRoute>
              }
            />
            {/* <NavBar /> */}

            <Route path="/" element={<Main />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/freelancer/signup" element={<Freelancersignup />} />
            <Route path="/client/signup" element={<Clientsignup />} />


            {/* Protect this route with PrivateRoute */}
            <Route
              path="/user/dashboard"
              element={
                <PrivateRoute>
                  <UserDashBoard />
                </PrivateRoute>
              }
            />
            <Route
              path="/user/dashboard/applications"
              element={
                <PrivateRoute>
                  <UserDashBoard />
                </PrivateRoute>
              }
            />
            <Route
              path="/user/dashboard/works"
              element={
                <PrivateRoute>
                  <UserDashboardWorks />
                </PrivateRoute>
              }
            />
            <Route
              path="/user/dashboard/reviews"
              element={
                <PrivateRoute>
                  <UserDashboardReviews />
                </PrivateRoute>
              }
            />
            <Route
              path="/user/dashboard/settings"
              element={
                <PrivateRoute>
                  <UserSettings />
                </PrivateRoute>
              }
            />
            <Route path="/client/dashboard" element={<ClientDashBoard />} />
            <Route
              path="/client/dashboard/works"
              element={<ClientWorksPosted />}
            />
            <Route
              path="/client/dashboard/works/single"
              element={<ClientFilterWork />}
            />
            <Route path="/works" element={<FindWork />} />
            <Route path="/user/:id" element={<UserProfile />} />
            <Route path="/freelancers" element={<Users />} />
            <Route path="/about" element={<AboutUs />} />
            {/* <Route path="/review" element={<CreateReview freelancer={"ahdfjsdhfk"}/>} /> */}
          </Routes>
        </AuthProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
