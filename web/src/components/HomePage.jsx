import { Button, Typography } from "@mui/material";
import React from "react";

export default function HomePage() {
	return (
		<header className="App-header">
			<Typography variant="h1" fontWeight="bold">
				Kawa i trawa
			</Typography>
			<Typography varaint="h1">
				Kupuj dwie niezbędne do życia rzeczy
				<br /> w jednym miejscu
				<br /> w internecie ...
			</Typography>
			<Button sx={{ mt: 3 }} variant="contained" color="secondary">
				Kup
			</Button>
		</header>
	);
}
