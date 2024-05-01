const apikey = "fa5a29988a631c4df2c89eb09c3555e0"

const apiURL = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input")
const searchBtn = document.querySelector(".search button")
const date = document.querySelector(".date")
const weatherIcon = document.querySelector(".weather-icon")

// Created Date object and extracted info.
const currentDate = new Date();
const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const dayOfWeek = weekDays[currentDate.getDay()]
const dayOfMonth = currentDate.getDate();
const monthName = monthNames[currentDate.getMonth()]
const year = currentDate.getFullYear()
const formattedDate = `${dayOfWeek}, ${dayOfMonth} ${monthName} ${year}`
date.innerHTML = formattedDate;

async function checkWeather(city) {
    const response = await fetch(apiURL + city + `&appid=${apikey}`)

    if (response.status == 404) {
        document.querySelector(".error").style.display = "block"
        document.querySelector(".weather").style.display = "none"
    }
    else {
        let data = await response.json()


        console.log(data)

        document.querySelector(".city").innerHTML = data.name
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C"
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%"
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/hr"

        // Changing weather icons with if...else-if 
        if (data.weather[0].main == "Clouds") {
            weatherIcon.src = "images/clouds.png"
        }
        else if (data.weather[0].main == "Clear") {
            weatherIcon.src = "images/clear.png"
        }
        else if (data.weather[0].main == "Drizzle") {
            weatherIcon.src = "images/drizzle.png"
        }
        else if (data.weather[0].main == "Mist") {
            weatherIcon.src = "images/mist.png"
        }
        else if (data.weather[0].main == "Rain") {
            weatherIcon.src = "images/rain.png"
        }
        else if (data.weather[0].main == "Snow") {
            weatherIcon.src = "images/snow.png"
        }

        // Changing weather icons with Switch statment

        // switch(data.weather[0].main) {
        //     case "Clouds": 
        //     weatherIcon.src = "images/clouds.png";
        //     break;
        //     case "Clear": 
        //     weatherIcon.src = "images/clear.png";
        //     break;
        //     case "Drizzle": 
        //     weatherIcon.src = "images/drizzle.png";
        //     break;
        //     case "Mist": 
        //     weatherIcon.src = "images/mist.png";
        //     break;
        //     case "Rain": 
        //     weatherIcon.src = "images/rain.png";
        //     break;
        //     case "Snow": 
        //     weatherIcon.src = "images/snow.png";
        //     break;
        // }

        // Changing weather icons using object

        // const weatherIcons = {
        //     "Clouds": "images/clouds.png",
        //     "Clear": "images/clear.png",
        //     "Drizzle": "images/drizzle.png",
        //     "Mist": "images/mist.png",
        //     "Rain": "images/rain.png",
        //     "Snow": "images/snow.png"
        // };

        // const weatherCondition = data.weather[0].main;
        // if (weatherIcons.hasOwnProperty(weatherCondition)) {
        //     weatherIcon.src = weatherIcons[weatherCondition];
        // }

        //  date.innerHTML = formattedDate;
        document.querySelector(".weather").style.display = "block"
        document.querySelector(".error").style.display = "none"
    }

}


searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value)
})

