import React, { useEffect, useState } from "react";
import { ProductsApi } from "../../api/ProductsApi";
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	InputAdornment,
	InputLabel,
	MenuItem,
	OutlinedInput,
	Select,
	TextField,
	Typography,
} from "@mui/material";
import DiamondIcon from "@mui/icons-material/Diamond";
import { CategoriesApi } from "../../api/CategoriesApi";

const ProductEditor = ({ product, mode, open, setOpen }) => {
	const [name, setName] = useState(product.name || "");
	const [description, setDescription] = useState(product.description || "");
	const [quantity, setQuantity] = useState(product.quantity || 1);
	const [price, setPrice] = useState(product.price || 1);
	const [pathToImage, setPathToImage] = useState(product.pathToImage || "");
	const [category, setCategory] = useState("");
	const [categories, setCategories] = useState([]);

	const [error, setError] = useState("");

	useEffect(() => {
		const fetchCategories = async () => {
			const categories = await CategoriesApi.getCategoryList();
			setCategories(categories.data);
		};
		fetchCategories();
	}, []);

	const submitChange = async (fields) => {
		const APIRequest = getAPIRequest();
		const payload = getPayload(fields);

		try {
			await APIRequest(payload);
			closeDialog();
		} catch (err) {
			setError("Error");
		}
	};

	const closeDialog = () => setOpen(false);

	const getAPIRequest = () => {
		if (mode === "ADD") {
			return ProductsApi.addProduct;
		}
		return ProductsApi.editProduct;
	};

	const getPayload = (fields) => {
		let payload = {
			name,
			description,
			quantity,
			price,
			pathToImage,
			categories: [category],
		};

		if (product?.id) {
			payload.id = product.id;
		}

		return payload;
	};

	return (
		<Dialog open={open} onClose={closeDialog} fullWidth maxWidth="sm">
			<DialogTitle>
				{mode === "EDIT" ? "Edytuj produkt" : "Dodaj nowy produkt"}
			</DialogTitle>
			<DialogContent>
				<Typography color="red">{error}</Typography>

				<TextField
					fullWidth
					value={name}
					style={{
						marginTop: "16px",
					}}
					label="Nazwa"
					variant="outlined"
					onChange={(e) => setName(e.target.value)}
				/>
				<br />
				<TextField
					fullWidth
					value={description}
					style={{
						marginTop: "16px",
					}}
					label="Opis"
					multiline
					variant="outlined"
					onChange={(e) => setDescription(e.target.value)}
				/>
				<br />
				<TextField
					fullWidth
					value={quantity}
					style={{
						marginTop: "16px",
					}}
					label="Ilość"
					multiline
					variant="outlined"
					onChange={(e) => setQuantity(e.target.value)}
				/>
				<br />
				<TextField
					fullWidth
					value={pathToImage}
					style={{
						marginTop: "16px",
					}}
					label="Ścieżka do zdjęcia"
					multiline
					variant="outlined"
					onChange={(e) => setPathToImage(e.target.value)}
				/>

				<InputLabel htmlFor="outlined-adornment-amount">Cena</InputLabel>
				<OutlinedInput
					fullWidth
					value={price}
					onChange={(e) => setPrice(e.target.value)}
					startAdornment={
						<InputAdornment position="start">
							<DiamondIcon />
						</InputAdornment>
					}
					label="Cena"
				/>

				<Select
					fullWidth
					style={{
						marginTop: "16px",
					}}
					value={category}
					label="Kategoria"
					onChange={(e) => setCategory(e.target.value)}
				>
					{categories.length !== 0 &&
						categories.map((category) => {
							return (
								<MenuItem key={category.id} value={category.id}>
									{category.name}
								</MenuItem>
							);
						})}
				</Select>
			</DialogContent>

			<DialogActions>
				<Button onClick={closeDialog} color="primary">
					Anuluj
				</Button>
				<Button onClick={submitChange} variant="outlined">
					{mode === "EDIT" ? "Edytuj" : "Dodaj"}
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default ProductEditor;
