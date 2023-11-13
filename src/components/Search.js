import React, { useState } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import searchAPI from '../api/searchAPI';
import SearchResult from './SearchResult';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import DirectionsIcon from '@material-ui/icons/Directions';
import picture1 from './images/picture1.jpg';
import CircularProgress from '@material-ui/core/CircularProgress';


const useStyles = makeStyles((theme) => ({
    root: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: '80%',
        margin: '40px auto',
        // '& > * + *': {
        //     marginLeft: theme.spacing(2),
        //   }
        // marginTop: 50,
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
    },
    iconButton: {
        padding: 10,
        outlineColor: 'white',
    },
    divider: {
        height: 28,
        margin: 4,
    },
    circularProgress: {
        display: 'flex',
        '& > * + *': {
            marginLeft: theme.spacing(2),
        },
    }
    // outerDiv:{
    //     backgroundSize:'cover',
    //     width:'100%',
    //     height: 500,
    // }
}));

const Search = ({ getDayPlanAPI, setOpen }) => {
    const classes = useStyles();

    const [searchItem, setSearchItem] = useState("");
    const [searchResult, setSearchResults] = useState([]);
    const [circleProgress, setCircleProgress] = useState(false);


    const handleSearchEntry = (e) => {
        setSearchItem(e.currentTarget.value);
    }

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchItem) {
            setCircleProgress(true);
            searchAPI(searchItem)
                .then((result) => {
                    setCircleProgress(false);
                    // console.log('result',result);
                    setSearchResults(result);
                });
        }
    }

    const backgroundImg = require('./images/picture1.jpg');

    return (
        <React.Fragment >
            <div className={classes.outerDiv}>
                {/* <div className={classes.outerDiv} style ={ { backgroundImage: "url("+backgroundImg+")" } }> */}
                {/* <img src={require('./images/picture1.jpg')} ></img> */}
                <Form onSubmit={handleSearchSubmit}>
                    <Paper component="form" className={classes.root}>
                        <InputBase
                            className={classes.input}
                            placeholder="Search Food"
                            onChange={handleSearchEntry}
                            value={searchItem}
                        // inputProps={{ 'aria-label': 'search google maps' }}
                        />
                        <IconButton type="submit" className={classes.iconButton} aria-label="search">
                            {circleProgress ? <div className={classes.circularProgress}><CircularProgress size={20} /></div> : <SearchIcon />}
                        </IconButton>
                    </Paper>
                    <SearchResult foodResult={searchResult} getDayPlanAPI={getDayPlanAPI} setOpen={setOpen} />
                </Form>
                {/* </div> */}
            </div>
        </React.Fragment>

    )
}

export default Search;
