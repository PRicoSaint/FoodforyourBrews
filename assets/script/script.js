// Query selector set up.
var addItemsHere = document.querySelector('#start-here');
var beerInput = document.querySelector('#beername')
var userFormEl = document.querySelector('#userinput')
var randomBeerGen = document.querySelector('#randomgen')
var recentSearches = document.querySelector("#buttons-go-here")
var recipes = document.querySelector("#recipes-page");

// Global variables set up. Some are redundant.
var foodpairing1 = [];
var foodpairing2 = [];
var foodpairing3 = [];
var foodpairings = [];
var searchCycle = 0;
var previousBeerName = [];
var favBeers = [];

// This function is the one that loads name from search box into punkAPI.
// Clicking Search again will use the same input to search punpAPI and display next beer found.
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

// Waits for user to input a beer type or name and send it to punkAPI to produce a response.
var formSubmitHandler = function (event) {
  event.preventDefault();

  var beerName = beerInput.value.trim();
  console.log(beerName);

  if (beerName) {
    searchPunkAPI(beerName);

  } else {
    alert('Please type a beer name');
  }
};

userFormEl.addEventListener('submit', formSubmitHandler);
randomBeerGen.addEventListener('click', searchRandomPunkAPI);
// This function completes the same thing as the above, but uses the random search function from the punkAPI.
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

// This function takes array pulled from punkAPI and takes specific data points from it. 
// It looks up how many times the search button has been clicks and take a different beer from the array to display.
// When the options have been exhausted, it will show the 1st beer in the array.
var displayCurrentBeer = function (data) {
  if (data.length === 0) {
    alert('No info found');
    return;
  }
// Pulls and saves data to variables.
  var cBeerName = data[searchCycle].name;
  var cBeerABV = data[searchCycle].abv;
  var cBeerDescription = data[searchCycle].description;
  var cBeerTagLine = data[searchCycle].tagline;
  var imgURL = data[searchCycle].image_url;
  var food1 = data[searchCycle].food_pairing[0];
  var food2 = data[searchCycle].food_pairing[1];
  var food3 = data[searchCycle].food_pairing[2];
  console.log(cBeerName, cBeerABV, cBeerDescription, imgURL, food1, food2, food3);

  // Card element creation
  var sample = document.createElement("div");
  sample.setAttribute("class", "row");
  var spacing = document.createElement("div");
  spacing.setAttribute("class", "container");
  var sampleCard = document.createElement("div");
  sampleCard.setAttribute("class", "card");
  var sampleCardImgSection = document.createElement("div");
  sampleCardImgSection.setAttribute("class", "card-image");
  if (imgURL == null) {
    var thumbnail = document.createElement("img");
    thumbnail.setAttribute("src", "./assets/images/Generic-Beer-picture.jpg");
    thumbnail.setAttribute("alt", "Generic Picture of beer");
    thumbnail.setAttribute("class", "img-width");
  } else {
    var thumbnail = document.createElement("img");
    thumbnail.setAttribute("src", imgURL);
    thumbnail.setAttribute("alt", "Picture of beer");
    thumbnail.setAttribute("class", "img-width");
  }
  // More element creation
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

// Formatting elements created.
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

  // Saves food pairings to array that will placed into local storage
  for (i = 0; i < 3; i++) {
    foodpairings.push(data[searchCycle].food_pairing[i])
  }
  savetoMemory()
  // sets up button to travel to next page where recipes for food pairings are located.
  // Also places name of beer into button target as a way to then save it local storage to be pulled from later. 
  // These values will then populate recent searches, but only if the user looked at recipes 1st.
  var nextHTML = document.createElement("form");
  nextHTML.setAttribute("action", "./recipe.html")
  pairings.appendChild(nextHTML);
  var button = document.createElement("button");
  button.setAttribute("type", "submit");
  button.setAttribute("class", "button");
  button.setAttribute("data-name", cBeerName);
  var spain = document.createElement("span");
  spain.textContent = "See Recipes for Food Pairings!";
  spain.setAttribute("data-name", cBeerName);
  nextHTML.appendChild(button);
  button.appendChild(spain);
}
// This function saves the food pairings to local storage so that recipe web page can pull data from this array and search Edamame API.
var savetoMemory = function () {
  localStorage.setItem("Food Pairings", JSON.stringify(foodpairings));
  foodpairings = [];
}
// If search is clicked on again, it will pull new beer from array and display it.
var checkSearchHistory = function (data, beerName) {

  var searchArrayLength = (data.length) - 1;

  if (previousBeerName.includes(beerName) && searchArrayLength !== searchCycle) {
    searchCycle++;
  } else if (previousBeerName.includes(beerName) && searchArrayLength === searchCycle) {
    searchCycle = 0;
    // previousBeerName = [];
  }
  else {
    previousBeerName.push(beerName);
    console.log(previousBeerName);

  }
};
// This function saves the beer that was clicked on to see food pairings.
var saveSearchHistory = function (event) {
  var likedBeer = event.target.getAttribute("data-name");
  if (favBeers.includes(likedBeer)) {
    // DO NOTHING
  } else {
    favBeers.push(likedBeer);
    localStorage.setItem("Beers", JSON.stringify(favBeers));
  }
}

// Function loads beers from local storage and populates recent search box.
var init = function () {
  var localSavedBeers = JSON.parse(localStorage.getItem("Beers"));

  if (localSavedBeers !== null) {
    favBeers = localSavedBeers;
  }
  for (var i = 0; i < favBeers.length; i++) {
    var button = document.createElement("button");
    var spain = document.createElement("span");
    spain.textContent = favBeers[i];
    button.setAttribute("class", "button");
    // if (favBeers[i] !== null) {
    //   button.setAttribute("data-name", favBeers[i]);
    //   recentSearches.appendChild(button);
    //   button.appendChild(spain);
    // } else {
    //   // Do nothing
    // }
    button.setAttribute("data-name", favBeers[i]);
      recentSearches.appendChild(button);
      button.appendChild(spain);
  }
};

addItemsHere.addEventListener("click", saveSearchHistory);

// Waits for recent search to be clicked and then searches that function.
var clickRecentSearches = function (event) {
  var oldBeer = event.target.getAttribute("data-name");
  console.log(oldBeer);

  if (oldBeer) {
    oldSearchPunkAPI(oldBeer);
  }
};
init();

// Takes the data name of target button clicked in recent searches area. Displays current beer, but does not need to search history.
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



// Waits for user to click a recent searched beer to run function.
recentSearches.addEventListener("click", clickRecentSearches);