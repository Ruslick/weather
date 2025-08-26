import chalk from "chalk";
import boxen from "boxen";
import { t } from "./localization.service.js";
export const printError = (message) => {
    console.log(`${chalk.bgRedBright(" ERROR ")} ${chalk.redBright(message)}`);
};
export const printSuccess = (message) => {
    console.log(`${chalk.bgGreenBright(" SUCCESS ")} ${chalk.greenBright(message)}`);
};
export const printInfo = (message) => {
    console.log(`${chalk.bgYellowBright(" INFO ")} ${chalk.yellowBright(message)}`);
};
export const printWeather = (data) => {
    const { weather, main, wind, clouds, sys, name, timezone, coord } = data;
    const currentWeather = weather[0];
    const formatTemp = (temp) => {
        if (temp > 30)
            return chalk.redBright(`${Math.round(temp)}°C`);
        if (temp > 20)
            return chalk.yellowBright(`${Math.round(temp)}°C`);
        if (temp > 10)
            return chalk.greenBright(`${Math.round(temp)}°C`);
        return chalk.cyanBright(`${Math.round(temp)}°C`);
    };
    const formatTime = (timestamp) => {
        return new Date(timestamp * 1000).toLocaleTimeString("ru-RU", {
            hour: "2-digit",
            minute: "2-digit",
        });
    };
    const weatherContent = [
        `${chalk.bold(currentWeather.description)} • ${chalk.yellow(currentWeather.main)}`,
        "",
        `${chalk.bold(t("pw1"))} ${formatTemp(main.temp)}`,
        `${chalk.bold(t("pw2"))} ${formatTemp(main.feels_like)}`,
        `${chalk.bold(t("pw3"))} ${formatTemp(main.temp_max)}`,
        `${chalk.bold(t("pw4"))} ${formatTemp(main.temp_min)}`,
        "",
        `${chalk.bold(t("pw5"))} ${chalk.blueBright(`${wind.speed} м/с`)}`,
        `${chalk.bold(t("pw6"))} ${chalk.cyanBright(`${main.humidity}%`)}`,
        `${chalk.bold(t("pw7"))} ${chalk.green(`${main.pressure} hPa`)}`,
        `${chalk.bold(t("pw8"))} ${chalk.white(`${clouds.all}%`)}`,
        `${chalk.bold(t("pw9"))} ${chalk.yellow(`${data.visibility / 1000} ${t("km")}`)}`,
        "",
        `${chalk.bold(t("pw10"))} ${chalk.yellow(formatTime(sys.sunrise))}`,
        `${chalk.bold(t("pw11"))} ${chalk.red(formatTime(sys.sunset))}`,
        `${chalk.bold(t("pw12"))}  ${chalk.gray(`${coord.lat.toFixed(4)}N, ${coord.lon.toFixed(4)}E`)}`,
    ].join("\n");
    ``;
    const box = boxen(weatherContent, {
        padding: 1,
        margin: 1,
        borderStyle: "round",
        borderColor: "cyan",
        backgroundColor: "#1a1a1a",
        title: `${t("weather")} ${name}, ${sys.country}`,
        titleAlignment: "center",
    });
    console.log(box);
};
