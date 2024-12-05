import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
// import NavBar from './NavBar';
// import Button from './Button';
import talentImage from '../assets/talent.png';
import unlockImage from '../assets/unlock.png';
import logo1image from '../assets/logo-1.png';
import logo2image from '../assets/logo-2.png';
import logo3image from '../assets/logo-3.png';
import logo4image from '../assets/logo-4.png';
// import broImage from '../assets/bro.png';
import 'aos/dist/aos.css'; // Don't forget to import AOS styles
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  useEffect(() => {
    // Initialize AOS only once
    AOS.init({
      duration: 1000, // Animation duration (in ms)
      easing: 'ease-in-out', // Animation easing
      // // Trigger animation only once
    });
  }, []);

  function handleStartedClick() {
    navigate('/freelancer/signup');
  }

  function handleBizClick() {
    navigate('/client/signup');
  }

  function handleWorksClick() {
    navigate('/works');
  }

  function handleMoreClick() {
    navigate('/about')
  }

  return (
    <div className="overflow-hidden">
      {/* Navigation Bar */}
      {/* <NavBar /> */}

      <div className="relative flex h-screen flex-col items-center justify-center bg-white">
        {/* Background Shape */}
        <div className="absolute left-1/2 top-1/2 flex h-[450px] w-[950px] -translate-x-1/2 -translate-y-1/2 rotate-12 skew-x-6 scale-110 transform items-center justify-center gap-10 rounded-full bg-[rgba(30,160,170,0.1)] blur-lg"></div>

        {/* Text and Buttons */}
        <div
          className="relative z-10 mt-[-80px] text-center"
          data-aos="fade-up"
        >
          <h1 className="font-poppins-black mb-4 text-6xl text-gray-800">
            Empower Your Freelance Journey
          </h1>
          <h2 className="font-poppins-black mb-4 text-3xl text-gray-800">
            All in One Sphere
          </h2>
          <p className="font-poppins-black mb-8 text-xl text-gray-900">
            We bring talent and opportunity together
          </p>
          <div className="mb-10 flex justify-center gap-6">
            <button
              className="rounded-lg bg-[#40c9a2] px-6 py-3 text-white transition hover:bg-[#36a889]"
              onClick={handleStartedClick}
            >
              Get Started
            </button>
            <button className="rounded-lg border border-gray-300 bg-gray-200 px-6 py-3 text-gray-800 transition hover:bg-gray-300 hover:text-gray-800" onClick={handleWorksClick}>
              Browse
            </button>
          </div>
        </div>
      </div>

      {/* Find Top Talent Section */}
      <div className="py-15 relative flex items-center justify-between bg-white px-10">
        <div className="absolute left-1/2 top-1/2 flex h-[450px] w-[850px] translate-x-[40%] translate-y-[-85%] rotate-[-35deg] skew-x-6 scale-110 transform items-center justify-center gap-10 overflow-hidden rounded-full bg-[rgba(30,160,170,0.1)] blur-lg"></div>

        <img
          src={talentImage}
          alt="Talent"
          className="mr-10 h-auto w-[50%] object-cover"
          data-aos="slide-right"
        />

        <div
          className="flex max-w-xl flex-col items-start"
          data-aos="fade-left"
        >
          <h2 className="font-poppins-black mb-6 text-6xl text-gray-800">
            Find Top Talent
          </h2>
          <p className="font-poppins-black mb-8 text-xl leading-relaxed text-gray-600">
            Discover highly skilled freelancers with the expertise to bring your
            innovative ideas to life. Let’s turn your vision into a reality with
            unmatched professionalism and creativity.
          </p>
          <div className="mb-10 flex justify-center gap-6">
            <button
              className="rounded-lg bg-[#40c9a2] px-6 py-3 text-white transition hover:bg-[#36a889]"
              onClick={handleBizClick}
            >
              Get Started
            </button>
            <button
              className="rounded-lg border border-gray-300 bg-gray-200 px-6 py-3 text-gray-800 transition hover:bg-gray-300 hover:text-gray-800"
              onClick={handleWorksClick}
            >
              Browse
            </button>
          </div>
        </div>
      </div>

      {/* Unlock New Opportunities */}
      <div
        className="py-15 relative flex items-center justify-between bg-white px-10"
        data-aos="fade-up"
        data-aos-once="true"
        data-aos-duration="1000"
      >
        <div className="absolute left-1/2 top-1/2 flex h-[450px] w-[850px] translate-x-[-150%] translate-y-[-25%] rotate-[135deg] skew-x-6 scale-110 transform items-center justify-center gap-10 overflow-hidden rounded-full bg-[rgba(30,160,170,0.1)] blur-lg"></div>

        {/* Content */}
        <div className="ml-10 flex flex-col items-start" data-aos="fade-right">
          <h2 className="font-poppins-black mb-6 text-left text-6xl text-gray-800">
            Unlock New Opportunities
          </h2>
          <p className="font-poppins-black mb-8 text-left text-xl leading-relaxed text-gray-600">
            Open doors to amazing projects and meaningful collaborations that
            can redefine your career path. Explore new opportunities and achieve
            your professional goals with confidence and creativity.
          </p>
          <div className="flex gap-6">
            <button
              className="rounded-lg bg-[#40c9a2] px-6 py-3 text-white transition hover:bg-[#36a889]"
              onClick={handleStartedClick}
            >
              Create Profile
            </button>
            <button
              className="rounded-lg border border-gray-300 bg-gray-200 px-6 py-3 text-gray-800 transition hover:bg-gray-300 hover:text-gray-800"
              onClick={handleWorksClick}
            >
              Explore Project
            </button>
          </div>
        </div>

        {/* Image */}
        <img
          src={unlockImage}
          alt="Unlock New Opportunities"
          className="mr-1 h-auto w-[50%] object-cover"
          data-aos="slide-left"
        />
      </div>

      {/* Reviews Section */}
      <div className="bg-white px-10 py-20">
        <div className="flex justify-center gap-8">
          {/* Review Box 1 */}
          <div
            className="flex h-[450px] w-1/3 flex-col justify-between rounded-lg border border-[#40c9a2] bg-gray-100 p-6 shadow-lg"
            data-aos="fade-up"
            data-aos-delay="10"
          >
            <div className="mb-4 flex items-center">
              <img
                src="https://via.placeholder.com/50"
                alt="John Doe"
                className="mr-4 h-12 w-12 rounded-full"
              />
              <div className="text-left">
                <h4 className="font-semibold text-gray-800">John Doe</h4>
                <p className="text-gray-500">CEO, Tech Innovators</p>
              </div>
            </div>

            {/* Star Rating */}
            <div className="mb-4 flex items-center">
              <svg
                className="h-5 w-5 text-yellow-500"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
              <svg
                className="h-5 w-5 text-yellow-500"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
              <svg
                className="h-5 w-5 text-yellow-500"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
              <svg
                className="h-5 w-5 text-yellow-500"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
              <svg
                className="h-5 w-5 text-gray-300"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
            </div>

            <p className="flex-grow text-lg text-gray-600">
              "This platform was a game changer for our company. We were able to
              hire highly skilled freelancers who delivered exceptional results
              within tight deadlines. The ease of use and smooth process made it
              effortless to scale our team quickly. I’m grateful for the
              seamless experience!"
            </p>
          </div>

          {/* Review Box 2 */}
          <div
            className="flex h-[450px] w-1/3 flex-col justify-between rounded-lg border border-[#40c9a2] bg-gray-100 p-6 shadow-lg"
            data-aos="fade-up"
            data-aos-delay="20"
          >
            <div className="mb-4 flex items-center">
              <img
                src="https://via.placeholder.com/50"
                alt="Jane Smith"
                className="mr-4 h-12 w-12 rounded-full"
              />
              <div className="text-left">
                <h4 className="font-semibold text-gray-800">Jane Smith</h4>
                <p className="text-gray-500">Founder, Creative Solutions</p>
              </div>
            </div>

            {/* Star Rating */}
            <div className="mb-4 flex items-center">
              <svg
                className="h-5 w-5 text-yellow-500"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
              <svg
                className="h-5 w-5 text-yellow-500"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
              <svg
                className="h-5 w-5 text-yellow-500"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
              <svg
                className="h-5 w-5 text-yellow-500"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
              <svg
                className="h-5 w-5 text-gray-300"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
            </div>

            <p className="flex-grow text-lg text-gray-600">
              "I found exceptional talents through this platform. The
              freelancers are professional, creative, and deliver high-quality
              work. The platform's ability to match me with the right
              professionals allowed my startup to grow exponentially, and we
              could scale quickly. Highly recommended!"
            </p>
          </div>

          {/* Review Box 3 */}
          <div
            className="flex h-[450px] w-1/3 flex-col justify-between rounded-lg border border-[#40c9a2] bg-gray-100 p-6 shadow-lg"
            data-aos="fade-up"
            data-aos-delay="30"
          >
            <div className="mb-4 flex items-center">
              <img
                src="https://via.placeholder.com/50"
                alt="Mark Lee"
                className="mr-4 h-12 w-12 rounded-full"
              />
              <div className="text-left">
                <h4 className="font-semibold text-gray-800">Mark Lee</h4>
                <p className="text-gray-500">Project Manager, Build Corp</p>
              </div>
            </div>

            {/* Star Rating */}
            <div className="mb-4 flex items-center">
              <svg
                className="h-5 w-5 text-yellow-500"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
              <svg
                className="h-5 w-5 text-yellow-500"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
              <svg
                className="h-5 w-5 text-yellow-500"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
              <svg
                className="h-5 w-5 text-gray-300"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
              <svg
                className="h-5 w-5 text-gray-300"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
            </div>

            <p className="flex-grow text-lg text-gray-600">
              "WorkSphere has been an indispensable tool for us. It helped us
              onboard professionals who brought their A-game, working together
              seamlessly. The platform made recruitment efficient and
              stress-free. I highly recommend it for any growing company in need
              of top-tier talent!"
            </p>
          </div>
        </div>
      </div>

      {/* Background Shape */}

      {/* Sign Up Content */}
      <div className="bg-white px-10 py-32">
        <div
          className="relative z-10 px-4 text-center"
          data-aos="zoom-in" // Apply the animation when scrolled into view
          data-aos-duration="800" // Duration for the animation
          data-aos-delay="10" // Delay before the animation starts (optional)
        >
          {/* Background shape with clearer appearance, reduced opacity and height */}
          <div className="absolute left-1/2 top-1/2 z-0 h-[300px] w-[950px] translate-x-[-50%] translate-y-[-50%] scale-110 transform rounded-full bg-[rgba(30,160,170,0.2)]"></div>
          <h2 className="font-poppins-black relative z-10 mb-6 text-3xl text-gray-800">
            Join our community and start discovering incredible opportunities.
          </h2>
          <h2 className="font-poppins-black relative z-10 mb-6 text-xl text-gray-800">
            Sign Up Today
          </h2>

          <div className="relative z-10 flex justify-center gap-6">
            <button className="rounded-lg bg-[#36a889] px-8 py-4 text-white transition hover:bg-[#2f9c74]" onClick={handleStartedClick}>
              Join Now
            </button>
            <button className="rounded-lg border border-[#c0c0c0] bg-[#e0e0e0] px-8 py-4 text-teal-500 transition hover:bg-[#b0b0b0] hover:text-teal-600" onClick={handleMoreClick}>
              Learn More
            </button>
          </div>
        </div>
      </div>

      {/* Trusted Companies Section (Unchanged) */}
      <div
        className="bg-[#f0f4f8] px-10 py-32"
        data-aos="slide-up"
        data-aos-duration="9000"
      >
        <h2 className="font-poppins-black mb-10 text-center text-4xl text-gray-800">
          Trusted by Leading Companies
        </h2>
        <div className="flex flex-wrap justify-center gap-12">
          <img
            src={logo1image}
            alt="Talent"
            className="h-32 w-32 object-contain"
          />

          <img
            src={logo2image}
            alt="Talent"
            className="h-32 w-32 object-contain"
          />

          <img
            src={logo3image}
            alt="Talent"
            className="h-32 w-32 object-contain"
          />

          <img
            src={logo4image}
            alt="Talent"
            className="h-32 w-32 object-contain"
          />
        </div>
      </div>

      {/* Bro Section (Unchanged) */}
    </div>
  );
};

export default Home;
