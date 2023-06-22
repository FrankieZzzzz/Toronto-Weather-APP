//weather api key 
let apiKey = "b68e523348f19ea792b0abbee994f51c";
//get current location
let newUnit = "metric"
navigator.geolocation.getCurrentPosition(_getCurrentLocation);
function _getCurrentLocation(position){
    let latCode = position.coords.latitude;
    let lonCode = position.coords.longitude;
    globalLat = position.coords.latitude;
    globalLon = position.coords.longitude;
    let apiLocatUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latCode}&lon=${lonCode}&appid=${apiKey}&units=${newUnit ? newUnit : "metric"}`;
    
    axios.get(apiLocatUrl).then(_displayLocation);  
}

//search engine
function _searchCity(event){
    event.preventDefault();
    let searchCity = document.querySelector("#search-bar").value;
    if (searchCity === ""){
    let apiLocatUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${globalLat}&lon=${globalLon}&units=${newUnit ? newUnit : "metric"}&appid=${apiKey}`;
    axios.get(apiLocatUrl).then(_displayLocation);
    }else{
    let apiLocatUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&units=${newUnit ? newUnit : "metric"}&appid=${apiKey}`;
     axios.get(apiLocatUrl).then(_displayLocation);
}}
let searchBtn = document.querySelector("#searchBtn-icon").addEventListener("click", _searchCity)
// window.addEventListener("load", _displayLocation);

//click C/F change temperature setting
function _changeTempF(event){
    event.preventDefault();
    let temp = document.querySelector("#main-temp");
    let fTemp = Math.round((celsiusTemp * 9) / 5 + 32);
    // let feelsLikeUnit = document.querySelector("#weather-feeling-unit")
    // feelsLikeUnit.innerHTML = F;
    temp.textContent = fTemp;
    fahrenheitBtn.classList.add("active");
    celsiusBtn.classList.remove("active");

    newUnit = "imperial"
    _searchCity(event)
}
function _changeTempC(event){
    event.preventDefault();
    let temp = document.querySelector("#main-temp");
    // let feelsLikeUnit = document.querySelector("#weather-feeling-unit")
    // feelsLikeUnit.innerHTML = C;
    temp.textContent = Math.round(celsiusTemp);   
    fahrenheitBtn.classList.remove("active");
    celsiusBtn.classList.add("active");
    newUnit = "metric"
    _searchCity(event)
    
};

let fahrenheitBtn = document.getElementById("fahrenheit");
    fahrenheitBtn.addEventListener("click", _changeTempF);
let celsiusBtn = document.getElementById("celsius");
    celsiusBtn.addEventListener("click", _changeTempC);

let celsiusTemp = null;
let maxTempForecast = null;
let minTempForecast = null;
let globalLon = null;
let globalLat = null;

//click form input get x icon
let inputSearch = document.querySelector("#search-bar").addEventListener("mousedown", function(){
    let xIcon = document.querySelector("#data-clear-input");
    xIcon.style.display = "inline"
    //click x icon clean search content
    xIcon.addEventListener("click",function(e){
        e.target.previousElementSibling.value = ""
        xIcon.style.display = "none"
    })})

    
//********************************** */
//show city weather on the page
function _displayLocation(response){
    //get biggest weather icon
    let getIcon = response.data.weather[0].icon;
    let liftSideIcon = document.querySelector("#weather-box-left-img");
    liftSideIcon.setAttribute("src", `https://openweathermap.org/img/wn/${getIcon}@2x.png`)

    //get response data for location and temp
    celsiusTemp = response.data.main.temp;
    let currentCity = response.data.name;
    let currentCountry = response.data.sys.country;
    let currentCityTemp = celsiusTemp;
    currentCityTemp = Math.round(currentCityTemp);
    let description = response.data.weather[0].description;
    let feelTemp = response.data.main.feels_like;
    feelTemp = Math.round(feelTemp);
    let pressure = response.data.main.pressure;
    let cityWindData = response.data.wind.speed;
    cityWindData = Math.round(cityWindData);
    let cityHumidityData = response.data.main.humidity;
    let dayMaxTemp = response.data.main.temp_max;
    dayMaxTemp = Math.round(dayMaxTemp);
    let dayMinTemp = response.data.main.temp_min;
    dayMinTemp = Math.round(dayMinTemp);
    //sunrise and set time
    let sunRiseTime = new Date(response.data.sys.sunrise * 1000)
    let sunSetTime = new Date(response.data.sys.sunset * 1000)
    //convert time to 12h
    let sunRiseHour = sunRiseTime.getHours()
    let sunRiseMin = sunRiseTime.getMinutes()
    sunRiseHour = sunRiseHour % 12;
    sunRiseHour = sunRiseHour ? sunRiseHour : 12;
    sunRiseMin = sunRiseMin.toString().padStart(2, '0');
    let riseTime = sunRiseHour + ':' + sunRiseMin;

    let sunSetHour = sunSetTime.getHours()
    let sunSetMin = sunSetTime.getMinutes()
    sunSetHour = sunSetHour % 12;
    sunSetHour = sunSetHour ? sunSetHour : 12;
    sunSetMin = sunSetMin.toString().padStart(2, '0');
    let setTime = sunSetHour + ':' + sunSetMin;
    
    //set photo gallery
    let unsplashKey = "C3l2wm2Z54GRQ75bhadpUU5IvPQYrO5TeSJZJ3WkL48"
    let unsplashUrl = `https://api.unsplash.com/search/photos?&orientation=landscape&query=${currentCity}&client_id=${unsplashKey}`;
    axios.get(unsplashUrl).then(_displayImg)
    function _displayImg(response){
        let imgLinkUrl = response.data.results[2].urls.full;
        let imgDescribetion = response.data.results[2].description;
        console.log(imgLinkUrl);
        let dispalyCityImg = document.querySelector("#displayImgGalery")
        dispalyCityImg.setAttribute("src", imgLinkUrl)
        dispalyCityImg.setAttribute("alt", imgDescribetion)
        let insertCity = document.querySelector("#insertCityName").innerHTML = currentCity;
    }
    //get html element
    let displayCity = document.querySelector("#current-city").innerHTML = currentCity;

    let displayCityTemp = document.querySelector("#main-temp").innerHTML = currentCityTemp;

    let rightSideLocation = document.querySelector(".inputLocation").innerHTML = currentCity;

    let descriptionToday = document.querySelector("#weather-description").innerHTML = description;

    let feelTemperature = document.querySelector("#weather-feeling-temp").innerHTML = feelTemp;

    let windData = document.querySelector("#windData").innerHTML = cityWindData;

    if(cityHumidityData < 50){
        let humidityData = document.querySelector("#humidityData").innerHTML = `<span class="material-symbols-outlined humidityIcon">rainy_light</span> ${cityHumidityData} %`;
    }else{
        let humidityData = document.querySelector("#humidityData").innerHTML = `<span class="material-symbols-outlined humidityIcon">rainy_heavy</span> ${cityHumidityData} %`;
    }
    
    let aPressure = document.querySelector("#weather-pressure").innerHTML = pressure;

    let maxTemp = document.querySelector("#max-temp").innerHTML = dayMaxTemp;

    let minTemp = document.querySelector("#min-temp").innerHTML = dayMinTemp;

    let sunriseTime = document.querySelector("#sunRise").innerHTML = riseTime;

    let sunsetTime = document.querySelector("#sunSet").innerHTML = setTime;

    let countryName = document.querySelector("#current-country").innerHTML = currentCountry;
    _getForecast(response.data.coord)
}

