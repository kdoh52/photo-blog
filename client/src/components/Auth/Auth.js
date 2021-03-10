import React, { useState } from 'react';
import { Avatar, Button, Paper, Grid, Typography, Container } from "@material-ui/core";
import Input from "./Input";
import { GoogleLogin } from "react-google-login";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { signup, signin } from "../../actions/auth";

import useStyles from "./styles";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Icon from "./icon";

// ensure the variable names here are same as 'name' props in input fields
const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' }

export default function Auth() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();

    const [formData, setFormData] = useState(initialState);
    const [showPassword, setShowPassword] = useState(false);
    const [isSignup, setIsSignup] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        // include history to allow for navigation
        if (isSignup) {
            dispatch(signup(formData, history));
        } else {
            dispatch(signin(formData, history));
        }
    }

    const handleChange = (e) => {
        // set form data to itself while changing only one field
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleShowPassword = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword)
    }

    const switchMode = () => {
        setIsSignup((prevIsSignup) => !prevIsSignup);
        setShowPassword(false)
    }

    const googleSuccess = async (res) => {
        // use ? after res to prevent error if no res object
        const result = res?.profileObj;
        const token = res?.tokenId;

        try {
            dispatch({ type: "AUTH", data: { result, token } });

            history.push('/')
        } catch (error) {
            console.log(error)
        }
    }

    const googleFailure = (err) => {
        console.log(err)
        console.log("Google Sign In was unsuccessful. Try again later.")
    }

    return (
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography variant="h5">{isSignup ? "Sign up" : "Sign in"}</Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {
                            isSignup && (
                                <>
                                    <Input name='firstName' label='First Name' handleChange={handleChange} autoFocus half/>
                                    <Input name='lastName' label='Last Name' handleChange={handleChange} half/>
                                </>
                            )
                        }
                        <Input name='email' label='Email' handleChange={handleChange} type="email"/>
                        <Input name='password' label='Password' handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword}/>
                        { isSignup && <Input name='confirmPassword' label="Confirm Password" handleChange={handleChange} type="password"/>}
                    </Grid>

                    <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                        { isSignup ? "Sign up" : "Sign in"}
                    </Button>
                    <GoogleLogin
                        clientId="510024147913-n1nlp0m7fealf8jh8fpaj06tnde04i2f.apps.googleusercontent.com"
                        render={(renderProps) => (
                            <Button className={classes.googleButton} color="primary" fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon/>} variant="contained">
                                Google Sign In
                            </Button>
                        )}
                        onSuccess={googleSuccess}
                        onFailure={googleFailure}
                        cookiePolicy="single_host_origin"
                    />

                    <Grid container justify="flex-end">
                        <Grid item>
                            <Button onClick={switchMode}>
                                { isSignup ? "Already have an account? Sign In" : "Don't have an account? Sign up"}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    )
}
