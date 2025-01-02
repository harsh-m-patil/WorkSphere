import { useNavigate } from 'react-router-dom';

const ClientSeeWork = ({ client }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/client/dashboard/works', {
      state: { client },
    });
  };

  return (
    <div className="min-h-10 w-full rounded-md bg-white p-6 shadow-md lg:w-1/3">
      <h3 className="mb-4 text-lg font-bold">Works Posted By me</h3>

      <button
        className="mt-4 w-full rounded-md bg-[#e5f9e0] py-2 text-[#2f9c95]"
        onClick={handleClick}
      >
        See All Works
      </button>
    </div>
  );
};

export default ClientSeeWork;
