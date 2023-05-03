import "./App.css";
import NavBar from "./components/NavBar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import PageNotFound from "./components/PageNotFound";
import CategoryPage from "./components/CategoryPage";
import RegisterConfirmed from "./components/auth/RegisterConfirmed";
import ProductPage from "./components/products/ProductPage";
import ProductsPage from "./components/products/ProductsPage";
import OrdersPage from "./components/orders/OrdersPage";
import { useEffect, useState, createContext } from "react";
import Cart from "./components/cart/Cart";
import PasswordResetApply from "./components/auth/PasswordResetApply";
import { Alert, Snackbar } from "@mui/material";

const cartFromLocalStorage = () => {
	return JSON.parse(localStorage.getItem("cart") || "{}");
};

export const LoginContext = createContext(null);

function App() {
	const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
	const [userDetails, setUserDetails] = useState(null);
	const [cart, setCart] = useState(cartFromLocalStorage);
	const [alert, setAlert] = useState({
		messageType: "success",
		message: "",
	});

	useEffect(() => {
		localStorage.setItem("cart", JSON.stringify(cart));
	}, [cart]);

	const addProductToCart = (productId) => {
		let newCart = {
			...cart,
		};
		if (productId in cart) {
			newCart[productId] += 1;
		} else {
			newCart[productId] = 1;
		}
		setCart(newCart);
		setAlert({ messageType: "success", message: "Produkt dodano do koszyka!" });
	};

	const handleCloseAlert = (event, reason) => {
		if (reason === "clickaway") {
			return;
		}

		setAlert({
			messageType: "success",
			message: "",
		});
	};

	const setAlertBasedOnPromiseResult = async (promise) => {
		try {
			await promise;
			setAlert({
				messageType: "success",
				message: "Zamówienie zostało złożone!",
			});
			localStorage.setItem("cart", JSON.stringify({}));
		} catch (err) {
			setAlert({
				messageType: "error",
				message: err.response?.data || "Podczas zamówienia wystąpił błąd!",
			});
		}
	};

	return (
		<LoginContext.Provider
			value={{ isUserLoggedIn, setIsUserLoggedIn, userDetails, setUserDetails }}
		>
			<div className="App">
				<BrowserRouter>
					<NavBar setAlert={setAlert} />
					<Routes>
						<Route path="/" element={<HomePage />} />
						<Route
							path="/passwordResetApply"
							element={<PasswordResetApply setAlert={setAlert} />}
						/>
						<Route
							path="/categories/:categoryId"
							element={<CategoryPage addProductToCart={addProductToCart} />}
						/>
						<Route path="/registerConfirmed" element={<RegisterConfirmed />} />
						<Route
							path="/products/:productId"
							element={
								<ProductPage
									addProductToCart={addProductToCart}
									setAlert={setAlert}
								/>
							}
						/>
						<Route
							path="/products/"
							element={<ProductsPage addProductToCart={addProductToCart} />}
						/>
						<Route path="/orders/" element={<OrdersPage />} />
						<Route
							path="/cart"
							element={
								<Cart
									cartContent={cart}
									setAlert={setAlert}
									setAlertBasedOnPromiseResult={setAlertBasedOnPromiseResult}
								/>
							}
						/>
						<Route path="*" element={<PageNotFound />} />
					</Routes>
					<Snackbar
						open={alert.message !== ""}
						onClose={handleCloseAlert}
						autoHideDuration={6000}
					>
						<Alert
							onClose={handleCloseAlert}
							severity={alert.messageType}
							sx={{ width: "100%" }}
						>
							{alert.message}
						</Alert>
					</Snackbar>
				</BrowserRouter>
			</div>
		</LoginContext.Provider>
	);
}

export default App;
