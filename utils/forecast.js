const request = require("postman-request");
const forecast = (place, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=1ee5dd3a626910bdfb1dfe17c7aa3645&query=" +
    encodeURIComponent(place);

  request({ url: url, json: true }, (error, response, body) => {
    if (error) {
      callback("Unable to conect to weather services", undefined);
    } else if (body.error) {
      callback("body has error:", undefined);
    } else {
      callback(
        undefined,
        `${body.current.weather_descriptions[0]}  It is ${body.current.temperature} and it feels like ${body.current.feelslike}`
      );
    }
  });
};

module.exports = forecast;
