import ApplicationsTable from './ApplicationsTable';

const Applications = () => {
  return (
    <div className="mt-12 flex w-full flex-col gap-4 rounded-lg bg-gray-50 p-4 shadow sm:mt-8 md:mt-12">
      {/* Header */}
      <div className="w-full transform rounded-xl bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 p-4 text-white shadow-xl md:w-96">
        <h2 className="flex items-center text-lg font-extrabold tracking-tight sm:text-xl md:text-3xl">
          My Applications
        </h2>
      </div>

      <ApplicationsTable />
      {/* Search and Filter */}
      {/*
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
        <div className="flex-1">
          <SearchBar onSearch={handleSearch} />
        </div>
        <select
          value={statusFilter}
          onChange={handleStatusChange}
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm sm:w-auto"
        >
          <option value="all">All Statuses</option>
          <option value="Accepted">Accepted</option>
          <option value="Pending">Pending</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>

      <div className="hidden overflow-x-auto rounded-lg shadow md:block">
        <table className="w-full border-collapse border border-gray-300 text-left">
          <thead className="bg-gray-200 text-sm uppercase text-gray-700">
            <tr>
              <th className="border border-gray-300 px-4 py-2 text-left font-semibold">
                No
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left font-semibold">
                ID
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left font-semibold">
                Title
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left font-semibold">
                Pay
              </th>
              <th className="border border-gray-300 px-4 py-2 text-center font-semibold">
                Status
              </th>
              <th className="border border-gray-300 px-4 py-2 text-center font-semibold">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredAppls.length === 0 ? (
              <tr>
                <td
                  colSpan="6"
                  className="border border-gray-300 px-4 py-2 text-center"
                >
                  No Applications Found
                </td>
              </tr>
            ) : (
              filteredAppls.map((appl, index) => (
                <ApplicationListElement
                  key={appl._id}
                  index={index + 1}
                  appl={appl}
                  cancelApplication={(id) => cancelMutation.mutate(id)}
                  userId={id}
                  isCanceling={cancelMutation.isPending}
                />
              ))
            )}
          </tbody>
        </table>
      </div>

*/}

      {/* Mobile View - Cards 
     <div className="md:hidden">
        {filteredAppls.length === 0 ? (
          <div className="rounded-lg border border-gray-300 bg-white py-4 text-center">
            No Applications Found
          </div>
        ) : (
          filteredAppls.map((appl, index) => (
            <MobileApplicationCard
              key={appl._id}
              appl={appl}
              index={index + 1}
              userId={id}
            />
          ))
        )}
      </div>
      */}
    </div>
  );
};

export default Applications;
