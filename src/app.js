// 3. Add temperature function
function refreshWeather(response){
    let temperatureElement = document.querySelector("#temperature");
    let temperature = response.data.temperature.current;
    let cityElement = document.querySelector("#city");
    let descriptionElement = document.querySelector("#description");
    let humidityElement = document.querySelector("#humidity");
    let windSpeedElement = document.querySelector("#wind-speed");
    let timeElement = document.querySelector("#time");
    let date = new Date(response.data.time *1000);
    let iconElement = document.querySelector("#icon")
    
    iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" alt="" class="weather-app-icon"/>`;

    cityElement.innerHTML = response.data.city;
    temperatureElement.innerHTML = Math.round(temperature);
    descriptionElement.innerHTML= response.data.condition.description; //weather condition
    humidityElement.innerHTML = `${response.data.temperature.humidity}%`
    windSpeedElement.innerHTML = `${response.data.wind.speed} km/h`
    timeElement.innerHTML = `${date.getDay()}, ${date.getHours()}:${date.getMinutes()}`;
    timeElement.innerHTML = formatDate(date)
}

function formatDate(date){
    let timeElement = document.querySelector("#time");
    timeElement.innerHTML = `${date.getDay()}, ${date.getHours()}:${date.getMinutes()}`;

    let minutes = date.getMinutes();
    let hours = date.getHours();
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    let day = days[date.getDay()];
    if (minutes <10){
        minutes = `0${minutes}`;
    }

    return `${day}, Time: ${hours}:${minutes}`;
}


//2. Make API call and update the interface
function searchCity(city){
    let apiKey = "c1b0cdbfcc2523bfde80c5o54094a3et";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=imperial`;
    //console.log(apiUrl);
    axios.get(apiUrl).then(refreshWeather);

}
// 1. Make form searchable
function handleSearchSubmit(event){
    event.preventDefault();
    let searchInput = document.querySelector("#search-form-input");
    let cityElement = document.querySelector("#city");
    searchCity(searchInput.value);

    cityElement.innerHTML = searchInput.value;
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

searchCity("Hanoi")

function displayForecast(){
    let days = ["Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    let forecastHtml = "";
    let forecast = document.querySelector(".forecast")
  
    days.forEach(function (day){
        forecastHtml = forecastHtml + `<div class="weather-forecast-day">
              <div class="weather-forecast-date">${day}</div>
              <div class="weather-forecast-icon">🌤️</div>
              <div class="weather-forecast-temperatures">
                <div class="weather-forecast-temperature"><strong>15°F</strong> 9°F </div> 
                </div>  
          </div>`    
    });
    let forecastElement = document.querySelector(".forecast");
    forecastElement.innerHTML = forecastHtml;   
    
}
displayForecast()