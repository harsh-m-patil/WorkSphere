import profileImage from "../assets/profile.jpg";

const Review = ({ review }) => {
  return (
    <div className="m-3 flex flex-col gap-4 rounded-lg border border-gray-200 bg-white p-6 shadow-md transition-all hover:shadow-xl sm:flex-row">
      {/* Client Profile Image */}
      <div className="flex-shrink-0">
        <img
          src={review.client.photo || profileImage}
          alt={`${review.client.userName}'s profile`}
          className="h-20 w-20 rounded-full object-cover"
        />
      </div>

      {/* Review Content */}
      <div className="flex w-full flex-col justify-between">
        {/* Client Username and Date */}
        <div className="flex items-center justify-between">
          <h1 className="text-md font-medium text-gray-800">
            <span className="rounded-2xl border border-gray-300 bg-[#e5f9e0] p-1 px-3">
              @{review.client.userName}
            </span>
            <span className="ml-1 text-teal-700"> {review.rating}</span>
          </h1>
          <span className="text-sm text-gray-500">
            {new Date(review.createdAt).toLocaleDateString()}
          </span>
        </div>

        {/* Review Text */}
        <div className="mt-4">
          <p className="text-sm text-gray-700">{review.review}</p>
        </div>
      </div>
    </div>
  );
};

export default Review;
