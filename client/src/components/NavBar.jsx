import { Link, NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/authSlice';
import Button from './Button';

const NavBar = () => {
  const { user } = useSelector((state) => state.auth); // Redux state for authentication
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <nav className="sticky top-0 z-10 flex h-16 items-center justify-between bg-white px-6 py-4 shadow-md">
      {/* Brand Name */}
      <div className="text-2xl font-bold">
        <Link to="/">
          <span>WorkSphere</span>
          <span className="text-[#40c9a2]">.</span>
        </Link>
      </div>

      {/* Navigation Links */}
      <div className="hidden items-center gap-6 md:flex">
        <NavLink
          to="/client/signup"
          className={({ isActive }) =>
            isActive ? 'font-semibold text-[#40c9a2]' : 'hover:text-[#40c9a2]'
          }
        >
          Business
        </NavLink>
        <NavLink
          to="/freelancers"
          className={({ isActive }) =>
            isActive ? 'font-semibold text-[#40c9a2]' : 'hover:text-[#40c9a2]'
          }
        >
          Discover
        </NavLink>
        <NavLink
          to="/works"
          className={({ isActive }) =>
            isActive ? 'font-semibold text-[#40c9a2]' : 'hover:text-[#40c9a2]'
          }
        >
          Find Work
        </NavLink>
        {user ? (
          <>
            <NavLink
              to="/user/dashboard"
              className={({ isActive }) =>
                isActive
                  ? 'font-semibold text-[#40c9a2]'
                  : 'hover:text-[#40c9a2]'
              }
            >
              Profile
            </NavLink>
            <button
              onClick={handleLogout}
              className="rounded-lg border-2 border-[#40c9a2] px-4 py-2 text-[#40c9a2] hover:bg-[#40c9a2] hover:text-white"
            >
              Logout
            </button>
          </>
        ) : (
          <Link to="/login">
            <Button text="Sign in" />
          </Link>
        )}
      </div>

      {/* Mobile Menu */}
      <div className="md:hidden">
        <button className="focus:outline-none">
          {/* Add an icon here for a hamburger menu */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
      </div>
    </nav>
  );
};

export default NavBar;
