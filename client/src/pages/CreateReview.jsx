import { useState } from 'react';
import './CreateReview.css'; // Link the CSS file
import { useAuth } from '../context/AuthContext';

const CreateReview = ({freelancer}) => {
  const {user} = useAuth()
  const [formData, setFormData] = useState({
    rating: '',
    review: '',
    freelancer: freelancer,
    client: user.id
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { rating, review } = formData;

    if (rating < 1 || rating > 5) {
      setError('Rating must be between 1 and 5.');
      return;
    }
    if (!review) {
      setError('Please enter a review.');
      return;
    }

    console.log(formData);
    
    // Submit the review
    console.log('Review submitted:', formData);

    // Clear form after submission
    setFormData({
      rating: '',
      review: '',
    });
    setError('');
  };

  return (
    <div className="review-container">
      <h1 className="review-title">Submit Your Review</h1>
      <form onSubmit={handleSubmit} className="review-form">
        <div className="input-group">
          <label htmlFor="review" className="review-label">Review:</label>
          <textarea
            id="review"
            name="review"
            placeholder="Write your review here..."
            value={formData.review}
            onChange={handleChange}
            className="review-textarea"
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="rating" className="review-label">Rating (1-5):</label>
          <input
            type="number"
            id="rating"
            name="rating"
            min="1"
            max="5"
            value={formData.rating}
            onChange={handleChange}
            className="review-input"
            required
          />
        </div>
        {error && <p className="review-error">{error}</p>}
        <button type="submit" className="submit-button">Submit</button>
      </form>
    </div>
  );
};

export default CreateReview;
