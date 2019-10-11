const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url = `https://api.darksky.net/forecast/162ec793f904ae2cb8beb0f1f32840e6/${encodeURIComponent(
    latitude
  )},${encodeURIComponent(longitude)}?units=si`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      // usuallt low level OS error
      callback("ERROR: Not able to connect to the internet.", undefined);
    } else if (!body.daily) {
      // error could be because of wrong inputs
      callback("Unable to find location", undefined);
    } else {
      const data = {
        summary: body.daily.data[0].summary,
        currentTemp: body.currently.temperature,
        chanceOfRain: body.currently.precipProbability,
        temperatureMin: body.daily.data[0].temperatureMin,
        temperatureMax: body.daily.data[0].temperatureMax
      };
      callback(undefined, data);
    }
  });
};

module.exports = forecast;
