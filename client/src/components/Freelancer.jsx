import { useParams } from 'react-router-dom';
import NoWorkFound from './NoWorkFound';
import FreelancerStat from './FreelancerStat';
import FreelancerDescCard from './FreelancerDescCard';
import { useQuery } from '@tanstack/react-query';
import { fetchUserByUsername } from '@/query/fetchUserByUsername';

const Freelancer = () => {
  const { username } = useParams();
  const { data, isError, isLoading, error } = useQuery({
    queryKey: [username],
    queryFn: () => fetchUserByUsername(username),
    staleTime: 60 * 1000,
  });

  // Loading and error states are now centered properly on all screen sizes
  if (isError) {
    return (
      <div className="grid min-h-screen place-items-center p-4">
        <h1 className="text-center text-xl text-red-800 md:text-2xl">
          {error.message}
        </h1>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="grid min-h-screen place-items-center p-4">
        <h1 className="text-center text-xl text-blue-800 md:text-2xl">
          Loading
        </h1>
      </div>
    );
  }

  if (!data) {
    return <NoWorkFound />;
  }

  return (
    <div className="flex min-h-screen flex-col p-4 sm:items-center sm:justify-center lg:flex-row">
      {/* Main container now takes full width on mobile */}
      <div className="w-full p-4 md:p-6 lg:sticky lg:top-0 lg:w-7/12 lg:p-10">
        <div className="w-full rounded-xl bg-neutral-50 p-4 shadow-lg md:p-6 lg:p-8">
          {/* Profile header is now stack on mobile */}
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-between">
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start">
              <img src="/vite.svg" className="h-16 md:h-24" alt="Profile" />
              <div className="text-center sm:text-left">
                <p className="text-xl font-medium md:text-2xl">
                  {data.userName}
                </p>
                <p className="text-base md:text-lg">{`🌟 Average Rating: ${data.ratingsAverage}`}</p>
              </div>
            </div>
          </div>

          {/* Stats grid now adapts to screen size */}
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-3">
            <FreelancerStat
              statName="Skills"
              statValue={data.skills}
              styles="bg-green-100"
            />
            <FreelancerStat
              statName="Languages"
              statValue={data.languages}
              styles="bg-blue-100"
            />
            <FreelancerStat
              statName="Certifications"
              statValue={data.certifications}
              styles="bg-orange-100"
            />
          </div>

          {/* Description cards stack on mobile */}
          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
            <FreelancerDescCard
              name="Description"
              val={data.description}
              styles="bg-purple-100"
            />
            <FreelancerDescCard
              name="Email"
              val={data.email}
              styles="bg-pink-200"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Freelancer;
