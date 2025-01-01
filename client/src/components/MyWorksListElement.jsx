import { motion } from 'motion/react';

export const MyWorksListElement = ({ appl }) => {
  return (
    <motion.tr
      className="transition duration-300 hover:bg-gray-100"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <td className="border border-gray-300 px-2 py-2 text-sm text-gray-700 sm:px-4 sm:py-3 md:px-6 md:py-4 md:text-base lg:text-lg">
        {appl._id}
      </td>
      <td className="border border-gray-300 px-2 py-2 text-sm text-gray-700 sm:px-4 sm:py-3 md:px-6 md:py-4 md:text-base lg:text-lg">
        {appl.title}
      </td>
      <td className="border border-gray-300 px-2 py-2 text-sm font-medium text-gray-700 sm:px-4 sm:py-3 md:px-6 md:py-4 md:text-base lg:text-lg">
        ₹{appl.pay}
      </td>
      <td className="border border-gray-300 px-2 py-2 text-sm text-gray-700 sm:px-4 sm:py-3 md:px-6 md:py-4 md:text-base lg:text-lg">
        {appl.client_id.userName}
      </td>
      <td className="border border-gray-300 px-2 py-2 text-center sm:px-4 sm:py-3 md:px-6 md:py-4">
        <span
          className={`inline-block rounded-full border border-dashed bg-gray-100 px-2 py-0.5 text-sm font-semibold text-gray-600 sm:px-3 sm:py-1 md:px-4 md:text-base lg:text-lg`}
        >
          {appl.joblevel}
        </span>
      </td>
    </motion.tr>
  );
};
