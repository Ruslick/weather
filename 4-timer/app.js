const time = process.argv[2];

const printPatern = () => {
	console.log("Invalid time format! Examples:");
	console.log('# node ./app.js "10h 2m 1s"');
	console.log('# node ./app.js "1s"');
	console.log('# node ./app.js "1m 10s"');
};

if (!time) {
	printPatern();
	process.exit(1);
}

const splited = time?.split(" ");

if (!splited.length) {
	printPatern();
	process.exit(1);
}

if (splited.length > 3) {
	printPatern();
	process.exit(1);
}

let seconds = 0;
let minutes = 0;
let hours = 0;

splited.forEach((time) => {
	if (time.includes("h")) {
		hours = Number(time.replace("h", ""));
	} else if (time.includes("m")) {
		minutes = Number(time.replace("m", ""));
	} else if (time.includes("s")) {
		seconds = Number(time.replace("s", ""));
	}
});

const totalMs = hours * 60 * 60 * 1000 + minutes * 60 * 1000 + seconds * 1000;

console.log(totalMs);

setTimeout(() => {
	console.log("Time is up!");
	process.exit(0);
}, totalMs);
