export const ApplicationListElement = ({ appl, cancelApplication, userId }) => {
  return (
    <tr className="hover:bg-gray-50">
      <td className="border border-gray-300 px-4 py-3">{appl._id}</td>
      <td className="border border-gray-300 px-4 py-3">{appl.title}</td>
      <td className="border border-gray-300 px-4 py-3">₹{appl.pay}</td>
      <td className="p-x-3 p-y-2 border border-gray-300 text-center">
        <span
          className={`rounded-xl border border-dashed px-4 py-1 text-center ${getStatusClass(getStatus(appl, userId))}`}
        >
          {getStatus(appl, userId)}
        </span>
      </td>
      <td className="border border-gray-300 px-4 py-3 text-center">
        {appl.status === 'Pending' && (
          <button
            className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
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
  console.log(appl, userId);
  if (appl.freelancer_id === userId) {
    return 'Accepted';
  } else if (appl.freelancer_id) {
    return 'Rejected';
  } else {
    return 'Pending';
  }
}

// Helper function for dynamic status colors
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
