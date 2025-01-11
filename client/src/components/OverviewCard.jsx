import { motion } from 'motion/react';

const OverviewCard = ({ title, data, type }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1.0 }}
      whileHover={{ scale: 1.05 }}
      className={`m-3 h-36 rounded-lg border p-2 shadow-lg sm:p-5 ${type}`}
    >
      <p className="text-xl font-semibold text-gray-800 sm:text-2xl">
        {title || 'Default'}
      </p>
      <p className="pt-4 text-xl text-gray-600">{data}</p>
    </motion.div>
  );
};

export default OverviewCard;
