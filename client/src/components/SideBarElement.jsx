import { useNavigate } from 'react-router-dom';

export const SideBarElement = ({ text, isActive, to }) => {
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
