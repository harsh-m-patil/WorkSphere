import { useNavigate } from 'react-router-dom';

const UserInfoWork = () => {
  // TODO: Use user
  const user = {
    userName: 'harshmpatil',
    title: 'MERN Stack Developer',
    skills: ['JavaScript', 'ReactJs', 'ExpressJs', 'Nodejs', 'MongoDB'],
  };

  const navigate = useNavigate();

  function handleClick() {
    if (!user) {
      navigate('/login');
    } else {
      navigate('/user/dashboard');
    }
  }

  return (
    <div className="mt-6 h-5/6 w-2/12 rounded-3xl p-4">
      <div className="flex h-2/6 w-full flex-col justify-around rounded-xl bg-neutral-50 p-4 text-center">
        <div className="flex justify-center">
          <img
            src="/vite.svg"
            className="mb-3 h-20 rounded-lg border bg-white p-4"
          />
        </div>
        <p className="text-xl">@{user?.userName || 'Random Wanderer'}</p>
        <p className="text-lg text-gray-700">{user?.title || 'Guest Here'}</p>
        <button
          onClick={handleClick}
          className="w-full rounded-xl bg-sky-100 p-3 transition-shadow hover:shadow-lg"
        >
          Go to Dashboard
        </button>
      </div>
      <div className="mt-6 h-fit w-full rounded-xl bg-neutral-50 p-7 text-center">
        <h2 className="my-4 rounded-xl bg-white p-4 text-xl">My Skills</h2>
        <div>
          <ul className="flex flex-col place-items-center justify-center gap-3">
            {!user?.skills
              ? 'No Skills Saved'
              : user.skills.map((skill, index) => (
                  <SkillPill key={index} skill={skill} />
                ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

const SkillPill = ({ skill }) => {
  return (
    <li className="w-3/6 rounded-xl bg-sky-50 p-3 text-lg shadow-lg">
      {skill}
    </li>
  );
};

export default UserInfoWork;