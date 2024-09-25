import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Main from "./pages/Main";
import Users from "./pages/Users";
import NavBar from "./components/NavBar";
import UserProfile from "./components/UserProfile";
import UserDashBoard from "./pages/UserDashBoard";
import LoginPage from "./pages/Login";
import { AuthProvider, useAuth } from "./context/AuthContext";

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
          <NavBar />
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/login" element={<LoginPage />} />

            {/* Protect this route with PrivateRoute */}
            <Route
              path="/user/dashboard"
              element={
                <PrivateRoute>
                  <UserDashBoard />
                </PrivateRoute>
              }
            />
            <Route path="/user/:id" element={<UserProfile />} />
            <Route path="/freelancers" element={<Users />} />
          </Routes>
        </AuthProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
