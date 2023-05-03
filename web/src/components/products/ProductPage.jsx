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
		<div style={{ padding: "16px" }}>
			<Grid
				container
				sx={{
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					flexDirection: "column",
					backgroundColor: "white",
					borderRadius: "10px",
					padding: {
						xs: 2,
						md: 6,
					},
					width: "auto",
					marginInline: "auto",
					maxWidth: "1024px",
				}}
			>
				{pageNotFound ? (
					<PageNotFound />
				) : (
					product && (
						<>
							<Grid item>
								<img
									src={product?.pathToImage}
									alt="product"
									style={{ objectFit: "contain", maxWidth: "100%" }}
								/>
							</Grid>
							<Grid
								item
								sx={{
									p: {
										xs: 1,
										md: 5,
									},
								}}
							>
								<Typography
									sx={{
										fontSize: {
											xs: "2rem",
											md: "3rem",
										},
									}}
									variant="h1"
									fontWeight="bold"
								>
									{product.name}
								</Typography>
								<Typography
									mt={3}
									variant="h4"
									sx={{
										fontSize: {
											xs: "1rem",
											md: "2rem",
										},
									}}
								>
									Cena: {product.price} zł / sztuka
								</Typography>
								<Typography mt={5} variant="body2">
									{product.description}
								</Typography>
								<Typography color="red" variant="body2">
									Pozostało {product.quantity} sztuk!
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
		</div>
	);
}
