const WorkStat = ({ statName, statValue, styles }) => {
  return (
    <div
      className={`flex h-28 flex-col justify-between rounded-3xl p-4 text-center shadow-md shadow-gray-300 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl ${styles}`}
    >
      <p className="text-md md:text-lg">{statName}</p>
      <p className="text-xl md:text-2xl">{statValue}</p>
    </div>
  );
};

export default WorkStat;
