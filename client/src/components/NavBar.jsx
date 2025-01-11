import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from 'motion/react';
import { Menu, X } from 'lucide-react';
import { logout } from '../redux/authSlice';
import Button from './Button';

const NavBar = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { scrollY } = useScroll();

  // Handle scroll events
  useMotionValueEvent(scrollY, 'change', (latest) => {
    setIsScrolled(latest > 20);
  });

  const handleLogout = () => {
    dispatch(logout());
    setIsVisible(false);
  };

  const handleClick = () => {
    setIsVisible((prev) => !prev);
  };

  // Animation variants
  const navVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 20,
      },
    },
  };

  const mobileMenuVariants = {
    closed: {
      x: '100%',
      opacity: 0,
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 40,
      },
    },
    open: {
      x: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 40,
      },
    },
  };

  const linkVariants = {
    hover: {
      scale: 1.05,
      color: '#40c9a2',
      transition: { type: 'spring', stiffness: 400, damping: 17 },
    },
  };

  return (
    <>
      <motion.nav
        initial="hidden"
        animate="visible"
        variants={navVariants}
        className={`sticky top-0 z-20 flex h-16 items-center justify-between px-6 py-4 font-display text-lg transition-colors duration-200 md:px-12 ${
          isScrolled ? 'bg-white/80 shadow-md backdrop-blur-md' : 'bg-white'
        }`}
      >
        {/* Brand Name */}
        <motion.div
          className="text-2xl font-bold"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link to="/">
            <span>WorkSphere</span>
            <motion.span
              className="text-[#40c9a2]"
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              .
            </motion.span>
          </Link>
        </motion.div>

        {/* Desktop Navigation Links */}
        <div className="hidden items-center gap-12 md:flex">
          {['business', 'freelancers', 'works'].map((item) => (
            <motion.div
              key={item}
              variants={linkVariants}
              whileHover="hover"
              whileTap={{ scale: 0.95 }}
            >
              <NavLink
                to={`/${item}`}
                className={({ isActive }) =>
                  isActive ? 'font-semibold text-[#40c9a2]' : ''
                }
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </NavLink>
            </motion.div>
          ))}

          {user ? (
            <>
              <motion.div variants={linkVariants} whileHover="hover">
                <NavLink
                  to="/user/dashboard"
                  className={({ isActive }) =>
                    isActive ? 'font-semibold text-[#40c9a2]' : ''
                  }
                >
                  Profile
                </NavLink>
              </motion.div>
              <motion.button
                whileHover={{
                  scale: 1.05,
                  backgroundColor: '#40c9a2',
                  color: 'white',
                }}
                whileTap={{ scale: 0.95 }}
                onClick={handleLogout}
                className="rounded-lg border-2 border-[#40c9a2] px-4 py-2 text-[#40c9a2] transition-colors"
              >
                Logout
              </motion.button>
            </>
          ) : (
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link to="/login">
                <Button text="Sign in" />
              </Link>
            </motion.div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <motion.button
          className="focus:outline-none md:hidden"
          onClick={handleClick}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {isVisible ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </motion.button>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={mobileMenuVariants}
            className="fixed inset-0 top-0 z-30 h-screen bg-white md:hidden"
          >
            <div className="flex items-center justify-between px-6 py-4 shadow-md">
              <motion.div
                className="font-display text-2xl font-bold"
                whileTap={{ scale: 0.95 }}
              >
                <Link to="/" onClick={() => setIsVisible(false)}>
                  <span>WorkSphere</span>
                  <span className="text-[#40c9a2]">.</span>
                </Link>
              </motion.div>
              <motion.button
                className="focus:outline-none"
                onClick={handleClick}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <X className="h-6 w-6" />
              </motion.button>
            </div>
            <motion.div
              className="px-6 py-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex w-full flex-col gap-9">
                {['/', '/business', '/freelancers', '/works'].map((path) => (
                  <motion.div
                    key={path}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <NavLink
                      to={path}
                      onClick={() => setIsVisible(false)}
                      className={({ isActive }) =>
                        `w-full border p-3 transition-colors ${
                          isActive
                            ? 'bg-[#40c9a2]/10 font-semibold text-[#40c9a2]'
                            : 'hover:bg-gray-50'
                        }`
                      }
                    >
                      {path === '/'
                        ? 'Home'
                        : path.slice(1).charAt(0).toUpperCase() + path.slice(2)}
                    </NavLink>
                  </motion.div>
                ))}
                {user ? (
                  <>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <NavLink
                        to="/user/dashboard"
                        onClick={() => setIsVisible(false)}
                        className={({ isActive }) =>
                          `border p-3 transition-colors ${
                            isActive
                              ? 'bg-[#40c9a2]/10 font-semibold text-[#40c9a2]'
                              : 'hover:bg-gray-50'
                          }`
                        }
                      >
                        Profile
                      </NavLink>
                    </motion.div>
                    <motion.button
                      whileHover={{
                        scale: 1.02,
                        backgroundColor: '#40c9a2',
                        color: 'white',
                      }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleLogout}
                      className="mt-4 rounded-lg border-2 border-[#40c9a2] px-4 py-2 text-[#40c9a2] transition-colors"
                    >
                      Logout
                    </motion.button>
                  </>
                ) : (
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="mt-4"
                  >
                    <Link to="/login" onClick={() => setIsVisible(false)}>
                      <Button text="Sign in" className="w-full" />
                    </Link>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default NavBar;
