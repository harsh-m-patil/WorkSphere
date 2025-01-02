import { useState } from 'react';
import axios from 'axios';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { SearchBar } from './SearchBar';
import { ApplicationListElement } from './ApplicationListElement';
import { API_URL } from '../utils/constants';
import { toast } from 'sonner';
import { fetchApplications } from '../query/fetchApplications';

// Separate API functions
const cancelApplicationRequest = async (id) => {
  const token = localStorage.getItem('token');
  const response = await axios.delete(`${API_URL}/work/cancel/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

const Applications = () => {
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const id = localStorage.getItem('id');
  const queryClient = useQueryClient();

  // Query for fetching applications
  const {
    data: applications = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ['applications'],
    queryFn: fetchApplications,
    staleTime: 60 * 1000,
  });

  // Mutation for canceling applications
  const cancelMutation = useMutation({
    mutationFn: cancelApplicationRequest,
    onSuccess: (data) => {
      toast.success(data.message);
      // Invalidate and refetch applications after successful cancellation
      queryClient.invalidateQueries(['applications']);
    },
    onError: (error) => {
      toast.error(error.message, { position: 'top-center' });
    },
  });

  function getStatus(appl, userId) {
    if (appl.freelancer_id === userId) {
      return 'Accepted';
    } else if (appl.freelancer_id) {
      return 'Rejected';
    } else {
      return 'Pending';
    }
  }

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleStatusChange = (e) => {
    setStatusFilter(e.target.value);
  };

  // Filter applications based on search query and status
  const filteredAppls = applications.filter((appl) => {
    const matchesSearch = appl.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === 'all' ||
      getStatus(appl, id).toLowerCase() === statusFilter.toLowerCase();

    return matchesSearch && matchesStatus;
  });

  const MobileApplicationCard = ({ appl, index, userId }) => {
    const status = getStatus(appl, userId);

    return (
      <div className="mb-4 rounded-lg border border-gray-300 bg-white p-4 shadow">
        <div className="mb-2 flex justify-between">
          <span className="font-semibold">No:</span>
          <span>{index}</span>
        </div>
        <div className="mb-2 flex justify-between">
          <span className="font-semibold">Title:</span>
          <span className="text-right">{appl.title}</span>
        </div>
        <div className="mb-2 flex justify-between">
          <span className="font-semibold">Pay:</span>
          <span>₹{appl.pay}</span>
        </div>
        <div className="mb-4 flex justify-between">
          <span className="font-semibold">Status:</span>
          <span
            className={`rounded-full px-3 py-1 text-sm font-semibold ${
              status === 'Accepted'
                ? 'bg-green-100 text-green-800'
                : status === 'Rejected'
                  ? 'bg-red-100 text-red-800'
                  : 'bg-yellow-100 text-yellow-800'
            }`}
          >
            {status}
          </span>
        </div>
        {status === 'Pending' && (
          <button
            onClick={() => cancelMutation.mutate(appl._id)}
            disabled={cancelMutation.isPending}
            className="w-full rounded-lg bg-red-500 px-4 py-2 text-white transition-all hover:bg-red-600 disabled:bg-red-300"
          >
            {cancelMutation.isPending ? 'Canceling...' : 'Cancel Application'}
          </button>
        )}
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="mt-4 flex w-full flex-col gap-4 rounded-lg bg-gray-50 p-4 shadow sm:mt-8 md:mt-12">
        <div className="w-full transform rounded-xl bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 p-4 text-white shadow-xl md:w-96">
          <h2 className="flex items-center text-lg font-extrabold tracking-tight sm:text-xl md:text-3xl">
            My Applications
            <span className="ml-2 rounded-full bg-white px-2 py-1 text-sm font-bold text-purple-700 md:ml-4 md:px-5 md:py-2 md:text-lg">
              0
            </span>
          </h2>
        </div>
        <div className="flex justify-center p-4">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-center text-red-600">Error: {error.message}</div>
    );
  }

  return (
    <div className="mt-12 flex w-full flex-col gap-4 rounded-lg bg-gray-50 p-4 shadow sm:mt-8 md:mt-12">
      {/* Header */}
      <div className="w-full transform rounded-xl bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 p-4 text-white shadow-xl md:w-96">
        <h2 className="flex items-center text-lg font-extrabold tracking-tight sm:text-xl md:text-3xl">
          My Applications
          <span className="ml-2 rounded-full bg-white px-2 py-1 text-sm font-bold text-purple-700 md:ml-4 md:px-5 md:py-2 md:text-lg">
            {filteredAppls.length}
          </span>
        </h2>
      </div>

      {/* Search and Filter */}
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

      {/* Desktop View - Table */}
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

      {/* Mobile View - Cards */}
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
    </div>
  );
};

export default Applications;
