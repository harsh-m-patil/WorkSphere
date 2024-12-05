import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

const ClientPostWork = () => {
    const navigate = useNavigate();
    const [jobdata, setJobdata] = useState({
        title: "",
        description: "",
        pay: "",
        joblevel: "Medium", // default to medium
        skills_Required: ""
    });

    const handleChange = (e) => {
        e.preventDefault();
        setJobdata((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            if (!token) throw new Error('User not authenticated');

            // transform the skills_Required to array
            const skills_array = jobdata.skills_Required.split(',').map(skill => skill.trim());

            // make post request to API to submit the job
            const response = await axios.post(
                "http://localhost:3000/api/v1/work",
                {
                    ...jobdata,
                    skills_Required: skills_array
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            console.log(response.data.data);
            e.target.reset();
            toast.success('Work Added Successfully',{position:'top-center'})
            navigate("/client/dashboard");
        } catch (err) {
            console.error("Error posting work:", err);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-100 via-white to-purple-100">
            <div className="w-full max-w-2xl space-y-6 rounded-lg bg-white p-8 shadow-lg hover:shadow-2xl transform hover:scale-105 transition duration-300">
                <h2 className="text-center text-3xl font-extrabold text-gray-800">Post a New Job</h2>
                <form
                    onSubmit={handleSubmit}
                    className="space-y-6"
                >
                    <div>
                        <label className="block font-medium text-gray-700 mb-1">
                            Job Title
                        </label>
                        <input
                            type="text"
                            name="title"
                            value={jobdata.title}
                            onChange={handleChange}
                            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-3 text-gray-700 shadow-sm focus:border-blue-500 focus:ring-blue-500 hover:shadow-md transition duration-300"
                            required
                        />
                    </div>
                    <div>
                        <label className="block font-medium text-gray-700 mb-1">
                            Job Description
                        </label>
                        <textarea
                            name="description"
                            value={jobdata.description}
                            onChange={handleChange}
                            rows="4"
                            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-3 text-gray-700 shadow-sm focus:border-blue-500 focus:ring-blue-500 hover:shadow-md transition duration-300"
                            required
                        ></textarea>
                    </div>
                    <div>
                        <label className="block font-medium text-gray-700 mb-1">
                            Pay
                        </label>
                        <input
                            type="number"
                            name="pay"
                            value={jobdata.pay}
                            onChange={handleChange}
                            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-3 text-gray-700 shadow-sm focus:border-blue-500 focus:ring-blue-500 hover:shadow-md transition duration-300"
                            required
                        />
                    </div>
                    <div>
                        <label className="block font-medium text-gray-700 mb-1">
                            Job Level
                        </label>
                        <select
                            name="joblevel"
                            value={jobdata.joblevel}
                            onChange={handleChange}
                            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-3 text-gray-700 shadow-sm focus:border-blue-500 focus:ring-blue-500 hover:shadow-md transition duration-300"
                        >
                            <option value="Easy">Easy</option>
                            <option value="Medium">Medium</option>
                            <option value="Hard">Hard</option>
                        </select>
                    </div>
                    <div>
                        <label className="block font-medium text-gray-700 mb-1">
                            Skills Required (comma separated)
                        </label>
                        <input
                            type="text"
                            name="skills_Required"
                            value={jobdata.skills_Required}
                            onChange={handleChange}
                            placeholder="e.g., SEO Knowledge, Grammar, Proofreading"
                            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-3 text-gray-700 shadow-sm focus:border-blue-500 focus:ring-blue-500 hover:shadow-md transition duration-300"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="block w-full rounded-lg bg-blue-500 py-3 text-white font-medium shadow-md hover:bg-blue-600 hover:shadow-lg focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 transition duration-300"
                    >
                        Post Job
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ClientPostWork;
