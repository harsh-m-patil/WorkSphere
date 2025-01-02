import { useNavigate, useLocation } from 'react-router-dom';

const ClientSideBarElement = ({ text, to, icon, client }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleClick = () => {
    navigate(to, {
      state: { client },
    });
  };

  const checkActive = () => {
    // Define the base and active classes
    const relativePathName = pathname.split('/').at(3);
    const baseClasses =
      'm-5 cursor-pointer rounded-lg p-3 flex items-center space-x-3 hover:bg-gray-800 hover:text-teal-300';
    const activeClasses = 'bg-gray-800 text-teal-300';

    // If the current route matches the 'to' prop, return active classes
    return to === relativePathName ||
      (relativePathName === undefined && to === '')
      ? `${baseClasses} ${activeClasses}`
      : baseClasses;
  };

  return (
    <li onClick={handleClick} className={checkActive()}>
      {icon && <span className="text-gray-400">{icon}</span>}{' '}
      {/* Render the icon */}
      <span>{text}</span>
    </li>
  );
};

export default ClientSideBarElement;
