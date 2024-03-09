var express = require("express");
var router = express.Router();
let axios = require("axios");
let bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({ extended: true }));

router.get("/", function (req, res) {
  res.render('search');
});

router.post("/result", function (req, res) {
  const Api = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
  const ApiKey = "68f81386fd795a495b46926237451f07";
  const city = req.body.city;

  axios
    .get(`${Api}${city}&appid=${ApiKey}`) 
    .then(function (response) {
      let data = response.data;
      let temp = Math.round(data.main.temp);
      let windSpeed = data.wind.speed;
      let pressure = data.main.pressure;
      let humidity = data.main.humidity;
      let weatherIcon = data.weather[0].icon;
      let cityname = data.name;
      let condition = data.weather[0].description;

      console.log(temp, windSpeed, pressure, humidity, weatherIcon);
      res.render("index", {
        temp,
        windSpeed,
        pressure,
        humidity,
        weatherIcon,
        cityname,
        condition
      });
    })
    .catch(function (error) {
      console.error("Sorry there was an error: " + error);
      res.render("index")
    });
});

module.exports = router;
