import React from 'react';
// import NavBar from './NavBar';
import { useInView } from 'react-intersection-observer';

// Updated people array with an additional team member
const people = [
  {
    name: 'Harshwardhan Patil',
    role: 'Co-Founder / CEO',
    imageUrl: 'https://avatars.githubusercontent.com/u/135024692?v=4',
    link: 'https://github.com/harsh-m-patil',
  },
  {
    name: 'Satish Pandhare',
    role: 'Co-Founder',
    imageUrl: 'https://avatars.githubusercontent.com/u/157160579?v=4',
    link: 'https://github.com/satish-pandhare', // Updated link
  },
  {
    name: 'Sushant Gadyal',
    role: 'CTO',
    imageUrl: 'https://avatars.githubusercontent.com/u/125467967?v=4',
    link: 'https://github.com/Sushant-Gadyal', // Updated link
  },
  
  {
    name: 'Vighnesh Barage',
    role: 'Lead Designer',
    imageUrl: 'https://avatars.githubusercontent.com/u/147090707?v=4',
    link: 'https://github.com/Vighnesh1919', // Your GitHub profile
  },
  {
    name: 'Rahul Banoth',
    role: 'Marketing Lead',
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUv4efwDYARf5XR46l60ibliIEuSnj6oRFZA&s',
    link: 'https://github.com/rahulbanoth', // Updated link
  },
];


