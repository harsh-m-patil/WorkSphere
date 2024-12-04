import SkillPill from './SkillPill';

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
  return (
    <div className="my-5 rounded-3xl border p-5">
      <div className="p-4">{desc?.description}</div>
      <hr />
      <h2 className="text-xl">Skills Required</h2>
      <ul className="flex flex-wrap place-items-center justify-center gap-3 p-4">
        {desc?.skills_Required?.length === 0
          ? 'No Skills Mentioned'
          : desc.skills_Required?.map((skill, index) => (
              <SkillPill skill={skill} key={index} />
            ))}
      </ul>
    </div>
  );
};
const ClientDesc = ({ desc }) => {
  return <div className="m-5 rounded-3xl border p-5">{desc?.email}</div>;
};

export default WorkDescCard;
