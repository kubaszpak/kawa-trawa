import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import {
    Box,
    IconButton,
    Link,
    Typography,
    Modal,
    Popover,
    Snackbar,
    Alert,
} from "@mui/material";
import React, { useState, useRef, useEffect, useMemo } from "react";
import logoImg from "../static/images/Logo.png";
import Categories from "./Categories";
import Login from "./Login";
import axios from "axios";
import { makeStyles } from "@mui/styles";
import { REACT_APP_CATEGORIES_ENDPOINT } from "../config";
import Cookies from "js-cookie";
import decode from "jwt-decode";
import accountTypes from "../utils/accountTypes";
import { useNavigate } from "react-router-dom";
import ProductEditor from "./ProductEditor";

const useStyles = makeStyles((theme) => ({
    popover: {
        pointerEvents: "none",
    },
    popoverContent: {
        pointerEvents: "auto",
    },
}));

export default function NavBar() {
    const [isLoginModalVisible, setIsLoginModalVisible] = useState(false);
    const [popoverOpened, setPopoverOpened] = useState(false);
    const popoverAnchor = useRef(null);
    const [categories, setCategories] = useState([]);
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
    const [accountType, setAccountType] = useState(null);
    const [productEditorOpen, setProductEditorOpen] = useState(false);
    const navigate = useNavigate();

    const [alert, setAlert] = useState({
        messageType: "success",
        message: "",
    });

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

    const handleCloseAlert = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }

        setAlert({
            messageType: "success",
            message: "",
        });
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
            style={{
                display: "flex",
                justifyContent: "center",
                margin: "0 auto",
                maxWidth: "1200px",
                padding: "50px 0",
            }}
        >
            <a
                href="/"
                style={{
                    display: "flex",
                    alignItems: "center",
                }}
            >
                <img
                    src={logoImg}
                    alt="Logo"
                    style={{
                        width: "140px",
                        height: "auto",
                        objectFit: "contain",
                    }}
                />
            </a>
            <Box
                sx={{
                    width: "100%",
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
                <Link mx={2} href="#">
                    <Typography color="white">Kontakt</Typography>
                </Link>

                {isEmployee &&
                    <Typography sx={{ cursor: "pointer" }} color="white" onClick={addNewProduct}>Dodaj produkt</Typography>
                }

                {(isUserLoggedIn || Cookies.get('accessToken') != null) &&
                    <Link mx={2} href="/#">
                        <Typography color="white">Zam??wienia</Typography>
                    </Link>
                }

                {isUserLoggedIn || Cookies.get("accessToken") != null ? (
                    <Link mx={2} href="/#">
                        <Typography color="orange" onClick={logOutUser}>
                            Wyloguj mnie
                        </Typography>
                    </Link>
                ) : (
                    <Link mx={2} href="/#">
                        <Typography color="orange" onClick={openLoginModal}>
                            Logowanie
                        </Typography>
                    </Link>
                )}
                <IconButton
                    aria-label="cart"
                    sx={{ ml: 4 }}
                    onClick={() => navigate("cart")}
                >
                    <ShoppingCartIcon sx={{ color: "white" }} />
                </IconButton>
            </Box>

            <Modal open={isLoginModalVisible} onClose={callbackCloseLoginModal}>
                <Box sx={style}>
                    <Login
                        showAlert={showAlert}
                        closeLogin={callbackCloseLoginModal}
                        loginUser={loginUser}
                    />
                </Box>
            </Modal>

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

            <ProductEditor
                product={{}}
                mode={"ADD"}
                open={productEditorOpen}
                setOpen={setProductEditorOpen}
                onSubmit={() => { }}
            />
        </div>
    );
}
