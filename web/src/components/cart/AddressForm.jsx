import { Button, Container, Grid, TextField } from "@mui/material";

export default function AddressForm({ address, setAddress, next }) {
	return (
		<Container maxWidth="xl">
			<Grid
				container
				direction="column"
				py={5}
				justifyContent="center"
				alignItems="center"
				padding="2rem"
				sx={{
					backgroundColor: "white",
					borderRadius: "10px",
				}}
				component="form"
				onSubmit={(e) => {
					e.preventDefault();
					next();
				}}
			>
				<TextField
					label="Kraj"
					margin="normal"
					required
					value={address.country}
					onChange={(e) => {
						setAddress({
							...address,
							country: e.target.value,
						});
					}}
				/>
				<TextField
					label="Miasto"
					margin="normal"
					required
					value={address.city}
					onChange={(e) => {
						setAddress({
							...address,
							city: e.target.value,
						});
					}}
				/>
				<TextField
					label="Kod pocztowy"
					margin="normal"
					required
					value={address.postCode}
					onChange={(e) => {
						setAddress({
							...address,
							postCode: e.target.value,
						});
					}}
				/>
				<TextField
					label="Ulica"
					margin="normal"
					required
					value={address.street}
					onChange={(e) => {
						setAddress({
							...address,
							street: e.target.value,
						});
					}}
				/>
				<TextField
					label="Numer domu"
					margin="normal"
					required
					value={address.houseNumber}
					type="number"
					onChange={(e) => {
						setAddress({
							...address,
							houseNumber: e.target.valueAsNumber,
						});
					}}
				/>
				<TextField
					label="Numer mieszkania"
					margin="normal"
					value={address.flatNumber || ""}
					type="number"
					onChange={(e) => {
						setAddress({
							...address,
							flatNumber: e.target.valueAsNumber,
						});
					}}
				/>
				<Button
					sx={{ marginY: "16px" }}
					variant="contained"
					size="large"
					type="submit"
				>
					Potwierdź
				</Button>
			</Grid>
		</Container>
	);
}
