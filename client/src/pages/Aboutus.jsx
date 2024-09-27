import React from 'react';
import './AboutUs.css';

const AboutUs = () => {
  return (
    <div className="about-us-container">
      <div className="content-overlay">
        <div className="about-us-content"> {/* New unified container */}
          <h1 className="title">About WorkSphere</h1>
          <div className="info-section">
            <p className="description">
              Welcome to <span className="highlight">WorkSphere</span>, your one-stop platform connecting freelancers with clients around the world. At WorkSphere, our mission is to bridge the gap between talented freelancers and businesses in need of their services. We believe in creating a seamless and efficient experience for freelancers and clients alike.
            </p>
            <p className="description">
              Whether you're a freelancer looking for exciting new opportunities or a client in need of expert services, WorkSphere is here to help you succeed. Join our growing community and take your freelancing career or business to the next level.
            </p>
          </div>
        </div>
        <div className="grid-container">
          <div className="freelancer-section">
            <h2>For Freelancers</h2>
            <p>
              Showcase your skills, connect with clients, and get paid for your work. WorkSphere provides you with the tools to manage your projects and grow your freelance career.
            </p>
          </div>
          <div className="client-section">
            <h2>For Clients</h2>
            <p>
              Find talented freelancers ready to take on your projects. From web development to design, writing, and marketing, you'll find the right experts on WorkSphere.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
