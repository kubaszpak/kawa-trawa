import { Typography, Button } from '@mui/material';
import './App.css';
import NavBar from './components/NavBar';

function App() {
  return (
    <div className="App">
      <NavBar />
      <header className="App-header">
        <Typography variant="h1" fontWeight="bold">Kawa i trawa</Typography>
        <Typography varaint="h1">Kupuj dwie niezbędne rzeczy
          do życia <br /> w jednym miejscu
          <br /> w internecie ...</Typography>
        <Button sx={{ mt: 3 }} variant="contained" color="secondary">Kup</Button>
      </header>
    </div>
  );
}

export default App;
