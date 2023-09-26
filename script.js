const apiKey = 'YOUR_API_KEY_HERE'; // Replace with your actual API key
const weatherInfo = document.getElementById('weatherInfo');
const locationInput = document.getElementById('locationInput');
const getWeatherBtn = document.getElementById('getWeatherBtn');
const unitToggle = document.getElementById('unitToggle');

// Event listener for the Get Weather button
getWeatherBtn.addEventListener('click', () => {
    const location = locationInput.value;
    const unit = unitToggle.value;
    getWeatherData(location, unit);
});

// Function to fetch weather data from the API
function getWeatherData(location, unit) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=${unit}&appid=${apiKey}`;
    
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Weather data not found.');
            }
            return response.json();
        })
        .then(data => {
            displayWeatherData(data);
        })
        .catch(error => {
            displayError(error.message);
        });
}

// Function to display weather data
function displayWeatherData(data) {
    const temperature = data.main.temp;
    const humidity = data.main.humidity;
    const windSpeed = data.wind.speed;
    const description = data.weather[0].description;

    const weatherHtml = `
        <h2>Weather in ${data.name}, ${data.sys.country}</h2>
        <p>Temperature: ${temperature} &deg;${unitToggle.value === 'metric' ? 'C' : 'F'}</p>
        <p>Humidity: ${humidity}%</p>
        <p>Wind Speed: ${windSpeed} m/s</p>
        <p>Condition: ${description}</p>
    `;

    weatherInfo.innerHTML = weatherHtml;
}

// Function to display error message
function displayError(errorMessage) {
    weatherInfo.innerHTML = `<p class="error">${errorMessage}</p>`;
}

// Optional: Geolocation
function getWeatherByGeolocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;

            const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=${unitToggle.value}&appid=${apiKey}`;
            
            fetch(apiUrl)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Weather data not found.');
                    }
                    return response.json();
                })
                .then(data => {
                    displayWeatherData(data);
                })
                .catch(error => {
                    displayError(error.message);
                });
        });
    } else {
        displayError('Geolocation is not supported by your browser.');
    }
}
