import {
	Box,
	Grid,
	Paper,
	Avatar,
	TextField,
	FormControlLabel,
	Switch,
	Button,
	Link,
	Modal,
	Typography,
} from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import React from "react";
import { useState } from "react";
import Register from "./Register";
import PasswordReset from "./PasswordReset";
import axios from "axios";
import Cookies from "js-cookie";
import { REACT_APP_LOGIN_ENDPOINT } from "../../config";

export default function Login({ showAlert, closeLogin, loginUser }) {
	const [loginValue, setLoginValue] = useState("");
	const [passwordValue, setPasswordValue] = useState("");
	const [isSignUpModalVisible, setIsSignUpModalVisible] = useState(false);
	const [isPasswordResetModalVisible, setIsPasswordResetModalVisible] =
		useState(false);

	const [error, setError] = useState("");

	let mailValidator = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

	const login = () => {
		if (!mailValidator.test(loginValue)) {
			setError("Wprowadzono niepoprawny adres e-mail");
			return;
		}

		const body = {
			email: loginValue,
			password: passwordValue,
		};

		axios({
			method: "post",
			url: REACT_APP_LOGIN_ENDPOINT,
			data: body,
		})
			.then((response) => {
				//200
				console.log("response: ", response);
				var now = new Date();
				var time = now.getTime();
				time += parseInt(response.data.expiresIn) * 3600 * 1000;
				now.setTime(time);

				setError("");

				if (response.data.user.banned) {
					showAlert("error", "To konto zostało zablokowane.");
					closeLogin();
					return;
				}

				if (!response.data.user.confirmed) {
					showAlert(
						"info",
						"Zalogowano pomyślnie. Aby rozpocząć zakupy zatwierdź konto przez link aktywacyjny na twoim e-mailu!"
					);
				} else {
					showAlert("success", "Zalogowano pomyślnie");
				}

				Cookies.set("refreshToken", response.data.refreshToken);
				Cookies.set("accessToken", response.data.accessToken, { expires: now });
				Cookies.set("accountType", response.data.user.accountType);

				loginUser();
				closeLogin();
			})
			.catch((error) => {
				console.log("error", error.response.data.error);
				setError("Nieprawidłowy login lub hasło");
			});
	};

	const style = {
		position: "absolute",
		top: "50%",
		left: "50%",
		transform: "translate(-50%, -50%)",
	};

	const openSignUpModal = () => {
		setIsSignUpModalVisible(true);
	};

	const openPasswordResetModal = () => {
		setIsPasswordResetModalVisible(true);
	};

	const closeSignUpModal = () => {
		setIsSignUpModalVisible(false);
		closeLogin();
	};

	const closePasswordResetModal = () => {
		setIsPasswordResetModalVisible(false);
		closeLogin();
	};

	return (
		<>
			<Grid>
				<Paper
					elevation={10}
					style={{
						padding: 20,
						width: 280,
						margin: "20px auto",
					}}
				>
					<Grid align="center">
						<Avatar
							style={{
								backgroundColor: "#9c6644",
								margin: "15px",
							}}
						>
							<LoginIcon />
						</Avatar>

						<Typography color="red">{error}</Typography>
						<TextField
							sx={{ m: 1 }}
							id="outlined-basic"
							label="Login (e-mail)"
							variant="outlined"
							onChange={(e) => setLoginValue(e.target.value)}
							required
						/>

						<TextField
							sx={{ m: 1 }}
							id="outlined-basic"
							label="Hasło"
							variant="outlined"
							type="password"
							onChange={(e) => setPasswordValue(e.target.value)}
							required
						/>

						<Button
							style={{
								margin: "20px",
								width: "230px",
							}}
							onClick={login}
							variant="outlined"
						>
							Zaloguj
						</Button>
						<FormControlLabel
							style={{ margin: "10px" }}
							value="rememberme"
							control={<Switch color="primary" />}
							label="Pamiętaj mnie"
							labelPlacement="end"
						/>

						<div style={{ display: "flex" }}>
							<Link
								style={{
									margin: "5px auto",
									fontSize: "16px",
									color: "#9c6644",
								}}
								onClick={openPasswordResetModal}
								href="#"
							>
								Nie pamiętam hasła
							</Link>
						</div>

						<Link
							style={{
								margin: "5px auto",
								fontSize: "16px",
								color: "#9c6644",
							}}
							onClick={openSignUpModal}
							href="#"
						>
							Załóż konto
						</Link>
					</Grid>
				</Paper>
			</Grid>

			<Modal open={isSignUpModalVisible} onClose={closeSignUpModal}>
				<Box sx={style}>
					<Register showAlert={showAlert} closeSignUp={closeSignUpModal} />
				</Box>
			</Modal>

			<Modal
				open={isPasswordResetModalVisible}
				onClose={closePasswordResetModal}
			>
				<Box sx={style}>
					<PasswordReset
						showAlert={showAlert}
						closePasswordReset={closePasswordResetModal}
					/>
				</Box>
			</Modal>
		</>
	);
}
