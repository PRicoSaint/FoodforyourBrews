var addItemsHere = document.querySelector('#start-here');
var beerInput = document.querySelector('#beername')
var userFormEl = document.querySelector('#userinput')
var randomBeerGen = document.querySelector('#randomgen')

var foodpairing1 = [];
var foodpairing2 = [];
var foodpairing3 = [];
var foodpairings = [];
var searchCycle = 0;
var previousBeerName = [];

function searchPunkAPI(beerName) {
  addItemsHere.innerHTML = '';
    // fetch request for beer typed in
    var requestUrl = 'https://api.punkapi.com/v2/beers?beer_name=' + beerName;
    console.log(requestUrl);
      
    fetch(requestUrl)
      .then(function (response) {
        if (response.ok) {
          console.log(response);
          response.json().then(function (data) {
            console.log(data);
            checkSearchHistory(data, beerName);
            displayCurrentBeer(data);
  
          });
        } else {
          alert('Error: ' + response.statusText);
        }
      })
      .catch(function (error) {
        alert('Unable to connect to beer library. :( ');
      });
};


var formSubmitHandler = function (event) {
  event.preventDefault();

  var beerName = beerInput.value.trim();
  console.log(beerName);

  if (beerName) {
    searchPunkAPI(beerName);

  } else {
    alert('Please enter another Beer name');
  }
};

userFormEl.addEventListener('submit', formSubmitHandler);
randomBeerGen.addEventListener('click', searchRandomPunkAPI);

function searchRandomPunkAPI() {
  addItemsHere.innerHTML = '';
  // fetch request a random beer
  var requestUrl = 'https://api.punkapi.com/v2/beers/random';

  fetch(requestUrl)
    .then(function (response) {
      if (response.ok) {
        console.log(response);
        response.json().then(function (data) {
          console.log(data);
          displayCurrentBeer(data);

        });
      } else {
        alert('Error: ' + response.statusText);
      }
    })
    .catch(function (error) {
      alert('Unable to connect to beer library. :( ');
    });
};


var displayCurrentBeer = function (data) {
  if (data.length === 0) {
    alert('No info found');
    return;
  }

    var cBeerName = data[searchCycle].name;
    var cBeerABV = data[searchCycle].abv;
    var cBeerDescription = data[searchCycle].description;
    var imgURL = data[searchCycle].image_url;
    var food1 = data[searchCycle].food_pairing[0];
    var food2 = data[searchCycle].food_pairing[1];
    var food3 = data[searchCycle].food_pairing[2];
    console.log(cBeerName, cBeerABV, cBeerDescription, imgURL, food1, food2, food3);

    var title = document.createElement('h2');
      title.textContent = 'More Information';
    var box = document.createElement("ul");
    var li1 = document.createElement("li");
      li1.textContent = 'Beer: ' + cBeerName;
    var li2 = document.createElement("li");
      li2.textContent = 'Alcohol Content: ' + cBeerABV;
    var li3 = document.createElement("li");
      li3.textContent = 'Description: ' + cBeerDescription;
        if (imgURL == null){
          var thumbnail = document.createElement("img");
          thumbnail.setAttribute("src", "./assets/images/Generic-Beer-picture.jpg");
          thumbnail.setAttribute("alt", "Generic Picture of beer"); 
      }else {
          var thumbnail = document.createElement("img");
          thumbnail.setAttribute("src", imgURL);
          thumbnail.setAttribute("alt", "Picture of beer"); 
    }
    var pairings = document.createElement('div');
    var pairingTitle = document.createElement('h2');
      pairingTitle.textContent = "Recommended Food Pairings";
    var pairingsList = document.createElement('ul');
    var pairingsBullet1 = document.createElement('li');
      pairingsBullet1.textContent = food1;
    var pairingsBullet2 = document.createElement("li");
      pairingsBullet2.textContent = food2;
    var pairingsBullet3 = document.createElement("li");
      pairingsBullet3.textContent = food3;           

      addItemsHere.appendChild(title);
      addItemsHere.appendChild(box);
      box.appendChild(li1);
      box.appendChild(li2);
      box.appendChild(li3);
      box.appendChild(thumbnail);
      addItemsHere.appendChild(pairings);
      pairings.appendChild(pairingTitle);
      pairings.appendChild(pairingsList);
      pairingsList.appendChild(pairingsBullet1);
      pairingsList.appendChild(pairingsBullet2);
      pairingsList.appendChild(pairingsBullet3);
    for (i=0;i<3;i++){
      foodpairings.push(data[0].food_pairing[i])
    }
    savetoMemory()
    var nextHTML = document.createElement("form");
    nextHTML.setAttribute("action", "./recipe.html")
    pairings.appendChild(nextHTML);
    var button = document.createElement("button");
    button.setAttribute("type", "submit");
    button.setAttribute("value", "See recipes for the foods");
    button.textContent= "See Recipes for Food Pairings!";
    nextHTML.appendChild(button);
}

var savetoMemory = function(){
  localStorage.setItem("Food Pairings", JSON.stringify(foodpairings));
  foodpairings =[];
}

var checkSearchHistory = function(data, beerName){
  console.log(searchArrayLength);
  console.log(searchCycle);
  console.log(previousBeerName.includes(beerName) && searchArrayLength !== searchCycle);
  console.log(previousBeerName.includes(beerName) && searchArrayLength == searchCycle);
  console.log(previousBeerName);
  console.log(beerName);

  var searchArrayLength = (data.length)-1;
            
  if (previousBeerName.includes(beerName) && searchArrayLength !== searchCycle){
    searchCycle++;
  }else if (previousBeerName.includes(beerName) && searchArrayLength === searchCycle) {
    searchCycle = 0;
    // previousBeerName = [];
  }
  else {
    previousBeerName.push(beerName);
  }
};