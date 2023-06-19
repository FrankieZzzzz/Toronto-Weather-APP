let apiKey = "b68e523348f19ea792b0abbee994f51c";
let SheCodeApiKey = "9a4fe4bodeba6ca823c48bdb74t03dbe"
//open weather-api's icon resolution is bad. But SheCodes weather icon looks good.  So I use both api...
//get current location
// window.addEventListener("load", _displayLocation)
function _getCurrentLocation(position){
    let latCode = position.coords.latitude;
    let lonCode = position.coords.longitude;
    let apiLocatUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latCode}&lon=${lonCode}&appid=${apiKey}&units=metric`;
    axios.get(apiLocatUrl).then(_displayLocation);  
    let SheCodeApiUrl = `https://api.shecodes.io/weather/v1/current?lon=${lonCode}&lat=${latCode}&key=${SheCodeApiKey}&units=metric`
    axios.get(SheCodeApiUrl).then(_displayIcon);
}
navigator.geolocation.getCurrentPosition(_getCurrentLocation);

function _displayIcon(response){
    
    let getIcon = response.data.condition.icon;
    let liftSideIcon = document.querySelector("#weather-box-left-img");
    liftSideIcon.setAttribute("src", `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${getIcon}.png`)
}
//show city weather on the page
function _displayLocation(response){
    //get response data
    celsiusTemp = response.data.main.temp;

    console.log(response.data);
    let currentCity = response.data.name;
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
    let sunRiseTime = new Date(response.data.sys.sunrise * 1000);
    let sunSetTime = new Date(response.data.sys.sunset * 1000)
    let sunRiseHour = sunRiseTime.getHours();
    let sunRiseMin = sunRiseTime.getMinutes();
    if (sunRiseHour<10){
        sunRiseHour = `0${sunRiseHour}`
    }
    if (sunRiseMin<10){
        sunRiseMin = `0${sunRiseMin}`
    }
    let sunSetHour = sunSetTime.getHours();
    let sunSetMin = sunSetTime.getMinutes();
    if (sunSetHour<10){
        sunSetHour = `0${sunSetHour}`
    }
    if (sunSetMin<10){
        sunSetMin = `0${sunSetMin}`
    }
    let sunRise = `${sunRiseHour}:${sunRiseMin}`;
    let sunSet = `${sunSetHour}:${sunSetMin}`;
    
 
    
    //get html element
    let displayCity = document.querySelector("#current-city").innerHTML = currentCity;

    let displayCityTemp = document.querySelector("#main-temp").innerHTML = currentCityTemp;

    let rightSideLocation = document.querySelector(".inputLocation").innerHTML = currentCity;

    let descriptionToday = document.querySelector("#weather-description").innerHTML = description;

    let feelTemperature = document.querySelector("#weather-feeling-temp").innerHTML = feelTemp;

    let windData = document.querySelector("#windData").innerHTML = cityWindData;

    let humidityData = document.querySelector("#humidityData").innerHTML = cityHumidityData

    let aPressure = document.querySelector("#weather-pressure").innerHTML = pressure;

    let maxTemp = document.querySelector("#max-temp").innerHTML = dayMaxTemp;

    let minTemp = document.querySelector("#min-temp").innerHTML = dayMinTemp;

    let sunriseTime = document.querySelector("#sunRise").innerHTML = sunRise;

    let sunsetTime = document.querySelector("#sunSet").innerHTML = sunSet;
}

//search engine
let searchBtn = document.querySelector("#search-Btn").addEventListener("click", _searchCity)
function _searchCity(event){
    event.preventDefault();
    let searchCity = document.querySelector("#search-bar").value;
    let apiLocatUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&units=metric&appid=${apiKey}`;
    axios.get(apiLocatUrl).then(_displayLocation);
}

window.addEventListener("load", _displayLocation);

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

//click C/F change temperature setting

function _changeTempF(event){
    event.preventDefault();
    let temp = document.querySelector("#main-temp");
    let fTemp = Math.round((celsiusTemp * 9) / 5 + 32);
    temp.textContent = fTemp;
    fahrenheitBtn.classList.add("active")
    celsiusBtn.classList.remove("active")
    
}
function _changeTempC(event){
    event.preventDefault();
    let temp = document.querySelector("#main-temp");
    temp.textContent = Math.round(celsiusTemp);   
    fahrenheitBtn.classList.remove("active")
    celsiusBtn.classList.add("active")
    
    
};
let celsiusTemp = null;

let fahrenheitBtn = document.getElementById("fahrenheit");
    fahrenheitBtn.addEventListener("click", _changeTempF);
let celsiusBtn = document.getElementById("celsius");
    celsiusBtn.addEventListener("click", _changeTempC);
