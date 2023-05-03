import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { REACT_APP_PRODUCTS_ENDPOINT } from "../../config";

import partition from "../../utils/partition";
import AddressForm from "./AddressForm";
import CartContentSummary from "./CartContentSummary";
import Summary from "./Summary";

const removeItemFromTheCart = (id) => {
	const newCart = JSON.parse(localStorage.getItem("cart"));
	delete newCart[id];
	localStorage.setItem("cart", JSON.stringify(newCart));
};

const steps = ["cart_summary", "address_form", "summary"];

export default function Cart({
	cartContent,
	setAlert,
	setAlertBasedOnPromiseResult,
}) {
	const [products, setProducts] = useState([]);
	const [address, setAddress] = useState({
		country: "",
		city: "",
		postCode: "",
		street: "",
		houseNumber: "",
	});
	const [step, setStep] = useState(steps[0]);

	useEffect(() => {
		Promise.all(
			Object.keys(cartContent).map((key) =>
				axios
					.get(`${REACT_APP_PRODUCTS_ENDPOINT}/${key}/${cartContent[key]}`)
					.catch((error) => error)
			)
		).then((fetchedResponses) => {
			const [filteredResponses, failedResponses] = partition(
				fetchedResponses,
				(response) => response.name !== "Error"
			);
			for (const failedResponse of failedResponses) {
				if (
					failedResponse.response?.data?.message.includes("has been exceeded")
				) {
					setAlert({
						messageType: "error",
						message:
							failedResponse.response.data.message +
							"! Removing it from the cart!",
					});
					const id = /The quantity of the product with id: (\d+)/g.exec(
						failedResponse.response.data.message
					)[1];
					removeItemFromTheCart(id);
					continue;
				}
				if (
					failedResponse.response?.data?.message.includes("No item with id")
				) {
					setAlert({
						messageType: "error",
						message:
							failedResponse.response.data.message +
							"! Removing it from the cart!",
					});
					const id = /No item with id: (\d+)/g.exec(
						failedResponse.response.data.message
					)[1];
					removeItemFromTheCart(id);
					continue;
				}
			}

			setProducts(
				filteredResponses.length !== 0
					? filteredResponses.map((r) => r.data)
					: null
			);
		});
	}, [cartContent, setProducts, setAlert]);

	if (step === steps[0]) {
		return (
			<CartContentSummary
				products={products}
				cartContent={cartContent}
				setAlert={setAlert}
				next={() => setStep(steps[1])}
				removeItemFromTheCart={removeItemFromTheCart}
			/>
		);
	} else if (step === steps[1]) {
		return (
			<AddressForm
				address={address}
				setAddress={setAddress}
				next={() => setStep(steps[2])}
			/>
		);
	} else {
		return (
			<Summary
				products={products}
				cartContent={cartContent}
				address={address}
				setAlertBasedOnPromiseResult={setAlertBasedOnPromiseResult}
			/>
		);
	}
}
