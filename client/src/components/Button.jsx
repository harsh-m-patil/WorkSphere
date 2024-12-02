const Button = ({ text, onClick }) => {
  return (
    <button
      className="rounded-md bg-gray-800 px-4 py-2 text-white shadow-lg hover:bg-black"
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
