const request = require("postman-request");
// const modules = require("modules");

const geocode = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=pk.eyJ1IjoidWRpdDIiLCJhIjoiY2tuN3FvY3lsMHFrMzJubzZqdHNta3kzcCJ9.zIiFBvVQMS-Zl_poAauDpQ&limit=1";

  request({ url: url, json: true }, (error, response) => {
    if (error) {
      callback("Unable to connect", undefined);
    } else if (response.body.features.length === 0) {
      console.log(response.body.features.length);
      callback("ERROR", undefined);
    } else {
      const place = response.body.features[0].place_name;
      const centerCoordinates = response.body.features[0].center;
      callback(undefined, { place, centerCoordinates });
    }
  });
};

module.exports = geocode;
