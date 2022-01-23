import React from 'react'
import { useState, useRef } from 'react'
import { Grid, Typography, Paper, Avatar, TextField, Button, Checkbox, FormControlLabel } from '@mui/material';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import axios from 'axios';



export default function Register() {
    const [registerData, setRegisterData] = useState({
        firstName: '',
        surname: '',
        mail: '',
        phoneNumber: '',
        password: '',
        repeatedPassword: ''
    });

    const handleRegisterFormChange = e => {
        console.log(e)
    }

    const [error, setError] = useState("");

    const paperStyle = { padding: 20, width: 280, margin: "0 auto" }
    // const headerStyle = { margin: '15px' }
    const avatarStyle = {
        backgroundColor: '#9c6644',
        margin: '15px'
    }
    // const marginTop = { marginTop: 5 }

    const tfStyle = {
        margin: '5px'
    }

    const buttonStyle = {
        margin: '20px',
        width: '230px'
    }

    let nameValidator = /^[a-zA-Z ]{2,30}$/;
    let mailValidator = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    let phoneNumberValidator = /^\d{9}$/

    const register = () => {
        console.log(registerData)
        console.log(process.env.REACT_APP_REGISTER_ENDPOINT)


        if (!nameValidator.test(registerData.firstName)) {
            setError("Popraw imię")
            return
        }

        if (!nameValidator.test(registerData.surname)) {
            setError("Popraw nazwisko")
            return
        }

        if (!mailValidator.test(registerData.mail)) {
            setError("Popraw mail")
            return
        }

        if (!phoneNumberValidator.test(registerData.phoneNumber)) {
            setError("Podaj 9 cyfr numeru telefonu")
            return
        }


        if (registerData.password.localeCompare(registerData.repeatedPassword) != 0) {
            setError("Hasła muszą być takie same")
            return
        }

        const body = {
            firstName: registerData.firstName,
            lastName: registerData.surname,
            email: registerData.email,
            phoneNumber: registerData.phoneNumber,
            password: registerData.password
        }

        axios({
            method: 'post',
            url: process.env.REACT_APP_REGISTER_ENDPOINT,
            data: body
        })
            .then(response => { //200
                console.log("response: ", response);



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

    return (
        <Grid>
            <Paper style={paperStyle}>
                <Grid align='center'>
                    <Avatar style={avatarStyle}>
                        <AppRegistrationIcon />
                    </Avatar>
                </Grid>

                <form>
                    <Typography color="red">{error}</Typography>

                    <TextField style={tfStyle} id="outlined-basic" label="Imię" variant="outlined" onChange={e => setRegisterData({ ...registerData, firstName: e.target.value })} required />

                    <TextField style={tfStyle} id="outlined-basic" label="Nazwisko" variant="outlined" onChange={e => setRegisterData({ ...registerData, surname: e.target.value })} required />

                    <TextField style={tfStyle} id="outlined-basic" label="E-mail" variant="outlined" onChange={e => setRegisterData({ ...registerData, mail: e.target.value })} required />

                    <TextField style={tfStyle} id="outlined-basic" label="Numer telefonu" variant="outlined" onChange={e => setRegisterData({ ...registerData, phoneNumber: e.target.value })} required />

                    <TextField style={tfStyle} id="outlined-basic" label="Hasło" variant="outlined" type="password" onChange={e => setRegisterData({ ...registerData, password: e.target.value })} required />

                    <TextField style={tfStyle} id="outlined-basic" label="Potwierdź hasło" variant="outlined" type="password" onChange={e => setRegisterData({ ...registerData, repeatedPassword: e.target.value })} required />

                    <FormControlLabel
                        control={<Checkbox name="checkedA" />}
                        label="Przeczytałem/am oraz akceptuję regulamin strony."
                    />
                    <Button style={buttonStyle} onClick={register} variant="outlined">Zarejestruj</Button>
                </form>
            </Paper>
        </Grid>
    )
}
