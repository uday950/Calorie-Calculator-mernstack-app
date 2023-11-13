import {updateHeaderOptions} from './updateHeaderOptions'

//Create new foodDetails
export async function createFoodDetailsAPI(foodDescription) {
    
    const result = await fetch('/api/foodDetails/newFood', {
        method: 'POST',
        body: JSON.stringify(foodDescription),
        headers: {
            'Content-Type': 'application/json',
            token: window.localStorage.getItem("token"),
        }
    });

    updateHeaderOptions(window.localStorage.getItem("token"));

    const data = await result.json();

    return data;
}

//GET food deatils by food id
export async function getFoodDetailsAPI(foodId) {
    // console.log('fetch',fetchHeaderOptions());
    const result = await fetch('/api/foodDetails/details/' + foodId, {
        headers: {
            'Content-Type': 'application/json',
            token: window.localStorage.getItem("token"),
        }
    });

    updateHeaderOptions(window.localStorage.getItem("token"));

    const data = await result.json();
    // console.log('getFoodDetailsAPI data', data);

    return data;
}