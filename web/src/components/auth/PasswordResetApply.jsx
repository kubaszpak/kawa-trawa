import { Button, Typography, TextField } from "@mui/material";
import Cookies from "js-cookie";
import React from "react";
import axios from "axios";
import { useState } from "react";
import { REACT_APP_PASSWORD_RESET_APPLY_ENDPOINT } from "../../config";
import { useNavigate } from "react-router-dom";

export default function PasswordResetApply({ setAlert }) {
	const [changeData, setChangeData] = useState({
		password: "",
		repeatedPassword: "",
	});
	const navigate = useNavigate();
	const [error, setError] = useState("");
	const [success, setSuccess] = useState("");

	let passwordValidator =
		/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[\w~@#$%^&*+=`|{}:;!.?"()[\]-]{8,25}$/;

	const resetPassword = () => {
		console.log(changeData);
		console.log(REACT_APP_PASSWORD_RESET_APPLY_ENDPOINT);

		if (changeData.password.localeCompare(changeData.repeatedPassword) !== 0) {
			setError("Wprowadzono różne hasła");
			return;
		}

		if (!passwordValidator.test(changeData.password)) {
			setError(
				"Hasło musi posiadać co najmniej 8 znaków, w tym co najmniej jedną małą oraz dużą literę i cyfrę. Znak specjalny znacznie zwiększy siłę hasła. Rozważ jego dodanie."
			);
			return;
		}

		const body = {
			password: changeData.password,
		};

		axios({
			method: "post",
			url: REACT_APP_PASSWORD_RESET_APPLY_ENDPOINT,
			data: body,
			headers: {
				authorization: Cookies.get("resetToken"),
			},
		})
			.then((response) => {
				//200
				console.log("response: ", response);

				navigate("/");
				setAlert({
					messageType: "success",
					message: "Pomyślnie zmieniono hasło. Zaloguj się!",
				});
			})
			.catch((error) => {
				setSuccess("");
				console.log("error", error.response.data.error);
				setError(error.response.data?.error || error.response.data);
			});
	};

	return (
		<>
			<header className="App-header">Reset hasła</header>;
			<form
				style={{
					backgroundColor: "white",
					display: "flex",
					flexDirection: "column",
					maxWidth: "768px",
					marginInline: "auto",
					padding: "2rem",
				}}
			>
				<Typography color="green">{success}</Typography>
				<Typography color="red">{error}</Typography>

				<TextField
					style={{
						margin: "5px",
					}}
					id="outlined-basic"
					label="Hasło"
					variant="outlined"
					type="password"
					onChange={(e) =>
						setChangeData({ ...changeData, password: e.target.value })
					}
					required
				/>

				<TextField
					style={{
						margin: "5px",
					}}
					id="outlined-basic"
					label="Potwierdź hasło"
					variant="outlined"
					type="password"
					onChange={(e) =>
						setChangeData({ ...changeData, repeatedPassword: e.target.value })
					}
					required
				/>

				<Button
					style={{
						margin: "20px",
						width: "230px",
					}}
					onClick={resetPassword}
					variant="outlined"
				>
					Zresetuj hasło
				</Button>
			</form>
		</>
	);
}
