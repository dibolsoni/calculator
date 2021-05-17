//import { render } from "../../test-utils"
import {SignInWithStyles} from "."
import { render, fireEvent } from "@testing-library/react"
import {initialState, STATUS} from '../../store/auth/authReducer'
import { ThemeProvider } from '@material-ui/styles';
import theme from '../../customTheme'
import React from 'react';
import { ERRORS } from "../../constants";

const handleSignIn = jest.fn()

const renderSignIn =  (
    signIn = handleSignIn,
    initState = initialState,
    props = {}
) => render( 
    <ThemeProvider theme={theme}>
        <SignInWithStyles 
            {...initState}
            signIn={signIn} 
            {...props} 
        />
    </ThemeProvider>
)



describe('SignIn', () => {
    test('renders with inputs', () => {
        const {getByText, getByLabelText} = renderSignIn()
        expect(getByText("Sign In")).toBeInTheDocument()
        getByLabelText(/email:/gi);
        getByLabelText(/password:/gi)
    })

    test('sign in with correctly user and pass', () => {
        const handleSignIn = jest.fn()
        const {getByText, getByLabelText} = renderSignIn(handleSignIn)
        expect(getByText("Sign In")).toBeInTheDocument()
        const emailInput = getByLabelText(/email:/gi);
        fireEvent.change(emailInput, {target: {value: 'dibolsoni@gmail.com'}})
        expect(emailInput.value).toBe('dibolsoni@gmail.com')
        const passwordInput = getByLabelText(/password:/gi)
        fireEvent.change(passwordInput, {target: {value: '123321'}})
        expect(passwordInput.value).toBe('123321')
        fireEvent.keyDown(passwordInput, {key: 'Enter', code: 'Enter'})
        expect(handleSignIn).toHaveBeenCalled();
    })

    test('user not found', () => {
        const handleSignIn = jest.fn();
        const {getByText, getByLabelText} = renderSignIn(
            handleSignIn,
            undefined,
            {
                status: STATUS.rejected,
                error: ERRORS.auth.userNotFound
            }
        )
        getByLabelText(/email-error:/gi);
        getByText(ERRORS.auth.userNotFound.message);
        
    })

    test('password incorrectly', () => {
        const handleSignIn = jest.fn();
        const {getByText, getByLabelText} = renderSignIn(
            handleSignIn,
            undefined,
            {
                status: STATUS.rejected,
                error: ERRORS.auth.passwordIncorrect
            }
        )
        getByLabelText(/password-error:/gi);
        getByText(ERRORS.auth.passwordIncorrect.message);
        
    })
})