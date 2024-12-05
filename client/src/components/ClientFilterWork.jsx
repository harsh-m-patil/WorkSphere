import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";

const ClientFilterWork = () => {
    const location = useLocation();
    const { work } = location.state || {};

    const [AppliedUsers, setAppliedUsers] = useState([]);

    useEffect(() => {
        async function fetchAppliedUsers() {
            const response = await axios.post("http://localhost:3000/api/v1/work/getUsersForWork", {
                workId: work._id,
            });
            console.log("fetched users:", response.data.data.workdetails.applied_status);
            setAppliedUsers(response.data.data.workdetails.applied_status);
        }

        fetchAppliedUsers();
    }, [work]);

    const handleAssign = async (user) => {
        try{
            const token = localStorage.getItem('token');
            if(!token) throw new Error('User not authenticated');

            const response = await axios.post(
                "http://localhost:3000/api/v1/work/assign",
                {
                    workId: work._id,
                    freelancerId: user._id,  
                },
                { 
                    headers:{
                        Authorization: `Bearer ${token}`,
                    },
                },
            );
            console.log(response.data.data);
        } catch(err){
            console.err(err);
        }

    };

    return (
        <div className="flex min-h-screen bg-gray-50">

            {/* Main content */}
            <div className="flex-grow p-8">
                {/* Job Details */}
                <h2 className="mb-6 text-3xl font-bold text-gray-800">Job Details</h2>
                <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-md hover:shadow-lg transition-shadow">
                    <h3 className="text-xl font-semibold text-gray-800">{work.title}</h3>
                    <p className="mt-2 text-gray-600">{work.description}</p>
                    <div className="mt-4">
                        <p className="text-sm text-gray-500">
                            <strong>Level:</strong> {work.joblevel}
                        </p>
                        <p className="text-sm text-gray-500">
                            <strong>Pay:</strong> ${work.pay}
                        </p>
                        <p className="text-sm text-gray-500">
                            <strong>Skills Required:</strong> {work.skills_Required.join(", ")}
                        </p>
                        <p className={`text-sm font-medium ${work.active ? "text-green-600" : "text-red-600"}`}>
                            <strong>Status:</strong> {work.active ? "Active" : "Inactive"}
                        </p>
                    </div>
                </div>

                {/* Applied Users */}
                <h2 className="mt-8 text-3xl font-bold text-gray-800">Users Who Applied</h2>
                {AppliedUsers.length > 0 ? (
                    <ul className="mt-4 grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                        {AppliedUsers.map((user) => (
                            <li
                                key={user._id}
                                className="flex flex-col justify-between rounded-lg border border-gray-200 bg-white p-6 shadow-md hover:shadow-lg transition-shadow"
                            >
                                <div>
                                    <p className="text-lg font-semibold text-gray-800">
                                        Username: {user.userName}
                                    </p>
                                    <p className="mt-2 text-sm text-gray-500">
                                        <strong>Email:</strong> {user.email}
                                    </p>
                                    <p className="mt-2 text-sm text-gray-500">
                                        <strong>Avg Rating:</strong> {user.ratingsAverage}
                                    </p>
                                    <p className="mt-2 text-sm text-gray-500">
                                        <strong>Ratings Count:</strong> {user.noOfRatings}
                                    </p>
                                </div>
                                <button
                                    className="mt-4 rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 transition-colors"
                                    onClick={() => handleAssign(user)}
                                >
                                    Assign
                                </button>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="mt-4 text-center text-gray-600">
                        No users have applied to this job yet.
                    </p>
                )}
            </div>
        </div>
    );
};

export default ClientFilterWork;
