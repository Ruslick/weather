import fs from "fs";
import events from "./events.js";

const num1 = Number(process.argv[2]);
const num2 = Number(process.argv[3]);
const operator = process.argv[4];

// main
(async () => {
	const operatorsFiles = fs.readdirSync("./operations");
  const operators = operatorsFiles.map((file) => file.split(".")[0]);


	for (const operator of operatorsFiles) {
		await import(`./operations/${operator}`);
	}

	// protection
	if (isNaN(num1) || isNaN(num2)) {
		console.log("Invalid numbers");
		process.exit(1);
	}
	if (!operators.includes(operator)) {
		console.log("Invalid operator! Available operators:", operatorsFiles);
		process.exit(1);
	}

	events.emit(operator, num1, num2);
})();
