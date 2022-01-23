import { Box, Grid, Paper, Avatar, TextField, FormControlLabel, Switch, Button, Link, Modal, Typography } from '@mui/material'
import LoginIcon from '@mui/icons-material/Login';
import React from 'react'
import { useState } from 'react'
import Register from "./Register"
import axios from 'axios';
import Cookies from 'universal-cookie';

export default function Login({ callback }) {

    const [loginValue, setLoginValue] = useState("");
    const [passwordValue, setPasswordValue] = useState("");
    const [isSignUpModalVisible, setIsSignUpModalVisible] = useState(false);

    const [error, setError] = useState("");

    const cookies = new Cookies();

    let mailValidator = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    const login = () => {

        if ( !mailValidator.test(loginValue) ) {
            setError("śmieszny mail, a teraz popraw")
            return
        }

        // console.log(process.env.REACT_APP_LOGIN_ENDPOINT)

        const body = {
            email: loginValue,
            password: passwordValue
        }

        axios({
            method: 'post',
            url: process.env.REACT_APP_LOGIN_ENDPOINT,
            data: body
        })
            .then(response => { //200
                console.log("response: ", response);


                cookies.set('myCat', 'Pacman', { path: '/' });
                console.log(cookies.get('myCat')); // Pacman

                // error = response.data;
                setError('')

            })
            .catch(error => {
                console.log("error", error.response.data.error);
                setError(error.response.data.error)
            });




        // console.log(this.refs.login);
        // console.log(this.refs.password);


        // fetch(process.env.BE_ADDRESS + "/auth/login", { method: 'post' })
        // 	.then((response) => response.json())
        // 	.then((parsedPosts) => {
        // 		setPosts(parsedPosts);
        // 	});
        //     console.log("posts loaded ",posts.map((post) => post.id));
    }

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

                        <Typography color="red">{error}</Typography>
                        <TextField style={tfStyle} id="outlined-basic" label="Login (e-mail)" variant="outlined" onChange={e => setLoginValue(e.target.value)} required />

                        <TextField style={tfStyle} id="outlined-basic" label="Hasło" variant="outlined" type="password" onChange={e => setPasswordValue(e.target.value)} required />

                        <Button style={buttonStyle} onClick={login} variant="outlined">Zaloguj</Button>
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
                    <Register />
                </Box>
            </Modal>
        </>
    )
}
