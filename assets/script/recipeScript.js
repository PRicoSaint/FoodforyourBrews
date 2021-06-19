
//Get food suggestions from Script.js 
//make it a string
//change spaces to %20
//run food through function 
//display recipe name, image, and list of ingredients to recipe.html

var recipeCard = document.querySelector('.recipeCards');

  var foodList = JSON.parse(localStorage.getItem("Food Pairings"));
  // var emptyFoodList = "";
  // localStorage.setItem("Food Pairings", JSON.stringify(emptyFoodList));

  for(i=0; i < foodList.length; i++){
      var singleFood = foodList[i];
      var adjustedFood = singleFood.replace(/ /g,"%20");
      
      searchRecipe(adjustedFood);}



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
      .catch(function(){

        var recipeName = document.createElement('h4');
        var googleEl = document.createElement('a');
        var googleSearch = 'https://www.google.com/search?q='
        var foodSearch = food.replace(/%20/g,'+');
        googleEl.setAttribute('href', googleSearch + foodSearch + '+recipe');
        googleEl.innerText = 'Try this google search';
        
        var foodReplace = food.replace(/[%20]/g,' ');
        recipeName.textContent = ("---Recipe For: '"+ foodReplace +"' is Unavailable.--- ");

        recipeCard.appendChild(recipeName);
        recipeCard.appendChild(googleEl);
      });


  };
  

  var displayRecipe = function (data) {
    
    var recipeName = document.createElement('h4');
    var recipeImage = document.createElement('img');
    var recipeIngredients = document.createElement('p');
    
    var recipeNameData = data['hits'][0]['recipe']['label'];
    var recipeImageData = data['hits'][0]['recipe']['image'];
    var recipeIngredientsData = data['hits'][0]['recipe']['ingredientLines'];
    
    recipeName.textContent = recipeNameData;
    recipeImage.setAttribute("src", recipeImageData);
      
    var newCard = document.createElement('div');
    newCard.setAttribute('class', 'card');
    newCard.appendChild(recipeName);
    newCard.appendChild(recipeImage);
    newCard.appendChild(recipeIngredients);
    recipeCard.appendChild(newCard);

      for(var i = 0; i < recipeIngredientsData.length; i++){
        var li = document.createElement('p');
        var recipeIngredientsList = data['hits'][0]['recipe']['ingredientLines'][i];
        li.textContent = recipeIngredientsList;
        recipeIngredients.appendChild(li);
        }


    console.log(recipeNameData);
    console.log(recipeImageData);
    console.log(recipeIngredients);
    
  }


