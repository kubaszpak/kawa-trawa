import React from 'react'
import { Grid, Paper, Avatar, TextField, Button, Checkbox, FormControlLabel  } from '@mui/material';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';



export default function Register() {
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

    return (
        <Grid>
            <Paper style={paperStyle}>
                <Grid align='center'>
                    <Avatar style={avatarStyle}>
                        <AppRegistrationIcon />
                    </Avatar>
                </Grid>

                <form>
                    <TextField style = {tfStyle} id="outlined-basic" label="Imię" variant="outlined"  required/>

                    <TextField style = {tfStyle} id="outlined-basic" label="Nazwisko" variant="outlined"  required/>

                    <TextField style = {tfStyle} id="outlined-basic" label="E-mail" variant="outlined"  required/>

                    <TextField style = {tfStyle} id="outlined-basic" label="Hasło" variant="outlined" type = "password"  required/>

                    <TextField style = {tfStyle} id="outlined-basic" label="Potwierdź hasło" variant="outlined" type = "password"  required/>
                    
                    <FormControlLabel
                        control={<Checkbox name="checkedA" />}
                        label="Przeczytałem/am oraz akceptuję regulamin strony."
                    />
                    <Button style = {buttonStyle} variant="outlined">Zarejestruj</Button>
                </form>
            </Paper>
        </Grid>
    )
}
