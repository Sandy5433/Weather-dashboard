
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
    // currentDate.textContent = Date.now()
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
    // var day1date = document.getElementById("day1")
    // var day1temp = document.getElementById("day1-temp")
    // var day1wind = document.getElementById("day1-wind")
    // var day1humid = document.getElementById("day1-humid")
    // var day1Icon = document.getElementById("day1-icon")
    // day1date.textContent = data.list[7].dt_txt
    // day1temp.textContent = "Temp: " + data.list[7].main.temp + " °C"
    // day1wind.textContent = "Wind speed: " + data.list[7].wind.speed + " MPH"
    // day1humid.textContent = "Humidity: " + data.list[7].main.humidity + " %"
    // day1Icon.src = "http://openweathermap.org/img/wn/" + data.list[7].weather[0].icon + "@2x.png"

    // var day2date = document.getElementById("day2")
    // var day2temp = document.getElementById("day2-temp")
    // var day2wind = document.getElementById("day2-wind")
    // var day2humid = document.getElementById("day2-humid")
    // var day2Icon = document.getElementById("day2-icon")
    // day2date.textContent = data.list[15].dt_txt
    // day2temp.textContent = "Temp: " + data.list[15].main.temp + " °C"
    // day2wind.textContent = "Wind speed: " + data.list[15].wind.speed + " MPH"
    // day2humid.textContent = "Humidity: " + data.list[15].main.humidity + " %"
    // day2Icon.src = "http://openweathermap.org/img/wn/" + data.list[15].weather[0].icon + "@2x.png"

    // var day3date = document.getElementById("day3")
    // var day3temp = document.getElementById("day3-temp")
    // var day3wind = document.getElementById("day3-wind")
    // var day3humid = document.getElementById("day3-humid")
    // var day3Icon = document.getElementById("day3-icon")
    // day3date.textContent = data.list[23].dt_txt
    // day3temp.textContent = "Temp: " + data.list[23].main.temp + " °C"
    // day3wind.textContent = "Wind speed: " + data.list[23].wind.speed + " MPH"
    // day3humid.textContent = "Humidity: " + data.list[23].main.humidity + " %"
    // day3Icon.src = "http://openweathermap.org/img/wn/" + data.list[23].weather[0].icon + "@2x.png"

    // var day4date = document.getElementById("day4")
    // var day4temp = document.getElementById("day4-temp")
    // var day4wind = document.getElementById("day4-wind")
    // var day4humid = document.getElementById("day4-humid")
    // var day4Icon = document.getElementById("day4-icon")
    // day4date.textContent = data.list[31].dt_txt
    // day4temp.textContent = "Temp: " + data.list[31].main.temp + " °C"
    // day4wind.textContent = "Wind speed: " + data.list[31].wind.speed + " MPH"
    // day4humid.textContent = "Humidity: " + data.list[31].main.humidity + " %"
    // day4Icon.src = "http://openweathermap.org/img/wn/" + data.list[31].weather[0].icon + "@2x.png"

    // var day5date = document.getElementById("day5")
    // var day5temp = document.getElementById("day5-temp")
    // var day5wind = document.getElementById("day5-wind")
    // var day5humid = document.getElementById("day5-humid")
    // var day5Icon = document.getElementById("day5-icon")
    // day5date.textContent = data.list[39].dt_txt
    // day5temp.textContent = "Temp: " + data.list[39].main.temp + " °C"
    // day5wind.textContent = "Wind speed: " + data.list[39].wind.speed + " MPH"
    // day5humid.textContent = "Humidity: " + data.list[39].main.humidity + " %"
    // day5Icon.src = "http://openweathermap.org/img/wn/" + data.list[39].weather[0].icon + "@2x.png"

})
}



printHistory()