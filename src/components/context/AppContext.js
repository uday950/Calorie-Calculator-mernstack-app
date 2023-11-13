import React, { useState, createContext, useContext } from 'react';
import moment from 'moment';

const AppContext = createContext();
const AppProvider = (props) =>{


    const [addMealSearchModal, setAddMealSearchModal] = useState(false);

    //that get used when user add new food with the same date whihc will trigger useeffect
    const [reloadSameDateDayPlan, setReloadSameDateDayPlan] =useState (false); 

    const changeISOformat = moment().format('YYYY-MM-DD');
    const [date, setDate] = useState(changeISOformat);

    return (
        <AppContext.Provider value={{addMealSearchModal,setAddMealSearchModal, date, setDate, reloadSameDateDayPlan, setReloadSameDateDayPlan }}>
            {props.children}
        </AppContext.Provider>
    )
}

const useAppContext = () =>{
    const context = useContext(AppContext)
    return context
}

export {AppProvider, useAppContext}


