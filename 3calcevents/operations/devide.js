import events from "../events.js";

events.on("devide", (num1, num2) => {
	console.log(num1 / num2);
});
