const request = require("request");

const forecast = (latitude, longitude, callback) => {
	const url = `http://api.weatherstack.com/current?access_key=8406bcdfd586f872c1f9b779a3c78906&query=${latitude},${longitude}&units=f`;
	request({ url, json: true }, (error, { body } = {}) => {
		if (error) {
			callback("Unable to connect to location services!", undefined);
		} else if (body.error) {
			callback("Unable to find location!", undefined);
		} else {
			callback(undefined, {
				weather_description: body.current.weather_descriptions[0],
				temperature: body.current.temperature,
				feelslike: body.current.feelslike,
			});
		}
	});
};

module.exports = forecast;
