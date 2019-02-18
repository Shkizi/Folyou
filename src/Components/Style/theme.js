import { createMuiTheme } from '@material-ui/core/styles';
import fonts from '../../Resources/Fonts/Fonts.css'

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#f4f7f6',
            fontFamily: 'Apercu Pro'
        },
        secondary: {
            main: '#FF1F32',
        },
    },
});

export default theme;