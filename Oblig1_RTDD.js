document.addEventListener("DOMContentLoaded", function() {
    const weatherconatiner = document.getElementById("locationData");
    
    // Array of location objects, each containing API URL, element ID, and city name
    const locations = [
        {
            apiurl: "https://api.open-meteo.com/v1/forecast?latitude=59.9127&longitude=10.7461&current_weather=true", //Oslo,Norge
            elementID: "Norway",
            city: "Oslo"
        },
        {
            apiurl: "https://api.open-meteo.com/v1/forecast?latitude=51.4025&longitude=21.1471&current_weather=true", //Radom,Poland
            elementID: "Poland",
            city: "Radom"
        },
        {
            apiurl: "https://api.open-meteo.com/v1/forecast?latitude=40.4686&longitude=19.4832&current_weather=true", //Vlore,Albania
            elementID: "Albania",
            city: "Vlore"
        },
        {
            apiurl: "https://api.open-meteo.com/v1/forecast?latitude=45.5921&longitude=9.5734&current_weather=true",  //Milano,Italy
            elementID: "Italy",
            city: "Milano"
        },
        {
            apiurl: "https://api.open-meteo.com/v1/forecast?latitude=38.3452&longitude=-0.4815&current_weather=true", //Alicante,Spain
            elementID: "Spain",
            city: "Alicante"
        }
    ];

    //Function to fetch weather data for a given location
    function fetchWeather(location) {
        //fetch data from API
        fetch(location.apiurl)
            .then(response => response.json()) //convert response to JSON
            .then(data => {
                const weather = data.current_weather;
                //Display weather info on the page
                displayWeather(weather, location.elementID, location.city);
            })
        .catch(error => {
            //Handle and display error message if fetching data fails
            document.getElementById(location.elementID).innerHTML = `<p>Cannot fetch data</p>`;
            console.error("Error with fetching data", error);
        });
    }

    //Function to update the DOM with weather information for a specific location
    function displayWeather(weather, elementID, city) {
        //Update the HTML content of the target element
        document.getElementById(elementID).innerHTML = `
        <h2>${city}, ${elementID}</h2>
        <p>Temp.: ${weather.temperature}</p>
        <p>Wind Speed: ${weather.windspeed}</p>
        <p>Weather Code: ${weather.weathercode}</p>
        `;
    }

    //Loop through the locations array and fetch weather data for each location
    locations.forEach(location => fetchWeather(location));

    //Interval to refresh the weather data every 60000 milliseconds (one minute))  
    setInterval(() => {locations.forEach(location => fetchWeather(location));}, 60000);
    
});

