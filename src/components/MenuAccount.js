import React, { PureComponent } from 'react';

import {Menu, MenuItem, Fade,  IconButton, Link} from '@material-ui/core'
import {AccountCircleOutlined, AccountCircleSharp} from '@material-ui/icons'
import PropTypes from 'prop-types';




class MenuAccount extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            signingOut: false
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


    handleSignOut() {
        const {signOut} = this.props;
        this.setState({
            isOpen: false,
            signingOut: true
        },
        () => signOut())
    }

    signedOut() {
        const {isConnected} = this.props;
        if (this.state.signingOut && !isConnected)
        this.setState({
            signingOut: false
        })
    }

    render() {
        const {auth, isConnected} = this.props;
        const {isOpen, signingOut} = this.state;
        this.signedOut();
        return (
            isConnected? 
            <>
                <IconButton
                    ref={this.refMenuBtn}
                    aria-label={`account of ${auth.email} `}
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={(e) => this.handleClick(e)}
                >
                    <AccountCircleSharp color='secondary' /> 
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
                    <Link onClick={() => this.handleSignOut()}>
                        <MenuItem>Log out</MenuItem>
                    </Link>
                </Menu>
            </>
            :
            <>
                <IconButton
                    ref={this.refMenuBtn}
                    aria-label={`account of current user`}
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={(e) => this.handleClick(e)}
                    color="inherit"
                >
                    <AccountCircleOutlined color='inherit' /> 
                </IconButton>
                {signingOut ? 
                undefined
                :
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
                }
            </>

        )
                
            
    }
}

MenuAccount.propTypes = {
    auth: PropTypes.exact({
        email: PropTypes.string.isRequired
    }),
    signOut: PropTypes.func.isRequired,
    isConnected: PropTypes.bool.isRequired
}

export default MenuAccount;