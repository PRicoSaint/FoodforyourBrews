
function getApi() {
    // fetch request gets a list of all the repos for the node.js organization
    var requestUrl = 'https://api.punkapi.com/v2/beers/random';
  
    fetch(requestUrl)
      .then(function (response) {
        // console
        return response.json();
      })
      .then(function (data) {
        console.log(data)
  })
};

getApi();

