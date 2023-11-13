import React, { useState, useEffect, createContext } from 'react';
import { useHistory, useParams } from 'react-router-dom';
//Import for material UI
import { withStyles, makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import moment from 'moment';
import { getDayPlanAPI } from '../api/DayPlanAPI';
import Alert from '@material-ui/lab/Alert';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Chip from '@material-ui/core/Chip';

import FoodDiaryTable from './FoodDiaryTable';
import SearchModal from './SearchModal';
import { useAppContext } from './context/AppContext'


const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        marginLeft: 50,
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
    },
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    chip: {
        margin: 'auto'
    }
    },
}));


const FoodDiary = (props) => {

    const appContext = useAppContext();
    const { date, setDate, addMealSearchModal, setAddMealSearchModal, reloadSameDateDayPlan } = appContext

    const history = useHistory();
    // console.log('history', history);
    const params = useParams();
    // console.log('prams', params);
    // const changeISOformat = moment().format('YYYY-MM-DD');
    // const [date, setDate] = useState(changeISOformat);
    const [error, setError] = useState(false);
    const [dayPlanResult, setDayPlanResult] = useState([]);

    const classes = useStyles();

    const handleDate = e => {
        e.preventDefault();
        let value = e.target.value;
        setDate(value);
        setDayPlanResult([]);
        console.log('food diary date', value);
    }


    useEffect(() => {
        if (params.date) {
            setDate(params.date)
        }
    }, [])

    useEffect(() => {
        // console.log('date before', date);
        if (date || reloadSameDateDayPlan === true) {
            console.log('food diary useeffect', date);
            getDayPlanAPI(date).then((result) => {
                // console.log('result', result);
                setDayPlanResult(result);
                if (result.length < 1) {
                    setError(true);
                } else {
                    setError(false);
                }
            })
        }
    }, [date, reloadSameDateDayPlan])

    const handleAddClick = () => {
        setAddMealSearchModal(true);

    }

    const renderError = () => {

        return (
            <>
                <SearchModal showModal={addMealSearchModal} hideModal={setAddMealSearchModal} date={date} />
                <Alert severity="error">There is no Food Diary for the chosen date, please choose another date</Alert>
                <div className={classes.root}>
                    <Button variant="contained" color="primary" onClick={handleAddClick}>Add Meal</Button>
                </div>
            </>
        )
    }

    return (
        <>
            <h2>My Food Diary</h2>
            <div className={classes.container}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            id="date"
                            label="Choose Date"
                            type="date"
                            value={date}
                            onChange={handleDate}
                            className={classes.textField}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </Grid>
                {/* </Grid > */}
                {/* <Grid container spacing={2}> */}
                    <Grid item xs={12} sm={6}>
                        <div className={classes.chip}> 
                            <Chip  label="Total calories: " />
                        </div>
                    </Grid>
                </Grid >
            </div>
                {error ? renderError() : <FoodDiaryTable dayPlanResult={dayPlanResult} getDayPlanAPI={getDayPlanAPI} renderError={renderError} setDayPlanResult={setDayPlanResult} />}
        </>
    )
}

export default FoodDiary;


