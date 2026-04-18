document.getElementById("search-btn").addEventListener("click",function(){
    const city = document.getElementById("city-input").value

const apiKey = "276ee47d0d4791e31b6aff8cdadf9d31"
const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`

fetch(url)
  .then(function(response) {
    return response.json()
  })
 .then(function(data) {
  console.log(data)
  
  if(data.cod === 401 || data.cod === "404") {
    document.getElementById("weather-result").innerHTML = `
      <p class="error">City not found. Please try again.</p>
    `
    document.getElementById("weather-result").style.display = "block"
    return
  }

  const weatherHTML = `
    <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="weather icon">
    <div class="city-name">${data.name}, ${data.sys.country}</div>
    <div class="temperature">${Math.round(data.main.temp)}°C</div>
    <div class="description">${data.weather[0].description}</div>
    <div class="details">
      <div class="detail-item">
        <span>Humidity</span>
        <strong>${data.main.humidity}%</strong>
      </div>
      <div class="detail-item">
        <span>Wind</span>
        <strong>${data.wind.speed} km/h</strong>
      </div>
      <div class="detail-item">
        <span>Feels like</span>
        <strong>${Math.round(data.main.feels_like)}°C</strong>
      </div>
    </div>
  `
  
  document.getElementById("weather-result").innerHTML = weatherHTML
  document.getElementById("weather-result").style.display = "block"
})
  })