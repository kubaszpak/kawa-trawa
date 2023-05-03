import { Button, Container, Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { OrdersApi } from "../../api/OrdersApi";

export default function Summary({ products, cartContent, address, setAlert }) {
	const navigate = useNavigate();

	return (
		products.length > 0 && (
			<Container maxWidth="lg">
				<Grid
					container
					direction="column"
					py={5}
					justifyContent="center"
					alignItems="center"
					padding="2rem"
					sx={{ backgroundColor: "white", borderRadius: "10px" }}
				>
					{products.map((product, index) => {
						return (
							<Grid
								item
								container
								xs={12}
								key={index}
								alignItems="center"
								marginY="1rem"
							>
								<Grid item xs={12} sm={4}>
									<img
										src={product.pathToImage}
										alt={product.name}
										style={{
											objectFit: "contain",
											height: "100%",
											width: "100%",
										}}
									/>
								</Grid>
								<Grid item xs={12} sm={8}>
									<Typography variant="h4" fontWeight="bold">
										{product.name}
									</Typography>
									<Typography>Ilość: {cartContent[product.id]}</Typography>
									<Typography>
										Cena: {cartContent[product.id]} x {product.price} ={" "}
										{product.price * cartContent[product.id]}zł
									</Typography>
									{product.bestDiscount && (
										<Typography color="red">
											Po promocji {product.bestDiscount}%:{" "}
											{Math.floor(
												(product.price *
													cartContent[product.id] *
													(100 - product.bestDiscount)) /
													100
											)}
											zł
										</Typography>
									)}
								</Grid>
							</Grid>
						);
					})}
					<Grid item xs={12} py={5}>
						<Typography variant="h4">Adres:</Typography>
						{Object.keys(address)
							.filter(
								(key) =>
									key !== "flatNumber" &&
									key !== "houseNumber" &&
									key !== "street"
							)
							.map((key) => {
								return (
									<Typography key={key} variant="h5">
										{address[key]}
									</Typography>
								);
							})}
						<Typography variant="h5">
							{address["street"]} {address["houseNumber"]}
							{address.flatNumber && ` / ${address["flatNumber"]}`}
						</Typography>
					</Grid>
					<Grid item xs={12} py={5}>
						<Typography variant="h3" fontWeight="bold">
							Kwota całkowita:{" "}
							{products.reduce(
								(sum, product) =>
									sum +
									Math.floor(
										(product.price *
											cartContent[product.id] *
											(100 - product.bestDiscount)) /
											100
									),
								0
							)}
							zł
						</Typography>
					</Grid>
					<Button
						sx={{ marginY: "16px" }}
						variant="contained"
						size="large"
						onClick={(e) => {
							e.preventDefault();
							OrdersApi.saveOrder({
								address: address,
								products: products.map((product) => {
									return {
										...product,
										quantity: cartContent[product.id],
									};
								}),
							});
							navigate("/");
							setAlert({
								messageType: "success",
								message: "Zamówienie zostało złożone!",
							});
						}}
					>
						Złóż zamówienie
					</Button>
				</Grid>
			</Container>
		)
	);
}
