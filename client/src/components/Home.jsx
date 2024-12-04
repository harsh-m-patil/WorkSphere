import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import NavBar from './NavBar';
import Button from './Button';
import talentImage from '../assets/talent.png';
import unlockImage from '../assets/unlock.png';
import logo1image from '../assets/logo-1.png';
import logo2image from '../assets/logo-2.png';
import logo3image from '../assets/logo-3.png';
import logo4image from '../assets/logo-4.png';
// import broImage from '../assets/bro.png';
import 'aos/dist/aos.css'; // Don't forget to import AOS styles



const Home = () => {
  useEffect(() => {
    // Initialize AOS only once
    AOS.init({
      duration: 1000, // Animation duration (in ms)
      easing: 'ease-in-out', // Animation easing
      // // Trigger animation only once
    });
  }, []);

  return (
    <div className="overflow-hidden">
      {/* Navigation Bar */}
      {/* <NavBar /> */}

      <div className="flex flex-col items-center justify-center h-screen bg-white relative">

        {/* Background Shape */}
        <div className="absolute flex justify-center items-center bg-[rgba(30,160,170,0.1)] blur-lg rounded-full w-[950px] h-[450px] gap-10 transform rotate-12 scale-110 skew-x-6 -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"></div>

        {/* Text and Buttons */}
        <div className="relative z-10 text-center mt-[-80px]" data-aos="fade-up">
          <h1 className="text-6xl font-poppins-black text-gray-800 mb-4">
            Empower Your Freelance Journey
          </h1>
          <h2 className="text-3xl font-poppins-black text-gray-800 mb-4">
            All in One Sphere
          </h2>
          <p className="text-xl font-poppins-black text-gray-900 mb-8">
            We bring talent and opportunity together
          </p>
          <div className="flex gap-6 justify-center mb-10">
            <button className="px-6 py-3 text-white bg-[#40c9a2] rounded-lg hover:bg-[#36a889] transition">
              Get Started
            </button>
            <button className="px-6 py-3 text-gray-800 bg-gray-200 border border-gray-300 rounded-lg hover:bg-gray-300 hover:text-gray-800 transition">
              Browse
            </button>
          </div>
        </div>

      </div>








      {/* Find Top Talent Section */}
      <div className="flex items-center justify-between py-15 px-10 bg-white relative">
        <div className="absolute flex justify-center items-center bg-[rgba(30,160,170,0.1)] blur-lg rounded-full w-[850px] h-[450px] gap-10 transform rotate-[-35deg] scale-110 skew-x-6 translate-x-[40%] translate-y-[-85%] top-1/2 left-1/2 overflow-hidden"></div>

        <img
  src={talentImage}
  alt="Talent"
  className="w-[50%] h-auto object-cover mr-10"
  data-aos="slide-right"
/>


        <div className="flex flex-col items-start max-w-xl" data-aos="fade-left">
          <h2 className="text-6xl font-poppins-black text-gray-800 mb-6">
            Find Top Talent
          </h2>
          <p className="text-xl font-poppins-black text-gray-600 mb-8 leading-relaxed">
            Discover highly skilled freelancers with the expertise to bring your
            innovative ideas to life. Let’s turn your vision into a reality with
            unmatched professionalism and creativity.
          </p>
          <div className="flex gap-6 justify-center mb-10">
            <button className="px-6 py-3 text-white bg-[#40c9a2] rounded-lg hover:bg-[#36a889] transition">
              Get Started
            </button>
            <button className="px-6 py-3 text-gray-800 bg-gray-200 border border-gray-300 rounded-lg hover:bg-gray-300 hover:text-gray-800 transition">
              Browse
            </button>
          </div>
        </div>
      </div>




      

     {/* Unlock New Opportunities */}
<div className="flex items-center justify-between py-15 px-10 bg-white relative" data-aos="fade-up" data-aos-once="true" data-aos-duration="1000">
  <div className="absolute flex justify-center items-center bg-[rgba(30,160,170,0.1)] blur-lg rounded-full w-[850px] h-[450px] gap-10 transform rotate-[135deg] scale-110 skew-x-6 translate-x-[-150%] translate-y-[-25%] top-1/2 left-1/2 overflow-hidden"></div>

  {/* Content */}
  <div className="flex flex-col items-start ml-10" data-aos="fade-right">
    <h2 className="text-6xl font-poppins-black text-left text-gray-800 mb-6">
      Unlock New Opportunities
    </h2>
    <p className="text-xl font-poppins-black text-left text-gray-600 mb-8 leading-relaxed">
      Open doors to amazing projects and meaningful collaborations that can
      redefine your career path. Explore new opportunities and achieve your
      professional goals with confidence and creativity.
    </p>
    <div className="flex gap-6">
      <button className="px-6 py-3 text-white bg-[#40c9a2] rounded-lg hover:bg-[#36a889] transition">
        Create Profile
      </button>
      <button className="px-6 py-3 text-gray-800 bg-gray-200 border border-gray-300 rounded-lg hover:bg-gray-300 hover:text-gray-800 transition">
        Explore Project
      </button>
    </div>
  </div>

  {/* Image */}
  <img
    src={unlockImage}
    alt="Unlock New Opportunities"
     className="w-[50%] h-auto object-cover mr-1"
    data-aos="slide-left"
  />
</div>



{/* Reviews Section */}
<div className="bg-white py-20 px-10">
  <div className="flex justify-center gap-8">
    {/* Review Box 1 */}
    <div
      className="bg-gray-100 p-6 rounded-lg shadow-lg w-1/3 flex flex-col justify-between h-[450px] border border-[#40c9a2]"
      data-aos="fade-up"
      data-aos-delay="10"
    >
      <div className="flex items-center mb-4">
        <img
          src="https://via.placeholder.com/50"
          alt="John Doe"
          className="w-12 h-12 rounded-full mr-4"
        />
        <div className="text-left">
          <h4 className="font-semibold text-gray-800">John Doe</h4>
          <p className="text-gray-500">CEO, Tech Innovators</p>
        </div>
      </div>

      {/* Star Rating */}
      <div className="flex items-center mb-4">
        <svg className="w-5 h-5 text-yellow-500" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
        <svg className="w-5 h-5 text-yellow-500" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
        <svg className="w-5 h-5 text-yellow-500" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
        <svg className="w-5 h-5 text-yellow-500" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
        <svg className="w-5 h-5 text-gray-300" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
      </div>

      <p className="text-lg text-gray-600 flex-grow">
        "This platform was a game changer for our company. We were able to hire highly skilled freelancers 
        who delivered exceptional results within tight deadlines. The ease of use and smooth process made it 
        effortless to scale our team quickly. I’m grateful for the seamless experience!"
      </p>
    </div>

    {/* Review Box 2 */}
    <div
      className="bg-gray-100 p-6 rounded-lg shadow-lg w-1/3 flex flex-col justify-between h-[450px] border border-[#40c9a2]"
      data-aos="fade-up"
      data-aos-delay="20"
    >
      <div className="flex items-center mb-4">
        <img
          src="https://via.placeholder.com/50"
          alt="Jane Smith"
          className="w-12 h-12 rounded-full mr-4"
        />
        <div className="text-left">
          <h4 className="font-semibold text-gray-800">Jane Smith</h4>
          <p className="text-gray-500">Founder, Creative Solutions</p>
        </div>
      </div>

      {/* Star Rating */}
      <div className="flex items-center mb-4">
        <svg className="w-5 h-5 text-yellow-500" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
        <svg className="w-5 h-5 text-yellow-500" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
        <svg className="w-5 h-5 text-yellow-500" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
        <svg className="w-5 h-5 text-yellow-500" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
        <svg className="w-5 h-5 text-gray-300" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
      </div>

      <p className="text-lg text-gray-600 flex-grow">
        "I found exceptional talents through this platform. The freelancers are professional, 
        creative, and deliver high-quality work. The platform's ability to match me with the right professionals 
        allowed my startup to grow exponentially, and we could scale quickly. Highly recommended!"
      </p>
    </div>

    {/* Review Box 3 */}
    <div
      className="bg-gray-100 p-6 rounded-lg shadow-lg w-1/3 flex flex-col justify-between h-[450px] border border-[#40c9a2]"
      data-aos="fade-up"
      data-aos-delay="30"
    >
      <div className="flex items-center mb-4">
        <img
          src="https://via.placeholder.com/50"
          alt="Mark Lee"
          className="w-12 h-12 rounded-full mr-4"
        />
        <div className="text-left">
          <h4 className="font-semibold text-gray-800">Mark Lee</h4>
          <p className="text-gray-500">Project Manager, Build Corp</p>
        </div>
      </div>

      {/* Star Rating */}
      <div className="flex items-center mb-4">
        <svg className="w-5 h-5 text-yellow-500" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
        <svg className="w-5 h-5 text-yellow-500" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
        <svg className="w-5 h-5 text-yellow-500" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
        <svg className="w-5 h-5 text-gray-300" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
        <svg className="w-5 h-5 text-gray-300" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
      </div>

      <p className="text-lg text-gray-600 flex-grow">
        "WorkSphere has been an indispensable tool for us. It helped us onboard professionals
        who brought their A-game, working together seamlessly. The platform made recruitment 
        efficient and stress-free. I highly recommend it for any growing company in need of top-tier talent!"
      </p>
    </div>
  </div>
</div>


     
{/* Background Shape */}


{/* Sign Up Content */}
<div className="bg-white py-32 px-10">
  <div
    className="relative z-10 text-center px-4"
    data-aos="zoom-in" // Apply the animation when scrolled into view
    data-aos-duration="800" // Duration for the animation
    data-aos-delay="10" // Delay before the animation starts (optional)
  >
    {/* Background shape with clearer appearance, reduced opacity and height */}
    <div className="absolute bg-[rgba(30,160,170,0.2)] rounded-full w-[950px] h-[300px] transform scale-110 translate-x-[-50%] translate-y-[-50%] top-1/2 left-1/2 z-0"></div>
    <h2 className="text-3xl font-poppins-black text-gray-800 mb-6 relative z-10">
    Join our community and start discovering incredible opportunities.
    </h2>
    <h2 className="text-xl font-poppins-black text-gray-800 mb-6 relative z-10">
      Sign Up Today
    </h2>

    <div className="flex justify-center gap-6 relative z-10">
      <button className="px-8 py-4 text-white bg-[#36a889] rounded-lg hover:bg-[#2f9c74] transition">
        Join Now
      </button>
      <button className="px-8 py-4 text-teal-500 bg-[#e0e0e0] border border-[#c0c0c0] rounded-lg hover:bg-[#b0b0b0] hover:text-teal-600 transition">
        Learn More
      </button>
    </div>
  </div>
</div>




      {/* Trusted Companies Section (Unchanged) */}
<div className="bg-[#f0f4f8] py-32 px-10" data-aos="slide-up" data-aos-duration="9000">
  <h2 className="text-4xl font-poppins-black text-center text-gray-800 mb-10">
    Trusted by Leading Companies
  </h2>
  <div className="flex justify-center gap-12 flex-wrap">

  <img
  src={logo1image}
  alt="Talent"
  className="w-32 h-32 object-contain" 
/>



<img
  src={logo2image}
  alt="Talent"
  className="w-32 h-32 object-contain" 
/>

<img
  src={logo3image}
  alt="Talent"
  className="w-32 h-32 object-contain" 
/>

<img
  src={logo4image}
  alt="Talent"
  className="w-32 h-32 object-contain" 
/>

  </div>
</div>

      {/* Bro Section (Unchanged) */}
     
    </div>
  );
};

export default Home;
