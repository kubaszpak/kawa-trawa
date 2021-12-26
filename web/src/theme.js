import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    typography: {
        fontFamily: [
            'Montserrat',
            'sans-sefif'

        ].join(',')
    },
    palette: {
        primary: {
            main: '#3D463A'
        },
        secondary: {
            main: '#9C6644'
        }
    }
})

export default theme