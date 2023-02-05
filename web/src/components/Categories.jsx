import React from "react";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import SendIcon from "@mui/icons-material/Send";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import StarBorder from "@mui/icons-material/StarBorder";
import { Collapse } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Categories({ categories }) {
	const [open, setOpen] = React.useState({});
	const navigate = useNavigate();

	const handleMouseEvent = (idx) => {
		if (!open.hasOwnProperty(idx)) {
			let newOpen = { ...open };
			newOpen[idx] = true;
			setOpen(newOpen);
			return;
		}
		let newOpen = { ...open };
		newOpen[idx] = !open[idx];
		setOpen(newOpen);
	};

	const redirect = (id) => {
		navigate(`categories/${id}#?`);
		// console.log("redirect to :", id);
		// I do not know why without the refresh it doesn't work
		window.location.reload(true);
	};

	return (
		<List
			sx={{
				width: "100%",
				minWidth: 250,
				maxWidth: 360,
				bgcolor: "background.paper",
			}}
			component="nav"
			aria-labelledby="nested-list-subheader"
		>
			{categories &&
				categories.map((category, idx) => {
					return (
						<div
							key={idx}
							onMouseEnter={() => handleMouseEvent(category.id)}
							onMouseLeave={() => handleMouseEvent(category.id)}
						>
							<ListItemButton onClick={() => redirect(category.id)}>
								<ListItemIcon>
									<SendIcon />
								</ListItemIcon>
								<ListItemText primary={category.name} />
								{category.children &&
									(open[category.id] ? <ExpandLess /> : <ExpandMore />)}
							</ListItemButton>
							{category.children && (
								<Collapse in={open[category.id]} timeout="auto" unmountOnExit>
									<List component="div" disablePadding>
										{category.children.map((child, childIdx) => {
											return (
												<ListItemButton
													key={childIdx}
													sx={{ pl: 4 }}
													onClick={() => redirect(child.id)}
												>
													<ListItemIcon>
														<StarBorder />
													</ListItemIcon>
													<ListItemText primary={child.name} />
												</ListItemButton>
											);
										})}
									</List>
								</Collapse>
							)}
						</div>
					);
				})}
		</List>
	);
}
