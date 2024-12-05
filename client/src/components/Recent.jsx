import { motion } from 'motion/react';

const Recent = () => {
  const storedUser = localStorage.getItem('user');
  const user = storedUser ? JSON.parse(storedUser) : null;

  return (
    <motion.div
      className="grid h-full gap-4 rounded-2xl bg-white p-5 shadow shadow-gray-300 sm:grid-cols-1 md:grid-cols-2"
      initial={{ scale: 0.7 }}
      animate={{ scale: 1.0 }}
    >
      {/* Recent Applications Section */}
      <div className="rounded-lg p-4">
        <h1 className="mb-4 text-2xl font-semibold">Recents</h1>
        <table className="w-full border-separate border-spacing-y-3 text-left">
          <thead className="bg-teal-50 text-xl font-medium">
            <tr>
              <th className="px-4 py-2">Application Name</th>
              <th className="px-4 py-2">Pay</th>
              <th className="px-4 py-2">Status</th>
            </tr>
          </thead>
          {user && user.works?.length > 0 ? (
            <tbody className="text-lg">
              {user.works.map((el) => (
                <RecentElement el={el} key={el._id || el.title} />
              ))}
            </tbody>
          ) : (
            <tbody>
              <tr>
                <td colSpan="3" className="px-4 py-2 text-center text-gray-500">
                  No Works Found
                </td>
              </tr>
            </tbody>
          )}
        </table>
      </div>

      {/* Graph Section */}
      <div className="rounded-lg p-4">
        <h1 className="mb-4 text-2xl font-semibold">Graph</h1>
        <div className="flex h-64 items-center justify-center rounded-lg bg-gray-100">
          {/* Placeholder for Graph */}
          <p className="text-gray-500">Graph Visualization Placeholder</p>
        </div>
      </div>
    </motion.div>
  );
};

const RecentElement = ({ el }) => {
  const userId = localStorage.getItem('id') || '';

  return (
    <tr className="hover:bg-gray-50">
      <td className="px-4 py-2">{el.title}</td>
      <td className="px-4 py-2">$ {el.pay}</td>
      <td
        className={`rounded-3xl border px-2 py-2 ${getStatusClass(
          getStatus(el, userId)
        )} text-center`}
      >
        {getStatus(el, userId)}
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
      return 'bg-green-50 text-green-600 border-green-600 font-semibold';
    case 'Pending':
      return 'bg-yellow-50 text-yellow-600 border-yellow-600 font-semibold';
    case 'Rejected':
      return 'bg-red-50 text-red-600 border-red-600 font-semibold';
    default:
      return '';
  }
};

export default Recent;
