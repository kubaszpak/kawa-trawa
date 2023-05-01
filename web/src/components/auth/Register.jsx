import React from "react";
import { useState } from "react";
import {
	Grid,
	Typography,
	Paper,
	Avatar,
	TextField,
	Button,
	Checkbox,
	FormControlLabel,
} from "@mui/material";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import axios from "axios";
import { REACT_APP_REGISTER_ENDPOINT } from "../../config";

export default function Register({ showAlert, closeSignUp }) {
	const [registerData, setRegisterData] = useState({
		firstName: "",
		surname: "",
		mail: "",
		phoneNumber: "",
		password: "",
		repeatedPassword: "",
	});

	const [error, setError] = useState("");
	const [success, setSuccess] = useState("");
	const [isRegulationsAccepted, setIsRegulationsAccepted] = useState(false);

	const styles = {
		paperStyle: { padding: 20, width: 280, margin: "0 auto" },
		avatarStyle: {
			backgroundColor: "#9c6644",
			margin: "15px",
		},
		tfStyle: {
			margin: "5px",
		},
		buttonStyle: {
			margin: "20px",
			width: "230px",
		},
	};

	let nameValidator = /^[a-zA-Z ]{2,30}$/;
	let mailValidator = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
	let phoneNumberValidator = /^\d{9}$/;
	let passwordValidator =
		/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[\w~@#$%^&*+=`|{}:;!.?"()[\]-]{8,25}$/;

	const register = () => {
		console.log(registerData);
		console.log(REACT_APP_REGISTER_ENDPOINT);

		if (!nameValidator.test(registerData.firstName)) {
			setError("Wprowadzono niepoprawne imię");
			return;
		}

		if (!nameValidator.test(registerData.surname)) {
			setError("Wprowadzono niepoprawne nazwisko");
			return;
		}

		if (!mailValidator.test(registerData.mail)) {
			setError("Wprowadzono niepoprawny adres e-mail");
			return;
		}

		if (!phoneNumberValidator.test(registerData.phoneNumber)) {
			setError("Wprowadzono niepoprawny numer telefonu - podaj 9 cyfr");
			return;
		}

		if (
			registerData.password.localeCompare(registerData.repeatedPassword) !== 0
		) {
			setError("Wprowadzono różne hasła");
			return;
		}

		if (!passwordValidator.test(registerData.password)) {
			setError(
				"Hasło musi posiadać co najmniej 8 znaków, w tym co najmniej jedną małą oraz dużą literę i cyfrę. Znak specjalny znacznie zwiększy siłę hasła. Rozważ jego dodanie."
			);
			return;
		}

		if (!isRegulationsAccepted) {
			setError("Nie zaakceptowano regulaminu strony");
			return;
		}

		const body = {
			firstName: registerData.firstName,
			lastName: registerData.surname,
			email: registerData.mail,
			phoneNumber: registerData.phoneNumber,
			password: registerData.password,
		};

		axios({
			method: "post",
			url: REACT_APP_REGISTER_ENDPOINT,
			data: body,
		})
			.then((response) => {
				//200
				console.log("response: ", response);

				setError("");
				setSuccess(
					"Sprawdź swój adres " +
						registerData.mail +
						" w celu potwierdzenia zarejestrowanego konta."
				);

				showAlert(
					"success",
					"Możesz się już zalogować. Sprawdź swój adres " +
						registerData.mail +
						" w celu potwierdzenia zarejestrowanego konta."
				);
				closeSignUp();
			})
			.catch((error) => {
				setSuccess("");
				console.log("error", error.response.data.error);
				setError(error.response.data.error);
			});
	};

	return (
		<Grid>
			<Paper style={styles.paperStyle}>
				<Grid align="center">
					<Avatar style={styles.avatarStyle}>
						<AppRegistrationIcon />
					</Avatar>
				</Grid>

				<form style={{ display: "flex", flexDirection: "column" }}>
					<Typography color="green">{success}</Typography>
					<Typography color="red">{error}</Typography>

					<TextField
						style={styles.tfStyle}
						id="outlined-basic"
						label="Imię"
						variant="outlined"
						onChange={(e) =>
							setRegisterData({ ...registerData, firstName: e.target.value })
						}
						required
					/>

					<TextField
						style={styles.tfStyle}
						id="outlined-basic"
						label="Nazwisko"
						variant="outlined"
						onChange={(e) =>
							setRegisterData({ ...registerData, surname: e.target.value })
						}
						required
					/>

					<TextField
						style={styles.tfStyle}
						id="outlined-basic"
						label="E-mail"
						variant="outlined"
						onChange={(e) =>
							setRegisterData({ ...registerData, mail: e.target.value })
						}
						required
					/>

					<TextField
						style={styles.tfStyle}
						id="outlined-basic"
						label="Numer telefonu"
						variant="outlined"
						onChange={(e) =>
							setRegisterData({ ...registerData, phoneNumber: e.target.value })
						}
						required
					/>

					<TextField
						style={styles.tfStyle}
						id="outlined-basic"
						label="Hasło"
						variant="outlined"
						type="password"
						onChange={(e) =>
							setRegisterData({ ...registerData, password: e.target.value })
						}
						required
					/>

					<TextField
						style={styles.tfStyle}
						id="outlined-basic"
						label="Potwierdź hasło"
						variant="outlined"
						type="password"
						onChange={(e) =>
							setRegisterData({
								...registerData,
								repeatedPassword: e.target.value,
							})
						}
						required
					/>

					<FormControlLabel
						control={
							<Checkbox
								name="checkedA"
								value={isRegulationsAccepted}
								onClick={() => setIsRegulationsAccepted(!isRegulationsAccepted)}
							/>
						}
						label="Przeczytałem/am oraz akceptuję regulamin strony."
					/>
					<Button
						style={styles.buttonStyle}
						onClick={register}
						variant="outlined"
					>
						Zarejestruj
					</Button>
				</form>
			</Paper>
		</Grid>
	);
}
