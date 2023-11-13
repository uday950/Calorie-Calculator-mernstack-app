import React, { useState } from 'react';
import {Link} from "react-router-dom";
import { useHistory, useLocation } from "react-router-dom";
import { signUpAPI } from '../api/userAPI'

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import MuiAlert from '@material-ui/lab/Alert';



const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
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
      marginTop: theme.spacing(3),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
    container: {
        backgroundColor: theme.palette.background.default,
        borderRadius:"3%",
    },
    Btn: {
        fontSize:11,
        backgroundColor: theme.palette.background.default,
        color: '#3f51b5',
        fontFamily: 'inherit'
    }
  }));

const SignUp = () => {
    const classes = useStyles();

    let history = useHistory();

    const [alert, setAlert] = useState(false);
    const [errors, setErros] = useState('')

    const closeAlert = () =>{
        setAlert(false)
    }

    const [newUser, setNewUser] = useState({
        userName: "",
        password: "",
        currentWeight: "",
        goalWeight: "",
        height: "",
    });

    const[gender, setGender]= useState("")

    const updateUserDetails = (e) =>{

        const name = e.currentTarget.name;
        const value = e.target.value;       
        let obj = {...newUser}
        obj[name] = value;
        setNewUser(obj); 
    }

    const handleChange = (e) =>{
        setGender(e.target.value)
    }

    const handleClick = (e) => {
       console.log('e', e)
       e.preventDefault();

        signUpAPI({
            username: newUser.userName,
            password: newUser.password,
            currentWeight: newUser.currentWeight,
            goalWeight: newUser.goalWeight,
            height: newUser.height,
            gender: gender
        }).then(() => {

            history.push('/login');

        }).catch(e => {
            if(e){
                setErros(e);
                setAlert(true);
            }
            console.log('erroe',e);
            //do something to tell user it failed
        })
    }


    return (
            <Container className={classes.container} component="main" maxWidth="xs">
              <CssBaseline />
              {alert && <MuiAlert onClose={closeAlert} severity="error">{errors}</MuiAlert>}
              <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                  <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                  Sign up
                </Typography>
                <form className={classes.form} noValidate>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField onChange={updateUserDetails}
                        // autoComplete="userName"
                        name="userName"
                        variant="outlined"
                        required
                        fullWidth
                        id="userName"
                        label="Username"
                        autoFocus
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField onChange={updateUserDetails}
                        variant="outlined"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        // autoComplete="password"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField onChange={updateUserDetails}
                        variant="outlined"
                        fullWidth
                        id="currentWeight"
                        label="Current Weight(kg)"
                        name="currentWeight"
                        autoComplete="currentWeight"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField onChange={updateUserDetails}
                        variant="outlined"
                        fullWidth
                        id="goalWeight"
                        label="Goal Weight(kg)"
                        name="goalWeight"
                        autoComplete="goalWeight"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField onChange={updateUserDetails}
                        variant="outlined"
                        fullWidth
                        id="height"
                        label="Height(cm)"
                        name="height"
                        autoComplete="height"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                    <FormControl component="fieldset" onChange={handleChange}>
                        <FormLabel component="legend">Gender</FormLabel>
                        <RadioGroup row aria-label="gender">
                            <FormControlLabel name="gender" value="female" control={<Radio />} label="Female" />
                            <FormControlLabel name="gender" value="male" control={<Radio />} label="Male" />
                        </RadioGroup>
                        </FormControl>
                    </Grid>
                  </Grid>
                  <Button onClick={handleClick}
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                  >
                    Sign Up
                  </Button>
                  <Grid container justify="flex-end">
                    <Grid item>
                    <Link to={'/login'} variant="body2">
                        <Button className={classes.Btn}>Already have an account?Login</Button>
                    </Link>
                    </Grid>
                  </Grid>
                </form>
              </div>
            </Container>
    );
}

export default SignUp;