import { motion } from 'motion/react';

const UserDashboardHeader = ({ title, array }) => {
  return (
    <motion.div
      initial={{ scale: 0.8 }}
      animate={{ scale: 1.0 }}
      className="mb-6 max-w-96 rounded-xl p-6 text-slate-800"
    >
      <h2 className="mb-1 flex items-center text-2xl font-extrabold tracking-tight sm:text-3xl">
        {title}
        {array && (
          <span className="ml-4 rounded-full bg-white px-5 py-2 text-lg font-bold text-purple-700 shadow-lg hover:bg-gray-200 hover:shadow-xl">
            {array.length}
          </span>
        )}
      </h2>
    </motion.div>
  );
};

export default UserDashboardHeader;
