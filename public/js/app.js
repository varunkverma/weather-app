const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.getElementById("message");

// adding event listener
weatherForm.addEventListener("submit", e => {
  e.preventDefault();

  const location = search.value;
  messageOne.classList.add("msg-info");
  messageOne.textContent = "Loading...";
  let url = "http://localhost:3000/weather?address=" + location;

  fetch(url).then(response => {
    response.json().then(forecastData => {
      if (forecastData.error) {
        console.log(forecastData.error);
        messageOne.textContent = forecastData.error;
      } else {
        console.log(
          `${forecastData.forecast.summary}. Temperature is ${forecastData.forecast.currentTemperature} degrees, with a chance of ${forecastData.forecast.chanceOfRain}`
        );
        messageOne.textContent = `${forecastData.forecast.summary}. Temperature is ${forecastData.forecast.currentTemperature} degrees, with a chance of ${forecastData.forecast.chanceOfRain} of Rain`;
      }
    });
  });
});
