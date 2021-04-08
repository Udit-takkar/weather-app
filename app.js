const express = require("express");
const hbs = require("hbs");
const path = require("path");
const { send } = require("process");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");
const app = express();
const port = process.env.PORT || 3001;

const publicDirectory = path.join(__dirname, "./public");
const viewPath = path.join(__dirname, "./templates/views");
const partialsPath = path.join(__dirname, "./templates/partials");

app.use(express.static(publicDirectory));
app.set("view engine", "hbs");
app.set("views", viewPath);
hbs.registerPartials(partialsPath);

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Udit",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About me",
    name: "Udit",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "Location must be provided",
    });
  }

  geocode(req.query.address, (error, { place } = {}) => {
    if (error) {
      return res.send({ error });
    }

    forecast(req.query.address, (error, forecastData) => {
      if (error) {
        return res.send({ error });
      }

      res.send({
        forecast: forecastData,
        location: place,
        address: req.query.address,
      });
    });
  });
});

// app.get("/products", (req, res) => {
//   if (!req.query.search) {
//     res.send({
//       error: "You must provide search term",
//     });
//   } else {
//     console.log(req.query.search);
//     res.send({
//       products: [],
//     });
//   }
// });

app.get("/help", (req, res) => {
  res.render("help", {
    name: "udit",
    title: "Help",
    message: "sample message",
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    message: "Help Article Not Found",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    message: "Page Not Found",
  });
});

app.listen(port, () => {
  console.log(`Listening on port  ${port}`);
});
