import { Button, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
	const navigate = useNavigate();

	return (
		<header className="App-header">
			<Typography variant="h1" fontWeight="bold">
				Kawa i trawa
			</Typography>
			<Typography varaint="h1">
				Potwierdzono rejestrację.
				<br /> Zaloguj się aby odkryć nowy smak życia
			</Typography>
			<Button
				sx={{ mt: 3 }}
				variant="contained"
				color="secondary"
				onClick={() => navigate("/products")}
			>
				Kup
			</Button>
		</header>
	);
}
