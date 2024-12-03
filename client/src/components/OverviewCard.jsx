const OverviewCard = ({ title, data, type }) => {
  return (
    <div
      className={`m-3 h-fit max-h-36 rounded-lg border border-dashed p-5 shadow-lg transition-shadow ease-in-out hover:shadow-2xl ${type}`}
    >
      <p className="text-2xl font-semibold text-gray-800">
        {title || 'Default'}
      </p>
      <p className="pt-4 text-xl text-gray-600">{data || 'data'}</p>
    </div>
  );
};

export default OverviewCard;
