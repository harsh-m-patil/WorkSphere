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
    </div>
  );
};

export default Applications;
