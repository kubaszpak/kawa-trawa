import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { REACT_APP_CATEGORIES_ENDPOINT } from "../config";
import { Box, Button, Card, Grid, Typography } from "@mui/material";

export default function CategoryPage() {
	let navigate = useNavigate();
	let params = useParams();
	const [category, setCategory] = useState(null);

	useEffect(() => {
		axios
			.get(`${REACT_APP_CATEGORIES_ENDPOINT}/${params.categoryId}`)
			.then((response) => {
				setCategory(response.data);
			});
	}, [params.categoryId]);

	return (
		<Box flexGrow={1} p={2}>
			<Grid
				container
				spacing={{ xs: 2, md: 3 }}
				columns={{ xs: 4, sm: 8, md: 12 }}
			>
				{category &&
					category.products.map((product, index) => (
						<Grid item xs={2} sm={4} md={4} key={index}>
							<Card
								sx={{ cursor: "pointer", p: "16px" }}
								onClick={() => navigate(`/products/${product.id}`)}
							>
								<Typography sx={{ fontWeight: "bold" }} bold variant="h5">
									{product.name}
								</Typography>
								<Typography>Cena: {product.price}zł</Typography>
								<Typography variant="body2">{product.description}</Typography>
								<Button sx={{ m: 2 }} variant="contained" color="secondary">
									Kup teraz
								</Button>
							</Card>
						</Grid>
					))}
			</Grid>
		</Box>
	);
}
