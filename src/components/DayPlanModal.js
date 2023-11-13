import React, { useState, useContext } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Label, Form, FormGroup } from 'reactstrap';
import { useHistory } from "react-router-dom";
import { splitFoodDesc, splitByColon } from '../utils/splitFoodDesc';
import { createDayPlanAPI } from '../api/DayPlanAPI';
import { createFoodDetailsAPI } from '../api/foodDetailsAPI'
import DayPlanForm from './DayPlanForm';
import { splitfunction } from '../utils/splitFoodDesc';
import { useAppContext } from './context/AppContext';

import MuiAlert from '@material-ui/lab/Alert';

let dayPlanFormValue = {
    date: "",
    meal: {
        breakfast: 0,
        lunch: 0,
        dinner: 0,
        snack: 0
    }
};

const DayPlanModal = ({ foodDetails, showModal, setShowModal, getDayPlanAPI, setOpen }) => {
    // console.log('dayplanmodaldate', date);

    const appContext = useAppContext();
    const { date, setDate, setAddMealSearchModal, setReloadSameDateDayPlan } = appContext

    let history = useHistory();

    //split food desc and capture food deatils value
    const splitArray = splitfunction(foodDetails.food_description);
    // console.log('splitArray', splitArray);
    //take kcal out of calories
    const calories = splitArray[2].toString().split('kcal');





    const toggle = () => setShowModal(!showModal);

    // console.log('dayPlanFormValue',dayPlanFormValue);

    const [breakfastFoodId, setbreakfastFoodId] = useState('');
    const [lunchFoodId, setLunchFoodId] = useState('');
    const [dinnerFoodId, setDinnerFoodId] = useState('');
    const [snackFoodId, setSnackFoodId] = useState('');


    const onChangeDayPlanFormValue = (dayPlanData) => {
        dayPlanFormValue = dayPlanData;
        //    console.log('dayplandata', dayPlanData);
        dayPlanData.meal.breakfast > 0 && setbreakfastFoodId(foodDetails.food_id);
        dayPlanData.meal.lunch > 0 && setLunchFoodId(foodDetails.food_id);
        dayPlanData.meal.dinner > 0 && setDinnerFoodId(foodDetails.food_id);
        dayPlanData.meal.snack > 0 && setSnackFoodId(foodDetails.food_id);
    }

    //handle Errors
    const [error, setError] = useState(false);
    const closeError = () => {
        setError(false)
        history.push('/login');
    }

    const handleFormSubmit = (e) => {
        // console.log('e', e)
        e.preventDefault();

        if (!window.localStorage.token) {
            setError(true);
            console.log('login first')
        } else {
            //Add chosen food into meal plan
            createDayPlanAPI({
                userId: localStorage.getItem('userId'),
                date: dayPlanFormValue.date,
                meal: {
                    breakfast: [{ foodId: breakfastFoodId, servingSize: dayPlanFormValue.meal.breakfast }],
                    lunch: [{ foodId: lunchFoodId, servingSize: dayPlanFormValue.meal.lunch }],
                    dinner: [{ foodId: dinnerFoodId, servingSize: dayPlanFormValue.meal.dinner }],
                    snack: [{ foodId: snackFoodId, servingSize: dayPlanFormValue.meal.snack }]
                }

            }).then((result) => {
                console.log('food added');
                toggle();
                setAddMealSearchModal(false);
                console.log("dayplan data date", dayPlanFormValue.date);
                if(dayPlanFormValue.date === date){
                    setReloadSameDateDayPlan(true)
                }
                setDate(dayPlanFormValue.date);

                //redirect to food diary after creating the new foodDiary from Home page
                history.push('/foodDiary');

            }).catch(e => {
                console.log("dayplan modal error", e);
            });

            //add chosen food to food details
            createFoodDetailsAPI({
                food_id: foodDetails.food_id,
                food_name: foodDetails.food_name,
                food_type: foodDetails.food_type,
                calories: calories[0],
                fat: splitArray[4][0],
                carbs: splitArray[6][0],
                protein: splitArray[8][0]
            })
        }
    }




    return (
        <Form>
            <Modal isOpen={showModal} toggle={toggle} style={{ zIndex: 99 }}>
            {error && <MuiAlert onClose={closeError} severity="error">Please login</MuiAlert>}
                <ModalHeader toggle={toggle}>
                    <h3>Nutrition Facts</h3>
                    {foodDetails.food_name}
                </ModalHeader>
                <ModalHeader>
                    <h5>Food Description per 100g: </h5>
                    <h6>Food Type: {foodDetails.food_type}</h6>
                    {splitFoodDesc(foodDetails.food_description).map((details) => {
                        return (
                            <h6>{details}</h6>
                        )
                    })}

                </ModalHeader>
                <ModalBody>
                    <DayPlanForm foodId={foodDetails.food_id} onChangeDayPlanFormValue={onChangeDayPlanFormValue} date={date} />
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={handleFormSubmit}>Save</Button>{' '}
                    <Button color="secondary" onClick={toggle}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </Form>

    );
}

export default DayPlanModal;