const FreelancerDescCard = ({ name, val, styles }) => {
  return (
    <div
      className={`flex flex-col justify-between rounded-3xl p-4 text-center shadow-md shadow-gray-300 transition-all hover:shadow-xl ${styles}`}
    >
      <p className="text-lg font-medium">{name}</p>
      <div className="flex flex-wrap items-start justify-center gap-1">
        {val}
      </div>
    </div>
  );
};

export default FreelancerDescCard;
