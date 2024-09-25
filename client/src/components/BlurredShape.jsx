const BlurredShape = ({ size }) => {
  if (size === "large") {
    return (
      <div className="absolute z-[-1] h-4/6 w-3/6 rotate-[26deg] rounded-[200px] bg-[#2F9C95] opacity-15 blur-lg"></div>
    );
  } else if (size === "medium") {
    return (
      <div className="absolute z-[-1] h-3/6 w-2/6 rotate-[26deg] rounded-[100px] bg-[#2F9C95] opacity-15 blur-lg"></div>
    );
  }
};

export default BlurredShape;
