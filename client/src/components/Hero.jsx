import Button from "./Button";
import SecButton from "./SecButton";

const Hero = () => {
  return (
    <div className="relative flex min-h-[calc(100vh-4rem)] items-center justify-center">
      {/* Blurred Square Background */}
      <div className="absolute z-[-1] h-4/6 w-3/6 rotate-[26deg] rounded-[200px] bg-[#2F9C95] opacity-15 blur-lg"></div>

      {/* Hero Content */}
      <div className="space-y-3 text-center">
        {/* Hero Heading */}
        <h1 className="text-5xl font-bold text-gray-700">
          Empower your Freelance Journey,
          <br /> All in one Sphere
        </h1>

        {/* Subheading */}
        <p className="text-xl text-gray-500">
          We bring talent and opportunity together <br /> in a streamlined
          platform for success.
        </p>

        {/* Call to Action Buttons */}
        <div className="space-x-4">
          <Button text="Get Started" />
          <SecButton text="Learn More" />
        </div>
      </div>
    </div>
  );
};

export default Hero;
