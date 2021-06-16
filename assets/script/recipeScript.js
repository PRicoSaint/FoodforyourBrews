
//Get food suggestions from Script.js 
//make it a string
//change spaces to %20
//run food through function 
//display recipe name, image, and list of ingredients to recipe.html

food = script.food1;
food1 = script.food2;
food2 = script.food3;

console.log( food1 + food2 + food);

function searchRecipe() {
  var food = 'grab from script.js'


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
  