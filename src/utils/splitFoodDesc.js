export function splitFoodDesc (foodDescription) {

    const foodDesc = foodDescription.split(/[|-]/);
    foodDesc.shift();
    
    return foodDesc; 

}

export function splitfunction (foodDetails) {
    const split=[];
    const firstSplit = foodDetails.split(/[|-]/);
    // console.log('firstSplit', firstSplit);
    for (let i=0; i<firstSplit.length; i++){
        const secondSplit = firstSplit[i].split(":");
        // console.log('secondSplit', secondSplit);

        for (let i=0; i<secondSplit.length; i++){
            const thirdSplit = secondSplit[i].split("g");
            split.push(thirdSplit);
            // console.log('thirdSplit', thirdSplit);
        }
    }

    return split;
    console.log('split', split);
}