let currentLocationBtn = document.querySelector("#getCurrentLocation").addEventListener("mousedown", _searchCity)

//********************************** */
//weather forecast data
function _getForecast(coordinates){
    let oneCallApiKey = "ebef9ca4a8de66ed586fac628fade056"
    let weatherForecastUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${oneCallApiKey}&units=${newUnit ? newUnit : "metric"}`
    axios.get(weatherForecastUrl).then(_displayForecast);
}
function _formatDay(timeFormat){
    let current = new Date(timeFormat * 1000);
    let day = current.getDay();
    let weekdays = ["Sun", "Mon","Tue","Wed","Thu","Fri","Sat"];
    return weekdays[day]
}
//weather forecast add html
function _displayForecast(response){
    let forecastData = response.data.daily;
    // let forecastDataHourly = response.data.hourly;
    
    let forecastContent = "";
    forecastData.forEach(function(dailyData, index){
        maxTempForecast = dailyData.temp.max;
        minTempForecast = dailyData.temp.min;
        if(index < 7){
        forecastContent = forecastContent + `
        <div class="forecast-day mx-1 px-4 d-flex flex-column justify-content-center">
            <p>${_formatDay(dailyData.dt)}</p>
            <img src="https://openweathermap.org/img/wn/${dailyData.weather[0].icon}@2x.png" alt="">
            <div id="weather-forecast-temp">
                <span id="weather-temp-max">${Math.round(dailyData.temp.max)}°</span> /
                <span id="weather-temp-min">${Math.round(dailyData.temp.min)}°</span>
            </div>
        </div>
        `; 
        }
    })
    let weatherForecastBox = document.querySelector("#weather-forecast");
    weatherForecastBox.innerHTML = forecastContent;
}



//********************************** */
//get current time
//get time data
let current = new Date();
let monthes = ["Janurary", "Feburary", "March", "April", "May", "Jun", "July", "August", "September", "Octorber","Norvenber", "December"];
let weekdays = ["Sunday", "Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
let currentDate = weekdays[current.getDay()];
let currentDay = current.getDate();
let currentMonth = monthes[current.getMonth()];
let currentYear = current.getFullYear();
let currentTime = current.toLocaleTimeString('en-US',{hour:'numeric', minute: 'numeric'})

//change innerHTML
let pageDate = document.querySelector("#current-date").innerHTML = currentDate;
let pageMonth = document.querySelector("#weather-current-date").innerHTML = (`${currentMonth} ${currentDay}, ${currentYear}`);
let pageTime = document.querySelector("#current-time").innerHTML = currentTime;

//switch dark mode button
const d = new Date();
const hours = d.getHours();   
const night = hours >= 19 || hours <= 7; 
const body = document.querySelector('body');
const toggle = document.getElementById('toggle');
const input = document.getElementById('switch');
// between 7pm and 7am show dark mode
  if (night) {
    input.checked = true;
    body.classList.add('night');
  }
// click button function
  toggle.addEventListener('click', function() {
    const isChecked = input.checked;
    if (isChecked) {
      body.classList.remove('night');
    } else {
      body.classList.add('night');
    }
  });