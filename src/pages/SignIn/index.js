import React from 'react';
import { connect} from 'react-redux';
import { signIn, signOut } from '../../store/auth/actions';
import { Paper, Typography, Link } from '@material-ui/core'
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import Header from '../../containers/Header';
import {ERRORS} from '../../constants'
import {STATUS as enumStatus} from '../../store/auth/authReducer';
import { eq } from 'lodash';
import { Redirect } from 'react-router';


const styles = (theme) => ({
    title: {
        paddingTop: theme.spacing(3)
    },
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: 300,
        },
    },
    alert: {
        padding: theme.spacing(0),
    },
    support: {
        padding: theme.spacing(1),
        color: theme.palette.matrix.color
    }
});

class SignIn extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            emailInput: "",
            passwordInput: ""
        }
        this.refUser = React.createRef();
        this.refPassword = React.createRef();
    }


    handleSubmit(e) {
        if (e.key === 'Enter' || e.type === 'click') {
            const {emailInput, passwordInput } = this.state;
            if (emailInput && passwordInput){
                const {signIn} = this.props;
                signIn(emailInput, passwordInput);
            }
        }
            

    }

    render() {

    const {classes, error, status} = this.props;
    const {emailInput, passwordInput } = this.state;
    let userHasError, passwordHasError = false;
    if (status === enumStatus.rejected) {
        userHasError = eq(error.code,ERRORS.auth.userNotFound.code);
        passwordHasError = eq(error.code,ERRORS.auth.passwordIncorrect.code);
    }

    const blockInput = status === enumStatus.requested;
    return (
        <>
        {eq(status,enumStatus.connected) ?
            <Redirect to="/" /> 
        :
        <>
            <Header />
            <Paper elevation={3} style={{paddingBottom: '3em'}}>
                <Typography
                    className={classes.title}
                    variant={'h1'}
                    component={'h2'}
                    paragraph={true}
                >
                    Sign In
            </Typography>
                <form 
                    className={classes.root}  
                    autoComplete="on"
                >
                    <div>
                        {userHasError ? 
                            <TextField
                                error={true}
                                id="outlined-email-error-helper-text"
                                label={"Email-error:"}
                                helperText={ERRORS.auth.userNotFound.message}
                                variant="outlined"
                                type="email"
                                autoComplete={"current-user"}
                                inputRef={this.refUser}
                                onChange={(e) => this.setState({emailInput: e.target.value})}
                                onKeyDown={(e) => this.handleSubmit(e)}
                                disabled={blockInput}

                            />
                            :
                            <TextField
                                id="outlined-email-helper-text"
                                label={"Email:"}
                                variant={"outlined"}
                                required={true}
                                type={"email"}
                                inputRef={this.refUser}
                                onChange={(e) => this.setState({emailInput: e.target.value})}
                                onKeyDown={(e) => this.handleSubmit(e)}
                                disabled={blockInput}


                            />
                    }
                    </div>
                    <div >
                        {passwordHasError ?
                            <TextField
                                error={true}
                                inputRef={this.refPassword}
                                onChange={(e) => this.setState({passwordInput: e.target.value})}
                                id="outlined-password-error-helper-text"
                                type="password"
                                autoComplete="current-password"
                                label={"Password-error:"}
                                helperText={ERRORS.auth.passwordIncorrect.message}
                                variant={"outlined"}
                                onKeyDown={(e) => this.handleSubmit(e)}
                                disabled={blockInput}


                            />
                        :
                            <TextField
                                inputRef={this.refPassword}
                                onChange={(e) => this.setState({passwordInput: e.target.value})}
                                id="outlined-password-helper-text"
                                label={"Password:"}
                                variant={"outlined"}
                                required={true}
                                type={"password"}
                                onKeyDown={(e) => this.handleSubmit(e)}
                                disabled={blockInput}


                            />
                        }
                    </div>
                    <Typography variant={'subtitle1'} >
                    {emailInput.length > 5 && passwordInput.length > 3 ? 
                        <div 
                            className={classes.alert}
                            onClick={(e) => this.handleSubmit(e)}
                        >press enter to confirm</div>
                    :
                        undefined}
                    
                        <Link className={classes.support}>reset password</Link>
                    </Typography>
                </form >
            </Paper>
        </>
        }
        </>
    );}
}


const mapStateToProps = (state) => ({
    user: state.auth.user,
    error: state.auth.error,
    status: state.auth.STATUS
})

const mapDispatchToProps = dispatch => ({
    signIn: (email, password) => dispatch(signIn(email, password)),
    signOut: () => dispatch(signOut())
})

export const SignInWithStyles = withStyles(styles, {withTheme: true})(SignIn);
export default connect(mapStateToProps, mapDispatchToProps)(SignInWithStyles);