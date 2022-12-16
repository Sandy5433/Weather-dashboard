
var apiKey = "1697f7e4b142152e057d9e0cb55044b3";
var searchBtn = document.getElementById("search-btn")
var searchForm = document.getElementById("search-form");

function searchFormSubmit(event){
    event.preventDefault();
    var userCityInput = document.getElementById("city-input").value;
    console.log(userCityInput)
    var queryUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + userCityInput + "&units=metric&appid=" + apiKey;
    console.log(queryUrl)
    fetch(queryUrl)
    .then(response => response.json())
    .then(data => {
        console.log(data)
    var cityH1 = document.getElementById("city-name")
    var cityTemp = document.getElementById("city-temp")
    var cityWind = document.getElementById("city-wind")
    var cityHumid = document.getElementById("city-humid")
    cityH1.textContent = userCityInput
    cityTemp.textContent = "Temp: " + data.main.temp + "C"
    cityWind.textContent = "Wind speed: " + data.wind.speed
    cityHumid.textContent = "Humidity: " + data.main.humidity
    getForecast();
    })
}


searchForm.addEventListener("submit", searchFormSubmit);

function getForecast (){
    var userCityInput = document.getElementById("city-input").value;
    console.log(userCityInput)
    var queryUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + userCityInput + "&units=metric&appid=" + apiKey;
    console.log(queryUrl)
    fetch(queryUrl)
    .then(response => response.json())
    .then(data => {
        console.log(data)
    var day1date = document.getElementById("day1")
    var day1temp = document.getElementById("day1-temp")
    var day1wind = document.getElementById("day1-wind")
    var day1humid = document.getElementById("day1-humid")
    var day1Icon = document.getElementById("day1-icon")
    day1date.textContent = data.list[0].dt_txt
    day1temp.textContent = "Temp: " + data.list[0].main.temp + "C"
    day1wind.textContent = "Wind speed: " + data.list[0].wind.speed
    day1humid.textContent = "Humidity: " + data.list[0].main.humidity
    day1Icon.src = "http://openweathermap.org/img/wn/" + data.list[0].weather[0].icon + "@2x.png"
})
}

