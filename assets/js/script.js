
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
    var currentDate = document.getElementById("current-date")
    currentDate.textContent = dayjs().format("DD-MMM-YYYY")
    cityH1.textContent = data.name
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
    var userCityInput = document.getElementById("city-input").value.toUpperCase();
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
            //when button is clicked, put the clicked city name into search bar and automatically click the searchBtn
            newButton.addEventListener("click", function(event) {
                console.log(event.target.textContent)
                document.getElementById("city-input").value = event.target.textContent;
                searchBtn.click()
            })

            newLi.append(newButton);
            historyUl.append(newLi)
        }

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
//print fetched data onto 5-day forecast cards
    for (i=1; i<6; i++){
    var daydate = document.getElementById("day" + i)
    var daytemp = document.getElementById("day"+i+"-temp")
    var daywind = document.getElementById("day"+i+"-wind")
    var dayhumid = document.getElementById("day"+i+"-humid")
    var dayIcon = document.getElementById("day"+i+"-icon")
    daydate.textContent = data.list[7+8*(i-1)].dt_txt
    daytemp.textContent = "Temp: " + data.list[7+8*(i-1)].main.temp + " °C"
    daywind.textContent = "Wind speed: " + data.list[7+8*(i-1)].wind.speed + " MPH"
    dayhumid.textContent = "Humidity: " + data.list[7+8*(i-1)].main.humidity + " %"
    dayIcon.src = "http://openweathermap.org/img/wn/" + data.list[7+8*(i-1)].weather[0].icon + "@2x.png"

    }

})
}

printHistory()