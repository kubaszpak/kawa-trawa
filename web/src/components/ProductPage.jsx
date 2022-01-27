import { Box, Typography } from "@mui/material";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { REACT_APP_PRODUCTS_ENDPOINT } from "../config";

export default function ProductPage() {
	let params = useParams();
	const [product, setProduct] = useState(null);

	useEffect(() => {
		axios
			.get(`${REACT_APP_PRODUCTS_ENDPOINT}/${params.productId}`)
			.then((response) => {
				setProduct(response.data);
			});
	}, [params.productId]);

	return (
		<div>
			{product ? (
				<Box backgroundColor="primary.main">
					<Typography variant="h1"> {product.name} </Typography>
				</Box>
			) : (
				<Typography color="white" variant="h1">
					Product not found!
				</Typography>
			)}
		</div>
	);
}
