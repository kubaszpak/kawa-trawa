import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Box, Modal } from "@mui/material";
import { useState } from "react";
import ComplaintModal from "./ComplaintModal";
import DiamondIcon from "@mui/icons-material/Diamond";

const OrderCard = ({ order }) => {
	const [isComplaintModalVisible, setIsComplaintModalVisible] = useState(false);

	const openComplaintModal = () => {
		setIsComplaintModalVisible(true);
	};

	const closeComplaintModal = () => {
		setIsComplaintModalVisible(false);
	};

	const style = {
		position: "absolute",
		top: "50%",
		left: "50%",
		transform: "translate(-50%, -50%)",
	};

	return (
		<div>
			<Card sx={{ cursor: "pointer", p: "16px" }}>
				<CardContent>
					<Typography gutterBottom variant="h6" component="div">
						Zamówienie {order.id}
					</Typography>
					<Typography>{new Date(order.date).toLocaleDateString()}</Typography>
					<Typography>
						Cena: {order.totalPrice}
						<DiamondIcon
							sx={{ position: "relative", top: "6px", left: "3px" }}
						/>
					</Typography>

					<Box>
						<Typography variant="body2">
							Status zamówienia:{" "}
							{order.status === "placed" ? "Złożone" : order.status}
						</Typography>
						<Typography variant="body2">
							Lista produktów (produkt/ilość):
						</Typography>
						<ul>
							{order.productList.map((product, idx) => {
								return (
									<li key={idx}>
										<Typography variant="body2" sx={{ textAlign: "left" }}>
											{product.name}/{product.amount}
										</Typography>
									</li>
								);
							})}
						</ul>
					</Box>
				</CardContent>
				<CardActions>
					<Button
						size="small"
						variant="contained"
						color="error"
						onClick={openComplaintModal}
					>
						Zgłoś reklamację
					</Button>
				</CardActions>
			</Card>

			<Modal open={isComplaintModalVisible} onClose={closeComplaintModal}>
				<Box sx={style}>
					<ComplaintModal
						closeComplaintModal={closeComplaintModal}
						order={order}
					/>
				</Box>
			</Modal>
		</div>
	);
};

export default OrderCard;
