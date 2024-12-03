const WorkDescCard = ({ title, desc, isActive, type, onClick }) => {
  return (
    <div>
      <h2
        onClick={onClick}
        className={`cursor-pointer rounded-3xl p-3 text-2xl transition-all duration-150 ease-in-out ${isActive ? 'bg-black text-white' : 'bg-white'}`}
      >
        {title}
      </h2>
      {type === 'job' ? <JobDesc desc={desc} /> : <ClientDesc desc={desc} />}
    </div>
  );
};

const JobDesc = ({ desc }) => {
  return <div className="my-5 rounded-3xl border p-5">{desc?.description}</div>;
};
const ClientDesc = ({ desc }) => {
  return <div className="m-5 rounded-3xl border p-5">{desc?.email}</div>;
};

export default WorkDescCard;
