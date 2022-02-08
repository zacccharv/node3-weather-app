const path = require("path");
const express = require("express");
const hbs = require("hbs");
const { log } = require("console");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();
const port = process.env.PORT || 3000;

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

app.listen(port, () => {
	console.log(`Example app listening on port ${port}.`);
});

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

// app.com #2
app.get("/", (req, res) => {
	res.render("index.hbs", {
		title: "Weather App",
		name: "Zacc Charvolin",
	});
});

// app.com/about
app.get("/about", (req, res) => {
	res.render("about", {
		title: "About Page",
		name: "Zacc Charvolin",
	});
});

// app.com/help
app.get("/help", (req, res) => {
	res.render("help", {
		title: "Help Page",
		name: "Zacc Charvolin",
		body: "This is the help page.",
	});
});

// app.com/weather
app.get("/weather", function (req, res) {
	const address = req.query.address;

	if (!address) {
		return res.send({
			error: "No address entered.",
		});
	}

	geocode(address, (error, { latitude, longitude, location } = {}) => {
		if (error) {
			return res.send({ error: error });
		}

		forecast(latitude, longitude, (error, { weather_description, temperature, feelslike } = {}) => {
			if (error) {
				return res.send({ error: error });
			}
			res.send({
				location: location,
				forecast: `${weather_description}. It's currently ${temperature} degrees, but it feels like ${feelslike} degrees.`,
				address: req.query.address,
			});
		});
	});
});

app.get("/products", function (req, res) {
	if (!req.query.search) {
		return res.send({
			error: "No search term",
		});
	}
	console.log(req.query.search);
	res.send({
		products: [],
	});
});

app.get("/help/*", (req, res) => {
	res.render("404", {
		title: "404",
		name: "Zacc Charvolin",
		errorMessage: "Help article not found",
	});
});

app.get("*", (req, res) => {
	res.render("404", {
		title: "404",
		name: "Zacc Charvolin",
		errorMessage: "Page not found",
	});
});
