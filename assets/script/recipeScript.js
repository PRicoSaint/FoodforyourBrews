
//Get food suggestions from Script.js 
//make it a string
//change spaces to %20
//run food through function 
//display recipe name, image, and list of ingredients to recipe.html

function foodPairings(){
    var foodList = JSON.parse(localStorage.getItem("Food Pairings"));
    var emptyFoodList = "";
    localStorage.setItem("Food Pairings", JSON.stringify(emptyFoodList));

    for(i=0; i < foodList.length; i++){
        //find spaces in string
        //change space to %20
        var singleFood = foodList[i];
        // console.log(singleFood.replace(' ', '%20'));
        const arr = singleFood.split(' ');
        const adjustedFood = arr.join('%20');
        searchRecipe(adjustedFood);

    }
}
foodPairings();


function searchRecipe(food) {


    fetch("https://api.edamam.com/api/recipes/v2?type=public&q=" + food + "&app_id=50b06b27&app_key=e832a13e6b33ae73edb54c8225f3c49f")
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);
      })
  
      .catch(function (error) {
        alert('Unable to connect to recipe library. :( ');
      });


  };
  

  function displayRecipes(){

        
  }