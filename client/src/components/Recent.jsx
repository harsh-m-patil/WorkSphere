const Recent = () => {
  return (
    <div className="grid h-full gap-4 rounded-2xl bg-white p-5 shadow shadow-gray-300 sm:grid-cols-1 md:grid-cols-2">
      {/* Recent Applications Section */}
      <div className="rounded-lg p-4">
        <h1 className="mb-4 text-2xl font-semibold">Recents</h1>
        <table className="w-full border-separate border-spacing-y-3 text-left">
          <thead className="bg-teal-50 text-xl font-medium">
            <tr>
              <td className="px-4 py-2">Application Name</td>
              <td className="px-4 py-2">Date</td>
              <td className="px-4 py-2">Status</td>
            </tr>
          </thead>
          <tbody className="text-lg">
            <RecentElement
              name="Portfolio Website"
              date="2024-12-01"
              status="Accepted"
            />
            <RecentElement
              name="Blog Platform"
              date="2024-11-28"
              status="Rejected"
            />
            <RecentElement
              name="E-commerce App"
              date="2024-11-25"
              status="Pending"
            />
          </tbody>
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
    </div>
  );
};

const RecentElement = ({ name, date, status }) => {
  return (
    <tr className="hover:bg-gray-50">
      <td className="px-4 py-2">{name}</td>
      {/* Increased padding for spacing */}
      <td className="px-4 py-2">{date}</td>
      {/* Increased padding for spacing */}
      <td
        className={`rounded-3xl border border-dashed px-2 py-2 ${getStatusColor(status)} ${getBorderColor(status)} text-center`}
      >
        {status}
      </td>
    </tr>
  );
};

// Utility function to style status
const getStatusColor = (status) => {
  switch (status) {
    case 'Accepted':
      return 'bg-green-50';
    case 'Pending':
      return 'bg-yellow-50';
    case 'Rejected':
      return 'bg-red-50';
    default:
      return '';
  }
};

const getBorderColor = (status) => {
  switch (status) {
    case 'Accepted':
      return 'border-green-500';
    case 'Pending':
      return 'border-yellow-500';
    case 'Rejected':
      return 'border-red-500';
    default:
      return '';
  }
};

export default Recent;
