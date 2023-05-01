import {
	Box,
	Button,
	Container,
	Grid,
	Skeleton,
	Typography,
} from "@mui/material";

export default function CartContentSummary({ products, cartContent, next }) {
	return products.length > 0 ? (
		<Container maxWidth="xl">
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
					zł
				</Typography>
				<Button
					sx={{ marginY: "16px" }}
					variant="contained"
					size="large"
					onClick={next}
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
	);
}
