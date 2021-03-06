import { Box, Grid, Paper, Avatar, TextField, FormControlLabel, Switch, Button, Link, Modal, Typography } from '@mui/material'
import LoginIcon from '@mui/icons-material/Login';
import React from 'react'
import { useState } from 'react'
import Register from "./Register"
import PasswordReset from "./PasswordReset"
import axios from 'axios';
// import Cookies from 'universal-cookie';
import Cookies from 'js-cookie'
import { REACT_APP_LOGIN_ENDPOINT } from '../config';

export default function Login({ showAlert, closeLogin, loginUser }) {

    const [loginValue, setLoginValue] = useState("");
    const [passwordValue, setPasswordValue] = useState("");
    const [isSignUpModalVisible, setIsSignUpModalVisible] = useState(false);
    const [isPasswordResetModalVisible, setIsPasswordResetModalVisible] = useState(false);

    const [error, setError] = useState("");


    let mailValidator = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    const login = () => {

        if (!mailValidator.test(loginValue)) {
            setError("Wprowadzono niepoprawny adres e-mail")
            return
        }
        // console.log(REACT_APP_LOGIN_ENDPOINT)

        const body = {
            email: loginValue,
            password: passwordValue
        }

        axios({
            method: 'post',
            url: REACT_APP_LOGIN_ENDPOINT,
            data: body
        })
            .then(response => { //200
                console.log("response: ", response);
                // console.log("refreshToken = ", response.data.refreshToken)
                // console.log("refreshToken expires = ", response.data.expiresIn)
                // console.log("accessToken = ", response.data.accessToken)
                // console.log("accountType = ", response.data.user.accountType)           

                // console.log("converted 1h to = ",parseInt(response.data.expiresIn))

                //token expiration given in hours
                var now = new Date();
                var time = now.getTime();
                time += parseInt(response.data.expiresIn) * 3600 * 1000;
                now.setTime(time);
                

                setError('')

                if (response.data.user.banned) {
                    showAlert('error', 'To konto zosta??o zablokowane.')
                    closeLogin()
                    return
                }

                if (!response.data.user.confirmed) {
                    showAlert('info', 'Zalogowano pomy??lnie. Aby rozpocz???? zakupy zatwierd?? konto przez link aktywacyjny na twoim e-mailu!')
                }
                else {
                    showAlert('success', 'Zalogowano pomy??lnie')
                }

                Cookies.set('refreshToken', response.data.refreshToken)
                Cookies.set('accessToken', response.data.accessToken, { expires: now })
                Cookies.set('accountType', response.data.user.accountType)

                loginUser()
                closeLogin()

            })
            .catch(error => {
                console.log("error", error.response.data.error);
                setError("Nieprawid??owy login lub has??o")
            });

    }

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
    };


    const openSignUpModal = () => {
        setIsSignUpModalVisible(true);
    };

    const openPasswordResetModal = () => {
        setIsPasswordResetModalVisible(true);
    };
    

    const closeSignUpModal = () => {
        setIsSignUpModalVisible(false)
        closeLogin()
    };

    const closePasswordResetModal = () => {
        setIsPasswordResetModalVisible(false)
        closeLogin()
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

                        <Typography color="red">{error}</Typography>
                        <TextField style={tfStyle} id="outlined-basic" label="Login (e-mail)" variant="outlined" onChange={e => setLoginValue(e.target.value)} required />

                        <TextField style={tfStyle} id="outlined-basic" label="Has??o" variant="outlined" type="password" onChange={e => setPasswordValue(e.target.value)} required />

                        <Button style={buttonStyle} onClick={login} variant="outlined">Zaloguj</Button>
                        <FormControlLabel style={marginStyle} value="rememberme" control={<Switch color="primary" />} label="Pami??taj mnie" labelPlacement="end" />

                        <p margin="2px 0"></p>

                        <div style={{ display: "flex" }}>
                            <Link style={linkStyle} onClick={openPasswordResetModal} href="#">Nie pami??tam has??a</Link>
                        </div>


                        <Link style={linkStyle} onClick={openSignUpModal} href="#">Za?????? konto</Link>
                    </Grid>
                </Paper>
            </Grid>

            <Modal open={isSignUpModalVisible} onClose={closeSignUpModal}>
                <Box sx={style}>
                    <Register showAlert={showAlert} closeSignUp={closeSignUpModal} />
                </Box>
            </Modal>

            <Modal open={isPasswordResetModalVisible} onClose={closePasswordResetModal}>
                <Box sx={style}>
                    <PasswordReset showAlert={showAlert} closePasswordReset={closePasswordResetModal} />
                </Box>
            </Modal>
        </>
    )
}
