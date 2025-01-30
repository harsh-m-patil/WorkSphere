import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { IMAGE_URL } from '../utils/constants';
import { Badge } from './ui/badge';
import { Avatar, AvatarImage } from './ui/avatar';
import { AvatarFallback } from '@radix-ui/react-avatar';
import { getDate } from '@/utils/convertDate';
import { Button } from './ui/button';

const UserCard = ({ user, index }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/freelancers/${user.userName}`);
  };

  return (
    <motion.div
      className="group flex h-[24rem] w-72 flex-col justify-around rounded-3xl border p-2 pb-6 shadow-xl md:w-80 lg:h-[23rem]"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1.0 }}
      whileHover={{ scale: 1.05, shadow: 1.1 }}
    >
      <div
        className={`h-5/6 w-full rounded-3xl px-4 py-5 ${getColor(index)} flex flex-col`}
      >
        {/* Date Section */}
        <div>
          <Badge variant="secondary" className="bg-white px-2 py-1 text-sm">
            {getDate(user.createdAt)}
          </Badge>
        </div>
        {/* More Info */}
        <div className="flex h-5/6 flex-col justify-between gap-10 px-3 pt-6">
          <div className="flex justify-between">
            <div>
              <p className="pb-1 text-sm text-gray-700">{user.userName}</p>
              {/* Add multi-line truncation for the title */}
              <p className="line-clamp-2 max-w-36 overflow-hidden text-2xl font-medium">
                {user.firstName +
                  ' ' +
                  (user.LastName === undefined ? '' : user.LastName)}
              </p>
            </div>
            <Avatar>
              {user.profileImage === undefined ? (
                ''
              ) : (
                <AvatarImage
                  src={`${IMAGE_URL}${user?.profileImage?.split('/')[3]}`}
                />
              )}
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
            {user.skills.map((skill, index) => (
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
      <div className="flex h-1/6 justify-between rounded-3xl p-4">
        <div>
          <span className="font-semibold">{`Average Rating : ${user.ratingsAverage}`}</span>
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

export default UserCard;

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
