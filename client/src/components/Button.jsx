const Button = ({ text, onClick }) => {
  return (
    <button
      className="rounded-md bg-[#2F9C95] px-4 py-2 text-white hover:bg-[#40c9a2]"
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
