const FreelancerStat = ({ statName, statValue, styles }) => {
  return (
    <div
      className={`flex flex-col justify-between rounded-3xl p-4 text-center shadow-md shadow-gray-300 transition-all hover:shadow-xl ${styles}`}
    >
      <p className="text-lg font-medium">{statName}</p>
      <div className="flex flex-wrap items-start justify-center gap-1">
        {statValue === undefined ? (
          <div className="text-gray-500">No {statName} found</div>
        ) : (
          statValue.map((val, index) => (
            <Pill skill={val} key={'Index' + index} />
          ))
        )}
      </div>
    </div>
  );
};

const Pill = ({ skill }) => {
  return (
    <span className="rounded-2xl border border-gray-500 bg-gray-50 px-3 py-1 text-sm text-gray-700">
      {skill}
    </span>
  );
};

export default FreelancerStat;
