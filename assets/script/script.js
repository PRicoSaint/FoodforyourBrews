var addItemsHere = document.querySelector('#start-here');
var beerInput = document.querySelector('#beername')
var userFormEl = document.querySelector('#userinput')
var randomBeerGen = document.querySelector('#randomgen')
var recentSearches = document.querySelector("#buttons-go-here")
var recipes = document.querySelector("#recipes-page");


var foodpairing1 = [];
var foodpairing2 = [];
var foodpairing3 = [];
var foodpairings = [];
var searchCycle = 0;
var previousBeerName = [];
var favBeers =[];

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
    var cBeerTagLine = data[searchCycle].tagline;
    var imgURL = data[searchCycle].image_url;
    var food1 = data[searchCycle].food_pairing[0];
    var food2 = data[searchCycle].food_pairing[1];
    var food3 = data[searchCycle].food_pairing[2];
    console.log(cBeerName, cBeerABV, cBeerDescription, imgURL, food1, food2, food3);
    
    var sample = document.createElement("div");
      sample.setAttribute("class", "row");
    var spacing = document.createElement("div");
      spacing.setAttribute("class", "col s12 m7");
    var sampleCard =document.createElement("div");
      sampleCard.setAttribute("class", "card");
    var sampleCardImgSection = document.createElement("div");
      sampleCardImgSection.setAttribute("class", "card-image");
      if (imgURL == null){
        var thumbnail = document.createElement("img");
        thumbnail.setAttribute("src", "./assets/images/Generic-Beer-picture.jpg");
        thumbnail.setAttribute("alt", "Generic Picture of beer");
        thumbnail.setAttribute("class", "img-width"); 
      }else {
        var thumbnail = document.createElement("img");
        thumbnail.setAttribute("src", imgURL);
        thumbnail.setAttribute("alt", "Picture of beer");
        thumbnail.setAttribute("class", "img-width"); 
      } 
    var title = document.createElement('span');
      title.setAttribute("class", "card-title");
      title.textContent = 'Beer: ' + cBeerName;
    var sampleCardContent = document.createElement("div");
      sampleCardContent.setAttribute("class", "class-content");
    var box = document.createElement("ul");
    var li1 = document.createElement("li");
      li1.textContent = cBeerTagLine;
    var li2 = document.createElement("li");
      li2.textContent = 'Alcohol Content: ' + cBeerABV;
    var li3 = document.createElement("li");
      li3.textContent = 'Description: ' + cBeerDescription;
    var pairings = document.createElement('div');
      pairings.setAttribute("class", "card-action");
    var pairingTitle = document.createElement('h4');
      pairingTitle.textContent = "Recommended Food Pairings";
    var pairingsList = document.createElement('ul');
    var pairingsBullet1 = document.createElement('li');
      pairingsBullet1.textContent = food1;
    var pairingsBullet2 = document.createElement("li");
      pairingsBullet2.textContent = food2;
    var pairingsBullet3 = document.createElement("li");
      pairingsBullet3.textContent = food3;           

      addItemsHere.appendChild(sample);
      sample.appendChild(spacing);
      spacing.appendChild(sampleCard);
      sampleCard.appendChild(sampleCardImgSection);
      sampleCardImgSection.appendChild(thumbnail);
      sampleCard.appendChild(title);
      sampleCard.appendChild(sampleCardContent);
      sampleCardContent.appendChild(box)
      box.appendChild(li1);
      box.appendChild(li2);
      box.appendChild(li3);
      sampleCardContent.appendChild(pairings);
      pairings.appendChild(pairingTitle);
      pairings.appendChild(pairingsList);
      pairingsList.appendChild(pairingsBullet1);
      pairingsList.appendChild(pairingsBullet2);
      pairingsList.appendChild(pairingsBullet3);

      // Saves food pairings to local storage
    for (i=0;i<3;i++){
      foodpairings.push(data[searchCycle].food_pairing[i])
    }
    savetoMemory()
    var nextHTML = document.createElement("form");
    nextHTML.setAttribute("action", "./recipe.html")
    pairings.appendChild(nextHTML);
    var button = document.createElement("button");
    button.setAttribute("type", "submit");
    button.setAttribute("value", "See recipes for the foods");
    button.setAttribute("class", "waves-effect waves-light btn");
    button.setAttribute("data-name", cBeerName);
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
    console.log(previousBeerName);

  }
};

var saveSearchHistory = function (event){
  var likedBeer = event.target.getAttribute("data-name");
  if (favBeers.includes(likedBeer)){
    // DO NOTHING
  }else{favBeers.push(likedBeer);
localStorage.setItem("Beers", JSON.stringify(favBeers));
}
}


var init = function(){
  var localSavedBeers = JSON.parse(localStorage.getItem("Beers"));

  if (localSavedBeers !== null) {
    favBeers = localSavedBeers;
  }
  for (var i = 0; i < favBeers.length; i++) {
    var button = document.createElement("button");
    button.textContent = favBeers[i];
    button.setAttribute("class", "waves-effect waves-light btn");
    button.setAttribute("data-name", favBeers[i]);
    recentSearches.appendChild(button);
}
};

addItemsHere.addEventListener("click", saveSearchHistory);
// recentSearches.addEventListener("click", clickRecentSearches);

var clickRecentSearches = function (event) {
  var oldBeer = event.target.getAttribute("data-name");
  console.log(oldBeer);

  if (oldBeer) {
    oldSearchPunkAPI(oldBeer);
  }
};
init();

function oldSearchPunkAPI(oldBeer) {
  addItemsHere.innerHTML = '';
    // fetch request for beer typed in
    var requestUrl = 'https://api.punkapi.com/v2/beers?beer_name=' + oldBeer;
    console.log(requestUrl);
      
    fetch(requestUrl)
      .then(function (response) {
        if (response.ok) {
          console.log(response);
          response.json().then(function (data) {
            console.log(data);
            // checkSearchHistory(data, oldBeer);
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




recentSearches.addEventListener("click", clickRecentSearches);