
var apiKey = "1697f7e4b142152e057d9e0cb55044b3";
var searchBtn = document.getElementById("search-btn")
var searchForm = document.getElementById("search-form");
var cities = JSON.parse(localStorage.getItem("savedCity")) || [];

//fetch API for weather of chosen city then display on current weather dashboard
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
    var cityIcon = document.getElementById("current-icon")
    cityH1.textContent = userCityInput
    cityTemp.textContent = "Temp: " + data.main.temp + " °C"
    cityWind.textContent = "Wind speed: " + data.wind.speed + " MPH"
    cityHumid.textContent = "Humidity: " + data.main.humidity + " %"
    cityIcon.src = "http://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png"
    getForecast();
    saveToLocal();
    })
}

//save search history to Local Storage
function saveToLocal(){
    var userCityInput = document.getElementById("city-input").value;
    console.log(userCityInput)
    if (!cities.includes(userCityInput)){
    cities.push(userCityInput)
    }
    localStorage.setItem("savedCity", JSON.stringify(cities))
    printHistory()
}

function printHistory() {            
        var historyUl = document.querySelector(".search-hx");
        historyUl.innerHTML = ""

        var savedCity = JSON.parse(localStorage.getItem("savedCity"));

        for(i = 0; i < savedCity.length; i++) {
            var newLi = document.createElement("li");
            var newButton = document.createElement("button");
    
            newButton.textContent = savedCity[i];
            newButton.addEventListener("click", function(event) {
                console.log(event.target.textContent)
                document.getElementById("city-input").value = event.target.textContent;
                searchBtn.click()
            })

            newLi.append(newButton);
            historyUl.append(newLi)
        }

        // <li></li>
        // <button>Canberra</button>
        // <li><button>Canberra</button></li>
        // newLi.innerHTML = "<button>" + savedCity + "</button>";
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
    day1date.textContent = data.list[8].dt_txt
    day1temp.textContent = "Temp: " + data.list[8].main.temp + " °C"
    day1wind.textContent = "Wind speed: " + data.list[8].wind.speed + " MPH"
    day1humid.textContent = "Humidity: " + data.list[8].main.humidity + " %"
    day1Icon.src = "http://openweathermap.org/img/wn/" + data.list[8].weather[0].icon + "@2x.png"
})
}



printHistory()