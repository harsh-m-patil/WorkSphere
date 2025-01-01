import { useParams } from 'react-router-dom';
import { useState } from 'react';
import NoWorkFound from './NoWorkFound';
import WorkStat from './WorkStat';
import Button from './Button';
import WorkDescCard from './WorkDescCard';
import axios from 'axios';
import { toast } from 'sonner';
import { useQuery } from '@tanstack/react-query';
import { fetchWorkById } from '../query/fetchWorkById';
import { API_URL } from '../utils/constants';

const Work = () => {
  const { id } = useParams();
  const [isActive, setIsActive] = useState(true);

  const { data, isError, isLoading, error } = useQuery({
    queryKey: [id],
    queryFn: () => fetchWorkById(id),
    staleTime: 60 * 1000,
  });

  if (isError) {
    return (
      <div className="grid h-96 items-center">
        <h1 className="text-center text-2xl text-red-800">{error.message}</h1>;
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="grid h-96 items-center">
        <h1 className="text-center text-2xl text-blue-800">Loading</h1>;
      </div>
    );
  }

  if (!data) {
    return (
      <>
        <NoWorkFound />
      </>
    );
  }

  const handleClick = async () => {
    try {
      const token = localStorage.getItem('token');

      if (!token) {
        toast.error('Please Login first', { position: 'top-center' });
        return;
      }

      const response = await axios.post(
        `${API_URL}/work/apply`,
        {
          workId: id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(response.data.message, { position: 'top-center' });
    } catch (err) {
      toast.error(err.response.data.message, { position: 'top-center' });
    }
  };

  const handleToggleClick = () => {
    setIsActive((prev) => !prev);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-purple-50 via-orange-50 to-transparent">
      <div className="max-w-7xl rounded-2xl border-2 bg-[#2F9C95] bg-opacity-15 shadow-2xl sm:p-10">
        <div className="w-full rounded-xl bg-neutral-50 p-8 shadow-xl">
          <div className="flex flex-wrap items-center justify-center sm:justify-between">
            <div className="flex place-items-center">
              <img src={'/deno.svg'} className="h-24" />
              <div className="p-4">
                <p className="text-2xl font-medium">
                  {data.client_id?.userName}
                </p>
                <p className="text-lg">{data.title}</p>
                <p className="text-lg text-gray-500">
                  {data.location || 'remote'}
                </p>
              </div>
            </div>
            <div className="grid items-center">
              <Button text="Apply Now" onClick={handleClick} />
            </div>
          </div>
          <div className="m-3 grid min-h-32 grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-10 md:grid-cols-4">
            <WorkStat
              statName="Pay"
              statValue={data.pay}
              styles="bg-green-100"
            />
            <WorkStat
              statName="Job Type"
              statValue={data.joblevel}
              styles="bg-blue-100"
            />
            <WorkStat
              statName="Number of Applicants"
              statValue={data.applied_status.length}
              styles="bg-orange-100"
            />
            <WorkStat
              statName="Status"
              statValue={data.active ? 'Active' : 'InActive'}
              styles="bg-purple-100"
            />
          </div>
          <div className="m-1 grid grid-cols-1 rounded-xl text-center lg:grid-cols-2">
            <WorkDescCard
              title="Description"
              type="job"
              desc={data}
              isActive={isActive}
              onClick={handleToggleClick}
            />
            <WorkDescCard
              title="Company"
              type="client"
              desc={data.client_id}
              isActive={!isActive}
              onClick={handleToggleClick}
            />
          </div>
        </div>
      </div>
      {/*User info section*/}
    </div>
  );
};

export default Work;
