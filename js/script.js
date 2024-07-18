const searchToken = document.getElementById("search-ip");
const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
function displayCurrentWeather(locationkeyword, currentKeyword) {
  var dateSimple = new Date(currentKeyword.last_updated);
  var storage = `
            <div class="col-md-4">
              <div class="card card1 border-0">
                <div
                  class="card-header d-flex justify-content-between align-items-center border-0 rounded-0"
                >
                  <p class="day mb-0">${days[dateSimple.getDay()]}</p>
                  <p class="date mb-0">${
                    dateSimple.getDate() + months[dateSimple.getMonth()]
                  }</p>
                </div>
                <div class="card-body p-4">
                  <p class="city mt-2 mb-1">${locationkeyword.name}</p>
                  <div class="degree mb-5 pb-3 mb-md-0">
                    <div class="fw-bold current-degree me-4">
                      ${currentKeyword.temp_c}<sup>o</sup>C
                    </div>
                    <div class="weather-icon">
                      <img
                        src="https:${currentKeyword.condition.icon}"
                        alt=".."
                        style="width: 90px"
                      />
                    </div>
                  </div>
                  <p class="current-status">${currentKeyword.condition.text}</p>
                  <div class="weather-info">
                    <span
                      ><img
                        src="images/icon-umberella.png"
                        alt="umberella icon"
                      />
                      20%</span
                    >
                    <span
                      ><img src="images/icon-wind.png" alt="wind icon" />
                      ${currentKeyword.wind_kph} k/h</span
                    >
                    <span
                      ><img src="images/icon-compass.png" alt="compass icon" />
                      East</span
                    >
                  </div>
                </div>`;
  document.getElementById("weatherStorage").innerHTML = storage;
}
function displayNextWeather(forecastKeyword) {
  var storage = "";
  for (var i = 1; i < 3; i++) {
    storage += `<div class="col-md-4">
              <div class="card card${i + 1} text-center h-100 border-0">
                <div class="card-header rounded-0 border-0">
                  <p class="day mb-0">${
                    days[new Date(forecastKeyword[i].date).getDay()]
                  }</p>
                </div>
                <div
                  class="card-body d-flex flex-column align-items-center pt-5"
                >
                  <img
                    src="https:${forecastKeyword[i].day.condition.icon}"
                    alt="..."
                    style="width: 48px"
                  />
                  <div class="degree d-flex flex-column py-4">
                    <span class="main-degree fw-bold">${
                      forecastKeyword[i].day.maxtemp_c
                    }<sup>o</sup>C</span>
                    <span>${forecastKeyword[i].day.mintemp_c}<sup>o</sup></span>
                  </div>
                  <p class="current-status">${
                    forecastKeyword[i].day.condition.text
                  }</p>
                </div>
              </div>
            </div>`;
  }
  document.getElementById("weatherStorage").innerHTML += storage;
}
async function search(searchInput) {
  console.log("Search input:", searchInput);
  var myHttp = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=0e7cabc73a394353ac212102240507&q=${searchInput}&days=7`
  );
  if (myHttp.status != 400) {
    var objName = await myHttp.json();
    displayCurrentWeather(objName.location, objName.current);
    displayNextWeather(objName.forecast.forecastday);
  }
}
searchToken.addEventListener("keyup", function (token) {
  console.log(token);
  search(token.target.value);
});
search("Cairo");
