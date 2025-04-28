import { useState } from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import useAuthStore from '@/store/authStore';
import axios from 'axios';
import { toast } from 'sonner';
import { API_URL } from '../utils/constants';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Initialize navigate
  const { login } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_URL}/users/login`, {
        email,
        password,
      });
      const { data, token } = response.data;
      const { user } = data;
      console.log(response);

      // Dispatch login action
      login({ user, token });
      toast.success('Login Successful', { position: 'top-center' });

      // Redirect to dashboard or homepage
      if (user.role === 'admin') {
        navigate('/admin');
      } else if (user.role === 'client') {
        navigate('/client/dashboard'); // Change '/dashboard' to the desired route
      } else {
        navigate('/user/dashboard'); // Change '/dashboard' to the desired route
      }
    } catch (error) {
      toast.error('Incorrect Email or Password', { position: 'top-center' });
      console.log(error.message);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg"
      >
        <h2 className="mb-6 text-2xl font-semibold text-gray-800">Login</h2>

        {/* Email Input */}
        <div className="mb-4">
          <label
            htmlFor="email"
            className="mb-2 block text-sm font-medium text-gray-600"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-md border border-gray-300 p-2.5 text-sm text-gray-900 focus:border-[#40c9a2] focus:ring-[#40c9a2]"
            required
          />
        </div>

        {/* Password Input */}
        <div className="mb-6">
          <label
            htmlFor="password"
            className="mb-2 block text-sm font-medium text-gray-600"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-md border border-gray-300 p-2.5 text-sm text-gray-900 focus:border-[#40c9a2] focus:ring-[#40c9a2]"
            required
          />
        </div>

        {/* Submit Button */}
        <motion.button
          type="submit"
          className="w-full rounded-md bg-[#40c9a2] px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#40c9a2]"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Login
        </motion.button>
      </form>
    </div>
  );
};

export default Login;
