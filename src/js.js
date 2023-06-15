//get current location
// window.addEventListener("load", _displayLocation)
function _getCurrentLocation(position){
    let latCode = position.coords.latitude;
    let lonCode = position.coords.longitude;
    let apiLocatUrl = `https://api.shecodes.io/weather/v1/current?lon=${lonCode}&lat=${latCode}&key=${apiKey}`;
    axios.get(apiLocatUrl).then(_displayLocation)
}
function _displayLocation(position){
    
    let currentCity = position.data.city;
    let currentCityTemp = position.data.temperature.current;
    currentCityTemp = Math.round(currentCityTemp);
    let displayCity = document.querySelector("#current-city");
    let displayCityTemp = document.querySelector("#main-temp");
    displayCity.innerHTML = currentCity;
    displayCityTemp.innerHTML = currentCityTemp
}
navigator.geolocation.getCurrentPosition(_getCurrentLocation)
let apiKey = "9a4fe4bodeba6ca823c48bdb74t03dbe"
let apiUrl = `https://api.shecodes.io/weather/v1/current?query=Toronto&key=${apiKey}&units=metric`;
axios.get(apiUrl).then(_displayData)

