import React from "react";
import DrawFoodResultToDom from "./DrawFoodResultToDom";

const SearchResult = ({foodResult, date, getDayPlanAPI, setOpen}) => {

    // console.log("searchresult props",props);

    return (
        <React.Fragment>
            <div>
                {foodResult.map((food) => {
                    // console.log('food', food);
                    return (
                        <DrawFoodResultToDom foodDetails={food} key={food.food_id} date={date} getDayPlanAPI={getDayPlanAPI} setOpen={setOpen}/>
                    )
                })}
            </div>
        </React.Fragment>

    )
}

export default SearchResult;

