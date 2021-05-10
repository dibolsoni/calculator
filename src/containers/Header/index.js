import React  from 'react';
import {AppBar, Toolbar, Link} from '@material-ui/core';
import MenuAccount from '../../components/MenuAccount';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      background: theme.palette.matrix.background,
      color: theme.palette.matrix.color
    },
    menuButton: {
    },
    items: {
      padding: theme.spacing(1),
      color: theme.palette.matrix.color
    },    
    grow: {
      flexGrow: 1,
    },
}));



function Header() {
    const classes = useStyles();

  

    return (
        <AppBar position="sticky" >
            <Toolbar className={classes.root}>
                    <Link href="/home" className={classes.items}> Calculator</Link>
                    <Link href="/about" className={classes.items}>About</Link>
                    <Link href="/contribute" className={classes.items}>Contribute</Link>
                    <div className={classes.grow} />
                <MenuAccount className={classes.menuButton} />
            </Toolbar>
        </AppBar>
    )

  }

export default Header;