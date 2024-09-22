import { Link } from "react-router-dom";
import Button from "./Button";

const NavBar = () => {
  return (
    <div className="flex h-16 items-center justify-between border-y-2 px-10 py-4">
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
        <span>Discover</span>
        <span>Find Work</span>
        <span>Profile</span>
        <Button text="Sign in" />
      </div>
    </div>
  );
};

export default NavBar;
