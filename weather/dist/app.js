var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import yargs from "yargs";
import { getWeather } from "./services/api.service.js";
import { printError, printInfo, printSuccess, printWeather, } from "./services/log.service.js";
import { getFromStorage, saveInStorage } from "./services/storage.service.js";
import { config } from "dotenv";
import { AxiosError } from "axios";
import { setLang, t } from "./services/localization.service.js";
config();
const initCli = () => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const argv = yield yargs(process.argv).parse();
    const lang = (_a = (yield getFromStorage("lang"))) !== null && _a !== void 0 ? _a : "en";
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
            yield saveInStorage("lang", "ru");
            setLang("ru");
            printSuccess(t("ls"));
            return;
        }
        if (argv.l === "en") {
            yield saveInStorage("lang", "en");
            setLang("en");
            printSuccess(t("ls"));
            return;
        }
        printError(t("lnf"));
        return;
    }
    if (typeof argv.t === "string") {
        yield saveInStorage("token", argv.t);
        printSuccess(t("ts"));
        return;
    }
    if (typeof argv.c === "string") {
        const cities = argv.c.split(",");
        console.log(cities);
        yield saveInStorage("cities", cities);
        printSuccess(t("cs"));
        return;
    }
    yield handleGetWeather();
});
const handleGetWeather = () => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const cities = yield getFromStorage("cities");
    const token = (_a = process.env.TOKEN) !== null && _a !== void 0 ? _a : (yield getFromStorage("token"));
    const lang = (_b = (yield getFromStorage("lang"))) !== null && _b !== void 0 ? _b : "en";
    if (cities === undefined) {
        printError(t("ce"));
        return;
    }
    if (token === undefined) {
        printError(t("te"));
        return;
    }
    cities.forEach((city) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const weather = yield getWeather(city, token, lang);
            printWeather(weather);
        }
        catch (e) {
            if (e instanceof AxiosError && e.status === 401) {
                printError(t("ae"));
            }
            if (e instanceof AxiosError && e.status === 404) {
                printError(t("ce"));
            }
        }
    }));
});
initCli();
