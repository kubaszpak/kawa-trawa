import { Button, Typography } from '@mui/material';
import React from 'react';

export default function HomePage() {
    return <header className="App-header">
        <Typography variant="h1" fontWeight="bold">Kawa i trawa</Typography>
        <Typography varaint="h1">Potwierdzono rejestrację.<br /> Zaloguj się aby odkryć nowy smak życia</Typography>
        <Button sx={{ mt: 3 }} variant="contained" color="secondary">Kup</Button>
    </header>;
}
