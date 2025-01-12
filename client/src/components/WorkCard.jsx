import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Badge } from './ui/badge';
import { Avatar, AvatarImage } from './ui/avatar';
import { AvatarFallback } from '@radix-ui/react-avatar';
import { getDate } from '@/utils/convertDate';
import { Button } from './ui/button';

const WorkCard = ({ work, index }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/works/${work._id}`);
  };

  return (
    <motion.div
      className="group flex h-[24rem] w-72 flex-col justify-around rounded-3xl border p-2 pb-6 shadow-xl md:w-80 lg:h-[23rem]"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1.0 }}
      whileHover={{ scale: 1.01, shadow: 1.1 }}
    >
      <div
        className={`h-5/6 w-full rounded-3xl px-4 py-5 ${getColor(index)} flex flex-col`}
      >
        {/* Date Section */}
        <div className="flex justify-between">
          <Badge variant="secondary" className="bg-white px-2 py-1 text-sm">
            {getDate(work.createdAt)}
          </Badge>
          <Badge variant="outline">{work.joblevel}</Badge>
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
            <Avatar>
              <AvatarImage src={work.client_id?.profileImage} />
              <AvatarFallback>
                <img
                  src={getSvg(index)}
                  alt="icon"
                  className="size-9 sm:size-12"
                />
              </AvatarFallback>
            </Avatar>
          </div>
          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {work.skills_Required.map((skill, index) => (
              <Badge
                key={1 + index}
                variant="outline"
                className="border-gray-400 bg-transparent px-2 text-sm"
              >
                {skill}
              </Badge>
            ))}
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between rounded-3xl px-4 py-2">
        <div>
          <span className="font-semibold">$ {work.pay}</span>
          <p className="text-gray-600">Remote</p>
        </div>
        <div>
          <Button onClick={handleClick} className="rounded-3xl">
            Details
          </Button>
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
