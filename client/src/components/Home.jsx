import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import talentImage from '../assets/talent.png';
import unlockImage from '../assets/unlock.png';
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
    navigate('/about');
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
          className="font-display relative z-10 mt-[-40px] text-center sm:mt-[-80px]"
          data-aos="fade-up"
        >
          <h1 className="mb-4 text-4xl font-medium text-gray-800 sm:text-6xl">
            Empower Your Freelance Journey
          </h1>
          <h2 className="font-display mb-4 text-2xl text-gray-800 sm:text-3xl">
            All in One Sphere
          </h2>
          <p className="font-display mb-8 text-lg text-gray-900 sm:text-xl">
            We bring talent and opportunity together
          </p>
          <div className="mb-10 flex justify-center gap-6">
            <button
              className="rounded-lg border border-gray-500 bg-[#40c9a2] bg-opacity-20 px-6 py-3 text-gray-900 transition hover:bg-opacity-40"
              onClick={handleStartedClick}
            >
              Get Started
            </button>
            <button
              className="rounded-lg border border-gray-300 bg-gray-50 px-6 py-3 text-gray-800 transition hover:bg-gray-100 hover:text-gray-800"
              onClick={handleWorksClick}
            >
              Browse
            </button>
          </div>
        </div>
      </div>

      {/* Find Top Talent Section */}
      <div className="md:py-15 relative flex flex-col items-center justify-between bg-white md:flex-row md:px-10">
        <div className="absolute left-1/2 top-1/2 flex translate-x-[40%] translate-y-[-85%] rotate-[-35deg] skew-x-6 scale-110 transform items-center justify-center gap-10 overflow-hidden rounded-full bg-[rgba(30,160,170,0.1)] blur-lg sm:h-[450px] sm:w-[850px]"></div>

        <img
          src={talentImage}
          alt="Talent"
          className="w-96 object-cover sm:mr-10 sm:w-4/12"
          data-aos="slide-right"
        />

        <div
          className="mx-auto flex max-w-xl flex-col items-start p-10"
          data-aos="fade-left"
        >
          <h2 className="font-display text-4xl text-gray-800 sm:mb-6 lg:text-6xl">
            Find Top Talent
          </h2>
          <p className="font-display mb-8 text-lg leading-relaxed text-gray-600 md:text-xl">
            Discover highly skilled freelancers with the expertise to bring your
            innovative ideas to life. Let’s turn your vision into a reality with
            unmatched professionalism and creativity.
          </p>
          <div className="mb-10 flex justify-center gap-6">
            <button
              className="rounded-lg border border-gray-500 bg-[#40c9a2] bg-opacity-20 px-6 py-3 text-gray-900 transition hover:bg-opacity-40"
              onClick={handleBizClick}
            >
              Get Started
            </button>
            <button
              className="rounded-lg border border-gray-300 bg-gray-50 px-6 py-3 text-gray-800 transition hover:bg-gray-100 hover:text-gray-800"
              onClick={handleWorksClick}
            >
              Browse
            </button>
          </div>
        </div>
      </div>

      <div className="md:py-15 relative flex flex-col items-center justify-between bg-white md:flex-row md:px-10">
        <div className="absolute right-1/2 top-1/2 flex translate-x-[-40%] translate-y-[-45%] rotate-[-35deg] skew-x-6 scale-110 transform items-center justify-center gap-10 overflow-hidden rounded-full bg-[rgba(30,160,170,0.1)] blur-lg sm:h-[450px] sm:w-[850px]"></div>

        <div
          className="mx-auto flex max-w-xl flex-col items-start p-10"
          data-aos="fade-right"
        >
          <h2 className="font-display text-4xl text-gray-800 sm:mb-6 lg:text-6xl">
            Unlock New Opportunities
          </h2>
          <p className="font-display mb-8 text-lg leading-relaxed text-gray-600 md:text-xl">
            Open doors to amazing projects and meaningful collaborations that
            can redefine your career path. Explore new opportunities and achieve
            your professional goals with confidence and creativity.
          </p>
          <div className="mb-10 flex justify-center gap-6">
            <button
              className="rounded-lg border border-gray-500 bg-[#40c9a2] bg-opacity-20 px-6 py-3 text-gray-900 transition hover:bg-opacity-40"
              onClick={handleBizClick}
            >
              Get Started
            </button>
            <button
              className="rounded-lg border border-gray-300 bg-gray-50 px-6 py-3 text-gray-800 transition hover:bg-gray-100 hover:text-gray-800"
              onClick={handleWorksClick}
            >
              Browse
            </button>
          </div>
        </div>
        <img
          src={unlockImage}
          alt="Talent"
          className="w-96 object-cover sm:mr-10 sm:w-5/12"
          data-aos="slide-left"
        />
      </div>

      {/* Reviews Section */}
      <div className="bg-white px-5 py-10 sm:px-10 sm:py-20">
        <div className="flex flex-col items-center justify-center gap-8 md:flex-row">
          {/* Review Box 1 */}
          <div
            className="flex h-fit w-96 flex-col justify-between rounded-lg border border-[#40c9a2] p-6 shadow-lg"
            data-aos="fade-up"
            data-aos-delay="10"
          >
            <div className="mb-4 flex items-center">
              <img
                src="https://picsum.photos/200?grayscale"
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
            className="flex h-fit w-96 flex-col justify-between rounded-lg border border-[#40c9a2] p-6 shadow-lg"
            data-aos="fade-up"
            data-aos-delay="20"
          >
            <div className="mb-4 flex items-center">
              <img
                src="https://picsum.photos/seed/picsum/200/200"
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
            className="flex h-fit w-96 flex-col justify-between rounded-lg border border-[#40c9a2] p-6 shadow-lg"
            data-aos="fade-up"
            data-aos-delay="30"
          >
            <div className="mb-4 flex items-center">
              <img
                src="https://picsum.photos/200"
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
      <div className="px-15 bg-white py-32">
        <div
          className="relative z-10 px-4 text-center"
          data-aos="zoom-in" // Apply the animation when scrolled into view
          data-aos-duration="800" // Duration for the animation
          data-aos-delay="10" // Delay before the animation starts (optional)
        >
          {/* Background shape with clearer appearance, reduced opacity and height */}
          <div className="absolute left-1/2 top-1/2 z-0 h-[300px] w-[950px] translate-x-[-50%] translate-y-[-50%] scale-110 transform rounded-full bg-[rgba(30,160,170,0.2)]"></div>
          <h2 className="font-display relative z-10 mb-6 text-3xl font-medium text-gray-800 sm:text-5xl">
            Sign Up Today
          </h2>

          <div className="relative z-10 flex justify-center gap-6">
            <button
              className="rounded-lg border border-gray-500 bg-[#40c9a2] bg-opacity-20 px-6 py-3 text-gray-900 transition hover:bg-opacity-40"
              onClick={handleStartedClick}
            >
              Join Now
            </button>
            <button
              className="rounded-lg border border-gray-300 bg-gray-50 px-6 py-3 text-gray-800 transition hover:bg-gray-100 hover:text-gray-800"
              onClick={handleMoreClick}
            >
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
        <h2 className="font-display mb-10 text-center text-2xl text-gray-800 sm:text-4xl">
          Trusted by Leading Companies
        </h2>
        <div className="flex flex-wrap justify-center gap-12">
          <img
            src="/bun.svg"
            alt="Talent"
            className="size-20 object-contain sm:size-24"
          />

          <img
            src="/astro.svg"
            alt="Talent"
            className="size-20 object-contain sm:size-24"
          />

          <img
            src="/deno.svg"
            alt="Talent"
            className="size-20 object-contain sm:size-24"
          />

          <img
            src="/next.svg"
            alt="Talent"
            className="size-20 object-contain sm:size-24"
          />
        </div>
      </div>

      {/* Bro Section (Unchanged) */}
    </div>
  );
};

export default Home;
