import { makeStyles } from '@material-ui/core/styles';
import React, { useEffect, useState } from 'react';
import { getFoodDetailsAPI } from '../api/foodDetailsAPI';
import { useAppContext } from './context/AppContext';
import DrawFoodDiaryTableToDom from './DrawFoodDiaryTableToDom';


const useStyles = makeStyles({
    table: {
        minWidth: 450,
        maxWidth: 600,
        marginTop: 10,
        marginLeft: 20,
        marginBottom: 10,
        marginRight: 20,


    },
});


//having {dayPlanResult} with curley bracket is the shortcut of having props in prantesis & have // const {dayPlanResult} = props;
//if we have more props coming to this function we can separate them with comma
const FoodDiaryTable = ({ dayPlanResult, getDayPlanAPI, renderError, setDayPlanResult }) => {
    // console.log('fooddairytable props', dayPlanResult);

    const appContext = useAppContext();
    const{setReloadSameDateDayPlan} = appContext

    const classes = useStyles();

    const [mealDetailsB, setMealDetailsB] = useState([]);
    const [mealDetailsL, setMealDetailsL] = useState([]);
    const [mealDetailsD, setMealDetailsD] = useState([]);
    const [mealDetailsS, setMealDetailsS] = useState([]);


    useEffect(() => {
        if(!dayPlanResult.length){
            setMealDetailsB([]);
            setMealDetailsL([]);
            setMealDetailsD([]);
            setMealDetailsS([]);
        }
        if (dayPlanResult.length) {
            findBreakfastMeal(dayPlanResult[0]).then((mealDetailsB) => {
                // console.log('mealDetailsB', mealDetailsB);
                if (mealDetailsB.length) {
                    setMealDetailsB(mealDetailsB)
                }else{
                    setMealDetailsB([]);
                }
            });
       
            findLunchMeal(dayPlanResult[0]).then((mealDetails) => {
                // console.log('mealDetailsL', mealDetails);
                if (mealDetails.length) {
                    setMealDetailsL(mealDetails)
                }else{
                    setMealDetailsL([]);
                }
            });
       
            findDinnerMeal(dayPlanResult[0]).then((mealDetails) => {
                // console.log('mealDetailsD', mealDetails);
                if (mealDetails.length) {
                    setMealDetailsD(mealDetails)
                }else{
                    setMealDetailsD([]);
                }
            });
    
            findSnackMeal(dayPlanResult[0]).then((mealDetails) => {
                // console.log('mealDetailsS', mealDetails);
                if (mealDetails.length) {
                    setMealDetailsS(mealDetails)
                }else{
                    setMealDetailsS([]);
                }
            });
        }
        setReloadSameDateDayPlan(false);

    }, [dayPlanResult])

    // dayPlanResult.meal.breakfast[0].foodId

    const findBreakfastMeal = async (dayPlan) => {

        return Promise.all(
            dayPlan.meal.breakfast.map(async (meal) => {
                // console.log('meal breakfast', meal);
                const result = await getFoodDetailsAPI(meal.foodId)
                // console.log('result breakfast', result);
                //think about if there is no result
                return ({
                    planId: dayPlan._id,
                    mealId: meal._id,
                    mealType:"breakfast",
                    foodId: result[0].food_id,
                    name: result[0].food_name,
                    servingSize: meal.servingSize,
                    calories: result[0].calories,
                    fat: result[0].fat,
                    carbs: result[0].carbs,
                    protein: result[0].protein
                });
            }),
        )

    }

    const findLunchMeal = async (dayPlan) => {

        return Promise.all(
            dayPlan.meal.lunch.map(async (meal) => {
                // console.log('meal', meal);
                const result = await getFoodDetailsAPI(meal.foodId)
                // console.log('result', result);
                //think about if there is no result
                return ({
                    planId: dayPlan._id,
                    mealId: meal._id,
                    mealType:"lunch",
                    foodId: result[0].food_id,
                    name: result[0].food_name,
                    servingSize: meal.servingSize,
                    calories: result[0].calories,
                    fat: result[0].fat,
                    carbs: result[0].carbs,
                    protein: result[0].protein
                });
            })
        )

    }

    const findDinnerMeal = async (dayPlan) => {

        return Promise.all(
            dayPlan.meal.dinner.map(async (meal) => {
                // console.log('meal', meal);
                const result = await getFoodDetailsAPI(meal.foodId)
                // console.log('result', result);
                //think about if there is no result
                return ({
                    planId: dayPlan._id,
                    mealId: meal._id,
                    mealType:"dinner",
                    foodId: result[0].food_id,
                    name: result[0].food_name,
                    servingSize: meal.servingSize,
                    calories: result[0].calories,
                    fat: result[0].fat,
                    carbs: result[0].carbs,
                    protein: result[0].protein
                });
            })
        )

    }

    const findSnackMeal = async (dayPlan) => {

        return Promise.all(
            dayPlan.meal.snack.map(async (meal) => {
                // console.log('meal', meal);
                // console.log('dayplan', dayPlan._id);
                const result = await getFoodDetailsAPI(meal.foodId)
                // console.log('result snack', result);
                //think about if there is no result
                return ({
                    planId: dayPlan._id,
                    mealId: meal._id,
                    mealType:"snack",
                    planId: dayPlan._id,
                    foodId: result[0].food_id,
                    name: result[0].food_name,
                    servingSize: meal.servingSize,
                    calories: result[0].calories,
                    fat: result[0].fat,
                    carbs: result[0].carbs,
                    protein: result[0].protein
                });
            })
        )

    }

    return (

        <DrawFoodDiaryTableToDom
            mealDetailsB={mealDetailsB} 
            mealDetailsL={mealDetailsL} 
            mealDetailsD={mealDetailsD} 
            mealDetailsS={mealDetailsS} 
            getDayPlanAPI={getDayPlanAPI}
            renderError={renderError}
            setDayPlanResult = {setDayPlanResult}
        />
    )
}


export default FoodDiaryTable;


