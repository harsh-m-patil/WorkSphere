import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import NoWorkFound from './NoWorkFound';
import { SideWorks } from './SideWorks';
import WorkStat from './WorkStat';
import Button from './Button';
import UserInfoWork from './UserInfoWork';

const Work = () => {
  const works = useSelector((state) => state.work);
  const { id } = useParams();
  const [error, setError] = useState(null);
  const [fetchedWork, setFetchedWork] = useState(null);

  useEffect(() => {
    async function fetchWork() {
      try {
        const res = await fetch(`http://localhost:3000/api/v1/work/${id}`);
        const json = await res.json();
        if (res.status === 200) {
          setFetchedWork(json.data.work);
        } else {
          setError(json.message);
        }
      } catch (err) {
        setError(err);
      }
    }
    fetchWork();
  }, [id]);

  if (error) {
    return (
      <div className="grid h-96 items-center">
        <h1 className="text-center text-2xl text-red-800">{error}</h1>;
      </div>
    );
  }

  if (!fetchedWork) {
    return (
      <>
        <NoWorkFound />
      </>
    );
  }

  // TODO: Apply now logic
  const handleClick = () => {
    console.log('clicked');
  };

  return (
    <div className="flex h-screen">
      <SideWorks works={works} />
      <div className="sticky top-0 w-7/12 p-10">
        <div className="h-5/6 w-full rounded-xl bg-neutral-50 p-8 shadow-lg">
          <div className="flex justify-between">
            <div className="flex place-items-center">
              <img src="/vite.svg" className="h-24" />
              <div className="p-4">
                <p className="text-2xl font-medium">
                  {fetchedWork.client_id.userName}
                </p>
                <p className="text-lg">{fetchedWork.title}</p>
                <p className="text-lg text-gray-500">
                  {fetchedWork.location || 'remote'}
                </p>
              </div>
            </div>
            <div className="grid items-center">
              <Button text="Apply Now" onClick={handleClick} />
            </div>
          </div>
          <div className="m-3 grid min-h-32 grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-4">
            <WorkStat
              statName="Pay"
              statValue={fetchedWork.pay}
              styles="bg-green-100"
            />
            <WorkStat
              statName="Job Type"
              statValue={fetchedWork.joblevel}
              styles="bg-blue-100"
            />
            <WorkStat
              statName="Number of Applicants"
              statValue={fetchedWork.applied_status.length}
              styles="bg-orange-100"
            />
            <WorkStat
              statName="Status"
              statValue={fetchedWork.active ? 'Active' : 'InActive'}
              styles="bg-purple-100"
            />
          </div>
        </div>
      </div>
      {/*User info section*/}
      <UserInfoWork />
    </div>
  );
};

export default Work;
