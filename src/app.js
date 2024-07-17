// add temperature
function refreshWeather(response){
    //console.log(response)
    let temperatureElement = document.querySelector("#temperature");
    let temperature = response.data.temperature.current;
    temperatureElement.innerHTML = Math.round(temperature);


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
