import React, {useEffect, useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Search from './Search';

  
  const useStyles = makeStyles((theme) => ({
    paper: {
      position: 'absolute',
      margin: 'auto',
      position: 'center',
      width: '80%',
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      overflow:'scroll',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      height: '100%',
    },
  }));

const SearchModal = ({showModal, hideModal, getDayPlanAPI}) =>{


    const classes = useStyles();
    // getModalStyle is not a pure function, we roll the style only on the first render
    // const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = React.useState(false);
  
    const handleOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
      hideModal(false);
    };

    useEffect(()=>{
        if(showModal){
            setOpen(true)   
        }else{
            setOpen(false)
        }
    },[showModal])
  
  
    return (
          <Modal style={{zIndex: 80}}
            open={open}
            onClose={handleClose}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
          >
              <div className={classes.paper}>
              <Search getDayPlanAPI={getDayPlanAPI} setOpen={setOpen}/>
              </div>
          </Modal>
      );
    
}


export default SearchModal;