import { motion } from 'motion/react';

const OverviewCard = ({ title, data, type }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1.0 }}
      whileHover={{ scale: 1.1 }}
      className={`m-3 h-fit max-h-36 rounded-lg border p-5 shadow-lg ${getStatusClass(type)}`}
    >
      <p className="text-2xl font-semibold text-gray-800">
        {title || 'Default'}
      </p>
      <p className="pt-4 text-xl text-gray-600">{data}</p>
    </motion.div>
  );
};

const getStatusClass = (status) => {
  switch (status) {
    case 'total':
      return 'bg-sky-50';
    case 'pending':
      return 'bg-yellow-50';
    case 'rejected':
      return 'bg-red-50';
    default:
      return 'bg-green-50';
  }
};
export default OverviewCard;
