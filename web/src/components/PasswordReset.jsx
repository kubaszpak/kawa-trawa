import React from "react";
import { useState } from "react";
import {
	Grid,
	Typography,
	Paper,
	Avatar,
	TextField,
	Button,
} from "@mui/material";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import axios from "axios";
import { REACT_APP_PASSWORD_RESET_ENDPOINT } from "../config";

export default function PasswordReset({ showAlert, closeSignUp }) {
	const [resetData, setResetData] = useState({
		mail: "",
	});

	const [error, setError] = useState("");
	const [success, setSuccess] = useState("");

	const paperStyle = { padding: 20, width: 280, margin: "0 auto" };
	// const headerStyle = { margin: '15px' }
	const avatarStyle = {
		backgroundColor: "#9c6644",
		margin: "15px",
	};
	// const marginTop = { marginTop: 5 }

	const tfStyle = {
		margin: "5px",
	};

	const buttonStyle = {
		margin: "20px",
		width: "230px",
	};

	let mailValidator = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

	const resetPasswordRequest = () => {
		console.log(resetData);
		console.log(REACT_APP_PASSWORD_RESET_ENDPOINT);

		if (!mailValidator.test(resetData.mail)) {
			setError("Wprowadzono niepoprawny adres e-mail");
			return;
		}

		const body = {
			email: resetData.mail,
		};

		axios({
			method: "post",
			url: REACT_APP_PASSWORD_RESET_ENDPOINT,
			data: body,
		})
			.then((response) => {
				//200
				console.log("response: ", response);

				// error = response.data;
				setError("");
				setSuccess(
					"Sprawdź swój adres " +
						resetData.mail +
						" w celu potwierdzenia zresetowania hasła."
				);

				showAlert(
					"success",
					"Sprawdź swój adres " +
						resetData.mail +
						" w celu potwierdzenia zresetowania hasła."
				);
			})
			.catch((error) => {
				setSuccess("");
				console.log("error", error.response.data?.error);
				setError(error.response.data?.error | error.response.data);
			});
	};

	return (
		<Grid>
			<Paper style={paperStyle}>
				<Grid align="center">
					<Avatar style={avatarStyle}>
						<AppRegistrationIcon />
					</Avatar>
				</Grid>

				<form>
					<Typography color="green">{success}</Typography>
					<Typography color="red">{error}</Typography>

					<TextField
						style={tfStyle}
						id="outlined-basic"
						label="E-mail"
						variant="outlined"
						onChange={(e) => setResetData({ mail: e.target.value })}
						required
					/>

					<Button
						style={buttonStyle}
						onClick={resetPasswordRequest}
						variant="outlined"
					>
						Wyślij email do resetu hasła
					</Button>
				</form>
			</Paper>
		</Grid>
	);
}
