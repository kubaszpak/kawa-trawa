import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import MenuIcon from "@mui/icons-material/Menu";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import {
	Box,
	IconButton,
	Link,
	Typography,
	Modal,
	Popover,
	Hidden,
	List,
	ListItemText,
	SwipeableDrawer,
	ListItemButton,
	Divider,
} from "@mui/material";
import React, { useState, useRef, useEffect, useMemo } from "react";
import logoImg from "../static/images/Logo.png";
import Categories from "./Categories";
import Login from "./auth/Login";
import axios from "axios";
import { makeStyles } from "@mui/styles";
import { REACT_APP_CATEGORIES_ENDPOINT } from "../config";
import Cookies from "js-cookie";
import decode from "jwt-decode";
import accountTypes from "../utils/accountTypes";
import { useNavigate } from "react-router-dom";
import ProductEditor from "./ProductEditor";

const iOS =
	typeof navigator !== "undefined" &&
	/iPad|iPhone|iPod/.test(navigator.userAgent);

const useStyles = makeStyles((theme) => ({
	popover: {
		pointerEvents: "none",
	},
	popoverContent: {
		pointerEvents: "auto",
	},
}));

export default function NavBar({ setAlert }) {
	const [isLoginModalVisible, setIsLoginModalVisible] = useState(false);
	const [popoverOpened, setPopoverOpened] = useState(false);
	const popoverAnchor = useRef(null);
	const [categories, setCategories] = useState([]);
	const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
	const [accountType, setAccountType] = useState(null);
	const [productEditorOpen, setProductEditorOpen] = useState(false);
	const [drawerOpen, setDrawerOpen] = useState(false);
	const navigate = useNavigate();

	const classes = useStyles();

	useEffect(() => {
		axios.get(REACT_APP_CATEGORIES_ENDPOINT).then((response) => {
			setCategories(response.data);
		});
	}, []);

	const handleOpenPopover = () => {
		setPopoverOpened(true);
	};

	const handleClosePopover = () => {
		setPopoverOpened(false);
	};

	//Register is child component of Login, if the registration component is closed, the login component also should not be visible
	const callbackCloseLoginModal = () => {
		setIsLoginModalVisible(false);
	};

	const showAlert = (messagetype, msg) => {
		console.log("alert: ", messagetype, msg);

		setAlert({
			messageType: messagetype,
			message: msg,
		});
	};

	const loginUser = () => {
		setIsUserLoggedIn(true);
	};

	useEffect(() => {
		const accessToken = Cookies.get("accessToken");
		if (!accessToken) {
			setAccountType(null);
			return;
		}
		const { accountType } = decode(accessToken);
		setAccountType(accountType);
	}, [isUserLoggedIn]);

	useEffect(() => {
		const accessToken = Cookies.get("accessToken");
		if (!accessToken) {
			setAccountType(null);
			return;
		}
		const { accountType } = decode(accessToken);
		setAccountType(accountType);
	}, [isUserLoggedIn]);

	const isEmployee = useMemo(() => {
		return accountType === accountTypes.EMPLOYEE;
	}, [accountType]);

	const logOutUser = () => {
		console.log("byebye");

		Cookies.remove("refreshToken");
		Cookies.remove("accessToken");
		Cookies.remove("accountType");

		setIsUserLoggedIn(false);
	};

	const style = {
		position: "absolute",
		top: "50%",
		left: "50%",
		transform: "translate(-50%, -50%)",
	};

	const openLoginModal = () => {
		setIsLoginModalVisible(true);
	};

	const addNewProduct = () => {
		setProductEditorOpen(true);
	};

	return (
		<div
			className="navbar-wrapper"
			style={{
				display: "flex",
				justifyContent: "space-between",
				padding: "50px 0",
			}}
		>
			<a
				href="/"
				style={{
					display: "flex",
					alignItems: "center",
					padding: "1rem",
				}}
			>
				<img
					src={logoImg}
					alt="Logo"
					style={{
						height: "auto",
						maxHeight: "60px",
						objectFit: "contain",
					}}
				/>
			</a>
			<Hidden mdDown>
				<Box
					sx={{
						flex: 4,
						justifyContent: "right",
						display: "flex",
						alignItems: "center",
					}}
				>
					<Link mx={2} href="/#">
						<Typography color="white">Strona domowa</Typography>
					</Link>

					<Link mx={2} href="/products">
						<Typography color="white">Produkty</Typography>
					</Link>

					<Link
						mx={2}
						href="#"
						ref={popoverAnchor}
						aria-owns="mouse-over-popover"
						aria-haspopup="true"
						onMouseEnter={handleOpenPopover}
						onMouseLeave={handleClosePopover}
					>
						<Typography color="white">Kategorie</Typography>
					</Link>

					{isEmployee && (
						<Typography
							sx={{ cursor: "pointer" }}
							color="white"
							onClick={addNewProduct}
						>
							Dodaj produkt
						</Typography>
					)}

					{(isUserLoggedIn || Cookies.get("accessToken") != null) && (
						<Link mx={2} href="/orders">
							<Typography color="white">Zamówienia</Typography>
						</Link>
					)}

					{isUserLoggedIn || Cookies.get("accessToken") != null ? (
						<Box mx={2} sx={{ cursor: "pointer" }}>
							<Typography color="orange" onClick={logOutUser}>
								Wyloguj mnie
							</Typography>
						</Box>
					) : (
						<Box mx={2} sx={{ cursor: "pointer" }}>
							<Typography color="orange" onClick={openLoginModal}>
								Logowanie
							</Typography>
						</Box>
					)}
					<IconButton
						aria-label="cart"
						sx={{ ml: 4 }}
						onClick={() => navigate("cart")}
					>
						<ShoppingCartIcon sx={{ color: "white" }} />
					</IconButton>
				</Box>
			</Hidden>
			<Hidden mdUp>
				<IconButton onClick={() => setDrawerOpen(true)}>
					<MenuIcon sx={{ color: "white" }} fontSize="large" />
				</IconButton>
			</Hidden>
			<SwipeableDrawer
				disableBackdropTransition={!iOS}
				disableDiscovery={iOS}
				anchor="right"
				open={drawerOpen}
				onClose={() => setDrawerOpen(false)}
				onOpen={() => setDrawerOpen(true)}
				sx={{
					"& .MuiDrawer-paper": { boxSizing: "border-box", width: "240px" },
				}}
			>
				<IconButton sx={{ py: "1rem" }} onClick={() => setDrawerOpen(false)}>
					<MenuOpenIcon fontSize="large" />
				</IconButton>
				<List disablePadding>
					<ListItemButton component="a" href="/">
						<ListItemText primary="Strona domowa" />
					</ListItemButton>
					<ListItemButton component="a" href="/products">
						<ListItemText primary="Produkty" />
					</ListItemButton>
					<Categories
						categories={categories}
						closeDrawer={() => setDrawerOpen(false)}
					/>
					<Divider />
					{isEmployee && (
						<ListItemButton onClick={addNewProduct}>
							Dodaj produkt
						</ListItemButton>
					)}
					<ListItemButton component="a" href="/cart">
						<ListItemText primary="Koszyk" />
					</ListItemButton>
					{(isUserLoggedIn || Cookies.get("accessToken") != null) && (
						<ListItemButton component="a" href="/orders">
							<ListItemText primary="Zamówienia" />
						</ListItemButton>
					)}

					{isUserLoggedIn || Cookies.get("accessToken") != null ? (
						<ListItemButton color="orange" onClick={logOutUser}>
							<ListItemText primary="Wyloguj mnie" />
						</ListItemButton>
					) : (
						<ListItemButton color="orange" onClick={openLoginModal}>
							<ListItemText primary="Logowanie" />
						</ListItemButton>
					)}
				</List>
			</SwipeableDrawer>
			<Popover
				id="mouse-over-popover"
				className={classes.popover}
				classes={{
					paper: classes.popoverContent,
				}}
				open={popoverOpened}
				anchorOrigin={{
					vertical: "bottom",
					horizontal: "left",
				}}
				transformOrigin={{
					vertical: "top",
					horizontal: "left",
				}}
				anchorEl={popoverAnchor.current}
				PaperProps={{
					onMouseEnter: handleOpenPopover,
					onMouseLeave: handleClosePopover,
				}}
			>
				<Categories categories={categories} />
			</Popover>

			<Modal open={isLoginModalVisible} onClose={callbackCloseLoginModal}>
				<Box sx={style}>
					<Login
						showAlert={showAlert}
						closeLogin={callbackCloseLoginModal}
						loginUser={loginUser}
					/>
				</Box>
			</Modal>

			<ProductEditor
				product={{}}
				mode={"ADD"}
				open={productEditorOpen}
				setOpen={setProductEditorOpen}
				onSubmit={() => {}}
			/>
		</div>
	);
}
