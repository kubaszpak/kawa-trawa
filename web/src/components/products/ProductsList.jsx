import React, { useCallback, useMemo, useState } from "react";
import Grid from "@mui/material/Grid";
import ProductCard from "./ProductCard";
import {
	Typography,
	Select,
	MenuItem,
	Paper,
	Box,
	FilledInput,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { filterProducts, queryFilter } from "../../utils/filters";

const ProductsList = ({ products, onDelete, addProductToCart }) => {
	const [sortMode, setSortMode] = useState("price-asc");
	const [searchQuery, setSearchQuery] = useState("");

	const classes = useStyles();

	const sortProducts = useCallback(
		(products) => {
			let ascending;
			let property;

			switch (sortMode) {
				case "price-asc":
					ascending = true;
					property = "price";
					break;
				case "price-desc":
					ascending = false;
					property = "price";
					break;
				default:
			}

			let newProducts = [...products];
			if (ascending) {
				newProducts.sort((a, b) => a[property] - b[property]);
			} else {
				newProducts.sort((a, b) => b[property] - a[property]);
			}
			return newProducts;
		},
		[sortMode]
	);

	const handleChange = (event) => {
		const newSortMode = event.target.value;
		setSortMode(newSortMode);
	};

	const displayedProducts = useMemo(() => {
		const newProducts = filterProducts(
			products.filter((product) => product.quantity !== 0),
			[queryFilter(searchQuery)]
		);

		return sortProducts(newProducts);
	}, [products, searchQuery, sortProducts]);

	return (
		<>
			<Box className={classes.grid}>
				<Grid container rowSpacing={2} columnSpacing={2}>
					<Grid item>
						<Paper className={classes.searchInput}>
							<FilledInput
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
								type="text"
								placeholder="Wyszukaj..."
							/>
						</Paper>
					</Grid>

					<Grid item>
						<Paper className={classes.sortPaper}>
							<Box className={classes.alignCenter}>
								<Typography>Sortuj wg:</Typography>
								<Select
									className={classes.text}
									value={sortMode}
									label="Price"
									onChange={handleChange}
								>
									<MenuItem value={"price-asc"}>Ceny rosnąco</MenuItem>
									<MenuItem value={"price-desc"}>Ceny malejąco</MenuItem>
								</Select>
							</Box>
						</Paper>
					</Grid>
				</Grid>
			</Box>

			<Box className={classes.grid}>
				<Grid container rowSpacing={2} columnSpacing={2}>
					{displayedProducts.map((product, index) => (
						<Grid item xs={12} sm={6} md={4} xl={3} key={index}>
							<ProductCard
								key={index}
								product={product}
								addProductToCart={addProductToCart}
								onDelete={onDelete}
							/>
						</Grid>
					))}
				</Grid>
			</Box>
		</>
	);
};

const useStyles = makeStyles((theme) => ({
	sortPaper: {
		padding: theme.spacing(1),
	},
	alignCenter: {
		display: "flex",
		alignItems: "center",
		gap: "5px",
	},
	topBar: {
		display: "flex",
		justifyContent: "flex-start",
	},
	searchInput: {
		padding: theme.spacing(1),
	},
	grid: {
		margin: `${theme.spacing(2)} auto 0 auto`,
		maxWidth: "1280px",
		padding: `0 ${theme.spacing(2)}`,
	},
}));

export default ProductsList;
