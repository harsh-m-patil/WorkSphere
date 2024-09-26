import { useState } from "react";
import ClientSideBar from "./ClientSideBar";
import axios from "axios";
import { API_URL } from "../utils/constants";

const ClientPostWork = () => {
  const [jobData, setjobData] = useState({
    title: "",
    description: "",
    pay: "",
    joblevel: "Medium", // Default to Medium
    skills_Required: ""
  });

  const handleChange = (e)=>{
    e.preventDefault;

    setjobData((prev)=>({
      ...prev,
      [e.target.name]:e.target.value,  
    }))
    
  }

  const handleSubmit = async (e)=>{
    e.preventDefault();

    try {
        // Transform skills_Required to array
        const skillsArray = jobData.skills_Required.split(",").map(skill => skill.trim());

        // Make the POST request to the API to submit the job data
        const response = await axios.post(`${API_URL}/work`, {
            ...jobData,
            skills_Required: skillsArray, // Send skills as array
        },{withCredentials:true});

        // Handle success (Optional: Reset form or show success message)
        console.log("Work posted successfully:", response.data);
        e.target.reset();
    } catch (error) {
        console.error("Error posting work:", error);
        // Handle error (optional: show error message)
    }
  }

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <ClientSideBar />

      {/* Main content */}
      <div className="w-full flex-grow flex-col bg-gray-50 p-6">
        <h2 className="mb-6 text-2xl font-bold">Post a New Job</h2>

        <form
          onSubmit = {handleSubmit}
          className="space-y-6 rounded-md bg-white p-6 shadow"
        >
          <div>
            <label className="block font-semibold text-gray-700">
              Job Title
            </label>
            <input
              type="text"
              name="title"
              value={jobData.title}
              onChange={handleChange}
              className="mt-1 w-full rounded-md border p-2"
              required
            />
          </div>

          <div>
            <label className="block font-semibold text-gray-700">
              Job Description
            </label>
            <textarea
              name="description"
              value={jobData.description}
              onChange={handleChange}
              className="mt-1 w-full rounded-md border p-2"
              required
            ></textarea>
          </div>

          <div>
            <label className="block font-semibold text-gray-700">Pay</label>
            <input
              type="number"
              name="pay"
              value={jobData.pay}
              onChange={handleChange}
              className="mt-1 w-full rounded-md border p-2"
              required
            />
          </div>

          <div>
            <label className="block font-semibold text-gray-700">
              Job Level
            </label>
            <select
              name="joblevel"
              value={jobData.joblevel}
              onChange={handleChange}
              className="mt-1 w-full rounded-md border p-2"
            >
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold text-gray-700">
              Skills Required (comma separated)
            </label>
            <input
              type="text"
              name="skills_Required"
              value={jobData.skills_Required}
              onChange={handleChange}
              placeholder="e.g., SEO Knowledge, Grammar, Proofreading"
              className="mt-1 w-full rounded-md border p-2"
              required
            />
          </div>


          <button
            type="submit"
            className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
          >
            Post Job
          </button>
        </form>
      </div>
    </div>
  );
};

export default ClientPostWork;
