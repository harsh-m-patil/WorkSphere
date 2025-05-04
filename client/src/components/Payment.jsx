import { useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { API_URL } from "@/utils/constants";
import { Button } from "./ui/button";
import useAuthStore from "@/store/authStore";

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
      console.log(RAZORPAY_KEY)
      const options = {
        key: RAZORPAY_KEY,
        amount,
        currency,
        name: "WorkSphere",
        description: "Pro Subscription",
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
    <div className="product p-4">
      <h2 className="text-xl font-bold">Tshirt</h2>
      <p>Solid blue cotton Tshirt</p>
      <br />
      <Button onClick={paymentHandler}>Pay</Button>

      {error && (
        <Alert variant="destructive" className="mt-4">
          <AlertTitle>Payment Failed</AlertTitle>
          <AlertDescription>
            <pre className="whitespace-pre-wrap">{error}</pre>
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}

export default Payment;
