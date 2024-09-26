import { useEffect, useState } from "react";
import { API_URL } from "../utils/constants";
import axios from "axios";

const WorkCard = ({ work, user}) => {

    const [isApplied, setisApplied] = useState(false);

    useEffect(() => {
        if (work.applied_status.includes(user.id)) {
            setisApplied(true);
            console.log("already applied")
            
        }
        // console.log("Work IN card:",work);
        // console.log("user in card:",user);
    }, []); // Add dependencies

    const handleApply = async ()=>{
        const response = await axios.post(`${API_URL}/work/apply`,{
            userId : user._id,
            workId : work._id,

        },{
            withCredentials:true,
        })
        console.log("Applied status", response.data.data);
        setisApplied(true);
    }

    return (
        <div
            
            className="rounded-lg border border-gray-300 bg-white p-6 shadow-lg"
        >
            <h2 className="text-xl font-semibold text-gray-800">{work.title}</h2>
            <p className="mt-2 text-gray-600">{work.description}</p>
            <p className="mt-2 text-gray-600">
                <span className="font-medium">Pay:</span> ${work.pay}
            </p>
            <p className="mt-2 text-gray-600">
                <span className="font-medium">Job Level:</span> {work.joblevel}
            </p>
            <div className="mt-4">
                <span className="font-medium text-gray-800">Skills Required:</span>
                <ul className="mt-2 space-y-1">
                    {work.skills_Required.map((skill, index) => (
                        <li
                            key={index}
                            className="mr-2 inline-block rounded-full bg-blue-200 px-2 py-1 text-sm text-blue-800"
                        >
                            {skill}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="mt-6">
                {isApplied ? (
                    <button
                        className={`rounded-lg px-4 py-2 text-white ${
                            work.active ? "bg-green-500" : "bg-red-500"
                        }`}
                    >
                        Applied
                    </button>
                ) : (
                    <button
                        className={`rounded-lg px-4 py-2 text-white ${
                            work.active ? "bg-green-500" : "bg-red-500"
                        }`}
                        onClick={handleApply}
                    >
                        Apply
                    </button>
                )}
            </div>
        </div>
    );
};

export default WorkCard;
