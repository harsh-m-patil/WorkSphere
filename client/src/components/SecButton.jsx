const SecButton = ({ text ,onClick}) => {
  return (
    <button className="rounded-md bg-gray-100 px-4 py-2 text-black hover:bg-gray-200" onClick={onClick}>
      {text}
    </button>
  );
};

export default SecButton;
