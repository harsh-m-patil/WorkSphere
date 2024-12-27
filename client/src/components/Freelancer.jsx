import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import NoWorkFound from './NoWorkFound';
import FreelancerStat from './FreelancerStat';
import FreelancerDescCard from './FreelancerDescCard';
import SideFreelancers from './SideFreelancers';
import { API_URL } from '../utils/constants';

const Freelancer = () => {
  const { id } = useParams();
  const [error, setError] = useState(null);
  const [fetchedUser, setfetchedUser] = useState(null);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/users/freelancers`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setUsers(data.data.users);
      })
      .catch((error) => {
        console.error('Error fetching freelancers:', error);
      });
  }, []);

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch(`${API_URL}/users/${id}`);
        const json = await res.json();
        if (res.status === 200) {
          setfetchedUser(json.data.user);
        } else {
          setError(json.message);
        }
      } catch (err) {
        setError(err);
      }
    }
    fetchUser();
  }, [id]);

  if (error) {
    return (
      <div className="grid h-96 items-center">
        <h1 className="text-center text-2xl text-red-800">{error}</h1>;
      </div>
    );
  }

  if (!fetchedUser) {
    return (
      <>
        <NoWorkFound />
      </>
    );
  }

  return (
    <div className="flex h-screen flex-col md:flex-row">
      <SideFreelancers users={users} />
      <div className="sticky top-0 w-7/12 p-10">
        <div className="h-5/6 w-full rounded-xl bg-neutral-50 p-8 shadow-lg">
          <div className="flex justify-between">
            <div className="flex place-items-center">
              <img src="/vite.svg" className="h-24" />
              <div className="p-4">
                <p className="text-2xl font-medium">{fetchedUser.userName}</p>
                <p className="text-lg">{` 🌟 Average Rating : ${fetchedUser.ratingsAverage}`}</p>
              </div>
            </div>
          </div>
          <div className="m-3 grid min-h-32 grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-4">
            <FreelancerStat
              statName="Skills"
              statValue={fetchedUser.skills}
              styles="bg-green-100"
            />
            <FreelancerStat
              statName="Languages"
              statValue={fetchedUser.languages}
              styles="bg-blue-100"
            />
            <FreelancerStat
              statName="Certifications"
              statValue={fetchedUser.certifications}
              styles="bg-orange-100"
            />
          </div>
          <div className="m-3 grid grid-cols-2 flex-wrap gap-4 rounded-xl text-center">
            <FreelancerDescCard
              name="Description"
              val={fetchedUser.description}
              styles="bg-purple-100"
            />
            <FreelancerDescCard
              name="Email"
              val={fetchedUser.email}
              styles="bg-pink-200"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Freelancer;
