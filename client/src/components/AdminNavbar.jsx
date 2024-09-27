import { Link } from "react-router-dom";
import Button from "./Button";
import { useAuth } from "../context/AuthContext";

const NavBar = () => {
  const { isAuthenticated, logout } = useAuth(); // Get the logout function from AuthContext
  console.log("navbar loaded");

  const handleLogout = async () => {
    try {
      await logout(); // Call the logout function
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="sticky top-0 z-10 flex h-16 items-center justify-between border-y-2 bg-white px-10 py-4">
        {/* Brand Name */}
        <div className="text-2xl font-bold">
          <Link to="/">
            <span>WorkSphere</span>
            <span className="text-[#40c9a2]">.</span>
          </Link>
        </div>

        {/* Navigation Links */}
        <div className="flex items-center gap-6">
          <span>Business</span>
          <Link to="/freelancers">
            <span>Discover</span>
          </Link>
          <Link to="/works">
            <span>Find Work</span>
          </Link>
          <Link to="/user/dashboard">
            <span>Profile</span>
          </Link>
          <Link to="/login">
            <Button text="Sign in" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="sticky top-0 z-10 flex h-16 items-center justify-between border-y-2 bg-white px-10 py-4">
      {/* Brand Name */}
      <div className="text-2xl font-bold">
        <Link to="/">
          <span>WorkSphere</span>
          <span className="text-[#40c9a2]">.</span>
        </Link>
      </div>

      {/* Navigation Links */}
      <div className="flex items-center gap-6">
        <span>Business</span>
        <Link to="/freelancers">
          <span>Discover</span>
        </Link>
        <Link to="/works">
          <span>Find Work</span>
        </Link>
        <Link to="/user/dashboard">
          <span>Profile</span>
        </Link>
        {/* Log Out Button */}
        <Link to="/">
          <Button text="Log Out" onClick={handleLogout} />
        </Link>
      </div>
    </div>
  );
};

export default NavBar;
