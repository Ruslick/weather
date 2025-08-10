import events from "../events.js";

events.on("sub", (num1, num2) => {
	console.log(num1 - num2);
});
