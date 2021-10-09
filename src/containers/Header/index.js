import React from 'react';
import { AppBar, Toolbar, Link } from '@material-ui/core';
import MenuAccount from '../../components/MenuAccount';
import { withStyles } from '@material-ui/core/styles';
import { observer, signOut } from '../../store/auth/actions'
import { connect } from 'react-redux';
import { STATUS } from '../../store/auth/authReducer';
import { eq } from 'lodash';
import { Link as RouterLink } from 'react-router-dom';

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
          <RouterLink to="/"> <Link className={classes.items}> Calculator</Link> </RouterLink>
          <RouterLink to="/about"> <Link className={classes.items}>About</Link> </RouterLink>
          <RouterLink to="/contribute"> <Link className={classes.items}>Contribute</Link> </RouterLink>
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