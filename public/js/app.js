console.log("Client side javascript file is loaded!");

const weatherForm = document.querySelector("form");
const searchLocation = document.querySelector("input");
const message1 = document.querySelector("#message-1");
const message2 = document.querySelector("#message-2");

weatherForm.addEventListener("submit", (event) => {
	event.preventDefault();

	message1.textContent = "Loading...";
	message2.textContent = "";

	fetch(`http://localhost:3000/weather?address=${searchLocation.value}`).then((response) => {
		response.json().then((data) => {
			if (data.error) {
				message1.textContent = "Location not found";
			} else {
				console.log(data.location);
				console.log(data.forecast);
				message1.textContent = data.location;
				message2.textContent = data.forecast;
			}
		});
	});
	console.log(searchLocation.value);
});
