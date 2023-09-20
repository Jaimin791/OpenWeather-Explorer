const inputBox = document.querySelector('.input-box');
const searchBtn = document.getElementById('searchBtn');
const weather_img = document.querySelector('.weather-img');
const temperature = document.querySelector('.temperature');
const description = document.querySelector('.description');
const humidity = document.getElementById('humidity');
const wind_speed = document.getElementById('wind-speed');

const location_not_found = document.querySelector('.location-not-found');

const weather_body = document.querySelector('.weather-body');


async function checkWeather(city){
    const api_key = "b3843952444c50029bf6943417cf42bd";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;

    const weather_data = await fetch(`${url}`).then(response => response.json());


    if(weather_data.cod === `404`){
        location_not_found.style.display = "flex";
        weather_body.style.display = "none";
        console.log("error");
        return;
    }

    console.log("run");
    location_not_found.style.display = "none";
    weather_body.style.display = "flex";
    temperature.innerHTML = `${Math.round(weather_data.main.temp - 273.15)}°C`;
    description.innerHTML = `${weather_data.weather[0].description}`;

    humidity.innerHTML = `${weather_data.main.humidity}%`;
    wind_speed.innerHTML = `${weather_data.wind.speed}Km/H`;


    switch(weather_data.weather[0].main){
        case 'Clouds':
            weather_img.src = "/assets/cloud.png";
            break;
        case 'Clear':
            weather_img.src = "/assets/clear.png";
            break;
        case 'Rain':
            weather_img.src = "/assets/rain.png";
            break;
        case 'Mist':
            weather_img.src = "/assets/mist.png";
            break;
        case 'Snow':
            weather_img.src = "/assets/snow.png";
            break;

    }

    console.log(weather_data);
}

var icon = document.getElementById("icon");
var body = document.body;
var container = document.querySelector(".container"); // Select the container element
var isDarkMode = false;
var originalBackground = body.style.backgroundImage;

icon.addEventListener("click", function() {
    if (isDarkMode) {
        // If in dark mode, switch back to the original background
        body.style.backgroundImage = originalBackground;
        container.style.backgroundColor = ""; // Revert container background color to default (empty string)
    } else {
        // If not in dark mode, set the background to "newpic.jpg"
        body.style.backgroundImage = "url('newpic.jpg')";
        container.style.backgroundColor = "white"; // Set container background color to white
    }

    // Toggle the mode flag
    isDarkMode = !isDarkMode;
});





searchBtn.addEventListener('click', ()=>{
    checkWeather(inputBox.value);
});