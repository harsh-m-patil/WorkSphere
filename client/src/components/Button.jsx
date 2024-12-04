const Button = ({ text, onClick }) => {
  return (
    <button
      className="transform rounded-xl bg-gradient-to-r from-green-300 via-green-400 to-green-500 p-3 px-8 text-black shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
