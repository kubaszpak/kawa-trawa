import { Box, Grid, Paper, Avatar, TextField, FormControlLabel, Switch, Button, Link, Modal } from '@mui/material'
import LoginIcon from '@mui/icons-material/Login';
import React from 'react'
import { useState } from 'react'
import Register from "./Register"

export default function Login({callback}) {

    const [isSignUpModalVisible, setIsSignUpModalVisible] = useState(false);


    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
    };


    const openSignUpModal = () => {
        // console.log("open signup modal")
        setIsSignUpModalVisible(true);
    };

    const closeSignUpModal = () => {
        setIsSignUpModalVisible(false)
        callback()
    };


    const paperStyle = {
        padding: 20,
        width: 280,
        margin: "20px auto"

    }

    const avatarStyle = {
        backgroundColor: '#9c6644',
        margin: '15px'
    }

    const marginStyle = {
        margin: '10px'
    }

    const buttonStyle = {
        margin: '20px',
        width: '230px'
    }

    const tfStyle = {
        margin: '5px'
    }

    const linkStyle = {
        margin: '5px auto',
        fontSize: '16px',
        color: '#9c6644'
        // textAlign: 'left'
    }

    return (
        <>
            <Grid>
                <Paper elevation={10} style={paperStyle}>
                    <Grid align='center'>
                        <Avatar style={avatarStyle}><LoginIcon /></Avatar>

                        <TextField style={tfStyle} id="outlined-basic" label="Login" variant="outlined" required />

                        <TextField style={tfStyle} id="outlined-basic" label="Hasło" variant="outlined" type="password" required />

                        <Button style={buttonStyle} variant="outlined">Zaloguj</Button>
                        <FormControlLabel style={marginStyle} value="rememberme" control={<Switch color="primary" />} label="Pamiętaj mnie" labelPlacement="end" />

                        <p margin="2px 0"></p>

                        <div style={{ display: "flex" }}>
                            <Link style={linkStyle} href="#">Nie pamiętam hasła</Link>
                        </div>


                        <Link style={linkStyle} onClick={openSignUpModal} href="#">Załóż konto</Link>
                    </Grid>
                </Paper>
            </Grid>

            <Modal open={isSignUpModalVisible} onClose={closeSignUpModal}>
                <Box sx={style}>
                    <Register/>
                </Box>
            </Modal>
        </>
    )
}