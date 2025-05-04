import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css"; // Import AOS styles

const plans = [
  {
    name: "Free",
    price: 0,
    description: "Basic access for freelancers getting started.",
    features: [
      "Access to limited companies",
      "Apply to up to 5 jobs per day",
      "Basic job suggestions",
      "Basic support",
    ],
    cta: "Get Started",
    highlighted: false
  },
  {
    name: "Pro",
    price: 12,
    description: "For professionals who want to maximize exposure.",
    features: [
      "AI-based job recommendations",
    //   "Live chat with support & clients",
      "Full company access",
      "Apply to 10+ jobs daily",
      "Priority support",
    ],
    cta: "Upgrade Now",
    highlighted: false
  },
];

function Subscription() {
  const navigate = useNavigate();

  const handleSubscribe = (planName) => {
    if (planName === "Pro") {
      navigate("/payment"); // redirect to Razorpay payment flow
    } else {
      navigate("/dashboard"); // go to dashboard
    }
  };

  useEffect(() => {
    AOS.init({ duration: 1000 }); // Initialize AOS with a duration of 1 second
  }, []);

  return (
    <div className="relative min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      {/* Background Shape */}
      <div className="absolute left-1/2 top-1/2 flex h-[600px] w-[1300px] -translate-x-1/2 -translate-y-1/2 rotate-12 skew-x-6 scale-110 transform items-center justify-center gap-10 rounded-full bg-[rgba(30,160,170,0.1)] blur-2xl z-0"></div>

      <div className="max-w-7xl mx-auto text-center relative z-10">
        <h2 className="text-4xl font-extrabold text-gray-900" data-aos="fade-up">
          Choose Your Plan
        </h2>
        <p className="mt-4 text-lg text-gray-600" data-aos="fade-up" data-aos-delay="300">
          Unlock powerful features with a Pro subscription.
        </p>
      </div>

      <div className="mt-10 grid gap-8 md:grid-cols-2 max-w-5xl mx-auto relative z-10">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`rounded-lg shadow-lg p-6 border ${
              plan.highlighted ? "border-blue-600 bg-white" : "border-gray-200 bg-white"
            }`}
            data-aos="fade-up" // Add fade-up animation for both cards
            data-aos-delay="500"
          >
            <h3 className="text-2xl font-semibold text-gray-900">{plan.name}</h3>
            <p className="mt-2 text-sm text-gray-600">{plan.description}</p>
            <div className="mt-4">
              <span className="text-4xl font-bold text-gray-900">₹{plan.price}</span>
              <span className="text-base text-gray-600"> / month</span>
            </div>

            <ul className="mt-6 space-y-2 text-left">
              {plan.features.map((feature, index) => (
                <li key={index} className="text-sm text-gray-700 flex items-start">
                  <svg
                    className="w-5 h-5 text-green-500 mr-2 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>

            <Button
              className={`mt-6 w-full ${
                plan.highlighted ? "bg-blue-600 hover:bg-blue-700" : "bg-green-600 hover:bg-green-700"
              }`}
              onClick={() => handleSubscribe(plan.name)}
            >
              {plan.cta}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Subscription;
