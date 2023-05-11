import React, { useState } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";

export default function CheckoutForm() {
	// collect data from the user
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");

	// stripe items
	const stripe = useStripe();
	const elements = useElements();

	// main function
	const createSubscription = async () => {
		try {
			// create a payment method
			const paymentMethod = await stripe?.createPaymentMethod({
				type: "card",
				card: elements?.getElement(CardElement),
				billing_details: {
					name,
					email,
				},
			});

			// call the backend to create subscription
			const response = await fetch("http://localhost:3000/api/stripe/create-subscription", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					paymentMethod: paymentMethod?.paymentMethod?.id,
					name,
					email,
				}),
			}).then((res) => res.json());

			console.log(response);

			const confirmPayment = await stripe?.confirmCardPayment(response.clientSecret);

			if (confirmPayment?.error) {
				alert(confirmPayment.error.message);
			} else {
				alert("Success! Check your email for the invoice.");
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="grid gap-4 m-auto">
			<CardElement />
			<button onClick={createSubscription} disabled={!stripe}>
				Subscribe
			</button>
		</div>
	);
}
