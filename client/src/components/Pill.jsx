const Pill = ({ skill }) => {
  return (
    <span className="mb-2 mr-2 inline-block rounded-full bg-[#e5f9e0] px-3 py-1 text-sm font-semibold text-gray-700">
      {skill}
    </span>
  );
};

export default Pill;
