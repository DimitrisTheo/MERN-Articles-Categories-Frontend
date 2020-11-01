import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import logo from '../logo.svg'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
}));

export default function NavBar() {
    const classes = useStyles()
    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <img src={logo} alt="logo" width="50" height="50"></img>
                    <Typography variant="h6" className={classes.title}>
                        Articles - Categories
                    </Typography>
                    <Button variant="outlined" color="inherit" href="/">Home</Button>
                    <Button variant="outlined" color="inherit" href="/categories/list">Categories</Button>
                </Toolbar>
            </AppBar>
        </div>
    );
}