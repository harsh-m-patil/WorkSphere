import { Link, NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/authSlice';
import Button from './Button';
import { useState } from 'react';

const NavBar = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { user } = useSelector((state) => state.auth); // Redux state for authentication
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  function handleClick() {
    setIsVisible((prev) => !prev);
  }

  return (
    <>
      <nav className="font-display sticky top-0 z-20 flex h-16 items-center justify-between bg-white px-6 py-4 text-lg shadow-md md:px-12">
        {/* Brand Name */}
        <div className="text-2xl font-bold">
          <Link to="/">
            <span>WorkSphere</span>
            <span className="text-[#40c9a2]">.</span>
          </Link>
        </div>

        {/* Navigation Links */}
        <div className="hidden items-center gap-12 md:flex">
          <NavLink
            to="/business"
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
        <button className="focus:outline-none md:hidden" onClick={handleClick}>
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
      </nav>
      {isVisible && (
        <div className="fixed inset-0 top-0 z-30 h-screen bg-white transition-transform md:hidden">
          <div className="flex items-center justify-between px-6 py-4 shadow-md">
            <div className="font-display text-2xl font-bold">
              <Link to="/">
                <span>WorkSphere</span>
                <span className="text-[#40c9a2]">.</span>
              </Link>
            </div>
            <button
              className="text-xl focus:outline-none"
              onClick={handleClick}
            >
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
          <div className="px-6 py-6">
            <div className="flex flex-col gap-3">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? 'border p-3 font-semibold hover:bg-gray-100'
                    : 'border p-3 hover:bg-gray-100'
                }
              >
                Home
              </NavLink>
              <NavLink
                to="/business"
                className={({ isActive }) =>
                  isActive
                    ? 'border p-3 font-semibold hover:bg-gray-100'
                    : 'border p-3 hover:bg-gray-100'
                }
              >
                Business
              </NavLink>
              <NavLink
                to="/freelancers"
                className={({ isActive }) =>
                  isActive
                    ? 'border p-3 font-semibold hover:bg-gray-100'
                    : 'border p-3 hover:bg-gray-100'
                }
              >
                Discover
              </NavLink>
              <NavLink
                to="/works"
                className={({ isActive }) =>
                  isActive
                    ? 'border p-3 font-semibold hover:bg-gray-100'
                    : 'border p-3 hover:bg-gray-100'
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
                        ? 'border p-3 font-semibold hover:bg-gray-100'
                        : 'border p-3 hover:bg-gray-100'
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
                  <Button text="Sign in" className="w-full" />
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NavBar;
