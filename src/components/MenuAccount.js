import React, { PureComponent } from 'react';

import {Menu, MenuItem, Fade,  IconButton, Link} from '@material-ui/core'
import {AccountCircleOutlined, AccountCircleSharp} from '@material-ui/icons'
import PropTypes from 'prop-types';




class MenuAccount extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false
        };

        this.refMenuBtn = React.createRef();

    }

    handleClick(e) {
        this.setState({
            isOpen: true
        })
    }

    handleClose() {
        this.setState({
            isOpen: false
        })
    }


    render() {
        const {auth} = this.props;
        const {isOpen} = this.state;

        return (
            auth? 
            <>
                <IconButton
                    ref={this.refMenuBtn}
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={(e) => this.handleClick(e)}
                >
                    <AccountCircleSharp color='inherit' /> 
                </IconButton>
                

                <Menu
                    id="fade-menu"
                    anchorEl={this.refMenuBtn.current}
                    keepMounted
                    open={isOpen}
                    onClose={() => this.handleClose()}
                    TransitionComponent={Fade}
                >
                    <Link href={"/profile"}>
                        <MenuItem>Profile</MenuItem>
                    </Link>
                    <Link href={"/logout"}>
                        <MenuItem>Log out</MenuItem>
                    </Link>
                </Menu>
            </>
            :
            <>
                <IconButton
                    ref={this.refMenuBtn}
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={(e) => this.handleClick(e)}
                    color="inherit"
                >
                    <AccountCircleOutlined color='inherit' /> 
                </IconButton>

                <Menu
                    id="fade-menu"
                    anchorEl={this.refMenuBtn.current}
                    keepMounted
                    open={isOpen}
                    onClose={() => this.handleClose()}
                    TransitionComponent={Fade}
                >
                    <Link href={"/signin"}>
                        <MenuItem>Sign in</MenuItem>
                    </Link>
                    <Link href={"/signup"}>
                        <MenuItem>Sign up</MenuItem>
                    </Link>
                </Menu>
            </>

        )
                
            
    }
}

MenuAccount.propTypes = {
    auth: PropTypes.exact({
        name: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired
    })
}

export default MenuAccount;