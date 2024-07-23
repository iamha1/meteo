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

    getForecast(response.data.city)
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
    axios(apiUrl).then(refreshWeather);

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

function formatDay(timestamp){
    let date = new Date(timestamp * 1000);
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    return days[date.getDay()];

}

function getForecast(city){
    let apiKey = "c1b0cdbfcc2523bfde80c5o54094a3et";
    let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=imperial`;
    axios.get(apiUrl).then(displayForecast);

}

function displayForecast(response){
    console.log(response.data.daily)

    let forecastHtml = "";
    let forecast = document.querySelector(".forecast")

    let forecastDays = response.data.daily;
  
    forecastDays.forEach(function (day, index){
        if(index < 5){

        forecastHtml = forecastHtml + `<div class="weather-forecast-day">
              <div class="weather-forecast-date">${formatDay(day.time)}</div>
              <div class="weather-forecast-icon"><img src="${day.condition.icon_url}"></div>
              <div class="weather-forecast-temperatures">
                <div class="weather-forecast-temperature"><strong>${Math.round(day.temperature.minimum)}°F</strong> ${Math.round(day.temperature.maximum)}°F </div> 
                </div>  
          </div>`  
        }  
    });
    let forecastElement = document.querySelector(".forecast");
    forecastElement.innerHTML = forecastHtml;   
    
}
//displayForecast();
