import {
	Grid,
	Paper,
	Avatar,
	TextField,
	Button,
	Typography,
} from "@mui/material";
import ReportIcon from "@mui/icons-material/Report";
import React from "react";
import { useState } from "react";
import API from "../../api/ApiConnector";
import { REACT_APP_POST_COMPLAINT_ENDPOINT } from "../../config";
import axios from "axios";

export default function ComplaintModal({ closeComplaintModal, order }) {
	const [complaintValue, setComplaintValue] = useState("");

	const [error, setError] = useState("");

	async function reportComplaint() {
		if (complaintValue === "") {
			setError("Nie wprowadzono opisu reklamacji");
			return;
		}

		const body = {
			date: Date.now(),
			order: order,
			description: complaintValue,
		};

		axios({
			method: "post",
			url: REACT_APP_POST_COMPLAINT_ENDPOINT,
			data: body,
			headers: {
				authorization: `Bearer ${API.getAccessToken}`,
			},
		})
			.then((response) => {
				//200
				console.log("response: ", response);

				setError("");
				closeComplaintModal();
			})
			.catch((error) => {
				console.log("error", error.response.data.error);
				setError(error.response.data.error);
			});
	}

	const paperStyle = {
		padding: 20,
		width: 280,
		margin: "20px auto",
	};

	const avatarStyle = {
		backgroundColor: "#9c6644",
		margin: "15px",
	};

	const buttonStyle = {
		margin: "20px",
		width: "230px",
	};

	const tfStyle = {
		margin: "5px",
	};

	return (
		<>
			<Grid>
				<Paper elevation={10} style={paperStyle}>
					<Grid align="center">
						<Avatar style={avatarStyle}>
							<ReportIcon />
						</Avatar>

						<p margin="2px 0"></p>
						<Typography color="red">{error}</Typography>

						<TextField
							style={tfStyle}
							id="outlined-multiline-static"
							label="Opis reklamacji"
							multiline
							rows={6}
							onChange={(e) => setComplaintValue(e.target.value)}
							required
						/>
						<Button
							style={buttonStyle}
							onClick={reportComplaint}
							variant="outlined"
						>
							Wyślij reklamację
						</Button>
					</Grid>
				</Paper>
			</Grid>
		</>
	);
}
