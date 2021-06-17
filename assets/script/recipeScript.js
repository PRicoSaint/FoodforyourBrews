
//Get food suggestions from Script.js 
//make it a string
//change spaces to %20
//run food through function 
//display recipe name, image, and list of ingredients to recipe.html

var recipeCard = document.querySelector('.recipeCards');


function foodPairings(){
    var foodList = JSON.parse(localStorage.getItem("Food Pairings"));
    var emptyFoodList = "";
    localStorage.setItem("Food Pairings", JSON.stringify(emptyFoodList));

    for(i=0; i < foodList.length; i++){
        //find spaces in string
        //change space to %20
        var singleFood = foodList[i];
        // console.log(singleFood.replace(' ', '%20'));
        // const arr = singleFood.split(' ');
        // const adjustedFood = arr.join('%20');
        var adjustedFood = singleFood.replace(/ /g,"%20");
        console.log(adjustedFood);
        searchRecipe(adjustedFood);

    }
}

foodPairings();


function searchRecipe(food) {
  recipeCard.innerHTML = '';
    fetch("https://api.edamam.com/api/recipes/v2?type=public&q=" + food + "&app_id=50b06b27&app_key=e832a13e6b33ae73edb54c8225f3c49f")
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);
        displayRecipe(data);
      })


  };
  

  var displayRecipe = function (data) {
    
    var recipeName = document.createElement('h2');
    var recipeImage = document.createElement('img');
    var recipeIngredients = document.createElement('ul');
    var li = document.createElement('li');
    
    var recipeNameData = data['hits'][0]['recipe']['label'];
    var recipeImageData = data['hits'][0]['recipe']['image'];
    var recipeIngredientsData= data['hits'][0]['recipe']['ingredientLines'];


    recipeName.textContent = recipeNameData;
    recipeImage.setAttribute("src", recipeImageData);
    recipeIngredients.textContent = recipeIngredientsData;

    recipeCard.appendChild(recipeName);
    recipeCard.appendChild(recipeImage);
    recipeCard.appendChild(recipeIngredients);
    recipeIngredients.appendChild(li);





    console.log(recipeNameData);
    console.log(recipeImageData);
    console.log(recipeIngredientsData);
    
  }
