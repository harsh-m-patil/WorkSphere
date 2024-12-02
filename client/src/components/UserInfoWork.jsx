const UserInfoWork = ({ user }) => {
  // TODO: Use user
  console.log(user);

  return (
    <div className="mt-6 h-5/6 w-2/12 rounded-3xl p-4">
      <div className="flex h-2/6 w-full flex-col justify-around rounded-xl bg-neutral-50 p-4 text-center">
        <div className="flex justify-center">
          <img
            src="/vite.svg"
            className="mb-3 h-20 rounded-lg border bg-white p-4"
          />
        </div>
        <p className="text-xl">Harsh</p>
        <p className="text-lg text-gray-700">MERN Developer</p>
        <button className="w-full rounded-xl bg-sky-100 p-3">
          Go to Dashboard
        </button>
      </div>
    </div>
  );
};

export default UserInfoWork;
