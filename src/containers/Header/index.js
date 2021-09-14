import React from 'react';
import { AppBar, Toolbar, Link } from '@material-ui/core';
import MenuAccount from '../../components/MenuAccount';
import { withStyles } from '@material-ui/core/styles';
import { observer, signOut } from '../../store/auth/actions'
import { connect } from 'react-redux';
import { STATUS } from '../../store/auth/authReducer';
import { eq } from 'lodash';


const styles = (theme) => ({
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
});



class Header extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    const { classes, auth, signOut, isConnected } = this.props;
    return (
      <AppBar position="sticky" >
        <Toolbar className={classes.root}>
          <Link href="/" className={classes.items}> Calculator</Link>
          <Link href="/about" className={classes.items}>About</Link>
          <Link href="/contribute" className={classes.items}>Contribute</Link>
          <div className={classes.grow} />
          <MenuAccount
            isConnected={isConnected}
            auth={auth}
            signOut={signOut}
            className={classes.menuButton}
          />
        </Toolbar>
      </AppBar>
    )
  }

}


const mapStateToProps = state => ({
  isConnected: eq(state.auth.STATUS,STATUS.connected),
  auth: {
    email: state.auth.email
  }
})
const mapDispatchToProps = dispatch => ({
  signOut: () => dispatch(signOut()),
  authObserver: () => dispatch(observer())
})
export const HeaderWithStyles = withStyles(styles, { withTheme: true })(Header);
export default connect(mapStateToProps, mapDispatchToProps)(HeaderWithStyles);