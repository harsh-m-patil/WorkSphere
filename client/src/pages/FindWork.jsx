import axios from "axios";
import { useEffect, useState } from "react";
import { API_URL } from "../utils/constants";
import Sidebar from "../components/UserSideBar";
import WorkCard from "../components/WorkCard";

const FindWork = () => {
  const [works, setWorks] = useState([]);
  const [user, setUser] = useState({});  // Empty object as initial value

  useEffect(() => {
    async function fetchWorks() {
      const response = await axios.get(`${API_URL}/work`);
      const respArr = response.data.data.works;  
      console.log("Work data:", respArr);
      setWorks(respArr);  // Correctly set the Work Array Data 
    }

    async function fetchUser() {
      try {
        const response = await axios.get(`${API_URL}/users/me`, {
          withCredentials: true,
        });
        const det = response.data.data.user;
        console.log("Fetched User Data", det);
        setUser(det);  // Correctly set the user data
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }
    
    fetchUser();
    fetchWorks();
  }, []);

  // New useEffect to log user state once it has been updated
  useEffect(() => {
    console.log("Updated user state:", user);
  }, [user]); // This will log the user whenever it changes

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar />
      <div className="container mx-auto p-4">
        <h1 className="mb-4 text-3xl font-bold">Available Jobs</h1>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          { Object.keys(user).length!==0 && works.map((work) => (
            <WorkCard key={work._id} work={work} user={user} />
          ))}
          {/* {user} */}
        </div>
      </div>
    </div>
  );
};

export default FindWork;
