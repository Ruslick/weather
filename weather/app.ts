import yargs from "yargs";
import { getWeather } from "./services/api.service.ts";
import {
	printError,
	printInfo,
	printSuccess,
	printWeather,
} from "./services/log.service.ts";
import { getFromStorage, saveInStorage } from "./services/storage.service.ts";
import { config, configDotenv } from "dotenv";
import { exit } from "process";
import { AxiosError } from "axios";
import { setLang, t } from "./services/localization.service.ts";

config();

const initCli = async () => {
	const argv = await yargs(process.argv).parse();

	const lang = (await getFromStorage<"ru" | "en">("lang")) ?? "en";
	setLang(lang);

	if (argv.h) {
		printInfo(t("help1"));
		printInfo(t("help2"));
		printInfo(t("help3"));
		printInfo(t("help4"));
		printInfo(t("help5"));
		printInfo(t("help6"));

		return;
	}
	if (argv.l) {
		if (argv.l === "ru") {
			await saveInStorage("lang", "ru");
			setLang("ru");
			printSuccess(t("ls"));
			return;
		}
		if (argv.l === "en") {
			await saveInStorage("lang", "en");
			setLang("en");
			printSuccess(t("ls"));

			return;
		}

		printError(t("lnf"));
		return;
	}

	if (typeof argv.t === "string") {
		await saveInStorage("token", argv.t);
		printSuccess(t("ts"));
		return;
	}

	if (typeof argv.c === "string") {
		const cities = argv.c.split(",");
		console.log(cities);
		await saveInStorage("cities", cities);
		printSuccess(t("cs"));
		return;
	}

	await handleGetWeather();
};

const handleGetWeather = async () => {
	const cities = await getFromStorage<string[]>("cities");
	const token = process.env.TOKEN ?? (await getFromStorage("token"));
	const lang = (await getFromStorage<string>("lang")) ?? "en";
	if (cities === undefined) {
		printError(t("ce"));
		return;
	}
	if (token === undefined) {
		printError(t("te"));
		return;
	}
	cities.forEach(async (city) => {
		try {
			const weather = await getWeather(city, token, lang);
			printWeather(weather);
		} catch (e) {
			if (e instanceof AxiosError && e.status === 401) {
				printError(t("ae"));
			}
			if (e instanceof AxiosError && e.status === 404) {
				printError(t("ce"));
			}
		}
	});
};

initCli();
