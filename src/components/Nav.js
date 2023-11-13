import React,{useState} from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
  useLocation,
  Redirect
} from "react-router-dom";
import Home from './Home';
import { Login, fakeAuth } from "./Login";
import FoodDiary from './FoodDiary';

//Material UI imports
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import { red } from "@material-ui/core/colors";
import SignUp from "./SignUp";
import ColoredDateCellWrapper from './Calendar'
import MyCalendar from "./Calendar";
import CustomizedTables from './Example'
import Example from "./Example";
import Chip from '@material-ui/core/Chip';




const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 3,
  },
  loginBtn:{
  color: 'white',
  },
  push:{
    marginLeft: 'auto',
  },
  nav:{
    backgroundSize: '100vh',
  }
}));

const isLoggedIn = () =>{
  if(window.localStorage.getItem("token")) {
    return true
  } else{
    return false
  }
}

export function Nav() {

  const classes = useStyles();
  const [loggedIn, setLoggedIn] = useState(isLoggedIn);
  // console.log('logedin', loggedIn);
  const [msg, setMsg] = useState("");

  let history = useHistory();

  const handleLogout = () =>{
    window.localStorage.removeItem('token');
    window.localStorage.removeItem('userId');
    setLoggedIn(false);

    window.location.replace('/');
  }

  return (
    <Router>
      <div className={classes.nav}>
        <div className={classes.root}>
          <AppBar position="static">
            <Toolbar>
              <Link to="/">
                <Button className={classes.loginBtn} color="inherit">Home</Button>
              </Link>
              <Link to="/foodDiary">
                <Button className={classes.loginBtn} color="inherit">Food Diary</Button>
              </Link>
              <Link to="/weightHistory">
                <Button className={classes.loginBtn} color="inherit">Weight History</Button>
              </Link>
              <Link to="/dietCalendar">
                <Button className={classes.loginBtn} color="inherit">Diet Calendar</Button>
              </Link>
              {loggedIn && <Chip className={classes.push} label={`Hi, ${window.localStorage.getItem('userName')}`} />}
              {loggedIn && <Link to="/logout">
              <Button className={classes.loginBtn} color="inherit" onClick={handleLogout}>Logout</Button>
              </Link>}
              {!loggedIn && <Link className={classes.push} to="/signup">
                <Button className={classes.loginBtn} color="inherit">sign Up</Button>
              </Link>}
              {!loggedIn && <Link to="/login">
              <Button className={classes.loginBtn} color="inherit">Login</Button>
              </Link>}
            </Toolbar>
          </AppBar>
        </div>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/foodDiary/:date?">
          {loggedIn ? <FoodDiary /> : <Redirect to='login' />}
          </Route>
          <Route path="/weightHistory">
          {loggedIn ? <WeightHistory /> : <Redirect to='login' />}
          </Route>
          <Route path="/dietCalendar">
          {loggedIn ? <DietCalendar /> : <Redirect to='login' />}
          </Route>
          <Route path="/signup">
            <SignUp />
          </Route>
          <Route path="/login">
            <Login loginStatus={setLoggedIn}/>
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>

  );
}


function WeightHistory() {
  return (
    <Example/>
  )
}

function DietCalendar() {
  return (
    <MyCalendar />
  );
}




