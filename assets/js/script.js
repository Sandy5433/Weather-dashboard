
var apiKey = "1697f7e4b142152e057d9e0cb55044b3";
var userCityInput = document.getElementById("city-input").value;
var queryUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + userCityInput + "&appid=" + apiKey;
var searchBtn = document.getElementById("search-btn")



function searchFormSubmit(event){
    event.preventDefault();
    console.log(userCityInput)
}

searchBtn.addEventListener("submit", searchFormSubmit);

// fetch(queryUrl)