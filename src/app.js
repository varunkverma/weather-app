const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const express = require("express");
const path = require("path");
const hbs = require("hbs");
const app = express();
const port = process.env.PORT || 3000;

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "..", "public");
const viewsPath = path.join(__dirname, "..", "Templates", "views");
const partialsPath = path.join(__dirname, "..", "Templates", "partials");

// setting templatig engine
app.set("view engine", "hbs");
//setting views folder
app.set("views", viewsPath);
// registering partials
hbs.registerPartials(partialsPath);

// setup static directory to serve
app.use(express.static(publicDirectoryPath));

// Routes
// weather
app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Varun",
    creator: "Varun Verma"
  });
});
app.get("/about", (req, res) => {
  res.render("about", {
    title: "Weather App",
    name: "Varun",
    creator: "Varun Verma"
  });
});
app.get("/help", (req, res) => {
  res.render("help", {
    title: "Weather App",
    message: "Contact us at this no.",
    creator: "Varun Verma"
  });
});

app.get("/weather", (req, res) => {
  const address = req.query.address;

  // checking for the presence of address
  if (!address) {
    return res.send({
      error: "Please provide an address."
    });
  }

  // fetching coordinates using geocode
  geocode(address, (error, { latitude, longitude, placeName } = {}) => {
    // if error while using geocode
    if (error) {
      return res.send({
        error
      });
    }
    // using forecast to fetch the forecast for the passed address
    forecast(
      latitude,
      longitude,
      (forecastError, { summary, currentTemp, chanceOfRain }) => {
        // if error while using the forecast
        if (forecastError) {
          return res.send({
            error: forecastError
          });
        }

        // sending forecast details as response
        res.send({
          forecast: {
            summary,
            currentTemperature: currentTemp,
            chanceOfRain
          },

          location: placeName,
          address
        });
      }
    );
  });
});

app.get("/products", (req, res) => {
  // if a search term isn't there
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term"
    });
  }

  res.send({
    products: []
  });
});

// 404 Route for help
app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "Help 404",
    errorMessage: "Help Article not found",
    creator: "Varun Verma"
  });
});

// 404 Route
app.get("*", (req, res) => {
  res.render("404", {
    title: "404, Page not found",
    errorMessage: "Page not found",
    creator: "Varun Verma"
  });
});
app.listen(port, () => {
  console.log(`Server is up on port: ${port}`);
});
