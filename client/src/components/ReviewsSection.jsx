import { FiStar } from "react-icons/fi"; // Import star icon for ratings
import profileImage from "../assets/profile.jpg"; // Placeholder profile image

const ReviewsSection = ({ reviews }) => {
  return (
    <div className="mt-6 w-full rounded-md bg-white p-6 shadow-md">
      <h3 className="mb-4 text-lg font-bold">Recent Reviews</h3>
      {reviews.length === 0 ? (
        <div>No reviews</div>
      ) : (
        reviews.map((review, index) => (
          <div
            key={index}
            className="mb-6 flex items-start gap-4 border-b pb-4 last:border-b-0"
          >
            {/* Reviewer profile image */}
            <img
              src={profileImage}
              alt={review.reviewer}
              className="h-12 w-12 rounded-full object-cover"
            />

            <div className="flex-1">
              {/* Reviewer name and date */}
              <div className="mb-2 flex justify-between">
                <h4 className="font-semibold">{review.reviewer}</h4>
                <span className="text-sm text-gray-500">{review.date}</span>
              </div>

              {/* Review rating */}
              <div className="mb-2 flex items-center gap-1 text-yellow-500">
                {Array(5)
                  .fill()
                  .map((_, starIndex) => (
                    <FiStar
                      key={starIndex}
                      className={`${
                        review.rating >= starIndex + 1
                          ? "text-yellow-500"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                <span className="ml-2 text-gray-700">{review.rating}/5</span>
              </div>

              {/* Review text */}
              <p className="text-gray-700">{review.review}</p>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ReviewsSection;
