import React, {useState, useRef} from 'react';
import {makeStyles} from "@material-ui/core/styles";

import {connect} from 'react-redux';
import {closeMessage, handleLogin, openMessage} from '../../ReduxActions';

import {Container} from "@material-ui/core";
import {Link} from "react-router-dom";
import {Typography} from "@material-ui/core";

import {Button} from "@material-ui/core";
import {CircularProgress} from "@material-ui/core";

import {CustomTextField} from "../../Components/CustomTextField";

import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';

import axios from 'axios';

import './SignInPage.scss';

import {BACKEND_URL} from "../../secrets";

import Grid from "@material-ui/core/Grid";

import {SignInTranslation} from "./SignInTranslation";


let cloneDeep = require('lodash.clonedeep');


const useStyles = makeStyles(theme => ({
    title: {
        display: "block",
        textAlign: "center",
        marginBottom: theme.spacing(2),
    },
    link: {
        textDecoration: "none",
        display: "block"
    },
    button: {
        color: "white"
    },
    textField: {
        marginBottom: theme.spacing(1)
    },
    wrapper: {
        marginTop: theme.spacing(1),
        marginLeft: theme.spacing(0.5),
        marginRight: theme.spacing(0.5),
        position: 'relative',
    },
    buttonProgress: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
    },
    snackbar: {
        margin: theme.spacing(1)
    },
    snackbarContentError: {
        backgroundColor: theme.palette.primary.main,
    },
    snackbarContentSuccess: {
        backgroundColor: theme.palette.secondary.main,
    },
    switchLink: {
        marginTop: theme.spacing(2),
        textAlign: "center",
    },
    formContainer: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
    },
    divider: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
    },
}));


