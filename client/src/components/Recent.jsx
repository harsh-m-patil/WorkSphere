import { motion } from 'motion/react';
import ChartDemo from './FreelancerGraph';

const Recent = () => {
  const storedUser = localStorage.getItem('user');
  const user = storedUser ? JSON.parse(storedUser) : null;

  return (
    <motion.div
      className="grid h-full grid-cols-1 gap-6 rounded-2xl bg-white p-4 shadow shadow-gray-300 md:p-5 lg:grid-cols-2"
      initial={{ scale: 0.7 }}
      animate={{ scale: 1.0 }}
    >
      {/* Recent Applications Section */}
      <div className="overflow-x-auto rounded-lg p-3 md:p-4">
        <h1 className="mb-4 text-lg font-semibold md:text-2xl">Recents</h1>
        <div className="min-w-[480px] overflow-x-auto md:min-w-0">
          <table className="w-full border-separate border-spacing-y-2 text-left md:border-spacing-y-3">
            <thead className="bg-teal-50 text-base font-medium md:text-lg">
              <tr>
                <th className="px-2 py-2 md:px-4">Appl Name</th>
                <th className="px-2 py-2 md:px-4">Pay</th>
                <th className="px-2 py-2 md:px-4">Status</th>
              </tr>
            </thead>
            {user && user.works?.length > 0 ? (
              <tbody className="text-sm md:text-base">
                {user.works.map((el) => (
                  <RecentElement el={el} key={el._id || el.title} />
                ))}
              </tbody>
            ) : (
              <tbody>
                <tr>
                  <td
                    colSpan="3"
                    className="px-3 py-2 text-center text-gray-500 md:px-4"
                  >
                    No Works Found
                  </td>
                </tr>
              </tbody>
            )}
          </table>
        </div>
      </div>

      {/* Graph Section */}
      <div className="rounded-lg p-3 md:p-4">
        <h1 className="mb-4 text-lg font-semibold md:text-2xl">Graph</h1>
        <ChartDemo />
      </div>
    </motion.div>
  );
};

const RecentElement = ({ el }) => {
  const userId = localStorage.getItem('id') || '';
  return (
    <tr className="hover:bg-gray-50">
      <td className="max-w-[200px] truncate px-3 py-2 md:px-4">{el.title}</td>
      <td className="px-3 py-2 md:px-4">$ {el.pay}</td>
      <td className="px-3 py-2 md:px-4">
        <span
          className={`inline-block rounded-full px-2 py-1 text-sm md:text-base ${getStatusClass(getStatus(el, userId))} w-24 text-center md:w-28`}
        >
          {getStatus(el, userId)}
        </span>
      </td>
    </tr>
  );
};

function getStatus(appl, userId) {
  if (appl.freelancer_id === userId) {
    return 'Accepted';
  } else if (appl.freelancer_id) {
    return 'Rejected';
  } else {
    return 'Pending';
  }
}

const getStatusClass = (status) => {
  switch (status) {
    case 'Accepted':
      return 'bg-green-50 text-green-600 border border-green-600 font-semibold';
    case 'Pending':
      return 'bg-yellow-50 text-yellow-600 border border-yellow-600 font-semibold';
    case 'Rejected':
      return 'bg-red-50 text-red-600 border border-red-600 font-semibold';
    default:
      return '';
  }
};

export default Recent;
