const searchAPI = async (searchTerm) =>{
    const response = await fetch(`/api/food/foodsearch/${searchTerm}`)
    //using another await to make sure it get resolved before going to the next part of the function
    const result = await response.json();
    // console.log('result', result);

    return result;
}

export default searchAPI;