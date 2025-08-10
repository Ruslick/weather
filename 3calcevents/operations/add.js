import events from "../events.js";

events.on("add", (num1, num2) => {
	console.log(num1 + num2);
});
