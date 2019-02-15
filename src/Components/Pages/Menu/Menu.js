import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import {MuiThemeProvider } from '@material-ui/core/styles';
import theme from '../../Style/theme'

const styles = {
    root: {
        zIndex: 1,
        width:"100%",
        position: "fixed !important",
    },
    menuButton: {
        marginLeft: -12,
        flexGrow: 0,
    },
    vertical:{
        borderLeft:'1px solid lightgrey',
        height:'3em',
        flexGrow: 1,
        marginLeft:'1em',
      }
};

function Menu(props) {
    const { classes } = props;
    return (
        <MuiThemeProvider theme={theme}>
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
                        <MenuIcon />
                        </IconButton>

                    <Typography variant="h6" color="inherit" className={classes.grow}>
                        MENU     
                    </Typography>
                    <div className={classes.vertical}></div>


                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
        </div>
        </MuiThemeProvider>
            );
}


export default withStyles(styles)(Menu);