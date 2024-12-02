const WorkStat = ({ statName, statValue, styles }) => {
  return (
    <div
      className={`flex h-28 flex-col justify-between rounded-3xl p-4 text-center shadow-md shadow-gray-300 transition-all hover:shadow-xl ${styles}`}
    >
      <p className="text-lg">{statName}</p>
      <p className="text-2xl">{statValue}</p>
    </div>
  );
};

export default WorkStat;
