import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { REACT_APP_PRODUCTS_ENDPOINT } from "../config";
import { Box, Button, Grid, Skeleton, Typography } from "@mui/material";

export default function Cart({ cartContent }) {
	const [products, setProducts] = useState([]);
	const [loaded, setLoaded] = useState(false);

	useEffect(() => {
		for (const key of Object.keys(cartContent)) {
			axios
				.get(`${REACT_APP_PRODUCTS_ENDPOINT}/${key}`)
				.then((response) => {
					if (!response.data)
						// TODO wyświetlić komunikat o zmienionym stanie wybranego produktu i usunąć go z localStorage
						throw new Error(
							"Coś poszło nie tak, produkt z koszyka już nie istnieje!"
						);
					setProducts((prev) => [...prev, response.data]);
				})
				.catch((error) => console.error(error));
		}
		setLoaded(true);
	}, [cartContent]);

	return (
		<div>
			{loaded ? (
				<Box py={5} px={15}>
					<Grid
						container
						spacing={2}
						sx={{ backgroundColor: "white", borderRadius: "10px" }}
					>
						{products.map((product, index) => {
							return (
								<Grid item xs={12} mb={5} key={index}>
									<Typography variant="h4" fontWeight="bold">
										Produkt: {product.name}
									</Typography>
									<Typography>Ilość: {cartContent[product.id]}</Typography>
									<Typography>
										Cena: {cartContent[product.id]} x {product.price} ={" "}
										{product.price * cartContent[product.id]}zł
									</Typography>
								</Grid>
							);
						})}
						<Grid item xs={12} mb={5}>
							Cena całkowita:{" "}
							{products.reduce(
								(sum, product) => sum + cartContent[product.id] * product.price,
								0
							)}
							zł
						</Grid>
						<Grid item xs={12} mb={5}>
							<Button variant="contained">Potwierdź</Button>
						</Grid>
					</Grid>
				</Box>
			) : (
				Object.keys(cartContent).map((_, index) => {
					return (
						<Box key={index}>
							<Typography>
								<Skeleton />
							</Typography>
							<Typography variant="h2">
								<Skeleton />
							</Typography>
						</Box>
					);
				})
			)}
		</div>
	);
}
