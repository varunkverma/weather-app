const request = require("request");

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1IjoidmFydW5rdmVybWEiLCJhIjoiY2sxNnU5MnozMDIzZTNvbXpkc3l1dTZiMSJ9.d8Qr76zuZl-ObgK8-Vognw&limit=1`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to the server", undefined);
    } else if (body.features.length === 0) {
      callback(
        "Unable to find location. Please check the enetered address, whether exists",
        undefined
      );
    } else {
      const latitude = body.features[0].center[1];
      const longitude = body.features[0].center[0];
      const placeName = body.features[0].place_name;
      data = { latitude, longitude, placeName };
      callback(undefined, data);
    }
  });
};

module.exports = geocode;
