import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { REACT_APP_PRODUCTS_ENDPOINT } from "../../config";

import partition from "../../utils/partition";
import AddressForm from "./AddressForm";
import CartContentSummary from "./CartContentSummary";
import Summary from "./Summary";

const steps = ["cart_summary", "address_form", "summary"];

export default function Cart({ cartContent, setAlert }) {
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
			console.error(failedResponses);
			setProducts(filteredResponses.map((r) => r.data));
		});
	}, [cartContent, setProducts]);

	if (step === steps[0]) {
		return (
			<CartContentSummary
				products={products}
				cartContent={cartContent}
				next={() => setStep(steps[1])}
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
				setAlert={setAlert}
			/>
		);
	}
}
