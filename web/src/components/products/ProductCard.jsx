import React, { useEffect, useMemo, useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/material";
import { ProductsApi } from "../../api/ProductsApi";
import Cookies from "js-cookie";
import decode from "jwt-decode";
import accountTypes from "../../utils/accountTypes";
import ProductEditor from "./ProductEditor";

const ProductCard = ({ product, onDelete, addProductToCart }) => {
	const navigate = useNavigate();
	const classes = useStyles();
	const [accountType, setAccountType] = useState(null);
	const [productEditorOpen, setProductEditorOpen] = useState(false);

	useEffect(() => {
		const accessToken = Cookies.get("accessToken");
		if (!accessToken) {
			setAccountType(null);
			return;
		}
		const { accountType } = decode(accessToken);
		setAccountType(accountType);
	}, []);

	const showDetails = () => {
		navigate(`/products/${product.id}`);
	};

	const deleteProduct = async (e) => {
		e.stopPropagation();
		try {
			await ProductsApi.deleteProduct(product);
			onDelete();
		} catch (err) {
			console.error(err);
		}
	};

	const isEmployee = useMemo(() => {
		return accountType === accountTypes.EMPLOYEE;
	}, [accountType]);

	const editProduct = (e) => {
		e.stopPropagation();
		setProductEditorOpen(true);
	};

	return (
		<>
			<Card
				sx={{
					cursor: "pointer",
					p: "16px",
					display: "flex",
					flexDirection: "column",
				}}
				onClick={showDetails}
			>
				<CardMedia component="img" image={product.pathToImage} />
				<CardContent
					sx={{
						height: "160px",
						textOverflow: "ellipsis",
						overflow: "hidden",
					}}
				>
					<Typography
						gutterBottom
						variant="h5"
						component="div"
						fontWeight="bold"
					>
						{product.name}
					</Typography>
					<Typography>Cena: {product.price}zł</Typography>
					<Box className={classes.description}>
						<Typography variant="body2" color="text.secondary">
							{product.description}
						</Typography>
					</Box>
				</CardContent>
				<CardActions sx={{ justifyContent: "flex-end", flex: 1 }}>
					<Button
						size="small"
						variant="contained"
						color="secondary"
						onClick={() => addProductToCart(product.id)}
					>
						Dodaj do koszyka
					</Button>

					{isEmployee && (
						<>
							<Button
								size="small"
								variant="contained"
								color="error"
								onClick={deleteProduct}
							>
								Usuń
							</Button>
							<Button
								size="small"
								variant="contained"
								color="primary"
								onClick={editProduct}
							>
								Edytuj
							</Button>
						</>
					)}
				</CardActions>
			</Card>
			<ProductEditor
				product={product}
				mode={"EDIT"}
				open={productEditorOpen}
				setOpen={setProductEditorOpen}
				onSubmit={() => {}}
			/>
		</>
	);
};

const useStyles = makeStyles((theme) => ({
	description: {
		marginTop: "16px",
		textOverflow: "ellipsis",
		overflow: "hidden",
		// Addition lines for 4 line ellipsis
		display: "-webkit-box !important",
		"-webkitLine-clamp": 4,
		"-webkit-box-orient": "vertical",
		whiteSpace: "normal",
	},
}));

export default ProductCard;
