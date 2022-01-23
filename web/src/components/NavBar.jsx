import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import { Box, IconButton, Link, Typography, Modal, Popover, Snackbar, Alert } from '@mui/material'
import React, { useState, useRef, useEffect } from 'react'
import logoImg from "../static/images/Logo.png"
import Categories from './Categories'
import Login from "./Login"
import axios from "axios"
import { makeStyles } from "@mui/styles"

const useStyles = makeStyles(theme => ({
    popover: {
        pointerEvents: "none"
    },
    popoverContent: {
        pointerEvents: "auto"
    }
}));

export default function NavBar() {

    const [isLoginModalVisible, setIsLoginModalVisible] = useState(false);
    const [popoverOpened, setPopoverOpened] = useState(false);
    const popoverAnchor = useRef(null);
    const [categories, setCategories] = useState([]);
    const [message, setMessage] = useState(null);
    const classes = useStyles();

    useEffect(() => {
        axios.get("http://localhost:5000/categories")
        .then(response => {
                setCategories(response.data)
            })
    }, []);

    const handleOpenPopover = () => {
        setPopoverOpened(true);
    }

    const handleClosePopover = () => {
        setPopoverOpened(false);
    }

    //Register is child component of Login, if the registration component is closed, the login component also should not be visible
    const callbackCloseLoginModal = () => {
        setIsLoginModalVisible(false)
    }

    const showAlert = message => {
        console.log(message)
        setMessage(message)
    }

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
    };

    const openLoginModal = () => {
        setIsLoginModalVisible(true);
    };

    const handleCloseAlert = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setMessage(null);
    };

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            margin: "0 auto",
            maxWidth: "1200px",
            padding: "50px 0"
        }}>
            <a href="/" style={{
                display: "flex",
                alignItems: "center"
            }}>
                <img src={logoImg} alt="Logo" style={{
                    width: "140px",
                    height: "auto",
                    objectFit: "contain"
                }} /></a>
            <Box sx={{
                width: '100%',
                justifyContent: 'right',
                display: 'flex',
                alignItems: 'center'
            }}>
                <Link mx={2} href="#">
                    <Typography color="white">Strona domowa</Typography>
                </Link>

                <Link mx={2} href="#"
                    ref={popoverAnchor}
                    aria-owns="mouse-over-popover"
                    aria-haspopup="true"
                    onMouseEnter={handleOpenPopover}
                    onMouseLeave={handleClosePopover}>
                    <Typography color="white">Kategorie</Typography>
                </Link>
                <Popover
                    id="mouse-over-popover"
                    className={classes.popover}
                    classes={{
                        paper: classes.popoverContent
                    }}
                    open={popoverOpened}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                    anchorEl={popoverAnchor.current}
                    PaperProps={{ onMouseEnter: handleOpenPopover, onMouseLeave: handleClosePopover }}
                >
                    <Categories categories={categories} />
                </Popover>
                <Link mx={2} href="#">
                    <Typography color="white">Kontakt</Typography>
                </Link>
                <Link mx={2} href="#">
                    <Typography color="orange" onClick={openLoginModal}>Logowanie</Typography>
                </Link>
                <IconButton aria-label="cart" sx={{ ml: 4 }} href="#">
                    <ShoppingCartIcon sx={{ color: 'white' }} />
                </IconButton>
            </Box>

            <Modal open={isLoginModalVisible} onClose={callbackCloseLoginModal}>
                <Box sx={style}>
                    <Login showAlert={showAlert} closeLogin={callbackCloseLoginModal} />
                </Box>
            </Modal>

            <Snackbar open={message} onClose={handleCloseAlert} autoHideDuration={6000}>
                <Alert onClose={handleCloseAlert} severity="success" sx={{ width: '100%' }}>
                    {message}
                </Alert>
            </Snackbar>
        </div>
    )
}
