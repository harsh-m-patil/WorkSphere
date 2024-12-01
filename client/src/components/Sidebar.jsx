import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="h-screen w-80 border border-r-gray-300 px-5 py-16 text-xl">
      <p className="mb-10 rounded-[40px] border border-teal-400 bg-teal-50 px-1 py-2 text-center text-3xl font-medium">
        <span className="font-semibold text-teal-600">WorkSphere</span>.
      </p>
      <ul>
        <Element text="Overview" isActive={true} />
        <Element text="Applications" to="applications" />
        <Element text="My Works" to="works" />
        <Element text="Settings" to="settings" />
      </ul>
    </div>
  );
};

const Element = ({ text, isActive, to }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(to);
  };

  if (!isActive) {
    return (
      <li
        onClick={handleClick}
        className="m-5 cursor-pointer rounded-lg p-3 hover:border hover:bg-gray-50"
      >
        {text}
      </li>
    );
  }

  return (
    <li
      onClick={handleClick}
      className="m-5 cursor-pointer rounded-lg bg-gray-100 p-3"
    >
      {text}
    </li>
  );
};

export default Sidebar;
