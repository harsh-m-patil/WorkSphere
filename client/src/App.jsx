import DashboardLayout from './layouts/DashboardLayout';
import MainLayout from './layouts/MainLayout';
import Dashboard from './components/Dashboard';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PageNotFound from './pages/404';
import Applications from './components/Applications';
import Works from './components/Works';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="applications" element={<Applications />} />
        </Route>
        <Route path="/" element={<MainLayout />}>
          <Route path="works" element={<Works />}></Route>
        </Route>
        {/* Catch-all route for 404 page */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
