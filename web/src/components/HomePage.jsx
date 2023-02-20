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
				Kupuj dwie niezbędne do życia rzeczy
				<br />w jednym miejscu
				<br />w internecie ...
			</Typography>
			<Button
				sx={{ my: 3 }}
				variant="contained"
				color="secondary"
				onClick={() => navigate("/products")}
			>
				Kup
			</Button>
		</header>
	);
}
