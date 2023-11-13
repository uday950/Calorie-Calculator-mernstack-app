import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Search from './Search';

const useStyles = makeStyles((theme) => ({
    outerDiv:{
        // backgroundSize:'auto 100%',
        // width:'100%',
        // height: '100vh',
    }
}));

const Home = (props) => {

    const classes = useStyles();

    const backgroundImg = require('./images/picture1.jpg');

    return (
        <div className={classes.outerDiv} >
            <div className={classes.secondDiv}>
            <Search /> 
            </div>
        </div>
    )
}

export default Home;