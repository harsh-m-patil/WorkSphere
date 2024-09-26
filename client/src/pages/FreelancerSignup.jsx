import { useState } from "react";
import { useNavigate } from "react-router-dom";
import validator from "validator"; // Ensure you have this installed
import { useAuth } from "../context/AuthContext";

const Freelancersignup = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    navigate("/");
  }
  
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    description: "",
    email: "",
    password: "",
    passwordConfirm: "",
    skills: [],
    languages: [],
    certificates: [],
    role: "freelancer", // Pre-set role as freelancer
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validation for signup
    if (!validator.isEmail(formData.email)) {
      setError("Invalid email format");
      return;
    }
    if (formData.password !== formData.passwordConfirm) {
      setError("Passwords do not match");
      return;
    }
    if (!formData.firstName || !formData.lastName) {
      setError("First Name and Last Name are required.");
      return;
    }

    // Sending POST request to the server
    try {
      const response = await fetch(
        "http://localhost:3000/api/v1/users/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      console.log("Form submitted:", data);
      setSuccess("Signup successful!");
      setError("");

      // Reset form data after successful submission
      setFormData({
        firstName: "",
        lastName: "",
        userName: "",
        description: "",
        email: "",
        password: "",
        passwordConfirm: "",
        skills: [],
        languages: [],
        certificates: [],
        role: "freelancer", // Ensure role remains freelancer
      });
      navigate("/login");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="mx-auto max-w-lg rounded-lg bg-white p-8 shadow-xl">
      {" "}
      {/* Applied larger shadow */}
      <h1 className="mb-6 text-center text-2xl font-bold text-gray-800">
        Freelancer Signup
      </h1>
      {success && <p className="mb-2 text-green-600">{success}</p>}
      {error && <p className="mb-2 text-red-600">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4 flex flex-wrap justify-between">
          <div className="mb-4 w-full md:mb-0 md:w-1/2 md:pr-2">
            <label
              htmlFor="firstName"
              className="mb-1 block font-medium text-gray-700"
            >
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              id="firstName"
              placeholder="First Name"
              required
              className="w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring focus:ring-blue-200"
              value={formData.firstName}
              onChange={handleChange}
            />
          </div>
          <div className="w-full md:w-1/2 md:pl-2">
            <label
              htmlFor="lastName"
              className="mb-1 block font-medium text-gray-700"
            >
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              id="lastName"
              placeholder="Last Name"
              required
              className="w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring focus:ring-blue-200"
              value={formData.lastName}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="mb-4">
          <label
            htmlFor="userName"
            className="mb-1 block font-medium text-gray-700"
          >
            Username
          </label>
          <input
            type="text"
            name="userName"
            id="userName"
            placeholder="Username"
            required
            className="w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring focus:ring-blue-200"
            value={formData.userName}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="description"
            className="mb-1 block font-medium text-gray-700"
          >
            Description
          </label>
          <textarea
            name="description"
            id="description"
            placeholder="Brief description"
            className="w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring focus:ring-blue-200"
            value={formData.description}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="mb-1 block font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            required
            className="w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring focus:ring-blue-200"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4 flex flex-wrap justify-between">
          <div className="mb-4 w-full md:mb-0 md:w-1/2 md:pr-2">
            <label
              htmlFor="password"
              className="mb-1 block font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              required
              className="w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring focus:ring-blue-200"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <div className="w-full md:w-1/2 md:pl-2">
            <label
              htmlFor="passwordConfirm"
              className="mb-1 block font-medium text-gray-700"
            >
              Confirm Password
            </label>
            <input
              type="password"
              name="passwordConfirm"
              id="passwordConfirm"
              placeholder="Confirm Password"
              required
              className="w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring focus:ring-blue-200"
              value={formData.passwordConfirm}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="mb-4">
          <label
            htmlFor="skills"
            className="mb-1 block font-medium text-gray-700"
          >
            Skills
          </label>
          <input
            type="text"
            name="skills"
            id="skills"
            placeholder="Skills (comma separated)"
            className="w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring focus:ring-blue-200"
            value={formData.skills.join(",")}
            onChange={(e) =>
              setFormData({ ...formData, skills: e.target.value.split(",") })
            }
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="languages"
            className="mb-1 block font-medium text-gray-700"
          >
            Languages
          </label>
          <input
            type="text"
            name="languages"
            id="languages"
            placeholder="Languages (comma separated)"
            className="w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring focus:ring-blue-200"
            value={formData.languages.join(",")}
            onChange={(e) =>
              setFormData({ ...formData, languages: e.target.value.split(",") })
            }
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="certificates"
            className="mb-1 block font-medium text-gray-700"
          >
            Certificates
          </label>
          <input
            type="text"
            name="certificates"
            id="certificates"
            placeholder="Certificates (comma separated)"
            className="w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring focus:ring-blue-200"
            value={formData.certificates.join(",")}
            onChange={(e) =>
              setFormData({
                ...formData,
                certificates: e.target.value.split(","),
              })
            }
          />
        </div>
        <button
          type="submit"
          className="w-full rounded bg-blue-500 py-2 text-white transition-colors duration-300 hover:bg-blue-600"
        >
          Signup
        </button>
      </form>
    </div>
  );
};

export default Freelancersignup;
