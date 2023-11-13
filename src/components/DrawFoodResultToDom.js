import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import { ListGroup, ListGroupItem } from 'reactstrap';
import DayPlanModal from './DayPlanModal';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '80%',
        // maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
        alignItems: 'center',
        margin:'auto',
        // display: 'flex',
    },
}));


const DrawFoodResultToDom = ({foodDetails, key, date, getDayPlanAPI, setOpen}) => {
    const classes = useStyles();

    const [showModal, setShowModal] = useState(false);

    const handleClick = () => {
        setShowModal(true);
        //redirect to FoodDiary route

        console.log('link clicked');

    }

    return (
            <div className={classes.root} key={key}>
                <List component="nav" aria-label="secondary mailbox folders">
                    <ListItem button onClick={handleClick}>
                        <ListItemText primary={foodDetails.food_name} />
                    </ListItem>
                    <ListItem>
                        <ListItemText primary={foodDetails.food_description} />
                    </ListItem>
                </List>
                <Divider />
            <DayPlanModal foodDetails={foodDetails} showModal={showModal} setShowModal={setShowModal} getDayPlanAPI={getDayPlanAPI} setOpen={setOpen}/>
        </div>
    );
};

export default DrawFoodResultToDom;
