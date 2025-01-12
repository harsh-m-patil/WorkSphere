import WorkGrid from './WorkGrid';

const Works = () => {
  return (
    <div className="flex">
      <div className="w-full p-4 sm:p-10">
        {/* Header section */}
        <div className="py-3">
          <h1 className="py-3 text-center text-2xl font-medium sm:text-3xl">
            Recommended Jobs
          </h1>
        </div>
        {/* Works section */}
        {/*<div className="grid w-full grid-cols-1 place-items-center items-center gap-x-2 gap-y-10 px-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">*/}
        <WorkGrid />
      </div>
    </div>
  );
};

export default Works;
