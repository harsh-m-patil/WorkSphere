import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';

const WorkCard = ({ work, index }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/works/${work._id}`);
  };

  return (
    <motion.div
      className="h-[24rem] max-w-80 rounded-3xl border p-2 pb-6 shadow-xl lg:h-[26rem]"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1.0 }}
      whileHover={{ scale: 1.05, shadow: 1.1 }}
    >
      <div
        className={`h-5/6 w-full rounded-3xl px-4 py-5 ${getColor(index)} flex flex-col`}
      >
        {/* Date Section */}
        <div>
          <span className="rounded-2xl bg-white px-3 py-1 text-sm sm:py-2 sm:text-lg">
            20 May, 2023
          </span>
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
                className="line-clamp-2 max-w-36 overflow-hidden text-xl font-medium sm:text-2xl"
                title={work.title} // Tooltip for full title
              >
                {work.title}
              </p>
            </div>
            <img src={getSvg(index)} alt="icon" className="size-9 sm:size-12" />
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
            className="rounded-3xl bg-black px-3 py-2 text-white sm:px-5"
          >
            Details
          </button>
        </div>
      </div>
    </motion.div>
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

const getSvg = (idx) => {
  const svgs = [
    '/svelte.svg',
    '/astro.svg',
    '/deno.svg',
    '/vite.svg',
    '/bun.svg',
    '/next.svg',
    '/turbopack.svg',
  ];
  return svgs[idx % 7];
};

export default WorkCard;

const Pill = ({ skill }) => {
  return (
    <span className="rounded-2xl border border-gray-400 px-2 py-1 text-sm sm:text-lg">
      {skill}
    </span>
  );
};
