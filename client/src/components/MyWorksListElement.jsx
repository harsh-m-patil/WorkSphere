import { motion } from 'motion/react';
export const MyWorksListElement = ({ appl }) => {
  return (
    <motion.tr
      className="transition duration-300 hover:bg-gray-100"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <td className="border border-gray-300 px-6 py-4 text-lg text-gray-700">
        {appl._id}
      </td>
      <td className="border border-gray-300 px-6 py-4 text-lg text-gray-700">
        {appl.title}
      </td>
      <td className="border border-gray-300 px-6 py-4 text-lg font-medium text-gray-700">
        ₹{appl.pay}
      </td>
      <td className="border border-gray-300 px-6 py-4 text-lg text-gray-700">
        {appl.client_id.userName}
      </td>
      <td className="border border-gray-300 px-6 py-4 text-center">
        <span
          className={`inline-block rounded-full border border-dashed bg-gray-100 px-4 py-1 text-lg font-semibold text-gray-600`}
        >
          {appl.joblevel}
        </span>
      </td>
    </motion.tr>
  );
};
