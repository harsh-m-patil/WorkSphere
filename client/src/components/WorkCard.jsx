import { useNavigate } from 'react-router-dom';

const WorkCard = ({ work, index }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/works/${work._id}`);
  };

  return (
    <div className="min-h-72 rounded-3xl border p-2 pb-6 shadow-xl">
      <div
        className={`h-5/6 w-full rounded-3xl px-4 py-5 ${getColor(index)} flex flex-col`}
      >
        {/* Date Section */}
        <div>
          <span className="rounded-2xl bg-white px-3 py-2">20 May, 2023</span>
        </div>
        {/* More Info */}
        <div className="flex h-5/6 flex-col justify-between gap-10 px-3 pt-6">
          <div className="flex justify-between">
            <div>
              <p className="pb-1 text-sm text-gray-700">
                {work.client_id?.userName}
              </p>
              {/* Add multi-line truncation for the title */}
              <p
                className="line-clamp-2 max-w-36 overflow-hidden text-2xl font-medium"
                title={work.title} // Tooltip for full title
              >
                {work.title}
              </p>
            </div>
            <img src="/vite.svg" alt="icon" />
          </div>
          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {work.skills_Required.map((skill, index) => (
              <Pill skill={skill} key={index} />
            ))}
          </div>
        </div>
      </div>
      <div className="flex h-1/6 justify-between rounded-3xl p-4 pb-1">
        <div>
          <span className="font-semibold">$ {work.pay}</span>
          <p className="text-gray-600">Remote</p>
        </div>
        <div>
          <button
            onClick={handleClick}
            className="rounded-3xl bg-black px-5 py-2 text-white"
          >
            Details
          </button>
        </div>
      </div>
    </div>
  );
};

const getColor = (idx) => {
  const colors = [
    'bg-orange-100',
    'bg-purple-100',
    'bg-blue-100',
    'bg-green-100',
    'bg-gray-100',
    'bg-pink-100',
  ];

  return colors[idx % 6];
};

export default WorkCard;

const Pill = ({ skill }) => {
  return (
    <span className="rounded-2xl border border-gray-400 px-2 py-1">
      {skill}
    </span>
  );
};
