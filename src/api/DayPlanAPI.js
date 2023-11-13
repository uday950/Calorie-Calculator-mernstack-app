import {updateHeaderOptions} from './updateHeaderOptions'

//Create new dayplan
export async function createDayPlanAPI(food) {
    
    const result = await fetch('/api/food/newDayPlan', {
        method: 'POST',
        body: JSON.stringify(food),
        headers: {
            'Content-Type': 'application/json',
            token: window.localStorage.getItem("token"),
        }
    });

    updateHeaderOptions(window.localStorage.getItem("token"));

    const data = await result.json();

    return data;
}

//Update dayPlan
export async function upadteDayPlanAPI(food) {
    
    const result = await fetch('/api/food/updateDayPlan', {
        method: 'POST',
        body: JSON.stringify(food),
        headers: {
            'Content-Type': 'application/json',
            token: window.localStorage.getItem("token"),
        }
    });

    updateHeaderOptions(window.localStorage.getItem("token"));

    const data = await result.json();

    return data;
}

//Get dayPlan
export async function getDayPlanAPI(date) {
    
    const result = await fetch('/api/food/dayPlan', {
        method: 'POST',
        body: JSON.stringify({date:date}),
        headers: {
            'Content-Type': 'application/json',
            token: window.localStorage.getItem("token"),
        }
    });

    updateHeaderOptions(window.localStorage.getItem("token"));

    const data = await result.json();
    // console.log('getdayplanapi date', data);

    return data;
}

// Get all dayPlan for a user
export async function getAllDayPlanAPI(userId) {
    
    const result = await fetch('/api/food/allDayPlan', {
        headers: {
            'Content-Type': 'application/json',
            token: window.localStorage.getItem("token"),
        }
    });

    updateHeaderOptions(window.localStorage.getItem("token"));

    const data = await result.json();

    return data;
}

//delete food from a meal
export async function deletfoodAPI(foodDetails){
    const result = await fetch('/api/food/deleteFood',{
        method: 'DELETE',
        body: JSON.stringify(foodDetails),
        headers: {
            'Content-Type': 'application/json',
            token: window.localStorage.getItem("token"),
        }
    });

    updateHeaderOptions(window.localStorage.getItem("token"));
    
    const data = await result.json();

    return data;
}
