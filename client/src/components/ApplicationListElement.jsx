export const ApplicationListElement = ({
  appl,
  index,
  userId,
  cancelApplication,
}) => {
  return (
    <tr className="transition duration-300 hover:bg-gray-100">
      <td className="border border-gray-300 px-2 py-2 text-sm text-gray-800 md:px-6 md:py-4 md:text-lg">
        {index}
      </td>
      <td className="hidden border border-gray-300 px-2 py-2 text-sm text-gray-800 md:table-cell md:px-6 md:py-4 md:text-lg">
        {appl._id}
      </td>
      <td className="border border-gray-300 px-2 py-2 text-sm text-gray-800 md:px-6 md:py-4 md:text-lg">
        <div className="max-w-[150px] truncate md:max-w-none">{appl.title}</div>
      </td>
      <td className="border border-gray-300 px-2 py-2 text-sm font-medium text-gray-800 md:px-6 md:py-4 md:text-lg">
        ₹{appl.pay}
      </td>
      <td className="border border-gray-300 px-2 py-2 text-center md:px-6 md:py-4">
        <span
          className={`inline-block whitespace-nowrap rounded-full border px-2 py-1 text-xs md:px-4 md:text-base ${getStatusClass(getStatus(appl, userId))}`}
        >
          {getStatus(appl, userId)}
        </span>
      </td>
      <td className="border border-gray-300 px-2 py-2 text-center md:px-6 md:py-4">
        {getStatus(appl, userId) === 'Pending' && (
          <button
            className="whitespace-nowrap rounded-full bg-red-500 px-3 py-1 text-xs font-semibold text-white shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300 md:px-5 md:py-2 md:text-base"
            onClick={() => cancelApplication(appl._id)}
          >
            Cancel
          </button>
        )}
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
      return 'bg-green-100 text-green-700 border-green-500 font-semibold';
    case 'Pending':
      return 'bg-yellow-100 text-yellow-700 border-yellow-500 font-semibold';
    case 'Rejected':
      return 'bg-red-100 text-red-700 border-red-500 font-semibold';
    default:
      return 'bg-gray-100 text-gray-700 border-gray-500 font-semibold';
  }
};

export default ApplicationListElement;
