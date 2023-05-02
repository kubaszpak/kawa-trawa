import { Button, Grid, Typography } from "@mui/material";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { REACT_APP_PRODUCTS_ENDPOINT } from "../../config";
import PageNotFound from "../PageNotFound";

export default function ProductPage({ addProductToCart }) {
	let params = useParams();
	const [product, setProduct] = useState(null);
	const [pageNotFound, setPageNotFound] = useState(false);

	useEffect(() => {
		axios
			.get(`${REACT_APP_PRODUCTS_ENDPOINT}/${params.productId}`)
			.then((response) => {
				if (!response.data) throw new Error("Product not found!");
				setProduct(response.data);
				console.log(response.data);
			})
			.catch((error) => {
				setPageNotFound(true);
			});
	}, [params.productId]);

	return (
		<Grid
			container
			sx={{
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				flexDirection: "row",
				color: "black",
				margin: "auto 100px",
				backgroundColor: "white",
				borderRadius: "10px",
				width: "auto",
			}}
		>
			{pageNotFound ? (
				<PageNotFound />
			) : (
				product && (
					<>
						<Grid item sx={{ flex: "1" }}>
							<img
								src={
									product?.pathToImage ||
									"https://img.kavosdraugas.lt/9e142f51-27d7-44d5-8a67-5ee615e04dfd/470x470/kopiluwakjpg.jpg"
								}
								alt="product"
							/>
						</Grid>
						<Grid item p={5} sx={{ mx: "10%", mt: "50px", flex: "1" }}>
							<Typography variant="h1" fontWeight="bold">
								{product.name}
							</Typography>
							<Typography mt={3} variant="h4">
								Cena: {product.price} zł / sztuka
							</Typography>
							<Typography mt={5} variant="body2">
								{product.description}
							</Typography>
							<Button
								onClick={() => addProductToCart(product.id)}
								sx={{ marginTop: "25px", marginBottom: "75px" }}
								variant="contained"
								color="primary"
							>
								Do koszyka
							</Button>
						</Grid>
					</>
				)
			)}
		</Grid>
	);
}
