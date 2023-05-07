import {
	Box,
	Button,
	Container,
	Grid,
	Skeleton,
	Typography,
} from "@mui/material";
import { LoginContext } from "../../App";
import { useContext, useEffect, useState } from "react";
import DiamondIcon from "@mui/icons-material/Diamond";
import { UserApi } from "../../api/UserApi";

export default function CartContentSummary({
	products,
	cartContent,
	next,
	setAlert,
	removeItemFromTheCart,
}) {
	const { isUserLoggedIn, userDetails } = useContext(LoginContext);
	const [balance, setBalance] = useState(null);

	useEffect(() => {
		const fetchUser = async () => {
			const user = await UserApi.getUser(userDetails.id);
			setBalance(user.data.balance);
		};
		if (isUserLoggedIn && userDetails && userDetails.id !== null) {
			try {
				fetchUser();
			} catch (err) {
				console.err(err);
			}
		}
	});

	return !!products ? (
		products.length > 0 ? (
			<Container maxWidth="lg">
				{!!userDetails ? (
					<Typography
						variant="h4"
						fontWeight="bold"
						color="white"
						textAlign={"left"}
					>
						{userDetails.email}
					</Typography>
				) : (
					""
				)}
				{balance !== null ? (
					<Typography
						variant="h5"
						fontWeight="bold"
						color="white"
						textAlign={"left"}
						sx={{ mb: 3 }}
					>
						Balance: {balance}
						<DiamondIcon
							sx={{ position: "relative", top: "3px", left: "3px" }}
						/>
					</Typography>
				) : (
					""
				)}
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
										{product.price * cartContent[product.id]}
										<DiamondIcon
											sx={{ position: "relative", top: "6px", left: "3px" }}
										/>
									</Typography>
									{product.bestDiscount ? (
										<Typography color="red">
											Po promocji {product.bestDiscount}%:{" "}
											{Math.floor(
												(product.price *
													cartContent[product.id] *
													(100 - product.bestDiscount)) /
													100
											)}
											<DiamondIcon
												sx={{ position: "relative", top: "6px", left: "3px" }}
											/>
										</Typography>
									) : (
										""
									)}
									<Button
										sx={{ marginTop: 1 }}
										variant="contained"
										color="secondary"
										onClick={() => {
											removeItemFromTheCart(product.id);
											// eslint-disable-next-line no-restricted-globals
											location.reload();
										}}
									>
										Usuń
									</Button>
								</Grid>
							</Grid>
						);
					})}
				</Grid>
				<Box py={5}>
					<Typography variant="h3" fontWeight="bold" color="white">
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
						<DiamondIcon
							sx={{
								position: "relative",
								top: "9px",
								left: "3px",
								height: "2em",
								width: "2em",
							}}
						/>
					</Typography>
					<Button
						sx={{ marginY: "16px" }}
						variant="contained"
						size="large"
						onClick={() => {
							if (!isUserLoggedIn) {
								setAlert({
									messageType: "error",
									message: "Login and verify your account to continue!",
								});
								return;
							}
							next();
						}}
					>
						Potwierdź
					</Button>
				</Box>
			</Container>
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
		)
	) : (
		<Container maxWidth="lg">
			<Typography variant="h2" fontWeight="bold" color="white">
				Koszyk pusty
			</Typography>
		</Container>
	);
}
