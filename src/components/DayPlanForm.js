import React, { useState, useEffect, useContext } from 'react';
import { Input, Label, Form, FormGroup } from 'reactstrap';
import moment from 'moment';
import {useAppContext} from './context/AppContext'

import createDayPlanAPI from '../api/DayPlanAPI';

const DayPlanForm = ({foodId, onChangeDayPlanFormValue}) => {
    // console.log('fooddairy',date);

    const [mealAndServingSize, setMealAndServingsize] = useState({
        breakfast: 0,
        lunch: 0,
        dinner: 0,
        snack: 0
    });

    const appContext = useAppContext();
    const{date} = appContext //this is shortcut for const date = searchContext.date

    // console.log('date feom dayplan form', date);


    const todayDate = moment().format("YYYY-MM-D");

    const [currentDate, setCurrentDate] = useState(date ? date : todayDate);
    // console.log('date', currentDate);


    const handleDate = e => {
        let value = e.currentTarget.value;
        setCurrentDate(value);
    }

    //for having couple of variable in one state, we need to use the spread function (...) to make a new object
    //react always like to keep the previous and have the new and always compare them togeteher
    const onChange = (e) => {
        const newMealAndServingSizes = { ...mealAndServingSize }
        newMealAndServingSizes[e.target.name] = e.target.value
        setMealAndServingsize(newMealAndServingSizes);
    }

    //now we capture everytime state changes and as setStae is a asynchronous function, if we don't put it in a useeffect, 
    //onChangeDayPlanFormValue get called before change state get captured
    useEffect(() => {
        onChangeDayPlanFormValue({
            date: currentDate,
            meal: mealAndServingSize
        })
    })



    return (
        <Form>
            <FormGroup className="mx-2" check>
                <Label for="backdrop" fdxzzx>Choose your meal by adding the Serving Size</Label>{' '}
                <FormGroup>
                    <Label >Breakfast</Label>
                    <Input  className="modalInput" type="number" min="0" name="breakfast" value={mealAndServingSize.breakfast} onChange={onChange} />
                </FormGroup>

                <FormGroup>
                <Label >Lunch</Label>
                <Input className="modalInput" type="number" min="0" name="lunch" value={mealAndServingSize.lunch} onChange={onChange} />
                </FormGroup>

                <FormGroup>
                <Label >Dinner</Label>
                <Input className="modalInput" type="number" min="0" name="dinner" value={mealAndServingSize.dinner} onChange={onChange} />
                </FormGroup>

                <FormGroup>
                <Label >Snack/Other</Label>
                <Input className="modalInput" type="number" min="0" name="snack" value={mealAndServingSize.snack} onChange={onChange} />
                </FormGroup>

                <FormGroup>
                <Label for="backdrop">Date</Label>{' '}
                <Input className="modalInput" type="date" name="date" id="backdrop" value={currentDate} onChange={handleDate}>
                </Input>
                </FormGroup>

            </FormGroup>
            {' '}
            
            {/* <FormGroup>
                <Label for="backdrop">Serving size</Label>{' '}
                <Input type="number" name="servingSize" id="backdrop" onChange={handleServingSize}>
                </Input>
            </FormGroup> */}
        </Form>
    )
}

export default DayPlanForm;

