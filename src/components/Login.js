import React, { useState } from 'react';
import { useHistory, useLocation } from "react-router-dom";
import { loginAPI } from '../api/userAPI';
import jwt from 'jwt-decode';
import {Link} from "react-router-dom";

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import MuiAlert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(12),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingBottom: "10px"
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    Btn: {
        fontSize:11,
        backgroundColor: theme.palette.background.default,
        color: '#3f51b5',
        fontFamily: 'inherit',
    },
    container: {
        backgroundColor: theme.palette.background.default,
        borderRadius:"3%",
    },
    sinupGrid:{
        marginLeft: 'auto'
    }
}));

export function Login(props) {
    const classes = useStyles();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [alert, setAlert] = useState(false);
    const [errors, setErros] = useState('')


    let history = useHistory();

    const closeAlert = () =>{
        setAlert(false)
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        loginAPI({
            username: username,
            password: password
        }).then((token) => {
            console.log(token);
            const decoded = jwt(token);
            console.log(decoded);

            const expiaryDate = new Date(decoded.exp*1000);
            console.log('expiary date', expiaryDate)

            //save token in local storage
            localStorage.setItem('token', token);
            localStorage.setItem('userId', decoded.id);
            localStorage.setItem('userName', decoded.username);

            props.loginStatus(true);

            history.push('/');

        }).catch((e) => {
            if(e){
                setErros(e);
                setAlert(true);
            }
            console.log('catch error',e);
            //do something to tell user it failed
        })

    }

    return (
        <Container className={classes.container} component="main" maxWidth="xs">
            <CssBaseline />
            {/* {alert && <MuiAlert onClose={closeAlert} severity="error">{errors}</MuiAlert>} */}
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Log in
                </Typography>
                <form className={classes.form} noValidate onSubmit={handleSubmit}>
                    <TextField onChange={(e)=>setUsername(e.currentTarget.value)}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="Username"
                        name="username"
                        autoComplete="username"
                        autoFocus
                    />
                    <TextField onChange={(e)=>setPassword(e.currentTarget.value)}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Log In
                    </Button>
                    <Grid container>
                        {/* <Grid item xs>
                            <Link href="#" variant="body2">
                                Forgot password?
                            </Link>
                        </Grid> */}
                        <Grid className={classes.sinupGrid} item>
                        <Link to={'/signup'} variant="body2">
                            <Button className={classes.Btn}>Don't have an account? SignUp</Button>
                        </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    )
}



