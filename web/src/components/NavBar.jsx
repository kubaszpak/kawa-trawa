import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import { Box, IconButton, Link, Typography, Modal } from '@mui/material'
import React from 'react'
import {useState} from 'react'
import logoImg from "../static/images/Logo.png"
import Login from "./Login"


export default function NavBar() {
    
    const [isLoginCompVisible, setIsLoginCompVisible] = useState(false);


    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      };


    const openLoginComp = () => {
        console.log("open modal")
        setIsLoginCompVisible(true);
        };
    
    const closeLoginComp = () => setIsLoginCompVisible(false);


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
                    <Typography color="orange" onClick={openLoginComp}>Logowanie</Typography>
                </Link>
                <IconButton aria-label="cart" sx={{ ml: 4 }} href="#">
                    <ShoppingCartIcon sx={{ color: 'white' }} />
                </IconButton>
            </Box>

            <Modal open={isLoginCompVisible} onClose={closeLoginComp}>
                <Box sx={style}>
                    <Login/>
                </Box>
            </Modal>

        </div>
    )
}
