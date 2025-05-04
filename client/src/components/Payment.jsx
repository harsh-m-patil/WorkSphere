import { useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { API_URL } from "@/utils/constants";
import { Button } from "./ui/button";
import useAuthStore from "@/store/authStore";

// Correct the import path to the image
import premiumImage from "@/assets/premium.png";

function Payment() {
  const amount = 500;
  const currency = "INR";
  const receiptId = "qwsaq1";

  const [error, setError] = useState(null);
  const user = useAuthStore((state) => state.user);

  const paymentHandler = async (e) => {
    e.preventDefault();
    setError(null);
    if (!user) {
      setError("User not logged in.");
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/payment/order`, {
        method: "POST",
        body: JSON.stringify({
          amount,
          currency,
          receipt: receiptId,
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const order = await response.json();
      const RAZORPAY_KEY = import.meta.env.VITE_RAZORPAY_KEY;
      const options = {
        key: RAZORPAY_KEY,
        amount,
        currency,
        name: "WorkSphere",
        description: "Pro Subscription - Unlock premium features",
        image: "https://worksphere35.vercel.app/logo.svg",
        order_id: order.id,
        handler: async function (response) {
          const body = { ...response };
          const token = localStorage.getItem('token');

          const validateRes = await fetch(
            `${API_URL}/payment/order/validate`,
            {
              method: "POST",
              body: JSON.stringify(body),
              headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
              },
            }
          );
          const jsonRes = await validateRes.json();
        },
        prefill: {
          name: `${user.firstName} ${user.lastName}`,
          email: user.email,
          contact: "9000000000",
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#1EA0AA",
        },
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.on("payment.failed", function (response) {
        const errMsg = `
Code: ${response.error.code}
Description: ${response.error.description}
Source: ${response.error.source}
Step: ${response.error.step}
Reason: ${response.error.reason}
Order ID: ${response.error.metadata.order_id}
Payment ID: ${response.error.metadata.payment_id}
        `;
        setError(errMsg);
      });

      rzp1.open();
    } catch (err) {
      setError("Something went wrong during the payment process.");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center py-8 px-4">
      {/* Card Container */}
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-xl w-full">
        {/* Product Header */}
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">Premium Subscription</h2>
        <p className="text-center text-gray-600 mb-6">Unlock all the premium features and elevate your experience with WorkSphere.</p>

        {/* Subscription Image */}
        <div className="flex justify-center mb-6">
  <img
    src={premiumImage}
    alt="Premium Subscription"
    className="rounded-lg shadow-md w-3/4 h-auto" // Adjust the width to 75% and height auto to maintain aspect ratio
  />
</div>


        {/* Payment Button */}
        <Button
          className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
          onClick={paymentHandler}
        >
          Pay ₹{amount} for Premium
        </Button>

        {/* Error Alert */}
        {error && (
          <Alert variant="destructive" className="mt-4">
            <AlertTitle>Payment Failed</AlertTitle>
            <AlertDescription>
              <pre className="whitespace-pre-wrap">{error}</pre>
            </AlertDescription>
          </Alert>
        )}
      </div>
    </div>
  );
}

export default Payment;
