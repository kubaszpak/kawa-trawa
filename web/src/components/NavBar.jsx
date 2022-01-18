import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import { Box, IconButton, Link, Typography, Modal } from '@mui/material'
import React from 'react'
import { useState } from 'react'
import logoImg from "../static/images/Logo.png"
import Login from "./Login"


export default function NavBar() {

    const [isLoginModalVisible, setIsLoginModalVisible] = useState(false);


    //Register is child component of Login, if the registration component is closed, the login component also should not be visible 
    const callbackModal = () => {
        closeLoginModal()
     }

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
    };


    const openLoginModal = () => {
        // console.log("open login modal")
        setIsLoginModalVisible(true);
    };

    const closeLoginModal = () => setIsLoginModalVisible(false);


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
                <Link mx={2} href="#">
                    <Typography color="white">Kategorie</Typography>
                </Link>
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

            <Modal open={isLoginModalVisible} onClose={closeLoginModal}>
                <Box sx={style}>
                    <Login callback = {callbackModal} />
                </Box>
            </Modal>

        </div>
    )
}