export default function AboutUs() {
  const { ref: introRef, inView: introInView } = useInView({
    triggerOnce: true, // Trigger animation only once
    threshold: 0.2, // Trigger when 20% of the element is in view
  });

  const { ref: leaderRef, inView: leaderInView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const { ref: contactRef, inView: contactInView } = useInView({
    triggerOnce: true, // Trigger only once
    threshold: 0.2, // Trigger when 20% of the element is in view
  });

  return (
    <div className="overflow-hidden">
      {/* Navbar */}
      {/* <NavBar /> */}

      {/* About Us Section */}
      <div className="relative bg-white py-20">
        {/* Background Decorative Layer */}
        <div className="absolute flex justify-center items-center bg-[rgba(30,160,170,0.1)] blur-lg rounded-full w-[850px] h-[450px] gap-10 transform rotate-[-35deg] scale-110 skew-x-6 translate-x-[40%] translate-y-[-85%] top-1/2 left-1/2 overflow-hidden z-0"></div>
        <div className="absolute flex justify-center items-center bg-[rgba(30,160,170,0.1)] blur-lg rounded-full w-[850px] h-[450px] gap-10 transform rotate-[135deg] scale-110 skew-x-6 translate-x-[-150%] translate-y-[-25%] top-1/2 left-1/2 overflow-hidden"></div>
        {/* Introduction Content */}
        <div
          ref={introRef}
          className={`mx-auto max-w-7xl px-6 text-center sm:px-8 transition-transform duration-1000 z-10 ${
            introInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">
            Welcome to WorkSphere
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            WorkSphere is a leading platform connecting talented freelancers with businesses in need of specialized skills.
            We provide a diverse range of freelance opportunities to empower individuals to build their careers while helping businesses find the perfect talent.
            Our platform helps both freelancers and businesses to create meaningful partnerships.
            <br />
            <br />
            Whether you’re looking for a long-term project or a one-time gig, we offer flexibility and a vast pool of talented professionals. Our mission is to empower freelancers and help businesses thrive by providing access to the best talent available.
          </p>
        </div>
      </div>





      <div
  ref={leaderRef}
  className={`bg-white py-24 sm:py-32 transition-transform duration-1000 ${
    leaderInView
      ? 'opacity-100 translate-y-0 scale-100 shadow-lg'
      : 'opacity-0 translate-y-10 scale-90'
  }`}
>
<div className="mx-auto max-w-7xl px-6 lg:px-8 bg-white border-4 border-gray-300 rounded-lg py-12 transition-all duration-1000 ease-in-out">
  <div className="grid max-w-7xl gap-20 xl:grid-cols-3">
    {/* Heading Section */}
    <div className="max-w-xl">
      <h2 className="text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl">
        Meet our leadership
      </h2>
      <p className="mt-6 text-lg text-gray-600">
        We’re a dynamic group of individuals who are passionate about what we do and dedicated to delivering the best results for our clients.
      </p>
    </div>

    {/* Team Members */}
    <ul role="list" className="grid gap-x-8 gap-y-12 sm:grid-cols-2 sm:gap-y-16 xl:col-span-2">
      {people.map((person) => (
        <li
          key={person.name}
          className="group transition-transform duration-300 hover:scale-105"
        >
          <div className="flex items-center gap-x-6">
            {/* Image with Optional Link */}
            {person.link ? (
              <a href={person.link} target="_blank" rel="noopener noreferrer">
                <img
                  alt={person.name}
                  src={person.imageUrl}
                  className="w-16 h-16 rounded-full border border-gray-300 shadow-md group-hover:scale-110 transition-transform duration-300"
                />
              </a>
            ) : (
              <img
                alt={person.name}
                src={person.imageUrl}
                className="w-16 h-16 rounded-full border border-gray-300 shadow-md group-hover:scale-110 transition-transform duration-300"
              />
            )}
            {/* Text */}
            <div>
              <h3 className="text-base font-semibold text-gray-900 group-hover:text-indigo-600">
                {person.name}
              </h3>
              <p className="text-sm font-medium text-indigo-600">{person.role}</p>
            </div>
          </div>
        </li>
      ))}
    </ul>
  </div>
</div>



<div
  ref={contactRef}
  className={`bg-white py-16 text-center transition-transform duration-1000 ${
    contactInView ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-90 translate-y-10'
  }`}
>
  <h2 className="text-2xl font-semibold text-gray-900">Get in Touch</h2>
  
  <p className="mt-4 text-lg text-gray-600">
    Have any questions or need assistance? Contact us through the following channels:
  </p>
  <div className="mt-6 flex justify-center gap-6">
    {/* Email Icon */}
    <a
      href="mailto:contact@worksphere.com"
      className="text-indigo-600 hover:text-indigo-800"
      aria-label="Email Us"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6 hover:scale-110 transition-transform duration-200"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25H4.5a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0a2.25 2.25 0 00-2.25-2.25H4.5a2.25 2.25 0 00-2.25 2.25m19.5 0L12 13.5m9.75-6.75L12 10.5m0 0L2.25 6.75"
        />
      </svg>
    </a>

    {/* Twitter Icon */}
    <a
      href="https://twitter.com/WorkSphere"
      target="_blank"
      rel="noopener noreferrer"
      className="text-indigo-600 hover:text-indigo-800"
      aria-label="Twitter"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6 hover:scale-110 transition-transform duration-200"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M8.29 20.251c7.547 0 11.675-6.155 11.675-11.49 0-.175 0-.35-.012-.524A8.338 8.338 0 0022 5.92a8.19 8.19 0 01-2.357.635A4.09 4.09 0 0021.447 4.1a8.223 8.223 0 01-2.605.981 4.108 4.108 0 00-6.993 3.74A11.654 11.654 0 013.194 4.575a4.072 4.072 0 001.274 5.47 4.106 4.106 0 01-1.857-.504v.05a4.108 4.108 0 003.292 4.027 4.095 4.095 0 01-1.852.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.605a11.616 11.616 0 006.29 1.84"
        />
      </svg>
    </a>

    {/* Instagram Icon */}
    <a
      href="https://instagram.com/WorkSphere"
      target="_blank"
      rel="noopener noreferrer"
      className="text-indigo-600 hover:text-indigo-800"
      aria-label="Instagram"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6 hover:scale-110 transition-transform duration-200"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M16.5 3.75h-9A3.75 3.75 0 003.75 7.5v9a3.75 3.75 0 003.75 3.75h9a3.75 3.75 0 003.75-3.75v-9a3.75 3.75 0 00-3.75-3.75zM16.5 3.75a4.5 4.5 0 014.5 4.5M15 12a3 3 0 11-6 0 3 3 0 016 0zm4.125-5.625h.008v.008h-.008v-.008z"
        />
      </svg>
    </a>
  </div>
</div>

</div>
    </div>
  );
}
