const OverviewCard = ({ title, data, type }) => {
  return (
    <div
      className={`m-5 h-36 w-80 rounded-lg border border-dashed p-5 ${type}`}
    >
      <p className="mb-10 text-2xl font-semibold text-gray-800">
        {title || 'Default'}
      </p>
      <p className="text-xl text-gray-600">{data || 'data'}</p>
    </div>
  );
};

export default OverviewCard;
