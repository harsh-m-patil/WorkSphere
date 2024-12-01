import { Link } from 'react-router-dom';

const PageNotFound = () => {
  return (
    <div className="h-screen w-screen rounded-lg bg-white p-8 text-center shadow-lg">
      <h1 className="mb-6 text-8xl font-semibold text-gray-800">404</h1>
      <p className="mb-6 text-xl text-gray-600">
        Oops! The page you&apos;re looking for doesn&apos;t exist.
      </p>
      <p className="text-md mb-8 text-gray-500">
        It might have been moved, or you might have typed the URL incorrectly.
      </p>
      <Link
        to="/"
        className="rounded-full bg-blue-500 px-6 py-3 text-lg font-medium text-white transition-colors hover:bg-blue-600"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default PageNotFound;