export function RegisterPageComponent(props) {

    const classes = useStyles();

    const emailInputRef = useRef(null);
    const passwordInputRef = useRef(null);
    const passwordConfirmationInputRef = useRef(null);
    const zipInputRef = useRef(null);
    const countryInputRef = useRef(null);

    let [state, changeState] = useState({
        formData: {
            email: "",

            password: "",
            passwordConfirmation: "",

            zip: "",
            country: SignInTranslation.germany[props.language],
        },
        loading: false,
    });

    function handleFormChange(newFormData) {
        props.closeMessage();
        let newState = cloneDeep(state);

        ["email", "password", "passwordConfirmation", "zip", "country"].forEach(key => {
            newState.formData[key] = key in newFormData ? newFormData[key] : newState.formData[key];
        });

        newState.loading = false;
        changeState(newState);
    }

    function startLoading() {
        props.closeMessage();
        blurAll();

        let newState = cloneDeep(state);
        newState.loading = true;
        changeState(newState);
    }

    function validation() {

        let formValid = true;

        ["email", "password", "passwordConfirmation", "zip", "country"].forEach(key => {
            if (state.formData[key] === "") {
                props.openMessage(SignInTranslation.fieldEmpty[props.language]);
                formValid = false;
            }
        });

        if (formValid) {
            if (state.formData["password"] !== state.formData["passwordConfirmation"]) {
                props.openMessage(SignInTranslation.passwordConfirmationMatch[props.language]);
                formValid = false;
            }
        }

        if (formValid) {
            if (state.formData["password"].length < 8) {
                props.openMessage(SignInTranslation.passwordTooShort[props.language]);
                formValid = false;
            }
        }

        return formValid;
    }

    function handleRegister() {

        if (validation()) {
            startLoading();
            props.closeMessage();

            axios.post(BACKEND_URL + "database/helper", {
                email: state.formData.email,
                password: state.formData.password,

                zip_code: state.formData.zip,
                country: SignInTranslation.germany[props.language],
            })
                .then(response => {

                    setTimeout(() => {
                        switch (response.data.status) {
                            case "ok":
                                props.handleLogin(response);
                                break;
                            case "email format invalid":
                                openMessage(SignInTranslation.emailInvalid[props.language]);
                                break;
                            case "password format invalid":
                                openMessage(SignInTranslation.passwordInvalid[props.language]);
                                break;
                            case "zip code format invalid":
                                openMessage(SignInTranslation.zipCodeInvalid[props.language]);
                                break;
                            case "country invalid":
                                openMessage(SignInTranslation.countryInvalid[props.language]);
                                break;
                            case "email already taken":
                                openMessage(SignInTranslation.emailTaken[props.language]);
                                break;
                            default:
                                console.log(response.data);
                                props.openMessage(SignInTranslation.defaultError[props.language]);
                                break;
                        }
                    }, 1000);
                }).catch(response => {
                console.log("Axios promise rejected! Response:");
                console.log(response);
                props.openMessage(SignInTranslation.serverOffline[props.language]);
            });
        }
    }


    function focusEmail() {
        emailInputRef.current.focus();
    }

    function focusPassword() {
        passwordInputRef.current.focus();
    }

    function focusPasswordConfirmation() {
        passwordConfirmationInputRef.current.focus();
    }

    function focusZip() {
        zipInputRef.current.focus();
    }


    function blurEmail() {
        emailInputRef.current.blur();
    }

    function blurPassword() {
        passwordInputRef.current.blur();
    }

    function blurPasswordConfirmation() {
        passwordConfirmationInputRef.current.blur();
    }

    function blurZip() {
        zipInputRef.current.blur();
    }

    function blurCountry() {
        countryInputRef.current.blur();
    }

    function blurAll() {
        blurEmail();
        blurPassword();
        blurPasswordConfirmation();
        blurZip();
        blurCountry();
    }

    return (
        <Container maxWidth="md" className="SignInPage">
            <div className="SignInForm">
                <Typography variant="h3" className={classes.title}>{SignInTranslation.register[props.language]}</Typography>

                <Grid container spacing={1} className={classes.formContainer}>

                    <Grid item xs={12}>
                        <CustomTextField
                            required
                            ref={emailInputRef} onTab={focusPassword} onEnter={focusPassword} onEscape={blurEmail}
                            className={classes.textField} variant="outlined" label={SignInTranslation.email[props.language]} fullWidth
                            value={state.formData.email} onChange={(email) => handleFormChange({email: email})}/>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <CustomTextField
                            required type="password"
                            ref={passwordInputRef} onTab={focusPasswordConfirmation} onEnter={focusPasswordConfirmation}
                            onEscape={blurPassword}
                            className={classes.textField} variant="outlined" label={SignInTranslation.password[props.language]} fullWidth
                            value={state.formData.password}
                            onChange={(password) => handleFormChange({password: password})}/>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <CustomTextField
                            required type="password"
                            ref={passwordConfirmationInputRef} onTab={focusZip} onEnter={focusZip}
                            onEscape={blurPasswordConfirmation}
                            className={classes.textField} variant="outlined" label={SignInTranslation.confirmPassword[props.language]} fullWidth
                            value={state.formData.passwordConfirmation}
                            onChange={(passwordConfirmation) => handleFormChange({passwordConfirmation: passwordConfirmation})}/>
                    </Grid>

                    <Grid item xs={12}>
                        <div className={classes.divider}/>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <CustomTextField
                            required
                            ref={zipInputRef} onTab={focusEmail} onEnter={handleRegister} onEscape={blurZip}
                            className={classes.textField} variant="outlined" label={SignInTranslation.zipCode[props.language]} fullWidth
                            value={state.formData.zip} onChange={(zip) => handleFormChange({zip: zip})}/>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <CustomTextField
                            required disabled
                            ref={countryInputRef}
                            className={classes.textField} variant="outlined" label={SignInTranslation.country[props.language]} fullWidth
                            value={state.formData.country}/>
                    </Grid>

                </Grid>

                <div className="ButtonBox">
                    <div className={classes.wrapper}>
                        <Button variant="contained"
                                disabled={state.loading}
                                color="secondary"
                                className={classes.button}>
                            <Link to={"/"} className={classes.link}>{SignInTranslation.cancel[props.language]}</Link>
                        </Button>
                    </div>
                    <div className={classes.wrapper}>
                        <Button variant="contained"
                                disabled={state.loading}
                                color="secondary"
                                onClick={handleRegister}
                                className={classes.button}>{SignInTranslation.register[props.language]}</Button>
                        {state.loading && (
                            <CircularProgress size={24}
                                              className={classes.buttonProgress}
                                              color="secondary"/>
                        )}
                    </div>
                </div>

                <Link to={"/login"} className={classes.switchLink}>{SignInTranslation.alreadyHaveAnAccount[props.language]}</Link>
            </div>
        </Container>
    );
}


/* Redux link -------------------------------------------------------------------- */
/* Making the RouterComponent watch the loggedIn property of the store */


const mapStateToProps = state => ({
    language: state.language,
});

const mapDispatchToProps = dispatch => ({
    handleLogin: (response) => dispatch(handleLogin(response)),
    openMessage: (text) => dispatch(openMessage(text)),
    closeMessage: () => dispatch(closeMessage()),
});

export const RegisterPage = connect(mapStateToProps, mapDispatchToProps)(RegisterPageComponent);

